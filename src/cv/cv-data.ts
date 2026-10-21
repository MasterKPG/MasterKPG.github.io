import type { Bi } from '@/lib/i18n'

/*
 * The CV shown on /cv/. It mirrors latex/cv_en.tex and latex/cv_fr.tex, which are the
 * sources of the downloadable PDFs: when one changes, change the other two with it.
 */

/** A piece of text, optionally a link. */
export type Seg = Bi | { text: Bi; href: string }
/** Plain text, or text made of segments where some are links. */
export type Rich = Bi | Seg[]

export interface CvEntry {
  title: Rich
  org: Rich
  date: Bi
  bullets?: Rich[]
}

export interface CvLink {
  label: string
  href?: string
}

const same = (s: string): Bi => ({ en: s, fr: s })
const link = (text: Bi, href: string): Seg => ({ text, href })
/** Opens the project's preview on the portfolio. */
const project = (id: string, text: Bi): Seg => link(text, `../#project-${id}`)

const PIEED = 'https://pieed.wordpress.com/category/editions-du-pieed/pieed-2026/'
const OUEST_FRANCE =
  'https://www.ouest-france.fr/associations/quel-est-limpact-de-votre-telephone-cette-association-bretonne-le-montre-grace-a-solibox-sa-mallette-pedagogique-d03753e6-b826-11f1-ad16-43b274a58389'

