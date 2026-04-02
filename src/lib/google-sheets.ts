// Google Sheets integration via Apps Script web app.
// Set VITE_GOOGLE_SHEETS_URL in your .env file to enable.
// See README or setup instructions for how to deploy the Apps Script.

import type { Submission } from "./submission-store";

const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;

export async function sendToGoogleSheets(submission: Submission): Promise<void> {
  if (!APPS_SCRIPT_URL) {
    console.warn("Google Sheets URL not configured (VITE_GOOGLE_SHEETS_URL).");
    return;
  }

  try {
    // no-cors is required because Apps Script doesn't return CORS headers.
    // The request still goes through and the row is appended — we just can't read the response.
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(submission),
    });
  } catch (err) {
    console.warn("Google Sheets sync failed:", err);
  }
}
