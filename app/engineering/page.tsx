"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, industries, stacks, STATUS_LABEL, STATUS_DOT } from "../lib/data";

export default function Engineering() {
  const [industry, setIndustry] = useState("all");
  const [stack, setStack] = useState("all");

  const shown = useMemo(
    () =>
      projects.filter((p) => {
        const okI = industry === "all" || p.industry === industry;
        const okS = stack === "all" || p.stacks.includes(stack);
        return okI && okS;
      }),
    [industry, stack]
  );

  return (
    <>
      {/* intro */}
      <section style={{ padding: "72px 0 40px", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="rowhead">
            <span className="num">*</span>
            <h2>the engineering</h2>
          </div>
          <h1
            className="wordmark"
            style={{
              fontSize: "clamp(36px,6vw,72px)",
              letterSpacing: "-.03em",
              lineHeight: 1,
              marginBottom: 18,
            }}
          >
            the machinery{" "}
            <span className="serif accent" style={{ fontWeight: 400 }}>
              behind the dial tone.
            </span>
          </h1>
          <p className="lead" style={{ maxWidth: 620 }}>
            The systems the ventures stand on — payment rails, security, ticketing,
            infrastructure. Mostly Go, some Rust, most polyglot. Each one a human
            problem taken seriously.
          </p>
        </div>
      </section>

      {/* filters */}
      <div
        style={{
          borderBottom: "1px solid var(--line)",
          padding: "22px 0",
          position: "sticky",
          top: 62,
          background: "rgba(11,15,20,.92)",
          backdropFilter: "blur(10px)",
          zIndex: 50,
        }}
      >
        <div className="wrap">
          <FilterRow label="domain" options={industries} value={industry} onPick={setIndustry} />
          <FilterRow label="stack" options={stacks} value={stack} onPick={setStack} />
          <div
            className="mono"
            style={{ color: "var(--faint)", marginTop: 14, fontSize: 11 }}
          >
            {shown.length} / {projects.length} systems
          </div>
        </div>
      </div>

      {/* grid */}
      <section style={{ padding: "46px 0 96px" }}>
        <div className="wrap">
          <div className="egrid">
            {shown.map((p) => (
              <Link
                key={p.id}
                href={`/engineering/${p.id}`}
                className="ecard"
                style={{ viewTransitionName: `card-${p.id}` }}
              >
                <div className="etop">
                  <span className="eind mono">{p.industry}</span>
                  <span style={{ display: "flex", gap: 5 }}>
                    {p.go && <span className="chip go">Go</span>}
                    {p.tags.includes("Polyglot") && <span className="chip">Poly</span>}
                  </span>
                </div>
                <h3 className="ename">{p.name}</h3>
                <p className="etl">{p.tagline}</p>
                <div className="est">
                  {p.stacks.slice(0, 4).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="emore mono">
                  <span
                    className="dot"
                    style={{ background: STATUS_DOT[p.status] || "var(--accent)" }}
                  />
                  {STATUS_LABEL[p.status] || p.status} · read the build →
                </div>
              </Link>
            ))}
          </div>
          {shown.length === 0 && (
            <p className="mono" style={{ color: "var(--muted)", marginTop: 20 }}>
              no systems match that filter.
            </p>
          )}
        </div>
      </section>

      <style>{`
        .egrid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        @media(max-width:980px){ .egrid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:600px){ .egrid{grid-template-columns:1fr} }
        .ecard { border:1px solid var(--line); border-radius:16px; background:var(--ink-2); padding:26px; display:flex; flex-direction:column; min-height:236px; position:relative; overflow:hidden; transition:transform .25s var(--ease), border-color .25s var(--ease); }
        .ecard::before { content:""; position:absolute; inset:0; background:radial-gradient(120% 80% at 0% 0%, var(--accent-soft), transparent 60%); opacity:0; transition:opacity .3s var(--ease); }
        .ecard:hover { transform:translateY(-5px); border-color:var(--accent); }
        .ecard:hover::before { opacity:1; }
        .ecard > * { position:relative; }
        .etop { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .eind { font-size:10px; color:var(--accent); text-transform:uppercase; letter-spacing:.06em; }
        .chip { font-family:var(--font-mono),monospace; font-size:9px; color:var(--ink); background:var(--paper-2); border-radius:5px; padding:3px 7px; letter-spacing:.04em; }
        .chip.go { background:#00ADD8; }
        .ename { font-weight:600; font-size:24px; letter-spacing:-.02em; margin-bottom:8px; }
        .etl { font-size:13.5px; color:var(--muted); margin-bottom:18px; }
        .est { margin-top:auto; display:flex; flex-wrap:wrap; gap:6px; }
        .est span { font-family:var(--font-mono),monospace; font-size:10px; color:var(--muted); border:1px solid var(--line); border-radius:5px; padding:4px 8px; }
        .emore { margin-top:15px; font-size:10px; color:var(--faint); text-transform:uppercase; letter-spacing:.05em; display:flex; align-items:center; gap:6px; }
        .ecard:hover .emore { color:var(--accent); }
        .dot { width:6px; height:6px; border-radius:50%; display:inline-block; }
      `}</style>
    </>
  );
}

function FilterRow({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: string[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        flexWrap: "wrap",
        marginBottom: 12,
      }}
    >
      <span
        className="mono"
        style={{ color: "var(--faint)", fontSize: 10, width: 56, flexShrink: 0 }}
      >
        {label}
      </span>
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            onClick={() => onPick(o)}
            aria-pressed={active}
            className="mono"
            style={{
              fontSize: 11.5,
              border: "1px solid " + (active ? "var(--accent)" : "var(--line)"),
              borderRadius: 20,
              padding: "7px 14px",
              color: active ? "var(--ink)" : "var(--muted)",
              background: active ? "var(--accent)" : "transparent",
              textTransform: "lowercase",
              fontWeight: active ? 500 : 400,
              transition: "all .15s var(--ease)",
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
