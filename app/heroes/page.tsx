"use client";

import Link from "next/link";
import { Mark } from "../components/ui";
import { Hero3D } from "../components/Hero3D";

/* Small label so you can tell the variants apart while choosing */
function Tag({ n, name }: { n: string; name: string }) {
  return (
    <div
      className="mono"
      style={{
        position: "absolute",
        top: 18,
        left: 18,
        zIndex: 5,
        fontSize: 11,
        letterSpacing: ".2em",
        color: "var(--accent)",
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: "6px 12px",
        background: "var(--ink-2)",
      }}
    >
      VARIANT {n} · {name}
    </div>
  );
}

const TAG = "the workshop of Ajayi ObaniJesu, the engineer who answers when you dial.";
const SUB =
  "Backend-leaning full-stack engineer in Lagos. I build systems in Go that stay correct under load, then ship the full stack around them. Like a shortcode: a small, direct line to something that just works.";

/* ---------------- A · SPLIT LEFT/RIGHT ---------------- */
function VariantSplit() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <Tag n="A" name="SPLIT" />
      <div
        className="wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr .9fr",
          gap: 40,
          alignItems: "center",
          width: "100%",
          padding: "60px 28px",
        }}
      >
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--accent)", marginBottom: 22 }}>
            BACKEND · GO · LAGOS
          </div>
          <h1 className="wordmark" style={{ letterSpacing: "-.04em", lineHeight: 0.95, fontSize: "clamp(44px,7vw,96px)", marginBottom: 22 }}>
            shortkohdz
          </h1>
          <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "var(--accent)", maxWidth: 540, marginBottom: 14 }}>{TAG}</p>
          <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "var(--muted)", maxWidth: 520, marginBottom: 34 }}>{SUB}</p>
          <div style={{ display: "flex", gap: 13, flexWrap: "wrap" }}>
            <Link className="btn btn-acc" href="/engineering">see the work <span className="arr">→</span></Link>
            <a className="btn btn-ghost" href="https://github.com/ObeeJ" target="_blank" rel="noopener">github</a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ filter: "drop-shadow(0 0 60px var(--accent-soft))" }}>
            <Mark size={260} spin />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- B · BIG TYPE, NO 3D ---------------- */
function VariantBigType() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
        background: "var(--ink)",
      }}
    >
      <Tag n="B" name="BIG TYPE" />
      <div className="wrap" style={{ width: "100%", padding: "60px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <Mark size={30} spin={false} />
          <span className="mono" style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--muted)" }}>
            AJAYI OBANIJESU · LAGOS, NG
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            letterSpacing: "-.05em",
            lineHeight: 0.86,
            fontSize: "clamp(60px,16vw,220px)",
            margin: 0,
            textTransform: "lowercase",
          }}
        >
          short<span className="accent">kohdz</span>
        </h1>
        <div style={{ height: 1, background: "var(--line)", margin: "34px 0 28px", maxWidth: 680 }} />
        <p style={{ fontSize: "clamp(15px,1.9vw,19px)", color: "var(--muted)", maxWidth: 640, marginBottom: 34 }}>
          {TAG} {SUB}
        </p>
        <div style={{ display: "flex", gap: 13, flexWrap: "wrap" }}>
          <Link className="btn btn-acc" href="/engineering">see the work <span className="arr">→</span></Link>
          <a className="btn btn-ghost" href="https://github.com/ObeeJ" target="_blank" rel="noopener">github</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- C · TERMINAL / DIAL ---------------- */
function VariantTerminal() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
        background: "var(--ink)",
      }}
    >
      <Tag n="C" name="TERMINAL" />
      <div className="wrap" style={{ width: "100%", padding: "60px 28px" }}>
        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 14,
            background: "var(--ink-2)",
            maxWidth: 720,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,.4)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>
            <span style={{ width: 11, height: 11, borderRadius: 999, background: "#FF553D" }} />
            <span style={{ width: 11, height: 11, borderRadius: 999, background: "#f4c04d" }} />
            <span style={{ width: 11, height: 11, borderRadius: 999, background: "#3dd7c0" }} />
            <span className="mono" style={{ fontSize: 11, color: "var(--faint)", marginLeft: 8 }}>~/shortkohdz</span>
          </div>
          <div className="mono" style={{ padding: "26px 24px", fontSize: "clamp(13px,1.6vw,15px)", lineHeight: 1.9 }}>
            <div style={{ color: "var(--muted)" }}><span className="accent">$</span> dial shortkohdz</div>
            <div style={{ color: "var(--faint)" }}>◆ connecting…</div>
            <div style={{ color: "var(--accent)", marginTop: 10 }}>✓ Ajayi ObaniJesu // backend-leaning full-stack engineer</div>
            <div style={{ color: "var(--muted)" }}>  location : Lagos, NG</div>
            <div style={{ color: "var(--muted)" }}>  stack    : Go · TypeScript · Postgres</div>
            <div style={{ color: "var(--muted)", marginTop: 10 }}>  {SUB}</div>
            <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-acc" href="/engineering">$ see-work <span className="arr">→</span></Link>
              <a className="btn btn-ghost" href="https://github.com/ObeeJ" target="_blank" rel="noopener">$ github</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- D · KEEP 3D, RESTYLED ---------------- */
function Variant3D() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <Tag n="D" name="3D RESTYLED" />
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Hero3D />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent, var(--ink) 88%)",
        }}
      />
      <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%", padding: "60px 28px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 26 }}>
          <Mark size={56} spin />
        </div>
        <h1 className="wordmark" style={{ letterSpacing: "-.04em", lineHeight: 0.98, fontSize: "clamp(48px,9vw,118px)", marginBottom: 20 }}>
          shortkohdz
        </h1>
        <p style={{ fontSize: "clamp(16px,2.2vw,21px)", color: "var(--accent)", maxWidth: 600, margin: "0 auto 14px" }}>{TAG}</p>
        <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "var(--muted)", maxWidth: 560, margin: "0 auto 34px" }}>{SUB}</p>
        <div style={{ display: "flex", gap: 13, flexWrap: "wrap", justifyContent: "center" }}>
          <Link className="btn btn-acc" href="/engineering">see the work <span className="arr">→</span></Link>
          <a className="btn btn-ghost" href="https://github.com/ObeeJ" target="_blank" rel="noopener">github</a>
        </div>
      </div>
    </section>
  );
}

export default function HeroPreview() {
  return (
    <main>
      <VariantSplit />
      <VariantBigType />
      <VariantTerminal />
      <Variant3D />
    </main>
  );
}
