"use client";

import Link from "next/link";
import { Mark } from "../components/ui";

/*
  Five design-forward hero variants for shortkohdz.
  Informed by frontend-design (bold, distinctive, anti-"AI slop") +
  ui-ux-pro-max (OLED-dark, monochrome + single accent, strong type scale,
  150-300ms transitions, reduced-motion respect, 4.5:1 contrast).
  Distinctive display faces loaded per-variant; coral accent reused from the
  existing ink/paper system (--accent).
*/

const TAG = "the workshop of Ajayi ObaniJesu, the engineer who answers when you dial.";
const SUB =
  "Backend-leaning full-stack engineer in Lagos. I build systems in Go that stay correct under load, then ship the full stack around them.";
const STACK = ["Go", "TypeScript", "Postgres", "Redis", "gRPC", "Docker", "Next.js", "Kafka"];

function Tag({ n, name }: { n: string; name: string }) {
  return (
    <div
      className="mono"
      style={{
        position: "absolute", top: 18, left: 18, zIndex: 9, fontSize: 11,
        letterSpacing: ".2em", color: "var(--accent)", border: "1px solid var(--line)",
        borderRadius: 999, padding: "6px 12px", background: "rgba(0,0,0,.4)", backdropFilter: "blur(6px)",
      }}
    >
      VARIANT {n} · {name}
    </div>
  );
}

function CTAs({ center = false }: { center?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 13, flexWrap: "wrap", justifyContent: center ? "center" : "flex-start" }}>
      <Link className="btn btn-acc" href="/engineering">see the work <span className="arr">→</span></Link>
      <a className="btn btn-ghost" href="https://github.com/ObeeJ" target="_blank" rel="noopener">github</a>
    </div>
  );
}

/* 1 · EDITORIAL — magazine masthead, big serif, hairline rules */
function Editorial() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 28px", borderBottom: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)" }}>
      <Tag n="1" name="EDITORIAL" />
      <div className="wrap" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid var(--ink)", paddingBottom: 14, marginBottom: 4 }} className="mono">
          <span style={{ fontSize: 12, letterSpacing: ".3em" }}>EST. LAGOS</span>
          <span style={{ fontSize: 12, letterSpacing: ".3em" }}>NO. 01 — 2026</span>
        </div>
        <div style={{ borderBottom: "1px solid var(--ink)", paddingBottom: 26, marginBottom: 26 }}>
          <h1 className="serif" style={{ fontWeight: 500, lineHeight: 0.9, fontSize: "clamp(56px,13vw,180px)", letterSpacing: "-.03em", margin: "18px 0 0" }}>
            short<span style={{ fontStyle: "italic", color: "var(--accent)" }}>kohdz</span>
          </h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, alignItems: "start" }}>
          <p className="serif" style={{ fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1.35, fontStyle: "italic" }}>{TAG}</p>
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted-d)", marginBottom: 24 }}>{SUB}</p>
            <CTAs />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2 · BRUTALIST MONO GRID — boxed cells, coordinates, raw borders */
function Brutalist() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "60px 28px", borderBottom: "1px solid var(--line)", background: "var(--ink)" }}>
      <Tag n="2" name="BRUTALIST" />
      <div className="wrap mono" style={{ width: "100%", border: "1px solid var(--line-2)" }}>
        {[
          ["NAME", "AJAYI OBANIJESU"],
          ["ROLE", "BACKEND-LEANING FULL-STACK ENGINEER"],
          ["BASE", "LAGOS, NIGERIA — UTC+1"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", borderBottom: "1px solid var(--line-2)" }}>
            <div style={{ padding: "14px 16px", borderRight: "1px solid var(--line-2)", color: "var(--accent)", fontSize: 12 }}>{k}</div>
            <div style={{ padding: "14px 16px", fontSize: 13, color: "var(--muted)" }}>{v}</div>
          </div>
        ))}
        <div style={{ padding: "30px 16px", borderBottom: "1px solid var(--line-2)" }}>
          <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(40px,8vw,104px)", letterSpacing: "-.04em", lineHeight: 0.9, color: "var(--paper)" }}>SHORTKOHDZ</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid var(--line-2)" }}>
          {STACK.map((s) => (
            <span key={s} style={{ padding: "10px 16px", borderRight: "1px solid var(--line-2)", fontSize: 12, color: "var(--muted)" }}>{s}</span>
          ))}
        </div>
        <div style={{ padding: "16px" }}><CTAs /></div>
      </div>
    </section>
  );
}

