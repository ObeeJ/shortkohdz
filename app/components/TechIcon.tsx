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
  SiTanstack,
  SiReactquery,
  SiMui,
  SiSentry,
  SiTerraform,
  SiGooglecloud,
  SiCloudflare,
  SiFastify,
  SiSequelize,
  SiPrisma,
  SiGithubactions,
  SiFfmpeg,
  SiSqlite,
  SiSignal,
  SiApachekafka,
  SiNodedotjs,
  SiGraphql,
  SiHashicorp,
  SiGin,
  SiPytorch,
  SiOllama,
  SiVercel,
  SiRailway,
  SiSupabase,
  SiShadcnui,
  SiStripe,
  SiGooglemaps,
  SiJest,
  SiVitest,
  SiLightning,
  SiBitcoin,
  SiPostman,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
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

  // Cloud platforms & tooling
  AWS: { icon: FaAws, color: "#FF9900" },
  "AWS Lambda": { icon: FaAws, color: "#FF9900" },
  "AWS ECS": { icon: FaAws, color: "#FF9900" },
  GCP: { icon: SiGooglecloud, color: "#4285F4" },
  "GCP Pub/Sub": { icon: SiGooglecloud, color: "#4285F4" },
  "Cloud Run": { icon: SiGooglecloud, color: "#4285F4" },
  "Google Maps": { icon: SiGooglemaps, color: "#34A853" },
  Terraform: { icon: SiTerraform, color: "#844FBA" },
  Cloudflare: { icon: SiCloudflare, color: "#F38020" },
  Sentry: { icon: SiSentry, color: "#A78BFA" },
  "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
  Vercel: { icon: SiVercel, color: "var(--paper)" },
  Railway: { icon: SiRailway, color: "var(--paper)" },
  Supabase: { icon: SiSupabase, color: "#3FCF8E" },
  HashiCorp: { icon: SiHashicorp, color: "var(--paper)" },
  Kafka: { icon: SiApachekafka, color: "var(--paper)" },
  Postman: { icon: SiPostman, color: "#FF6C37" },

  // Backend & data libraries
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  Fastify: { icon: SiFastify, color: "var(--paper)" },
  Sequelize: { icon: SiSequelize, color: "#52B0E7" },
  Prisma: { icon: SiPrisma, color: "#7C8AF0" },
  BullMQ: { icon: SiRedis, color: "#FF4438" },
  SQLite: { icon: SiSqlite, color: "#5AB1E0" },
  GraphQL: { icon: SiGraphql, color: "#E10098" },
  Gin: { icon: SiGin, color: "#00ADD8" },

  // Frontend libraries
  "TanStack Query": { icon: SiReactquery, color: "#FF4154" },
  TanStack: { icon: SiTanstack, color: "#FF4154" },
  "React Query": { icon: SiReactquery, color: "#FF4154" },
  "Base UI": { icon: SiMui, color: "#007FFF" },
  "shadcn/ui": { icon: SiShadcnui, color: "var(--paper)" },
  Jest: { icon: SiJest, color: "#C21325" },
  Vitest: { icon: SiVitest, color: "#6E9F18" },

  // Media, crypto & AI
  FFmpeg: { icon: SiFfmpeg, color: "#3CB554" },
  "Signal Protocol": { icon: SiSignal, color: "#3A76F0" },
  PyTorch: { icon: SiPytorch, color: "#EE4C2C" },
  Ollama: { icon: SiOllama, color: "var(--paper)" },
  Lightning: { icon: SiLightning, color: "#792EE5" },
  Stablecoin: { icon: SiBitcoin, color: "#F7931A" },
  Stripe: { icon: SiStripe, color: "#635BFF" },

  // Integrations & Protocols
  Paystack: { icon: FiCreditCard, color: "#0AA5FF" },
  "Paystack DVA": { icon: FiCreditCard, color: "#0AA5FF" },
  "Airtable API": { icon: SiAirtable, color: "#18BFFF" },
  "Airtable": { icon: SiAirtable, color: "#18BFFF" },
  WebSocket: { icon: FiRadio, color: "var(--accent)" },
  gRPC: { icon: FiCpu, color: "#244C5A" },
};

const esc = (k: string) => k.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
const KEYS = Object.keys(TECH)
  .sort((a, b) => b.length - a.length)
  .map((k) => ({ k, rx: new RegExp(`(^|[^a-z0-9])${esc(k)}([^a-z0-9]|$)`, "i") }));

function lookup(name: string): Tech | undefined {
  if (TECH[name]) return TECH[name];
  const hit = KEYS.find(({ rx }) => rx.test(name));
  return hit ? TECH[hit.k] : undefined;
}

export function TechIcon({ name, size = 12 }: { name: string; size?: number }) {
  const tech = lookup(name);
  if (!tech) return null;
  const Icon = tech.icon;
  return <Icon size={size} color={tech.color} aria-hidden className="tech-chip-icon" />;
}

export function StackBadge({ name }: { name: string }) {
  return (
    <span className="mono stack-chip">
      <TechIcon name={name} size={11} />
      <span>{name}</span>
    </span>
  );
}

/** Primary stack of a project — used for the top-right card mark. */
export function primaryStack(stacks: string[]): string | null {
  return stacks.find((s) => lookup(s)) ?? null;
}
