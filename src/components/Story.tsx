import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PINS } from '../data/site'
import { Particles, type ParticleControl } from '../gl/Particles'
import { Sky } from '../gl/Sky'
import { SkyLife } from '../gl/SkyLife'
import { getLenis, gsap, onReady, palette as p, reduced, ScrollTrigger } from '../lib/motion'
import { INDIA_VIEWBOX, indiaLocations, NET, PIPE, PUNE_LATLON, puneXY, TARGET, type Graph } from '../lib/shapes'
import { getDict, useT } from '../i18n'
import { Arrow, jumpTo, Magnetic, Rise } from './Bits'
import { paintMor } from './Mor'
import { Apps, IdCard, SearchBar, Terminal, Win } from './StoryOS'

/**
 * Hero and night are one sticky stage, so nothing separates them: the clouds close
 * into navy, the pixels rise out of the dark, and the same particles carry the story.
 */
const SKY_SHARE = 0.17
const LAST = 4
const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

type Tab = 'front' | 'back' | 'ai'
const TAB_TARGET: Record<Tab, number> = { front: TARGET.CODE, back: TARGET.PIPE, ai: TARGET.NET }

/** Packets running along a graph. Same engine for the backend and the neural net. */
function GraphPulse({ graph, labels }: { graph: Graph; labels: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const t = useT()

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio, 2)
    let Q = 0
    const resize = () => {
      Q = c.clientWidth
      c.width = c.height = Math.round(Q * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)

    type Packet = { edge: [number, number]; t: number }
    const packets: Packet[] = []
    const flash = graph.nodes.map(() => 0)
    const fire = (node: number, spread = 1) => {
      flash[node] = 1
      for (const e of graph.edges) if (e[0] === node && Math.random() < spread && packets.length < 90) packets.push({ edge: e, t: 0 })
    }
    const first = graph.nodes.map((n, i) => (n.layer === 0 ? i : -1)).filter((i) => i >= 0)
    const spread = labels ? 1 : 0.42

    const onDown = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 512
      const y = ((e.clientY - r.top) / r.height) * 512
      let best = -1
      let dist = 46
      graph.nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - x, n.y - y)
        if (d < dist) {
          dist = d
          best = i
        }
      })
      if (best >= 0) fire(best, labels ? 1 : 0.8)
    }
    c.addEventListener('pointerdown', onDown)

    let last = 0
    const tick = () => {
      const now = performance.now()
      if (now - last > 1500 && !reduced) {
        last = now
        fire(first[(Math.random() * first.length) | 0], spread)
      }
      const s = (Q / 512) * dpr
      ctx.clearRect(0, 0, c.width, c.height)
      for (let i = packets.length - 1; i >= 0; i--) {
        const k = packets[i]
        k.t += labels ? 0.022 : 0.03
        const a = graph.nodes[k.edge[0]]
        const b = graph.nodes[k.edge[1]]
        const x = (a.x + (b.x - a.x) * k.t) * s
        const y = (a.y + (b.y - a.y) * k.t) * s
        ctx.fillStyle = p.pk3
        const size = (labels ? 11 : 7) * dpr
        ctx.fillRect(Math.round(x - size / 2), Math.round(y - size / 2), size, size)
        if (k.t >= 1) {
          packets.splice(i, 1)
          fire(k.edge[1], spread)
        }
      }
      graph.nodes.forEach((n, i) => {
        flash[i] *= 0.92
        if (flash[i] > 0.06) {
          ctx.fillStyle = `rgba(246, 191, 213, ${flash[i] * 0.8})`
          const size = (labels ? 86 : 50) * s
          ctx.fillRect(n.x * s - size / 2, n.y * s - size / 2, size, size)
        }
        if (labels && n.label) {
          ctx.fillStyle = p.onNight
          ctx.font = `${12 * dpr}px Silkscreen, 'Tiro Devanagari Hindi', 'Microsoft YaHei', 'Yu Gothic', sans-serif`
          ctx.textAlign = 'center'
          const words = getDict().story.graph as Record<string, string>
          ctx.fillText((words[n.label] ?? n.label).toUpperCase(), n.x * s, n.y * s + 58 * s + 6 * dpr)
        }
      })
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      c.removeEventListener('pointerdown', onDown)
      ro.disconnect()
    }
  }, [graph, labels])

  return <canvas ref={ref} className="graph" data-cursor-label={labels ? t.story.graph.send : t.story.graph.fire} aria-hidden="true" />
}

