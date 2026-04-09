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
    .map((r) => `<li>${escapeHtml(r)}</li>`)
    .join("");
  const steps = check.result.nextSteps
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join("");
  const html = `<div style="margin-bottom:24px;padding:18px;border:1px solid #e5e5e5;border-radius:12px;"><p style="font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin:0 0 6px;">Check ${index + 1}: ${escapeHtml(check.systemName)}</p><h2 style="font-family:Arial,sans-serif;font-size:17px;color:#232323;margin:0 0 4px;">${escapeHtml(check.result.headline)}</h2><p style="font-family:Arial,sans-serif;font-size:13px;color:#666;margin:0 0 10px;"><strong>Risiconiveau:</strong> ${escapeHtml(check.result.badge)}</p><p style="font-family:Arial,sans-serif;font-size:13px;color:#444;line-height:1.5;margin:0 0 12px;">${escapeHtml(check.result.description)}</p><p style="font-family:Arial,sans-serif;font-size:12px;font-weight:600;color:#232323;margin:0 0 4px;">Waarom:</p><ul style="font-family:Arial,sans-serif;font-size:12px;color:#555;margin:0 0 12px;padding-left:16px;line-height:1.5;">${reasons}</ul><p style="font-family:Arial,sans-serif;font-size:12px;font-weight:600;color:#232323;margin:0 0 4px;">Volgende stappen:</p><ul style="font-family:Arial,sans-serif;font-size:12px;color:#555;margin:0;padding-left:16px;line-height:1.5;">${steps}</ul></div>`;

  if (html.length <= FIELD_CHAR_LIMIT) return html;

  // Truncate gracefully if it exceeds the limit
  return html.slice(0, FIELD_CHAR_LIMIT - 30) + "...</ul></div>";
}


function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
    const response = await fetch(MAILERLITE_PROXY, {
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
        groups: [GROUP_ID, RESULTS_GROUP_ID],
      }),
    });
    return response.ok;
  } catch (err) {
    console.warn("MailerLite results sync mislukt:", err);
    return false;
  }
}
