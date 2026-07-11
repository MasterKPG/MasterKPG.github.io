import type { Bi } from './i18n'

/* ── Media assets ────────────────────────────────────────────────────────────
   Covers, videos and documents are loaded at runtime from /public/assets so the
   build never breaks on a missing file and you can drop media in anytime:

     public/assets/covers/<id>.webp   ← cover image (Higgsfield render or photo)
     public/assets/videos/<id>.mp4    ← demo video shown in the preview modal
     public/assets/docs/<id>.pdf      ← document opened from the preview modal

   Until a cover file exists, each project shows its animated gradient fallback
   (the `grad` field). Generated Higgsfield covers can be downloaded from the
   generation widget and dropped into public/assets/covers/ using the id below. */

export type ProjectCategory = 'hardware' | 'embedded' | 'software' | 'ml'

export interface ProjectDoc {
  label: Bi
  href: string
}

export interface Project {
  id: string
  title: Bi
  blurb: Bi
  description: Bi
  categories: ProjectCategory[]
  tags: string[]
  /** Runtime cover path under /public; falls back to `grad` if the file is absent. */
  cover: string
  /** CSS gradient shown before/instead of a cover image. */
  grad: string
  /** Optional MP4 in /assets/videos — shown in the preview modal when present. */
  video?: string
  /** Optional documents (PDF/slides) in /assets/docs. */
  docs?: ProjectDoc[]
  featured?: boolean
  repo?: string
  demo?: string
}

export const CATEGORY_LABELS: Record<ProjectCategory | 'all', Bi> = {
  all: { en: 'All', fr: 'Tous' },
  hardware: { en: 'Hardware', fr: 'Matériel' },
  embedded: { en: 'Embedded', fr: 'Embarqué' },
  software: { en: 'Software', fr: 'Logiciel' },
  ml: { en: 'ML / Data', fr: 'ML / Données' },
}

