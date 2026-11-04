# NGSHweb Rebuild Spec — Arkham 2022 discipline, push to 100/100

Reference: verified June-2022 arkhamintelligence.com (Wayback 20220629143330).
Law: strictly monochrome (black/white/grey, zero color), white #FFFFFF is the only accent,
IBM Plex Mono for ALL content/UI copy, heavy condensed uppercase grotesque for headlines
(Anton = closest free match), full-bleed B&W media per viewport, text-scramble decode on
reveal, chamfered white pill buttons with black labels, headlines anchored low.

Baseline score: 52/100 (monochrome 8/20, typography 11/20, imagery 6/15, motion 9/10,
buttons 5/10, copy 8/15, craft 5/10).

## Phase 1 — Monochrome + buttons (+20 pts)
1. `:root`: replace `--cta-red #dc2626 / --cta-red-bright #ef4444 / --cta-red-hover #b91c1c`
   with `--cta: #ffffff`, `--cta-hover: #e8e8e8`, `--cta-text: #000000`.
2. `.btn-chamfer`, `.btn-contact`, `.btn-chamfer-submit`: background → var(--cta),
   text → var(--cta-text). KEEP the chamfer clip-path (shape is already Arkham-correct).
3. `.tag-tell-us`: color red → #ffffff.
4. `.toast-dot`: background red → #ffffff.
5. `.read-more-btn`: color red → #ffffff.
6. CSS header comment: remove "SALSABIL INTERNATIONAL", replace
   "High-Impact Red CTAs" with "Arkham 2022 Monochrome — white is the only accent".

## Phase 2 — Typography (+9 pts)
7. Google Fonts import: DROP Cinzel + Playfair Display (unused). ADD Anton (400) and
   IBM Plex Mono (400;500;600;700). New import: Anton, IBM Plex Mono, Goldman (retired
   below — keep in import only if any rule still references it; otherwise drop).
8. `--font-heading` / `--font-serif`: 'Anton', sans-serif (replaces Goldman).
9. `--font-mono`: 'IBM Plex Mono', 'Space Mono', 'JetBrains Mono', monospace.
10. `--font-body`: 'IBM Plex Mono', monospace (Arkham 2022 used mono for body copy too).
    Retire Inter from the system. Three faces total: Anton, IBM Plex Mono, (+ system
    fallback only).

## Phase 3 — Imagery: B&W law (+9 pts)
11. Global media rule: `.slide-video, .slide-bg, .news-media-img, .product-media-img,
    .page-bg { filter: grayscale(1) contrast(1.06); }` — one rule, whole site monochrome.
12. Hero video: diagnose why it reports "Unable to play media" (check file in repo:
    path, codec, size). If unfixable → replace hero background with coded B&W canvas
    (node-network, see Phase 5).
13. Slide 5 (cold chain): footage must match headline. Either source B&W cold-storage /
    reefer imagery or overlay a coded mono temperature-readout strip
    (e.g. "-22.4°C · REEFER 07 · DOOR SEALED") — Arkham grammar, not stock.

## Phase 4 — Copy: zero typos (+7 pts)
14. Logo tagline image reads "NORDEN GLOBAL HANDELSKAP" → must read "NORDEN GLOBAL
    HANDELSHUS". (Asset check: if baked into an image file, rebuild the asset or
    replace with styled text.)
15. Hero marquee: "AUSTRAILIA" → "AUSTRALIA".
16. Marquee "AFRICA" (a continent, not a destination) → REPLACE with the actual
    country/countries served. **Needs owner's answer — do not invent.**
17. Slide 3: "...ROOTING OUT UNFAIR PRACTICE AT EVERY STAGE AND ARE STRICTLY
    MONITORED." → "ROOTING OUT UNFAIR PRACTICES AT EVERY STAGE. EVERY LINK STRICTLY
    MONITORED." (grammar fix, his words kept)
18. slides.js footer spans: `.footer-text-normal` "© 2024-2025 Salsabil International"
    → "© 2024–2026 Norden Global Handelhus" (both spans unified, year current).

## Phase 5 — Craft (+5 pts)
19. Footer legal line: add separators so it reads "Privacy Policy | Cookie Preferences"
    instead of running together on wrap.
20. Dead nav tabs on main page: wire or remove (owner confirmed some are dead links;
    main-page scope = don't leave dead ends).

## Phase 6 — Coded Arkham scenes (imagery lock-in, optional stretch)
21. Per-slide B&W canvas backgrounds as the stock-video replacement: hero = night
    node-network map with glowing white nodes + connecting arcs (direct quote of
    Arkham's "movement of value" section); slide 2 = route arcs; slide 3 = ops-room
    grid; slide 4 = contour/terrain field; slide 5 = temperature readout field.
    Plus film-grain + scanline overlays. Only if Phase 1–5 pass the inspector first.

## Verification (inspector gate)
- Render every changed viewport in the managed browser (file:// or local server);
  screenshots reviewed against the 2022 Arkham reference.
- Re-score against the 7-dimension scorecard. Ship only at 100/100.
- Push: needs GitHub App installed on SartajUIUX1/NGSHweb (owner action);
  otherwise deliver the rebuilt tree as files.
