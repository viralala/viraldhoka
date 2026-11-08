import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { PINS } from '../data/site'
import { finePointer, reduced } from '../lib/motion'
import { useT } from '../i18n'
import { TOOLBOX } from '../data/tools'

/**
 * Mor OS: the night half of the story as a small pastel desktop. Each beat is an app
 * window whose title bar holds tabs for every app, so you can jump between them.
 * Page scroll still drives everything; dragging a window only moves that window.
 */

export type App = 'maps' | 'id' | 'term' | 'apps'
const APPS: App[] = ['maps', 'id', 'term', 'apps']
const APP_STEP: Record<App, number> = { maps: 0, id: 2, term: 3, apps: 4 }

const canDrag = () => finePointer && window.innerWidth >= 900

type WinProps = {
  app: App
  /** The current tab's label, when it says more than the app's name */
  title?: string
  go: (step: number) => void
  tone?: 'pink' | 'blue' | 'night'
  children: ReactNode
}

/** A window. Its title bar holds a tab per app and drags the window on desktop. */
export function Win({ app, title, go, tone = 'pink', children }: WinProps) {
  const t = useT()
  const el = useRef<HTMLDivElement>(null)
  const off = useRef({ x: 0, y: 0 })

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!canDrag() || e.button !== 0 || (e.target as Element).closest('button')) return
    const bar = e.currentTarget
    bar.setPointerCapture(e.pointerId)
    const sx = e.clientX - off.current.x
    const sy = e.clientY - off.current.y
    const move = (ev: globalThis.PointerEvent) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      off.current = {
        x: Math.max(-vw * 0.5, Math.min(vw * 0.5, ev.clientX - sx)),
        y: Math.max(-vh * 0.35, Math.min(vh * 0.35, ev.clientY - sy)),
      }
      el.current!.style.translate = `${off.current.x}px ${off.current.y}px`
    }
    const up = () => {
      bar.removeEventListener('pointermove', move)
      bar.removeEventListener('pointerup', up)
      bar.removeEventListener('pointercancel', up)
      el.current?.classList.remove('is-dragging')
    }
    el.current!.classList.add('is-dragging')
    bar.addEventListener('pointermove', move)
    bar.addEventListener('pointerup', up)
    bar.addEventListener('pointercancel', up)
  }

  return (
    <div ref={el} className={`os-win tone-${tone}`}>
      <div className="os-bar" onPointerDown={onDown} data-cursor-label={finePointer ? t.story.os.move : undefined}>
        <span className="os-dots" aria-hidden="true"><i /><i /><i /></span>
        <nav className="os-tabs" aria-label={t.story.os.dock}>
          {APPS.map((id) => (
            <button
              key={id}
              className={`os-tab app-${id} ${id === app ? 'is-on' : ''}`}
              aria-current={id === app ? 'page' : undefined}
              aria-label={t.story.os.apps[id]}
              data-cursor-label={id === app ? undefined : t.story.os.apps[id]}
              onClick={() => go(APP_STEP[id])}
            >
              <i aria-hidden="true" />
              <span className="pixel">{id === app ? (title ?? t.story.os.apps[id]) : t.story.os.apps[id]}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="os-body">{children}</div>
    </div>
  )
}

/** The search field in Maps types the place out when its window comes up. */
export function SearchBar({ text, on }: { text: string; on: boolean }) {
  const t = useT()
  const chars = Array.from(text)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on || reduced) return
    let i = 0
    const id = window.setInterval(() => {
      i++
      setN(i)
      if (i >= chars.length) window.clearInterval(id)
    }, 70)
    return () => {
      window.clearInterval(id)
      // Ready to type again the next time the window comes up
      setN(0)
    }
  }, [on, chars.length])
  const shown = on && !reduced ? n : chars.length
  return (
    <p className="os-search" aria-label={`${t.story.os.search}: ${text}`}>
      <span className="pixel os-search-label" aria-hidden="true">{t.story.os.search}</span>
      <span className="os-search-text" aria-hidden="true">{chars.slice(0, shown).join('')}<i /></span>
    </p>
  )
}

/** Deterministic pixel barcode, so the card looks the same on every visit. */
const BARS = Array.from({ length: 38 }, (_, i) => ((i * 37 + 11) % 7) % 3)

/** A VIT student ID that tilts toward the pointer, catches a hologram, and flips. */
export function IdCard({ pinId }: { pinId: string }) {
  const t = useT()
  const c = t.story.os.card
  const card = useRef<HTMLDivElement>(null)
  const [flip, setFlip] = useState(false)

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    const el = card.current!
    el.style.setProperty('--rx', `${-y * 14}deg`)
    el.style.setProperty('--ry', `${x * 20}deg`)
    el.style.setProperty('--hx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--hy', `${(y + 0.5) * 100}%`)
  }
  const rest = () => {
    const el = card.current!
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setFlip((f) => !f)
    }
  }

  return (
    <div className="idcard-wrap" onPointerMove={tilt} onPointerLeave={rest}>
      <div
        ref={card}
        className={`idcard ${flip ? 'is-flipped' : ''}`}
        role="button"
        tabIndex={0}
        aria-pressed={flip}
        aria-label={c.flip}
        data-cursor-label={c.flip}
        onClick={() => setFlip((f) => !f)}
        onKeyDown={onKey}
      >
        <div className="idcard-face idcard-front">
          <div className="idcard-head">
            <span className="pixel">VIT Pune</span>
            <span className="pixel idcard-kind">{c.kind}</span>
          </div>
          <div className="idcard-main">
            <div className="idcard-photo" aria-hidden="true"><span className="pixel">{t.work.initials}</span></div>
            <dl className="idcard-fields">
              <div><dt className="pixel">{c.name}</dt><dd className="display">Viral Dhoka</dd></div>
              <div><dt className="pixel">{c.programme}</dt><dd>{c.branch}</dd></div>
              <div className="idcard-row">
                <div><dt className="pixel">{c.year}</dt><dd>{c.yearValue}</dd></div>
                <div><dt className="pixel">{c.batch}</dt><dd>2025–2029</dd></div>
              </div>
            </dl>
          </div>
          <div className="idcard-foot" aria-hidden="true">
            <span className="idcard-bars">{BARS.map((w, i) => <i key={i} style={{ width: w + 1 }} />)}</span>
            <span className="idcard-holo" />
          </div>
          <span className="idcard-sheen" aria-hidden="true" />
        </div>
        <div className="idcard-face idcard-back">
          <span className="idcard-stripe" aria-hidden="true" />
          <p className="pixel idcard-back-title">{c.places}</p>
          <ul className="idcard-places">
            {PINS.map((p) => (
              <li key={p.id} className={p.id === pinId ? 'is-on' : ''}>
                <b>{p.name}</b>
                <span>{t.pins[p.id].place}</span>
              </li>
            ))}
          </ul>
          <p className="idcard-college">{t.story.study.title}</p>
        </div>
      </div>
      <p className="pixel idcard-hint">{c.flipHint}</p>
    </div>
  )
}

