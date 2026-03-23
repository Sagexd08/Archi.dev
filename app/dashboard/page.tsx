"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Plus, Clock, Zap, Globe, ArrowRight, MoreHorizontal,
  GitBranch, Database, Code2, Layers,
} from "lucide-react";

const recentProjects = [
  {
    name: "E-Commerce API",
    tab: "API",
    tabColor: "#00F0FF",
    icon: Code2,
    description: "REST gateway, auth, product catalog, checkout",
    nodes: 14,
    updatedAt: "2h ago",
    status: "deployed",
  },
  {
    name: "Analytics Pipeline",
    tab: "Process",
    tabColor: "#8A2BE2",
    icon: GitBranch,
    description: "Kafka ingestion, Flink transforms, S3 sink",
    nodes: 9,
    updatedAt: "Yesterday",
    status: "draft",
  },
  {
    name: "User Data Schema",
    tab: "Schema",
    tabColor: "#28C840",
    icon: Database,
    description: "Postgres models for multi-tenant SaaS",
    nodes: 7,
    updatedAt: "3d ago",
    status: "deployed",
  },
  {
    name: "Microservices Infra",
    tab: "Infrastructure",
    tabColor: "#F5A623",
    icon: Layers,
    description: "K8s cluster, service mesh, observability stack",
    nodes: 22,
    updatedAt: "1w ago",
    status: "draft",
  },
];

const stats = [
  { label: "Projects", value: "4", suffix: "", color: "#00F0FF" },
  { label: "Credits used", value: "312", suffix: "/500", color: "#8A2BE2" },
  { label: "Deployments", value: "2", suffix: "", color: "#28C840" },
  { label: "AI generations", value: "47", suffix: "", color: "#F5A623" },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />
      <div className="bg-noise absolute inset-0" />

      {/* Ambient glows */}
      <div
        className="absolute top-0 right-[15%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        className="absolute bottom-[20%] left-[5%] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(138,43,226,0.08) 0%, transparent 68%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" stroke="#00F0FF" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.92"/>
                <circle cx="12" cy="12" r="2.4" fill="#00F0FF" opacity="0.85"/>
                <line x1="12" y1="2" x2="12" y2="9.6" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
                <line x1="20" y1="7" x2="14.1" y2="10.3" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
                <line x1="20" y1="17" x2="14.1" y2="13.7" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
                <line x1="12" y1="22" x2="12" y2="14.4" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
                <line x1="4" y1="17" x2="9.9" y2="13.7" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
                <line x1="4" y1="7" x2="9.9" y2="10.3" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
              </svg>
              <span className="font-semibold text-base tracking-tight" style={{
                background: "linear-gradient(90deg, #FFFFFF 55%, rgba(0,240,255,0.75) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Archi.dev</span>
            </button>
            <span className="text-white/20 text-sm">/</span>
            <span className="text-white/45 text-sm">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="text-white/40 hover:text-white/70 text-sm transition-colors cursor-pointer"
            >
              Settings
            </button>
            <div className="w-px h-4 bg-white/[0.1]" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
              S
            </div>
          </div>
        </div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="section-line-accent" />
            <span className="text-[#00F0FF] text-xs font-semibold uppercase tracking-[0.2em]">Workspace</span>
          </div>
          <h1 className="text-gradient font-medium tracking-tighter leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Good afternoon.
          </h1>
          <p className="text-white/35 text-sm mt-1">You have 188 free credits remaining this month.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className="bento-card rounded-2xl px-5 py-4"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">{stat.label}</div>
              <div
                className="text-2xl font-semibold tracking-tighter stat-tabular"
                style={{
                  background: `linear-gradient(180deg, ${stat.color}, ${stat.color}88)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
                <span className="text-base font-normal" style={{ WebkitTextFillColor: "rgba(255,255,255,0.3)" }}>
                  {stat.suffix}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="section-line-accent" />
            <h2 className="text-white/70 text-xs font-semibold uppercase tracking-[0.2em]">Recent Projects</h2>
          </div>
          <motion.button
            type="button"
            onClick={() => router.push("/studio")}
            className="shimmer-btn flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
            whileHover={{ scale: 1.04, boxShadow: "0 0 22px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Plus size={13} />
            New project
          </motion.button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {recentProjects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.08 }}
                className="bento-card rounded-2xl p-5 group cursor-pointer"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                onClick={() => router.push("/studio")}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${project.tabColor}15` }}
                    >
                      <Icon size={17} style={{ color: project.tabColor }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm tracking-tight">{project.name}</h3>
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: project.tabColor }}
                      >
                        {project.tab}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${
                        project.status === "deployed"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-white/[0.06] text-white/35"
                      }`}
                    >
                      {project.status}
                    </span>
                    <button type="button" className="text-white/20 hover:text-white/50 transition-colors p-1">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-white/40 text-xs leading-relaxed mb-4">{project.description}</p>

                <div className="flex items-center justify-between text-[11px] text-white/30">
                  <div className="flex items-center gap-1.5">
                    <Layers size={11} className="text-white/20" />
                    {project.nodes} nodes
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-white/20" />
                    {project.updatedAt}
                  </div>
                  <div className="flex items-center gap-1 text-white/25 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowRight size={10} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              title: "AI Quick-Start",
              description: "Describe your backend in plain English and let the agent scaffold the architecture.",
              accent: "#8A2BE2",
              cta: "Try AI agent",
              href: "/studio",
            },
            {
              icon: Globe,
              title: "Deploy to Edge",
              description: "Push your saved canvas directly to one of 13 global regions in under 60 seconds.",
              accent: "#00F0FF",
              cta: "Open studio",
              href: "/studio",
            },
            {
              icon: Code2,
              title: "Explore Docs",
              description: "Browse guides, references, and tutorials for everything on the platform.",
              accent: "#28C840",
              cta: "View docs",
              href: "/docs",
            },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.08 }}
                className="bento-card rounded-2xl p-5 group cursor-pointer"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                onClick={() => router.push(action.href)}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${action.accent}15` }}
                >
                  <Icon size={17} style={{ color: action.accent }} />
                </div>
                <h3 className="text-white font-semibold text-sm tracking-tight mb-2">{action.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed mb-4">{action.description}</p>
                <div
                  className="text-xs font-semibold flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ color: action.accent }}
                >
                  {action.cta} <ArrowRight size={11} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
