"use client";
import { useEffect, useRef, useState } from "react";

const skills = [
  { category: "Languages", items: ["Python", "Go", "C++", "Java", "TypeScript", "C", "SQL"] },
  { category: "ML / AI", items: ["PyTorch", "Hugging Face Transformers", "LangGraph", "RAG", "MLflow", "Stable-Baselines3", "Scikit-learn", "Pandas"] },
  { category: "Systems", items: ["Raft", "LSM trees", "Write-ahead logs", "FUSE", "OpenSSL", "AES-256-GCM", "Linux"] },
  { category: "Backend & Data", items: ["Spring Boot", "FastAPI", "React", "PostgreSQL", "pgvector", "SQLite", "WebSocket"] },
  { category: "Tools & Quantum", items: ["Docker", "GitHub Actions", "Git", "Selenium", "Qiskit", "QAOA"] },
  { category: "Coursework", items: ["Machine Learning", "Deep Learning", "Artificial Intelligence", "Reinforcement Learning", "Cryptography", "Blockchain", "Quantum Computing", "Cloud Computing", "OS", "Algorithms", "DBMS"] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(skills.length).fill(false));
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt((e.target as HTMLElement).dataset.idx || "-1");
          if (idx === -1) setHeaderVisible(true);
          else setVisibleCards(v => { const n = [...v]; n[idx] = true; return n; });
        }
      });
    }, { threshold: 0.1 });

    sectionRef.current?.querySelectorAll("[data-idx], [data-header]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: "9rem 1.5rem", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div
          data-header="true"
          style={{
            marginBottom: "4rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="mono text-xs mb-3" style={{ color: "var(--accent)" }}>03 / SKILLS</p>
          <h2 className="font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
            Stack &amp; tools
          </h2>
          <div className="accent-line mt-4 w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <div
              key={s.category}
              data-idx={String(i)}
              className="rounded-sm p-6"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-2)",
                opacity: visibleCards[i] ? 1 : 0,
                transform: visibleCards[i] ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
              }}
            >
              <p className="mono text-xs mb-4 font-bold" style={{ color: "var(--accent)" }}>{s.category.toUpperCase()}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item, j) => (
                  <span
                    key={item}
                    className="mono text-xs px-2 py-1 rounded-sm"
                    style={{
                      background: "var(--bg-3)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                      opacity: visibleCards[i] ? 1 : 0,
                      transition: `opacity 0.4s ease ${i * 80 + j * 40}ms`,
                      cursor: "default",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
