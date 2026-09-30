"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ArrowRight, Terminal, Shield, Zap, RefreshCw, Cpu, Layers, ExternalLink } from "lucide-react";
import { Mark } from "./components/ui";
import { TextRotate } from "@/components/ui/text-rotate";
import { UssdConsole } from "./components/UssdConsole";
import { TelemetryCorridor } from "./components/TelemetryCorridor";
import { TwoWaysIn } from "./components/TwoWaysIn";
import { TechIcon } from "./components/TechIcon";

const SOCIALS = [
  { href: "https://github.com/ObeeJ", label: "GitHub", Icon: FaGithub },
  { href: "https://linkedin.com/in/obanijesuajayi", label: "LinkedIn", Icon: FaLinkedin },
  { href: "mailto:ajayiobanijesu2000@gmail.com", label: "Email", Icon: FaEnvelope },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Editorial scroll reveal animation variants
const lineReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
      delay: i * 0.12,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const VENTURES = [
  {
    num: "01",
    id: "pcxpay",
    name: "PCXPay",
    role: "Senior SWE · DevOps & Backend Architecture",
    category: "Fintech / Global Payment Rails",
    status: "live",
    logo: "/brands/pcxpay_logo.svg",
    tagline: "Cross-border global payments infrastructure and multi-currency business settlements.",
    summary:
      "Architected and maintained multi-currency liquidity and payout rails across 20+ microservices. Integrated GTBank Squad Dedicated Virtual Accounts (DVAs) for automated funding, Smile ID for biometrics KYC/KYB compliance, and end-to-end Sentry telemetry.",
    stack: ["Python", "AWS ECS", "GTBank Squad", "Smile ID", "Sentry", "Redis", "Terraform"],
    metric: "20+ microservices · Zero DVA reconciliation drift",
    dsaLabel: "DISTRIBUTED IDEMPOTENCY & DVA",
    dsa: "Idempotent state machine with Redis distributed locks guarantees exactly-once transaction execution across asynchronous bank webhooks and multi-corridor currency exchanges.",
    live: "https://pcxpay.com",
    href: "/engineering/pcxpay",
  },
  {
    num: "02",
    id: "dwelix",
    name: "Dwelix",
    role: "Lead Engineer & Fullstack Systems Architect",
    category: "Proptech / Distributed Real Estate",
    status: "shipped",
    logo: "/brands/dwelix_logo.png",
    tagline: "Cloud-native rental marketplace with 3D virtual tours and audited legal escrow.",
    summary:
      "Managed the engineering team and architected 14 distributed microservices in Go (Fiber). Features 3D virtual tour pipeline, Google Maps spatial queries, Documenso legal agreement workflows, and automated scout coordinate fraud verification.",
    stack: ["Go 1.25", "Fiber", "14 Microservices", "gRPC", "GCP Pub/Sub", "3D Tours", "Cloudflare"],
    metric: "14 microservices · 88k LoC Go · gRPC & Pub/Sub",
    dsaLabel: "GEOSPATIAL ANOMALY & PUB/SUB",
    dsa: "Geospatial coordinate anomaly detection using spatial bounding-box indexing to detect spoofed property locations; atomic database transactions paired with cryptographic document hashing.",
    live: "https://dwelix.com",
    href: "/engineering/dwelix",
  },
  {
    num: "03",
    id: "mopcare",
    name: "Mopcare",
    role: "Fullstack Engineer & Platform Architect",
    category: "Healthtech / Diaspora Elder Care",
    status: "shipped",
    logo: "/brands/mopcare_logo.svg",
    tagline: "Healthcare & diaspora elder care management platform with automated caregiver dispatch.",
    summary:
      "Architected the central platform and API Gateway unifying multiple dashboards: Diaspora Client Portal, Senior Health Tracker, Caregiver Dispatch, and Healthcare Institutions. Engineered the Volunteer Management System (VMS) and accredited LMS.",
    stack: ["Go (Golang)", "React (TypeScript)", "API Gateway", "VMS", "Healthcare LMS", "Redis"],
    metric: "Unified 5 role portals · Automated VMS certification",
    dsaLabel: "API GATEWAY & RBAC",
    dsa: "Stateful task scheduling and caregiver assignment algorithm with conflict resolution and automated excuse re-routing. Role-based access control (RBAC) ensuring HIPAA/NDPR healthcare data isolation.",
    live: "https://mopcare.net",
    href: "/engineering/mopcare",
  },
  {
    num: "04",
    id: "scholelabs",
    name: "Scholelabs",
    role: "Senior Backend Engineer",
    category: "Edtech / School Operating System",
    status: "production",
    logo: "/brands/scholelabs_logo.svg",
    tagline: "Multitenant operating system and academic administration engine for educational institutions.",
    summary:
      "Engineered and maintained the core multitenant academic backend. Implemented high-performance Fastify HTTP engines, BullMQ background queues for asynchronous bulk operations, automated email delivery via Resend, and anti-bot/DDoS user purge mitigations.",
    stack: ["NestJS", "Fastify", "Sequelize ORM", "BullMQ", "Redis", "Resend", "Railway", "Sentry"],
    metric: "Strict multitenant isolation · BullMQ async workers",
    dsaLabel: "MULTITENANT QUEUES & SECURITY",
    dsa: "Multitenant tenant-scoping middleware guaranteeing zero cross-institution data leakage; BullMQ prioritization queues ensuring report card generation jobs never block interactive portal authentication.",
    live: "https://scholelabs.com",
    href: "/engineering/scholelabs",
  },
  {
    num: "05",
    id: "topnorch",
    name: "Topnorch",
    role: "Senior Fullstack & Product Engineer, DevOps",
    category: "AI & Workforce Automation",
    status: "shipped",
    logo: "/brands/topnorch_logo.svg",
    tagline: "Heavily AI-driven autonomous career acceleration engine and automated job application dispatcher.",
    summary:
      "Architected an autonomous, AI-driven career acceleration engine featuring a polyglot microservice pipeline. Built a high-throughput Rust parser for deep PDF resume AST extraction, Python pipelines utilizing vector cosine similarity and contextual LLM prompting to tailor resumes to incoming role specifications, and Go workers orchestrating rate-limited job dispatches with zero spam-triggering.",
    stack: ["Rust", "Python", "Go", "React (TS)", "Prisma", "Sentry", "Modular Monolith", "AI Pipeline"],
    metric: "Heavily AI-Driven · Vector Cosine Matching · Rate-Limited Dispatch",
    dsaLabel: "VECTOR MATCHING & CONTEXTUAL LLM",
    dsa: "Vector cosine similarity matching between resume skill graphs and incoming job description ASTs; token-bucket distributed rate limiters governing outbound application submissions.",
    live: "https://topnorch.com",
    href: "/engineering/topnorch",
  },
  {
    num: "06",
    id: "orhuebeauty",
    name: "Orhue Beauty",
    role: "Frontend Developer & Platform Engineering",
    category: "Media / Luxury Beauty Tech",
    status: "live",
    logo: "/brands/orhuebeauty_logo.png",
    tagline: "Luxury bridal artistry showcase and high-definition video processing pipeline.",
    summary:
      "Developed the frontend architecture and built an automated FFmpeg video processing pipeline that renders, scales, and compresses 4K beauty reels into optimized web formats, distributed globally through Cloudflare R2 object storage.",
    stack: ["React", "TypeScript", "FFmpeg Pipeline", "Cloudflare R2", "Tailwind CSS", "Vite"],
    metric: "Zero-egress R2 streaming · 70% video payload reduction",
    dsaLabel: "FFMPEG WEBM/MP4 STREAM ENCODING",
    dsa: "FFmpeg multi-pass bitrate encoding with adaptive CRF quantization; lazy-loaded IntersectionObserver media mounts preventing bandwidth exhaustion on mobile viewports.",
    live: "https://orhuebeauty.com",
    href: "/engineering/orhuebeauty",
  },
  {
    num: "07",
    id: "slum2stage",
    name: "Slum2Stage",
    role: "Fullstack Engineer",
    category: "Civic Empowerment / Non-Profit",
    status: "live",
    logo: "/brands/slum2stage_logo.svg",
    tagline: "Creative arts training and youth empowerment platform for underserved communities.",
    summary:
      "Engineered a fullstack web platform in Next.js and TypeScript, integrating two-way Airtable synchronization so grassroots coordinators can manage admissions, track student performance, and coordinate donor campaigns directly from familiar spreadsheet interfaces.",
    stack: ["Next.js", "React", "TypeScript", "Airtable API", "Tailwind CSS"],
    metric: "Two-way Airtable sync · 100% responsive Lighthouse",
    dsaLabel: "INCREMENTAL REVALIDATION (ISR)",
    dsa: "Incremental static regeneration (ISR) with webhook-driven cache invalidation ensuring instantaneous updates whenever coordinators modify enrollment rosters.",
    live: "https://slum2stage.org",
    href: "/engineering/slum2stage",
  },
  {
    num: "08",
    id: "fourdat",
    name: "Fourdat",
    role: "Platform & Backend Systems Engineer",
    category: "Logistics & On-Demand Dispatch",
    status: "full-stack",
    logo: "/brands/fourdat_logo.png",
    tagline: "Multi-tenant urban logistics dispatch and microsecond route optimization engine.",
    summary:
      "Architected a unified Turborepo monorepo encompassing 5 distinct operational applications: Admin, API Gateway, Customer Portal, Driver App, and Merchant Dashboard. Integrated a self-hosted OSRM routing container for zero-cost distance calculations and KudiSMS for instant driver dispatch.",
    stack: ["Turborepo Monorepo", "Bun", "OSRM Routing", "KudiSMS", "Docker Compose", "PostgreSQL"],
    metric: "5 apps in 1 monorepo · Microsecond OSRM routing",
    dsaLabel: "OSRM CONTRACTION HIERARCHIES",
    dsa: "OSRM contraction hierarchies for sub-millisecond road-network distance matrix calculations and driver-to-package nearest-neighbor assignment.",
    live: null,
    href: "/engineering/fourdat",
  },
  {
    num: "09",
    id: "mydigitalparents",
    name: "MyDigitalParents",
    role: "Fullstack Engineer (Team Contributor)",
    category: "Healthtech / Family Care",
    status: "full-stack",
    logo: "/brands/mydigitalparents_logo.png",
    tagline: "Remote family elder care monitoring and caregiver coordination system.",
    summary:
      "Contributed as a Fullstack Engineer to the multi-sided healthcare coordination system. Engineered key administrative coordination modules and patient vitals tracking interfaces in Next.js 16 App Router, integrating TanStack React Query with NestJS backend APIs for real-time health data synchronization and medication scheduling.",
    stack: ["Next.js 16", "NestJS", "TanStack Query", "Base UI", "TypeScript", "PostgreSQL"],
    metric: "Next.js 16 + NestJS · Real-time vitals tracking",
    dsaLabel: "OPTIMISTIC MUTATIONS & AUDIT LOGS",
    dsa: "Optimistic UI mutations paired with rollback queues for instant offline vitals logging; audit-trail logging for medication schedules.",
    live: null,
    href: "/engineering/mydigitalparents",
  },
  {
    num: "10",
    id: "onetimesurveys",
    name: "OneTimeSurveys",
    role: "Fullstack Systems Architect & Reliability Engineer",
    category: "Data Integrity & Cryptographic Polling",
    status: "shipped",
    logo: "/brands/onetimesurveys_logo.png",
    tagline: "Zero-knowledge, cryptographic polling infrastructure combining a Go 1.25 Fiber engine, Signal Protocol client-side encryption, and autonomous self-healing production diagnostics.",
    summary:
      "Architected an end-to-end cryptographic polling platform uniting a high-throughput Go 1.25 (Fiber v2) backend with a Next.js App Router client. Integrated @privacyresearch/libsignal-protocol-typescript for client-side cryptographic tokenization and zero-knowledge ballot secrecy. Engineered an automated site-reliability daemon (diagnose-production, fix-production-issues, Playwright E2E) that actively detects and self-heals production drift in real-time.",
    stack: ["Go 1.25", "Fiber v2", "Signal Protocol", "Next.js", "TypeScript", "Playwright E2E", "pgx/v5", "Redis", "Auto-Repair"],
    metric: "Go 1.25 Fiber + Signal Protocol · Autonomous Auto-Repair Daemon",
    dsaLabel: "SIGNAL PROTOCOL ENCRYPTION & TOKEN BLINDING",
    dsa: "Single-use blinding tokens validated via atomic pgx transactions with Redis distributed locks; client-side Signal Protocol key exchanges guarantee zero correlation between respondent identities and submitted ballots.",
    live: null,
    href: "/engineering/onetimesurveys",
  },
];

const PROPRIETARY_SYSTEMS = [
  {
    id: "akin",
    name: "Akin",
    subtitle: "On-Demand Transit API & Pooled Wallet Ledger",
    tagline: "Community transit routing, in-kind ride coordination, and pooled wallet disbursements.",
    solution:
      "Engineered two coordinated rails over a unified session and audited ledger: an on-demand pooled transport fund with idempotent Paystack reconciliation, and an in-kind ride network over WebSockets. Built the complete fullstack architecture (Go Fiber backend + React PWA client) and automated Docker deployment pipeline. In active staging / pre-live.",
    primitive: "Pessimistic row locking (SELECT FOR UPDATE) guarantees two concurrent disbursements can never double-spend the pooled fund.",
    stack: ["Go", "Fiber", "PostgreSQL", "Redis", "Paystack", "React PWA", "Docker"],
    metric: "Fullstack + Deployment · Pre-Live Staging",
    badge: "Fullstack Go",
    href: "https://github.com/ObeeJ/transport-api",
  },
  {
    id: "cowri",
    name: "Cowri",
    subtitle: "Distributed Fintech & Rotating Liquidity (Fullstack)",
    tagline: "Cryptographic double-entry ledger with automated Paystack DVA reconciliation.",
    solution:
      "Distributed rotating savings (Ajo/Esusu) and multi-party bill-splitting engine. Architected and built the fullstack system: high-performance Rust Tokio backend (GlideAPI) paired with a reactive React 19 frontend and automated CI/CD deployment. Enforces atomic balance reservations and event-driven Paystack webhook reconciliation with zero double-crediting.",
    primitive: "Two-phase atomic debit/credit operations with idempotency keys guarantee zero ledger leakage across ROSCA cycles.",
    stack: ["Rust", "GlideAPI", "Tokio", "PostgreSQL", "React 19", "Paystack DVA", "Docker"],
    metric: "Zero Ledger Drift · Fullstack Rust + React 19",
    badge: "Fullstack Rust",
    href: "https://github.com/ObeeJ/Cowri",
  },
  {
    id: "corvus",
    name: "Corvus",
    subtitle: "Stateful Network Security Scanner (Fullstack)",
    tagline: "A network scanner that remembers, and answers questions about what it saw in plain English.",
    solution:
      "Engineered the fullstack architecture from the ground up: Goroutine concurrent scanner daemon and bbolt chronological time-series database on the backend, paired with an interactive Next.js dashboard, natural-language query interface, and NaCl mesh over WebSockets.",
    primitive: "Big-endian timestamp keys make the store's natural order chronological, so a history range-scan is a single cursor seek.",
    stack: ["Go", "bbolt", "Next.js", "WebSocket", "TypeScript", "NaCl mesh"],
    metric: "Sub-second delta detection · Fullstack Go + Next.js",
    badge: "Fullstack Go + AI",
    href: "https://github.com/ObeeJ/corvus",
  },
  {
    id: "onetimesurveys",
    name: "OneTimeSurveys",
    subtitle: "Zero-Knowledge Cryptographic Polling",
    tagline: "Polling where a ballot cannot be linked back to the person who cast it.",
    solution:
      "A Go 1.25 Fiber engine with a TypeScript Next.js client that does the Signal Protocol key exchange in the browser, plus an automated production-diagnostics daemon covered by Playwright end-to-end tests.",
    primitive: "Single-use blinding tokens validated inside atomic pgx transactions with Redis locks: one token, one ballot, no correlation.",
    stack: ["Go 1.25", "Fiber", "TypeScript", "Next.js", "Signal Protocol", "Playwright"],
    metric: "Client-side Signal Protocol · 100% E2E covered",
    badge: "Go + TypeScript",
    href: "/engineering/onetimesurveys",
  },
  {
    id: "py-secrets-manager",
    name: "py-secrets-manager",
    subtitle: "Encrypted Secrets Vault, CLI and REST API",
    tagline: "A local vault for credentials that never touch disk in plaintext.",
    solution:
      "A Python secrets store exposing the same operations through a CLI and a FastAPI REST interface. Values are encrypted with Fernet before they are written, so the vault file is useless without the key.",
    primitive: "Authenticated symmetric encryption (Fernet) at rest: tampered ciphertext fails to decrypt instead of returning garbage.",
    stack: ["Python", "FastAPI", "Fernet (AES)", "CLI"],
    metric: "Encrypted at rest · CLI + REST",
    badge: "Python",
    href: "https://github.com/ObeeJ/py-secrets-manager",
  },
  {
    id: "bukr",
    name: "Bukr",
    subtitle: "High-Concurrency Flash-Sale Ticketing Core",
    tagline: "Modular monolith where ticket inventory cannot oversell under flash traffic.",
    solution:
      "Dual-language modular monolith: Go/Fiber gateway handles high-concurrency routing and auth, while a compiled Rust/Axum core executes ticket settlement and microsecond QR gate validation.",
    primitive: "SELECT FOR UPDATE row-locks guarantee zero inventory oversell during flash spikes.",
    stack: ["Rust (Axum)", "Go (Fiber)", "Postgres", "Redis", "gRPC", "Vite/React"],
    metric: "Zero-Oversell · Microsecond Gate Scan",
    badge: "Rust + Go",
    href: "https://github.com/ObeeJ/Bukr",
  },
  {
    id: "py-taskqueue",
    name: "py-taskqueue",
    subtitle: "Background Job Queue on FastAPI + Redis",
    tagline: "Enqueue over HTTP, process in workers, poll for status.",
    solution:
      "A FastAPI service that enqueues typed jobs into Redis and a separate worker process that consumes them, with a status endpoint so callers can follow a job from queued to done.",
    primitive: "Producers and workers only share Redis, so either side can be scaled or restarted without losing queued work.",
    stack: ["Python", "FastAPI", "Redis", "Workers"],
    metric: "Decoupled API and workers · job status API",
    badge: "Python",
    href: "https://github.com/ObeeJ/py-taskqueue",
  },
  {
    id: "theflate",
    name: "theflate",
    subtitle: "Media Compression & Local AI Transcription",
    tagline: "Edge video optimizer and neural speech transcription without third-party cloud leakage.",
    solution:
      "High-throughput media engine pairing Rust (GlideAPI) with multithreaded FFmpeg pipes for two-pass H.265/H.264 compression and an embedded OpenAI Whisper Large-v3 neural model for microsecond zero-cloud audio transcription.",
    primitive: "Streaming FFmpeg memory pipes and quantized Whisper execution guarantee zero external API exposure.",
    stack: ["Rust", "GlideAPI", "FFmpeg", "Whisper Large-v3", "Next.js 16", "SQLite"],
    metric: "Local Whisper Large-v3 · 2-Pass H.265",
    badge: "Rust + AI",
    href: "https://github.com/ObeeJ/theflate",
  },
  {
    id: "fleetform",
    name: "Fleetform",
    subtitle: "Memory-Safe IaC Engine & Topology Graph (In Active Development)",
    tagline: "Infrastructure-as-code planner with deterministic DAG dependency scheduling.",
    solution:
      "Actively developing the backend execution engine and cloud infrastructure provisioning in compiled Rust with petgraph topological DAG ordering and cycle detection. Backend system and infra orchestration nearing completion; fullstack web console integration in progress.",
    primitive: "Topological DAG ordering provably prevents resource dependency deadlocks.",
    stack: ["Rust", "Go (Fiber)", "petgraph", "HCL Parser", "Consul/S3 State"],
    metric: "Deterministic DAG · Backend & Infra in Dev",
    badge: "Rust + Go (Dev)",
    href: "/engineering/fleetform",
  },
];

const METRICS = [
  { num: "100%", label: "Verified System Invariants", sub: "Pessimistic row locking · zero ledger drift" },
  { num: "99.998%", label: "Uptime SLA Target", sub: "Designed for resilient degradation" },
  { num: "14.2ms", label: "P99 Rail Latency", sub: "Optimised concurrent Go workers" },
  { num: "0", label: "Double-Spend Incidents", sub: "Enforced via transactional row locks" },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const markOpacity = useTransform(scrollYProgress, [0, 1], [0.08, 0]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="home-container">
      {/* =========================================================================
          HERO SECTION — Editorial Brutalism & Swiss Typography
          ========================================================================= */}
      <section
        ref={heroRef}
        className="skd-blueprint"
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "1px solid var(--line)",
          paddingTop: "60px",
          paddingBottom: "80px",
        }}
      >
        {/* Parallax background asterisk mark */}
        <motion.div
          aria-hidden
          className="hero-parallax-mark"
          style={{
            position: "absolute",
            top: "4%",
            right: "-110px",
            color: "var(--accent)",
            opacity: markOpacity,
            rotate: markRotate,
            y: markY,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Mark size={560} spin={false} className="spin-slow" />
        </motion.div>

        <div className="wrap" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: 1040 }}>
            {/* Telemetry metadata stamp */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={lineReveal}
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <div className="social-row">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={s.label}
                    className="social-link"
                  >
                    <s.Icon size={12} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Giant display title with tight tracking & line reveals */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={lineReveal}
              className="wordmark"
              style={{
                fontSize: "clamp(46px, 7.6vw, 98px)",
                letterSpacing: "-.04em",
                lineHeight: 0.94,
                margin: "0 0 24px 0",
              }}
            >
              a direct line to systems that{" "}
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  color: "var(--accent)",
                  fontStyle: "normal",
                }}
              >
                <TextRotate
                  texts={["hold up.", "scale.", "settle.", "answer.", "execute."]}
                  mainClassName="text-[var(--accent)]"
                  rotationInterval={2600}
                  transition={{ type: "spring", damping: 28, stiffness: 350 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={lineReveal}
              style={{
                fontSize: "clamp(17px, 1.8vw, 21px)",
                color: "var(--muted)",
                maxWidth: 680,
                lineHeight: 1.55,
                margin: "0 0 36px 0",
              }}
            >
              Fullstack engineering, AI-driven architectures, production backend systems,
              and cloud infrastructure built for the worst day, not just the best. Low-latency
              Go and Rust rails, intelligent security scanners, and distributed memory meshes.
            </motion.p>

            {/* Precision brutalist actions */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={lineReveal}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Link href="/engineering" className="skd-btn skd-btn--coral">
                <span>the engineering</span>
                <ArrowRight size={14} className="arrow-shift" />
              </Link>

              <a href="#console" className="skd-btn skd-btn--ghost">
                <Terminal size={14} />
                <span>interactive gateway</span>
              </a>

              <span className="mono" style={{ fontSize: 10.5, color: "var(--faint)", letterSpacing: ".12em", marginLeft: 4 }}>
                [DIAL *100# - *400#]
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 01: THE INTERACTIVE USSD GATEWAY & CONSOLE
          ========================================================================= */}
      <section id="console" className="skd-ruled-b" style={{ padding: "88px 0", background: "var(--ink)" }}>
        <div className="wrap">
          <div className="rowhead">
            <span className="num">01</span>
            <h2>the dial tone // live gateway</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32, marginBottom: 20 }}>
            <div>
              <h2
                className="wordmark"
                style={{
                  fontSize: "clamp(28px, 4.2vw, 46px)",
                  letterSpacing: "-.035em",
                  lineHeight: 1.05,
                  margin: "0 0 12px 0",
                }}
              >
                Access first.{" "}
                <span className="serif" style={{ fontWeight: 400, color: "var(--accent)" }}>
                  Friction last.
                </span>
              </h2>
              <p style={{ color: "var(--muted)", maxWidth: 620, fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                Inspired by the universal accessibility of telecom USSD strings (*123#),
                our infrastructure provides high-availability direct lines that still
                answer when networks drop. Test the live simulator below.
              </p>
            </div>

            {/* Interactive USSD Terminal Component */}
            <UssdConsole />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: SHIPPED CLIENT & PRODUCTION PLATFORMS
          ========================================================================= */}
      <section className="skd-ruled-b" style={{ padding: "96px 0", background: "var(--ink)" }}>
        <div className="wrap">
          <div className="rowhead">
            <span className="num">02</span>
            <h2>the systems // shipped production platforms</h2>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
            <div>
              <h2
                className="wordmark"
                style={{
                  fontSize: "clamp(30px, 4.5vw, 52px)",
                  letterSpacing: "-.035em",
                  lineHeight: 1.02,
                  maxWidth: 680,
                  margin: "0 0 10px 0",
                }}
              >
                Production platforms{" "}
                <span className="serif" style={{ fontWeight: 400 }}>
                  shipped to real users.
                </span>
              </h2>
              <p style={{ color: "var(--muted)", maxWidth: 640, fontSize: 15.5, lineHeight: 1.55, margin: 0 }}>
                Fullstack, senior backend, DevOps, and platform engineering across global payment rails, proptech microservices, health portals, and high-throughput distributed systems.
              </p>
            </div>

            <Link href="/engineering" className="skd-btn skd-btn--ghost">
              <span>inspect all systems</span>
              <ArrowRight size={13} className="arrow-shift" />
            </Link>
          </div>

          {/* Parallax Systems & Telemetry Corridor */}
          <TelemetryCorridor />

        </div>
      </section>

      {/* =========================================================================
          SECTION 03: THE ENGINEER & PHILOSOPHY
          ========================================================================= */}
      <section className="skd-ruled-b" style={{ padding: "96px 0", background: "var(--ink-2)" }}>
        <div className="wrap">
          <div className="rowhead">
            <span className="num">03</span>
            <h2>the engineer // philosophy & background</h2>
          </div>

          <div className="engineer-grid">
            <div>
              <span className="skd-telemetry-stamp" style={{ marginBottom: 18 }}>
                <span className="skd-live-dot" />
                <span>OBANIJESU AJAYI · FULL-STACK &amp; INFRASTRUCTURE</span>
              </span>

              <h2
                className="wordmark"
                style={{
                  fontSize: "clamp(30px, 4.5vw, 54px)",
                  letterSpacing: "-.035em",
                  lineHeight: 1.02,
                  margin: "0 0 24px 0",
                }}
              >
                The thinking behind{" "}
                <span className="serif" style={{ color: "var(--accent)", fontWeight: 400 }}>
                  shortkohdz.
                </span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 18, color: "var(--paper)", fontSize: 16.5, lineHeight: 1.65 }}>
                <p style={{ margin: 0, fontWeight: 500 }}>
                  I&apos;m the engineer behind shortkohdz, working across distributed backend systems,
                  cloud infrastructure, and the AI tooling built on top of them.
                </p>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 15.5 }}>
                  The work spans concurrent systems, audited ledgers, and infrastructure I provision and run
                  myself, not just design. Go and TypeScript are the daily drivers, with Rust and Python at systems depth.
                  Certified Kubernetes Administrator (CKA) by the Linux Foundation, with verified credentials in Agentic AI Architectures,
                  OpenAI API &amp; Model Fine-Tuning, and AWS Solutions Architecture (Associate in progress). With an academic foundation in Anatomy from Olabisi Onabanjo University,
                  I bring scientific first-principles, rigorous fault isolation, and 4+ years of production engineering across fintech, proptech, edtech, healthtech, and civic empowerment systems.
                </p>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 15.5 }}>
                  At the end of the day, the goal is the same one shortkohdz was built on: a direct line to a solution that still works on the worst day.
                </p>
              </div>

              {/* Action Buttons: Resume & Socials */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 32 }}>
                <a
                  href="/Ajayi_ObaniJesu_Resume.pdf"
                  download="Ajayi_ObaniJesu_Software_Engineer_Resume.pdf"
                  className="skd-btn skd-btn--coral"
                >
                  <ArrowRight size={13} />
                  <span>DOWNLOAD RESUME (PDF)</span>
                </a>

                <a
                  href="https://github.com/ObeeJ"
                  target="_blank"
                  rel="noopener"
                  className="skd-btn skd-btn--ghost"
                >
                  <FaGithub size={13} />
                  <span>GITHUB (@OBEEJ)</span>
                </a>

                <a
                  href="https://linkedin.com/in/obanijesuajayi"
                  target="_blank"
                  rel="noopener"
                  className="skd-btn skd-btn--ghost"
                >
                  <FaLinkedin size={13} />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>

            {/* Production Highlights Bento Card */}
            <div
              className="crosshair-corner crosshair-corner-tl crosshair-corner-tr crosshair-corner-bl crosshair-corner-br"
              style={{
                background: "var(--ink)",
                border: "1px solid var(--line-strong)",
                padding: "26px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--accent)", fontWeight: 600 }}>
                  PRODUCTION TRACK RECORD &amp; CERTS
                </span>
                <span className="mono" style={{ fontSize: 9.5, color: "var(--faint)" }}>
                  CKA · AGENTIC AI · OPENAI · AWS
                </span>
              </div>

              <div>
                <div className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>VERIFIED CERTIFICATIONS &amp; AI</div>
                <div className="wordmark" style={{ fontSize: 16, marginTop: 2 }}>Linux Foundation, OpenAI &amp; Agentic AI</div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "4px 0 0", lineHeight: 1.5 }}>
                  Certified Kubernetes Administrator (CKA) • Agentic AI Fundamentals: Architectures, Frameworks &amp; Applications • OpenAI API &amp; Fine-Tuning • AWS Solutions Architect Associate (In Progress).
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 12 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>88,000-LINE GO MICROSERVICES</div>
                <div className="wordmark" style={{ fontSize: 16, marginTop: 2 }}>Dwelix Platform Architecture</div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "4px 0 0", lineHeight: 1.5 }}>
                  Lead SWE: led the team and built the platform, 12 containerized Go services, a 76-table PostgreSQL schema, gRPC over GCP Pub/Sub.
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 12 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>BANK SETTLEMENT RAILS</div>
                <div className="wordmark" style={{ fontSize: 16, marginTop: 2 }}>FCA-Regulated PCXPay</div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "4px 0 0", lineHeight: 1.5 }}>
                  Senior SWE: spearheaded the GTBank Squad gateway integration and AWS Lambda payment rails across UK, Nigeria and Canada.
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 12 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>OPEN-SOURCE CORE RUNTIMES</div>
                <div className="wordmark" style={{ fontSize: 16, marginTop: 2 }}>Fiber, Gin &amp; HashiCorp</div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "4px 0 0", lineHeight: 1.5 }}>
                  Patched CRLF log-injection in Go Fiber (<a href="https://github.com/gofiber/fiber/pull/4552" target="_blank" rel="noopener" style={{ color: "var(--paper)", textDecoration: "underline" }}>#4571/#4552</a>), sub-second rate limiter (<a href="https://github.com/gofiber/fiber/pull/4572" target="_blank" rel="noopener" style={{ color: "var(--paper)", textDecoration: "underline" }}>#4572</a>), RFC 9110 HEAD handling (<a href="https://github.com/gofiber/fiber/pull/4576" target="_blank" rel="noopener" style={{ color: "var(--paper)", textDecoration: "underline" }}>#4576</a>); context test coverage in Gin (<a href="https://github.com/gin-gonic/gin/pull/4775" target="_blank" rel="noopener" style={{ color: "var(--paper)", textDecoration: "underline" }}>#4775</a>); jitter PRNG race in HashiCorp go-retryablehttp (<a href="https://github.com/hashicorp/go-retryablehttp/pull/301" target="_blank" rel="noopener" style={{ color: "var(--paper)", textDecoration: "underline" }}>#301</a>).
                </p>
              </div>
            </div>
          </div>

          {/* Two ways in: access first, friction last, acted out */}
          <TwoWaysIn />

          {/* =========================================================================
              SECTION 03.1: PROPRIETARY SYSTEMS BUILT FROM ZERO (NOT A REPO DUMP)
              ========================================================================= */}
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 48, marginTop: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
              <div>
                <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".14em", display: "block", marginBottom: 6 }}>
                  03.1 // ARCHITECTURE &amp; TOOLING
                </span>
                <h3 className="wordmark" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", margin: 0, letterSpacing: "-.035em" }}>
                  Engines built from scratch.
                </h3>
                <p style={{ color: "var(--muted)", fontSize: 14.5, margin: "6px 0 0 0", maxWidth: 640, lineHeight: 1.5 }}>
                  Independent systems, concurrency frameworks, and network proxies engineered to solve structural bottlenecks without third-party vendor lock-in.
                </p>
              </div>

              <a
                href="https://github.com/ObeeJ"
                target="_blank"
                rel="noopener"
                className="skd-btn skd-btn--ghost"
                style={{ padding: "10px 18px", fontSize: 11.5 }}
              >
                <FaGithub size={13} />
                <span>EXPLORE ALL CODE (GITHUB)</span>
              </a>
            </div>

            <div className="systems-grid">
              {PROPRIETARY_SYSTEMS.map((p) => (
                <div
                  key={p.id}
                  className="system-card crosshair-corner crosshair-corner-tl crosshair-corner-tr crosshair-corner-bl crosshair-corner-br"
                >
                  <div className="system-card-top">
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <h4 className="wordmark" style={{ fontSize: 24, margin: 0, color: "var(--paper)" }}>
                          {p.name}
                        </h4>
                        <span className="mono system-lang-pill">{p.badge}</span>
                      </div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".06em" }}>
                        {p.subtitle}
                      </div>
                    </div>
                    <span className="mono" style={{ fontSize: 9.5, color: "var(--faint)", letterSpacing: ".12em" }}>
                      SYS // {p.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="system-card-mid">
                    <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 10, margin: "0 0 12px 0" }}>
                      <p style={{ fontSize: 14, color: "var(--paper)", fontWeight: 500, margin: 0, lineHeight: 1.45 }}>
                        {p.tagline}
                      </p>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 16px 0", lineHeight: 1.6 }}>
                      {p.solution}
                    </p>

                    <div className="system-guarantee-box">
                      <span className="mono" style={{ fontSize: 9.5, color: "var(--accent)", letterSpacing: ".1em", display: "block", marginBottom: 4 }}>
                        ARCHITECTURAL GUARANTEE:
                      </span>
                      <p style={{ fontSize: 12, color: "var(--paper)", margin: 0, lineHeight: 1.5 }}>
                        {p.primitive}
                      </p>
                    </div>
                  </div>

                  <div className="system-card-bottom">
                    <div className="chips-row">
                      {p.stack.map((s) => (
                        <span key={s} className="mono stack-chip">
                          <TechIcon name={s} size={11} />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>

                    <div className="system-card-action">
                      <span className="mono system-card-metric">
                        {p.metric}
                      </span>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener"
                        className="mono system-inspect-btn"
                      >
                        <span>INSPECT ARCHITECTURE</span>
                        <ArrowRight size={12} className="arrow-shift" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: TELEMETRY BY THE NUMBERS
          ========================================================================= */}
      <section className="skd-ruled-b" style={{ padding: "96px 0", background: "var(--ink-2)" }}>
        <div className="wrap">
          <div className="rowhead">
            <span className="num">04</span>
            <h2>the metrics // by the numbers</h2>
          </div>

          <div className="metrics-grid">
            {METRICS.map((m, idx) => (
              <div
                key={m.label}
                className="metric-box crosshair-corner crosshair-corner-tl"
              >
                <span className="mono metric-idx">0{idx + 1}</span>
                <div className="metric-val wordmark">{m.num}</div>
                <div className="metric-label mono">{m.label}</div>
                <p className="metric-sub">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05: DIRECT LINE CTA
          ========================================================================= */}
      <section className="skd-ruled-b" style={{ padding: "104px 0", background: "var(--ink)", color: "var(--paper)" }}>
        <div className="wrap">
          <div className="rowhead" style={{ marginBottom: 28 }}>
            <span className="num" style={{ color: "var(--accent)" }}>05</span>
            <h2 style={{ color: "var(--muted)" }}>the direct line // get in touch</h2>
          </div>

          <div
            className="crosshair-corner crosshair-corner-tl crosshair-corner-tr crosshair-corner-bl crosshair-corner-br"
            style={{
              padding: "clamp(32px, 5vw, 64px)",
              background: "var(--ink-2)",
              color: "var(--paper)",
              border: "1px solid var(--line-strong)",
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 36,
              alignItems: "center",
            }}
          >
            <div>
              <span className="skd-telemetry-stamp" style={{ marginBottom: 16 }}>
                <span className="skd-live-dot" />
                <span>TELECOM DIAL PROTOCOL // OPEN FOR ADVISORY & INFRASTRUCTURE</span>
              </span>

              <h2
                className="wordmark"
                style={{
                  fontSize: "clamp(32px, 4.8vw, 60px)",
                  letterSpacing: "-.035em",
                  lineHeight: 1.02,
                  margin: "0 0 16px 0",
                }}
              >
                Need infrastructure that{" "}
                <span className="serif" style={{ color: "var(--accent)", fontWeight: 400 }}>
                  answers on the worst day?
                </span>
              </h2>

              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.6, maxWidth: 540, margin: 0 }}>
                Whether it's designing high-concurrency payment rails, locked financial
                ledgers, or distributed container systems, dial in directly.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a
                href="mailto:ajayiobanijesu2000@gmail.com"
                className="skd-btn skd-btn--coral"
                style={{ padding: "16px 24px", fontSize: 13 }}
              >
                <span>OPEN DIRECT LINE (EMAIL)</span>
                <ArrowRight size={14} className="arrow-shift" />
              </a>

              <Link
                href="/guestbook"
                className="skd-btn skd-btn--ghost"
                style={{ padding: "14px 24px", fontSize: 12 }}
              >
                <span>SIGN THE GUESTBOOK LEDGER</span>
              </Link>

              <div className="mono" style={{ fontSize: 10, color: "var(--faint)", textAlign: "center", letterSpacing: ".1em", marginTop: 4 }}>
                AVG RESPONSE TIME: &lt; 2 HOURS · PGP AVAILABLE
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          background: var(--ink);
          color: var(--paper);
          overflow-x: hidden;
          max-width: 100vw;
          width: 100%;
        }
        @media (max-width: 768px) {
          .hero-parallax-mark {
            display: none !important;
          }
        }
        .engineer-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 48px;
          align-items: flex-start;
          margin-bottom: 48px;
        }
        @media (max-width: 900px) {
          .engineer-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 28px;
          }
        }
        .social-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .social-link {
          width: 28px;
          height: 28px;
          border-radius: 0px;
          background: var(--ink-2);
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          transition: all 0.2s var(--ease);
        }
        .social-link:hover {
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-1px);
        }

        /* Systems Grid (Section 02.1) */
        .system-card, .engineer-grid > *, .metrics-grid > * { min-width: 0; overflow-wrap: anywhere; }
        .systems-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 860px) {
          .systems-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
        .system-card {
          background: var(--ink);
          border: 1px solid var(--line);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 300px;
          transition: border-color 0.2s var(--ease), transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
        }
        .system-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
        }
        .system-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line-2);
        }
        .system-lang-pill {
          font-size: 9.5px;
          padding: 2px 7px;
          background: var(--ink-2);
          border: 1px solid var(--line);
          color: var(--accent);
          font-weight: 500;
        }
        .system-card-mid {
          padding: 16px 0;
          flex: 1;
        }
        .system-guarantee-box {
          background: var(--ink-2);
          border-left: 2px solid var(--accent);
          padding: 10px 12px;
          margin-top: 12px;
        }
        .system-card-bottom {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--line-2);
        }
        .system-card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid var(--line-2);
          padding-top: 12px;
          margin-top: 4px;
        }
        .system-card-metric {
          font-size: 10px;
          color: var(--faint);
          letter-spacing: .06em;
          line-height: 1.4;
          min-width: 0;
        }
        .system-inspect-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 10.5px;
          letter-spacing: .08em;
          white-space: nowrap;
          padding: 7px 13px;
          border-radius: 4px;
          background: rgba(255, 85, 61, 0.06);
          border: 1px solid rgba(255, 85, 61, 0.28);
          color: var(--accent);
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s var(--ease);
          flex-shrink: 0;
        }
        .system-inspect-btn:hover {
          background: var(--accent);
          color: var(--ink);
          border-color: var(--accent);
          box-shadow: 0 0 16px rgba(255, 85, 61, 0.35);
        }
        .system-inspect-btn .arrow-shift {
          transition: transform 0.2s var(--ease);
        }
        .system-inspect-btn:hover .arrow-shift {
          transform: translateX(3px);
        }

        @media (max-width: 640px) {
          .system-card {
            padding: 20px 16px;
          }
          .system-card-top {
            flex-direction: column;
            gap: 6px;
          }
          .system-card-action {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding-top: 12px;
          }
          .system-inspect-btn {
            width: 100%;
            justify-content: center;
            padding: 11px 16px;
            font-size: 11px;
            font-weight: 600;
          }
        }

        /* Ventures Bento Grid */
        .ventures-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 960px) {
          .ventures-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
          }
        }
        .venture-card {
          background: var(--ink-2);
          border: 1px solid var(--line);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          min-height: 480px;
          transition: border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
        }
        .venture-card:hover {
          border-color: var(--accent);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
        }
        .venture-brand-mark {
          background: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.4);
          padding: 6px 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
        }
        .venture-brand-img {
          max-height: 28px;
          max-width: 120px;
          object-fit: contain;
        }
        .venture-role-stamp {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .08em;
          color: var(--accent);
          background: var(--ink);
          border: 1px solid var(--accent);
          padding: 5px 10px;
          display: inline-flex;
          align-items: center;
          border-radius: 2px;
        }
        .venture-tagline-box {
          border-left: 2px solid var(--accent);
          padding-left: 12px;
          margin: 10px 0 14px 0;
        }
        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line-2);
        }
        .card-sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--line-strong);
        }
        .card-mid {
          padding: 20px 0;
          flex: 1;
        }
        .dsa-box {
          background: var(--ink);
          border: 1px solid var(--line);
          border-left: 3px solid var(--accent);
          padding: 12px 14px;
          margin-top: 14px;
          border-radius: 2px;
        }
        .metric-pill-row {
          margin-top: 14px;
        }
        .metric-pill {
          display: inline-block;
          font-size: 9.5px;
          padding: 4px 9px;
          background: var(--ink);
          border: 1px solid var(--line-strong);
          color: var(--paper);
          letter-spacing: .08em;
        }
        .card-bottom {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--line-2);
        }
        .chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .stack-chip {
          font-size: 9.5px;
          padding: 3px 7px;
          background: var(--ink);
          border: 1px solid var(--line);
          color: var(--faint);
          letter-spacing: .06em;
        }
        .venture-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
        }
        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: var(--paper);
          letter-spacing: .08em;
          transition: color 0.18s;
        }
        .venture-card:hover .card-link,
        .system-card:hover .card-link {
          color: var(--accent);
        }

        /* Metrics Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 540px) {
          .metrics-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
        .metric-box {
          background: var(--ink-2);
          border: 1px solid var(--line);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 180px;
        }
        .metric-idx {
          font-size: 10px;
          color: var(--faint);
          letter-spacing: .12em;
        }
        .metric-val {
          font-size: clamp(34px, 4.4vw, 54px);
          line-height: 1;
          letter-spacing: -.03em;
          margin: 14px 0 6px 0;
          color: var(--paper);
        }
        .metric-label {
          font-size: 11px;
          color: var(--accent);
          letter-spacing: .08em;
          margin-bottom: 6px;
        }
        .metric-sub {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.45;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