export const PROJECTS: Project[] = [
  {
    id: 'arduino-clone',
    cover: 'assets/covers/arduino-clone.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#0c2530 60%,#0891b2)',
    featured: true,
    title: { en: 'Arduino Clone — Board to Game', fr: 'Clone Arduino — de la carte au jeu' },
    blurb: {
      en: 'A hand-built ATmega328P board — schematic, routing, soldering and bootloader.',
      fr: 'Une carte ATmega328P faite main — schéma, routage, soudure et bootloader.',
    },
    description: {
      en: 'Designed and fabricated an Arduino-compatible board from scratch: schematic capture, PCB routing, component soldering and bootloader flashing. The board then became the platform for two embedded projects — a Pong game and a VHDL binary adder.',
      fr: "Conception et fabrication d'une carte compatible Arduino de A à Z : schéma électronique, routage de la carte, soudure des composants et flash du bootloader. La carte a ensuite servi de plateforme à deux projets embarqués — un jeu Pong et un additionneur binaire en VHDL.",
    },
    categories: ['hardware', 'embedded'],
    tags: ['PCB Design', 'ATmega328P', 'VHDL', 'C/C++', 'Electronics'],
    video: 'assets/videos/arduino-clone.mp4',
    docs: [{ label: { en: 'Schematic (PDF)', fr: 'Schéma (PDF)' }, href: 'assets/docs/arduino-clone.pdf' }],
  },
  {
    id: 'ping-pong',
    cover: 'assets/covers/ping-pong.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#0e2229 60%,#06b6d4)',
    title: { en: 'Ping-Pong', fr: 'Ping-Pong' },
    blurb: {
      en: 'A Pong game running on the custom board — render loop, collisions, scoring.',
      fr: 'Un jeu Pong sur la carte maison — boucle de rendu, collisions, score.',
    },
    description: {
      en: 'A classic Pong rendered on a display and driven by buttons on the home-built board. Fixed-timestep refresh loop, paddle/ball collision detection and score tracking, written in C/C++ for the ATmega.',
      fr: "Un Pong classique rendu sur écran et piloté par boutons sur la carte maison. Boucle de rafraîchissement à pas fixe, détection des collisions raquette/balle et suivi du score, en C/C++ pour l'ATmega.",
    },
    categories: ['embedded', 'software'],
    tags: ['C/C++', 'Embedded', 'Game Loop'],
    video: 'assets/videos/ping-pong.mp4',
  },
  {
    id: 'adder',
    cover: 'assets/covers/adder.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#101f2c 55%,#22d3ee)',
    title: { en: 'VHDL Binary Adder', fr: 'Additionneur binaire VHDL' },
    blurb: {
      en: 'Combinational adder described in VHDL with carry propagation and a testbench.',
      fr: 'Additionneur combinatoire en VHDL, propagation de retenue et testbench.',
    },
    description: {
      en: 'A binary adder described in VHDL: combinational logic, ripple-carry propagation and a self-checking testbench for validation. Simulated and synthesised as part of the digital-logic coursework behind the custom board.',
      fr: "Un additionneur binaire décrit en VHDL : logique combinatoire, propagation de la retenue et banc de test auto-vérifiant pour la validation. Simulé et synthétisé dans le cadre du travail de logique numérique derrière la carte maison.",
    },
    categories: ['hardware', 'embedded'],
    tags: ['VHDL', 'Digital Logic', 'Testbench'],
    docs: [{ label: { en: 'Report (PDF)', fr: 'Rapport (PDF)' }, href: 'assets/docs/adder.pdf' }],
  },
  {
    id: 'connected-plant',
    cover: 'assets/covers/connected-plant.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#0c2620 60%,#14b8a6)',
    title: { en: 'Connected Plant', fr: 'Plante connectée' },
    blurb: {
      en: 'IoT plant monitor: soil, temperature and light sensors with auto-watering.',
      fr: "Moniteur de plante IoT : capteurs de sol, température et lumière, arrosage auto.",
    },
    description: {
      en: 'An IoT plant-monitoring system: soil-moisture, temperature and light sensors feed a microcontroller that triggers automatic watering above threshold and reports readings. End-to-end build from sensor wiring to firmware.',
      fr: "Un système de surveillance de plante IoT : des capteurs d'humidité du sol, de température et de luminosité alimentent un microcontrôleur qui déclenche l'arrosage automatique au-delà d'un seuil et remonte les mesures. Réalisation de bout en bout, du câblage des capteurs au firmware.",
    },
    categories: ['hardware', 'embedded'],
    tags: ['Arduino', 'Sensors', 'IoT', 'C/C++'],
    video: 'assets/videos/connected-plant.mp4',
  },
  {
    id: 'tipe-sailboat',
    cover: 'assets/covers/tipe-sailboat.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#0e1d2c 60%,#38bdf8)',
    title: { en: 'TIPE — Sailboat Dynamics', fr: 'TIPE — Dynamique des voiliers' },
    blurb: {
      en: 'Physical modelling of sailboat performance + Dijkstra on a weighted graph.',
      fr: 'Modélisation physique des performances + Dijkstra sur graphe pondéré.',
    },
    description: {
      en: "Physical modelling of a sailboat's performance across points of sail, represented as a weighted graph, with Dijkstra's algorithm to minimise crossing time.",
      fr: "Modélisation physique des performances d'un voilier selon les allures, représentée en graphe pondéré, avec l'algorithme de Dijkstra pour minimiser le temps de parcours.",
    },
    categories: ['software', 'ml'],
    tags: ['Physics', 'Graphs', 'Dijkstra', 'Python'],
  },
  {
    id: 'ml-clustering',
    cover: 'assets/covers/ml-clustering.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#131c26 55%,#67e8f9)',
    title: { en: 'Machine Learning — KNN & K-Means', fr: 'Machine Learning — KNN & K-Means' },
    blurb: {
      en: 'KNN and K-Means implemented from scratch with NumPy/SciPy and Matplotlib.',
      fr: 'KNN et K-Means implémentés from scratch (NumPy/SciPy, Matplotlib).',
    },
    description: {
      en: 'From-scratch implementations of KNN and K-Means with matrix computation (NumPy/SciPy) and Matplotlib visualisations to analyse the resulting clusters.',
      fr: "Implémentations from scratch de KNN et K-Means avec calcul matriciel (NumPy/SciPy) et visualisations Matplotlib pour analyser les regroupements.",
    },
    categories: ['ml', 'software'],
    tags: ['Python', 'NumPy', 'SciPy', 'Matplotlib'],
  },
  {
    id: 'weather-api',
    cover: 'assets/covers/weather-api.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#0e1c26 60%,#2dd4bf)',
    title: { en: 'Weather App — REST API', fr: 'Application météo — API REST' },
    blurb: {
      en: 'Open-Meteo integration with JSON parsing and network error handling.',
      fr: 'Intégration Open-Meteo, parsing JSON et gestion des erreurs réseau.',
    },
    description: {
      en: 'Integration of the Open-Meteo API with JSON parsing, robust network error handling and dynamic visualisation of weather data.',
      fr: "Intégration de l'API Open-Meteo, parsing JSON, gestion robuste des erreurs réseau et visualisation dynamique des données météo.",
    },
    categories: ['software'],
    tags: ['Python', 'REST API', 'JSON'],
  },
  {
    id: 'dll-injection',
    cover: 'assets/covers/dll-injection.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#141a24 60%,#0ea5e9)',
    title: { en: 'C++ — DLL Injection', fr: 'C++ — Injection DLL' },
    blurb: {
      en: 'Windows DLL injector using the Win32 API for process & memory management.',
      fr: 'Injecteur de DLL Windows via Win32 (processus & mémoire).',
    },
    description: {
      en: 'A Windows DLL injector leveraging the Win32 API for process handling, memory management and pointer work — an exercise in low-level systems programming.',
      fr: "Un injecteur de DLL Windows exploitant l'API Win32 pour la gestion des processus, de la mémoire et des pointeurs — un exercice de programmation système bas niveau.",
    },
    categories: ['software'],
    tags: ['C++', 'Windows API', 'Memory'],
  },
  {
    id: 'ascii-art',
    cover: 'assets/covers/ascii-art.webp',
    grad: 'linear-gradient(135deg,#0a0f14,#101a20 55%,#0891b2)',
    title: { en: 'ASCII Art Generator', fr: 'Générateur ASCII Art' },
    blurb: {
      en: 'Turns images into ASCII via PIL with matrix optimisation for readability.',
      fr: "Transforme des images en ASCII via PIL, optimisation matricielle.",
    },
    description: {
      en: 'Transforms images into ASCII representations via PIL, with matrix optimisation for a legible render.',
      fr: "Transformation d'images en représentations ASCII via PIL, avec optimisation matricielle pour un rendu lisible.",
    },
    categories: ['software'],
    tags: ['Python', 'PIL', 'Imaging'],
  },
]

