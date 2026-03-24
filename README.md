# Personal Portfolio Website

A sleek, Apple-inspired personal portfolio / CV website built with HTML, CSS, and JavaScript.

## Sections

- **Hero** — Profile picture, name, tagline, skill badges
- **About** — Short bio + contact info card (address, email, phone, LinkedIn, GitHub)
- **Academics** — Education timeline with institution names, dates, and tags
- **Experience** — Career history cards with dates and tech tags
- **Projects** — 2-column grid with image placeholder, description, and links
- **Contact** — Call-to-action with email and social links

## How to update your content

Open `index.html` and look for `<!-- UPDATE: ... -->` comments. They tell you exactly which text to replace.

| What to update | Where |
|---|---|
| Your name | `<title>`, `.nav-logo`, `.hero-name`, `<footer>` |
| Your tagline | `.hero-tagline` |
| Skill badges | `.hero-badges` |
| Bio text | `#about .about-text` |
| Address, email, phone | `#about .contact-list` |
| LinkedIn / GitHub | `#about .contact-list` |
| Degrees & schools | `#academics .timeline` |
| Jobs & companies | `#experience .exp-list` |
| Projects | `#projects .projects-grid` |
| Contact email | `#contact` |

## Add your profile photo

1. Upload a square photo (400×400 px minimum) to the repo
2. In `index.html`, replace the `<div class="avatar-placeholder">` block with:
   ```html
   <img src="assets/profile.jpg" alt="Your Name" />
   ```

## Live at

`https://masterkpg.github.io`
