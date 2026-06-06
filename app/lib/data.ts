import projectsJson from "../../projects.json";

/* ============================================================
   Engineering projects — sourced from projects.json
   ============================================================ */
export type Project = {
  id: string;
  name: string;
  industry: string;
  tags: string[];
  go: boolean;
  status: "full" | "wip" | "ship" | string;
  stacks: string[];
  chips: string[];
  tagline: string;
  problem: string;
  solution: string;
  system: string;
  dsa: string;
  why: string;
  innovation: string;
  metrics: string[];
  potential?: string;
  repos?: string[][]; // [label, url] pairs
  live?: string | null;
  note?: string;
};

export const projects = (projectsJson as unknown as { projects: Project[] })
  .projects;

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const STATUS_LABEL: Record<string, string> = {
  full: "full-stack",
  wip: "in progress",
  ship: "shipped",
};

export const STATUS_DOT: Record<string, string> = {
  full: "#00ADD8",
  wip: "#FF553D",
  ship: "#3dd7c0",
};

// Unique industries + a curated stack list for the filter pills.
export const industries = [
  "all",
  ...Array.from(new Set(projects.map((p) => p.industry))),
];
export const stacks = [
  "all",
  "Go",
  "Rust",
  "React",
  "Python",
  ".NET",
  "Cloud/IaC",
  "Postgres",
  "Redis",
];

/* ============================================================
   Ventures — the holdco family (from brand identity v1)
   Each venture keeps its own identity; the parent endorses.
   ============================================================ */
export type Venture = {
  id: string;
  name: string;
  sector: string;
  desc: string;
  status: "live" | "building" | "tba";
};

export const ventures: Venture[] = [
  {
    id: "bukr",
    name: "bukr",
    sector: "events · commerce",
    desc: "Event ticketing built for Nigerian price-sensitivity. Hybrid smart pricing, gross-up Paystack handling, organiser-first fees.",
    status: "live",
  },
  {
    id: "luxebeau",
    name: "luxebeau",
    sector: "beauty commerce",
    desc: "Africa-first unisex beauty commerce — buyer, seller, beautician, admin. A PWA with its own purple/teal identity.",
    status: "building",
  },
  {
    id: "speedplus",
    name: "speedplus",
    sector: "logistics",
    desc: "Last-mile delivery — direct from sender to door, network-redundant by design so a drop never goes dark.",
    status: "building",
  },
  {
    id: "cedar",
    name: "cedar",
    sector: "fintech rails",
    desc: "Money that moves where the network can't always reach. The dial-tone of the family — value transfer, on the worst day.",
    status: "building",
  },
  {
    id: "sozo",
    name: "sozo",
    sector: "health · finance",
    desc: "Where health meets finance — care that doesn't break the household budget.",
    status: "building",
  },
  {
    id: "tba",
    name: "tba",
    sector: "future venture",
    desc: "The asterisk has room. Six arms today; the mark is built to grow.",
    status: "tba",
  },
];
