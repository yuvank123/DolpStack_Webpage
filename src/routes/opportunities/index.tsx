import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getOpportunitiesFn } from "@/lib/api/opportunities";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { OpportunityCard } from "@/components/portal/OpportunityCard";
import { Opportunity } from "@/lib/types/portal";
import { Search, Briefcase, Trophy, Filter, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/opportunities/")({
  loader: async () => {
    const result = await getOpportunitiesFn();
    return result;
  },
  component: OpportunitiesListPage,
});

function OpportunitiesListPage() {
  const { opportunities } = Route.useLoaderData();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOpportunities = opportunities.filter((opp: Opportunity) => {
    const matchesType =
      selectedType === "all" ? true : opp.type.toLowerCase() === selectedType.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      opp.title.toLowerCase().includes(query) ||
      opp.description.toLowerCase().includes(query) ||
      opp.eligibility.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });

  const internshipCount = opportunities.filter((o: Opportunity) => o.type === "internship").length;
  const hackathonCount = opportunities.filter((o: Opportunity) => o.type === "hackathon").length;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <PortalHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header Hero Section */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/30 p-8 sm:p-12 backdrop-blur-xl shadow-xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>DolpStack Opportunities Hub</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Build the Future.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-400 dark:via-blue-400 dark:to-cyan-400">
                Ship at Scale.
              </span>
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
              Explore high-impact summer engineering internships and global competitive hackathons.
              Work with modern developer tools, distributed web architectures, and autonomous AI
              systems.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3.5 py-1.5 text-xs font-medium backdrop-blur-xs">
                <Layers className="h-4 w-4 text-blue-500" />
                <span>{opportunities.length} Open Opportunities</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3.5 py-1.5 text-xs font-medium backdrop-blur-xs">
                <Briefcase className="h-4 w-4 text-indigo-500" />
                <span>{internshipCount} Internships</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3.5 py-1.5 text-xs font-medium backdrop-blur-xs">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>{hackathonCount} Hackathons</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Type Filter Buttons */}
          <div className="inline-flex rounded-xl border border-border/60 bg-muted/30 p-1 backdrop-blur-sm">
            <button
              onClick={() => setSelectedType("all")}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                selectedType === "all"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({opportunities.length})
            </button>
            <button
              onClick={() => setSelectedType("internship")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                selectedType === "internship"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              Internships ({internshipCount})
            </button>
            <button
              onClick={() => setSelectedType("hackathon")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                selectedType === "hackathon"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              Hackathons ({hackathonCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search opportunities..."
              className="pl-9 bg-card/50 backdrop-blur-xs text-sm"
            />
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="mt-8">
          {filteredOpportunities.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/20 py-16 text-center">
              <Filter className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-semibold text-foreground">No opportunities found</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                No matching opportunities found for your criteria. Try adjusting your search query
                or filter selection.
              </p>
              <button
                onClick={() => {
                  setSelectedType("all");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((opp: Opportunity) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
