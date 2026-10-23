import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-muted hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
