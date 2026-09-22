import Link from "next/link";
import { ArrowRight, FileText, MessageCircle, Sparkles, CheckCircle2, Clock, Folder } from "lucide-react";

export default function AppHome() {
  return (
    <div className="p-6 lg:p-10 max-w-[1100px]">
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-2">Welcome back</p>
        <h1 className="text-[28px] md:text-[32px] font-normal tracking-tight">Your project at a glance.</h1>
      </div>

      {/* Active project card */}
      <div className="card p-6 lg:p-7 mb-6 bg-gradient-to-br from-[#14161B] to-[#12141A]">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="pill-accent mb-3">ACTIVE PROJECT</span>
            <h2 className="text-xl font-medium mb-1.5">Your client site build</h2>
            <p className="text-[13px] text-[#F5F5F7]/60 leading-relaxed max-w-xl">
              On track for preview delivery. 3 of 5 milestones complete.
            </p>
          </div>
          <Link href="/app/projects" className="btn-secondary shrink-0">
            View project <ArrowRight size={13} />
          </Link>
        </div>

        {/* Milestones */}
        <div className="space-y-2">
          {[
            { label: "Kickoff call + brief", done: true },
            { label: "Brand + copy draft", done: true },
            { label: "First preview URL", done: true },
            { label: "Revisions round", done: false, pending: true },
            { label: "Domain + launch", done: false },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3 text-[13px]">
              {m.done ? (
                <CheckCircle2 size={15} className="text-[#4ADE80] shrink-0" />
              ) : m.pending ? (
                <Clock size={15} className="text-[#F5C66E] shrink-0" />
              ) : (
                <div className="w-[15px] h-[15px] rounded-full border border-[#F5F5F7]/20 shrink-0" />
              )}
              <span className={m.done ? "text-[#F5F5F7]/55 line-through" : m.pending ? "text-[#F5F5F7]" : "text-[#F5F5F7]/45"}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick-access grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {[
          { href: "/app/files", icon: FileText, label: "Latest file", sub: "Homepage draft v3", tone: "neutral" },
          { href: "/app/messages", icon: MessageCircle, label: "Message from your agent", sub: "Simeon, 2 hrs ago", tone: "accent" },
          { href: "/creator-protect", icon: Sparkles, label: "Creator Protect", sub: "Finds, removals, privacy", tone: "accent" },
        ].map((c) => (
          <Link key={c.label} href={c.href} className="card card-hover p-5 block">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${c.tone === "accent" ? "bg-[#7C6FEB]/12" : "bg-[#F5F5F7]/5"}`}>
              <c.icon size={15} className={c.tone === "accent" ? "text-[#A89DF2]" : "text-[#F5F5F7]/60"} />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-1">{c.label}</p>
            <p className="text-[13px] font-medium">{c.sub}</p>
          </Link>
        ))}
      </div>

      {/* Activity feed */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold">Recent activity</h3>
          <span className="text-[11px] text-[#F5F5F7]/40">Last 7 days</span>
        </div>
        <ul className="space-y-3">
          {[
            { kind: "file", when: "2 hrs ago",   text: "Simeon uploaded homepage-draft-v3.pdf"   },
            { kind: "msg",  when: "Yesterday",   text: "Simeon sent you a message about revisions" },
            { kind: "ms",   when: "3 days ago",  text: "Milestone completed: First preview URL"   },
            { kind: "pay",  when: "5 days ago",  text: "Invoice #0014 paid, $1,500"              },
          ].map((a, i) => (
            <li key={i} className="flex items-start gap-3 py-2 border-b border-[#F5F5F7]/5 last:border-0">
              <div className="w-6 h-6 rounded-full bg-[#7C6FEB]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Folder size={11} className="text-[#A89DF2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#F5F5F7]/85">{a.text}</p>
                <p className="text-[11px] text-[#F5F5F7]/40">{a.when}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
