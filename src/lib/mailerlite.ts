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

function formatChecksAsHtml(checks: CompletedCheck[]): string {
  return checks
    .map((check, index) => {
      const reasons = check.result.reasons
        .map((r) => `<li>${escapeHtml(r)}</li>`)
        .join("");
      const steps = check.result.nextSteps
        .map((s) => `<li>${escapeHtml(s)}</li>`)
        .join("");
      return `
<div style="margin-bottom:32px;padding:20px;border:1px solid #e5e5e5;border-radius:12px;">
  <p style="font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin:0 0 8px;">Check ${index + 1} — ${escapeHtml(check.systemName)}</p>
  <h2 style="font-family:Arial,sans-serif;font-size:18px;color:#232323;margin:0 0 4px;">${escapeHtml(check.result.headline)}</h2>
  <p style="font-family:Arial,sans-serif;font-size:13px;color:#666;margin:0 0 12px;"><strong>Risiconiveau:</strong> ${escapeHtml(check.result.badge)}</p>
  <p style="font-family:Arial,sans-serif;font-size:14px;color:#444;line-height:1.5;margin:0 0 16px;">${escapeHtml(check.result.description)}</p>
  <p style="font-family:Arial,sans-serif;font-size:13px;font-weight:600;color:#232323;margin:0 0 6px;">Waarom deze uitkomst:</p>
  <ul style="font-family:Arial,sans-serif;font-size:13px;color:#555;margin:0 0 16px;padding-left:18px;line-height:1.5;">${reasons}</ul>
  <p style="font-family:Arial,sans-serif;font-size:13px;font-weight:600;color:#232323;margin:0 0 6px;">Aanbevolen volgende stappen:</p>
  <ul style="font-family:Arial,sans-serif;font-size:13px;color:#555;margin:0;padding-left:18px;line-height:1.5;">${steps}</ul>
</div>`;
    })
    .join("");
}

function formatChecksAsText(checks: CompletedCheck[]): string {
  return checks
    .map((check, index) => {
      const reasons = check.result.reasons.map((r) => `  - ${r}`).join("\n");
      const steps = check.result.nextSteps.map((s) => `  - ${s}`).join("\n");
      return `Check ${index + 1}: ${check.systemName}
Risiconiveau: ${check.result.badge}
${check.result.headline}

${check.result.description}

Waarom deze uitkomst:
${reasons}

Volgende stappen:
${steps}`;
    })
    .join("\n\n―――――――――――――――――――\n\n");
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
    .join("\n");

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
          checks_html:        formatChecksAsHtml(checks),
          checks_text:        formatChecksAsText(checks),
          laatste_check_op:   new Date().toISOString(),
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
