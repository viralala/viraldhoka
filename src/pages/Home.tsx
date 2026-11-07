import { DitherEdge, Marquee, ScrubText } from '../components/Bits'
import { Footer } from '../components/Chrome'
import { Shelf } from '../components/Shelf'
import { Story } from '../components/Story'
import { Wins } from '../components/Wins'
import { palette as p } from '../lib/motion'

export default function Home() {
  return (
    <main>
      <Story />
      <DitherEdge from={p.night} to={p.paper} />

      <section className="statement wrap" data-mor="statement">
        <ScrubText
          className="statement-text display"
          text="I'm a second year computer engineering student who cares how things feel. Most days that means creative frontends. Other days it means the backend and the models that make them worth using."
        />
      </section>

      <Shelf />

      <Marquee items={['Creative frontend', 'Full stack', 'Backend', 'AI and ML', 'पुणे']} />

      <Wins />

      <Footer />
    </main>
  )
}
