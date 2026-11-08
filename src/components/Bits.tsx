import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { finePointer, getLenis, gsap, onReady, palette as p, reduced, ScrollTrigger, scrollVelocity } from '../lib/motion'
import { fmtNum, getLocale, splitWords, useLang, useT } from '../i18n'
import { wipe } from './PixelWipe'

/** Long jumps through the page go through the pixel wipe instead of scrolling past everything. */
export async function jumpTo(id: string, label: string) {
  const el = document.getElementById(id)
  if (!el) return
  await wipe.cover(label)
  const y = el.getBoundingClientRect().top + window.scrollY
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true })
  else window.scrollTo(0, y)
  await new Promise((r) => setTimeout(r, 120))
  await wipe.reveal()
}

export function Magnetic({ children, strength = 0.32 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!finePointer || reduced) return
    const el = ref.current!
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * strength)
      y((e.clientY - r.top - r.height / 2) * strength)
    }
    const leave = () => {
      x(0)
      y(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  )
}

export function Arrow() {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M4 2h8v8h-2V5.4L3.4 12 2 10.6 8.6 4H4z" />
    </svg>
  )
}

/** Splits a line into masked words that rise on entrance. */
export function Rise({ text, as: Tag = 'span', className, delay = 0, onScroll = false }: { text: string; as?: 'span' | 'h1' | 'h2' | 'p'; className?: string; delay?: number; onScroll?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const words = ref.current!.querySelectorAll('.w > span')
    if (reduced) return
    gsap.set(words, { yPercent: 118, rotate: 5 })
    const play = () =>
      gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.25, ease: 'expo.out', stagger: 0.07, delay })
    if (onScroll) {
      const st = ScrollTrigger.create({ trigger: ref.current, start: 'top 86%', once: true, onEnter: play })
      return () => st.kill()
    }
    return onReady(play)
  }, [delay, onScroll])
  const lines = text.split('\n')
  return (
    <Tag ref={ref as never} className={className} aria-label={text.replace('\n', ' ')}>
      {lines.map((line, i) => {
        const { parts, joiner } = splitWords(line)
        return (
          <span className="line" key={i} aria-hidden="true">
            {parts.map((w, j) => (
              <span className="w" key={j}>
                <span>{w}</span>{joiner}
              </span>
            ))}
          </span>
        )
      })}
    </Tag>
  )
}

/** A number that counts up when it scrolls into view. */
export function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useRef(reduced ? to : 0)
  const lang = useLang()
  // A new language reformats the number where it stands, without restarting the count
  useEffect(() => {
    ref.current!.textContent = fmtNum(shown.current) + suffix
  }, [lang, suffix])
  useLayoutEffect(() => {
    const el = ref.current!
    const fmt = (n: number) => fmtNum(n) + suffix
    el.textContent = fmt(reduced ? to : 0)
    if (reduced) return
    const s = { v: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 96%',
      once: true,
      onEnter: () =>
        gsap.to(s, {
          v: to,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            shown.current = s.v
            el.textContent = fmt(s.v)
          },
        }),
    })
    return () => st.kill()
  }, [to, suffix])
  return <span ref={ref} />
}

/** A small burst of pixels from a point on screen, for moments worth celebrating. */
export function pixelBurst(x: number, y: number, count = 44) {
  if (reduced) return
  const c = document.createElement('canvas')
  c.className = 'burst'
  c.width = window.innerWidth
  c.height = window.innerHeight
  document.body.appendChild(c)
  const ctx = c.getContext('2d')!
  const colors = [p.pk3, p.bl3, p.pk2, p.bl2, p.ink]
  const bits = Array.from({ length: count }, (_, i) => {
    const a = Math.random() * Math.PI * 2
    const v = 3 + Math.random() * 7
    return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, s: 4 + ((Math.random() * 3) | 0) * 2, c: colors[i % colors.length] }
  })
  const start = performance.now()
  const frame = (now: number) => {
    const k = (now - start) / 950
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.globalAlpha = Math.max(0, 1 - k * k)
    for (const b of bits) {
      b.x += b.vx
      b.y += b.vy
      b.vy += 0.42
      b.vx *= 0.97
      ctx.fillStyle = b.c
      ctx.fillRect(Math.round(b.x / 4) * 4, Math.round(b.y / 4) * 4, b.s, b.s)
    }
    if (k < 1) requestAnimationFrame(frame)
    else c.remove()
  }
  requestAnimationFrame(frame)
}

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/+<>#'

