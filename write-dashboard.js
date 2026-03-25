const fs = require('fs');
const content = "use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Plus, Clock, ArrowRight, MoreHorizontal, GitBranch, Database, Code2, Layers,
  LayoutDashboard, Settings, Sparkles, Rocket
} from "lucide-react";

const recentProjects = [
  { name: "E-Commerce API", tab: "API", tabColor: "#00F0FF", icon: Code2, description: "REST gateway, auth, product catalog, checkout", nodes: 14, updatedAt: "2h ago", status: "deployed" },
  { name: "Analytics Pipeline", tab: "Process", tabColor: "#8A2BE2", icon: GitBranch, description: "Kafka ingestion, Flink transforms, S3 sink", nodes: 9, updatedAt: "Yesterday", status: "draft" },
  { name: "User Data Schema", tab: "Schema", tabColor: "#28C840", icon: Database, description: "Postgres models for multi-tenant SaaS", nodes: 7, updatedAt: "3d ago", status: "deployed" },
  { name: "Microservices Infra", tab: "Infrastructure", tabColor: "#F5A623", icon: Layers, description: "K8s cluster, service mesh, observability stack", nodes: 22, updatedAt: "1w ago", status: "draft" },
];

const stats = [
  { label: "API Requests", value: 893400, suffix: "", color: "#00F0FF" },
  { label: "Data Storage", value: 14, suffix: " GB", color: "#8A2BE2" },
  { label: "Credits Left", value: 188, suffix: "", color: "#28C840" },
  { label: "Active Nodes", value: 52, suffix: "", color: "#F5A623" },
];

function AnimatedCounter({ value, suffix = "", duration = 1200 }: { value: number; suffix?: string; duration?: number; }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0; const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden p-6">
      <div className="bg-architect-grid absolute inset-0 pointer-events-none opacity-20" />
      <div className="bg-noise absolute inset-0" />

      {/* Thin Left Rail expanding on hover */}
      <motion.aside 
        className="hidden lg:flex fixed left-6 top-6 bottom-6 cyber-glass rounded-3xl z-20 flex-col overflow-hidden"
        initial={{ width: 80 }}
        animate={{ width: sidebarExpanded ? 240 : 80 }}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="p-5 flex-1 flex flex-col w-[240px]">
          <button type="button" onClick={() => router.push("/")} className="flex items-center gap-4 cursor-pointer mb-10 overflow-hidden shrink-0">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-[#00F0FF]" />
            </div>
            <motion.div 
              className="text-left whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: sidebarExpanded ? 1 : 0 }}
            >
              <div className="text-sm font-semibold tracking-tight text-white">Archi.dev</div>
              <div className="text-[11px] text-white/40">Workspace</div>
            </motion.div>
          </button>

          <div className="space-y-3">
            {[
              { icon: LayoutDashboard, label: "Dashboard", active: true, path: "/dashboard" },
              { icon: Rocket, label: "Studio", active: false, path: "/studio" },
              { icon: Settings, label: "Settings", active: false, path: "/settings" }
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={() => router.push(item.path)}
                className={\w-full flex items-center gap-4 rounded-xl p-2.5 transition-colors overflow-hidden whitespace-nowrap \\}
              >
                <div className="w-5 flex justify-center shrink-0">
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto overflow-hidden">
             <motion.div animate={{ opacity: sidebarExpanded ? 1 : 0 }} className="px-2 whitespace-nowrap">
               <div className="text-[10px] uppercase tracking-[0.2em] text-[#00F0FF] mb-2 font-mono">Credits</div>
               <div className="text-xl font-bold stat-tabular text-white">188 <span className="text-xs text-white/30 font-normal">/ 500</span></div>
               <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                 <div className="bg-[#00F0FF] h-full rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" style={{ width: "37.6%" }} />
               </div>
             </motion.div>
          </div>
        </div>
      </motion.aside>

      <div className="relative z-10 lg:pl-[100px] pt-8 pb-20 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-px bg-[#8A2BE2]" />
                <span className="text-[#8A2BE2] text-[10px] font-bold uppercase tracking-widest font-mono">Overview</span>
              </div>
              <h1 className="text-gradient font-bold tracking-tight text-4xl font-['Geist']">
                Good afternoon.
              </h1>
            </div>
            <motion.button
              type="button"
              onClick={() => router.push("/studio")}
              className="shimmer-btn flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer border border-white/20"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus size={16} /> New project
            </motion.button>
          </div>

          {/* Quick Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-panel rounded-2xl p-5 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" style={{ from: stat.color, to: "transparent" }}/>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">{stat.label}</div>
                <div className="text-3xl font-bold tracking-tighter stat-tabular" style={{ color: stat.color }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-white/20" />
            <h2 className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] font-mono">Recent Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentProjects.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass-panel rounded-2xl p-6 relative group cursor-pointer overflow-hidden border border-white/[0.08]"
                  whileHover={{ scale: 1.02, boxShadow: \  0 30px \15\ }}
                  onClick={() => router.push("/studio")}
                >
                  {/* Miniature SVG architecture background */}
                  <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <svg width="160" height="120" viewBox="0 0 160 120">
                       <circle cx="120" cy="30" r="15" stroke={project.tabColor} strokeWidth="2" fill="none" />
                       <rect x="20" y="70" width="40" height="30" rx="4" stroke={project.tabColor} strokeWidth="2" fill="none" />
                       <path d="M40 70 C40 30, 105 30, 105 30" stroke={project.tabColor} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5" style={{ backgroundColor: \\10\ }}>
                          <Icon size={18} style={{ color: project.tabColor }} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base tracking-tight">{project.name}</h3>
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest" style={{ color: project.tabColor }}>
                            {project.tab}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                         <span className={\	ext-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border \\}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/50 text-sm mb-6">{project.description}</p>

                    <div className="flex items-center justify-between text-xs font-mono text-white/30">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><Layers size={12}/> {project.nodes} nodes</span>
                        <span className="flex items-center gap-1.5"><Clock size={12}/> {project.updatedAt}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/30 group-hover:text-[#00F0FF] transition-colors">
                        Open Studio <ArrowRight size={12} />
                      </div>
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
};
fs.writeFileSync('app/dashboard/page.tsx', content);
