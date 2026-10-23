import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        {/* Brand + MSME */}
        <div className="flex items-center gap-4">
          {/* DolpStack Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/dolpstack_logo_light.png"
              className="h-6 w-25 rounded-md object-contain dark:hidden"
              alt="DolpStack Logo"
            />
            <img
              src="/dolpstack_logo_dark.png"
              className="hidden h-6 w-25 rounded-md object-contain dark:block"
              alt="DolpStack Logo"
            />
          </div>

          {/* MSME Registration */}
          <div className="flex items-center border-l border-border/50 pl-4">
            <img
              src="/msme_light.png"
              className="hidden h-9 w-auto object-contain dark:block"
              alt="MSME Registered"
            />
            <img
              src="/msme.png"
              className="h-9 w-auto object-contain dark:hidden"
              alt="MSME Registered"
            />
          </div>
        </div>

        {/* Footer Links + Copyright */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <Link to="/privacy-policy" className="font-medium transition-colors hover:text-foreground">
            Terms of Service
          </Link>

          <span aria-hidden="true">•</span>

          <Link
            to="/privacy-policy"
            className="font-medium transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>

          <span aria-hidden="true">•</span>

          <span>© 2026 DolpStack. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
