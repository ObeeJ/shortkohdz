"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mark } from "./ui";

/**
 * Welcome curtain, shown once per session.
 *
 * It must never trap a visitor, so the exit does not depend on JavaScript:
 * the overlay carries a CSS animation that lifts it away after ~3.8s on its
 * own. JavaScript only makes it better: it updates the status text, lets a
 * click / key press / swipe skip early, and unmounts the node afterwards.
 * A tiny inline script in the document head (see layout.tsx) marks returning
 * visitors with data-welcome="seen", which hides the overlay before first
 * paint, so it never flashes again during the same session.
 */

const STATUS: [number, string][] = [
  [0, "OPENING LINE"],
  [30, "DIALING *SHORTKOHDZ#"],
  [62, "CONNECTED"],
  [90, "READY"],
];

const DURATION = 3300; // progress bar runs this long
const EXIT_AT = 3700; // JS-driven lift; CSS fallback fires at 3.9s

export function WelcomeIntro() {
  const [gone, setGone] = useState(false);
  const [out, setOut] = useState(false);
  const [pct, setPct] = useState(0);
  const done = useRef(false);

  const leave = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setOut(true);
    try {
      sessionStorage.setItem("skd_welcome_seen", "1");
    } catch {}
    window.setTimeout(() => setGone(true), 800);
  }, []);

  useEffect(() => {
    const seen = document.documentElement.dataset.welcome === "seen";
    if (seen) return; // hidden by CSS before first paint; nothing to run
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 900 : DURATION;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / total) * 100);
      setPct(Math.floor(p));
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const exit = window.setTimeout(leave, reduce ? 1200 : EXIT_AT);
    const onKey = () => leave();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exit);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [leave]);

  // release scroll the moment the curtain starts lifting
  useEffect(() => {
    if (out) document.body.style.overflow = "";
  }, [out]);

  if (gone) return null;

  const status = [...STATUS].reverse().find(([at]) => pct >= at)?.[1] ?? STATUS[0][1];

  return (
    <div className="wl" data-out={out ? "1" : undefined} onClick={leave} onTouchMove={leave} role="dialog" aria-label="Welcome" aria-live="polite">
      <div className="wl-grid" aria-hidden />
      <div className="wl-center">
        <div className="wl-mark" aria-hidden>
          <Mark size={92} />
        </div>
        <div className="wl-name">shortkohdz</div>
        <div className="wl-dial mono" aria-hidden>
          <span className="wl-type">*SHORTKOHDZ#</span>
        </div>
        <div className="wl-tag">solutions, on dial.</div>
      </div>

      <div className="wl-foot">
        <div className="wl-bar" aria-hidden>
          <i />
        </div>
        <div className="wl-status mono">
          <span>{status}</span>
          <span>{String(pct).padStart(3, "0")}%</span>
        </div>
        <button type="button" className="wl-skip mono" onClick={leave}>
          skip →
        </button>
      </div>

      <style>{`
        .wl { position:fixed; inset:0; z-index:9999999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#080B11; color:#F8FAFC; overflow:hidden; cursor:pointer; user-select:none;
              animation:wl-out .75s cubic-bezier(.76,0,.24,1) 3.9s both; }
        .wl[data-out] { animation-delay:0s; }
        html[data-welcome="seen"] .wl { display:none !important; }
        @keyframes wl-out { to { transform:translateY(-100%); visibility:hidden; pointer-events:none; } }

        .wl-grid { position:absolute; inset:0; opacity:.5; background-image:linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size:48px 48px; mask-image:radial-gradient(ellipse 60% 55% at 50% 48%, #000 30%, transparent 75%); animation:wl-fade 1s ease both; }
        .wl-center { position:relative; display:flex; flex-direction:column; align-items:center; text-align:center; gap:14px; padding:24px; }

        .wl-mark { color:#F8FAFC; animation:wl-bloom 1s cubic-bezier(.16,1,.3,1) .1s both; filter:drop-shadow(0 0 28px rgba(255,85,61,.35)); }
        .wl-mark svg .core { fill:#FF553D; }
        .wl-name { font-size:clamp(34px,9vw,58px); font-weight:700; letter-spacing:-.045em; line-height:1; animation:wl-up .7s cubic-bezier(.16,1,.3,1) .45s both; }
        .wl-dial { margin-top:6px; font-size:clamp(13px,3.6vw,16px); letter-spacing:.2em; color:#FF553D; }
        .wl-type { display:inline-block; overflow:hidden; white-space:nowrap; vertical-align:bottom; width:12ch; border-right:2px solid #FF553D; animation:wl-typing .9s steps(12) .95s both, wl-caret .7s steps(2) 1.85s infinite; }
        .wl-tag { font-family:var(--font-instrument), serif; font-style:italic; font-size:clamp(18px,4.6vw,24px); color:#94A3B8; animation:wl-up .7s cubic-bezier(.16,1,.3,1) 1.6s both; }

        .wl-foot { position:absolute; left:0; right:0; bottom:0; display:flex; flex-direction:column; align-items:center; gap:10px; padding:0 24px calc(28px + env(safe-area-inset-bottom)); }
        .wl-bar { width:min(280px,72vw); height:2px; background:rgba(255,255,255,.12); overflow:hidden; }
        .wl-bar i { display:block; height:100%; width:100%; background:#FF553D; box-shadow:0 0 12px rgba(255,85,61,.8); transform-origin:0 50%; animation:wl-fill ${DURATION}ms cubic-bezier(.4,0,.2,1) .2s both; }
        .wl-status { display:flex; justify-content:space-between; width:min(280px,72vw); font-size:10px; letter-spacing:.14em; color:#94A3B8; }
        .wl-skip { margin-top:6px; padding:12px 18px; min-height:44px; background:none; border:0; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:#64748B; cursor:pointer; animation:wl-fade .6s ease 1s both; }
        .wl-skip:hover { color:#FF553D; }

        @keyframes wl-bloom { from { opacity:0; transform:scale(.55) rotate(-70deg); } to { opacity:1; transform:none; } }
        @keyframes wl-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes wl-fade { from { opacity:0; } to { opacity:1; } }
        @keyframes wl-typing { from { width:0; } to { width:12ch; } }
        @keyframes wl-caret { 50% { border-color:transparent; } }
        @keyframes wl-fill { from { transform:scaleX(0); } to { transform:scaleX(1); } }

        @media (prefers-reduced-motion: reduce) {
          .wl { animation-duration:.01s; animation-delay:1.4s; }
          .wl[data-out] { animation-delay:0s; }
          .wl *, .wl-grid { animation-duration:.01s !important; animation-delay:0s !important; }
        }
      `}</style>
    </div>
  );
}
