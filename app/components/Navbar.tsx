"use client";
import { useEffect, useState } from "react";

const links = ["about", "projects", "skills", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="mono text-sm font-bold" style={{ color: "var(--accent)" }}>
          PA<span style={{ color: "var(--text-muted)" }}>_</span>
        </a>
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className="mono text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
