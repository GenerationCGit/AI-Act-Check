type HintMap = Record<string, Record<string, string>>;

const hints: HintMap = {
  purpose: {
    "HR / recruitment":
      "Denk aan cv-screening, rangschikking van kandidaten of geautomatiseerde eerste selectie.",
    "Zorg / welzijn":
      "Denk aan diagnoseondersteuning, triagering van patiënten of voorspelling van zorgrisico's.",
    "Financiële dienstverlening":
      "Denk aan fraudedetectie, kredietbeoordeling of geautomatiseerd beleggingsadvies.",
    "Onderwijs":
      "Denk aan adaptief leren, tentamenbewaking of geautomatiseerd studieadvies.",
    "Overheid / publieke dienstverlening":
      "Denk aan uitkeringsberekeningen, vergunningverlening of handhavingsondersteuning.",
    "Marketing / communicatie":
      "Denk aan gepersonaliseerde advertenties, contentgeneratie of klantsegmentatie.",
    "Detailhandel / e-commerce":
      "Denk aan productaanbevelingen, dynamische prijsstelling of voorraadoptimalisatie.",
    "Juridische dienstverlening":
      "Denk aan contractanalyse, juridisch onderzoek of risicobeoordeling van zaken.",
    "Logistiek / supply chain":
      "Denk aan routeoptimalisatie, vraagvoorspelling of automatische inplanning.",
    "Accountancy / belasting":
      "Denk aan geautomatiseerde belastingberekeningen, fraudedetectie of financiële prognoses.",
    "Industrie / productie":
      "Denk aan kwaliteitscontrole, voorspellend onderhoud of procesoptimalisatie.",
  },

  "affects-people": {
    "HR / recruitment":
      "Bepaalt het systeem wie uitgenodigd wordt voor een gesprek of wie afgewezen wordt?",
    "Zorg / welzijn":
      "Beïnvloedt het welke behandeling of welk zorgpad een patiënt aangeboden krijgt?",
    "Financiële dienstverlening":
      "Bepaalt het of iemand een lening, verzekering of financieel product krijgt?",
    "Overheid / publieke dienstverlening":
      "Beïnvloedt het besluiten over uitkeringen, vergunningen of handhaving?",
    "Onderwijs":
      "Bepaalt het welk leerpad een student volgt of welke beoordeling iemand krijgt?",
    "Juridische dienstverlening":
      "Beïnvloedt het adviezen of uitkomsten die direct gevolgen hebben voor cliënten?",
  },

  "access-impact": {
    "HR / recruitment":
      "'Werk of sollicitaties' is bij recruitment vrijwel altijd van toepassing.",
    "Zorg / welzijn":
      "'Zorg' is bij zorgtoepassingen vrijwel altijd van toepassing.",
    "Financiële dienstverlening":
      "Denk aan toegang tot krediet, hypotheken, verzekeringen of beleggingsproducten.",
    "Overheid / publieke dienstverlening":
      "Denk aan toegang tot uitkeringen, vergunningen of overheidsdiensten.",
    "Onderwijs":
      "Denk aan toelating tot opleidingen of doorstroming naar hogere niveaus.",
  },

  "personal-data": {
    "HR / recruitment":
      "Denk aan cv's, LinkedIn-profielen, assessmentresultaten of gedragsdata van kandidaten.",
    "Zorg / welzijn":
      "Denk aan patiëntdossiers, diagnoses, medicatiehistorie of diagnostische beelden.",
    "Financiële dienstverlening":
      "Denk aan transactiegegevens, krediethistorie of inkomensinformatie.",
    "Marketing / communicatie":
      "Denk aan browsegedrag, aankoophistorie, locatiedata of demografische profielen.",
    "Overheid / publieke dienstverlening":
      "Denk aan BSN-nummers, uitkeringsgegevens of handhavingshistorie.",
    "Detailhandel / e-commerce":
      "Denk aan aankoophistorie, locatiedata of gepersonaliseerde klantprofielen.",
  },

  biometric: {
    "Zorg / welzijn":
      "Denk aan gezichtsherkenning voor patiëntidentificatie of stemanalyse voor diagnosedoeleinden.",
    "Overheid / publieke dienstverlening":
      "Denk aan gezichtsherkenning voor toegangscontrole of identificatie van personen.",
    "HR / recruitment":
      "Denk aan gezichts- of stemanalyse tijdens (video)sollicitatiegesprekken.",
  },

  "human-oversight": {
    "HR / recruitment":
      "Beoordeelt een recruiter altijd de uitkomst voordat een kandidaat wordt afgewezen of uitgenodigd?",
    "Zorg / welzijn":
      "Controleert een arts of verpleegkundige altijd de aanbeveling voordat er gehandeld wordt?",
    "Financiële dienstverlening":
      "Controleert een medewerker besluiten over krediet of verzekeringen voordat deze definitief zijn?",
    "Overheid / publieke dienstverlening":
      "Is er altijd een ambtenaar die een AI-aanbeveling valideert voordat een besluit wordt genomen?",
    "Juridische dienstverlening":
      "Beoordeelt een jurist of advocaat altijd de AI-uitkomst voordat advies wordt gegeven?",
  },

  "ai-literacy": {
    "Zorg / welzijn":
      "Denk ook aan training over medische aansprakelijkheid bij AI-ondersteunde beslissingen.",
    "HR / recruitment":
      "Denk ook aan training over bias in cv-screening en eerlijke selectieprocedures.",
    "Overheid / publieke dienstverlening":
      "Denk ook aan de uitlegverplichting richting burgers bij geautomatiseerde besluiten.",
    "Financiële dienstverlening":
      "Denk ook aan training over modelrisico en de uitlegbaarheid van AI-gestuurde adviezen.",
  },

  explainability: {
    "HR / recruitment":
      "Kun je aan een afgewezen kandidaat uitleggen waarom het systeem hem of haar niet selecteerde?",
    "Financiële dienstverlening":
      "Kun je aan een klant uitleggen waarom een kredietaanvraag of verzekering werd afgewezen?",
    "Overheid / publieke dienstverlening":
      "De wet verplicht dat burgers altijd een uitleg kunnen krijgen bij geautomatiseerde overheidsbesluiten.",
    "Zorg / welzijn":
      "Kan een arts of patiënt begrijpen waarom het systeem een bepaalde diagnose of behandeling suggereert?",
    "Juridische dienstverlening":
      "Kun je aan een cliënt uitleggen op welke gronden een AI-analyse tot een bepaalde conclusie komt?",
  },

  "risk-signals": {
    "Onderwijs":
      "Kinderen en jongeren gelden als kwetsbare groep. Systemen gericht op minderjarigen vallen onder extra strenge regels.",
    "Zorg / welzijn":
      "Patiënten, ouderen en mensen met een beperking gelden als kwetsbare groepen.",
    "Marketing / communicatie":
      "Targeting op basis van emotie, kwetsbaarheid of onbewust gedrag kan als gedragsmanipulatie gelden.",
    "Overheid / publieke dienstverlening":
      "Uitkeringsgerechtigden en mensen in een afhankelijke positie gelden als kwetsbaar.",
    "Detailhandel / e-commerce":
      "Dynamische prijsstelling of targeting op basis van kwetsbaarheid kan als gedragsmanipulatie worden beschouwd.",
  },
};

export function getSectorHint(questionId: string, sector: string): string | null {
  return hints[questionId]?.[sector] ?? null;
}
