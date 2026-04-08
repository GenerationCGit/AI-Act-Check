type HintMap = Record<string, Record<string, string>>;

const hints: HintMap = {
  rol: {
    "HR / recruitment":
      "CV-screeningssoftware of een selectietool die je inkoopt valt onder 'gebruiker'. Heb je zelf een tool gebouwd voor klanten? Dan ben je aanbieder.",
    "Technologie / software":
      "Bouw je AI-systemen voor klanten? Dan ben je aanbieder. Gebruik je ze intern? Dan ben je gebruiker.",
    "Overheid / publieke dienstverlening":
      "Overheidsinstanties die AI inzetten voor burgers zijn doorgaans gebruiker, tenzij ze zelf systemen ontwikkelen.",
    "Zorg / welzijn":
      "Gebruik je diagnostische software van een leverancier? Dan ben je gebruiker. Heb je zelf iets laten bouwen? Dan ben je aanbieder.",
  },

  "verboden-functies": {
    "HR / recruitment":
      "Sommige CV-screening tools analyseren toon, gezichtsuitdrukkingen of persoonlijkheidskenmerken. Dat kan onder verboden categorieën vallen.",
    "Marketing / communicatie":
      "Systemen die mensen targeten op basis van emotionele kwetsbaarheid of onbewust gedrag kunnen als manipulatief worden beschouwd.",
    "Overheid / publieke dienstverlening":
      "Automatische beoordeling van burgers op basis van gedragspatronen of sociale kenmerken kan als sociale scoring gelden.",
    "Detailhandel / e-commerce":
      "Dynamische prijsstelling op basis van kwetsbaarheid of emotionele toestand kan als manipulatief worden beschouwd.",
  },

  "hoog-risico-gebied": {
    "HR / recruitment":
      "'Werving, selectie of beoordeling van medewerkers' is bij recruitment vrijwel altijd van toepassing. Dit is een expliciet hoog-risico categorie in de EU AI Act.",
    "Zorg / welzijn":
      "'Uitkeringen, zorg of andere essentiële overheidsdiensten' en mogelijk 'biometrie' zijn bij zorgtoepassingen relevant.",
    "Financiële dienstverlening":
      "'Krediet, verzekeringen of andere financiële diensten' is een hoog-risico categorie. Denk aan AI voor kredietbeoordeling of fraudedetectie.",
    "Overheid / publieke dienstverlening":
      "Overheidsorganisaties raken vaak meerdere categorieën: uitkeringen, handhaving, migratie of rechtspraak.",
    "Onderwijs":
      "'Onderwijs of beroepsopleidingen' is een expliciet hoog-risico categorie, ook voor adaptieve leerplatformen of toetssoftware.",
    "Juridische dienstverlening":
      "'Rechtspraak of democratische processen' kan van toepassing zijn bij AI-ondersteunde juridische analyses of adviezen.",
  },

  "invloed-personen": {
    "HR / recruitment":
      "Bepaalt het systeem wie een uitnodiging krijgt of wie afgewezen wordt? Dan is de invloed direct.",
    "Zorg / welzijn":
      "Beïnvloedt het welke behandeling of welk zorgpad een patiënt aangeboden krijgt? Dan is de invloed direct.",
    "Financiële dienstverlening":
      "Bepaalt het of iemand een lening, verzekering of financieel product krijgt? Dan is er directe invloed.",
    "Overheid / publieke dienstverlening":
      "Beïnvloedt het besluiten over uitkeringen, vergunningen of handhaving? Dan is er directe invloed.",
    "Onderwijs":
      "Bepaalt het welk leerpad een student volgt of welke beoordeling iemand krijgt? Dan is er directe invloed.",
  },

  "persoonsgegevens": {
    "HR / recruitment":
      "Denk aan cv's, LinkedIn-profielen, assessmentresultaten of gedragsdata van kandidaten.",
    "Zorg / welzijn":
      "Denk aan patiëntdossiers, diagnoses, medicatiehistorie of diagnostische beelden. Dit zijn bijzondere persoonsgegevens.",
    "Financiële dienstverlening":
      "Denk aan transactiegegevens, krediethistorie of inkomensinformatie.",
    "Marketing / communicatie":
      "Denk aan browsegedrag, aankoophistorie, locatiedata of demografische profielen.",
    "Overheid / publieke dienstverlening":
      "Denk aan BSN-nummers, uitkeringsgegevens of handhavingshistorie.",
  },

  "menselijk-toezicht": {
    "HR / recruitment":
      "Beoordeelt een recruiter altijd de uitkomst voordat een kandidaat wordt afgewezen of uitgenodigd?",
    "Zorg / welzijn":
      "Controleert een arts of verpleegkundige altijd de aanbeveling voordat er gehandeld wordt?",
    "Financiële dienstverlening":
      "Controleert een medewerker besluiten over krediet of verzekeringen voordat deze definitief zijn?",
    "Overheid / publieke dienstverlening":
      "Is er altijd een ambtenaar die een AI-aanbeveling valideert voordat een besluit wordt genomen?",
    "Juridische dienstverlening":
      "Beoordeelt een jurist altijd de AI-uitkomst voordat advies wordt gegeven?",
  },

  transparantie: {
    "Marketing / communicatie":
      "Gebruik je een chatbot of genereer je AI-content voor het publiek? Dan gelden transparantieverplichtingen.",
    "Technologie / software":
      "Bouw je chatbots of systemen die AI-content genereren? Dan moeten gebruikers weten dat ze met AI communiceren.",
    "Toerisme / horeca":
      "Gebruik je een AI-chatbot voor klantenservice? Dan moet je dit kenbaar maken aan gebruikers.",
    "Detailhandel / e-commerce":
      "AI-chatbots of gepersonaliseerde productaanbevelingen op basis van AI vereisen transparantie richting de klant.",
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
};

export function getSectorHint(questionId: string, sector: string): string | null {
  return hints[questionId]?.[sector] ?? null;
}
