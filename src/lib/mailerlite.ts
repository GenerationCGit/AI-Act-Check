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
    .slice(0, 3)
    .map((r) => `<li>${r}</li>`)
    .join("");
  const steps = check.result.nextSteps
    .slice(0, 3)
    .map((s) => `<li>${s}</li>`)
    .join("");
  const desc = check.result.description.slice(0, 200);

  return (
    `<p>Check ${index + 1}</p>` +
    `<h2>${check.systemName}</h2>` +
    `<p><strong>Risiconiveau:</strong> ${check.result.badge}</p>` +
    `<p>${desc}</p>` +
    `<p><strong>Waarom deze uitkomst?</strong></p>` +
    `<ul>${reasons}</ul>` +
    `<p><strong>Aanbevolen vervolgstappen</strong></p>` +
    `<ul>${steps}</ul>`
  ).slice(0, 1024);
}

export async function sendResultsToMailerLite(
  submission: Submission,
  checks: CompletedCheck[],
  imageUrl?: string
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
          ...(imageUrl ? { results_image_url: imageUrl } : {}),
        },
        groups: [GROUP_ID],
      }),
    });
    if (!fieldsResponse.ok) return false;

    // Wait briefly to ensure MailerLite has persisted the fields before the automation fires
    await new Promise((resolve) => setTimeout(resolve, 3000));

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
