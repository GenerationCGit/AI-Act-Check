import type { Answers, AssessmentResult, RiskCategory } from "./types";

function getAnswer(answers: Answers, id: string): string {
  const val = answers[id];
  return typeof val === "string" ? val : "";
}

function getMultiAnswer(answers: Answers, id: string): string[] {
  const val = answers[id];
  return Array.isArray(val) ? val : [];
}

const HIGH_RISK_AREAS = new Set([
  "biometrics",
  "education",
  "employment",
  "financial",
  "essential-services",
  "law-enforcement",
  "migration",
  "infrastructure",
  "justice",
]);

const PROHIBITED_FUNCTIONS = new Set([
  "subliminal",
  "social-scoring",
  "realtime-biometrics",
  "emotion-work",
]);

const TRANSPARENCY_FUNCTIONS = new Set([
  "chatbot",
  "synthetic-content",
  "emotion-biometric",
]);

export function scoreAssessment(answers: Answers, sector: string): AssessmentResult {
  const rol = getAnswer(answers, "rol");
  const verboden = getMultiAnswer(answers, "verboden-functies");
  const gebied = getMultiAnswer(answers, "hoog-risico-gebied");
  const invloedPersonen = getAnswer(answers, "invloed-personen");
  const persoonsgegevens = getAnswer(answers, "persoonsgegevens");
  const toezicht = getAnswer(answers, "menselijk-toezicht");
  const transparantie = getMultiAnswer(answers, "transparantie");
  const aiLiteracy = getAnswer(answers, "ai-geletterdheid");

  const isProvider = rol === "provider";
  const hasProhibited = verboden.some((v) => PROHIBITED_FUNCTIONS.has(v));
  const highRiskAreas = gebied.filter((g) => HIGH_RISK_AREAS.has(g));
  const isInHighRiskArea = highRiskAreas.length > 0;
  const affectsPersons = invloedPersonen === "yes" || invloedPersonen === "partial";
  const hasTransparency = transparantie.some((t) => TRANSPARENCY_FUNCTIONS.has(t));

  const reasons: string[] = [];

  // ── Prohibited check (Article 5) ──
  if (hasProhibited) {
    if (verboden.includes("subliminal"))
      reasons.push("Het systeem kan mensen onbewust of manipulatief beïnvloeden.");
    if (verboden.includes("social-scoring"))
      reasons.push("Het systeem scoort of beoordeelt mensen op basis van gedrag of persoonlijkheid.");
    if (verboden.includes("realtime-biometrics"))
      reasons.push("Real-time gezichtsherkenning in openbare ruimtes is verboden onder de EU AI Act.");
    if (verboden.includes("emotion-work"))
      reasons.push("Emotieherkenning op de werkvloer of in het onderwijs is verboden.");
    return buildResult("prohibited", reasons, aiLiteracy);
  }

  // ── Hard triggers voor hoog risico ──

  // Geen menselijk toezicht
  if (toezicht === "no") {
    reasons.push("Er is geen menselijke controle ingericht voordat het systeem actie onderneemt.");
    return buildResult("high", reasons, aiLiteracy);
  }

  // Hoog-risico gebied + directe invloed op personen
  if (isInHighRiskArea && invloedPersonen === "yes") {
    reasons.push(`Het systeem heeft directe invloed op personen in een gevoelig gebied: ${highRiskAreas.map(formatArea).join(", ")}.`);
    return buildResult("high", reasons, aiLiteracy);
  }

  // Provider zonder AI-geletterdheid
  if (isProvider && aiLiteracy === "no") {
    reasons.push("Als aanbieder van een AI-systeem ben je verplicht AI-geletterdheid te borgen (Artikel 4).");
    return buildResult("high", reasons, aiLiteracy);
  }

  // Geen AI-geletterdheid bij hoog-risico gebied
  if (isInHighRiskArea && aiLiteracy === "no") {
    reasons.push("Er zijn geen instructies of training voor medewerkers bij een gevoelige toepassing.");
    return buildResult("high", reasons, aiLiteracy);
  }

  // ── Puntenscore voor overige gevallen ──
  let score = 0;

  if (isProvider) {
    score += 2;
    reasons.push("Als aanbieder van een AI-systeem gelden zwaardere verplichtingen.");
  }

  if (isInHighRiskArea) {
    score += highRiskAreas.length * 2;
    reasons.push(`Het systeem wordt ingezet in een gevoelig gebied: ${highRiskAreas.map(formatArea).join(", ")}.`);
  }

  if (invloedPersonen === "yes") {
    score += 3;
    reasons.push("Het systeem heeft directe invloed op beslissingen over personen.");
  } else if (invloedPersonen === "partial") {
    score += 1;
    reasons.push("Het systeem ondersteunt beslissingen over personen.");
  }

  if (persoonsgegevens === "yes") {
    score += 1;
    reasons.push("Het systeem verwerkt persoonsgegevens.");
  } else if (persoonsgegevens === "unsure") {
    score += 1;
    reasons.push("Het is onduidelijk of het systeem persoonsgegevens verwerkt.");
  }

  if (toezicht === "partial") {
    score += 2;
    reasons.push("Menselijk toezicht is niet altijd gewaarborgd.");
  }

  if (hasTransparency) {
    score += 2;
    reasons.push("Het systeem heeft transparantieverplichtingen onder Artikel 50 van de EU AI Act.");
  }

  if (aiLiteracy === "no") {
    score += 2;
    reasons.push("Medewerkers hebben geen instructies of training ontvangen voor dit systeem.");
  } else if (aiLiteracy === "partial") {
    score += 1;
    reasons.push("De AI-geletterdheid van medewerkers is beperkt.");
  }

  // ── Categorie bepalen ──
  let category: RiskCategory;
  if (score >= 9) {
    category = "high";
  } else if (score >= 4) {
    category = "medium";
  } else {
    category = "low";
  }

  return buildResult(category, reasons, aiLiteracy);
}

