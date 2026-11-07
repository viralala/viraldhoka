import { useEffect, useRef, useState } from 'react'
import { COMMITS } from '../data/commits'
import { CONTACT, HACKATHONS, PROJECTS, SOCIALS } from '../data/site'
import { Sky } from '../gl/Sky'
import { finePointer, gsap, onReady, palette as p, reduced, ScrollTrigger } from '../lib/motion'
import { drawFan, fanOnPaper } from '../lib/shapes'
import { getDict, getLocale, useT } from '../i18n'
import { Arrow, Count, jumpTo, Magnetic, pixelBurst, PuneClock, puneHour, Scramble } from './Bits'
import { LangPicker } from './LangPicker'
import { morSay } from './Mor'

const LINKS = ['about', 'work', 'wins', 'contact'] as const

export function Nav() {
  const ref = useRef<HTMLElement>(null)
  const t = useT()
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
      <nav className="nav-pill" aria-label={t.nav.main}>
        <a className="nav-mark" href="#top" onClick={(e) => { e.preventDefault(); jumpTo('top', 'Viral Dhoka') }}>
          Viral Dhoka
        </a>
        {LINKS.map((id) => (
          <a key={id} className="nav-link" href={`#${id}`} onClick={(e) => { e.preventDefault(); jumpTo(id, t.nav[id]) }}>
            {t.nav[id]}
          </a>
        ))}
      </nav>
      <div className="nav-side">
        <PuneClock />
        <LangPicker />
      </div>
    </header>
  )
}

/**
 * The big hatched peacock. Its lines drift and lean toward the pointer, it opens one
 * feather at a time when it scrolls in, and a click folds it and fans it out again.
 */
function HatchFan() {
  const ref = useRef<HTMLCanvasElement>(null)
  const t = useT()
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
      morSay(getDict().mor.cry)
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
  return <canvas ref={ref} className="hatch" data-cursor-label={t.footer.fanIt} aria-hidden="true" />
}


/** Pune time in words, with a pixel sun or moon. */
function PuneNow() {
  const t = useT()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 15000)
    return () => window.clearInterval(t)
  }, [])
  const time = new Intl.DateTimeFormat(getLocale(), { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(now)
  const h = puneHour(now)
  const parts = t.footer.parts
  const part = h < 5 ? parts.lateNight : h < 12 ? parts.morning : h < 17 ? parts.afternoon : h < 20 ? parts.evening : parts.night
  const day = h >= 6 && h < 19
  return (
    <p className="footer-now">
      <i className={`footer-sky ${day ? 'is-day' : 'is-night'}`} aria-hidden="true" />
      {t.footer.now(time, part)}
    </p>
  )
}

const JUMPS = ['top', 'about', 'work', 'wins', 'research'] as const

export function Footer() {
  const t = useT()
  const f = t.footer
  const [copied, setCopied] = useState(false)
  const [greet, setGreet] = useState(0)
  const sign = useRef<HTMLButtonElement>(null)
  const picked = useRef(false)

  // The greeting turns through a few ways of saying hello while the footer is on screen
  useEffect(() => {
    if (reduced) return
    let seen = false
    const io = new IntersectionObserver(([en]) => (seen = en.isIntersecting))
    io.observe(sign.current!)
    const t = window.setInterval(() => {
      if (seen && !picked.current) setGreet((g) => g + 1)
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
      morSay(f.copiedSay)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${CONTACT.email}`
    }
  }
  const nextGreet = (e: React.MouseEvent) => {
    picked.current = true
    const n = greet + 1
    setGreet(n)
    morSay(f.greets[n % f.greets.length])
    pixelBurst(e.clientX, e.clientY, 24)
  }
  const live = PROJECTS.filter((x) => !x.domain.endsWith('.vercel.app'))
  const g = f.greets[greet % f.greets.length]

  return (
    <footer className="footer" id="contact" data-mor="footer">
      <Sky mode="footer" cell={12} />
      <div className="footer-top wrap">
        <div className="footer-hello">
          <Scramble className="pixel" text={f.kicker} />
          <h2 className="footer-sign-wrap">
            <span className="sr-only">{f.hello}</span>
            <button ref={sign} className="footer-sign" onClick={nextGreet} data-cursor-label={f.another} aria-hidden="true" tabIndex={-1}>
              <span key={`${greet}-${g}`} className="footer-greet display">{g}</span>
            </button>
          </h2>
          <div className="footer-actions">
            <Magnetic>
              <a className="btn btn-ink" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email} <Arrow />
              </a>
            </Magnetic>
            <button className="btn btn-line" onClick={copy}>{copied ? f.copied : f.copy}</button>
          </div>
          <a className="footer-phone" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        </div>
        <dl className="footer-stats">
          <div><dd className="display"><Count to={PROJECTS.length} /></dd><dt>{f.builds}</dt></div>
          <div><dd className="display"><Count to={HACKATHONS.length} /></dd><dt>{f.podiums}</dt></div>
          <div><dd className="display"><Count to={COMMITS.total} /></dd><dt>{f.commits}</dt></div>
          <div><dd className="display"><Count to={39} /></dd><dt>{f.vercel}</dt></div>
        </dl>
      </div>

      <div className="footer-grid wrap">
        <div className="footer-col">
          <p className="pixel footer-label">{f.basedIn}</p>
          <p className="footer-big">{f.city}</p>
          <PuneNow />
        </div>
        <div className="footer-col">
          <p className="pixel footer-label">{f.studying}</p>
          <p className="footer-big">{f.degree}</p>
          <p className="footer-small">{f.college}</p>
        </div>
        <div className="footer-col">
          <p className="pixel footer-label">{f.live}</p>
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
          <p className="pixel footer-label">{f.elsewhere}</p>
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
        <nav className="footer-col" aria-label={f.onPage}>
          <p className="pixel footer-label">{f.onPage}</p>
          <ul className="footer-list">
            {JUMPS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); jumpTo(id, t.nav[id]) }}>
                  <span>{t.nav[id]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <HatchFan />
      <div className="footer-base wrap pixel">
        <span>{f.sign}</span>
        <span className="footer-credit">{f.built}</span>
        <span className="footer-credit">
          {f.mapFrom} <a href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noreferrer">svg-maps</a>, {f.license}
        </span>
        <span>{t.story.coords}</span>
        <button className="footer-top-btn" onClick={() => jumpTo('top', 'Viral Dhoka')}>{f.backTop}</button>
      </div>
    </footer>
  )
}
