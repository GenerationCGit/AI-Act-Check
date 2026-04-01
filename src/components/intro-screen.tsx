import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface IntroScreenProps {
  onStart: () => void;
}

function Divider() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10">
      <div className="h-px bg-brand-black/[0.06]" />
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-yellow mt-[7px]" />
      <span className="font-sans text-[14px] text-brand-black/75 leading-relaxed">
        {children}
      </span>
    </li>
  );
}

function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[14px] text-brand-black/85 font-semibold mt-4">
      {children}
    </p>
  );
}

const RISK_LEVELS: {
  label: string;
  body: React.ReactNode;
  accent: string;
  tag: string;
}[] = [
  {
    label: "Laag risico",
    body: "De meeste simpele AI-toepassingen vallen hier onder. Denk aan interne tools of automatisering zonder impact op mensen.",
    accent: "border-emerald-200/60 bg-emerald-50/30",
    tag: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    label: "Beperkt risico",
    body: "Bijvoorbeeld chatbots of AI-content. Hier geldt vooral: wees transparant. Mensen moeten weten dat ze met AI te maken hebben.",
    accent: "border-amber-200/60 bg-amber-50/30",
    tag: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    label: "Hoog risico",
    body: (
      <>
        <p className="mb-2.5">Dit zijn systemen die impact hebben op belangrijke delen van iemands leven.</p>
        <ul className="space-y-1 mb-2.5 pl-0.5">
          <li className="flex items-start gap-2">
            <span className="text-brand-black/50 mt-px">—</span>
            <span>AI in recruitment (cv screening)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-black/50 mt-px">—</span>
            <span>Kredietbeoordeling</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-black/50 mt-px">—</span>
            <span>Zorgsystemen</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-black/50 mt-px">—</span>
            <span>Overheidsbesluiten</span>
          </li>
        </ul>
        <p className="font-semibold text-brand-black/85">Veel 'normale' use cases vallen hier sneller onder dan je denkt.</p>
      </>
    ),
    accent: "border-red-200/60 bg-red-50/20",
    tag: "text-red-700 bg-red-50 border-red-200",
  },
  {
    label: "Verboden toepassingen",
    body: (
      <>
        <p className="mb-2.5">AI die fundamentele rechten schendt of mensen manipuleert.</p>
        <ul className="space-y-1 pl-0.5">
          <li className="flex items-start gap-2">
            <span className="text-brand-black/50 mt-px">—</span>
            <span>Mensen onbewust beïnvloeden</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-black/50 mt-px">—</span>
            <span>Social scoring</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-black/50 mt-px">—</span>
            <span>Gezichtsdata van internet verzamelen</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-black/50 mt-px">—</span>
            <span>Emoties meten op werk of school</span>
          </li>
        </ul>
      </>
    ),
    accent: "border-red-300/60 bg-red-50/40",
    tag: "text-red-800 bg-red-100 border-red-300",
  },
];

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* ── Hero ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-16 md:pb-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-block font-mono text-xs uppercase tracking-widest text-brand-black/60 mb-5"
        >
          DOE DE CHECK
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-sans font-semibold text-4xl md:text-6xl tracking-heading text-brand-black leading-[1.1] mb-5"
        >
          Valt jouw AI onder de EU AI Act?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="font-sans text-base md:text-lg text-brand-black/75 max-w-[580px] mx-auto leading-relaxed"
        >
          Veel bedrijven denken dat de EU AI Act alleen geldt voor grote techbedrijven.
          In werkelijkheid geldt dit voor bijna elke organisatie die AI gebruikt, vaak zonder dat ze het doorhebben.
        </motion.p>
      </div>

      <Divider />

      {/* ── Section 1: Risk levels ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="font-mono text-[11px] uppercase tracking-widest text-brand-black/60 mb-3 block">
          RISICONIVEAUS
        </span>
        <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-2 leading-tight">
          Hoe de EU AI Act naar AI kijkt
        </h2>
        <p className="font-sans text-[15px] text-brand-black/70 mb-8 max-w-[580px] leading-relaxed">
          De EU AI Act werkt niet met één set regels voor alle AI. Het kijkt naar het risico dat jouw toepassing vormt voor mensen.
        </p>

        <div className="flex flex-col gap-3">
          {RISK_LEVELS.map((level) => (
            <div
              key={level.label}
              className={cn("rounded-xl border p-5", level.accent)}
            >
              <span
                className={cn(
                  "inline-block font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-2.5",
                  level.tag
                )}
              >
                {level.label}
              </span>
              <div className="font-sans text-[14px] text-brand-black/75 leading-relaxed">
                {level.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Section 2: Why this matters now ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="font-mono text-[11px] uppercase tracking-widest text-brand-black/60 mb-3 block">
          URGENTIE
        </span>
        <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-2 leading-tight">
          Waarom dit belangrijk is (nu al)
        </h2>
        <p className="font-sans text-[15px] text-brand-black/70 mb-6 max-w-[580px] leading-relaxed">
          AI maakt het extreem makkelijk om data te gebruiken, te combineren en te automatiseren. Daardoor nemen risico's snel toe, vaak zonder dat organisaties dit doorhebben.
        </p>

        <ul className="space-y-2.5 mb-4">
          <Bullet>Data wordt sneller en op grotere schaal gebruikt</Bullet>
          <Bullet>Je hebt minder zicht op wat er precies gebeurt</Bullet>
          <Bullet>Tools en AI worden vaak zonder duidelijke regels ingezet</Bullet>
          <Bullet>Niemand weet precies waar alle data zit</Bullet>
        </ul>

        <Emphasis>Zonder duidelijke governance verlies je controle.</Emphasis>
      </div>

      <Divider />

      {/* ── Section 3: August 2, 2026 ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="font-mono text-[11px] uppercase tracking-widest text-brand-black/60 mb-3 block">
          DEADLINE
        </span>
        <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-2 leading-tight">
          Wat verandert er op 2 augustus 2026?
        </h2>
        <p className="font-sans text-[15px] text-brand-black/70 mb-2 max-w-[580px] leading-relaxed">
          Dit is het moment waarop de zwaarste regels voor high-risk AI echt gaan gelden.
        </p>
        <p className="font-sans text-[15px] text-brand-black/70 mb-6 max-w-[580px] leading-relaxed">
          Systemen die als 'hoog risico' worden gezien, moeten vanaf dat moment aan strenge eisen voldoen voordat ze gebruikt mogen worden.
        </p>

        <ul className="space-y-2.5 mb-4">
          <Bullet>Je moet risico's actief beheren</Bullet>
          <Bullet>Je moet kunnen uitleggen hoe je systeem werkt</Bullet>
          <Bullet>Je moet bias en datakwaliteit controleren</Bullet>
          <Bullet>Je moet menselijke controle inbouwen</Bullet>
          <Bullet>Je moet documentatie en logging op orde hebben</Bullet>
        </ul>

        <Emphasis>Dit is geen advies, dit wordt verplicht.</Emphasis>
      </div>

      <Divider />

      {/* ── Section 4: You're a "user" sooner than you think ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="font-mono text-[11px] uppercase tracking-widest text-brand-black/60 mb-3 block">
          GOED OM TE WETEN
        </span>
        <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-2 leading-tight">
          Je bent sneller 'gebruiker' dan je denkt
        </h2>
        <p className="font-sans text-[15px] text-brand-black/70 mb-6 max-w-[580px] leading-relaxed">
          Zodra je AI-tools gebruikt in je werk (zoals Copilot, ChatGPT of een intern model), ben je volgens de wet al een 'exploitant' en heb je verplichtingen.
        </p>

        <ul className="space-y-2.5">
          <Bullet>Je moet je personeel trainen (AI literacy)</Bullet>
          <Bullet>Je moet weten wat de tool doet met data</Bullet>
          <Bullet>Je moet regels van de aanbieder volgen</Bullet>
        </ul>
      </div>

      <Divider />

      {/* ── Section 5: What if you do nothing ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="font-mono text-[11px] uppercase tracking-widest text-brand-black/60 mb-3 block">
          CONSEQUENTIES
        </span>
        <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-2 leading-tight">
          Wat als je niets doet?
        </h2>
        <p className="font-sans text-[15px] text-brand-black/70 mb-6 max-w-[580px] leading-relaxed">
          De EU AI Act is geen vrijblijvende richtlijn. Er staan echte consequenties op het niet naleven van de regels.
        </p>

        <ul className="space-y-2.5 mb-4">
          <Bullet>Tot €35 miljoen of 7% van je wereldwijde omzet (zwaarste overtredingen)</Bullet>
          <Bullet>Tot €15 miljoen of 3% (high-risk zonder juiste maatregelen)</Bullet>
          <Bullet>Systemen kunnen verboden of stopgezet worden</Bullet>
          <Bullet>Toezichthouders kunnen audits uitvoeren</Bullet>
        </ul>

        <Emphasis>Dit is vergelijkbaar met hoe GDPR wordt gehandhaafd, maar dan voor AI.</Emphasis>
      </div>

      <Divider />

      {/* ── Section 6: Why this check ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="font-mono text-[11px] uppercase tracking-widest text-brand-black/60 mb-3 block">
          DEZE CHECK
        </span>
        <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-2 leading-tight">
          Waarom deze check?
        </h2>
        <p className="font-sans text-[15px] text-brand-black/70 mb-4 max-w-[580px] leading-relaxed">
          Veel organisaties gebruiken AI in processen die onder high-risk vallen zonder dat ze het weten. Deze check helpt je om daar snel inzicht in te krijgen.
        </p>
        <p className="font-sans text-[15px] text-brand-black/85 font-semibold max-w-[580px]">
          Als je niet zeker weet waar je onder valt, zit je waarschijnlijk dichter bij 'high-risk' dan je denkt.
        </p>
      </div>

      <Divider />

      {/* ── CTA ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
        <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-3">
          Klaar om te checken?
        </h2>
        <p className="font-sans text-[15px] text-brand-black/70 mb-8 max-w-[440px] mx-auto leading-relaxed">
          Beantwoord een aantal korte vragen en ontvang direct een inschatting van het risiconiveau van jouw AI-systeem.
        </p>

        <button
          type="button"
          onClick={onStart}
          className="px-10 py-4 rounded-xl bg-brand-yellow text-brand-black font-semibold text-base
            hover:bg-brand-yellow/90 active:scale-[0.98] transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-4
            shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        >
          Start de check
        </button>

        <p className="font-mono text-xs text-brand-black/55 mt-4">
          Duurt minder dan 5 minuten
        </p>
      </div>

      {/* ── Footer ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 pb-10">
        <div className="h-px bg-brand-black/[0.06] mb-6" />
        <p className="font-mono text-[11px] text-brand-black/50 text-center">
          Deze check is een eerste indicatie en vormt geen juridisch advies.
        </p>
      </div>
    </motion.div>
  );
}
