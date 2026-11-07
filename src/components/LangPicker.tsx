import { useEffect, useRef, useState } from 'react'
import { LANGS, setLang, useLang, useT, type Lang } from '../i18n'
import { ScrollTrigger } from '../lib/motion'
import { wipe } from './PixelWipe'

/** A pixel globe, drawn on the 8px grid like the rest of the site. */
function Globe() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M5 1h6v2H5zM3 3h2v2H3zm8 0h2v2h-2zM1 5h2v6H1zm12 0h2v6h-2zM3 11h2v2H3zm8 0h2v2h-2zM5 13h6v2H5zM7 3h2v10H7zM3 7h10v2H3z" />
    </svg>
  )
}

/**
 * The language menu. Picking one runs the pixel wipe, swaps every word on the page
 * underneath it, and remembers the choice for next time.
 */
export function LangPicker() {
  const lang = useLang()
  const t = useT()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const items = useRef<(HTMLButtonElement | null)[]>([])
  const current = LANGS.find((l) => l.id === lang)!

  useEffect(() => {
    if (!open) return
    const i = LANGS.findIndex((l) => l.id === lang)
    items.current[i]?.focus({ preventScroll: true })
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener('pointerdown', away)
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('pointerdown', away)
      window.removeEventListener('keydown', key)
    }
  }, [open, lang])

  const choose = async (id: Lang) => {
    setOpen(false)
    button.current?.focus({ preventScroll: true })
    if (id === lang || busy) return
    setBusy(true)
    const name = LANGS.find((l) => l.id === id)!.name
    await wipe.cover(name)
    try {
      await setLang(id)
    } finally {
      await new Promise((r) => setTimeout(r, 140))
      ScrollTrigger.refresh()
      await wipe.reveal()
      setBusy(false)
    }
  }

  // Arrow keys walk the list, Home and End jump to its ends
  const onListKey = (e: React.KeyboardEvent) => {
    const i = items.current.findIndex((el) => el === document.activeElement)
    const go = (n: number) => {
      e.preventDefault()
      items.current[(n + LANGS.length) % LANGS.length]?.focus({ preventScroll: true })
    }
    if (e.key === 'ArrowDown') go(i + 1)
    else if (e.key === 'ArrowUp') go(i - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(LANGS.length - 1)
    else if (e.key === 'Tab') setOpen(false)
  }

  return (
    <div ref={root} className={`lang ${open ? 'is-open' : ''}`}>
      <button
        ref={button}
        className="lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.lang.label}: ${current.name}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        <Globe />
        <span className="lang-name">{current.name}</span>
        <span className="lang-short">{current.short}</span>
        <i className="lang-caret" aria-hidden="true" />
      </button>
      {open && (
        <div className="lang-menu" role="listbox" aria-label={t.lang.label} onKeyDown={onListKey}>
          <p className="lang-head pixel" aria-hidden="true">{t.lang.label}</p>
          {LANGS.map((l, i) => (
            <button
              key={l.id}
              ref={(el) => { items.current[i] = el }}
              role="option"
              aria-selected={l.id === lang}
              lang={l.id}
              className={`lang-opt ${l.id === lang ? 'is-on' : ''}`}
              onClick={() => choose(l.id)}
            >
              <span>{l.name}</span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
