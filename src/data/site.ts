export const CONTACT = {
  email: 'viralnotviral@gmail.com',
  phone: '+91 7447 607725',
  phoneHref: 'tel:+917447607725',
}

export const SOCIALS = [
  { label: 'GitHub', handle: 'viralala', href: 'https://github.com/viralala' },
  { label: 'LinkedIn', handle: 'Viral Dhoka', href: 'https://www.linkedin.com/in/viral-dhoka-1aa3b4318/' },
  { label: 'Instagram', handle: '@viraldrafts', href: 'https://www.instagram.com/viraldrafts/' },
]

export type Project = {
  id: string
  title: string
  /** Month the work started, as a number: 4 is April 2026 */
  month: number
  url: string
  domain: string
  /** Only for public repositories */
  repo?: string
  stack: string[]
  scheme: 0 | 1 | 2 | 3
}

/* Live custom domains first, then everything else. */
export const PROJECTS: Project[] = [
  {
    id: 'cesac',
    title: 'CESAC',
    month: 9,
    url: 'https://www.cesac.in',
    domain: 'cesac.in',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4'],
    scheme: 0,
  },
  {
    id: 'patienttap',
    title: 'Patient-Tap',
    month: 7,
    url: 'https://www.patient-tap.shop',
    domain: 'patient-tap.shop',
    repo: 'https://github.com/viralala/Patient-Tap',
    stack: ['Flutter', 'Dart', 'TypeScript', 'Supabase', 'Razorpay'],
    scheme: 2,
  },
  {
    id: 'itspune',
    title: 'I T Solutions',
    month: 10,
    url: 'https://itspune.in',
    domain: 'itspune.in',
    repo: 'https://github.com/viralala/itspune',
    stack: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
    scheme: 1,
  },
  {
    id: 'sigil',
    title: 'Sigil',
    month: 11,
    url: 'https://www.sigil-vk.online',
    domain: 'sigil-vk.online',
    repo: 'https://github.com/viralala/sigil',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Postgres RLS'],
    scheme: 3,
  },
  {
    id: 'samvada',
    title: 'Saṃvāda',
    month: 7,
    url: 'https://samvada-ten.vercel.app',
    domain: 'samvada-ten.vercel.app',
    repo: 'https://github.com/viralala/Samvada',
    stack: ['Next.js 14', 'Tailwind', 'Framer Motion'],
    scheme: 0,
  },
  {
    id: 'wattway',
    title: 'WattWay',
    month: 9,
    url: 'https://wattway-nu.vercel.app',
    domain: 'wattway-nu.vercel.app',
    repo: 'https://github.com/viralala/Wattway',
    stack: ['TypeScript', 'Express', 'Supabase'],
    scheme: 1,
  },
  {
    id: 'taral',
    title: 'Taral',
    month: 10,
    url: 'https://taral-beta.vercel.app',
    domain: 'taral-beta.vercel.app',
    repo: 'https://github.com/viralala/Taral',
    stack: ['Next.js 15', 'React 19', 'Tailwind 4', 'Supabase', 'ElevenLabs'],
    scheme: 2,
  },
  {
    id: 'pathway',
    title: 'Pathway',
    month: 10,
    url: 'https://pathway-credit-recourse.vercel.app',
    domain: 'pathway-credit-recourse.vercel.app',
    repo: 'https://github.com/viralala/pathway-credit-recourse',
    stack: ['Next.js 16', 'React 19', 'Tailwind 4', 'Motion', 'Vitest'],
    scheme: 3,
  },
  {
    id: 'abyssguard',
    title: 'AbyssGuard',
    month: 9,
    url: 'https://abyssguard.vercel.app',
    domain: 'abyssguard.vercel.app',
    repo: 'https://github.com/viralala/AbyssGuard',
    stack: ['Next.js 15', 'TypeScript', 'YOLO11-seg design'],
    scheme: 2,
  },
  {
    id: 'satquery',
    title: 'SatQuery',
    month: 9,
    url: 'https://satquery-delta.vercel.app',
    domain: 'satquery-delta.vercel.app',
    repo: 'https://github.com/viralala/SatQuery',
    stack: ['Next.js 15', 'TypeScript', 'Vision-language design'],
    scheme: 3,
  },
  {
    id: 'immunis',
    title: 'Immunis',
    month: 8,
    url: 'https://immunis.vercel.app',
    domain: 'immunis.vercel.app',
    repo: 'https://github.com/viralala/Immunis',
    stack: ['Python', 'FastAPI', 'TypeScript'],
    scheme: 1,
  },
  {
    id: 'eagle',
    title: 'Eagle Eye',
    month: 10,
    url: 'https://eagle-eye-qc.vercel.app',
    domain: 'eagle-eye-qc.vercel.app',
    stack: ['Computer vision', 'Next.js', 'TypeScript'],
    scheme: 2,
  },
  {
    id: 'fingervault',
    title: 'FingerVault',
    month: 9,
    url: 'https://fingervault.vercel.app',
    domain: 'fingervault.vercel.app',
    repo: 'https://github.com/viralala/FingerVault',
    stack: ['Next.js', 'TypeScript', 'ESP32 design'],
    scheme: 0,
  },
  {
    id: 'riyaaz',
    title: 'Riyaaz',
    month: 10,
    url: 'https://riyaaz-three.vercel.app',
    domain: 'riyaaz-three.vercel.app',
    stack: ['TypeScript', 'PWA', 'IndexedDB', 'Capacitor'],
    scheme: 1,
  },
  {
    id: 'riddles',
    title: 'Riddle Me This',
    month: 4,
    url: 'https://repotemp-taupe.vercel.app',
    domain: 'repotemp-taupe.vercel.app',
    repo: 'https://github.com/viralala/riddlesfortana',
    stack: ['Python', 'Flask', 'Firebase', 'NLP'],
    scheme: 2,
  },
  {
    id: 'sunshine',
    title: 'Sunshine Music',
    month: 5,
    url: 'https://sunshinemusic.vercel.app',
    domain: 'sunshinemusic.vercel.app',
    stack: ['TypeScript', 'Hand tracking', 'Web Audio'],
    scheme: 3,
  },
]

