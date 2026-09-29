"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, Pause, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { StreetWalker } from "./StreetWalker";
import { TechIcon } from "./TechIcon";

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
    metric: "Next.js 16 · React 19 · TanStack Query",
    stack: ["Next.js 16", "React 19", "TypeScript", "Zustand", "Recharts"],
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
    icon: "/brands/mopcare_favicon.ico",
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

const SPACING = 300; // world px between racks
const RACK_W = 70;
const CANVAS_H = 200;
const GROUND = 176;
const SPEED = 96; // px / s
const DWELL_MS = 3800;

const standX = (i: number) => 150 + i * SPACING - 46; // stand just left of the rack
const rackX = (i: number) => 150 + i * SPACING;
const WORLD_W = 150 + NODES.length * SPACING + 200;

export function TelemetryCorridor() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const farRef = useRef<SVGGElement>(null);
  const walkerRef = useRef<SVGGElement>(null);

  const [viewW, setViewW] = useState(1000);
  const [active, setActive] = useState(0);
  const [pose, setPose] = useState<"walk" | "inspect">("inspect");
  const [playing, setPlaying] = useState(true);

  // Mutable simulation state: updated every frame without touching React.
  const sim = useRef({ x: standX(0), target: 0, phase: "dwell" as "walk" | "dwell", t: 0, viewW: 1000 });

  const apply = useCallback(() => {
    const s = sim.current;
    const cam = Math.max(0, Math.min(WORLD_W - s.viewW, s.x - s.viewW * 0.32));
    midRef.current?.setAttribute("transform", `translate(${-cam} 0)`);
    farRef.current?.setAttribute("transform", `translate(${-cam * 0.3} 0)`);
    walkerRef.current?.setAttribute("transform", `translate(${s.x} ${GROUND})`);
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width);
      sim.current.viewW = w;
      setViewW(w);
      apply();
    });
    ro.observe(el);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    return () => ro.disconnect();
  }, [apply]);

  const arrive = useCallback(
    (i: number) => {
      const s = sim.current;
      s.x = standX(i);
      s.target = i;
      s.phase = "dwell";
      s.t = 0;
      setActive(i);
      setPose("inspect");
      apply();
    },
    [apply]
  );

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const s = sim.current;
      if (s.phase === "dwell") {
        s.t += dt;
        if (s.t >= DWELL_MS) {
          const next = (s.target + 1) % NODES.length;
          if (next === 0) s.x = standX(0) - SPACING; // loop: walk back in from the left edge
          s.target = next;
          s.phase = "walk";
          setPose("walk");
        }
      } else {
        s.x += (SPEED * dt) / 1000;
        if (s.x >= standX(s.target)) arrive(s.target);
      }
      apply();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, arrive, apply]);

  const node = NODES[active];
  const step = (d: number) => arrive((active + d + NODES.length) % NODES.length);

  return (
    <div className="cor" aria-label="Live products, walked through one by one">
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

      {/* street: the engineer walks to each rack and inspects it */}
      <div ref={canvasRef} className="cor-street" aria-hidden>
        <svg viewBox={`0 0 ${viewW} ${CANVAS_H}`} width={viewW} height={CANVAS_H}>
          <g ref={farRef}>
            {Array.from({ length: Math.ceil(WORLD_W / 260) }).map((_, i) => {
              const tx = 80 + i * 260;
              return (
                <g key={i} opacity=".35" stroke="var(--line-strong)" strokeWidth="1">
                  <line x1={tx} y1="46" x2={tx - 14} y2="150" />
                  <line x1={tx} y1="46" x2={tx + 14} y2="150" />
                  <line x1={tx - 8} y1="90" x2={tx + 8} y2="90" />
                  <line x1={tx - 12} y1="126" x2={tx + 12} y2="126" />
                  <circle cx={tx} cy="44" r="2.4" fill="var(--accent)" stroke="none" />
                </g>
              );
            })}
          </g>

          <g ref={midRef}>
            {NODES.map((n, i) => {
              const on = i === active;
              const x = rackX(i);
              return (
                <g key={n.id} onClick={() => arrive(i)} style={{ cursor: "pointer" }}>
                  <line x1={x + RACK_W / 2} y1="0" x2={x + RACK_W / 2} y2="44" stroke={on ? "var(--accent)" : "var(--line-strong)"} strokeDasharray="3 3" />
                  <rect x={x} y="44" width={RACK_W} height={GROUND - 44} rx="2" fill="var(--ink-2)" stroke={on ? "var(--accent)" : "var(--line-strong)"} strokeWidth={on ? 1.5 : 1} />
                  {[0, 1, 2, 3].map((b) => (
                    <g key={b}>
                      <rect x={x + 6} y={54 + b * 28} width={RACK_W - 12} height="22" rx="1" fill="var(--ink)" stroke="var(--line)" />
                      <circle cx={x + 14} cy={65 + b * 28} r="2" fill={on ? "var(--accent)" : "var(--faint)"}>
                        {on && <animate attributeName="opacity" values="1;.25;1" dur={`${0.8 + b * 0.25}s`} repeatCount="indefinite" />}
                      </circle>
                      <line x1={x + 22} y1={65 + b * 28} x2={x + RACK_W - 12} y2={65 + b * 28} stroke={on ? "var(--accent)" : "var(--line-strong)"} opacity={on ? 0.6 : 1} />
                    </g>
                  ))}
                  <rect x={x - 6} y="24" width={RACK_W + 12} height="16" rx="1" fill={on ? "var(--accent)" : "var(--ink-3)"} />
                  <text x={x + RACK_W / 2} y="35.5" textAnchor="middle" fontSize={n.name.length > 10 ? 6.4 : 8.5} fontFamily="var(--font-jetbrains), monospace" fontWeight="700" letterSpacing=".04em" fill={on ? "#050711" : "var(--paper)"}>
                    {n.name.toUpperCase()}
                  </text>
                </g>
              );
            })}
            <g ref={walkerRef}>
              <StreetWalker state={pose} />
            </g>
          </g>

          <line x1="0" y1={GROUND} x2={viewW} y2={GROUND} stroke="var(--line-strong)" strokeWidth="2" />
          <line x1="0" y1={GROUND + 3} x2={viewW} y2={GROUND + 3} stroke="var(--accent)" strokeWidth="1" opacity=".7" />
        </svg>
      </div>

      {/* readout: what the walker is standing at */}
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
              <span key={s} className="mono stack-chip">
                <TechIcon name={s} size={11} />
                <span>{s}</span>
              </span>
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

      {/* thumbnails: hero crop + favicon, so visitors can peek at every product */}
      <div className="cor-thumbs" role="tablist" aria-label="Live products">
        {NODES.map((n, i) => (
          <button key={n.id} type="button" role="tab" aria-selected={i === active} className={`cor-thumb${i === active ? " on" : ""}`} onClick={() => arrive(i)}>
            <img className="cor-thumb-bg" src={n.shot} alt="" loading="lazy" />
            <span className="cor-thumb-fade" />
            <span className="cor-thumb-meta mono">
              <img src={n.icon} alt="" width={16} height={16} />
              {n.name}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        .cor { border:1px solid var(--line-strong); background:var(--ink-2); margin:32px 0 0; overflow:hidden; }
        .cor-head { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:14px 20px; border-bottom:1px solid var(--line); }
        .cor-title { display:flex; align-items:center; gap:10px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
        .cor-title b { color:var(--accent); font-weight:500; }
        .cor-ctl { display:flex; gap:8px; }
        .cor-ctl .skd-btn { padding:6px 11px; font-size:11px; }
        .cor-street { height:${CANVAS_H}px; background:radial-gradient(ellipse at 40% 100%, var(--accent-soft), transparent 70%), var(--ink); overflow:hidden; }
        .cor-street svg { display:block; }
        .cor-read { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.15fr); gap:36px; padding:32px; border-top:1px solid var(--line); background:var(--ink); align-items:center; }
        .cor-cat { font-size:10px; color:var(--accent); letter-spacing:.1em; text-transform:uppercase; margin-bottom:10px; }
        .cor-name { display:flex; align-items:center; gap:12px; font-size:clamp(26px,3vw,36px); margin:0 0 6px; }
        .cor-name img { border-radius:6px; object-fit:contain; background:#fff; padding:2px; }
        .cor-role { font-size:11px; color:var(--muted); letter-spacing:.04em; margin-bottom:16px; }
        .cor-line { color:var(--paper); font-size:15px; line-height:1.55; margin:0 0 16px; max-width:460px; }
        .cor-metric { display:inline-block; font-size:10.5px; padding:6px 12px; border-left:2px solid var(--accent); background:var(--ink-2); margin-bottom:16px; }
        .cor-stack { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:22px; }
        .cor-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .cor-actions .skd-btn { padding:10px 18px; font-size:11.5px; }
        .cor-frame { display:block; border:1px solid var(--line-strong); border-radius:10px; overflow:hidden; background:var(--ink-2); box-shadow:0 30px 60px -30px rgba(0,0,0,.6); transition:transform .3s var(--ease), border-color .3s var(--ease); }
        .cor-frame:hover { transform:translateY(-4px); border-color:var(--accent); }
        .cor-chrome { display:flex; align-items:center; gap:6px; padding:9px 12px; border-bottom:1px solid var(--line); background:var(--ink-2); }
        .cor-chrome i { width:8px; height:8px; border-radius:50%; background:var(--line-strong); }
        .cor-chrome span { margin-left:10px; display:flex; align-items:center; gap:6px; font-size:10px; color:var(--muted); background:var(--ink); padding:3px 10px; border-radius:20px; }
        .cor-shot { display:block; width:100%; aspect-ratio:1366/820; object-fit:cover; object-position:top; animation:cor-in .5s var(--ease); }
        @keyframes cor-in { from { opacity:0; transform:scale(1.02) } to { opacity:1; transform:none } }
        .cor-thumbs { display:grid; grid-template-columns:repeat(${NODES.length},1fr); border-top:1px solid var(--line); }
        .cor-thumb { position:relative; height:96px; padding:0; border:0; border-right:1px solid var(--line); background:var(--ink); cursor:pointer; overflow:hidden; }
        .cor-thumb:last-child { border-right:0; }
        .cor-thumb-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top; opacity:.45; filter:saturate(.7); transition:opacity .3s var(--ease), transform .4s var(--ease); }
        .cor-thumb:hover .cor-thumb-bg, .cor-thumb.on .cor-thumb-bg { opacity:.95; filter:none; transform:scale(1.04); }
        .cor-thumb-fade { position:absolute; inset:0; background:linear-gradient(180deg, transparent 30%, rgba(5,7,17,.85)); }
        .cor-thumb.on::after { content:""; position:absolute; left:0; right:0; bottom:0; height:2px; background:var(--accent); }
        .cor-thumb-meta { position:absolute; left:10px; bottom:9px; display:flex; align-items:center; gap:7px; font-size:10px; color:#fff; letter-spacing:.04em; }
        .cor-thumb-meta img { border-radius:4px; background:#fff; padding:1px; object-fit:contain; }
        @media (max-width:900px) {
          .cor-read { grid-template-columns:1fr; padding:22px; gap:24px; }
          .cor-thumbs { grid-template-columns:repeat(3,1fr); }
          .cor-thumb:nth-child(3) { border-right:0; }
          .cor-thumb:nth-child(n+4) { border-top:1px solid var(--line); }
        }
      `}</style>
    </div>
  );
}
