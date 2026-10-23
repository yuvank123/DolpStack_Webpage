import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Sun,
  Moon,
  Minus,
  Bug,
  Search,
  Code2,
  Languages,
  LayoutDashboard,
  MessageCircle,
  PenTool,
  Users,
  UserRound,
  Flame,
  Network,
  Gamepad2,
  Mail,
} from "lucide-react";
import { PrecisionCanvas } from "@/components/PrecisionCanvas";
import { ProductTour } from "@/components/ProductTour";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroProductVisual } from "@/components/HeroProductVisual";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ *
 * DESIGN TOKENS
 *   Blue  #0b2fd1   Lime  #c6ff00   White / background (theme aware)
 *   Type: Archivo (wide, black) for display · Inter for body
 * ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap');
.font-wide{font-family:Archivo,Inter,system-ui,sans-serif;font-stretch:125%;font-weight:900;text-transform:uppercase;letter-spacing:-0.035em}
.hero-grid{background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:56px 56px}
@keyframes dolp-float{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-12px) rotate(var(--r,0deg))}}
@keyframes dolp-spin{to{transform:rotate(360deg)}}
@keyframes dolp-marquee{to{transform:translateX(-50%)}}
.float-a{animation:dolp-float 6s ease-in-out infinite}
.float-b{animation:dolp-float 7s ease-in-out -2s infinite}
.spin-slow{animation:dolp-spin 16s linear infinite}
.marquee-track{animation:dolp-marquee 32s linear infinite}
@media (prefers-reduced-motion:reduce){.float-a,.float-b,.spin-slow,.marquee-track{animation:none}}
`;

const container = "mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 xl:px-16";

// Every "Start learning" button points here. Swap "#" for a real page later.
const CTA_HREF = "#";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
      <style>{GLOBAL_CSS}</style>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <ProductVisualSection />
        <CarouselSection />
        <Mission />
        <Modules />
        <Walkthrough />
        <Comparison />
        <Steps />
        <Precision />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------------------- primitives ---------------------------- */

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const r = document.documentElement;
    r.classList.toggle("dark", next === "dark");
    r.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignored
    }
  };
  return { theme, toggle };
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6ff00]"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#c6ff00] px-3 py-1 text-[11px] font-bold text-[#0b2fd1]">
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <Reveal className="mb-10 max-w-3xl space-y-4 md:mb-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-wide text-[clamp(1.9rem,6vw,4rem)] leading-[0.95]">{title}</h2>
      {body && <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{body}</p>}
    </Reveal>
  );
}

/* -------------------------------- nav -------------------------------- */

function Nav() {
  const links = [
    ["Features", "#features"],
    ["Modules", "#modules"],
    ["Workflow", "#how-it-works"],
    ["FAQ", "#faq"],
  ];
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <a href="#" className="flex shrink-0 items-center" aria-label="DolpStack home">
          <img
            src="/dolpstack_logo_light.png"
            className="h-8 w-auto max-w-[140px] object-contain dark:hidden"
            alt="DolpStack Logo"
          />
          <img
            src="/dolpstack_logo_dark.png"
            className="hidden h-8 w-auto max-w-[140px] object-contain dark:block"
            alt="DolpStack Logo"
          />
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-[#0b2fd1] hover:bg-[#0b2fd1] hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Email: full address on lg+, icon-only on smaller screens */}
          <a
            href="mailto:dolpstack@gmail.com"
            aria-label="Email DolpStack"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#0b2fd1] px-3 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B6FF00] hover:text-black lg:px-4"
          >
            <Mail className="h-4 w-4" />
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- hero -------------------------------- */

function GlassCard({
  avatar,
  name,
  stat,
  className = "",
}: {
  avatar: string;
  name: string;
  stat: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-20 w-[116px] rounded-[22px] border border-white/40 bg-white/20 p-3 text-center text-white shadow-2xl backdrop-blur-xl sm:w-[150px] sm:rounded-[28px] sm:p-4 md:w-[190px] md:p-5 ${className}`}
    >
      <img
        src={avatar}
        alt={`${name} profile`}
        className="mx-auto h-11 w-11 rounded-full border-2 border-white/70 object-cover sm:h-14 sm:w-14 md:h-16 md:w-16"
      />

      <div className="mt-2 truncate text-[11px] font-bold sm:text-sm md:mt-3">{name}</div>

      <div className="text-[9px] text-white/75 sm:text-[11px]">{stat}</div>
    </div>
  );
}

