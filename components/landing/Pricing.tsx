"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, Zap, Users, Sparkles } from "lucide-react";

const plans = [
  {
    name: "free",
    displayName: "Free",
    icon: Sparkles,
    description: "For solo builders exploring the platform.",
    priceMonthly: 0,
    priceYearly: 0,
    credits: 500,
    maxProjects: 3,
    maxSeats: 1,
    cta: "Start for free",
    highlight: false,
    features: [
      "500 AI credits / month",
      "3 projects",
      "Visual canvas editor",
      "JSON export",
      "Community support",
      "Basic code generation",
    ],
  },
  {
    name: "pro",
    displayName: "Pro",
    icon: Zap,
    description: "For professionals shipping production backends.",
    priceMonthly: 19,
    priceYearly: 15,
    credits: 10000,
    maxProjects: -1,
    maxSeats: 1,
    cta: "Start Pro trial",
    highlight: true,
    badge: "Most Popular",
    features: [
      "10,000 AI credits / month",
      "Unlimited projects",
      "All export formats (Docker, OpenAPI, ZIP)",
      "Priority AI generation",
      "Version history",
      "Email support",
      "Custom integrations",
    ],
  },
  {
    name: "team",
    displayName: "Team",
    icon: Users,
    description: "For engineering teams building together.",
    priceMonthly: 49,
    priceYearly: 39,
    credits: 50000,
    maxProjects: -1,
    maxSeats: 5,
    cta: "Start Team trial",
    highlight: false,
    features: [
      "50,000 AI credits / month",
      "Up to 5 seats",
      "Everything in Pro",
      "Shared team workspaces",
      "Role-based access",
      "Priority support",
      "SLA guarantee",
    ],
  },
];

function PlanCard({
  plan,
  yearly,
  index,
}: {
  plan: (typeof plans)[number];
  yearly: boolean;
  index: number;
}) {
  const router = useRouter();
  const price = yearly ? plan.priceYearly : plan.priceMonthly;
  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl p-8 ${
        plan.highlight
          ? "bg-white/[0.06] border border-[#00F0FF]/40 shadow-[0_0_60px_rgba(0,240,255,0.08)]"
          : "bg-white/[0.03] border border-white/[0.08]"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-px left-0 right-0 h-px rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, transparent, #00F0FF, transparent)" }}
        />
      )}

      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black bg-[#00F0FF]">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${plan.highlight ? "bg-[#00F0FF]/10" : "bg-white/[0.05]"}`}>
          <Icon
            size={18}
            className={plan.highlight ? "text-[#00F0FF]" : "text-white/50"}
          />
        </div>
        <span className="text-white font-semibold text-lg">{plan.displayName}</span>
      </div>

      <p className="text-white/40 text-sm leading-relaxed mb-6">{plan.description}</p>

      <div className="mb-8">
        <div className="flex items-end gap-1.5">
          <span className="text-white text-5xl font-bold tracking-tighter">
            ${price}
          </span>
          {price > 0 && (
            <span className="text-white/40 text-sm mb-2.5">/ mo</span>
          )}
        </div>
        {yearly && price > 0 && (
          <p className="text-[#00F0FF]/70 text-xs mt-1.5 font-medium">
            Billed yearly — save ${(plan.priceMonthly - plan.priceYearly) * 12}/yr
          </p>
        )}
        {price === 0 && (
          <p className="text-white/30 text-xs mt-1.5">Forever free</p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check
              size={14}
              className={`mt-0.5 shrink-0 ${plan.highlight ? "text-[#00F0FF]" : "text-white/40"}`}
            />
            <span className="text-white/60">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        type="button"
        onClick={() => router.push("/login")}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
          plan.highlight
            ? "bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90 shadow-[0_0_30px_rgba(0,240,255,0.2)]"
            : "bg-white/[0.06] text-white/80 hover:bg-white/[0.10] border border-white/[0.08]"
        }`}
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,240,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-[#00F0FF] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            Pricing
          </span>

          <h2
            className="text-white font-medium tracking-tighter leading-[0.95] mb-5"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Simple,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00F0FF, #8A2BE2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              transparent
            </span>{" "}
            pricing.
          </h2>

          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Start for free. Scale when you're ready. No surprises.
          </p>

          <div className="flex items-center justify-center gap-3 mt-10">
            <span className={`text-sm font-medium transition-colors ${!yearly ? "text-white" : "text-white/40"}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setYearly((v) => !v)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                yearly ? "bg-[#00F0FF]" : "bg-white/[0.1]"
              }`}
            >
              <motion.div
                animate={{ x: yearly ? 24 : 2 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${yearly ? "text-white" : "text-white/40"}`}>
              Yearly
            </span>
            {yearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8, x: -4 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#00F0FF] px-2.5 py-0.5 rounded-full"
              >
                Save 20%
              </motion.span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} yearly={yearly} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-white/25 text-sm mt-10"
        >
          All plans include SSL, 99.9% uptime SLA, and automatic backups.
          <span className="mx-2 opacity-50">•</span>
          Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
