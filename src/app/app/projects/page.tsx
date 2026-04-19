import Link from "next/link";
import { ArrowRight, Folder, Circle } from "lucide-react";

const projects = [
  { id: "1", name: "Your client site build",   status: "Active",   progress: 60, agent: "Simeon",  tone: "active" },
  { id: "2", name: "Email list migration",      status: "Planning", progress: 15, agent: "Simeon",  tone: "planning" },
  { id: "3", name: "Branding refresh",          status: "Done",     progress: 100,agent: "Simeon",  tone: "done" },
];

export default function ProjectsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-[1100px]">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-2">Projects</p>
          <h1 className="text-[28px] font-normal tracking-tight">Everything we&apos;re building for you.</h1>
        </div>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/app/projects/${p.id}`}
            className="card card-hover p-5 flex items-center gap-4 block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#7C6FEB]/12 flex items-center justify-center shrink-0">
              <Folder size={17} className="text-[#A89DF2]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[15px] font-medium">{p.name}</h3>
                <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded ${
                  p.tone === "active" ? "bg-[#7C6FEB]/15 text-[#A89DF2]" :
                  p.tone === "done" ? "bg-[#4ADE80]/10 text-[#4ADE80]" :
                  "bg-[#F5C66E]/10 text-[#F5C66E]"
                }`}>
                  <Circle size={7} className="fill-current" />
                  {p.status}
                </span>
              </div>
              <p className="text-[12px] text-[#F5F5F7]/55">with {p.agent} · {p.progress}% complete</p>
              <div className="mt-2 h-1 bg-[#F5F5F7]/6 rounded-full overflow-hidden max-w-[300px]">
                <div
                  className="h-full bg-gradient-to-r from-[#7C6FEB] to-[#A89DF2] rounded-full"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            <ArrowRight size={16} className="text-[#F5F5F7]/30" />
          </Link>
        ))}
      </div>
    </div>
  );
}
