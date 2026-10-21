import type { Bi } from './i18n'

/* Media assets
   Covers, videos and documents are loaded at runtime from /public/assets so the
   build never breaks on a missing file and media can be dropped in anytime:

     public/assets/covers/<id>.webp   cover image
     public/assets/videos/<id>.mp4    demo video shown in the preview modal
     public/assets/docs/<id>.pdf      document opened from the preview modal

   Until a cover file exists, each project shows its animated gradient fallback
   (the `grad` field). */

export type ProjectCategory = 'hardware' | 'embedded' | 'software' | 'ml'

/** Where a project is shown: featured cards, the hardware fan, or one of the folders. */
export type ProjectGroup = 'featured' | 'hardware' | 'software' | 'other'

export interface ProjectDoc {
  label: Bi
  href: string
}

export interface Project {
  id: string
  group: ProjectGroup
  title: Bi
  blurb: Bi
  description: Bi
  categories: ProjectCategory[]
  tags: string[]
  /** Runtime cover path under /public; falls back to `grad` if the file is absent. */
  cover: string
  /** CSS gradient shown before/instead of a cover image. */
  grad: string
  period?: Bi
  /** Role or team, shown under the title. */
  role?: Bi
  /** Awards and press. */
  recognition?: Bi
  inProgress?: boolean
  /** Optional MP4 in /assets/videos, shown in the preview modal when present. */
  video?: string
  /** Optional documents (PDF/slides) in /assets/docs. */
  docs?: ProjectDoc[]
  featured?: boolean
  repo?: string
  demo?: string
}

