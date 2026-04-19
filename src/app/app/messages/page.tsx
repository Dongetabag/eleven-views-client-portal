import Link from "next/link";
import { MessageCircle, Circle } from "lucide-react";

const threads = [
  { id: "1", project: "Site build",          from: "Simeon", preview: "Draft v3 is up. Let me know if the hero still feels too busy.", when: "2 hrs ago", unread: true  },
  { id: "2", project: "Branding refresh",    from: "Simeon", preview: "Final files are in the Files tab. Ping me if you need the source.", when: "Yesterday", unread: false },
  { id: "3", project: "Email list migration",from: "Atlas",  preview: "Reminder: you have a scheduled handoff call Thursday at 11a ET.", when: "2 days ago", unread: false },
];

export default function MessagesPage() {
  return (
    <div className="p-6 lg:p-10 max-w-[900px]">
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-2">Messages</p>
        <h1 className="text-[28px] font-normal tracking-tight">Talk to your agent. Get answers from Atlas.</h1>
      </div>

      <div className="card overflow-hidden">
        {threads.map((t, i) => (
          <Link key={t.id} href={`/app/messages/${t.id}`} className={`flex items-start gap-3 px-5 py-4 hover:bg-[#F5F5F7]/3 block ${i > 0 ? "border-t border-[#F5F5F7]/6" : ""}`}>
            {t.unread ? (
              <Circle size={8} className="fill-[#7C6FEB] text-[#7C6FEB] shrink-0 mt-1.5" />
            ) : (
              <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[13px] font-semibold">{t.from}</p>
                <span className="text-[11px] text-[#F5F5F7]/45">·  {t.project}</span>
                <span className="text-[10px] text-[#F5F5F7]/35 ml-auto">{t.when}</span>
              </div>
              <p className="text-[12px] text-[#F5F5F7]/60 truncate">{t.preview}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="btn-secondary">
          <MessageCircle size={13} />
          Start a new thread
        </button>
      </div>
    </div>
  );
}
