#!/usr/bin/env node
/**
 * Mobile overflow audit. Loads each route at phone/tablet widths and reports
 * any element that extends past the viewport (excluding decorative SVG internals
 * and fixed-position UI), so clipped layouts are caught even though the page
 * itself hides horizontal scroll.
 *
 *   node scripts/mobile-audit.js [baseUrl=http://localhost:3030]
 * Needs playwright (set PLAYWRIGHT_PATH to its location if not resolvable).
 */
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const base = process.argv[2] || "http://localhost:3030";
const widths = [360, 375, 390, 768];
const routes = ["/", "/about", "/engineering", "/engineering/dwelix", "/engineering/mydigitalparents", "/guestbook"];

(async () => {
  const browser = await chromium.launch();
  let bad = 0;
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: w < 700, hasTouch: w < 700 });
    for (const route of routes) {
      const page = await ctx.newPage();
      await page.goto(base + route + "?welcome", { waitUntil: "load" });
      await page.waitForTimeout(6200); // welcome overlay + entrance animations
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(60); }
      await page.waitForTimeout(500);
      const r = await page.evaluate((vw) => {
        const out = [];
        document.querySelectorAll("main *").forEach((el) => {
          if (el.closest("svg") && el.tagName.toLowerCase() !== "svg") return;
          if (el.closest(".hero-parallax-mark, .eh-mark, [aria-hidden='true']")) return;
          const b = el.getBoundingClientRect();
          if (!b.width || b.right <= vw + 2 || getComputedStyle(el).position === "fixed") return;
          let a = el.parentElement, clipped = false;
          while (a && a !== document.body) { const o = getComputedStyle(a).overflowX; if (o === "hidden" || o === "auto" || o === "scroll") { clipped = true; break; } a = a.parentElement; }
          if (!clipped) out.push(el.tagName.toLowerCase() + "." + String(el.className && el.className.baseVal === undefined ? el.className : "").split(" ")[0] + " right=" + Math.round(b.right));
        });
        const tiny = [...document.querySelectorAll("main a, main button")].filter((e) => { const b = e.getBoundingClientRect(); return b.width && b.height && b.height < 30; }).length;
        return { out: [...new Set(out)].slice(0, 6), tiny };
      }, w);
      const ok = r.out.length === 0;
      if (!ok) bad++;
      console.log((ok ? "PASS " : "FAIL ") + w + " " + route + (ok ? "" : "  " + r.out.join(" | ")) + (r.tiny ? `  [${r.tiny} small tap targets]` : ""));
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  process.exit(bad ? 1 : 0);
})();
