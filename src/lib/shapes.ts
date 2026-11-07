import india from '@svg-maps/india'
import { LAND, LAND_H, LAND_W } from '../data/land'
import { palette as p } from './motion'

export type FanColors = {
  barb: string
  barbAlt: string
  stem: string
  ring: string
  eye: string
  core: string
  body: string
  /** Cuts the eye ring out of the feather. Used where the fan works as a mask. */
  hollow?: boolean
}

export const fanOnPaper: FanColors = {
  barb: p.bl2,
  barbAlt: p.bl1,
  stem: p.bl3,
  ring: p.pk2,
  eye: p.pk3,
  core: p.ink,
  body: p.ink,
}

/** Mor's own tail, in his fixed colours. */
export const fanMor: FanColors = {
  barb: '#a8d5b0',
  barbAlt: '#d6ecd6',
  stem: '#6bb58a',
  ring: '#f9c794',
  eye: '#f2a65a',
  core: '#1b2350',
  body: '#1b2350',
}

/**
 * The 24 feather fan. `count` can be fractional, which is how the loader grows
 * one feather at a time.
 */
export function drawFan(ctx: CanvasRenderingContext2D, w: number, h: number, count = 24, c: FanColors = fanOnPaper) {
  const cx = w / 2
  const cy = h * 0.93
  const R = Math.min(w * 0.47, h * 0.86)
  const total = 24
  const from = Math.PI * 1.04
  const to = -Math.PI * 0.04

  for (let i = 0; i < total; i++) {
    // Feathers grow outward from the centre of the fan, in pairs
    const order = Math.abs(i - (total - 1) / 2)
    const rank = (total - 1) / 2 - order
    const g = Math.max(0, Math.min(1, count / 2 - (11.5 - rank) + 0.5))
    if (g <= 0) continue

    const a = from + (to - from) * (i / (total - 1))
    const len = R * (i % 2 ? 0.84 : 1) * g
    const ca = Math.cos(a)
    const sa = -Math.sin(a)
    const tipX = cx + ca * len
    const tipY = cy + sa * len
    const nx = -sa
    const ny = ca
    const half = R * 0.066 * (i % 2 ? 0.88 : 1)

    // Barbs: a teardrop that widens toward the tip
    ctx.fillStyle = i % 2 ? c.barbAlt : c.barb
    ctx.beginPath()
    ctx.moveTo(cx + ca * R * 0.1, cy + sa * R * 0.1)
    ctx.quadraticCurveTo(cx + ca * len * 0.62 + nx * half * 1.1, cy + sa * len * 0.62 + ny * half * 1.1, tipX + nx * half, tipY + ny * half)
    ctx.quadraticCurveTo(tipX + ca * half * 1.5, tipY + sa * half * 1.5, tipX - nx * half, tipY - ny * half)
    ctx.quadraticCurveTo(cx + ca * len * 0.62 - nx * half * 1.1, cy + sa * len * 0.62 - ny * half * 1.1, cx + ca * R * 0.1, cy + sa * R * 0.1)
    ctx.fill()

    // Stem
    ctx.strokeStyle = c.stem
    ctx.lineWidth = Math.max(1, R * 0.008)
    ctx.beginPath()
    ctx.moveTo(cx + ca * R * 0.1, cy + sa * R * 0.1)
    ctx.lineTo(tipX, tipY)
    ctx.stroke()

    // Eye
    if (g > 0.55) {
      const ex = cx + ca * (len - half * 0.5)
      const ey = cy + sa * (len - half * 0.5)
      const dot = (r: number, col: string) => {
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.arc(ex, ey, r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (c.hollow) {
        ctx.globalCompositeOperation = 'destination-out'
        dot(half * 0.86, '#000')
        ctx.globalCompositeOperation = 'source-over'
        dot(half * 0.42, c.core)
      } else {
        dot(half * 0.92, c.ring)
        dot(half * 0.62, c.eye)
        dot(half * 0.34, c.core)
      }
    }
  }

  // Body and head, seen from the front
  ctx.fillStyle = c.body
  const b = R * 0.085
  ctx.beginPath()
  ctx.ellipse(cx, cy - b * 0.5, b * 1.15, b * 1.7, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(cx - b * 0.34, cy - b * 1.6)
  ctx.lineTo(cx - b * 0.2, cy - b * 3.1)
  ctx.lineTo(cx + b * 0.2, cy - b * 3.1)
  ctx.lineTo(cx + b * 0.34, cy - b * 1.6)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx, cy - b * 3.3, b * 0.46, 0, Math.PI * 2)
  ctx.fill()
  for (const dx of [-0.42, 0, 0.42]) {
    ctx.fillStyle = c.body
    ctx.fillRect(cx + dx * b - b * 0.03, cy - b * 4.4, b * 0.07, b * 0.8)
    ctx.fillStyle = c.eye
    ctx.beginPath()
    ctx.arc(cx + dx * b, cy - b * 4.45, b * 0.13, 0, Math.PI * 2)
    ctx.fill()
  }
}

/** Draws the fan at low resolution and hardens it into true pixels on a fixed palette. */
export function drawFanPixels(target: HTMLCanvasElement, count: number, c: FanColors = fanOnPaper) {
  const { width: w, height: h } = target
  const ctx = target.getContext('2d', { willReadFrequently: true })!
  ctx.clearRect(0, 0, w, h)
  drawFan(ctx, w, h, count, c)
  const img = ctx.getImageData(0, 0, w, h)
  const d = img.data
  for (let i = 3; i < d.length; i += 4) d[i] = d[i] > 110 ? 255 : 0
  ctx.putImageData(img, 0, 0)
}

const S = 512

const blank = () => {
  const c = document.createElement('canvas')
  c.width = c.height = S
  return { c, ctx: c.getContext('2d', { willReadFrequently: true })! }
}

/* Geography */

export const PUNE_LATLON = { lat: 18.52, lon: 73.86 }

const [, , MAP_W, MAP_H] = india.viewBox.split(' ').map(Number)
const MAP_K = (S * 0.96) / Math.max(MAP_W, MAP_H)
const MAP_X = (S - MAP_W * MAP_K) / 2
const MAP_Y = (S - MAP_H * MAP_K) / 2

/** The viewBox that lines an SVG of the map up exactly with the particle India. */
export const INDIA_VIEWBOX = `${-MAP_X / MAP_K} ${-MAP_Y / MAP_K} ${S / MAP_K} ${S / MAP_K}`
export const indiaLocations = india.locations

// The map data is Mercator, confirmed against Maharashtra's real extent
const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
const indiaXY = (lat: number, lon: number): [number, number] => [
  ((lon - 68.1) / (97.42 - 68.1)) * MAP_W,
  ((merc(37.08) - merc(lat)) / (merc(37.08) - merc(6.75))) * MAP_H,
]
const PUNE_MAP = indiaXY(PUNE_LATLON.lat, PUNE_LATLON.lon)

function dawnGradient(ctx: CanvasRenderingContext2D, h: number) {
  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, p.bl3)
  g.addColorStop(0.3, p.bl2)
  g.addColorStop(0.46, p.onNight)
  g.addColorStop(0.62, p.onNight)
  g.addColorStop(0.78, p.pk2)
  g.addColorStop(1, p.pk3)
  return g
}

function indiaTarget() {
  const { c, ctx } = blank()
  ctx.save()
  ctx.setTransform(MAP_K, 0, 0, MAP_K, MAP_X, MAP_Y)
  ctx.fillStyle = dawnGradient(ctx, MAP_H)
  for (const l of india.locations) ctx.fill(new Path2D(l.path))
  const [px, py] = PUNE_MAP
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(px, py, 15, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = p.pk3
  ctx.beginPath()
  ctx.arc(px, py, 9, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  return c
}

/* Pune, drawn from real coordinates over roughly a 30 by 30 km window */

const PN = { n: 18.68, s: 18.4, w: 73.7, e: 74.0 }
export const puneXY = (lat: number, lon: number): [number, number] => [
  ((lon - PN.w) / (PN.e - PN.w)) * S,
  ((PN.n - lat) / (PN.n - PN.s)) * S,
]

const line = (ctx: CanvasRenderingContext2D, pts: [number, number][], width: number, color: string) => {
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.beginPath()
  pts.forEach(([lat, lon], i) => {
    const [x, y] = puneXY(lat, lon)
    if (i) ctx.lineTo(x, y)
    else ctx.moveTo(x, y)
  })
  ctx.stroke()
}

function puneTarget() {
  const { c, ctx } = blank()
  // Hills to the south and west
  ctx.fillStyle = '#3f8f7f'
  let hill = 11
  const wobble = () => ((hill = (hill * 16807) % 2147483647) / 2147483647)
  for (const [lat, lon, r] of [[18.43, 73.74, 62], [18.47, 73.79, 26], [18.505, 73.82, 18], [18.56, 73.72, 30], [18.415, 73.92, 34]] as const) {
    const [x, y] = puneXY(lat, lon)
    ctx.beginPath()
    for (let i = 0; i <= 24; i++) {
      const a = (i / 24) * Math.PI * 2
      const k = r * (0.72 + wobble() * 0.5)
      ctx.lineTo(x + Math.cos(a) * k, y + Math.sin(a) * k * 0.82)
    }
    ctx.fill()
  }
  // The built up city, as scattered blocks
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  ctx.fillStyle = '#4a558f'
  for (let i = 0; i < 900; i++) {
    const a = rnd() * Math.PI * 2
    const r = Math.pow(rnd(), 0.7) * 205
    const x = S * 0.56 + Math.cos(a) * r * 1.05
    const y = S * 0.46 + Math.sin(a) * r * 0.86
    ctx.fillRect(Math.round(x / 6) * 6, Math.round(y / 6) * 6, 5, 5)
  }
  // Main roads
  const road = '#aab0cf'
  line(ctx, [[18.42, 73.84], [18.47, 73.815], [18.51, 73.8], [18.56, 73.775], [18.62, 73.745], [18.67, 73.71]], 4, road)
  line(ctx, [[18.53, 73.85], [18.565, 73.825], [18.6, 73.8], [18.64, 73.77]], 3, road)
  line(ctx, [[18.51, 73.86], [18.47, 73.86], [18.43, 73.86], [18.4, 73.855]], 4, road)
  line(ctx, [[18.51, 73.875], [18.5, 73.92], [18.49, 73.97], [18.485, 74.0]], 3, road)
  line(ctx, [[18.535, 73.885], [18.56, 73.92], [18.585, 73.965], [18.6, 74.0]], 3, road)
  // Mutha and Mula, meeting at the Sangam
  const river = p.onNight
  line(ctx, [[18.44, 73.76], [18.465, 73.79], [18.49, 73.815], [18.51, 73.84], [18.525, 73.855], [18.54, 73.87]], 7, river)
  line(ctx, [[18.585, 73.77], [18.57, 73.81], [18.565, 73.84], [18.55, 73.86], [18.54, 73.87]], 6, river)
  line(ctx, [[18.54, 73.87], [18.535, 73.9], [18.53, 73.93], [18.545, 73.97], [18.56, 74.0]], 7, river)
  return c
}

/* What I build */

export type Graph = {
  nodes: { x: number; y: number; label?: string; layer: number }[]
  edges: [number, number][]
}

export const PIPE: Graph = {
  nodes: [
    { x: 56, y: 256, label: 'Client', layer: 0 },
    { x: 196, y: 256, label: 'API', layer: 1 },
    { x: 324, y: 126, label: 'Auth', layer: 2 },
    { x: 324, y: 386, label: 'Queue', layer: 2 },
    { x: 456, y: 256, label: 'Postgres', layer: 3 },
  ],
  edges: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]],
}

export const NET: Graph = (() => {
  const layers = [4, 6, 6, 3]
  const nodes: Graph['nodes'] = []
  layers.forEach((n, layer) => {
    for (let i = 0; i < n; i++) nodes.push({ x: 60 + layer * 130, y: 256 + (i - (n - 1) / 2) * 72, layer })
  })
  const edges: [number, number][] = []
  nodes.forEach((a, i) => nodes.forEach((b, j) => {
    if (b.layer === a.layer + 1) edges.push([i, j])
  }))
  return { nodes, edges }
})()

function graphTarget(g: Graph, boxy: boolean) {
  const { c, ctx } = blank()
  ctx.lineWidth = boxy ? 5 : 1.6
  ctx.strokeStyle = boxy ? '#aab0cf' : 'rgba(170,176,207,0.75)'
  for (const [a, b] of g.edges) {
    ctx.beginPath()
    ctx.moveTo(g.nodes[a].x, g.nodes[a].y)
    ctx.lineTo(g.nodes[b].x, g.nodes[b].y)
    ctx.stroke()
  }
  const last = Math.max(...g.nodes.map((n) => n.layer))
  for (const n of g.nodes) {
    ctx.fillStyle = n.layer === 0 ? p.pk2 : n.layer === last ? p.bl2 : p.onNight
    if (boxy) ctx.fillRect(n.x - 38, n.y - 38, 76, 76)
    else {
      ctx.beginPath()
      ctx.arc(n.x, n.y, 19, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  return c
}

function codeTarget() {
  const { c, ctx } = blank()
  ctx.lineCap = 'square'
  ctx.lineJoin = 'miter'
  ctx.lineWidth = 46
  ctx.strokeStyle = p.pk2
  ctx.beginPath()
  ctx.moveTo(165, 130)
  ctx.lineTo(45, 256)
  ctx.lineTo(165, 382)
  ctx.stroke()
  ctx.strokeStyle = p.bl2
  ctx.beginPath()
  ctx.moveTo(347, 130)
  ctx.lineTo(467, 256)
  ctx.lineTo(347, 382)
  ctx.stroke()
  ctx.strokeStyle = p.onNight
  ctx.beginPath()
  ctx.moveTo(300, 90)
  ctx.lineTo(212, 422)
  ctx.stroke()
  return c
}

function sunriseTarget() {
  const { c, ctx } = blank()
  const cx = 256
  const cy = 330
  ctx.fillStyle = p.pk3
  ctx.beginPath()
  ctx.arc(cx, cy, 120, Math.PI, 0)
  ctx.fill()
  ctx.strokeStyle = p.pk2
  ctx.lineWidth = 12
  for (let i = 0; i < 13; i++) {
    const a = Math.PI + (Math.PI * i) / 12
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a) * 150, cy + Math.sin(a) * 150)
    ctx.lineTo(cx + Math.cos(a) * (i % 2 ? 195 : 235), cy + Math.sin(a) * (i % 2 ? 195 : 235))
    ctx.stroke()
  }
  ctx.fillStyle = p.onNight
  ctx.fillRect(30, cy + 14, 452, 12)
  ctx.fillStyle = p.bl2
  ctx.fillRect(80, cy + 46, 352, 12)
  ctx.fillStyle = p.bl3
  ctx.fillRect(140, cy + 78, 232, 12)
  return c
}

/* Particle targets: each is one Float32Array of [x, y, z, packedColour] per particle */

const pack = (r: number, g: number, b: number) => r * 65536 + g * 256 + b

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** Turns a drawing into N particle homes, keeping each pixel's colour. */
function sample(canvas: HTMLCanvasElement, n: number) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  const { data } = ctx.getImageData(0, 0, S, S)
  const lit: number[] = []
  for (let i = 0; i < S * S; i++) if (data[i * 4 + 3] > 96) lit.push(i)
  const out = new Float32Array(n * 4)
  for (let i = 0; i < n; i++) {
    const idx = lit[(Math.random() * lit.length) | 0]
    const x = idx % S
    const y = (idx / S) | 0
    out[i * 4] = (x + Math.random() - S / 2) / (S / 2)
    out[i * 4 + 1] = -(y + Math.random() - S / 2) / (S / 2)
    out[i * 4 + 2] = Math.random() * 2 - 1
    out[i * 4 + 3] = pack(data[idx * 4], data[idx * 4 + 1], data[idx * 4 + 2])
  }
  return out
}

/** Land from the bitmask, oceans as a sparse grid, India tinted like the dawn sky. */
function globeTarget(n: number) {
  const bytes = Uint8Array.from(atob(LAND), (ch) => ch.charCodeAt(0))
  const land = (lat: number, lon: number) => {
    const x = Math.min(LAND_W - 1, Math.floor(lon + 180))
    const y = Math.min(LAND_H - 1, Math.floor(90 - lat))
    const i = y * LAND_W + x
    return (bytes[i >> 3] >> (i & 7)) & 1
  }
  const map = indiaTarget()
  const md = map.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, S, S).data
  const inIndia = (lat: number, lon: number) => {
    if (lat < 6 || lat > 38 || lon < 67 || lon > 98) return -1
    const [mx, my] = indiaXY(lat, lon)
    const x = Math.round(mx * MAP_K + MAP_X)
    const y = Math.round(my * MAP_K + MAP_Y)
    if (x < 0 || y < 0 || x >= S || y >= S) return -1
    const i = (y * S + x) * 4
    return md[i + 3] > 96 ? i : -1
  }
  const dim = hex('#7f88bd')
  const sea = hex('#2c3672')
  const out = new Float32Array(n * 4)
  let i = 0
  while (i < n) {
    const zz = Math.random() * 2 - 1
    const lat = (Math.asin(zz) * 180) / Math.PI
    const lon = Math.random() * 360 - 180
    const hit = inIndia(lat, lon)
    const isLand = hit >= 0 || land(lat, lon)
    if (!isLand && Math.random() > 0.1) continue
    const cl = Math.cos((lat * Math.PI) / 180)
    const rl = (lon * Math.PI) / 180
    out[i * 4] = cl * Math.sin(rl)
    out[i * 4 + 1] = zz
    out[i * 4 + 2] = cl * Math.cos(rl)
    out[i * 4 + 3] = hit >= 0 ? pack(md[hit], md[hit + 1], md[hit + 2]) : isLand ? pack(...dim) : pack(...sea)
    i++
  }
  return out
}

export const TARGET = { GLOBE: 0, INDIA: 1, PUNE: 2, CODE: 3, PIPE: 4, NET: 5, SUN: 6 } as const

export function buildTargets(n: number): Float32Array[] {
  return [
    globeTarget(n),
    sample(indiaTarget(), n),
    sample(puneTarget(), n),
    sample(codeTarget(), n),
    sample(graphTarget(PIPE, true), n),
    sample(graphTarget(NET, false), n),
    sample(sunriseTarget(), n),
  ]
}