export interface Skill {
  name: string
  level: number // 0–100
  kind: 'hardware' | 'software'
}

export const SKILLS: Skill[] = [
  { name: 'VHDL', level: 82, kind: 'hardware' },
  { name: 'PCB / Card Design', level: 78, kind: 'hardware' },
  { name: 'Embedded Systems', level: 80, kind: 'hardware' },
  { name: 'Electronics', level: 76, kind: 'hardware' },
  { name: 'Arduino', level: 88, kind: 'hardware' },
  { name: 'Microcontrollers', level: 79, kind: 'hardware' },
  { name: 'C / C++', level: 85, kind: 'software' },
  { name: 'Python', level: 88, kind: 'software' },
  { name: 'Java', level: 72, kind: 'software' },
  { name: 'JavaScript', level: 70, kind: 'software' },
  { name: 'Algorithms', level: 84, kind: 'software' },
  { name: 'Git', level: 80, kind: 'software' },
]

/** Words cycled through the gooey hero morph — the "technologies I can use". */
export const MORPH_WORDS = [
  'VHDL',
  'Embedded',
  'PCB Design',
  'Arduino',
  'C / C++',
  'Python',
  'Electronics',
  'Systems',
]

export interface TimelineEntry {
  date: Bi
  title: Bi
  place: Bi
  desc: Bi
  tags: string[]
}

