import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranjal Agrawal",
  description: "Pranjal Agrawal: CS student at BITS Pilani building distributed systems, LLM agents and ML tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
