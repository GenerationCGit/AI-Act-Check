type HintMap = Record<string, Record<string, string>>;

const hints: HintMap = {
  entiteit: {
    "HR / recruitment":
      "CV-screeningssoftware die je inkoopt valt onder 'gebruiker'. Heb je zelf een tool laten bouwen voor klanten? Dan ben je aanbieder.",
    "Technologie / software":
      "Bouw je AI-systemen voor klanten? Dan ben je aanbieder. Gebruik je ze intern? Dan ben je gebruiker.",
    "Overheid / publieke dienstverlening":
      "Overheidsinstanties die AI inzetten voor burgers zijn doorgaans gebruiker, tenzij ze zelf systemen ontwikkelen.",
    "Zorg / welzijn":
      "Gebruik je diagnostische software van een leverancier? Dan ben je gebruiker. Heb je zelf iets laten bouwen? Dan ben je aanbieder.",
  },

  aanpassingen: {
    "Marketing / communicatie":
      "Als je een AI-tool inzet voor andere doeleinden dan waarvoor hij is ontwikkeld, kun je verantwoordelijk worden voor het systeem.",
    "Technologie / software":
      "Als je een open source AI-model fine-tunet of integreert in je product, kan dat als ingrijpende aanpassing gelden.",
  },

  reikwijdte: {
    "Detailhandel / e-commerce":
      "Verkoop je aan klanten in de EU of gebruiken EU-klanten de uitkomsten van het systeem? Dan val je onder de wet.",
    "Technologie / software":
      "Ook als je organisatie buiten de EU zit, val je onder de wet als jouw systeem of de output ervan in de EU wordt gebruikt.",
  },

  verboden: {
    "HR / recruitment":
      "Sommige selectietools analyseren toon, gezichtsuitdrukking of persoonlijkheidskenmerken. Dat kan onder verboden categorieën vallen.",
    "Marketing / communicatie":
      "Targeting op basis van emotionele kwetsbaarheid of onbewust gedrag kan als manipulatief worden beschouwd.",
    "Overheid / publieke dienstverlening":
      "Automatische beoordeling van burgers op basis van gedragspatronen of sociale kenmerken kan als sociale scoring gelden.",
    "Detailhandel / e-commerce":
      "Dynamische prijsstelling op basis van kwetsbaarheid of emotionele toestand kan als manipulatief worden beschouwd.",
    "Onderwijs":
      "Emotieherkenning in klaslokalen of bij online toetsen valt onder de verboden categorieën.",
  },

  "hoog-risico-gebied": {
    "HR / recruitment":
      "'Werving, selectie of beoordeling van medewerkers' is bij recruitment vrijwel altijd van toepassing. Dit is een expliciet hoog-risico categorie.",
    "Zorg / welzijn":
      "'Toegang tot essentiële diensten' is vaak van toepassing in de zorg.",
    "Financiële dienstverlening":
      "'Toegang tot essentiële diensten' geldt ook voor krediet en verzekeringen.",
    "Overheid / publieke dienstverlening":
      "Overheidsorganisaties raken vaak meerdere categorieën: essentiële diensten, rechtshandhaving, migratie of rechtspraak.",
    "Onderwijs":
      "'Onderwijs of beroepsopleidingen' is een expliciet hoog-risico categorie, ook voor adaptieve leerplatformen of toetssoftware.",
    "Juridische dienstverlening":
      "'Rechtspraak of democratische processen' kan van toepassing zijn bij AI-ondersteunde juridische analyses.",
  },

  "significant-risico": {
    "HR / recruitment":
      "Bepaalt het systeem mee wie wordt aangenomen of afgewezen? Dan is de invloed serieus.",
    "Zorg / welzijn":
      "Beïnvloedt het welke behandeling een patiënt krijgt? Dan is de invloed serieus.",
    "Financiële dienstverlening":
      "Bepaalt het of iemand een lening of verzekering krijgt? Dan is de invloed serieus.",
    "Overheid / publieke dienstverlening":
      "Beïnvloedt het besluiten over uitkeringen, vergunningen of handhaving? Dan is de invloed serieus.",
  },

  transparantie: {
    "Marketing / communicatie":
      "Gebruik je een chatbot of genereer je AI-content voor het publiek? Dan gelden transparantieverplichtingen.",
    "Technologie / software":
      "Bouw je chatbots of systemen die AI-content genereren? Dan moeten gebruikers weten dat ze met AI communiceren.",
    "Toerisme / horeca":
      "Gebruik je een AI-chatbot voor klantenservice? Dan moet je dit kenbaar maken aan gebruikers.",
    "Detailhandel / e-commerce":
      "AI-chatbots of AI-gegenereerde productbeschrijvingen vereisen transparantie richting de klant.",
    "Media / entertainment":
      "AI-gegenereerde of bewerkte beelden, video's en teksten moeten als zodanig worden gemarkeerd.",
  },

  "ai-geletterdheid": {
    "Zorg / welzijn":
      "Denk ook aan training over aansprakelijkheid bij AI-ondersteunde medische beslissingen.",
    "HR / recruitment":
      "Denk ook aan training over bias in selectieprocessen en eerlijke beoordeling.",
    "Overheid / publieke dienstverlening":
      "Denk ook aan de uitlegverplichting richting burgers bij geautomatiseerde besluiten.",
    "Financiële dienstverlening":
      "Denk ook aan training over modelrisico en de uitlegbaarheid van AI-gestuurde adviezen.",
    "Onderwijs":
      "Denk aan training voor docenten over hoe AI-uitkomsten te interpreteren en wanneer menselijk oordeel leidend moet zijn.",
  },

  publiek: {
    "Overheid / publieke dienstverlening":
      "Overheidsinstanties zijn altijd 'publiekrechtelijke organen'. Een grondrechtentoets is verplicht voor hoog-risico systemen.",
    "Zorg / welzijn":
      "Zorginstellingen die publieke zorg leveren kunnen ook onder deze categorie vallen.",
    "Onderwijs":
      "Publiek bekostigde onderwijsinstellingen vallen onder deze categorie.",
  },
};

export function getSectorHint(questionId: string, sector: string): string | null {
  return hints[questionId]?.[sector] ?? null;
}
