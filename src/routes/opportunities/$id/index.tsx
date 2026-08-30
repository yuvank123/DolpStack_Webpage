import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getOpportunityByIdFn } from "@/lib/api/opportunities";
import { PortalHeader } from "@/components/portal/PortalHeader";
import {
  Calendar,
  Clock,
  Briefcase,
  Trophy,
  CheckCircle2,
  Gift,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/opportunities/$id/")({
  loader: async ({ params }) => {
    const res = await getOpportunityByIdFn({ data: { id: params.id } });
    if (!res.opportunity) {
      throw notFound();
    }
    return res.opportunity;
  },
  component: OpportunityDetailsPage,
});

function OpportunityDetailsPage() {
  const opp = Route.useLoaderData();

  const deadlineDate = new Date(opp.application_deadline);
  const now = new Date();
  const isExpired = deadlineDate < now;
  const isClosed = !opp.is_active || isExpired;

  const diffTime = deadlineDate.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const formattedDeadline = deadlineDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <PortalHeader backTo="/opportunities" backLabel="All Opportunities" />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb row */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pb-6">
          <Link to="/opportunities" className="hover:text-foreground transition-colors">
            Opportunities
          </Link>
          <span>/</span>
          <span className="capitalize">{opp.type}</span>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">
            {opp.title}
          </span>
        </div>

        {/* Closed Banner if applicable */}
        {isClosed && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">Applications are currently closed</p>
              <p className="text-xs opacity-90">
                {isExpired
                  ? `The deadline for this opportunity expired on ${formattedDeadline}.`
                  : "This opportunity is not currently active."}
              </p>
            </div>
          </div>
        )}

        {/* Header Hero Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-card/90 to-card/40 p-6 sm:p-10 backdrop-blur-xl shadow-xl">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {opp.type === "internship" ? (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium px-3 py-1"
                  >
                    <Briefcase className="h-4 w-4" />
                    Internship Opportunity
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium px-3 py-1"
                  >
                    <Trophy className="h-4 w-4" />
                    Hackathon
                  </Badge>
                )}

                {isClosed ? (
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive text-xs">
                    Closed
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs"
                  >
                    Active
                  </Badge>
                )}
              </div>

              {!isClosed && (
                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-xs">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>
                    {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-foreground">
              {opp.title}
            </h1>

            {/* Quick Summary Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground border-y border-border/50 py-3.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary/80" />
                <span>Deadline: {formattedDeadline}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Direct Review by DolpStack Engineering Team</span>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {isClosed ? (
                <button
                  disabled
                  className="inline-flex items-center justify-center rounded-xl bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed opacity-60"
                >
                  Applications Closed
                </button>
              ) : (
                <Link
                  to="/opportunities/$id/apply"
                  params={{ id: opp.id }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  Apply for this {opp.type === "internship" ? "Internship" : "Hackathon"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              <Link
                to="/opportunities"
                className="inline-flex items-center justify-center rounded-xl border border-border/80 bg-background/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Browse Other Roles
              </Link>
            </div>
          </div>
        </div>

        {/* Content Breakdown Sections */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description Section */}
            <section className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-lg font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                About This Opportunity
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {opp.description}
              </p>
            </section>

            {/* Eligibility Section */}
            <section className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-lg font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-indigo-500" />
                Eligibility Criteria
              </h2>
              <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {opp.eligibility}
              </div>
            </section>

            {/* Benefits Section */}
            <section className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-lg font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
                <Gift className="h-4 w-4 text-amber-500" />
                Perks & Benefits
              </h2>
              <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {opp.benefits}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Application Overview Box */}
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-md space-y-4">
              <h3 className="text-base font-bold text-foreground">Application Overview</h3>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="font-medium text-foreground">Type:</span>
                  <span className="capitalize">{opp.type}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="font-medium text-foreground">Status:</span>
                  <span
                    className={
                      isClosed ? "text-destructive font-semibold" : "text-emerald-500 font-semibold"
                    }
                  >
                    {isClosed ? "Closed" : "Open for Applications"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="font-medium text-foreground">Resume Required:</span>
                  <span className="text-foreground">No resume needed</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="font-medium text-foreground">Application Fee:</span>
                  <span className="text-emerald-500 font-semibold">100% Free</span>
                </div>
              </div>

              {!isClosed && (
                <div className="pt-2">
                  <Link
                    to="/opportunities/$id/apply"
                    params={{ id: opp.id }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
                  >
                    Start Application <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Custom Opportunity Questions Overview (if any) */}
            {opp.fields && opp.fields.length > 0 && (
              <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-md space-y-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-500" />
                  Custom Application Questions
                </h3>
                <p className="text-xs text-muted-foreground">
                  The application form includes {opp.fields.length} tailored questions:
                </p>
                <ul className="space-y-2 pt-1 text-xs text-muted-foreground">
                  {opp.fields.map((f) => (
                    <li key={f.id} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>
                        <strong className="text-foreground">{f.label}</strong>{" "}
                        {f.required ? "(Required)" : "(Optional)"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
