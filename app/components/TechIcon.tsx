"use client";

import {
  SiGo,
  SiReact,
  SiPostgresql,
  SiRedis,
  SiNextdotjs,
  SiRust,
  SiPython,
  SiDotnet,
  SiTypescript,
  SiDocker,
  SiKubernetes,
  SiLinux,
  SiTailwindcss,
  SiFastapi,
  SiBun,
  SiVite,
  SiNestjs,
  SiAirtable,
} from "react-icons/si";
import { FiCloud, FiCreditCard, FiCpu, FiRadio, FiTerminal } from "react-icons/fi";
import type { IconType } from "react-icons";

/* ============================================================
   TechIcon — Real Brand Logos & Clean Branded SVG Pills
   Maps stack/technology names to brand icons + tuned colors.
   Supports dark and light themes seamlessly.
   ============================================================ */
type Tech = { icon: IconType; color?: string };

const TECH: Record<string, Tech> = {
  // Languages & Core Runtimes
  Go: { icon: SiGo, color: "#00ADD8" },
  "Go 1.25": { icon: SiGo, color: "#00ADD8" },
  "Go (Fiber)": { icon: SiGo, color: "#00ADD8" },
  Fiber: { icon: SiGo, color: "#00ADD8" },
  "Fiber v2": { icon: SiGo, color: "#00ADD8" },
  Rust: { icon: SiRust, color: "var(--paper)" },
  "Rust (Axum)": { icon: SiRust, color: "var(--paper)" },
  Tokio: { icon: SiRust, color: "var(--paper)" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#3776AB" },
  Bun: { icon: SiBun, color: "#FBF0DF" },
  ".NET": { icon: SiDotnet, color: "#8B6CF0" },

  // Web & Frameworks
  React: { icon: SiReact, color: "#61DAFB" },
  "React 19": { icon: SiReact, color: "#61DAFB" },
  "React PWA": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "var(--paper)" },
  "Next.js 16": { icon: SiNextdotjs, color: "var(--paper)" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  Vite: { icon: SiVite, color: "#646CFF" },
  "Vite/React": { icon: SiVite, color: "#646CFF" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  Tailwind: { icon: SiTailwindcss, color: "#06B6D4" },

  // Databases & Stores
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Postgres: { icon: SiPostgresql, color: "#4169E1" },
  "pgx/v5": { icon: SiPostgresql, color: "#4169E1" },
  Redis: { icon: SiRedis, color: "#FF4438" },
  bbolt: { icon: FiTerminal, color: "#00ADD8" },

  // DevOps, Cloud & Infra
  Docker: { icon: SiDocker, color: "#2496ED" },
  "Docker Compose": { icon: SiDocker, color: "#2496ED" },
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  Linux: { icon: SiLinux, color: "var(--paper)" },
  "Cloud/IaC": { icon: FiCloud, color: "#9CC2D4" },
  "Cloudflare R2": { icon: FiCloud, color: "#F38020" },

  // Integrations & Protocols
  Paystack: { icon: FiCreditCard, color: "#0AA5FF" },
  "Paystack DVA": { icon: FiCreditCard, color: "#0AA5FF" },
  "Airtable API": { icon: SiAirtable, color: "#18BFFF" },
  "Airtable": { icon: SiAirtable, color: "#18BFFF" },
  WebSocket: { icon: FiRadio, color: "var(--accent)" },
  gRPC: { icon: FiCpu, color: "#244C5A" },
};

export function TechIcon({ name, size = 12 }: { name: string; size?: number }) {
  // Direct match or partial prefix lookup
  let tech = TECH[name];
  if (!tech) {
    const key = Object.keys(TECH).find((k) => name.toLowerCase().includes(k.toLowerCase()));
    if (key) tech = TECH[key];
  }
  if (!tech) return null;
  const Icon = tech.icon;
  return <Icon size={size} color={tech.color} aria-hidden className="tech-chip-icon" />;
}

export function StackBadge({ name }: { name: string }) {
  return (
    <span className="stack-chip">
      <TechIcon name={name} size={11} />
      <span>{name}</span>
    </span>
  );
}

/** Primary stack of a project — used for the top-right card mark. */
export function primaryStack(stacks: string[]): string | null {
  return stacks.find((s) => s in TECH) ?? null;
}
