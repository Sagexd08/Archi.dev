"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X } from "lucide-react";

export function CopilotChatPill() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  if (!open) {
    return (
      <motion.button
        initial={{ y: 50, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-12 left-1/2 z-[900] cyber-glass rounded-full px-5 py-3 flex items-center gap-3 shadow-[0_0_30px_rgba(138,43,226,0.15)] cursor-pointer group"
        style={{ border: "1px solid rgba(138,43,226,0.2)" }}
      >
        <Sparkles size={16} className="text-[#8A2BE2] group-hover:animate-pulse" />
        <span className="text-sm font-medium text-white/80">Ask Copilot...</span>
        <div className="flex items-center gap-1 ml-2 opacity-50">
          <span className="text-[10px] font-mono border border-white/20 rounded px-1.5 py-0.5">Ctrl</span>
          <span className="text-[10px] font-mono border border-white/20 rounded px-1.5 py-0.5">I</span>
        </div>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95, x: "-50%" }}
        animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
        exit={{ opacity: 0, y: 20, scale: 0.95, x: "-50%" }}
        className="fixed bottom-12 left-1/2 z-[900] cyber-glass rounded-2xl w-[400px] shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(138,43,226,0.15)] overflow-hidden"
        style={{ border: "1px solid rgba(138,43,226,0.3)" }}
      >
        <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#8A2BE2]/20 flex items-center justify-center">
              <Sparkles size={12} className="text-[#8A2BE2]" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white/90">Copilot</span>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white/90 transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        <div className="h-[200px] p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="self-start bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
            <p className="text-sm text-white/80">Hello! I'm your architecture copilot. How can I modify your canvas today?</p>
          </div>
          {/* Mock future messages could go here */}
        </div>

        <div className="p-3 bg-black/40 border-t border-white/10">
          <div className="relative flex items-center">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="E.g. add a Redis cache in front of Postgres..."
              className="w-full bg-transparent border-0 text-sm text-white placeholder:text-white/30 focus:ring-0 focus:outline-none pr-10"
            />
            <button className="absolute right-2 text-[#8A2BE2] hover:text-[#00F0FF] transition-colors p-1">
              <Send size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
