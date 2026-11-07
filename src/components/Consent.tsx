import { useEffect, useState } from 'react'

// Google Analytics loads only after the visitor clicks Accept.
// With no VITE_GA_ID set the site sets no cookies, so the banner never shows.
export const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined)?.trim() || ''
const KEY = 'vd-consent'
const OPEN = 'vd-consent-open'

type Choice = 'granted' | 'denied' | null

function read(): Choice {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

let loaded = false
function loadGA() {
  if (loaded || !/^G-[A-Z0-9]+$/.test(GA_ID)) return
  loaded = true
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', GA_ID, { anonymize_ip: true })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
}

function clearGA() {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name.startsWith('_ga')) {
      const host = location.hostname
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${host}`
      document.cookie = `${name}=; Max-Age=0; path=/`
    }
  })
}

export function openConsent() {
  window.dispatchEvent(new Event(OPEN))
}

export function Consent() {
  const [choice, setChoice] = useState<Choice>(() => (GA_ID ? read() : 'denied'))
  const [open, setOpen] = useState(() => !!GA_ID && read() === null)

  useEffect(() => {
    if (choice === 'granted') loadGA()
  }, [choice])

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener(OPEN, show)
    return () => window.removeEventListener(OPEN, show)
  }, [])

  if (!GA_ID || !open) return null

  const pick = (c: 'granted' | 'denied') => {
    try {
      localStorage.setItem(KEY, c)
    } catch {
      /* private mode: choice lasts this visit */
    }
    if (c === 'denied' && choice === 'granted') {
      clearGA()
      location.reload()
      return
    }
    setChoice(c)
    setOpen(false)
  }

  return (
    <div className="consent" role="dialog" aria-live="polite" aria-label="Cookie choice">
      <p>
        Can I count your visit with Google Analytics? It uses cookies and only loads if you say yes.{' '}
        <a href="/privacy">Privacy policy</a>
      </p>
      <div className="consent-btns">
        <button type="button" onClick={() => pick('denied')}>Decline</button>
        <button type="button" className="is-main" onClick={() => pick('granted')}>Accept</button>
      </div>
    </div>
  )
}
