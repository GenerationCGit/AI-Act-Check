export function DisclaimerFooter() {
  return (
    <footer className="py-8 text-center">
      <p className="font-mono text-xs text-brand-black/30 max-w-[480px] mx-auto">
        Deze check is een eerste indicatie en vormt geen juridisch advies.
      </p>
      <p className="font-mono text-[11px] text-brand-black/35 mt-2">
        Design &amp; ontwikkeling door{" "}
        <a
          href="https://www.generation-c.nl/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="font-semibold text-brand-black/60 underline-offset-2 decoration-brand-black/40 hover:text-brand-black hover:underline transition-colors duration-200"
        >
          Generation C B.V.
        </a>
      </p>
    </footer>
  );
}
