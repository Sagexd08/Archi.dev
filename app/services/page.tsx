"use client";
import { motion } from "framer-motion";
import { Bot, Database, Cloud, HeadphonesIcon, GitMerge, Shield, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    icon: Bot,
    title: "Custom AI Workflows",
    description: "We design bespoke AI agent pipelines tailored to your product. From prompt routing and RAG systems to multi-agent orchestration — built on your Archi.dev canvas and deployed to production.",
    accent: "#8A2BE2",
    badge: "AI-Native",
  },
  {
    icon: Database,
    title: "Database Migration",
    description: "Zero-downtime migrations from legacy databases to modern cloud-native Postgres, Redis, or vector DB setups. Schema analysis, data validation, and rollback plans included.",
    accent: "#28C840",
    badge: "Zero Downtime",
  },
  {
    icon: Cloud,
    title: "Infrastructure as Code",
    description: "Full IaC buildout on AWS or Railway using Terraform, Pulumi, or CDK. Generated directly from your Archi.dev canvas — every resource precisely version-controlled.",
    accent: "#FF9900",
    badge: "AWS · Railway",
  },
  {
    icon: GitMerge,
    title: "DevOps Automation",
    description: "CI/CD pipelines, auto-deploy hooks, preview environments, and observability stacks. We wire GitHub Actions, Datadog, or PagerDuty into your deployment pipeline.",
    accent: "#00F0FF",
    badge: "CI/CD",
  },
  {
    icon: Shield,
    title: "Security Hardening",
    description: "Automated least-privilege IAM generation, secret scanning, network policy enforcement, and SOC 2-ready audit trails — baked into your infra from day one.",
    accent: "#FF6B82",
    badge: "SOC 2 ready",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "A dedicated solutions architect embedded in your Slack. Priority SLA, quarterly architecture reviews, and on-call assistance for production incidents.",
    accent: "#F5A623",
    badge: "Enterprise",
  },
];

const stats = [
  { value: "10x",  label: "Faster infra delivery"    },
  { value: "99.9%",label: "SLA guarantee"             },
  { value: "< 60s",label: "Average deploy time"       },
  { value: "0",    label: "Vendor lock-in"            },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[55vh] flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(138,43,226,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-violet text-xs font-semibold uppercase tracking-[0.2em] border border-white/6">
              <Zap size={11} className="text-violet" />
              Enterprise Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 24, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="text-gradient font-medium tracking-tighter leading-[0.92] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            Beyond the canvas.<br />Enterprise solutions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="text-white/40 text-base leading-relaxed max-w-xl mx-auto mb-10"
          >
            Archi.dev isn&apos;t just a platform — it&apos;s a team of infrastructure experts who will design, migrate, and operate your entire backend stack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <a
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform duration-200 shadow-[0_0_28px_rgba(255,255,255,0.18)]"
            >
              Book a call
            </a>
            <a
              href="/pricing"
              className="glass-panel px-7 py-3.5 rounded-full text-white text-sm font-medium hover:bg-white/6 transition-colors border border-white/8"
            >
              View pricing
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto bento-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
                className={`flex flex-col gap-1 p-7 ${i < 3 ? "border-r border-white/5" : ""}`}
              >
                <div className="text-white font-bold text-2xl font-mono">{s.value}</div>
                <div className="text-white/35 text-xs">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bento-card rounded-2xl p-7 group relative overflow-hidden flex flex-col cursor-pointer"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `radial-gradient(280px circle at 30% 20%, ${svc.accent}0d, transparent 70%)` }}
                  />

                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${svc.accent}18`, border: `1px solid ${svc.accent}25` }}
                    >
                      <Icon size={18} style={{ color: svc.accent }} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ color: svc.accent, backgroundColor: `${svc.accent}15` }}
                    >
                      {svc.badge}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-base tracking-tight mb-3 flex-1">
                    {svc.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-5">
                    {svc.description}
                  </p>

                  <div
                    className="flex items-center gap-1.5 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: svc.accent }}
                  >
                    Learn more <ArrowRight size={10} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center bento-card rounded-3xl p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,240,255,0.04) 0%, transparent 60%)" }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-white font-semibold text-3xl tracking-tight mb-4"
          >
            Ready to ship faster?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed"
          >
            Book a 30-minute call with a solutions architect. We&apos;ll analyse your stack and show you exactly what Archi.dev can do for your team.
          </motion.p>
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(255,255,255,0.22)" }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold transition-transform duration-200"
          >
            Initialize connection <ArrowRight size={14} />
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
