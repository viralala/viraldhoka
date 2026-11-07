import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const palette = {
  paper: '#fcfbfe',
  paper2: '#f2f1f8',
  ink: '#1b2350',
  night: '#141a40',
  night2: '#202a5e',
  onNight: '#f6f5fc',
  // Pink ramp, light to strong
  pk1: '#fde4ee',
  pk2: '#f6bfd5',
  pk3: '#ec8db5',
  // Blue ramp, light to strong
  bl1: '#dce7fc',
  bl2: '#a9c4f5',
  bl3: '#6b95e8',
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
