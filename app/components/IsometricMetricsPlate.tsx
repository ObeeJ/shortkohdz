"use client";

import React from "react";

interface IsometricMetricsPlateProps {
  activeNodeName?: string;
  metricText?: string;
  className?: string;
}

export function IsometricMetricsPlate({
  activeNodeName = "CORE",
  metricText = "1440 · 12 COL",
  className = "",
}: IsometricMetricsPlateProps) {
  return (
    <div className={`iso-plate-wrapper ${className}`} role="img" aria-label="Isometric Architectural Telemetry Board">
      <svg
        className="iso-svg"
        viewBox="-210 -130 420 250"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="iso-led-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF553D" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FF553D" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF553D" stopOpacity="0" />
          </radialGradient>
          <filter id="iso-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g className="scene">
          {/* Base Isometric Plate Facets */}
          <g className="iso plate">
            <polygon
              className="f-left"
              points="-187.1,0.0 0.0,108.0 0.0,99.0 -187.1,-9.0"
            />
            <polygon
              className="f-right"
              points="187.1,0.0 0.0,108.0 0.0,99.0 187.1,-9.0"
            />
            <polygon
              className="f-top"
              points="0.0,-117.0 187.1,-9.0 0.0,99.0 -187.1,-9.0"
            />
          </g>

          {/* Contact Pad Grid */}
          <g className="pads">
            <circle className="pad" cx="0" cy="-101" r="1.8" />
            <circle className="pad" cx="22.516" cy="-88" r="1.8" />
            <circle className="pad" cx="45.032" cy="-75" r="1.8" />
            <circle className="pad" cx="67.548" cy="-62" r="1.8" />
            <circle className="pad" cx="90.064" cy="-49" r="1.8" />
            <circle className="pad" cx="112.58" cy="-36" r="1.8" />
            <circle className="pad" cx="135.096" cy="-23" r="1.8" />
            <circle className="pad" cx="157.612" cy="-10" r="1.8" />
            <circle className="pad" cx="-22.516" cy="-88" r="1.8" />
            <circle className="pad" cx="0" cy="-75" r="1.8" />
            <circle className="pad" cx="22.516" cy="-62" r="1.8" />
            <circle className="pad" cx="45.032" cy="-49" r="1.8" />
            <circle className="pad" cx="67.548" cy="-36" r="1.8" />
            <circle className="pad" cx="90.064" cy="-23" r="1.8" />
            <circle className="pad" cx="112.58" cy="-10" r="1.8" />
            <circle className="pad" cx="135.096" cy="3" r="1.8" />
            <circle className="pad" cx="-45.032" cy="-75" r="1.8" />
            <circle className="pad" cx="-22.516" cy="-62" r="1.8" />
            <circle className="pad" cx="0" cy="-49" r="1.8" />
            <circle className="pad" cx="22.516" cy="-36" r="1.8" />
            <circle className="pad" cx="45.032" cy="-23" r="1.8" />
            <circle className="pad" cx="67.548" cy="-10" r="1.8" />
            <circle className="pad" cx="90.064" cy="3" r="1.8" />
            <circle className="pad" cx="112.58" cy="16" r="1.8" />
            <circle className="pad" cx="-67.548" cy="-62" r="1.8" />
            <circle className="pad" cx="-45.032" cy="-49" r="1.8" />
            <circle className="pad" cx="-22.516" cy="-36" r="1.8" />
            <circle className="pad" cx="0" cy="-23" r="1.8" />
            <circle className="pad" cx="22.516" cy="-10" r="1.8" />
            <circle className="pad" cx="45.032" cy="3" r="1.8" />
            <circle className="pad" cx="67.548" cy="16" r="1.8" />
            <circle className="pad" cx="90.064" cy="29" r="1.8" />
            <circle className="pad" cx="-90.064" cy="-49" r="1.8" />
            <circle className="pad" cx="-67.548" cy="-36" r="1.8" />
            <circle className="pad" cx="-45.032" cy="-23" r="1.8" />
            <circle className="pad" cx="-22.516" cy="-10" r="1.8" />
            <circle className="pad" cx="0" cy="3" r="1.8" />
            <circle className="pad" cx="22.516" cy="16" r="1.8" />
            <circle className="pad" cx="45.032" cy="29" r="1.8" />
            <circle className="pad" cx="67.548" cy="42" r="1.8" />
            <circle className="pad" cx="-112.58" cy="-36" r="1.8" />
            <circle className="pad" cx="-90.064" cy="-23" r="1.8" />
            <circle className="pad" cx="-67.548" cy="-10" r="1.8" />
            <circle className="pad" cx="-45.032" cy="3" r="1.8" />
            <circle className="pad" cx="-22.516" cy="16" r="1.8" />
            <circle className="pad" cx="0" cy="29" r="1.8" />
            <circle className="pad" cx="22.516" cy="42" r="1.8" />
            <circle className="pad" cx="45.032" cy="55" r="1.8" />
            <circle className="pad" cx="-135.096" cy="-23" r="1.8" />
            <circle className="pad" cx="-112.58" cy="-10" r="1.8" />
            <circle className="pad" cx="-90.064" cy="3" r="1.8" />
            <circle className="pad" cx="-67.548" cy="16" r="1.8" />
            <circle className="pad" cx="-45.032" cy="29" r="1.8" />
            <circle className="pad" cx="-22.516" cy="42" r="1.8" />
            <circle className="pad" cx="0" cy="55" r="1.8" />
            <circle className="pad" cx="22.516" cy="68" r="1.8" />
            <circle className="pad" cx="-157.612" cy="-10" r="1.8" />
            <circle className="pad" cx="-135.096" cy="3" r="1.8" />
            <circle className="pad" cx="-112.58" cy="16" r="1.8" />
            <circle className="pad" cx="-90.064" cy="29" r="1.8" />
            <circle className="pad" cx="-67.548" cy="42" r="1.8" />
            <circle className="pad" cx="-45.032" cy="55" r="1.8" />
            <circle className="pad" cx="-22.516" cy="68" r="1.8" />
            <circle className="pad" cx="0" cy="81" r="1.8" />
          </g>

          {/* Cast Drop Shadows */}
          <polygon className="cast c1" points="0.0,-86.0 72.7,-44.0 0.0,-2.0 -72.7,-44.0" />
          <polygon className="cast c2" points="86.6,-36.0 149.0,0.0 102.2,27.0 39.8,-9.0" />
          <polygon className="cast c3" points="-88.3,-35.0 60.6,51.0 0.0,86.0 -149.0,0.0" />

          {/* Dropped Chip Module 1 (Compute Core) */}
          <g className="drop d1">
            <g className="iso">
              <polygon className="f-left" points="-72.7,-44.0 0.0,-2.0 0.0,-28.0 -72.7,-70.0" />
              <polygon className="f-right" points="72.7,-44.0 0.0,-2.0 0.0,-28.0 72.7,-70.0" />
              <polygon className="f-top" points="0.0,-112.0 72.7,-70.0 0.0,-28.0 -72.7,-70.0" />
            </g>
          </g>

          {/* Dropped Chip Module 2 (Memory / Bus) */}
          <g className="drop d2">
            <g className="iso">
              <polygon className="f-left" points="39.8,-9.0 102.2,27.0 102.2,11.0 39.8,-25.0" />
              <polygon className="f-right" points="149.0,0.0 102.2,27.0 102.2,11.0 149.0,-16.0" />
              <polygon className="f-top" points="86.6,-52.0 149.0,-16.0 102.2,11.0 39.8,-25.0" />
            </g>
            {/* Rule Lines */}
            <path className="rule" d="M83.1,-42.0 L131.6,-14.0" />
            <path className="rule" d="M71.0,-35.0 L119.5,-7.0" />
            <path className="rule" d="M58.9,-28.0 L107.4,0.0" />
          </g>

          {/* Dropped Chip Module 3 (Hot Telemetry Engine + LED) */}
          <g className="drop d3">
            <g className="iso hot">
              <polygon className="f-left" points="-149.0,0.0 0.0,86.0 0.0,66.0 -149.0,-20.0" />
              <polygon className="f-right" points="60.6,51.0 0.0,86.0 0.0,66.0 60.6,31.0" />
              <polygon className="f-top" points="-88.3,-55.0 60.6,31.0 0.0,66.0 -149.0,-20.0" />
            </g>
            <g className="ledg">
              <circle className="led-halo" cx="34.64" cy="30" r="10" fill="url(#iso-led-glow)" />
              <circle className="led" cx="34.64" cy="30" r="3.6" />
            </g>
          </g>

          {/* Tap Line and Probe Dot */}
          <g className="tap">
            <path className="ln" d="M-43.3 -65 v-34" />
            <circle className="dot" cx="-43.3" cy="-63" r="4.5" />
          </g>

          {/* Dimension Guidelines & Crosshairs */}
          <path className="dim" d="M-195.7,5.0 L-8.7,113.0" />
          <path className="dim" d="M-190.5,2.0 L-200.9,8.0 M-3.5,110.0 L-13.9,116.0" />

          {/* Technical Silk Annotations */}
          <text className="silk" x="-121.24" y="70" textAnchor="middle">
            {metricText.length > 18 ? metricText.slice(0, 18) + "…" : metricText}
          </text>
          <text className="silk" x="-95.26" y="-95" textAnchor="middle">
            {activeNodeName ? `U1·${activeNodeName.slice(0, 4).toUpperCase()}` : "U1"}
          </text>
          <text className="silk" x="181.86" y="35" textAnchor="middle">
            ART // 2026
          </text>
        </g>
      </svg>
    </div>
  );
}
