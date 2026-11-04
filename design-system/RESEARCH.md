# Design Research — "God-Tier Designer" Curriculum

GitHub hunt completed 2026-11-05: ~15 `search_repositories` queries across
four buckets (design philosophy, content design, typography, taste/critique),
then README + LICENSE verification on every candidate. Search-only; nothing
cloned yet. Ranked by learnability, not stars.

## The shortlist

**1. `pbakaus/impeccable`** — 103k★ — Apache-2.0
Design vocabulary for coding agents: `polish`/`bolder` playbooks, `critique`/
`audit` reviews, anti-slop pattern catalog, full case study.
Extract: the taste vocabulary itself; the critique/audit rubric as our review
method; the named tells of generated-looking UI.

**2. `VoltAgent/awesome-design-md`** — 126k★ — MIT
84 DESIGN.md files reverse-engineering real brands' design systems into
tokens, patterns, and rules.
Extract: how top brands articulate design language (template for NGHS's own
DESIGN.md); the reverse-engineering method (what we did to Arkham, formalized);
recurring token patterns across 84 brands.

**3. `ubuwaits/beautiful-web-type`** — 7.3k★ — MIT
Curated guide to open-source typefaces: history, weights, specimens, OpenType
features. Actively maintained.
Extract: the typeface-evaluation framework ("which condensed grotesque, which
mono"); type-as-voice thinking; display + text + mono pairing logic.

**4. `18F/content-guide`** — 84★ — CC0 (public domain)
The US government's content guide: plain language, voice and tone, structure,
accessibility. (Repo now points to consolidated `18F/guides`; content intact.)
Extract: plain-language checklist for the NGHS copy rewrite; the voice-and-tone
framework; content patterns for recurring content types.

**5. `Gesso-Build/skills`** — 93★ — MIT
"73 slop guards from the rules professional designers use" — deterministic
HTML/CSS critique, each tell a documented detector with thresholds, most with
auto-fixes.
Extract: the 73-rule catalog as our design QA checklist; critique as
executable rules, not vibes.

**6. `robinstickel/awesome-design-principles`** — 782★ — public domain
Principles from Apple HIG, GOV.UK, Material, IBM Carbon, Atlassian, Firefox
Photon, side by side.
Extract: comparative principle sets — a stylebook for writing our own;
principles as decision tools.

**7. `zedr/dieter-rams-10-applied-to-software`** — 434★ — CC0
Rams' ten principles rewritten for screens.
Extract: the 10 principles as an evaluation framework; the translation method
(industrial → screen without cargo-culting).

## Awesome lists worth mining

- `alexpate/awesome-design-systems` (26k★) — mine for systems with published
  philosophy docs (GOV.UK, Carbon, Atlassian), not component code.
- `goabstract/Awesome-Design-Tools` (42k★) — the instrument side: what the pros
  actually work in.
- `Jolg42/awesome-typography` (1.5k★, CC0) — Publications/Videos sections are
  a typography-literature canon.

## Honest gaps and license caveats

- `jon-yablonski/laws-of-ux` is gone (404). Skip it.
- `mailchimp/content-style-guide` (564★) is **CC BY-NC 4.0** — read for ideas,
  NEVER distill its text into our skill.
- `deanhume/typography` (720★) — license NOT verified (no LICENSE file).
  Read-only reference until verified.
- `mmonteiro/designethics` is gone (404); design-ethics bucket otherwise empty.
- Content-design bucket is thin beyond 18F — flagged, not padded.

## Ingest order (proposed)

impeccable → awesome-design-md → beautiful-web-type → 18F/content-guide →
Gesso-Build/skills → principles/Rams. Playbook: clone → digest → distill into
skills/god-tier-designer/SKILL.md, same as the abhinav-skills method.