type Tab = 'front' | 'back' | 'ai'
type Entry = { cmd: string; kind: 'tab' | 'help' | 'whoami' | 'ls' | 'missing'; tab?: Tab }

const ALIASES: Record<string, Tab> = { frontend: 'front', front: 'front', backend: 'back', back: 'back', ai: 'ai', ml: 'ai', 'ai/ml': 'ai' }
const CMD: Record<Tab, string> = { front: 'frontend', back: 'backend', ai: 'ai' }

/** "What I do" as a terminal: the three skills are commands, and the particles follow. */
export function Terminal({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const t = useT()
  const s = t.story
  const o = s.os.term
  const [log, setLog] = useState<Entry[]>([{ cmd: 'whoami', kind: 'whoami' }, { cmd: CMD[tab], kind: 'tab', tab }])
  const [value, setValue] = useState('')
  const screen = useRef<HTMLDivElement>(null)

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') {
      setLog([])
      return
    }
    let e: Entry
    if (ALIASES[cmd]) {
      e = { cmd, kind: 'tab', tab: ALIASES[cmd] }
      onTab(ALIASES[cmd])
    } else if (cmd === 'help') e = { cmd, kind: 'help' }
    else if (cmd === 'whoami') e = { cmd, kind: 'whoami' }
    else if (cmd === 'ls') e = { cmd, kind: 'ls' }
    else e = { cmd, kind: 'missing' }
    setLog((l) => [...l, e].slice(-4))
  }

  useEffect(() => {
    const el = screen.current
    if (el) el.scrollTop = el.scrollHeight
  }, [log])

  const lastTab = log.map((e) => e.kind).lastIndexOf('tab')

  return (
    <div className="term">
      <div ref={screen} className="term-screen" aria-live="polite">
        {log.map((e, i) => (
          <div key={i} className="term-entry">
            <p className="term-cmd"><span aria-hidden="true">viral@mor-os ~ $ </span>{e.cmd}</p>
            {e.kind === 'whoami' && <p className="term-out">{o.whoami}</p>}
            {e.kind === 'help' && <p className="term-out">{o.help}</p>}
            {e.kind === 'ls' && <p className="term-out">frontend/&nbsp;&nbsp;backend/&nbsp;&nbsp;ai/</p>}
            {e.kind === 'missing' && <p className="term-out is-err">{o.missing(e.cmd)}</p>}
            {e.kind === 'tab' && e.tab && (
              i === lastTab ? (
                <div className="term-out">
                  <p className="display term-title">{s.tabs[e.tab].title}</p>
                  <p className="term-body">{s.tabs[e.tab].body}</p>
                  <p className="pixel term-hint">{s.tabs[e.tab].hint}</p>
                </div>
              ) : (
                <p className="term-out">{s.tabs[e.tab].title}</p>
              )
            )}
          </div>
        ))}
      </div>
      <form
        className="term-input"
        onSubmit={(e) => {
          e.preventDefault()
          run(value)
          setValue('')
        }}
      >
        <label className="term-prompt" htmlFor="mor-os-cmd" aria-hidden="true">$</label>
        <input
          id="mor-os-cmd"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={o.placeholder}
          aria-label={o.label}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lenis-prevent
        />
      </form>
      <div className="chips term-chips" role="tablist" aria-label={s.build.kicker}>
        {(Object.keys(CMD) as Tab[]).map((id) => (
          <button key={id} role="tab" aria-selected={id === tab} className={`chip-dark ${id === tab ? 'is-on' : ''}`} onClick={() => run(CMD[id])}>
            {s.tabs[id].label}
          </button>
        ))}
      </div>
    </div>
  )
}

/** The Apps window: the tech stack, grouped, with each tool in its brand colour. */
export function Apps() {
  const t = useT()
  const s = t.story
  const a = s.os.appsWin
  return (
    <div className="os-apps">
      <div className="os-tools">
        <p className="pixel">{a.toolbox}</p>
        {TOOLBOX.map((g, i) => (
          <div className="os-tool-row" key={i}>
            <span className="pixel os-tool-group">{a.groups[i]}</span>
            <ul className="os-tool-list">
              {g.map((x) => (
                <li key={x.name} style={{ '--tc': x.hex } as React.CSSProperties}>
                  {x.path && <svg viewBox="0 0 24 24" aria-hidden="true"><path d={x.path} /></svg>}
                  {x.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
