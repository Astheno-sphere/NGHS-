# NGHS Design Philosophy

The law for the Norden Global Handelhus rebuild. Every decision on this site is
measured against these six laws. If a decision breaks one, it doesn't ship.

## The reference is law

The verified June-2022 arkhamintelligence.com marketing site (Wayback Machine
snapshot 20220629143330, inspected pixel-by-pixel 2026-11-05) is the single
source of truth. Not memory of it — the thing itself. (Memory once said
"phosphor green." The archive said: zero green anywhere. Verify, don't remember.)

The reference, distilled:
- **Strictly monochrome.** Black canvas (#000000, #111 surfaces). White #FFFFFF is
  the *only* accent. No color exists on the page — pixel-verified.
- **Typography:** heavy condensed uppercase grotesque for headlines (Anton is the
  closest free match); IBM Plex Mono for *all* content and UI copy (verified in
  their archived stylesheet). Three faces maximum, ever.
- **Imagery:** full-bleed black-and-white photography, one per full-viewport
  section. The footage must match the headline or it goes.
- **Motion:** text-scramble "decode" on headline reveal; honest crossfades.
  Motion is meaning, never decoration.
- **Controls:** chamfered cut-corner white pill buttons, black labels. Minimal
  chrome: mono nav labels, a ticker, a slide counter.
- **Content:** one idea per viewport; a repeated syntactic frame with a unique
  payload per section ("See intelligence on…", "Customize alerts for…").

## The six laws

1. **The reference is law.** If it wouldn't survive on Arkham's 2022 page, it
   doesn't ship on ours.
2. **One viewport, one idea.** The repeated frame carries the rhythm; never
   repeat paragraphs.
3. **Restraint is the luxury.** Zero color. Three faces. No element without a job.
4. **Motion is meaning.** Scramble-decode on reveal, honest crossfades. Never
   decoration.
5. **Copy is design.** Plain words, short lines, every claim verifiable. Typos
   are defects, not blemishes.
6. **The score is the definition of done.** The scorecard (SCORECARD.md) defines
   done. The inspector (INSPECTOR.md) fails anything subpar. We rebuild until
   100/100.

## How we work

Teardown the reference → score the current state → rebuild in scored phases →
verify every change (pixel-level where possible) → the inspector re-scores →
ship only at 100. The full curriculum we're learning from is in RESEARCH.md;
the assembled skill is in skills/god-tier-designer/SKILL.md.
