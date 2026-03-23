"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
const navLinks = [
  { label: "Product", href: "/#product" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];
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
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
        setMobileOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const indicatorLink = hoveredLink ?? activeLink;
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={false}
          animate={{
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
          <button
            type="button"
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" stroke="#00F0FF" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.92"/>
              <circle cx="12" cy="12" r="2.4" fill="#00F0FF" opacity="0.85"/>
              <line x1="12" y1="2" x2="12" y2="9.6" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
              <line x1="20" y1="7" x2="14.1" y2="10.3" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
              <line x1="20" y1="17" x2="14.1" y2="13.7" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
              <line x1="12" y1="22" x2="12" y2="14.4" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
              <line x1="4" y1="17" x2="9.9" y2="13.7" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
              <line x1="4" y1="7" x2="9.9" y2="10.3" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.38"/>
            </svg>
            <span
              className="font-semibold text-lg tracking-tight select-none"
              style={{
                background: "linear-gradient(90deg, #FFFFFF 55%, rgba(0,240,255,0.75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Archi.dev
            </span>
          </button>
          <div
            className="hidden md:flex items-center gap-8"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                type="button"
                className="relative text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium py-1"
                onMouseEnter={() => setHoveredLink(label)}
                onClick={() => { setActiveLink(label); router.push(href); }}
              >
                {label}
                {indicatorLink === label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #00F0FF, transparent)" }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="hidden md:block text-white/45 hover:text-white transition-colors duration-200 text-sm font-medium cursor-pointer"
            >
              Sign in
            </button>
            <motion.button
              type="button"
              onClick={() => router.push("/login")}
              className="shimmer-btn bg-white text-black px-5 py-2 rounded-full text-sm font-semibold cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 22px rgba(255,255,255,0.32)",
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] left-4 right-4 z-40 glass-panel rounded-2xl p-6 md:hidden"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.button
                key={label}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="block w-full text-left text-white/70 hover:text-white py-3.5 text-base font-medium border-b border-white/[0.06] last:border-0 transition-colors"
                onClick={() => {
                  setActiveLink(label);
                  setMobileOpen(false);
                  router.push(href);
                }}
              >
                {label}
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
