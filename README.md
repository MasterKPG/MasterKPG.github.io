# Mohammad Amara — Portfolio

A futuristic, fully-remade personal portfolio built with **React + TypeScript +
Vite + Tailwind CSS + Framer Motion**, with a **three.js WebGL line-burst shader**
hero, bilingual (EN/FR) content, and dark/light theming.

Design system per **ui-ux-pro-max**: OLED dark (deep ink surfaces) with a single
green accent, **Inter** display + **JetBrains Mono** labels, AAA contrast.

**Live:** https://masterkpg.github.io

## Highlights

- **three.js line-burst shader hero** (prismatic light-rays on OLED black,
  code-split into its own chunk) with restrained kinetic typography — a rotating
  `<Role />` word — and a mouse-follow spotlight.
- **Dark / light theme toggle** with a smooth cross-fade (dark is default; the
  shader hero stays cinematic-dark, the body themes light/dark).
- **Bilingual EN ⇄ FR** — every string is defined in both languages and switches
  live (`src/lib/content.ts`, `src/lib/i18n.tsx`).
- **Custom cursor** + **magnetic hover** on interactive elements.
- **Filterable projects grid** with **3D tilt cards** and a **preview modal**
  that plays a demo video or shows the cover + documents per project.
- **Skills** — rolling marquees (dual direction, pause on hover) + animated
  **proficiency bars**.
- **Experience timeline** with a **scroll-scrubbed** aurora progress line.
- **Liquid-glass** buttons and surfaces, aurora scroll-progress bar, sticky
  footer, scroll-reveal everywhere.
- Fully **responsive** and **accessible**; all motion respects
  `prefers-reduced-motion`, pointer effects disabled on touch.

## UI credits

Components adapted from [21st.dev](https://21st.dev): Shader Animation
(three.js line-burst), Display Cards, Liquid Glass, Liquid Glass Button
(@aliimam), and Theme Toggle (@ayushmxxn). Design guidance from the
**ui-ux-pro-max** skill. Project cover art generated with Higgsfield (Soul).
Fonts: Inter, JetBrains Mono.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Add your media (videos, documents, covers)

Drop files into `public/assets/` named by project **id** — they're picked up
automatically with graceful fallbacks. See `public/assets/README.md`.

| Type | Path | Shown |
|---|---|---|
| Cover | `public/assets/covers/<id>.webp` | Card + modal header (else animated gradient) |
| Video | `public/assets/videos/<id>.mp4` | Autoplays in the preview modal |
| Document | `public/assets/docs/<id>.pdf` | Linked from the preview modal |

## Edit content

All copy, projects, skills and timeline entries live in **`src/lib/content.ts`**
(bilingual). The color system and animations are in `tailwind.config.js` and
`src/index.css`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the Vite
app and publishes `dist/` to GitHub Pages. Enable **Settings → Pages → Source:
GitHub Actions** once.
