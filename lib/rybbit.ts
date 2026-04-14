// Rybbit custom-event helper.
//
// Only fires anonymous step markers for funnel analysis — no quiz answers,
// no persona outcomes, no user-identifying data. If Rybbit is not loaded
// (e.g. local dev without RYBBIT_SITE_ID) this is a no-op.

type RybbitProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    rybbit?: {
      event: (name: string, props?: RybbitProps) => void;
    };
  }
}

export function track(name: string, props?: RybbitProps): void {
  if (typeof window === 'undefined') return;
  window.rybbit?.event(name, props);
}
