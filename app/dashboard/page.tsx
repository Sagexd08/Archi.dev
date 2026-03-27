"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Plus,
  Clock,
  ArrowRight,
  MoreHorizontal,
  GitBranch,
  Database,
  Code2,
  Layers,
  LayoutDashboard,
  Settings,
  Sparkles,
  Rocket,
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
  { label: "Projects", value: 4, suffix: "", color: "#00F0FF" },
  { label: "Credits used", value: 312, suffix: "/500", color: "#8A2BE2" },
  { label: "Deployments", value: 2, suffix: "", color: "#28C840" },
  { label: "AI generations", value: 47, suffix: "", color: "#F5A623" },
];

const analyticsWidgets = [
  {
    title: "Generation success rate",
    value: 97,
    suffix: "%",
    accent: "#34d399",
    trend: [72, 78, 80, 84, 88, 92, 97],
  },
  {
    title: "Avg build time",
    value: 58,
    suffix: "s",
    accent: "#00F0FF",
    trend: [110, 101, 90, 80, 72, 64, 58],
  },
  {
    title: "Weekly active canvases",
    value: 126,
    suffix: "",
    accent: "#a78bfa",
    trend: [44, 57, 70, 82, 96, 112, 126],
  },
];

function MiniNodeGraph({ color, nodeCount = 5 }: { color: string; nodeCount?: number }) {
  const configs: Record<number, { nodes: {cx: number; cy: number}[]; edges: [number, number][] }> = {
    5: {
      nodes: [{ cx: 16, cy: 28 }, { cx: 44, cy: 12 }, { cx: 72, cy: 20 }, { cx: 84, cy: 44 }, { cx: 50, cy: 44 }],
      edges: [[0,1],[1,2],[2,3],[3,4],[4,0],[1,4]],
    },
    7: {
      nodes: [{ cx: 10, cy: 32 }, { cx: 28, cy: 12 }, { cx: 54, cy: 8 }, { cx: 76, cy: 20 }, { cx: 88, cy: 44 }, { cx: 60, cy: 50 }, { cx: 30, cy: 46 }],
      edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[1,6],[3,5]],
    },
    9: {
      nodes: [{ cx: 10, cy: 28 }, { cx: 26, cy: 10 }, { cx: 50, cy: 6 }, { cx: 74, cy: 10 }, { cx: 88, cy: 28 }, { cx: 80, cy: 48 }, { cx: 56, cy: 54 }, { cx: 30, cy: 48 }, { cx: 50, cy: 30 }],
      edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,8],[2,8],[4,8],[6,8]],
    },
    14: {
      nodes: [{ cx: 8, cy: 30 }, { cx: 22, cy: 10 }, { cx: 44, cy: 6 }, { cx: 66, cy: 10 }, { cx: 82, cy: 28 }, { cx: 80, cy: 50 }, { cx: 58, cy: 56 }, { cx: 34, cy: 54 }, { cx: 16, cy: 46 }, { cx: 36, cy: 28 }, { cx: 56, cy: 22 }, { cx: 68, cy: 36 }, { cx: 48, cy: 38 }, { cx: 28, cy: 40 }],
      edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],[9,10],[10,11],[11,12],[12,13],[13,9],[1,9],[3,10],[5,11],[7,12]],
    },
    22: {
      nodes: [{ cx: 8, cy: 30 }, { cx: 20, cy: 10 }, { cx: 40, cy: 4 }, { cx: 62, cy: 8 }, { cx: 80, cy: 22 }, { cx: 88, cy: 42 }, { cx: 76, cy: 56 }, { cx: 54, cy: 58 }, { cx: 30, cy: 56 }, { cx: 12, cy: 46 }, { cx: 28, cy: 28 }, { cx: 50, cy: 20 }, { cx: 68, cy: 30 }, { cx: 62, cy: 44 }, { cx: 38, cy: 40 }],
      edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],[10,11],[11,12],[12,13],[13,14],[14,10],[1,10],[3,11],[5,12],[7,13],[9,14]],
    },
  };
  const closest = [5,7,9,14,22].reduce((prev, curr) =>
    Math.abs(curr - nodeCount) < Math.abs(prev - nodeCount) ? curr : prev
  );
  const { nodes, edges } = configs[closest];
  return (
    <svg width="100%" height="100%" viewBox="0 0 98 62" fill="none" preserveAspectRatio="xMidYMid meet">
      {edges.map(([from, to], i) => (
        <line
          key={i}
          x1={nodes[from].cx} y1={nodes[from].cy}
          x2={nodes[to].cx} y2={nodes[to].cy}
          stroke={color}
          strokeWidth="0.75"
          strokeOpacity="0.25"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={i === 0 ? 3.5 : 2.2}
          fill={color} fillOpacity={i === 0 ? 0.9 : 0.5}
          style={i === 0 ? { filter: `drop-shadow(0 0 4px ${color})` } : undefined}
        />
      ))}
    </svg>
  );
}

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
      <div className="bg-noise absolute inset-0" />

      {/* Mobile top nav */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 cyber-glass border-b border-white/[0.06]">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-cyan-400/15 border border-cyan-300/30 flex items-center justify-center">
            <Sparkles size={12} className="text-cyan-300" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Archi.dev</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/studio")}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-colors"
          >
            <Rocket size={11} />
            Studio
          </button>
          <button
            type="button"
            onClick={() => router.push("/settings")}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-colors"
          >
            <Settings size={11} />
            Settings
          </button>
        </div>
      </div>

      <aside className="hidden lg:flex fixed left-6 top-6 bottom-6 w-64 cyber-glass rounded-3xl z-20 p-5 flex-col">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer mb-8"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-400/15 border border-cyan-300/30 flex items-center justify-center">
            <Sparkles size={14} className="text-cyan-300" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold tracking-tight">Archi.dev</div>
            <div className="text-[11px] text-white/35">Control panel</div>
          </div>
        </button>

        <div className="space-y-2">
          <button type="button" className="w-full sidebar-item border border-white/10 bg-white/[0.04] text-white">
            <LayoutDashboard size={14} /> Dashboard
          </button>
          <button
            type="button"
            onClick={() => router.push("/studio")}
            className="w-full sidebar-item"
          >
            <Rocket size={14} /> Studio
          </button>
          <button
            type="button"
            onClick={() => router.push("/settings")}
            className="w-full sidebar-item"
          >
            <Settings size={14} /> Settings
          </button>
        </div>

        <div className="mt-auto cyber-glass rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-2">Free credits</div>
          <div className="text-2xl font-semibold stat-tabular">188</div>
          <div className="progress-track mt-3">
            <div className="progress-fill" style={{ width: "37.6%" }} />
          </div>
          <p className="text-[11px] text-white/35 mt-2">312 / 500 used this month</p>
        </div>
      </aside>

      <div className="relative z-10 lg:pl-[312px] px-4 sm:px-6 md:px-10 pt-6 md:pt-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="section-line-accent" />
                <span className="text-[#00F0FF] text-xs font-semibold uppercase tracking-[0.2em]">Workspace</span>
              </div>
              <h1 className="text-gradient font-medium tracking-tighter leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Good afternoon.
              </h1>
              <p className="text-white/35 text-sm mt-1">Pick up where you left off or launch a new architecture.</p>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-8 md:mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className="cyber-glass rounded-2xl px-3 py-3 sm:px-5 sm:py-4"
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
                  <AnimatedCounter value={stat.value} />
                  <span className="text-base font-normal" style={{ WebkitTextFillColor: "rgba(255,255,255,0.3)" }}>
                    {stat.suffix}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10 mt-4 md:mt-6">
            {analyticsWidgets.map((widget, index) => {
              const maxTrend = Math.max(...widget.trend, 1);
              return (
                <motion.div
                  key={widget.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.25 + index * 0.08 }}
                  className="cyber-glass rounded-2xl p-5"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/35 mb-2">{widget.title}</div>
                  <div className="text-2xl font-semibold tracking-tight mb-4" style={{ color: widget.accent }}>
                    <AnimatedCounter value={widget.value} suffix={widget.suffix} duration={1400 + index * 120} />
                  </div>
                  <div className="flex items-end gap-1.5 h-14">
                    {widget.trend.map((point, pointIndex) => (
                      <motion.div
                        key={`${widget.title}-${pointIndex}`}
                        initial={{ height: 2, opacity: 0.3 }}
                        animate={{
                          height: `${Math.max((point / maxTrend) * 100, 8)}%`,
                          opacity: 1,
                        }}
                        transition={{ duration: 0.45, delay: 0.4 + pointIndex * 0.04 }}
                        className="rounded-sm flex-1"
                        style={{
                          background: `linear-gradient(180deg, ${widget.accent}, ${widget.accent}55)`,
                          boxShadow: `0 0 10px ${widget.accent}40`,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="section-line-accent" />
            <h2 className="text-white/70 text-xs font-semibold uppercase tracking-[0.2em]">Recent Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentProjects.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
                  className="cyber-glass rounded-2xl p-5 group cursor-pointer"
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  onClick={() => router.push("/studio")}
                >
                  {/* Mini node graph preview */}
                  <div
                    className="w-full h-16 rounded-xl mb-4 overflow-hidden relative"
                    style={{ background: `${project.tabColor}08`, border: `1px solid ${project.tabColor}18` }}
                  >
                    <div className="absolute inset-0 opacity-60">
                      <MiniNodeGraph color={project.tabColor} nodeCount={project.nodes} />
                    </div>
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `radial-gradient(ellipse 60% 80% at 50% 50%, ${project.tabColor}10 0%, transparent 70%)`,
                      }}
                    />
                  </div>

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
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: project.tabColor }}>
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
        </div>
      </div>
    </main>
  );
}
