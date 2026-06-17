"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const SCOPES = [
  { id: "web-design", label: "Web Design", weight: 12 },
  { id: "development", label: "Development", weight: 16 },
  { id: "branding", label: "Branding", weight: 8 },
  { id: "ui-ux", label: "UI/UX Design", weight: 10 },
  { id: "ecommerce", label: "E-commerce", weight: 18 },
  { id: "seo", label: "SEO", weight: 6 },
];

const BUDGETS = ["$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+"];
const TIMELINES = ["ASAP", "1–2 months", "3–4 months", "Flexible"];

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(10, "Tell us a little about your project"),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const [scopes, setScopes] = useState<string[]>(["web-design", "development"]);
  const [budget, setBudget] = useState(1);
  const [timeline, setTimeline] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const estimate = useMemo(() => {
    const base = SCOPES.filter((s) => scopes.includes(s.id)).reduce(
      (sum, s) => sum + s.weight,
      6
    );
    const budgetMult = [0.8, 1, 1.4, 1.9][budget];
    const rushMult = [1.3, 1.1, 1, 0.95][timeline];
    const low = Math.round((base * budgetMult * rushMult) / 2) * 1000;
    const high = Math.round(base * budgetMult * rushMult * 1.6) * 1000;
    return { low, high };
  }, [scopes, budget, timeline]);

  const toggleScope = (id: string) =>
    setScopes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const onSubmit = async (_data: FormValues) => {
    // Front-end only: simulate a network request, then confirm.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
  };

  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}k`;

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="bg-radial-spot pointer-events-none absolute inset-x-0 top-0 h-1/2" />
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel index="07" className="justify-center">
            Contact
          </SectionLabel>
          <AnimatedHeading
            as="h2"
            text="Let's build something extraordinary."
            highlight={["extraordinary."]}
            className="mt-5 font-display text-display-md font-semibold text-gradient"
          />
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Shape your project below for an instant ballpark, then send it our
            way. We reply within one business day.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Estimator */}
          <div className="glass rounded-4xl p-7 sm:p-9">
            <h3 className="font-display text-lg font-medium">Project estimator</h3>

            <div className="mt-7">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ink-muted">
                What do you need?
              </p>
              <div className="flex flex-wrap gap-2">
                {SCOPES.map((s) => {
                  const on = scopes.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleScope(s.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                        on
                          ? "border-accent/50 bg-accent/10 text-ink"
                          : "border-line text-ink-muted hover:border-ink-muted/50 hover:text-ink"
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Selector
              label="Budget range"
              options={BUDGETS}
              value={budget}
              onChange={setBudget}
            />
            <Selector
              label="Timeline"
              options={TIMELINES}
              value={timeline}
              onChange={setTimeline}
            />

            {/* Live estimate */}
            <div className="mt-8 rounded-2xl border border-line bg-base/50 p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-ink-muted">
                Estimated investment
              </div>
              <div className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${estimate.low}-${estimate.high}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-accent-gradient"
                  >
                    {fmt(estimate.low)} – {fmt(estimate.high)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-2 text-xs text-ink-muted">
                Indicative only — final scope confirmed on a discovery call.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="glass rounded-4xl p-7 sm:p-9">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[360px] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-sheen">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-base" fill="none" aria-hidden>
                      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-medium">Message received</h3>
                  <p className="mt-2 max-w-xs text-sm text-ink-muted">
                    Thanks for reaching out. We&apos;ll be in touch within one
                    business day to talk through your project.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <Field label="Name" error={errors.name?.message}>
                    <input
                      {...register("name")}
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className="field"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="field"
                    />
                  </Field>
                  <Field label="Company" error={errors.company?.message}>
                    <input
                      {...register("company")}
                      type="text"
                      autoComplete="organization"
                      placeholder="Optional"
                      className="field"
                    />
                  </Field>
                  <Field label="About the project" error={errors.message?.message}>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="What are you building, and what does success look like?"
                      className="field resize-none"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-sheen bg-[length:200%_100%] px-7 py-4 text-sm font-medium text-base transition-[background-position] duration-500 hover:bg-[position:100%_50%] disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending…" : "Start Your Project"}
                    {!isSubmitting && (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <p className="text-center text-xs text-ink-muted">
                    Prefer email?{" "}
                    <a href="mailto:hello@yashxdaksh.com" className="text-accent hover:underline">
                      hello@yashxdaksh.com
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Selector({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="mt-7">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ink-muted">{label}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((opt, i) => {
          const on = i === value;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(i)}
              className={cn(
                "relative rounded-xl border px-3 py-3 text-center text-xs transition-colors duration-300",
                on ? "border-accent/50 text-ink" : "border-line text-ink-muted hover:text-ink"
              )}
            >
              {on && (
                <motion.span
                  layoutId={`sel-${label}`}
                  className="absolute inset-0 -z-10 rounded-xl bg-accent/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-ink-muted">
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-xs text-[#FF6B6B]"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
