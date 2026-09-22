export type PulseQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
};

export type PulsePlaybook = {
  if_x: string;
  then_y: string;
  next_step: string;
  score_label?: string;
};

export const CREATOR_OPS_QUESTIONS: PulseQuestion[] = [
  {
    id: "leak_surface",
    prompt: "Where do unauthorized copies of your work show up most?",
    options: [
      { id: "reddit", label: "Reddit / forums" },
      { id: "tube", label: "YouTube / short video" },
      { id: "leak_hosts", label: "Paywalled leak / mirror sites" },
      { id: "social", label: "IG / X / Telegram reposts" },
    ],
  },
  {
    id: "volume",
    prompt: "Rough finds you care about per month?",
    options: [
      { id: "few", label: "0–2" },
      { id: "steady", label: "3–8" },
      { id: "heavy", label: "9–20" },
      { id: "flood", label: "20+" },
    ],
  },
  {
    id: "owner",
    prompt: "Who handles takedowns today?",
    options: [
      { id: "self", label: "I do it myself" },
      { id: "va", label: "VA / assistant" },
      { id: "lawyer", label: "Lawyer / agency" },
      { id: "nobody", label: "Nobody owns it" },
    ],
  },
  {
    id: "willingness",
    prompt: "What would you pay monthly for watch + draft (you still approve send)?",
    options: [
      { id: "0", label: "Nothing yet" },
      { id: "297", label: "About $297 (Scout)" },
      { id: "797", label: "About $797 (Protect)" },
      { id: "2497", label: "$2,497+ (Studio / roster)" },
    ],
  },
];

/** Local fallback when Pulse API is unreachable — mirrors heuristic in pulse-assessment. */
export function localScore(answers: Record<string, string>): {
  score100: number;
  playbook: PulsePlaybook;
  source: "local";
} {
  const leak = answers.leak_surface ?? "reddit";
  const volume = answers.volume ?? "few";
  const owner = answers.owner ?? "nobody";
  const will = Number(answers.willingness ?? 0);
  const urgencyMap: Record<string, number> = { few: 1, steady: 2, heavy: 2, flood: 3 };
  const urgency = urgencyMap[volume] ?? 1;
  let packageFit = "not_now";
  if (will >= 2497 || volume === "flood") packageFit = "studio";
  else if (will >= 797 || volume === "heavy") packageFit = "protect";
  else if (will >= 297 || volume === "steady" || owner === "nobody") packageFit = "scout";

  const surfaceLine: Record<string, string> = {
    reddit: "Start a Reddit-first public watch with evidence hashes",
    tube: "Add YouTube / short-form public match after Reddit baseline",
    leak_hosts:
      "Stay on public listings only; never log into leak hosts; document from the outside",
    social: "Watch public IG/X/Telegram mirrors with the same evidence hash flow",
  };
  const thenY: Record<string, string> = {
    scout: "You get 2 drafted takedown packets/mo without living in search tabs",
    protect: "You get multi-platform drafts + a monthly evidence pack buyers can trust",
    studio: "Your roster gets priority HITL + counsel-ready packets at volume",
    not_now: "You still leave with a surface-ranked order so the next find is not chaos",
  };
  const ready = packageFit !== "not_now" ? 0.72 : 0.35;
  const score100 = Math.round(
    Math.min(100, Math.max(20, (urgency / 3) * 55 + ready * 35 + 10)),
  );
  return {
    score100,
    source: "local",
    playbook: {
      if_x: surfaceLine[leak] ?? surfaceLine.reddit,
      then_y: thenY[packageFit] ?? thenY.scout,
      next_step:
        packageFit === "not_now"
          ? "Keep the order; revisit when finds hit 3+/mo"
          : `Quote Creator Protect ${packageFit} (Desk approval before any submit)`,
      score_label: packageFit === "not_now" ? "Watch later" : "Ops readiness",
    },
  };
}

export async function submitPulseAssessment(answers: Record<string, string>): Promise<{
  score100: number;
  playbook: PulsePlaybook;
  source: string;
  row_id?: string;
  persisted: boolean;
}> {
  const base = process.env.NEXT_PUBLIC_PULSE_API_BASE?.replace(/\/+$/, "");
  if (!base) {
    const local = localScore(answers);
    return { ...local, persisted: false };
  }
  try {
    const res = await fetch(`${base}/api/pulse/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers,
        member_opt_in: true,
        member_cohort: {
          segment: "creator",
          role: "creator",
          company_size_band: "solo",
          geo_band: "unknown",
        },
      }),
    });
    if (!res.ok) throw new Error(`submit ${res.status}`);
    const data = (await res.json()) as {
      score100: number;
      playbook: PulsePlaybook;
      source: string;
      row_id: string;
    };
    return {
      score100: data.score100,
      playbook: data.playbook,
      source: data.source,
      row_id: data.row_id,
      persisted: true,
    };
  } catch {
    const local = localScore(answers);
    return { ...local, persisted: false };
  }
}
