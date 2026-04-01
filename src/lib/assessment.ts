import type { Answers, AssessmentResult, RiskCategory } from "./types";

function getAnswer(answers: Answers, id: string): string {
  const val = answers[id];
  return typeof val === "string" ? val : "";
}

function getMultiAnswer(answers: Answers, id: string): string[] {
  const val = answers[id];
  return Array.isArray(val) ? val : [];
}

/** Maps intake sector strings to high-risk flag */
const HIGH_RISK_SECTORS = new Set([
  "HR / recruitment",
  "Financiële dienstverlening",
  "Zorg",
  "Overheid / publieke dienstverlening",
  "Onderwijs",
]);

const HIGH_IMPACT_ACCESS = new Set([
  "employment",
  "credit",
  "education",
  "healthcare",
  "government",
  "safety",
]);

export function scoreAssessment(answers: Answers, sector: string): AssessmentResult {
  const purposes = getMultiAnswer(answers, "purpose");
  const affectsPeople = getAnswer(answers, "affects-people");
  const accessImpact = getMultiAnswer(answers, "access-impact");
  const personalData = getAnswer(answers, "personal-data");
  const biometric = getAnswer(answers, "biometric");
  const humanOversight = getAnswer(answers, "human-oversight");
  const aiLiteracy = getAnswer(answers, "ai-literacy");
  const explainability = getAnswer(answers, "explainability");
  const riskSignals = getMultiAnswer(answers, "risk-signals");

  const hasVulnerable = riskSignals.includes("vulnerable");
  const hasBehavior = riskSignals.includes("behavior");
  const isHighRiskSector = HIGH_RISK_SECTORS.has(sector);

  const hasMonitor = purposes.includes("monitor");
  const hasClassify = purposes.includes("classify");
  const hasAutomate = purposes.includes("automate-decisions");
  const hasSupport = purposes.includes("support-decisions");

  const reasons: string[] = [];

  // ── Prohibited checks ──
  // Biometrics + monitoring/classification
  if (biometric === "yes" && (hasMonitor || hasClassify)) {
    reasons.push("Het systeem gebruikt biometrische gegevens voor monitoring of classificatie.");
    reasons.push("Biometrische surveillance kan onder de verboden categorieën van de AI Act vallen.");
    return buildResult("prohibited", reasons, aiLiteracy);
  }

  // Behavior steering + vulnerable groups
  if (hasBehavior && hasVulnerable) {
    reasons.push("Het systeem beïnvloedt gedrag en raakt kwetsbare groepen.");
    reasons.push("Deze combinatie kan onder de verboden categorieën van de AI Act vallen.");
    return buildResult("prohibited", reasons, aiLiteracy);
  }

  // Classification/scoring in sensitive sectors
  if (hasClassify && isHighRiskSector) {
    reasons.push("Het systeem scoort of classificeert personen in een gevoelig domein.");
    reasons.push("Dit kan kenmerken vertonen van verboden sociale scoring.");
    return buildResult("prohibited", reasons, aiLiteracy);
  }

  // ── Hard triggers for high risk ──
  const affectsPeopleAtAll = affectsPeople === "yes" || affectsPeople === "partial";

  // No or partial human oversight
  if (humanOversight === "no") {
    reasons.push("Er is geen menselijke controle ingericht.");
    return buildResult("high", reasons, aiLiteracy);
  }
  if (humanOversight === "partial") {
    reasons.push("Menselijke controle is slechts gedeeltelijk ingericht.");
    return buildResult("high", reasons, aiLiteracy);
  }

  // No or partial AI literacy
  if (aiLiteracy === "no") {
    reasons.push("Medewerkers hebben geen richtlijnen of training ontvangen voor het gebruik van AI.");
    return buildResult("high", reasons, aiLiteracy);
  }
  if (aiLiteracy === "partial") {
    reasons.push("Er zijn beperkte richtlijnen voor het verantwoord gebruik van AI binnen de organisatie.");
    return buildResult("high", reasons, aiLiteracy);
  }

  // Automates decisions + any impact on people
  if (hasAutomate && affectsPeopleAtAll) {
    reasons.push("De AI automatiseert beslissingen die invloed hebben op personen.");
    return buildResult("high", reasons, aiLiteracy);
  }

  // High-risk sector + any impact on people
  if (isHighRiskSector && affectsPeopleAtAll) {
    reasons.push("De AI wordt ingezet in een gevoelig domein met invloed op personen.");
    return buildResult("high", reasons, aiLiteracy);
  }

  // Personal data + not or partially explainable
  if (personalData === "yes" && (explainability === "no" || explainability === "partial")) {
    reasons.push("De AI verwerkt persoonsgegevens maar is niet of nauwelijks uitlegbaar.");
    return buildResult("high", reasons, aiLiteracy);
  }

  // ── Point-based scoring ──
  let score = 0;

  // Sector risk
  if (isHighRiskSector) {
    score += 3;
    reasons.push("De sector valt onder een domein met verhoogd risico.");
  }

  // Purpose risk (cumulative — multiple purposes stack)
  if (hasAutomate) {
    score += 4;
    reasons.push("Het systeem automatiseert beslissingen.");
  }
  if (hasClassify) {
    score += 3;
    reasons.push("Het systeem classificeert of scoort personen.");
  }
  if (hasMonitor) {
    score += 3;
    reasons.push("Het systeem monitort personen of gedrag.");
  }
  if (hasSupport) {
    score += 1;
  }

  // Affects people (Q2)
  if (affectsPeople === "yes") {
    score += 3;
    reasons.push("Het systeem heeft invloed op beslissingen over personen.");
  } else if (affectsPeople === "partial") {
    score += 1;
  }

  // Access impact (Q3)
  const impactfulAccess = accessImpact.filter((a) => HIGH_IMPACT_ACCESS.has(a));
  if (impactfulAccess.length > 0) {
    score += Math.min(impactfulAccess.length * 2, 6);
    reasons.push("De toepassing raakt toegang tot werk, zorg of andere essentiële diensten.");
  }

  // Personal data (Q4)
  if (personalData === "yes") {
    score += 1;
    reasons.push("Het systeem verwerkt persoonsgegevens.");
  }

  // Biometric data (Q5)
  if (biometric === "yes") {
    score += 4;
    reasons.push("Er worden biometrische gegevens gebruikt.");
  } else if (biometric === "unsure") {
    score += 1;
  }

  // Explainability (Q8)
  if (explainability === "no") {
    score += 2;
    reasons.push("Het systeem is niet of moeilijk uitlegbaar.");
  } else if (explainability === "partial") {
    score += 1;
  }

  // Risk signals (Q9)
  if (hasVulnerable) {
    score += 3;
    reasons.push("Het systeem heeft impact op kwetsbare personen of groepen.");
  }
  if (hasBehavior) {
    score += 2;
    reasons.push("Het systeem probeert gedrag van mensen te beïnvloeden.");
  }
  if (riskSignals.includes("unsure")) {
    score += 1;
  }

  // ── Determine category ──
  let category: RiskCategory;
  if (score >= 14) {
    category = "high";
  } else if (score >= 7) {
    category = "medium";
  } else {
    category = "low";
  }

  return buildResult(category, reasons, aiLiteracy);
}

