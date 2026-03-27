"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const companies = [
  { name: "Vercel", width: "80px" },
  { name: "Stripe", width: "64px" },
  { name: "Linear", width: "72px" },
  { name: "Supabase", width: "88px" },
  { name: "Neon", width: "60px" },
];

export default function TrustedCompanies() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#050505", padding: "48px 64px" }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
      />
      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-geist-mono, ui-monospace, monospace)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "#4B5563",
            textTransform: "uppercase",
          }}
        >
          Empowering Modern Engineering Teams
        </motion.p>

        {/* Company wordmarks */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {companies.map((company, i) => (
            <motion.span
              key={company.name}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: "var(--font-geist, system-ui, sans-serif)",
                fontWeight: 600,
                fontSize: "16px",
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.20)",
                transition: "color 200ms ease",
                cursor: "default",
                userSelect: "none",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLSpanElement).style.color =
                  "rgba(255,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLSpanElement).style.color =
                  "rgba(255,255,255,0.20)";
              }}
            >
              {company.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
