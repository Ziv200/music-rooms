"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/hooks/useLang";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { key: "offer", href: "#offer" },
  { key: "tour", href: "#tour" },
  { key: "work", href: "#work" },
  { key: "contact", href: "#contact" },
] as const;

export function Navbar() {
  const { t, toggleLang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = () => setMobileOpen(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-[#f7f6f3]/90 backdrop-blur-md border-b border-neutral-900/8"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <a href="#hero" className="group flex items-baseline gap-2 min-w-0">
            <span className="font-display text-[15px] tracking-tight text-neutral-900 shrink-0">
              {t.brand}
            </span>
            <span className="hidden lg:inline text-[11px] text-neutral-400 tracking-wide truncate">
              {t.brandFull}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="px-3 py-2 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 text-[12px] tracking-wide text-neutral-500 hover:text-neutral-900 border border-neutral-900/10 hover:border-neutral-900/25 transition-colors"
            >
              {t.nav.langSwitch}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#f7f6f3] md:hidden"
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-900/8">
              <span className="font-display text-[15px] text-neutral-900">
                {t.brand}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-neutral-600"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col items-start gap-1 px-6 pt-10">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl text-neutral-800 py-3"
                >
                  {t.nav[item.key]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
