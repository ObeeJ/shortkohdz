import Link from "next/link";
import { ventures } from "./lib/data";
import { Mark, Reveal } from "./components/ui";
import { Hero3D } from "./components/Hero3D";

const TENETS = [
  {
    k: "the line",
    h: "a direct path to a solution",
    p: "Type a short code and you reach what you need. We took that idea, the dial tone that still answers, and made it the way we build.",
  },
  {
    k: "access first",
    h: "works on the worst day",
    p: "When the network drops, the data is empty, the app is broken, a shortcode still answers. Every venture is built to that standard.",
  },
  {
    k: "friction last",
    h: "heavy underneath, simple on top",
    p: "Ledgers, rails, redundancy, infrastructure. The hard engineering stays out of sight so what people touch stays simple.",
  },
  {
    k: "one family",
    h: "a parent that endorses",
    p: "Each venture keeps its own name and colour. shortkohdz is the quiet author in the footer, six arms today, room for more.",
  },
];

const STATUS_TINT: Record<string, string> = {
  live: "#3dd7c0",
  building: "#FF553D",
  tba: "rgba(244,240,232,.38)",
};

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <Hero3D />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 64% 56% at 50% 46%, transparent, var(--ink) 90%)",
          }}
        />
        <div
          className="wrap"
          style={{ position: "relative", zIndex: 2, width: "100%", padding: "60px 28px" }}
        >
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: ".32em",
              color: "var(--accent)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Mark size={20} spin={false} /> parent · holdco · 2026
          </div>
          <h1
            className="wordmark"
            style={{
              letterSpacing: "-.04em",
              lineHeight: 0.98,
              fontSize: "clamp(48px,9.5vw,118px)",
              marginBottom: 24,
            }}
          >
            solutions,
            <br />
            <span className="serif accent" style={{ fontWeight: 400 }}>
              on dial.
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(16px,2.2vw,20px)",
              color: "var(--muted)",
              maxWidth: 580,
              marginBottom: 38,
            }}
          >
            A parent company shipping ventures across fintech, commerce,
            logistics, health and culture. The direct line to a solution, the one
            that still works when nothing else will.
          </p>
          <div style={{ display: "flex", gap: 13, flexWrap: "wrap" }}>
            <Link className="btn btn-acc" href="#ventures">
              the ventures <span className="arr">→</span>
            </Link>
            <Link className="btn btn-ghost" href="/engineering">
              the engineering
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- THESIS (paper) ---------------- */}
      <section className="block paper" id="idea">
        <Reveal className="wrap">
          <div className="rowhead">
            <span className="num">01</span>
            <h2>the thesis</h2>
          </div>
          <p className="display">
            Type a short code and you reach what you{" "}
            <span className="accent">need</span>. shortkohdz exists to be that
            line, scaled.
          </p>
          <p className="lead">
            access first, friction last, across every venture in the family.
          </p>
          <div className="tenets">
            {TENETS.map((t) => (
              <div className="tenet" key={t.k}>
                <div className="k">{t.k}</div>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- VENTURES ---------------- */}
      <section className="block" id="ventures">
        <Reveal className="wrap">
          <div className="rowhead">
            <span className="num">02</span>
            <h2>the family</h2>
          </div>
          <p className="display">
            Six directions.{" "}
            <span className="serif accent">each a direct path to a real problem.</span>
          </p>
          <p className="lead">
            Every venture keeps its own identity and colour. The parent mark sits
            as a quiet endorsement, never a takeover.
          </p>
          <div className="vgrid">
            {ventures.map((v) => (
              <article className="vcard" key={v.id}>
                <div className="vtop">
                  <span className="micro-mark">
                    <Mark size={16} spin={false} />
                  </span>
                  <span className="mono" style={{ color: "var(--faint)" }}>
                    a shortkohdz venture
                  </span>
                </div>
                <h3 className="vname">{v.name}</h3>
                <div
                  className="mono"
                  style={{ color: "var(--accent)", fontSize: 10, marginBottom: 14 }}
                >
                  {v.sector}
                </div>
                <p className="vdesc">{v.desc}</p>
                <div className="vstatus mono">
                  <span
                    className="dot"
                    style={{ background: STATUS_TINT[v.status] }}
                  />
                  {v.status === "tba"
                    ? "future"
                    : v.status === "live"
                    ? "live"
                    : "building"}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <style>{`
        .tenets { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line-d); border:1px solid var(--line-d); border-radius:14px; overflow:hidden; margin-top:46px; }
        .tenet { background:var(--paper); padding:30px 26px; min-height:210px; display:flex; flex-direction:column; transition:background .3s var(--ease); }
        .tenet:hover { background:var(--paper-2); }
        .tenet .k { font-family:var(--font-mono),monospace; font-size:11px; color:var(--accent); text-transform:uppercase; margin-bottom:auto; }
        .tenet h3 { font-weight:500; font-size:20px; letter-spacing:-.01em; margin:26px 0 10px; }
        .tenet p { font-size:14px; color:var(--muted-d); }
        @media(max-width:900px){ .tenets{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:520px){ .tenets{grid-template-columns:1fr} }

        .vgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:46px; }
        @media(max-width:980px){ .vgrid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:600px){ .vgrid{grid-template-columns:1fr} }
        .vcard { border:1px solid var(--line); border-radius:16px; background:var(--ink-2); padding:26px; display:flex; flex-direction:column; min-height:236px; position:relative; overflow:hidden; transition:transform .25s var(--ease), border-color .25s var(--ease); }
        .vcard::before { content:""; position:absolute; inset:0; background:radial-gradient(120% 80% at 0% 0%, var(--accent-soft), transparent 60%); opacity:0; transition:opacity .3s var(--ease); }
        .vcard:hover { transform:translateY(-5px); border-color:var(--accent); }
        .vcard:hover::before { opacity:1; }
        .vcard > * { position:relative; }
        .vtop { display:flex; align-items:center; gap:9px; margin-bottom:20px; }
        .micro-mark { color:var(--accent); display:flex; }
        .vname { font-weight:600; font-size:26px; letter-spacing:-.02em; margin-bottom:4px; }
        .vdesc { font-size:13.5px; color:var(--muted); margin-bottom:18px; }
        .vstatus { margin-top:auto; display:flex; align-items:center; gap:8px; color:var(--muted); font-size:10px; }
        .dot { width:6px; height:6px; border-radius:50%; display:inline-block; }
      `}</style>
    </>
  );
}
