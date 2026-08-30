import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sun, Moon, Sparkles, ArrowLeft } from "lucide-react";

export function PortalHeader({ backTo, backLabel }: { backTo?: string; backLabel?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const r = document.documentElement;
    r.classList.toggle("dark", next === "dark");
    r.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <img
              src="/logo-light.png"
              className="h-7 w-7 rounded-md object-contain dark:hidden"
              alt="DolpStack"
            />
            <img
              src="/logo-dark.png"
              className="hidden h-7 w-7 rounded-md object-contain dark:block"
              alt="DolpStack"
            />
            <div className="flex flex-col">
              <span className="text-[15px] font-bold tracking-tight text-foreground">
                DolpStack
              </span>
              <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                Careers & Hackathons
              </span>
            </div>
          </Link>

          {backTo && (
            <Link
              to={backTo}
              className="hidden items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {backLabel || "Back"}
            </Link>
          )}
        </div>

        <nav className="flex items-center gap-4">
          <Link
            to="/opportunities"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            All Opportunities
          </Link>
          <Link
            to="/"
            className="hidden text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline sm:text-sm"
          >
            Product Tour
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
