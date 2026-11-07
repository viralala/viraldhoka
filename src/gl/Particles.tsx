import { useEffect, useRef } from 'react'
import { finePointer, gsap, reduced } from '../lib/motion'
import { buildTargets } from '../lib/shapes'

const VERT = `
attribute vec4 aA, aB, aRnd;
uniform float uT, uTime, uPoint, uGrid, uScale, uSpread, uSphereA, uSphereB, uShockT;
uniform mat3 uRot;
uniform vec2 uAspect, uMouse, uOffset, uShock;
varying vec3 vCol;
varying float vAlpha;

vec3 unpack(float c){
  float r = floor(c / 65536.);
  float g = floor((c - r * 65536.) / 256.);
  return vec3(r, g, c - r * 65536. - g * 256.) / 255.;
}

void main(){
  float t = smoothstep(aRnd.x * .45, .55 + aRnd.x * .45, uT);
  vec3 A = mix(aA.xyz, uRot * aA.xyz, uSphereA);
  vec3 B = mix(aB.xyz, uRot * aB.xyz, uSphereB);
  vec3 pos = mix(A, B, t);
  float travel = sin(t * 3.14159);
  float sphere = mix(uSphereA, uSphereB, t);

  // In flight the pixels turn to dust, on a curling path
  float ph = aRnd.y * 6.283;
  vec2 swirl = vec2(
    sin(pos.y * 3.1 + uTime * .5 + ph) + sin(pos.x * 5.3 + ph),
    cos(pos.x * 2.7 - uTime * .4 + ph) + cos(pos.y * 4.1 - ph)
  );
  pos.xy += swirl * travel * (.16 + aRnd.z * .3);

  // At rest they settle on the pixel grid, so every shape reads as pixel art
  vec2 snapped = floor(pos.xy / uGrid + .5) * uGrid;
  pos.xy = mix(pos.xy, snapped, (1. - travel) * .94);

  // Idle shimmer
  pos.xy += vec2(sin(uTime * .7 + ph), cos(uTime * .6 + ph)) * .0035 * (1. + aRnd.w);

  // Before the story starts the pixels are scattered stars across the whole stage
  vec2 star = (vec2(aRnd.y, aRnd.z) * 2. - 1.) * 1.9;
  pos.xy = mix(pos.xy, star, uSpread * uSpread);

  vec2 world = pos.xy * uScale + uOffset * (1. - uSpread);

  // The pointer pushes pixels aside
  vec2 d = (world - uMouse) * uAspect;
  float m = exp(-dot(d, d) / .028);
  world += normalize(d + 1e-4) / uAspect * m * .11 * (.45 + aRnd.z);

  // A click sends a ring through them
  vec2 sd = (world - uShock) * uAspect;
  float sl = length(sd);
  float ring = exp(-pow((sl - uShockT * 1.5) / .14, 2.)) * (1. - uShockT);
  world += normalize(sd + 1e-4) / uAspect * ring * .2 * (.5 + aRnd.w);

  gl_Position = vec4(world * uAspect, 0., 1.);
  gl_PointSize = uPoint * (1. + aRnd.w * .5 + travel * .3 + ring * 1.2);

  // The far side of the globe stays dark, so it reads as a solid ball
  float facing = smoothstep(-.04, .16, pos.z);
  vCol = mix(unpack(aA.w), unpack(aB.w), t);
  vAlpha = (.95 - travel * .25) * smoothstep(1., .55, uSpread) * mix(1., facing, sphere * (1. - travel));
}`

const FRAG = `
precision mediump float;
varying vec3 vCol;
varying float vAlpha;
void main(){ gl_FragColor = vec4(vCol, vAlpha); }`

export type ParticleControl = {
  from: number
  to: number
  t: number
  spread: number
  offsetX: number
  offsetY: number
  scale: number
  /** Rotation of the globe, row-major 3x3, already combined */
  rot: number[]
  sphereA: number
  sphereB: number
}

