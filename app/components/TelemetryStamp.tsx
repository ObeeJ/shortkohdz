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
  const [variant, setVariant] = useState<"terminal" | "glass">("terminal");
  const [copied, setCopied] = useState(false);
  const [clocks, setClocks] = useState({ us: "04:46", wat: "09:46" });

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
    <div className={`inline-flex flex-col gap-2 ${className}`}>
      {/* Variant Selector Tabs */}
      <div className="inline-flex items-center gap-1.5 self-start">
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest mr-1">
          STYLE:
        </span>
        <button
          type="button"
          onClick={() => setVariant("terminal")}
          className={`px-2 py-0.5 rounded text-[9.5px] font-mono transition-all duration-200 border ${
            variant === "terminal"
              ? "bg-[#FF553D]/15 text-[#FF553D] border-[#FF553D]/40 font-semibold"
              : "bg-white/[0.03] text-white/50 border-white/10 hover:text-white"
          }`}
        >
          4. TERMINAL RIBBON
        </button>
        <button
          type="button"
          onClick={() => setVariant("glass")}
          className={`px-2 py-0.5 rounded text-[9.5px] font-mono transition-all duration-200 border ${
            variant === "glass"
              ? "bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/40 font-semibold"
              : "bg-white/[0.03] text-white/50 border-white/10 hover:text-white"
          }`}
        >
          5. GLASS HUD
        </button>
      </div>

      {/* OPTION 4: INTERACTIVE TERMINAL RIBBON */}
      {variant === "terminal" && (
        <div
          className="inline-flex items-center flex-wrap gap-2 sm:gap-3 px-3 py-2 rounded-md font-mono text-[11px] select-none transition-all duration-300"
          style={{
            backgroundColor: "#0A0D14",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
          role="status"
          aria-label={`System Status: ${status}, Location: ${location}, Clocks: US ET ${clocks.us}, WAT ${clocks.wat}, USSD: ${dialCode}`}
        >
          {/* 1. Terminal Prompt & Live Command */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
            <span className="text-[#FF553D] font-bold">skd</span>
            <span className="text-white/30">:</span>
            <span className="text-[#38BDF8]">~</span>
            <span className="text-white/40">$</span>
            <span className="text-white/80 font-medium ml-0.5">telemetry</span>
            <span className="w-1.5 h-3 bg-[#FF553D] animate-pulse inline-block ml-0.5" />
          </div>

          {/* 2. Uptime / Status Pill */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="font-semibold tracking-wider text-[10px]">{status}</span>
            <span className="text-emerald-500/60 text-[9px]">// 24ms</span>
          </div>

          {/* 3. Node Location */}
          <div className="flex items-center gap-1 text-white/50 px-1">
            <Globe size={11} className="text-[#38BDF8]/80" />
            <span className="text-white/70 font-medium">{location}</span>
          </div>

          {/* 4. Synchronized Clocks */}
          <div className="flex items-center gap-1.5 text-white/50 px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
            <Activity size={10} className="text-[#FF553D]" />
            <span>NYC</span>
            <span className="text-white/90 font-medium">{clocks.us}</span>
            <span className="text-white/20">/</span>
            <span>LOS</span>
            <span className="text-white/90 font-medium">{clocks.wat}</span>
          </div>

          {/* 5. Clickable USSD Terminal Trigger */}
          <div className="flex items-center gap-1 pl-1 ml-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#FF553D]/10 hover:bg-[#FF553D]/20 border border-[#FF553D]/30 text-[#FF553D] transition-colors"
              title="Click to copy USSD dial string"
            >
              <span className="font-bold tracking-wider">{copied ? "COPIED" : dialCode}</span>
              {copied ? <Check size={10} /> : <Copy size={10} />}
            </button>

            <a
              href="#console"
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/10"
              title="Open interactive USSD terminal"
            >
              <Terminal size={11} />
            </a>
          </div>
        </div>
      )}

      {/* OPTION 5: HIGH-DENSITY GLASS HUD */}
      {variant === "glass" && (
        <div
          className="inline-flex items-center flex-wrap gap-2.5 sm:gap-3 px-3.5 py-1.5 rounded-full font-mono text-[11px] select-none transition-all duration-300 backdrop-blur-xl"
          style={{
            backgroundColor: "rgba(14, 18, 27, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.12)",
          }}
          role="status"
          aria-label={`System Status: ${status}, Location: ${location}, Clocks: US ET ${clocks.us}, WAT ${clocks.wat}, USSD: ${dialCode}`}
        >
          {/* 1. System Status with Pulse Ring */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
              SYS
            </span>
            <span className="text-emerald-400 font-bold tracking-wider">{status}</span>
          </div>

          <span className="h-3.5 w-px bg-white/10" aria-hidden="true" />

          {/* 2. Global Node Location */}
          <div className="flex items-center gap-1.5">
            <Globe size={12} className="text-[#38BDF8]" />
            <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
              NODE
            </span>
            <span className="text-white/90 font-medium">{location}</span>
          </div>

          <span className="h-3.5 w-px bg-white/10" aria-hidden="true" />

          {/* 3. Dual Clocks */}
          <div className="flex items-center gap-1.5">
            <Activity size={11} className="text-[#FF553D]" />
            <span className="text-white/50 text-[10px]">US ET</span>
            <span className="text-white/90 font-medium">{clocks.us}</span>
            <span className="text-white/20">/</span>
            <span className="text-white/50 text-[10px]">WAT</span>
            <span className="text-white/90 font-medium">{clocks.wat}</span>
          </div>

          <span className="h-3.5 w-px bg-white/10" aria-hidden="true" />

          {/* 4. Tactile Glass USSD Button */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-[#FF553D]/15 border border-white/10 hover:border-[#FF553D]/40 text-white/90 hover:text-[#FF553D] transition-all duration-200"
              title="Click to copy USSD dial string"
            >
              <span className="font-semibold tracking-wider text-[10.5px]">
                {copied ? "COPIED" : dialCode}
              </span>
              {copied ? (
                <Check size={10} className="text-emerald-400" />
              ) : (
                <Copy size={10} className="opacity-60" />
              )}
            </button>

            <a
              href="#console"
              className="flex items-center justify-center h-6 w-6 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/60 hover:text-white transition-colors border border-white/10"
              title="Open interactive USSD terminal"
            >
              <Terminal size={11} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
