"use client";

import { useEffect, useRef, useState } from "react";

interface ShortcodeSolution {
  code: string;
  name: string;
  label: string;
  p1: string;
  p2: string;
  chips: string[];
}

const SHORTCODES: ShortcodeSolution[] = [
  {
    code: "*GO#",
    name: "Low-latency daemon",
    label: "Go Fiber Daemon",
    p1: "Standalone compiled binary with sub-millisecond Fiber routing.",
    p2: "50k req/sec out of the box with zero runtime cold starts.",
    chips: ["single binary", "sub-ms p99", "zero cold starts"],
  },
  {
    code: "*ACID#",
    name: "Atomic ledger",
    label: "ACID Row Locking",
    p1: "Pessimistic row locking (SELECT FOR UPDATE) in raw PostgreSQL.",
    p2: "Guarantees two concurrent disbursements never double-spend.",
    chips: ["ACID verified", "pessimistic lock", "zero double-spend"],
  },
  {
    code: "*RUST#",
    name: "Zero-cost parser",
    label: "Rust Tokio Rail",
    p1: "Compiled zero-cost abstractions for deep PDF and resume extraction.",
    p2: "Zero memory leaks, zero garbage collection pauses, 10x throughput.",
    chips: ["memory safe", "zero GC pause", "10x throughput"],
  },
  {
    code: "*STREAM#",
    name: "Realtime mesh",
    label: "WebSocket Dispatch",
    p1: "Bidirectional WebSocket coordination over persistent sessions.",
    p2: "Instant telemetry and coordinates with sub-12ms roundtrips.",
    chips: ["epoll sockets", "sub-12ms ping", "zero polling"],
  },
  {
    code: "*MONO#",
    name: "Direct primitive",
    label: "Modular Monolith",
    p1: "Start with one audited codebase and a Postgres ledger.",
    p2: "Split into services only when scale demands it.",
    chips: ["modular monolith", "one codebase", "split when needed"],
  },
];

const HEAVY_STEPS = [
  { n: 1, title: "Propose a dozen microservices", sub: "needs a cluster just to run" },
  { n: 2, title: "Add a vendor for every concern", sub: "more contracts, more lock-in" },
  { n: 3, title: "Layer on brokers and queues", sub: "more ways to fail" },
  { n: 4, title: "Write the glue code between them", sub: "fragile network boundaries" },
  { n: 5, title: "Chase cold starts and outages", sub: "latency you can't explain" },
];