export const EDUCATION: TimelineEntry[] = [
  {
    date: { en: 'Sept. 2024 – Present', fr: 'Sept. 2024 – En cours' },
    title: { en: 'Systems Engineering & Embedded', fr: 'Ingénierie des systèmes & embarqué' },
    place: { en: 'ENSSAT – University of Rennes · Lannion, France', fr: 'ENSSAT – Université de Rennes · Lannion, France' },
    desc: {
      en: 'Focused on embedded systems, digital electronics, hardware description (VHDL), PCB design and advanced algorithms. Building prototypes from schematic to firmware.',
      fr: "Orienté systèmes embarqués, électronique numérique, description matérielle (VHDL), conception de cartes et algorithmique avancée. Prototypes du schéma au firmware.",
    },
    tags: ['Embedded', 'VHDL', 'Electronics', 'Algorithms'],
  },
  {
    date: { en: 'Sept. 2022 – Jul. 2024', fr: 'Sept. 2022 – Juil. 2024' },
    title: { en: 'CPGE – MPSI / MP', fr: 'CPGE – MPSI / MP' },
    place: { en: 'Lycée Technique Mohammedia · Morocco', fr: 'Lycée Technique Mohammedia · Maroc' },
    desc: {
      en: 'Intensive training in applied mathematics, physics and engineering science: modelling, optimisation and advanced algorithms for the grandes écoles entrance exams.',
      fr: "Formation intensive en mathématiques appliquées, physique et sciences de l'ingénieur : modélisation, optimisation et algorithmique avancée pour les concours.",
    },
    tags: ['Mathematics', 'Physics', 'Engineering Science'],
  },
  {
    date: { en: 'Sept. 2021 – Jul. 2022', fr: 'Sept. 2021 – Juil. 2022' },
    title: { en: 'Scientific Baccalaureate — Highest Honours', fr: 'Baccalauréat Scientifique — Mention Très Bien' },
    place: { en: 'Newton International School · Morocco', fr: 'Newton International School · Maroc' },
    desc: {
      en: 'Specialisation in Mathematics and Physical Sciences.',
      fr: 'Spécialité : Mathématiques et Sciences physiques.',
    },
    tags: ['Mathematics', 'Physical Sciences'],
  },
]

export const EXPERIENCE: TimelineEntry[] = [
  {
    date: { en: '2025 – Present', fr: '2025 – Présent' },
    title: { en: 'Library Monitor', fr: 'Moniteur de bibliothèque' },
    place: { en: 'ENSSAT · Lannion, France', fr: 'ENSSAT · Lannion, France' },
    desc: {
      en: 'Supervising the library, helping students and managing the workspace to keep an effective study environment.',
      fr: "Supervision de la bibliothèque, aide aux étudiants et gestion de l'espace de travail pour un environnement d'étude efficace.",
    },
    tags: ['Organisation', 'Student Support'],
  },
  {
    date: { en: '2025 – Present', fr: '2025 – Présent' },
    title: { en: 'Reception Host', fr: "Hôte d'accueil" },
    place: { en: 'City One · Lannion, France', fr: 'City One · Lannion, France' },
    desc: {
      en: 'Welcoming the public, informing and directing visitors to ensure a smooth, professional experience.',
      fr: "Accueil du public, information et orientation des visiteurs pour une expérience fluide et professionnelle.",
    },
    tags: ['Customer Relations', 'Communication'],
  },
  {
    date: { en: '2019 – 2021', fr: '2019 – 2021' },
    title: { en: 'Active Member – Sailing', fr: 'Membre actif – Voile' },
    place: { en: 'Yacht Club Mohammedia · Morocco', fr: 'Yacht Club Mohammedia · Maroc' },
    desc: {
      en: 'Club activities, teamwork and community involvement around sailing.',
      fr: "Activités du club, travail en équipe et engagement associatif autour de la voile.",
    },
    tags: ['Sailing', 'Teamwork'],
  },
]

