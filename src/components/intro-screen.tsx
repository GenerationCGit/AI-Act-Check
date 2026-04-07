import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface IntroScreenProps {
  onStart: () => void;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-brand-black/[0.07] bg-white p-5 md:p-6", className)}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest mb-3 block text-brand-black/50">
      {children}
    </span>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-yellow mt-[5px]" />
      <span className="font-sans text-[13px] leading-snug text-brand-black/70">
        {children}
      </span>
    </li>
  );
}

const RISK_LEVELS = [
  {
    label: "Minimaal risico",
    definition: "AI zonder directe impact op mensen of maatschappij.",
    examples: "Spamfilters, AI in videogames, aanbevelingsalgoritmen.",
    rules: "Geen verplichtingen. Vrijwillige gedragscodes worden aangeraden.",
    tag: "text-emerald-700 bg-emerald-50 border-emerald-200",
    card: "border-emerald-100 bg-emerald-50/20",
  },
  {
    label: "Beperkt risico",
    definition: "AI die mensen beïnvloedt maar geen grote risico's met zich meebrengt.",
    examples: "Chatbots, deepfakes, AI-gegenereerde content.",
    rules: "Transparantieplicht: gebruikers moeten weten dat ze met AI communiceren.",
    tag: "text-amber-700 bg-amber-50 border-amber-200",
    card: "border-amber-100 bg-amber-50/20",
  },
  {
    label: "Hoog risico",
    definition: "AI met impact op vitale gebieden zoals gezondheid, veiligheid of grondrechten.",
    examples: "AI in recruitment, onderwijs, zorg of kredietbeoordeling.",
    rules: "Verplicht: menselijk toezicht, data-governance en technische documentatie.",
    tag: "text-red-700 bg-red-50 border-red-200",
    card: "border-red-100 bg-red-50/20",
  },
  {
    label: "Verboden",
    definition: "AI die een duidelijke bedreiging vormt voor de veiligheid of rechten van mensen.",
    examples: "Sociale scores door overheden, biometrische surveillance, manipulatieve technieken.",
    rules: "Volledig verboden in de EU, van kracht sinds februari 2025.",
    tag: "text-red-800 bg-red-100 border-red-300",
    card: "border-red-200 bg-red-50/30",
  },
];

