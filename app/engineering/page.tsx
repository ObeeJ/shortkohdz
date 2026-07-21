"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, industries, stacks, STATUS_LABEL, STATUS_DOT } from "../lib/data";
import { TechIcon, StackBadge, primaryStack } from "../components/TechIcon";
import { Mark } from "../components/ui";

const CAPS = [
  {
    k: "concurrent systems",
    h: "Built for load",
    p: "Worker pools, channels, pessimistic locking, idempotency, bloom filters and rate limiters, applied where money, tickets and state cannot be wrong.",
  },
  {
    k: "data & correctness",
    h: "State that holds",
    p: "Temporal stores, audited ledgers, transactional inventory. The boring guarantees that keep a system trustworthy after launch.",
  },
  {
    k: "cloud & infra",
    h: "Ships and scales",
    p: "Terraform, Kubernetes, Docker, AWS. I provision and run what I build, not just write it.",
  },
  {
    k: "full-stack reach",
    h: "End to end",
    p: "Next.js, React, PWAs. Backend is the focus, but I take a product from schema to screen on my own.",
  },
];

export default function Engineering() {
  const [industry, setIndustry] = useState("all");
  const [stack, setStack] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

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
      {/* intro — redesigned hero */}
      <section className="engine-hero">
        <div aria-hidden className="engine-hero-mark">
          <Mark size={540} spin={false} className="spin-slow" />
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="rowhead">
            <span className="num">01</span>
            <h2>the engineering</h2>
          </div>
          <h1
            className="wordmark"
            style={{
              fontSize: "clamp(38px,6.4vw,80px)",
              letterSpacing: "-.035em",
              lineHeight: 0.98,
              marginBottom: 20,
              maxWidth: 880,
            }}
          >
            the machinery{" "}
            <span className="serif accent" style={{ fontWeight: 400 }}>
              behind the dial tone.
            </span>
          </h1>
          <p className="lead" style={{ maxWidth: 620 }}>
            The systems every venture stands on. Payment rails, security,
            ticketing, infrastructure. Mostly Go, some Rust, deliberately
            polyglot. Each one a human problem taken seriously.
          </p>

          <div className="engine-meta mono">
            <span>go · rust</span>
            <span className="engine-sep" />
            <span>typescript · python</span>
            <span className="engine-sep" />
            <span>cka certified</span>
          </div>
        </div>
      </section>

      {/* what i build — portfolio intro */}
      <section
        style={{ padding: "56px 0", borderBottom: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <p className="mono" style={{ color: "var(--accent)", fontSize: 11, letterSpacing: ".14em", marginBottom: 18 }}>
            what i build
          </p>
          <p
            style={{
              fontSize: "clamp(22px,3.4vw,34px)",
              fontWeight: 500,
              letterSpacing: "-.02em",
              lineHeight: 1.12,
              maxWidth: 760,
              marginBottom: 16,
            }}
          >
            Backend systems first.{" "}
            <span className="serif accent" style={{ fontWeight: 400 }}>
              Go for the parts that have to be right.
            </span>
          </p>
          <p className="lead" style={{ maxWidth: 680, marginBottom: 34 }}>
            I build backend-first systems and carry them all the way to
            production. CKA certified. I reach for Go when correctness under
            concurrency matters, and I own the rest of the stack so the thing
            actually ships.
          </p>
          <div className="caps">
            {CAPS.map((cap, i) => (
              <div className="cap" key={cap.k}>
                <div className="cap-top">
                  <span className="cap-no mono">{String(i + 1).padStart(2, "0")}</span>
                  <div className="cap-k mono">{cap.k}</div>
                </div>
                <h3>{cap.h}</h3>
                <p>{cap.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* open source */}
      <section style={{ padding: "56px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <p className="mono" style={{ color: "var(--accent)", fontSize: 11, letterSpacing: ".14em", marginBottom: 18 }}>
            open source
          </p>
          <p style={{ fontSize: "clamp(22px,3.4vw,34px)", fontWeight: 500, letterSpacing: "-.02em", lineHeight: 1.12, maxWidth: 760, marginBottom: 16 }}>
            Contributing to the ecosystem.{" "}
            <span className="serif accent" style={{ fontWeight: 400 }}>
              Real fixes on real projects.
            </span>
          </p>
          <div className="oss-list">
            <a
              href="https://github.com/gofiber/fiber/pull/4552"
              target="_blank"
              rel="noopener noreferrer"
              className="oss-card"
            >
              <div className="oss-top">
                <span className="mono oss-repo">gofiber/fiber</span>
                <span className="mono oss-badge">merged pr</span>
              </div>
              <h3 className="oss-title">Logger middleware — log injection fix</h3>
              <p className="oss-desc">
                Patched a security vulnerability where 15+ user-controlled tag functions
                (path, url, ua, body, headers, cookies…) wrote unsanitized input directly
                to the log buffer. An attacker could inject CRLF sequences to forge log
                lines and evade SIEM detection. Added sanitization helpers matching the
                strategy already used in the core log subsystem.
              </p>
              <div className="oss-meta mono">
                <span className="dot" style={{ background: "var(--accent)" }} />
                Go · security · middleware · #4341 → PR #4552
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* filters — collapsible on mobile, always open on desktop */}
      <div className="filterbar">
        <div className="wrap">
          <div className="filterbar-head">
            <span className="mono filtercount">
              {shown.length} / {projects.length} systems
            </span>
            <button
              type="button"
              className="filter-toggle mono"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((o) => !o)}
            >
              {filtersOpen ? "hide filters" : "filters"}
              {(industry !== "all" || stack !== "all") && (
                <span className="fdot" aria-hidden />
              )}
            </button>
          </div>
          <div className={`filter-rows${filtersOpen ? " open" : ""}`}>
            <FilterRow label="domain" options={industries} value={industry} onPick={setIndustry} />
            <FilterRow label="stack" options={stacks} value={stack} onPick={setStack} />
          </div>
        </div>
      </div>

      {/* grid */}
      <section id="systems" style={{ padding: "46px 0 96px", scrollMarginTop: 80 }}>
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
                  <span className="emark">
                    {(() => {
                      const lead = primaryStack(p.stacks);
                      return lead ? <TechIcon name={lead} size={16} /> : null;
                    })()}
                    {p.tags.includes("Polyglot") && (
                      <span className="chip">poly</span>
                    )}
                  </span>
                </div>
                <h3 className="ename">{p.name}</h3>
                <p className="etl">{p.tagline}</p>
                <div className="est">
                  {p.stacks.slice(0, 4).map((s) => (
                    <StackBadge key={s} name={s} />
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
        .engine-hero { position:relative; overflow:hidden; padding:84px 0 52px; border-bottom:1px solid var(--line); background:radial-gradient(ellipse 60% 70% at 88% 20%, var(--accent-soft), transparent 62%); }
        .engine-hero-mark { position:absolute; top:-40px; right:-120px; color:var(--accent); opacity:.06; pointer-events:none; z-index:0; }
        .engine-meta { margin-top:26px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; color:var(--muted); font-size:11px; }
        .engine-sep { width:5px; height:5px; border-radius:50%; background:var(--accent); display:inline-block; }
        @media(max-width:600px){ .engine-hero-mark{ right:-180px; opacity:.04; } }

        .caps { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
        .cap { background:var(--ink-2); padding:26px 22px; min-height:208px; display:flex; flex-direction:column; transition:background .3s var(--ease), transform .3s var(--ease); }
        .cap:hover { background:var(--ink-3); }
        .cap-top { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:auto; }
        .cap-no { font-size:11px; color:var(--faint); }
        .cap-k { font-size:10px; color:var(--accent); text-transform:uppercase; letter-spacing:.06em; }
        .cap h3 { font-weight:600; font-size:18px; letter-spacing:-.01em; margin:22px 0 9px; }
        .cap p { font-size:13px; color:var(--muted); line-height:1.55; }
        @media(max-width:900px){ .caps{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:520px){ .caps{grid-template-columns:1fr} }

        .filterbar { border-bottom:1px solid var(--line); padding:18px 0; position:sticky; top:62px; background:var(--nav-bg); backdrop-filter:blur(10px); z-index:50; }
        .filterbar-head { display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .filtercount { color:var(--faint); font-size:11px; }
        .filter-toggle { display:none; align-items:center; gap:7px; font-size:11.5px; color:var(--paper); background:var(--ink-2); border:1px solid var(--line); border-radius:20px; padding:8px 16px; cursor:pointer; text-transform:lowercase; }
        .filter-toggle:hover { border-color:var(--accent); color:var(--accent); }
        .filter-toggle .fdot { width:6px; height:6px; border-radius:50%; background:var(--accent); }
        .filter-rows { margin-top:12px; }
        @media(max-width:760px){
          .filterbar-head { margin-bottom:0; }
          .filter-toggle { display:inline-flex; }
          .filter-rows { max-height:0; overflow:hidden; margin-top:0; opacity:0; transition:max-height .32s var(--ease), opacity .24s var(--ease), margin-top .32s var(--ease); }
          .filter-rows.open { max-height:420px; opacity:1; margin-top:14px; }
        }
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
        .emark { display:flex; align-items:center; gap:7px; }
        .est { margin-top:auto; display:flex; flex-wrap:wrap; gap:6px; }
        .est-badge { display:inline-flex; align-items:center; gap:6px; font-family:var(--font-mono),monospace; font-size:10px; color:var(--muted); border:1px solid var(--line); border-radius:5px; padding:4px 8px; line-height:1; }
        .est-badge svg { flex:none; }
        .emore { margin-top:15px; font-size:10px; color:var(--faint); text-transform:uppercase; letter-spacing:.05em; display:flex; align-items:center; gap:6px; }
        .ecard:hover .emore { color:var(--accent); }
        .dot { width:6px; height:6px; border-radius:50%; display:inline-block; }

        .oss-list { display:flex; flex-direction:column; gap:14px; }
        .oss-card { display:block; border:1px solid var(--line); border-radius:16px; background:var(--ink-2); padding:28px 28px 22px; text-decoration:none; color:inherit; transition:transform .25s var(--ease), border-color .25s var(--ease); position:relative; overflow:hidden; }
        .oss-card::before { content:""; position:absolute; inset:0; background:radial-gradient(120% 80% at 0% 0%, var(--accent-soft), transparent 60%); opacity:0; transition:opacity .3s var(--ease); }
        .oss-card:hover { transform:translateY(-4px); border-color:var(--accent); }
        .oss-card:hover::before { opacity:1; }
        .oss-card > * { position:relative; }
        .oss-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .oss-repo { font-size:11px; color:var(--accent); letter-spacing:.06em; }
        .oss-badge { font-size:10px; color:var(--ink); background:var(--accent); border-radius:20px; padding:4px 10px; letter-spacing:.04em; }
        .oss-title { font-weight:600; font-size:20px; letter-spacing:-.015em; margin-bottom:10px; }
        .oss-desc { font-size:13.5px; color:var(--muted); line-height:1.6; margin-bottom:18px; max-width:780px; }
        .oss-meta { font-size:10px; color:var(--faint); text-transform:uppercase; letter-spacing:.05em; display:flex; align-items:center; gap:7px; }
        .oss-card:hover .oss-meta { color:var(--accent); }
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
