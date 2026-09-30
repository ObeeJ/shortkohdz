"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Two ways in": Tech Architecture comparison.
 * Left: The Convoluted Way (Bloated Enterprise SaaS, microservice ceremony, vendor lock-in).
 * Right: The Shortcode Way (Direct Solutions in Tech: compiled primitives, sub-ms latency, zero bloat).
 * Depicts the philosophy of "shortkohdz": a short code to solutions in tech.
 */

interface TechSolution {
  code: string;
  label: string;
  name: string;
  output: string[];
  chips: string[];
}

const TECH_SOLUTIONS: TechSolution[] = [
  {
    code: "*GO#",
    label: "Low-Latency Engine",
    name: "Go Fiber Daemon",
    output: [
      "> dial(*GO#) // DISPATCH",
      "[1/2] Compile standalone binary (14MB)... OK",
      "[2/2] Fiber router mounted: sub-millisecond p99",
      "✓ Solved: 0 cold starts · 50k req/sec",
    ],
    chips: ["single binary", "sub-ms latency", "0 cold starts"],
  },
  {
    code: "*ACID#",
    label: "Atomic Ledger",
    name: "ACID Row Locking",
    output: [
      "> dial(*ACID#) // LEDGER",
      "[1/2] SELECT FOR UPDATE pessimistic lock active",
      "[2/2] Idempotent Paystack webhook reconciled",
      "✓ Solved: 0 double-spend · 100% idempotent",
    ],
    chips: ["ACID verified", "pessimistic lock", "0 leakage"],
  },
  {
    code: "*RUST#",
    label: "Zero-Cost Parser",
    name: "Rust Tokio Rail",
    output: [
      "> dial(*RUST#) // COMPILE",
      "[1/2] Zero-cost memory safety verified",
      "[2/2] PDF extraction pipeline: 24ms per resume",
      "✓ Solved: 0 GC pauses · 10x throughput",
    ],
    chips: ["zero GC pause", "memory safe", "10x throughput"],
  },
  {
    code: "*STREAM#",
    label: "Realtime Mesh",
    name: "WebSocket Dispatch",
    output: [
      "> dial(*STREAM#) // WEBSOCKET",
      "[1/2] Epoll socket pool initialized",
      "[2/2] Bidirectional transit coordinate mesh live",
      "✓ Solved: < 12ms roundtrip · 0 polling",
    ],
    chips: ["real-time mesh", "< 12ms ping", "0 polling bloat"],
  },
  {
    code: "*SHORTKOHDZ#",
    label: "Direct Primitive",
    name: "Modular Monolith",
    output: [
      "> dial(*SHORTKOHDZ#) // GATEWAY",
      "[1/2] Bypass 12 microservices & K8s ceremony",
      "[2/2] Single audited codebase & Postgres ledger",
      "✓ Solved: Direct line to production scale",
    ],
    chips: ["modular monolith", "zero vendor lock", "direct-to-metal"],
  },
];

const BLOATED_STEPS = [
  { label: "Propose 12 microservices", tag: "needs a k8s cluster" },
  { label: "Add 8 third-party cloud vendors", tag: "needs $6k/mo saas budget" },
  { label: "Layer Kafka brokers & Redis queues", tag: "distributed lock contention" },
  { label: "Write 6,000 lines of glue code", tag: "network boundary fragility" },
  { label: "Fight cold starts & cascading downtime", tag: "p99 latency spikes" },
];

