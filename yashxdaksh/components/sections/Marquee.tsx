const CLIENTS = [
  "Lumen Capital",
  "Atelier Noir",
  "Northwind AI",
  "Meridian Studio",
  "Vantage",
  "Helios",
  "Monogram",
  "Saffron Co.",
];

/** Trust strip — an infinite, CSS-driven marquee of client names. */
export function Marquee() {
  return (
    <section
      aria-label="Trusted by"
      className="relative overflow-hidden border-y border-line py-7"
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-16 will-change-transform motion-reduce:animate-none">
        {[...CLIENTS, ...CLIENTS].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-xl font-medium tracking-tight text-ink-muted/70 transition-colors hover:text-ink"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
