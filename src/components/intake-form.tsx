import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import type { IntakeData } from "../lib/types";
import { cn } from "../lib/utils";

interface IntakeFormProps {
  data: IntakeData;
  onSubmit: (data: IntakeData) => void;
  onBack: () => void;
}

const SECTOR_OPTIONS = [
  "Accountancy / belasting",
  "Detailhandel / e-commerce",
  "Financiële dienstverlening",
  "HR / recruitment",
  "Industrie / productie",
  "Juridische dienstverlening",
  "Logistiek / supply chain",
  "Marketing / communicatie",
  "Media / entertainment",
  "Non-profit / ngo",
  "Onderwijs",
  "Overheid / publieke dienstverlening",
  "Real estate / vastgoed",
  "Technologie / software",
  "Toerisme / horeca",
  "Zorg / welzijn",
  "Zakelijke dienstverlening",
  "Anders",
];

const COMPANY_SIZE_OPTIONS = [
  "1 tot 10 medewerkers",
  "11 tot 50 medewerkers",
  "51 tot 250 medewerkers",
  "251 tot 1000 medewerkers",
  "1000+ medewerkers",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^(https?:\/\/)?[\w.-]+\.\w{2,}/;

type FieldErrors = Partial<Record<keyof IntakeData, string>>;

function validate(data: IntakeData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Naam is verplicht";
  if (!data.email.trim()) errors.email = "E-mailadres is verplicht";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Voer een geldig e-mailadres in";
  if (!data.companyName.trim()) errors.companyName = "Bedrijfsnaam is verplicht";
  if (data.website.trim() && !URL_RE.test(data.website))
    errors.website = "Voer een geldige URL in";
  if (!data.sector || data.sector === "Anders") errors.sector = "Selecteer of vul een sector in";
  if (!data.companySize) errors.companySize = "Selecteer een bedrijfsgrootte";
  if (!data.aiSystemsUsed.trim())
    errors.aiSystemsUsed = "Beschrijf welke AI-systemen jullie gebruiken";
  return errors;
}

function InputLabel({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block font-mono text-[11px] uppercase tracking-wider text-brand-black/70 mb-2">
      {children}
      {required && <span className="text-brand-yellow ml-0.5">*</span>}
    </label>
  );
}

const inputBase = cn(
  "w-full rounded-lg border bg-white px-4 py-3 font-sans text-[15px] text-[#232323]",
  "placeholder:text-brand-black/30",
  "transition-all duration-200",
  "focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow"
);

const selectBase = cn(
  inputBase,
  "appearance-none cursor-pointer",
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%23232323%22%20fill-opacity%3D%220.5%22%20d%3D%22M4%206l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')]",
  "bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
);

function fieldBorder(error?: string) {
  return error ? "border-red-300" : "border-brand-black/[0.12]";
}

export function IntakeForm({ data, onSubmit, onBack }: IntakeFormProps) {
  const [form, setForm] = useState<IntakeData>(data);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState(false);

  function update<K extends keyof IntakeData>(key: K, value: IntakeData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  }

  const sliderPercent = ((form.aiUsageLevel - 1) / 9) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Progress hint */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1.5 flex-1 rounded-full bg-brand-off-white overflow-hidden">
          <div className="h-full w-0 rounded-full bg-brand-yellow" />
        </div>
        <span className="font-mono text-[11px] text-brand-black/55 flex-shrink-0">Stap 1</span>
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-brand-black/60 mb-3 block">
        EERST EVEN DIT
      </span>

      <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-2 leading-tight">
        Vul je gegevens in voor een persoonlijke uitkomst
      </h2>

      <p className="font-sans text-[15px] text-brand-black/70 mb-8 max-w-[520px] leading-relaxed">
        Op basis van je sector en AI-gebruik stemmen we de resultaten af op jouw situatie.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-6">
          <div>
            <InputLabel htmlFor="intake-name" required>Naam</InputLabel>
            <input
              id="intake-name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={cn(inputBase, fieldBorder(errors.name))}
              autoComplete="name"
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </div>

          <div>
            <InputLabel htmlFor="intake-email" required>E-mailadres</InputLabel>
            <input
              id="intake-email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={cn(inputBase, fieldBorder(errors.email))}
              autoComplete="email"
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </div>

          <div>
            <InputLabel htmlFor="intake-company" required>Bedrijfsnaam</InputLabel>
            <input
              id="intake-company"
              type="text"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              className={cn(inputBase, fieldBorder(errors.companyName))}
              autoComplete="organization"
            />
            {errors.companyName && <FieldError>{errors.companyName}</FieldError>}
          </div>

          <div>
            <InputLabel htmlFor="intake-website">Website</InputLabel>
            <input
              id="intake-website"
              type="url"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://..."
              className={cn(inputBase, fieldBorder(errors.website))}
              autoComplete="url"
            />
            {errors.website && <FieldError>{errors.website}</FieldError>}
          </div>

          <div>
            <InputLabel htmlFor="intake-sector" required>Sector</InputLabel>
            <select
              id="intake-sector"
              value={SECTOR_OPTIONS.includes(form.sector) ? form.sector : form.sector ? "Anders" : ""}
              onChange={(e) => {
                if (e.target.value === "Anders") {
                  update("sector", "Anders");
                } else {
                  update("sector", e.target.value);
                }
              }}
              className={cn(
                selectBase,
                fieldBorder(errors.sector),
                !form.sector && "text-brand-black/30"
              )}
            >
              <option value="" disabled className="text-brand-black/40">Selecteer een sector</option>
              {SECTOR_OPTIONS.map((s) => (
                <option key={s} value={s} className="text-[#232323] bg-white">{s}</option>
              ))}
            </select>
            {(form.sector === "Anders" || (form.sector && !SECTOR_OPTIONS.slice(0, -1).includes(form.sector))) && (
              <input
                type="text"
                placeholder="Vul je sector in"
                value={form.sector === "Anders" ? "" : form.sector}
                onChange={(e) => update("sector", e.target.value)}
                className={cn(inputBase, fieldBorder(errors.sector), "mt-2")}
                autoFocus
              />
            )}
            {errors.sector && <FieldError>{errors.sector}</FieldError>}
          </div>

          <div>
            <InputLabel htmlFor="intake-size" required>Bedrijfsgrootte</InputLabel>
            <select
              id="intake-size"
              value={form.companySize}
              onChange={(e) => update("companySize", e.target.value)}
              className={cn(
                selectBase,
                fieldBorder(errors.companySize),
                !form.companySize && "text-brand-black/30"
              )}
            >
              <option value="" disabled className="text-brand-black/40">Selecteer bedrijfsgrootte</option>
              {COMPANY_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s} className="text-[#232323] bg-white">{s}</option>
              ))}
            </select>
            {errors.companySize && <FieldError>{errors.companySize}</FieldError>}
          </div>
        </div>

        {/* AI usage slider — full width */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <InputLabel htmlFor="intake-ai-level" required>Hoeveel AI gebruikt jouw organisatie?</InputLabel>
            <span className="font-mono text-lg font-semibold text-brand-black tabular-nums">
              {form.aiUsageLevel}
            </span>
          </div>

          <div className="relative pt-1 pb-1">
            {/* Track background */}
            <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full bg-brand-black/[0.06]" />
            {/* Active track */}
            <div
              className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-brand-yellow"
              style={{ width: `${sliderPercent}%` }}
            />
            {/* Input */}
            <input
              id="intake-ai-level"
              type="range"
              min={1}
              max={10}
              step={1}
              value={form.aiUsageLevel}
              onChange={(e) => update("aiUsageLevel", Number(e.target.value))}
              className="slider-input relative z-10 w-full appearance-none bg-transparent cursor-pointer"
            />
          </div>

          <div className="flex justify-between mt-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-brand-black/55">Laag</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-brand-black/55">Hoog</span>
          </div>
          <p className="font-mono text-[10px] text-brand-black/55 mt-1">
            1 = nauwelijks, 10 = volledig geïntegreerd in processen
          </p>
        </div>

        {/* AI systems textarea — full width */}
        <div className="mb-2">
          <InputLabel htmlFor="intake-ai" required>Welke AI-systemen gebruik je binnen je organisatie?</InputLabel>
          <textarea
            id="intake-ai"
            value={form.aiSystemsUsed}
            onChange={(e) => update("aiSystemsUsed", e.target.value)}
            placeholder="Bijvoorbeeld: ChatGPT, Copilot, cv-screening software, aanbevelingssystemen..."
            rows={3}
            className={cn(inputBase, fieldBorder(errors.aiSystemsUsed), "resize-none")}
          />
          {errors.aiSystemsUsed && <FieldError>{errors.aiSystemsUsed}</FieldError>}
        </div>
        <div className="mb-8 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 px-4 py-3">
          <p className="font-sans text-[13px] text-brand-black/70 leading-snug">
            <span className="font-semibold text-brand-black">Let op:</span> de vragen hierna gelden voor één systeem tegelijk. Zet hier al je systemen neer, daarna kun je de check per systeem herhalen.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-lg text-sm font-sans text-brand-black/50 hover:text-brand-black hover:bg-brand-off-white transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
          >
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Terug
            </span>
          </button>

          <div className="flex flex-col items-end gap-1.5">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-brand-yellow text-brand-black font-semibold text-sm
                hover:bg-brand-yellow/90 active:scale-[0.98] transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-4
                shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
            >
              Verder naar de check
            </button>
            <span className="font-mono text-xs text-brand-black/55">
              Je bent zo klaar.
            </span>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] text-red-500 mt-1.5">{children}</p>
  );
}
