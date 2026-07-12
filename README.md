# Mohammad Amara — Portfolio

A futuristic, fully-remade personal portfolio built with **React + TypeScript +
Vite + Tailwind CSS + Framer Motion**, with a **three.js WebGL line-burst shader**
hero, bilingual (EN/FR) content, and dark/light theming.

Design system per **ui-ux-pro-max ui-styling**: OLED dark (cool ink surfaces)
with a single **electric-cyan** accent, AAA contrast. Type: **Inter** +
**JetBrains Mono**.

All projects live in **one interactive folder** — click to open it, the cards
fan out (drag any one down, or hit Close, to file them back away), hovering a
card lifts it above its neighbors to reveal its title, and clicking opens the
preview modal. Skills are an asymmetric bento of spotlight cards (no
percentages). Contact is an editorial numbered index. Every button on the site
is the same **liquid-glass** component (SVG turbulence/displacement backdrop +
specular rim). No custom cursor.

**Live:** https://masterkpg.github.io

## Highlights

- **three.js line-burst shader hero** (prismatic light-rays on OLED black,
  code-split into its own chunk) with restrained kinetic typography — a rotating
  `<Role />` word — and a mouse-follow spotlight.
- **Dark / light theme toggle** with a smooth cross-fade (dark is default; the
  shader hero stays cinematic-dark, the body themes light/dark).
- **Bilingual EN ⇄ FR** — every string is defined in both languages and switches
  live (`src/lib/content.ts`, `src/lib/i18n.tsx`).
- **Magnetic hover** on interactive elements.
- **One interactive project folder** (`interactive-folder-gallery.tsx`) — click
  to open, drag any card down (or hit Close) to close, hover to preview a
  title, click to open the **preview modal** (demo video, cover, docs).
- **Skills** — an asymmetric bento of spotlight cards (cursor-tracked glow),
  hardware vs. software color-coded, no percentages.
- **Experience timeline** with a **scroll-scrubbed** cyan progress line.
- **Liquid-glass buttons** (`liquid-glass-button.tsx`) on every CTA site-wide —
  SVG turbulence/displacement backdrop-filter + specular rim, `asChild` support
  for link-style CTAs. Cyan scroll-progress bar, sticky footer, scroll-reveal
  everywhere.
- Fully **responsive** and **accessible**; all motion respects
  `prefers-reduced-motion`, pointer effects disabled on touch.

## UI credits

Components sourced from [21st.dev](https://21st.dev):
[Liquid Glass Button](https://21st.dev/r/aliimam/liquid-glass-button)
(@aliimam) and
[Interactive Folder Gallery](https://21st.dev/@uithefactory/components/interactive-folder-gallery)
(@uithefactory), both integrated with two correctness fixes documented inline
in `src/components/ui/liquid-glass-button.tsx` (a dropped-`className` bug and
an `asChild`/Radix-`Slot` single-child crash) — see that file's header comment
for details. Shader Animation (three.js line-burst) also from 21st.dev. Design
guidance from the **ui-ux-pro-max** skill. Project cover art generated with
Higgsfield (Soul). Fonts: Inter, JetBrains Mono.

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
