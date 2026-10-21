# Mohammad Amara, Portfolio

My personal site: projects, experience, GitHub activity and CV, in English and French.

**Live:** https://masterkpg.github.io · **CV:** https://masterkpg.github.io/cv/

Built with React 18, TypeScript, Vite 5 and Tailwind CSS 3. Animation uses Framer Motion and
GSAP, and the hero is a three.js shader.

## What's on the site

- **Hero**: a three.js line burst shader (loaded as its own chunk) with a rotating role word.
- **About, Skills, Experience, Projects, Activity, Contact**, numbered 01 to 06.
- **Projects** in three layouts: featured cards, a fanned card gallery for hardware and embedded
  work, and folders for software and other projects. Each project opens a preview with its demo
  video, cover, role, tags, links and documents. `#project-<id>` in the URL opens one directly.
- **Experience and education** side by side. Cards animate on scroll and "See all" opens the
  full list.
- **GitHub activity**: a contribution heat map that folds into a 3D skyline, built from real
  contribution data.
- **CV page** at `/cv/`, typeset in Latin Modern to match the LaTeX PDFs, with EN and FR
  downloads. Project names on the CV link back to their preview on the portfolio.
- **EN / FR toggle** and **dark / light theme** (dark by default, the hero always stays dark).
- Responsive. The hero, experience cards and activity skyline respect
  `prefers-reduced-motion`.

## Run it locally

Requires Node 20.

```bash
npm install
npm run dev      # dev server
npm run build    # type check + production build into dist/
npm run preview  # serve the build on port 4173
```

`dev` and `build` first run `scripts/fetch-contributions.mjs`, which saves the last year of
GitHub contributions to `public/contributions.json`. If the fetch fails, the activity section is
hidden.

## Project structure

```
src/
  lib/content.ts         all portfolio text, projects, skills, timeline (EN + FR)
  lib/i18n.tsx           language toggle
  lib/theme.tsx          theme toggle
  components/sections/   one file per section
  components/ui/         shared components (modal, gallery, folders, skyline, footer)
  cv/                    CV page; cv-data.ts mirrors latex/cv_*.tex
latex/                   CV sources (cv_en.tex, cv_fr.tex)
public/assets/           covers, videos, documents, CV PDFs
scripts/                 contribution fetch
```

## Editing content

- **Text and projects:** `src/lib/content.ts`. Every string has an `en` and a `fr` version.
- **Project media:** name files after the project id and put them in `public/assets/`
  (see `public/assets/README.md`).

  | Type | Path | Shown |
  |---|---|---|
  | Cover | `covers/<id>.webp` | Card and preview, once `cover` is set in `content.ts` |
  | Video | `videos/<id>.mp4` | Plays in the preview |
  | Document | `docs/<id>.pdf` | Linked from the preview |

  Videos and documents only appear when the file exists, so a missing file never shows up as a
  dead link.
- **Colours and theme:** CSS variables in `src/index.css`, Tailwind config in
  `tailwind.config.js`.

## CV

The CV is written in LaTeX (`latex/cv_en.tex`, `latex/cv_fr.tex`):

```bash
cd latex
pdflatex cv_en.tex
pdflatex cv_fr.tex
```

Copy the PDFs to `public/assets/cv/` as `Mohammad_Amara_CV_EN.pdf` and
`Mohammad_Amara_CV_FR.pdf`. The web CV reads `src/cv/cv-data.ts`, so update it together with the
`.tex` files.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`: it installs, builds and publishes
`dist/` to GitHub Pages (Settings → Pages → Source: GitHub Actions).

## Credits

A few components in `src/components/ui/` (folders, fan gallery, contribution skyline, halftone
footer, glass button) started from open UI snippets and were adapted for this site. Each file's
header comment lists what changed.
