import { useEffect, useRef, useState } from 'react'
import { gsap, lockScroll, markReady, reduced, ScrollTrigger } from '../lib/motion'
import { drawFanPixels } from '../lib/shapes'
import { fmtNum, getLocale, useT } from '../i18n'
import { wipe } from './PixelWipe'

const FONT_FACES = [
  "italic 400 40px 'Boska'",
  "italic 500 40px 'Boska'",
  "400 16px 'General Sans'",
  "500 16px 'General Sans'",
  "400 12px 'Silkscreen'",
  "400 40px 'Tiro Devanagari Marathi'",
  "400 40px 'Tiro Devanagari Hindi'",
]

/**
 * Progress is real: it tracks font files as they arrive, and it paces itself
 * so the 24 feathers always get a moment to open. Each feather is about 4%.
 */
export function Loader() {
  const t = useT()
  const fan = useRef<HTMLCanvasElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  const [greet, setGreet] = useState(0)

  useEffect(() => {
    if (gone) return
    let alive = true
    lockScroll(true)
    const state = { shown: 0 }
    let loaded = 0
    const total = FONT_FACES.length

    FONT_FACES.forEach((f) =>
      document.fonts.load(f, 'Aनम').finally(() => {
        loaded++
      }),
    )

    const finish = async () => {
      if (!alive) return
      await new Promise((r) => setTimeout(r, 260))
      await wipe.cover()
      setGone(true)
      lockScroll(false)
      ScrollTrigger.refresh()
      markReady()
      await wipe.reveal()
    }

    if (reduced) {
      drawFanPixels(fan.current!, 24)
      document.fonts.ready.then(() => {
        setGone(true)
        lockScroll(false)
        markReady()
      })
      return () => {
        alive = false
      }
    }

    const greetTimer = window.setInterval(() => setGreet((g) => g + 1), 620)
    const start = performance.now()
    const MIN = 2000

    let prev = start
    const tick = () => {
      const t = performance.now()
      const dt = Math.min(0.1, (t - prev) / 1000)
      prev = t
      const paced = Math.min(1, (performance.now() - start) / MIN)
      const real = loaded / total
      const goal = Math.min(paced, real < 1 ? Math.min(real + 0.25, 0.94) : 1)
      state.shown += (goal - state.shown) * (1 - Math.exp(-dt * 6))
      if (goal >= 1 && state.shown > 0.995) state.shown = 1
      drawFanPixels(fan.current!, state.shown * 24)
      num.current!.textContent = new Intl.NumberFormat(getLocale(), { minimumIntegerDigits: 3 }).format(Math.round(state.shown * 100))
      if (state.shown >= 1) {
        gsap.ticker.remove(tick)
        finish()
      }
    }
    gsap.ticker.add(tick)
    return () => {
      alive = false
      window.clearInterval(greetTimer)
      gsap.ticker.remove(tick)
    }
  }, [gone])

  if (gone) return null
  const g = t.loader.greetings[greet % t.loader.greetings.length]
  return (
    <div ref={root} className="loader" role="status" aria-label={t.loader.aria}>
      <p className="loader-greet" key={greet}>
        {g}
      </p>
      <canvas ref={fan} className="loader-fan" width={176} height={100} aria-hidden="true" />
      <div className="loader-foot pixel">
        <span>Viral Dhoka</span>
        <span>
          <span ref={num}>{fmtNum(0).padStart(3, fmtNum(0))}</span>%
        </span>
        <span>{t.loader.place}</span>
      </div>
    </div>
  )
}
