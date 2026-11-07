import { useEffect } from 'react'
import { Nav } from './components/Chrome'
import { Consent } from './components/Consent'
import { Cursor } from './components/Cursor'
import { Detail } from './components/Detail'
import { Loader } from './components/Loader'
import { Mor } from './components/Mor'
import { PixelWipe } from './components/PixelWipe'
import { startSmoothScroll } from './lib/motion'
import Home from './pages/Home'

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    startSmoothScroll()
  }, [])
  return (
    <>
      <Nav />
      <Home />
      <Mor />
      <Detail />
      <PixelWipe />
      <Loader />
      <Cursor />
      <Consent />
    </>
  )
}
