# shortkohdz

**solutions, on dial.** A holdco site shipping ventures across fintech, commerce, logistics, health & culture — plus a separate engineering portfolio.

The metaphor is the USSD asterisk (`*123#`): the first keystroke of every shortcode, a direct line to a solution. Promise — **access first, friction last.**

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **Framer Motion 12**
- **Bun** runtime

## Design

Ink / paper / coral editorial system — source of truth in [`design-system/shortkohdz/MASTER.md`](design-system/shortkohdz/MASTER.md).

- **Ink** `#0B0F14` infrastructure · **paper** `#F4F0E8` the human · **coral** `#FF553D` the signal (used sparingly)
- 3-font split: **Sora** (display/body), **JetBrains Mono** (machine-facts), **Instrument Serif** (human voice)
- Murmuration canvas hero, filterable engineering portfolio, full `prefers-reduced-motion` support

## Develop

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
```

## Structure

```
app/
  page.tsx                  holdco home
  engineering/page.tsx      portfolio (filterable)
  engineering/[slug]/       project detail
  components/ui.tsx          shared UI + flock hero
  lib/data.ts                data layer
design-system/              MASTER.md — design source of truth
_brand-src/                 brand reference HTML
```
