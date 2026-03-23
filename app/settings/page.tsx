"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, CreditCard, Bell, Shield, ArrowLeft, Check } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
] as const;

type TabId = (typeof tabs)[number]["id"];

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 py-5 border-b border-white/[0.06] last:border-0">
      <div className="flex-1 min-w-0">
        <div className="text-white/80 text-sm font-medium">{label}</div>
        {description && <div className="text-white/35 text-xs mt-0.5 leading-relaxed">{description}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 cursor-pointer ${
        on ? "bg-[#00F0FF]" : "bg-white/[0.1]"
      }`}
      style={{ height: "22px" }}
    >
      <motion.div
        animate={{ x: on ? 20 : 2 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow"
      />
    </button>
  );
}

function ProfileTab() {
  return (
    <div>
      <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xl font-bold text-white shrink-0">
          S
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-medium text-sm">Sohom</div>
          <div className="text-white/40 text-xs mt-0.5">Free plan · 188 credits remaining</div>
        </div>
        <button type="button" className="text-[#00F0FF] text-xs font-semibold hover:text-[#00F0FF]/80 transition-colors cursor-pointer">
          Change photo
        </button>
      </div>

      <SettingRow label="Display name" description="Shown in your workspace and exports.">
        <input
          type="text"
          defaultValue="Sohom"
          className="glass-panel border border-white/[0.08] rounded-xl px-4 py-2 text-white text-sm w-48 focus:outline-none focus:border-[#00F0FF]/40 transition-colors"
        />
      </SettingRow>
      <SettingRow label="Email" description="Used for authentication and billing.">
        <input
          type="email"
          defaultValue="you@example.com"
          className="glass-panel border border-white/[0.08] rounded-xl px-4 py-2 text-white/50 text-sm w-48 focus:outline-none cursor-not-allowed"
          readOnly
        />
      </SettingRow>
      <SettingRow label="Preferred AI model" description="Model used for architecture generation.">
        <select className="glass-panel border border-white/[0.08] rounded-xl px-4 py-2 text-white/70 text-sm w-48 focus:outline-none focus:border-[#00F0FF]/40 bg-transparent cursor-pointer">
          <option value="gemma-3-12b-it">Gemma 3 12B</option>
          <option value="llama-3.3-70b">Llama 3.3 70B</option>
        </select>
      </SettingRow>

      <div className="mt-6 flex gap-3">
        <motion.button
          type="button"
          className="shimmer-btn bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer flex items-center gap-2"
          whileHover={{ scale: 1.03, boxShadow: "0 0 22px rgba(255,255,255,0.18)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <Check size={13} />
          Save changes
        </motion.button>
        <button type="button" className="text-white/35 hover:text-white/60 text-sm transition-colors cursor-pointer px-4 py-2">
          Cancel
        </button>
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-4">
      <div className="bento-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">Current plan</div>
            <div className="text-white font-semibold text-lg tracking-tight">Free</div>
          </div>
          <motion.button
            type="button"
            className="shimmer-btn bg-white text-black px-5 py-2 rounded-full text-xs font-bold cursor-pointer"
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(255,255,255,0.18)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            Upgrade to Pro →
          </motion.button>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full"
            style={{
              width: "62.4%",
              background: "linear-gradient(90deg, #00F0FF, rgba(0,240,255,0.6))",
              boxShadow: "0 0 14px rgba(0,240,255,0.4)",
            }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-white/30 mt-2">
          <span>312 / 500 credits used</span>
          <span>Resets May 1</span>
        </div>
      </div>

      <div className="bento-card rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Transaction history</div>
        {[
          { type: "Monthly free grant", amount: "+500", date: "Apr 1, 2026", color: "#28C840" },
          { type: "Usage", amount: "−312", date: "Apr 1–23, 2026", color: "#FF6B82" },
        ].map((tx) => (
          <div key={tx.type} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
            <div>
              <div className="text-white/70 text-sm">{tx.type}</div>
              <div className="text-white/25 text-xs">{tx.date}</div>
            </div>
            <span className="text-sm font-semibold font-mono" style={{ color: tx.color }}>{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="bento-card rounded-2xl px-5 divide-y divide-white/[0.05]">
      <SettingRow label="Deploy completions" description="Notify when a deployment finishes.">
        <Toggle defaultOn={true} />
      </SettingRow>
      <SettingRow label="Credit warnings" description="Alert when credits drop below 20%.">
        <Toggle defaultOn={true} />
      </SettingRow>
      <SettingRow label="AI agent completions" description="Notify when agent finishes a generation.">
        <Toggle />
      </SettingRow>
      <SettingRow label="Product updates" description="Changelog and new feature announcements.">
        <Toggle defaultOn={true} />
      </SettingRow>
      <SettingRow label="Marketing emails" description="Tips, tutorials, and community highlights.">
        <Toggle />
      </SettingRow>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-4">
      <div className="bento-card rounded-2xl px-5 divide-y divide-white/[0.05]">
        <SettingRow label="Authentication provider" description="Your current sign-in method.">
          <div className="flex items-center gap-2 text-white/55 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </div>
        </SettingRow>
        <SettingRow label="Active sessions" description="Devices currently signed in.">
          <div className="text-white/45 text-sm">1 active</div>
        </SettingRow>
        <SettingRow label="Two-factor authentication" description="Add an extra layer of security.">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/[0.06] text-white/30">
            Coming soon
          </span>
        </SettingRow>
      </div>

      <div className="bento-card rounded-2xl p-5 border border-red-400/[0.12]">
        <div className="text-[10px] uppercase tracking-[0.2em] text-red-400/60 mb-3">Danger zone</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white/70 text-sm font-medium">Delete account</div>
            <div className="text-white/30 text-xs mt-0.5">Permanently delete your account and all data.</div>
          </div>
          <button type="button" className="text-red-400/70 hover:text-red-400 text-xs font-semibold border border-red-400/20 hover:border-red-400/40 px-4 py-2 rounded-xl transition-colors cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const tabContent: Record<TabId, React.ReactNode> = {
  profile: <ProfileTab />,
  billing: <BillingTab />,
  notifications: <NotificationsTab />,
  security: <SecurityTab />,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const router = useRouter();

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />
      <div className="bg-noise absolute inset-0" />
      <div
        className="absolute top-0 right-[20%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(138,43,226,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pt-12 pb-24">
        {/* Header */}
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-white/35 hover:text-white/60 text-sm transition-colors cursor-pointer mb-8"
        >
          <ArrowLeft size={14} />
          Back to dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="section-line-accent" />
            <span className="text-[#00F0FF] text-xs font-semibold uppercase tracking-[0.2em]">Account</span>
          </div>
          <h1 className="text-gradient font-medium tracking-tighter" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
            Settings
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar tabs */}
          <nav className="flex md:flex-col gap-1 md:w-44 shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-white/[0.07] text-white border border-white/[0.08]"
                      : "text-white/40 hover:text-white/65 hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-[#00F0FF]" : ""} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
