"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  projects,
  STATUS_LABEL,
  STATUS_DOT,
  aiProjectIds,
  aiProjectNotes,
  aiWork,
  aiCapabilities,
} from "../lib/data";
import { TechIcon, StackBadge, primaryStack } from "../components/TechIcon";
import { Mark } from "../components/ui";
import { SocialLinks } from "../components/SocialLinks";

/* Live products (have a hero screenshot) come first; everything else is "systems & tools". */
const live = projects.filter((p) => p.shot);
const rest = projects.filter((p) => !p.shot);

const LANGS = ["Go", "Rust", "TypeScript", "Python", ".NET", "Cloud/IaC"];

const STATS = [
  { n: String(live.length), l: "live products" },
  { n: String(projects.length), l: "case studies" },
  { n: "4", l: "production languages" },
  { n: "CKA", l: "certified" },
];

const NAV = [
  ["live", "in production"],
  ["ai", "ai engineering"],
  ["systems", "systems & tools"],
  ["oss", "open source"],
] as const;

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
    p: "Terraform, Kubernetes, Docker, AWS and GCP. I provision and run what I build, not just write it.",
  },
  {
    k: "full-stack reach",
    h: "End to end",
    p: "Next.js, React, PWAs. Backend is the focus, but I take a product from schema to screen.",
  },
];

const OSS = [
  {
    repo: "gofiber/fiber",
    badge: "merged / closed",
    title: "Logger middleware: log injection fix",
    desc: "Patched a vulnerability where 15+ user-controlled tag functions (path, url, ua, body, headers, cookies…) wrote unsanitized input to the log buffer, letting attackers forge log entries with CRLF sequences. Also fixed sub-second expiration flooring in the fixed-window limiter and RFC 9110 HEAD handling.",
    meta: "Go · security · middleware · PR #4552 / #4571 / #4572 / #4576",
    href: "https://github.com/gofiber/fiber/pull/4552",
  },
  {
    repo: "hashicorp/go-retryablehttp",
    badge: "active pr",
    title: "Weak PRNG seed in retry jitter backoff",
    desc: "LinearJitterBackoff reseeded a fresh rand.Source from the wall-clock nanosecond on every call, so concurrent callers in a thundering herd landed on identical seeds and synchronized backoffs. Replaced it with crypto/rand and a package-level generator, with concurrent regression tests.",
    meta: "Go · concurrency · distributed retries · PR #301",
    href: "https://github.com/hashicorp/go-retryablehttp/pull/301",
  },
  {
    repo: "gin-gonic/gin",
    badge: "active pr",
    title: "Context initFormCache multipart parse error coverage",
    desc: "Test coverage for the multipart parser's error branches, validating deterministic error bubbling and preventing silent parameter drops during malformed payload ingestion.",
    meta: "Go · HTTP runtime · test coverage · PR #4775",
    href: "https://github.com/gin-gonic/gin/pull/4775",
  },
  {
    repo: "go-resty/resty",
    badge: "active pr",
    title: "Preserve trailing slash in SetBaseURL",
    desc: "Fixed URL concatenation in SetBaseURL to preserve trailing slashes, keeping strict compatibility with REST endpoints that enforce trailing-slash semantics without triggering 301/308 redirects.",
    meta: "Go · HTTP client · URL routing · PR #1191",
    href: "https://github.com/go-resty/resty/pull/1191",
  },
];

function SectionHead({ num, label, title, accent, lead }: { num: string; label: string; title: string; accent: string; lead?: string }) {
  return (
    <header className="sh">
      <div className="rowhead">
        <span className="num">{num}</span>
        <h2>{label}</h2>
      </div>
      <p className="sh-title">
        {title} <span className="serif accent">{accent}</span>
      </p>
      {lead && <p className="lead sh-lead">{lead}</p>}
    </header>
  );
}