export const COPY = {
  nav: {
    about: { en: 'About', fr: 'À propos' },
    skills: { en: 'Skills', fr: 'Compétences' },
    experience: { en: 'Experience', fr: 'Parcours' },
    projects: { en: 'Projects', fr: 'Projets' },
    contact: { en: 'Contact', fr: 'Contact' },
  },
  hero: {
    kicker: { en: 'Systems Engineering & Hardware Development', fr: 'Ingénierie des systèmes & développement hardware' },
    tagline: {
      en: 'Embedded systems, VHDL and PCB design — building from silicon to software.',
      fr: 'Systèmes embarqués, VHDL et conception de cartes — du silicium au logiciel.',
    },
    viewWork: { en: 'View Projects', fr: 'Voir les projets' },
    getInTouch: { en: 'Get in Touch', fr: 'Me contacter' },
  },
  about: {
    label: { en: 'About', fr: 'À propos' },
    title: { en: 'From schematic to firmware', fr: 'Du schéma au firmware' },
    p1: {
      en: "I'm an engineering student at ENSSAT (University of Rennes) moving toward systems engineering and hardware development: embedded systems, electronics, PCB design and hardware description in VHDL — right at the boundary between software and hardware.",
      fr: "Étudiant ingénieur à l'ENSSAT (Université de Rennes), je m'oriente vers l'ingénierie des systèmes et le développement hardware : systèmes embarqués, électronique, conception de cartes et description matérielle en VHDL — à la frontière entre logiciel et matériel.",
    },
    p2: {
      en: 'Trained in CPGE MPSI/MP, I have a solid base in applied mathematics, algorithms and engineering science. As comfortable with code as with a soldering iron, I build prototypes end to end and am looking for an internship to bring analytical rigour to projects with impact.',
      fr: "Formé en CPGE MPSI/MP, j'ai une base solide en mathématiques appliquées, algorithmique et sciences de l'ingénieur. À l'aise avec le code comme avec le fer à souder, je conçois des prototypes de bout en bout et recherche un stage pour apporter une rigueur analytique à des projets à impact.",
    },
  },
  skills: {
    label: { en: 'Stack', fr: 'Stack' },
    title: { en: 'Skills & Technologies', fr: 'Compétences & technologies' },
    sub: {
      en: 'A hardware & software range — from the transistor to the program.',
      fr: 'Un éventail hardware & software — du transistor au programme.',
    },
  },
  experience: {
    label: { en: 'Journey', fr: 'Parcours' },
    education: { en: 'Education', fr: 'Formation' },
    career: { en: 'Experience', fr: 'Expérience' },
  },
  projects: {
    label: { en: 'Work', fr: 'Réalisations' },
    title: { en: 'Selected Projects', fr: 'Projets sélectionnés' },
    sub: {
      en: 'Click a project for a closer look — previews, video and documents.',
      fr: 'Cliquez sur un projet pour en savoir plus — aperçus, vidéo et documents.',
    },
    preview: { en: 'Preview', fr: 'Aperçu' },
    watch: { en: 'Watch demo', fr: 'Voir la démo' },
    soon: { en: 'Media coming soon', fr: 'Média à venir' },
    close: { en: 'Close', fr: 'Fermer' },
  },
  contact: {
    label: { en: 'Say Hello', fr: 'Dire bonjour' },
    title: { en: "Let's build something", fr: 'Construisons ensemble' },
    sub: {
      en: 'For an internship, a collaboration or just to chat — I would love to hear from you.',
      fr: "Pour un stage, une collaboration ou simplement échanger — je serai ravi de vous répondre.",
    },
    email: { en: 'Send an email', fr: 'Envoyer un email' },
  },
} as const

export const CONTACT = {
  email: 'mamara@enssat.fr',
  phone: '+33751332940',
  linkedin: 'https://www.linkedin.com/in/mohammad-amara/',
  github: 'https://github.com/MasterKPG',
  location: { en: 'Lannion 22300, France', fr: 'Lannion 22300, France' } as Bi,
  languages: { en: 'Arabic (native) · French (B2) · English (B2)', fr: 'Arabe (natif) · Français (B2) · Anglais (B2)' } as Bi,
}
