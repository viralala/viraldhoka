import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, onReady, reduced, ScrollTrigger } from '../lib/motion'
import { getDict, useT } from '../i18n'
import { drawFanPixels, fanMor } from '../lib/shapes'

// Mor's own colours. They are fixed on purpose and do not follow the site palette.
const COLORS: Record<string, string> = {
  n: '#1b2350',
  b: '#34408a',
  w: '#fbf6ec',
  s: '#f2a65a',
  o: '#f9c794',
  g: '#3f8f7f',
  G: '#2b6a6c',
}

const BODY = [
  '..............................s.s.s.....',
  '..............................n.n.n.....',
  '...............................nnn......',
  '..............................nnnnn.....',
  '..............................nwnnnoo...',
  '..............................nnnnooo...',
  '...............................nbn......',
  '...............................nbn......',
  '..............................nbbn......',
  '.............................nbbbn......',
  '......................nnnnnnnbbbbn......',
  '...............ggggggnbbbbbbbbbbbn......',
  '.........gggGGGGGGGGGnbbbbbbbbbbn.......',
  '....ggGGGGGGosGGGGosGGnbbbbbbbbn........',
  '.ggGGGGosGGGsnoGGsnoGGGnbbbbbnn.........',
  'gGGosGGsnoGGGosGGGosGGGGnnnnn...........',
  'GGsnoGGGosGGGGGGGGGGGGGGG...............',
  '.GGosGGGGGGGGGGGGGGGGG..................',
  '...gGGGGGGGG............................',
]

const LEGS = [
  [
    '.........................s...s..........',
    '.........................s...s..........',
    '.........................s...s..........',
    '........................ss..ss..........',
  ],
  [
    '..........................s.s...........',
    '.........................s...s..........',
    '........................s.....s.........',
    '.......................ss....ss.........',
  ],
  [
    '...........................s............',
    '...........................s............',
    '...........................s............',
    '..........................ss............',
  ],
]

const W = 40
const H = BODY.length + 4
const FRAMES = [0, 2, 1, 2]

function paint(canvas: HTMLCanvasElement, legs: number, bob: number) {
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, W, H + 1)
  const put = (rows: string[], oy: number) =>
    rows.forEach((row, y) => {
      for (let x = 0; x < W; x++) {
        const ch = row[x]
        if (ch && ch !== '.') {
          ctx.fillStyle = COLORS[ch]
          ctx.fillRect(x, y + oy, 1, 1)
        }
      }
    })
  put(BODY, bob)
  put(LEGS[legs], BODY.length)
}

/** Draws Mor at rest onto any 40 by 24 canvas. */
export function paintMor(canvas: HTMLCanvasElement) {
  paint(canvas, 2, 0)
}

/** Lets anything on the page put words in Mor's beak. */
export function morSay(text: string) {
  window.dispatchEvent(new CustomEvent('mor:say', { detail: text }))
}

/**
 * Mor is the site's guide and its progress bar: he walks across the bottom edge
 * as you read, turns round when you scroll back, and fans his tail if you click.
 */
export function Mor() {
  const t = useT()
  const root = useRef<HTMLButtonElement>(null)
  const sprite = useRef<HTMLCanvasElement>(null)
  const fan = useRef<HTMLCanvasElement>(null)
  const [say, setSay] = useState('')
  const [fanned, setFanned] = useState(false)

  useEffect(() => {
    gsap.set(root.current, { y: 40 })
    const off = onReady(() => gsap.to(root.current, { autoAlpha: 1, y: 0, duration: 0.6, delay: 1.1, ease: 'back.out(2)' }))
    return off
  }, [])

  useEffect(() => {
    const el = root.current!
    const c = sprite.current!
    paint(c, 2, 0)
    let last = window.scrollY
    let dist = 0
    let dir = 1
    let x = 8
    // GSAP owns this element's transform, so position goes through it too
    const setX = gsap.quickSetter(el, 'x', 'px')
    setX(x)
    const tick = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const y = window.scrollY
      const room = window.innerWidth - el.offsetWidth - 16
      const goal = 8 + (y / max) * room
      x += (goal - x) * 0.1
      const delta = y - last
      last = y
      if (Math.abs(delta) > 0.4) {
        dir = delta > 0 ? 1 : -1
        dist += Math.abs(delta)
        const f = Math.floor(dist / 42) % 4
        paint(c, FRAMES[f], f % 2)
      } else if (Math.abs(goal - x) < 1) {
        paint(c, 2, 0)
      }
      setX(x)
      // Past the middle, the speech bubble opens to his left so it stays on screen
      el.classList.toggle('is-right', x > window.innerWidth * 0.55)
      c.style.transform = `scaleX(${dir})`
    }
    if (!reduced) gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  // Says one line as each section arrives
  useEffect(() => {
    let timer = 0
    let cleanup = () => {}
    const onSay = (e: Event) => {
      setSay((e as CustomEvent<string>).detail)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setSay(''), 2200)
    }
    window.addEventListener('mor:say', onSay)
    const off = onReady(() => {
      const start = window.setTimeout(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-mor]'))
        const triggers = sections.map((s) =>
          ScrollTrigger.create({
            trigger: s,
            start: 'top 55%',
            end: 'bottom 45%',
            onToggle: (self) => {
              if (!self.isActive) return
              setSay(getDict().mor.lines[s.dataset.mor!] ?? '')
              window.clearTimeout(timer)
              timer = window.setTimeout(() => setSay(''), 2800)
            },
          }),
        )
        cleanup = () => triggers.forEach((t) => t.kill())
      }, 1500)
      cleanup = () => window.clearTimeout(start)
    })
    return () => {
      off()
      cleanup()
      window.clearTimeout(timer)
      window.removeEventListener('mor:say', onSay)
    }
  }, [])

  const onClick = useCallback(() => {
    if (fanned) return
    setFanned(true)
    setSay(getDict().mor.cry)
    const st = { n: 0 }
    gsap.to(st, {
      n: 24,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => fan.current && drawFanPixels(fan.current, st.n, fanMor),
    })
    window.setTimeout(() => {
      gsap.to(st, {
        n: 0,
        duration: 0.35,
        ease: 'power2.in',
        onUpdate: () => fan.current && drawFanPixels(fan.current, st.n, fanMor),
        onComplete: () => {
          setFanned(false)
          setSay('')
        },
      })
    }, 1500)
  }, [fanned])

  return (
    <button ref={root} className="mor" onClick={onClick} aria-label={t.mor.aria}>
      {say && (
        <span className="mor-say pixel" key={say}>
          {say}
        </span>
      )}
      <canvas ref={fan} className={`mor-fan ${fanned ? 'is-on' : ''}`} width={88} height={50} aria-hidden="true" />
      <canvas ref={sprite} className="mor-sprite" width={W} height={H + 1} aria-hidden="true" />
    </button>
  )
}