/** Plain WebGL: one buffer per shape, and only the two in play are bound each frame. */
export function Particles({ control }: { control: React.RefObject<ParticleControl> }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const gl = c.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: 'high-performance' })
    if (!gl) return
    const mobile = window.innerWidth < 768
    const N = mobile ? 16000 : 34000
    const dpr = Math.min(window.devicePixelRatio, 2)

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s))
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    const buffers = buildTargets(N).map((data) => {
      const b = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, b)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      return b
    })
    const rnd = new Float32Array(N * 4)
    for (let i = 0; i < rnd.length; i++) rnd[i] = Math.random()
    const rb = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, rb)
    gl.bufferData(gl.ARRAY_BUFFER, rnd, gl.STATIC_DRAW)
    const aRnd = gl.getAttribLocation(prog, 'aRnd')
    gl.enableVertexAttribArray(aRnd)
    gl.vertexAttribPointer(aRnd, 4, gl.FLOAT, false, 0, 0)
    const aA = gl.getAttribLocation(prog, 'aA')
    const aB = gl.getAttribLocation(prog, 'aB')
    gl.enableVertexAttribArray(aA)
    gl.enableVertexAttribArray(aB)

    const u = (n: string) => gl.getUniformLocation(prog, n)
    const U = {
      t: u('uT'), time: u('uTime'), spread: u('uSpread'), sA: u('uSphereA'), sB: u('uSphereB'), rot: u('uRot'),
      aspect: u('uAspect'), mouse: u('uMouse'), offset: u('uOffset'), scale: u('uScale'), shock: u('uShock'), shockT: u('uShockT'),
    }
    gl.uniform1f(u('uPoint'), 2.1 * dpr)
    gl.uniform1f(u('uGrid'), 0.0125)

    const aspect = { x: 1, y: 1 }
    const resize = () => {
      const w = c.clientWidth
      const h = c.clientHeight
      c.width = Math.round(w * dpr)
      c.height = Math.round(h * dpr)
      gl.viewport(0, 0, c.width, c.height)
      const s = Math.min(w, h)
      aspect.x = s / w
      aspect.y = s / h
      gl.uniform2f(U.aspect, aspect.x, aspect.y)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)

    const toWorld = (e: PointerEvent): [number, number] => {
      const r = c.getBoundingClientRect()
      return [(((e.clientX - r.left) / r.width) * 2 - 1) / aspect.x, (-((e.clientY - r.top) / r.height) * 2 + 1) / aspect.y]
    }
    const mouse = { x: 9, y: 9, tx: 9, ty: 9 }
    const onMove = (e: PointerEvent) => {
      ;[mouse.tx, mouse.ty] = toWorld(e)
    }
    const shock = { x: 0, y: 0, t: 1 }
    const onDown = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      if (r.bottom < 40 || r.top > window.innerHeight - 40) return
      ;[shock.x, shock.y] = toWorld(e)
      gsap.killTweensOf(shock)
      shock.t = 0
      gsap.to(shock, { t: 1, duration: 1.1, ease: 'power1.out' })
    }
    if (finePointer) window.addEventListener('pointermove', onMove, { passive: true })
    const stage = c.parentElement!
    stage.addEventListener('pointerdown', onDown)

    let visible = false
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting))
    io.observe(c)

    let cleared = false
    const tick = () => {
      const k = control.current
      if (!visible || k.spread >= 1) {
        if (!cleared) gl.clear(gl.COLOR_BUFFER_BIT)
        cleared = true
        return
      }
      cleared = false
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[k.from])
      gl.vertexAttribPointer(aA, 4, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[k.to])
      gl.vertexAttribPointer(aB, 4, gl.FLOAT, false, 0, 0)
      gl.uniform1f(U.t, k.t)
      gl.uniform1f(U.spread, k.spread)
      gl.uniform1f(U.sA, k.sphereA)
      gl.uniform1f(U.sB, k.sphereB)
      gl.uniform1f(U.scale, k.scale)
      gl.uniform2f(U.offset, k.offsetX, k.offsetY)
      // WebGL matrices are column-major, control.rot is row-major
      const r = k.rot
      gl.uniformMatrix3fv(U.rot, false, [r[0], r[3], r[6], r[1], r[4], r[7], r[2], r[5], r[8]])
      gl.uniform1f(U.time, reduced ? 0 : performance.now() / 1000)
      mouse.x += (mouse.tx - mouse.x) * 0.14
      mouse.y += (mouse.ty - mouse.y) * 0.14
      gl.uniform2f(U.mouse, mouse.x, mouse.y)
      gl.uniform2f(U.shock, shock.x, shock.y)
      gl.uniform1f(U.shockT, shock.t)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.POINTS, 0, N)
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerdown', onDown)
      ro.disconnect()
      io.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [control])

  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
