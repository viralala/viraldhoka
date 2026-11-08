import type { Dict } from './en'

const fr: Dict = {
  meta: { title: 'Viral Dhoka | Développeur frontend créatif et full stack, Pune' },
  lang: { label: 'Langue', switching: 'Français' },

  nav: { main: 'Principal', about: 'À propos', work: 'Projets', wins: 'Réussites', contact: 'Contact', top: 'Haut', research: 'Recherche' },
  clock: (time) => `Pune ${time} IST`,

  loader: { greetings: ['Bonjour', 'Bienvenue', 'Salut'], aria: 'Chargement du portfolio de Viral Dhoka', place: 'Pune, Inde' },

  hero: {
    title: 'Donner vie\nau web',
    sub: 'Je suis Viral, étudiant en génie informatique au VIT de Pune. Je crée des frontends créatifs, ainsi que les systèmes full stack et les modèles qui les font tourner.',
    cta: 'Voir mes projets',
    jump: 'Aller aux projets',
    scroll: 'Défiler',
  },

  story: {
    pune: 'Pune',
    drag: 'Glisser',
    coords: '18,52° N, 73,86° E',
    where: {
      kicker: 'Où je suis',
      title: 'Pune, Inde',
      body: 'Sur le plateau du Deccan, dans le Maharashtra, à l’ouest de l’Inde. Attrapez le globe et faites-le tourner.',
      big: 'Pune',
    },
    zoom: {
      kicker: 'On se rapproche',
      body: 'Survolez la carte pour lire le nom de chaque État. Cliquez sur le Maharashtra pour continuer.',
      cta: 'S’envoler pour Pune',
      map: 'Carte de l’Inde par État',
      zoomIn: 'Zoomer',
    },
    study: {
      kicker: 'Où j’étudie',
      title: 'Vishwakarma Institute of Technology',
      body: 'Deuxième année de génie informatique. Mor va vous faire visiter.',
      places: 'Lieux de Pune',
    },
    build: { kicker: 'Ce que je fais' },
    apps: { kicker: 'Ce que je construis' },
    os: {
      name: 'Mor OS',
      dock: 'Apps de Mor OS',
      move: 'Déplacer',
      search: 'Rechercher',
      apps: { maps: 'Plans', id: 'Carte étudiante', term: 'Terminal', apps: 'Apps' },
      mapsIndia: 'Plans · Inde',
      card: {
        kind: 'Étudiant',
        name: 'Nom',
        programme: 'Filière',
        branch: 'Génie informatique',
        year: 'Année',
        yearValue: 'Deuxième année',
        batch: 'Promotion',
        places: 'Lieux à Pune',
        flip: 'Retourner la carte',
        flipHint: 'Cliquez sur la carte pour la retourner',
      },
      term: {
        label: 'Commande du terminal',
        placeholder: 'tapez help',
        help: 'Commandes : frontend, backend, ai, whoami, ls, clear',
        whoami: 'Viral Dhoka. Frontend créatif et full stack, Pune.',
        missing: (c) => `commande introuvable : ${c}. Essayez help.`,
      },
      appsWin: {
        live: 'En ligne',
        more: (n) => `${n} de plus sur l’étagère`,
        open: (title) => `Ouvrir ${title}`,
        readme: 'readme.txt',
        toolbox: 'Avec quoi je construis',
        groups: ['Langages', 'Frameworks', 'Motion & 3D', 'Bases de données', 'IA / ML', 'Cloud & DevOps', 'Tests'],
      },
    },
    next: {
      kicker: 'La suite',
      title: 'Encore beaucoup à conquérir',
      body: 'Plus de hackathons, plus de vrais utilisateurs et de nouvelles opportunités. Construire plus, apprendre plus et me mesurer aux autres.',
      cta: 'Voir les projets',
    },
    tabs: {
      front: {
        label: 'Frontend',
        title: 'Des interfaces qui bougent',
        body: 'React et Next.js avec GSAP et WebGL, comme la page que vous lisez. Le mouvement, c’est mon premier réflexe.',
        hint: 'Cliquez n’importe où et les pixels réagissent',
      },
      back: {
        label: 'Backend',
        title: 'Des systèmes qui tiennent',
        body: 'API, authentification, files d’attente et Postgres. CESAC compte aujourd’hui plus de 11 000 dossiers de plus de 2 400 étudiants.',
        hint: 'Cliquez sur un nœud pour envoyer une requête',
      },
      ai: {
        label: 'IA et ML',
        title: 'Des modèles avec une mission',
        body: 'Des modèles de crédit explicables, un entraînement antagoniste contre la fraude et du suivi oculaire en temps réel par webcam.',
        hint: 'Cliquez sur un neurone pour l’activer',
      },
    },
    graph: { Client: 'Client', API: 'API', Auth: 'Auth', Queue: 'File', Postgres: 'Postgres', send: 'Envoyer', fire: 'Activer' },
  },

  statement:
    'Je suis étudiant en deuxième année de génie informatique, et je tiens à ce que les choses soient agréables à utiliser. La plupart du temps, cela veut dire des frontends créatifs. D’autres jours, cela veut dire le backend et les modèles qui leur donnent tout leur intérêt.',
  marquee: ['Frontend créatif', 'Full stack', 'Backend', 'IA et ML', 'Pune'],

  work: {
    kicker: 'Projets choisis',
    hint: 'Glissez, balayez ou utilisez les flèches',
    count: (n) => `${n} cassettes en boucle`,
    build: 'Un projet de Viral Dhoka',
    initials: 'VD',
    drag: 'Glisser',
    open: 'Ouvrir',
    openProject: 'Ouvrir ce projet',
    prev: 'Projet précédent',
    next: 'Projet suivant',
    halftoneL: ['Pro', 'jets'],
    halftoneR: ['É', 'ta', 'gère'],
  },

  wins: {
    title: 'Réussites à ce jour',
    results: 'Résultats des hackathons',
    funnelDone: '3e sur plus de 250 équipes',
    funnelLeft: (n) => `encore ${n} équipes`,
    funnelAria: '250 équipes réduites à 40 finalistes, puis aux trois équipes du podium',
    replay: 'Rejouer',
    cesac: 'CESAC, en ligne sur cesac.in',
    students: 'Étudiants inscrits',
    records: 'Dossiers déposés',
    views: 'Pages vues',
    openCesac: 'Ouvrir CESAC',
    research: 'Recherche\net explorations',
    open: 'Ouvrir',
    shipping: 'Toujours en production',
    commits: 'commits',
    repos: 'dépôts',
    vercel: 'projets Vercel',
    hoverDay: 'Survolez un jour',
    onDay: (n, day) => `${n} le ${day}`,
    calendar: (n) => `${n} commits sur l’année écoulée`,
    also: 'Aussi sur l’étagère',
  },

  detail: {
    close: 'Fermer',
    visit: (domain) => `Visiter ${domain}`,
    visitSite: 'Visiter le site',
    code: 'Code',
    shot: (title) => `Capture d’écran de ${title}`,
  },

  footer: {
    kicker: 'Ouvert à de nouvelles opportunités',
    hello: 'Dites bonjour',
    greets: ['Dites bonjour', 'Parlons-en', 'Écrivez-moi'],
    another: 'Autrement',
    copy: 'Copier',
    copied: 'Copié',
    copiedSay: 'Copié !',
    builds: 'projets sur l’étagère',
    podiums: 'podiums en hackathon',
    commits: 'commits en un an',
    vercel: 'projets Vercel',
    basedIn: 'J’habite à',
    city: 'Pune, Maharashtra',
    now: (time, part) => `${time} IST, ${part}`,
    parts: { lateNight: 'tard dans la nuit', morning: 'le matin', afternoon: 'l’après-midi', evening: 'le soir', night: 'la nuit' },
    studying: 'Études',
    degree: 'Génie informatique',
    college: 'VIT Pune, de 2025 à 2029',
    live: 'En ligne',
    elsewhere: 'Ailleurs',
    onPage: 'Sur cette page',
    sign: 'Viral Dhoka, 2026',
    built: 'Conçu à Pune avec React, GSAP et WebGL',
    mapFrom: 'Carte de l’Inde par',
    license: 'CC BY 4.0',
    fanIt: 'Faire la roue',
    backTop: 'Retour en haut',
  },

  mor: {
    aria: 'Mor le paon. Cliquez pour qu’il fasse la roue.',
    cry: 'Mor !',
    lines: {
      hero: 'Bonjour, moi c’est Mor !',
      statement: 'Continuez à défiler',
      night: 'Faites tourner le globe !',
      work: 'Choisissez une cassette',
      research: 'On l’a fait !',
      activity: 'Regardez les commits',
      footer: 'Dites bonjour !',
    },
  },

  projects: {
    cesac: {
      tagline: 'Un registre unique de chaque réussite étudiante du département',
      kind: 'Full stack',
      credit: 'J’ai construit le frontend, le backend et la base de données',
      summary:
        'La plateforme du comité des activités étudiantes de génie informatique du VIT de Pune. Les étudiants y déposent certifications, événements, concours, stages, brevets et publications au même endroit, les enseignants les vérifient, et chaque réussite est enregistrée.',
      points: ['Plus de 2 400 étudiants inscrits', 'Plus de 11 000 dossiers déposés', 'Plus de 200 000 pages vues'],
    },
    patienttap: {
      tagline: 'Une identité médicale chiffrée à votre poignet',
      kind: 'Technologie médicale',
      credit: 'Avec l’équipe Vishwakarma gng',
      summary:
        'Une identité d’urgence NFC qui fonctionne hors ligne. Allergies, traitements et antécédents importants sont chiffrés sur une carte portable, et n’importe quel secouriste peut les lire en quelques secondes, même sans réseau.',
      points: ["Deuxième place à Incubex '26, MIT-WPU", 'Troisième place à CODEAMBLE 2026, Kharghar, Navi Mumbai', 'AES-256-GCM sur une puce NFC de seulement 504 octets', 'Lecture et écriture sans aucune dépendance au réseau'],
    },
    itspune: {
      tagline: 'Un site et un suivi des réparations pour une boutique de Pune',
      kind: 'Site client',
      credit: 'Réalisé pour un atelier de réparation de Somwar Peth',
      summary:
        'Un site pour un atelier de réparation d’imprimantes, d’ordinateurs portables et de PC, avec un outil d’enregistrement pour le personnel. Chaque appareil reçoit un numéro de lot, des photos au dépôt et des mises à jour de statut, et les clients suivent tout sur une page dédiée.',
      points: ['Application du personnel avec comptes propriétaire et équipe', 'Numéros de lot, reçus imprimés et notifications WhatsApp', 'Les clients suivent leur propre appareil'],
    },
    sigil: {
      tagline: 'Vérifier diplômes et CV par signature, pas par téléphone',
      kind: 'Confiance et identité',
      credit: 'Avec l’équipe Sigil, VIT Pune',
      summary:
        'Des preuves signées par l’émetteur que chacun peut vérifier instantanément, sans interroger l’émetteur à chaque fois. Cela couvre les certificats, des CV entiers, les contrôles sur papier et un portefeuille qui appartient à son titulaire.',
      points: ['Ne dit jamais « vérifié » sans nommer qui s’en porte garant', 'L’IA propose, le titulaire confirme', 'Anglais, hindi et marathi'],
    },
    samvada: {
      tagline: 'Apprendre une langue en la parlant',
      kind: 'Éducation',
      credit: 'Réalisé en solo',
      summary:
        'Des cours centrés sur la conversation pour ceux qui connaissent quelques mots sans avoir jamais appris la grammaire. La grammaire n’apparaît que là où une vraie phrase en a besoin, et chaque module se termine par une vraie conversation.',
      points: ['Dix cours, chacun avec son écriture, sa palette et sa typographie', 'Sanskrit, hindi, marathi, bengali, tamoul, télougou, kannada, pali, allemand et français', 'Pas de séries, pas d’XP, pas de mascotte'],
    },
    wattway: {
      tagline: 'Trouvez la borne vraiment idéale, pas seulement la plus proche',
      kind: 'Cartes et itinéraires',
      credit: 'Responsable de l’indexation et du backend, équipe Kothimbir',
      summary:
        'Un optimiseur d’itinéraires et de files d’attente pour véhicules électriques. Il affiche les files en direct, planifie un trajet adapté à la batterie avec un arrêt de recharge et permet aux conducteurs de faire la queue virtuellement. Un projet de structures de données où chaque structure fait tourner une vraie fonctionnalité.',
      points: ['201 tests réussis', 'Arrêts choisis selon la distance, l’attente et le prix à la fois', 'Tableau de bord opérateur pour les créneaux et les files'],
    },
    taral: {
      tagline: 'Prouvez que vous êtes humain. Avec plaisir.',
      kind: 'Récit interactif',
      credit: 'Réalisé pour le Pixathon d’Insight AI',
      summary:
        'Le CAPTCHA réinventé en conte raconté. Vous tapez votre prénom et celui de votre moitié, puis traversez trois épreuves pour la retrouver, et chaque porte est un test que seul un humain peut réussir.',
      points: ['13 types de défis au fil de l’histoire', 'Un score en pourcentage d’humanité', 'Classement en direct et narration entièrement vocale'],
    },
    pathway: {
      tagline: 'Un refus de prêt devrait être une feuille de route',
      kind: 'Fintech et ML',
      credit: 'Prototype de hackathon, une simulation pédagogique',
      summary:
        'Explique pourquoi un prêt a été refusé, en anglais, en hindi ou en marathi simples, trouve le plus petit ensemble réaliste de changements qui renverse la décision, et estime quand vous y arriverez.',
      points: ['Codes de motif issus d’un modèle interprétable', '400 avenirs simulés donnent un mois probable d’acceptation', 'Vérification du vrai TAEG des offres de prêt instantané'],
    },
    abyssguard: {
      tagline: 'Voyez ce qui se cache dessous',
      kind: 'IA marine',
      credit: 'Équipe TMS<3, Smart India Hackathon 2026',
      summary:
        'La vitrine d’un système embarqué qui transforme les relevés bruts d’un sonar à balayage latéral en rapports de dangers géolocalisés et notés en confiance, pour le ministère indien des Sciences de la Terre et le NIOT.',
      points: ['Énoncé du problème 26057', 'Des filtres physiques après le détecteur, pas seulement un modèle', 'Conçu pour tourner à bord, sans connexion au cloud'],
    },
    satquery: {
      tagline: 'Interrogez la Terre. Obtenez des réponses.',
      kind: 'IA de télédétection',
      credit: 'Équipe TMS<3, Smart India Hackathon 2026',
      summary:
        'La vitrine d’un assistant vision-langage pour l’ISRO. Donnez-lui une image, une paire optique et SAR ou deux dates du même terrain, et posez votre question simplement. C’est la question qui décide du traitement.',
      points: ['Énoncé du problème 26167', 'Une seule question remplace des outils à tâche unique', 'Chaque chiffre est accompagné de sa source'],
    },
    immunis: {
      tagline: 'Un système immunitaire antagoniste pour les réseaux de paiement',
      kind: 'Fraude et ML',
      credit: 'Moteur Python avec un prototype web',
      summary:
        'Il fabrique la fraude qui n’a pas encore eu lieu. Il génère de nouvelles fraudes au paiement par IA générative dans un registre réaliste, se défend avec un détecteur hybride calibré, puis laisse un agent rouge évoluer contre le modèle en production jusqu’à ce que le modèle l’emporte.',
      points: ['Chaque contournement devient l’étiquette d’entraînement de demain', 'Tout le traitement tourne en 7 minutes environ sur un CPU', 'Les résultats se régénèrent en une seule commande'],
    },
    eagle: {
      tagline: 'Le plan est le corrigé. La photo est la preuve.',
      kind: 'IA industrielle',
      credit: 'Avec l’équipe Vishwakarma gng',
      summary:
        'Un prototype de contrôle qualité pour armoires électriques. Il compare chaque pièce, étiquette et embout de câble d’une photo au plan technique, et guide l’inspecteur pas à pas dans la fiche de contrôle. Les résultats de cette phase sont simulés.',
      points: ['Inspection, fiche qualité et historique des contrôles', 'Contrôles sous forme de modules', 'Prêt à accueillir un vrai traitement par IA à la phase suivante'],
    },
    fingervault: {
      tagline: 'Un doigt. Tout le dossier vérifié.',
      kind: 'Recherche en biométrie',
      credit: 'Groupe 17, encadré par le Dr Rahul Diwate',
      summary:
        'Un système biométrique d’information sur les employés et d’accès d’urgence qui place la vie privée en premier. Cette étape est le prototype de l’interface, avec des dossiers synthétiques à la place du stockage chiffré et des temps simulés pour le matériel.',
      points: ['Analyse en neuf étapes, y compris empreintes falsifiées et crêtes usées', 'Vues d’un même dossier selon le rôle', 'Divulgation d’urgence liée à un incident'],
    },
    riyaaz: {
      tagline: 'Une salle de pratique pour le chant classique hindoustani',
      kind: 'Musique',
      credit: 'PWA et application Android pensées pour le téléphone',
      summary:
        'Référence des ragas, tanpura, harmonium et tabla, chant sur des paroles synchronisées, enregistrement, un indicateur de swar et un journal de pratique, en anglais et en marathi. Toutes les données restent sur l’appareil, et tout fonctionne hors ligne.',
      points: ['S’installe comme une application', 'Version Android via Capacitor', 'Les sauvegardes restent entre vos mains'],
    },
    riddles: {
      tagline: 'Trois paquets. Trois vies. Une seule chance.',
      kind: 'Jeu',
      credit: 'Réalisé en solo, comme cadeau',
      summary:
        'Un jeu d’énigmes qui s’est doté d’un vrai backend : correspondance des réponses par TAL, classements Firebase, un générateur d’énigmes par IA, un panneau d’administration en direct et un robot qui vérifie si une énigme existe déjà en ligne.',
      points: ['13 étoiles sur GitHub', 'Comprend les réponses au lieu d’exiger le mot exact', 'Alerte par e-mail pour les trois premières places'],
    },
    sunshine: {
      tagline: 'La musique entre vos doigts',
      kind: 'Technologie créative',
      credit: 'Un instrument joué à la main dans le navigateur',
      summary:
        'Votre webcam devient un instrument. Elle détecte les points de la main en temps réel, reconnaît les pincements et les associe à des accords, et tout le son est créé dans le navigateur.',
      points: ['Détection des points de la main en temps réel', 'Pincements associés à des accords', 'Son généré avec Web Audio'],
    },
  },

  stack: {
    'YOLO11-seg design': 'Conception YOLO11-seg',
    'Vision-language design': 'Conception vision-langage',
    'ESP32 design': 'Conception ESP32',
    'Computer vision': 'Vision par ordinateur',
    'Hand tracking': 'Suivi des mains',
  },

  archive: {
    Poof: { note: 'Des sondages de groupe qui s’effacent d’eux-mêmes après 24 heures' },
    'Bhav Saathi': { note: 'Film concept pour le GAVS Hackathon, avec Tanaya Thorat' },
    BioAI: { note: 'Plateforme d’analyse génomique sur les données NCBI, UniProt et GWAS' },
    Cognito: { note: 'Un compagnon de bien-être mental à la voix, sur l’API Gemini Live' },
    Pixels: { note: 'Site d’agence animé avec Next.js, GSAP et Lenis' },
    Brioso: { note: 'Un site de café cinématographique, construit comme un récit' },
    'Mafia Moderator': { note: 'Anime toute une partie de Mafia pour vous' },
    'Drowsiness Detection': { title: 'Détection de somnolence', note: 'Suivi oculaire avec MediaPipe, alertes via un Arduino' },
    Marginalia: { note: 'Une ligne écrite par un humain sur votre écran de verrouillage' },
  },

  pins: {
    vit: { place: 'Bibwewadi', note: 'Là où j’étudie le génie informatique, de 2025 à 2029.' },
    mit: { place: 'Kothrud', note: "Là où Patient-Tap a décroché la deuxième place à Incubex '26." },
    its: { place: 'Somwar Peth', note: 'Un atelier de réparation du quartier pour lequel j’ai créé un site et un suivi.' },
  },

  hackathons: {
    incubex: {
      place: 'Deuxième place',
      host: 'MIT World Peace University, Pune',
      note: 'Deuxième place avec Patient-Tap, aux côtés de Tanaya Thorat, Samruddhi Wankhede, Vedant Patil, Samarth Dhage et Vyanktesh Yeole.',
    },
    codeamble: {
      place: 'Troisième place',
      host: 'Hackathon national de 24 heures, Kharghar, Navi Mumbai',
      note: 'Mon premier hackathon en présentiel et mon premier podium, avec Patient-Tap. Réalisé avec Samarth Dhage, Tanaya Thorat et Vyanktesh Yeole.',
    },
  },

  research: {
    fingervault: { title: 'Dossiers biométriques respectueux de la vie privée', where: 'Groupe 17, encadrant Dr Rahul Diwate' },
    abyssguard: { title: 'Déchets marins par sonar à balayage latéral', where: 'SIH 2026, énoncé 26057' },
    satquery: { title: 'Télédétection vision-langage', where: 'SIH 2026, énoncé 26167' },
    immunis: { title: 'Entraînement antagoniste contre la fraude au paiement', where: 'Un agent rouge contre un modèle en production' },
  },

  states: {
    'Andaman and Nicobar Islands': 'Îles Andaman-et-Nicobar',
    'Andhra Pradesh': 'Andhra Pradesh',
    'Arunachal Pradesh': 'Arunachal Pradesh',
    Assam: 'Assam',
    Bihar: 'Bihar',
    Chandigarh: 'Chandigarh',
    Chhattisgarh: 'Chhattisgarh',
    'Dadra and Nagar Haveli': 'Dadra et Nagar Haveli',
    'Daman and Diu': 'Daman et Diu',
    Delhi: 'Delhi',
    Goa: 'Goa',
    Gujarat: 'Gujarat',
    Haryana: 'Haryana',
    'Himachal Pradesh': 'Himachal Pradesh',
    'Jammu and Kashmir': 'Jammu-et-Cachemire',
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
    Puducherry: 'Pondichéry',
    Punjab: 'Pendjab',
    Rajasthan: 'Rajasthan',
    Sikkim: 'Sikkim',
    'Tamil Nadu': 'Tamil Nadu',
    Telangana: 'Telangana',
    Tripura: 'Tripura',
    'Uttar Pradesh': 'Uttar Pradesh',
    Uttarakhand: 'Uttarakhand',
    'West Bengal': 'Bengale-Occidental',
  },
}

export default fr
