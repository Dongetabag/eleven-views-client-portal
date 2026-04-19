import Link from "next/link";
import { ArrowRight, Shield, MessageCircle, FileText, CreditCard } from "lucide-react";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="h-16 border-b border-[#F5F5F7]/8 flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center text-white font-bold text-[13px]">
            11
          </div>
          <span className="text-[15px] font-semibold tracking-tight">
            Eleven Views <span className="text-[#7C6FEB]">Portal</span>
          </span>
        </div>
        <Link href="/login" className="btn-primary">
          Sign in
          <ArrowRight size={14} />
        </Link>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <span className="pill-accent mb-6">PRIVATE CLIENT WORKSPACE</span>
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-normal tracking-tight leading-[1.05] mb-5">
            Your project.
            <span className="block text-[#7C6FEB] mt-2">Your portal.</span>
          </h1>
          <p className="text-[15px] md:text-base text-[#F5F5F7]/65 leading-relaxed max-w-lg mx-auto mb-10">
            This is the shared workspace your Eleven Views agent created for you.
            Files, messages, billing, and an AI assistant that already knows your
            project. Sign in to pick up where you left off.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="btn-primary text-[14px] px-7 py-3.5">
              Sign in to your portal
              <ArrowRight size={15} />
            </Link>
            <Link href="/onboarding" className="btn-secondary text-[14px] px-7 py-3.5">
              New client? Start setup
            </Link>
          </div>
        </div>
      </section>

      {/* Feature row */}
      <section className="border-t border-[#F5F5F7]/8 px-6 md:px-10 py-14">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: FileText, title: "Shared files", desc: "Everything we build for you, in one place." },
            { icon: MessageCircle, title: "Direct messages", desc: "Talk to your agent without email threads." },
            { icon: CreditCard, title: "Billing clarity", desc: "Invoices, plan, and history at a glance." },
            { icon: Shield, title: "Your data only", desc: "Private workspace, scoped to your project." },
          ].map((f) => (
            <div key={f.title} className="card p-5">
              <div className="w-9 h-9 rounded-lg bg-[#7C6FEB]/12 flex items-center justify-center mb-3">
                <f.icon size={17} className="text-[#7C6FEB]" />
              </div>
              <h3 className="text-[14px] font-semibold mb-1">{f.title}</h3>
              <p className="text-[12px] text-[#F5F5F7]/55 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#F5F5F7]/8 px-6 md:px-10 py-6 text-center text-[11px] text-[#F5F5F7]/35">
        <p>
          Built by Eleven Views. Questions about your project? Message your agent
          inside the portal.
        </p>
      </footer>
    </main>
  );
}
