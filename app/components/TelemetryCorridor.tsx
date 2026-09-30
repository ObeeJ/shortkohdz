"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, Pause, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { StackBadge } from "./TechIcon";
import { SocialLinks } from "./SocialLinks";
import { projects } from "../lib/data";

interface LiveNode {
  id: string;
  name: string;
  role: string;
  category: string;
  line: string; // one-sentence pitch shown beside the preview
  metric: string;
  stack: string[];
  href: string; // internal case study
  live: string; // public site
  shot: string; // hero screenshot of the live site
  icon: string; // favicon
}

/** Live products only. Repo-only work lives in the "built from scratch" section. */
const NODES: LiveNode[] = [
  {
    id: "pcxpay",
    name: "PCXPay",
    role: "Senior Software Engineer",
    category: "Fintech · cross-border payments",
    line: "One API across stablecoin, Lightning and banking rails. I spearheaded the GTBank Squad integration and the Lambda payment services behind it.",
    metric: "FCA-regulated · UK, Nigeria & Canada rails",
    stack: ["Python", "AWS Lambda", "Terraform", "GTBank Squad", "Sentry"],
    href: "/engineering/pcxpay",
    live: "https://pcxpay.com",
    shot: "/live/pcxpay.jpg",
    icon: "/brands/pcxpay_favicon.ico",
  },
  {
    id: "dwelix",
    name: "Dwelix",
    role: "Lead Software Engineer",
    category: "Proptech · verified rentals",
    line: "A safer way to rent property. I led the team and built the platform: verified listings, custodied keys and lawyer-backed, e-signed agreements.",
    metric: "12 Go services · 100k+ lines · 137 migrations",
    stack: ["Go", "gRPC", "GCP Pub/Sub", "Cloud Run", "PostgreSQL", "React"],
    href: "/engineering/dwelix",
    live: "https://dwelix.com",
    shot: "/live/dwelix.jpg",
    icon: "/brands/dwelix_favicon.ico",
  },
  {
    id: "mydigitalparents",
    name: "MyDigitalParents",
    role: "Full-Stack Engineer",
    category: "Social impact · education",
    line: "Anyone, anywhere can sponsor an African child's education. I built the admin side that runs applications, campaigns, funds and students.",
    metric: "Next.js 16 · NestJS · React 19",
    stack: ["Next.js 16", "NestJS", "TypeScript", "TanStack Query", "PostgreSQL"],
    href: "/engineering/mydigitalparents",
    live: "https://mydigitalparents.com",
    shot: "/live/mydigitalparents.jpg",
    icon: "/live/mydigitalparents-icon.png",
  },
  {
    id: "mopcare",
    name: "Mopcare",
    role: "Software Engineer & Technical Lead",
    category: "Healthtech · senior care",
    line: "Care, volunteers and learning for seniors in one platform. Go services, five role portals and an accredited healthcare LMS.",
    metric: "Close to 2,000 patients · 5 role portals",
    stack: ["Go", "PostgreSQL", "Redis", "React", "Terraform"],
    href: "/engineering/mopcare",
    live: "https://mopcare.net",
    shot: "/live/mopcare.jpg",
    icon: "/brands/mopcare_icon.svg",
  },
  {
    id: "scholelabs",
    name: "Scholé",
    role: "Backend Software Engineer",
    category: "Edtech · school operating system",
    line: "Run an entire school from one platform. I owned the multi-tenant backend from first commit to launch.",
    metric: "Zero cross-tenant leaks · async bulk enrolment",
    stack: ["NestJS", "Fastify", "PostgreSQL", "BullMQ", "Redis"],
    href: "/engineering/scholelabs",
    live: "https://scholelabs.com",
    shot: "/live/scholelabs.jpg",
    icon: "/brands/scholelabs_favicon.ico",
  },
  {
    id: "topnorch",
    name: "Topnorch",
    role: "Senior Full-Stack & Product Engineer",
    category: "AI · career automation",
    line: "One tap, application sent. Rust parsing, Python NLP and Go orchestration that tailor every application, with a human approving each one.",
    metric: "Rust + Python + Go · human-in-the-loop",
    stack: ["Rust", "Python", "Go", "React", "PostgreSQL"],
    href: "/engineering/topnorch",
    live: "https://topnorch.com",
    shot: "/live/topnorch.jpg",
    icon: "/brands/topnorch_logo.svg",
  },
];

const HOLD_MS = 5000;

/**
 * Product rail: six mini hero thumbnails (each with its favicon) joined by a
 * line. A pulse travels from the active product to the next while the tour
 * plays, and the readout below follows the active product.
 */
