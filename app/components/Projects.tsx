"use client";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01", name: "traffic-rl-ppo", tag: "Reinforcement Learning", lang: "Python", langColor: "#3572A5",
    desc: "PPO agent controlling traffic signals in a custom Gymnasium environment. Reduces average vehicle queue length by 83.4% over fixed-timer baseline across 20 evaluation episodes.",
    highlights: ["PPO · Stable-Baselines3", "Custom Gym Env", "83.4% improvement"],
    link: "https://github.com/Pranjal-agl/traffic-rl-ppo",
  },
  {
    id: "02", name: "encfs-cloudcli", tag: "Systems · Cryptography", lang: "C++", langColor: "#f34b7d",
    desc: "Encrypted FUSE filesystem in C++17. Files written to the mount point are transparently encrypted with AES-256-GCM and uploaded to cloud storage. HMAC-SHA256 filename hashing for privacy.",
    highlights: ["AES-256-GCM", "FUSE · C++17", "HMAC-SHA256"],
    link: "https://github.com/Pranjal-agl/encfs-cloudcli",
  },
  {
    id: "03", name: "quantum-traffic-routing", tag: "Quantum Computing", lang: "Python", langColor: "#3572A5",
    desc: "Traffic optimization using Quantum Computing — Travelling Salesman NP Complete. Quantum routing prototype using QAOA and Qiskit to solve a small CVRP/TSP via qubit-encoded phase estimation.",
    highlights: ["QAOA · Qiskit", "CVRP/TSP", "Qubit encoding"],
    link: "https://github.com/Pranjal-agl/quantum-traffic-routing",
  },
  {
    id: "04", name: "SBI_Rate_Archiver", tag: "Automation · Data", lang: "Python", langColor: "#3572A5",
    desc: "Automated USD→INR exchange rate archiver — scrapes SBI New York, HDFC & ICICI daily via Selenium, PDF parsing & BeautifulSoup. Stores historical data in Excel + CSV. Runs on GitHub Actions.",
    highlights: ["Selenium", "GitHub Actions", "PDF parsing"],
    link: "https://github.com/Pranjal-agl/SBI_Rate_Archiver",
  },
  {
    id: "05", name: "2D_FloorPlanner", tag: "Desktop Application", lang: "Java", langColor: "#b07219",
    desc: "Java Swing desktop application for designing 2D floor plans — add rooms, place doors & windows, drop in furniture, and save/load layouts. Full GUI with drag-and-drop support.",
    highlights: ["Java Swing", "Drag & Drop", "Save/Load"],
    link: "https://github.com/Pranjal-agl/2D_FloorPlanner",
  },
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
  const header = useInViewDiv(0.1);

  return (
    <section id="projects" style={{ padding: "9rem 1.5rem" }}>
      <div className="max-w-6xl mx-auto">
        <div
          ref={header.ref}
          style={{
            marginBottom: "4rem",
            opacity: header.inView ? 1 : 0,
            transform: header.inView ? "translateY(0)" : "translateY(32px)",
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
      </div>
    </section>
  );
}
