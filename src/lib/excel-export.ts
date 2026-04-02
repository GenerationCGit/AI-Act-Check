// NOTE: Submissions are currently persisted in localStorage.
// To swap in a real backend, replace getSubmissions() with an API call
// and remove the localStorage dependency from submission-store.ts.

import * as XLSX from "xlsx";
import { getSubmissions } from "./submission-store";

const COLUMNS = [
  { key: "id",             header: "Submission ID"          },
  { key: "datum",          header: "Datum"                  },
  { key: "tijd",           header: "Tijd"                   },
  { key: "name",           header: "Naam"                   },
  { key: "email",          header: "E-mailadres"            },
  { key: "companyName",    header: "Bedrijfsnaam"           },
  { key: "website",        header: "Website"                },
  { key: "sector",         header: "Sector"                 },
  { key: "companySize",    header: "Bedrijfsgrootte"        },
  { key: "aiUsageLevel",   header: "AI-gebruik score (1–10)"},
  { key: "aiSystemsUsed",  header: "Belangrijkste systemen" },
] as const;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

export function exportSubmissionsToExcel(): void {
  const submissions = getSubmissions();

  const rows = submissions.map((s) => ({
    id:            s.id,
    datum:         formatDate(s.submittedAt),
    tijd:          formatTime(s.submittedAt),
    name:          s.name,
    email:         s.email,
    companyName:   s.companyName,
    website:       s.website || "—",
    sector:        s.sector,
    companySize:   s.companySize,
    aiUsageLevel:  s.aiUsageLevel,
    aiSystemsUsed: s.aiSystemsUsed,
  }));

  const headers = COLUMNS.map((c) => c.header);
  const data = rows.map((row) => COLUMNS.map((c) => row[c.key]));

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

  // Bold header row
  const headerRange = XLSX.utils.decode_range(worksheet["!ref"] ?? "A1");
  for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!worksheet[cellRef]) continue;
    worksheet[cellRef].s = { font: { bold: true } };
  }

  // Freeze top row
  worksheet["!freeze"] = { xSplit: 0, ySplit: 1, topLeftCell: "A2", activePane: "bottomLeft" };

  // Column widths (approximate)
  worksheet["!cols"] = [
    { wch: 38 }, // Submission ID
    { wch: 12 }, // Datum
    { wch: 8  }, // Tijd
    { wch: 22 }, // Naam
    { wch: 28 }, // E-mailadres
    { wch: 24 }, // Bedrijfsnaam
    { wch: 28 }, // Website
    { wch: 28 }, // Sector
    { wch: 20 }, // Bedrijfsgrootte
    { wch: 20 }, // AI-gebruik score
    { wch: 40 }, // Belangrijkste systemen
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "AI Act Check Leads");

  const date = new Date().toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-");
  XLSX.writeFile(workbook, `AI-Act-Check-Leads-${date}.xlsx`);
}
