"use client";
import { motion } from "framer-motion";
import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe";
import { CheckCircle2, Zap, Server, Globe } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const markers: GlobeMarker[] = [
  { lat: 40.7128, lng: -74.006,  src: "https://assets.aceternity.com/avatars/1.webp",  label: "New York" },
  { lat: 51.5074, lng: -0.1278,  src: "https://assets.aceternity.com/avatars/2.webp",  label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp",  label: "Tokyo" },
  { lat: -33.8688,lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp",  label: "Sydney" },
  { lat: 48.8566, lng: 2.3522,   src: "https://assets.aceternity.com/avatars/5.webp",  label: "Paris" },
  { lat: 28.6139, lng: 77.209,   src: "https://assets.aceternity.com/avatars/6.webp",  label: "New Delhi" },
  { lat: 55.7558, lng: 37.6173,  src: "https://assets.aceternity.com/avatars/7.webp",  label: "Moscow" },
  { lat: -22.9068,lng: -43.1729, src: "https://assets.aceternity.com/avatars/8.webp",  label: "Rio" },
  { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/9.webp",  label: "Shanghai" },
  { lat: 25.2048, lng: 55.2708,  src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai" },
  { lat: 1.3521,  lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" },
  { lat: 37.5665, lng: 126.978,  src: "https://assets.aceternity.com/avatars/13.webp", label: "Seoul" },
];

const providers = [
  { name: "AWS", color: "#FF9900", regions: "20+ regions",  detail: "EC2, EKS, RDS, Lambda" },
  { name: "Railway", color: "#7C3AED", regions: "Global edge", detail: "Zero-config deploys"  },
  { name: "Vercel", color: "#FFFFFF", regions: "Edge Network", detail: "Next.js & serverless"  },
  { name: "Supabase", color: "#3ECF8E", regions: "Multi-region", detail: "Postgres + Realtime" },
];

const stats = [
  { icon: Zap,         label: "Avg deploy time", value: "< 60s" },
  { icon: Globe,       label: "Global regions",  value: "23+"   },
  { icon: Server,      label: "Infra providers", value: "4"     },
  { icon: CheckCircle2,label: "Uptime SLA",      value: "99.99%" },
];

export default function GlobalEdge() {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,240,255,0.04) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-primary text-xs font-semibold uppercase tracking-[0.2em] border border-white/6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: "glow-cyan 2s infinite" }} />
              Global Deployment
            </span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="text-gradient font-medium tracking-tighter leading-[0.9] mb-4"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            Deploy to the edge.<br />Globally.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="text-white/40 text-base max-w-lg mx-auto leading-relaxed"
          >
            One-click deployment to AWS, Railway, Vercel, or your own infrastructure — with sub-10ms latency, anywhere on Earth.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="bento-card rounded-3xl overflow-hidden relative"
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 60%, rgba(0,240,255,0.03) 0%, transparent 60%)" }} />

          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.07 }}
                  className={`flex flex-col gap-1 p-6 ${i < 3 ? "border-r border-white/5" : ""}`}
                >
                  <Icon size={14} className="text-primary mb-1 opacity-70" />
                  <div className="text-white font-bold text-xl font-mono">{stat.value}</div>
                  <div className="text-white/35 text-xs">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative flex flex-col md:flex-row">
            <div className="md:w-2/3 relative h-[440px] md:h-[500px]">
              <Globe3D
                markers={markers}
                config={{
                  atmosphereColor: "#00F0FF",
                  atmosphereIntensity: 0.18,
                  showAtmosphere: true,
                  atmosphereBlur: 3,
                  bumpScale: 3,
                  autoRotateSpeed: 0.25,
                  enableZoom: false,
                  ambientIntensity: 0.7,
                  pointLightIntensity: 1.8,
                }}
                className="h-full"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.5) 100%)" }} />
            </div>

            <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-white/5 p-6 flex flex-col gap-3 justify-center">
              <p className="text-white/35 text-xs font-semibold uppercase tracking-[0.2em] mb-2">Deploy to</p>
              {providers.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.08 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/2.5 border border-white/6 group hover:border-white/12 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}80` }} />
                    <div>
                      <div className="text-white text-sm font-semibold">{p.name}</div>
                      <div className="text-white/30 text-xs">{p.detail}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-white/25 group-hover:text-white/50 transition-colors">{p.regions}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
