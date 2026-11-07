import { useEffect, useRef } from 'react'
import { finePointer, gsap, hexToRgb, palette as p, reduced } from '../lib/motion'

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uMouse, uLook;
uniform float uTime, uClose, uCell, uMode;
uniform vec3 uPaper, uS1, uS2, uS3, uG1, uG2, uG3, uNight;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * vnoise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}
float bayer2(vec2 a){ a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a){ return bayer2(0.5 * a) * 0.25 + bayer2(a); }

vec3 ramp(float k, bool top){
  if (k < 0.5) return uPaper;
  if (k < 1.5) return top ? uS1 : uG1;
  if (k < 2.5) return top ? uS2 : uG2;
  if (k < 3.5) return top ? uS3 : uG3;
  return uNight;
}

void main(){
  vec2 px = gl_FragCoord.xy;
  vec2 cell = floor(px / uCell);
  vec2 cc = (cell + 0.5) * uCell;
  vec2 uv = cc / uRes.y;
  float y = cc.y / uRes.y;
  float x = abs(cc.x / uRes.x - 0.5) * 2.0;

  float t = uTime;
  uv += uLook * 0.05 + vec2(0.0, uClose * 0.35);

  // A slow warp makes the clouds billow and roll instead of sliding as one sheet
  vec2 q = uv * vec2(2.2, 2.9);
  vec2 warp = vec2(vnoise(q * 0.9 + t * 0.13), vnoise(q * 0.9 + 7.3 - t * 0.11)) - 0.5;
  float n = fbm(q + warp * 1.1 + vec2(t * 0.075, -t * 0.02));
  n = n * 0.68 + fbm(uv * vec2(5.6, 6.4) + warp * 0.6 + vec2(-t * 0.13, 3.1 + t * 0.03)) * 0.32;

  float d;
  bool top;
  if (uMode < 0.5) {
    // Hero: saffron above, clear ivory across the middle, green below. Flag order.
    float edge = abs(y - 0.5) * 2.0;
    d = (n - 0.5) * 3.1 + pow(edge, 1.7) * 1.35 + x * x * 0.55 - 0.3 + uClose * uClose * 2.75;
    top = y + (n - 0.5) * 0.5 > 0.5;

    // Quick small puffs race across the middle of the sky, in front of the main banks
    float puff = fbm(uv * vec2(3.1, 5.2) + vec2(t * 0.21, 9.0 + warp.y)) - 0.6;
    d = max(d, puff * 5.0 - 0.1);

    // Keep the headline readable: the sky thins out behind it
    float cy = (y - 0.52) / 0.27;
    float cx = (cc.x / uRes.x - 0.5) / 0.42;
    d -= exp(-(cx * cx + cy * cy)) * 1.15 * (1.0 - uClose);
  } else {
    // Footer: one bank of cloud at the horizon, saffron and green drifting through it
    d = (n - 0.5) * 2.0 + pow(1.0 - y, 2.4) * 1.6 - 0.62;
    top = fbm(uv * 1.3 + vec2(uTime * 0.01, 7.0)) > 0.5;
  }

  // The sky parts around the pointer
  vec2 dm = cc - uMouse;
  float R = uRes.y * 0.19;
  d -= exp(-dot(dm, dm) / (R * R)) * 0.8 * (1.0 - uClose);

  // Night only exists once the clouds start to close; at rest the sky stays pastel
  float limit = 2.55 + smoothstep(0.0, 0.3, uClose) * 1.45;
  float v = clamp(d * 3.0, 0.0, limit);

  float k = floor(v);
  float fq = floor(fract(v) * 4.0) / 4.0;
  float dither = bayer4(floor(px));
  float pick = dither < fq ? k + 1.0 : k;
  gl_FragColor = vec4(ramp(pick, top), 1.0);
}`

type Props = {
  mode?: 'hero' | 'footer'
  closeRef?: React.RefObject<number>
  cell?: number
}

// Rendered at half resolution and scaled up with hard pixels: a quarter of the
// shader work for the same look, since one drawn pixel is the 2px dither step.
const RES = 0.5

export function Sky({ mode = 'hero', closeRef, cell = 14 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) {
      canvas.style.background = `linear-gradient(${p.s1}, ${p.paper} 40%, ${p.paper} 60%, ${p.g1})`
      return
    }
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
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = u('uRes')
    const uMouse = u('uMouse')
    const uTime = u('uTime')
    const uClose = u('uClose')
    const uLook = u('uLook')
    const colors: [string, string][] = [
      ['uPaper', p.paper],
      ['uS1', p.s1],
      ['uS2', p.s2],
      ['uS3', p.s3],
      ['uG1', p.g1],
      ['uG2', p.g2],
      ['uG3', p.g3],
      ['uNight', p.night],
    ]
    colors.forEach(([n, c]) => gl.uniform3fv(u(n), hexToRgb(c)))
    gl.uniform1f(u('uCell'), cell * RES)
    gl.uniform1f(u('uMode'), mode === 'hero' ? 0 : 1)

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, lx: 0, ly: 0, ltx: 0, lty: 0 }
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(r.width * RES))
      canvas.height = Math.max(1, Math.round(r.height * RES))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      draw(performance.now())
    }
    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      gl.uniform1f(uTime, reduced ? 12 : now / 1000 + 40)
      gl.uniform1f(uClose, closeRef?.current ?? 0)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      mouse.lx += (mouse.ltx - mouse.lx) * 0.05
      mouse.ly += (mouse.lty - mouse.ly) * 0.05
      gl.uniform2f(uLook, mouse.lx, mouse.ly)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const mx = (e.clientX - r.left) * RES
      const my = (r.height - (e.clientY - r.top)) * RES
      if (mouse.tx < -9000) {
        mouse.x = mx
        mouse.y = my
      }
      mouse.tx = mx
      mouse.ty = my
      mouse.ltx = e.clientX / window.innerWidth - 0.5
      mouse.lty = 0.5 - e.clientY / window.innerHeight
    }

    let visible = true
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting))
    io.observe(canvas)
    // Once the sky has fully closed the frame is solid navy, so stop drawing it
    let closed = false
    const tick = () => {
      const full = (closeRef?.current ?? 0) >= 1
      if (visible && !(full && closed)) draw(performance.now())
      closed = full
    }
    resize()
    if (!reduced) gsap.ticker.add(tick)
    if (finePointer) window.addEventListener('pointermove', onMove, { passive: true })
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', onMove)
      ro.disconnect()
      io.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [mode, closeRef, cell])

  return <canvas ref={ref} className="sky" aria-hidden="true" />
}
