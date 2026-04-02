import type { Submission } from "./submission-store";

const MAILERLITE_TOKEN = import.meta.env.VITE_MAILERLITE_TOKEN as string | undefined;
const GROUP_ID = "183640504839178201"; // AI Act Check Leads

export async function sendToMailerLite(submission: Submission): Promise<void> {
  if (!MAILERLITE_TOKEN) {
    console.warn("MailerLite token niet ingesteld (VITE_MAILERLITE_TOKEN).");
    return;
  }

  try {
    await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILERLITE_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
