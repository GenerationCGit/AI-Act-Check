import type { ReactNode } from "react";
import type { AppState } from "../lib/types";

interface AppShellProps {
  children: ReactNode;
  appState: AppState;
}

export function AppShell({ children, appState }: AppShellProps) {
  const isLanding = appState === "landing";
  const isLoading = appState === "loading";

  return (
    <div className="fixed inset-0 overflow-hidden bg-brand-off-white">
      {/* Fixed logo — top-left, always visible */}
      <div className="fixed top-5 left-5 md:top-8 md:left-8 z-50">
        <img
          src="/logo-full.png"
          alt="Generation C"
          className="h-7 md:h-8 w-auto"
        />
      </div>

      {/* Scrollable content area */}
      <div className="absolute inset-0 z-10 overflow-y-auto">
        {isLanding ? (
          /* Landing: full-width editorial page */
          <div className="min-h-full">
            {children}
          </div>
        ) : isLoading ? (
          /* Loading: centered, no card */
          <div className="min-h-full flex items-center justify-center px-4">
            <div className="w-full max-w-content">
              {children}
            </div>
          </div>
        ) : (
          /* All other states: centered card */
          <div className="min-h-full flex items-start md:items-center justify-center px-4 py-20 md:py-12">
            <div className="w-full max-w-content bg-white rounded-2xl border border-brand-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-6 md:p-10">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Icon-only logo (Mark) — exported for use in the loading screen. */
export function LogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo-icon.png"
      alt="Generation C"
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
