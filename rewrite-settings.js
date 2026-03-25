const fs = require('fs');

const content = "use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, Rocket, Settings as SettingsIcon, CreditCard, User, Bell, ChevronRight } from "lucide-react";

const sidebarNav = [
  { icon: LayoutDashboard, label: "Dashboard", active: false, path: "/dashboard" },
  { icon: Rocket, label: "Studio", active: false, path: "/studio" },
  { icon: SettingsIcon, label: "Settings", active: true, path: "/settings" }
];

export default function SettingsPage() {
  const router = useRouter();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <main className="relative min-h-screen bg-[#050505] text-white p-6">
      <div className="bg-architect-grid absolute inset-0 pointer-events-none opacity-20" />
      <div className="bg-noise absolute inset-0" />

      {/* Floating Top Bar / Thin Left Rail replacement */}
      <motion.aside 
        className="hidden lg:flex fixed left-6 top-6 bottom-6 cyber-glass rounded-3xl z-20 flex-col overflow-hidden"
        initial={{ width: 80 }}
        animate={{ width: sidebarExpanded ? 240 : 80 }}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="p-5 flex-1 flex flex-col w-[240px]">
          <button type="button" onClick={() => router.push("/")} className="flex items-center gap-4 cursor-pointer mb-10 overflow-hidden shrink-0">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-[#00F0FF]" />
            </div>
            <motion.div 
              className="text-left whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: sidebarExpanded ? 1 : 0 }}
            >
              <div className="text-sm font-semibold tracking-tight text-white">Archi.dev</div>
              <div className="text-[11px] text-white/40">Workspace</div>
            </motion.div>
          </button>

          <div className="space-y-3">
            {sidebarNav.map((item) => (
              <button 
                key={item.label} 
                onClick={() => router.push(item.path)}
                className={\w-full flex items-center gap-4 rounded-xl p-2.5 transition-colors overflow-hidden whitespace-nowrap \\}
              >
                <div className="w-5 flex justify-center shrink-0">
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto">
             <motion.div animate={{ opacity: sidebarExpanded ? 1 : 0 }} className="px-2">
               <div className="text-[10px] uppercase tracking-[0.2em] text-[#00F0FF] mb-2 font-mono">Credits</div>
               <div className="text-xl font-bold stat-tabular text-white">188 <span className="text-xs text-white/30 font-normal">/ 500</span></div>
               <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                 <div className="bg-[#00F0FF] h-full rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" style={{ width: "37.6%" }} />
               </div>
             </motion.div>
          </div>
        </div>
      </motion.aside>

      <div className="relative z-10 lg:pl-[120px] pt-8 pb-20 max-w-5xl mx-auto transition-all duration-300">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[#8A2BE2]" />
            <span className="text-[#8A2BE2] text-[10px] font-bold uppercase tracking-widest font-mono">Configuration</span>
          </div>
          <h1 className="text-gradient font-bold tracking-tight text-4xl font-['Geist'] mb-8">
            Settings
          </h1>

          <div className="flex gap-4 border-b border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={\pb-4 px-2 text-sm font-medium flex items-center gap-2 transition-colors relative \\}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6 font-['Geist'] text-white">Profile Information</h2>
              <div className="space-y-5 max-w-md">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#00F0FF] mb-2 font-mono">Full Name</label>
                  <input type="text" defaultValue="Alex Architect" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#00F0FF] mb-2 font-mono">Email Address</label>
                  <input type="email" defaultValue="alex@archi.dev" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-colors" />
                </div>
                <button className="shimmer-btn bg-white text-black px-6 py-2.5 rounded-xl text-sm font-semibold mt-4">Save Changes</button>
              </div>
            </motion.div>
          )}

          {activeTab === "billing" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
              <div className="glass-panel rounded-2xl p-8 border-t-2 border-t-[#8A2BE2]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-xl font-bold mb-2 font-['Geist'] text-white">Current Plan: Pro</h2>
                    <p className="text-white/50 text-sm">You are on the Pro plan (/mo) which includes 500 generation credits.</p>
                  </div>
                  <span className="bg-[#8A2BE2]/10 text-[#8A2BE2] px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-[#8A2BE2]/30">Active</span>
                </div>
                <div className="flex gap-4">
                  <button className="shimmer-btn bg-white text-black px-5 py-2 rounded-xl text-sm font-semibold">Manage Subscription</button>
                  <button className="bg-transparent border border-white/20 text-white hover:bg-white/5 px-5 py-2 rounded-xl text-sm font-semibold transition-colors">View Invoices</button>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-6 font-['Geist'] text-white">Usage this Period</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-black/30 border border-white/5 rounded-xl p-5">
                    <div className="text-[10px] uppercase font-mono text-white/40 mb-2">API Calls</div>
                    <div className="text-3xl font-bold stat-tabular">893k <span className="text-sm font-normal text-white/30">/ 1M</span></div>
                  </div>
                  <div className="bg-black/30 border border-white/5 rounded-xl p-5">
                    <div className="text-[10px] uppercase font-mono text-white/40 mb-2">Bandwidth</div>
                    <div className="text-3xl font-bold stat-tabular">45 <span className="text-sm font-normal text-white/30">GB / 100GB</span></div>
                  </div>
                  <div className="bg-black/30 border border-white/5 rounded-xl p-5">
                    <div className="text-[10px] uppercase font-mono text-white/40 mb-2">AI Credits</div>
                    <div className="text-3xl font-bold stat-tabular text-[#00F0FF]">312 <span className="text-sm font-normal text-white/30">/ 500</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

           {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl p-8">
               <h2 className="text-xl font-bold mb-6 font-['Geist'] text-white">Email Preferences</h2>
               <div className="space-y-4">
                 {['Deployment alerts', 'Billing receipts', 'Product updates', 'Weekly digest'].map((item, i) => (
                   <div key={item} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/20">
                     <span className="text-sm font-medium text-white/80">{item}</span>
                     <div className={\w-10 h-5 rounded-full p-1 cursor-pointer transition-colors \\}>
                       <div className={\w-3 h-3 rounded-full bg-white transition-transform \\} />
                     </div>
                   </div>
                 ))}
               </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
};

fs.writeFileSync('app/settings/page.tsx', content);
console.log('Settings page rewritten!');
