"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 600);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <Link href="/" className="flex items-center gap-2.5 mb-10">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center text-white font-bold text-[14px]">
          11
        </div>
        <span className="text-[16px] font-semibold tracking-tight">
          Eleven Views <span className="text-[#7C6FEB]">Portal</span>
        </span>
      </Link>

      <div className="card w-full max-w-[400px] p-8">
        {status === "sent" ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#4ADE80]/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={22} className="text-[#4ADE80]" />
            </div>
            <h1 className="text-xl font-medium mb-2">Check your inbox</h1>
            <p className="text-[13px] text-[#F5F5F7]/60 leading-relaxed mb-6">
              We sent a sign-in link to <strong className="text-white">{email}</strong>. Tap the link to open your portal.
            </p>
            <button onClick={() => { setStatus("idle"); setEmail(""); }} className="btn-ghost text-[12px]">
              Wrong email? Try again
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-medium mb-1.5">Sign in to your portal</h1>
            <p className="text-[13px] text-[#F5F5F7]/55 mb-6">
              Enter the email your Eleven Views agent used to set you up. We&apos;ll send a one-time sign-in link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F5F5F7]/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="input pl-10"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full py-3 text-[13px]"
              >
                {status === "sending" ? "Sending…" : <>Send sign-in link <ArrowRight size={14} /></>}
              </button>
            </form>

            <div className="divider my-6" />

            <p className="text-[11px] text-[#F5F5F7]/40 text-center leading-relaxed">
              Need a new portal?{" "}
              <Link href="/onboarding" className="text-[#7C6FEB] hover:text-[#A89DF2] font-medium">
                Start setup
              </Link>
              . Already set up?{" "}
              Ask your agent for the exact email they used.
            </p>
          </>
        )}
      </div>

      <p className="mt-6 text-[11px] text-[#F5F5F7]/30">
        Eleven Views · <Link href="/privacy" className="hover:text-[#F5F5F7]/55">Privacy</Link> · <Link href="/terms" className="hover:text-[#F5F5F7]/55">Terms</Link>
      </p>
    </main>
  );
}