export default function Engineering() {
  const [lang, setLang] = useState("all");
  const [spy, setSpy] = useState<string>("live");

  const counts = useMemo(
    () => Object.fromEntries(LANGS.map((l) => [l, rest.filter((p) => p.stacks.includes(l)).length])),
    []
  );
  const shown = useMemo(() => rest.filter((p) => lang === "all" || p.stacks.includes(lang)), [lang]);

  // highlight the section currently in view in the sticky sub-nav
  useEffect(() => {
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setSpy(hit.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* 01 · hero */}
      <section className="eh">
        <div aria-hidden data-parallax="0.35" className="eh-mark">
          <Mark size={540} spin={false} className="spin-slow" />
        </div>
        <div className="wrap eh-inner">
          <div className="rowhead">
            <span className="num">01</span>
            <h2>the engineering</h2>
          </div>
          <h1 className="wordmark eh-title">
            the machinery <span className="serif accent">behind the dial tone.</span>
          </h1>
          <p className="lead eh-lead">
            The systems everything else stands on: payment rails, security, ticketing, infrastructure and AI. Mostly Go,
            with TypeScript, Python and Rust where they fit. Each one a human problem taken seriously.
          </p>
          <dl className="stat-strip">
            {STATS.map((s) => (
              <div key={s.l}>
                <dt className="mono">{s.l}</dt>
                <dd>{s.n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* sticky in-page nav */}
      <nav className="subnav" aria-label="Sections">
        <div className="wrap subnav-in">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`mono${spy === id ? " on" : ""}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* 02 · live products */}
      <section id="live" className="es">
        <div className="wrap">
          <SectionHead
            num="02"
            label="in production"
            title="Products real people use."
            accent="Live today."
            lead="Each one is running in production. Open the live site, or read how it was built."
          />
          <div className="live-grid">
            {live.map((p) => (
              <article className="lv" key={p.id}>
                <div className="lv-shot">
                  <img src={p.shot} alt={`${p.name} homepage`} loading="lazy" />
                  {p.favicon && <img className="lv-ico" src={p.favicon} alt="" width={26} height={26} />}
                  <span className="mono lv-live">
                    <i /> live
                  </span>
                </div>
                <div className="lv-body">
                  <div className="mono lv-ind">{p.industry}</div>
                  <h3 className="lv-name">
                    <Link href={`/engineering/${p.id}`} className="lv-link">
                      {p.name}
                    </Link>
                  </h3>
                  {p.role && <div className="mono lv-role">{p.role}</div>}
                  <p className="lv-tag">{p.tagline}</p>
                  {p.metrics?.[0] && <div className="mono lv-metric">{p.metrics[0]}</div>}
                  <div className="est">
                    {p.stacks.slice(0, 4).map((s) => (
                      <StackBadge key={s} name={s} />
                    ))}
                  </div>
                </div>
                {p.socials && p.socials.length > 0 && (
                  <div className="lv-soc">
                    <SocialLinks socials={p.socials} />
                  </div>
                )}
                <div className="lv-foot mono">
                  <Link href={`/engineering/${p.id}`}>case study →</Link>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                      view live ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · approach */}
      <section className="es es-alt">
        <div className="wrap">
          <SectionHead
            num="03"
            label="how i build"
            title="Backend systems first."
            accent="Go for the parts that have to be right."
            lead="Backend-first systems carried all the way to production. Correctness under concurrency is the recurring theme, and I own the rest of the stack so the thing actually ships."
          />
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

      {/* 04 · ai engineering */}
      <section id="ai" className="es">
        <div className="wrap">
          <SectionHead
            num="04"
            label="ai engineering"
            title="Models are a component."
            accent="The system around them is the job."
            lead="I integrate LLMs into production backends the same way I build everything else: typed boundaries, retries, cost awareness and failure handling first, prompts second."
          />
          <div className="ai-tags mono">
            {aiCapabilities.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>

          <h3 className="mono sub-label">shipped with ai inside</h3>
          <div className="ai-grid">
            {aiProjectIds.map((id) => {
              const p = projects.find((x) => x.id === id);
              if (!p) return null;
              return (
                <Link key={id} href={`/engineering/${id}`} className="ai-card">
                  <span className="mono ai-k">{p.industry}</span>
                  <h4>{p.name}</h4>
                  <p>{aiProjectNotes[id]}</p>
                  <div className="est">
                    {p.stacks.slice(0, 3).map((s) => (
                      <StackBadge key={s} name={s} />
                    ))}
                  </div>
                  <span className="mono ai-more">read the build →</span>
                </Link>
              );
            })}
          </div>

          <h3 className="mono sub-label">hands-on &amp; local</h3>
          <div className="ai-grid">
            {aiWork.map((w) => (
              <div key={w.h} className="ai-card static">
                <span className="mono ai-k">{w.k}</span>
                <h4>{w.h}</h4>
                <p>{w.p}</p>
                <div className="ai-tags mono" style={{ marginTop: "auto" }}>
                  {w.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · systems & tools */}
      <section id="systems" className="es es-alt">
        <div className="wrap">
          <SectionHead
            num="05"
            label="systems & tools"
            title="Everything else I've built,"
            accent="in Go, Rust, TypeScript and Python."
            lead="Client platforms, engines and tools. Filter by language."
          />
          <div className="filter" role="group" aria-label="Filter by language">
            <button type="button" className="mono chip-f" aria-pressed={lang === "all"} onClick={() => setLang("all")}>
              all <b>{rest.length}</b>
            </button>
            {LANGS.filter((l) => counts[l] > 0).map((l) => (
              <button key={l} type="button" className="mono chip-f" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l} <b>{counts[l]}</b>
              </button>
            ))}
          </div>

          <div className="egrid">
            {shown.map((p) => {
              const lead = primaryStack(p.stacks);
              return (
                <Link key={p.id} href={`/engineering/${p.id}`} className="sc">
                  <div className="sc-top">
                    <span className="mono sc-ind">{p.industry}</span>
                    <span className="sc-mark">
                      {p.logo && <img src={p.logo} alt="" />}
                      {lead && <TechIcon name={lead} size={16} />}
                    </span>
                  </div>
                  <h3 className="sc-name">{p.name}</h3>
                  {p.role && <div className="mono sc-role">{p.role}</div>}
                  <p className="sc-tag">{p.tagline}</p>
                  <div className="est">
                    {p.stacks.slice(0, 4).map((s) => (
                      <StackBadge key={s} name={s} />
                    ))}
                  </div>
                  <div className="mono sc-more">
                    <span className="dot" style={{ background: STATUS_DOT[p.status] || "var(--accent)" }} />
                    {STATUS_LABEL[p.status] || p.status} · read the build →
                  </div>
                </Link>
              );
            })}
          </div>
          {shown.length === 0 && <p className="mono" style={{ color: "var(--muted)", marginTop: 20 }}>nothing matches that filter.</p>}
        </div>
      </section>

      {/* 06 · open source */}
      <section id="oss" className="es">
        <div className="wrap">
          <SectionHead
            num="06"
            label="open source"
            title="Contributing to the ecosystem."
            accent="Real fixes on real projects."
            lead="Security and correctness fixes to the Go libraries that half the internet's backends depend on."
          />
          <div className="oss-list">
            {OSS.map((o) => (
              <a key={o.href} href={o.href} target="_blank" rel="noopener noreferrer" className="oss-card">
                <div className="oss-top">
                  <span className="mono oss-repo">{o.repo}</span>
                  <span className="mono oss-badge">{o.badge}</span>
                </div>
                <h3 className="oss-title">{o.title}</h3>
                <p className="oss-desc">{o.desc}</p>
                <div className="oss-meta mono">
                  <span className="dot" style={{ background: "var(--accent)" }} />
                  {o.meta}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ---- shared section rhythm ---- */
        .es { padding:96px 0; border-bottom:1px solid var(--line); scroll-margin-top:120px; }
        .es-alt { background:var(--ink-2); }
        .sh { margin-bottom:44px; }
        .sh .rowhead { margin-bottom:22px; }
        .sh-title { font-size:clamp(26px,3.8vw,42px); font-weight:500; letter-spacing:-.03em; line-height:1.08; max-width:800px; margin:0 0 14px; }
        .sh-lead { max-width:640px; margin:0; }
        .sub-label { margin:40px 0 14px; font-size:10.5px; color:var(--faint); text-transform:uppercase; letter-spacing:.12em; font-weight:400; }
        @media(max-width:700px){ .es { padding:64px 0; } .sh { margin-bottom:32px; } }

        /* ---- hero ---- */
        .eh { position:relative; overflow:hidden; padding:96px 0 0; border-bottom:1px solid var(--line); background:radial-gradient(ellipse 60% 70% at 88% 20%, var(--accent-soft), transparent 62%); }
        .eh-mark { position:absolute; top:-40px; right:-120px; color:var(--accent); opacity:.06; pointer-events:none; z-index:0; }
        .eh-inner { position:relative; z-index:1; }
        .eh-title { font-size:clamp(38px,6.4vw,80px); letter-spacing:-.035em; line-height:.98; margin:0 0 22px; max-width:900px; }
        .eh-lead { max-width:640px; margin:0 0 44px; }
        .stat-strip { display:grid; grid-template-columns:repeat(4,1fr); margin:0; border-top:1px solid var(--line); }
        .stat-strip > div { padding:22px 0 26px; border-right:1px solid var(--line); padding-left:24px; }
        .stat-strip > div:first-child { padding-left:0; }
        .stat-strip > div:last-child { border-right:0; }
        .stat-strip dt { font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--faint); margin-bottom:6px; }
        .stat-strip dd { margin:0; font-size:clamp(26px,3vw,38px); letter-spacing:-.03em; font-weight:500; }
        @media(max-width:700px){ .eh { padding-top:72px; } .stat-strip{ grid-template-columns:repeat(2,1fr); } .stat-strip > div:nth-child(2){ border-right:0; } .stat-strip > div:nth-child(3){ padding-left:0; border-top:1px solid var(--line);} .stat-strip > div:nth-child(4){ border-top:1px solid var(--line);} .eh-mark{ right:-200px; opacity:.04; } }

        /* ---- sticky sub-nav ---- */
        .subnav { position:sticky; top:76px; z-index:55; background:var(--nav-bg); backdrop-filter:blur(16px); border-bottom:1px solid var(--line-strong); }
        .subnav-in { display:flex; gap:6px; overflow-x:auto; padding-top:10px; padding-bottom:10px; scrollbar-width:none; }
        .subnav-in::-webkit-scrollbar { display:none; }
        .subnav a { flex:none; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); padding:7px 14px; border:1px solid transparent; transition:color .2s, border-color .2s, background .2s; }
        .subnav a:hover { color:var(--paper); }
        .subnav a.on { color:var(--accent); border-color:var(--accent); }

        /* ---- live products ---- */
        .live-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media(max-width:1080px){ .live-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:660px){ .live-grid { grid-template-columns:1fr; } }
        .lv { position:relative; display:flex; flex-direction:column; border:1px solid var(--line); border-radius:16px; background:var(--ink-2); overflow:hidden; transition:transform .25s var(--ease), border-color .25s var(--ease); }
        .lv:hover { transform:translateY(-5px); border-color:var(--accent); }
        .lv-shot { position:relative; aspect-ratio:16/9.4; overflow:hidden; border-bottom:1px solid var(--line); background:var(--ink); }
        .lv-shot > img:first-child { width:100%; height:100%; object-fit:cover; object-position:top; transition:transform .5s var(--ease); }
        .lv:hover .lv-shot > img:first-child { transform:scale(1.04); }
        .lv-ico { position:absolute; left:14px; bottom:12px; border-radius:6px; background:#fff; padding:2px; object-fit:contain; box-shadow:0 4px 14px rgba(0,0,0,.4); }
        .lv-live { position:absolute; right:12px; top:12px; display:flex; align-items:center; gap:6px; font-size:9.5px; text-transform:uppercase; letter-spacing:.08em; color:#fff; background:rgba(5,7,17,.72); padding:4px 9px; border-radius:20px; backdrop-filter:blur(6px); }
        .lv-live i { width:6px; height:6px; border-radius:50%; background:#3ddc84; }
        .lv-body { display:flex; flex-direction:column; padding:22px 24px 18px; flex:1; }
        .lv-ind { font-size:10px; color:var(--accent); text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
        .lv-name { font-weight:600; font-size:24px; letter-spacing:-.02em; margin:0 0 4px; }
        .lv-link::after { content:""; position:absolute; inset:0; z-index:1; }
        .lv-role { font-size:10.5px; color:var(--muted); letter-spacing:.03em; margin-bottom:12px; }
        .lv-tag { font-size:13.5px; line-height:1.55; color:var(--muted); margin:0 0 14px; }
        .lv-metric { font-size:10.5px; color:var(--paper); border-left:2px solid var(--accent); padding:4px 0 4px 10px; margin-bottom:16px; line-height:1.5; }
        .lv .est { margin-top:auto; }
        .lv-soc { padding:0 24px 16px; }
        .lv-foot { position:relative; z-index:2; display:flex; justify-content:space-between; gap:12px; padding:14px 24px; border-top:1px solid var(--line); font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; }
        .lv-foot a { color:var(--muted); transition:color .2s; }
        .lv-foot a:last-child { color:var(--accent); }
        .lv-foot a:hover { color:var(--paper); }

        /* touch devices: comfortable tap targets */
        @media (pointer: coarse) {
          .lv-foot a { display:inline-flex; align-items:center; min-height:40px; }
          .subnav a { display:inline-flex; align-items:center; min-height:40px; }
          .chip-f { min-height:40px; }
        }

        /* ---- approach ---- */
        .caps { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
        .cap { background:var(--ink); padding:26px 22px; min-height:208px; display:flex; flex-direction:column; transition:background .3s var(--ease); }
        .cap:hover { background:var(--ink-3); }
        .cap-top { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:auto; }
        .cap-no { font-size:11px; color:var(--faint); }
        .cap-k { font-size:10px; color:var(--accent); text-transform:uppercase; letter-spacing:.06em; }
        .cap h3 { font-weight:600; font-size:18px; letter-spacing:-.01em; margin:22px 0 9px; }
        .cap p { font-size:13px; color:var(--muted); line-height:1.55; margin:0; }
        @media(max-width:900px){ .caps{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:520px){ .caps{grid-template-columns:1fr} }

        /* ---- ai ---- */
        .ai-tags { display:flex; flex-wrap:wrap; gap:8px; font-size:10.5px; }
        .ai-tags span { border:1px solid var(--line); padding:5px 10px; color:var(--muted); text-transform:uppercase; letter-spacing:.06em; }
        .ai-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        @media(max-width:900px){ .ai-grid{grid-template-columns:1fr} }
        .ai-card { display:flex; flex-direction:column; gap:10px; border:1px solid var(--line); border-radius:16px; background:var(--ink-2); padding:24px; text-decoration:none; color:inherit; min-height:210px; transition:transform .25s var(--ease), border-color .25s var(--ease); }
        .es-alt .ai-card { background:var(--ink); }
        .ai-card:not(.static):hover { transform:translateY(-4px); border-color:var(--accent); }
        .ai-card h4 { font-weight:600; font-size:20px; letter-spacing:-.015em; margin:0; }
        .ai-card p { font-size:13.5px; color:var(--muted); line-height:1.55; margin:0; }
        .ai-k { font-size:10px; color:var(--accent); text-transform:uppercase; letter-spacing:.06em; }
        .ai-more { margin-top:auto; font-size:10px; color:var(--faint); text-transform:uppercase; letter-spacing:.05em; }
        .ai-card:hover .ai-more { color:var(--accent); }

        /* ---- systems & tools ---- */
        .filter { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px; }
        .chip-f { font-size:11px; padding:8px 14px; border:1px solid var(--line-strong); background:var(--ink); color:var(--paper); text-transform:uppercase; letter-spacing:.06em; cursor:pointer; transition:all .15s var(--ease); }
        .chip-f b { font-weight:400; color:var(--faint); margin-left:6px; }
        .chip-f[aria-pressed="true"] { background:var(--accent); border-color:var(--accent); color:#050711; }
        .chip-f[aria-pressed="true"] b { color:#050711; opacity:.7; }
        .egrid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        @media(max-width:980px){ .egrid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:600px){ .egrid{grid-template-columns:1fr} }
        .sc { display:flex; flex-direction:column; min-height:240px; border:1px solid var(--line); border-radius:16px; background:var(--ink); padding:24px; position:relative; overflow:hidden; transition:transform .25s var(--ease), border-color .25s var(--ease); }
        .sc::before { content:""; position:absolute; inset:0; background:radial-gradient(120% 80% at 0% 0%, var(--accent-soft), transparent 60%); opacity:0; transition:opacity .3s var(--ease); pointer-events:none; }
        .sc:hover { transform:translateY(-5px); border-color:var(--accent); }
        .sc:hover::before { opacity:1; }
        .sc > * { position:relative; }
        .sc-top { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:18px; }
        .sc-ind { font-size:10px; color:var(--accent); text-transform:uppercase; letter-spacing:.06em; }
        .sc-mark { display:flex; align-items:center; gap:8px; flex:none; }
        .sc-mark img { height:18px; max-width:64px; object-fit:contain; }
        .sc-name { font-weight:600; font-size:22px; letter-spacing:-.02em; margin:0 0 4px; }
        .sc-role { font-size:10.5px; color:var(--accent); letter-spacing:.03em; margin-bottom:8px; }
        .sc-tag { font-size:13.5px; color:var(--muted); line-height:1.55; margin:0 0 18px; }
        .sc .est { margin-top:auto; }
        .sc-more { margin-top:16px; font-size:10px; color:var(--faint); text-transform:uppercase; letter-spacing:.05em; display:flex; align-items:center; gap:6px; }
        .sc:hover .sc-more { color:var(--accent); }
        .est { display:flex; flex-wrap:wrap; gap:6px; }
        .dot { width:6px; height:6px; border-radius:50%; display:inline-block; }

        /* ---- open source ---- */
        .oss-list { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        @media(max-width:900px){ .oss-list{grid-template-columns:1fr} }
        .oss-card { display:flex; flex-direction:column; border:1px solid var(--line); border-radius:16px; background:var(--ink-2); padding:26px; color:inherit; position:relative; overflow:hidden; transition:transform .25s var(--ease), border-color .25s var(--ease); }
        .oss-card::before { content:""; position:absolute; inset:0; background:radial-gradient(120% 80% at 0% 0%, var(--accent-soft), transparent 60%); opacity:0; transition:opacity .3s var(--ease); pointer-events:none; }
        .oss-card:hover { transform:translateY(-4px); border-color:var(--accent); }
        .oss-card:hover::before { opacity:1; }
        .oss-card > * { position:relative; }
        .oss-top { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px; }
        .oss-repo { font-size:11px; color:var(--accent); letter-spacing:.06em; }
        .oss-badge { font-size:10px; color:var(--ink); background:var(--accent); border-radius:20px; padding:4px 10px; letter-spacing:.04em; white-space:nowrap; }
        .oss-title { font-weight:600; font-size:19px; letter-spacing:-.015em; margin:0 0 10px; }
        .oss-desc { font-size:13.5px; color:var(--muted); line-height:1.6; margin:0 0 18px; }
        .oss-meta { margin-top:auto; font-size:10px; color:var(--faint); text-transform:uppercase; letter-spacing:.05em; display:flex; align-items:center; gap:7px; line-height:1.5; }
        .oss-card:hover .oss-meta { color:var(--accent); }
      `}</style>
    </>
  );
}
