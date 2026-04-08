import type { Question } from "../lib/types";

export const questions: Question[] = [
  // — 1. Rol van de organisatie —
  {
    id: "rol",
    title: "Wat is de rol van jouw organisatie bij dit AI-systeem?",
    type: "single",
    helperText: "Kies de omschrijving die het beste past.",
    options: [
      {
        id: "deployer",
        label: "Wij gebruiken een systeem dat iemand anders heeft gemaakt (bijv. ChatGPT, Copilot of branchesoftware)",
      },
      {
        id: "provider",
        label: "Wij hebben het systeem zelf (laten) bouwen en bieden het aan anderen aan",
      },
      {
        id: "distributor",
        label: "Wij verkopen of distribueren AI-systemen van anderen",
      },
    ],
  },

  // — 2. Verboden functies (Article 5) —
  {
    id: "verboden-functies",
    title: "Voert het AI-systeem een van de volgende dingen uit?",
    type: "multi",
    helperText: "Selecteer alles wat van toepassing is. Twijfel je? Kies dan de optie die het dichtst in de buurt komt.",
    options: [
      {
        id: "subliminal",
        label: "Het beïnvloedt mensen zonder dat ze het doorhebben (onbewuste of manipulatieve technieken)",
      },
      {
        id: "social-scoring",
        label: "Het beoordeelt of scoort mensen op basis van hun persoonlijkheid, gedrag of sociale omstandigheden",
      },
      {
        id: "realtime-biometrics",
        label: "Het herkent gezichten of identificeert mensen in real-time op openbare plekken",
      },
      {
        id: "emotion-work",
        label: "Het herkent emoties van medewerkers op de werkvloer of van studenten in het onderwijs",
      },
      {
        id: "none",
        label: "Geen van bovenstaande",
      },
    ],
  },

  // — 3. Hoog-risico gebied (Annex III) —
  {
    id: "hoog-risico-gebied",
    title: "In welk gebied of voor welk doel wordt het AI-systeem ingezet?",
    type: "multi",
    helperText: "Dit zijn de gebieden die de EU AI Act als gevoelig aanmerkt. Selecteer alles wat van toepassing is.",
    options: [
      { id: "biometrics", label: "Identificatie of herkenning van personen (biometrie)" },
      { id: "education", label: "Onderwijs of beroepsopleidingen" },
      { id: "employment", label: "Werving, selectie of beoordeling van medewerkers of freelancers" },
      { id: "financial", label: "Krediet, verzekeringen of andere financiële diensten" },
      { id: "essential-services", label: "Uitkeringen, zorg of andere essentiële overheidsdiensten" },
      { id: "law-enforcement", label: "Rechtshandhaving, opsporing of veiligheidsdiensten" },
      { id: "migration", label: "Migratie, asiel of grenscontrole" },
      { id: "infrastructure", label: "Kritieke infrastructuur (energie, water, transport, digitale netwerken)" },
      { id: "justice", label: "Rechtspraak of democratische processen" },
      { id: "none", label: "Geen van bovenstaande" },
    ],
  },

  // — 4. Invloed op personen —
  {
    id: "invloed-personen",
    title: "Heeft het AI-systeem directe invloed op beslissingen die gevolgen hebben voor individuele personen?",
    type: "single",
    options: [
      { id: "yes", label: "Ja, het neemt beslissingen of bepaalt sterk de uitkomst" },
      { id: "partial", label: "Gedeeltelijk, het ondersteunt maar een mens neemt altijd de eindbeslissing" },
      { id: "no", label: "Nee" },
    ],
  },

  // — 5. Persoonsgegevens —
  {
    id: "persoonsgegevens",
    title: "Verwerkt het AI-systeem persoonsgegevens?",
    type: "single",
    helperText: "Denk aan namen, e-mailadressen, foto's, gedragsdata of andere informatie die herleidbaar is tot een persoon.",
    options: [
      { id: "yes", label: "Ja" },
      { id: "no", label: "Nee" },
      { id: "unsure", label: "Weet ik niet zeker" },
    ],
  },

  // — 6. Menselijk toezicht —
  {
    id: "menselijk-toezicht",
    title: "Is er altijd een mens die de uitkomst van het AI-systeem beoordeelt voordat er actie op wordt ondernomen?",
    type: "single",
    options: [
      { id: "yes", label: "Ja, er is altijd menselijke controle" },
      { id: "partial", label: "Soms, maar niet altijd" },
      { id: "no", label: "Nee, het systeem handelt zelfstandig" },
    ],
  },

  // — 7. Transparantieverplichtingen (Article 50) —
  {
    id: "transparantie",
    title: "Wat doet het AI-systeem richting gebruikers of het publiek?",
    type: "multi",
    helperText: "De EU AI Act stelt extra transparantie-eisen aan systemen die direct met mensen communiceren of content aanmaken.",
    options: [
      {
        id: "chatbot",
        label: "Het communiceert direct met mensen, zoals een chatbot of virtuele assistent",
      },
      {
        id: "synthetic-content",
        label: "Het maakt of bewerkt afbeeldingen, video of geluid (bijv. deepfakes of AI-gegenereerde beelden)",
      },
      {
        id: "emotion-biometric",
        label: "Het herkent emoties of identificeert mensen op basis van biometrie",
      },
      { id: "none", label: "Geen van bovenstaande" },
    ],
  },

  // — 8. AI-geletterdheid (Article 4) —
  {
    id: "ai-geletterdheid",
    title: "Hebben medewerkers die met dit systeem werken duidelijke instructies of training gekregen?",
    type: "single",
    helperText: "Denk aan uitleg over wat het systeem doet, hoe je de uitkomst interpreteert en hoe je omgaat met privacy en risico's.",
    options: [
      { id: "yes", label: "Ja" },
      { id: "partial", label: "Gedeeltelijk" },
      { id: "no", label: "Nee" },
    ],
  },
];
