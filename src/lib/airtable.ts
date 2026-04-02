import type { Submission } from "./submission-store";

const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN as string | undefined;
const BASE_ID = "appTCu08K3lI4QHvz";
const TABLE_ID = "tblFQWmGXoLkuuRVA";

export async function sendToAirtable(submission: Submission): Promise<void> {
  if (!AIRTABLE_TOKEN) {
    console.warn("Airtable token niet ingesteld (VITE_AIRTABLE_TOKEN).");
    return;
  }

  try {
    await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Naam":                  submission.name,
              "E-mailadres":           submission.email,
              "Bedrijfsnaam":          submission.companyName,
              "Website":               submission.website || "",
              "Sector":                submission.sector,
              "Bedrijfsgrootte":       submission.companySize,
              "AI-gebruik score":      submission.aiUsageLevel,
              "Belangrijkste systemen": submission.aiSystemsUsed,
              "Ingediend op":          submission.submittedAt,
              "Submission ID":         submission.id,
            },
          },
        ],
      }),
    });
  } catch (err) {
    console.warn("Airtable sync mislukt:", err);
  }
}
