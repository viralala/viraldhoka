import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { PROJECTS, type Project } from '../data/site'
import { gsap, reduced, scrollVelocity } from '../lib/motion'
import { getDict, localProject, monthName, onLang, useLang, useT } from '../i18n'
import { detailApi } from './Detail'

const N = PROJECTS.length
const COPIES = 3
const TOTAL = N * COPIES
const P = 1400
/** How long each tape stays in front before the shelf turns on its own */
const AUTO_MS = 3400
/** After you touch the shelf, it waits this long before turning on its own again */
const IDLE_MS = 6500
/** The timeline runs April to November 2026; month names come from the current language */
const FIRST_MONTH = 4
const MONTHS = Array.from({ length: 8 }, (_, i) => FIRST_MONTH + i)
const yearPos = (m: number) => (m - FIRST_MONTH + 0.5) / MONTHS.length

const mod = (a: number, b: number) => ((a % b) + b) % b
const sstep = (t: number) => t * t * (3 - 2 * t)

function Tape({ project, index, setRef }: { project: Project; index: number; setRef: (el: HTMLDivElement | null) => void }) {
  const t = useT()
  const long = project.title.length > 10
  return (
    <div className={`tape scheme-${project.scheme}`} ref={setRef} data-v={index}>
      <div className="sp">
        <i className="sp-mark" />
        <span className="sp-title">{project.title}</span>
        <span className="sp-by pixel">{t.work.initials}</span>
        <span className="sp-box pixel">{String(project.month).padStart(2, '0')}</span>
      </div>
      <div className="cv">
        <p className="cv-top pixel">{t.work.build}</p>
        <p className={`cv-title ${long ? 'is-long' : ''}`}>{project.title}</p>
        <div className="cv-art">
          <img src={`/work/${project.id}-cover.png`} alt="" draggable={false} loading="lazy" />
        </div>
        <p className="cv-foot pixel">
          <span>{t.projects[project.id].kind}</span>
          <b>2026</b>
        </p>
      </div>
    </div>
  )
}

