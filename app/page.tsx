import Link from "next/link";
import { ventures } from "./lib/data";
import { Mark, Reveal } from "./components/ui";
import { TextRotate } from "@/components/ui/text-rotate";
import { ButtonColorful } from "@/components/ui/button-colorful";

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
  tba: "var(--faint)",
};

export default function Home() {
  return (
    <>
      {/* ---------------- HERO (animated-hero template, on-brand) ---------------- */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid var(--line)",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, var(--accent-soft), transparent 60%), var(--ink)",
        }}
      >
        {/* slowly rotating brand mark behind the headline */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "6%",
            right: "-90px",
            color: "var(--accent)",
            opacity: 0.07,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Mark size={460} spin={false} className="spin-slow" />
        </div>

        <div className="wrap" style={{ width: "100%", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 30,
              padding: "80px 28px",
            }}
          >
            {/* editorial kicker — jumps to the portfolio */}
            <Link href="#ventures" className="mono kicker" aria-label="see the portfolio">
              <span className="kicker-rule" />
              parent company
              <span className="kicker-go" aria-hidden>↘</span>
            </Link>

            {/* headline with rotating word */}
            <h1
              className="wordmark"
              style={{
                fontSize: "clamp(44px,8vw,104px)",
                letterSpacing: "-.04em",
                lineHeight: 0.95,
                maxWidth: 940,
                margin: 0,
              }}
            >
              a short code to something that
              <span
                style={{
                  position: "relative",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  overflow: "hidden",
                  paddingTop: ".1em",
                  paddingBottom: ".15em",
                }}
              >
                <TextRotate
                  texts={["works", "answers", "ships", "scales", "pays"]}
                  mainClassName="text-[var(--accent)] justify-center"
                  splitLevelClassName="overflow-hidden pb-2"
                  staggerFrom="last"
                  staggerDuration={0.025}
                  rotationInterval={2200}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                />
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(15px,2vw,19px)",
                color: "var(--muted)",
                maxWidth: 600,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              One parent company. Many ventures, each a short code to a solution
              that works on the worst day.
            </p>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link href="#ventures">
                <ButtonColorful label="see the ventures" />
              </Link>
            </div>
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

      {/* ---------------- VENTURES (holdco portfolio ledger) ---------------- */}
      <section className="block" id="ventures" style={{ overflow: "hidden" }}>
        {/* rotating brand mark in the background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "-120px",
            color: "var(--accent)",
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Mark size={480} spin={false} className="spin-slow" />
        </div>
        <Reveal className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="rowhead">
            <span className="num">02</span>
            <h2>the portfolio</h2>
          </div>
          <p className="display">
            A portfolio in build.{" "}
            <span className="serif accent">names go on the line when each one ships.</span>
          </p>
          <p className="lead">
            shortkohdz holds and operates each venture end to end. Identities stay
            sealed until a line is live. The work answers first, the name follows.
          </p>

          <div className="vledger">
            {ventures.map((v, i) => (
              <article className="vrow" key={v.id}>
                <span className="vrow-no mono">{String(i + 1).padStart(2, "0")}</span>
                <div className="vrow-main">
                  <span className="vrow-redact" aria-label="undisclosed" />
                  <span className="vrow-sector mono">{v.sector}</span>
                </div>
                <div className="vrow-status mono">
                  <span className="dot" style={{ background: STATUS_TINT[v.status] }} />
                  {v.status === "tba" ? "future" : v.status === "live" ? "live" : "building"}
                </div>
                <Mark className="vrow-mark" size={18} spin={false} />
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <style>{`
        .kicker { display:inline-flex; align-items:center; gap:12px; font-size:11px; letter-spacing:.22em; color:var(--muted); transition:color .2s var(--ease); }
        .kicker-rule { width:26px; height:1px; background:var(--accent); display:inline-block; transition:width .25s var(--ease); }
        .kicker-go { color:var(--accent); opacity:0; transform:translate(-4px,-2px); transition:opacity .2s var(--ease), transform .25s var(--ease); }
        .kicker:hover { color:var(--paper); }
        .kicker:hover .kicker-rule { width:42px; }
        .kicker:hover .kicker-go { opacity:1; transform:translate(0,0); }

        .tenets { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line-d); border:1px solid var(--line-d); border-radius:14px; overflow:hidden; margin-top:46px; }
        .tenet { background:var(--paper); padding:30px 26px; min-height:210px; display:flex; flex-direction:column; transition:background .3s var(--ease); }
        .tenet:hover { background:var(--paper-2); }
        .tenet .k { font-family:var(--font-mono),monospace; font-size:11px; color:var(--accent); text-transform:uppercase; margin-bottom:auto; }
        .tenet h3 { font-weight:500; font-size:20px; letter-spacing:-.01em; margin:26px 0 10px; }
        .tenet p { font-size:14px; color:var(--muted-d); }
        @media(max-width:900px){ .tenets{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:520px){ .tenets{grid-template-columns:1fr} }

        .vledger { margin-top:46px; border-top:1px solid var(--line); }
        .vrow { display:grid; grid-template-columns:48px 1fr 120px 26px; align-items:center; gap:22px; padding:26px 8px; border-bottom:1px solid var(--line); position:relative; transition:background .25s var(--ease), padding-left .25s var(--ease); }
        .vrow-redact { display:block; width:120px; max-width:60%; height:22px; border-radius:6px; background:repeating-linear-gradient(135deg, var(--paper-2), var(--paper-2) 7px, transparent 7px, transparent 13px); opacity:.32; transition:opacity .25s var(--ease), width .25s var(--ease); }
        .vrow:hover .vrow-redact { opacity:.5; width:150px; }
        .vrow::before { content:""; position:absolute; left:0; top:0; bottom:0; width:2px; background:var(--accent); transform:scaleY(0); transform-origin:top; transition:transform .3s var(--ease); }
        .vrow:hover { background:var(--ink-2); padding-left:18px; }
        .vrow:hover::before { transform:scaleY(1); }
        .vrow-no { color:var(--faint); font-size:12px; }
        .vrow-name { font-size:clamp(22px,2.6vw,32px); letter-spacing:-.02em; line-height:1; }
        .vrow-sector { display:block; color:var(--accent); font-size:10px; text-transform:uppercase; letter-spacing:.06em; margin-top:8px; }
        .vrow-desc { font-size:14px; color:var(--muted); line-height:1.55; }
        .vrow-status { display:flex; align-items:center; gap:8px; color:var(--muted); font-size:11px; }
        .vrow-mark { color:var(--faint); opacity:0; transition:opacity .25s var(--ease), color .25s var(--ease); }
        .vrow:hover .vrow-mark { opacity:1; color:var(--accent); }
        .dot { width:6px; height:6px; border-radius:50%; display:inline-block; flex:none; }
        @media(max-width:760px){
          .vrow { grid-template-columns:36px 1fr auto; row-gap:10px; }
          .vrow-mark { display:none; }
        }
      `}</style>
    </>
  );
}
