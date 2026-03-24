## Plan: Apple-like CV refresh

Build a deep-color, Apple-inspired single-page CV using Mohammad Amara’s provided details from CV_Mohammad_Amara.pdf, keeping the existing structure but replacing all placeholders with real content and ensuring smooth, sleek animations.

**Steps**
1. Content mapping: Transcribe CV data into site structure (name/title, profile summary, contact info, education, experience, projects, skills/languages), keep placeholder photo per request, set CTA links (email mamara@enssat.fr, LinkedIn https://www.linkedin.com/in/mohammad-amara/, GitHub https://github.com/MasterKPG, phone +33 7 51 33 29 40, address Bd. Louis Guilloux, Lannion 22300, France).
2. Hero/About: Update hero name/title, tagline (Étudiant Ingénieur Informatique – Recherche de stage), badges (Python, C/C++, Java, Algorithms, ML, Math Modeling), and bio summary from CV profile; wire CTA buttons to About/Contact; keep placeholder avatar.
3. Contact card: Replace address, email, phone, LinkedIn, GitHub with CV data; add age/permit note if desired; ensure mailto/tel links use provided values; sync footer name/year.
4. Academics: Rewrite timeline with three entries: ENSSAT Ingénierie Informatique (Sept 2024–present, Lannion, bullets from CV), CPGE MPSI/MP Lycée Technique Mohammedia (Sept 2022–Jul 2024, Mohammedia, bullets), Baccalauréat Scientifique Newton International School (Sept 2021–Jul 2022, Mohammedia, specialty math/physics); add relevant tags per entry.
5. Experience: Populate three roles with bullets: Moniteur de bibliothèque (ENSSAT, 2025–present), Hôte d’accueil (City One, 2025–present), Membre actif – Voile (Yacht Club Mohammedia, 2019–2021); include locations and concise impact statements.
6. Projects: Expand grid to six cards (TIPE first, then ML KNN/K-Means, API météo, DLL injection C++, ASCII art generator, plus one more if provided); include concise descriptions and tech tags, add GitHub/demo placeholders if unknown; consider making grid responsive for 2/3 columns on wide screens and 1 column on mobile.
7. Skills/Languages surfacing: Reflect CV technical stack and languages in badges/tags (Python, C/C++, Java, JS, NumPy/SciPy/Matplotlib, PIL, algorithms, math modeling; Languages: Arabe natif, Français B2, Anglais B2).
8. Visual/theme pass: Refine palette to deeper midnight base with subtle gradients, glassmorphism panels, elevated shadows; ensure buttons, cards, and section labels follow coherent Apple-like aesthetic; keep text contrast high.
9. Animation polish: Keep/adjust scroll-reveal easing and stagger; refine hover states for cards/links (translate/shadow); ensure performance-friendly transitions and reduce motion for users with prefers-reduced-motion.
10. Responsiveness/UX: Verify navbar active states, mobile menu, anchor offsets; ensure cards/timeline stack cleanly under 860px/640px; check spacing around added projects.
11. Final content QA: Click through links (mailto/tel/LinkedIn/GitHub), validate contact CTA uses email, confirm footer auto-year, ensure no leftover placeholders.

**Relevant files**
- index.html — Replace all placeholder text with CV data; expand projects count; update links/CTA.
- style.css — Adjust color palette, gradients, spacing, hover states, grid layout, responsiveness, reduced-motion handling.
- script.js — Keep scroll/active nav/menu logic; adjust animation timings or offset if needed for new layout.
- CV_Mohammad_Amara.pdf — Source of truth for CV content (already parsed above); add .txt extract if further details needed.

**Verification**
1. Manual: Open index.html in browser; confirm sections show correct data, nav links scroll to correct anchors, mobile menu toggles, contact links open mail/phone/LinkedIn/GitHub.
2. Visual: Check theme consistency (deep colors, gradients, glass panels), hover/scroll animations, readability at multiple breakpoints (desktop/tablet/mobile).
3. Accessibility/performance: Verify focus states on links/buttons, ensure prefers-reduced-motion respected if implemented, and basic Lighthouse/DevTools pass for color contrast.

**Decisions**
- Photo remains placeholder per user.
- Contact links: email mamara@enssat.fr, phone +33 7 51 33 29 40, LinkedIn in/mohammad-amara, GitHub MasterKPG.
- Projects ordered with TIPE first; need sixth project detail if available.

**Further Considerations**
1. Provide a sixth project title/description/tech if you want all six filled from CV (currently five listed); otherwise we can duplicate styling with a placeholder tag set.
2. Confirm language preference for content (keep English UI with French content as-is, or translate to English/French consistently).
3. If you want age/permit shown, specify placement (contact card tags vs. about paragraph).
