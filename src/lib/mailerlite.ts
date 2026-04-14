import type { Submission } from "./submission-store";
import type { AssessmentResult } from "./types";

const MAILERLITE_PROXY = "https://ai-act-check-mailerlite-proxy.nora-f83.workers.dev/";
const GROUP_ID = "183640504839178201"; // AI Act Check Leads
const RESULTS_GROUP_ID = "184264998552340413"; // AI Act Check — Results sent (trigger automation)

export interface CompletedCheck {
  systemName: string;
  result: AssessmentResult;
  completedAt: string;
}

export async function sendToMailerLite(submission: Submission): Promise<void> {
  try {
    await fetch(MAILERLITE_PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: submission.email,
        fields: {
          name:             submission.name,
          company:          submission.companyName,
          website:          submission.website || "",
          sector:           submission.sector,
          bedrijfsgrootte:  submission.companySize,
          ai_gebruik_score: submission.aiUsageLevel,
          ai_systemen:      submission.aiSystemsUsed,
        },
        groups: [GROUP_ID],
      }),
    });
  } catch (err) {
    console.warn("MailerLite sync mislukt:", err);
  }
}

const MAX_CHECKS_IN_EMAIL = 5;
const FIELD_CHAR_LIMIT = 1024;

function formatSingleCheckAsHtml(check: CompletedCheck, index: number): string {
  const reasons = check.result.reasons
    .map((r) => `<li style="margin-bottom:6px;">${r}</li>`)
    .join("");
  const steps = check.result.nextSteps
    .map((s) => `<li style="margin-bottom:6px;">${s}</li>`)
    .join("");

  return (
    `<p style="font-family:Arial,sans-serif;font-size:13px;color:#888;margin:0 0 2px;text-transform:uppercase;letter-spacing:1px;">Check ${index + 1}</p>` +
    `<h2 style="font-family:Arial,sans-serif;font-size:18px;color:#232323;margin:0 0 4px;">${check.systemName}</h2>` +
    `<p style="font-family:Arial,sans-serif;font-size:14px;color:#232323;margin:0 0 12px;"><strong>Risiconiveau:</strong> ${check.result.badge}</p>` +
    `<p style="font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.6;margin:0 0 16px;">${check.result.description}</p>` +
    `<p style="font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#232323;margin:0 0 6px;">Waarom deze uitkomst?</p>` +
    `<ul style="font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.6;margin:0 0 16px;padding-left:20px;">${reasons}</ul>` +
    `<p style="font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#232323;margin:0 0 6px;">Aanbevolen vervolgstappen</p>` +
    `<ul style="font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.6;margin:0 0 32px;padding-left:20px;">${steps}</ul>`
  );
}

export async function sendResultsToMailerLite(
  submission: Submission,
  checks: CompletedCheck[]
): Promise<boolean> {
  if (checks.length === 0) return false;

  const summary = checks
    .map((c, i) => `${i + 1}. ${c.systemName} — ${c.result.badge}`)
    .join("\n")
    .slice(0, FIELD_CHAR_LIMIT);

  // Build per-check fields. Only the first MAX_CHECKS_IN_EMAIL are sent.
  const checkFields: Record<string, string> = {};
  for (let i = 0; i < MAX_CHECKS_IN_EMAIL; i++) {
    const check = checks[i];
    checkFields[`check_${i + 1}_html`] = check ? formatSingleCheckAsHtml(check, i) : "";
  }

  try {
    // Step 1: save fields first (without triggering automation)
    const fieldsResponse = await fetch(MAILERLITE_PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: submission.email,
        fields: {
          name:               submission.name,
          company:            submission.companyName,
          aantal_checks:      checks.length,
          checks_overzicht:   summary,
          ...checkFields,
          laatste_check_op:   new Date().toISOString().slice(0, 10),
        },
        groups: [GROUP_ID],
      }),
    });
    if (!fieldsResponse.ok) return false;

    // Step 2: add to results group — triggers automation only after fields are saved
    const triggerResponse = await fetch(MAILERLITE_PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: submission.email,
        groups: [RESULTS_GROUP_ID],
      }),
    });
    return triggerResponse.ok;
  } catch (err) {
    console.warn("MailerLite results sync mislukt:", err);
    return false;
  }
}
