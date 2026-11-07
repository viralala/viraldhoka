import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const palette = {
  paper: '#fbf6ec',
  paper2: '#f4ecdd',
  ink: '#1b2350',
  night: '#141a40',
  night2: '#202a5e',
  onNight: '#f6efe2',
  s1: '#fde6cc',
  s2: '#f9c794',
  s3: '#f2a65a',
  g1: '#d6ecd6',
  g2: '#a8d5b0',
  g3: '#6bb58a',
}

export const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

let lenis: Lenis | null = null

export function startSmoothScroll() {
  if (reduced || lenis) return
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

export const getLenis = () => lenis
export const scrollVelocity = () => lenis?.velocity ?? 0

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.classList.toggle('is-locked', locked)
}

/* App ready: the moment the loader lifts. Pages wait on this for entrances. */
let ready = false
const waiting = new Set<() => void>()
export function markReady() {
  ready = true
  waiting.forEach((cb) => cb())
  waiting.clear()
}
export function onReady(cb: () => void) {
  if (ready) {
    cb()
    return () => {}
  }
  waiting.add(cb)
  return () => {
    waiting.delete(cb)
  }
}
