"use client";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe";

const globeMarkers: GlobeMarker[] = [
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/1.webp", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp", label: "Sydney" },
  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/5.webp", label: "Paris" },
  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },
  { lat: 55.7558, lng: 37.6173, src: "https://assets.aceternity.com/avatars/7.webp", label: "Moscow" },
  { lat: -22.9068, lng: -43.1729, src: "https://assets.aceternity.com/avatars/8.webp", label: "Rio de Janeiro" },
  { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/9.webp", label: "Shanghai" },
  { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai" },
  { lat: -34.6037, lng: -58.3816, src: "https://assets.aceternity.com/avatars/11.webp", label: "Buenos Aires" },
  { lat: 1.3521, lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" },
  { lat: 37.5665, lng: 126.978, src: "https://assets.aceternity.com/avatars/13.webp", label: "Seoul" },
];

const terminalLines = [
  { text: "$ archi deploy --env production", color: "rgba(255,255,255,0.28)" },
  { text: "✓ Building Docker image…", color: "#00F0FF" },
  { text: "  → Layers cached (12/12)", color: "rgba(255,255,255,0.45)" },
  { text: "✓ Pushing to registry…", color: "#00F0FF" },
  { text: "  → archi.dev/app:sha-a1b2c3d", color: "rgba(255,255,255,0.45)" },
  { text: "✓ Deploying to edge…", color: "#00F0FF" },
  { text: "✓ Live  https://api.yourdomain.com", color: "#28C840" },
  { text: "  Deploy complete in 58s", color: "rgba(255,255,255,0.22)" },
];

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleLines, setVisibleLines] = useState(0);
  useEffect(() => {
    if (!inView || visibleLines >= terminalLines.length) return;
    const id = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines === 0 ? 400 : 280
    );
    return () => clearTimeout(id);
  }, [inView, visibleLines]);
  return (
    <div
      ref={ref}
      className="mt-6 rounded-xl overflow-hidden border border-white/[0.08] font-mono"
    >
      <div className="bg-[#141414] px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] text-white/30 select-none">
          archi.dev — deploy
        </span>
      </div>
      <div className="bg-[#070707] p-4 text-[12px] space-y-1.5 leading-relaxed min-h-[148px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            style={{ color: line.color }}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines < terminalLines.length && inView && (
          <motion.span
            className="inline-block w-[7px] h-[14px] rounded-[1px]"
            style={{ background: "#00F0FF" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}

/* ── AI Agent Workflows — pure SVG animated node graph ─────────────────── */
function AIAgentVisual() {
  return (
    <div className="mt-5 relative">
      {/* Purple ambient glow behind the graph */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(138,43,226,0.14) 0%, transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 240 148"
        className="w-full relative z-10"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern
            id="ai-mini-grid"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 16 0 L 0 0 0 16"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
          {/* Arrow marker */}
          <marker
            id="arrow-violet"
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(138,43,226,0.7)" />
          </marker>
          <marker
            id="arrow-cyan"
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0,240,255,0.6)" />
          </marker>
          <marker
            id="arrow-green"
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(40,200,64,0.6)" />
          </marker>
        </defs>

        {/* Background grid */}
        <rect width="240" height="148" fill="url(#ai-mini-grid)" rx="10" />

        {/* ── Connection: LLM Router → Vector DB ── */}
        <motion.path
          d="M 107 44 C 140 44, 140 80, 158 80"
          fill="none"
          stroke="rgba(138,43,226,0.55)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          markerEnd="url(#arrow-violet)"
          animate={{ strokeDashoffset: [0, -18] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        {/* ── Connection: LLM Router → Generate ── */}
        <motion.path
          d="M 107 48 C 138 48, 148 116, 158 116"
          fill="none"
          stroke="rgba(0,240,255,0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          markerEnd="url(#arrow-cyan)"
          animate={{ strokeDashoffset: [0, -18] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
        {/* ── Connection: Vector DB → Retrieve ── */}
        <motion.path
          d="M 200 80 C 215 80, 220 96, 220 100"
          fill="none"
          stroke="rgba(40,200,64,0.4)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: "linear", delay: 0.2 }}
        />

        {/* ── LLM Router node ── */}
        <g>
          <rect
            x="7"
            y="24"
            width="100"
            height="40"
            rx="8"
            fill="rgba(138,43,226,0.13)"
            stroke="rgba(138,43,226,0.5)"
            strokeWidth="1"
          />
          {/* icon dot */}
          <circle cx="21" cy="44" r="4.5" fill="rgba(138,43,226,0.25)" stroke="#8A2BE2" strokeWidth="1" />
          <motion.circle
            cx="21"
            cy="44"
            r="2"
            fill="#8A2BE2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <text x="31" y="40" fill="rgba(255,255,255,0.88)" fontSize="8.5" fontWeight="600" fontFamily="monospace">LLM Router</text>
          <text x="31" y="52" fill="rgba(138,43,226,0.8)" fontSize="7" fontFamily="monospace">gpt-4o · active</text>
        </g>

        {/* ── Vector DB node ── */}
        <g>
          <rect
            x="158"
            y="60"
            width="76"
            height="40"
            rx="8"
            fill="rgba(0,240,255,0.08)"
            stroke="rgba(0,240,255,0.38)"
            strokeWidth="1"
          />
          <circle cx="170" cy="80" r="4.5" fill="rgba(0,240,255,0.15)" stroke="#00F0FF" strokeWidth="1" />
          <motion.circle
            cx="170"
            cy="80"
            r="2"
            fill="#00F0FF"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
          />
          <text x="180" y="76" fill="rgba(255,255,255,0.88)" fontSize="8.5" fontWeight="600" fontFamily="monospace">Vector DB</text>
          <text x="180" y="88" fill="rgba(0,240,255,0.7)" fontSize="7" fontFamily="monospace">pgvector</text>
        </g>

        {/* ── Generate node ── */}
        <g>
          <rect
            x="158"
            y="96"
            width="76"
            height="40"
            rx="8"
            fill="rgba(40,200,64,0.08)"
            stroke="rgba(40,200,64,0.32)"
            strokeWidth="1"
          />
          <circle cx="170" cy="116" r="4.5" fill="rgba(40,200,64,0.15)" stroke="#28C840" strokeWidth="1" />
          <motion.circle
            cx="170"
            cy="116"
            r="2"
            fill="#28C840"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.9, repeat: Infinity, delay: 1.1 }}
          />
          <text x="180" y="112" fill="rgba(255,255,255,0.88)" fontSize="8.5" fontWeight="600" fontFamily="monospace">Generate</text>
          <text x="180" y="124" fill="rgba(40,200,64,0.7)" fontSize="7" fontFamily="monospace">streaming</text>
        </g>

        {/* ── Animated particle: LLM Router → Vector DB ── */}
        <motion.circle
          r="2.5"
          fill="#8A2BE2"
          style={{ filter: "drop-shadow(0 0 3px #8A2BE2)" }}
          animate={{ cx: [107, 140, 158], cy: [44, 44, 80] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        {/* ── Animated particle: LLM Router → Generate ── */}
        <motion.circle
          r="2.5"
          fill="#00F0FF"
          style={{ filter: "drop-shadow(0 0 3px #00F0FF)" }}
          animate={{ cx: [107, 138, 158], cy: [48, 80, 116] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />

        {/* ── Live indicator badge ── */}
        <g>
          <rect x="7" y="108" width="68" height="22" rx="11" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <motion.circle
            cx="19"
            cy="119"
            r="3"
            fill="#28C840"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="27" y="123" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="monospace" textAnchor="start">
            Live routing
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ── Docker visual: logo SVG + JSON config snippet ──────────────────────── */
function DockerVisual() {
  const jsonLines = [
    { text: '{', color: "rgba(255,255,255,0.55)" },
    { text: '  "image": "node:20-alpine",', color: "rgba(255,255,255,0.45)" },
    { text: '  "ports": ["3000:3000"],', color: "#00F0FF" },
    { text: '  "env": "production",', color: "rgba(255,255,255,0.45)" },
    { text: '  "replicas": 3,', color: "#8A2BE2" },
    { text: '  "healthCheck": "/health"', color: "#28C840" },
    { text: '}', color: "rgba(255,255,255,0.55)" },
  ];

  return (
    <div className="mt-5 relative">
      {/* Docker whale SVG icon — glowing */}
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ filter: "drop-shadow(0 0 8px rgba(0,159,227,0.6))" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            aria-label="Docker"
          >
            {/* Container boxes */}
            <rect x="8"  y="38" width="14" height="12" rx="2" fill="#009FE3" opacity="0.9"/>
            <rect x="25" y="38" width="14" height="12" rx="2" fill="#009FE3" opacity="0.9"/>
            <rect x="42" y="38" width="14" height="12" rx="2" fill="#009FE3" opacity="0.9"/>
            <rect x="25" y="23" width="14" height="12" rx="2" fill="#009FE3" opacity="0.9"/>
            <rect x="42" y="23" width="14" height="12" rx="2" fill="#009FE3" opacity="0.9"/>
            <rect x="59" y="38" width="14" height="12" rx="2" fill="#009FE3" opacity="0.9"/>
            {/* Whale body */}
            <path
              d="M 6 54 C 14 70, 36 74, 55 68 C 68 64, 80 58, 92 62 C 88 72, 70 82, 45 82 C 24 82, 8 72, 6 54 Z"
              fill="#009FE3"
              opacity="0.95"
            />
            {/* Whale eye */}
            <circle cx="62" cy="64" r="2.5" fill="white" />
            {/* Water spout */}
            <path
              d="M 80 54 C 84 44, 90 42, 94 36"
              stroke="#009FE3"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M 84 50 C 88 40, 96 40, 98 32"
              stroke="#009FE3"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.45"
            />
          </svg>
        </motion.div>
        <div>
          <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Docker</div>
          <div className="text-[9px] text-white/30 font-mono">archi.dev/app:latest</div>
        </div>
      </div>

      {/* JSON config snippet */}
      <div className="rounded-lg border border-white/[0.07] bg-[#070707] p-3.5 font-mono text-[11px] space-y-1 leading-relaxed overflow-hidden">
        {jsonLines.map((l, i) => (
          <motion.div
            key={l.text}
            initial={{ opacity: 0, x: -4 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            viewport={{ once: true }}
            style={{ color: l.color }}
          >
            {l.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SwaggerMock() {
  const endpoints = [
    { method: "GET", path: "/api/v1/users", color: "#61affe" },
    { method: "POST", path: "/api/v1/users", color: "#49cc90" },
    { method: "PUT", path: "/api/v1/users/{id}", color: "#fca130" },
    { method: "DELETE", path: "/api/v1/users/{id}", color: "#f93e3e" },
    { method: "GET", path: "/api/v1/orders", color: "#61affe" },
    { method: "POST", path: "/api/v1/orders", color: "#49cc90" },
  ];
  return (
    <div className="mt-5 space-y-1.5 font-mono text-[11px]">
      {endpoints.map((ep, i) => (
        <motion.div
          key={`${ep.method}-${ep.path}`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.055, duration: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 rounded-md px-3 py-2 border border-white/[0.05] group"
          style={{ background: "rgba(255,255,255,0.025)" }}
          whileHover={{ background: "rgba(255,255,255,0.04)" }}
        >
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded min-w-[48px] text-center shrink-0"
            style={{
              color: ep.color,
              backgroundColor: `${ep.color}1A`,
            }}
          >
            {ep.method}
          </span>
          <span className="text-white/45 group-hover:text-white/60 transition-colors">
            {ep.path}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function RegionStatusPanel() {
  const regions = [
    { name: "iad1", label: "Virginia", latency: 23, color: "#00F0FF" },
    { name: "fra1", label: "Frankfurt", latency: 34, color: "#8A2BE2" },
    { name: "sin1", label: "Singapore", latency: 41, color: "#28C840" },
    { name: "gru1", label: "Sao Paulo", latency: 52, color: "#F5A623" },
  ];

  return (
    <div className="bento-card relative overflow-hidden rounded-[1.75rem] p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,240,255,0.14),transparent_58%)] opacity-60" />
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">
              Fleet
            </p>
            <h4 className="mt-1 text-lg font-semibold tracking-tight text-white">
              Region health
            </h4>
          </div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Stable
          </div>
        </div>

        <div className="space-y-3">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/[0.06] bg-black/30 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: region.color,
                      boxShadow: `0 0 14px ${region.color}`,
                    }}
                  />
                  <div>
                    <div className="text-sm font-medium text-white/90">
                      {region.label}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                      {region.name}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-white/70">
                  {region.latency}ms
                </div>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(24, 100 - region.latency)}%` }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.7 }}
                  viewport={{ once: true }}
                  style={{
                    background: `linear-gradient(90deg, ${region.color}, rgba(255,255,255,0.85))`,
                    boxShadow: `0 0 18px ${region.color}55`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { label: "P95 cold start", value: "410ms" },
            { label: "Error budget", value: "99.98%" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/28">
                {item.label}
              </div>
              <div className="mt-1 text-base font-semibold text-white/85">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightCard({
  children,
  colSpan = "",
  className = "",
  accentColor = "rgba(0,240,255,0.07)",
}: {
  children: ReactNode;
  colSpan?: string;
  className?: string;
  accentColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return (
    <motion.div
      ref={cardRef}
      className={`glass-panel rounded-3xl p-8 group relative overflow-hidden cursor-default ${colSpan} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -2 }}
    >
      {/* Spotlight radial */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `radial-gradient(480px circle at ${mouse.x}px ${mouse.y}px, ${accentColor}, transparent 65%)`,
        }}
      />
      {/* Hover border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          boxShadow: `inset 0 0 0 1px ${accentColor.replace(/[\d.]+\)$/, "0.35)")}`,
        }}
      />
      {/* Top highlight line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor.replace(/[\d.]+\)$/, "0.6)")}, transparent)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section id="product" className="py-32 px-6 md:px-16 xl:px-24 relative z-20">
      <div className="section-top-line" />

      {/* Ambient section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,240,255,0.035) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="section-line-accent" />
            <p className="text-[#00F0FF] text-xs font-semibold uppercase tracking-[0.2em]">
              Platform
            </p>
          </div>
          <h2
            className="text-gradient-vivid font-medium tracking-tighter leading-[0.87] mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Visually construct
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00F0FF 0%, #79b7ff 60%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              the impossible.
            </span>
          </h2>
          <p className="text-white/35 text-lg max-w-xl leading-relaxed">
            Every feature you need to design, generate, and ship backend systems — in one canvas.
          </p>
        </motion.div>

        {/* ── Bento grid: 4 cards matching spec layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Card 1 (Span 2 Cols) — One-Click Deployments */}
          <SpotlightCard
            colSpan="md:col-span-2"
            accentColor="rgba(0,240,255,0.07)"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 rounded-full bg-[#00F0FF] opacity-80" />
              <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-[0.22em]">Deploy</span>
            </div>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              True One-Click Deployments.
            </h3>
            <p className="text-sm text-white/40 mt-2 leading-relaxed">
              Generate your architecture, create a GitHub repo, and deploy to Vercel or Railway — all from the canvas.
            </p>
            <Terminal />
          </SpotlightCard>

          {/* Card 2 (Span 1 Col) — AI Agent Workflows — pure CSS/SVG, no video */}
          <SpotlightCard accentColor="rgba(138,43,226,0.09)">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 rounded-full bg-[#8A2BE2] opacity-80" />
              <span className="text-[10px] font-bold text-[#8A2BE2] uppercase tracking-[0.22em]">AI</span>
            </div>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              AI Agent Workflows.
            </h3>
            <p className="text-sm text-white/40 mt-2 leading-relaxed">
              Visual node graph for LLM routing, vector retrieval, and streaming generation — zero glue code.
            </p>
            <AIAgentVisual />
          </SpotlightCard>

          {/* Card 3 (Span 1 Col) — No Lock-in Guarantee */}
          <SpotlightCard accentColor="rgba(0,159,227,0.07)">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 rounded-full bg-white/25" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.22em]">Export</span>
            </div>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              No Lock-in Guarantee.
            </h3>
            <p className="text-sm text-white/40 mt-2 leading-relaxed">
              Export clean Dockerfiles and portable configs. Your architecture, your infrastructure, forever.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Dockerfile", "docker-compose.yml", "openapi.json", "schema.prisma"].map((fmt) => (
                <span key={fmt} className="format-badge">{fmt}</span>
              ))}
            </div>
            <DockerVisual />
          </SpotlightCard>

          {/* Card 4 (Span 2 Cols) — Auto-Generated OpenAPI */}
          <SpotlightCard
            colSpan="md:col-span-2"
            accentColor="rgba(0,240,255,0.06)"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 rounded-full bg-[#00F0FF] opacity-80" />
              <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-[0.22em]">API</span>
            </div>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              Auto-Generated OpenAPI.
            </h3>
            <p className="text-sm text-white/40 mt-2 leading-relaxed">
              Your backend documentation writes itself as you draw the architecture. Every node generates a fully-typed, Swagger-ready API spec.
            </p>
            <SwaggerMock />
          </SpotlightCard>

          {/* Card 5 (Span 3 Cols) — Deploy Anywhere / Global */}
          <SpotlightCard
            colSpan="md:col-span-3"
            accentColor="rgba(0,240,255,0.05)"
            className="overflow-hidden"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.15fr_0.8fr]">
              <div className="max-w-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1 h-3.5 rounded-full bg-[#00F0FF] opacity-80" />
                  <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-[0.22em]">Global</span>
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  Deploy Anywhere, Instantly.
                </h3>
                <p className="text-sm text-white/40 mt-2 leading-relaxed">
                  Infrastructure available across every major region. Ship to the edge closest to your users — no extra config required.
                </p>
                <div className="mt-6 flex flex-col gap-2.5">
                  {["13 global regions", "Sub-50ms cold starts", "Automatic failover", "Zero-downtime deploys"].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs text-white/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative w-full">
                <div className="absolute inset-x-10 inset-y-12 rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.16),transparent_64%)] blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_42%)]" />
                  <Globe3D
                    markers={globeMarkers}
                    config={{
                      showAtmosphere: false,
                      bumpScale: 4,
                      autoRotateSpeed: 0.22,
                      enableZoom: false,
                      enablePan: false,
                      ambientIntensity: 0.85,
                      pointLightIntensity: 1.8,
                    }}
                    className="h-[380px]"
                  />
                </div>
              </div>

              <RegionStatusPanel />
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
