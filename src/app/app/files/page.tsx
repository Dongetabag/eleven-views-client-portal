import { FileText, Download, Upload, Search } from "lucide-react";

const files = [
  { name: "homepage-draft-v3.pdf", size: "2.1 MB", project: "Site build",      when: "2 hrs ago"  },
  { name: "brand-palette.png",     size: "410 KB", project: "Site build",      when: "Yesterday"  },
  { name: "kickoff-notes.md",      size: "12 KB",  project: "Site build",      when: "2 days ago" },
  { name: "sitemap.xlsx",          size: "88 KB",  project: "Site build",      when: "3 days ago" },
  { name: "invoice-0014.pdf",      size: "34 KB",  project: "Billing",         when: "5 days ago" },
  { name: "contract-signed.pdf",   size: "120 KB", project: "Onboarding",      when: "2 weeks ago"},
];

export default function FilesPage() {
  return (
    <div className="p-6 lg:p-10 max-w-[1100px]">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-2">Files</p>
          <h1 className="text-[28px] font-normal tracking-tight">Everything shared with you.</h1>
        </div>
        <button className="btn-primary">
          <Upload size={13} />
          Upload
        </button>
      </div>

      {/* Search */}
      <div className="card p-3 mb-4 flex items-center gap-3">
        <Search size={14} className="text-[#F5F5F7]/40 ml-2" />
        <input className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-[#F5F5F7]/40" placeholder="Search files..." />
      </div>

      {/* Files list */}
      <div className="card overflow-hidden">
        {files.map((f, i) => (
          <div key={f.name} className={`flex items-center gap-4 px-5 py-3.5 hover:bg-[#F5F5F7]/3 ${i > 0 ? "border-t border-[#F5F5F7]/6" : ""}`}>
            <div className="w-9 h-9 rounded-lg bg-[#7C6FEB]/10 flex items-center justify-center shrink-0">
              <FileText size={15} className="text-[#A89DF2]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate">{f.name}</p>
              <p className="text-[11px] text-[#F5F5F7]/45">{f.project} · {f.size} · {f.when}</p>
            </div>
            <button className="btn-ghost text-[11px]">
              <Download size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
