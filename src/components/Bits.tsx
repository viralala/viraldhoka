import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { finePointer, getLenis, gsap, onReady, palette as p, reduced, ScrollTrigger, scrollVelocity } from '../lib/motion'
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
      {lines.map((line, i) => (
        <span className="line" key={i} aria-hidden="true">
          {line.split(' ').map((w, j) => (
            <span className="w" key={j}>
              <span>{w}</span>{' '}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

/** Words fade up from faint to full as the paragraph scrolls past. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
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
  }, [])
  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </p>
  )
}

export function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduced) return
    const el = track.current!
    let x = 0
    let dir = -1
    let skew = 0
    const tick = () => {
      const v = scrollVelocity()
      if (Math.abs(v) > 0.5) dir = v > 0 ? -1 : 1
      x += dir * (1.1 + Math.min(Math.abs(v) * 0.28, 16))
      const half = el.scrollWidth / 2
      if (x <= -half) x += half
      if (x > 0) x -= half
      skew += (Math.max(-8, Math.min(8, v * 0.28)) - skew) * 0.1
      el.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])
  const row = [...items, ...items, ...items]
  return (
    <div className="marquee" aria-label={items.join(', ')}>
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
  const time = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now)
  const h = Number(time.slice(0, 2))
  const day = h >= 6 && h < 19
  return (
    <span className="clock pixel">
      <i className="clock-dot" style={{ background: day ? p.s3 : p.g2 }} />
      Pune {time} IST
    </span>
  )
}
