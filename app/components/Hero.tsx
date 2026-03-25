"use client";
import { useEffect, useState, useRef } from "react";

const lines = [
  { text: "$ whoami", delay: 0 },
  { text: "pranjal_agrawal", delay: 600, accent: true },
  { text: "$ cat interests.txt", delay: 1200 },
  { text: "systems • cryptography • ML • quantum", delay: 1800, muted: true },
  { text: "$ status", delay: 2400 },
  { text: "open to internships ✦", delay: 3000, accent: true },
];

export default function Hero() {
  const [visible, setVisible] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => setVisible(v => [...v, i]), line.delay + 400);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ padding: "0 24px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.3,
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,136,0.07) 0%, transparent 70%)",
          top: "50%", left: "30%",
          transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`,
        }}
      />

      <div
        className="max-w-6xl mx-auto w-full relative z-10"
        style={{
          transform: `translateY(${scrollY * 0.08}px)`,
          opacity: Math.max(0, 1 - scrollY / 500),
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="mono text-xs mb-4" style={{ color: "var(--accent)", animation: "slideInLeft 0.6s ease 0.1s both" }}>
              HE/HIM · CSE · 3RD YEAR
            </p>
            <h1
              className="font-extrabold leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "-0.03em", animation: "slideInLeft 0.7s ease 0.2s both" }}
            >
              Pranjal<br />
              <span style={{ color: "var(--accent)" }} className="glow">Agrawal</span>
            </h1>
            <p
              className="text-lg mb-10 leading-relaxed"
              style={{ color: "var(--text-muted)", maxWidth: 420, animation: "slideInLeft 0.7s ease 0.35s both" }}
            >
              I build things at the intersection of systems, security, and intelligence.
              From encrypted filesystems to RL agents — I like problems that bite back.
            </p>
            <div className="flex items-center gap-4 flex-wrap" style={{ animation: "slideInLeft 0.7s ease 0.5s both" }}>
              <a
                href="#projects"
                className="mono text-sm px-6 py-3 font-bold transition-all duration-200"
                style={{ background: "var(--accent)", color: "var(--bg)", borderRadius: 2 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                view work →
              </a>
              <a
                href="https://github.com/Pranjal-agl"
                target="_blank"
                className="mono text-sm px-6 py-3 font-bold transition-all duration-200"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)", borderRadius: 2 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                github ↗
              </a>
            </div>
          </div>

          <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--bg-2)", animation: "slideInRight 0.8s ease 0.3s both" }}
          >
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-3)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span className="mono text-xs ml-2" style={{ color: "var(--text-muted)" }}>~/portfolio</span>
            </div>
            <div className="p-6 space-y-2" style={{ minHeight: 220 }}>
              {lines.map((line, i) => (
                <p
                  key={i}
                  className="mono text-sm"
                  style={{
                    color: line.accent ? "var(--accent)" : line.muted ? "var(--text-muted)" : "var(--text)",
                    opacity: visible.includes(i) ? 1 : 0,
                    transform: visible.includes(i) ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                >
                  {line.text}
                  {i === lines.length - 1 && visible.includes(i) && (
                    <span
                      className="inline-block w-2 h-4 ml-1 align-middle"
                      style={{ background: "var(--accent)", animation: "blink 1s step-end infinite" }}
                    />
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 mono text-xs flex flex-col items-center gap-2"
        style={{ color: "var(--text-muted)", animation: "fadeIn 1s ease 1.5s both" }}
      >
        <span>scroll</span>
        <div className="w-px h-12" style={{ background: "linear-gradient(var(--text-muted), transparent)" }} />
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}