/** Swaps a line inside its mask: new text slides in as the old one slides out. */
function swapLine(mask: HTMLElement | null, text: string, dir: number) {
  if (!mask) return
  const old = Array.from(mask.children) as HTMLElement[]
  const next = document.createElement('span')
  next.textContent = text
  mask.appendChild(next)
  if (reduced) {
    old.forEach((o) => o.remove())
    return
  }
  const opts = { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' as const }
  next.animate([{ transform: `translateY(${dir * 105}%)` }, { transform: 'translateY(0)' }], opts)
  old.forEach((o) => {
    const a = o.animate([{ transform: getComputedStyle(o).transform === 'none' ? 'translateY(0)' : getComputedStyle(o).transform }, { transform: `translateY(${-dir * 105}%)` }], opts)
    a.onfinish = () => o.remove()
  })
}

export function Shelf() {
  const section = useRef<HTMLElement>(null)
  const stageWrap = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const probe = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLButtonElement>(null)
  const dot = useRef<HTMLElement>(null)
  const tapes = useRef<(HTMLDivElement | null)[]>([])
  const capTitle = useRef<HTMLSpanElement>(null)
  const capTag = useRef<HTMLSpanElement>(null)
  const capMeta = useRef<HTMLSpanElement>(null)
  const api = useRef({ go: (_i: number) => {}, step: (_d: number) => {}, open: () => {} })

  const copies = useMemo(() => Array.from({ length: TOTAL }, (_, v) => v), [])

  useLayoutEffect(() => {
    const wrap = stageWrap.current!
    const shelf = wrap.querySelector('.shelf') as HTMLElement

    // Geometry, in the units of the current tape height
    let H = 0
    let W = 0
    let ws = 0
    let d = 0
    let gap = 0
    let U = 0
    let XS: Float32Array = new Float32Array(1)

    const scl = (u: number) => 1 / (1 + Math.pow(Math.abs(u) / U, 1.6))
    const xsc = (u: number) => {
      const i = Math.min(XS.length - 1, Math.abs(u) / 2)
      const lo = Math.floor(i)
      const hi = Math.min(XS.length - 1, lo + 1)
      return Math.sign(u) * (XS[lo] + (XS[hi] - XS[lo]) * (i - lo))
    }
    const B = (r: number) => (Math.abs(r) < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : Math.sign(r) * 0.5)
    const F = (r: number) => r * (ws + gap) + (d - ws + 1.4 * gap) * B(r)

    const measure = () => {
      H = probe.current!.offsetHeight
      W = window.innerWidth
      ws = (H * 142) / 840
      d = (H * 474) / 900
      gap = H * 0.035
      U = H * (W < 768 ? 1.05 : 1.3)
      const steps = Math.ceil((3 * U) / 2) + 2
      XS = new Float32Array(steps)
      let acc = 0
      for (let i = 1; i < steps; i++) {
        acc += 2 / (1 + Math.pow((i * 2) / U, 1.6))
        XS[i] = acc
      }
      const s = stage.current!
      s.style.setProperty('--Hpx', `${H}px`)
      s.style.setProperty('--ws', `${ws}px`)
      s.style.setProperty('--d', `${d}px`)
    }
    measure()

    // The shelf has its own position, in tapes. It is unbounded, so it loops forever,
    // and the page scroll never drives it: scrolling the page just moves past.
    let T = 0
    let s = 0
    let settle = 0
    let dragging = false
    let inView = false
    let focused = false
    let detailOpen = false
    let lastTouch = -1e9
    let autoAt = performance.now() + AUTO_MS

    const io = new IntersectionObserver(
      ([en]) => {
        inView = en.isIntersecting
        focused = en.intersectionRatio >= 0.5
        if (inView) autoAt = Math.max(autoAt, performance.now() + 1600)
      },
      { threshold: [0, 0.5] },
    )
    io.observe(section.current!)

    const settleSoon = () => {
      window.clearTimeout(settle)
      settle = window.setTimeout(() => (T = Math.round(T)), 160)
    }
    const touched = () => {
      lastTouch = performance.now()
      autoAt = lastTouch + IDLE_MS
    }
    const current = () => mod(Math.round(s), N)
    // Goes the short way round to a project
    const go = (i: number) => {
      const base = Math.round(T)
      let dlt = mod(i - mod(base, N), N)
      if (dlt > N / 2) dlt -= N
      T = base + dlt
      touched()
    }
    const step = (dlt: number) => {
      T = Math.round(T) + dlt
      touched()
    }

    const coverRect = () => {
      const v = mod(Math.round(s), TOTAL)
      return tapes.current[v]!.querySelector('.cv')!.getBoundingClientRect()
    }
    const open = () => {
      T = Math.round(s)
      detailOpen = true
      touched()
      detailApi.open(PROJECTS[current()], coverRect, () => {
        detailOpen = false
        touched()
      })
    }
    api.current = { go, step, open }

    // Hover and pointer state
    const mouse = { x: -1, y: -1 }
    let hover = -1
    const lifts = new Float32Array(TOTAL)
    const depth = new Float32Array(TOTAL)
    let tiltX = 0
    let tiltY = 0

    let activeIdx = -1
    const setCaption = (i: number, dir: number) => {
      const p = localProject(PROJECTS[i], getDict())
      swapLine(capTitle.current, p.title, dir)
      swapLine(capTag.current, p.tagline, dir)
      swapLine(capMeta.current, `${monthName(p.month, { month: 'short', year: 'numeric' })} / ${p.kind}`, dir)
    }
    // A new language rewrites the caption in place
    const offLang = onLang(() => {
      if (activeIdx >= 0) setCaption(activeIdx, 1)
    })

    let dotYear = yearPos(PROJECTS[0].month)
    let last = performance.now()
    let lean = 0
    const tick = () => {
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!inView && activeIdx >= 0) return

      // It keeps turning on its own, one tape at a time, unless you are using it
      const idle = !dragging && !detailOpen && hover < 0 && !document.hidden && !reduced
      if (!idle) autoAt = Math.max(autoAt, now + 900)
      else if (now >= autoAt) {
        T = Math.round(T) + 1
        autoAt = now + AUTO_MS
      }
      const auto = idle && now - lastTouch > IDLE_MS ? 1 - Math.max(0, Math.min(1, (autoAt - now) / AUTO_MS)) : 0
      ring.current?.style.setProperty('--auto', auto.toFixed(3))

      // Scrolling the page past leans the tapes a little, it never moves them
      const v = Math.max(-8, Math.min(8, scrollVelocity() * 0.35))
      lean += (v - lean) * (1 - Math.exp(-6 * dt))

      const k = dragging ? 18 : 9
      s = reduced ? T : s + (T - s) * (1 - Math.exp(-k * dt))

      const ai = current()
      if (ai !== activeIdx) {
        const dir = activeIdx < 0 ? 1 : Math.sign(T - s) || 1
        activeIdx = ai
        setCaption(ai, dir)
      }

      const settled = Math.abs(T - s) < 0.3
      const cy = wrap.clientHeight * 0.41
      const onCover = settled && !detailOpen && Math.abs(mouse.x - W / 2) < d * 0.55 && Math.abs(mouse.y - cy) < H * 0.55
      const wantY = onCover ? ((mouse.x - W / 2) / (d * 0.55)) * 8 : mouse.x < 0 ? 0 : ((mouse.x - W / 2) / W) * 4
      const wantX = onCover ? -((mouse.y - cy) / (H / 2)) * 5 : 0
      const te = 1 - Math.exp(-7 * dt)
      tiltY += (wantY - tiltY) * te
      tiltX += (wantX - tiltX) * te

      for (let v = 0; v < TOTAL; v++) {
        const el = tapes.current[v]
        if (!el) continue
        let r = mod(v - s, TOTAL)
        if (r >= TOTAL / 2) r -= TOTAL
        const u = F(r)
        if (Math.abs(u) > U * 1.95) {
          if (el.style.display !== 'none') el.style.display = 'none'
          continue
        }
        if (el.style.display === 'none') el.style.display = ''
        const o = sstep(Math.max(0, 1 - Math.abs(r)))
        const want = v === hover && Math.abs(r) > 0.5 ? 1 : 0
        lifts[v] += (want - lifts[v]) * (1 - Math.exp(-12 * dt))
        const sc = scl(u)
        const kk = 1 / sc
        const z = P * (1 - kk) + o * H * 0.1
        const x = xsc(u) * kk
        const y = (H * 0.5 * (1 - sc) * 0.42 + o * H * 0.012 - lifts[v] * H * 0.05) * kk
        const ry = Math.sign(u) * Math.min(1, Math.abs(u) / U) * 26 * (1 - o) - 90 * o + tiltY * o
        const rx = tiltX * o - lean * (0.5 + 0.5 * (1 - o))
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`
        el.style.zIndex = String(Math.round(3000 + z))
        depth[v] = z
        el.style.setProperty('--sp', String(Math.min(0.6, o * 0.55 + (1 - sc) * 0.32)))
        el.style.setProperty('--cv', String((1 - o) * 0.82))
      }

      const f = Math.floor(s)
      const fr = s - f
      const a = yearPos(PROJECTS[mod(f, N)].month)
      const b = yearPos(PROJECTS[mod(f + 1, N)].month)
      const want = a + (b - a) * fr
      dotYear += (want - dotYear) * (1 - Math.exp(-14 * dt))
      if (dot.current) dot.current.style.left = `${dotYear * 100}%`

      if (ring.current) {
        const show = detailOpen ? 0 : sstep(Math.max(0, 1 - Math.abs(T - s) * 3))
        ring.current.style.transform = `translate(${W / 2 - d / 2 - 6}px, ${cy + H * 0.36}px) scale(${show})`
      }
    }
    gsap.ticker.add(tick)
    const ro = new ResizeObserver(measure)
    ro.observe(document.documentElement)

    // Pointer: tilt, hover, drag and click all live on the shelf
    let downX = 0
    let downT = 0
    let moved = false
    let vx = 0
    let lastX = 0
    let lastMoveT = 0
    const relOf = (v: number) => {
      const r = mod(v - s, TOTAL)
      return r >= TOTAL / 2 ? r - TOTAL : r
    }
    // Browsers do not hit-test zero-size 3D stacks reliably, so tapes are found from
    // their projected rectangles, nearest first
    const tapeAt = (x: number, y: number) => {
      let best = -1
      let bestZ = -Infinity
      for (let v = 0; v < TOTAL; v++) {
        const el = tapes.current[v]
        if (!el || el.style.display === 'none' || depth[v] <= bestZ) continue
        const face = el.querySelector(Math.abs(relOf(v)) < 0.5 ? '.cv' : '.sp')!
        const r = face.getBoundingClientRect()
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          best = v
          bestZ = depth[v]
        }
      }
      return best
    }
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY - wrap.getBoundingClientRect().top
      hover = tapeAt(e.clientX, e.clientY)
      const w = getDict().work
      shelf.dataset.cursorLabel = hover < 0 ? w.drag : Math.abs(relOf(hover)) < 0.5 ? w.open : PROJECTS[hover % N].title
      if (!dragging) return
      const dx = e.clientX - downX
      if (Math.abs(dx) > 5) moved = true
      if (!moved) return
      const now = performance.now()
      const ms = Math.max(1, now - lastMoveT)
      vx = vx * 0.6 + ((e.clientX - lastX) / ms) * 0.4
      lastX = e.clientX
      lastMoveT = now
      T = downT - dx / (ws + gap)
      touched()
    }
    const onDown = (e: PointerEvent) => {
      dragging = true
      moved = false
      downX = lastX = e.clientX
      lastMoveT = performance.now()
      vx = 0
      downT = T
      touched()
    }
    const onUp = (e: PointerEvent) => {
      const wasDrag = moved
      const wasDown = dragging
      dragging = false
      moved = false
      if (wasDrag) {
        // A flick carries on for a tape or two
        const fling = Math.max(-3, Math.min(3, (-vx * 220) / (ws + gap)))
        T = Math.round(T + fling)
        touched()
        return
      }
      if (!wasDown) return
      const v = tapeAt(e.clientX, e.clientY)
      if (v < 0) return
      if (Math.abs(relOf(v)) < 0.5) open()
      else step(Math.round(relOf(v)))
    }
    const onLeave = () => {
      mouse.x = mouse.y = -1
      hover = -1
    }
    // A sideways wheel or trackpad swipe turns the shelf. Plain vertical scrolling is
    // left to the page, so the section never traps you.
    const onWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (!dx) return
      e.preventDefault()
      e.stopPropagation()
      T += dx / 140
      touched()
      settleSoon()
    }
    wrap.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerleave', onLeave)
    shelf.addEventListener('pointerdown', onDown)
    shelf.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('pointerup', onUp)

    const onKey = (e: KeyboardEvent) => {
      if (!focused || detailOpen) return
      if (e.key === 'ArrowLeft') api.current.step(-1)
      else if (e.key === 'ArrowRight') api.current.step(1)
      else if (e.key === 'Enter' && (e.target as Element).tagName !== 'A' && (e.target as Element).tagName !== 'BUTTON') open()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      offLang()
      gsap.ticker.remove(tick)
      ro.disconnect()
      io.disconnect()
      window.clearTimeout(settle)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      shelf.removeEventListener('pointerdown', onDown)
      shelf.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // The detail poster for the next tapes can be warmed up while people browse
  useEffect(() => {
    const t = window.setTimeout(() => {
      PROJECTS.slice(0, 4).forEach((p) => {
        const i = new Image()
        i.src = `/work/${p.id}.webp`
      })
    }, 5000)
    return () => window.clearTimeout(t)
  }, [])

  const t = useT()
  useLang()
  const onTimeline = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - r.left) / r.width
    let best = 0
    let dist = 9
    PROJECTS.forEach((p, i) => {
      const dd = Math.abs(yearPos(p.month) - pos)
      if (dd < dist) {
        dist = dd
        best = i
      }
    })
    api.current.go(best)
  }

  return (
    <section ref={section} className="work" id="work" data-mor="work">
      <div ref={stageWrap} className="work-pin">
        <div ref={probe} className="work-probe" />
        <header className="work-head wrap">
          <p className="pixel">{t.work.kicker}</p>
          <p className="pixel work-hint">{t.work.hint}</p>
          <p className="pixel">{t.work.count(N)}</p>
        </header>

        <div className="halftone halftone-l" aria-hidden="true">{t.work.halftoneL.map((x, i) => <span key={i}>{x}</span>)}</div>
        <div className="halftone halftone-r" aria-hidden="true">{t.work.halftoneR.map((x, i) => <span key={i}>{x}</span>)}</div>
        <div className="floor" aria-hidden="true" />

        <div className="shelf" aria-hidden="true" data-cursor-label={t.work.drag}>
          <div ref={stage} className="stage">
            {copies.map((v) => (
              <Tape key={v} project={PROJECTS[v % N]} index={v} setRef={(el) => { tapes.current[v] = el }} />
            ))}
          </div>
        </div>

        <button ref={ring} className="ring" aria-label={t.work.openProject} onClick={() => api.current.open()}>
          <i />
        </button>

        <div className="caption" aria-live="polite">
          <div className="cap-line cap-title"><span ref={capTitle} /></div>
          <div className="cap-line cap-tag"><span ref={capTag} /></div>
          <i className="cap-rule" />
          <div className="cap-line cap-meta pixel"><span ref={capMeta} /></div>
        </div>

        <button className="shelf-arrow is-left" aria-label={t.work.prev} onClick={() => api.current.step(-1)}>
          <svg viewBox="0 0 25 12" width="25" height="12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 1 1 6l5 5M1 6h23" /></svg>
        </button>
        <button className="shelf-arrow is-right" aria-label={t.work.next} onClick={() => api.current.step(1)}>
          <svg viewBox="0 0 25 12" width="25" height="12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M19 1l5 5-5 5M24 6H1" /></svg>
        </button>

        <div className="timeline" aria-hidden="true" onClick={onTimeline} data-cursor>
          <div className="tl-line" />
          {MONTHS.map((m, i) => (
            <span key={m} className="tl-month" style={{ left: `${(i / MONTHS.length) * 100}%` }}>
              <i />
              <b>{monthName(m)}</b>
            </span>
          ))}
          {Array.from({ length: MONTHS.length * 4 }, (_, i) => (i % 4 ? <i key={i} className="tl-tick" style={{ left: `${(i / (MONTHS.length * 4)) * 100}%` }} /> : null))}
          <i ref={dot} className="tl-dot" />
        </div>

        <ol className="sr-only">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <a href={p.url}>{p.title}: {t.projects[p.id].tagline}</a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
