# shortkohdz — Design System (MASTER) · Source of Truth

> Corrected from brand source files: `shortkohdz-identity.html`, `index.html`, `work.html`, `corvus.html`.
> This OVERRIDES the auto-generated slate/green recommendation. Do not use OLED-slate or green accent.
> LOGIC: when building a page, check `design-system/pages/[page].md` first; it overrides this file.

## Brand thesis
**"solutions, on dial."** A parent holding company (holdco) shipping ventures across fintech,
commerce, logistics, health & culture. The metaphor is the **USSD asterisk** — the first keystroke
of every shortcode (`*123#`), the moment a person says "I need a direct line to a solution."
Promise: **access first, friction last.** The line that still works when the network drops, the data
is empty, the app is broken.

- Site model: **HYBRID** — holdco-led home (`/`) + separate engineering portfolio (`/engineering`).
- Brand architecture: **endorsement** — each venture keeps its own name/color; parent mark sits quietly
  ("a shortkohdz venture").

## Palette (ink / paper / accent)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0B0F14` | primary background (blue-black) |
| `--ink-2` | `#131820` | raised surfaces / cards |
| `--ink-3` | `#0E131A` | hover surface |
| `--paper` | `#F4F0E8` | warm cream — inverted sections + on-ink text |
| `--paper-2` | `#EBE6DC` | secondary paper |
| `--accent` | `#FF553D` | coral — CTAs, logo core, hover, selection. USE SPARINGLY (it's the "signal") |
| `--accent-soft` | `rgba(255,85,61,.14)` | card glow |
| `--muted` (on ink) | `rgba(244,240,232,.56)` | secondary text on ink |
| `--faint` (on ink) | `rgba(244,240,232,.38)` | tertiary text |
| `--line` | `rgba(244,240,232,.10)` | borders on ink |

**Psychology:** ink = dependable infrastructure / dial tone in the dark (trust, always-on).
paper = the human on the other end (access, honesty, analog). coral core = the connection completing —
the one hot point where help answers. Coral is the ONLY color in the mark; keep it rare.

## Typography (3-font system — semantic split)
- **Sora** (300–700) — headings + body. Tight tracking `-0.035em`/`-0.04em` on display.
- **JetBrains Mono** (400–500) — ALL machine-facts: nav, labels, buttons, chips, status, metrics, USSD strings.
  lowercase or uppercase-tracked. This is what reads as "engineer."
- **Instrument Serif** italic — the editorial/human voice: hero accent words, section display lines, "next" links.

**Rule:** machine-facts → mono; human-thoughts → serif/sans. The type encodes "heavy machine underneath,
human surface on top."

Wordmark: all-lowercase `shortkohdz`, Sora 600, `-0.035em`, never caps, no italic/bold. Reads as command-line syntax.

## The mark
6 tapered arms on 60° increments (= 6 ventures) + single coral core (`r=10`). Drawn asterisk, not the glyph.
18-unit inner safe ring so the core holds at 16px favicon. Rotates 60° on hover. `*shortkohdz#` is the
ticker/dial-string lockup.

## Patterns & motion
- Sticky blurred nav (`backdrop-filter: blur(14px)`, `rgba(11,15,20,.66)`).
- Numbered section headers (`01 · the core`).
- Bento tenet grid (paper section), 3-col venture/project cards with radial coral glow + `translateY(-5px)` on hover.
- Engineering page: sticky dual-row filters (industry pills + stack pills), live count "X / Y systems".
- Detail page: `1.55fr / 1fr` split — narrative blocks + sticky aside (dashed-underline metrics, live/repo links).
- Motion: IntersectionObserver reveals + 70ms stagger; `@view-transition` page nav; murmuration canvas hero
  (flock gathering to a drifting core, mouse repulsion). Easing `cubic-bezier(.22,.61,.36,1)`.
- **Full `prefers-reduced-motion` kill switch** (disable flock + transitions). Non-negotiable.

## 5-second test (the brand must pass)
Identity (asterisk + `*shortkohdz#` + "solutions, on dial") loads BEFORE emotion. Don't make the visitor
work to understand the category. The USSD/telecom association is intentional and reframed — access, not airtime.

## Anti-patterns (do NOT)
- slate `#1E293B` base or green `#22C55E` accent (the auto-rec mistake)
- coral used as a broad fill/background — it's a signal, keep it rare
- emoji icons — SVG only (the drawn mark, Lucide for UI)
- caps wordmark, italic/bold wordmark
- leading with poetry before identity in the hero
