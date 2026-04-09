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
  "infrastructure",
  "education",
  "employment",
  "essential-services",
  "law-enforcement",
  "migration",
  "justice",
]);

const PROHIBITED_FUNCTIONS = new Set([
  "subliminal",
  "vulnerable",
  "biometric-categorisation",
  "social-scoring",
  "predictive-policing",
  "facial-database",
  "emotion-work",
  "realtime-biometrics",
]);

const TRANSPARENCY_FUNCTIONS = new Set([
  "deepfake",
  "public-text",
  "emotion-biometric",
  "interacting",
  "synthetic-content",
]);

export function scoreAssessment(answers: Answers, _sector: string): AssessmentResult {
  const entiteit = getAnswer(answers, "entiteit");
  const aanpassingen = getMultiAnswer(answers, "aanpassingen");
  const reikwijdte = getMultiAnswer(answers, "reikwijdte");
  const verboden = getMultiAnswer(answers, "verboden");
  const gebied = getMultiAnswer(answers, "hoog-risico-gebied");
  const significantRisico = getAnswer(answers, "significant-risico");
  const transparantie = getMultiAnswer(answers, "transparantie");
  const aiLiteracy = getAnswer(answers, "ai-geletterdheid");
  const publiek = getAnswer(answers, "publiek");

  const isProvider = entiteit === "provider";
  const isDeployer = entiteit === "deployer";
  const becomesProvider = aanpassingen.some((a) => a !== "none");
  const inEUScope = reikwijdte.some((r) => r !== "none");
  const hasProhibited = verboden.some((v) => PROHIBITED_FUNCTIONS.has(v));
  const highRiskAreas = gebied.filter((g) => HIGH_RISK_AREAS.has(g));
  const isInHighRiskArea = highRiskAreas.length > 0;
  const hasTransparency = transparantie.some((t) => TRANSPARENCY_FUNCTIONS.has(t));
  const isPublicBody = publiek === "yes";

  const reasons: string[] = [];

  // ── Buiten reikwijdte ──
  if (!inEUScope) {
    reasons.push("Het systeem valt op basis van je antwoorden waarschijnlijk buiten de reikwijdte van de EU AI Act.");
    return buildResult("low", reasons, aiLiteracy);
  }

  // ── Verboden (Artikel 5) ──
  if (hasProhibited) {
    if (verboden.includes("subliminal"))
      reasons.push("Het systeem kan mensen onbewust of manipulatief beïnvloeden.");
    if (verboden.includes("vulnerable"))
      reasons.push("Het systeem maakt mogelijk misbruik van kwetsbaarheden van mensen.");
    if (verboden.includes("biometric-categorisation"))
      reasons.push("Het systeem deelt mensen in op basis van gevoelige kenmerken.");
    if (verboden.includes("social-scoring"))
      reasons.push("Het systeem geeft mensen een score op basis van gedrag of persoonlijke kenmerken.");
    if (verboden.includes("predictive-policing"))
      reasons.push("Voorspellend politiewerk op basis van persoonlijkheidsprofielen is verboden.");
    if (verboden.includes("facial-database"))
      reasons.push("Het ongericht bouwen van gezichtsherkenningsdatabases is verboden.");
    if (verboden.includes("emotion-work"))
      reasons.push("Emotieherkenning op de werkvloer of in het onderwijs is verboden.");
    if (verboden.includes("realtime-biometrics"))
      reasons.push("Real-time gezichtsherkenning in openbare ruimtes is verboden.");
    return buildResult("prohibited", reasons, aiLiteracy);
  }

  // ── Hoog risico (Annex III) ──
  if (isInHighRiskArea && significantRisico !== "no") {
    reasons.push(
      `Het systeem wordt ingezet in een gevoelig gebied: ${highRiskAreas.map(formatArea).join(", ")}.`
    );
    if (significantRisico === "yes") {
      reasons.push("Het systeem heeft een serieuze invloed op gezondheid, veiligheid of grondrechten.");
    } else {
      reasons.push("Het is niet zeker of het systeem een serieuze invloed heeft op personen.");
    }
    if (isProvider || becomesProvider) {
      reasons.push("Als aanbieder van een hoog-risico systeem gelden de verplichtingen uit Artikel 16.");
    } else if (isDeployer) {
      reasons.push("Als gebruiker van een hoog-risico systeem gelden de verplichtingen uit Artikel 26.");
    }
    if (isDeployer && isPublicBody) {
      reasons.push("Als publieke instantie moet je voor inzet een grondrechtentoets uitvoeren (Artikel 27).");
    }
    return buildResult("high", reasons, aiLiteracy);
  }

  // ── Aanpassingen maken jou tot aanbieder ──
  if (becomesProvider && !isProvider) {
    reasons.push("Door de aanpassingen aan het systeem word je onder Artikel 25 als aanbieder gezien.");
  }

  // ── Puntenscore voor overige gevallen ──
  let score = 0;

  if (isProvider) {
    score += 2;
    reasons.push("Als aanbieder van een AI-systeem gelden zwaardere verplichtingen.");
  }

  if (becomesProvider) {
    score += 2;
  }

  if (isInHighRiskArea && significantRisico === "no") {
    score += 1;
    reasons.push(
      `Het systeem wordt in een gevoelig gebied ingezet (${highRiskAreas.map(formatArea).join(", ")}), maar zonder serieuze impact op personen.`
    );
  }

  if (hasTransparency) {
    score += 2;
    if (transparantie.includes("interacting"))
      reasons.push("Gebruikers moeten weten dat ze met een AI-systeem te maken hebben (Artikel 50).");
    if (transparantie.includes("deepfake") || transparantie.includes("synthetic-content"))
      reasons.push("Gegenereerde of bewerkte content moet als AI-output worden gemarkeerd (Artikel 50).");
    if (transparantie.includes("emotion-biometric"))
      reasons.push("Bij emotieherkenning of biometrische indeling gelden transparantieverplichtingen.");
  }

  if (aiLiteracy === "no") {
    score += 2;
    reasons.push("Medewerkers hebben geen training of instructies ontvangen voor dit systeem (Artikel 4).");
  } else if (aiLiteracy === "partial") {
    score += 1;
    reasons.push("De AI-geletterdheid van medewerkers is beperkt (Artikel 4).");
  }

  // ── Categorie bepalen ──
  let category: RiskCategory;
  if (score >= 6) {
    category = "high";
  } else if (score >= 3) {
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
    infrastructure: "kritieke infrastructuur",
    education: "onderwijs",
    employment: "werving en selectie",
    "essential-services": "essentiële diensten",
    "law-enforcement": "rechtshandhaving",
    migration: "migratie",
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
  const uniqueReasons = [...new Set(reasons)].slice(0, 6);

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
