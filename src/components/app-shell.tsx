import { type ReactNode, useEffect, useState } from "react";
import type { AppState } from "../lib/types";
import { getSubmissionCount } from "../lib/submission-store";
import { exportSubmissionsToExcel } from "../lib/excel-export";

interface AppShellProps {
  children: ReactNode;
  appState: AppState;
}

export function AppShell({ children, appState }: AppShellProps) {
  const isLanding = appState === "landing";
  const isLoading = appState === "loading";

  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    setSubmissionCount(getSubmissionCount());
  }, [appState]);

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

      {/* Export button — top-right, only visible when submissions exist */}
      {submissionCount > 0 && (
        <div className="fixed top-5 right-5 md:top-7 md:right-8 z-50">
          <button
            onClick={exportSubmissionsToExcel}
            title={`${submissionCount} inzending${submissionCount !== 1 ? "en" : ""} exporteren`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-brand-black/[0.1] shadow-sm
              font-mono text-[11px] text-brand-black/60 hover:text-brand-black hover:border-brand-black/20
              transition-all duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export ({submissionCount})
          </button>
        </div>
      )}

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
