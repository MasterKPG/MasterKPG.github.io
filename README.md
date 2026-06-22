# Personal Portfolio Website

A sleek personal portfolio / CV website built with HTML, CSS, and vanilla JavaScript.
Warm "creamy" light theme (beige surfaces + soft light-blue accents, macOS-inspired)
with captivating, performant animations.

## Sections

- **Hero** — Profile picture, name, tagline, skill badges, floating ambient glow
- **About** — Short bio + contact info card (address, email, phone, LinkedIn, GitHub)
- **Academics** — Education timeline with institution names, dates, and tags
- **Experience** — Career history cards with dates and tags
- **Skills** — Rolling (marquee) animation of skills across two rows; pauses on hover
- **Projects** — Card grid, including a featured *Arduino clone* card (with the
  Ping-Pong game and VHDL Adder sub-projects) and a *Connected plant (IoT)* card
- **Contact** — Call-to-action with email and social links

## Animations & interactions

- Scroll-reveal (IntersectionObserver) with staggered delays
- Rolling skills marquee (CSS), reverse-direction second row, pause on hover
- Animated gradient hero name + gentle floating shapes
- Hero ambient glow drifts toward the cursor
- Subtle 3D tilt on project cards (pointer-driven)
- Shine sweep on the featured project card

All motion respects `prefers-reduced-motion` and pointer-driven effects are
disabled on touch devices.

## Color palette

| Token | Value | Use |
|---|---|---|
| `--cream` | `#F3EEE4` | Main background (warm cream) |
| `--cream-2` | `#EAE2D3` | Alternate sections (deeper beige) |
| `--cream-3` | `#FCFAF5` | Card surfaces (near-white cream) |
| `--ink` | `#353027` | Primary text (warm charcoal) |
| `--blue` | `#7DA9D5` | Soft light-blue accent |
| `--blue-ink` | `#3E6FA0` | Accent text (contrast on cream) |

Adjust these in the `:root` block of `style.css` to retune the whole site.

## How to update your content

Open `index.html` and edit the relevant section.

| What to update | Where |
|---|---|
| Your name | `<title>`, `.nav-logo`, `.hero-name`, `<footer>` |
| Your tagline | `.hero-tagline` |
| Skill badges | `.hero-badges` |
| Rolling skills | `#skills .marquee-track` (keep both copies in sync) |
| Bio text | `#about .about-text` |
| Address, email, phone | `#about .contact-list` |
| Degrees & schools | `#academics .timeline` |
| Jobs & companies | `#experience .exp-list` |
| Projects | `#projects .projects-grid` |
| Contact email | `#contact` |

> **Skills marquee tip:** each row duplicates its chips (the second copy is
> marked `aria-hidden="true"`) so the loop is seamless. When you add or remove a
> chip, update **both** copies.

## Add your profile photo

1. Upload a square photo (400×400 px minimum) to the repo
2. In `index.html`, replace the `<div class="avatar-placeholder">` block with:
   ```html
   <img src="assets/profile.jpg" alt="Mohammad Amara" />
   ```

## Live at

`https://masterkpg.github.io`
