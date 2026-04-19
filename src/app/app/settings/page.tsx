export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-[700px]">
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/45 mb-2">Settings</p>
        <h1 className="text-[28px] font-normal tracking-tight">Your profile and preferences.</h1>
      </div>

      <section className="card p-6 mb-4">
        <h2 className="text-[14px] font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/55 mb-1.5 block">Name</span>
            <input className="input" defaultValue="Your Client" />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/55 mb-1.5 block">Email</span>
            <input className="input" defaultValue="you@example.com" />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-[#F5F5F7]/55 mb-1.5 block">Business</span>
            <input className="input" defaultValue="Your Company" />
          </label>
        </div>
      </section>

      <section className="card p-6 mb-4">
        <h2 className="text-[14px] font-semibold mb-4">Notifications</h2>
        <div className="space-y-3">
          {[
            { label: "Email me when my agent sends a new message", on: true },
            { label: "Email me when a new file is uploaded",        on: true  },
            { label: "Email me invoice and payment receipts",       on: true  },
            { label: "Weekly project digest from Atlas",            on: false },
          ].map((n, i) => (
            <label key={i} className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-[13px]">{n.label}</span>
              <span className={`relative w-10 h-6 rounded-full transition-colors ${n.on ? "bg-[#7C6FEB]" : "bg-[#F5F5F7]/12"}`}>
                <span className={`absolute top-0.5 ${n.on ? "right-0.5" : "left-0.5"} w-5 h-5 bg-white rounded-full transition-all`} />
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="card p-6 mb-4">
        <h2 className="text-[14px] font-semibold mb-4">Your agent</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C6FEB] to-[#4B3DCC] flex items-center justify-center text-[13px] font-bold">S</div>
            <div>
              <p className="text-[13px] font-medium">Simeon Reid</p>
              <p className="text-[11px] text-[#F5F5F7]/45">simeon@elevenviews.io</p>
            </div>
          </div>
          <button className="btn-secondary text-[12px]">Message</button>
        </div>
      </section>

      <section className="card p-6 border-[#F56565]/20">
        <h2 className="text-[14px] font-semibold mb-2 text-[#F56565]">Danger zone</h2>
        <p className="text-[12px] text-[#F5F5F7]/55 mb-4">
          Closing your portal removes your access and archives your files. Your agent is notified.
        </p>
        <button className="btn-secondary text-[12px] border-[#F56565]/30 text-[#F56565] hover:bg-[#F56565]/8">
          Close portal
        </button>
      </section>
    </div>
  );
}
