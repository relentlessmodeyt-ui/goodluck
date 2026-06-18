"use client";

import { NAV_LINKS, SITE } from "@/lib/data";
import { scrollToSection } from "@/hooks/useSmoothScroll";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "@/components/ui/icons";

const SOCIAL = [
  { label: "Twitter", href: SITE.social.twitter },
  { label: "Instagram", href: SITE.social.instagram },
  { label: "Dribbble", href: SITE.social.dribbble },
  { label: "LinkedIn", href: SITE.social.linkedin },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <AnimatedHeading
              as="h2"
              text="Let's build something extraordinary."
              className="max-w-[14ch] text-display-sm font-semibold text-balance"
            />
            <div className="mt-8">
              <MagneticButton href="#contact" variant="primary" ariaLabel="Start your project">
                Start Your Project
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="eyebrow mb-4">Navigate</p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(l.href);
                      }}
                      className="text-ink-muted transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Connect</p>
              <ul className="space-y-3">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-muted transition-colors hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-6 inline-block text-ink-muted transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-ink-muted sm:flex-row sm:items-center">
          <span className="font-display text-base font-semibold text-ink">
            Yash<span className="text-accent-gradient">x</span>Daksh
          </span>
          <p>© {new Date().getFullYear()} YashxDaksh. Crafting websites worth remembering.</p>
        </div>
      </div>
    </footer>
  );
}
