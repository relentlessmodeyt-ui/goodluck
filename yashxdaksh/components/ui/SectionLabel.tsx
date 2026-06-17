import { cn } from "@/lib/utils";

/** Small eyebrow label with index + animated accent dot used to title sections. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("eyebrow", className)}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="text-accent/80">{index}</span>
      <span className="h-px w-6 bg-line" />
      {children}
    </div>
  );
}
