"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, FileText, MessageCircle, CreditCard, Settings, Sparkles, Bell, ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

const navItems = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/app/projects", label: "Projects", icon: Folder },
  { href: "/app/files", label: "Files", icon: FileText },
  { href: "/app/messages", label: "Messages", icon: MessageCircle },
  { href: "/app/billing", label: "Billing", icon: CreditCard },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0A0B0E]">
      {/* Sidebar */}
      <aside className="w-[72px] lg:w-[232px] shrink-0 bg-[#0D0F13] border-r border-[#F5F5F7]/6 flex flex-col">
        <div className="p-4 lg:p-5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center text-white font-bold text-[13px] shrink-0">
            11
          </div>
          <span className="text-[14px] font-semibold tracking-tight hidden lg:inline">
            Eleven Views
          </span>
        </div>

        <div className="divider mx-3 my-2" />

        <nav className="flex-1 px-2 lg:px-3 py-2 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/app" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-[#7C6FEB]/12 text-[#F5F5F7]"
                    : "text-[#F5F5F7]/60 hover:text-[#F5F5F7] hover:bg-[#F5F5F7]/4"
                }`}
              >
                <item.icon size={16} className="shrink-0" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Assistant launcher (bottom) */}
        <div className="p-3 border-t border-[#F5F5F7]/6">
          <button
            onClick={() => setAssistantOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-br from-[#7C6FEB]/20 to-[#4B3DCC]/10 border border-[#7C6FEB]/30 text-[#F5F5F7] hover:from-[#7C6FEB]/30 hover:to-[#4B3DCC]/20 transition-all"
          >
            <Sparkles size={15} className="text-[#A89DF2] shrink-0" />
            <span className="hidden lg:inline text-[13px] font-medium">Ask Atlas</span>
          </button>
        </div>

        {/* Account strip */}
        <div className="p-3 border-t border-[#F5F5F7]/6">
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F5F5F7]/4 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center text-[10px] font-bold shrink-0">
              YC
            </div>
            <div className="flex-1 min-w-0 hidden lg:block">
              <p className="text-[12px] font-medium truncate">Your Client</p>
              <p className="text-[10px] text-[#F5F5F7]/45 truncate">Starter plan</p>
            </div>
            <ChevronDown size={13} className="text-[#F5F5F7]/40 hidden lg:block" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-[#F5F5F7]/6 flex items-center justify-between px-5 lg:px-8 bg-[#0A0B0E]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/40">Workspace</span>
            <span className="text-[13px] font-medium flex items-center gap-1">
              Your Project
              <ChevronDown size={13} className="text-[#F5F5F7]/45" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-[12px]">
              <Bell size={14} />
            </button>
            <button className="btn-secondary text-[12px]">
              Need help?
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Right drawer, Atlas assistant */}
      {assistantOpen && (
        <div className="w-[380px] shrink-0 border-l border-[#F5F5F7]/6 bg-[#0D0F13] flex flex-col">
          <div className="h-14 border-b border-[#F5F5F7]/6 flex items-center justify-between px-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center">
                <Sparkles size={13} className="text-white" />
              </div>
              <div>
                <p className="text-[13px] font-semibold leading-none">Atlas</p>
                <p className="text-[10px] text-[#F5F5F7]/45 mt-0.5">Your project assistant</p>
              </div>
            </div>
            <button onClick={() => setAssistantOpen(false)} className="btn-ghost text-[11px]">
              Close
            </button>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            <div className="bg-[#14161B] border border-[#F5F5F7]/6 rounded-xl p-4 text-[13px] text-[#F5F5F7]/75 leading-relaxed">
              Hi. I&apos;m Atlas, your project assistant. I know what your agent has built for you, what&apos;s pending, and what&apos;s in your files. Ask me anything about your project.
            </div>
          </div>
          <div className="p-4 border-t border-[#F5F5F7]/6">
            <input className="input" placeholder="Ask about your project..." />
          </div>
        </div>
      )}
    </div>
  );
}
