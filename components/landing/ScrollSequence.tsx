"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
const steps = [
  {
    step: "01",
    title: "Draw Nodes\non the Canvas.",
    description:
      "Drag-and-drop services, databases, queues, and APIs onto a shared canvas. Archi.dev understands your intent from the layout.",
    color: "#00F0FF",
  },
  {
    step: "02",
    title: "AI Scaffolds\nthe Architecture.",
    description:
      "Our AI analyzes your visual graph and generates production-grade code, API contracts, and infrastructure configs instantly.",
    color: "#8A2BE2",
  },
  {
    step: "03",
    title: "Deploy to\nProduction.",
    description:
      "One click ships your entire stack. Blue-green deploys, instant rollbacks, and live observability — all included.",
    color: "#28C840",
  },
];
function VisualNode({ x, y, label, color, delay = 0, floatY = 15 }: any) {
  return (
    <motion.div
      className="absolute flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-black/60 backdrop-blur-md shadow-2xl"
      style={{ left: x, top: y }}
      animate={{ y: [0, floatY, 0] }}
      transition={{ duration: 4 + (Math.abs(floatY) % 3), repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }} />
      <span className="text-xs font-medium tracking-wide text-white/80">{label}</span>
    </motion.div>
  );
}
function Step1Visual() {
  return (
    <div className="absolute inset-0 bg-[#030303] overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full border border-[#00F0FF]/10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-[#00F0FF]/20"
        animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative w-full h-full">
        <VisualNode x="12%" y="25%" label="API Gateway" color="#00F0FF" delay={0} floatY={-12} />
        <VisualNode x="62%" y="15%" label="Auth Service" color="#8A2BE2" delay={1} floatY={10} />
        <VisualNode x="72%" y="65%" label="PostgreSQL" color="#28C840" delay={2} floatY={-15} />
        <VisualNode x="22%" y="70%" label="Worker Node" color="#F5A623" delay={0.5} floatY={12} />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-28 h-28 rounded-2xl border border-[#00F0FF]/20 bg-gradient-to-br from-[#00F0FF]/10 to-transparent backdrop-blur-xl"
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-12 h-12 rounded-xl border border-[#00F0FF]/40 shadow-[0_0_30px_rgba(0,240,255,0.2)]" />
        </motion.div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <motion.path d="M 200 150 Q 300 200 400 150" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          <motion.path d="M 450 300 Q 350 400 250 350" fill="none" stroke="#8A2BE2" strokeWidth="1.5" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </svg>
      </div>
    </div>
  );
}
function Step2Visual() {
  return (
    <div className="absolute inset-0 bg-[#050308] overflow-hidden flex items-stretch">
      <div className="flex-1 relative border-r border-white/[0.05] p-8 flex items-center justify-center overflow-hidden hidden sm:flex">
         <motion.div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
         <div className="flex flex-col gap-6 relative z-10 w-full max-w-[200px]">
           <motion.div className="h-12 w-[80%] rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-lg flex items-center px-4" animate={{ x: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
             <div className="w-3 h-3 rounded-full bg-[#8A2BE2]/50" />
           </motion.div>
           <motion.div className="h-12 w-full rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-lg flex items-center px-4 ml-4" animate={{ x: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
             <div className="w-3 h-3 rounded-full bg-[#00F0FF]/50" />
           </motion.div>
           <motion.div className="h-12 w-[90%] rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-lg flex items-center px-4 ml-2" animate={{ x: [0, 8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
             <div className="w-3 h-3 rounded-full bg-[#28C840]/50" />
           </motion.div>
         </div>
      </div>
      <div className="flex-[1.5] relative p-8 font-mono text-[11px] sm:text-[13px] text-white/60 flex flex-col justify-center overflow-hidden bg-[#0A0A0A]">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="space-y-3 relative z-10"
        >
          <div className="text-[#8A2BE2] mb-4"></div>
          <div><span className="text-[#00F0FF]">import</span> <span>{`{ Router }`}</span> <span className="text-[#00F0FF]">from</span> <span className="text-[#28C840]">'express'</span>;</div>
          <div><span className="text-[#00F0FF]">import</span> <span>{`{ PrismaClient }`}</span> <span className="text-[#00F0FF]">from</span> <span className="text-[#28C840]">'@prisma/client'</span>;</div>
          <br/>
          <div><span className="text-[#00F0FF]">const</span> prisma = <span className="text-[#00F0FF]">new</span> <span className="text-[#E5C07B]">PrismaClient</span>();</div>
          <div><span className="text-[#00F0FF]">export const</span> router = <span className="text-[#E5C07B]">Router</span>();</div>
          <br/>
          <div>
            <span>router.</span><span className="text-[#61affe]">post</span>(
            <span className="text-[#28C840]">`'/api/users'`</span>, <span className="text-[#00F0FF]">async</span> (req, res) {`=>`} {`{`}
          </div>
          <div className="pl-6 space-y-1 border-l-2 border-white/[0.05] ml-2 my-2">
            <div className="text-white/30">
              <div><span className="text-[#00F0FF]">const</span> {`{ email, name } = req.body;`}</div>
              <br/>
              <div><span className="text-[#00F0FF]">const</span> user = <span className="text-[#00F0FF]">await</span> prisma.user.<span className="text-[#61affe]">create</span>({`{`}</div>
              <div className="pl-6">data: {`{ email, name }`}</div>
              <div>{`});`}</div>
              <br/>
              <div><span className="text-[#00F0FF]">return</span> res.<span className="text-[#61affe]">status</span>(201).<span className="text-[#61affe]">json</span>(user);</div>
            </div>
          </div>
          <div>{`});`}</div>
        </motion.div>
        <motion.div
          className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#8A2BE2]/10 to-transparent pointer-events-none"
          animate={{ top: ['-30%', '130%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
function Step3Visual() {
  return (
    <div className="absolute inset-0 bg-[#030503] overflow-hidden flex flex-col items-center justify-center p-8">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at center, #28C840 0%, transparent 60%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl relative z-10">
        <div className="px-5 py-3 border-b border-white/[0.05] flex items-center gap-2 bg-black/40">
          <div className="flex gap-1.5 mr-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] font-mono text-white/40 font-medium tracking-wider">archi deploy --prod</span>
        </div>
        <div className="p-6 font-mono text-[12px] space-y-4">
          <div className="space-y-3">
            <motion.div className="flex justify-between items-center" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <span className="text-white/80">Edge Network Routing</span>
              </div>
              <span className="text-[#00F0FF] text-[10px] tracking-widest bg-[#00F0FF]/10 px-2 py-1 rounded">ACTIVE</span>
            </motion.div>
            <motion.div className="flex justify-between items-center" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#28C840] animate-pulse" />
                <span className="text-white/80">PostgreSQL Cluster (us-east)</span>
              </div>
              <span className="text-[#28C840] text-[10px] tracking-widest bg-[#28C840]/10 px-2 py-1 rounded">HEALTHY</span>
            </motion.div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/[0.05]">
            <div className="flex justify-between text-white/40 mb-2 text-[10px] uppercase tracking-wider">
              <span>Traffic Migration</span>
              <span>100%</span>
            </div>
            <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden flex">
              <motion.div
                className="h-full bg-gradient-to-r from-[#28C840]/50 to-[#28C840]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#28C840]"
          style={{
            left: `${(i * 13.7) % 100}%`,
            bottom: '-20px',
            boxShadow: '0 0 10px #28C840'
          }}
          animate={{
            y: [-20, -600],
            opacity: [0, 1, 0],
            x: [0, ((i * 37) % 100) - 50]
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
function stepTextOpacity(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  index: number
) {
  const fadeInStart = index / 3;
  const peakStart = fadeInStart + 0.08;
  const peakEnd = (index + 1) / 3 - 0.08;
  const fadeOutEnd = (index + 1) / 3;
  const end = index === 2 ? 1.0 : fadeOutEnd;
  return useTransform(
    scrollYProgress,
    [fadeInStart, peakStart, peakEnd, end],
    [0, 1, 1, index === 2 ? 1 : 0]
  );
}
function stepTextY(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  index: number
) {
  const fadeInStart = index / 3;
  const peakStart = fadeInStart + 0.08;
  const peakEnd = (index + 1) / 3 - 0.08;
  const fadeOutEnd = index === 2 ? 1.0 : (index + 1) / 3;
  return useTransform(
    scrollYProgress,
    [fadeInStart, peakStart, peakEnd, fadeOutEnd],
    [30, 0, 0, index === 2 ? 0 : -30]
  );
}
function stepTextScale(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  index: number
) {
  const fadeInStart = index / 3;
  const peakStart = fadeInStart + 0.08;
  const peakEnd = (index + 1) / 3 - 0.08;
  const fadeOutEnd = index === 2 ? 1.0 : (index + 1) / 3;
  return useTransform(
    scrollYProgress,
    [fadeInStart, peakStart, peakEnd, fadeOutEnd],
    [0.95, 1, 1, index === 2 ? 1 : 0.95]
  );
}
function stepVideoOpacity(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  index: number
) {
  const fadeInStart = Math.max(0, index / 3 - 0.05);
  const peakStart = index / 3 + 0.05;
  const peakEnd = (index + 1) / 3 - 0.05;
  const fadeOutEnd = (index + 1) / 3 + 0.05;
  return useTransform(
    scrollYProgress,
    [fadeInStart, peakStart, peakEnd, Math.min(1, fadeOutEnd)],
    [index === 0 ? 1 : 0, 1, 1, index === 2 ? 1 : 0]
  );
}
function stepBarScale(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  index: number
) {
  const start = index / 3;
  const end = (index + 1) / 3;
  return useTransform(scrollYProgress, [start, end], [0, 1]);
}
export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const textOpacities = steps.map((_, i) => stepTextOpacity(smoothProgress, i));
  const textYOffsets = steps.map((_, i) => stepTextY(smoothProgress, i));
  const textScales = steps.map((_, i) => stepTextScale(smoothProgress, i));
  const videoOpacities = [0, 1, 2].map((i) =>
    stepVideoOpacity(smoothProgress, i)
  );
  const barScales = steps.map((_, i) => stepBarScale(smoothProgress, i));
  const activeColor = useTransform(smoothProgress, [0, 0.33, 0.66, 1], [steps[0].color, steps[0].color, steps[1].color, steps[2].color]);
  const VisualComponents = [Step1Visual, Step2Visual, Step3Visual];
  return (
    <section ref={containerRef} className="h-[400vh] relative bg-black">
      <motion.div
        className="sticky top-0 w-full h-screen pointer-events-none overflow-hidden"
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.15] blur-[120px]"
          style={{ backgroundColor: activeColor }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      <div className="absolute inset-0">
        <div className="sticky top-0 h-[100vh] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 xl:px-24 gap-12 lg:gap-24 overflow-hidden">
          <div className="flex-1 max-w-sm lg:max-w-md relative z-10">
            <div className="absolute -left-12 top-0 bottom-0 hidden lg:flex flex-col justify-center gap-0 py-4">
              {steps.map((step, i) => (
                <div key={step.step} className="flex items-start gap-2 flex-1 min-h-0">
                  <div className="flex flex-col items-center h-full">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-1 relative"
                      style={{ backgroundColor: step.color }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: step.color,
                          opacity: textOpacities[i],
                          boxShadow: `0 0 15px ${step.color}`
                        }}
                      />
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 w-[2px] bg-white/[0.06] relative overflow-hidden mt-2">
                        <motion.div
                          className="absolute top-0 left-0 right-0 origin-top"
                          style={{
                            backgroundColor: step.color,
                            scaleY: barScales[i],
                            height: "100%",
                            opacity: 0.8,
                            boxShadow: `0 0 10px ${step.color}`
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-64 lg:h-80">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  style={{
                    opacity: textOpacities[i],
                    y: textYOffsets[i],
                    scale: textScales[i]
                  }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <motion.div
                    className="text-[12px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3"
                    style={{ color: step.color }}
                  >
                    <span>Step {step.step}</span>
                    <motion.div
                      className="h-px w-12"
                      style={{ backgroundColor: step.color, opacity: 0.5 }}
                    />
                  </motion.div>
                  <h2
                    className="text-white font-semibold tracking-tighter leading-[1.05] mb-8"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
                      whiteSpace: "pre-line",
                      textShadow: "0 10px 30px rgba(0,0,0,0.5)"
                    }}
                  >
                    {step.title}
                  </h2>
                  <p className="text-white/50 text-lg leading-relaxed max-w-sm font-light">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full max-w-3xl relative z-10">
            <motion.div
              className="aspect-[16/10] rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden relative bg-black/50 backdrop-blur-sm"
              style={{
                boxShadow: useTransform(activeColor, color => `0 20px 80px -20px ${color}40, inset 0 0 0 1px ${color}20`)
              }}
            >
              {VisualComponents.map((Visual, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: videoOpacities[i] }}
                  className="absolute inset-0"
                >
                  <Visual />
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-center gap-6 mt-10">
              {steps.map((step, i) => (
                <div key={step.step} className="relative h-1.5 w-20 rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      backgroundColor: step.color,
                      scaleX: barScales[i],
                      transformOrigin: "left",
                      opacity: 0.9,
                      boxShadow: `0 0 10px ${step.color}`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
