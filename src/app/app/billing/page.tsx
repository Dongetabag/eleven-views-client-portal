import { CreditCard, Download, Check } from "lucide-react";

const invoices = [
  { n: "0014", date: "Jan 12, 2026", amount: "$1,500", status: "Paid",    project: "Site build"   },
  { n: "0013", date: "Dec 02, 2025", amount: "$500",   status: "Paid",    project: "Branding refresh" },
  { n: "0012", date: "Nov 10, 2025", amount: "$1,000", status: "Paid",    project: "Site build (deposit)" },
];

export default function BillingPage() {
  return (
    <div className="p-6 lg:p-10 max-w-[1000px]">
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-2">Billing</p>
        <h1 className="text-[28px] font-normal tracking-tight">Your plan, invoices, and payment method.</h1>
      </div>

      {/* Current plan */}
      <div className="card p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="pill-accent mb-3">CURRENT PLAN</span>
            <h2 className="text-xl font-medium mb-1">Agency Tier</h2>
            <p className="text-[13px] text-[#F5F5F7]/55">
              $3,000 one-time · Site build + 2 rounds of revisions
            </p>
          </div>
          <button className="btn-secondary shrink-0">Upgrade</button>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 pt-4 border-t border-[#F5F5F7]/6">
          {["Up to 3 deliverables", "2 rounds of revisions", "Dedicated agent"].map((x) => (
            <div key={x} className="flex items-center gap-2 text-[12px] text-[#F5F5F7]/70">
              <Check size={13} className="text-[#7C6FEB]" />
              {x}
            </div>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F5F5F7]/5 flex items-center justify-center">
              <CreditCard size={16} className="text-[#F5F5F7]/60" />
            </div>
            <div>
              <p className="text-[13px] font-medium">Visa ending in 4242</p>
              <p className="text-[11px] text-[#F5F5F7]/45">Expires 12/27</p>
            </div>
          </div>
          <button className="btn-ghost text-[12px]">Update</button>
        </div>
      </div>

      {/* Invoices */}
      <h3 className="text-[14px] font-semibold mb-3">Invoice history</h3>
      <div className="card overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-[#F5F5F7]/6 text-[10px] uppercase tracking-widest text-[#F5F5F7]/45 font-semibold">
          <span>Invoice</span>
          <span>Amount</span>
          <span>Status</span>
          <span></span>
        </div>
        {invoices.map((inv, i) => (
          <div key={inv.n} className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3.5 items-center ${i > 0 ? "border-t border-[#F5F5F7]/6" : ""}`}>
            <div>
              <p className="text-[13px] font-medium">Invoice #{inv.n}</p>
              <p className="text-[11px] text-[#F5F5F7]/45">{inv.date} · {inv.project}</p>
            </div>
            <span className="text-[13px] font-medium">{inv.amount}</span>
            <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-[#4ADE80]/10 text-[#4ADE80]">
              {inv.status}
            </span>
            <button className="btn-ghost text-[11px]">
              <Download size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
