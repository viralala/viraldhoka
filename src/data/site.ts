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
  tagline: string
  kind: string
  /** Month the work started, as a number: 4 is April 2026 */
  month: number
  url: string
  domain: string
  /** Only for public repositories */
  repo?: string
  credit: string
  stack: string[]
  summary: string
  points: string[]
  scheme: 0 | 1 | 2 | 3
}

/* Live custom domains first, then everything else. */
export const PROJECTS: Project[] = [
  {
    id: 'cesac',
    title: 'CESAC',
    tagline: 'One record of every student achievement in the department',
    kind: 'Full stack',
    month: 9,
    url: 'https://www.cesac.in',
    domain: 'cesac.in',
    credit: 'I built the frontend, backend and database',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4'],
    summary:
      'The platform for the Computer Engineering Student Activities Committee at VIT Pune. Students submit certifications, events, competitions, internships, patents and publications in one place, faculty verify them, and every achievement gets recorded.',
    points: ['2,400+ students registered', '11,000+ records submitted', '2,00,000+ page views'],
    scheme: 0,
  },
  {
    id: 'patienttap',
    title: 'Patient-Tap',
    tagline: 'An encrypted medical ID on your wrist',
    kind: 'Health tech',
    month: 7,
    url: 'https://www.patient-tap.shop',
    domain: 'patient-tap.shop',
    repo: 'https://github.com/viralala/Patient-Tap',
    credit: 'With Team Vishwakarma gng',
    stack: ['Flutter', 'Dart', 'TypeScript', 'Supabase', 'Razorpay'],
    summary:
      'An offline-first NFC emergency identity. Allergies, medications and critical history live encrypted on a wearable card, and any first responder can read them in seconds with no signal at all.',
    points: ["First Runner-Up at Incubex '26, MIT-WPU", 'Second Runner-Up at CODEAMBLE 2026, Kharghar, Navi Mumbai', 'AES-256-GCM on an NFC tag with 504 bytes to work with', 'Reads and writes with zero network dependency'],
    scheme: 2,
  },
  {
    id: 'itspune',
    title: 'I T Solutions',
    tagline: 'A website and repair tracker for a Pune service shop',
    kind: 'Client site',
    month: 10,
    url: 'https://itspune.in',
    domain: 'itspune.in',
    repo: 'https://github.com/viralala/itspune',
    credit: 'Built for a repair shop in Somwar Peth',
    stack: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
    summary:
      'A site for a printer, laptop and computer repair shop, with a staff logger behind it. Every device gets a lot number, drop-off photos and status updates, and customers follow along on a tracking page.',
    points: ['Staff app with owner and team accounts', 'Lot numbers, printed slips and WhatsApp updates', 'Customers track their own device'],
    scheme: 1,
  },
  {
    id: 'sigil',
    title: 'Sigil',
    tagline: 'Verify degrees and resumes by signature, not by phone call',
    kind: 'Trust and identity',
    month: 11,
    url: 'https://www.sigil-vk.online',
    domain: 'sigil-vk.online',
    repo: 'https://github.com/viralala/sigil',
    credit: 'With Team Sigil, VIT Pune',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Postgres RLS'],
    summary:
      'Issuer-signed proofs that anyone can check instantly, with no per-check lookup to the issuer. It covers certificates, whole resumes, paper checks and a wallet the holder owns.',
    points: ['Never says verified without naming who vouched', 'AI proposes, the holder confirms', 'English, Hindi and Marathi'],
    scheme: 3,
  },
  {
    id: 'samvada',
    title: 'Saṃvāda',
    tagline: 'Learn a language by speaking it',
    kind: 'Education',
    month: 7,
    url: 'https://samvada-ten.vercel.app',
    domain: 'samvada-ten.vercel.app',
    repo: 'https://github.com/viralala/Samvada',
    credit: 'Built solo',
    stack: ['Next.js 14', 'Tailwind', 'Framer Motion'],
    summary:
      'Conversation-first courses for people who know some words but never learned the grammar. Grammar appears only where a real sentence needs it, and every module ends by actually talking.',
    points: ['Ten courses, each with its own script, palette and type', 'Sanskrit, Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Pali, German and French', 'No streaks, no XP, no mascot'],
    scheme: 0,
  },
  {
    id: 'wattway',
    title: 'WattWay',
    tagline: 'Find the charger that is actually best, not just closest',
    kind: 'Maps and routing',
    month: 9,
    url: 'https://wattway-nu.vercel.app',
    domain: 'wattway-nu.vercel.app',
    repo: 'https://github.com/viralala/Wattway',
    credit: 'Indexing and backend lead, Team Kothimbir',
    stack: ['TypeScript', 'Express', 'Supabase'],
    summary:
      'EV route and queue optimiser. It shows live queue lengths, plans a battery-aware route with one charging stop, and lets drivers queue virtually. A data structures project where every structure backs a real feature.',
    points: ['201 passing tests', 'Stops chosen by distance, wait and price together', 'Operator dashboard for slots and queue depth'],
    scheme: 1,
  },
  {
    id: 'taral',
    title: 'Taral',
    tagline: 'Prove you are human. Make it fun.',
    kind: 'Interactive story',
    month: 10,
    url: 'https://taral-beta.vercel.app',
    domain: 'taral-beta.vercel.app',
    repo: 'https://github.com/viralala/Taral',
    credit: 'Built for Pixathon by Insight AI',
    stack: ['Next.js 15', 'React 19', 'Tailwind 4', 'Supabase', 'ElevenLabs'],
    summary:
      'CAPTCHA reimagined as a narrated fairytale. You type your name and your partner\'s name, then cross three trials to get them back, and every gate is a test only a person can pass.',
    points: ['13 challenge types across the story', 'Scored on a humanity percentage', 'Live leaderboard and full voice narration'],
    scheme: 2,
  },
  {
    id: 'pathway',
    title: 'Pathway',
    tagline: 'A loan rejection should be a roadmap',
    kind: 'Fintech and ML',
    month: 10,
    url: 'https://pathway-credit-recourse.vercel.app',
    domain: 'pathway-credit-recourse.vercel.app',
    repo: 'https://github.com/viralala/pathway-credit-recourse',
    credit: 'Hackathon prototype, an educational simulation',
    stack: ['Next.js 16', 'React 19', 'Tailwind 4', 'Motion', 'Vitest'],
    summary:
      'Explains why a loan was declined in plain English, Hindi or Marathi, finds the smallest realistic set of changes that flips the decision, and projects when you will get there.',
    points: ['Reason codes from an interpretable model', '400 seeded futures give a likely approval month', 'True APR check for instant-loan offers'],
    scheme: 3,
  },
  {
    id: 'abyssguard',
    title: 'AbyssGuard',
    tagline: 'See what lies beneath',
    kind: 'Marine AI',
    month: 9,
    url: 'https://abyssguard.vercel.app',
    domain: 'abyssguard.vercel.app',
    repo: 'https://github.com/viralala/AbyssGuard',
    credit: 'Team TMS<3, Smart India Hackathon 2026',
    stack: ['Next.js 15', 'TypeScript', 'YOLO11-seg design'],
    summary:
      'The product showcase for an onboard system that turns raw side-scan sonar logs into geotagged, confidence-scored hazard reports, for the Ministry of Earth Sciences and NIOT.',
    points: ['Problem statement 26057', 'Physics filters after the detector, not just a model', 'Designed to run on the vehicle with no cloud link'],
    scheme: 2,
  },
  {
    id: 'satquery',
    title: 'SatQuery',
    tagline: 'Ask Earth. Get intelligence.',
    kind: 'Remote sensing AI',
    month: 9,
    url: 'https://satquery-delta.vercel.app',
    domain: 'satquery-delta.vercel.app',
    repo: 'https://github.com/viralala/SatQuery',
    credit: 'Team TMS<3, Smart India Hackathon 2026',
    stack: ['Next.js 15', 'TypeScript', 'Vision-language design'],
    summary:
      'The product showcase for a vision-language assistant for ISRO. Give it an image, an optical and SAR pair, or two dates of the same ground, and ask in plain language. The query decides the pipeline.',
    points: ['Problem statement 26167', 'One question replaces single-task tools', 'Every figure tagged with its source'],
    scheme: 3,
  },
  {
    id: 'immunis',
    title: 'Immunis',
    tagline: 'An adversarial immune system for payment networks',
    kind: 'Fraud and ML',
    month: 8,
    url: 'https://immunis.vercel.app',
    domain: 'immunis.vercel.app',
    repo: 'https://github.com/viralala/Immunis',
    credit: 'Python engine with a web prototype',
    stack: ['Python', 'FastAPI', 'TypeScript'],
    summary:
      'Manufactures the fraud that has not happened yet. It generates emerging GenAI payment fraud into a realistic ledger, defends with a calibrated hybrid detector, then lets a red agent evolve against the live model until the model wins.',
    points: ['Every evasion becomes tomorrow\'s training label', 'Whole pipeline runs in about 7 minutes on a CPU', 'Results regenerate from a single command'],
    scheme: 1,
  },
  {
    id: 'eagle',
    title: 'Eagle Eye',
    tagline: 'The drawing is the answer key. The photo is the evidence.',
    kind: 'Industrial AI',
    month: 10,
    url: 'https://eagle-eye-qc.vercel.app',
    domain: 'eagle-eye-qc.vercel.app',
    credit: 'With Team Vishwakarma gng',
    stack: ['Computer vision', 'Next.js', 'TypeScript'],
    summary:
      'A quality control prototype for electrical cabinets. It checks each part, label and ferrule in a photo against the engineering drawing, and walks an inspector through the check sheet. Results in this round are simulated.',
    points: ['Inspection, QC sheet and re-check history', 'Plug-in checks', 'Built to take a real AI pipeline in the next round'],
    scheme: 2,
  },
  {
    id: 'fingervault',
    title: 'FingerVault',
    tagline: 'One finger. The whole verified record.',
    kind: 'Biometrics research',
    month: 9,
    url: 'https://fingervault.vercel.app',
    domain: 'fingervault.vercel.app',
    repo: 'https://github.com/viralala/FingerVault',
    credit: 'Group 17, guided by Dr. Rahul Diwate',
    stack: ['Next.js', 'TypeScript', 'ESP32 design'],
    summary:
      'A privacy-first biometric employee information and emergency access system. This stage is the interface prototype, with synthetic records standing in for the encrypted store and simulated timings for the hardware.',
    points: ['Nine-stage scan pipeline, including spoof and worn ridges', 'Role-based views of a single record', 'Incident-bound emergency disclosure'],
    scheme: 0,
  },
  {
    id: 'riyaaz',
    title: 'Riyaaz',
    tagline: 'A practice room for Hindustani classical vocal',
    kind: 'Music',
    month: 10,
    url: 'https://riyaaz-three.vercel.app',
    domain: 'riyaaz-three.vercel.app',
    credit: 'Phone-first PWA and Android app',
    stack: ['TypeScript', 'PWA', 'IndexedDB', 'Capacitor'],
    summary:
      'Raag reference, tanpura, peti and tabla, sing-along with timed lyrics, recording, a swar meter and a practice log, in English and Marathi. All data stays on the device and it works offline.',
    points: ['Installs as an app', 'Android build through Capacitor', 'Backups stay in your own hands'],
    scheme: 1,
  },
  {
    id: 'riddles',
    title: 'Riddle Me This',
    tagline: 'Three packs. Three lives. One chance.',
    kind: 'Game',
    month: 4,
    url: 'https://repotemp-taupe.vercel.app',
    domain: 'repotemp-taupe.vercel.app',
    repo: 'https://github.com/viralala/riddlesfortana',
    credit: 'Built solo, as a gift',
    stack: ['Python', 'Flask', 'Firebase', 'NLP'],
    summary:
      'A riddle game that grew a real backend: NLP answer matching, Firebase leaderboards, an AI riddle generator, a live admin panel, and a scraper that checks whether a riddle already exists online.',
    points: ['13 stars on GitHub', 'Understands answers, not exact strings', 'Email alerts on top three finishes'],
    scheme: 2,
  },
  {
    id: 'sunshine',
    title: 'Sunshine Music',
    tagline: 'Music between your fingers',
    kind: 'Creative tech',
    month: 5,
    url: 'https://sunshinemusic.vercel.app',
    domain: 'sunshinemusic.vercel.app',
    credit: 'Hand-tracked instrument for the browser',
    stack: ['TypeScript', 'Hand tracking', 'Web Audio'],
    summary:
      'Your webcam becomes an instrument. It detects hand landmarks in real time, recognises pinches, and maps them to chords, with all the sound made in the browser.',
    points: ['Real-time hand landmark detection', 'Pinch gestures mapped to chords', 'Sound generated with Web Audio'],
    scheme: 3,
  },
]

