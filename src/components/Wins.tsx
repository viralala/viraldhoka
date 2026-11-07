import { useEffect, useRef, useState } from 'react'
import { COMMITS } from '../data/commits'
import { ARCHIVE, HACKATHONS, PROJECTS, RESEARCH } from '../data/site'
import { gsap, palette as p, reduced, ScrollTrigger } from '../lib/motion'
import { Arrow, Count, Rise } from './Bits'
import { getDict, getLocale, useLang, useT } from '../i18n'
import { detailApi } from './Detail'
import { paintMor } from './Mor'

/** Mor stands on the step you actually finished on. */
function Podium() {
  const t = useT()
  const [id, setId] = useState(HACKATHONS[0].id)
  const mor = useRef<HTMLCanvasElement>(null)
  const win = HACKATHONS.find((h) => h.id === id)!
  const text = t.hackathons[win.id]
  useEffect(() => {
    paintMor(mor.current!)
  }, [])
  const left = win.rank === 2 ? 16.6 : 83.4
  const bottom = win.rank === 2 ? 66 : 42
  return (
    <div className="podium-card">
      <div className="podium-tabs" role="tablist" aria-label={t.wins.results}>
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
        <p className="pixel">{text.host}</p>
        <h3 className="display podium-title">{text.place}</h3>
        <p className="podium-note">{text.note}</p>
      </div>
    </div>
  )
}

/** 250 teams, narrowed to 40, narrowed to the podium. Each cell is one team. */
function Funnel() {
  const t = useT()
  const lang = useLang()
  const ref = useRef<HTMLCanvasElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  const redraw = useRef(() => {})
  useEffect(() => redraw.current(), [lang])
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
        ctx.fillStyle = r === 2 && state.v >= 0.98 ? p.pk3 : r < 3 && state.v >= 0.98 ? p.bl3 : r < alive ? p.ink : 'rgba(27, 35, 80, 0.1)'
        ctx.fillRect(x, y, CELL, CELL)
      }
      if (label.current) {
        const n = Math.round(alive)
        const w = getDict().wins
        label.current.textContent = state.v >= 0.98 ? w.funnelDone : w.funnelLeft(n)
      }
    }
    redraw.current = draw
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
      <canvas ref={ref} data-cursor-label={t.wins.replay} role="img" aria-label={t.wins.funnelAria} />
      <p ref={label} className="pixel funnel-label" />
    </div>
  )
}

const openProject = (id: string, el: HTMLElement) => {
  const project = PROJECTS.find((x) => x.id === id)
  if (project) detailApi.open(project, () => el.getBoundingClientRect())
}

/** Every commit across all repositories, one pixel per day. */
function Calendar() {
  const t = useT()
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const CELL = 8
    const weeks = Math.ceil(COMMITS.cells.length / 7)
    c.width = weeks * CELL
    c.height = 7 * CELL
    const ramp = [p.paper2, p.bl1, p.bl2, p.pk2, p.pk3]
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
      const day = d.toLocaleDateString(getLocale(), { day: 'numeric', month: 'short', timeZone: 'UTC' })
      c.dataset.cursorLabel = getDict().wins.onDay(n, day)
    }
    c.addEventListener('pointermove', move)
    return () => {
      st.kill()
      c.removeEventListener('pointermove', move)
    }
  }, [])
  return <canvas ref={ref} className="calendar" data-cursor-label={t.wins.hoverDay} role="img" aria-label={t.wins.calendar(COMMITS.total)} />
}

export function Wins() {
  const t = useT()
  const w = t.wins
  return (
    <>
      <section className="wins wrap" id="wins" data-mor="research">
        <Rise as="h2" className="display section-title" text={w.title} onScroll />
        <div className="wins-grid">
          <Podium />
          <Funnel />
          <div className="cesac-card" data-dark>
            <p className="pixel">{w.cesac}</p>
            <dl className="stats">
              <div><dt>{w.students}</dt><dd className="display"><Count to={2400} suffix="+" /></dd></div>
              <div><dt>{w.records}</dt><dd className="display"><Count to={11000} suffix="+" /></dd></div>
              <div><dt>{w.views}</dt><dd className="display"><Count to={200000} suffix="+" /></dd></div>
            </dl>
            <button className="btn btn-paper" onClick={(e) => openProject('cesac', e.currentTarget)}>{w.openCesac} <Arrow /></button>
          </div>
        </div>
      </section>

      <section className="log wrap" id="research" data-mor="activity">
        <div className="log-side">
          <Rise as="h2" className="display section-title" text={w.research} onScroll />
        </div>
        <ul className="log-list">
          {RESEARCH.map((r) => (
            <li key={r.id}>
              <button className="log-row" data-cursor-label={w.open} onClick={(e) => openProject(r.id, e.currentTarget)}>
                <span className="display log-title">{t.research[r.id].title}</span>
                <span className="log-where">{t.research[r.id].where}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="activity wrap">
        <div className="activity-head">
          <h2 className="display section-title">{w.shipping}</h2>
          <dl className="numbers">
            <div><dd className="display"><Count to={COMMITS.total} /></dd><dt>{w.commits}</dt></div>
            <div><dd className="display"><Count to={33} /></dd><dt>{w.repos}</dt></div>
            <div><dd className="display"><Count to={39} /></dd><dt>{w.vercel}</dt></div>
          </dl>
        </div>
        <Calendar />
      </section>

      <section className="archive wrap">
        <p className="pixel archive-kicker">{w.also}</p>
        <ul className="archive-list">
          {ARCHIVE.map((a) => (
            <li key={a.title}>
              <a href={a.href} target="_blank" rel="noreferrer" className="archive-row">
                <span className="display">{t.archive[a.title].title ?? a.title}</span>
                <span className="archive-note">{t.archive[a.title].note}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
