"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";
import { Zap, Bug, Layers, Shield, Cpu, Globe } from "lucide-react";

type TagType = "feature" | "fix" | "performance" | "security" | "infrastructure" | "ai";

const tagConfig: Record<TagType, { label: string; color: string; bg: string }> = {
  feature: { label: "Feature", color: "#00F0FF", bg: "rgba(0,240,255,0.1)" },
  fix: { label: "Fix", color: "#FF6B82", bg: "rgba(255,107,130,0.1)" },
  performance: { label: "Perf", color: "#F5A623", bg: "rgba(245,166,35,0.1)" },
  security: { label: "Security", color: "#8A2BE2", bg: "rgba(138,43,226,0.1)" },
  infrastructure: { label: "Infra", color: "#28C840", bg: "rgba(40,200,64,0.1)" },
  ai: { label: "AI", color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
};

const releases = [
  {
    version: "v1.4.2",
    date: "Mar 21, 2026",
    summary: "AI multi-step revisions & generation quality uplift",
    icon: Zap,
    accent: "#a78bfa",
    items: [
      { tag: "ai" as TagType, text: "AI Agent now supports multi-step architecture revisions — ask it to iterate on a section without rewriting the full canvas." },
      { tag: "ai" as TagType, text: "Improved prompt understanding for service boundary and database schema generation." },
      { tag: "performance" as TagType, text: "Generation latency reduced by ~23% via streaming response buffering." },
      { tag: "fix" as TagType, text: "Fixed a bug where Kafka nodes were not correctly serialised in the docker-compose export." },
      { tag: "fix" as TagType, text: "Edge labels no longer overlap when multiple edges share the same source node." },
    ],
  },
  {
    version: "v1.4.0",
    date: "Mar 12, 2026",
    summary: "Gemma 3 12B integration & canvas keybindings",
    icon: Cpu,
    accent: "#00F0FF",
    items: [
      { tag: "ai" as TagType, text: "Gemma 3 12B model now available as the default AI model — 4× faster with improved code quality vs. the previous 1B model." },
      { tag: "feature" as TagType, text: "Canvas keybindings: ⌘+Z undo, ⌘+D duplicate node, ⌘+G group selection, Space+drag pan." },
      { tag: "feature" as TagType, text: "New Database node type: Redis with cluster topology support." },
      { tag: "infrastructure" as TagType, text: "Migrated build pipeline to Turbopack — dev server cold start reduced by 60%." },
      { tag: "security" as TagType, text: "Session tokens now rotated on every OAuth refresh to reduce token hijacking exposure." },
    ],
  },
  {
    version: "v1.3.5",
    date: "Feb 28, 2026",
    summary: "Blue-green deployments & OpenAPI v3.1 support",
    icon: Globe,
    accent: "#28C840",
    items: [
      { tag: "feature" as TagType, text: "Blue-green deployment rollout: zero-downtime deploys with instant rollback via the studio header." },
      { tag: "feature" as TagType, text: "OpenAPI export now generates v3.1 spec with full request/response body schemas derived from your API nodes." },
      { tag: "feature" as TagType, text: "Health check configuration added to all deploy targets — specify path, interval, and failure threshold." },
      { tag: "fix" as TagType, text: "Fixed region selector not persisting across sessions in the deploy panel." },
      { tag: "performance" as TagType, text: "Canvas rendering performance improved for graphs with >50 nodes." },
    ],
  },
  {
    version: "v1.3.0",
    date: "Feb 12, 2026",
    summary: "Team workspaces & shared canvases",
    icon: Layers,
    accent: "#8A2BE2",
    items: [
      { tag: "feature" as TagType, text: "Team plan launched: invite up to 5 members, share workspaces, and set per-member roles (Owner / Editor / Viewer)." },
      { tag: "feature" as TagType, text: "Shared canvas: multiple team members can view the same canvas simultaneously (concurrent editing coming in v1.5)." },
      { tag: "feature" as TagType, text: "Version history: view and restore canvas snapshots from the last 30 days." },
      { tag: "security" as TagType, text: "RBAC implemented at the API level — all endpoints now enforce team-scoped permissions." },
      { tag: "fix" as TagType, text: "Fixed dashboard credit counter not reflecting team-shared credits." },
    ],
  },
  {
    version: "v1.2.0",
    date: "Jan 24, 2026",
    summary: "Pricing model, credits system & global deploy",
    icon: Globe,
    accent: "#F5A623",
    items: [
      { tag: "feature" as TagType, text: "Launched credit-based pricing: Free (500/mo), Pro ($20/mo, 5k credits), Max ($80/mo, 100k credits)." },
      { tag: "feature" as TagType, text: "Deploy to 13 global edge regions: us-east-1, eu-west-1, ap-southeast-1, and 10 more." },
      { tag: "feature" as TagType, text: "Dashboard: stats, project cards, and quick actions for all active workspaces." },
      { tag: "infrastructure" as TagType, text: "Supabase Postgres migrated to the new pooler endpoint for 10× connection throughput." },
    ],
  },
  {
    version: "v1.0.0",
    date: "Jan 1, 2026",
    summary: "Initial public launch",
    icon: Zap,
    accent: "#00F0FF",
    items: [
      { tag: "feature" as TagType, text: "Visual canvas with API, Database, Functions, and Agent node types." },
      { tag: "feature" as TagType, text: "AI-powered code generation: Express / FastAPI scaffolding from canvas graph." },
      { tag: "feature" as TagType, text: "Dockerfile and docker-compose export for generated projects." },
      { tag: "feature" as TagType, text: "Google OAuth authentication with Supabase session management." },
      { tag: "feature" as TagType, text: "Architecture validation with real-time error and warning indicators." },
    ],
  },
];

const allTags: TagType[] = ["feature", "fix", "performance", "security", "infrastructure", "ai"];

function Tag({ type }: { type: TagType }) {
  const cfg = tagConfig[type];
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-md"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

export default function ChangelogPage() {
  const [activeTag, setActiveTag] = useState<TagType | null>(null);

  const filtered = activeTag
    ? releases.map((r) => ({ ...r, items: r.items.filter((it) => it.tag === activeTag) })).filter((r) => r.items.length > 0)
    : releases;

  return (
    <ReactLenis root>
      <main className="bg-black min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-40 pb-16 px-6 overflow-hidden">
          <div className="section-top-line" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,240,255,0.05) 0%, transparent 65%)" }}
          />
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-[#00F0FF] text-xs font-semibold uppercase tracking-[0.2em] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-glow-cyan" />
                What&apos;s new
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 24, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-gradient font-medium tracking-tighter leading-[0.9] mb-5"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              Changelog
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-white/40 text-base max-w-md mx-auto leading-relaxed mb-8"
            >
              Every release, every fix, every improvement — tracked here.
            </motion.p>

            {/* Tag filter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer border ${
                  activeTag === null
                    ? "bg-white/[0.1] border-white/[0.2] text-white"
                    : "border-white/[0.06] text-white/35 hover:text-white/60"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => {
                const cfg = tagConfig[tag];
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer border"
                    style={{
                      color: activeTag === tag ? cfg.color : "rgba(255,255,255,0.35)",
                      borderColor: activeTag === tag ? `${cfg.color}50` : "rgba(255,255,255,0.06)",
                      backgroundColor: activeTag === tag ? cfg.bg : "transparent",
                    }}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Release timeline */}
        <section className="px-6 pb-28 md:px-16 xl:px-24">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTag ?? "all"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline line */}
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-white/[0.06] hidden md:block" />

                <div className="space-y-8">
                  {filtered.map((release, i) => {
                    const Icon = release.icon;
                    return (
                      <motion.div
                        key={release.version}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                        className="flex gap-6 md:gap-8"
                      >
                        {/* Timeline dot */}
                        <div className="hidden md:flex flex-col items-center shrink-0">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center relative z-10 mt-1"
                            style={{ backgroundColor: `${release.accent}15`, border: `1px solid ${release.accent}30` }}
                          >
                            <Icon size={16} style={{ color: release.accent }} />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 bento-card rounded-2xl p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <span className="text-xs font-bold font-mono" style={{ color: release.accent }}>
                                {release.version}
                              </span>
                              <h3 className="text-white font-semibold text-base tracking-tight mt-1">{release.summary}</h3>
                            </div>
                            <span className="text-[10px] text-white/25 uppercase tracking-[0.15em] shrink-0 mt-1">{release.date}</span>
                          </div>

                          <ul className="space-y-2.5">
                            {release.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2.5">
                                <Tag type={item.tag} />
                                <span className="text-white/50 text-sm leading-relaxed">{item.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <CTAFooter />
      </main>
    </ReactLenis>
  );
}