export function TwoWaysIn() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Intersection observer
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-cycle through tech shortcodes
  useEffect(() => {
    if (!inView || !isAutoCycle) return;
    const interval = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % TECH_SOLUTIONS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [inView, isAutoCycle]);

  const activeSolution = TECH_SOLUTIONS[selectedIdx];

  const handleSelectCode = (idx: number) => {
    setIsAutoCycle(false);
    setSelectedIdx(idx);
  };

  return (
    <div className="tw" ref={root}>
      {/* Top Header */}
      <div className="tw-head">
        <div className="tw-title mono">
          <span className="skd-live-dot" />
          <span>TWO WAYS IN // A SHORTCODE TO SOLUTIONS IN TECH</span>
        </div>
        <div className="tw-sub mono">
          <span>THE TASK: ARCHITECTING FOR HIGH CONCURRENCY &amp; SCALE</span>
        </div>
      </div>

      <div className="tw-grid">
        {/* The Convoluted Way: Bloated Enterprise Stack */}
        <section className="tw-panel convoluted" aria-label="The convoluted way">
          <div className="tw-panel-label-row">
            <span className="tw-label mono">THE CONVOLUTED WAY</span>
            <span className="tw-sublabel mono">BLOATED CEREMONY</span>
          </div>

          <ol className="tw-steps">
            {BLOATED_STEPS.map((s, i) => (
              <li key={s.label} className="tw-step done">
                <span className="tw-n mono">{i + 1}</span>
                <span className="tw-text">
                  <span className="tw-step-name">{s.label}</span>
                  <em className="mono">{s.tag}</em>
                </span>
              </li>
            ))}
          </ol>

          <div className="tw-foot">
            <span className="tw-count mono">
              <b>5</b> / 5 layers of ceremony
            </span>
            <div className="tw-chips mono">
              <i>k8s cluster</i>
              <i>cloud bills</i>
              <i>vendor lock-in</i>
              <i>cold starts</i>
            </div>
          </div>
        </section>

        {/* The Shortcode Way: Direct Tech Solutions */}
        <section className="tw-panel direct won" aria-label="The direct shortcode way">
          <div className="tw-panel-label-row">
            <span className="tw-label mono direct-text">THE SHORTCODE WAY</span>
            <span className="tw-sublabel mono direct-badge">SHORTKOHDZ PRIMITIVE</span>
          </div>

          {/* Tech Shortcode Matrix */}
          <div className="tw-shortcode-container">
            <div className="tw-terminal-box">
              <div className="tw-term-chrome mono">
                <div className="tw-term-dots" aria-hidden="true">
                  <i /> <i /> <i />
                </div>
                <span className="tw-term-title">SHORTCODE://{activeSolution.code}</span>
                <span className="tw-term-pill mono">{activeSolution.label}</span>
              </div>

              {/* Terminal Execution Output */}
              <div className="tw-screen mono">
                {activeSolution.output.map((line, idx) => (
                  <div
                    key={line}
                    className={`tw-term-line ${
                      line.startsWith("✓")
                        ? "ok"
                        : line.startsWith(">")
                        ? "command"
                        : "metric"
                    }`}
                  >
                    {line}
                    {idx === activeSolution.output.length - 1 && (
                      <span className="tw-caret" />
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive Shortcode Dial Pad */}
              <div className="tw-pad-label mono">
                <span>DIAL DIRECT TECH SHORTCODE:</span>
                {isAutoCycle && <span className="tw-pad-live">AUTO-CYCLING ●</span>}
              </div>
              <div className="tw-keys-grid" role="group" aria-label="Tech shortcode options">
                {TECH_SOLUTIONS.map((sol, idx) => (
                  <button
                    key={sol.code}
                    type="button"
                    onClick={() => handleSelectCode(idx)}
                    className={`tw-key-btn mono ${
                      selectedIdx === idx ? "is-active" : ""
                    }`}
                    title={`Dial ${sol.code} (${sol.label})`}
                  >
                    <span className="key-code">{sol.code}</span>
                    <span className="key-desc">{sol.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Solution Principles */}
            <ol className="tw-mini mono">
              <li className="on">
                <span className="mini-num">01</span>
                <span>Target the structural bottleneck</span>
              </li>
              <li className="on">
                <span className="mini-num">02</span>
                <span>Dial the compiled primitive ({activeSolution.code})</span>
              </li>
              <li className="on ok">
                <span className="mini-num">03</span>
                <span>Ship zero-dependency resilience</span>
              </li>
            </ol>
          </div>

          <div className="tw-foot">
            <span className="tw-count mono direct-count">
              <b>2</b> / 2 direct actions
            </span>
            <div className="tw-chips mono good">
              {activeSolution.chips.map((chip) => (
                <i key={chip}>{chip}</i>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Manifesto Footer */}
      <p className="tw-note mono">
        <strong>A SHORTCODE TO SOLUTIONS IN TECH.</strong>{" "}
        The fastest, most resilient architecture has no bloated middleware, no vendor tax,
        and no unnecessary indirection. That is the Shortkohdz standard: solve the bottleneck
        at the metal, remove every layer that isn&apos;t the problem itself.
      </p>

      <style>{`
        .tw {
          border: 1px solid var(--line-strong);
          background: var(--ink-2);
          margin: 40px 0 0;
          overflow: hidden;
        }

        .tw-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 12px 18px;
          border-bottom: 1px solid var(--line);
          background: rgba(14, 18, 26, 0.6);
        }

        .tw-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        .tw-sub {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--faint);
        }

        .tw-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          background: var(--line);
          gap: 1px;
        }

        .tw-panel {
          background: var(--ink);
          padding: 24px;
          display: flex;
          flex-direction: column;
          min-width: 0;
          transition: box-shadow 0.4s var(--ease);
        }

        .tw-panel.won {
          box-shadow: inset 0 0 0 1px rgba(0, 229, 255, 0.4);
        }

        .tw-panel-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 18px;
        }

        .tw-label {
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #FF553D;
        }

        .tw-label.direct-text {
          color: var(--accent);
        }

        .tw-sublabel {
          font-size: 9.5px;
          letter-spacing: 0.08em;
          color: var(--faint);
          padding: 2px 7px;
          border: 1px solid var(--line);
          background: var(--ink-2);
        }

        .tw-sublabel.direct-badge {
          color: var(--accent);
          border-color: rgba(0, 229, 255, 0.35);
          background: rgba(0, 229, 255, 0.06);
        }

        /* Bloated steps */
        .tw-steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .tw-step {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          opacity: 0.85;
        }

        .tw-n {
          flex: none;
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          font-size: 11px;
          color: var(--muted);
          background: var(--ink-2);
        }

        .tw-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .tw-step-name {
          font-size: 13.5px;
          color: var(--paper);
          line-height: 1.35;
        }

        .tw-text em {
          font-style: normal;
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #FF553D;
          opacity: 0.85;
        }

        /* Shortcode Terminal side */
        .tw-shortcode-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .tw-terminal-box {
          border: 1px solid var(--line-strong);
          border-radius: 6px;
          background: var(--ink-2);
          overflow: hidden;
          padding: 12px;
        }

        .tw-term-chrome {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 10px;
        }

        .tw-term-dots {
          display: flex;
          gap: 5px;
        }

        .tw-term-dots i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--line-strong);
        }

        .tw-term-title {
          font-size: 10.5px;
          color: var(--accent);
          letter-spacing: 0.08em;
        }

        .tw-term-pill {
          font-size: 9px;
          color: var(--muted);
          background: var(--ink);
          padding: 2px 6px;
          border-radius: 2px;
          border: 1px solid var(--line);
        }

        .tw-screen {
          min-height: 86px;
          padding: 10px 12px;
          background: #05070B;
          border: 1px solid var(--line);
          border-radius: 4px;
          font-size: 11px;
          line-height: 1.6;
          color: #94A3B8;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 12px;
        }

        .tw-term-line.command {
          color: var(--paper);
          font-weight: 500;
        }

        .tw-term-line.metric {
          color: #94A3B8;
        }

        .tw-term-line.ok {
          color: #38BDF8;
          font-weight: 600;
        }

        .tw-caret {
          display: inline-block;
          width: 6px;
          height: 11px;
          margin-left: 4px;
          background: var(--accent);
          vertical-align: -1px;
          animation: twBlink 0.9s steps(2) infinite;
        }

        @keyframes twBlink {
          50% { opacity: 0; }
        }

        .tw-pad-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--faint);
          margin-bottom: 8px;
        }

        .tw-pad-live {
          color: var(--accent);
          font-size: 8.5px;
        }

        .tw-keys-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 6px;
        }

        .tw-key-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          padding: 6px 8px;
          background: var(--ink);
          border: 1px solid var(--line);
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .tw-key-btn:hover {
          border-color: var(--accent);
          background: rgba(0, 229, 255, 0.06);
        }

        .tw-key-btn.is-active {
          border-color: var(--accent);
          background: rgba(0, 229, 255, 0.12);
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.2);
        }

        .key-code {
          font-size: 10px;
          font-weight: 700;
          color: var(--paper);
          letter-spacing: 0.05em;
        }

        .tw-key-btn.is-active .key-code {
          color: var(--accent);
        }

        .key-desc {
          font-size: 8.5px;
          color: var(--faint);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* Mini checklist */
        .tw-mini {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: var(--muted);
        }

        .tw-mini li {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mini-num {
          font-size: 9.5px;
          color: var(--accent);
          opacity: 0.8;
          border: 1px solid rgba(0, 229, 255, 0.25);
          padding: 1px 4px;
          border-radius: 2px;
        }

        .tw-mini li.ok span:last-child {
          color: var(--paper);
          font-weight: 500;
        }

        /* Footer */
        .tw-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }

        .tw-count {
          font-size: 10.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--faint);
        }

        .tw-count b {
          font-size: 18px;
          color: var(--paper);
          font-weight: 600;
          margin-right: 3px;
        }

        .direct-count b {
          color: var(--accent);
        }

        .tw-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tw-chips i {
          font-style: normal;
          font-size: 9.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 8px;
          border: 1px solid var(--line-strong);
          color: var(--muted);
        }

        .tw-chips i::before {
          content: "✕ ";
          color: #FF553D;
        }

        .tw-chips.good i {
          border-color: rgba(0, 229, 255, 0.35);
          color: var(--accent);
          background: rgba(0, 229, 255, 0.04);
        }

        .tw-chips.good i::before {
          content: "✓ ";
          color: inherit;
        }

        .tw-note {
          margin: 0;
          padding: 16px 22px;
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

        @media (max-width: 840px) {
          .tw-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .tw-panel {
            padding: 18px 16px;
          }
          .tw-keys-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .tw-foot {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
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
