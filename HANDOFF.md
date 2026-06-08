# shortkohdz-v2 — Session Handoff

_Last updated: 2026-06-08_

## Stack
Next.js 16 (Turbopack) · React 19 · Tailwind CSS v4 · Framer Motion / `motion` · TypeScript · bun.
Dev: `bun run dev` (or `npx next dev`). Build verified green (`npx next build`, 17 routes).

## Brand system
- Tokens in `app/globals.css`. **Light is the default theme; `.dark` class flips every token.**
  Token names keep their meaning (`--ink` = page surface, `--paper` = text/fg) and their *values*
  flip per theme — so the dark-first inline styles work in both modes without rewrites.
- Tailwind v4 class-dark enabled via `@custom-variant dark (&:where(.dark, .dark *))`.
- Theme persisted to `localStorage('skd-theme')`; no-flash init script in `app/layout.tsx`
  (`<html class="dark">` default). Toggle: `components/ui/animated-theme-toggler.tsx` (in the nav).
- Fonts: Sora (sans/wordmark), JetBrains Mono (mono), Instrument Serif (display/serif).
- `.brandmark` = coral→paper gradient-text class for the `shortkohdz` lockup (nav).

## What was done this session
- Real **light/dark mode** (tokens, custom-variant, toggler, no-flash script, body transition).
- New components in `components/ui/`: `animated-theme-toggler`, `button-colorful`, `liquid-glass`
  (glass button later removed from use — see below), `text-rotate`, `button`.
- **Home (`app/page.tsx`)**: rotating brand mark behind hero + portfolio (`.spin-slow`, 26s);
  hero copy shortened, no em-dashes; single `ButtonColorful` CTA → `#ventures`;
  editorial kicker is now a link to `#ventures` with hover rule + `↘` cue.
- **Portfolio is intentionally UNDISCLOSED**: venture names/descriptions removed, replaced with
  hatched `.vrow-redact` bars; only sector + status shown. Copy: "A portfolio in build…".
  Data still lives in `app/lib/data.ts` (`ventures`) — re-expose names there when ready.
- **Engineering (`app/engineering/page.tsx`)**: redesigned "the engineering" hero (rotating mark,
  coral radial, tech-meta strip); "what i build" copy dropped YOE + "AWS in progress"; cap cards
  numbered; filterbar background tokenized (`var(--nav-bg)`) so it isn't dark in light mode.
- **Footer (`app/components/ui.tsx`)**: large-name treatment. Big `shortkohdz` = solid coral (light)
  / solid paper (dark), `.dark .bigname`. Link columns + brand blurb.
- **Nav**: active-tab underline fixed (only the real route underlines, not `/#` anchors).

## Known / deferred
- `liquid-glass.tsx` + `GlassFilter` still mounted in `layout.tsx` but the glass button was removed
  (it opened a new tab and read as low-value). Safe to keep or delete the unused import.
- `app/heroes/`, `app/heroes2/`, `app/component-demo/` are scratch/demo routes.
- Portfolio: unhide venture names when ready (revert the redaction in the `ventures.map` of `page.tsx`).

## Next ideas
- Light-mode pass on the "thesis" `section.paper` block (currently inverts to a dark panel —
  intentional contrast, but confirm it's wanted).
- Verify visually in a browser (no Chrome was available for Playwright in the session).
