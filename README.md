# Mohammad Amara, Portfolio

A personal portfolio built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**,
with a **three.js line burst shader** hero, bilingual (EN/FR) content, dark/light theming and a
CV page typeset in LaTeX.

**Live:** https://masterkpg.github.io

## Highlights

- **three.js line burst shader hero** (code split into its own chunk) with a rotating
  technology word.
- **Navigation bar** fixed to the top: transparent over the hero, blurred once the page scrolls,
  with a link to the CV page.
- **Dark / light theme toggle** (dark is default; the shader hero stays dark, the body themes).
- **Bilingual EN / FR**: every string is defined in both languages and switches live
  (`src/lib/content.ts`, `src/lib/i18n.tsx`).
- **Projects** in three groups: featured cards, a fanned card gallery for hardware and embedded
  work, and glass folders for the rest. Each project opens a preview modal (demo video, cover,
  links, documents).
- **Experience and education** cards driven by scroll position.
- **GitHub activity**: a contribution heat map that folds into a 3D skyline, fed by real data.
- **Halftone wordmark footer**.
- **CV page** at `/cv/`, in Latin Modern (Computer Modern), with EN and FR PDFs to download.
- Responsive and accessible; all motion respects `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type check + production build → dist/
npm run preview  # preview the build
```

`dev` and `build` first run `scripts/fetch-contributions.mjs`, which writes the last year of
public GitHub contributions to `public/contributions.json`. If the fetch fails, the activity
section is simply hidden.

## Add your media (videos, documents, covers)

Drop files into `public/assets/` named by project **id**; they are picked up automatically with
graceful fallbacks. See `public/assets/README.md`.

| Type | Path | Shown |
|---|---|---|
| Cover | `public/assets/covers/<id>.webp` | Card + modal header, once set as `cover` in `content.ts` |
| Video | `public/assets/videos/<id>.mp4` | Autoplays in the preview modal |
| Document | `public/assets/docs/<id>.pdf` | Linked from the preview modal |

## Edit content

All copy, projects, skills and timeline entries live in **`src/lib/content.ts`** (bilingual). The
color system and animations are in `tailwind.config.js` and `src/index.css`.

## CV

The CV sources are `latex/cv_en.tex` and `latex/cv_fr.tex` (standard article class, Latin
Modern). Build them with `pdflatex` and copy the PDFs to `public/assets/cv/`. The web version on
`/cv/` reads `src/cv/cv-data.ts`, which mirrors the LaTeX files.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the Vite app and publishes
`dist/` to GitHub Pages. Enable **Settings → Pages → Source: GitHub Actions** once.