function Scribble({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 text-[#c6ff00] ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M20 130 C 10 60, 90 10, 150 40 C 190 62, 170 110, 120 100 C 80 92, 100 50, 150 70"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M128 96 L 154 72 L 120 62"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Badge({ className = "" }: { className?: string }) {
  return (
    <a
      href={CTA_HREF}
      aria-label="Get started for free"
      className={`group absolute z-30 aspect-square rounded-full bg-[#c6ff00] text-[#0b2fd1] shadow-xl transition-transform hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
        <defs>
          <path id="dolp-badge" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text fill="currentColor" fontSize="15" fontWeight="900" style={{ whiteSpace: "pre" }}>
          <textPath href="#dolp-badge" textLength="446" lengthAdjust="spacing">
            {"START LEARNING • IT'S FREE • START LEARNING • IT'S FREE • "}
          </textPath>
        </text>
      </svg>
      <ArrowUpRight className="absolute inset-0 m-auto h-1/3 w-1/3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function Hero() {
  const cards = [
    {
      title: "Post your bug",
      body: "Share the error, the code and what you already tried.",
      visual: (
        <div className="flex items-center gap-2">
          <code className="rounded-lg bg-foreground px-3 py-2 text-[11px] text-background">
            401 Unauthorized
          </code>
          <span className="rounded-full bg-[#c6ff00] px-3 py-1.5 text-[11px] font-bold text-[#0b2fd1]">
            Open
          </span>
        </div>
      ),
    },
    {
      title: "Compare approaches",
      body: "See how other developers reason through the same problem.",
      visual: (
        <div className="flex items-center justify-between rounded-full bg-[#0b2fd1] px-5 py-2.5 text-white">
          <span className="text-[11px] font-medium">Approaches</span>
          <span className="font-wide text-lg">3</span>
        </div>
      ),
    },
    {
      title: "Mark it solved",
      body: "Accept the fix that worked and grow a library of answers.",
      visual: (
        <div className="inline-flex items-center gap-2 rounded-full bg-[#c6ff00] px-4 py-2 text-xs font-bold text-[#0b2fd1]">
          <Check className="h-4 w-4" strokeWidth={3} /> Resolved
        </div>
      ),
    },
  ];

  return (
    <section className="px-3 pt-2 md:px-6">
      <div className="hero-grid relative mx-auto max-w-[1600px] overflow-hidden rounded-[32px] bg-[#0b2fd1] md:rounded-[48px]">
        {/* headline block */}
        <div className="relative px-4 pt-14 text-center text-white md:pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-wide relative mx-auto max-w-[1300px] leading-[0.88] tracking-[-0.04em]"
          >
            <span className="relative inline-block text-[clamp(2.5rem,11vw,9.5rem)]">
              <span className="absolute -left-[0.55em] -top-[0.25em] -rotate-6 text-[#c6ff00]">
                #
              </span>
              Learn
            </span>
            <br />
            <span className="text-[clamp(2.1rem,9.5vw,8rem)]">Code with</span>
            <br />
            <span className="text-[clamp(1.8rem,8.5vw,7rem)]">Developers</span>
          </motion.h1>

          <Scribble className="right-[34%] top-[6%] hidden w-24 md:block md:w-40 lg:right-[24%]" />
        </div>

        {/* description + CTAs (tight gap under the headline) */}
        <div className="relative px-5 pb-10 pt-5 text-center text-white md:pb-14 md:pt-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            className="mx-auto max-w-xl text-base text-white/85 md:text-lg"
          >
            A developer workspace where freshers learn, developers connect, and everyone builds
            better code together.
          </motion.p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CTA_HREF}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c6ff00] px-7 py-3.5 text-sm font-extrabold text-[#0b2fd1] shadow-[0_8px_0_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_0_rgba(0,0,0,0.25)] active:translate-y-1 active:shadow-none sm:w-auto"
            >
              Start learning
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-white px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#0b2fd1] sm:w-auto"
            >
              Explore the workspace
            </a>
          </div>

          {/* glass pills */}
          <div className="mx-auto mt-7 flex max-w-[680px] flex-wrap items-center justify-center gap-2 md:gap-3">
            {[
              ["</>", "Learn by coding"],
              ["↗", "Learn from developers"],
              ["✦", "Build together"],
            ].map(([icon, label]) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 py-1.5 pl-1.5 pr-4 text-xs font-medium backdrop-blur-md md:text-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c6ff00] text-[10px] font-black text-[#0b2fd1]">
                  {icon}
                </span>
                {label}
              </span>
            ))}
          </div>

          {/* wide screens only: fills the empty sides of this row */}
          <GlassCard
            avatar="/monkey.png"
            name="arjun.dev"
            stat="293 bugs solved"
            className="float-a left-[5%] top-2 hidden [--r:-8deg] -rotate-[8deg] xl:block"
          />
          <Badge className="right-[5%] top-0 hidden w-36 xl:block 2xl:w-44" />
        </div>

        {/* white panel with three steps */}
        <div className="relative mx-3 rounded-t-[28px] bg-background px-3 pb-5 pt-4 sm:mx-6 md:mx-12 md:rounded-t-[40px] md:px-6 md:pt-6">
          <div className="grid gap-3 md:grid-cols-3 md:gap-5">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.1 }}
                className="flex flex-col items-center gap-3 rounded-[24px] bg-muted/70 p-6 text-center"
              >
                <h3 className="font-wide text-lg leading-none md:text-xl">{c.title}</h3>
                <p className="max-w-[240px] text-xs text-muted-foreground">{c.body}</p>
                <div className="mt-1">{c.visual}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ marquee ------------------------------ */

function Marquee() {
  const words = [
    "Debug",
    "Tech Stack Explorer",
    "DSA",
    "Multilingual Docs",
    "Dashboard",
    "Glassboard",
    "Community",
  ];
  const row = [...words, ...words];
  return (
    <div className="my-10 -rotate-1 overflow-hidden bg-[#c6ff00] py-3 text-[#0b2fd1] md:my-16 md:py-4">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((w, i) => (
              <span
                key={`${k}-${i}`}
                className="font-wide flex items-center gap-6 pr-6 text-xl md:gap-10 md:pr-10 md:text-3xl"
              >
                {w}
                <span className="text-base">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------ product visual / carousel ------------------------ */

function ProductVisualSection() {
  return (
    <section className="pb-10 md:pb-16">
      <HeroProductVisual />
    </section>
  );
}

function CarouselSection() {
  return (
    <section className="relative overflow-hidden">
      <div className={`${container} py-12 md:py-20`}>
        <HeroCarousel />
      </div>
    </section>
  );
}

/* ------------------------------- mission ------------------------------- */

const useCardParallax = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    card.style.setProperty("--rot-x", `${-dy}deg`);
    card.style.setProperty("--rot-y", `${dx}deg`);
    card.style.setProperty("--trans-x", `${dx * 3}px`);
    card.style.setProperty("--trans-y", `${dy * 3}px`);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    ["--rot-x", "--rot-y"].forEach((v) => card.style.setProperty(v, "0deg"));
    ["--trans-x", "--trans-y"].forEach((v) => card.style.setProperty(v, "0px"));
  };
  return { handleMouseMove, handleMouseLeave };
};

function Mission() {
  return (
    <section id="features" className="py-12 md:py-20">
      <div className={`${container} space-y-16 md:space-y-24`}>
        <MissionRow
          eyebrow="Learn from real problems"
          title="Turn debugging into learning."
          body="Post the bugs you're stuck on, explore how other developers approached them, and learn from solutions that actually worked."
          bullets={[
            "Share your bugs and debugging context",
            "Explore approaches from other developers",
            "Mark the problem resolved when you find the solution",
          ]}
        />
        <MissionRow
          reverse
          eyebrow="Developer knowledge"
          title="Learn how others solve problems."
          body="Developers can share their reasoning, suggest different approaches, and help each other understand the solution."
          bullets={[
            "Learn multiple approaches to the same problem",
            "Share explanations and solutions",
            "Build a growing library of developer knowledge",
          ]}
        />
      </div>
    </section>
  );
}

function MissionRow({
  eyebrow,
  title,
  body,
  bullets,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal className="space-y-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-wide text-[clamp(1.9rem,5vw,3.4rem)] leading-[0.95]">{title}</h2>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{body}</p>
        <ul className="space-y-3 pt-2">
          {bullets.map((t) => (
            <li key={t} className="flex items-start gap-3 text-sm font-medium">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c6ff00] text-[#0b2fd1]">
                <Check className="h-3 w-3" strokeWidth={3.5} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1}>{reverse ? <CommunityMockPanel /> : <DebugMockPanel />}</Reveal>
    </div>
  );
}

function MockShell({ path, children }: { path: string; children: React.ReactNode }) {
  const { handleMouseMove, handleMouseLeave } = useCardParallax();
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="parallax-card overflow-hidden rounded-[28px] border-2 border-[#0b2fd1] bg-card shadow-[8px_8px_0_#c6ff00]"
    >
      <div className="flex items-center gap-1.5 bg-[#0b2fd1] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#c6ff00]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="ml-3 truncate text-[11px] text-white/80">{path}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function DebugMockPanel() {
  return (
    <MockShell path="debugging / auth-middleware">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-muted-foreground">Debugging problem</div>
          <h3 className="mt-1 text-sm font-bold">JWT token returns 401 after refresh</h3>
        </div>
        <span className="rounded-full bg-[#c6ff00] px-2.5 py-1 text-[10px] font-bold text-[#0b2fd1]">
          Open
        </span>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/40">
        <div className="border-b border-border px-3 py-2 text-[10px] text-muted-foreground">
          middleware/auth.js
        </div>
        <pre className="overflow-x-auto p-3 text-[11px] leading-relaxed text-muted-foreground">
          {`const token = req.cookies.token;

jwt.verify(token, SECRET, (err, user) => {
  if (err) return res.status(401).json({
    error: "Unauthorized"
  });
  req.user = user;
});`}
        </pre>
      </div>
      <p className="mt-4 rounded-xl bg-[#0b2fd1]/10 p-3 text-[11px] leading-relaxed text-muted-foreground">
        Works on login, but fails after refreshing the browser. Looking for approaches to debug the
        issue.
      </p>
      <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>3 approaches • 5 developers</span>
        <span>Posted 8m ago</span>
      </div>
    </MockShell>
  );
}

function CommunityMockPanel() {
  return (
    <MockShell path="discussion / auth-middleware">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Developer discussion</div>
          <h3 className="mt-1 text-sm font-bold">Possible solutions</h3>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b2fd1] text-xs font-bold text-white">
          3
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-border p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b2fd1]/10 text-[10px] font-bold text-[#0b2fd1] dark:text-indigo-300">
            AR
          </span>
          <span className="text-xs font-semibold">Arjun</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          Check whether the refresh request is sending the cookie. The browser may be blocking it
          because of the cookie policy.
        </p>
      </div>

      <div className="mt-3 rounded-2xl border-2 border-[#c6ff00] bg-[#c6ff00]/10 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c6ff00] text-[10px] font-bold text-[#0b2fd1]">
              NK
            </span>
            <span className="text-xs font-semibold">Neha</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#c6ff00] px-2 py-1 text-[9px] font-bold text-[#0b2fd1]">
            <Check className="h-3 w-3" strokeWidth={3} /> Resolved
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          Add <code className="font-semibold text-foreground">credentials: "include"</code> to the
          request so the browser sends the authentication cookie.
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>3 approaches • 1 resolved</span>
        <span className="font-bold text-foreground">Problem solved</span>
      </div>
    </MockShell>
  );
}

/* ------------------------------- modules ------------------------------- */

type ModuleStatus = "current" | "prototype" | "upcoming";
type Module = {
  icon: React.ElementType;
  name: string;
  desc: string;
  status: ModuleStatus;
  beta?: boolean;
};

const mods: Module[] = [
  {
    icon: Bug,
    name: "Debug",
    desc: "Inspect errors, trace issues, and debug your development workflow from one workspace.",
    status: "current",
  },
  {
    icon: Search,
    name: "Tech Stack Explorer",
    desc: "Discover developer tools and websites filtered by your tech stack, then jump directly to what you need.",
    status: "current",
  },
  {
    icon: Code2,
    name: "DSA",
    desc: "Practice data structures and algorithms and keep your problem-solving workflow organized.",
    status: "current",
  },
  {
    icon: Languages,
    name: "Multilingual docs",
    desc: "Read and understand technical documentation across languages without leaving your development flow.",
    status: "current",
  },
  {
    icon: LayoutDashboard,
    name: "Personalized dashboard",
    desc: "A workspace tailored around the tools, projects, and information you use most.",
    status: "current",
  },
  {
    icon: MessageCircle,
    name: "Community chat",
    desc: "Connect with developers, discuss problems, and share knowledge in one place.",
    status: "prototype",
  },
  {
    icon: PenTool,
    name: "Glassboard",
    desc: "A visual workspace for brainstorming, diagrams, planning, and technical ideas.",
    status: "prototype",
  },
  {
    icon: Users,
    name: "Collaboration",
    desc: "Create coding servers, collaborate with others, and run your own coding contests.",
    status: "upcoming",
  },
  {
    icon: UserRound,
    name: "Developer profile",
    desc: "Showcase your skills, projects, coding activity, and progress through a personalized profile.",
    status: "upcoming",
  },
  {
    icon: MessageCircle,
    name: "Chats",
    desc: "Communicate with developers through dedicated conversations and team discussions.",
    status: "upcoming",
  },
  {
    icon: Code2,
    name: "Coding platform",
    desc: "Solve problems, submit code, and compete directly inside your developer workspace.",
    status: "upcoming",
  },
  {
    icon: Flame,
    name: "Developer heatmap",
    desc: "Visualize your coding, learning, and problem-solving activity over time.",
    status: "upcoming",
  },
  {
    icon: Network,
    name: "Architecture integration",
    desc: "Connect system architecture and technical designs directly with your Glassboard workspace.",
    status: "upcoming",
  },
  {
    icon: Gamepad2,
    name: "Games of Code",
    desc: "Competitive coding experiences designed to make problem solving more engaging.",
    status: "upcoming",
    beta: true,
  },
];

const JOKES = [
  "My code works. I don't know why.",
  "Yesterday it worked. Today it doesn't. Magic.",
  "This is fine. Everything is on fire.",
  "That's not a bug, it's a plot twist.",
  "Pushing straight to main. YOLO.",
  "0 bugs in my code, only unintended features.",
  "Error 418: I'm a teapot. Short and stout.",
  "I speak fluent HTML, CSS, and sarcasm.",
  "sleep() is my favorite debugging tool.",
  "Who needs comments when you have emojis? ✨",
];

function EmptyModuleBlock({ emptyCount }: { emptyCount: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % JOKES.length), 3000);
    return () => clearInterval(t);
  }, []);
  if (emptyCount <= 0) return null;
  return (
    <div
      className={`relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-[24px] bg-[#0b2fd1] p-6 text-center text-white ${
        emptyCount >= 2 ? "lg:col-span-2" : ""
      }`}
    >
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 8, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 250 }}
        className={`font-wide ${emptyCount >= 2 ? "text-2xl md:text-3xl" : "text-xl"}`}
      >
        {JOKES[i]}
      </motion.span>
    </div>
  );
}

function Modules() {
  const statusLabel = { current: "", prototype: "Prototype", upcoming: "Upcoming" } as const;
  return (
    <section id="modules" className="py-12 md:py-20">
      <div className={container}>
        <SectionHead
          eyebrow="Modules"
          title="Everything you need, in one place."
          body="A growing developer workspace built around the tools you use to build, debug, learn, and collaborate."
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mods.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: EASE, delay: (i % 4) * 0.05 }}
              className="group flex flex-col justify-between rounded-[24px] bg-muted/60 p-6 transition-colors duration-200 hover:bg-[#0b2fd1] hover:text-white"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-[#0b2fd1] transition-colors group-hover:bg-[#c6ff00]">
                  <m.icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <div className="flex gap-1">
                  {m.status !== "current" && (
                    <span className="rounded-full border border-current px-2 py-0.5 text-[9px] font-bold opacity-70">
                      {statusLabel[m.status]}
                    </span>
                  )}
                  {m.beta && (
                    <span className="rounded-full bg-[#c6ff00] px-2 py-0.5 text-[9px] font-bold text-[#0b2fd1]">
                      Beta
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="mt-6 text-base font-extrabold">{m.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/80">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
          <EmptyModuleBlock emptyCount={(4 - (mods.length % 4)) % 4} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ walkthrough ------------------------------ */

function Walkthrough() {
  return (
    <section className="py-12 md:py-20">
      <div className={container}>
        <SectionHead
          eyebrow="Product tour"
          title="Watch it evolve with your work."
          body="This dashboard preview is fully interactive. Hover over the metric cards and move your cursor to explore the parallax motion."
        />
        <ProductTour />
      </div>
    </section>
  );
}

/* ------------------------------ comparison ------------------------------ */

export function Comparison() {
  const rows = [
    [
      "Context & Workspace",
      "Tabs everywhere – docs, DB, code in isolation",
      "Unified, persistent, spatially organized workspace",
    ],
    [
      "Switching Cost",
      "20 minutes/day hunting for the right tab",
      "One shortcut to everything, no context loss",
    ],
    [
      "Team Knowledge",
      "Buried in DMs, screenshots, and stale wikis",
      "Auto‑indexed, shared by default, always up‑to‑date",
    ],
    [
      "Debugging",
      "Screen‑share, describe, repeat endlessly",
      "Shared breakpoints, live cursors, instant collaboration",
    ],
    [
      "Learning & Docs",
      "Scattered articles, English‑only, no feedback",
      "Multilingual docs, integrated DSA practice, community chat",
    ],
    [
      "Tool Discovery",
      "Manually searching for new tools",
      "Tech Stack Explorer – curated tools for your stack",
    ],
  ];

  return (
    <section className="py-12 md:py-20">
      <div className={container}>
        <SectionHead eyebrow="Comparison" title="The old way, and the DolpStack way." />

        {/* mobile: stacked cards */}
        <div className="space-y-4 md:hidden">
          {rows.map(([k, a, b]) => (
            <div key={k} className="overflow-hidden rounded-[24px] border border-border">
              <div className="bg-[#0b2fd1] px-4 py-2.5 text-xs font-bold text-white">{k}</div>
              <div className="space-y-3 p-4 text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Minus className="mt-1 h-3.5 w-3.5 shrink-0" />
                  <span className="min-w-0">{a}</span>
                </div>
                <div className="flex items-start gap-2 font-medium">
                  <Check
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-[#0b2fd1] dark:text-[#c6ff00]"
                    strokeWidth={3}
                  />
                  <span className="min-w-0">{b}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* desktop / tablet: table */}
        <div className="hidden overflow-hidden rounded-[28px] border border-border md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0b2fd1] text-left text-white">
                <th className="w-44 px-5 py-4" />
                <th className="px-5 py-4 text-xs font-bold">Before</th>
                <th className="px-5 py-4 text-xs font-bold text-[#c6ff00]">With DolpStack</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, a, b]) => (
                <tr key={k} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-bold">{k}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Minus className="h-3.5 w-3.5" /> {a}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <Check
                        className="h-3.5 w-3.5 text-[#0b2fd1] dark:text-[#c6ff00]"
                        strokeWidth={3}
                      />
                      {b}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- steps --------------------------------- */

function Steps() {
  const steps = [
    {
      n: "01",
      name: "Discover",
      desc: "Find the tools, resources, documentation, and developer websites that match your tech stack.",
    },
    {
      n: "02",
      name: "Build",
      desc: "Bring your code, DSA practice, debugging, and development workflow into one personalized workspace.",
    },
    {
      n: "03",
      name: "Grow",
      desc: "Track your progress, connect with developers, and keep evolving with a workspace built around you.",
    },
  ];
  return (
    <section id="how-it-works" className="py-12 md:py-20">
      <div className={container}>
        <SectionHead eyebrow="Workflow" title="From setup to shipping in three steps." />
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.08}
              className={`rounded-[28px] p-7 md:p-8 ${
                i === 1 ? "bg-[#0b2fd1] text-white" : "bg-muted/60"
              }`}
            >
              <div
                className={`font-wide text-5xl md:text-6xl ${i === 1 ? "text-[#c6ff00]" : "text-[#0b2fd1] dark:text-[#c6ff00]"}`}
              >
                {s.n}
              </div>
              <h3 className="mt-6 text-xl font-extrabold">{s.name}</h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${i === 1 ? "text-white/80" : "text-muted-foreground"}`}
              >
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- precision ------------------------------- */

export function Precision() {
  return (
    <section className="px-3 py-12 md:px-6 md:py-20">
      <div className="hero-grid relative mx-auto flex min-h-[420px] max-w-[1600px] items-center justify-center overflow-hidden rounded-[32px] bg-[#0b2fd1] md:rounded-[48px]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60 mix-blend-screen">
          <PrecisionCanvas />
        </div>
        <Reveal className="relative z-10 flex max-w-2xl flex-col items-center space-y-5 px-6 py-16 text-center">
          <div className="flex h-40 w-72 items-center justify-center rounded-[28px] p-5 md:h-44 md:w-80">
            <img
              src="/dolpstack_logo_dark.png"
              alt="DolpStack logo"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="max-w-xs text-xs font-bold text-white/80">
            The all‑in‑one developer workspace for modern teams.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- faq ---------------------------------- */

function FAQ() {
  const faqs = [
    {
      q: "Is DolpStack available for desktop?",
      a: "Yes. DolpStack ships as a native cross-platform desktop app for macOS, Windows, and Linux, alongside the web workspace.",
    },
    {
      q: "How secure is my code?",
      a: "DolpStack never stores your source. We connect to your existing providers (GitHub, GitLab) and process everything in your workspace with per-project isolation.",
    },
    {
      q: "Can I build my own modules?",
      a: "Yes — our SDK lets you build custom modules in React or Vue and deploy them to a private team marketplace.",
    },
    {
      q: "Do you support SSO and SAML?",
      a: "SSO, SAML, and SCIM are available on the Business and Enterprise plans, alongside audit logs and role-based access control.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-12 md:py-20">
      <div className={container}>
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-12">
          <Reveal className="space-y-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-wide text-[clamp(1.9rem,5vw,3.4rem)] leading-[0.95]">
              Frequently asked.
            </h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-[24px] bg-muted/60 px-5 md:px-6">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-sm font-bold md:text-base">{f.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      open === i ? "bg-[#c6ff00] text-[#0b2fd1]" : "bg-background"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${open === i ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-200 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- final cta -------------------------------- */

function FinalCTA() {
  return (
    <section className="px-3 pb-12 md:px-6 md:pb-20">
      <div className="hero-grid relative mx-auto max-w-[1600px] overflow-hidden rounded-[32px] bg-[#0b2fd1] px-5 py-16 text-center text-white md:rounded-[48px] md:py-28">
        <img
          src="/dolphine.png"
          alt=""
          className="pointer-events-none absolute left-1/2 top-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 select-none opacity-40 md:w-[700px]"
        />
        <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center space-y-6">
          <h2 className="font-wide text-[clamp(2.2rem,8vw,6rem)] leading-[0.9]">
            Ready to
            <br />
            reclaim your <span className="text-[#c6ff00]">focus?</span>
          </h2>
          <p className="max-w-md text-base text-white/85">
            Join thousands of engineering teams building faster together in one unified surface.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={CTA_HREF}
              className="group inline-flex items-center gap-2 rounded-full bg-[#c6ff00] px-7 py-3.5 text-sm font-extrabold text-[#0b2fd1] transition-transform hover:-translate-y-0.5"
            >
              Start learning
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://www.linkedin.com/company/dolpstack/about/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow DolpStack on LinkedIn"
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-white px-6 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#0b2fd1]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="22" height="22" rx="3" fill="#fff" />
                <path
                  d="M6.5 9.5H9.5V18H6.5V9.5ZM8 5.5C8.83 5.5 9.5 6.17 9.5 7C9.5 7.83 8.83 8.5 8 8.5C7.17 8.5 6.5 7.83 6.5 7C6.5 6.17 7.17 5.5 8 5.5Z"
                  fill="#0A66C2"
                />
                <path
                  d="M11.5 9.5H14.35V10.66H14.39C14.79 9.91 15.77 9.1 17.32 9.1C20.37 9.1 21 11.11 21 13.73V18H18V13.96C18 13 17.98 11.76 16.65 11.76C15.3 11.76 15.1 12.81 15.1 13.89V18H12.1V9.5H11.5Z"
                  fill="#0A66C2"
                />
              </svg>
              Follow us on LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div
        className={`${container} flex flex-col items-start justify-between gap-6 md:flex-row md:items-center`}
      >
        <div className="flex items-center gap-4">
          <img
            src="/dolpstack_logo_light.png"
            className="h-6 w-auto rounded-md object-contain dark:hidden"
            alt="DolpStack Logo"
          />
          <img
            src="/dolpstack_logo_dark.png"
            className="hidden h-6 w-auto rounded-md object-contain dark:block"
            alt="DolpStack Logo"
          />
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
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <Link
            to="/privacy-policy"
            className="font-medium transition-colors hover:text-foreground"
          >
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