export const ARCHIVE = [
  { title: 'Poof', note: 'Group polls that delete themselves after 24 hours', href: 'https://poof-iota.vercel.app' },
  { title: 'Bhav Saathi', note: 'Concept film for the GAVS Hackathon, with Tanaya Thorat', href: 'https://bhav-saathi-film.vercel.app' },
  { title: 'BioAI', note: 'Genomic intelligence platform on NCBI, UniProt and GWAS data', href: 'https://asep-sem2.vercel.app' },
  { title: 'Cognito', note: 'Voice-first mental wellness companion on the Gemini Live API', href: 'https://cognito-chi.vercel.app' },
  { title: 'Pixels', note: 'Animated agency site in Next.js, GSAP and Lenis', href: 'https://pixels-kohl.vercel.app' },
  { title: 'Brioso', note: 'A cinematic cafe website built on storytelling', href: 'https://brioso.vercel.app' },
  { title: 'Mafia Moderator', note: 'Runs a whole game of Mafia for you', href: 'https://mafia-moderator.vercel.app' },
  { title: 'Drowsiness Detection', note: 'Eye tracking with MediaPipe, alerts through an Arduino', href: 'https://github.com/viralala/AI-Drowsiness-Detection-System' },
  { title: 'Marginalia', note: 'One human-written line on your lock screen', href: 'https://github.com/viralala/marginalia' },
]

