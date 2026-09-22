/**
 * Client-facing Creator Protect shapes.
 * Field names mirror Rightswatch / Jev observation contracts where possible
 * so a future Desk API adapter can drop in without renaming UI props.
 */

export type CreatorProtectTab = "home" | "findings" | "protect" | "privacy";

export type FindingPlatform = "reddit" | "web" | "youtube" | "spotify";

export type FindingStatus =
  | "draft_ready"
  | "watching"
  | "awaiting_you"
  | "in_progress"
  | "removed";

export type TimelineStepId = "found" | "approved" | "sent" | "removed";

export interface TimelineStep {
  id: TimelineStepId;
  label: string;
  detail: string;
  done: boolean;
}

export interface CreatorProtectFinding {
  id: string;
  /** Maps to `rightswatch.observation/v1` observationId */
  observationId: string;
  title: string;
  /** Non-technical client copy */
  summary: string;
  platform: FindingPlatform;
  /** 0–1 match confidence from triage */
  matchScore: number;
  status: FindingStatus;
  foundAt: string;
  /** Short public label, e.g. r/reuploads — never a private URL */
  sourceLabel: string;
  evidenceHash?: string;
  allowDraft: boolean;
  /** Desk submit stays blocked until human approval outside this UI */
  allowSubmit: false;
  timeline: TimelineStep[];
}

export interface PrivacyAlert {
  id: string;
  title: string;
  summary: string;
  status: "paused" | "clear";
  proof: string;
  confidence?: number;
}

export interface CreatorProtectPlan {
  name: string;
  monthlyUsd: number;
  removalsIncluded: number;
  extraUsd: number;
}

export interface CreatorProtectSnapshot {
  schema: "ev.creator_protect.client_snapshot/v1";
  protectionScore: number;
  watching: boolean;
  stats: {
    watchedThisWeek: number;
    readyToRemove: number;
    waitingOnYou: number;
    privacyAlerts: number;
  };
  plan: CreatorProtectPlan;
  findings: CreatorProtectFinding[];
  privacyAlerts: PrivacyAlert[];
  lastSafeConfidence: number;
}

export type DraftDecision = "approved" | "dismissed";
