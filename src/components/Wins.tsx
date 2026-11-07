import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { COMMITS } from '../data/commits'
import { ARCHIVE, HACKATHONS, PROJECTS, RESEARCH } from '../data/site'
import { gsap, palette as p, reduced, ScrollTrigger } from '../lib/motion'
import { Arrow, Rise } from './Bits'
import { detailApi } from './Detail'
import { paintMor } from './Mor'

/** Mor stands on the step you actually finished on. */
function Podium() {
  const [id, setId] = useState(HACKATHONS[0].id)
  const mor = useRef<HTMLCanvasElement>(null)
  const win = HACKATHONS.find((h) => h.id === id)!
  useEffect(() => {
    paintMor(mor.current!)
  }, [])
  const left = win.rank === 2 ? 16.6 : 83.4
  const bottom = win.rank === 2 ? 66 : 42
  return (
    <div className="podium-card">
      <div className="podium-tabs" role="tablist" aria-label="Hackathon results">
        {HACKATHONS.map((h) => (
          <button key={h.id} role="tab" aria-selected={h.id === id} className={`chip ${h.id === id ? 'is-on' : ''}`} onClick={() => setId(h.id)}>
            {h.name}
          </button>
        ))}
      </div>
      <div className="podium" aria-hidden="true">
        <canvas ref={mor} className="podium-mor" width={40} height={24} style={{ left: `${left}%`, bottom: `${bottom}%` }} />
        <div className={`step s2 ${win.rank === 2 ? 'is-on' : ''}`}><b className="pixel">2</b></div>
        <div className="step s1"><b className="pixel">1</b></div>
        <div className={`step s3 ${win.rank === 3 ? 'is-on' : ''}`}><b className="pixel">3</b></div>
      </div>
      <div className="podium-text" key={win.id}>
        <p className="pixel">{win.host}</p>
        <h3 className="display podium-title">{win.place}</h3>
        <p className="podium-note">{win.note}</p>
      </div>
    </div>
  )
}

/** 250 teams, narrowed to 40, narrowed to the podium. Each cell is one team. */
function Funnel() {
  const ref = useRef<HTMLCanvasElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const COLS = 25
    const ROWS = 10
    const CELL = 12
    const G = 3
    c.width = COLS * (CELL + G)
    c.height = ROWS * (CELL + G)
    const order = Array.from({ length: 250 }, (_, i) => i).sort(() => Math.random() - 0.5)
    const rank = new Int16Array(250)
    order.forEach((cell, i) => (rank[cell] = i))
    const state = { v: 0 }
    const draw = () => {
      const alive = 250 - (250 - 40) * Math.min(1, state.v / 0.6) - (40 - 3) * Math.max(0, (state.v - 0.6) / 0.4)
      ctx.clearRect(0, 0, c.width, c.height)
      for (let i = 0; i < 250; i++) {
        const x = (i % COLS) * (CELL + G)
        const y = Math.floor(i / COLS) * (CELL + G)
        const r = rank[i]
        ctx.fillStyle = r === 2 && state.v >= 0.98 ? p.s3 : r < 3 && state.v >= 0.98 ? p.g3 : r < alive ? p.ink : 'rgba(27, 35, 80, 0.1)'
        ctx.fillRect(x, y, CELL, CELL)
      }
      if (label.current) {
        const n = Math.round(alive)
        label.current.textContent = state.v >= 0.98 ? '3rd out of 250+ teams' : `${n} teams left`
      }
    }
    if (reduced) {
      state.v = 1
      draw()
      return
    }
    draw()
    const tw = gsap.to(state, { v: 1, duration: 3.4, ease: 'steps(34)', onUpdate: draw, paused: true })
    const st = ScrollTrigger.create({ trigger: c, start: 'top 80%', once: true, onEnter: () => tw.play() })
    const again = () => tw.restart()
    c.addEventListener('pointerenter', again)
    return () => {
      st.kill()
      tw.kill()
      c.removeEventListener('pointerenter', again)
    }
  }, [])
  return (
    <div className="funnel">
      <canvas ref={ref} data-cursor-label="Replay" role="img" aria-label="250 teams narrowed to 40 finalists, then to the three podium teams" />
      <p ref={label} className="pixel funnel-label" />
    </div>
  )
}

