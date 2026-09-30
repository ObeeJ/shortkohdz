"use client";

import { useState } from "react";
import type { ProjectShot } from "../lib/data";

interface ProjectShotGalleryProps {
  shot?: string;
  shots?: (string | ProjectShot)[];
  name: string;
  live?: string | null;
  favicon?: string;
}

export function ProjectShotGallery({
  shot,
  shots,
  name,
  live,
  favicon,
}: ProjectShotGalleryProps) {
  // Normalize shots
  const normalizedShots: ProjectShot[] =
    shots && shots.length > 0
      ? shots.map((s, idx) =>
          typeof s === "string"
            ? { src: s, label: `View 0${idx + 1}` }
            : {
                src: s.src,
                label: s.label || `View 0${idx + 1}`,
                caption: s.caption,
              }
        )
      : shot
      ? [{ src: shot, label: "Live System", caption: `${name} primary interface preview` }]
      : [];

  const [activeIndex, setActiveIndex] = useState(0);

  if (normalizedShots.length === 0) return null;

  const current = normalizedShots[activeIndex] || normalizedShots[0];
  const hasMultiple = normalizedShots.length > 1;

  return (
    <div className="shot-gallery-root">
      <div className="hero-frame">
        {/* Browser Chrome Header */}
        <div className="hero-chrome">
          <div className="chrome-controls" aria-hidden="true">
            <i /> <i /> <i />
          </div>

          <div className="chrome-address">
            <span className="mono chrome-url">
              {favicon && <img src={favicon} alt="" width={12} height={12} className="chrome-favicon" />}
              {live ? live.replace("https://", "") : `${name.toLowerCase()}.app`}
            </span>
          </div>

          {hasMultiple && (
            <div className="chrome-tabs" role="tablist" aria-label="Screenshot viewpoints">
              {normalizedShots.map((s, i) => (
                <button
                  key={s.src + i}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === i}
                  onClick={() => setActiveIndex(i)}
                  className={`mono chrome-tab-btn ${activeIndex === i ? "is-active" : ""}`}
                >
                  <span className="tab-idx">0{i + 1}</span>
                  <span className="tab-label">{s.label}</span>
                </button>
              ))}
            </div>
          )}

          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="mono chrome-live-link"
              title={`Open ${name} in a new tab`}
            >
              LIVE ↗
            </a>
          )}
        </div>

        {/* Screenshot Viewport */}
        <div className="shot-viewport">
          <a
            href={live || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="shot-link"
            aria-label={`Open ${name} live site`}
          >
            <img
              key={current.src}
              src={current.src}
              alt={`${name} — ${current.label || "Screenshot"}`}
              className="shot-img"
              loading="eager"
            />
          </a>

          {/* Interactive Thumb overlay switcher for quick access if multiple */}
          {hasMultiple && (
            <div className="shot-pill-nav">
              {normalizedShots.map((s, i) => (
                <button
                  key={s.src + i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`shot-dot ${activeIndex === i ? "is-active" : ""}`}
                  aria-label={`Switch to screenshot ${i + 1}: ${s.label}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Caption & Annotation Bar */}
        {current.caption && (
          <div className="shot-meta-bar mono">
            <span className="meta-tag">
              SCREEN 0{activeIndex + 1} / 0{normalizedShots.length}
            </span>
            <span className="meta-divider">|</span>
            <span className="meta-caption">{current.caption}</span>
          </div>
        )}
      </div>

      <style>{`
        .shot-gallery-root {
          margin: 0 0 56px;
        }

        .hero-frame {
          display: block;
          max-width: 980px;
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          overflow: hidden;
          background: var(--ink-2);
          box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.65);
          transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
        }

        .hero-frame:hover {
          border-color:var(--stroke-hi);
          transform: translateY(-3px);
        }

        .hero-chrome {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border-bottom: 1px solid var(--line);
          background: rgba(14, 18, 26, 0.85);
          backdrop-filter: blur(8px);
          flex-wrap: wrap;
        }

        .chrome-controls {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chrome-controls i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--line-strong);
        }

        .chrome-address {
          display: flex;
          align-items: center;
        }

        .chrome-url {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10.5px;
          color: var(--muted);
          background: var(--ink);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid var(--line);
        }

        .chrome-tabs {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
        }

        .chrome-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 6px;
          color: var(--muted);
          font-size: 10px;
          padding: 4px 10px;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.2s ease;
        }

        .chrome-tab-btn:hover {
          color: var(--paper);
          border-color:var(--stroke-hi);
        }

        .chrome-tab-btn.is-active {
          background: rgba(0, 229, 255, 0.12);
          border-color:var(--stroke-hi);
          color: var(--accent);
          font-weight: 600;
        }

        .tab-idx {
          opacity: 0.65;
        }

        .chrome-live-link {
          font-size: 10px;
          color: var(--accent);
          background: rgba(0, 229, 255, 0.08);
          border:1px solid var(--stroke-hi);
          padding: 4px 10px;
          border-radius: 6px;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: background 0.2s;
        }

        .chrome-live-link:hover {
          background: var(--accent);
          color: var(--ink);
        }

        .shot-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #000;
        }

        .shot-link {
          display: block;
          width: 100%;
          cursor: pointer;
        }

        .shot-img {
          display: block;
          width: 100%;
          aspect-ratio: 1366 / 720;
          object-fit: cover;
          object-position: top;
          transition: opacity 0.3s ease, transform 0.4s ease;
        }

        .shot-pill-nav {
          position: absolute;
          bottom: 14px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(8, 11, 17, 0.78);
          backdrop-filter: blur(10px);
          border: 1px solid var(--line);
          border-radius: 20px;
          z-index: 5;
        }

        .shot-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s;
        }

        .shot-dot:hover {
          background: rgba(255, 255, 255, 0.7);
        }

        .shot-dot.is-active {
          background: var(--accent);
          transform: scale(1.25);
          box-shadow: 0 0 8px var(--accent);
        }

        .shot-meta-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: var(--ink-2);
          border-top: 1px solid var(--line);
          font-size: 11px;
          color: var(--muted);
          line-height: 1.5;
        }

        .meta-tag {
          color: var(--accent);
          white-space: nowrap;
          font-size: 10px;
          letter-spacing: 0.05em;
        }

        .meta-divider {
          color: var(--line-strong);
        }

        .meta-caption {
          color: var(--paper);
          opacity: 0.85;
          text-transform: none;
        }

        @media (max-width: 640px) {
          .chrome-tabs {
            margin-left: 0;
            width: 100%;
            justify-content: flex-start;
          }
          .shot-meta-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .meta-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
