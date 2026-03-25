"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Terminal, Settings } from "lucide-react";
import { useStore } from "@/store/useStore";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const addNode = useStore((state) => state.addNode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands = [
    { id: "1", type: "Process Node", icon: Terminal, action: () => addNode("process", { x: Math.random() * 200, y: Math.random() * 200 }) },
    { id: "2", type: "Database Node", icon: Plus, action: () => addNode("database", { x: Math.random() * 200, y: Math.random() * 200 }) },
    { id: "3", type: "Settings", icon: Settings, action: () => console.log("Settings") },
  ];

  const filtered = commands.filter((c) =>
    c.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            style={{ position: 'fixed' }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[15%] -translate-x-1/2 w-full max-w-[500px] z-[1000] rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5),0_0_20px_rgba(0,240,255,0.05)] overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] relative group">
              <Search size={18} className="text-white/40 group-focus-within:text-[#00F0FF] transition-colors" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-0 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 text-[15px]"
              />
              <span className="text-[10px] font-mono text-white/30 border border-white/10 rounded px-1.5 py-0.5 pointer-events-none">ESC</span>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-sm text-white/40">No results found.</div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setOpen(false);
                        setQuery("");
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] hover:text-[#00F0FF] text-white/80 transition-colors text-sm text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <cmd.icon size={15} className="group-hover:text-[#00F0FF] text-white/50 transition-colors" />
                        {cmd.type}
                      </div>
                      <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Execute
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