/** Text for these lives in src/i18n, keyed by title or id. */
export const ARCHIVE = [
  { title: 'Poof', href: 'https://poof-iota.vercel.app' },
  { title: 'Bhav Saathi', href: 'https://bhav-saathi-film.vercel.app' },
  { title: 'BioAI', href: 'https://asep-sem2.vercel.app' },
  { title: 'Cognito', href: 'https://cognito-chi.vercel.app' },
  { title: 'Pixels', href: 'https://pixels-kohl.vercel.app' },
  { title: 'Brioso', href: 'https://brioso.vercel.app' },
  { title: 'Mafia Moderator', href: 'https://mafia-moderator.vercel.app' },
  { title: 'Drowsiness Detection', href: 'https://github.com/viralala/AI-Drowsiness-Detection-System' },
  { title: 'Marginalia', href: 'https://github.com/viralala/marginalia' },
]

export const PINS = [
  { id: 'vit', name: 'VIT Pune', lat: 18.4636, lon: 73.8682 },
  { id: 'mit', name: 'MIT-WPU', lat: 18.5181, lon: 73.8153 },
  { id: 'its', name: 'I T Solutions', lat: 18.5205, lon: 73.865 },
]

export const HACKATHONS = [
  { id: 'incubex', name: "Incubex '26", rank: 2 },
  { id: 'codeamble', name: 'CODEAMBLE 2026', rank: 3 },
]

export const RESEARCH = [{ id: 'fingervault' }, { id: 'abyssguard' }, { id: 'satquery' }, { id: 'immunis' }]
