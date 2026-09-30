"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";
import { ArrowRight, Shield, Cpu, Terminal, ExternalLink, Award, CheckCircle2 } from "lucide-react";
import { Mark } from "../components/ui";
import { TechIcon } from "../components/TechIcon";

const SOCIALS = [
  { href: "https://github.com/ObeeJ", label: "GitHub · @ObeeJ", Icon: FaGithub },
  { href: "https://linkedin.com/in/obanijesuajayi", label: "LinkedIn · ObaniJesu", Icon: FaLinkedin },
  { href: "mailto:ajayioba2000@gmail.com", label: "Email Direct", Icon: FaEnvelope },
];

const EXPERTISE = [
  {
    title: "High-Concurrency Backend Rails",
    desc: "Goroutines, worker pools, channels, and pessimistic transactional locking (SELECT FOR UPDATE). Systems where double-spending, data drift, or race conditions are mathematically intolerable.",
    tags: ["Go 1.25", "Rust", "PostgreSQL", "Redis", "Distributed Ledgers"],
  },
  {
    title: "Cloud Infrastructure & Orchestration",
    desc: "Certified Kubernetes Administrator (CKA). Provisioning infrastructure as code via Terraform across AWS and GCP. Container hardening, gRPC meshes, and zero-downtime rolling cutovers.",
    tags: ["Kubernetes (CKA)", "Terraform", "AWS", "GCP Cloud Run", "Docker"],
  },
  {
    title: "Correctness Under Regulatory Scrutiny",
    desc: "Engineered banking integrations under FCA compliance, PCI DSS, and NDPR. Led integration of bank gateways (GTBank Squad), idempotency TTLs, and Bloom filter deduplication.",
    tags: ["FCA Compliance", "Idempotent APIs", "Bloom Filters", "CloudHSM"],
  },
  {
    title: "Production AI & Agentic Systems",
    desc: "Bridging foundational backend engineering with LLMs: Retrieval-Augmented Generation (RAG), vector embeddings, agentic coding workflows, and natural-language telemetry interfaces.",
    tags: ["Agentic Workflows", "Vector DBs", "RAG Pipelines", "Tool Calling"],
  },
];

const NOTABLE_WORK = [
  {
    title: "Dwelix Microservice Platform",
    role: "Lead Software Engineer",
    summary: "Led the team and shipped an 88,000-line Go backend across 12 containerized microservices and a 76-table PostgreSQL schema from an empty repo. gRPC communication with GCP PubSub streaming.",
    badge: "88k Lines Go",
  },
  {
    title: "PCXPay Banking Rails",
    role: "Senior Software Engineer",
    summary: "Spearheaded the GTBank Squad payment gateway integration under FCA oversight, deploying AWS Lambda microservices for settlement rails across UK, Nigerian, and Canadian accounts.",
    badge: "FCA-Regulated",
  },
  {
    title: "Mopcare Healthtech Engine",
    role: "Technical Lead (Full-Stack)",
    summary: "Direct backend development for a digital health coordination platform serving close to 2,000 elderly patients, with Go microservices, PostgreSQL, and AWS infrastructure.",
    badge: "Healthtech Platform",
  },
  {
    title: "Open-Source Core Fixes",
    role: "Security & Concurrency Contributor",
    summary: "Patched a critical CRLF log-injection vulnerability in Go Fiber (#4552) and resolved a weak PRNG seed concurrency bug in HashiCorp's go-retryablehttp (#301).",
    badge: "Fiber & HashiCorp",
  },
];

