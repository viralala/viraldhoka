import { useEffect, useRef } from 'react'
import { gsap, palette as p, reduced } from '../lib/motion'

type Wipe = { cover: (label?: string) => Promise<void>; reveal: () => Promise<void> }

export const wipe: Wipe = { cover: async () => {}, reveal: async () => {} }

const CELL = 48

/** The page transition: a sweep of pixels moving saffron, green, then night. */
export function PixelWipe() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const tag = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const c = canvas.current!
    const ctx = c.getContext('2d')!
    let cols = 0
    let rows = 0
    let seeds: number[] = []
    const st = { p: 0, out: 0 }

    const checker = (color: string) => {
      const t = document.createElement('canvas')
      t.width = t.height = 8
      const x = t.getContext('2d')!
      x.fillStyle = color
      x.fillRect(0, 0, 4, 4)
      x.fillRect(4, 4, 4, 4)
      return ctx.createPattern(t, 'repeat')!
    }
    let dither: CanvasPattern

    const resize = () => {
      c.width = window.innerWidth
      c.height = window.innerHeight
      cols = Math.ceil(c.width / CELL)
      rows = Math.ceil(c.height / CELL)
      seeds = Array.from({ length: cols * rows }, () => Math.random())
      dither = checker(p.s3)
      draw()
    }

    const stageOf = (local: number) => (local <= 0 ? 0 : local < 0.3 ? 1 : local < 0.55 ? 2 : local < 0.8 ? 3 : 4)

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const t = (x / cols) * 0.62 + seeds[y * cols + x] * 0.38
          const inn = Math.max(0, Math.min(1, (st.p * 1.5 - t) / 0.5))
          const gone = Math.max(0, Math.min(1, (st.out * 1.5 - t) / 0.5))
          const s = stageOf(inn - gone)
          if (!s) continue
          ctx.fillStyle = s === 1 ? dither : s === 2 ? p.s2 : s === 3 ? p.g2 : p.night
          ctx.fillRect(x * CELL, y * CELL, CELL, CELL)
        }
      }
    }

    resize()
    window.addEventListener('resize', resize)

    wipe.cover = (label = '') =>
      new Promise((res) => {
        st.p = 0
        st.out = 0
        if (reduced) {
          st.p = 1
          draw()
          res()
          return
        }
        tag.current!.textContent = label
        gsap.to(st, { p: 1, duration: 0.72, ease: 'power2.inOut', onUpdate: draw, onComplete: () => res() })
        gsap.fromTo(tag.current, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.42, duration: 0.01 })
      })

    wipe.reveal = () =>
      new Promise((res) => {
        st.p = 1
        if (reduced) {
          st.out = 1
          draw()
          res()
          return
        }
        gsap.to(tag.current, { autoAlpha: 0, duration: 0.01, delay: 0.1 })
        gsap.to(st, { out: 1, duration: 0.82, ease: 'power2.inOut', onUpdate: draw, onComplete: () => res() })
      })

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <>
      <canvas ref={canvas} className="wipe" aria-hidden="true" />
      <div ref={tag} className="wipe-tag" aria-hidden="true" />
    </>
  )
}
