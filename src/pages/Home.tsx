import { DitherEdge, Marquee, ScrubText } from '../components/Bits'
import { Footer } from '../components/Chrome'
import { Shelf } from '../components/Shelf'
import { Story } from '../components/Story'
import { Wins } from '../components/Wins'
import { useT } from '../i18n'
import { palette as p } from '../lib/motion'

export default function Home() {
  const t = useT()
  return (
    <main>
      <Story />
      <DitherEdge from={p.night} to={p.paper} />

      <section className="statement wrap" data-mor="statement">
        <ScrubText
          className="statement-text display"
          text={t.statement}
        />
      </section>

      <Shelf />

      <Marquee items={t.marquee} />

      <Wins />

      <Footer />
    </main>
  )
}
