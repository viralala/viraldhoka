import { useEffect, useRef } from 'react'
import { finePointer, gsap, reduced } from '../lib/motion'

const GRID = 8
const TRAIL = 7
const HOT = 'a,button,[data-cursor],input,label'

/**
 * Pixel cursor. The square is moved straight from the pointer event, so it never
 * trails behind your hand. A short pool of cells gives the dither wake, and a
 * reticle snaps onto whatever you can click. Everything is transforms, nothing repaints.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLDivElement>(null)
  const cells = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!finePointer || reduced) return
    document.documentElement.classList.add('has-cursor')
    const pos = { x: -100, y: -100 }
    const box = { x: 0, y: 0, w: 0, h: 0, on: false }
    let hot: Element | null = null
    let text = ''
    let next = 0
    let lastCell = ''

    const place = () => {
      const t = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      dot.current!.style.transform = t
      label.current!.style.transform = t
    }

    const read = (el: Element | null) => {
      if (!el || !el.closest) return
      root.current!.classList.toggle('is-dark', !!el.closest('[data-dark]'))
      hot = el.closest(HOT)
      const want = el.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') ?? ''
      if (want !== text) {
        text = want
        label.current!.textContent = text
        root.current!.classList.toggle('has-label', !!text)
      }
    }

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      place()
      const gx = Math.floor(pos.x / GRID) * GRID
      const gy = Math.floor(pos.y / GRID) * GRID
      const key = `${gx},${gy}`
      if (key !== lastCell) {
        lastCell = key
        const cell = cells.current[next]!
        next = (next + 1) % TRAIL
        cell.style.transform = `translate3d(${gx}px, ${gy}px, 0)`
        cell.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'steps(3)', fill: 'forwards' })
      }
      read(e.target as Element | null)
    }
    const onDown = () => root.current!.classList.add('is-down')
    const onUp = () => root.current!.classList.remove('is-down')
    const onLeave = () => root.current!.classList.add('is-out')
    const onEnter = () => root.current!.classList.remove('is-out')

    // The page can move under a still pointer, so the reticle re-reads it each few frames
    let frameCount = 0
    const tick = () => {
      if (++frameCount % 6 === 0 && pos.x > 0) read(document.elementFromPoint(pos.x, pos.y))
      const show = !!hot && hot.isConnected && !text
      root.current!.classList.toggle('is-hot', show)
      if (!show) {
        box.on = false
        return
      }
      const r = hot!.getBoundingClientRect()
      const pad = 6
      const tx = r.left - pad
      const ty = r.top - pad
      const tw = r.width + pad * 2
      const th = r.height + pad * 2
      if (!box.on) {
        box.x = pos.x
        box.y = pos.y
        box.w = 0
        box.h = 0
        box.on = true
      }
      box.x += (tx - box.x) * 0.45
      box.y += (ty - box.y) * 0.45
      box.w += (tw - box.w) * 0.45
      box.h += (th - box.h) * 0.45
      const f = frame.current!
      f.style.transform = `translate3d(${box.x}px, ${box.y}px, 0)`
      f.style.width = `${box.w}px`
      f.style.height = `${box.h}px`
    }

    gsap.ticker.add(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  if (!finePointer || reduced) return null
  return (
    <div ref={root} className="cursor" aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, i) => (
        <i key={i} ref={(el) => { cells.current[i] = el }} className={`cursor-cell ${i % 2 ? 'is-green' : ''}`} />
      ))}
      <div ref={frame} className="cursor-frame"><b /><b /><b /><b /></div>
      <div ref={dot} className="cursor-dot"><i /></div>
      <div ref={label} className="cursor-label" />
    </div>
  )
}
