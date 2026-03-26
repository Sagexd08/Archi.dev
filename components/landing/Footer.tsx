"use client";
import { motion } from "framer-motion";
import { Github, Twitter, MessageCircle } from "lucide-react";

const productLinks = [
  { name: "Studio", href: "/studio" },
  { name: "Templates", href: "/#templates" },
  { name: "Integrations", href: "/#integrations" },
  { name: "Pricing", href: "/pricing" },
];

const developerLinks = [
  { name: "Documentation", href: "/docs" },
  { name: "GitHub", href: "https://github.com" },
  { name: "API Reference", href: "/docs#api" },
  { name: "Community", href: "/#community" },
];

const socialLinks = [
  { name: "X (Twitter)", href: "#", icon: Twitter },
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "Discord", href: "#", icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#050505",
        padding: "60px 64px 32px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <polygon
                  points="12,2 20,7 20,17 12,22 4,17 4,7"
                  stroke="#00F0FF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.9"
                />
                <circle cx="12" cy="12" r="2" fill="#00F0FF" opacity="0.8" />
              </svg>
              <span
                className="font-bold text-base tracking-tight"
                style={{ color: "#FFFFFF" }}
              >
                Archi.dev
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-geist, system-ui, sans-serif)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
                lineHeight: "1.6",
                maxWidth: "240px",
              }}
            >
              The visual compiler for backend infrastructure.
            </p>
          </motion.div>

          {/* Column 2 — Product */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3
              style={{
                fontFamily: "var(--font-geist-mono, ui-monospace, monospace)",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "16px",
              }}
            >
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-geist, system-ui, sans-serif)",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.4)",
                      transition: "color 200ms ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.4)";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Developers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3
              style={{
                fontFamily: "var(--font-geist-mono, ui-monospace, monospace)",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "16px",
              }}
            >
              Developers
            </h3>
            <ul className="space-y-3">
              {developerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      fontFamily: "var(--font-geist, system-ui, sans-serif)",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.4)",
                      transition: "color 200ms ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.4)";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist, system-ui, sans-serif)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            © 2026 Archi.dev. All rights reserved.
          </span>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                whileHover={{ scale: 1.15, y: -1 }}
                transition={{ duration: 0.18 }}
                style={{ color: "rgba(255,255,255,0.35)" }}
                className="hover:text-white transition-colors duration-200"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
