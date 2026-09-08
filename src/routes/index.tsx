import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mic,
  LayoutGrid,
  Activity,
  CheckSquare,
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
} from "lucide-react";
import { PrecisionCanvas } from "@/components/PrecisionCanvas";
import { ProductTour } from "@/components/ProductTour";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroProductVisual } from "@/components/HeroProductVisual";
import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const useCardParallax = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    const dx = (x - w / 2) / (w / 2);
    const dy = (y - h / 2) / (h / 2);

    card.style.setProperty("--rot-x", `${-dy * 1}deg`);
    card.style.setProperty("--rot-y", `${dx * 1}deg`);
    card.style.setProperty("--trans-x", `${dx * 3}px`);
    card.style.setProperty("--trans-y", `${dy * 3}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rot-x", "0deg");
    card.style.setProperty("--rot-y", "0deg");
    card.style.setProperty("--trans-x", "0px");
    card.style.setProperty("--trans-y", "0px");
  };

  return { handleMouseMove, handleMouseLeave };
};

const heroLeftContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const heroLeftItemVariants = (shouldReduce: boolean) => ({
  hidden: { opacity: 0, x: shouldReduce ? 0 : -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

const heroRightVariants = (shouldReduce: boolean) => ({
  hidden: { opacity: 0, x: shouldReduce ? 0 : 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

const missionLeftContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const missionLeftItemVariants = (shouldReduce: boolean, reverse: boolean) => ({
  hidden: { opacity: 0, x: shouldReduce ? 0 : reverse ? 24 : -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

const missionRightVariants = (shouldReduce: boolean, reverse: boolean) => ({
  hidden: { opacity: 0, x: shouldReduce ? 0 : reverse ? -24 : 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground antialiased overflow-x-hidden">
      <AmbientBackground />
      <Nav />
      <main className="relative z-10">
        <Hero />
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

/* ---------- primitives ---------- */

const container = "mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12 xl:px-16";
const display = {
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

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
    } catch (e) {
      // Ignored
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function PrimaryBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md ${className}`}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:bg-muted hover:shadow-md ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-indigo-400">
      {children}
    </div>
  );
}

function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Ambient glass-like gradient waves */}
      <div className="ambient-blob blob-top-left" />
      <div className="ambient-blob blob-bottom-right" />
      <div className="ambient-blob blob-top-right" />
      <div className="ambient-blob blob-bottom-left" />

      {/* frosted glass backdrop overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px] pointer-events-none" />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className={`${container} flex h-14 items-center justify-between`}>
        <a href="#" className="flex items-center gap-2">

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
          {/* <span className="text-[15px] font-semibold tracking-tight" style={display}>
            DolpStack
          </span> */}
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#modules" className="transition-colors hover:text-foreground">
            Modules
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            Workflow
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Opportunities
          </Link>
        </nav>
        <div className="flex items-center gap-2.5">
          <Link
            to="/opportunities"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
          >
            Apply Now
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}


