import Link from "next/link";
import { ArrowLeft, FileText, MessageCircle, Calendar, Download, Paperclip } from "lucide-react";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 lg:p-10 max-w-[1100px]">
      <Link href="/app/projects" className="btn-ghost mb-6 text-[12px]">
        <ArrowLeft size={13} />
        All projects
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="pill-accent">ACTIVE</span>
          <span className="text-[11px] text-[#F5F5F7]/40">Project · {params.id}</span>
        </div>
        <h1 className="text-[30px] font-normal tracking-tight mb-2">Your client site build</h1>
        <p className="text-[13px] text-[#F5F5F7]/55">
          Led by Simeon. Started Jan 12. Current milestone: Revisions round.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Files */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold flex items-center gap-2">
                <FileText size={14} className="text-[#F5F5F7]/60" />
                Files
              </h2>
              <button className="btn-ghost text-[12px]">
                <Paperclip size={13} />
                Upload
              </button>
            </div>
            <div className="space-y-1">
              {[
                "homepage-draft-v3.pdf",
                "brand-palette.png",
                "kickoff-notes.md",
                "sitemap.xlsx",
              ].map((f) => (
                <div key={f} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F5F5F7]/4">
                  <div className="flex items-center gap-3">
                    <FileText size={14} className="text-[#F5F5F7]/50" />
                    <span className="text-[13px]">{f}</span>
                  </div>
                  <button className="btn-ghost text-[11px]">
                    <Download size={12} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Messages */}
          <section className="card p-6">
            <h2 className="text-[14px] font-semibold flex items-center gap-2 mb-4">
              <MessageCircle size={14} className="text-[#F5F5F7]/60" />
              Messages
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center text-[11px] font-bold shrink-0">S</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-medium">Simeon</span>
                    <span className="text-[10px] text-[#F5F5F7]/40">2 hrs ago</span>
                  </div>
                  <p className="text-[13px] text-[#F5F5F7]/80 leading-relaxed">
                    Draft v3 is up. Let me know if the hero section still feels too busy. Happy to trim it.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F5F5F7]/10 flex items-center justify-center text-[11px] font-bold shrink-0">YC</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-medium">You</span>
                    <span className="text-[10px] text-[#F5F5F7]/40">Yesterday</span>
                  </div>
                  <p className="text-[13px] text-[#F5F5F7]/80 leading-relaxed">
                    Looks great overall. Can we try the hero with one image instead of three?
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <input className="input flex-1" placeholder="Reply to Simeon..." />
              <button className="btn-primary">Send</button>
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="space-y-4">
          <section className="card p-5">
            <h3 className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-3 font-semibold">Next step</h3>
            <p className="text-[13px] mb-3">Review draft v3, leave revision notes.</p>
            <button className="btn-primary w-full">Leave notes</button>
          </section>

          <section className="card p-5">
            <h3 className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-3 font-semibold">Team</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center text-[10px] font-bold">S</div>
                <div>
                  <p className="text-[12px] font-medium">Simeon Reid</p>
                  <p className="text-[10px] text-[#F5F5F7]/45">Your agent</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#7C6FEB]/20 flex items-center justify-center">
                  <Calendar size={11} className="text-[#A89DF2]" />
                </div>
                <div>
                  <p className="text-[12px] font-medium">Atlas</p>
                  <p className="text-[10px] text-[#F5F5F7]/45">AI assistant</p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
