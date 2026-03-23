"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, XCircle, RefreshCw } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";

type Status = "operational" | "degraded" | "outage";

const services: { name: string; description: string; status: Status; uptime: number }[] = [
  { name: "API Gateway", description: "REST and GraphQL endpoints", status: "operational", uptime: 99.98 },
  { name: "AI Generation", description: "Code generation via Gemini", status: "operational", uptime: 99.71 },
  { name: "Authentication", description: "Supabase OAuth & sessions", status: "operational", uptime: 99.99 },
  { name: "Studio Canvas", description: "Visual architecture editor", status: "operational", uptime: 99.95 },
  { name: "Code Export", description: "ZIP / Dockerfile / OpenAPI export", status: "operational", uptime: 99.88 },
  { name: "Edge Deployment", description: "13-region deploy pipeline", status: "operational", uptime: 99.82 },
  { name: "Webhooks", description: "Event delivery system", status: "operational", uptime: 99.61 },
  { name: "Credits API", description: "Credit balance & billing", status: "operational", uptime: 100.0 },
];

const incidents = [
  {
    id: 1,
    date: "Mar 21, 2026",
    title: "Elevated generation latency",
    status: "resolved",
    duration: "~42 min",
    description: "Gemini API rate limits caused generation queues to back up. We scaled our retry logic and added adaptive throttling.",
    updates: [
      { time: "14:22 UTC", text: "Monitoring elevated P95 latency on /api/gen endpoint." },
      { time: "14:38 UTC", text: "Root cause identified: Gemini quota exhaustion under peak load." },
      { time: "15:04 UTC", text: "Throttling adjustments deployed. Latency returning to normal." },
      { time: "15:12 UTC", text: "Incident resolved. All systems operational." },
    ],
  },
  {
    id: 2,
    date: "Mar 14, 2026",
    title: "Auth callback delay",
    status: "resolved",
    duration: "~18 min",
    description: "Supabase OAuth redirects experienced delays due to a misconfigured edge function routing rule.",
    updates: [
      { time: "09:05 UTC", text: "Reports of slow login redirect. Investigating." },
      { time: "09:17 UTC", text: "Identified routing misconfiguration in auth callback edge function." },
      { time: "09:23 UTC", text: "Fix deployed. Login flow restored to normal." },
    ],
  },
];

const uptimeHistory = [
  { month: "Oct", value: 99.94 },
  { month: "Nov", value: 99.87 },
  { month: "Dec", value: 100.0 },
  { month: "Jan", value: 99.91 },
  { month: "Feb", value: 99.78 },
  { month: "Mar", value: 99.95 },
];

function StatusIcon({ status, size = 16 }: { status: Status; size?: number }) {
  if (status === "operational") return <CheckCircle2 size={size} className="text-emerald-400" />;
  if (status === "degraded") return <AlertCircle size={size} className="text-amber-400" />;
  return <XCircle size={size} className="text-red-400" />;
}

