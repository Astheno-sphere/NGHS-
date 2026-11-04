---
version: 1
name: NGHS — Norden Global Handelhus
description: >-
  Terminal-aesthetic marketing site for a Norway sourcing and supply house.
  Strict monochrome discipline after the verified June-2022 Arkham
  Intelligence marketing site: black canvas, white as the only accent,
  condensed-grotesque display + monospace everything else, one idea per
  full-viewport section.
colors:
  ink: "#000000"
  surface-0: "#08080a"
  surface-1: "#0d0d12"
  paper: "#ffffff"
  text: "#ededed"
  muted-1: "#94a3b8"
  muted-2: "#64748b"
  hairline: "rgba(255,255,255,0.12)"
  scrim: "rgba(0,0,0,0.75)"
typography:
  display:
    family: "Anton, 'Arial Narrow', sans-serif"
    case: uppercase
    tracking: "-0.01em"
    weight: 400
  ui:
    family: "'IBM Plex Mono', 'Space Mono', 'JetBrains Mono', monospace"
    case: "uppercase for labels, sentence case for body"
    weight: "400/500/600"
---

# NGHS DESIGN.md — v1 (2026-11-05)

## Overview

NGHS is a Norway sourcing and supply house: lab supplies, industrial
components, workwear, and chemical reagents inbound; foodstuff, spices, and
FMCG outbound. The site is a 5-slide fullscreen snap deck — one viewport,
one idea, looping. The design posture: a terminal that happens to sell
logistics. Chrome is hairlines and mono labels; the content leads.

Key characteristics: strict monochrome; chamfered white pill CTAs;
text-scramble decode on headline reveal; dossier-stamp rhythm
("SOURCED · VERIFIED · DELIVERED"); full-bleed black-and-white media.

## Colors

| Token | Hex | Role | Anti-role |
|---|---|---|---|
| ink | #000000 | page canvas | never a text color on dark |
| surface-0 | #08080a | raised panels, modal | never large text areas |
| surface-1 | #0d0d12 | card wells, code blocks | never body text |
| paper | #ffffff | the ONLY accent: CTAs, headlines, focus | never body copy on white, never decoration, never a fourth role |
| text | #ededed | primary copy | never on white |
| muted-1 | #94a3b8 | secondary labels | never headlines |
| muted-2 | #64748b | tertiary microcopy, ticks | never body copy |
| hairline | rgba(255,255,255,0.12) | dividers, borders | never colored borders |
| scrim | rgba(0,0,0,0.75) | legibility overlays on media | never as a design tint |

Scarcity doctrine: paper appears in exactly three roles — CTA, focus,
headline. Everything else is monochrome by rule.

## Typography

Families and roles:
- **Display:** Anton (fallback Arial Narrow) — headlines only, uppercase,
  tight tracking. Short phrases only; never body.
- **UI:** IBM Plex Mono (fallbacks Space Mono, JetBrains Mono) — *everything
  else*: body, labels, buttons, microcopy, data. Its documented character
  (45° chamfers, true cursive italic, tabular figures, dotted zero) is why
  it holds the voice. Fallback display face if Anton fails: Oswald.

Principles: three faces maximum (two + system fallbacks); display never
below 400 weight-as-drawn; mono labels uppercase with letterspacing;
numbers tabular; contractions and second person in copy; zero em dashes in
rendered copy.

## Layout

- Full-viewport sections (`100svh`), scroll-snap deck, 5 slides looping.
- Minimal chrome: top nav (mono labels), right-edge slide HUD (01/05 ticks —
  the sequence carries information), bottom footer strip.
- Headlines anchor to the lower corners, alternating left/right.
- Whitespace philosophy: the viewport is the margin; content sits inside
  generous gutters, never edge-to-edge except media.

## Elevation & Depth

No drop shadows. Depth comes from the surface ladder
(ink → surface-0 → surface-1) plus 1px hairlines. Overlays use the scrim
token. (Gesso `heavy-box-shadow` / `dark-glow` gates apply.)

## Shapes

- CTAs: chamfered cut-corner white pills (octagonal `clip-path`), black
  labels. This is the only rounded/chamfered control on the page.
- Everything else: sharp corners. Cards, modals, inputs are rectangles
  with hairline borders.

## Components

- `button-primary`: white pill, black IBM Plex Mono uppercase label,
  chamfered corners. One per band. Hover: none decorative — state change
  only (e.g. label swap).
- `nav-label`: mono uppercase microcopy, muted-1, hairline underline on
  active.
- `slide-hud`: right-edge 01/05 tick strip, muted-2, current tick in paper.
- `ticker`: mono destination strip, muted-1 on ink.
- `dossier-stamp`: "SOURCED · VERIFIED · DELIVERED" mono microcopy,
  repeated as rhythm.
- `quote-modal`: 6 fields, surface-0 panel, hairline border, white submit.
- `media-frame`: full-bleed, `filter: grayscale(1) contrast(1.06)` —
  enforced in CSS so no color can enter through any selector.

## Do's and Don'ts

- DO resolve every new color to a token; DON'T introduce a hex outside the
  table.
- DO keep paper in its three roles; DON'T let the accent appear in a
  fourth.
- DO name motion's subject (`transition: opacity .3s`, never `all`);
  DON'T bounce (ease-out only — interfaces settle).
- DO keep the SECTORS content a table; DON'T rebuild it as icon cards.
- DO theme browser surfaces (selection, caret, scrollbar, focus) from the
  palette; DON'T leave defaults.
- DO write headlines clear, never cute; DON'T ship a typo (defect, not
  blemish).

## Responsive Behavior

- Breakpoints: desktop-first deck; mobile collapses chrome (HUD condenses,
  nav folds).
- Touch targets ≥ 44px on coarse pointers.

## Iteration Guide

1. Change one component at a time, referenced by token name.
2. New variants become new entries in this file — never mutations of an
   existing token's meaning.
3. Re-run the detector sweep after every change (saturated-pixel scan,
   font-import audit, em-dash grep, `transition: all` grep).
4. Inspector re-scores the touched scorecard dimensions before the next
   phase.

## Known Gaps

- Mobile (390px) layout never visually verified — inspection browser is
  fixed-width.
- Anton rendering / headline reflow never seen on a live page (verification
  environment blocked); needs human eyes or a deployed preview.
- Coded B&W canvas scenes (Phase 6 of the rebuild spec) not yet built —
  stock video still in place behind the grayscale law.
- Subpages (contact, legals, on-field, product) not yet rebuilt to this
  system.
- `transition: all` instances (5) predate the gates — cleanup queued, not
  blocking.