export const PINS = [
  { id: 'vit', name: 'VIT Pune', place: 'Bibwewadi', lat: 18.4636, lon: 73.8682, note: 'Where I study Computer Engineering, 2025 to 2029.' },
  { id: 'mit', name: 'MIT-WPU', place: 'Kothrud', lat: 18.5181, lon: 73.8153, note: "Where Patient-Tap took First Runner-Up at Incubex '26." },
  { id: 'its', name: 'I T Solutions', place: 'Somwar Peth', lat: 18.5205, lon: 73.865, note: 'A local repair shop I built a site and tracker for.' },
]

export const HACKATHONS = [
  {
    id: 'incubex',
    name: "Incubex '26",
    place: 'First Runner-Up',
    rank: 2,
    host: 'MIT World Peace University, Pune',
    note: 'Second place with Patient-Tap, alongside Tanaya Thorat, Samruddhi Wankhede, Vedant Patil, Samarth Dhage and Vyanktesh Yeole.',
  },
  {
    id: 'codeamble',
    name: 'CODEAMBLE 2026',
    place: 'Second Runner-Up',
    rank: 3,
    host: 'National 24-hour hackathon, Kharghar, Navi Mumbai',
    note: 'My first offline hackathon and first podium, with Patient-Tap. Built with Samarth Dhage, Tanaya Thorat and Vyanktesh Yeole.',
  },
]

export const RESEARCH = [
  { id: 'fingervault', title: 'Privacy-first biometric records', where: 'Group 17, guide Dr. Rahul Diwate' },
  { id: 'abyssguard', title: 'Marine debris from side-scan sonar', where: 'SIH 2026, problem statement 26057' },
  { id: 'satquery', title: 'Vision-language remote sensing', where: 'SIH 2026, problem statement 26167' },
  { id: 'immunis', title: 'Adversarial training against payment fraud', where: 'Red agent against a live model' },
]
