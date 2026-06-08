"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* ---------------- The mark: a drawn asterisk, coral core ---------------- */
const ARM = "-7,-18 7,-18 3.5,-92 -3.5,-92";
export function Mark({
  size = 30,
  className = "",
  spin = true,
}: {
  size?: number;
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg
      className={`mark ${className}`}
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      style={{
        transition: spin ? "transform .5s cubic-bezier(.22,.61,.36,1)" : undefined,
      }}
      onMouseEnter={
        spin
          ? (e) => (e.currentTarget.style.transform = "rotate(60deg)")
          : undefined
      }
      onMouseLeave={
        spin ? (e) => (e.currentTarget.style.transform = "none") : undefined
      }
    >
      <g>
        {[0, 60, 120, 180, 240, 300].map((d) => (
          <polygon
            key={d}
            className="arm"
            points={ARM}
            transform={d ? `rotate(${d})` : undefined}
          />
        ))}
        <circle className="core" r="10" />
      </g>
    </svg>
  );
}

/* ---------------- Sticky nav with *shortkohdz# lockup ---------------- */
const LINKS = [
  { href: "/", label: "home" },
  { href: "/engineering", label: "engineering" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "var(--nav-bg)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 62,
          }}
        >
          <Link
            href="/"
            aria-label="shortkohdz home"
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <Mark size={30} />
            <span
              className="wordmark brandmark"
              style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-.035em" }}
            >
              shortkohdz
            </span>
          </Link>

          <nav
            aria-label="primary"
            className="nav-links"
            style={{ display: "flex", alignItems: "center", gap: 26 }}
          >
            {LINKS.map((l) => {
              const on =
                l.href === "/"
                  ? pathname === "/"
                  : l.href.startsWith("/#")
                    ? false
                    : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="mono nav-a"
                  aria-current={on ? "page" : undefined}
                  style={{
                    fontSize: 12,
                    textTransform: "lowercase",
                    letterSpacing: ".05em",
                    color: on ? "var(--paper)" : "var(--muted)",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <AnimatedThemeToggler />
            <button
              className="menu-btn"
              aria-label="open menu"
              onClick={() => setOpen(true)}
              style={{
                display: "none",
                background: "none",
                border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "8px 10px",
                color: "var(--paper)",
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="14" x2="21" y2="14" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "var(--ink)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 32px",
          }}
        >
          <button
            aria-label="close menu"
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 18,
              right: 24,
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: 30,
            }}
          >
            ×
          </button>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="serif"
              style={{
                fontSize: 44,
                color: "var(--paper)",
                padding: "14px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .nav-links { display: none !important; }
          .menu-btn { display: inline-flex !important; align-items: center; }
        }
        .nav-a { position: relative; transition: color .2s; }
        .nav-a::after { content:""; position:absolute; left:0; bottom:-5px; height:1px; width:0; background:var(--accent); transition:width .25s cubic-bezier(.22,.61,.36,1); }
        .nav-a:hover { color: var(--paper); }
        .nav-a:hover::after, .nav-a[aria-current="page"]::after { width:100%; }
      `}</style>
    </>
  );
}

/* ---------------- Footer (large-name treatment) ---------------- */
const FOOTER_COLS: { title: string; links: { href: string; label: string; ext?: boolean }[] }[] = [
  {
    title: "explore",
    links: [
      { href: "/", label: "home" },
      { href: "/engineering", label: "the engineering" },
      { href: "/#ventures", label: "the ventures" },
      { href: "/#idea", label: "the thesis" },
    ],
  },
  {
    title: "connect",
    links: [
      { href: "https://github.com/ObeeJ", label: "github", ext: true },
      { href: "https://linkedin.com/in/obanijesuajayi", label: "linkedin", ext: true },
      { href: "mailto:ajayiobanijesu2000@gmail.com", label: "email", ext: true },
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      style={{ padding: "70px 0 0", borderTop: "1px solid var(--line)" }}
    >
      <div className="wrap">
        {/* contact CTA */}
        <div className="rowhead">
          <span className="num">03</span>
          <h2>contact</h2>
        </div>
        <p className="display">a direct line to a solution.</p>
        <p className="lead">
          Open to partners, problems worth solving, and roles where the work
          reaches people, on the worst day, not just the best.
        </p>

        {/* columns */}
        <div className="footgrid">
          <div className="footbrand">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Mark size={26} spin={false} />
              <span className="wordmark" style={{ fontSize: 17, fontWeight: 600 }}>
                shortkohdz
              </span>
            </Link>
            <p style={{ color: "var(--muted)", fontSize: 13.5, maxWidth: 280, marginTop: 14, lineHeight: 1.6 }}>
              A parent company building ventures that still answer on the worst
              day. Engineered by{" "}
              <a href="https://github.com/ObeeJ" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>
                @ObeeJ
              </a>
              .
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mono" style={{ color: "var(--faint)", marginBottom: 14 }}>{col.title}</h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 9 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.ext ? "_blank" : undefined}
                      rel={l.ext ? "noopener" : undefined}
                      className="footlink"
                      style={{ fontSize: 13.5, color: "var(--muted)" }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mono"
          style={{
            color: "var(--faint)",
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>© {new Date().getFullYear()} shortkohdz · solutions, on dial</span>
          <span>access first · friction last</span>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="bigname-wrap" aria-hidden="true">
        <h2 className="bigname wordmark">shortkohdz</h2>
      </div>

      <style>{`
        .footgrid { margin-top:52px; display:grid; grid-template-columns:1.6fr 1fr 1fr; gap:40px; padding-bottom:44px; border-bottom:1px solid var(--line); }
        @media(max-width:760px){ .footgrid{ grid-template-columns:1fr 1fr; gap:32px; } .footbrand{ grid-column:1 / -1; } }
        .footlink { position:relative; transition:color .2s var(--ease); }
        .footlink:hover { color:var(--accent); }
        .bigname-wrap { width:100%; overflow:hidden; line-height:0; margin-top:18px; }
        .bigname {
          text-align:center;
          font-size:clamp(64px,18vw,230px);
          letter-spacing:-.04em;
          margin:0;
          user-select:none;
          color:var(--accent);
          padding-bottom:.04em;
        }
        .dark .bigname { color:var(--paper); }
      `}</style>
    </footer>
  );
}

/* ---------------- Reveal wrapper (respects reduced motion) ---------------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const MotionTag = as === "section" ? motion.section : motion.div;
  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------- Murmuration hero canvas ----------------
   Many small things moving as one, gathering toward a single
   coral core — the brand thesis, animated. Stilled for
   prefers-reduced-motion. */
export function Murmuration() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0,
      raf = 0,
      running = true;
    let birds: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      a: number;
      accent: boolean;
    }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const ACCENT = "#FF553D";
    const PAPER = "rgba(244,240,232,";

    function size() {
      const r = c!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      c!.width = W * DPR;
      c!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function reset() {
      const n = Math.round(Math.min(140, Math.max(60, W / 11)));
      birds = [];
      for (let i = 0; i < n; i++)
        birds.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          a: 0.1 + Math.random() * 0.3,
          accent: Math.random() < 0.1,
        });
    }
    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, W, H);
      const t = Date.now() * 0.0002;
      const cx = W * 0.5 + Math.cos(t) * W * 0.06;
      const cy = H * 0.46 + Math.sin(t * 1.3) * H * 0.05;
      for (const b of birds) {
        const dx = cx - b.x,
          dy = cy - b.y;
        const d = Math.hypot(dx, dy) || 1;
        b.vx += (dx / d) * 0.012;
        b.vy += (dy / d) * 0.012;
        b.vx += (-dy / d) * 0.01;
        b.vy += (dx / d) * 0.01;
        const mdx = b.x - mouse.x,
          mdy = b.y - mouse.y;
        const md = mdx * mdx + mdy * mdy;
        if (md < 9000) {
          b.vx += (mdx / md) * 14;
          b.vy += (mdy / md) * 14;
        }
        b.vx *= 0.96;
        b.vy *= 0.96;
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > 1.7) {
          b.vx = (b.vx / sp) * 1.7;
          b.vy = (b.vy / sp) * 1.7;
        }
        b.x += b.vx;
        b.y += b.vy;
        ctx!.strokeStyle = b.accent ? ACCENT : PAPER + b.a + ")";
        ctx!.lineWidth = b.accent ? 1.6 : 1.1;
        ctx!.beginPath();
        ctx!.moveTo(b.x, b.y);
        ctx!.lineTo(b.x - b.vx * 3.2, b.y - b.vy * 3.2);
        ctx!.stroke();
      }
      raf = requestAnimationFrame(step);
    }

    size();
    reset();
    step();
    const onResize = () => {
      size();
      reset();
    };
    const onMove = (e: MouseEvent) => {
      const r = c!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVis = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(raf);
        step();
      } else cancelAnimationFrame(raf);
    };
    window.addEventListener("resize", onResize);
    const parent = c.parentElement;
    parent?.addEventListener("mousemove", onMove);
    parent?.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      parent?.removeEventListener("mousemove", onMove);
      parent?.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