export const PROJECTS: Project[] = [
  // Featured
  {
    id: 'solibox',
    group: 'featured',
    featured: true,
    cover: 'assets/covers/solibox.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0c2530 60%,#0891b2)',
    title: { en: 'Solibox', fr: 'Solibox' },
    period: { en: 'Mar 2025 to present', fr: "Mars 2025 à aujourd'hui" },
    role: {
      en: 'Lead developer and technical coordinator, volunteer with Togo Vert et Vivant Trégor',
      fr: 'Développeur principal et coordinateur technique, bénévole pour Togo Vert et Vivant Trégor',
    },
    blurb: {
      en: 'An offline education server on a Raspberry Pi: its own WiFi, a captive portal, and PDFs, quizzes, an offline Wikipedia and videos with no internet.',
      fr: "Un serveur éducatif hors ligne sur Raspberry Pi : son propre WiFi, un portail captif, et des PDF, des quiz, un Wikipédia hors ligne et des vidéos, sans internet.",
    },
    description: {
      en: 'Built from scratch on a Raspberry Pi for the non-profit Togo Vert et Vivant Trégor (Brittany, France). The box broadcasts its own WiFi network. Anyone who connects lands on a captive portal page with PDFs, quizzes, an offline copy of Wikipedia and videos, no internet needed. The web app is written in Flask and served by Gunicorn behind NGINX, managed with systemd. PostgreSQL stores newsletter subscribers. Quizzes have user accounts and an admin dashboard for users, answers and statistics.',
      fr: "Conçu de zéro sur Raspberry Pi pour l'association Togo Vert et Vivant Trégor (Bretagne). Le boîtier diffuse son propre réseau WiFi. Toute personne qui s'y connecte arrive sur un portail captif qui donne accès à des PDF, des quiz, une copie hors ligne de Wikipédia et des vidéos, sans internet. L'application web est écrite en Flask, servie par Gunicorn derrière NGINX et gérée par systemd. PostgreSQL stocke les abonnés à la newsletter. Les quiz ont des comptes utilisateurs et un tableau de bord d'administration (utilisateurs, réponses, statistiques).",
    },
    recognition: {
      en: 'Won the 2026 PIEED award, the student initiatives prize run by Étudiants et Développement. Featured in Ouest-France.',
      fr: "Lauréat du prix PIEED 2026, le prix des initiatives étudiantes d'Étudiants et Développement. Présenté dans Ouest-France.",
    },
    categories: ['embedded', 'software'],
    tags: ['Raspberry Pi', 'Linux', 'Flask', 'NGINX', 'Gunicorn', 'systemd', 'PostgreSQL', 'Captive portal'],
  },
  {
    id: 'neurolith',
    group: 'featured',
    featured: true,
    inProgress: true,
    cover: 'assets/covers/neurolith.webp',
    grad: 'linear-gradient(135deg,#181a1e,#131c26 55%,#67e8f9)',
    title: { en: 'Neurolith', fr: 'Neurolith' },
    blurb: {
      en: 'Crypto token analytics: a web app and a Discord/Telegram bot that turn market data and language model analysis into buy, sell or hold signals.',
      fr: "Analyse de tokens crypto : une application web et un bot Discord/Telegram qui transforment données de marché et analyse par modèle de langage en signaux d'achat, de vente ou de conservation.",
    },
    description: {
      en: 'A crypto token analytics platform: a web app plus a Discord/Telegram bot. It ingests market data through APIs, runs large language model analysis, and feeds a probabilistic decision model that outputs buy, sell or hold signals. A social signal module (X, Telegram) is in design, and local model hosting is being considered to reduce latency. Domain, Cloudflare DNS and email are configured.',
      fr: "Une plateforme d'analyse de tokens crypto : une application web et un bot Discord/Telegram. Elle récupère des données de marché par API, les fait analyser par un grand modèle de langage, puis alimente un modèle de décision probabiliste qui produit des signaux d'achat, de vente ou de conservation. Un module de signaux sociaux (X, Telegram) est en conception, et l'hébergement local du modèle est envisagé pour réduire la latence. Domaine, DNS Cloudflare et e-mail sont configurés.",
    },
    categories: ['software', 'ml'],
    tags: ['Web app', 'Discord bot', 'Telegram bot', 'Market APIs', 'LLM', 'Cloudflare'],
    demo: 'https://neurolith.app',
  },
  {
    id: 'lucent',
    group: 'featured',
    featured: true,
    inProgress: true,
    cover: 'assets/covers/lucent.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0e1d2c 60%,#38bdf8)',
    title: { en: 'Lucent', fr: 'Lucent' },
    period: { en: 'Oct 2026 to present', fr: "Oct. 2026 à aujourd'hui" },
    blurb: {
      en: 'A macOS style desktop for Debian 13 whose glass panels refract what is behind them instead of just blurring it.',
      fr: "Un bureau façon macOS pour Debian 13, dont les panneaux de verre réfractent ce qu'il y a derrière au lieu de simplement le flouter.",
    },
    description: {
      en: 'A Linux desktop shell for Debian 13 with a "Liquid Glass" look. It runs on the ShojiWM Wayland compositor with a Quickshell (QML) shell: menu bar with real app menus, Dock, Control Center, Spotlight, notifications, lock screen and a System Settings app. The glass is made by the compositor: real refraction of the background, a light that follows the pointer, and a governor that makes it cheaper when frames run late. It started on Hyprland and moved to ShojiWM, which is built from source (Rust) and configured in TypeScript. Small helpers are written in C and the effects in GLSL. Everything is versioned in git from the start, and packaging is still to do.',
      fr: "Un environnement de bureau pour Debian 13 avec un rendu « Liquid Glass ». Il tourne sur le compositeur Wayland ShojiWM avec un shell Quickshell (QML) : barre de menus avec de vrais menus d'application, Dock, centre de contrôle, Spotlight, notifications, écran de verrouillage et une application Réglages. Le verre est produit par le compositeur : vraie réfraction de l'arrière-plan, une lumière qui suit le pointeur, et un régulateur qui allège l'effet quand les images prennent du retard. Le projet a commencé sur Hyprland puis est passé à ShojiWM, compilé depuis les sources (Rust) et configuré en TypeScript. Les petits utilitaires sont écrits en C et les effets en GLSL. Tout est versionné avec git depuis le début, et le paquet Debian reste à faire.",
    },
    categories: ['software'],
    tags: ['Wayland', 'ShojiWM', 'Quickshell', 'QML', 'TypeScript', 'Rust', 'GLSL', 'C', 'Debian 13'],
  },

  // Hardware and embedded
  {
    id: 'arduino-clone',
    group: 'hardware',
    cover: 'assets/covers/arduino-clone.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0c2530 60%,#0891b2)',
    title: { en: 'Arduino Uno Clone in EAGLE', fr: 'Clone Arduino Uno sous EAGLE' },
    role: { en: 'Individual project', fr: 'Projet individuel' },
    blurb: {
      en: 'An Arduino Uno clone designed in EAGLE as a class project, not a bought board: schematic, routing, soldering and bootloader.',
      fr: "Un clone d'Arduino Uno conçu sous EAGLE en projet de cours, pas une carte achetée : schéma, routage, soudure et bootloader.",
    },
    description: {
      en: 'An Arduino Uno compatible board (ATmega328P) designed in EAGLE as a class project, instead of using a bought Arduino: schematic capture, PCB routing, component soldering and bootloader flashing. I designed and built the board on my own. It then ran the Pong game I made with a classmate.',
      fr: "Une carte compatible Arduino Uno (ATmega328P) conçue sous EAGLE dans le cadre d'un projet de cours, au lieu d'utiliser un Arduino du commerce : schéma électronique, routage de la carte, soudure des composants et flash du bootloader. J'ai conçu et fabriqué la carte seul. Elle a ensuite fait tourner le jeu Pong réalisé en binôme.",
    },
    categories: ['hardware', 'embedded'],
    tags: ['EAGLE', 'PCB Design', 'ATmega328P', 'Soldering', 'Electronics'],
  },
  {
    id: 'ping-pong',
    group: 'hardware',
    cover: 'assets/covers/ping-pong.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0e2229 60%,#06b6d4)',
    title: { en: 'Arduino Pong', fr: 'Pong sur Arduino' },
    role: { en: 'Team of 2', fr: 'En binôme' },
    blurb: {
      en: 'Two-player Pong on an LED matrix with sound, running on my own Arduino Uno clone. Made in a team of 2.',
      fr: "Un Pong à deux joueurs sur matrice de LED, avec du son, qui tourne sur mon clone d'Arduino Uno. Réalisé en binôme.",
    },
    description: {
      en: 'A two-player Pong game made with a classmate. The game is drawn on an 8×8 LED matrix, each player has a controller, and sound comes from an audio output. It runs on the Arduino Uno clone I designed in EAGLE. Written in C/C++: refresh loop, paddle and ball collisions, score tracking.',
      fr: "Un jeu Pong à deux joueurs réalisé en binôme. Le jeu s'affiche sur une matrice de LED 8×8, chaque joueur a sa manette, et le son passe par une sortie audio. Il tourne sur le clone d'Arduino Uno que j'ai conçu sous EAGLE. Écrit en C/C++ : boucle de rafraîchissement, collisions raquette/balle, suivi du score.",
    },
    categories: ['embedded', 'software'],
    tags: ['C/C++', 'Arduino', 'LED matrix', 'Audio', 'Game loop'],
    video: 'assets/videos/ping-pong.mp4',
  },
  {
    id: 'fir-filter',
    group: 'hardware',
    inProgress: true,
    cover: 'assets/covers/fir-filter.webp',
    grad: 'linear-gradient(135deg,#181a1e,#101f2c 55%,#22d3ee)',
    title: { en: 'Sequential FIR Filter', fr: 'Filtre RIF séquentiel' },
    period: { en: 'Oct 2026', fr: 'Oct. 2026' },
    blurb: {
      en: 'A 13-tap FIR filter in VHDL built around one multiply-accumulate unit reused 13 times.',
      fr: "Un filtre RIF à 13 coefficients en VHDL, construit autour d'un seul multiplieur-accumulateur réutilisé 13 fois.",
    },
    description: {
      en: 'ENSSAT second year project ("systolic" project) in VHDL with Quartus. A 13-tap finite impulse response filter built around a single multiply-accumulate (MAC) unit reused 13 times, instead of 13 multipliers. Datapath, memory and control unit architecture: address generator, circular sample buffer, coefficient ROM and a Moore finite state machine, with a testbench and a reference model. The focus is the trade-off between area and throughput.',
      fr: "Projet de deuxième année à l'ENSSAT (projet « systolique ») en VHDL sous Quartus. Un filtre à réponse impulsionnelle finie à 13 coefficients construit autour d'un seul multiplieur-accumulateur (MAC) réutilisé 13 fois, au lieu de 13 multiplieurs. Architecture unité de traitement, mémoire et unité de contrôle : générateur d'adresses, buffer circulaire d'échantillons, ROM de coefficients et machine de Moore, avec un banc de test et un modèle de référence. L'enjeu est le compromis entre surface et débit.",
    },
    categories: ['hardware'],
    tags: ['VHDL', 'Quartus', 'MAC', 'FSM', 'DSP', 'Testbench'],
  },
  {
    id: 'saturating-accumulator',
    group: 'hardware',
    cover: 'assets/covers/saturating-accumulator.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0c2620 60%,#14b8a6)',
    title: { en: 'Saturating Accumulator on FPGA', fr: 'Accumulateur saturant sur FPGA' },
    period: { en: 'May 2026', fr: 'Mai 2026' },
    blurb: {
      en: '3-bit inputs, a 4-bit sum that saturates at 15 with an overflow flag, verified in simulation and on a DE10-Lite board.',
      fr: 'Entrées sur 3 bits, somme sur 4 bits saturée à 15 avec un drapeau de dépassement, validée en simulation puis sur carte DE10-Lite.',
    },
    description: {
      en: 'ENSSAT, Digital Systems track. A saturating accumulator in VHDL: 3-bit inputs, a 4-bit sum that saturates at 15 and raises an overflow flag, controlled by a 5-state machine. Verified with 10 test cases in ModelSim, then on a DE10-Lite board, where I fixed two integration defects that simulation could not show: the I/O standard on one pin and the reset polarity.',
      fr: "ENSSAT, majeure Systèmes numériques. Un accumulateur saturant en VHDL : entrées sur 3 bits, somme sur 4 bits saturée à 15 avec un drapeau de dépassement, pilotée par une machine à 5 états. Validé par 10 cas de test sous ModelSim, puis sur carte DE10-Lite, où j'ai corrigé deux défauts d'intégration invisibles en simulation : le standard d'E/S d'une broche et la polarité du reset.",
    },
    categories: ['hardware'],
    tags: ['VHDL', 'Quartus', 'ModelSim', 'DE10-Lite', 'FSM'],
  },
  {
    id: 'smart-garden',
    group: 'hardware',
    cover: 'assets/covers/smart-garden.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0c2620 60%,#14b8a6)',
    title: { en: 'Smart Garden', fr: 'Plante connectée' },
    period: { en: '2025 to 2026', fr: '2025 à 2026' },
    role: { en: 'Team of 4', fr: 'Équipe de 4' },
    blurb: {
      en: 'An LPC1768 (ARM Cortex-M3) plant monitor: four sensors, thresholds, alarm, LCD and a password-protected Bluetooth interface.',
      fr: 'Un moniteur de plante sur LPC1768 (ARM Cortex-M3) : quatre capteurs, des seuils, une alarme, un écran LCD et une interface Bluetooth protégée par mot de passe.',
    },
    description: {
      en: 'ENSSAT first year project in C, in a team of 4. An LPC1768 board (ARM Cortex-M3) measures air temperature and humidity, soil humidity and light, and compares each value to adjustable thresholds. A buzzer alarm sounds when one goes out of range, an LCD shows the status, timer interrupts drive the measurements and the settings are saved in Flash. A password-protected Bluetooth (UART) interface lets you read the data and change the thresholds.',
      fr: "Projet de première année à l'ENSSAT en C, en équipe de 4. Une carte LPC1768 (ARM Cortex-M3) mesure la température et l'humidité de l'air, l'humidité du sol et la luminosité, et compare chaque valeur à des seuils réglables. Un buzzer donne l'alarme quand une mesure sort de l'intervalle, un écran LCD affiche l'état, des interruptions timer cadencent les mesures et les réglages sont sauvegardés en Flash. Une interface Bluetooth (UART) protégée par mot de passe permet de consulter les données et de modifier les seuils.",
    },
    categories: ['hardware', 'embedded'],
    tags: ['C', 'LPC1768', 'ARM Cortex-M3', 'ADC', 'Interrupts', 'UART', 'Bluetooth'],
    video: 'assets/videos/smart-garden.mp4',
  },
  {
    id: 'gate-controller',
    group: 'hardware',
    cover: 'assets/covers/gate-controller.webp',
    grad: 'linear-gradient(135deg,#181a1e,#141a24 60%,#0ea5e9)',
    title: { en: 'Gate Controller', fr: 'Commande de portail' },
    period: { en: '2025 to 2026', fr: '2025 à 2026' },
    blurb: {
      en: 'Firmware for a two-leaf motorised gate on an LPC1768: a 13-state machine with obstacle safety and automatic closing.',
      fr: "Le firmware d'un portail motorisé à deux battants sur LPC1768 : une machine à 13 états avec sécurité obstacle et fermeture automatique.",
    },
    description: {
      en: 'ENSSAT embedded software project ("Projet portail") in C on an LPC1768 (ARM Cortex-M3). The controller drives the two motors of a two-leaf gate through a 13-state machine: opening, closing, each leaf stopping on its own limit switch, including when one leaf arrives before the other. An obstacle sensor stops both motors at once and switches the warning light to fast blinking, and the movement resumes once the path is clear. When open, the gate closes on a button press or by itself after 20 seconds. A timer interrupt drives the warning light and the timeouts.',
      fr: "Projet de développement logiciel embarqué à l'ENSSAT (« Projet portail ») en C sur LPC1768 (ARM Cortex-M3). Le contrôleur pilote les deux moteurs d'un portail à deux battants avec une machine à 13 états : ouverture, fermeture, arrêt de chaque battant sur sa propre fin de course, y compris quand un battant arrive avant l'autre. Un capteur d'obstacle arrête les deux moteurs à la fois et passe le feu clignotant en clignotement rapide, puis le mouvement reprend une fois la voie libre. Une fois ouvert, le portail se referme sur appui d'un bouton ou tout seul au bout de 20 secondes. Une interruption timer gère le clignotant et les temporisations.",
    },
    categories: ['embedded'],
    tags: ['C', 'LPC1768', 'ARM Cortex-M3', 'FSM', 'GPIO', 'Timers'],
  },
  {
    id: 'adder',
    group: 'hardware',
    cover: 'assets/covers/adder.webp',
    grad: 'linear-gradient(135deg,#181a1e,#101f2c 55%,#22d3ee)',
    title: { en: 'VHDL Binary Adder', fr: 'Additionneur binaire VHDL' },
    blurb: {
      en: 'Combinational adder described in VHDL with carry propagation and a testbench.',
      fr: 'Additionneur combinatoire en VHDL, propagation de retenue et testbench.',
    },
    description: {
      en: 'A binary adder described in VHDL: combinational logic, ripple carry propagation and a self checking testbench for validation. Simulated and synthesised as part of the digital logic coursework.',
      fr: "Un additionneur binaire décrit en VHDL : logique combinatoire, propagation de la retenue et banc de test à vérification automatique. Simulé et synthétisé dans le cadre du cours de logique numérique.",
    },
    categories: ['hardware', 'embedded'],
    tags: ['VHDL', 'Digital Logic', 'Testbench'],
  },

  // Software
  {
    id: 'tipe-sailboat',
    group: 'software',
    cover: 'assets/covers/tipe-sailboat.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0e1d2c 60%,#38bdf8)',
    title: { en: 'TIPE: Sailboat Dynamics', fr: 'TIPE : dynamique des voiliers' },
    blurb: {
      en: 'Physical modelling of sailboat performance with Dijkstra on a weighted graph.',
      fr: 'Modélisation physique des performances et Dijkstra sur graphe pondéré.',
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
    group: 'software',
    cover: 'assets/covers/ml-clustering.webp',
    grad: 'linear-gradient(135deg,#181a1e,#131c26 55%,#67e8f9)',
    title: { en: 'Machine Learning: KNN & K-Means', fr: 'Machine Learning : KNN & K-Means' },
    blurb: {
      en: 'KNN and K-Means implemented from scratch with NumPy/SciPy and Matplotlib.',
      fr: 'KNN et K-Means implémentés from scratch (NumPy/SciPy, Matplotlib).',
    },
    description: {
      en: 'Implementations of KNN and K-Means written from scratch with matrix computation (NumPy/SciPy) and Matplotlib visualisations to analyse the resulting clusters.',
      fr: "Implémentations from scratch de KNN et K-Means avec calcul matriciel (NumPy/SciPy) et visualisations Matplotlib pour analyser les regroupements.",
    },
    categories: ['ml', 'software'],
    tags: ['Python', 'NumPy', 'SciPy', 'Matplotlib'],
  },
  {
    id: 'weather-api',
    group: 'software',
    cover: 'assets/covers/weather-api.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0e1c26 60%,#2dd4bf)',
    title: { en: 'Weather App: REST API', fr: 'Application météo : API REST' },
    blurb: {
      en: 'Open Meteo integration with JSON parsing and network error handling.',
      fr: 'Intégration Open Meteo, parsing JSON et gestion des erreurs réseau.',
    },
    description: {
      en: 'Integration of the Open Meteo API with JSON parsing, robust network error handling and dynamic visualisation of weather data.',
      fr: "Intégration de l'API Open Meteo, parsing JSON, gestion robuste des erreurs réseau et visualisation dynamique des données météo.",
    },
    categories: ['software'],
    tags: ['Python', 'REST API', 'JSON'],
  },
  {
    id: 'dll-injection',
    group: 'software',
    cover: 'assets/covers/dll-injection.webp',
    grad: 'linear-gradient(135deg,#181a1e,#141a24 60%,#0ea5e9)',
    title: { en: 'C++ DLL Injection', fr: 'Injection DLL en C++' },
    blurb: {
      en: 'Windows DLL injector using the Win32 API for process & memory management.',
      fr: 'Injecteur de DLL Windows via Win32 (processus & mémoire).',
    },
    description: {
      en: 'A Windows DLL injector using the Win32 API for process handling, memory management and pointer work, an exercise in low level systems programming.',
      fr: "Un injecteur de DLL Windows exploitant l'API Win32 pour la gestion des processus, de la mémoire et des pointeurs, un exercice de programmation système bas niveau.",
    },
    categories: ['software'],
    tags: ['C++', 'Windows API', 'Memory'],
  },
  {
    id: 'ascii-art',
    group: 'software',
    cover: 'assets/covers/ascii-art.webp',
    grad: 'linear-gradient(135deg,#181a1e,#101a20 55%,#0891b2)',
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

  // Other projects
  {
    id: 'parking-sim',
    group: 'other',
    cover: 'assets/covers/parking-sim.webp',
    grad: 'linear-gradient(135deg,#181a1e,#141a24 60%,#0ea5e9)',
    title: { en: 'Multi-process Parking Simulator', fr: 'Simulateur de parking multi-processus' },
    blurb: {
      en: 'A car park simulator in C using Linux IPC: FIFOs, shared memory and semaphores.',
      fr: 'Un simulateur de parking en C avec les IPC Linux : FIFO, mémoire partagée et sémaphores.',
    },
    description: {
      en: 'A multi-process car park simulator written in C on Linux. The processes communicate through FIFOs and shared memory, and semaphores synchronise their access to the shared state.',
      fr: "Un simulateur de parking multi-processus écrit en C sous Linux. Les processus communiquent par FIFO et mémoire partagée, et des sémaphores synchronisent leur accès à l'état partagé.",
    },
    categories: ['software'],
    tags: ['C', 'Linux', 'IPC', 'FIFOs', 'Shared memory', 'Semaphores'],
    repo: 'https://github.com/MasterKPG/prog_sys_project',
  },
  {
    id: 'agrimarket',
    group: 'other',
    cover: 'assets/covers/agrimarket.webp',
    grad: 'linear-gradient(135deg,#181a1e,#0c2620 60%,#14b8a6)',
    title: { en: 'AgriMarket', fr: 'AgriMarket' },
    blurb: {
      en: 'An agricultural marketplace for Morocco, on the web and on mobile.',
      fr: 'Une place de marché agricole pour le Maroc, sur le web et sur mobile.',
    },
    description: {
      en: 'An agricultural marketplace for Morocco: a Next.js web app and a React Native/Expo mobile app on a Supabase backend.',
      fr: 'Une place de marché agricole pour le Maroc : une application web Next.js et une application mobile React Native/Expo, avec Supabase en backend.',
    },
    categories: ['software'],
    tags: ['Next.js', 'React Native', 'Expo', 'Supabase'],
  },
  {
    id: 'half-half',
    group: 'other',
    cover: 'assets/covers/half-half.webp',
    grad: 'linear-gradient(135deg,#181a1e,#131c26 55%,#67e8f9)',
    title: { en: 'Half / Half', fr: 'Half / Half' },
    blurb: {
      en: 'A precision shape-cutting duel game on Roblox.',
      fr: 'Un jeu de duel de découpe de formes de précision sur Roblox.',
    },
    description: {
      en: 'A precision shape-cutting duel game on Roblox, with an asynchronous architecture and a full game design document.',
      fr: 'Un jeu de duel de découpe de formes de précision sur Roblox, avec une architecture asynchrone et un document de game design complet.',
    },
    categories: ['software'],
    tags: ['Roblox', 'Game design', 'Async'],
  },
  {
    id: 'led-chaser',
    group: 'other',
    cover: 'assets/covers/led-chaser.webp',
    grad: 'linear-gradient(135deg,#181a1e,#101f2c 55%,#22d3ee)',
    title: { en: 'VHDL LED Chaser', fr: 'Chenillard de LED en VHDL' },
    blurb: {
      en: 'An LED chaser in VHDL with a clock-enable generator that brings 50 MHz down to 1 Hz.',
      fr: "Un chenillard de LED en VHDL avec un générateur d'enable d'horloge qui ramène 50 MHz à 1 Hz.",
    },
    description: {
      en: 'An LED chaser described in VHDL. A clock-enable generator derives a 1 Hz tick from the 50 MHz board clock, so the whole design stays on a single clock.',
      fr: "Un chenillard de LED décrit en VHDL. Un générateur d'enable d'horloge dérive un top à 1 Hz de l'horloge à 50 MHz de la carte, pour que tout le design reste sur une seule horloge.",
    },
    categories: ['hardware'],
    tags: ['VHDL', 'FPGA', 'Clock enable'],
  },
]

/** A skill item is either a name that reads the same in both languages, or a translated one. */
export type SkillItem = string | Bi

export interface SkillGroup {
  title: Bi
  items: SkillItem[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: { en: 'Programming', fr: 'Programmation' },
    items: [
      'C',
      'VHDL',
      'Python',
      'Java',
      'JavaScript',
      'TypeScript',
      'Rust',
      { en: 'HTML and CSS', fr: 'HTML et CSS' },
      'NumPy',
      'SciPy',
      'Pandas',
      'Matplotlib',
      'Flask',
      'Pillow',
    ],
  },
  {
    title: { en: 'Hardware', fr: 'Matériel' },
    items: [
      'FPGA (DE10-Lite)',
      'Quartus',
      'ModelSim',
      'ARM Cortex-M3',
      'Arduino',
      'EAGLE (PCB)',
      'ADC',
      { en: 'Interrupts', fr: 'Interruptions' },
      { en: 'UART and Bluetooth', fr: 'UART et Bluetooth' },
    ],
  },
  {
    title: { en: 'Systems', fr: 'Systèmes' },
    items: [
      'Linux (Ubuntu, Debian)',
      'Raspberry Pi',
      'NGINX',
      'Gunicorn',
      { en: 'POSIX API (processes, threads, IPC)', fr: 'API POSIX (processus, threads, IPC)' },
      'PostgreSQL',
      { en: 'Git and GitHub', fr: 'Git et GitHub' },
    ],
  },
  {
    title: { en: 'Web and mobile', fr: 'Web et mobile' },
    items: ['Next.js', 'React', 'React Native / Expo', 'Supabase'],
  },
]

/** Words cycled through in the hero tag: the technologies I work with. */
export const MORPH_WORDS: Bi[] = [
  { en: 'FPGA', fr: 'FPGA' },
  { en: 'VHDL', fr: 'VHDL' },
  { en: 'Embedded C', fr: 'C embarqué' },
  { en: 'ARM Cortex-M', fr: 'ARM Cortex-M' },
  { en: 'Linux', fr: 'Linux' },
  { en: 'Raspberry Pi', fr: 'Raspberry Pi' },
  { en: 'Full-stack', fr: 'Full-stack' },
  { en: 'PCB Design', fr: 'Conception PCB' },
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
    date: { en: 'Sept. 2024 to present', fr: "Sept. 2024 à aujourd'hui" },
    title: {
      en: 'Engineering degree, computer science and embedded systems',
      fr: "Diplôme d'ingénieur, informatique et systèmes embarqués",
    },
    place: {
      en: 'ENSSAT, Université de Rennes · Lannion, France',
      fr: 'ENSSAT, Université de Rennes · Lannion, France',
    },
    desc: {
      en: 'Options: hardware design, signal processing, embedded systems, Internet of Things, artificial intelligence, cybersecurity.',
      fr: 'Options : conception matérielle, traitement du signal, systèmes embarqués, Internet des objets, intelligence artificielle, cybersécurité.',
    },
    tags: ['VHDL', 'FPGA', 'Embedded', 'IoT', 'Signal processing'],
  },
  {
    date: { en: 'Sept. 2022 to Jul. 2024', fr: 'Sept. 2022 à juil. 2024' },
    title: {
      en: 'CPGE MPSI / MP, mathematics and physics',
      fr: 'CPGE MPSI / MP, mathématiques et physique',
    },
    place: { en: 'Lycée Technique Mohammedia · Morocco', fr: 'Lycée Technique Mohammedia · Maroc' },
    desc: {
      en: 'Preparatory classes for the engineering schools: intensive applied mathematics, physics and engineering science.',
      fr: "Classes préparatoires aux grandes écoles : mathématiques appliquées, physique et sciences de l'ingénieur en formation intensive.",
    },
    tags: ['Mathematics', 'Physics', 'Engineering Science'],
  },
  {
    date: { en: 'Sept. 2021 to Jul. 2022', fr: 'Sept. 2021 à juil. 2022' },
    title: {
      en: 'Scientific Baccalaureate, Highest Honours',
      fr: 'Baccalauréat Scientifique, Mention Très Bien',
    },
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
    date: { en: 'Mar. 2025 to present', fr: "Mars 2025 à aujourd'hui" },
    title: {
      en: 'Lead developer and technical coordinator (volunteer)',
      fr: 'Développeur principal et coordinateur technique (bénévole)',
    },
    place: {
      en: 'Solibox · Togo Vert et Vivant Trégor, Brittany, France',
      fr: 'Solibox · Togo Vert et Vivant Trégor, Bretagne',
    },
    desc: {
      en: 'Designed and built Solibox, an offline education server on Raspberry Pi, and coordinate its technical side with the non-profit. Won the 2026 PIEED award.',
      fr: "Conception et réalisation de Solibox, un serveur éducatif hors ligne sur Raspberry Pi, et coordination de la partie technique avec l'association. Lauréat du prix PIEED 2026.",
    },
    tags: ['Raspberry Pi', 'Flask', 'NGINX', 'PostgreSQL'],
  },
  {
    date: { en: 'From Nov. 2026', fr: 'À partir de nov. 2026' },
    title: { en: 'Event host', fr: "Hôte d'accueil événementiel" },
    place: {
      en: 'Carré Magique (performing arts venue) · Lannion, France',
      fr: 'Carré Magique (scène de spectacle vivant) · Lannion',
    },
    desc: {
      en: 'Welcoming audiences, checking tickets and monitoring the venue during performances.',
      fr: 'Accueil du public, contrôle des billets et surveillance de la salle pendant les spectacles.',
    },
    tags: ['Events', 'Customer Relations'],
  },
  {
    date: { en: 'Oct. 2025 to present', fr: "Oct. 2025 à aujourd'hui" },
    title: { en: 'Event host', fr: "Hôte d'accueil événementiel" },
    place: { en: 'City One · Lannion, France', fr: 'City One · Lannion' },
    desc: {
      en: 'Scanning tickets, managing queues and crowd flow, seating attendees and running the cloakroom at events.',
      fr: 'Contrôle des billets, gestion des files et des flux, placement du public et vestiaire lors des événements.',
    },
    tags: ['Events', 'Customer Relations'],
  },
  {
    date: { en: 'Sept. 2025 to Jun. 2026', fr: 'Sept. 2025 à juin 2026' },
    title: { en: 'Student library assistant', fr: 'Moniteur étudiant de bibliothèque' },
    place: { en: 'ENSSAT · Lannion, France', fr: 'ENSSAT · Lannion' },
    desc: {
      en: 'Helping library users, handling loans, returns and shelving, alongside a full-time engineering course load.',
      fr: "Accueil des usagers, prêts, retours et rangement, en parallèle d'une formation d'ingénieur à temps plein.",
    },
    tags: ['Organisation', 'Student Support'],
  },
  {
    date: { en: 'One month', fr: 'Un mois' },
    title: { en: 'Web development intern (remote)', fr: 'Stagiaire en développement web (à distance)' },
    place: { en: 'Remote internship', fr: 'Stage à distance' },
    desc: {
      en: 'Maintained and updated a website with Framer, React, HTML, CSS and JavaScript.',
      fr: "Maintenance et mise à jour d'un site web avec Framer, React, HTML, CSS et JavaScript.",
    },
    tags: ['Framer', 'React', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    date: { en: '2019 to 2021', fr: '2019 à 2021' },
    title: { en: 'Active Member, Sailing', fr: 'Membre actif, Voile' },
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
    cv: { en: 'CV', fr: 'CV' },
  },
  hero: {
    tagline: {
      en: 'Engineering student in computer science and embedded systems at ENSSAT',
      fr: "Étudiant ingénieur en informatique et systèmes embarqués à l'ENSSAT",
    },
    viewWork: { en: 'View Projects', fr: 'Voir les projets' },
    getInTouch: { en: 'Get in Touch', fr: 'Me contacter' },
  },
  about: {
    label: { en: 'About', fr: 'À propos' },
    p1: {
      en: "I'm an engineering student in computer science and embedded systems at ENSSAT (Université de Rennes) in Lannion, France. My hands-on work covers FPGA design in VHDL, C on ARM Cortex-M microcontrollers, Linux servers, and full-stack web and mobile development.",
      fr: "Étudiant ingénieur en informatique et systèmes embarqués à l'ENSSAT (Université de Rennes), à Lannion. Je travaille concrètement sur la conception FPGA en VHDL, le C sur microcontrôleurs ARM Cortex-M, les serveurs Linux et le développement web et mobile full-stack.",
    },
    p2: {
      en: 'Two years of CPGE in mathematics and physics gave me a solid base in applied mathematics and algorithms. I like building things end to end, from a board designed in EAGLE to a Flask server on a Raspberry Pi.',
      fr: "Deux années de CPGE en mathématiques et physique m'ont donné une base solide en mathématiques appliquées et en algorithmique. J'aime réaliser des projets de bout en bout, d'une carte conçue sous EAGLE à un serveur Flask sur Raspberry Pi.",
    },
  },
  skills: {
    label: { en: 'Stack', fr: 'Stack' },
  },
  experience: {
    label: { en: 'Journey', fr: 'Parcours' },
    education: { en: 'Education', fr: 'Formation' },
    career: { en: 'Experience', fr: 'Expérience' },
  },
  projects: {
    label: { en: 'Work', fr: 'Réalisations' },
    featured: { en: 'Featured', fr: 'À la une' },
    hardware: { en: 'Hardware and embedded', fr: 'Matériel et embarqué' },
    more: { en: 'More projects', fr: 'Autres projets' },
    moreHint: {
      en: 'Open a folder, then pick a project.',
      fr: 'Ouvrez un dossier, puis choisissez un projet.',
    },
    software: { en: 'Software', fr: 'Logiciel' },
    other: { en: 'Other projects', fr: 'Projets divers' },
    inProgress: { en: 'In progress', fr: 'En cours' },
    recognition: { en: 'Recognition', fr: 'Distinction' },
    code: { en: 'Source code', fr: 'Code source' },
    site: { en: 'Visit site', fr: 'Voir le site' },
    details: { en: 'Details', fr: 'Détails' },
    preview: { en: 'Preview', fr: 'Aperçu' },
    watch: { en: 'Watch demo', fr: 'Voir la démo' },
    soon: { en: 'Media coming soon', fr: 'Média à venir' },
    close: { en: 'Close', fr: 'Fermer' },
  },
  activity: {
    label: { en: 'Activity', fr: 'Activité' },
    sub: {
      en: 'Public contributions over the last year. Most project repositories are private.',
      fr: "Contributions publiques sur la dernière année. La plupart des dépôts de projets sont privés.",
    },
  },
  contact: {
    label: { en: 'Say Hello', fr: 'Dire bonjour' },
    sub: {
      en: 'For an internship, a collaboration or just to chat, I would love to hear from you.',
      fr: "Pour un stage, une collaboration ou simplement échanger, je serai ravi de vous répondre.",
    },
    email: { en: 'Send an email', fr: 'Envoyer un email' },
  },
  footer: {
    role: { en: 'Computer science and embedded systems', fr: 'Informatique et systèmes embarqués' },
    navigate: { en: 'Navigate', fr: 'Navigation' },
    elsewhere: { en: 'Elsewhere', fr: 'Ailleurs' },
    documents: { en: 'Documents', fr: 'Documents' },
    toTop: { en: 'Back to top', fr: 'Haut de page' },
  },
} as const

export const CONTACT = {
  email: 'mamara@enssat.fr',
  phone: '+33751332940',
  phoneDisplay: '+33 7 51 33 29 40',
  linkedin: 'https://www.linkedin.com/in/mohammad-amara/',
  github: 'https://github.com/MasterKPG',
  githubUser: 'MasterKPG',
  location: { en: 'Lannion, France', fr: 'Lannion, France' } as Bi,
  languages: {
    en: 'French, English, Arabic',
    fr: 'Français, anglais, arabe',
  } as Bi,
}
