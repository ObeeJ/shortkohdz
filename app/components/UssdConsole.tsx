"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dual-tone multi-frequency (DTMF) standard frequencies for telecom audio synthesis
const DTMF_FREQS: Record<string, [number, number]> = {
  "1": [697, 1209], "2": [697, 1336], "3": [697, 1477],
  "4": [770, 1209], "5": [770, 1336], "6": [770, 1477],
  "7": [852, 1209], "8": [852, 1336], "9": [852, 1477],
  "*": [941, 1209], "0": [941, 1336], "#": [941, 1477],
};

type SessionState = "idle" | "main_menu" | "ventures" | "infra" | "telemetry" | "contact" | "venture_detail";

interface LogEntry {
  type: "in" | "out" | "sys";
  text: string;
  time: string;
}

const SHORTCODES = [
  { code: "*100#", label: "Ventures", desc: "Akin, Corvus, Payroll" },
  { code: "*200#", label: "Engineering", desc: "Concurrency & Rails" },
  { code: "*300#", label: "Telemetry", desc: "99.998% Uptime · 14ms" },
  { code: "*400#", label: "Direct Line", desc: "Contact & Schedule" },
];

export function UssdConsole() {
  const [inputVal, setInputVal] = useState("*100#");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: "sys",
      text: "USSD GATEWAY v2.4 // READY · DIAL ANY SHORTCODE (*100# - *400#)",
      time: "00:00:01",
    },
    {
      type: "out",
      text: `01 · SHORTKOHDZ HOLDCO MENU
*100# — VENTURES & PORTFOLIO
*200# — MACHINERY & STACK
*300# — LIVE TELEMETRY
*400# — DIRECT LINE (CALL/EMAIL)
Tap a code below or dial on keypad.`,
      time: "00:00:02",
    },
  ]);
  const [session, setSession] = useState<SessionState>("main_menu");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Play subtle DTMF audio tone
  const playTone = (key: string) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const freqs = DTMF_FREQS[key] || [500, 750];
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.12);
      osc2.stop(now + 0.12);
    } catch (e) {
      // Audio not allowed or unsupported
    }
  };

  const handleKeyPress = (char: string) => {
    playTone(char);
    setInputVal((prev) => (prev.length < 16 ? prev + char : prev));
  };

  const handleBackspace = () => {
    playTone("0");
    setInputVal((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    playTone("*");
    setInputVal("");
  };

  const executeCommand = (cmd: string) => {
    const raw = cmd.trim();
    if (!raw) return;

    const time = new Date().toTimeString().split(" ")[0];
    const newLogs: LogEntry[] = [...logs, { type: "in", text: raw, time }];

    let responseText = "";

    switch (raw) {
      case "*100#":
      case "1":
        setSession("ventures");
        responseText = `[USSD 200 OK] 01 · VENTURES
1. AKIN — Student Mobility & Locked-Ledger Fund (Go/Vite PWA)
2. CORVUS — Stateful Network Scanner & UDP Gossip Mesh (Go/Next.js)
3. GO-PAYROLL-ENGINE — Async Bulk Salary Disbursement (Gin/Redis/Bloom)
4. SHORTKOHDZ HOLDCO — Infrastructure & Parent Architecture
Reply 1-3 for system specs, or *999# for Menu.`;
        break;

      case "*200#":
      case "2":
        setSession("infra");
        responseText = `[USSD 200 OK] 02 · MACHINERY & STACK
ENGINEERING PILLARS:
• Concurrency: Worker pools, channels, pessimistic locking (GORM UPDATE).
• Reliability: Idempotency keys, Bloom filters, temporal stores.
• Mesh & Wire: Encrypted UDP gossip, Fiber WebSockets, REST APIs.
• Polyglot: Go 1.25, Rust, TypeScript, Python, CKA Certified & Agentic AI.`;
        break;

      case "*300#":
      case "3":
        setSession("telemetry");
        responseText = `[USSD 200 OK] 03 · LIVE TELEMETRY
REGION:           AF-WEST-1 (LAGOS/LONDON)
UPTIME:           99.998% SLA
P99 LATENCY:      14.2ms
DOUBLE-SPEND:     0 INCIDENTS
ACTIVE RAILS:     6 PROVISIONED
SYSTEM STATUS:    ALL SYSTEMS NOMINAL`;
        break;

      case "*400#":
      case "4":
        setSession("contact");
        responseText = `[USSD 200 OK] 04 · DIRECT LINE
ENGINEER:         Obanijesu Ajayi
EMAIL:            ajayiobanijesu2000@gmail.com
GITHUB:           github.com/ObeeJ
LINKEDIN:         linkedin.com/in/obanijesuajayi
STATUS:           AVAILABLE FOR ADVISORY & INFRASTRUCTURE ROLES`;
        break;

      case "*999#":
      case "*help#":
      case "0":
      case "00":
        setSession("main_menu");
        responseText = `01 · SHORTKOHDZ MENU RESET
*100# — VENTURES & PORTFOLIO
*200# — MACHINERY & STACK
*300# — LIVE TELEMETRY
*400# — DIRECT LINE`;
        break;

      default:
        responseText = `[USSD ERR 404] UNKNOWN SHORTCODE "${raw}".
Valid codes: *100#, *200#, *300#, *400#, *999# (or dial 0 for Menu).`;
        break;
    }

    newLogs.push({ type: "out", text: responseText, time });
    setLogs(newLogs);
    setInputVal("");

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);
  };

  return (
    <div className="skd-console-frame skd-scanlines crosshair-corner crosshair-corner-tl crosshair-corner-tr crosshair-corner-bl crosshair-corner-br">
      {/* Top telemetry status bar */}
      <div className="skd-console-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="skd-live-dot" />
          <span className="mono" style={{ fontSize: 10, letterSpacing: ".14em", color: "var(--paper)" }}>
            USSD GATEWAY // *SHORTKOHDZ#
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="mono" style={{ fontSize: 9.5, color: "var(--faint)", letterSpacing: ".08em" }}>
            AUDIO: {soundEnabled ? "ON" : "MUTED"}
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="skd-console-btn-sm mono"
            aria-label="Toggle terminal audio"
          >
            {soundEnabled ? "MUTE" : "UNMUTE"}
          </button>
        </div>
      </div>

      <div className="skd-console-body">
        {/* Output Screen */}
        <div className="skd-screen" ref={scrollRef}>
          <div className="skd-screen-watermark mono">TELECOM USSD v2.4 // PROTOCOL *123#</div>
          {logs.map((log, i) => (
            <div
              key={i}
              className={`skd-log-row ${
                log.type === "in" ? "skd-log-in" : log.type === "sys" ? "skd-log-sys" : "skd-log-out"
              }`}
            >
              <span className="mono skd-log-time">{log.time}</span>
              <pre className="skd-log-text">{log.text}</pre>
            </div>
          ))}
        </div>

        {/* Dialpad & Input Control */}
        <div className="skd-dial-pane">
          {/* Dial string display & Send */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(inputVal);
            }}
            className="skd-dial-display"
          >
            <span className="mono" style={{ color: "var(--accent)", fontSize: 13, userSelect: "none" }}>
              DIAL:
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. *100#"
              className="mono skd-dial-input"
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" className="skd-btn skd-btn--emerald skd-dial-send">
              SEND #
            </button>
          </form>

          {/* Quick Shortcode Badges */}
          <div className="skd-quick-chips">
            {SHORTCODES.map((sc) => (
              <button
                key={sc.code}
                onClick={() => {
                  playTone("1");
                  setInputVal(sc.code);
                  executeCommand(sc.code);
                }}
                className="skd-chip-btn mono"
              >
                <span className="skd-chip-code">{sc.code}</span>
                <span className="skd-chip-label">{sc.label}</span>
              </button>
            ))}
          </div>

          {/* Tactile Keypad */}
          <div className="skd-keypad">
            {[
              ["1", "2", "3"],
              ["4", "5", "6"],
              ["7", "8", "9"],
              ["*", "0", "#"],
            ].map((row, rIdx) => (
              <div key={rIdx} className="skd-keypad-row">
                {row.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => handleKeyPress(k)}
                    className="skd-keypad-key mono"
                  >
                    {k}
                  </button>
                ))}
              </div>
            ))}
            <div className="skd-keypad-actions">
              <button
                type="button"
                onClick={handleBackspace}
                className="skd-keypad-ctrl mono"
              >
                DEL
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="skd-keypad-ctrl mono"
              >
                CLR
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skd-console-frame {
          background: var(--terminal-bg);
          border: 1px solid var(--line-strong);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
          position: relative;
        }
        .skd-console-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: var(--ink-2);
          border-bottom: 1px solid var(--line);
        }
        .skd-console-btn-sm {
          background: transparent;
          border: 1px solid var(--line);
          color: var(--faint);
          padding: 3px 8px;
          font-size: 9px;
          letter-spacing: .08em;
          border-radius: 0px;
          cursor: pointer;
          transition: all .2s;
        }
        .skd-console-btn-sm:hover {
          color: var(--paper);
          border-color: var(--accent);
        }
        .skd-console-body {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          min-height: 380px;
        }
        @media (max-width: 860px) {
          .skd-console-body {
            grid-template-columns: 1fr;
          }
        }
        .skd-screen {
          background: var(--terminal-bg);
          padding: 18px 20px;
          border-right: 1px solid var(--line);
          overflow-y: auto;
          max-height: 420px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .skd-screen-watermark {
          position: absolute;
          top: 8px;
          right: 14px;
          font-size: 8.5px;
          letter-spacing: .12em;
          color: var(--line);
          pointer-events: none;
        }
        .skd-log-row {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .skd-log-time {
          font-size: 9px;
          color: var(--faint);
          letter-spacing: .06em;
        }
        .skd-log-text {
          font-family: var(--font-mono), monospace;
          font-size: 11.5px;
          line-height: 1.5;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .skd-log-in .skd-log-text {
          color: var(--accent);
          font-weight: 500;
        }
        .skd-log-in .skd-log-text::before {
          content: "> ";
        }
        .skd-log-out .skd-log-text {
          color: var(--terminal-text);
        }
        .skd-log-sys .skd-log-text {
          color: var(--accent, #FF553D);
          font-size: 10px;
          letter-spacing: .04em;
        }
        .skd-dial-pane {
          background: var(--ink-2);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .skd-dial-display {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--terminal-bg);
          border: 1px solid var(--line-strong);
          padding: 6px 8px;
        }
        .skd-dial-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--paper);
          font-size: 13px;
          letter-spacing: .08em;
        }
        .skd-dial-send {
          padding: 8px 14px;
          font-size: 10.5px;
        }
        .skd-quick-chips {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .skd-chip-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 10px;
          background: var(--terminal-surface);
          border: 1px solid var(--line-strong);
          color: var(--paper);
          font-size: 10px;
          text-align: left;
          cursor: pointer;
          border-radius: 0px;
          transition: all .18s;
        }
        .skd-chip-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .skd-chip-code {
          color: var(--accent);
          font-weight: 500;
        }
        .skd-chip-label {
          color: var(--muted);
          font-size: 9.5px;
        }
        .skd-keypad {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .skd-keypad-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 5px;
        }
        .skd-keypad-key {
          background: var(--terminal-surface);
          border: 1px solid var(--line-strong);
          color: var(--paper);
          font-size: 14px;
          font-weight: 500;
          padding: 10px 0;
          cursor: pointer;
          border-radius: 0px;
          transition: all .15s;
        }
        .skd-keypad-key:hover {
          background: var(--accent);
          color: #050711;
          border-color: var(--accent);
        }
        .skd-keypad-key:active {
          transform: scale(0.96);
        }
        .skd-keypad-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }
        .skd-keypad-ctrl {
          background: var(--terminal-surface);
          border: 1px solid var(--line-strong);
          color: var(--muted);
          font-size: 10px;
          padding: 7px 0;
          cursor: pointer;
          border-radius: 0px;
          transition: all .15s;
        }
        .skd-keypad-ctrl:hover {
          color: var(--paper);
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}
