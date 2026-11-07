import { useEffect, useRef, useState } from 'react'
import { COMMITS } from '../data/commits'
import { CONTACT, HACKATHONS, PROJECTS, SOCIALS } from '../data/site'
import { Sky } from '../gl/Sky'
import { finePointer, gsap, onReady, palette as p, reduced, ScrollTrigger } from '../lib/motion'
import { drawFan, fanOnPaper } from '../lib/shapes'
import { Arrow, Count, jumpTo, Magnetic, pixelBurst, PuneClock, Scramble } from './Bits'
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

/**
 * The big hatched peacock. Its lines drift and lean toward the pointer, it opens one
 * feather at a time when it scrolls in, and a click folds it and fans it out again.
 */
function HatchFan() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const mask = document.createElement('canvas')
    const fan = { n: reduced ? 24 : 0 }
    let w = 0
    let h = 0
    const paintMask = () => {
      const m = mask.getContext('2d')!
      m.clearRect(0, 0, w, h)
      drawFan(m, w, h, fan.n, { ...fanOnPaper, hollow: true })
    }
    const size = () => {
      w = c.width = Math.round(c.clientWidth)
      h = c.height = Math.round(c.clientHeight)
      mask.width = w
      mask.height = h
      paintMask()
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
    const grow = (from: number) =>
      gsap.fromTo(fan, { n: from }, { n: 24, duration: 1.6, ease: 'power2.out', onUpdate: paintMask })
    const st = reduced ? null : ScrollTrigger.create({ trigger: c, start: 'top 85%', once: true, onEnter: () => grow(0) })
    const click = (e: MouseEvent) => {
      if (reduced) return
      pixelBurst(e.clientX, e.clientY, 36)
      gsap.killTweensOf(fan)
      gsap.to(fan, { n: 2, duration: 0.45, ease: 'power2.in', onUpdate: paintMask, onComplete: () => void grow(2) })
      morSay('मोर!')
    }
    c.addEventListener('click', click)
    const draw = (t: number) => {
      lean += (target - lean) * 0.05
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, w, h)
      const g = ctx.createLinearGradient(0, 0, w, 0)
      g.addColorStop(0, p.pk3)
      g.addColorStop(0.5, p.ink)
      g.addColorStop(1, p.bl3)
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
      gsap.killTweensOf(fan)
      st?.kill()
      ro.disconnect()
      io.disconnect()
      c.removeEventListener('click', click)
      window.removeEventListener('pointermove', move)
    }
  }, [])
  return <canvas ref={ref} className="hatch" data-cursor-label="Fan it" aria-hidden="true" />
}

const GREETS = [
  { t: 'Say hello', deva: false },
  { t: 'नमस्कार', deva: true },
  { t: 'नमस्ते', deva: true },
]

/** Pune time in words, with a pixel sun or moon. */
function PuneNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 15000)
    return () => window.clearInterval(t)
  }, [])
  const time = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(now)
  const h = Number(time.slice(0, 2))
  const part = h < 5 ? 'late night' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 20 ? 'evening' : 'night'
  const day = h >= 6 && h < 19
  return (
    <p className="footer-now">
      <i className={`footer-sky ${day ? 'is-day' : 'is-night'}`} aria-hidden="true" />
      {time} IST, {part}
    </p>
  )
}

const JUMPS = [
  { id: 'top', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'wins', label: 'Wins' },
  { id: 'research', label: 'Research' },
]

export function Footer() {
  const [copied, setCopied] = useState(false)
  const [greet, setGreet] = useState(0)
  const sign = useRef<HTMLButtonElement>(null)
  const picked = useRef(false)

  // The greeting turns through English, Marathi and Hindi while the footer is on screen
  useEffect(() => {
    if (reduced) return
    let seen = false
    const io = new IntersectionObserver(([en]) => (seen = en.isIntersecting))
    io.observe(sign.current!)
    const t = window.setInterval(() => {
      if (seen && !picked.current) setGreet((g) => (g + 1) % GREETS.length)
    }, 3200)
    return () => {
      window.clearInterval(t)
      io.disconnect()
    }
  }, [])

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      pixelBurst(r.left + r.width / 2, r.top + r.height / 2)
      morSay('Copied!')
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${CONTACT.email}`
    }
  }
  const nextGreet = (e: React.MouseEvent) => {
    picked.current = true
    const n = (greet + 1) % GREETS.length
    setGreet(n)
    morSay(GREETS[n].t)
    pixelBurst(e.clientX, e.clientY, 24)
  }
  const live = PROJECTS.filter((x) => !x.domain.endsWith('.vercel.app'))
  const g = GREETS[greet]

  return (
    <footer className="footer" id="contact" data-mor="footer">
      <Sky mode="footer" cell={12} />
      <div className="footer-top wrap">
        <div className="footer-hello">
          <Scramble className="pixel" text="Exploring new opportunities" />
          <h2 className="footer-sign-wrap">
            <span className="sr-only">Say hello</span>
            <button ref={sign} className="footer-sign" onClick={nextGreet} data-cursor-label="Another way" aria-hidden="true" tabIndex={-1}>
              <span key={greet} className={`footer-greet ${g.deva ? 'deva' : 'display'}`}>{g.t}</span>
            </button>
          </h2>
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
        <dl className="footer-stats">
          <div><dd className="display"><Count to={PROJECTS.length} /></dd><dt>builds on the shelf</dt></div>
          <div><dd className="display"><Count to={HACKATHONS.length} /></dd><dt>hackathon podiums</dt></div>
          <div><dd className="display"><Count to={COMMITS.total} /></dd><dt>commits in a year</dt></div>
          <div><dd className="display"><Count to={39} /></dd><dt>Vercel projects</dt></div>
        </dl>
      </div>

      <div className="footer-grid wrap">
        <div className="footer-col">
          <p className="pixel footer-label">Based in</p>
          <p className="footer-big">Pune, Maharashtra</p>
          <PuneNow />
        </div>
        <div className="footer-col">
          <p className="pixel footer-label">Studying</p>
          <p className="footer-big">Computer Engineering</p>
          <p className="footer-small">VIT Pune, 2025 to 2029</p>
        </div>
        <div className="footer-col">
          <p className="pixel footer-label">Live now</p>
          <ul className="footer-list">
            {live.map((x) => (
              <li key={x.id}>
                <a href={x.url} target="_blank" rel="noreferrer">
                  <span>{x.domain}</span> <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <p className="pixel footer-label">Elsewhere</p>
          <ul className="footer-list">
            {SOCIALS.map((x) => (
              <li key={x.label}>
                <a href={x.href} target="_blank" rel="noreferrer">
                  <span>{x.label}</span> <small className="pixel">{x.handle}</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className="footer-col" aria-label="On this page">
          <p className="pixel footer-label">On this page</p>
          <ul className="footer-list">
            {JUMPS.map((x) => (
              <li key={x.id}>
                <a href={`#${x.id}`} onClick={(e) => { e.preventDefault(); jumpTo(x.id, x.label) }}>
                  <span>{x.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <HatchFan />
      <div className="footer-base wrap pixel">
        <span>Viral Dhoka, 2026</span>
        <span className="footer-credit">Built in Pune with React, GSAP and WebGL</span>
        <span className="footer-credit">
          India map from <a href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noreferrer">svg-maps</a>, CC BY 4.0
        </span>
        <span className="deva">पुणे, महाराष्ट्र</span>
        <button className="footer-top-btn" onClick={() => jumpTo('top', 'Viral Dhoka')}>Back to top</button>
      </div>
    </footer>
  )
}