export default function About() {
  return (
    <div style={{ background: "var(--ink)", color: "var(--paper)" }}>
      {/* Editorial Header */}
      <section className="skd-blueprint" style={{ padding: "100px 0 70px", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="rowhead">
            <span className="num">01</span>
            <h2>the engineer // philosophy</h2>
          </div>

          <div className="ab-hero-grid">
            <div>
              <h1
                className="wordmark"
                style={{
                  fontSize: "clamp(38px, 5.6vw, 76px)",
                  letterSpacing: "-.04em",
                  lineHeight: 0.96,
                  margin: "0 0 28px 0",
                }}
              >
                A direct line to systems that{" "}
                <span className="serif" style={{ color: "var(--accent)", fontWeight: 400 }}>
                  work on the worst day.
                </span>
              </h1>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 660 }}>
                <p style={{ color: "var(--paper)", fontSize: 18, lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
                  I&apos;m the engineer behind <strong>shortkohdz</strong>. My work lives where distributed backend
                  systems, cloud infrastructure, and AI engineering meet reality: concurrent ledgers that cannot drop a cent,
                  network scanners that preserve history, and cloud infrastructure I provision and operate myself, not just sketch on a whiteboard.
                </p>
                <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
                  Go and TypeScript are my daily tools, with Rust and Python at deep systems depth.
                  Certified Kubernetes Administrator (CKA) by the Linux Foundation, with verified credentials in Agentic AI Architectures,
                  OpenAI API &amp; Model Fine-Tuning, and AWS Solutions Architecture (Associate in progress). Grounded in Anatomy from Olabisi Onabanjo University,
                  I approach software from empirical first-principles: fault isolation, system redundancy, and deterministic correctness under load across fintech, proptech, edtech, healthtech, and civic empowerment platforms.
                </p>
                <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
                  The name <strong>shortkohdz</strong> is borrowed from telecom USSD strings (like <code>*123#</code>)—the
                  quiet signalling channel that remains operational when data packets fail, cell networks congest, and bloated apps stall.
                  That is the standard: access first, friction last.
                </p>
              </div>

              {/* Verified Identity Telemetry Stamp */}
              <div style={{ marginTop: 28, marginBottom: 4 }}>
                <span className="skd-telemetry-stamp">
                  <span className="skd-live-dot" />
                  <span>OBANIJESU AJAYI · FULL-STACK &amp; INFRASTRUCTURE ENGINEER</span>
                </span>
              </div>

              {/* Action Buttons: Resume & Socials */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 28 }}>
                <a
                  href="/Ajayi_ObaniJesu_Resume.pdf"
                  download="Ajayi_ObaniJesu_Software_Engineer_Resume.pdf"
                  className="skd-btn skd-btn--emerald"
                >
                  <FaFileDownload size={13} />
                  <span>DOWNLOAD RESUME (PDF)</span>
                </a>

                <a
                  href="https://github.com/ObeeJ"
                  target="_blank"
                  rel="noopener"
                  className="skd-btn skd-btn--ghost"
                >
                  <FaGithub size={13} />
                  <span>GITHUB PROFILE</span>
                  <ExternalLink size={12} className="arrow-shift" />
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

            {/* Quick Facts Dossier Card */}
            <div
              className="crosshair-corner crosshair-corner-tl crosshair-corner-tr crosshair-corner-bl crosshair-corner-br"
              style={{
                background: "var(--ink-2)",
                border: "1px solid var(--line-strong)",
                padding: "28px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: 14, marginBottom: 18 }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>
                  ENGINEERING DOSSIER
                </span>
                <span className="mono" style={{ fontSize: 10, color: "var(--faint)" }}>
                  REF: SKD-2026
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <span className="mono" style={{ fontSize: 10, color: "var(--faint)", letterSpacing: ".1em" }}>VERIFIED CERTIFICATIONS &amp; CREDENTIALS</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 size={13} color="var(--accent)" />
                      <span style={{ fontSize: 12.5, color: "var(--paper)" }}>Certified Kubernetes Administrator (CKA) · Linux Foundation</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 size={13} color="var(--accent)" />
                      <span style={{ fontSize: 12.5, color: "var(--paper)" }}>Agentic AI Fundamentals: Architectures, Frameworks &amp; Applications</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 size={13} color="var(--accent)" />
                      <span style={{ fontSize: 12.5, color: "var(--paper)" }}>OpenAI API &amp; Model Fine-Tuning</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 size={13} color="var(--accent)" />
                      <span style={{ fontSize: 12.5, color: "var(--paper)" }}>AWS Certified Solutions Architect, Associate (In Progress)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="mono" style={{ fontSize: 10, color: "var(--faint)", letterSpacing: ".1em" }}>SECTORS &amp; DOMAINS</span>
                  <div className="mono" style={{ fontSize: 11.5, color: "var(--paper)", marginTop: 4 }}>
                    Fintech · Proptech · Edtech · Healthtech · Civic Empowerment
                  </div>
                </div>

                <div>
                  <span className="mono" style={{ fontSize: 10, color: "var(--faint)", letterSpacing: ".1em" }}>LANGUAGES &amp; RUNTIMES</span>
                  <div className="mono" style={{ fontSize: 12, color: "var(--paper)", marginTop: 4 }}>
                    Go 1.25 · Rust · TypeScript · Python · SQL · Bash · C#/.NET
                  </div>
                </div>

                <div>
                  <span className="mono" style={{ fontSize: 10, color: "var(--faint)", letterSpacing: ".1em" }}>CORE ARCHITECTURE</span>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, lineHeight: 1.5 }}>
                    Pessimistic concurrency, idempotent payment settlement, Redis Bloom filters, bbolt chronological stores, gRPC &amp; PubSub event streams.
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>DIRECT CONTACT</span>
                  <div className="mono" style={{ fontSize: 12, marginTop: 4 }}>
                    <a href="mailto:ajayioba2000@gmail.com" style={{ color: "var(--paper)" }}>
                      ajayioba2000@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Pillars */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line)", background: "var(--ink-2)" }}>
        <div className="wrap">
          <div className="rowhead">
            <span className="num">02</span>
            <h2>the expertise // architectural pillars</h2>
          </div>

          <div className="ab-two">
            {EXPERTISE.map((exp, i) => (
              <div
                key={exp.title}
                className="crosshair-corner crosshair-corner-tl"
                style={{
                  background: "var(--ink)",
                  border: "1px solid var(--line)",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span className="mono" style={{ color: "var(--accent)", fontSize: 11, fontWeight: 600 }}>
                      0{i + 1}
                    </span>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--line-strong)" }} />
                    <span className="mono" style={{ fontSize: 10, color: "var(--faint)", letterSpacing: ".1em" }}>
                      SYSTEM PILLAR
                    </span>
                  </div>
                  <h3 className="wordmark" style={{ fontSize: 24, margin: "0 0 12px 0" }}>
                    {exp.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, margin: "0 0 24px 0" }}>
                    {exp.desc}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 16, borderTop: "1px solid var(--line-2)" }}>
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="mono stack-chip"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 10,
                        padding: "4px 9px",
                        background: "var(--ink-2)",
                        border: "1px solid var(--line)",
                        color: "var(--paper)",
                      }}
                    >
                      <TechIcon name={t} size={12} />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Track Record */}
      <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line)", background: "var(--ink)" }}>
        <div className="wrap">
          <div className="rowhead">
            <span className="num">03</span>
            <h2>track record // production milestones</h2>
          </div>

          <div className="ab-three">
            {NOTABLE_WORK.map((item) => (
              <div
                key={item.title}
                className="crosshair-corner crosshair-corner-tl"
                style={{
                  background: "var(--ink-2)",
                  border: "1px solid var(--line)",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "260px",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>
                      {item.badge}
                    </span>
                    <span className="mono" style={{ fontSize: 9.5, color: "var(--faint)" }}>
                      VERIFIED
                    </span>
                  </div>
                  <h3 className="wordmark" style={{ fontSize: 21, margin: "0 0 6px 0" }}>
                    {item.title}
                  </h3>
                  <div className="mono" style={{ fontSize: 10, color: "var(--faint)", marginBottom: 14 }}>
                    {item.role}
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.55, margin: 0 }}>
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section style={{ padding: "88px 0", background: "var(--paper)", color: "var(--ink)" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 28 }}>
            <div>
              <span className="skd-telemetry-stamp" style={{ color: "var(--muted-d)", marginBottom: 12 }}>
                <span className="skd-live-dot" />
                <span>DIRECT LINE // SHORTKOHDZ</span>
              </span>
              <h2 className="wordmark" style={{ fontSize: "clamp(28px, 4vw, 48px)", margin: "0 0 10px 0", letterSpacing: "-.035em" }}>
                Ready to talk architecture?
              </h2>
              <p style={{ color: "var(--muted-d)", fontSize: 15, margin: 0, maxWidth: 520 }}>
                Available for high-stakes backend advisory, distributed systems engineering, and infrastructure consulting.
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href="/Ajayi_ObaniJesu_Resume.pdf"
                download="Ajayi_ObaniJesu_Software_Engineer_Resume.pdf"
                className="skd-btn skd-btn--emerald"
                style={{ padding: "14px 22px" }}
              >
                <span>DOWNLOAD RESUME</span>
              </a>
              <a
                href="mailto:ajayioba2000@gmail.com"
                className="skd-btn skd-btn--paper email-cta-btn"
                style={{ padding: "14px 22px" }}
              >
                <span>SEND DIRECT EMAIL</span>
                <ArrowRight size={13} className="arrow-shift" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .ab-hero-grid { display:grid; grid-template-columns:minmax(0,1.4fr) minmax(0,1fr); gap:48px; align-items:flex-start; }
        .ab-two { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; }
        .ab-three { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
        .ab-hero-grid > *, .ab-two > *, .ab-three > * { min-width:0; overflow-wrap:anywhere; }
        @media (max-width: 960px) { .ab-hero-grid { grid-template-columns:minmax(0,1fr); gap:36px; } .ab-three { grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width: 640px) { .ab-two, .ab-three { grid-template-columns:minmax(0,1fr); } }
      `}</style>
    </div>
  );
}