export function TelemetryCorridor() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % NODES.length), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [active, playing]);

  // keep the active thumbnail centred when the rail scrolls (phones)
  useEffect(() => {
    const rail = railRef.current;
    const el = rail?.querySelector<HTMLElement>(".rn.on");
    if (!rail || !el) return;
    rail.scrollTo({ left: el.offsetLeft - (rail.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
  }, [active]);

  const step = useCallback((d: number) => setActive((i) => (i + d + NODES.length) % NODES.length), []);
  const node = NODES[active];
  const socials = projects.find((p) => p.id === node.id)?.socials;

  return (
    <div className="cor" aria-label="Live products">
      <div className="cor-head">
        <div className="cor-title mono">
          <span className="skd-live-dot" />
          in production
          <b>
            {String(active + 1).padStart(2, "0")} / {String(NODES.length).padStart(2, "0")}
          </b>
        </div>
        <div className="cor-ctl">
          <button type="button" className="skd-btn skd-btn--ghost" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause tour" : "Resume tour"}>
            {playing ? <Pause size={12} /> : <Play size={12} />}
            <span className="mono">{playing ? "PAUSE" : "TOUR"}</span>
          </button>
          <button type="button" className="skd-btn skd-btn--ghost" onClick={() => step(-1)} aria-label="Previous product">
            <ChevronLeft size={13} />
          </button>
          <button type="button" className="skd-btn skd-btn--ghost" onClick={() => step(1)} aria-label="Next product">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* rail */}
      <div className="rail" ref={railRef} role="tablist" aria-label="Live products">
        {NODES.map((n, i) => (
          <div className="rail-cell" key={n.id}>
            <button type="button" role="tab" aria-selected={i === active} className={`rn${i === active ? " on" : ""}`} onClick={() => setActive(i)} aria-label={n.name}>
              <img className="rn-bg" src={n.shot} alt="" loading="lazy" />
              <span className="rn-fade" />
              <span className="rn-meta mono">
                <img src={n.icon} alt="" width={16} height={16} />
                <span>{n.name}</span>
              </span>
            </button>
            {i < NODES.length - 1 && (
              <span className={`rl${i < active ? " done" : ""}${i === active && playing ? " run" : ""}`} aria-hidden>
                <i />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* readout */}
      <div className="cor-read">
        <div className="cor-copy">
          <div className="mono cor-cat">{node.category}</div>
          <h3 className="wordmark cor-name">
            <img src={node.icon} alt="" width={26} height={26} />
            {node.name}
          </h3>
          <div className="mono cor-role">{node.role}</div>
          <p className="cor-line">{node.line}</p>
          <div className="mono cor-metric">{node.metric}</div>
          <div className="cor-stack">
            {node.stack.map((s) => (
              <StackBadge key={s} name={s} />
            ))}
          </div>
          <div className="cor-actions">
            <a href={node.live} target="_blank" rel="noopener noreferrer" className="skd-btn skd-btn--coral">
              <span>VIEW LIVE</span>
              <ExternalLink size={12} className="arrow-shift" />
            </a>
            <Link href={node.href} className="skd-btn skd-btn--ghost">
              <span>CASE STUDY</span>
            </Link>
            <SocialLinks socials={socials} />
          </div>
        </div>

        <a href={node.live} target="_blank" rel="noopener noreferrer" className="cor-frame" aria-label={`Open ${node.name} live`}>
          <div className="cor-chrome">
            <i /> <i /> <i />
            <span className="mono">
              <img src={node.icon} alt="" width={12} height={12} />
              {node.live.replace("https://", "")}
            </span>
          </div>
          <img key={node.id} className="cor-shot" src={node.shot} alt={`${node.name} homepage`} />
        </a>
      </div>

      <style>{`
        .cor { border:1px solid var(--line-strong); background:var(--ink-2); margin:32px 0 0; overflow:hidden; }
        .cor-head { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:12px 18px; border-bottom:1px solid var(--line); }
        .cor-title { display:flex; align-items:center; gap:10px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
        .cor-title b { color:var(--accent); font-weight:500; }
        .cor-ctl { display:flex; gap:8px; }
        .cor-ctl .skd-btn { padding:8px 12px; font-size:11px; min-height:36px; }

        /* rail */
        .rail { display:flex; align-items:center; overflow-x:auto; scrollbar-width:none; scroll-snap-type:x proximity; padding:18px; background:var(--ink); }
        .rail::-webkit-scrollbar { display:none; }
        .rail-cell { display:flex; align-items:center; flex:1 1 0; min-width:0; scroll-snap-align:center; }
        .rail-cell:last-child { flex:0 0 auto; }
        .rn { position:relative; flex:none; width:136px; height:74px; padding:0; border:1px solid var(--line-strong); background:var(--ink-2); cursor:pointer; overflow:hidden; border-radius:8px; transition:border-color .25s var(--ease), transform .25s var(--ease), box-shadow .25s var(--ease); }
        .rn-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top; opacity:.5; filter:saturate(.6); transition:opacity .3s var(--ease), filter .3s var(--ease), transform .5s var(--ease); }
        .rn:hover .rn-bg { opacity:.85; filter:none; }
        .rn.on { border-color:var(--accent); transform:translateY(-2px); box-shadow:0 10px 28px -12px var(--accent); }
        .rn.on .rn-bg { opacity:1; filter:none; transform:scale(1.05); }
        .rn-fade { position:absolute; inset:0; background:linear-gradient(180deg, transparent 35%, rgba(5,7,17,.88)); }
        .rn-meta { position:absolute; left:8px; right:8px; bottom:6px; display:flex; align-items:center; gap:6px; font-size:9.5px; color:#fff; letter-spacing:.03em; white-space:nowrap; }
        .rn-meta span { overflow:hidden; text-overflow:ellipsis; }
        .rn-meta img { flex:none; border-radius:4px; background:#fff; padding:1px; object-fit:contain; }

        /* connector + travelling pulse */
        .rl { position:relative; flex:1 1 20px; min-width:20px; height:2px; margin:0 8px; background:var(--line-strong); overflow:hidden; }
        .rl.done { background:var(--accent); }
        .rl i { position:absolute; top:-2px; left:-10px; width:10px; height:6px; border-radius:3px; background:var(--accent); box-shadow:0 0 10px var(--accent); opacity:0; }
        .rl.run i { opacity:1; animation:rl-travel ${HOLD_MS}ms linear infinite; }
        @keyframes rl-travel { from { left:-10px } to { left:100% } }

        /* readout */
        .cor-read { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.1fr); gap:32px; padding:28px; border-top:1px solid var(--line); background:var(--ink); align-items:center; }
        .cor-cat { font-size:10px; color:var(--accent); letter-spacing:.1em; text-transform:uppercase; margin-bottom:10px; }
        .cor-name { display:flex; align-items:center; gap:12px; font-size:clamp(24px,3vw,34px); margin:0 0 6px; }
        .cor-name img { border-radius:6px; object-fit:contain; background:#fff; padding:2px; }
        .cor-role { font-size:11px; color:var(--muted); letter-spacing:.04em; margin-bottom:14px; }
        .cor-line { color:var(--paper); font-size:15px; line-height:1.55; margin:0 0 14px; max-width:460px; }
        .cor-metric { display:inline-block; max-width:100%; font-size:10.5px; padding:6px 12px; border-left:2px solid var(--accent); background:var(--ink-2); margin-bottom:14px; }
        .cor-stack { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px; }
        .cor-actions { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .cor-actions .skd-btn { padding:10px 16px; font-size:11.5px; min-height:40px; }
        .cor-frame { display:block; border:1px solid var(--line-strong); border-radius:10px; overflow:hidden; background:var(--ink-2); box-shadow:0 30px 60px -30px rgba(0,0,0,.6); transition:transform .3s var(--ease), border-color .3s var(--ease); }
        .cor-frame:hover { transform:translateY(-3px); border-color:var(--accent); }
        .cor-chrome { display:flex; align-items:center; gap:6px; padding:8px 12px; border-bottom:1px solid var(--line); background:var(--ink-2); }
        .cor-chrome i { width:8px; height:8px; border-radius:50%; background:var(--line-strong); }
        .cor-chrome span { margin-left:10px; display:flex; align-items:center; gap:6px; font-size:10px; color:var(--muted); background:var(--ink); padding:3px 10px; border-radius:20px; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .cor-shot { display:block; width:100%; aspect-ratio:1366/760; object-fit:cover; object-position:top; animation:cor-in .5s var(--ease); }
        @keyframes cor-in { from { opacity:0; transform:scale(1.02) } to { opacity:1; transform:none } }

        @media (max-width:900px) {
          .cor-read { grid-template-columns:minmax(0,1fr); padding:20px; gap:20px; }
          .cor-frame { order:-1; }
        }
        @media (max-width:640px) {
          .cor-head { padding:10px 14px; }
          .rail { padding:14px; }
          .rn { width:104px; height:60px; }
          .rl { flex:0 0 18px; min-width:18px; margin:0 6px; }
          .rail-cell { flex:0 0 auto; }
          .cor-name { font-size:24px; }
          .cor-actions .skd-btn { flex:1 1 auto; justify-content:center; }
        }
        @media (prefers-reduced-motion: reduce) { .rl.run i { animation:none; opacity:0; } .cor-shot { animation:none; } }
      `}</style>
    </div>
  );
}