export const CV = {
  name: 'Mohammad Amara',
  headline: {
    en: 'Computer Science and Embedded Systems Engineering Student',
    fr: 'Élève ingénieur en informatique et systèmes embarqués',
  },
  /** Two lines, as in the LaTeX header. */
  contact: [
    [
      { label: 'Lannion, France' },
      { label: '+33 7 51 33 29 40', href: 'tel:+33751332940' },
      { label: 'mamara@enssat.fr', href: 'mailto:mamara@enssat.fr' },
    ],
    [
      { label: 'github.com/MasterKPG', href: 'https://github.com/MasterKPG' },
      { label: 'linkedin.com/in/mohammad-amara', href: 'https://www.linkedin.com/in/mohammad-amara/' },
      { label: 'masterkpg.github.io', href: 'https://masterkpg.github.io' },
    ],
  ] as CvLink[][],
  pdf: {
    en: 'assets/cv/Mohammad_Amara_CV_EN.pdf',
    fr: 'assets/cv/Mohammad_Amara_CV_FR.pdf',
  },

  sections: {
    summary: { en: 'Summary', fr: 'Profil' },
    education: { en: 'Education', fr: 'Formation' },
    experience: { en: 'Experience', fr: 'Expérience' },
    projects: { en: 'Projects', fr: 'Projets' },
    skills: { en: 'Technical Skills', fr: 'Compétences techniques' },
    languages: { en: 'Languages and Interests', fr: "Langues et centres d'intérêt" },
  },

  summary: {
    en: 'Engineering student at ENSSAT (Université de Rennes) in computer science and embedded systems. Hands-on experience in FPGA design with VHDL, C programming on ARM Cortex-M microcontrollers, Linux servers, and full-stack web and mobile development. Lead developer of Solibox, an offline education server on Raspberry Pi that won the 2026 PIEED award and was featured in Ouest-France.',
    fr: "Élève ingénieur à l'ENSSAT (Université de Rennes) en informatique et systèmes embarqués. Expérience pratique en conception FPGA avec VHDL, en programmation C sur microcontrôleurs ARM Cortex-M, en serveurs Linux et en développement web et mobile full-stack. Développeur principal de Solibox, un serveur éducatif hors ligne sur Raspberry Pi, lauréat du prix PIEED 2026 et présenté dans Ouest-France.",
  } as Bi,

  education: [
    {
      title: {
        en: "Engineering degree (Master's level), computer science and embedded systems",
        fr: "Diplôme d'ingénieur (grade de master), informatique et systèmes embarqués",
      },
      org: {
        en: 'ENSSAT, Université de Rennes, Lannion, France',
        fr: 'ENSSAT, Université de Rennes, Lannion',
      },
      date: { en: '2024 to present', fr: "2024 à aujourd'hui" },
      bullets: [
        {
          en: "French diplôme d'ingénieur, equivalent to a Master's. Options: hardware design, signal processing, embedded systems, Internet of Things, artificial intelligence, cybersecurity.",
          fr: 'Options : conception matérielle, traitement du signal, systèmes embarqués, Internet des objets, intelligence artificielle, cybersécurité.',
        },
      ],
    },
    {
      title: {
        en: 'CPGE MPSI / MP, mathematics and physics',
        fr: 'CPGE MPSI / MP, mathématiques et physique',
      },
      org: { en: 'Lycée Technique, Mohammedia, Morocco', fr: 'Lycée Technique, Mohammedia, Maroc' },
      date: { en: '2022 to 2024', fr: '2022 à 2024' },
      bullets: [
        {
          en: 'Two-year intensive program preparing for the engineering school entrance exams.',
          fr: "Deux années de formation intensive préparant aux concours des écoles d'ingénieurs.",
        },
      ],
    },
  ] as CvEntry[],

  experience: [
    {
      title: [
        {
          en: 'Lead developer and technical coordinator (volunteer), ',
          fr: 'Développeur principal et coordinateur technique (bénévole), ',
        },
        project('solibox', same('Solibox')),
      ],
      org: {
        en: 'Togo Vert et Vivant Trégor (non-profit), Brittany, France',
        fr: 'Togo Vert et Vivant Trégor (association), Bretagne',
      },
      date: { en: 'Mar 2025 to present', fr: "Mars 2025 à aujourd'hui" },
      bullets: [
        {
          en: 'Designed and built an offline education server on Raspberry Pi: its own WiFi network with a captive portal giving access to PDFs, quizzes, an offline copy of Wikipedia and videos without internet.',
          fr: "Conception et réalisation d'un serveur éducatif hors ligne sur Raspberry Pi : son propre réseau WiFi avec un portail captif donnant accès à des PDF, des quiz, une copie hors ligne de Wikipédia et des vidéos, sans internet.",
        },
        {
          en: 'Flask web application behind NGINX (Gunicorn, systemd) with PostgreSQL for newsletter subscribers, quizzes with user accounts and an admin dashboard.',
          fr: "Application web Flask derrière NGINX (Gunicorn, systemd) avec PostgreSQL pour les abonnés à la newsletter, des quiz avec comptes utilisateurs et un tableau de bord d'administration.",
        },
        [
          { en: 'Won the ', fr: 'Lauréat du ' },
          link({ en: '2026 PIEED student initiatives award', fr: 'prix PIEED 2026' }, PIEED),
          { en: ' (Étudiants et Développement). Featured in ', fr: ' (Étudiants et Développement), présenté dans ' },
          link(same('Ouest-France'), OUEST_FRANCE),
          same('.'),
        ],
      ],
    },
    {
      title: { en: 'Event host', fr: "Hôte d'accueil événementiel" },
      org: {
        en: 'City One and Carré Magique (performing arts venue), Lannion, France',
        fr: 'City One et Carré Magique (scène de spectacle vivant), Lannion',
      },
      date: { en: 'Oct 2025 to present', fr: "Oct. 2025 à aujourd'hui" },
      bullets: [
        {
          en: 'City One (since Oct 2025): ticket scanning, crowd flow, seating and cloakroom in a 2,000-seat venue.',
          fr: 'City One (depuis oct. 2025) : billetterie, flux, placement et vestiaire, salle de 2 000 places.',
        },
        {
          en: 'Carré Magique (from Nov 2026): welcoming audiences, checking tickets, monitoring the venue.',
          fr: 'Carré Magique (à partir de nov. 2026) : accueil du public, contrôle des billets, surveillance.',
        },
      ],
    },
    {
      title: { en: 'Web development intern (remote)', fr: 'Stagiaire en développement web (à distance)' },
      org: { en: 'One-month internship', fr: "Stage d'un mois" },
      date: { en: 'Aug 2026', fr: 'Août 2026' },
      bullets: [
        {
          en: 'Maintained and updated a website with Framer, React, HTML, CSS and JavaScript.',
          fr: "Maintenance et mise à jour d'un site web avec Framer, React, HTML, CSS et JavaScript.",
        },
      ],
    },
    {
      title: { en: 'Student library assistant', fr: 'Moniteur étudiant de bibliothèque' },
      org: { en: 'ENSSAT library, Lannion, France', fr: "Bibliothèque de l'ENSSAT, Lannion" },
      date: { en: 'Sep 2025 to Jun 2026', fr: 'Sept. 2025 à juin 2026' },
      bullets: [
        {
          en: 'Loans, returns, shelving and helping users, with fixed hours alongside a full-time engineering course load.',
          fr: "Prêts, retours, rangement et accueil des usagers, en parallèle d'une formation à temps plein.",
        },
      ],
    },
  ] as CvEntry[],

  projects: [
    {
      title: [
        project('neurolith', same('Neurolith')),
        { en: ', crypto token analytics platform', fr: ", plateforme d'analyse de tokens crypto" },
      ],
      org: [{ en: 'Personal project, ', fr: 'Projet personnel, ' }, link(same('neurolith.app'), 'https://neurolith.app')],
      date: { en: 'In progress', fr: 'En cours' },
      bullets: [
        {
          en: 'Web app and Discord/Telegram bot: market data through APIs, large language model analysis and a probabilistic decision model that outputs buy, sell or hold signals.',
          fr: "Application web et bot Discord/Telegram : données de marché par API, analyse par grand modèle de langage et modèle de décision probabiliste qui produit des signaux d'achat, de vente ou de conservation.",
        },
        {
          en: 'Social signal module (X, Telegram) in design, local model hosting considered for latency.',
          fr: 'Module de signaux sociaux (X, Telegram) en conception, hébergement local du modèle envisagé.',
        },
      ],
    },
    {
      title: [
        project('lucent', same('Lucent')),
        { en: ', a modern desktop environment for Linux', fr: ', un environnement de bureau moderne pour Linux' },
      ],
      org: [
        { en: 'Personal project, ', fr: 'Projet personnel, ' },
        link(same('github.com/MasterKPG/lucent'), 'https://github.com/MasterKPG/lucent'),
      ],
      date: { en: 'Oct 2026 to present', fr: "Oct. 2026 à aujourd'hui" },
      bullets: [
        {
          en: 'Aims to give Linux a new, coherent interface with a glassmorphism design: menu bar, Dock, Control Center, Spotlight, notifications and System Settings for Debian 13.',
          fr: 'Vise à donner à Linux une interface nouvelle et cohérente au design glassmorphism : barre de menus, Dock, centre de contrôle, Spotlight, notifications et Réglages pour Debian 13.',
        },
        {
          en: 'Glass made by the ShojiWM Wayland compositor (built from source in Rust, configured in TypeScript) with a Quickshell (QML) shell; C helpers, GLSL effects, full git history.',
          fr: 'Verre produit par le compositeur Wayland ShojiWM (compilé depuis les sources en Rust, configuré en TypeScript) avec un shell Quickshell (QML) ; utilitaires C, effets GLSL.',
        },
      ],
    },
    {
      title: [
        project('fir-filter', { en: 'Sequential FIR filter', fr: 'Filtre RIF séquentiel' }),
        { en: ' (systolic project), VHDL and Quartus', fr: ' (projet systolique), VHDL et Quartus' },
      ],
      org: { en: 'ENSSAT, second year', fr: 'ENSSAT, deuxième année' },
      date: { en: 'Oct 2026, in progress', fr: 'Oct. 2026, en cours' },
      bullets: [
        {
          en: '13-tap FIR filter around one multiply-accumulate unit reused 13 times: address generator, circular buffer, coefficient ROM, Moore FSM, testbench with a reference model. Area versus throughput.',
          fr: "Filtre RIF à 13 coefficients autour d'un seul MAC réutilisé 13 fois : générateur d'adresses, buffer circulaire, ROM, machine de Moore, banc de test. Compromis surface et débit.",
        },
      ],
    },
    {
      title: [
        project('saturating-accumulator', { en: 'Saturating accumulator on FPGA', fr: 'Accumulateur saturant sur FPGA' }),
        same(', VHDL'),
      ],
      org: { en: 'ENSSAT, Digital Systems track', fr: 'ENSSAT, majeure Systèmes numériques' },
      date: { en: 'May 2026', fr: 'Mai 2026' },
      bullets: [
        {
          en: '3-bit inputs, 4-bit sum saturating at 15 with an overflow flag, driven by a 5-state machine.',
          fr: 'Entrées 3 bits, somme 4 bits saturée à 15 avec drapeau de dépassement, machine à 5 états.',
        },
        {
          en: 'Verified with 10 test cases in ModelSim, then on a DE10-Lite board; fixed two integration defects invisible in simulation (I/O standard on one pin, reset polarity).',
          fr: "Validé par 10 cas de test sous ModelSim, puis sur carte DE10-Lite ; correction de deux défauts d'intégration invisibles en simulation (standard d'E/S d'une broche, polarité du reset).",
        },
      ],
    },
    {
      title: [
        project('arduino-clone', { en: 'Arduino Uno clone', fr: 'Clone Arduino Uno' }),
        { en: ' and ', fr: ' et ' },
        project('ping-pong', { en: 'Pong game', fr: 'jeu Pong' }),
      ],
      org: { en: 'ENSSAT, class project', fr: 'ENSSAT, projet de cours' },
      date: { en: 'Apr 2026', fr: 'Avr. 2026' },
      bullets: [
        {
          en: 'Designed an Arduino Uno compatible board (ATmega328P) in EAGLE on my own: schematic, routing, soldering and bootloader.',
          fr: "Conception en individuel d'une carte compatible Arduino Uno (ATmega328P) sous EAGLE : schéma, routage, soudure et bootloader.",
        },
        {
          en: 'Two-player Pong with a classmate on an 8×8 LED matrix with audio output, on that board.',
          fr: 'Pong à deux joueurs en binôme sur une matrice de LED 8×8 avec sortie audio, sur cette même carte.',
        },
      ],
    },
    {
      title: [
        project('gate-controller', { en: 'Gate controller', fr: 'Commande de portail' }),
        { en: ', embedded software in C', fr: ', logiciel embarqué en C' },
      ],
      org: same('ENSSAT'),
      date: { en: 'Jan 2026', fr: 'Janv. 2026' },
      bullets: [
        {
          en: 'Two-leaf motorised gate on an LPC1768: 13-state machine with a limit switch per leaf, obstacle safety that stops both motors, and automatic closing after 20 seconds.',
          fr: 'Portail motorisé à deux battants sur LPC1768 : machine à 13 états avec une fin de course par battant, sécurité obstacle qui arrête les deux moteurs, et fermeture automatique au bout de 20 secondes.',
        },
      ],
    },
    {
      title: [
        project('smart-garden', { en: 'Smart Garden', fr: 'Plante connectée' }),
        { en: ', microcontroller project in C (team of 4)', fr: ', projet microcontrôleur en C (équipe de 4)' },
      ],
      org: { en: 'ENSSAT, first year', fr: 'ENSSAT, première année' },
      date: { en: '2025 to 2026', fr: '2025 à 2026' },
      bullets: [
        {
          en: 'LPC1768 (ARM Cortex-M3) measuring air temperature and humidity, soil humidity and light, with adjustable thresholds, buzzer alarm, LCD status and timer interrupts.',
          fr: "LPC1768 (ARM Cortex-M3) mesurant température et humidité de l'air, humidité du sol et luminosité, avec seuils réglables, alarme sonore, état sur écran LCD et interruptions timer.",
        },
        {
          en: 'Password-protected Bluetooth (UART) interface; settings saved in Flash memory.',
          fr: 'Interface Bluetooth (UART) protégée par mot de passe ; réglages sauvegardés en mémoire Flash.',
        },
      ],
    },
    {
      title: { en: 'Other projects', fr: 'Autres projets' },
      org: [link(same('github.com/MasterKPG'), 'https://github.com/MasterKPG')],
      date: same(''),
      bullets: [
        [
          project('parking-sim', {
            en: 'Multi-process parking simulator',
            fr: 'Simulateur de parking multi-processus',
          }),
          {
            en: ' in C with the POSIX API (FIFOs, shared memory, semaphores).',
            fr: " en C avec l'API POSIX (FIFO, mémoire partagée, sémaphores).",
          },
        ],
        [
          project('agrimarket', same('AgriMarket')),
          {
            en: ': agricultural marketplace for Morocco (Next.js, React Native/Expo, Supabase).',
            fr: ' : place de marché agricole pour le Maroc (Next.js, React Native/Expo, Supabase).',
          },
        ],
        [
          project('half-half', same('Half / Half')),
          {
            en: ': Roblox precision duel game, asynchronous architecture, full design document.',
            fr: ' : duel de précision sur Roblox, architecture asynchrone, game design complet.',
          },
        ],
        {
          en: 'Project management coursework (Ada Lovelace challenge): risk analysis with a criticality matrix.',
          fr: 'Cours de gestion de projet (défi Ada Lovelace) : analyse des risques avec une matrice de criticité.',
        },
      ],
    },
  ] as CvEntry[],

  skills: [
    {
      label: { en: 'Programming', fr: 'Programmation' },
      value: {
        en: 'C, VHDL, Python (NumPy, SciPy, Pandas, Matplotlib, Flask, Pillow), Java, JavaScript, TypeScript, Rust, HTML and CSS',
        fr: 'C, VHDL, Python (NumPy, SciPy, Pandas, Matplotlib, Flask, Pillow), Java, JavaScript, TypeScript, Rust, HTML et CSS',
      },
    },
    {
      label: { en: 'Hardware', fr: 'Matériel' },
      value: {
        en: 'FPGA (DE10-Lite), Quartus, ModelSim, ARM Cortex-M3 (LPC1768), Arduino, EAGLE, ADC, interrupts, UART and Bluetooth',
        fr: 'FPGA (DE10-Lite), Quartus, ModelSim, ARM Cortex-M3 (LPC1768), Arduino, EAGLE, ADC, interruptions, UART et Bluetooth',
      },
    },
    {
      label: { en: 'Systems', fr: 'Systèmes' },
      value: {
        en: 'Linux (Ubuntu, Debian), POSIX API (processes, threads, IPC), Raspberry Pi, NGINX, Gunicorn, PostgreSQL, Git and GitHub',
        fr: 'Linux (Ubuntu, Debian), API POSIX (processus, threads, IPC), Raspberry Pi, NGINX, Gunicorn, PostgreSQL, Git et GitHub',
      },
    },
    {
      label: { en: 'Web and mobile', fr: 'Web et mobile' },
      value: same('Next.js, React, React Native/Expo, Supabase, Framer'),
    },
  ] as { label: Bi; value: Bi }[],

  languages: {
    label: { en: 'Languages', fr: 'Langues' },
    value: {
      en: 'French, English, Arabic (all bilingual)',
      fr: 'Français, anglais, arabe (bilingue dans les trois)',
    },
  },
  interests: {
    label: { en: 'Interests', fr: "Centres d'intérêt" },
    value: {
      en: 'Sailing (Laser Standard), basketball, football',
      fr: 'Voile (Laser Standard), basket-ball, football',
    },
  },
}
