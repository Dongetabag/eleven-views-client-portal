"use client";

import { useMemo, useState, useTransition } from "react";
import {
  CREATOR_OPS_QUESTIONS,
  submitPulseAssessment,
  type PulsePlaybook,
} from "@/lib/pulse/assessment";
import "@/styles/pulse.css";

type Panel = "home" | "take" | "result" | "sponsor";

export default function PulseShell() {
  const [panel, setPanel] = useState<Panel>("home");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score100, setScore100] = useState<number | null>(null);
  const [playbook, setPlaybook] = useState<PulsePlaybook | null>(null);
  const [source, setSource] = useState<string>("");
  const [rowId, setRowId] = useState<string | undefined>();
  const [persisted, setPersisted] = useState(false);
  const [pending, startTransition] = useTransition();

  const progress = useMemo(
    () => `${Math.round((step / CREATOR_OPS_QUESTIONS.length) * 100)}%`,
    [step],
  );

  function pick(questionId: string, value: string) {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    if (step < CREATOR_OPS_QUESTIONS.length - 1) {
      setStep(step + 1);
      return;
    }
    startTransition(async () => {
      const out = await submitPulseAssessment(next);
      setScore100(out.score100);
      setPlaybook(out.playbook);
      setSource(out.source);
      setRowId(out.row_id);
      setPersisted(out.persisted);
      setPanel("result");
    });
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setScore100(null);
    setPlaybook(null);
    setSource("");
    setRowId(undefined);
    setPersisted(false);
    setPanel("take");
  }

  const q = CREATOR_OPS_QUESTIONS[step];

  return (
    <div className="pulse-page">
      <div className="pulse-phone">
        <div className="pulse-topbar">
          <div className="pulse-brand">
            <div className="pulse-mark" aria-hidden />
            <div>
              <h1>Pulse</h1>
              <p>creator_ops · cohort-only</p>
            </div>
          </div>
          <span className="pulse-chip">Member</span>
        </div>

        <div className="pulse-scroll">
          {panel === "home" && (
            <>
              <div className="pulse-hero">
                <h2>
                  Where does your content <em>leak</em>?
                </h2>
                <p>
                  Sponsors fund the brief. You get a watch → draft → remove order. Answers leave as
                  cohort scores, not your DMs.
                </p>
              </div>
              <div className="pulse-card">
                <div className="pulse-pill">
                  <i /> Live · asm_creator_ops_v1
                </div>
                <h3 style={{ marginTop: 12 }}>Unauthorized copies</h3>
                <p className="pulse-meta">
                  5 minutes · feeds Rightswatch pricing research · pii_level=cohort_only
                </p>
                <div className="pulse-xy">
                  <div className="box">
                    <span>If you</span> Name your top leak surface
                  </div>
                  <div className="arrow" aria-hidden>
                    →
                  </div>
                  <div className="box">
                    <span>You get</span> A ranked Creator Protect next step
                  </div>
                </div>
                <button className="pulse-btn" type="button" onClick={() => setPanel("take")}>
                  Start assessment
                </button>
              </div>
              <div className="pulse-card">
                <h3>Privacy</h3>
                <p className="pulse-meta" style={{ margin: 0 }}>
                  Nothing ships to a sponsor until Desk confirms the package. No email or handle in
                  the export.
                </p>
              </div>
            </>
          )}

          {panel === "take" && q && (
            <>
              <div className="pulse-hero">
                <h2>Assessment</h2>
                <p>
                  Locked pack <span className="pulse-mono">asm_creator_ops_v1</span>
                </p>
              </div>
              <div className="pulse-progress" style={{ ["--p" as string]: progress }}>
                <i />
              </div>
              <div className="pulse-card pulse-q">
                <label>{q.prompt}</label>
                <div className="pulse-opts">
                  {q.options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`pulse-opt${answers[q.id] === opt.id ? " on" : ""}`}
                      disabled={pending}
                      onClick={() => pick(q.id, opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {panel === "result" && playbook && score100 != null && (
            <>
              <div className="pulse-hero">
                <h2>Your order</h2>
                <p>
                  {playbook.score_label ?? "Ops readiness"} · source{" "}
                  <span className="pulse-mono">{source}</span>
                  {persisted ? " · saved" : " · local only"}
                </p>
              </div>
              <div className="pulse-card">
                <p className="pulse-meta">Readiness</p>
                <div className="pulse-score">{score100}</div>
              </div>
              <div className="pulse-card">
                <h3>If you</h3>
                <p className="pulse-meta">{playbook.if_x}</p>
                <h3 style={{ marginTop: 14 }}>You get</h3>
                <p className="pulse-meta">{playbook.then_y}</p>
                <h3 style={{ marginTop: 14 }}>Next</h3>
                <p className="pulse-meta">{playbook.next_step}</p>
                {rowId ? (
                  <p className="pulse-meta" style={{ marginTop: 12 }}>
                    row <span className="pulse-mono">{rowId}</span>
                  </p>
                ) : null}
                <button className="pulse-btn ghost" type="button" onClick={reset}>
                  Retake
                </button>
              </div>
            </>
          )}

          {panel === "sponsor" && (
            <>
              <div className="pulse-hero">
                <h2>Sponsor view</h2>
                <p>Cohort export stays blocked until Desk confirm.</p>
              </div>
              <div className="pulse-card">
                <h3>Launch packages (−40%)</h3>
                <p className="pulse-meta">Scout $1,500 · Protect $2,700 · Studio $10,800</p>
                <p className="pulse-meta" style={{ marginTop: 10 }}>
                  Build with <span className="pulse-mono">pulse-export.mjs --build --issue …</span>.
                  Download returns 403 until approval.
                </p>
              </div>
            </>
          )}
        </div>

        <nav className="pulse-nav" aria-label="Pulse">
          <button
            type="button"
            className={panel === "home" || panel === "take" || panel === "result" ? "on" : ""}
            onClick={() => setPanel("home")}
          >
            Member
          </button>
          <button type="button" className={panel === "take" ? "on" : ""} onClick={() => setPanel("take")}>
            Assess
          </button>
          <button
            type="button"
            className={panel === "sponsor" ? "on" : ""}
            onClick={() => setPanel("sponsor")}
          >
            Sponsor
          </button>
        </nav>
      </div>
    </div>
  );
}
