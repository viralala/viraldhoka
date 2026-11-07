import type { Dict } from './en'

const es: Dict = {
  meta: { title: 'Viral Dhoka | Desarrollador frontend creativo y full stack, Pune' },
  lang: { label: 'Idioma', switching: 'Español' },

  nav: { main: 'Principal', about: 'Sobre mí', work: 'Proyectos', wins: 'Logros', contact: 'Contacto', top: 'Inicio', research: 'Investigación' },
  clock: (time) => `Pune ${time} IST`,

  loader: { greetings: ['Hola', 'Bienvenido', 'Qué tal'], aria: 'Cargando el portafolio de Viral Dhoka', place: 'Pune, India' },

  hero: {
    title: 'Dar vida\na la web',
    sub: 'Soy Viral, estudiante de Ingeniería Informática en el VIT de Pune. Creo frontends creativos, y también los sistemas full stack y los modelos que hay detrás.',
    cta: 'Ver mis proyectos',
    jump: 'Ir a los proyectos',
    scroll: 'Desliza',
  },

  story: {
    pune: 'Pune',
    drag: 'Arrastra',
    coords: '18,52° N, 73,86° E',
    where: {
      kicker: 'Dónde estoy',
      title: 'Pune, India',
      body: 'En la meseta del Decán, en Maharashtra, al oeste de la India. Agarra el globo y hazlo girar.',
      big: 'Pune',
    },
    zoom: {
      kicker: 'Acercándonos',
      body: 'Pasa el cursor por el mapa para leer cada estado. Haz clic en Maharashtra para seguir.',
      cta: 'Volar a Pune',
      map: 'Mapa de la India por estados',
      zoomIn: 'Acercar',
    },
    study: {
      kicker: 'Dónde estudio',
      title: 'Vishwakarma Institute of Technology',
      body: 'Segundo año de Ingeniería Informática. Mor te enseñará el lugar.',
      places: 'Lugares de Pune',
    },
    build: { kicker: 'Qué construyo' },
    next: {
      kicker: 'Lo que viene',
      title: 'Mucho por conquistar',
      body: 'Más hackatones, más usuarios reales y nuevas oportunidades. Construir más, aprender más y competir.',
      cta: 'Ver los proyectos',
    },
    tabs: {
      front: {
        label: 'Frontend',
        title: 'Interfaces en movimiento',
        body: 'React y Next.js con GSAP y WebGL, como esta misma página. El movimiento es lo primero que uso.',
        hint: 'Haz clic donde quieras y los píxeles reaccionan',
      },
      back: {
        label: 'Backend',
        title: 'Sistemas que aguantan',
        body: 'APIs, autenticación, colas y Postgres. CESAC ya guarda más de 11.000 registros de más de 2400 estudiantes.',
        hint: 'Haz clic en un nodo para enviar una petición',
      },
      ai: {
        label: 'IA y ML',
        title: 'Modelos con una misión',
        body: 'Modelos de crédito explicables, entrenamiento adversario contra el fraude y seguimiento ocular en tiempo real con la webcam.',
        hint: 'Haz clic en una neurona para activarla',
      },
    },
    graph: { Client: 'Cliente', API: 'API', Auth: 'Auth', Queue: 'Cola', Postgres: 'Postgres', send: 'Enviar', fire: 'Activar' },
  },

  statement:
    'Soy estudiante de segundo año de Ingeniería Informática y me importa cómo se sienten las cosas. Casi siempre eso significa frontends creativos. Otros días significa el backend y los modelos que hacen que valga la pena usarlos.',
  marquee: ['Frontend creativo', 'Full stack', 'Backend', 'IA y ML', 'Pune'],

  work: {
    kicker: 'Proyectos destacados',
    hint: 'Arrastra, desliza o usa las flechas',
    count: (n) => `${n} cintas en bucle`,
    build: 'Un proyecto de Viral Dhoka',
    initials: 'VD',
    drag: 'Arrastra',
    open: 'Abrir',
    openProject: 'Abrir este proyecto',
    prev: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    halftoneL: ['Tra', 'ba', 'jo'],
    halftoneR: ['Es', 'tan', 'te'],
  },

  wins: {
    title: 'Logros hasta ahora',
    results: 'Resultados de hackatones',
    funnelDone: '3.º de más de 250 equipos',
    funnelLeft: (n) => `quedan ${n} equipos`,
    funnelAria: '250 equipos reducidos a 40 finalistas y después a los tres del podio',
    replay: 'Repetir',
    cesac: 'CESAC, en línea en cesac.in',
    students: 'Estudiantes registrados',
    records: 'Registros enviados',
    views: 'Visitas a la página',
    openCesac: 'Abrir CESAC',
    research: 'Investigación\ny a fondo',
    open: 'Abrir',
    shipping: 'Siempre lanzando',
    commits: 'commits',
    repos: 'repositorios',
    vercel: 'proyectos en Vercel',
    hoverDay: 'Pasa el cursor por un día',
    onDay: (n, day) => `${n} el ${day}`,
    calendar: (n) => `${n} commits en el último año`,
    also: 'También en la estantería',
  },

  detail: {
    close: 'Cerrar',
    visit: (domain) => `Visitar ${domain}`,
    visitSite: 'Visitar el sitio',
    code: 'Código',
    shot: (title) => `Captura de pantalla de ${title}`,
  },

  footer: {
    kicker: 'Abierto a nuevas oportunidades',
    hello: 'Saluda',
    greets: ['Saluda', 'Hablemos', 'Escríbeme'],
    another: 'Otra forma',
    copy: 'Copiar',
    copied: 'Copiado',
    copiedSay: '¡Copiado!',
    builds: 'proyectos en la estantería',
    podiums: 'podios en hackatones',
    commits: 'commits en un año',
    vercel: 'proyectos en Vercel',
    basedIn: 'Vivo en',
    city: 'Pune, Maharashtra',
    now: (time, part) => `${time} IST, ${part}`,
    parts: { lateNight: 'de madrugada', morning: 'por la mañana', afternoon: 'por la tarde', evening: 'al atardecer', night: 'por la noche' },
    studying: 'Estudio',
    degree: 'Ingeniería Informática',
    college: 'VIT Pune, de 2025 a 2029',
    live: 'En línea ahora',
    elsewhere: 'En otros sitios',
    onPage: 'En esta página',
    sign: 'Viral Dhoka, 2026',
    built: 'Hecho en Pune con React, GSAP y WebGL',
    mapFrom: 'Mapa de la India de',
    license: 'CC BY 4.0',
    fanIt: 'Abanícalo',
    backTop: 'Volver arriba',
  },

  mor: {
    aria: 'Mor, el pavo real. Haz clic para que abra la cola.',
    cry: '¡Mor!',
    lines: {
      hero: '¡Hola, soy Mor!',
      statement: 'Sigue bajando',
      night: '¡Gira el globo!',
      work: 'Elige una cinta',
      research: '¡Eso lo hicimos!',
      activity: 'Mira los commits',
      footer: '¡Saluda!',
    },
  },

  projects: {
    cesac: {
      tagline: 'Un solo registro de cada logro estudiantil del departamento',
      kind: 'Full stack',
      credit: 'Construí el frontend, el backend y la base de datos',
      summary:
        'La plataforma del Comité de Actividades Estudiantiles de Ingeniería Informática del VIT de Pune. Los estudiantes envían certificaciones, eventos, competiciones, prácticas, patentes y publicaciones en un solo lugar, el profesorado las verifica y cada logro queda registrado.',
      points: ['Más de 2400 estudiantes registrados', 'Más de 11.000 registros enviados', 'Más de 200.000 visitas'],
    },
    patienttap: {
      tagline: 'Una identificación médica cifrada en tu muñeca',
      kind: 'Tecnología sanitaria',
      credit: 'Con el equipo Vishwakarma gng',
      summary:
        'Una identidad de emergencia NFC que funciona sin conexión. Alergias, medicamentos e historial crítico viajan cifrados en una tarjeta que se lleva puesta, y cualquier sanitario puede leerlos en segundos sin nada de cobertura.',
      points: ["Segundo puesto en Incubex '26, MIT-WPU", 'Tercer puesto en CODEAMBLE 2026, Kharghar, Navi Mumbai', 'AES-256-GCM en una etiqueta NFC de solo 504 bytes', 'Lee y escribe sin depender de la red'],
    },
    itspune: {
      tagline: 'Una web y un seguimiento de reparaciones para un taller de Pune',
      kind: 'Web para cliente',
      credit: 'Hecho para un taller de reparaciones de Somwar Peth',
      summary:
        'Una web para un taller de reparación de impresoras, portátiles y ordenadores, con un registro interno para el personal. Cada equipo recibe un número de lote, fotos de entrega y actualizaciones de estado, y los clientes lo siguen en una página de seguimiento.',
      points: ['App para el personal con cuentas de dueño y de equipo', 'Números de lote, recibos impresos y avisos por WhatsApp', 'Los clientes siguen su propio equipo'],
    },
    sigil: {
      tagline: 'Verifica títulos y currículums por firma, no por teléfono',
      kind: 'Confianza e identidad',
      credit: 'Con el equipo Sigil, VIT Pune',
      summary:
        'Pruebas firmadas por el emisor que cualquiera puede comprobar al instante, sin consultar al emisor en cada verificación. Cubre certificados, currículums completos, comprobaciones en papel y una cartera que pertenece al titular.',
      points: ['Nunca dice «verificado» sin nombrar quién lo avala', 'La IA propone y el titular confirma', 'Inglés, hindi y maratí'],
    },
    samvada: {
      tagline: 'Aprende un idioma hablándolo',
      kind: 'Educación',
      credit: 'Hecho en solitario',
      summary:
        'Cursos centrados en la conversación para quien sabe algunas palabras pero nunca aprendió la gramática. La gramática aparece solo donde una frase real la necesita, y cada módulo termina conversando de verdad.',
      points: ['Diez cursos, cada uno con su propia escritura, paleta y tipografía', 'Sánscrito, hindi, maratí, bengalí, tamil, telugu, canarés, pali, alemán y francés', 'Sin rachas, sin XP, sin mascota'],
    },
    wattway: {
      tagline: 'Encuentra el cargador que de verdad es mejor, no solo el más cercano',
      kind: 'Mapas y rutas',
      credit: 'Responsable de indexación y backend, equipo Kothimbir',
      summary:
        'Optimizador de rutas y colas para vehículos eléctricos. Muestra las colas en directo, planifica una ruta que tiene en cuenta la batería con una parada de carga y deja que los conductores hagan cola de forma virtual. Un proyecto de estructuras de datos en el que cada estructura sostiene una función real.',
      points: ['201 pruebas superadas', 'Paradas elegidas por distancia, espera y precio a la vez', 'Panel de operador para turnos y colas'],
    },
    taral: {
      tagline: 'Demuestra que eres humano. Que sea divertido.',
      kind: 'Historia interactiva',
      credit: 'Hecho para el Pixathon de Insight AI',
      summary:
        'El CAPTCHA reinventado como un cuento narrado. Escribes tu nombre y el de tu pareja, superas tres pruebas para recuperarla, y cada puerta es un reto que solo una persona puede pasar.',
      points: ['13 tipos de reto a lo largo de la historia', 'Puntuación en porcentaje de humanidad', 'Clasificación en directo y narración completa con voz'],
    },
    pathway: {
      tagline: 'Un préstamo rechazado debería ser una hoja de ruta',
      kind: 'Fintech y ML',
      credit: 'Prototipo de hackatón, una simulación educativa',
      summary:
        'Explica por qué se rechazó un préstamo en inglés, hindi o maratí sencillos, encuentra el menor conjunto realista de cambios que invierte la decisión y calcula cuándo llegarás a cumplirlos.',
      points: ['Códigos de motivo de un modelo interpretable', '400 futuros simulados dan un mes probable de aprobación', 'Comprobación de la TAE real en préstamos instantáneos'],
    },
    abyssguard: {
      tagline: 'Mira lo que hay bajo la superficie',
      kind: 'IA marina',
      credit: 'Equipo TMS<3, Smart India Hackathon 2026',
      summary:
        'La presentación de un sistema a bordo que convierte los registros en bruto de un sonar de barrido lateral en informes de riesgos georreferenciados y con nivel de confianza, para el Ministerio de Ciencias de la Tierra de la India y el NIOT.',
      points: ['Enunciado del problema 26057', 'Filtros físicos tras el detector, no solo un modelo', 'Diseñado para funcionar en el vehículo sin conexión a la nube'],
    },
    satquery: {
      tagline: 'Pregúntale a la Tierra. Obtén respuestas.',
      kind: 'IA de teledetección',
      credit: 'Equipo TMS<3, Smart India Hackathon 2026',
      summary:
        'La presentación de un asistente de visión y lenguaje para la ISRO. Dale una imagen, un par óptico y SAR o dos fechas del mismo terreno, y pregunta con palabras normales. La pregunta decide el proceso.',
      points: ['Enunciado del problema 26167', 'Una sola pregunta sustituye a herramientas de una sola tarea', 'Cada cifra lleva su fuente'],
    },
    immunis: {
      tagline: 'Un sistema inmunitario adversario para redes de pago',
      kind: 'Fraude y ML',
      credit: 'Motor en Python con un prototipo web',
      summary:
        'Fabrica el fraude que aún no ha ocurrido. Genera nuevos fraudes de pago con IA generativa dentro de un libro contable realista, se defiende con un detector híbrido calibrado y luego deja que un agente rojo evolucione contra el modelo en vivo hasta que el modelo gana.',
      points: ['Cada evasión se convierte en la etiqueta de entrenamiento de mañana', 'Todo el proceso tarda unos 7 minutos en una CPU', 'Los resultados se regeneran con un solo comando'],
    },
    eagle: {
      tagline: 'El plano es la clave de respuestas. La foto es la prueba.',
      kind: 'IA industrial',
      credit: 'Con el equipo Vishwakarma gng',
      summary:
        'Un prototipo de control de calidad para armarios eléctricos. Compara cada pieza, etiqueta y puntera de una foto con el plano de ingeniería y guía al inspector por la hoja de control. Los resultados de esta ronda son simulados.',
      points: ['Inspección, hoja de calidad e historial de revisiones', 'Comprobaciones en forma de complementos', 'Preparado para un proceso de IA real en la siguiente ronda'],
    },
    fingervault: {
      tagline: 'Un dedo. Todo el expediente verificado.',
      kind: 'Investigación biométrica',
      credit: 'Grupo 17, dirigido por el Dr. Rahul Diwate',
      summary:
        'Un sistema biométrico de información de empleados y acceso de emergencia que pone la privacidad primero. Esta fase es el prototipo de la interfaz, con registros sintéticos en lugar del almacén cifrado y tiempos simulados para el hardware.',
      points: ['Proceso de escaneo en nueve etapas, incluidas huellas falsas y crestas desgastadas', 'Vistas de un mismo registro según el rol', 'Acceso de emergencia ligado a un incidente'],
    },
    riyaaz: {
      tagline: 'Una sala de práctica para el canto clásico indostánico',
      kind: 'Música',
      credit: 'PWA y app de Android pensadas para el móvil',
      summary:
        'Referencia de ragas, tanpura, armonio y tabla, canto con letras sincronizadas, grabación, un medidor de swar y un diario de práctica, en inglés y maratí. Todos los datos se quedan en el dispositivo y funciona sin conexión.',
      points: ['Se instala como una app', 'Versión para Android con Capacitor', 'Las copias de seguridad quedan en tus manos'],
    },
    riddles: {
      tagline: 'Tres paquetes. Tres vidas. Una oportunidad.',
      kind: 'Juego',
      credit: 'Hecho en solitario, como regalo',
      summary:
        'Un juego de acertijos al que le creció un backend de verdad: comparación de respuestas con PLN, clasificaciones en Firebase, un generador de acertijos con IA, un panel de administración en vivo y un rastreador que comprueba si un acertijo ya existe en internet.',
      points: ['13 estrellas en GitHub', 'Entiende respuestas, no cadenas exactas', 'Aviso por correo al quedar entre los tres primeros'],
    },
    sunshine: {
      tagline: 'Música entre tus dedos',
      kind: 'Tecnología creativa',
      credit: 'Un instrumento controlado con las manos para el navegador',
      summary:
        'Tu webcam se convierte en un instrumento. Detecta los puntos de la mano en tiempo real, reconoce los pellizcos y los convierte en acordes, y todo el sonido se crea en el navegador.',
      points: ['Detección de puntos de la mano en tiempo real', 'Gestos de pellizco asignados a acordes', 'Sonido generado con Web Audio'],
    },
  },

  stack: {
    'YOLO11-seg design': 'Diseño con YOLO11-seg',
    'Vision-language design': 'Diseño de visión y lenguaje',
    'ESP32 design': 'Diseño con ESP32',
    'Computer vision': 'Visión artificial',
    'Hand tracking': 'Seguimiento de manos',
  },

  archive: {
    Poof: { note: 'Encuestas de grupo que se borran solas a las 24 horas' },
    'Bhav Saathi': { note: 'Película conceptual para el GAVS Hackathon, con Tanaya Thorat' },
    BioAI: { note: 'Plataforma de inteligencia genómica con datos de NCBI, UniProt y GWAS' },
    Cognito: { note: 'Compañero de bienestar mental por voz sobre la API Gemini Live' },
    Pixels: { note: 'Web animada de agencia con Next.js, GSAP y Lenis' },
    Brioso: { note: 'Una web cinematográfica para una cafetería, contada como una historia' },
    'Mafia Moderator': { note: 'Dirige por ti una partida entera de Mafia' },
    'Drowsiness Detection': { title: 'Detección de somnolencia', note: 'Seguimiento ocular con MediaPipe y alertas a través de un Arduino' },
    Marginalia: { note: 'Una línea escrita por una persona en tu pantalla de bloqueo' },
  },

  pins: {
    vit: { place: 'Bibwewadi', note: 'Donde estudio Ingeniería Informática, de 2025 a 2029.' },
    mit: { place: 'Kothrud', note: "Donde Patient-Tap logró el segundo puesto en Incubex '26." },
    its: { place: 'Somwar Peth', note: 'Un taller de reparaciones del barrio para el que hice una web y un seguimiento.' },
  },

  hackathons: {
    incubex: {
      place: 'Segundo puesto',
      host: 'MIT World Peace University, Pune',
      note: 'Segundo puesto con Patient-Tap, junto a Tanaya Thorat, Samruddhi Wankhede, Vedant Patil, Samarth Dhage y Vyanktesh Yeole.',
    },
    codeamble: {
      place: 'Tercer puesto',
      host: 'Hackatón nacional de 24 horas, Kharghar, Navi Mumbai',
      note: 'Mi primer hackatón presencial y mi primer podio, con Patient-Tap. Hecho con Samarth Dhage, Tanaya Thorat y Vyanktesh Yeole.',
    },
  },

  research: {
    fingervault: { title: 'Registros biométricos con la privacidad primero', where: 'Grupo 17, director Dr. Rahul Diwate' },
    abyssguard: { title: 'Basura marina con sonar de barrido lateral', where: 'SIH 2026, enunciado 26057' },
    satquery: { title: 'Teledetección con visión y lenguaje', where: 'SIH 2026, enunciado 26167' },
    immunis: { title: 'Entrenamiento adversario contra el fraude en pagos', where: 'Un agente rojo contra un modelo en vivo' },
  },

  states: {
    'Andaman and Nicobar Islands': 'Islas Andamán y Nicobar',
    'Andhra Pradesh': 'Andhra Pradesh',
    'Arunachal Pradesh': 'Arunachal Pradesh',
    Assam: 'Assam',
    Bihar: 'Bihar',
    Chandigarh: 'Chandigarh',
    Chhattisgarh: 'Chhattisgarh',
    'Dadra and Nagar Haveli': 'Dadra y Nagar Haveli',
    'Daman and Diu': 'Damán y Diu',
    Delhi: 'Delhi',
    Goa: 'Goa',
    Gujarat: 'Guyarat',
    Haryana: 'Haryana',
    'Himachal Pradesh': 'Himachal Pradesh',
    'Jammu and Kashmir': 'Jammu y Cachemira',
    Jharkhand: 'Jharkhand',
    Karnataka: 'Karnataka',
    Kerala: 'Kerala',
    Lakshadweep: 'Laquedivas',
    'Madhya Pradesh': 'Madhya Pradesh',
    Maharashtra: 'Maharashtra',
    Manipur: 'Manipur',
    Meghalaya: 'Meghalaya',
    Mizoram: 'Mizoram',
    Nagaland: 'Nagaland',
    Odisha: 'Odisha',
    Puducherry: 'Puducherry',
    Punjab: 'Punyab',
    Rajasthan: 'Rajastán',
    Sikkim: 'Sikkim',
    'Tamil Nadu': 'Tamil Nadu',
    Telangana: 'Telangana',
    Tripura: 'Tripura',
    'Uttar Pradesh': 'Uttar Pradesh',
    Uttarakhand: 'Uttarakhand',
    'West Bengal': 'Bengala Occidental',
  },
}

export default es
