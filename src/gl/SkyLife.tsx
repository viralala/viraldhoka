import { useEffect, useRef } from 'react'
import { finePointer, gsap, palette as p, reduced } from '../lib/motion'

const PX = 3

type Bird = { x: number; y: number; vx: number; vy: number; phase: number }
type Kite = { x: number; y: number; home: number; hy: number; color: string; alt: string; phase: number; tail: { x: number; y: number }[] }

/** Pixel birds that scatter from the pointer, and kites that lean toward it. */
export function SkyLife({ closeRef }: { closeRef: React.RefObject<number> }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced) return
    const c = ref.current!
    const ctx = c.getContext('2d')!
    let W = 0
    let H = 0
    const resize = () => {
      W = c.width = Math.ceil(c.clientWidth / PX)
      H = c.height = Math.ceil(c.clientHeight / PX)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)

    const flock = (count: number, y: number, dir: number): Bird[] =>
      Array.from({ length: count }, (_, i) => ({
        x: (dir > 0 ? -30 : W + 30) - i * dir * (9 + Math.random() * 8),
        y: y + ((i % 3) - 1) * (4 + Math.random() * 6) + i * 1.2,
        vx: dir * (0.42 + Math.random() * 0.1),
        vy: 0,
        phase: Math.random() * 6,
      }))
    let birds = [...flock(9, H * 0.2, 1), ...flock(6, H * 0.68, -1)]

    // On phones the headline fills the width, so the kites stay up above it
    const narrow = W < 220
    const kites: Kite[] = [
      { x: W * 0.14, y: H * 0.2, home: 0.14, hy: narrow ? 0.14 : 0.26, color: p.pk3, alt: p.paper, phase: 0, tail: [] },
      { x: W * 0.86, y: H * 0.2, home: 0.86, hy: narrow ? 0.17 : 0.34, color: p.bl3, alt: p.paper, phase: 2.1, tail: [] },
      { x: W * 0.72, y: H * 0.16, home: narrow ? 0.56 : 0.72, hy: narrow ? 0.1 : 0.16, color: p.ink, alt: p.pk2, phase: 4, tail: [] },
    ]
    kites.forEach((k) => (k.tail = Array.from({ length: 9 }, () => ({ x: k.x, y: k.y }))))

    const mouse = { x: -999, y: -999 }
    const move = (e: PointerEvent) => {
      mouse.x = e.clientX / PX
      mouse.y = e.clientY / PX
    }
    if (finePointer) window.addEventListener('pointermove', move, { passive: true })

    const dot = (x: number, y: number, col: string) => {
      ctx.fillStyle = col
      ctx.fillRect(Math.round(x), Math.round(y), 1, 1)
    }

    const drawKite = (k: Kite, t: number) => {
      const size = 6
      const cx = Math.round(k.x)
      const cy = Math.round(k.y)
      for (let dy = -size; dy <= size; dy++) {
        const w = size - Math.abs(dy)
        for (let dx = -w; dx <= w; dx++) {
          ctx.fillStyle = dx * dy > 0 ? k.alt : k.color
          ctx.fillRect(cx + dx, cy + dy, 1, 1)
        }
      }
      // Tail ribbon trails behind with a little lag
      let px = k.x
      let py = k.y + size
      k.tail.forEach((s, i) => {
        s.x += (px - s.x) * 0.3
        s.y += (py + 2.4 - s.y) * 0.3
        px = s.x + Math.sin(t * 2.4 + i * 0.7 + k.phase) * 0.8
        py = s.y
        dot(s.x, s.y, i % 3 === 2 ? k.alt : k.color)
      })
    }

    let visible = true
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting))
    io.observe(c)

    const tick = () => {
      const close = closeRef.current
      if (!visible || close > 0.5) {
        ctx.clearRect(0, 0, W, H)
        return
      }
      const t = performance.now() / 1000
      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 1 - close * 2

      for (const b of birds) {
        const dx = b.x - mouse.x
        const dy = b.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 2600) {
          const f = (2600 - d2) / 2600
          b.vx += (dx / Math.sqrt(d2 + 1)) * f * 0.2
          b.vy += (dy / Math.sqrt(d2 + 1)) * f * 0.2
        }
        b.vy += Math.sin(t * 0.8 + b.phase) * 0.004
        b.vy *= 0.96
        const dir = Math.sign(b.vx) || 1
        b.vx += (dir * 0.46 - b.vx) * 0.02
        b.x += b.vx
        b.y += b.vy
        const up = Math.sin(t * 9 + b.phase) > 0
        const col = p.ink
        dot(b.x, b.y, col)
        dot(b.x - 1, b.y + (up ? -1 : 1), col)
        dot(b.x + 1, b.y + (up ? -1 : 1), col)
        dot(b.x - 2, b.y + (up ? -2 : 1), col)
        dot(b.x + 2, b.y + (up ? -2 : 1), col)
      }
      if (birds.every((b) => b.x > W + 40 || b.x < -40)) {
        const y = H * (0.14 + Math.random() * 0.2)
        const dir = Math.random() > 0.5 ? 1 : -1
        birds = [...flock(7 + ((Math.random() * 5) | 0), y, dir), ...flock(5, H * (0.62 + Math.random() * 0.2), -dir)]
      }

      for (const k of kites) {
        const tx = W * k.home + Math.sin(t * 0.5 + k.phase) * 16 + (mouse.x > 0 ? (mouse.x - W / 2) * 0.05 : 0)
        const ty = H * k.hy + Math.cos(t * 0.8 + k.phase) * 7 + (mouse.y > 0 ? (mouse.y - H / 2) * 0.04 : 0)
        k.x += (tx - k.x) * 0.04
        k.y += (ty - k.y) * 0.04
        // String: a slack curve down to the horizon
        ctx.fillStyle = 'rgba(27,35,80,0.32)'
        const ex = k.x + (k.home < 0.5 ? -44 : 44)
        for (let i = 0; i < 60; i++) {
          const u = i / 60
          const x = k.x + (ex - k.x) * u + Math.sin(u * 3.1) * 7
          const y = k.y + (H - k.y) * u
          if (i % 2 === 0) ctx.fillRect(Math.round(x), Math.round(y), 1, 1)
        }
        drawKite(k, t)
      }
      ctx.globalAlpha = 1
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', move)
      ro.disconnect()
      io.disconnect()
    }
  }, [closeRef])

  return <canvas ref={ref} className="skylife" aria-hidden="true" />
}
