import type { Question } from "../lib/types";

export const questions: Question[] = [
  // — #E1: Wat voor entiteit ben je? —
  {
    id: "entiteit",
    title: "Welke rol heeft jouw organisatie bij dit AI-systeem?",
    type: "single",
    helperText: "Kies de omschrijving die het beste past. Het kan zijn dat meerdere rollen op je van toepassing zijn, doe in dat geval de check meerdere keren.",
    options: [
      {
        id: "provider",
        label: "Aanbieder, wij hebben het systeem zelf (laten) ontwikkelen en bieden het onder onze naam aan",
      },
      {
        id: "deployer",
        label: "Gebruiker, wij gebruiken een AI-systeem van een ander binnen onze organisatie",
      },
      {
        id: "distributor",
        label: "Distributeur, wij stellen AI-systemen van anderen beschikbaar op de Europese markt",
      },
      {
        id: "importer",
        label: "Importeur, wij brengen een AI-systeem van buiten de EU op de Europese markt",
      },
      {
        id: "manufacturer",
        label: "Productfabrikant, wij verkopen een product waarin een AI-systeem zit, onder onze eigen naam",
      },
    ],
  },

  // — #E2: Aanpassingen aan het systeem —
  {
    id: "aanpassingen",
    title: "Wordt het AI-systeem op een van deze manieren aangepast?",
    type: "multi",
    helperText: "Aanpassingen kunnen ervoor zorgen dat je zelf als 'aanbieder' wordt gezien onder de wet.",
    options: [
      {
        id: "rebrand",
        label: "Wij zetten onze eigen naam of merk op het systeem",
      },
      {
        id: "purpose",
        label: "Wij gebruiken het systeem voor een ander doel dan waarvoor het bedoeld is",
      },
      {
        id: "substantial",
        label: "Wij hebben het systeem ingrijpend aangepast (bijvoorbeeld de werking of functionaliteit)",
      },
      { id: "none", label: "Geen van bovenstaande" },
    ],
  },

  // — #S1: Reikwijdte —
  {
    id: "reikwijdte",
    title: "Welke van deze situaties is op jou van toepassing?",
    type: "multi",
    helperText: "De EU AI Act geldt niet alleen voor organisaties binnen de EU, maar ook voor systemen waarvan de uitkomst in de EU wordt gebruikt.",
    options: [
      {
        id: "place-eu",
        label: "Wij brengen AI-systemen op de markt of stellen ze beschikbaar binnen de EU",
      },
      {
        id: "established-eu",
        label: "Onze organisatie is gevestigd in de EU",
      },
      {
        id: "output-eu",
        label: "De uitkomsten van het systeem worden gebruikt door mensen of organisaties in de EU",
      },
      { id: "none", label: "Geen van bovenstaande" },
    ],
  },

  // — #R3: Verboden functies (Artikel 5) —
  {
    id: "verboden",
    title: "Wordt het AI-systeem ingezet om een van de onderstaande punten uit te voeren?",
    type: "multi",
    helperText: "Dit zijn toepassingen die de EU helemaal heeft verboden. Twijfel je? Selecteer dan wat het meest in de buurt komt.",
    options: [
      {
        id: "subliminal",
        label: "Het beïnvloedt mensen onbewust of manipulatief, zodat ze dingen doen die ze anders niet zouden doen",
      },
      {
        id: "vulnerable",
        label: "Het maakt misbruik van kwetsbaarheden van mensen (bijvoorbeeld leeftijd, beperking of sociale situatie)",
      },
      {
        id: "biometric-categorisation",
        label: "Het deelt mensen in op basis van gevoelige kenmerken zoals ras, religie of seksuele geaardheid",
      },
      {
        id: "social-scoring",
        label: "Het geeft mensen een score op basis van hun gedrag of persoonlijke kenmerken (sociale scoring)",
      },
      {
        id: "predictive-policing",
        label: "Het voorspelt of iemand een misdrijf gaat plegen op basis van een persoonlijkheidsprofiel",
      },
      {
        id: "facial-database",
        label: "Het bouwt of breidt gezichtsherkenningsdatabases uit door beelden van internet of camera's te schrapen",
      },
      {
        id: "emotion-work",
        label: "Het herkent emoties van mensen op de werkvloer of in het onderwijs",
      },
      {
        id: "realtime-biometrics",
        label: "Het herkent gezichten in real-time op openbare plekken",
      },
      { id: "none", label: "Geen van bovenstaande" },
    ],
  },

  // — #HR4: Hoog-risico gebieden (Annex III) —
  {
    id: "hoog-risico-gebied",
    title: "In welk gebied wordt het AI-systeem ingezet?",
    type: "multi",
    helperText: "Dit zijn de gebieden die de EU AI Act als gevoelig aanmerkt. Selecteer alles wat van toepassing is.",
    options: [
      {
        id: "biometrics",
        label: "Biometrie, zoals gezichtsherkenning of identificatie van personen",
      },
      {
        id: "infrastructure",
        label: "Kritieke infrastructuur, zoals energie, water, transport of digitale netwerken",
      },
      {
        id: "education",
        label: "Onderwijs of beroepsopleidingen, zoals toelating of beoordeling van studenten",
      },
      {
        id: "employment",
        label: "Werving, selectie of beoordeling van medewerkers",
      },
      {
        id: "essential-services",
        label: "Toegang tot essentiële diensten, zoals zorg, uitkeringen of overheidsvoorzieningen",
      },
      {
        id: "law-enforcement",
        label: "Rechtshandhaving, zoals politie of opsporing",
      },
      {
        id: "migration",
        label: "Migratie, asiel of grenscontrole",
      },
      {
        id: "justice",
        label: "Rechtspraak of democratische processen, zoals verkiezingen",
      },
      { id: "none", label: "Geen van bovenstaande" },
    ],
  },

  // — #HR5: Significant risico op schade —
  {
    id: "significant-risico",
    title: "Heeft het AI-systeem een serieuze invloed op de gezondheid, veiligheid of rechten van mensen?",
    type: "single",
    helperText: "Het systeem heeft GEEN serieuze invloed als het bijvoorbeeld alleen een kleine voorbereidende taak doet, of een eerder menselijk besluit verbetert zonder dat te vervangen.",
    options: [
      { id: "yes", label: "Ja" },
      { id: "no", label: "Nee" },
      { id: "unsure", label: "Weet ik niet zeker" },
    ],
  },

  // — #R4: Transparantieverplichtingen (Artikel 50) —
  {
    id: "transparantie",
    title: "Wordt het AI-systeem ingezet om een van de onderstaande punten uit te voeren?",
    type: "multi",
    helperText: "Voor deze toepassingen gelden extra transparantie-eisen, zodat mensen weten dat ze met AI te maken hebben.",
    options: [
      {
        id: "deepfake",
        label: "Het maakt of bewerkt beeld, geluid of video die echt lijkt (deepfakes)",
      },
      {
        id: "public-text",
        label: "Het maakt teksten die gepubliceerd worden om het publiek te informeren over zaken van algemeen belang",
      },
      {
        id: "emotion-biometric",
        label: "Het herkent emoties of deelt mensen in op basis van biometrische gegevens",
      },
      {
        id: "interacting",
        label: "Het communiceert direct met mensen, zoals een chatbot of virtuele assistent",
      },
      {
        id: "synthetic-content",
        label: "Het genereert audio, beeld, video of tekst (synthetische content)",
      },
      { id: "none", label: "Geen van bovenstaande" },
    ],
  },

  // — #E (Article 4): AI-geletterdheid —
  {
    id: "ai-geletterdheid",
    title: "Hebben medewerkers die met dit systeem werken voldoende kennis en training over AI?",
    type: "single",
    helperText: "Denk aan instructies over wat het systeem doet, hoe je de uitkomst moet interpreteren en hoe je omgaat met privacy en risico's. Dit is verplicht voor aanbieders en gebruikers (Artikel 4).",
    options: [
      { id: "yes", label: "Ja, er is duidelijke training en instructie" },
      { id: "partial", label: "Gedeeltelijk" },
      { id: "no", label: "Nee" },
    ],
  },

  // — #R5: Publieke instantie —
  {
    id: "publiek",
    title: "Is jouw organisatie een overheidsinstantie of een private organisatie die publieke diensten verleent?",
    type: "single",
    helperText: "Dit bepaalt of er een grondrechtentoets uitgevoerd moet worden voordat je een hoog-risico AI-systeem inzet.",
    options: [
      { id: "yes", label: "Ja" },
      { id: "no", label: "Nee" },
    ],
  },
];
