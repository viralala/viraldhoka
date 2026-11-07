import { createRoot } from 'react-dom/client'
import '@fontsource/silkscreen/400.css'
import '@fontsource/tiro-devanagari-marathi/400.css'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/site.css'
import App from './App'

createRoot(document.getElementById('root')!).render(<App />)
