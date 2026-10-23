import { useState } from "react";
import { ChevronDown, ChevronUp, ListFilter, Bookmark, Search } from "lucide-react";
import { PRIVACY_POLICY_CONFIG } from "@/lib/privacy-policy-config";

interface PrivacyTableOfContentsProps {
  activeSectionId: string;
  onSectionClick?: (id: string) => void;
}

export function PrivacyTableOfContents({
  activeSectionId,
  onSectionClick,
}: PrivacyTableOfContentsProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const activeSection = PRIVACY_POLICY_CONFIG.sections.find(
    (section) => section.id === activeSectionId,
  );

  const filteredSections = PRIVACY_POLICY_CONFIG.sections.filter((s) =>
    s.title.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    onSectionClick?.(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      {/* Mobile Collapsible Table of Contents */}
      <div className="mb-8 block rounded-2xl border border-border/70 bg-card/75 p-4 backdrop-blur-xl shadow-md lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between text-left text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-toc-list"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
              <ListFilter className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                Table of Contents
              </span>
              {activeSection && (
                <span className="truncate text-xs font-medium text-foreground">
                  {activeSection.number}. {activeSection.title}
                </span>
              )}
            </div>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
            {isMobileOpen ? (
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            )}
          </div>
        </button>

        {isMobileOpen && (
          <nav
            id="mobile-toc-list"
            aria-label="Mobile Table of Contents"
            className="mt-4 border-t border-border/60 pt-3"
          >
            <ol className="max-h-72 space-y-1 overflow-y-auto pr-1 text-xs">
              {PRIVACY_POLICY_CONFIG.sections.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => handleClick(e, section.id)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/15 to-indigo-500/15 text-blue-700 dark:text-cyan-300 font-semibold border-l-2 border-blue-500"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      <span>
                        {section.number}. {section.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>

      {/* Desktop Sticky Table of Contents */}
      <aside
        className="sticky top-20 hidden lg:block rounded-2xl border border-border/70 bg-card/75 p-5 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-none"
        aria-label="Table of Contents"
      >
        {/* Subtle ambient highlight line */}
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-blue-500" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              On This Page
            </span>
          </div>
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            18 Sections
          </span>
        </div>

        {/* Quick section filter input */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter sections..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-background/50 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary backdrop-blur-xs"
          />
        </div>

        <nav className="max-h-[calc(100vh-13rem)] overflow-y-auto pr-1">
          <ol className="space-y-1 text-xs">
            {filteredSections.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleClick(e, section.id)}
                    className={`group flex items-start gap-2.5 rounded-lg px-3 py-2 leading-snug transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/15 to-indigo-500/10 text-blue-700 dark:text-cyan-300 font-semibold border-l-2 border-blue-500 shadow-xs"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span
                      className={`font-mono text-[11px] shrink-0 ${
                        isActive ? "text-blue-600 dark:text-cyan-400 font-bold" : "opacity-60"
                      }`}
                    >
                      {section.number.toString().padStart(2, "0")}
                    </span>
                    <span className="flex-1">{section.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>
    </>
  );
}