// ── Labels voor hoog-risico gebieden ──
function formatArea(id: string): string {
  const labels: Record<string, string> = {
    biometrics: "biometrie",
    education: "onderwijs",
    employment: "werving en selectie",
    financial: "financiële diensten",
    "essential-services": "essentiële diensten",
    "law-enforcement": "rechtshandhaving",
    migration: "migratie",
    infrastructure: "kritieke infrastructuur",
    justice: "rechtspraak",
  };
  return labels[id] ?? id;
}

// ── Resultaatteksten ──
const RESULT_COPY: Record<RiskCategory, { badge: string; headline: string; description: string }> = {
  low: {
    badge: "Laag risico",
    headline: "Waarschijnlijk geen hoog-risico AI",
    description:
      "Op basis van je antwoorden lijkt dit AI-systeem waarschijnlijk niet onder de hoog-risico categorie van de EU AI Act te vallen. Er kunnen wel lichtere verplichtingen gelden, zoals transparantie of AI-geletterdheid.",
  },
  medium: {
    badge: "Aandacht vereist",
    headline: "Aanvullende beoordeling aanbevolen",
    description:
      "Er zijn signalen dat dit systeem nader beoordeeld moet worden. Het valt mogelijk onder lichtere verplichtingen of bevindt zich op de grens van hoog risico.",
  },
  high: {
    badge: "Hoog risico",
    headline: "Waarschijnlijk hoog-risico AI",
    description:
      "Op basis van je antwoorden lijkt dit AI-systeem onder de hoog-risico categorie van de EU AI Act te vallen. Dat betekent dat er strenge eisen gelden voor documentatie, toezicht en governance.",
  },
  prohibited: {
    badge: "Direct beoordelen",
    headline: "Let op: mogelijk verboden toepassing",
    description:
      "Er zijn kenmerken die kunnen wijzen op een verboden toepassing onder Artikel 5 van de EU AI Act. Laat dit direct toetsen door een juridisch of compliance expert.",
  },
};

const BASE_NEXT_STEPS: Record<RiskCategory, string[]> = {
  low: [
    "Leg kort vast waarvoor het systeem wordt gebruikt en wie er verantwoordelijk voor is",
    "Controleer of het systeem transparantieverplichtingen heeft (bijv. chatbot-melding)",
    "Houd bij of de toepassing verandert en beoordeel dan opnieuw",
  ],
  medium: [
    "Beoordeel of het systeem in een hoog-risico categorie valt (Annex III van de EU AI Act)",
    "Versterk het menselijk toezicht op de uitkomsten van het systeem",
    "Leg de use case en verantwoordelijkheden vast in een document",
    "Overweeg een interne of externe compliance review",
  ],
  high: [
    "Toets het systeem aan de eisen van de EU AI Act voor hoog-risico AI (Artikel 16 of 26)",
    "Richt menselijk toezicht, logging en documentatie in",
    "Voer een risicobeoordeling en eventueel een grondrechtentoets uit",
    "Stel een verantwoordelijke aan voor AI-compliance binnen de organisatie",
    "Laat de toepassing juridisch of door een compliance expert reviewen",
  ],
  prohibited: [
    "Pauzeer of heroverweeg de toepassing direct",
    "Laat de use case toetsen door een juridisch of compliance expert",
    "Onderzoek of aanpassingen de toepassing buiten de verboden categorie brengen",
    "Documenteer je beoordeling voor het geval toezichthouders vragen stellen",
  ],
};

const AI_LITERACY_NEXT_STEPS = [
  "Zorg voor duidelijke instructies voor medewerkers over wat het systeem doet en hoe ze de uitkomst moeten interpreteren",
  "Train medewerkers in verantwoord gebruik van AI, privacy en risico's",
  "Leg vast hoe AI-uitkomsten worden gecontroleerd en gedocumenteerd",
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