// ── Result copy & next steps ──

const RESULT_COPY: Record<RiskCategory, { badge: string; headline: string; description: string }> = {
  low: {
    badge: "Laag risico",
    headline: "Waarschijnlijk geen high-risk AI",
    description:
      "Op basis van je antwoorden lijkt dit AI-systeem waarschijnlijk niet onder de high-risk categorie van de EU AI Act te vallen.",
  },
  medium: {
    badge: "Aandacht vereist",
    headline: "Aanvullende beoordeling aanbevolen",
    description:
      "Op basis van je antwoorden zijn er signalen dat deze AI-toepassing nader beoordeeld moet worden.",
  },
  high: {
    badge: "Hoog risico",
    headline: "Waarschijnlijk high-risk AI",
    description:
      "Op basis van je antwoorden lijkt dit AI-systeem waarschijnlijk onder een hogere risicocategorie van de EU AI Act te vallen.",
  },
  prohibited: {
    badge: "Direct beoordelen",
    headline: "Let op: mogelijk verboden toepassing",
    description:
      "Op basis van je antwoorden zijn er duidelijke signalen dat deze toepassing onder de EU AI Act ernstige risico's of verboden kenmerken kan hebben.",
  },
};

const BASE_NEXT_STEPS: Record<RiskCategory, string[]> = {
  low: [
    "Leg je use case en menselijke controle kort vast",
    "Blijf monitoren of de toepassing zwaardere impact krijgt",
    "Controleer periodiek of de inzet verandert",
  ],
  medium: [
    "Beoordeel de use case uitgebreider",
    "Controleer de rol van menselijke controle",
    "Breng uitlegbaarheid en documentatie op orde",
    "Laat de toepassing intern of extern reviewen",
  ],
  high: [
    "Toets de toepassing aan de eisen van de EU AI Act",
    "Versterk menselijke controle",
    "Richt documentatie, logging en governance in",
    "Onderzoek datakwaliteit en bias-risico's",
    "Neem een juridische of compliance review op",
  ],
  prohibited: [
    "Pauzeer of heroverweeg de toepassing direct",
    "Laat de use case juridisch en inhoudelijk toetsen",
    "Onderzoek of biometrie, scoring of gedragsbeïnvloeding problematisch wordt ingezet",
    "Herontwerp de toepassing waar nodig",
  ],
};

const AI_LITERACY_NEXT_STEPS = [
  "Zorg voor duidelijke AI-richtlijnen voor medewerkers",
  "Train medewerkers in verantwoord gebruik van AI",
  "Maak afspraken over datagebruik en privacy bij AI-tools",
  "Leg vast hoe AI-output gecontroleerd moet worden",
];

function buildResult(category: RiskCategory, reasons: string[], aiLiteracy: string): AssessmentResult {
  const copy = RESULT_COPY[category];
  const uniqueReasons = [...new Set(reasons)].slice(0, 5);

  if (uniqueReasons.length === 0) {
    uniqueReasons.push("Er zijn geen duidelijke hoog-risico indicatoren gevonden.");
  }

  const baseSteps = BASE_NEXT_STEPS[category];
  const nextSteps =
    aiLiteracy === "no" || aiLiteracy === "partial"
      ? [...AI_LITERACY_NEXT_STEPS, ...baseSteps]
      : baseSteps;

  return {
    category,
    badge: copy.badge,
    headline: copy.headline,
    description: copy.description,
    reasons: uniqueReasons,
    nextSteps,
  };
}
