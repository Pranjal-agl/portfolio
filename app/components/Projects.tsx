"use client";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01", name: "kvengine", tag: "Distributed Systems", lang: "Go", langColor: "#00ADD8",
    desc: "Crash-safe, Raft-replicated key-value store built from scratch in Go: fsynced write-ahead log, binary-safe TCP protocol, leader election, log compaction and an LSM storage engine. Correctness is backed by a linearizability checker, SIGKILL crash tests and fuzzing.",
    highlights: ["Raft · LSM · WAL", "Linearizability checker", "Crash-fault tests"],
    link: "https://github.com/Pranjal-agl/kvengine",
  },
  {
    id: "02", name: "claims-triage-agent", tag: "LLM Agents · Data", lang: "Python", langColor: "#3572A5",
    desc: "Insurance-claims system in two stages: a LangGraph agent that extracts, grounds, fraud-scores and routes free-text claims, plus a text-to-SQL + RAG analytics assistant where Postgres row-level security decides what each user can see. Measured on a 231-case eval and a 76-question gold set.",
    highlights: ["LangGraph", "Postgres RLS · pgvector", "26/26 RBAC attacks contained"],
    link: "https://github.com/Pranjal-agl/claims-triage-agent",
  },
  {
    id: "03", name: "collabdesk", tag: "Full-Stack · Real-time", lang: "Java", langColor: "#b07219",
    desc: "Multi-tenant project management app with live collaboration. Spring Boot 3 backend with STOMP over WebSocket, rotating JWT refresh tokens and tenant-scoped caching; React + TypeScript frontend with optimistic updates that roll back on conflict.",
    highlights: ["Spring Boot 3", "React · TypeScript", "WebSocket"],
    link: "https://github.com/Pranjal-agl/collabdesk",
  },
  {
    id: "04", name: "forex-rate-archiver", tag: "Data Engineering", lang: "Python", langColor: "#3572A5",
    desc: "Daily ETL pipeline archiving USD→INR rates from SBI New York, HDFC and ICICI, none of which offer a history API. Per-bank adapters (Selenium, PDF table extraction, BeautifulSoup) feed SQLite via idempotent upserts, with anomaly detection evaluated on injected faults. Runs on GitHub Actions.",
    highlights: ["ETL · SQLite", "Anomaly detection", "GitHub Actions"],
    link: "https://github.com/Pranjal-agl/forex-rate-archiver",
  },
  {
    id: "05", name: "cuad-extractor", tag: "NLP · Fine-tuning", lang: "Python", langColor: "#3572A5",
    desc: "Fine-tuned DeBERTa-v3 for extracting clauses (governing law, non-compete, liability caps…) from legal contracts. Hyperparameter search tracked in MLflow, FastAPI serving with a measured p99 latency, and an adversarial eval that shows where the model breaks.",
    highlights: ["DeBERTa-v3", "0.77 test macro-F1", "p99 29 ms"],
    link: "https://github.com/Pranjal-agl/cuad-extractor",
  },
  {
    id: "06", name: "encfs-cloudcli", tag: "Systems · Cryptography", lang: "C++", langColor: "#f34b7d",
    desc: "Encrypted FUSE filesystem in C++17. Files written to the mount point are transparently encrypted with AES-256-GCM and uploaded to cloud storage. HMAC-SHA256 filename hashing for privacy.",
    highlights: ["AES-256-GCM", "FUSE · C++17", "HMAC-SHA256"],
    link: "https://github.com/Pranjal-agl/encfs-cloudcli",
  },
  {
    id: "07", name: "news-digest", tag: "Automation · NLP", lang: "Python", langColor: "#3572A5",
    desc: "Self-hosted, Ground News-style daily digest. Pulls ~20 RSS feeds across the political spectrum, clusters coverage into stories with TF-IDF, and shows each story's bias split, blindspots and ownership. Publishes a static site to GitHub Pages every day.",
    highlights: ["TF-IDF clustering", "GitHub Pages", "No API keys"],
    link: "https://github.com/Pranjal-agl/news-digest",
  },
  {
    id: "08", name: "traffic-rl-ppo", tag: "Reinforcement Learning", lang: "Python", langColor: "#3572A5",
    desc: "PPO agent controlling traffic signals in a custom Gymnasium environment. Reduces average vehicle queue length by 83.4% over fixed-timer baseline across 20 evaluation episodes.",
    highlights: ["PPO · Stable-Baselines3", "Custom Gym Env", "83.4% improvement"],
    link: "https://github.com/Pranjal-agl/traffic-rl-ppo",
  },
];

const moreWork = [
  { name: "octamind-graph-rag", note: "query-aware graph retrieval for multi-hop QA (research)" },
  { name: "qrl-td-lambda", note: "quantum RL paper replication + TD(λ) traces" },
  { name: "quantum-traffic-routing", note: "QAOA routing with Qiskit" },
  { name: "financial_inc", note: "alt-data credit risk scoring" },
  { name: "2D_FloorPlanner", note: "Java Swing floor-plan editor" },
];

function useInViewAnchor(threshold = 0.15) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useInViewDiv(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const { ref, inView } = useInViewAnchor(0.1);
  return (
    <a
      ref={ref}
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-sm p-6"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-2)",
        textDecoration: "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, border-color 0.2s, background 0.2s`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.background = "var(--bg-2)";
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <span className="mono text-xs font-bold w-8 shrink-0" style={{ color: "var(--text-muted)" }}>{p.id}</span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="mono font-bold text-base">{p.name}</h3>
            <span className="mono text-xs px-2 py-0.5 rounded-sm" style={{ background: "var(--bg-3)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
              {p.tag}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: 600 }}>{p.desc}</p>
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="flex flex-wrap gap-2 justify-end">
            {p.highlights.map(h => (
              <span key={h} className="mono text-xs px-2 py-0.5" style={{ color: "var(--accent)", border: "1px solid rgba(0,255,136,0.2)" }}>{h}</span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.langColor }} />
            <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>{p.lang}</span>
            <span className="mono text-xs ml-2 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--accent)" }}>↗</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const { ref: headerRef, inView: headerInView } = useInViewDiv(0.1);

  return (
    <section id="projects" style={{ padding: "9rem 1.5rem" }}>
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          style={{
            marginBottom: "4rem",
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="mono text-xs mb-3" style={{ color: "var(--accent)" }}>02 / PROJECTS</p>
          <h2 className="font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
            Things I&apos;ve built
          </h2>
          <div className="accent-line mt-4 w-24" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>

        <div className="mt-12">
          <p className="mono text-xs mb-4" style={{ color: "var(--text-muted)" }}>MORE WORK</p>
          <div className="flex flex-wrap gap-3">
            {moreWork.map(m => (
              <a
                key={m.name}
                href={`https://github.com/Pranjal-agl/${m.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-xs px-3 py-2 rounded-sm transition-colors duration-200"
                style={{ border: "1px solid var(--border)", background: "var(--bg-2)", color: "var(--text)", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                {m.name} <span style={{ color: "var(--text-muted)" }}>· {m.note}</span>
              </a>
            ))}
            <a
              href="https://github.com/Pranjal-agl?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs px-3 py-2"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              all repos ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
