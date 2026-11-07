import type { Dict } from './en'

const de: Dict = {
  meta: { title: 'Viral Dhoka | Kreativer Frontend- und Full-Stack-Entwickler, Pune' },
  lang: { label: 'Sprache', switching: 'Deutsch' },

  nav: { main: 'Hauptmenü', about: 'Über mich', work: 'Arbeiten', wins: 'Erfolge', contact: 'Kontakt', top: 'Anfang', research: 'Forschung' },
  clock: (time) => `Pune ${time} IST`,

  loader: { greetings: ['Hallo', 'Willkommen', 'Schön, dass du da bist'], aria: 'Das Portfolio von Viral Dhoka wird geladen', place: 'Pune, Indien' },

  hero: {
    title: 'Das Web\nlebendig machen',
    sub: 'Ich bin Viral, Student der Technischen Informatik am VIT Pune. Ich baue kreative Frontends und die Full-Stack-Systeme und Modelle dahinter.',
    cta: 'Meine Arbeiten',
    jump: 'Zu den Arbeiten',
    scroll: 'Scrollen',
  },

  story: {
    pune: 'Pune',
    drag: 'Ziehen',
    coords: '18,52° N, 73,86° O',
    where: {
      kicker: 'Wo ich bin',
      title: 'Pune, Indien',
      body: 'Auf dem Dekkan-Plateau, in Maharashtra im Westen Indiens. Greif dir den Globus und dreh ihn.',
      big: 'Pune',
    },
    zoom: {
      kicker: 'Näher heran',
      body: 'Fahr über die Karte, um jeden Bundesstaat zu sehen. Klick auf Maharashtra, um weiterzumachen.',
      cta: 'Nach Pune fliegen',
      map: 'Karte Indiens nach Bundesstaaten',
      zoomIn: 'Hineinzoomen',
    },
    study: {
      kicker: 'Wo ich studiere',
      title: 'Vishwakarma Institute of Technology',
      body: 'Zweites Jahr Technische Informatik. Mor führt dich herum.',
      places: 'Orte in Pune',
    },
    build: { kicker: 'Was ich baue' },
    next: {
      kicker: 'Was als Nächstes kommt',
      title: 'Noch viel vor',
      body: 'Mehr Hackathons, mehr echte Nutzer und neue Chancen. Mehr bauen, mehr lernen und mehr Wettbewerbe.',
      cta: 'Zu den Arbeiten',
    },
    tabs: {
      front: {
        label: 'Frontend',
        title: 'Oberflächen in Bewegung',
        body: 'React und Next.js mit GSAP und WebGL, wie diese Seite hier. Bewegung ist das Erste, wonach ich greife.',
        hint: 'Klick irgendwo hin, und die Pixel reagieren',
      },
      back: {
        label: 'Backend',
        title: 'Systeme, die halten',
        body: 'APIs, Authentifizierung, Warteschlangen und Postgres. CESAC enthält inzwischen über 11.000 Einträge von über 2.400 Studierenden.',
        hint: 'Klick auf einen Knoten, um eine Anfrage zu senden',
      },
      ai: {
        label: 'KI und ML',
        title: 'Modelle mit einer Aufgabe',
        body: 'Erklärbare Kreditmodelle, adversariales Training gegen Betrug und Echtzeit-Eyetracking mit der Webcam.',
        hint: 'Klick auf ein Neuron, damit es feuert',
      },
    },
    graph: { Client: 'Client', API: 'API', Auth: 'Auth', Queue: 'Queue', Postgres: 'Postgres', send: 'Senden', fire: 'Feuern' },
  },

  statement:
    'Ich bin Student im zweiten Jahr Technische Informatik, und mir ist wichtig, wie sich Dinge anfühlen. Meistens heißt das kreative Frontends. An anderen Tagen heißt es das Backend und die Modelle, die sie erst nützlich machen.',
  marquee: ['Kreatives Frontend', 'Full Stack', 'Backend', 'KI und ML', 'Pune'],

  work: {
    kicker: 'Ausgewählte Arbeiten',
    hint: 'Ziehen, wischen oder die Pfeile nutzen',
    count: (n) => `${n} Kassetten in Dauerschleife`,
    build: 'Ein Projekt von Viral Dhoka',
    initials: 'VD',
    drag: 'Ziehen',
    open: 'Öffnen',
    openProject: 'Dieses Projekt öffnen',
    prev: 'Vorheriges Projekt',
    next: 'Nächstes Projekt',
    halftoneL: ['Ar', 'beit'],
    halftoneR: ['Re', 'gal'],
  },

  wins: {
    title: 'Bisherige Erfolge',
    results: 'Hackathon-Ergebnisse',
    funnelDone: 'Platz 3 von über 250 Teams',
    funnelLeft: (n) => `noch ${n} Teams`,
    funnelAria: '250 Teams, eingegrenzt auf 40 Finalisten und dann auf die drei Teams auf dem Podium',
    replay: 'Nochmal',
    cesac: 'CESAC, live auf cesac.in',
    students: 'Registrierte Studierende',
    records: 'Eingereichte Einträge',
    views: 'Seitenaufrufe',
    openCesac: 'CESAC öffnen',
    research: 'Forschung\nund Vertiefung',
    open: 'Öffnen',
    shipping: 'Immer am Ausliefern',
    commits: 'Commits',
    repos: 'Repositories',
    vercel: 'Vercel-Projekte',
    hoverDay: 'Fahr über einen Tag',
    onDay: (n, day) => `${n} am ${day}`,
    calendar: (n) => `${n} Commits im letzten Jahr`,
    also: 'Außerdem im Regal',
  },

  detail: {
    close: 'Schließen',
    visit: (domain) => `${domain} besuchen`,
    visitSite: 'Website besuchen',
    code: 'Code',
    shot: (title) => `Screenshot von ${title}`,
  },

  footer: {
    kicker: 'Offen für neue Chancen',
    hello: 'Sag Hallo',
    greets: ['Sag Hallo', 'Lass uns reden', 'Schreib mir'],
    another: 'Anders sagen',
    copy: 'Kopieren',
    copied: 'Kopiert',
    copiedSay: 'Kopiert!',
    builds: 'Projekte im Regal',
    podiums: 'Hackathon-Podien',
    commits: 'Commits in einem Jahr',
    vercel: 'Vercel-Projekte',
    basedIn: 'Wohnort',
    city: 'Pune, Maharashtra',
    now: (time, part) => `${time} IST, ${part}`,
    parts: { lateNight: 'tief in der Nacht', morning: 'morgens', afternoon: 'nachmittags', evening: 'abends', night: 'nachts' },
    studying: 'Studium',
    degree: 'Technische Informatik',
    college: 'VIT Pune, 2025 bis 2029',
    live: 'Jetzt online',
    elsewhere: 'Anderswo',
    onPage: 'Auf dieser Seite',
    sign: 'Viral Dhoka, 2026',
    built: 'Gebaut in Pune mit React, GSAP und WebGL',
    mapFrom: 'Indienkarte von',
    license: 'CC BY 4.0',
    fanIt: 'Auffächern',
    backTop: 'Nach oben',
  },

  mor: {
    aria: 'Mor, der Pfau. Klick, damit er sein Rad schlägt.',
    cry: 'Mor!',
    lines: {
      hero: 'Hallo, ich bin Mor!',
      statement: 'Weiter scrollen',
      night: 'Dreh den Globus!',
      work: 'Nimm eine Kassette',
      research: 'Das haben wir geschafft!',
      activity: 'Schau dir die Commits an',
      footer: 'Sag Hallo!',
    },
  },

  projects: {
    cesac: {
      tagline: 'Ein Verzeichnis für jede Leistung der Studierenden im Fachbereich',
      kind: 'Full Stack',
      credit: 'Frontend, Backend und Datenbank habe ich gebaut',
      summary:
        'Die Plattform des Studierendenausschusses der Technischen Informatik am VIT Pune. Studierende reichen Zertifikate, Veranstaltungen, Wettbewerbe, Praktika, Patente und Veröffentlichungen an einem Ort ein, Lehrende prüfen sie, und jede Leistung wird festgehalten.',
      points: ['Über 2.400 registrierte Studierende', 'Über 11.000 eingereichte Einträge', 'Über 200.000 Seitenaufrufe'],
    },
    patienttap: {
      tagline: 'Ein verschlüsselter medizinischer Ausweis am Handgelenk',
      kind: 'Gesundheitstechnik',
      credit: 'Mit dem Team Vishwakarma gng',
      summary:
        'Ein NFC-Notfallausweis, der offline funktioniert. Allergien, Medikamente und wichtige Vorerkrankungen liegen verschlüsselt auf einer tragbaren Karte, und jeder Ersthelfer kann sie in Sekunden lesen, ganz ohne Empfang.',
      points: ["Zweiter Platz bei Incubex '26, MIT-WPU", 'Dritter Platz bei CODEAMBLE 2026, Kharghar, Navi Mumbai', 'AES-256-GCM auf einem NFC-Tag mit nur 504 Byte', 'Liest und schreibt ganz ohne Netzwerk'],
    },
    itspune: {
      tagline: 'Website und Reparatur-Tracker für einen Servicebetrieb in Pune',
      kind: 'Kundenprojekt',
      credit: 'Gebaut für eine Werkstatt in Somwar Peth',
      summary:
        'Eine Website für eine Werkstatt für Drucker, Laptops und Computer, mit einem Erfassungssystem für das Personal dahinter. Jedes Gerät bekommt eine Losnummer, Fotos bei der Abgabe und Statusmeldungen, und Kunden verfolgen alles auf einer Tracking-Seite.',
      points: ['Personal-App mit Konten für Inhaber und Team', 'Losnummern, gedruckte Belege und WhatsApp-Updates', 'Kunden verfolgen ihr eigenes Gerät'],
    },
    sigil: {
      tagline: 'Abschlüsse und Lebensläufe per Signatur prüfen, nicht per Anruf',
      kind: 'Vertrauen und Identität',
      credit: 'Mit dem Team Sigil, VIT Pune',
      summary:
        'Vom Aussteller signierte Nachweise, die jeder sofort prüfen kann, ohne bei jeder Prüfung beim Aussteller nachzufragen. Das umfasst Zertifikate, ganze Lebensläufe, Prüfungen auf Papier und eine Wallet, die dem Inhaber gehört.',
      points: ['Sagt nie „verifiziert“, ohne zu nennen, wer dafür bürgt', 'Die KI schlägt vor, der Inhaber bestätigt', 'Englisch, Hindi und Marathi'],
    },
    samvada: {
      tagline: 'Eine Sprache lernen, indem man sie spricht',
      kind: 'Bildung',
      credit: 'Allein gebaut',
      summary:
        'Gesprächsorientierte Kurse für alle, die ein paar Wörter kennen, aber nie die Grammatik gelernt haben. Grammatik taucht nur dort auf, wo ein echter Satz sie braucht, und jedes Modul endet mit einem echten Gespräch.',
      points: ['Zehn Kurse, jeder mit eigener Schrift, Farbpalette und Typografie', 'Sanskrit, Hindi, Marathi, Bengalisch, Tamil, Telugu, Kannada, Pali, Deutsch und Französisch', 'Keine Streaks, keine XP, kein Maskottchen'],
    },
    wattway: {
      tagline: 'Finde die Ladesäule, die wirklich am besten ist, nicht nur die nächste',
      kind: 'Karten und Routen',
      credit: 'Leitung Indexierung und Backend, Team Kothimbir',
      summary:
        'Routen- und Warteschlangen-Optimierer für E-Autos. Er zeigt Warteschlangen live, plant eine akkubewusste Route mit einem Ladestopp und lässt Fahrer sich virtuell anstellen. Ein Datenstrukturen-Projekt, in dem jede Struktur eine echte Funktion trägt.',
      points: ['201 bestandene Tests', 'Stopps nach Entfernung, Wartezeit und Preis zugleich gewählt', 'Betreiber-Dashboard für Slots und Warteschlangen'],
    },
    taral: {
      tagline: 'Beweise, dass du ein Mensch bist. Mit Spaß.',
      kind: 'Interaktive Geschichte',
      credit: 'Gebaut für den Pixathon von Insight AI',
      summary:
        'CAPTCHA neu gedacht als erzähltes Märchen. Du gibst deinen Namen und den deines Partners ein und bestehst drei Prüfungen, um ihn zurückzuholen, und jedes Tor ist ein Test, den nur ein Mensch besteht.',
      points: ['13 Arten von Herausforderungen in der Geschichte', 'Bewertet als Menschlichkeit in Prozent', 'Live-Bestenliste und vollständig vertont'],
    },
    pathway: {
      tagline: 'Eine Kreditablehnung sollte ein Fahrplan sein',
      kind: 'Fintech und ML',
      credit: 'Hackathon-Prototyp, eine Lernsimulation',
      summary:
        'Erklärt in einfachem Englisch, Hindi oder Marathi, warum ein Kredit abgelehnt wurde, findet die kleinsten realistischen Änderungen, die die Entscheidung umkehren, und schätzt, wann du dort ankommst.',
      points: ['Begründungscodes aus einem interpretierbaren Modell', '400 simulierte Zukünfte ergeben einen wahrscheinlichen Zusagemonat', 'Prüfung des echten Effektivzinses bei Sofortkrediten'],
    },
    abyssguard: {
      tagline: 'Sieh, was in der Tiefe liegt',
      kind: 'Meeres-KI',
      credit: 'Team TMS<3, Smart India Hackathon 2026',
      summary:
        'Die Produktpräsentation eines Bordsystems, das rohe Seitensichtsonar-Daten in georeferenzierte Gefahrenberichte mit Konfidenzwerten verwandelt, für das indische Ministerium für Geowissenschaften und das NIOT.',
      points: ['Aufgabenstellung 26057', 'Physikalische Filter nach dem Detektor, nicht nur ein Modell', 'Läuft auf dem Fahrzeug, ganz ohne Cloud-Verbindung'],
    },
    satquery: {
      tagline: 'Frag die Erde. Erhalte Erkenntnisse.',
      kind: 'Fernerkundungs-KI',
      credit: 'Team TMS<3, Smart India Hackathon 2026',
      summary:
        'Die Produktpräsentation eines Vision-Language-Assistenten für die ISRO. Gib ihm ein Bild, ein Paar aus optischer und SAR-Aufnahme oder zwei Zeitpunkte desselben Gebiets, und frag in normaler Sprache. Die Frage bestimmt die Pipeline.',
      points: ['Aufgabenstellung 26167', 'Eine Frage ersetzt viele Einzelwerkzeuge', 'Jede Zahl mit ihrer Quelle versehen'],
    },
    immunis: {
      tagline: 'Ein adversariales Immunsystem für Zahlungsnetzwerke',
      kind: 'Betrug und ML',
      credit: 'Python-Engine mit Web-Prototyp',
      summary:
        'Erzeugt den Betrug, den es noch gar nicht gibt. Es erzeugt neuartigen Zahlungsbetrug mit generativer KI in einem realistischen Kassenbuch, wehrt ihn mit einem kalibrierten hybriden Detektor ab und lässt dann einen roten Agenten gegen das laufende Modell antreten, bis das Modell gewinnt.',
      points: ['Jede Umgehung wird zum Trainingslabel von morgen', 'Die ganze Pipeline läuft in etwa 7 Minuten auf einer CPU', 'Alle Ergebnisse entstehen mit einem einzigen Befehl neu'],
    },
    eagle: {
      tagline: 'Die Zeichnung ist der Lösungsschlüssel. Das Foto ist der Beweis.',
      kind: 'Industrie-KI',
      credit: 'Mit dem Team Vishwakarma gng',
      summary:
        'Ein Prototyp zur Qualitätskontrolle von Schaltschränken. Er gleicht jedes Bauteil, jedes Etikett und jede Aderendhülse auf einem Foto mit der technischen Zeichnung ab und führt Prüfer durch das Prüfprotokoll. Die Ergebnisse dieser Runde sind simuliert.',
      points: ['Prüfung, QS-Protokoll und Verlauf der Nachprüfungen', 'Prüfungen als Plug-ins', 'Bereit für eine echte KI-Pipeline in der nächsten Runde'],
    },
    fingervault: {
      tagline: 'Ein Finger. Die ganze geprüfte Akte.',
      kind: 'Biometrie-Forschung',
      credit: 'Gruppe 17, betreut von Dr. Rahul Diwate',
      summary:
        'Ein biometrisches System für Mitarbeiterdaten und Notfallzugriff, bei dem Datenschutz an erster Stelle steht. Diese Phase ist der Prototyp der Oberfläche: Synthetische Datensätze ersetzen den verschlüsselten Speicher, und die Zeiten der Hardware sind simuliert.',
      points: ['Neunstufige Scan-Pipeline, inklusive Fälschungen und abgenutzter Papillarleisten', 'Rollenbasierte Ansichten auf einen einzigen Datensatz', 'Notfallfreigabe, gebunden an einen Vorfall'],
    },
    riyaaz: {
      tagline: 'Ein Übungsraum für klassischen hindustanischen Gesang',
      kind: 'Musik',
      credit: 'PWA und Android-App, fürs Handy gemacht',
      summary:
        'Raga-Nachschlagewerk, Tanpura, Harmonium und Tabla, Mitsingen mit getimten Texten, Aufnahme, ein Swar-Messgerät und ein Übungstagebuch, auf Englisch und Marathi. Alle Daten bleiben auf dem Gerät, und alles funktioniert offline.',
      points: ['Lässt sich als App installieren', 'Android-Version über Capacitor', 'Backups bleiben in deiner Hand'],
    },
    riddles: {
      tagline: 'Drei Pakete. Drei Leben. Eine Chance.',
      kind: 'Spiel',
      credit: 'Allein gebaut, als Geschenk',
      summary:
        'Ein Rätselspiel, dem ein echtes Backend gewachsen ist: Antwortabgleich per NLP, Bestenlisten mit Firebase, ein KI-Rätselgenerator, ein Live-Adminbereich und ein Scraper, der prüft, ob es ein Rätsel schon online gibt.',
      points: ['13 Sterne auf GitHub', 'Versteht Antworten, statt exakte Wörter zu verlangen', 'E-Mail-Benachrichtigung bei Platz eins bis drei'],
    },
    sunshine: {
      tagline: 'Musik zwischen deinen Fingern',
      kind: 'Kreative Technik',
      credit: 'Ein handgesteuertes Instrument für den Browser',
      summary:
        'Deine Webcam wird zum Instrument. Sie erkennt die Punkte deiner Hand in Echtzeit, erkennt Zwick-Gesten und ordnet ihnen Akkorde zu, und der ganze Klang entsteht im Browser.',
      points: ['Erkennung der Handpunkte in Echtzeit', 'Zwick-Gesten auf Akkorde gelegt', 'Klang erzeugt mit Web Audio'],
    },
  },

  stack: {
    'YOLO11-seg design': 'YOLO11-seg-Entwurf',
    'Vision-language design': 'Vision-Language-Entwurf',
    'ESP32 design': 'ESP32-Entwurf',
    'Computer vision': 'Computer Vision',
    'Hand tracking': 'Handtracking',
  },

  archive: {
    Poof: { note: 'Gruppenumfragen, die sich nach 24 Stunden selbst löschen' },
    'Bhav Saathi': { note: 'Konzeptfilm für den GAVS Hackathon, mit Tanaya Thorat' },
    BioAI: { note: 'Genomik-Plattform auf Daten von NCBI, UniProt und GWAS' },
    Cognito: { note: 'Sprachgesteuerter Begleiter für mentales Wohlbefinden auf der Gemini Live API' },
    Pixels: { note: 'Animierte Agentur-Website mit Next.js, GSAP und Lenis' },
    Brioso: { note: 'Eine filmische Café-Website, die eine Geschichte erzählt' },
    'Mafia Moderator': { note: 'Leitet eine ganze Runde Mafia für dich' },
    'Drowsiness Detection': { title: 'Müdigkeitserkennung', note: 'Eyetracking mit MediaPipe, Warnungen über einen Arduino' },
    Marginalia: { note: 'Eine von Menschen geschriebene Zeile auf deinem Sperrbildschirm' },
  },

  pins: {
    vit: { place: 'Bibwewadi', note: 'Hier studiere ich Technische Informatik, 2025 bis 2029.' },
    mit: { place: 'Kothrud', note: "Hier holte Patient-Tap den zweiten Platz bei Incubex '26." },
    its: { place: 'Somwar Peth', note: 'Eine Werkstatt aus der Nachbarschaft, für die ich Website und Tracker gebaut habe.' },
  },

  hackathons: {
    incubex: {
      place: 'Zweiter Platz',
      host: 'MIT World Peace University, Pune',
      note: 'Zweiter Platz mit Patient-Tap, gemeinsam mit Tanaya Thorat, Samruddhi Wankhede, Vedant Patil, Samarth Dhage und Vyanktesh Yeole.',
    },
    codeamble: {
      place: 'Dritter Platz',
      host: 'Nationaler 24-Stunden-Hackathon, Kharghar, Navi Mumbai',
      note: 'Mein erster Hackathon vor Ort und mein erstes Podium, mit Patient-Tap. Gebaut mit Samarth Dhage, Tanaya Thorat und Vyanktesh Yeole.',
    },
  },

  research: {
    fingervault: { title: 'Biometrische Daten mit Datenschutz zuerst', where: 'Gruppe 17, Betreuer Dr. Rahul Diwate' },
    abyssguard: { title: 'Meeresmüll aus Seitensichtsonar', where: 'SIH 2026, Aufgabenstellung 26057' },
    satquery: { title: 'Fernerkundung mit Vision-Language-Modellen', where: 'SIH 2026, Aufgabenstellung 26167' },
    immunis: { title: 'Adversariales Training gegen Zahlungsbetrug', where: 'Roter Agent gegen ein laufendes Modell' },
  },

  states: {
    'Andaman and Nicobar Islands': 'Andamanen und Nikobaren',
    'Andhra Pradesh': 'Andhra Pradesh',
    'Arunachal Pradesh': 'Arunachal Pradesh',
    Assam: 'Assam',
    Bihar: 'Bihar',
    Chandigarh: 'Chandigarh',
    Chhattisgarh: 'Chhattisgarh',
    'Dadra and Nagar Haveli': 'Dadra und Nagar Haveli',
    'Daman and Diu': 'Daman und Diu',
    Delhi: 'Delhi',
    Goa: 'Goa',
    Gujarat: 'Gujarat',
    Haryana: 'Haryana',
    'Himachal Pradesh': 'Himachal Pradesh',
    'Jammu and Kashmir': 'Jammu und Kashmir',
    Jharkhand: 'Jharkhand',
    Karnataka: 'Karnataka',
    Kerala: 'Kerala',
    Lakshadweep: 'Lakshadweep',
    'Madhya Pradesh': 'Madhya Pradesh',
    Maharashtra: 'Maharashtra',
    Manipur: 'Manipur',
    Meghalaya: 'Meghalaya',
    Mizoram: 'Mizoram',
    Nagaland: 'Nagaland',
    Odisha: 'Odisha',
    Puducherry: 'Puducherry',
    Punjab: 'Punjab',
    Rajasthan: 'Rajasthan',
    Sikkim: 'Sikkim',
    'Tamil Nadu': 'Tamil Nadu',
    Telangana: 'Telangana',
    Tripura: 'Tripura',
    'Uttar Pradesh': 'Uttar Pradesh',
    Uttarakhand: 'Uttarakhand',
    'West Bengal': 'Westbengalen',
  },
}

export default de
