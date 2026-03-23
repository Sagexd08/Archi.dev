"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = ["Product", "Solutions", "Docs", "Pricing"];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down past 100px, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
        setMobileOpen(false); // also close mobile menu if scrolling down
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Single source of truth for the underline position — hover takes priority
  const indicatorLink = hoveredLink ?? activeLink;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={false}
          animate={{
            width: scrolled ? "100%" : "100%",
            maxWidth: scrolled ? "1000px" : "1280px",
            borderRadius: scrolled ? "999px" : "0px",
            y: hidden ? -100 : scrolled ? 16 : 0,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full transition-colors duration-500 flex items-center justify-between px-6 py-4 ${
            scrolled ? "glass-panel shadow-2xl border border-white/10 backdrop-blur-md bg-black/40" : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span
              className="font-semibold text-lg tracking-tight select-none"
              style={{
                background:
                  "linear-gradient(90deg, #FFFFFF 55%, rgba(0,240,255,0.75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Archi.dev
            </span>
          </div>

          {/* Center nav — shared layout underline slides between items */}
          <div
            className="hidden md:flex items-center gap-8"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <button
                key={link}
                type="button"
                className="relative text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium py-1"
                onMouseEnter={() => setHoveredLink(link)}
                onClick={() => setActiveLink(link)}
              >
                {link}
                {indicatorLink === link && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #00F0FF, transparent)",
                    }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right — CTA + mobile burger */}
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => router.push("/login")}
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Start free trial
            </motion.button>

            <button
              type="button"
              className="md:hidden p-1.5 text-white/60 hover:text-white transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] left-4 right-4 z-40 glass-panel rounded-2xl p-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="block w-full text-left text-white/70 hover:text-white py-3.5 text-base font-medium border-b border-white/[0.06] last:border-0 transition-colors"
                onClick={() => {
                  setActiveLink(link);
                  setMobileOpen(false);
                }}
              >
                {link}
              </motion.button>
            ))}
            <motion.button
              type="button"
              onClick={() => router.push("/login")}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 w-full bg-white text-black py-3 rounded-full text-sm font-semibold"
            >
              Start free trial
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
