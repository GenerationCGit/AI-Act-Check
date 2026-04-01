import type { Question } from "../lib/types";

export const questions: Question[] = [
  // — Block 1: Use & function —
  {
    id: "purpose",
    title: "Waarvoor wordt de AI gebruikt?",
    type: "multi",
    helperText: "Selecteer alles wat van toepassing is.",
    options: [
      { id: "support-decisions", label: "Ondersteunen van beslissingen" },
      { id: "recommendations", label: "Aanbevelingen doen" },
      { id: "automate-decisions", label: "Beslissingen automatiseren" },
      { id: "monitor", label: "Personen of gedrag monitoren" },
      { id: "classify", label: "Personen classificeren of scoren" },
      { id: "other", label: "Anders" },
    ],
  },

  // — Block 2: Impact on people —
  {
    id: "affects-people",
    title: "Heeft de AI invloed op beslissingen over personen?",
    type: "single",
    options: [
      { id: "yes", label: "Ja" },
      { id: "partial", label: "Gedeeltelijk" },
      { id: "no", label: "Nee" },
    ],
  },
  {
    id: "access-impact",
    title: "Kan de AI invloed hebben op toegang tot belangrijke zaken?",
    type: "multi",
    helperText: "Selecteer alles wat van toepassing is.",
    options: [
      { id: "employment", label: "Werk of sollicitaties" },
      { id: "credit", label: "Krediet of verzekering" },
      { id: "education", label: "Onderwijs" },
      { id: "healthcare", label: "Zorg" },
      { id: "government", label: "Overheidsdiensten" },
      { id: "safety", label: "Openbare veiligheid" },
      { id: "none", label: "Geen van bovenstaande" },
    ],
  },

  // — Block 3: Data & risk signals —
  {
    id: "personal-data",
    title: "Worden er persoonsgegevens gebruikt door de AI?",
    type: "single",
    options: [
      { id: "yes", label: "Ja" },
      { id: "no", label: "Nee" },
      { id: "unsure", label: "Niet zeker" },
    ],
  },
  {
    id: "biometric",
    title: "Gebruikt de AI biometrische gegevens, zoals gezicht, stem of vingerafdruk?",
    type: "single",
    options: [
      { id: "yes", label: "Ja" },
      { id: "no", label: "Nee" },
      { id: "unsure", label: "Niet zeker" },
    ],
  },

  // — Block 4: Control & transparency —
  {
    id: "human-oversight",
    title: "Is er menselijke controle voordat de AI belangrijke beslissingen neemt?",
    type: "single",
    options: [
      { id: "yes", label: "Ja" },
      { id: "partial", label: "Gedeeltelijk" },
      { id: "no", label: "Nee" },
    ],
  },
  {
    id: "ai-literacy",
    title: "Hebben medewerkers duidelijke richtlijnen of training gekregen voor het gebruik van AI?",
    type: "single",
    helperText: "Denk aan instructies over privacy, datagebruik, risico's en hoe AI-output geïnterpreteerd moet worden.",
    options: [
      { id: "yes", label: "Ja" },
      { id: "partial", label: "Gedeeltelijk" },
      { id: "no", label: "Nee" },
    ],
  },
  {
    id: "explainability",
    title: "Kun je uitleggen hoe de AI tot een uitkomst of beslissing komt?",
    type: "single",
    options: [
      { id: "yes", label: "Ja" },
      { id: "partial", label: "Gedeeltelijk" },
      { id: "no", label: "Nee" },
    ],
  },

  // — Block 5: Red flags —
  {
    id: "risk-signals",
    title: "Heeft de AI impact op kwetsbare personen of probeert het gedrag van mensen te sturen?",
    type: "multi",
    helperText: "Denk aan bijvoorbeeld kinderen, ouderen of mensen in afhankelijke posities.",
    options: [
      { id: "vulnerable", label: "Impact op kwetsbare groepen" },
      { id: "behavior", label: "Stuurt of beïnvloedt gedrag" },
      { id: "none", label: "Geen van bovenstaande" },
      { id: "unsure", label: "Niet zeker" },
    ],
  },
];