export function Story() {
  const t = useT()
  const st_ = t.story
  const stage = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const globePin = useRef<HTMLDivElement>(null)
  const mor = useRef<HTMLCanvasElement>(null)
  const close = useRef(0)
  const progress = useRef(0)
  const st = useRef<ScrollTrigger | null>(null)
  const control = useRef<ParticleControl>({
    from: TARGET.GLOBE, to: TARGET.GLOBE, t: 0, spread: 1, offsetX: 0.5, offsetY: 0, scale: 0.8,
    rot: [1, 0, 0, 0, 1, 0, 0, 0, 1], sphereA: 1, sphereB: 1,
  })
  const panels = useRef<(HTMLDivElement | null)[]>([])
  const tabState = useRef({ now: TAB_TARGET.front, prev: TAB_TARGET.front, mix: 1 })

  const [active, setActive] = useState(-1)
  const [tab, setTab] = useState<Tab>('front')
  const [pinId, setPinId] = useState('vit')
  const [hoverState, setHoverState] = useState('')

  const spin = useRef({
    a: -(PUNE_LATLON.lon * Math.PI) / 180 - 0.4,
    b: 0.3,
    va: 0,
    drag: false,
    px: 0,
    py: 0,
  })

  const goStep = useCallback((i: number) => {
    const t = st.current
    if (!t) return
    const story = (i + 0.4) / (LAST + 0.75)
    const prog = SKY_SHARE + (1 - SKY_SHARE) * story
    const y = t.start + prog * (t.end - t.start)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y, { duration: 1.6 })
    else window.scrollTo(0, y)
  }, [])

  const chooseTab = (id: Tab) => {
    if (id === tab) return
    setTab(id)
    const s = tabState.current
    s.prev = s.now
    s.now = TAB_TARGET[id]
    s.mix = 0
    gsap.killTweensOf(s)
    gsap.to(s, { mix: 1, duration: reduced ? 0 : 1.15, ease: 'power2.inOut' })
  }

  useLayoutEffect(() => {
    let off = () => {}
    let visible = true
    let lastActive = -2
    const phi = (PUNE_LATLON.lat * Math.PI) / 180
    const lam = (PUNE_LATLON.lon * Math.PI) / 180
    const home = -lam
    const pv = [Math.cos(phi) * Math.sin(lam), Math.sin(phi), Math.cos(phi) * Math.cos(lam)]

    const frame = () => {
      if (!visible) return
      const prog = progress.current
      const sky = Math.min(1, prog / SKY_SHARE)
      const story = Math.max(0, (prog - SKY_SHARE) / (1 - SKY_SHARE))
      close.current = sky

      if (!reduced && copy.current) {
        const fade = Math.min(1, sky / 0.45)
        copy.current.style.opacity = String(1 - fade)
        copy.current.style.transform = `translate3d(0, ${-fade * 90}px, 0)`
        copy.current.style.visibility = fade >= 1 ? 'hidden' : 'visible'
      }

      const isNight = sky > 0.62 && prog < 0.995
      document.documentElement.classList.toggle('is-night', isNight)
      if (isNight) pin.current?.setAttribute('data-dark', '')
      else pin.current?.removeAttribute('data-dark')

      // A short hold at each end, so the first and last panels get time to be read
      const s = Math.max(0, Math.min(LAST, story * (LAST + 0.75) - 0.4))
      const i = Math.min(LAST - 1, Math.floor(s))
      const f = s - i
      const e = smooth(0.34, 0.66, f)

      const tgt = (n: number) => [TARGET.GLOBE, TARGET.INDIA, TARGET.PUNE, tabState.current.now, TARGET.SUN][n]
      const c = control.current
      const ts = tabState.current
      if (i === 3 && e === 0 && ts.mix < 1) {
        c.from = ts.prev
        c.to = ts.now
        c.t = ts.mix
      } else if (s === LAST) {
        c.from = c.to = tgt(LAST)
        c.t = 0
      } else {
        c.from = tgt(i)
        c.to = tgt(i + 1)
        c.t = e
      }
      c.sphereA = i === 0 ? 1 : 0
      c.sphereB = 0
      c.spread = 1 - smooth(0.86, 1.12, sky + story * 2.4)

      // The globe turns itself to face Pune before it dissolves into the map
      const sp = spin.current
      if (!sp.drag) {
        sp.a += sp.va
        sp.va *= 0.95
        if (!reduced) sp.a -= 0.0015
      }
      const focus = i === 0 ? smooth(0.02, 0.6, s) : 1
      const wrap = Math.atan2(Math.sin(home - sp.a), Math.cos(home - sp.a))
      const a = sp.a + wrap * focus
      const b = sp.b + (phi - sp.b) * focus
      const ca = Math.cos(a)
      const sa = Math.sin(a)
      const cb = Math.cos(b)
      const sb = Math.sin(b)
      c.rot = [ca, 0, sa, sb * sa, cb, -sb * ca, -cb * sa, sb, cb * ca]

      const scales = [0.8 * (1 + focus * 0.34), 0.86, 0.88, 0.8, 0.8]
      c.scale = scales[i] + (scales[Math.min(LAST, i + 1)] - scales[i]) * e

      // The shape swaps sides with the copy, so each panel keeps a clear column
      const el = pin.current!
      const w = el.clientWidth
      const h = el.clientHeight
      const side = (n: number) => (n % 2 === 0 ? 1 : -1)
      if (w >= 900) {
        c.offsetX = (side(i) + (side(i + 1) - side(i)) * e) * 0.5
        c.offsetY = 0
      } else {
        c.offsetX = 0
        c.offsetY = 0.76
      }

      // DOM overlays share the particle coordinate system exactly
      const S = Math.min(w, h)
      const Q = c.scale * S
      const ox = w / 2 + (c.offsetX * S) / 2
      const oy = h / 2 - (c.offsetY * S) / 2
      const box = overlay.current!
      box.style.width = box.style.height = `${Q}px`
      box.style.transform = `translate3d(${ox - Q / 2}px, ${oy - Q / 2}px, 0)`

      if (globePin.current) {
        const r = c.rot
        const x = r[0] * pv[0] + r[1] * pv[1] + r[2] * pv[2]
        const y = r[3] * pv[0] + r[4] * pv[1] + r[5] * pv[2]
        const z = r[6] * pv[0] + r[7] * pv[1] + r[8] * pv[2]
        globePin.current.style.transform = `translate3d(${((x + 1) / 2) * Q}px, ${((1 - y) / 2) * Q}px, 0)`
        globePin.current.style.opacity = z > 0.08 && c.spread < 0.2 && s < 0.5 ? '1' : '0'
      }

      const near = Math.round(s)
      const on = Math.abs(s - near) < 0.32 && sky >= 1 ? near : -1
      if (on !== lastActive) {
        lastActive = on
        setActive(on)
      }

      panels.current.forEach((pEl, n) => {
        if (!pEl) return
        const d = Math.abs(s - n)
        const o = sky < 1 ? 0 : Math.max(0, Math.min(1, (0.36 - d) / 0.1))
        pEl.style.opacity = String(o)
        pEl.style.transform = `translate3d(0, ${(s - n) * -90}px, 0)`
        pEl.style.visibility = o < 0.01 ? 'hidden' : 'visible'
      })
    }

    frame()
    st.current = ScrollTrigger.create({
      trigger: stage.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => (progress.current = self.progress),
      onRefresh: (self) => (progress.current = self.progress),
    })
    gsap.ticker.add(frame)
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
      if (!visible) document.documentElement.classList.remove('is-night')
    })
    io.observe(pin.current!)

    if (!reduced) {
      const items = '.hero-sub, .hero-actions, .hero-cue'
      gsap.set(items, { y: 24, opacity: 0 })
      off = onReady(() => gsap.to(items, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.1, delay: 0.55 }))
    }
    return () => {
      off()
      gsap.ticker.remove(frame)
      io.disconnect()
      st.current?.kill()
      document.documentElement.classList.remove('is-night')
    }
  }, [])

  useEffect(() => {
    if (mor.current) paintMor(mor.current)
  }, [active])

  const onGlobeDown = (e: React.PointerEvent) => {
    const sp = spin.current
    sp.drag = true
    sp.px = e.clientX
    sp.py = e.clientY
    sp.va = 0
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }
  const onGlobeMove = (e: React.PointerEvent) => {
    const sp = spin.current
    if (!sp.drag) return
    const dx = e.clientX - sp.px
    sp.a += dx * 0.006
    sp.va = dx * 0.006
    sp.b = Math.max(-0.9, Math.min(0.9, sp.b + (e.clientY - sp.py) * 0.004))
    sp.px = e.clientX
    sp.py = e.clientY
  }
  const onGlobeUp = () => {
    spin.current.drag = false
  }

  const currentPin = PINS.find((x) => x.id === pinId)!
  const pinText = t.pins[currentPin.id]
  const stateName = (name: string) => t.states[name] ?? name
  const [mx, my] = puneXY(currentPin.lat, currentPin.lon)

  return (
    <section ref={stage} className="story" id="top">
      <i className="story-mark" data-mor="hero" style={{ top: 0, height: '100vh' }} />
      <i className="story-mark" id="about" data-mor="night" style={{ top: '130vh', bottom: 0 }} />
      <div ref={pin} className="story-pin">
        <Sky closeRef={close} />
        <SkyLife closeRef={close} />
        <Particles control={control} />

        <div ref={overlay} className="overlay">
          {active === 0 && (
            <div
              className="globe-drag"
              data-cursor-label={st_.drag}
              onPointerDown={onGlobeDown}
              onPointerMove={onGlobeMove}
              onPointerUp={onGlobeUp}
              onPointerCancel={onGlobeUp}
            />
          )}
          <div ref={globePin} className="globe-pin">
            <i />
            <span className="pixel">{st_.pune}</span>
          </div>

          {active === 1 && (
            <svg className="india" viewBox={INDIA_VIEWBOX} role="group" aria-label={st_.zoom.map}>
              {indiaLocations.map((l) => (
                <path
                  key={l.id}
                  d={l.path}
                  className={l.name === 'Maharashtra' ? 'is-home' : ''}
                  data-cursor-label={l.name === 'Maharashtra' ? st_.zoom.zoomIn : stateName(l.name)}
                  onPointerEnter={() => setHoverState(l.name)}
                  onPointerLeave={() => setHoverState('')}
                  onClick={() => (l.name === 'Maharashtra' ? goStep(2) : setHoverState(l.name))}
                />
              ))}
            </svg>
          )}

          {active === 2 && (
            <>
              {PINS.map((x) => {
                const [px, py] = puneXY(x.lat, x.lon)
                return (
                  <button
                    key={x.id}
                    className={`map-pin ${x.id === pinId ? 'is-on' : ''}`}
                    style={{ left: `${(px / 512) * 100}%`, top: `${(py / 512) * 100}%` }}
                    onClick={() => setPinId(x.id)}
                    aria-label={x.name}
                    aria-pressed={x.id === pinId}
                  >
                    <i />
                    <span className="pixel">{x.name}</span>
                  </button>
                )
              })}
              <canvas
                ref={mor}
                className="map-mor"
                width={40}
                height={24}
                style={{ left: `${(mx / 512) * 100}%`, top: `${(my / 512) * 100}%` }}
                aria-hidden="true"
              />
            </>
          )}

          {active === 3 && tab === 'back' && <GraphPulse graph={PIPE} labels />}
          {active === 3 && tab === 'ai' && <GraphPulse graph={NET} labels={false} />}
        </div>

        <div ref={copy} className="hero-copy wrap">
          <Rise as="h1" className="display hero-title" text={t.hero.title} delay={0.15} />
          <p className="hero-sub lead">{t.hero.sub}</p>
          <div className="hero-actions">
            <Magnetic>
              <a className="btn btn-ink" href="#work" onClick={(e) => { e.preventDefault(); jumpTo('work', t.nav.work) }}>
                {t.hero.cta}
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn-round" href="#work" aria-label={t.hero.jump} onClick={(e) => { e.preventDefault(); jumpTo('work', t.nav.work) }}>
                <Arrow />
              </a>
            </Magnetic>
          </div>
          <p className="hero-cue pixel">{t.hero.scroll} <i /></p>
        </div>

        <div ref={(el) => { panels.current[0] = el }} className="panel">
          <Win app="maps" go={goStep} tone="blue">
            <SearchBar text={st_.where.title} on={active === 0} />
            <p className="pixel panel-kicker">{st_.where.kicker}</p>
            <h2 className="display panel-title">{st_.where.title}</h2>
            <p className="panel-body">{st_.where.body}</p>
            <p className="pixel panel-data">{st_.coords}</p>
          </Win>
        </div>

        <div ref={(el) => { panels.current[1] = el }} className="panel is-right">
          <Win app="maps" title={st_.os.mapsIndia} go={goStep} tone="blue">
            <p className="pixel panel-kicker">{st_.zoom.kicker}</p>
            <h2 className="display panel-title">{stateName(hoverState || 'Maharashtra')}</h2>
            <p className="panel-body">{st_.zoom.body}</p>
            <button className="btn btn-ink" onClick={() => goStep(2)}>{st_.zoom.cta} <Arrow /></button>
          </Win>
        </div>

        <div ref={(el) => { panels.current[2] = el }} className="panel">
          <Win app="id" go={goStep}>
            <p className="pixel panel-kicker">{st_.study.kicker}</p>
            <IdCard pinId={pinId} />
            <p className="panel-body">{st_.study.body}</p>
            <div className="chips" role="group" aria-label={st_.study.places}>
              {PINS.map((x) => (
                <button key={x.id} className={`chip-light ${x.id === pinId ? 'is-on' : ''}`} onClick={() => setPinId(x.id)} aria-pressed={x.id === pinId}>
                  {x.name}
                </button>
              ))}
            </div>
            <p className="panel-note" key={currentPin.id}>
              <b className="pixel">{pinText.place}</b> {pinText.note}
            </p>
          </Win>
        </div>

        <div ref={(el) => { panels.current[3] = el }} className="panel is-right">
          <Win app="term" go={goStep} tone="night">
            <p className="pixel panel-kicker">{st_.build.kicker}</p>
            <Terminal tab={tab} onTab={chooseTab} />
          </Win>
        </div>

        <div ref={(el) => { panels.current[4] = el }} className="panel">
          <Win app="apps" go={goStep}>
            <Apps />
          </Win>
        </div>
      </div>
    </section>
  )
}
