import { Calendar, Clock, ShieldCheck, Building2 } from "lucide-react";
import { PRIVACY_POLICY_CONFIG } from "@/lib/privacy-policy-config";

export function PrivacyHero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 md:py-16">
      {/* Background radial blurs matching DolpStack hero theme */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 -top-12 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-[5%] top-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-[5%] bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-card/85 via-card/50 to-card/25 p-7 sm:p-10 md:p-12 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-none">
          {/* Subtle top ambient border highlight */}
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          <div className="max-w-3xl space-y-4">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-cyan-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>DolpBrain Compliance &amp; Transparency</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Privacy{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-400 dark:via-blue-400 dark:to-cyan-400">
                Policy
              </span>
            </h1>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              This policy describes how {PRIVACY_POLICY_CONFIG.businessName} collects, uses, stores,
              shares, and protects personal information when you visit our website, use our mobile
              application, or build with our developer tools and workspace services.
            </p>

            {/* Quick metadata pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 sm:gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/60 px-3.5 py-1.5 text-xs font-medium backdrop-blur-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>
                  Effective:{" "}
                  <strong className="font-semibold text-foreground">
                    {PRIVACY_POLICY_CONFIG.effectiveDate}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/60 px-3.5 py-1.5 text-xs font-medium backdrop-blur-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span>
                  Last Updated:{" "}
                  <strong className="font-semibold text-foreground">
                    {PRIVACY_POLICY_CONFIG.lastUpdated}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/60 px-3.5 py-1.5 text-xs font-medium backdrop-blur-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                <span>MSME Registered Business (India)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
