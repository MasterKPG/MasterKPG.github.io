# Mohammad Amara, Portfolio

A personal portfolio built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**,
with a **three.js WebGL line burst shader** hero, bilingual (EN/FR) content, and dark/light
theming.

**Live:** https://masterkpg.github.io

## Highlights

- **three.js line burst shader hero** (code split into its own chunk) with a rotating role word
  and a mouse follow spotlight.
- **Dark / light theme toggle** with a smooth cross fade (dark is default; the shader hero stays
  cinematic dark, the body themes light/dark).
- **Bilingual EN / FR**: every string is defined in both languages and switches live
  (`src/lib/content.ts`, `src/lib/i18n.tsx`).
- **Magnetic hover** on interactive elements.
- **One interactive project folder** (`interactive-folder-gallery.tsx`): click to open, drag any
  card down (or hit Close) to close, hover to preview a title, click to open the **preview modal**
  (demo video, cover, docs).
- **Skills**: an asymmetric bento of spotlight cards (cursor tracked glow), hardware vs. software
  color coded.
- **Experience timeline** with a **scroll scrubbed** cyan progress line.
- **Frosted glass buttons** (`liquid-glass-button.tsx`) on every call to action, with an SVG
  turbulence/displacement backdrop filter and a specular rim. Cyan scroll progress bar, sticky
  footer, scroll reveal throughout.
- Fully **responsive** and **accessible**; all motion respects `prefers-reduced-motion`, pointer
  effects disabled on touch.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Add your media (videos, documents, covers)

Drop files into `public/assets/` named by project **id**; they are picked up automatically with
graceful fallbacks. See `public/assets/README.md`.

| Type | Path | Shown |
|---|---|---|
| Cover | `public/assets/covers/<id>.webp` | Card + modal header (else animated gradient) |
| Video | `public/assets/videos/<id>.mp4` | Autoplays in the preview modal |
| Document | `public/assets/docs/<id>.pdf` | Linked from the preview modal |

## Edit content

All copy, projects, skills and timeline entries live in **`src/lib/content.ts`** (bilingual). The
color system and animations are in `tailwind.config.js` and `src/index.css`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the Vite app and publishes
`dist/` to GitHub Pages. Enable **Settings → Pages → Source: GitHub Actions** once.
