"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Terminal, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;

const archScopes = [
  "Greenfield backend build",
  "AWS migration",
  "Railway deployment",
  "AI agent integration",
  "Database design / migration",
  "DevOps / IaC setup",
  "Performance optimisation",
  "Security hardening",
  "Enterprise support plan",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", scope: "", detail: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent text-white text-sm pt-5 pb-2 px-0 outline-none border-b transition-colors duration-200 placeholder-transparent ${
      focused === field ? "border-primary" : "border-white/10"
    }`;

  const labelClass = (field: string, hasValue: boolean) =>
    `absolute left-0 transition-all duration-200 pointer-events-none font-medium ${
      focused === field || hasValue
        ? "top-0 text-[10px] uppercase tracking-[0.18em] text-primary"
        : "top-5 text-sm text-white/35"
    }`;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative w-full min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,240,255,0.03) 0%, transparent 65%)" }}
        />

        <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-primary text-xs font-semibold uppercase tracking-[0.2em] border border-white/6">
                <Terminal size={11} className="text-primary" />
                Contact
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 24, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              className="text-gradient font-medium tracking-tighter leading-[0.92] mb-5"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
            >
              Initialize<br />connection.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm"
            >
              Tell us what you&apos;re building. A solutions architect will respond within one business day to discuss how Archi.dev can accelerate your backend.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="space-y-3"
            >
              {[
                "Free 30-min architecture review",
                "Custom deployment plan",
                "Dedicated solutions architect",
                "Response within 24 hours",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 size={12} className="text-primary shrink-0" />
                  <span className="text-white/50 text-xs">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="mailto:hello@archi.dev"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              className="inline-flex items-center gap-2 mt-8 text-white/30 text-xs hover:text-white/70 transition-colors"
            >
              <Mail size={12} />
              hello@archi.dev
            </motion.a>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            {submitted ? (
              <div className="bento-card rounded-2xl p-10 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-primary" />
                </div>
                <h2 className="text-white font-semibold text-xl">Connection initialized.</h2>
                <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                  We&apos;ve received your message. A solutions architect will reach out within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bento-card rounded-2xl p-8 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 100% 0%, rgba(0,240,255,0.04) 0%, transparent 50%)" }}
                />

                <div className="space-y-8">
                  {/* Name */}
                  <div className="relative">
                    <input
                      id="contact-name"
                      type="text"
                      className={inputClass("name")}
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                    />
                    <label htmlFor="contact-name" className={labelClass("name", !!form.name)}>Name</label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      id="contact-email"
                      type="email"
                      className={inputClass("email")}
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      required
                    />
                    <label htmlFor="contact-email" className={labelClass("email", !!form.email)}>Work email</label>
                  </div>

                  {/* Architecture scope */}
                  <div className="relative">
                    <select
                      id="contact-scope"
                      className={`${inputClass("scope")} cursor-pointer`}
                      value={form.scope}
                      onChange={(e) => setForm({ ...form, scope: e.target.value })}
                      onFocus={() => setFocused("scope")}
                      onBlur={() => setFocused(null)}
                      required
                    >
                      <option value="" disabled hidden />
                      {archScopes.map((s) => (
                        <option key={s} value={s} className="bg-[#0A0A0F]">{s}</option>
                      ))}
                    </select>
                    <label htmlFor="contact-scope" className={labelClass("scope", !!form.scope)}>Architecture scope</label>
                  </div>

                  {/* Detail */}
                  <div className="relative">
                    <textarea
                      id="contact-detail"
                      rows={3}
                      className={`${inputClass("detail")} resize-none`}
                      placeholder="Tell us more"
                      value={form.detail}
                      onChange={(e) => setForm({ ...form, detail: e.target.value })}
                      onFocus={() => setFocused("detail")}
                      onBlur={() => setFocused(null)}
                    />
                    <label htmlFor="contact-detail" className={labelClass("detail", !!form.detail)}>Tell us more (optional)</label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(255,255,255,0.22)" }}
                    transition={{ duration: 0.15 }}
                    className="w-full bg-white text-black font-semibold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 mt-2"
                  >
                    Initialize connection <ArrowRight size={14} />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
