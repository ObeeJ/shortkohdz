import {
  SiGo,
  SiReact,
  SiPostgresql,
  SiRedis,
  SiNextdotjs,
  SiRust,
  SiPython,
  SiDotnet,
} from "react-icons/si";
import { FiCloud } from "react-icons/fi";
import type { IconType } from "react-icons";

/* ============================================================
   TechIcon — real brand logos for the engineering stack list.
   Maps a stack name -> Simple Icons glyph + official brand color.
   "Cloud/IaC" has no single brand, so it uses a generic cloud.
   Colors are tuned to read on the ink (#0B0F14) background.
   ============================================================ */
type Tech = { icon: IconType; color: string };

const TECH: Record<string, Tech> = {
  Go: { icon: SiGo, color: "#00ADD8" },
  React: { icon: SiReact, color: "#61DAFB" },
  Postgres: { icon: SiPostgresql, color: "#7AA9FF" }, // lightened #4169E1 for dark bg
  Redis: { icon: SiRedis, color: "#FF4438" },
  "Next.js": { icon: SiNextdotjs, color: "#F4F0E8" }, // black brand -> paper on ink
  Rust: { icon: SiRust, color: "#F4F0E8" }, // black brand -> paper on ink
  Python: { icon: SiPython, color: "#6FA8DC" }, // lightened #3776AB
  ".NET": { icon: SiDotnet, color: "#8B6CF0" }, // lightened #512BD4
  "Cloud/IaC": { icon: FiCloud, color: "#9CC2D4" },
};

export function TechIcon({ name, size = 13 }: { name: string; size?: number }) {
  const tech = TECH[name];
  if (!tech) return null;
  const Icon = tech.icon;
  return <Icon size={size} color={tech.color} aria-hidden />;
}

export function StackBadge({ name }: { name: string }) {
  return (
    <span className="est-badge">
      <TechIcon name={name} />
      {name}
    </span>
  );
}

/** Primary stack of a project — used for the top-right card mark. */
export function primaryStack(stacks: string[]): string | null {
  return stacks.find((s) => s in TECH) ?? null;
}
