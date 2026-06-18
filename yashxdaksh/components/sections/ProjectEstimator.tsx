"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ESTIMATOR, SITE } from "@/lib/data";
import { estimatorSchema, type EstimatorValues } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, ArrowUpRight, Check, Spark } from "@/components/ui/icons";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

type OptionGroup = { id: string; label: string; note: string }[];

const STEPS = [
  { key: "scope", label: "Project type", options: ESTIMATOR.scope as OptionGroup },
  { key: "budget", label: "Budget range", options: ESTIMATOR.budget as OptionGroup },
  { key: "timeline", label: "Timeline", options: ESTIMATOR.timeline as OptionGroup },
] as const;

export function ProjectEstimator() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const setCursorActive = useUIStore((s) => s.setCursorActive);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EstimatorValues>({
    resolver: zodResolver(estimatorSchema),
    defaultValues: { scope: "", budget: "", timeline: "", name: "", email: "", company: "", details: "" },
    mode: "onTouched",
  });

  const values = watch();
  const isChoiceStep = step < STEPS.length;

  const select = (key: string, id: string) => {
    setValue(key as keyof EstimatorValues, id, { shouldValidate: true });
    // auto-advance for a fluid feel
    setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length)), 220);
  };

  const onSubmit = async (data: EstimatorValues) => {
    // Front-end only: simulate a network request, then celebrate.
    await new Promise((r) => setTimeout(r, 900));
    // eslint-disable-next-line no-console
    console.info("[YashxDaksh] estimator submission", data);
    setSubmitted(true);
  };

  const progress = ((step + (submitted ? 1 : 0)) / (STEPS.length + 1)) * 100;

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-section">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="shell relative">
        <SectionHeader
          label="Start a Project"
          title="Let's build something extraordinary."
          description="Tell us about your project in under a minute. You'll get a tailored estimate and a real reply from a senior team member — not a bot."
          align="center"
        />

        <div className="mx-auto mt-14 max-w-2xl">
          <div className="border-glow relative overflow-hidden rounded-xl2 bg-surface-raised p-7 sm:p-10">
            {/* Progress bar */}
            <div className="mb-9 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-accent-gradient"
                animate={{ width: `${progress}%` }}
                transition={{ ease: [0.16, 1, 0.3, 1] as const, duration: 0.6 }}
              />
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-semibold">Brief received.</h3>
                  <p className="mt-3 max-w-md text-ink-muted">
                    Thanks {values.name?.split(" ")[0] || "there"} — we&apos;ll review your project and reply
                    within one business day. Keep an eye on your inbox.
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-6 text-sm text-accent transition-colors hover:text-accent-violet"
                  >
                    Or email us directly →
                  </a>
                </motion.div>
              ) : isChoiceStep ? (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="eyebrow">
                      Step {step + 1} / {STEPS.length + 1}
                    </span>
                    <h3 className="font-display text-lg font-medium">{STEPS[step].label}</h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {STEPS[step].options.map((opt) => {
                      const selected = values[STEPS[step].key as keyof EstimatorValues] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => select(STEPS[step].key, opt.id)}
                          onMouseEnter={() => setCursorActive(true)}
                          onMouseLeave={() => setCursorActive(false)}
                          className={cn(
                            "group relative flex flex-col items-start gap-1 rounded-xl border p-5 text-left transition-all duration-300",
                            selected
                              ? "border-accent bg-accent/10"
                              : "border-line bg-base/30 hover:border-white/25",
                          )}
                        >
                          <span className="font-display text-lg font-medium">{opt.label}</span>
                          <span className="text-xs text-ink-muted">{opt.note}</span>
                          <span
                            className={cn(
                              "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                              selected ? "border-accent bg-accent text-white" : "border-line",
                            )}
                          >
                            {selected && <Check className="h-3 w-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className="mt-7 text-sm text-ink-muted transition-colors hover:text-white"
                    >
                      ← Back
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  key="details"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="eyebrow">Final step</span>
                    <h3 className="font-display text-lg font-medium">Your details</h3>
                  </div>

                  {/* Summary chips */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {STEPS.map((s) => {
                      const v = values[s.key as keyof EstimatorValues];
                      const opt = s.options.find((o) => o.id === v);
                      return (
                        <span key={s.key} className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
                          <Spark className="h-3 w-3 text-accent" />
                          {opt?.label ?? s.label}
                        </span>
                      );
                    })}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" error={errors.name?.message}>
                      <input
                        {...register("name")}
                        placeholder="Jane Doe"
                        className="input"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="jane@brand.com"
                        className="input"
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  <div className="mt-4">
                    <Field label="Company (optional)" error={errors.company?.message}>
                      <input {...register("company")} placeholder="Brand Inc." className="input" autoComplete="organization" />
                    </Field>
                  </div>

                  <div className="mt-4">
                    <Field label="Anything else? (optional)" error={errors.details?.message}>
                      <textarea
                        {...register("details")}
                        rows={3}
                        placeholder="A sentence or two about your goals…"
                        className="input resize-none"
                      />
                    </Field>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(STEPS.length - 1)}
                      className="text-sm text-ink-muted transition-colors hover:text-white"
                    >
                      ← Back
                    </button>
                    <MagneticButton
                      variant="primary"
                      ariaLabel="Send project brief"
                      onClick={() => handleSubmit(onSubmit)()}
                    >
                      {isSubmitting ? "Sending…" : "Send Brief"}
                      <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-6 text-center text-sm text-ink-muted">
            Prefer email?{" "}
            <a href={`mailto:${SITE.email}`} className="text-accent transition-colors hover:text-accent-violet">
              {SITE.email}
              <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5" />
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(248, 250, 252, 0.1);
          background: rgba(8, 9, 13, 0.4);
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: #f8fafc;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        :global(.input::placeholder) {
          color: #5b6473;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #5b7cff;
          box-shadow: 0 0 0 3px rgba(91, 124, 255, 0.18);
        }
      `}</style>
    </section>
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
      <span className="mb-2 block text-xs uppercase tracking-wide text-ink-muted">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