/** Pixel labels decode themselves when they scroll in, and again when you hover them. */
export function Scramble({ text, className, as: Tag = 'p' }: { text: string; className?: string; as?: 'p' | 'span' }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current!
    el.textContent = text
    if (reduced) return
    let raf = 0
    const run = () => {
      cancelAnimationFrame(raf)
      const start = performance.now()
      const len = text.length
      const frame = (now: number) => {
        const k = Math.min(1, (now - start) / 620)
        const fixed = Math.floor(k * len)
        let out = text.slice(0, fixed)
        for (let i = fixed; i < len; i++) out += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        el.textContent = out
        if (k < 1) raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: run })
    el.addEventListener('pointerenter', run)
    return () => {
      cancelAnimationFrame(raf)
      st.kill()
      el.removeEventListener('pointerenter', run)
    }
  }, [text])
  return (
    <Tag className={className}>
      <span ref={ref as never} aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </Tag>
  )
}

/** Words fade up from faint to full as the paragraph scrolls past. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { parts, joiner } = splitWords(text)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll('span'),
        { opacity: 0.13 },
        { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 78%', end: 'bottom 48%', scrub: 0.6 } },
      )
    })
    return () => ctx.revert()
  }, [text])
  return (
    <p ref={ref} className={className}>
      {parts.map((w, i) => (
        <span key={i}>{w}{joiner}</span>
      ))}
    </p>
  )
}

/** The ribbon's wave: wavelength in px and how fast it travels */
const WAVE_K = 260
const WAVE_T = 900

export function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null)
  const ribbon = useRef<SVGPathElement>(null)
  useEffect(() => {
    if (reduced) return
    const el = track.current!
    const box = el.parentElement!
    let x = 0
    let dir = -1
    let skew = 0
    const items_ = Array.from(el.children) as HTMLElement[]
    // Sizes are read once (and on resize) so the wave never forces a layout per frame
    let mids: number[] = []
    let amp = 0
    let W = 0
    let cy = 0
    let half = 0
    const measure = () => {
      mids = items_.map((it) => it.offsetLeft + it.offsetWidth / 2)
      W = box.clientWidth
      cy = el.offsetTop + el.offsetHeight / 2
      // The ribbon hugs the text with a little margin
      half = items_[0].offsetHeight * 0.36
      amp = half * 0.55
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const tick = () => {
      const v = scrollVelocity()
      if (Math.abs(v) > 0.5) dir = v > 0 ? -1 : 1
      x += dir * (1.1 + Math.min(Math.abs(v) * 0.28, 16))
      const wrap = el.scrollWidth / 2
      if (x <= -wrap) x += wrap
      if (x > 0) x -= wrap
      skew += (Math.max(-8, Math.min(8, v * 0.28)) - skew) * 0.1
      el.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`
      const ph = performance.now() / WAVE_T
      // Each word sits on the wave and leans with its slope
      items_.forEach((it, i) => {
        const a = (mids[i] + x) / WAVE_K + ph
        const tilt = Math.atan((amp / WAVE_K) * Math.cos(a)) * (180 / Math.PI)
        it.style.transform = `translateY(${Math.sin(a) * amp}px) rotate(${tilt}deg)`
      })
      // One continuous ribbon behind them, so there are no seams between words
      let top = ''
      let bot = ''
      for (let sx = -20; sx <= W + 20; sx += 12) {
        const y = cy + Math.sin(sx / WAVE_K + ph) * amp
        top += `${top ? 'L' : 'M'}${sx},${(y - half).toFixed(1)}`
        bot = `L${sx},${(y + half).toFixed(1)}` + bot
      }
      ribbon.current?.setAttribute('d', `${top}${bot}Z`)
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
    }
  }, [])
  const row = [...items, ...items, ...items]
  return (
    <div className="marquee" aria-label={items.join(', ')}>
      <svg className="marquee-ribbon" aria-hidden="true"><path ref={ribbon} /></svg>
      <div className="marquee-track" ref={track} aria-hidden="true">
        {[...row, ...row].map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <i className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

/** A staircase of dithered pixels between two section colours. */
export function DitherEdge({ from, to, height = 112 }: { from: string; to: string; height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const draw = () => {
      const px = 8
      const w = Math.ceil(c.clientWidth / px)
      const h = Math.ceil(height / px)
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      ctx.fillStyle = from
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = to
      const b = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
          const wave = 0.16 * Math.sin(x * 0.11) + 0.09 * Math.sin(x * 0.37 + 2)
          if (y / h + wave > (b[(y % 4) * 4 + (x % 4)] + 0.5) / 16) ctx.fillRect(x, y, 1, 1)
        }
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(c)
    return () => ro.disconnect()
  }, [from, to, height])
  return <canvas ref={ref} className="dither-edge" style={{ height }} aria-hidden="true" />
}

export function PuneClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(t)
  }, [])
  const t = useT()
  const time = new Intl.DateTimeFormat(getLocale(), { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(now)
  const h = puneHour(now)
  const day = h >= 6 && h < 19
  return (
    <span className="clock pixel">
      <i className="clock-dot" style={{ background: day ? p.pk3 : p.bl2 }} />
      {t.clock(time)}
    </span>
  )
}

/** The hour in Pune, 0 to 23, whatever language the page is in. */
export function puneHour(d: Date) {
  return Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', hourCycle: 'h23' }).format(d))
}