export function TwoWaysIn() {
  const [selectedIdx, setSelectedIdx] = useState(4); // Default to *MONO# matching user's spec
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Smooth auto-cycle through shortcodes when in view
  useEffect(() => {
    if (!inView || !isAutoCycle) return;
    const interval = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % SHORTCODES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [inView, isAutoCycle]);

  const active = SHORTCODES[selectedIdx];

  const handleSelect = (idx: number) => {
    setIsAutoCycle(false);
    setSelectedIdx(idx);
  };

  return (
    <div className="tw" ref={root}>
      {/* Editorial Header */}
      <div className="tw-head">
        <div className="tw-title mono">
          <span className="skd-live-dot" />
          <span>two ways in // philosophy</span>
        </div>
        <div className="tw-sub mono">
          <span>a shortcode to solutions in tech</span>
        </div>
      </div>

      <div className="tw-grid">
        {/* The Heavy Way */}
        <section className="tw-col" aria-label="The heavy way">
          <h3 className="tw-h mono">the heavy way</h3>

          <ol className="tw-list">
            {HEAVY_STEPS.map((s) => (
              <li key={s.n}>
                <span className="tw-n mono">{s.n}</span>
                <span>
                  <b>{s.title}</b>
                  <em className="mono">{s.sub}</em>
                </span>
              </li>
            ))}
          </ol>

          <p className="tw-tot mono">
            <b>5</b> steps before it works
          </p>
        </section>

        {/* The Shortcode Way */}
        <section className="tw-col direct" aria-label="The shortcode way">
          <h3 className="tw-h mono">the shortcode way</h3>

          <div className="tw-codes" role="tablist" aria-label="Choose a shortcode">
            {SHORTCODES.map((s, idx) => (
              <button
                key={s.code}
                type="button"
                role="tab"
                aria-selected={selectedIdx === idx}
                onClick={() => handleSelect(idx)}
                className={`tw-code mono ${selectedIdx === idx ? "on" : ""}`}
              >
                {s.code}
              </button>
            ))}
          </div>

          <div className="tw-out" aria-live="polite">
            <div className="tw-out-k mono">
              <span>dial {active.code}</span>
              <i>{active.name}</i>
            </div>
            <p>{active.p1}</p>
            <p>{active.p2}</p>
            <div className="tw-chips mono">
              {active.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <p className="tw-tot mono good">
            <b>1</b> code, straight to the solution
          </p>
        </section>
      </div>

      {/* Philosophy Manifesto Footer */}
      <p className="tw-note mono">
        <strong>A SHORTCODE TO SOLUTIONS IN TECH.</strong> The fastest, most resilient architecture
        has no bloated middleware, no vendor tax, and no unnecessary indirection. Direct
        primitives, zero-overhead execution, and systems that answer on the worst day.
      </p>

      <style>{`
        .tw {
          border: 1px solid var(--line-strong);
          background: var(--ink-2);
          margin: 40px 0 0;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .tw-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 12px 20px;
          border-bottom: 1px solid var(--line);
          background: var(--ink-2);
        }

        .tw-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 600;
        }

        .tw-sub {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--faint);
        }

        .tw-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          background: var(--line);
          gap: 1px;
        }

        .tw-col {
          background: var(--ink);
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
          min-width: 0;
          justify-content: space-between;
          position: relative;
        }

        .tw-col.direct {
          background: var(--ink);
        }

        .tw-h {
          font-size: 11.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin: 0 0 20px 0;
          color: var(--accent);
          font-weight: 700;
        }

        .tw-col.direct .tw-h {
          color: var(--accent);
        }

        /* The Heavy Way List */
        .tw-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .tw-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          overflow-wrap: break-word;
          word-break: normal;
          hyphens: none;
        }

        .tw-n {
          flex: none;
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          background: var(--ink-2);
          font-size: 11px;
          color: var(--paper);
          font-weight: 600;
          border-radius: 4px;
        }

        .tw-list li span:last-child {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .tw-list li b {
          font-size: 13.5px;
          color: var(--paper);
          font-weight: 600;
          line-height: 1.35;
        }

        .tw-list li em {
          font-style: normal;
          font-size: 10.5px;
          letter-spacing: 0.05em;
          color: var(--faint);
          font-weight: 500;
        }

        /* The Shortcode Way */
        .tw-codes {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .tw-code {
          padding: 6px 12px;
          background: var(--ink-2);
          border: 1px solid var(--line-strong);
          border-radius: 4px;
          font-size: 10.5px;
          letter-spacing: 0.08em;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.18s ease;
          font-weight: 500;
        }

        .tw-code:hover {
          color: var(--paper);
          border-color: var(--accent);
          background: var(--accent-soft);
        }

        .tw-code.on {
          color: var(--accent);
          background: var(--accent-soft);
          border-color: var(--accent);
          box-shadow: 0 0 12px var(--accent-soft);
          font-weight: 700;
        }

        /* Tactical Output Well */
        .tw-out {
          background: var(--ink-3);
          border: 1px solid var(--line-strong);
          border-radius: 6px;
          padding: 18px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 20px;
          min-height: 170px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .tw-out-k {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 10px;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--line);
          font-size: 10.5px;
        }

        .tw-out-k span {
          color: var(--accent);
          letter-spacing: 0.08em;
          font-weight: 700;
        }

        .tw-out-k i {
          font-style: normal;
          color: var(--faint);
          font-size: 9.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .tw-out p {
          margin: 0 0 6px 0;
          font-size: 14px;
          line-height: 1.5;
          color: var(--paper);
          font-weight: 500;
        }

        .tw-out p:last-of-type {
          color: var(--muted);
          font-size: 13px;
          margin-bottom: 14px;
          font-weight: 400;
        }

        .tw-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tw-chips span {
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 3px;
          border: 1px solid var(--line-strong);
          color: var(--paper);
          background: var(--ink-2);
          font-weight: 500;
        }

        /* Footers */
        .tw-tot {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 16px 0 0;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          font-weight: 500;
        }

        .tw-tot b {
          font-size: 19px;
          color: var(--accent);
          font-weight: 700;
          margin-right: 4px;
        }

        .tw-tot.good b {
          color: var(--accent);
        }

        .tw-note {
          margin: 0;
          padding: 16px 20px;
          border-top: 1px solid var(--line);
          background: var(--ink-2);
          font-size: 12px;
          line-height: 1.6;
          color: var(--muted);
          letter-spacing: 0.02em;
        }

        .tw-note strong {
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        @media (max-width: 820px) {
          .tw-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .tw-col {
            padding: 20px 16px;
          }
          .tw-out {
            padding: 14px 16px;
          }
          .tw-codes {
            gap: 4px;
            display: flex;
            flex-wrap: wrap;
          }
          .tw-code {
            padding: 5px 8px;
            font-size: 9.5px;
            flex: 1 1 auto;
            text-align: center;
          }
          .tw-note {
            padding: 14px 16px;
            font-size: 11.5px;
          }
        }
      `}</style>
    </div>
  );
}
