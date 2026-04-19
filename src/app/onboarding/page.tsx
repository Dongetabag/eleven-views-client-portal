"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Building2, Users, Target, Shield, CreditCard } from "lucide-react";

type GoalId = "website" | "dashboard" | "automation" | "strategy" | "unsure";

const STEPS = ["Welcome", "About you", "What you need", "Terms", "Plan"];

const goals: { id: GoalId; icon: typeof Target; title: string; desc: string }[] = [
  { id: "website",   icon: Target,    title: "A new website or funnel", desc: "Marketing site, landing page, lead capture." },
  { id: "dashboard", icon: Users,     title: "A client portal or team dashboard", desc: "Logged-in product for me or my customers." },
  { id: "automation",icon: Shield,    title: "Operations and automations", desc: "AI workflows, lead handling, post-meeting follow-ups." },
  { id: "strategy",  icon: Building2, title: "Ongoing strategy and support", desc: "A dedicated Eleven Views agent on retainer." },
  { id: "unsure",    icon: Target,    title: "I'm not sure yet", desc: "Help me figure out where to start." },
];

const plans = [
  { name: "Starter",   price: "$1,500",  period: "one-time", tagline: "One deliverable. One round of revisions." },
  { name: "Agency",    price: "$3,000",  period: "one-time", tagline: "Up to three deliverables. Two rounds.", featured: true },
  { name: "Retainer",  price: "$1,500",  period: "per month", tagline: "Ongoing. Priority turnaround. Monthly plan." },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<GoalId | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);

  const canContinue = [
    true,
    name.trim() && business.trim(),
    selectedGoal !== null,
    agreed,
    plan !== null,
  ][step];

  function next() {
    if (step === STEPS.length - 1) {
      router.push("/app");
    } else {
      setStep(step + 1);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top strip */}
      <header className="h-16 border-b border-[#F5F5F7]/8 flex items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center text-white font-bold text-[13px]">
            11
          </div>
          <span className="text-[14px] font-semibold tracking-tight">
            Eleven Views <span className="text-[#7C6FEB]">Portal</span>
          </span>
        </Link>
        <span className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/40">
          Step {step + 1} of {STEPS.length}
        </span>
      </header>

      {/* Wizard card */}
      <div className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="w-full max-w-[640px]">
          {/* Progress dots */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((label, i) => (
              <div key={label} className="flex-1 flex items-center gap-2">
                <div
                  className={`h-1 flex-1 rounded-full transition-all ${
                    i < step ? "bg-[#7C6FEB]" : i === step ? "bg-[#7C6FEB]" : "bg-[#F5F5F7]/10"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="card p-7 md:p-10">
            {/* Step 0, welcome */}
            {step === 0 && (
              <div>
                <h1 className="text-2xl md:text-3xl font-normal tracking-tight mb-3">
                  Welcome to your Eleven Views portal.
                </h1>
                <p className="text-[14px] text-[#F5F5F7]/65 leading-relaxed mb-6">
                  This is the shared workspace between you and your agent. In the next minute, we&apos;ll learn a bit about what you&apos;re building so your dashboard is ready the moment you log in.
                </p>
                <ul className="space-y-2.5 mb-2">
                  {[
                    "You tell us what you need",
                    "We pre-populate your workspace",
                    "You sign in and everything is ready",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-[13px] text-[#F5F5F7]/75">
                      <Check size={14} className="text-[#7C6FEB] mt-0.5 shrink-0" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step 1, about you */}
            {step === 1 && (
              <div>
                <h1 className="text-2xl font-normal tracking-tight mb-2">About you</h1>
                <p className="text-[13px] text-[#F5F5F7]/55 mb-6">
                  So your agent knows who they&apos;re working with.
                </p>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/55 mb-1.5 block">
                      Your name
                    </span>
                    <input
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First and last"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/55 mb-1.5 block">
                      Your business or project
                    </span>
                    <input
                      className="input"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="Acme Real Estate, Dr. Patel's clinic, etc."
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Step 2, goals */}
            {step === 2 && (
              <div>
                <h1 className="text-2xl font-normal tracking-tight mb-2">What do you need?</h1>
                <p className="text-[13px] text-[#F5F5F7]/55 mb-6">
                  Pick the closest match. You can add more after your portal is live.
                </p>
                <div className="space-y-2">
                  {goals.map((g) => {
                    const active = selectedGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGoal(g.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                          active
                            ? "bg-[#7C6FEB]/10 border-[#7C6FEB]/50"
                            : "bg-[#14161B] border-[#F5F5F7]/8 hover:border-[#F5F5F7]/20"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          active ? "bg-[#7C6FEB]/20" : "bg-[#F5F5F7]/5"
                        }`}>
                          <g.icon size={16} className={active ? "text-[#A89DF2]" : "text-[#F5F5F7]/55"} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <h3 className="text-[14px] font-medium">{g.title}</h3>
                            {active && <Check size={15} className="text-[#7C6FEB]" />}
                          </div>
                          <p className="text-[12px] text-[#F5F5F7]/55 leading-relaxed">{g.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3, terms */}
            {step === 3 && (
              <div>
                <h1 className="text-2xl font-normal tracking-tight mb-2">Terms</h1>
                <p className="text-[13px] text-[#F5F5F7]/55 mb-5">
                  Quick agreement to the basics. Full documents linked.
                </p>
                <div className="bg-[#14161B] border border-[#F5F5F7]/8 rounded-lg p-5 mb-5 text-[13px] text-[#F5F5F7]/70 leading-relaxed space-y-3 max-h-[260px] overflow-y-auto">
                  <p>This portal is a private workspace between you and your Eleven Views agent. Everything shared here is scoped to your project.</p>
                  <p>We don&apos;t sell your data, don&apos;t advertise inside the portal, and don&apos;t share files outside your authorized team.</p>
                  <p>You can request your data or project closure at any time by messaging your agent or emailing <strong className="text-white">portal@elevenviews.io</strong>.</p>
                  <p>Our full <Link href="/terms" className="text-[#7C6FEB] hover:text-[#A89DF2]">Terms of Service</Link> and <Link href="/privacy" className="text-[#7C6FEB] hover:text-[#A89DF2]">Privacy Policy</Link> apply.</p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <span className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <span className="block w-5 h-5 rounded-md bg-[#14161B] border border-[#F5F5F7]/20 peer-checked:bg-[#7C6FEB] peer-checked:border-[#7C6FEB] transition-colors flex items-center justify-center">
                      {agreed && <Check size={13} className="text-white" strokeWidth={3} />}
                    </span>
                  </span>
                  <span className="text-[13px] text-[#F5F5F7]/80">
                    I agree to the <Link href="/terms" className="text-[#7C6FEB]">Terms of Service</Link> and <Link href="/privacy" className="text-[#7C6FEB]">Privacy Policy</Link>.
                  </span>
                </label>
              </div>
            )}

            {/* Step 4, plan */}
            {step === 4 && (
              <div>
                <h1 className="text-2xl font-normal tracking-tight mb-2">Pick a plan</h1>
                <p className="text-[13px] text-[#F5F5F7]/55 mb-6">
                  You can change this later with your agent. Most clients start on Agency.
                </p>
                <div className="space-y-3">
                  {plans.map((p) => {
                    const active = plan === p.name;
                    return (
                      <button
                        key={p.name}
                        onClick={() => setPlan(p.name)}
                        className={`w-full text-left p-5 rounded-xl border transition-all ${
                          active
                            ? "bg-[#7C6FEB]/10 border-[#7C6FEB]/50"
                            : p.featured
                            ? "bg-[#14161B] border-[#7C6FEB]/30 ring-1 ring-[#7C6FEB]/20"
                            : "bg-[#14161B] border-[#F5F5F7]/8 hover:border-[#F5F5F7]/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active || p.featured ? "bg-[#7C6FEB]/20" : "bg-[#F5F5F7]/5"}`}>
                              <CreditCard size={16} className={active || p.featured ? "text-[#A89DF2]" : "text-[#F5F5F7]/55"} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <h3 className="text-[15px] font-semibold">{p.name}</h3>
                                {p.featured && !active && (
                                  <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#7C6FEB]/20 text-[#A89DF2] font-bold">Popular</span>
                                )}
                              </div>
                              <p className="text-[12px] text-[#F5F5F7]/55">{p.tagline}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-lg font-semibold">{p.price}</div>
                            <div className="text-[10px] uppercase tracking-widest text-[#F5F5F7]/45">{p.period}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-6">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="btn-secondary">
                <ArrowLeft size={14} />
                Back
              </button>
            ) : (
              <Link href="/" className="btn-ghost">
                <ArrowLeft size={14} />
                Exit setup
              </Link>
            )}
            <button onClick={next} disabled={!canContinue} className="btn-primary">
              {step === STEPS.length - 1 ? "Enter your portal" : "Continue"}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
