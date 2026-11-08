/**
 * Every word on the site, in English. Other languages copy this shape exactly, and
 * TypeScript refuses to build if one of them misses a line.
 * Names stay as they are: people, projects, tools, domains and handles.
 */
const en = {
  meta: { title: 'Viral Dhoka | Creative full stack developer, Pune' },
  lang: { label: 'Language', switching: 'English' },

  nav: { main: 'Main', about: 'About', work: 'Work', wins: 'Wins', contact: 'Contact', top: 'Top', research: 'Research' },
  clock: (time: string) => `Pune ${time} IST`,

  loader: { greetings: ['Hello', 'Welcome', 'Hi there'], aria: "Loading Viral Dhoka's portfolio", place: 'Pune, India' },

  hero: {
    title: 'Making the web\nfeel alive',
    sub: "I'm Viral, a computer engineering student at VIT Pune. I build creative frontends, and the full stack systems and models behind them.",
    cta: 'See my work',
    jump: 'Jump to work',
    scroll: 'Scroll',
  },

  story: {
    pune: 'Pune',
    drag: 'Drag',
    coords: '18.52°N, 73.86°E',
    where: { kicker: 'Where I am', title: 'Pune, India', body: "On the Deccan plateau, in India's western state of Maharashtra. Grab the globe and give it a spin.", big: 'Pune' },
    zoom: {
      kicker: 'Zooming in',
      body: 'Hover the map to read each state. Click Maharashtra to keep going.',
      cta: 'Fly to Pune',
      map: 'Map of India by state',
      zoomIn: 'Zoom in',
    },
    study: {
      kicker: 'Where I study',
      title: 'Vishwakarma Institute of Technology',
      body: 'Second year of Computer Engineering. Mor will show you around.',
      places: 'Places in Pune',
    },
    build: { kicker: 'What I do' },
    apps: { kicker: 'What I build' },
    os: {
      name: 'Mor OS',
      dock: 'Mor OS apps',
      move: 'Move',
      search: 'Search',
      apps: { maps: 'Maps', id: 'Student ID', term: 'Terminal', apps: 'Apps' },
      mapsIndia: 'Maps · India',
      card: {
        kind: 'Student',
        name: 'Name',
        programme: 'Programme',
        branch: 'Computer Engineering',
        year: 'Year',
        yearValue: 'Second year',
        batch: 'Batch',
        places: 'Places in Pune',
        flip: 'Flip the card',
        flipHint: 'Click the card to flip it',
      },
      term: {
        label: 'Terminal command',
        placeholder: 'type help',
        help: 'Commands: frontend, backend, ai, whoami, ls, clear',
        whoami: 'Viral Dhoka. Creative frontend and full stack, Pune.',
        missing: (c: string) => `command not found: ${c}. Try help.`,
      },
      appsWin: {
        live: 'Live',
        more: (n: number) => `${n} more on the shelf`,
        open: (title: string) => `Open ${title}`,
        readme: 'readme.txt',
        toolbox: 'What I build with',
        groups: ['Languages', 'Frameworks', 'Motion & 3D', 'Databases', 'AI / ML', 'Cloud & DevOps', 'Testing'],
      },
    },
    next: {
      kicker: "What's next",
      title: 'Many more to chase',
      body: 'More hackathons, more real users, and exploring new opportunities. Building more, learning more, and competing.',
      cta: 'See the work',
    },
    tabs: {
      front: {
        label: 'Frontend',
        title: 'Interfaces that move',
        body: 'React and Next.js with GSAP and WebGL, like the page you are on. Motion is what I reach for first.',
        hint: 'Click anywhere and the pixels react',
      },
      back: {
        label: 'Backend',
        title: 'Systems that hold up',
        body: 'APIs, auth, queues and Postgres. CESAC now holds 11,000+ records from 2,400+ students.',
        hint: 'Click a node to send a request',
      },
      ai: {
        label: 'AI and ML',
        title: 'Models with a job to do',
        body: 'Explainable credit models, adversarial fraud training, and real-time eye tracking on a webcam.',
        hint: 'Click a neuron to fire it',
      },
    },
    graph: { Client: 'Client', API: 'API', Auth: 'Auth', Queue: 'Queue', Postgres: 'Postgres', send: 'Send', fire: 'Fire' },
  },

  statement:
    "I'm a second year computer engineering student who cares how things feel. Most days that means creative frontends. Other days it means the backend and the models that make them worth using.",
  marquee: ['Creative frontend', 'Full stack', 'Backend', 'AI and ML', 'Pune'],

  work: {
    kicker: 'Selected work',
    hint: 'Drag, swipe or use the arrows',
    count: (n: number) => `${n} tapes, on loop`,
    build: 'A Viral Dhoka build',
    initials: 'VD',
    drag: 'Drag',
    open: 'Open',
    openProject: 'Open this project',
    prev: 'Previous project',
    next: 'Next project',
    halftoneL: ['Wo', 'rk'],
    halftoneR: ['Sh', 'el', 'f'],
  },

  wins: {
    title: 'Wins so far',
    results: 'Hackathon results',
    funnelDone: '3rd out of 250+ teams',
    funnelLeft: (n: number) => `${n} teams left`,
    funnelAria: '250 teams narrowed to 40 finalists, then to the three podium teams',
    replay: 'Replay',
    cesac: 'CESAC, live at cesac.in',
    students: 'Students registered',
    records: 'Records submitted',
    views: 'Page views',
    openCesac: 'Open CESAC',
    research: 'Research\nand deep dives',
    open: 'Open',
    shipping: 'Always shipping',
    commits: 'commits',
    repos: 'repositories',
    vercel: 'Vercel projects',
    hoverDay: 'Hover a day',
    onDay: (n: number, day: string) => `${n} on ${day}`,
    calendar: (n: number) => `${n} commits over the past year`,
    also: 'Also on the shelf',
  },

  detail: {
    close: 'Close',
    visit: (domain: string) => `Visit ${domain}`,
    visitSite: 'Visit the site',
    code: 'Code',
    shot: (title: string) => `Screenshot of ${title}`,
  },

  footer: {
    kicker: 'Exploring new opportunities',
    hello: 'Say hello',
    greets: ['Say hello', "Let's talk", 'Write to me'],
    another: 'Another way',
    copy: 'Copy',
    copied: 'Copied',
    copiedSay: 'Copied!',
    builds: 'builds on the shelf',
    podiums: 'hackathon podiums',
    commits: 'commits in a year',
    vercel: 'Vercel projects',
    basedIn: 'Based in',
    city: 'Pune, Maharashtra',
    now: (time: string, part: string) => `${time} IST, ${part}`,
    parts: { lateNight: 'late night', morning: 'morning', afternoon: 'afternoon', evening: 'evening', night: 'night' },
    studying: 'Studying',
    degree: 'Computer Engineering',
    college: 'VIT Pune, 2025 to 2029',
    live: 'Live now',
    elsewhere: 'Elsewhere',
    onPage: 'On this page',
    sign: 'Viral Dhoka, 2026',
    built: 'Built in Pune with React, GSAP and WebGL',
    mapFrom: 'India map from',
    license: 'CC BY 4.0',
    fanIt: 'Fan it',
    backTop: 'Back to top',
  },

  mor: {
    aria: 'Mor the peacock. Click to fan his tail.',
    cry: 'Mor!',
    lines: {
      hero: 'Hi, I am Mor!',
      statement: 'Keep scrolling',
      night: 'Spin the globe!',
      work: 'Pick a tape',
      research: 'We did that!',
      activity: 'Look at the commits',
      footer: 'Say hello!',
    } as Record<string, string>,
  },

  projects: {
    cesac: {
      tagline: 'One record of every student achievement in the department',
      kind: 'Full stack',
      credit: 'I built the frontend, backend and database',
      summary:
        'The platform for the Computer Engineering Student Activities Committee at VIT Pune. Students submit certifications, events, competitions, internships, patents and publications in one place, faculty verify them, and every achievement gets recorded.',
      points: ['2,400+ students registered', '11,000+ records submitted', '2,00,000+ page views'],
    },
    patienttap: {
      tagline: 'An encrypted medical ID on your wrist',
      kind: 'Health tech',
      credit: 'With Team Vishwakarma gng',
      summary:
        'An offline-first NFC emergency identity. Allergies, medications and critical history live encrypted on a wearable card, and any first responder can read them in seconds with no signal at all.',
      points: ["First Runner-Up at Incubex '26, MIT-WPU", 'Second Runner-Up at CODEAMBLE 2026, Kharghar, Navi Mumbai', 'AES-256-GCM on an NFC tag with 504 bytes to work with', 'Reads and writes with zero network dependency'],
    },
    itspune: {
      tagline: 'A website and repair tracker for a Pune service shop',
      kind: 'Client site',
      credit: 'Built for a repair shop in Somwar Peth',
      summary:
        'A site for a printer, laptop and computer repair shop, with a staff logger behind it. Every device gets a lot number, drop-off photos and status updates, and customers follow along on a tracking page.',
      points: ['Staff app with owner and team accounts', 'Lot numbers, printed slips and WhatsApp updates', 'Customers track their own device'],
    },
    sigil: {
      tagline: 'Verify degrees and resumes by signature, not by phone call',
      kind: 'Trust and identity',
      credit: 'With Team Sigil, VIT Pune',
      summary:
        'Issuer-signed proofs that anyone can check instantly, with no per-check lookup to the issuer. It covers certificates, whole resumes, paper checks and a wallet the holder owns.',
      points: ['Never says verified without naming who vouched', 'AI proposes, the holder confirms', 'English, Hindi and Marathi'],
    },
    samvada: {
      tagline: 'Learn a language by speaking it',
      kind: 'Education',
      credit: 'Built solo',
      summary:
        'Conversation-first courses for people who know some words but never learned the grammar. Grammar appears only where a real sentence needs it, and every module ends by actually talking.',
      points: ['Ten courses, each with its own script, palette and type', 'Sanskrit, Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Pali, German and French', 'No streaks, no XP, no mascot'],
    },
    wattway: {
      tagline: 'Find the charger that is actually best, not just closest',
      kind: 'Maps and routing',
      credit: 'Indexing and backend lead, Team Kothimbir',
      summary:
        'EV route and queue optimiser. It shows live queue lengths, plans a battery-aware route with one charging stop, and lets drivers queue virtually. A data structures project where every structure backs a real feature.',
      points: ['201 passing tests', 'Stops chosen by distance, wait and price together', 'Operator dashboard for slots and queue depth'],
    },
    taral: {
      tagline: 'Prove you are human. Make it fun.',
      kind: 'Interactive story',
      credit: 'Built for Pixathon by Insight AI',
      summary:
        "CAPTCHA reimagined as a narrated fairytale. You type your name and your partner's name, then cross three trials to get them back, and every gate is a test only a person can pass.",
      points: ['13 challenge types across the story', 'Scored on a humanity percentage', 'Live leaderboard and full voice narration'],
    },
    pathway: {
      tagline: 'A loan rejection should be a roadmap',
      kind: 'Fintech and ML',
      credit: 'Hackathon prototype, an educational simulation',
      summary:
        'Explains why a loan was declined in plain English, Hindi or Marathi, finds the smallest realistic set of changes that flips the decision, and projects when you will get there.',
      points: ['Reason codes from an interpretable model', '400 seeded futures give a likely approval month', 'True APR check for instant-loan offers'],
    },
    abyssguard: {
      tagline: 'See what lies beneath',
      kind: 'Marine AI',
      credit: 'Team TMS<3, Smart India Hackathon 2026',
      summary:
        'The product showcase for an onboard system that turns raw side-scan sonar logs into geotagged, confidence-scored hazard reports, for the Ministry of Earth Sciences and NIOT.',
      points: ['Problem statement 26057', 'Physics filters after the detector, not just a model', 'Designed to run on the vehicle with no cloud link'],
    },
    satquery: {
      tagline: 'Ask Earth. Get intelligence.',
      kind: 'Remote sensing AI',
      credit: 'Team TMS<3, Smart India Hackathon 2026',
      summary:
        'The product showcase for a vision-language assistant for ISRO. Give it an image, an optical and SAR pair, or two dates of the same ground, and ask in plain language. The query decides the pipeline.',
      points: ['Problem statement 26167', 'One question replaces single-task tools', 'Every figure tagged with its source'],
    },
    immunis: {
      tagline: 'An adversarial immune system for payment networks',
      kind: 'Fraud and ML',
      credit: 'Python engine with a web prototype',
      summary:
        'Manufactures the fraud that has not happened yet. It generates emerging GenAI payment fraud into a realistic ledger, defends with a calibrated hybrid detector, then lets a red agent evolve against the live model until the model wins.',
      points: ["Every evasion becomes tomorrow's training label", 'Whole pipeline runs in about 7 minutes on a CPU', 'Results regenerate from a single command'],
    },
    eagle: {
      tagline: 'The drawing is the answer key. The photo is the evidence.',
      kind: 'Industrial AI',
      credit: 'With Team Vishwakarma gng',
      summary:
        'A quality control prototype for electrical cabinets. It checks each part, label and ferrule in a photo against the engineering drawing, and walks an inspector through the check sheet. Results in this round are simulated.',
      points: ['Inspection, QC sheet and re-check history', 'Plug-in checks', 'Built to take a real AI pipeline in the next round'],
    },
    fingervault: {
      tagline: 'One finger. The whole verified record.',
      kind: 'Biometrics research',
      credit: 'Group 17, guided by Dr. Rahul Diwate',
      summary:
        'A privacy-first biometric employee information and emergency access system. This stage is the interface prototype, with synthetic records standing in for the encrypted store and simulated timings for the hardware.',
      points: ['Nine-stage scan pipeline, including spoof and worn ridges', 'Role-based views of a single record', 'Incident-bound emergency disclosure'],
    },
    riyaaz: {
      tagline: 'A practice room for Hindustani classical vocal',
      kind: 'Music',
      credit: 'Phone-first PWA and Android app',
      summary:
        'Raag reference, tanpura, peti and tabla, sing-along with timed lyrics, recording, a swar meter and a practice log, in English and Marathi. All data stays on the device and it works offline.',
      points: ['Installs as an app', 'Android build through Capacitor', 'Backups stay in your own hands'],
    },
    riddles: {
      tagline: 'Three packs. Three lives. One chance.',
      kind: 'Game',
      credit: 'Built solo, as a gift',
      summary:
        'A riddle game that grew a real backend: NLP answer matching, Firebase leaderboards, an AI riddle generator, a live admin panel, and a scraper that checks whether a riddle already exists online.',
      points: ['13 stars on GitHub', 'Understands answers, not exact strings', 'Email alerts on top three finishes'],
    },
    sunshine: {
      tagline: 'Music between your fingers',
      kind: 'Creative tech',
      credit: 'Hand-tracked instrument for the browser',
      summary:
        'Your webcam becomes an instrument. It detects hand landmarks in real time, recognises pinches, and maps them to chords, with all the sound made in the browser.',
      points: ['Real-time hand landmark detection', 'Pinch gestures mapped to chords', 'Sound generated with Web Audio'],
    },
  } as Record<string, { tagline: string; kind: string; credit: string; summary: string; points: string[] }>,

  /** Stack words that describe rather than name a tool */
  stack: {
    'YOLO11-seg design': 'YOLO11-seg design',
    'Vision-language design': 'Vision-language design',
    'ESP32 design': 'ESP32 design',
    'Computer vision': 'Computer vision',
    'Hand tracking': 'Hand tracking',
  } as Record<string, string>,

  archive: {
    Poof: { note: 'Group polls that delete themselves after 24 hours' },
    'Bhav Saathi': { note: 'Concept film for the GAVS Hackathon, with Tanaya Thorat' },
    BioAI: { note: 'Genomic intelligence platform on NCBI, UniProt and GWAS data' },
    Cognito: { note: 'Voice-first mental wellness companion on the Gemini Live API' },
    Pixels: { note: 'Animated agency site in Next.js, GSAP and Lenis' },
    Brioso: { note: 'A cinematic cafe website built on storytelling' },
    'Mafia Moderator': { note: 'Runs a whole game of Mafia for you' },
    'Drowsiness Detection': { title: 'Drowsiness Detection', note: 'Eye tracking with MediaPipe, alerts through an Arduino' },
    Marginalia: { note: 'One human-written line on your lock screen' },
  } as Record<string, { title?: string; note: string }>,

  pins: {
    vit: { place: 'Bibwewadi', note: 'Where I study Computer Engineering, 2025 to 2029.' },
    mit: { place: 'Kothrud', note: "Where Patient-Tap took First Runner-Up at Incubex '26." },
    its: { place: 'Somwar Peth', note: 'A local repair shop I built a site and tracker for.' },
  } as Record<string, { place: string; note: string }>,

  hackathons: {
    incubex: {
      place: 'First Runner-Up',
      host: 'MIT World Peace University, Pune',
      note: 'Second place with Patient-Tap, alongside Tanaya Thorat, Samruddhi Wankhede, Vedant Patil, Samarth Dhage and Vyanktesh Yeole.',
    },
    codeamble: {
      place: 'Second Runner-Up',
      host: 'National 24-hour hackathon, Kharghar, Navi Mumbai',
      note: 'My first offline hackathon and first podium, with Patient-Tap. Built with Samarth Dhage, Tanaya Thorat and Vyanktesh Yeole.',
    },
  } as Record<string, { place: string; host: string; note: string }>,

  research: {
    fingervault: { title: 'Privacy-first biometric records', where: 'Group 17, guide Dr. Rahul Diwate' },
    abyssguard: { title: 'Marine debris from side-scan sonar', where: 'SIH 2026, problem statement 26057' },
    satquery: { title: 'Vision-language remote sensing', where: 'SIH 2026, problem statement 26167' },
    immunis: { title: 'Adversarial training against payment fraud', where: 'Red agent against a live model' },
  } as Record<string, { title: string; where: string }>,

  states: {} as Record<string, string>,
}

export type Dict = typeof en
export default en