function StatusBadge({ status }: { status: Status }) {
  const config = {
    operational: { label: "Operational", bg: "bg-emerald-400/10", text: "text-emerald-400" },
    degraded: { label: "Degraded", bg: "bg-amber-400/10", text: "text-amber-400" },
    outage: { label: "Outage", bg: "bg-red-400/10", text: "text-red-400" },
  }[status];
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

export default function StatusPage() {
  const router = useRouter();
  const [expandedIncident, setExpandedIncident] = useState<number | null>(null);

  const allOperational = services.every((s) => s.status === "operational");
  const overallUptime = (services.reduce((sum, s) => sum + s.uptime, 0) / services.length).toFixed(2);

  return (
    <ReactLenis root>
      <main className="bg-black min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-40 pb-16 px-6 overflow-hidden">
          <div className="section-top-line" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(40,200,64,0.06) 0%, transparent 65%)" }}
          />
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-[#28C840] text-xs font-semibold uppercase tracking-[0.2em] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" style={{ boxShadow: "0 0 8px rgba(40,200,64,0.8)", animation: "glow-cyan 2s ease-in-out infinite" }} />
                System Status
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 24, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-medium tracking-tighter leading-[0.9] mb-5"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                background: allOperational
                  ? "linear-gradient(135deg, #34d399 0%, #28C840 100%)"
                  : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {allOperational ? "All systems go." : "Minor disruption."}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-white/40 text-base max-w-md mx-auto leading-relaxed mb-8"
            >
              {allOperational
                ? "All Archi.dev services are fully operational."
                : "Some services are experiencing degraded performance."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 glass-panel px-6 py-3 rounded-2xl border border-white/[0.06]"
            >
              <span className="text-white/30 text-xs uppercase tracking-[0.2em]">30-day avg uptime</span>
              <span className="text-[#28C840] font-bold text-xl font-mono">{overallUptime}%</span>
              <button
                type="button"
                className="text-white/25 hover:text-white/55 transition-colors cursor-pointer"
              >
                <RefreshCw size={13} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Services grid */}
        <section className="px-6 pb-16 md:px-16 xl:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-line-accent" />
              <h2 className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em]">Services</h2>
            </div>

            <div className="bento-card rounded-2xl divide-y divide-white/[0.05]">
              {services.map((service, i) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon status={service.status} />
                    <div>
                      <div className="text-white/80 text-sm font-medium">{service.name}</div>
                      <div className="text-white/30 text-xs mt-0.5">{service.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white/30 text-xs font-mono hidden md:block">{service.uptime}% uptime</span>
                    <StatusBadge status={service.status} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Uptime history */}
        <section className="px-6 pb-16 md:px-16 xl:px-24 relative">
          <div className="section-top-line" />
          <div className="max-w-5xl mx-auto pt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-line-accent" />
              <h2 className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em]">Uptime History</h2>
            </div>

            <div className="bento-card rounded-2xl p-6">
              <div className="flex items-end gap-3 h-24">
                {uptimeHistory.map((month, i) => {
                  const height = ((month.value - 99) / 1.1) * 100;
                  const color = month.value >= 99.9 ? "#28C840" : month.value >= 99.5 ? "#F5A623" : "#FF6B82";
                  return (
                    <motion.div
                      key={month.month}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                      style={{ originY: 1 }}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="text-white/30 text-[10px] font-mono">{month.value}%</div>
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${Math.max(height, 12)}%`,
                          minHeight: "8px",
                          backgroundColor: color,
                          opacity: 0.7,
                          boxShadow: `0 0 10px ${color}40`,
                        }}
                      />
                      <div className="text-white/25 text-[10px]">{month.month}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Incident history */}
        <section className="px-6 pb-28 md:px-16 xl:px-24 relative">
          <div className="section-top-line" />
          <div className="max-w-5xl mx-auto pt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-line-accent" />
              <h2 className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em]">Past Incidents</h2>
            </div>

            <div className="space-y-4">
              {incidents.map((incident, i) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  className="bento-card rounded-2xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                    className="w-full flex items-start justify-between p-6 text-left cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-white/80 text-sm font-semibold">{incident.title}</div>
                        <div className="text-white/30 text-xs mt-1">{incident.date} · {incident.duration} · Resolved</div>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: expandedIncident === incident.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-white/25 text-xs mt-1 shrink-0"
                    >
                      ▾
                    </motion.span>
                  </button>

                  {expandedIncident === incident.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 pb-6"
                    >
                      <p className="text-white/40 text-sm leading-relaxed mb-5 pl-6">{incident.description}</p>
                      <div className="pl-6 space-y-3">
                        {incident.updates.map((update) => (
                          <div key={update.time} className="flex items-start gap-3">
                            <span className="text-white/25 text-[11px] font-mono shrink-0 mt-0.5">{update.time}</span>
                            <span className="text-white/50 text-xs leading-relaxed">{update.text}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center py-6 text-white/20 text-sm"
              >
                No other incidents in the past 90 days.
              </motion.div>
            </div>
          </div>
        </section>

        <CTAFooter />
      </main>
    </ReactLenis>
  );
}
