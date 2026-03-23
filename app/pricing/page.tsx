"use client";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";
import CTAFooter from "@/components/landing/CTAFooter";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <ReactLenis root>
      <main className="bg-black min-h-screen overflow-x-hidden">
        <Navbar />

        <section className="relative pt-40 pb-4 px-6 text-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 70%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-[#00F0FF] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-glow-cyan" />
              Plans & Pricing
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-white font-medium tracking-tighter leading-[0.95] mb-5"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Pay for what <br />
            <span
              style={{
                background: "linear-gradient(90deg, #00F0FF, #8A2BE2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              you actually use.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed"
          >
            Credits reset every month. Unused credits don&apos;t roll over — but
            you&apos;ll never be charged without knowing.
          </motion.p>
        </section>

        <Pricing />

        <section className="py-20 px-6 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-3xl font-semibold tracking-tight text-center mb-12"
          >
            Frequently asked questions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel rounded-2xl p-6 border border-white/[0.06]"
              >
                <h3 className="text-white font-medium mb-2 text-sm">{faq.q}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <CTAFooter />
      </main>
    </ReactLenis>
  );
}

const faqs = [
  {
    q: "What is a credit?",
    a: "One credit equals one AI generation operation — building a node, scaffolding an API route, or generating a Dockerfile counts as one action.",
  },
  {
    q: "Do unused credits roll over?",
    a: "No. Monthly credits reset on the 1st of each month. Paid plans with purchased top-ups do not expire.",
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes. You can change your plan at any time. Upgrades take effect immediately; downgrades apply at the end of your billing period.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Every paid plan starts with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What export formats are included?",
    a: "The Free plan exports JSON configs. Pro, Max, Team, and Team Max plans unlock Dockerfile, docker-compose, OpenAPI specs, and full ZIP project archives.",
  },
  {
    q: "How does team billing work?",
    a: "The Team plan covers up to 5 seats and Team Max covers up to 15 seats under one subscription. Each member draws from the shared monthly credit pool.",
  },
  {
    q: "What's the difference between Max and Team Max?",
    a: "Max is a single-seat plan for power users needing 100k credits/month. Team Max adds multi-seat support (up to 15), SSO/SAML, a dedicated account manager, and a custom SLA.",
  },
  {
    q: "How much do I save on yearly billing?",
    a: "Yearly billing saves 20% across all paid plans — that's $48/yr on Pro, $192/yr on Max, $120/yr on Team, and $360/yr on Team Max.",
  },
];
