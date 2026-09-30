"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Two ways in": the same task done two ways, side by side.
 * Left, the usual route: find an app, install it, sign up, verify, log in.
 * Right, the direct route: dial a short code, pick an option, done.
 * It acts out the philosophy behind the work: access first, friction last.
 * No brand marks; the idea should read without knowing whose it is.
 */

const STEPS = [
  { label: "Find the app", tag: "needs a smartphone" },
  { label: "Download and install it", tag: "needs data" },
  { label: "Create an account", tag: "needs an email" },
  { label: "Verify your number", tag: "needs an SMS code" },
  { label: "Log in", tag: "needs a password" },
];

const CODE = ["*", "1", "2", "3", "#"];
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

const STEP_MS = 1300; // one usual-way step
const LOOP_MS = 11000;
const TYPE_START = 700;
const TYPE_MS = 340;

export function TwoWaysIn() {
  const [t, setT] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setT(LOOP_MS - 500);
      return;
    }
    if (!inView) return;
    const start = performance.now() - t;
    const id = window.setInterval(() => setT((performance.now() - start) % LOOP_MS), 80);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced]);

  // usual way: which step is in progress, and how many are complete
  const active = Math.min(STEPS.length, Math.floor(t / STEP_MS));
  const usualDone = active >= STEPS.length;

  // direct way: keys typed, then send, menu, choice, done
  const typeEnd = TYPE_START + CODE.length * TYPE_MS;
  const typed = Math.max(0, Math.min(CODE.length, Math.floor((t - TYPE_START) / TYPE_MS) + 1));
  const sent = t >= typeEnd + 300;
  const menu = t >= typeEnd + 900;
  const chose = t >= typeEnd + 1700;
  const directDone = t >= typeEnd + 2200;
  const pressed = t < typeEnd && typed > 0 ? CODE[typed - 1] : chose && !directDone ? "1" : "";

  const screen = directDone
    ? ["✓ Done", "Balance sent"]
    : menu
      ? ["1  Send", "2  Balance", "3  Help"]
      : sent
        ? ["Connecting…"]
        : [CODE.slice(0, typed).join("") || "Dial a code"];

  return (
    <div className="tw" ref={root}>
      <div className="tw-head">
        <div className="tw-title mono">
          <span className="skd-live-dot" />
          two ways in
        </div>
        <div className="tw-sub mono">the task: check your balance</div>
      </div>

      <div className="tw-grid">
        {/* usual way */}
        <section className={`tw-panel${usualDone ? " ran" : ""}`} aria-label="The usual way">
          <div className="tw-label mono">the usual way</div>
          <ol className="tw-steps">
            {STEPS.map((s, i) => {
              const state = i < active ? "done" : i === active ? "now" : "todo";
              return (
                <li key={s.label} className={`tw-step ${state}`}>
                  <span className="tw-n mono">{state === "done" ? "✓" : i + 1}</span>
                  <span className="tw-text">
                    {s.label}
                    <em className="mono">{s.tag}</em>
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="tw-foot">
            <span className="tw-count mono">
              <b>{Math.min(active + (usualDone ? 0 : 1), STEPS.length)}</b> / {STEPS.length} steps
            </span>
            <span className="tw-chips mono">
              <i>smartphone</i>
              <i>data</i>
              <i>account</i>
            </span>
          </div>
        </section>

        {/* direct way */}
        <section className={`tw-panel direct${directDone ? " won" : ""}`} aria-label="The direct way">
          <div className="tw-label mono">the direct way</div>
          <div className="tw-phone-wrap">
            <div className="tw-phone" aria-hidden>
              <div className="tw-screen mono">
                {screen.map((l, i) => (
                  <div key={l + i} className={l.startsWith("✓") ? "ok" : ""}>
                    {l}
                    {i === screen.length - 1 && !directDone && !menu && !sent && <span className="tw-caret" />}
                  </div>
                ))}
              </div>
              <div className="tw-keys">
                {KEYS.map((k) => (
                  <span key={k} className={`tw-key mono${pressed === k ? " on" : ""}`}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <ol className="tw-mini mono">
              <li className={typed > 0 ? "on" : ""}>Dial a short code</li>
              <li className={chose ? "on" : ""}>Pick an option</li>
              <li className={directDone ? "on ok" : ""}>Done</li>
            </ol>
          </div>
          <div className="tw-foot">
            <span className="tw-count mono">
              <b>{chose ? 2 : typed > 0 ? 1 : 0}</b> / 2 steps
            </span>
            <span className="tw-chips mono good">
              <i>any phone</i>
              <i>no data</i>
              <i>no account</i>
            </span>
          </div>
        </section>
      </div>

      <p className="tw-note">
        <strong>Access first. Friction last.</strong>{" "}
        The best interface is the one nobody has to learn, install or sign
        up for. That is the standard I build to: reach the person first, remove every barrier that isn&apos;t the problem
        itself.
      </p>

      <style>{`
        .tw { border:1px solid var(--line-strong); background:var(--ink-2); margin:40px 0 0; overflow:hidden; }
        .tw-head { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:12px 18px; border-bottom:1px solid var(--line); }
        .tw-title { display:flex; align-items:center; gap:10px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
        .tw-sub { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); }
        .tw-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); background:var(--line); gap:1px; }
        .tw-panel { background:var(--ink); padding:22px; display:flex; flex-direction:column; min-width:0; transition:box-shadow .4s var(--ease); }
        .tw-panel.won { box-shadow:inset 0 0 0 1px #3ddc84; }
        .tw-label { font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--accent); margin-bottom:16px; }
        .tw-panel.direct .tw-label { color:#3ddc84; }

        .tw-steps { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; flex:1; }
        .tw-step { display:flex; align-items:flex-start; gap:12px; opacity:.62; transition:opacity .35s var(--ease); }
        .tw-step.now, .tw-step.done { opacity:1; }
        .tw-n { flex:none; width:26px; height:26px; display:grid; place-items:center; border:1px solid var(--line-strong); font-size:11px; color:var(--muted); transition:all .3s var(--ease); }
        .tw-step.now .tw-n { border-color:var(--accent); color:var(--accent); animation:tw-pulse 1s ease-in-out infinite; }
        .tw-step.done .tw-n { background:var(--ink-3); color:var(--paper); }
        .tw-text { display:flex; flex-direction:column; gap:2px; font-size:14px; color:var(--paper); min-width:0; }
        .tw-text em { font-style:normal; font-size:10px; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); }
        .tw-step.now .tw-text em, .tw-step.done .tw-text em { color:var(--accent); }

        .tw-phone-wrap { display:flex; align-items:center; gap:22px; flex:1; min-width:0; }
        .tw-phone { flex:none; width:132px; border:1px solid var(--line-strong); border-radius:18px; background:var(--ink-2); padding:10px; }
        .tw-screen { min-height:62px; padding:8px; border:1px solid var(--line); background:var(--ink); font-size:11px; line-height:1.55; color:var(--paper); margin-bottom:10px; }
        .tw-screen .ok { color:#3ddc84; }
        .tw-caret { display:inline-block; width:6px; height:11px; margin-left:2px; background:var(--accent); vertical-align:-1px; animation:tw-blink .9s steps(2) infinite; }
        .tw-keys { display:grid; grid-template-columns:repeat(3,1fr); gap:5px; }
        .tw-key { display:grid; place-items:center; height:22px; font-size:10px; color:var(--muted); background:var(--ink); border:1px solid var(--line); transition:all .12s; }
        .tw-key.on { background:var(--accent); color:#050711; border-color:var(--accent); transform:scale(.94); }
        .tw-mini { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:12px; font-size:12px; color:var(--faint); letter-spacing:.03em; }
        .tw-mini li { display:flex; align-items:center; gap:10px; transition:color .3s; }
        .tw-mini li::before { content:""; width:8px; height:8px; border-radius:50%; border:1px solid var(--line-strong); transition:all .3s; }
        .tw-mini li.on { color:var(--paper); }
        .tw-mini li.on::before { background:var(--accent); border-color:var(--accent); }
        .tw-mini li.ok { color:#3ddc84; }
        .tw-mini li.ok::before { background:#3ddc84; border-color:#3ddc84; }

        .tw-foot { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-top:18px; padding-top:14px; border-top:1px solid var(--line); }
        .tw-count { font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--faint); }
        .tw-count b { font-size:20px; letter-spacing:-.02em; color:var(--paper); font-weight:500; margin-right:2px; }
        .tw-panel.direct .tw-count b { color:#3ddc84; }
        .tw-chips { display:flex; gap:6px; flex-wrap:wrap; }
        .tw-chips i { font-style:normal; font-size:10.5px; letter-spacing:.06em; text-transform:uppercase; padding:5px 9px; border:1px solid var(--line-strong); color:var(--muted); }
        .tw-chips i::before { content:"✕ "; color:var(--accent); }
        .tw-chips.good i { text-decoration:none; border-color:#3ddc84; color:#3ddc84; }
        .tw-chips.good i::before { content:"✓ "; color:inherit; }
        .tw-note { margin:0; padding:18px 22px; border-top:1px solid var(--line); background:var(--ink-2); font-size:14px; line-height:1.6; color:var(--muted); max-width:none; }
        .tw-note strong { color:var(--paper); font-weight:600; }

        @keyframes tw-pulse { 0%,100% { box-shadow:0 0 0 0 rgba(255,85,61,.5) } 50% { box-shadow:0 0 0 5px rgba(255,85,61,0) } }
        @keyframes tw-blink { 50% { opacity:0 } }
        @media (max-width:760px) {
          .tw-grid { grid-template-columns:minmax(0,1fr); }
          .tw-panel { padding:18px; }
          .tw-phone-wrap { gap:16px; }
          .tw-phone { width:120px; }
          .tw-note { padding:16px 18px; font-size:13.5px; }
        }
        @media (prefers-reduced-motion: reduce) { .tw *, .tw { animation:none !important; transition:none !important; } }
      `}</style>
    </div>
  );
}
