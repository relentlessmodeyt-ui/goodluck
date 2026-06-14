import { SplineSceneBasic } from "@/components/ui/spline-scene-demo";
import { Zap, BarChart3, Shield, Layers, ArrowRight, Check } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Automation",
    description:
      "Eliminate repetitive tasks with AI-powered workflow automation that learns and adapts to your team's patterns.",
  },
  {
    icon: BarChart3,
    title: "Unified Analytics",
    description:
      "Real-time dashboards that unify data from every source — giving you one source of truth across your entire organization.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, role-based access control, and audit logs baked in.",
  },
  {
    icon: Layers,
    title: "Seamless Integrations",
    description:
      "Connect with 200+ tools your team already uses. Slack, Salesforce, GitHub, and more — out of the box.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    features: ["Up to 5 users", "10 workflows", "Basic analytics", "Email support"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$99",
    period: "/mo",
    features: [
      "Up to 50 users",
      "Unlimited workflows",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited users",
      "Dedicated infrastructure",
      "SSO & SCIM",
      "24/7 dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#030303]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
            YASHXDAKSH
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <button className="bg-violet-600 hover:bg-violet-500 transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg">
            Get started free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4 border border-violet-500/30 bg-violet-500/10 px-3 py-1 rounded-full">
              Now in public beta
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
              The SaaS platform<br />built to scale with you
            </h1>
            <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">
              YASHXDAKSH brings automation, analytics, and integrations into one
              intelligent workspace — so your team can focus on what matters most.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition-colors text-white font-semibold px-6 py-3 rounded-xl">
                Start for free <ArrowRight className="w-4 h-4" />
              </button>
              <button className="text-neutral-300 hover:text-white transition-colors font-medium px-6 py-3 rounded-xl border border-white/10 hover:border-white/20">
                View demo
              </button>
            </div>
          </div>

          {/* 3D Spline Hero Card */}
          <SplineSceneBasic />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Everything your team needs</h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              One platform. Infinite possibilities. Built for teams that move fast.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Simple, transparent pricing</h2>
            <p className="mt-4 text-neutral-400">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-violet-600/10 border-violet-500/50 shadow-lg shadow-violet-500/10"
                    : "bg-white/[0.03] border-white/8 hover:border-white/15"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <h3 className="font-semibold text-white text-lg">{plan.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-neutral-400 mb-1">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-neutral-300">
                      <Check className="w-4 h-4 text-violet-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-violet-600 hover:bg-violet-500 text-white"
                      : "border border-white/15 hover:border-violet-500/50 text-neutral-200 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
            Ready to transform your workflow?
          </h2>
          <p className="mt-5 text-neutral-400 text-lg">
            Join thousands of forward-thinking teams using YASHXDAKSH to build faster, smarter, and at scale.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your work email"
              className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-violet-500/50"
            />
            <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition-colors text-white font-semibold px-6 py-3 rounded-xl whitespace-nowrap">
              Get early access <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
            YASHXDAKSH
          </span>
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} YASHXDAKSH. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