//keyboard:home1
function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute left-[10%] top-[45%] h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-[10%] top-[30%] h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="w-full pb-10 pt-24 md:pb-16 md:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroLeftContainerVariants}
          className="mx-auto max-w-[1050px] px-6 text-center md:px-8"
        >

          {/* Heading */}
          <motion.h1
            variants={heroLeftItemVariants(false)}
            className="text-[2.7rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.4rem]"
            style={display}
          >
            From learning code
            <br />

            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-blue-400 dark:to-cyan-400">
              to building it together.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={heroLeftItemVariants(false)}
            className="mx-auto mt-6 max-w-[700px] text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            A developer workspace where freshers learn, developers connect, and everyone builds better code together.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={heroLeftItemVariants(false)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/opportunities"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:via-blue-500 hover:to-blue-600 hover:shadow-blue-500/40 sm:w-auto"
            >
              Start Learning
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="#features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-muted/60 sm:w-auto"
            >
              Explore the Workspace
            </a>
          </motion.div>

          {/* Connection / learning indicators */}
          <motion.div
            variants={heroLeftItemVariants(false)}
            className="mx-auto mt-10 flex max-w-[650px] flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                &lt;/&gt;
              </span>
              Learn by coding
            </div>

            <div className="hidden h-4 w-px bg-border sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                ↗
              </span>
              Learn from developers
            </div>

            <div className="hidden h-4 w-px bg-border sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                ✦
              </span>
              Build together
            </div>
          </motion.div>
        </motion.div>

        {/* Product visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 md:mt-20"
        >
          <HeroProductVisual />
        </motion.div>
      </div>
    </section>
  );
}

//keyword:home2
function CarouselSection() {
  return (
    <section className="relative overflow-hidden">
      <div className={`${container} py-16 md:py-24`}>
        <HeroCarousel />
      </div>
    </section>
  );
}

//keyword:home3
function Mission() {
  return (
    <section id="features" className="py-16 md:py-20">
      <div className={`${container} space-y-16 md:space-y-20`}>
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
  const shouldReduce = useReducedMotion();
  const leftItem = missionLeftItemVariants(!!shouldReduce, !!reverse);
  const rightItem = missionRightVariants(!!shouldReduce, !!reverse);

  return (
    <div
      className={`grid items-center gap-12 md:grid-cols-2 md:gap-20 ${reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
    >
      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={missionLeftContainerVariants}
        className="space-y-5"
      >
        <motion.div variants={leftItem}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>

        <motion.h2
          variants={leftItem}
          className="text-3xl font-semibold tracking-tight md:text-4xl"
          style={display}
        >
          {title}
        </motion.h2>

        <motion.p
          variants={leftItem}
          className="text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {body}
        </motion.p>

        <motion.ul variants={leftItem} className="space-y-3 pt-2">
          {bullets.map((t) => (
            <li
              key={t}
              className="flex items-start gap-2.5 text-sm text-foreground"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                strokeWidth={2.5}
              />
              <span>{t}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={rightItem}
      >
        {reverse ? <CommunityMockPanel /> : <DebugMockPanel />}
      </motion.div>
    </div>
  );
}


/* -------------------------------------------------------
   DEBUGGING POST
------------------------------------------------------- */

function DebugMockPanel() {
  const { handleMouseMove, handleMouseLeave } = useCardParallax();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden rounded-[24px] border border-border bg-card elev-sm card-hover-effects parallax-card"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

        <div className="ml-3 text-[11px] text-muted-foreground">
          debugging / auth-middleware
        </div>
      </div>

      <div className="p-5">
        {/* Post header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-muted-foreground">
              Debugging Problem
            </div>

            <h3 className="mt-1 text-sm font-semibold text-foreground">
              JWT token returns 401 after refresh
            </h3>
          </div>

          <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600 dark:text-amber-400">
            Open
          </span>
        </div>

        {/* Code */}
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-muted/40">
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

        {/* Problem */}
        <div className="mt-4 rounded-lg bg-blue-500/5 p-3">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Works on login, but fails after refreshing the browser.
            Looking for approaches to debug the issue.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>3 approaches</span>
            <span>•</span>
            <span>5 developers</span>
          </div>

          <span className="text-[10px] text-muted-foreground">
            Posted 8m ago
          </span>
        </div>
      </div>
    </div>
  );
}


/* -------------------------------------------------------
   COMMUNITY / SOLUTION DISCUSSION
------------------------------------------------------- */