function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const el = ref.current!
    const fmt = (n: number) => Math.round(n).toLocaleString('en-IN') + suffix
    el.textContent = fmt(reduced ? to : 0)
    if (reduced) return
    const s = { v: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 96%',
      once: true,
      onEnter: () => gsap.to(s, { v: to, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(s.v)) }),
    })
    return () => st.kill()
  }, [to, suffix])
  return <span ref={ref} />
}

const openProject = (id: string, el: HTMLElement) => {
  const project = PROJECTS.find((x) => x.id === id)
  if (project) detailApi.open(project, () => el.getBoundingClientRect())
}

/** Every commit across all repositories, one pixel per day. */
function Calendar() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const CELL = 8
    const weeks = Math.ceil(COMMITS.cells.length / 7)
    c.width = weeks * CELL
    c.height = 7 * CELL
    const ramp = [p.paper2, p.g1, p.g2, p.s2, p.s3]
    const level = (n: number) => (n === 0 ? 0 : n < 3 ? 1 : n < 6 ? 2 : n < 12 ? 3 : 4)
    const start = new Date(COMMITS.start + 'T00:00:00Z')
    const shown = { v: reduced ? 1 : 0 }
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      const upto = shown.v * COMMITS.cells.length
      COMMITS.cells.forEach((n, i) => {
        if (i > upto) return
        ctx.fillStyle = ramp[level(n)]
        ctx.fillRect(Math.floor(i / 7) * CELL, (i % 7) * CELL, CELL - 1, CELL - 1)
      })
    }
    draw()
    const st = ScrollTrigger.create({
      trigger: c,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(shown, { v: 1, duration: 1.6, ease: 'none', onUpdate: draw }),
    })
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      const col = Math.floor(((e.clientX - r.left) / r.width) * weeks)
      const row = Math.floor(((e.clientY - r.top) / r.height) * 7)
      const i = col * 7 + row
      const n = COMMITS.cells[i]
      if (n === undefined) return
      const d = new Date(start.getTime() + i * 86400000)
      const day = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' })
      c.dataset.cursorLabel = `${n} on ${day}`
    }
    c.addEventListener('pointermove', move)
    return () => {
      st.kill()
      c.removeEventListener('pointermove', move)
    }
  }, [])
  return <canvas ref={ref} className="calendar" data-cursor-label="Hover a day" role="img" aria-label={`${COMMITS.total} commits over the past year`} />
}

export function Wins() {
  return (
    <>
      <section className="wins wrap" id="wins" data-mor="research">
        <Rise as="h2" className="display section-title" text="Wins so far" onScroll />
        <div className="wins-grid">
          <Podium />
          <Funnel />
          <div className="cesac-card" data-dark>
            <p className="pixel">CESAC, in just over a week</p>
            <dl className="stats">
              <div><dt>Students registered</dt><dd className="display"><Count to={1554} /></dd></div>
              <div><dt>Records submitted</dt><dd className="display"><Count to={5683} /></dd></div>
              <div><dt>Page views</dt><dd className="display"><Count to={62000} suffix="+" /></dd></div>
            </dl>
            <button className="btn btn-paper" onClick={(e) => openProject('cesac', e.currentTarget)}>Open CESAC <Arrow /></button>
          </div>
        </div>
      </section>

      <section className="log wrap" data-mor="activity">
        <div className="log-side">
          <Rise as="h2" className="display section-title" text={'Research\nand deep dives'} onScroll />
        </div>
        <ul className="log-list">
          {RESEARCH.map((r) => (
            <li key={r.id}>
              <button className="log-row" data-cursor-label="Open" onClick={(e) => openProject(r.id, e.currentTarget)}>
                <span className="display log-title">{r.title}</span>
                <span className="log-where">{r.where}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="activity wrap">
        <div className="activity-head">
          <h2 className="display section-title">Always shipping</h2>
          <dl className="numbers">
            <div><dd className="display"><Count to={COMMITS.total} /></dd><dt>commits</dt></div>
            <div><dd className="display"><Count to={33} /></dd><dt>repositories</dt></div>
            <div><dd className="display"><Count to={39} /></dd><dt>Vercel projects</dt></div>
          </dl>
        </div>
        <Calendar />
      </section>

      <section className="archive wrap">
        <p className="pixel archive-kicker">Also on the shelf</p>
        <ul className="archive-list">
          {ARCHIVE.map((a) => (
            <li key={a.title}>
              <a href={a.href} target="_blank" rel="noreferrer" className="archive-row">
                <span className="display">{a.title}</span>
                <span className="archive-note">{a.note}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
