"use client";
import { motion } from "framer-motion";
import {
  Cpu, Database, Zap, Code2, Globe, Shield,
  GitBranch, Terminal, Layers, ArrowRight, Bot,
  CheckCircle2, Cloud, Server,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const deployCommands = [
  { cmd: "archi deploy --target aws --region us-east-1", out: "Provisioning EKS cluster...", status: "→ EC2, RDS, ELB spun up." },
  { cmd: "archi deploy --target railway", out: "Building Docker image...", status: "→ Live at api.yourapp.app" },
];

const features = [
  {
    icon: Bot,
    title: "Custom AI Agents",
    description: "Build LLM-powered agents as first-class backend nodes. Connect Claude, GPT-4, or Gemini to any database or API in your graph.",
    accent: "#8A2BE2",
    size: "xl:col-span-2",
  },
  {
    icon: Database,
    title: "Auto-Scaling PostgreSQL",
    description: "Provision Postgres with connection pooling, read replicas, and automated failover — all from a single node on the canvas.",
    accent: "#28C840",
  },
  {
    icon: Globe,
    title: "Vector DB Provisioning",
    description: "Add Pinecone, pgvector, or Weaviate nodes and wire them to your AI agents for semantic search and embeddings.",
    accent: "#00F0FF",
  },
  {
    icon: Code2,
    title: "Auto-Generated OpenAPI",
    description: "Every API gateway node produces a live, typed OpenAPI 3.1 spec. SDKs and docs generated automatically.",
    accent: "#F5A623",
    size: "xl:col-span-2",
  },
  {
    icon: Zap,
    title: "Real-time Webhook Engine",
    description: "Stripe, GitHub, Twilio — any webhook endpoint auto-wired with retry logic, dead-letter queues, and delivery guarantees.",
    accent: "#FF6B82",
  },
  {
    icon: Shield,
    title: "Zero Vendor Lock-in",
    description: "Export raw Terraform, Dockerfiles, or OpenAPI specs anytime. Your architecture belongs to you.",
    accent: "#00F0FF",
  },
];

const integrationCards = [
  {
    name: "AWS",
    sub: "EC2 · EKS · RDS · Lambda",
    color: "#FF9900",
    detail: "Full IaC generation for every AWS service. One-click provisioning with least-privilege IAM.",
    spec: "20+ services",
  },
  {
    name: "Railway",
    sub: "Zero-config cloud",
    color: "#7C3AED",
    detail: "Instant deploys from your Archi.dev canvas. Auto-scaling, custom domains, Postgres included.",
    spec: "Global edge",
  },
  {
    name: "Vercel",
    sub: "Next.js & Edge Functions",
    color: "#FFFFFF",
    detail: "Deploy API routes and serverless functions from your graph with automatic preview deploys.",
    spec: "Edge network",
  },
  {
    name: "Supabase",
    sub: "Postgres + Realtime + Auth",
    color: "#3ECF8E",
    detail: "Database, auth, storage, and Realtime wired to your nodes. RLS rules auto-generated.",
    spec: "Multi-region",
  },
];

export default function BentoGrid() {
  return (
    <section className="relative w-full py-24 px-6 bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(138,43,226,0.05) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-primary text-xs font-semibold uppercase tracking-[0.2em] border border-white/6">
              <Layers size={11} className="text-primary" />
              Platform Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="text-gradient font-medium tracking-tighter leading-[0.9] mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            Visually construct<br />the impossible.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="text-white/40 text-base max-w-xl mx-auto leading-relaxed"
          >
            Replace scattered YAML files and fragile deploy scripts with an intelligent canvas. Archi.dev generates deployment-ready infrastructure instantly.
          </motion.p>
        </div>

        {/* Deploy terminal — full width hero card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="bento-card rounded-2xl overflow-hidden mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Terminal size={14} className="text-primary" />
                  <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">One-Click Deploy</span>
                </div>
                <h3 className="text-white font-semibold text-2xl tracking-tight mb-3">Deploy to AWS or Railway<br />from your canvas.</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Connect AWS credentials or Railway tokens once. Every deploy derives from your visual graph — no Terraform hand-holding required.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {["EC2", "EKS", "RDS", "Lambda", "S3", "Railway Postgres"].map(tag => (
                  <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/4 border border-white/6 text-white/40">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="bg-[#0A0A0F] rounded-xl border border-white/6 overflow-hidden font-mono text-xs">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/3 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-3 text-white/30 text-[10px]">archi — deploy</span>
                </div>
                <div className="p-5 space-y-4">
                  {deployCommands.map((cmd, i) => (
                    <div key={i}>
                      <div className="flex items-start gap-2">
                        <span className="text-primary">~</span>
                        <span className="text-white/80">{cmd.cmd}</span>
                      </div>
                      <div className="text-white/35 mt-1 ml-4">{cmd.out}</div>
                      <div className="text-emerald-400 mt-0.5 ml-4 flex items-center gap-1.5">
                        <CheckCircle2 size={10} />
                        {cmd.status}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-primary">~</span>
                    <span className="w-2 h-4 bg-primary/70 animate-pulse inline-block" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`bento-card rounded-2xl p-6 group relative overflow-hidden cursor-pointer ${feat.size ?? ""}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `radial-gradient(300px circle at 50% 40%, ${feat.accent}0d, transparent 70%)` }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feat.accent}18`, border: `1px solid ${feat.accent}25` }}
                >
                  <Icon size={18} style={{ color: feat.accent }} />
                </div>
                <h3 className="text-white font-semibold text-sm tracking-tight mb-2">{feat.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">{feat.description}</p>
                <div
                  className="flex items-center gap-1 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: feat.accent }}
                >
                  Learn more <ArrowRight size={10} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Integrations */}
        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="section-line-accent" />
            <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em]">Deploy anywhere</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {integrationCards.map((intg, i) => (
              <motion.div
                key={intg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bento-card rounded-2xl p-6 group relative overflow-hidden cursor-pointer flex flex-col"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `radial-gradient(250px circle at 50% 30%, ${intg.color}0c, transparent 70%)` }}
                />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: intg.color, boxShadow: `0 0 6px ${intg.color}80` }} />
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ color: intg.color, backgroundColor: `${intg.color}18` }}
                  >
                    {intg.spec}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base tracking-tight mb-0.5">{intg.name}</h3>
                <p className="text-white/30 text-xs mb-3">{intg.sub}</p>
                <p className="text-white/40 text-xs leading-relaxed flex-1">{intg.detail}</p>
                <div
                  className="flex items-center gap-1 mt-4 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: intg.color }}
                >
                  View integration <ArrowRight size={10} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Agent Builder highlight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="bento-card rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-violet animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">AI Agents — v3</span>
              </div>
              <h3 className="text-white font-semibold text-2xl tracking-tight mb-3">
                Prompt your backend.<br />Ship it instantly.
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Type "A scalable real-time chat backend with Redis pub/sub and WebSockets" and watch Archi.dev draw the entire graph, wire the nodes, and generate the Terraform — in seconds.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Claude 3.5", "GPT-4o", "Gemini 1.5 Pro", "Llama 3"].map(model => (
                  <span key={model} className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-violet/10 border border-violet/20 text-violet/80">
                    {model}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 flex flex-col gap-3">
              {[
                { step: "01", text: "Describe your architecture in plain English", color: "text-primary" },
                { step: "02", text: "AI draws nodes, edges, and config automatically", color: "text-violet" },
                { step: "03", text: "Review the graph — add, remove, or edit any node", color: "text-primary" },
                { step: "04", text: "Deploy to AWS or Railway with one click", color: "text-emerald-400" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 p-4 rounded-xl bg-white/2.5 border border-white/5">
                  <span className={`text-xs font-bold font-mono ${s.color} shrink-0 mt-0.5`}>{s.step}</span>
                  <p className="text-white/60 text-xs leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