const TIMELINE = [
  {
    date: "Augustus 2024",
    body: "De wet is officieel begonnen.",
    highlight: false,
  },
  {
    date: "Februari 2025",
    body: "Verboden AI is nu echt van kracht. Bedrijven die dit nog gebruiken, zoals emotieherkenning op de werkvloer, riskeren boetes.",
    highlight: false,
  },
  {
    date: "Augustus 2025",
    body: "Er zijn regels gekomen voor grote taalmodellen zoals GPT-4 en Claude. Makers moeten eerlijk zijn over hoe ze hun modellen trainen.",
    highlight: false,
  },
  {
    date: "Augustus 2026",
    badge: "Belangrijkste deadline",
    body: "Alle systemen die als 'hoog risico' worden gezien, zoals AI voor sollicitaties of in het onderwijs, moeten nu aan strenge eisen voldoen.",
    highlight: true,
  },
  {
    date: "Augustus 2027",
    body: "De allerlaatste groep systemen (AI die al in andere EU-producten zit, zoals medische apparaten) moet dan ook aan de regels voldoen.",
    highlight: false,
  },
];

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-5 md:px-8 pb-16"
    >
      {/* ── Hero — centered CTA ── */}
      <div className="text-center pt-24 md:pt-36 pb-16 md:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="font-mono text-[11px] uppercase tracking-widest text-brand-black/50 mb-5 block"
        >
          EU AI Act, doe de check
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-sans font-semibold text-4xl md:text-6xl tracking-heading text-brand-black leading-[1.08] mb-5"
        >
          Valt jouw AI onder<br /> de EU AI Act?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="font-sans text-[16px] text-brand-black/60 max-w-[460px] mx-auto leading-relaxed mb-10"
        >
          De EU AI Act stelt regels aan het gebruik van AI. Met deze check
          ontdek je snel of en hoe de wet op jouw organisatie van toepassing is.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            type="button"
            onClick={onStart}
            className="px-10 py-4 rounded-xl bg-brand-yellow text-brand-black font-semibold text-base
              hover:bg-brand-yellow/90 active:scale-[0.98] transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-4
              shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            Start de check →
          </button>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="flex-1 h-px bg-brand-black/[0.07]" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-black/35">Wat is de EU AI Act?</span>
        <div className="flex-1 h-px bg-brand-black/[0.07]" />
      </motion.div>

      {/* ── Info grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        {/* Wat is het? — full width intro */}
        <Card className="md:col-span-3">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <SectionLabel>Over de wet</SectionLabel>
              <h2 className="font-sans font-semibold text-[17px] text-brand-black tracking-heading mb-3 leading-snug">
                De eerste AI-wet ter wereld
              </h2>
              <p className="font-sans text-[13px] text-brand-black/60 leading-relaxed">
                De EU AI Act is de eerste bindende wet die regels stelt aan het gebruik van kunstmatige intelligentie.
                Ze geldt voor iedereen die AI gebruikt, ontwikkelt of op de markt brengt, ook buiten de EU, zolang
                het systeem gericht is op Europese gebruikers.
              </p>
            </div>
            <div className="md:col-span-1">
              <SectionLabel>Wie valt eronder?</SectionLabel>
              <h2 className="font-sans font-semibold text-[17px] text-brand-black tracking-heading mb-3 leading-snug">
                Ontwikkelaars én gebruikers van AI
              </h2>
              <p className="font-sans text-[13px] text-brand-black/60 leading-relaxed">
                De wet maakt onderscheid tussen organisaties die AI bouwen en organisaties die AI inzetten.
                Gebruik je tools zoals Copilot of ChatGPT voor je werk? Dan val je als gebruiker ook onder de wet.
              </p>
            </div>
            <div className="md:col-span-1">
              <SectionLabel>Kansen</SectionLabel>
              <h2 className="font-sans font-semibold text-[17px] text-brand-black tracking-heading mb-3 leading-snug">
                Een kans, niet alleen een verplichting
              </h2>
              <p className="font-sans text-[13px] text-brand-black/60 leading-relaxed">
                Organisaties die nu nadenken over verantwoord AI-gebruik bouwen vertrouwen op bij klanten en
                medewerkers. Duidelijke afspraken over AI maken samenwerking makkelijker en verlagen risico's
                op de lange termijn.
              </p>
            </div>
          </div>
        </Card>

        {/* Risiconiveaus — spans 2 cols */}
        <Card className="md:col-span-2">
          <SectionLabel>Risiconiveaus</SectionLabel>
          <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-4">
            Hoe de EU AI Act AI indeelt
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {RISK_LEVELS.map((level) => (
              <div key={level.label} className={cn("rounded-xl border p-3.5 flex flex-col gap-2.5", level.card)}>
                <span className={cn("inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border self-start", level.tag)}>
                  {level.label}
                </span>
                <p className="font-sans text-[12px] text-brand-black/80 leading-snug">{level.definition}</p>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-black/40 block mb-0.5">Voorbeelden</span>
                  <p className="font-sans text-[12px] text-brand-black/60 leading-snug">{level.examples}</p>
                </div>
                <div className="border-t border-brand-black/[0.06] pt-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-black/40 block mb-0.5">Regels</span>
                  <p className="font-sans text-[12px] text-brand-black/60 leading-snug">{level.rules}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Urgentie + Goed om te weten — stacked right col */}
        <div className="flex flex-col gap-3">
          <Card className="flex-1">
            <SectionLabel>Timing</SectionLabel>
            <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-3">
              Waarom nu een goed moment?
            </h2>
            <ul className="space-y-2">
              <Bullet>De belangrijkste deadline is augustus 2026, er is nog tijd om je voor te bereiden</Bullet>
              <Bullet>Vroeg beginnen geeft ruimte om stap voor stap te werken</Bullet>
              <Bullet>Bewustwording is al een groot deel van de oplossing</Bullet>
              <Bullet>Toezichthouders kijken eerst naar inspanning, niet direct naar fouten</Bullet>
            </ul>
          </Card>

          <Card className="flex-1">
            <SectionLabel>Goed om te weten</SectionLabel>
            <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-3">
              Je bent sneller exploitant dan je denkt
            </h2>
            <ul className="space-y-2 mb-4">
              <Bullet>Als je ChatGPT of Copilot gebruikt, val je als exploitant onder de wet</Bullet>
              <Bullet>De wet vraagt onder meer om bewust AI-gebruik en basistraining voor medewerkers</Bullet>
              <Bullet>Voor de meeste organisaties zijn de verplichtingen behapbaar</Bullet>
            </ul>
            <p className="font-sans text-[12px] text-brand-black/70 font-semibold border-t border-brand-black/[0.06] pt-3 leading-snug">
              Niet zeker waar je staat? De check geeft je een concreet startpunt.
            </p>
          </Card>
        </div>

        {/* Tijdlijn — full width */}
        <Card className="md:col-span-3">
          <SectionLabel>Tijdlijn</SectionLabel>
          <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-5">
            Van start naar wet: de belangrijkste data
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {TIMELINE.map((item, i, arr) => (
              <div key={item.date} className="relative flex flex-col">
                <div className="flex items-center mb-3 gap-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full flex-shrink-0 ring-2",
                    item.highlight
                      ? "bg-brand-yellow ring-brand-yellow/40"
                      : "bg-brand-black/20 ring-brand-black/10"
                  )} />
                  {i < arr.length - 1 && (
                    <div className="hidden md:block flex-1 h-px bg-brand-black/[0.08]" />
                  )}
                </div>
                <div className={cn(
                  "rounded-xl border p-3.5 flex-1",
                  item.highlight
                    ? "border-brand-yellow/40 bg-brand-yellow/[0.07]"
                    : "border-brand-black/[0.07] bg-brand-off-white/40"
                )}>
                  {item.badge && (
                    <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-brand-black/70 bg-brand-yellow/30 border border-brand-yellow/40 px-2 py-0.5 rounded-full mb-2">
                      {item.badge}
                    </span>
                  )}
                  <p className={cn(
                    "font-mono text-[10px] uppercase tracking-wider mb-1.5",
                    item.highlight ? "text-brand-black/70 font-semibold" : "text-brand-black/40"
                  )}>
                    {item.date}
                  </p>
                  <p className={cn(
                    "font-sans text-[12px] leading-snug",
                    item.highlight ? "text-brand-black/80" : "text-brand-black/50"
                  )}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Positieve kant — full width */}
        <Card className="md:col-span-3">
          <SectionLabel>Waarom de AI Act goed nieuws is</SectionLabel>
          <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-5">
            Duidelijke regels maken AI beter voor iedereen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                title: "Vertrouwen",
                body: "Klanten en medewerkers weten dat jouw organisatie bewust en verantwoord met AI omgaat.",
              },
              {
                title: "Gelijk speelveld",
                body: "Iedereen houdt zich aan dezelfde regels. Dat voorkomt oneerlijke concurrentie door roekeloze inzet van AI.",
              },
              {
                title: "Betere AI-systemen",
                body: "Hogere kwaliteitseisen leiden tot AI die betrouwbaarder, transparanter en eerlijker is.",
              },
              {
                title: "Europa als voorbeeld",
                body: "De EU zet de standaard voor verantwoorde AI wereldwijd. Daar profiteert elke Europese organisatie van.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                  <span className="font-sans font-semibold text-[13px] text-brand-black">{item.title}</span>
                </div>
                <p className="font-sans text-[12px] text-brand-black/60 leading-snug pl-3.5">{item.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="text-center mt-10"
      >
        <p className="font-sans text-[14px] text-brand-black/60 mb-4">
          Klaar om te checken waar jouw organisatie staat?
        </p>
        <button
          type="button"
          onClick={onStart}
          className="px-8 py-3.5 rounded-xl bg-brand-yellow text-brand-black font-semibold text-sm
            hover:bg-brand-yellow/90 active:scale-[0.98] transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-4
            shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
        >
          Start de check →
        </button>
      </motion.div>

      {/* ── Footer ── */}
      <p className="font-mono text-[11px] text-brand-black/35 text-center mt-8">
        Deze check is een eerste indicatie en vormt geen juridisch advies.
      </p>
    </motion.div>
  );
}
