"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  approveFindingDraft,
  dismissFindingDraft,
  formatRelativeTime,
  getMockCreatorProtectSnapshot,
  platformLabel,
  statusBadge,
} from "@/lib/creator-protect/mock-snapshot";
import type {
  CreatorProtectFinding,
  CreatorProtectSnapshot,
  CreatorProtectTab,
} from "@/lib/creator-protect/types";
import "@/styles/creator-protect.css";

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

function FindingCard({
  finding,
  onOpen,
}: {
  finding: CreatorProtectFinding;
  onOpen: (f: CreatorProtectFinding) => void;
}) {
  const badge = statusBadge(finding.status);
  const pct = Math.round(finding.matchScore * 100);
  return (
    <button type="button" className="cp-card" onClick={() => onOpen(finding)}>
      <div className="cp-card-row">
        <h4>{finding.title}</h4>
        <span className={`cp-badge${badge.hot ? " is-hot" : ""}`}>{badge.label}</span>
      </div>
      <p>{finding.summary}</p>
      <div className="cp-progress" aria-hidden="true">
        <i style={{ "--w": `${pct}%` } as CSSProperties} />
      </div>
      <div className="cp-meta">
        <span>Match {pct}%</span>
        <span>{platformLabel(finding.platform)}</span>
      </div>
    </button>
  );
}

