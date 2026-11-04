---
name: god-tier-designer
description: >-
  Design like the verified 2022 Arkham Intelligence marketing site: strict
  monochrome discipline, condensed-grotesque + monospace type systems,
  full-bleed black-and-white media, text-scramble motion, and the
  teardown → scorecard → rebuild → verify → inspector-gate method. Use when
  designing, critiquing, or rebuilding a dark terminal-aesthetic site, or when
  the inspector needs its rubric. v1: distilled from the pixel-verified
  June-2022 arkhamintelligence.com reference (Wayback 20220629143330);
  extended by the curriculum in ../../RESEARCH.md as ingested.
---

# God-Tier Designer — v1

## The first law: verify the reference, never remember it

Memory once said Arkham's accent was "phosphor green." The archived
stylesheet and pixel scans said: zero green anywhere — white #FFFFFF is the
only accent. Every token below was measured from the rendered June-2022 page
and its archived CSS, 2026-11-05. Treat any unverified "I recall" as a
hypothesis until it survives the archive.

## The language (measured)

**Color:** strictly monochrome. Page `#000000`, surfaces `#111`, text
`#FFFFFF`/`#EDEDED`, muted greys `#787775`/`#94A3B8`/`#64748B`, hairline
borders `rgba(255,255,255,0.12–0.28)`. One accent: white. A pixel scan of the
reference found zero saturated pixels — that is the bar.

**Typography:** headlines are a heavy condensed uppercase grotesque
(Anton is the closest free match; Oswald Bold the alternate). *All* other
copy — body, UI, labels, microcopy — is IBM Plex Mono (verified in their
CSS: `font-family: IBM Plex Mono, monospace`). Three faces maximum, ever.
Kill dead imports on sight.

**Media:** full-bleed black-and-white photography, one per full-viewport
section. The frame must match the headline or it goes. Enforcement is a
single CSS law: `filter: grayscale(1) contrast(1.06)` over every media
selector — no color may enter through any selector, any page, any deploy.

**Controls:** chamfered cut-corner white pill buttons (octagonal clip-path),
black labels, mono uppercase microcopy. Chrome stays minimal: mono nav
labels, a ticker strip, a slide/section counter. Nothing else competes.

**Motion:** text-scramble "decode" cycling random glyphs before resolving, on
headline reveal. Honest crossfades between states. Motion is meaning — if it
doesn't signal state change or revelation, delete it.

**Content grammar:** one idea per viewport. A repeated syntactic frame with a
unique payload per section ("See intelligence on…", "Customize alerts
for…", "See the movement of…"). Headlines anchor to the lower corners,
alternating left/right. A dossier stamp (ours: "SOURCED · VERIFIED ·
DELIVERED") repeats as rhythm; paragraphs never repeat.

## The method

1. **Teardown the reference.** Screenshot it, sample its pixels, read its
   stylesheets. Write down tokens with hexes and font stacks. No token ships
   on memory alone.
2. **Score the current state.** Seven dimensions, 100 points: monochrome (20),
   typography (20), imagery (15), motion (10), buttons (10), copy (15),
   craft (10). Baseline honestly — ours was 52.
3. **Rebuild in scored phases.** Biggest point haul first (usually color +
   type). One phase = one commit. Never mix phases.
4. **Verify every change directly.** Viewed pixels for visuals (magnified
   crops where it matters), exact-match greps for code. "Probably fine" is
   a defect.
5. **The inspector gates.** Blunt, concrete, evidence-backed verdict per
   dimension. FAIL = rebuild. Ship only at 100/100.

## Failure modes (observed, not theoretical)

- **Remembered-reference drift:** asserting a token from memory ("phosphor
  green") instead of measuring it. The archive is the only authority.
- **Color creep:** a single red CTA justified as "high impact." There is no
  high-impact color in a monochrome system — white is the impact.
- **Font bloat:** unused imports (Cinzel, Playfair) riding along. Audit the
  import list like a dependency list.
- **Contradicting footage:** cold-chain copy over city rooftops. If no frame
  earns the headline, code the frame (B&W canvas: node maps, readout fields,
  grain, scanlines) instead of shipping stock.
- **Baked-in typos:** text inside images can't be spell-checked — inspect
  image assets pixel by pixel before sign-off.
- **Ghost brands:** old names surviving in footers, meta tags, comments,
  email addresses. Grep the whole tree for the old brand, every phase.

## Extending this skill

Ingest order per RESEARCH.md: impeccable (taste language) → awesome-design-md
(brand-language method) → beautiful-web-type (type system) → 18F/content-guide
(copy rules) → Gesso-Build/skills (73-rule QA checklist) → principles/Rams
(evaluation frameworks). Each ingestion appends a dated section here; the
v1 Arkham core above is never rewritten by an ingestion, only extended.
License caveats in RESEARCH.md apply to every distillation — never lift text
from CC BY-NC or unverified-license sources.
