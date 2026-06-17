import { NAV_LINKS } from "@/lib/data";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com/yashxdaksh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/yashxdaksh" },
  { label: "Dribbble", href: "https://dribbble.com/yashxdaksh" },
  { label: "Instagram", href: "https://instagram.com/yashxdaksh" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-surface-muted">
      <div className="bg-radial-spot pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-70" />
      <div className="shell relative py-24">
        {/* Big CTA */}
        <div className="flex flex-col items-center text-center">
          <AnimatedHeading
            as="h2"
            text="Ready when you are."
            highlight={["are."]}
            className="max-w-3xl font-display text-display-lg font-semibold text-gradient"
          />
          <p className="mt-6 max-w-md text-base text-ink-muted">
            Let&apos;s turn your next idea into a digital experience worth
            remembering.
          </p>
          <div className="mt-9">
            <MagneticButton href="#contact" variant="primary" cursorLabel="Go">
              Start Your Project
            </MagneticButton>
          </div>
        </div>

        {/* Links */}
        <div className="mt-24 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-baseline gap-0.5 font-display text-2xl font-semibold tracking-tight">
              <span>Yash</span>
              <span className="text-accent-gradient">x</span>
              <span>Daksh</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Premium websites for ambitious brands. Where design meets
              performance.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs uppercase tracking-[0.2em] text-ink-muted">Explore</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-ink/80 transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-ink-muted">Connect</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink/80 transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:hello@yashxdaksh.com" className="text-sm text-ink/80 transition-colors hover:text-accent">
                  hello@yashxdaksh.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} YashxDaksh. All rights reserved.</p>
          <p>Crafted with precision · Built for performance</p>
        </div>
      </div>
    </footer>
  );
}
