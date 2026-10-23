import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function PrivacyHeader() {
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
      // Ignored
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12 xl:px-16 flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="DolpStack Home">
          <img
            src="/dolpstack_logo_light.png"
            className="h-8 w-30 object-contain rounded-md dark:hidden"
            alt="DolpStack Logo"
          />
          <img
            src="/dolpstack_logo_dark.png"
            className="hidden h-8 w-30 object-contain rounded-md dark:block"
            alt="DolpStack Logo"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="/#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="/#modules" className="transition-colors hover:text-foreground">
            Modules
          </a>
          <a href="/#how-it-works" className="transition-colors hover:text-foreground">
            Workflow
          </a>
          <a href="/#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
