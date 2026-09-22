"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "@/styles/creator-protect.css";

export type CreatorProtectTab = "home" | "findings" | "protect" | "privacy";

const TABS: { id: CreatorProtectTab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "findings", label: "Finds" },
  { id: "protect", label: "Remove" },
  { id: "privacy", label: "Privacy" },
];

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5 6v6c0 5 3.5 8.5 7 9 3.5-.5 7-4 7-9V6l-7-3z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

const ICONS: Record<CreatorProtectTab, () => ReactNode> = {
  home: IconHome,
  findings: IconSearch,
  protect: IconShield,
  privacy: IconLock,
};

function replayEnter(root: HTMLElement | null) {
  if (!root) return;
  root.querySelectorAll<HTMLElement>(".cp-section, .cp-tile, .cp-hero").forEach((el) => {
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  });
}

export default function CreatorProtectDashboard({
  initialTab = "home",
}: {
  initialTab?: CreatorProtectTab;
}) {
  const [tab, setTab] = useState<CreatorProtectTab>(initialTab);
  const [toast, setToast] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: CreatorProtectTab) => {
    setTab(next);
  }, []);

  useEffect(() => {
    replayEnter(phoneRef.current);
  }, [tab]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = () => {
    setToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(false), 2800);
  };

  return (
    <div className="cp-root">
      <div className="cp-stage">
        <Link href="/app" className="cp-back">
          ← Portal
        </Link>
        <div className="cp-phone" ref={phoneRef} aria-label="Creator Protect mobile dashboard">
          <div className={`cp-toast${toast ? " is-show" : ""}`} role="status">
            Draft ready for your approval. Nothing is sent until you confirm.
          </div>

          <header className="cp-topbar">
            <div className="cp-brand">
              <div className="cp-mark" aria-hidden="true" />
              <div>
                <h1>Creator Protect</h1>
                <p>Eleven Views</p>
              </div>
            </div>
            <div className="cp-pill">
              <span className="cp-dot" aria-hidden="true" /> Watching
            </div>
          </header>

          <main className="cp-scroll">
            <section className={`cp-view${tab === "home" ? " is-active" : ""}`} data-view="home">
              <div className="cp-hero">
                <div className="cp-hero-top">
                  <div>
                    <p className="cp-eyebrow">Your protection</p>
                    <h2>3 things need a look</h2>
                  </div>
                  <div className="cp-ring-wrap" aria-label="Protection score 85">
                    <svg viewBox="0 0 84 84" aria-hidden="true">
                      <circle className="cp-ring-bg" cx="42" cy="42" r="36" />
                      <circle className="cp-ring-fg" cx="42" cy="42" r="36" />
                    </svg>
                    <div className="cp-ring-label">
                      <div>
                        <strong>85</strong>
                        <span>score</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="cp-hero-copy">
                  We found matches on public sites and prepared next steps. You stay in control of
                  every removal.
                </p>
                <div className="cp-actions">
                  <button type="button" className="cp-btn cp-btn-primary" onClick={() => go("findings")}>
                    Review finds
                  </button>
                  <button type="button" className="cp-btn cp-btn-ghost" onClick={() => go("protect")}>
                    Track removals
                  </button>
                </div>
              </div>

              <div className="cp-section">
                <div className="cp-tiles">
                  <div className="cp-tile">
                    <strong className="cp-mono">12</strong>
                    <span>Watched this week</span>
                  </div>
                  <div className="cp-tile">
                    <strong className="cp-mono">3</strong>
                    <span>Ready to remove</span>
                  </div>
                  <div className="cp-tile">
                    <strong className="cp-mono">2</strong>
                    <span>Waiting on you</span>
                  </div>
                  <div className="cp-tile">
                    <strong className="cp-mono">1</strong>
                    <span>Privacy alerts</span>
                  </div>
                </div>
              </div>

              <div className="cp-section">
                <div className="cp-section-head">
                  <h3>Needs you</h3>
                  <button type="button" onClick={() => go("findings")}>
                    See all
                  </button>
                </div>
                <div className="cp-stack">
                  <button type="button" className="cp-card" onClick={showToast}>
                    <div className="cp-card-row">
                      <h4>Reddit reupload</h4>
                      <span className="cp-badge is-hot">High match</span>
                    </div>
                    <p>Public post matches one of your saved works. Draft notice is ready.</p>
                    <div className="cp-meta">
                      <span>Found 14m ago</span>
                      <span className="cp-mono">r/…</span>
                    </div>
                  </button>
                  <article className="cp-card">
                    <div className="cp-card-row">
                      <h4>Agent privacy check</h4>
                      <span className="cp-badge">Needs review</span>
                    </div>
                    <p>A connected automation tried a sensitive step. We paused it for you.</p>
                    <div className="cp-meta">
                      <span>Confidence 0.41</span>
                      <span>Blocked</span>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            <section className={`cp-view${tab === "findings" ? " is-active" : ""}`} data-view="findings">
              <div className="cp-section" style={{ animationDelay: "120ms" }}>
                <p className="cp-eyebrow">Findings</p>
                <h2 className="cp-page-title">What we found</h2>
                <p className="cp-page-copy">
                  Plain language. No jargon. Tap a card to prepare a removal request.
                </p>
              </div>
              <div className="cp-section" style={{ animationDelay: "200ms" }}>
                <div className="cp-stack">
                  <button type="button" className="cp-card" onClick={showToast}>
                    <div className="cp-card-row">
                      <h4>Lookalike gallery page</h4>
                      <span className="cp-badge is-hot">Draft ready</span>
                    </div>
                    <p>Same image fingerprints as Work Set A. Commercial page with ads.</p>
                    <div className="cp-progress" aria-hidden="true">
                      <i style={{ "--w": "92%" } as CSSProperties} />
                    </div>
                    <div className="cp-meta">
                      <span>Match 92%</span>
                      <span>Web</span>
                    </div>
                  </button>
                  <button type="button" className="cp-card" onClick={showToast}>
                    <div className="cp-card-row">
                      <h4>Reddit mirror</h4>
                      <span className="cp-badge is-hot">Draft ready</span>
                    </div>
                    <p>Caption and frame match. Public subreddit. Notice prepared for your OK.</p>
                    <div className="cp-progress" aria-hidden="true">
                      <i style={{ "--w": "88%" } as CSSProperties} />
                    </div>
                    <div className="cp-meta">
                      <span>Match 88%</span>
                      <span>Reddit</span>
                    </div>
                  </button>
                  <article className="cp-card">
                    <div className="cp-card-row">
                      <h4>Weak name hit</h4>
                      <span className="cp-badge">Watching</span>
                    </div>
                    <p>Similar title only. We are watching, not drafting yet.</p>
                    <div className="cp-progress" aria-hidden="true">
                      <i style={{ "--w": "34%" } as CSSProperties} />
                    </div>
                    <div className="cp-meta">
                      <span>Match 34%</span>
                      <span>YouTube</span>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            <section className={`cp-view${tab === "protect" ? " is-active" : ""}`} data-view="protect">
              <div className="cp-section" style={{ animationDelay: "120ms" }}>
                <p className="cp-eyebrow">Removals</p>
                <h2 className="cp-page-title">Removal timeline</h2>
                <p className="cp-page-copy">
                  Every step stays visible. Nothing leaves without your confirm.
                </p>
              </div>
              <div className="cp-section" style={{ animationDelay: "220ms" }}>
                <div className="cp-card">
                  <div className="cp-card-row">
                    <h4>Case · Reddit mirror</h4>
                    <span className="cp-badge is-hot">In progress</span>
                  </div>
                  <div className="cp-timeline" style={{ marginTop: 8 }}>
                    <div className="cp-step is-done">
                      <div className="cp-step-dot" />
                      <div>
                        <h4>Found</h4>
                        <p>Public match captured and hashed.</p>
                      </div>
                    </div>
                    <div className="cp-step is-done">
                      <div className="cp-step-dot" />
                      <div>
                        <h4>You approved</h4>
                        <p>Draft notice confirmed in-app.</p>
                      </div>
                    </div>
                    <div className="cp-step">
                      <div className="cp-step-dot" />
                      <div>
                        <h4>Sent to platform</h4>
                        <p>Waiting on host response.</p>
                      </div>
                    </div>
                    <div className="cp-step">
                      <div className="cp-step-dot" />
                      <div>
                        <h4>Removed</h4>
                        <p>We will ping you when it clears.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cp-section" style={{ animationDelay: "320ms" }}>
                <div className="cp-section-head">
                  <h3>Plan</h3>
                </div>
                <div className="cp-card">
                  <div className="cp-card-row">
                    <div>
                      <h4>Scout</h4>
                      <p>$297 / month · 2 removals included</p>
                    </div>
                    <span className="cp-badge">Active</span>
                  </div>
                  <button type="button" className="cp-btn cp-btn-ghost" style={{ marginTop: 4 }}>
                    Add a removal · $149
                  </button>
                </div>
              </div>
            </section>

            <section className={`cp-view${tab === "privacy" ? " is-active" : ""}`} data-view="privacy">
              <div className="cp-section" style={{ animationDelay: "120ms" }}>
                <p className="cp-eyebrow">Privacy</p>
                <h2 className="cp-page-title">Agent guardrails</h2>
                <p className="cp-page-copy">
                  Live confidence before any big AI step. If something looks off, we stop and ask
                  you.
                </p>
              </div>
              <div className="cp-section" style={{ animationDelay: "220ms" }}>
                <div className="cp-tiles">
                  <div className="cp-tile">
                    <strong className="cp-mono">0.93</strong>
                    <span>Last safe run</span>
                  </div>
                  <div className="cp-tile">
                    <strong className="cp-mono">1</strong>
                    <span>Paused for you</span>
                  </div>
                </div>
              </div>
              <div className="cp-section" style={{ animationDelay: "300ms" }}>
                <div className="cp-stack">
                  <article className="cp-card">
                    <div className="cp-card-row">
                      <h4>Secret leave check</h4>
                      <span className="cp-badge is-hot">Paused</span>
                    </div>
                    <p>
                      Automation tried to send sensitive material out. We blocked it and logged a
                      proof note.
                    </p>
                    <div className="cp-meta">
                      <span>Proof · FAIL secret-exfil</span>
                    </div>
                  </article>
                  <article className="cp-card">
                    <div className="cp-card-row">
                      <h4>Goal stay-on-track</h4>
                      <span className="cp-badge">Clear</span>
                    </div>
                    <p>Latest task stayed inside your project goal.</p>
                    <div className="cp-meta">
                      <span>Proof · OK goal alignment</span>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </main>

          <nav className="cp-nav" aria-label="Primary">
            {TABS.map((t) => {
              const Icon = ICONS[t.id];
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={active ? "is-active" : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => go(t.id)}
                >
                  <Icon />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