/* 3 · KINETIC MARQUEE — giant name + infinite scrolling stack strip */
function Kinetic() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", borderBottom: "1px solid var(--line)", background: "var(--ink)" }}>
      <Tag n="3" name="KINETIC" />
      <style>{`
        @keyframes skz-marq { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .skz-track { display:inline-flex; gap:0; animation: skz-marq 22s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce){ .skz-track{ animation: none } }
        .skz-track span { font-family: var(--font-sans); font-weight:800; font-size: clamp(48px,11vw,150px); letter-spacing:-.04em; padding:0 .35em; line-height:1; }
      `}</style>
      <div className="wrap" style={{ marginBottom: 30, display: "flex", alignItems: "center", gap: 16 }}>
        <Mark size={40} spin />
        <span className="mono" style={{ fontSize: 12, letterSpacing: ".3em", color: "var(--accent)" }}>BACKEND · GO · LAGOS</span>
      </div>
      <div style={{ whiteSpace: "nowrap", maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
        <div className="skz-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ color: i % 2 ? "var(--accent)" : "var(--paper)" }}>
              shortkohdz — solutions on dial — shortkohdz — solutions on dial —&nbsp;
            </span>
          ))}
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 34, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 30, flexWrap: "wrap" }}>
        <p style={{ fontSize: "clamp(15px,1.9vw,19px)", color: "var(--muted)", maxWidth: 520 }}>{TAG} {SUB}</p>
        <CTAs />
      </div>
    </section>
  );
}

/* 4 · INDEX / DIRECTORY — numbered listing, calm and structured */
function IndexDir() {
  const rows = [
    ["01", "shortkohdz", "the parent workshop"],
    ["02", "backend systems", "Go services correct under load"],
    ["03", "full stack", "the product shipped around them"],
    ["04", "based in", "Lagos, Nigeria"],
  ];
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "60px 28px", borderBottom: "1px solid var(--line)", background: "var(--ink)" }}>
      <Tag n="4" name="INDEX" />
      <div className="wrap" style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 44 }}>
          <Mark size={34} spin />
          <h1 className="wordmark" style={{ fontSize: "clamp(36px,6vw,76px)", letterSpacing: "-.03em" }}>the index</h1>
          <span className="mono" style={{ marginLeft: "auto", fontSize: 12, color: "var(--faint)" }}>A. OBANIJESU</span>
        </div>
        {rows.map(([n, h, p]) => (
          <div key={n} className="skz-row" style={{ display: "grid", gridTemplateColumns: "70px 1fr 1.2fr", gap: 20, alignItems: "center", padding: "22px 8px", borderTop: "1px solid var(--line)", transition: "background .2s, padding-left .2s" }}>
            <span className="mono accent" style={{ fontSize: 13 }}>{n}</span>
            <span className="wordmark" style={{ fontSize: "clamp(20px,2.4vw,30px)", letterSpacing: "-.02em" }}>{h}</span>
            <span style={{ fontSize: 15, color: "var(--muted)" }}>{p}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 30, marginTop: 8 }}><CTAs /></div>
      </div>
      <style>{`.skz-row:hover{ background:var(--ink-2); padding-left:18px } @media (prefers-reduced-motion: reduce){ .skz-row{ transition:none } }`}</style>
    </section>
  );
}

/* 5 · SPOTLIGHT — refined minimal, animated coral glow, centered */
function Spotlight() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderBottom: "1px solid var(--line)", background: "var(--ink)" }}>
      <Tag n="5" name="SPOTLIGHT" />
      <style>{`
        @keyframes skz-pulse { 0%,100%{ opacity:.55; transform:translate(-50%,-50%) scale(1) } 50%{ opacity:.9; transform:translate(-50%,-50%) scale(1.12) } }
        .skz-glow{ position:absolute; top:42%; left:50%; width:min(120vw,1100px); aspect-ratio:1; border-radius:50%; background:radial-gradient(circle, var(--accent-soft), transparent 62%); animation: skz-pulse 7s ease-in-out infinite; pointer-events:none; }
        @media (prefers-reduced-motion: reduce){ .skz-glow{ animation:none } }
        .skz-up{ opacity:0; transform:translateY(18px); animation: skz-rise .7s cubic-bezier(.22,.61,.36,1) forwards; }
        @keyframes skz-rise { to { opacity:1; transform:none } }
      `}</style>
      <div className="skz-glow" aria-hidden />
      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <div className="skz-up" style={{ animationDelay: ".0s", display: "flex", justifyContent: "center", marginBottom: 28 }}><Mark size={60} spin /></div>
        <h1 className="wordmark skz-up" style={{ animationDelay: ".08s", fontSize: "clamp(52px,10vw,130px)", letterSpacing: "-.045em", lineHeight: 0.95, marginBottom: 22 }}>shortkohdz</h1>
        <p className="skz-up serif accent" style={{ animationDelay: ".16s", fontSize: "clamp(18px,2.4vw,26px)", maxWidth: 640, margin: "0 auto 16px", fontStyle: "italic" }}>{TAG}</p>
        <p className="skz-up" style={{ animationDelay: ".24s", fontSize: "clamp(14px,1.8vw,17px)", color: "var(--muted)", maxWidth: 560, margin: "0 auto 36px" }}>{SUB}</p>
        <div className="skz-up" style={{ animationDelay: ".32s" }}><CTAs center /></div>
      </div>
    </section>
  );
}

export default function Heroes2() {
  return (
    <main>
      <Editorial />
      <Brutalist />
      <Kinetic />
      <IndexDir />
      <Spotlight />
    </main>
  );
}
