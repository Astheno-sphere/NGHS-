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

- **Ghost brands:** old names surviving in footers, meta tags, comments,
  email addresses. Grep the whole tree for the old brand, every phase.

## Ingestions (v2 — 2026-11-05)

Distilled from the curriculum in RESEARCH.md. Each section is paraphrased
method, never lifted text; licenses verified per repo. The v1 Arkham core
above is never rewritten by an ingestion, only extended.

### Ingestion 1 — impeccable (Apache-2.0)

Taste vocabulary adopted: **slop** (named deterministic tells, not vibes);
**the rut** (the category default a model lands on when it stops deciding —
near-black + neon accent + glow is itself a named saturated default, so color
can never creep back under "impact"); **design specificity** ("could an
unrelated logistics site use this page unchanged? — if yes, it failed");
the **skeleton test** (strip the copy; if the bare structure can't say what
the section is, the boldness was in the text size, not the design — now an
inspector review step); **browser surfaces** (selection, caret, scrollbars,
focus rings themed from the palette — the cheapest built-vs-assembled
signal); **reflex faces** (training-data defaults). Guard line: IBM Plex Mono
is on impeccable's reflex-faces list — ours survives *solely* as a
brief-pinned, archive-verified token, never as a free choice.

Anti-slop rules for this system: no gradient text (emphasis from weight/size
only); no eyebrow/kicker above every heading (the heading carries its own
weight); section numbers only when the sequence carries information (ours
does — the 01/05 slide HUD — keep it, don't copy it anywhere else); mono
only for data/code/measurement or where the pinned reference demands it;
no icon+heading+text card grids as page structure (the SECTORS table stays a
table — nested cards are always wrong); no `feTurbulence` SVG grain (reads
amateur — film grain is canvas/shader-driven); coded canvas scenes must
visualize real structure, never decorative tech jewelry.

Method upgrades: the inspector runs a **dual assessment** — design review
(specificity verdict, 3–5 priority issues, strengths) kept isolated from
deterministic checks (grep/pixel scans) until synthesis; provenance declared;
a skipped detector = a failed run. **Bolder-hand rule:** amplification never
introduces new primitives — more of the same brand at full strength. Polish
is refinement, never concealed redesign.

### Ingestion 2 — awesome-design-md (MIT)

**The DESIGN.md discipline:** NGHS's design language lives as
`design-system/DESIGN.md` on the 12-section template — YAML token frontmatter
with hexes; every color carrying a role *and* an anti-role; typography as
principles with measured values; components as exact recipes; an iteration
guide; and a **Known Gaps** section (what wasn't visible isn't invented).
Method: capture → resolve to source values → tokenize → voice-principles →
component recipes → lint → gaps.

Laws adopted: a token without an anti-role isn't a rule; **one accent, three
jobs** (if it appears in a fourth role, it isn't scarce anymore); tracking
is voice; iterate one component at a time, referenced by token name — new
variants become new entries, never mutations. Dark-system patterns
confirmed: ink as the CTA (our white pills are the same law, inverted);
depth from surface ladders + 1px hairlines, never drop shadows.

### Ingestion 3 — beautiful-web-type (MIT)

**Type method:** any future typeface swap runs the checklist — category →
weight ladder → true italics? → tabular figures → glyph coverage →
superfamily membership → release freshness. **Pairing rule:**
superfamily-first, three faces maximum, condensed display for short uppercase
phrases only; mono carries the entire UI register, so its italic and figures
must be real, never synthesized. Confirmations: IBM Plex Mono's documented
character (45° chamfers, true cursive italic, tabular figures, dotted zero)
is exactly why it holds our UI voice; **Oswald is the verified fallback
display face** if Anton ever fails.

### Ingestion 4 — 18F content-guide (CC0)

**Content rules:** plain-language checklist (short common words; no jargon —
ours adds a logistics-jargon watch; no figurative language; a words-to-avoid
list); voice is constant (authoritative, conversational, friendly —
contractions, plain verbs, second person), tone is chosen per the reader's
situation; recurring-section patterns (2–3 sentence summary opener per slide,
verb-first directives, lists/tables over paragraphs, no FAQ dumping, one
canonical piece per subject — link, don't duplicate). Inspector-grade copy
checks: the **25-word split test**, the **zombie test**, contractions +
second person always. Clarity over cleverness; brisk but not terse.

### Ingestion 5 — Gesso-Build/skills (MIT)

**QA gates:** the FIX/GATE/BASE discipline for the scorecard — every
scorecard dimension gets an *executable detector* where possible
(saturated-pixel scan for monochrome, font-import audit for typography,
em-dash grep for copy); deliberate deviations ride documented opt-outs in
the code (`data-slop-allow`), never to make a check pass; **the inspector
runs detectors before opining.** Adopted rules: `dark-glow` (chromatic halos
stripped, neutral kept); `indigo-accent` (our red-CTA ban, generalized);
`gradient-text`; `safe-green-default` (our phosphor-green error, codified);
`transition-all` (motion must name its subject); `bounce-easing` (interfaces
settle — toys bounce); `em-dash-copy`; `benefit-speak` (replace with specific
verb + object); `fabricated-precision` (precision without provenance is
decoration); `heavy-box-shadow`. Maxims: if a critique can't be checked,
it's an opinion, not a rule; opt-outs document deliberate choices.

### Ingestion 6 — principles + Rams (Unlicense / CC0)

**Principles as law:** our six laws now carry lineage — Apple *Deference*
(chrome never competes with content), GOV.UK "do the hard work to make it
simple" (restraint is the luxury), Rams #6 *unobtrusive* and #10 *as little
as possible* (the zero-color, three-face budget is the completion criterion,
not a compromise), Rams #5 *honest* (decorative color is dishonest
cladding). Inspector method: every fault cited as **element ↔ named
principle** — verdicts move from taste into evidence. Translation method
(zedr): for any future law, state the underlying virtue first, then price it
in the medium we're designing in. **Conflict priority, stated in advance:**
accessibility and content beat elegance and chrome — clashes resolve by
citation, not debate.

## Extending this skill

v2 (2026-11-05) completes the RESEARCH.md ingest order. Future ingestions
append dated sections below; the v1 Arkham core and the v2 ingestion blocks
are never rewritten, only extended. License caveats in RESEARCH.md apply to
every distillation — never lift text from CC BY-NC or unverified-license
sources.
