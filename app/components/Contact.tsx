"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "GitHub", href: "https://github.com/Pranjal-agl", handle: "@Pranjal-agl" },
  { label: "LinkedIn", href: "https://linkedin.com/in/pranjal-agrawal", handle: "pranjal-agrawal" },
  { label: "Email", href: "mailto:pranjal@example.com", handle: "pranjal@example.com" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" style={{ padding: "9rem 1.5rem", borderTop: "1px solid var(--border)" }} ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div style={{
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <p className="mono text-xs mb-3" style={{ color: "var(--accent)" }}>04 / CONTACT</p>
          <h2 className="font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
            Let&apos;s talk
          </h2>
          <div className="accent-line mt-4 w-24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-30px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              I&apos;m currently looking for internship opportunities in SWE, ML, or security.
              If you have an interesting problem or just want to connect — reach out.
            </p>
            <a
              href="mailto:pranjal@example.com"
              className="mono text-sm px-6 py-3 font-bold inline-block transition-all duration-200"
              style={{ background: "var(--accent)", color: "var(--bg)", borderRadius: 2 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >
              say hello →
            </a>
          </div>

          <div className="space-y-4">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-sm group"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg-2)",
                  textDecoration: "none",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(30px)",
                  transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s, border-color 0.2s, background 0.2s`,
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
                <div>
                  <p className="mono text-xs mb-1 font-bold" style={{ color: "var(--text-muted)" }}>{l.label.toUpperCase()}</p>
                  <p className="mono text-sm" style={{ color: "var(--text)" }}>{l.handle}</p>
                </div>
                <span className="mono text-sm transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--accent)" }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-8 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>© 2025 Pranjal Agrawal</span>
          <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>built with Next.js + Tailwind</span>
        </div>
      </div>
    </section>
  );
}
