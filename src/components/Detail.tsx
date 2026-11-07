import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Project } from '../data/site'
import { gsap, lockScroll, reduced } from '../lib/motion'
import { localProject, useT } from '../i18n'
import { Arrow } from './Bits'

type Session = { project: Project; from: () => DOMRect; onClose?: () => void }

export const detailApi = {
  open: (_p: Project, _from: () => DOMRect, _onClose?: () => void) => {},
}

const BLOTS: [number, number, number][] = [
  [400, 300, 0], [900, 560, 120], [660, 120, 220], [220, 680, 300], [1100, 230, 360], [700, 740, 420], [610, 430, 180],
]

const inset = (r: DOMRect) =>
  `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px round 3px)`

/**
 * Clicking a cover grows a sheet of paper out of it. Every reveal here is a clip,
 * a mask or a slide, and the screenshot bleeds in like ink.
 */
export function Detail() {
  const t = useT()
  const [session, setSession] = useState<Session | null>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const closing = useRef(false)
  const returnTo = useRef<Element | null>(null)

  useEffect(() => {
    detailApi.open = (project, from, onClose) => {
      returnTo.current = document.activeElement
      closing.current = false
      lockScroll(true)
      setSession({ project, from, onClose })
    }
  }, [])

  useLayoutEffect(() => {
    if (!session) return
    const el = sheet.current!
    const rect = session.from()
    el.scrollTop = 0
    const dur = reduced ? 1 : 1050
    el.animate([{ clipPath: inset(rect) }, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }], { duration: dur, easing: 'cubic-bezier(.76,0,.18,1)', fill: 'both' })

    el.querySelectorAll<HTMLElement>('.dt-line > *').forEach((line, i) => {
      line.animate([{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }], {
        duration: reduced ? 1 : 900,
        delay: reduced ? 0 : 620 + i * 75,
        easing: 'cubic-bezier(.2,.8,.2,1)',
        fill: 'both',
      })
    })

    const circles = el.querySelectorAll<SVGCircleElement>('.ink circle')
    circles.forEach((c, i) => {
      gsap.killTweensOf(c)
      gsap.set(c, { attr: { r: reduced ? 1100 : 0 } })
      if (!reduced) gsap.to(c, { attr: { r: 1100 }, duration: 1.25, delay: 0.52 + BLOTS[i][2] / 1000, ease: 'power3.out' })
    })
    closeBtn.current?.focus({ preventScroll: true })
  }, [session])

  useEffect(() => {
    if (!session) return
    const close = () => {
      if (closing.current) return
      closing.current = true
      const el = sheet.current!
      const a = el.animate([{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }, { clipPath: inset(session.from()) }], {
        duration: reduced ? 1 : 850,
        easing: 'cubic-bezier(.76,0,.18,1)',
        fill: 'both',
      })
      a.onfinish = () => {
        el.getAnimations({ subtree: true }).forEach((x) => x.cancel())
        session.onClose?.()
        setSession(null)
        lockScroll(false)
        if (returnTo.current instanceof HTMLElement) returnTo.current.focus({ preventScroll: true })
      }
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    closeRef.current = close
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [session])

  const closeRef = useRef(() => {})

  if (!session) return null
  const p = localProject(session.project, t)

  return (
    <div ref={sheet} className="detail" role="dialog" aria-modal="true" aria-label={p.title} data-lenis-prevent>
      <button ref={closeBtn} className="detail-close pixel" onClick={() => closeRef.current()}>
        {t.detail.close}
      </button>

      <div className="detail-text">
        <div className="dt-line"><p className="pixel detail-kind">{p.kind}</p></div>
        <div className="dt-line"><h2 className="display detail-title">{p.title}</h2></div>
        <div className="dt-line"><p className="detail-tag">{p.tagline}</p></div>
        <div className="dt-line"><p className="detail-summary">{p.summary}</p></div>
        <ul className="detail-points">
          {p.points.map((x) => (
            <li className="dt-line" key={x}><span>{x}</span></li>
          ))}
        </ul>
        <div className="dt-line"><p className="pixel detail-stack">{p.stack.join(' / ')}</p></div>
        <div className="dt-line"><p className="detail-credit">{p.credit}</p></div>
        <div className="dt-line detail-links">
          <div>
            <a className="btn btn-ink" href={p.url} target="_blank" rel="noreferrer">{p.domain.endsWith('.vercel.app') ? t.detail.visitSite : t.detail.visit(p.domain)} <Arrow /></a>
            {p.repo && <a className="btn btn-line" href={p.repo} target="_blank" rel="noreferrer">{t.detail.code}</a>}
          </div>
        </div>
      </div>

      <div className="detail-poster">
        <svg viewBox="0 0 1280 800" role="img" aria-label={t.detail.shot(p.title)}>
          <defs>
            <filter id="ink-edge" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="120" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <mask id="ink-mask">
              <g className="ink" filter="url(#ink-edge)" fill="#fff">
                {BLOTS.map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="0" />
                ))}
              </g>
            </mask>
          </defs>
          <image href={`/work/${p.id}.webp`} width="1280" height="800" mask="url(#ink-mask)" preserveAspectRatio="xMidYMid slice" />
        </svg>
      </div>
    </div>
  )
}
