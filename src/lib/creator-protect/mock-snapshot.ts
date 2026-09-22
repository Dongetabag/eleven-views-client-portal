import type { CreatorProtectFinding, CreatorProtectSnapshot, TimelineStep } from "./types";

function baseTimeline(partial?: Partial<Record<TimelineStep["id"], boolean>>): TimelineStep[] {
  const done = { found: true, approved: false, sent: false, removed: false, ...partial };
  return [
    {
      id: "found",
      label: "Found",
      detail: "Public match captured and hashed.",
      done: done.found,
    },
    {
      id: "approved",
      label: "You approved",
      detail: "Draft notice confirmed in-app.",
      done: done.approved,
    },
    {
      id: "sent",
      label: "Sent to platform",
      detail: "Waiting on host response.",
      done: done.sent,
    },
    {
      id: "removed",
      label: "Removed",
      detail: "We will ping you when it clears.",
      done: done.removed,
    },
  ];
}

const FINDINGS: CreatorProtectFinding[] = [
  {
    id: "find_reddit_mirror",
    observationId: "obs_demo_reddit_mirror",
    title: "Reddit reupload",
    summary: "Public post matches one of your saved works. Draft notice is ready.",
    platform: "reddit",
    matchScore: 0.88,
    status: "draft_ready",
    foundAt: new Date(Date.now() - 14 * 60_000).toISOString(),
    sourceLabel: "r/reuploads",
    evidenceHash: "a".repeat(64),
    allowDraft: true,
    allowSubmit: false,
    timeline: baseTimeline(),
  },
  {
    id: "find_web_gallery",
    observationId: "obs_demo_web_gallery",
    title: "Lookalike gallery page",
    summary: "Same image fingerprints as Work Set A. Commercial page with ads on the open web.",
    platform: "web",
    matchScore: 0.92,
    status: "draft_ready",
    foundAt: new Date(Date.now() - 3 * 60 * 60_000).toISOString(),
    sourceLabel: "web gallery",
    evidenceHash: "b".repeat(64),
    allowDraft: true,
    allowSubmit: false,
    timeline: baseTimeline(),
  },
  {
    id: "find_yt_mirror",
    observationId: "obs_demo_yt_mirror",
    title: "YouTube reupload",
    summary: "Public upload matches your work set. Copyright draft template is ready for your OK.",
    platform: "youtube",
    matchScore: 0.86,
    status: "draft_ready",
    foundAt: new Date(Date.now() - 9 * 60 * 60_000).toISOString(),
    sourceLabel: "YouTube",
    evidenceHash: "c".repeat(64),
    allowDraft: true,
    allowSubmit: false,
    timeline: baseTimeline(),
  },
  {
    id: "find_yt_weak",
    observationId: "obs_demo_yt_weak",
    title: "Weak name hit",
    summary: "Similar title only across search. We are watching, not drafting yet.",
    platform: "youtube",
    matchScore: 0.34,
    status: "watching",
    foundAt: new Date(Date.now() - 26 * 60 * 60_000).toISOString(),
    sourceLabel: "YouTube",
    allowDraft: false,
    allowSubmit: false,
    timeline: baseTimeline({ found: true }),
  },
];

/** Demo snapshot — swap for Desk/Rightswatch adapter later. */
export function getMockCreatorProtectSnapshot(): CreatorProtectSnapshot {
  return {
    schema: "ev.creator_protect.client_snapshot/v1",
    protectionScore: 85,
    watching: true,
    stats: {
      watchedThisWeek: 12,
      readyToRemove: FINDINGS.filter((f) => f.allowDraft).length,
      waitingOnYou: FINDINGS.filter((f) => f.status === "draft_ready" || f.status === "awaiting_you")
        .length,
      privacyAlerts: 1,
    },
    plan: {
      name: "Scout",
      monthlyUsd: 297,
      removalsIncluded: 2,
      extraUsd: 149,
    },
    findings: FINDINGS,
    privacyAlerts: [
      {
        id: "priv_secret_exfil",
        title: "Secret leave check",
        summary:
          "Automation tried to send sensitive material out. We blocked it and logged a proof note.",
        status: "paused",
        proof: "Proof · FAIL secret-exfil",
        confidence: 0.41,
      },
      {
        id: "priv_goal_ok",
        title: "Goal stay-on-track",
        summary: "Latest task stayed inside your project goal.",
        status: "clear",
        proof: "Proof · OK goal alignment",
        confidence: 0.93,
      },
    ],
    lastSafeConfidence: 0.93,
  };
}

export function formatRelativeTime(iso: string, now = Date.now()): string {
  const delta = Math.max(0, now - new Date(iso).getTime());
  const mins = Math.floor(delta / 60_000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function platformLabel(platform: CreatorProtectFinding["platform"]): string {
  switch (platform) {
    case "reddit":
      return "Reddit";
    case "web":
      return "Web";
    case "youtube":
      return "YouTube";
    case "spotify":
      return "Spotify";
    default:
      return platform;
  }
}

export function statusBadge(status: CreatorProtectFinding["status"]): {
  label: string;
  hot?: boolean;
} {
  switch (status) {
    case "draft_ready":
      return { label: "Draft ready", hot: true };
    case "awaiting_you":
      return { label: "Needs you", hot: true };
    case "in_progress":
      return { label: "In progress", hot: true };
    case "removed":
      return { label: "Removed" };
    case "watching":
    default:
      return { label: "Watching" };
  }
}

/** Apply an in-app draft approval — never marks submit. */
export function approveFindingDraft(
  snapshot: CreatorProtectSnapshot,
  findingId: string,
): CreatorProtectSnapshot {
  const findings = snapshot.findings.map((f) => {
    if (f.id !== findingId || !f.allowDraft) return f;
    return {
      ...f,
      status: "in_progress" as const,
      timeline: f.timeline.map((step) =>
        step.id === "found" || step.id === "approved" ? { ...step, done: true } : step,
      ),
    };
  });
  return recount(snapshot, findings);
}

export function dismissFindingDraft(
  snapshot: CreatorProtectSnapshot,
  findingId: string,
): CreatorProtectSnapshot {
  const findings = snapshot.findings.map((f) => {
    if (f.id !== findingId) return f;
    return {
      ...f,
      status: "watching" as const,
      allowDraft: false,
    };
  });
  return recount(snapshot, findings);
}

function recount(
  snapshot: CreatorProtectSnapshot,
  findings: CreatorProtectFinding[],
): CreatorProtectSnapshot {
  return {
    ...snapshot,
    findings,
    stats: {
      ...snapshot.stats,
      readyToRemove: findings.filter((f) => f.allowDraft && f.status === "draft_ready").length,
      waitingOnYou: findings.filter(
        (f) => f.status === "draft_ready" || f.status === "awaiting_you",
      ).length,
    },
  };
}
