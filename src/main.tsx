import { createRoot } from 'react-dom/client'
import '@fontsource/silkscreen/400.css'
import '@fontsource/tiro-devanagari-marathi/devanagari-400.css'
import '@fontsource/tiro-devanagari-marathi/devanagari-400-italic.css'
import '@fontsource/tiro-devanagari-hindi/devanagari-400.css'
import '@fontsource/tiro-devanagari-hindi/devanagari-400-italic.css'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/site.css'
import App from './App'
import { bootLang } from './i18n'

bootLang().then(() => createRoot(document.getElementById('root')!).render(<App />))