function CaseSheet({
  finding,
  onClose,
  onApprove,
  onDismiss,
}: {
  finding: CreatorProtectFinding;
  onClose: () => void;
  onApprove: () => void;
  onDismiss: () => void;
}) {
  const badge = statusBadge(finding.status);
  const pct = Math.round(finding.matchScore * 100);
  const canApprove = finding.allowDraft && finding.status === "draft_ready";

  return (
    <div className="cp-sheet" role="dialog" aria-modal="true" aria-labelledby="cp-sheet-title">
      <div className="cp-sheet-scrim" onClick={onClose} aria-hidden="true" />
      <div className="cp-sheet-panel">
        <div className="cp-sheet-handle" aria-hidden="true" />
        <div className="cp-card-row">
          <h2 id="cp-sheet-title">{finding.title}</h2>
          <span className={`cp-badge${badge.hot ? " is-hot" : ""}`}>{badge.label}</span>
        </div>
        <p className="cp-page-copy" style={{ marginTop: 8 }}>
          {finding.summary}
        </p>
        <div className="cp-meta" style={{ marginTop: 12 }}>
          <span>Match {pct}%</span>
          <span>{finding.sourceLabel}</span>
          <span>{formatRelativeTime(finding.foundAt)}</span>
        </div>
        {finding.evidenceHash ? (
          <p className="cp-hash cp-mono">Evidence · {finding.evidenceHash.slice(0, 12)}…</p>
        ) : null}

        <div className="cp-timeline" style={{ marginTop: 16 }}>
          {finding.timeline.map((step) => (
            <div key={step.id} className={`cp-step${step.done ? " is-done" : ""}`}>
              <div className="cp-step-dot" />
              <div>
                <h4>{step.label}</h4>
                <p>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="cp-sheet-note">
          Nothing is sent to a platform until you confirm — and Desk still approves the final
          submit.
        </p>

        <div className="cp-sheet-actions">
          {canApprove ? (
            <>
              <button type="button" className="cp-btn cp-btn-primary" onClick={onApprove}>
                Approve draft
              </button>
              <button type="button" className="cp-btn cp-btn-ghost" onClick={onDismiss}>
                Keep watching
              </button>
            </>
          ) : (
            <button type="button" className="cp-btn cp-btn-ghost" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreatorProtectDashboard({
  initialTab = "home",
  initialSnapshot,
}: {
  initialTab?: CreatorProtectTab;
  /** Injected snapshot for tests / future server fetch */
  initialSnapshot?: CreatorProtectSnapshot;
}) {
  const [tab, setTab] = useState<CreatorProtectTab>(initialTab);
  const [snapshot, setSnapshot] = useState<CreatorProtectSnapshot>(
    () => initialSnapshot ?? getMockCreatorProtectSnapshot(),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = useMemo(
    () => snapshot.findings.find((f) => f.id === selectedId) ?? null,
    [snapshot.findings, selectedId],
  );

  const needsYou = useMemo(
    () =>
      snapshot.findings.filter(
        (f) => f.status === "draft_ready" || f.status === "awaiting_you",
      ),
    [snapshot.findings],
  );

  const activeCase = useMemo(
    () => snapshot.findings.find((f) => f.status === "in_progress") ?? snapshot.findings[0],
    [snapshot.findings],
  );

  const go = useCallback((next: CreatorProtectTab) => {
    setTab(next);
    setSelectedId(null);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const openFinding = useCallback((f: CreatorProtectFinding) => {
    setSelectedId(f.id);
  }, []);

  useEffect(() => {
    replayEnter(phoneRef.current);
  }, [tab]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const score = snapshot.protectionScore;
  const ringStyle = {
    "--cp-score": String(score),
  } as CSSProperties;

  return (
    <div className="cp-root">
      <div className="cp-stage">
        <Link href="/app" className="cp-back">
          ← Portal
        </Link>
        <div className="cp-phone" ref={phoneRef} aria-label="Creator Protect mobile dashboard">
          <div className={`cp-toast${toast ? " is-show" : ""}`} role="status">
            {toast ?? "Draft ready for your approval. Nothing is sent until you confirm."}
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
              <span className="cp-dot" aria-hidden="true" />{" "}
              {snapshot.watching ? "Watching" : "Paused"}
            </div>
          </header>

          <main className="cp-scroll">
            <section className={`cp-view${tab === "home" ? " is-active" : ""}`} data-view="home">
              <div className="cp-hero">
                <div className="cp-hero-top">
                  <div>
                    <p className="cp-eyebrow">Your protection</p>
                    <h2>
                      {needsYou.length === 0
                        ? "All clear for now"
                        : `${needsYou.length} thing${needsYou.length === 1 ? "" : "s"} need a look`}
                    </h2>
                  </div>
                  <div
                    className="cp-ring-wrap"
                    style={ringStyle}
                    aria-label={`Protection score ${score}`}
                  >
                    <svg viewBox="0 0 84 84" aria-hidden="true">
                      <circle className="cp-ring-bg" cx="42" cy="42" r="36" />
                      <circle className="cp-ring-fg" cx="42" cy="42" r="36" />
                    </svg>
                    <div className="cp-ring-label">
                      <div>
                        <strong>{score}</strong>
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
                    <strong className="cp-mono">{snapshot.stats.watchedThisWeek}</strong>
                    <span>Watched this week</span>
                  </div>
                  <div className="cp-tile">
                    <strong className="cp-mono">{snapshot.stats.readyToRemove}</strong>
                    <span>Ready to remove</span>
                  </div>
                  <div className="cp-tile">
                    <strong className="cp-mono">{snapshot.stats.waitingOnYou}</strong>
                    <span>Waiting on you</span>
                  </div>
                  <div className="cp-tile">
                    <strong className="cp-mono">{snapshot.stats.privacyAlerts}</strong>
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
                  {needsYou.length === 0 ? (
                    <article className="cp-card">
                      <div className="cp-card-row">
                        <h4>Nothing waiting</h4>
                        <span className="cp-badge">Clear</span>
                      </div>
                      <p>New public matches will show up here when they need your OK.</p>
                    </article>
                  ) : (
                    needsYou.slice(0, 2).map((f) => {
                      const badge = statusBadge(f.status);
                      return (
                        <button
                          key={f.id}
                          type="button"
                          className="cp-card"
                          onClick={() => openFinding(f)}
                        >
                          <div className="cp-card-row">
                            <h4>{f.title}</h4>
                            <span className={`cp-badge${badge.hot ? " is-hot" : ""}`}>
                              {f.matchScore >= 0.8 ? "High match" : badge.label}
                            </span>
                          </div>
                          <p>{f.summary}</p>
                          <div className="cp-meta">
                            <span>Found {formatRelativeTime(f.foundAt)}</span>
                            <span className="cp-mono">{f.sourceLabel}</span>
                          </div>
                        </button>
                      );
                    })
                  )}
                  {snapshot.privacyAlerts
                    .filter((a) => a.status === "paused")
                    .slice(0, 1)
                    .map((a) => (
                      <article key={a.id} className="cp-card">
                        <div className="cp-card-row">
                          <h4>Agent privacy check</h4>
                          <span className="cp-badge">Needs review</span>
                        </div>
                        <p>{a.summary}</p>
                        <div className="cp-meta">
                          {typeof a.confidence === "number" ? (
                            <span>Confidence {a.confidence.toFixed(2)}</span>
                          ) : null}
                          <span>Blocked</span>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            </section>

            <section
              className={`cp-view${tab === "findings" ? " is-active" : ""}`}
              data-view="findings"
            >
              <div className="cp-section" style={{ animationDelay: "120ms" }}>
                <p className="cp-eyebrow">Findings</p>
                <h2 className="cp-page-title">What we found</h2>
                <p className="cp-page-copy">
                  Plain language. No jargon. Tap a card to prepare a removal request.
                </p>
              </div>
              <div className="cp-section" style={{ animationDelay: "200ms" }}>
                <div className="cp-stack">
                  {snapshot.findings.map((f) => (
                    <FindingCard key={f.id} finding={f} onOpen={openFinding} />
                  ))}
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
              {activeCase ? (
                <div className="cp-section" style={{ animationDelay: "220ms" }}>
                  <button
                    type="button"
                    className="cp-card"
                    style={{ textAlign: "left", width: "100%" }}
                    onClick={() => openFinding(activeCase)}
                  >
                    <div className="cp-card-row">
                      <h4>Case · {activeCase.title}</h4>
                      <span
                        className={`cp-badge${statusBadge(activeCase.status).hot ? " is-hot" : ""}`}
                      >
                        {statusBadge(activeCase.status).label}
                      </span>
                    </div>
                    <div className="cp-timeline" style={{ marginTop: 8 }}>
                      {activeCase.timeline.map((step) => (
                        <div key={step.id} className={`cp-step${step.done ? " is-done" : ""}`}>
                          <div className="cp-step-dot" />
                          <div>
                            <h4>{step.label}</h4>
                            <p>{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </button>
                </div>
              ) : null}
              <div className="cp-section" style={{ animationDelay: "320ms" }}>
                <div className="cp-section-head">
                  <h3>Plan</h3>
                </div>
                <div className="cp-card">
                  <div className="cp-card-row">
                    <div>
                      <h4>{snapshot.plan.name}</h4>
                      <p>
                        ${snapshot.plan.monthlyUsd} / month · {snapshot.plan.removalsIncluded}{" "}
                        removals included
                      </p>
                    </div>
                    <span className="cp-badge">Active</span>
                  </div>
                  <button type="button" className="cp-btn cp-btn-ghost" style={{ marginTop: 4 }}>
                    Add a removal · ${snapshot.plan.extraUsd}
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
                    <strong className="cp-mono">{snapshot.lastSafeConfidence.toFixed(2)}</strong>
                    <span>Last safe run</span>
                  </div>
                  <div className="cp-tile">
                    <strong className="cp-mono">
                      {snapshot.privacyAlerts.filter((a) => a.status === "paused").length}
                    </strong>
                    <span>Paused for you</span>
                  </div>
                </div>
              </div>
              <div className="cp-section" style={{ animationDelay: "300ms" }}>
                <div className="cp-stack">
                  {snapshot.privacyAlerts.map((a) => (
                    <article key={a.id} className="cp-card">
                      <div className="cp-card-row">
                        <h4>{a.title}</h4>
                        <span className={`cp-badge${a.status === "paused" ? " is-hot" : ""}`}>
                          {a.status === "paused" ? "Paused" : "Clear"}
                        </span>
                      </div>
                      <p>{a.summary}</p>
                      <div className="cp-meta">
                        <span>{a.proof}</span>
                      </div>
                    </article>
                  ))}
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

          {selected ? (
            <CaseSheet
              finding={selected}
              onClose={() => setSelectedId(null)}
              onApprove={() => {
                setSnapshot((s) => approveFindingDraft(s, selected.id));
                setSelectedId(null);
                showToast("Draft approved. Nothing is sent until Desk confirms submit.");
                setTab("protect");
              }}
              onDismiss={() => {
                setSnapshot((s) => dismissFindingDraft(s, selected.id));
                setSelectedId(null);
                showToast("Kept watching. No notice drafted.");
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