function CommunityMockPanel() {
  const { handleMouseMove, handleMouseLeave } = useCardParallax();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden rounded-[24px] border border-border bg-card elev-sm card-hover-effects parallax-card"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

        <div className="ml-3 text-[11px] text-muted-foreground">
          discussion / auth-middleware
        </div>
      </div>

      <div className="p-5">
        {/* Discussion title */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">
              Developer discussion
            </div>

            <h3 className="mt-1 text-sm font-semibold text-foreground">
              Possible solutions
            </h3>
          </div>

          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-xs text-blue-600 dark:text-blue-400">
            3
          </div>
        </div>

        {/* Approach 1 */}
        <div className="mt-5 rounded-xl border border-border p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                AR
              </div>

              <span className="text-xs font-medium text-foreground">
                Arjun
              </span>

              <span className="text-[10px] text-muted-foreground">
                Developer
              </span>
            </div>
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Check whether the refresh request is sending the cookie.
            The browser may be blocking it because of the cookie policy.
          </p>
        </div>

        {/* Approach 2 - resolved */}
        <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-[10px] font-semibold text-cyan-600 dark:text-cyan-400">
                NK
              </div>

              <span className="text-xs font-medium text-foreground">
                Neha
              </span>

              <span className="text-[10px] text-muted-foreground">
                Developer
              </span>
            </div>

            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
              <Check className="h-3 w-3" />
              Resolved
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Add <code className="text-foreground">credentials: "include"</code>
            to the request so the browser sends the authentication cookie.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>3 approaches</span>
            <span>•</span>
            <span>1 resolved</span>
          </div>

          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            Problem solved
          </span>
        </div>
      </div>
    </div>
  );
}


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


