import { useEffect, useRef, useState } from 'react'
import { CONTACT, SOCIALS } from '../data/site'
import { Sky } from '../gl/Sky'
import { finePointer, gsap, onReady, palette as p, reduced, ScrollTrigger } from '../lib/motion'
import { drawFan, fanOnPaper } from '../lib/shapes'
import { Arrow, jumpTo, Magnetic, PuneClock } from './Bits'
import { morSay } from './Mor'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'wins', label: 'Wins' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current!
    gsap.set(el, { yPercent: -160 })
    const off = onReady(() => gsap.to(el, { yPercent: 0, duration: 1, delay: 0.9, ease: 'expo.out' }))
    let shown = true
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (s) => {
        const want = s.direction < 0 || s.scroll() < 200
        if (want !== shown) {
          shown = want
          gsap.to(el, { yPercent: want ? 0 : -160, duration: 0.6, ease: 'expo.out', overwrite: 'auto' })
        }
      },
    })
    return () => {
      off()
      st.kill()
    }
  }, [])
  return (
    <header ref={ref} className="nav">
      <nav className="nav-pill" aria-label="Main">
        <a className="nav-mark" href="#top" onClick={(e) => { e.preventDefault(); jumpTo('top', 'Viral Dhoka') }}>
          Viral Dhoka
        </a>
        {LINKS.map((l) => (
          <a key={l.id} className="nav-link" href={`#${l.id}`} onClick={(e) => { e.preventDefault(); jumpTo(l.id, l.label) }}>
            {l.label}
          </a>
        ))}
      </nav>
      <PuneClock />
    </header>
  )
}

/** The big hatched peacock. Its lines drift, and lean toward the pointer. */
function HatchFan() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const mask = document.createElement('canvas')
    let w = 0
    let h = 0
    const size = () => {
      w = c.width = Math.round(c.clientWidth)
      h = c.height = Math.round(c.clientHeight)
      mask.width = w
      mask.height = h
      drawFan(mask.getContext('2d')!, w, h, 24, { ...fanOnPaper, hollow: true })
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(c)
    let target = 0
    let lean = 0
    const move = (e: PointerEvent) => (target = (e.clientX / window.innerWidth - 0.5) * 2)
    if (finePointer) window.addEventListener('pointermove', move, { passive: true })
    let visible = false
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting))
    io.observe(c)
    const draw = (t: number) => {
      lean += (target - lean) * 0.05
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, w, h)
      const g = ctx.createLinearGradient(0, 0, w, 0)
      g.addColorStop(0, p.s3)
      g.addColorStop(0.5, p.ink)
      g.addColorStop(1, p.g3)
      ctx.strokeStyle = g
      ctx.lineWidth = 2
      const gap = 7
      const off = (t * 9) % gap
      const slant = h * (0.75 + lean * 0.55)
      ctx.beginPath()
      for (let x = -Math.abs(slant) - gap; x < w + Math.abs(slant) + gap; x += gap) {
        ctx.moveTo(x + off, h)
        ctx.lineTo(x + off + slant, 0)
      }
      ctx.stroke()
      ctx.globalCompositeOperation = 'destination-in'
      ctx.drawImage(mask, 0, 0)
    }
    const tick = (t: number) => {
      if (visible) draw(t)
    }
    draw(0)
    if (!reduced) gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', move)
    }
  }, [])
  return <canvas ref={ref} className="hatch" aria-hidden="true" />
}

export function Footer() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      morSay('Copied!')
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${CONTACT.email}`
    }
  }
  return (
    <footer className="footer" id="contact" data-mor="footer">
      <Sky mode="footer" cell={12} />
      <div className="footer-top wrap">
        <div className="footer-hello">
          <p className="pixel">Exploring new opportunities</p>
          <h2 className="display footer-sign">Say hello</h2>
          <div className="footer-actions">
            <Magnetic>
              <a className="btn btn-ink" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email} <Arrow />
              </a>
            </Magnetic>
            <button className="btn btn-line" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <a className="footer-phone" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        </div>
        <ul className="footer-links">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                <span>{s.label}</span>
                <small className="pixel">{s.handle}</small>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <HatchFan />
      <div className="footer-base wrap pixel">
        <span>Viral Dhoka, 2026</span>
        <span className="footer-credit">
          India map from <a href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noreferrer">svg-maps</a>, CC BY 4.0
        </span>
        <span className="deva">पुणे, महाराष्ट्र</span>
      </div>
    </footer>
  )
}
