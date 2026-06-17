"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { useStore } from "@/store/useStore";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { menuOpen, toggleMenu } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-shell items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ease-smooth",
            scrolled ? "glass" : "border border-transparent"
          )}
        >
          <a
            href="#top"
            className="flex items-baseline gap-0.5 font-display text-lg font-semibold tracking-tight"
          >
            <span>Yash</span>
            <span className="text-accent-gradient">x</span>
            <span>Daksh</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton href="#contact" variant="primary" className="px-5 py-2.5" cursorLabel="Go">
              Start Your Project
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => toggleMenu()}
            className="flex h-10 w-10 items-center justify-center rounded-full glass md:hidden"
          >
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <span
                className={cn(
                  "h-0.5 w-full bg-ink transition-transform duration-300",
                  menuOpen && "translate-y-[5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full bg-ink transition-transform duration-300",
                  menuOpen && "-translate-y-[5px] -rotate-45"
                )}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[79] flex flex-col bg-base/95 px-gutter pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => toggleMenu(false)}
                    className="block border-b border-line py-5 font-display text-3xl tracking-tight"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => toggleMenu(false)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent-sheen px-6 py-4 font-medium text-base"
            >
              Start Your Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