function EmptyModuleBlock({ emptyCount }: { emptyCount: number }) {
  const comments = [
    "I don’t always test my code, but when I do, I do it in production.",
    "My code works. I don't know why.",
    "Yesterday it worked. Today it doesn't. Magic.",
    "I have 99 problems, and 404 of them are JavaScript.",
    "This is fine. Everything is on fire.",
    "Deleting all my print statements... oops.",
    "Why is it called 'common sense' if it's so rare?",
    "The cake is a lie, and so is this feature request.",
    "I'm not a robot, but I do love captchas.",
    "Keep calm and carry on... debugging.",
    "I followed the Stack Overflow answer blindly.",
    "Refactoring? I hardly know her!",
    "Pushing straight to main. YOLO.",
    "My keyboard is smoking, but the build passed.",
    "0 bugs in my code, only unintended features.",
    "I'm silently judging your variable names.",
    "That's not a bug, it's a plot twist.",
    "I speak fluent HTML, CSS, and sarcasm.",
    "commit: 'fixed bug' — commits 50 unrelated files.",
    "My code is like a horror movie, full of suspense.",
    "Developers are just high-level problem solvers.",
    "Error 418: I'm a teapot. Short and stout.",
    "I write code like I cook – with too much salt.",
    "It's not a bug, it's a surprise feature.",
    "Just one more fix before lunch. (It's 5 PM.)",
    "I think I'm in love with my linter.",
    "Wait, it's all spaghetti code? Always has been.",
    "sleep() is my favorite debugging tool.",
    "I'm a developer, not a wizard (or am I?).",
    "This comment will self-destruct in 3... 2... 1...",
    "I don't always test, but when I do, I break things.",
    "My code runs perfectly... in another dimension.",
    "I've been staring at this screen for 8 hours.",
    "Who needs comments when you have emojis? ✨",
  ];

  const [commentIndex, setCommentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCommentIndex((prev) => (prev + 1) % comments.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (emptyCount <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`
        relative flex min-h-[180px] items-center justify-center
        overflow-hidden bg-card
        ${emptyCount >= 2 ? "lg:col-span-2" : "lg:col-span-1"}
      `}
    >
      {/* subtle dot pattern */}
      <div
        className="
          pointer-events-none absolute inset-0
          opacity-[0.25]
          [background-image:radial-gradient(circle,_currentColor_1px,_transparent_1px)]
          [background-size:18px_18px]
          text-muted-foreground
        "
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.span
          key={commentIndex}
          initial={{ opacity: 0, y: 8, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 250 }}
          className={`
            font-sans font-extrabold tracking-tight
            bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 
            dark:from-slate-300 dark:via-slate-400 dark:to-slate-300
            bg-clip-text text-transparent
            ${emptyCount >= 2 ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"}
          `}
        >
          {comments[commentIndex]}
        </motion.span>
      </div>
    </motion.div>
  );
}

function Modules() {
  return (
    <section id="modules" className="py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="mb-14 max-w-2xl space-y-3"
        >
          <Eyebrow>Modules</Eyebrow>

          <h2
            className="text-3xl font-semibold tracking-tight md:text-4xl"
            style={display}
          >
            Everything you need, in one place.
          </h2>

          <p className="text-base leading-relaxed text-muted-foreground">
            A growing developer workspace built around the tools you use to
            build, debug, learn, and collaborate.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
    border
    border-border
    rounded-[24px]
    overflow-hidden
    bg-card
    shadow-none
  "
        >
          {mods.map((m, i) => (
            <ModuleCard key={m.name} m={m} i={i} />
          ))}

          <EmptyModuleBlock
            emptyCount={(4 - (mods.length % 4)) % 4}
          />
        </motion.div>
      </div>
    </section>
  );
}


function ModuleCard({
  m,
  i,
}: {
  m: (typeof mods)[number];
  i: number;
}) {
  const { handleMouseMove, handleMouseLeave } = useCardParallax();

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group p-6 bg-card border-border flex flex-col justify-between card-hover-effects parallax-card
        ${i % 4 !== 3 ? "lg:border-r" : ""}
        ${i < 4 ? "lg:border-b" : "lg:border-b-0"}
        ${i % 2 !== 1 ? "sm:border-r" : "sm:border-r-0"}
        ${i < 6 ? "sm:border-b" : "sm:border-b-0"}
        ${i < 13 ? "border-b" : "border-b-0"}
      `}
    >
      <div>
        <div className="flex items-start justify-between">
          <m.icon
            className="h-4 w-4 text-muted-foreground opacity-70 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:-translate-y-[2px] group-hover:rotate-3"
            strokeWidth={1.75}
          />

          {/* Status */}
          {m.status !== "current" && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
              {m.status === "prototype" ? "Prototype" : "Upcoming"}
            </span>
          )}

          {/* Beta */}
          {m.beta && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
              Beta
            </span>
          )}
        </div>

        <h3 className="mt-4 text-sm font-semibold text-foreground/85 transition-premium group-hover:text-foreground">
          {m.name}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {m.desc}
        </p>
      </div>
    </motion.div>
  );
}

function Walkthrough() {
  return (
    <section className="py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12 max-w-xl space-y-3"
        >
          <div className="max-w-xl space-y-3">
            <Eyebrow>Product tour</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>
              Watch it evolve with your work.
            </h2>
            <p className="text-sm text-muted-foreground">
              This dashboard preview is fully interactive. Hover over the metric cards and move your
              cursor to explore the parallax motion.
            </p>
          </div>
        </motion.div>
        <ProductTour />
      </div>
    </section>
  );
}


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
    <section className="py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12 max-w-2xl space-y-3"
        >
          <Eyebrow>Comparison</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>
            The old way, and the DolpStack way.
          </h2>
        </motion.div>

        {/* Mobile: stacked cards */}
        <div className="space-y-4 md:hidden">
          {rows.map(([k, a, b]) => (
            <div key={k} className="overflow-hidden rounded-[20px] border border-border">
              <div className="border-b border-border bg-muted/40 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {k}
              </div>
              <div className="space-y-3 p-4 text-sm">
                <div>
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Before
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Minus className="mt-1 h-3.5 w-3.5 shrink-0" />
                    <span className="min-w-0">{a}</span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    With DolpStack
                  </div>
                  <div className="flex items-start gap-2 text-foreground">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} />
                    <span className="min-w-0">{b}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop / tablet: table */}
        <div className="hidden overflow-hidden rounded-[24px] border border-border md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="w-40 px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground"></th>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Before
                </th>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  With DolpStack
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, a, b]) => (
                <tr key={k} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium text-foreground">{k}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                      {a}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
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
    <section id="how-it-works" className="py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12 max-w-2xl space-y-3"
        >
          <Eyebrow>Workflow</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>
            From setup to shipping in three steps.
          </h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-border pt-6">
              <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
              <h3
                className="mt-3 text-lg font-semibold tracking-tight text-foreground"
                style={display}
              >
                {s.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export function Precision() {
  return (
    <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden py-16 md:py-20">
      {/* ── Crazy background layers ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Dot pattern */}
        <div className="absolute inset-0 [background-image:radial-gradient(circle,_currentColor_1px,_transparent_1px)] [background-size:22px_22px] text-muted-foreground/20" />

        {/* Glowing orbs */}
        <div className="absolute -top-1/2 -left-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl" />

        {/* Animated shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

        {/* ─── PrecisionCanvas (background animation) ─── */}
        <div className="absolute inset-0 flex items-center justify-center opacity-50 mix-blend-screen">
          <PrecisionCanvas />
        </div>
      </div>

      {/* ─── Main content ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center space-y-5 px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="mb-1 flex h-45 w-85 flex-col items-center justify-center"
        >
          {/* Light / dark logos */}
          <img
            src="/dolpstack_logo_light.png"
            alt="DolpStack logo"
            className="h-full w-full object-contain block dark:hidden"
          />
          <img
            src="/dolpstack_logo_dark.png"
            alt="DolpStack logo"
            className="h-full w-full object-contain hidden dark:block"
          />

          <p className="mt-2 max-w-xs text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/70">
            The all‑in‑one developer workspace for modern teams.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

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
    <section id="faq" className="py-16 md:py-20">
      <div className={container}>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="space-y-3"
          >
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>
              Frequently asked.
            </h2>
          </motion.div>
          <div className="border-t border-border">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
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

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">

      {/* Dolphin image */}
      <img
        src="/dolphine.png"
        alt=""
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -z-10
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          md:w-[700px]
          opacity-15
          select-none
        "
      />

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-500/10 via-sky-500/5 to-transparent" />

      <div className={`${container} flex max-w-2xl flex-col items-center text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="space-y-5"
        >
          <Eyebrow>Get Started</Eyebrow>

          <h2
            className="text-3xl font-semibold tracking-tight md:text-5xl"
            style={display}
          >
            Ready to reclaim your{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-blue-400 dark:to-cyan-400">
              focus?
            </span>
          </h2>

          <p className="mx-auto max-w-md text-base text-muted-foreground">
            Join thousands of engineering teams building faster together in one
            unified surface.
          </p>

          {/* LinkedIn CTA */}
          <div className="flex items-center justify-center pt-3">
            <a
              href="https://www.linkedin.com/company/dolpstack/about/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow DolpStack on LinkedIn"
              className="
      inline-flex
      items-center
      gap-2.5
      rounded-full
      border
      border-border
      bg-background/70
      px-6
      py-3
      text-sm
      font-medium
      text-foreground
      backdrop-blur-sm
      transition-all
      duration-200
      hover:scale-[1.02]
      hover:bg-muted
    "
            >
              {/* LinkedIn Logo */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Blue LinkedIn background */}
                <rect
                  x="1"
                  y="1"
                  width="23"
                  height="23"
                  rx="3"
                  fill="#0A66C2"
                />

                {/* White "in" */}
                <path
                  d="M6.5 9.5H9.5V18H6.5V9.5ZM8 5.5C8.82843 5.5 9.5 6.17157 9.5 7C9.5 7.82843 8.82843 8.5 8 8.5C7.17157 8.5 6.5 7.82843 6.5 7C6.5 6.17157 7.17157 5.5 8 5.5Z"
                  fill="white"
                />

                <path
                  d="M11.5 9.5H14.35V10.66H14.39C14.79 9.91 15.77 9.1 17.32 9.1C20.37 9.1 21 11.11 21 13.73V18H18V13.96C18 13 17.98 11.76 16.65 11.76C15.3 11.76 15.1 12.81 15.1 13.89V18H12.1V9.5H11.5Z"
                  fill="white"
                />
              </svg>

              Follow Us on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div
        className={`${container} flex flex-col items-start justify-between gap-8 md:flex-row md:items-center`}
      >
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
          <Link
            to="/opportunities"
            className="font-medium transition-colors hover:text-foreground"
          >
            Internships & Hackathons
          </Link>

          <span aria-hidden="true">•</span>

          <span>
            © 2026 DolpStack. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
