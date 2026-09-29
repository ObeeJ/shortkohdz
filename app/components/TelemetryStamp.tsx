"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Terminal, Globe, Activity } from "lucide-react";

interface TelemetryStampProps {
  status?: string;
  location?: string;
  dialCode?: string;
  className?: string;
}

export function HeroTelemetryStamp({
  status = "ONLINE",
  location = "EARTH",
  dialCode = "*SHORTKOHDZ#",
  className = "",
}: TelemetryStampProps) {
  const [copied, setCopied] = useState(false);
  const [clocks, setClocks] = useState({ us: "--:--", wat: "--:--" });

  useEffect(() => {
    const usFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const watFmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tick = () => {
      const now = new Date();
      setClocks({
        us: usFmt.format(now),
        wat: watFmt.format(now),
      });
    };

    tick();
    const id = window.setInterval(tick, 10000);
    return () => window.clearInterval(id);
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(dialCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`hero-telemetry-stamp ${className}`}
      role="status"
      aria-label={`System Status: ${status}, Location: ${location}, Clocks: US ET ${clocks.us}, WAT ${clocks.wat}, USSD: ${dialCode}`}
    >
      {/* 1. Status Indicator */}
      <div className="telemetry-segment">
        <span className="telemetry-beacon" aria-hidden="true">
          <span className="beacon-dot" />
        </span>
        <span className="telemetry-key">SYS</span>
        <span className="telemetry-val telemetry-active">{status}</span>
      </div>

      <span className="telemetry-divider" aria-hidden="true" />

      {/* 2. Global Node Location (Earth) */}
      <div className="telemetry-segment">
        <Globe size={11} className="telemetry-icon" aria-hidden="true" />
        <span className="telemetry-key">NODE</span>
        <span className="telemetry-val">{location}</span>
      </div>

      <span className="telemetry-divider" aria-hidden="true" />

      {/* 3. Dual Timezones (US ET & WAT) */}
      <div className="telemetry-segment telemetry-clocks">
        <Activity size={10} className="telemetry-icon" aria-hidden="true" />
        <span className="clock-item">
          <span className="telemetry-key">US ET</span>
          <span className="telemetry-val">{clocks.us}</span>
        </span>
        <span className="clock-sub-divider">/</span>
        <span className="clock-item">
          <span className="telemetry-key">WAT</span>
          <span className="telemetry-val">{clocks.wat}</span>
        </span>
      </div>

      <span className="telemetry-divider" aria-hidden="true" />

      {/* 4. Tactile USSD Dial String & Console Trigger */}
      <div className="telemetry-segment telemetry-dial-group">
        <button
          type="button"
          onClick={handleCopy}
          className={`telemetry-dial-btn ${copied ? "is-copied" : ""}`}
          title="Click to copy USSD dial string"
          aria-label={copied ? "Copied to clipboard" : `Copy ${dialCode} to clipboard`}
        >
          {copied ? (
            <>
              <Check size={10} className="copy-icon" aria-hidden="true" />
              <span className="dial-code">COPIED</span>
            </>
          ) : (
            <>
              <span className="dial-code">{dialCode}</span>
              <Copy size={9} className="copy-icon" aria-hidden="true" />
            </>
          )}
        </button>

        <a
          href="#console"
          className="telemetry-console-link"
          title="Open interactive USSD terminal"
          aria-label="Open interactive USSD terminal"
        >
          <Terminal size={10} />
        </a>
      </div>
    </div>
  );
}
