# NGHS Scorecard — 100 points, no partial credit for vibes

Each dimension is scored against the verified 2022 Arkham reference. The
inspector owns the scoring. Baseline (main page, 2026-11-05): **52/100**.

## 1. Monochrome discipline — 20 pts
Zero color anywhere: no red, no green, no blue. White #FFFFFF is the only
accent (buttons, headlines, key labels). Greys (#111 surfaces, muted text)
are the only supporting tones.
- Baseline 8/20: black canvas and white type present, but red CTA system and
  full-color video broke the law.
- 100 looks like: a pixel scan finds no saturated pixel on the page.

## 2. Typography — 20 pts
Headlines: heavy condensed uppercase grotesque (Anton). Everything else —
body, UI, labels, microcopy: IBM Plex Mono. Three faces maximum, no exceptions.
- Baseline 11/20: Goldman display + Space/JetBrains Mono + Inter body, plus two
  dead font imports (Cinzel, Playfair).
- 100 looks like: Anton + Plex Mono (+ system fallbacks only); the import list
  is two families.

## 3. Imagery — 15 pts
Full-bleed black-and-white media, one per viewport. Every frame must match its
headline — footage that contradicts the copy is a defect, not a compromise.
- Baseline 6/15: color video, hero video dead on arrival, cold-chain headline
  over city rooftops.
- 100 looks like: B&W everywhere (grayscale is the law, enforced in CSS), every
  frame earning its headline — or coded canvas scenes instead of stock.

## 4. Motion — 10 pts
Text-scramble decode on headline reveal; honest crossfades between states.
No decorative animation.
- Baseline 9/10: cipher.js already does the decode correctly.
- 100 looks like: decode on every reveal, nothing else moving without a reason.

## 5. Buttons & controls — 10 pts
Chamfered cut-corner white pills, black labels, mono uppercase microcopy.
Chrome stays minimal: nav labels, ticker, counter.
- Baseline 5/10: chamfer shape already correct, color was the crime (red).
- 100 looks like: white pills, black text, no other button treatment on the page.

## 6. Copy — 15 pts
One idea per viewport. The repeated frame ("SOURCED · VERIFIED · DELIVERED"
dossier stamp + mono microcopy) carries rhythm; paragraphs never repeat.
Plain words, short lines, every claim verifiable. Zero typos — a typo is a
defect, scored, not a blemish.
- Baseline 8/15: structure sound; HANDELSKAP, AUSTRAILIA, dangling clause,
  ghost brand in footer.
- 100 looks like: every string on the page spelled, grammatical, and true.

## 7. Craft — 10 pts
One brand everywhere. Consistent footer, clean legal line, no dead ends on
the main page, current dates.
- Baseline 5/10: footer flip-flopped brands by slide, stale years, wrapped
  legal line.
- 100 looks like: NGHS everywhere, separators where they belong, nothing dead.

## Scoring rules
- The inspector scores; the builder doesn't grade their own work.
- A dimension scores 100% of its points or it scores what it earns — no
  rounding up for effort.
- Re-score after every phase. Ship only at 100/100.
