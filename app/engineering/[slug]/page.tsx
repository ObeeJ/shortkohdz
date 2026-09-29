import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, STATUS_LABEL } from "../../lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  return {
    title: p ? `${p.name} — shortkohdz engineering` : "shortkohdz engineering",
    description: p?.tagline,
  };
}

type RepoLink = { label: string; url: string };
function normalizeRepos(repos: string[][] | undefined): RepoLink[] {
  if (!repos) return [];
  return repos.map(([label, url]) => ({ label: label || "repo", url }));
}

const BLOCKS = [
  { key: "problem", label: "the problem" },
  { key: "solution", label: "the solution" },
  { key: "system", label: "the system" },
  { key: "dsa", label: "the hard part" },
  { key: "why", label: "why this stack" },
  { key: "innovation", label: "the innovation" },
] as const;

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.id === p.id);
  const next = projects[(idx + 1) % projects.length];
  const repos = normalizeRepos(p.repos);

  return (
    <section style={{ padding: "60px 0 96px" }}>
      <div className="wrap">
        <Link
          href="/engineering"
          className="mono"
          style={{
            color: "var(--muted)",
            textTransform: "lowercase",
            display: "inline-flex",
            gap: 7,
            alignItems: "center",
            marginBottom: 30,
            fontSize: 11,
          }}
        >
          ← all systems
        </Link>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
          <div className="mono" style={{ color: "var(--accent)", letterSpacing: ".1em" }}>
            {p.industry}
          </div>
          {p.role && (
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                padding: "3px 10px",
                background: "var(--ink-2)",
                border: "1px solid var(--line-strong)",
                color: "var(--accent)",
                letterSpacing: ".06em",
              }}
            >
              ROLE // {p.role.toUpperCase()}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
          {p.logo && (
            <div
              style={{
                padding: "8px 14px",
                background: "var(--ink-2)",
                border: "1px solid var(--line)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
              }}
            >
              <img
                src={p.logo}
                alt={`${p.name} logo`}
                style={{ height: 32, maxWidth: 140, objectFit: "contain", filter: "brightness(1.05)" }}
              />
            </div>
          )}
          <h1
            className="wordmark"
            style={{ fontSize: "clamp(36px,6vw,68px)", letterSpacing: "-.03em", lineHeight: 1, margin: 0 }}
          >
            {p.name}
          </h1>
        </div>

        <p
          className="serif"
          style={{ fontSize: "clamp(18px,2.6vw,24px)", color: "var(--paper)", maxWidth: 740, marginBottom: 24, lineHeight: 1.35 }}
        >
          {p.tagline}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {p.chips.map((c) => (
            <span
              key={c}
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--muted)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                padding: "6px 11px",
              }}
            >
              {c}
            </span>
          ))}
        </div>

        {p.shot && (
          <a href={p.live || undefined} target="_blank" rel="noopener noreferrer" className="hero-frame" aria-label={`Open ${p.name} live`}>
            <div className="hero-chrome">
              <i /> <i /> <i />
              <span className="mono">
                {p.favicon && <img src={p.favicon} alt="" width={12} height={12} />}
                {(p.live || "").replace("https://", "")}
              </span>
            </div>
            <img src={p.shot} alt={`${p.name} homepage`} />
          </a>
        )}

        <div className="dgrid">
          <div>
            {BLOCKS.map((b) => {
              const text = p[b.key];
              if (!text) return null;
              return (
                <div key={b.key} style={{ marginBottom: 30 }}>
                  <div
                    className="mono"
                    style={{ color: "var(--accent)", fontSize: 10.5, letterSpacing: ".08em", marginBottom: 9 }}
                  >
                    {b.label}
                  </div>
                  <p style={{ fontSize: 15.5, color: "var(--paper)", opacity: 0.92, lineHeight: 1.7 }}>
                    {text}
                  </p>
                </div>
              );
            })}
            {p.potential && (
              <div style={{ marginBottom: 30 }}>
                <div className="mono" style={{ color: "var(--accent)", fontSize: 10.5, marginBottom: 9 }}>
                  the potential
                </div>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}>{p.potential}</p>
              </div>
            )}
          </div>

          <aside className="aside">
            <div className="mono" style={{ color: "var(--accent)", fontSize: 10.5, letterSpacing: ".08em", marginBottom: 14 }}>
              {STATUS_LABEL[p.status] || p.status}
            </div>
            {p.metrics?.length > 0 && (
              <ul style={{ listStyle: "none", marginBottom: 24, padding: 0 }}>
                {p.metrics.map((m) => (
                  <li
                    key={m}
                    className="mono"
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      padding: "10px 0",
                      borderBottom: "1px dashed var(--line)",
                      lineHeight: 1.5,
                      textTransform: "none",
                    }}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener"
                  className="mono alink live"
                >
                  live →
                </a>
              )}
              {repos.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener" className="mono alink">
                  {r.label}
                </a>
              ))}
            </div>
            {p.note && (
              <p
                className="mono"
                style={{ color: "var(--faint)", fontSize: 10.5, marginTop: 16, textTransform: "none", lineHeight: 1.5 }}
              >
                {p.note}
              </p>
            )}
          </aside>
        </div>

        {/* next */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            marginTop: 20,
            padding: "50px 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="mono" style={{ color: "var(--faint)", fontSize: 11, marginBottom: 8 }}>
              next system
            </div>
            <Link href={`/engineering/${next.id}`} className="serif" style={{ fontSize: 34, color: "var(--paper)" }}>
              {next.name}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .dgrid { display:grid; grid-template-columns:1.55fr 1fr; gap:48px; }
        @media(max-width:840px){ .dgrid{grid-template-columns:1fr; gap:36px} }
        .aside { border:1px solid var(--line); border-radius:14px; background:var(--ink-2); padding:26px; align-self:start; position:sticky; top:96px; }
        .alink { font-size:12px; border:1px solid var(--line); border-radius:8px; padding:12px 15px; text-align:center; transition:border-color .2s,color .2s,background .2s; text-transform:lowercase; }
        .alink:hover { border-color:var(--accent); color:var(--accent); }
        .hero-frame { display:block; max-width:980px; margin:0 0 56px; border:1px solid var(--line-strong); border-radius:12px; overflow:hidden; background:var(--ink-2); box-shadow:0 40px 80px -40px rgba(0,0,0,.65); transition:border-color .3s var(--ease), transform .3s var(--ease); }
        .hero-frame:hover { border-color:var(--accent); transform:translateY(-3px); }
        .hero-chrome { display:flex; align-items:center; gap:6px; padding:10px 14px; border-bottom:1px solid var(--line); }
        .hero-chrome i { width:9px; height:9px; border-radius:50%; background:var(--line-strong); }
        .hero-chrome span { margin-left:10px; display:flex; align-items:center; gap:7px; font-size:10.5px; color:var(--muted); background:var(--ink); padding:4px 12px; border-radius:20px; }
        .hero-frame > img { display:block; width:100%; aspect-ratio:1366/720; object-fit:cover; object-position:top; }
        .alink.live { background:var(--accent); border-color:var(--accent); color:var(--ink); font-weight:500; }
        .alink.live:hover { color:var(--ink); filter:brightness(1.05); }
      `}</style>
    </section>
  );
}
