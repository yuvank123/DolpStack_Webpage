import { Link } from "@tanstack/react-router";
import { Opportunity } from "@/lib/types/portal";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Briefcase,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { id, title, type, description, eligibility, benefits, application_deadline, is_active } =
    opportunity;

  const deadlineDate = new Date(application_deadline);
  const now = new Date();
  const isExpired = deadlineDate < now;
  const isClosed = !is_active || isExpired;

  // Calculate days remaining
  const diffTime = deadlineDate.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const formattedDeadline = deadlineDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Top ambient highlight on hover */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
          <div className="flex items-center gap-2">
            {type === "internship" ? (
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium px-2.5 py-0.5"
              >
                <Briefcase className="h-3.5 w-3.5" />
                Internship
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium px-2.5 py-0.5"
              >
                <Trophy className="h-3.5 w-3.5" />
                Hackathon
              </Badge>
            )}

            {isClosed ? (
              <Badge
                variant="secondary"
                className="bg-destructive/10 text-destructive border-destructive/20 text-xs"
              >
                Applications Closed
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs"
              >
                Active
              </Badge>
            )}
          </div>

          {/* Deadline Countdown */}
          {!isClosed && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
              <Clock className="h-3.5 w-3.5 text-primary/80" />
              <span>
                {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link to="/opportunities/$id" params={{ id }}>
            {title}
          </Link>
        </h3>

        {/* Description snippet */}
        <p className="mt-2.5 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Info Grid */}
        <div className="mt-5 space-y-3 rounded-lg border border-border/50 bg-muted/20 p-3.5 text-xs text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground block mb-0.5">Eligibility:</span>
            <p className="line-clamp-2">{eligibility}</p>
          </div>
          <div>
            <span className="font-semibold text-foreground block mb-0.5">Key Benefits:</span>
            <p className="line-clamp-2">{benefits}</p>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="mt-6 pt-4 border-t border-border/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>Deadline: {formattedDeadline}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/opportunities/$id"
            params={{ id }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-md border border-border/80 bg-background/60 px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted"
          >
            Details
          </Link>

          {isClosed ? (
            <button
              disabled
              className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-md bg-muted px-3.5 py-2 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-60"
            >
              Closed
            </button>
          ) : (
            <Link
              to="/opportunities/$id/apply"
              params={{ id }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-md hover:-translate-y-0.5"
            >
              Apply Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
