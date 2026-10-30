# Mohammad Amara, Portfolio

My personal site: projects, experience, GitHub activity and CV, in English and French.

**Live:** https://masterkpg.github.io · **CV:** https://masterkpg.github.io/cv/

Built with React 18, TypeScript, Vite 5 and Tailwind CSS 3, with Framer Motion for the few
animations. Type is IBM Plex Sans and IBM Plex Mono.

## What's on the site

- **Hero**: one heading, the PIEED award, and photos of real boards from the projects.
- **Projects**: Solibox as a lead block with a spec sheet, three cards for current work, and an
  index of every other project that filters by field. Each project opens a preview with its
  demo video, cover, role, tags, links and documents. `#project-<id>` in the URL opens one
  directly.
- **About** with a toolkit table, **Experience and education** as dated lists,
  **GitHub activity** as a contribution heat map (it also folds into a 3D skyline), and
  **Contact**.
- **CV page** at `/cv/`, typeset in Latin Modern to match the LaTeX PDFs, black on white in both
  themes, with EN and FR downloads. Project names on the CV link back to their preview on the
  portfolio.
- **EN / FR toggle** and **dark / light theme** (dark by default).
- Responsive, and animations follow `prefers-reduced-motion`.

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
  components/ui/         shared components (section, modal, skyline)
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

The contribution skyline (`src/components/ui/contribution-skyline.tsx`) started from an open UI
snippet and was adapted for this site. Its header comment lists what changed.
