import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Mic, Bug, LayoutGrid, LayoutDashboard,
  Activity, Languages, PenTool, CheckSquare, Check,
  ChevronDown, Sun, Moon, Minus,
} from "lucide-react";
import { PrecisionCanvas } from "@/components/PrecisionCanvas";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { ProductTour } from "@/components/ProductTour";
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
  hidden: { opacity: 0, x: shouldReduce ? 0 : (reverse ? 24 : -24) },
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
  hidden: { opacity: 0, x: shouldReduce ? 0 : (reverse ? -24 : 24) },
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
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Mission />
        <Modules />
        <Walkthrough />
        <Comparison />
        <Steps />
        <Precision />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- primitives ---------- */

const container = "mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12 xl:px-16";
const display = { fontFamily: '"Space Grotesk", "Inter", sans-serif' };

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
    try { localStorage.setItem("theme", next); } catch {}
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

function PrimaryBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md ${className}`}>
      {children}
    </button>
  );
}

function GhostBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:bg-muted hover:shadow-md ${className}`}>
      {children}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{children}</div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className={`${container} flex h-14 items-center justify-between`}>
        <a href="#" className="flex items-center gap-2">
          <img src="/logo-light.png" className="h-6 w-6 object-contain rounded-md dark:hidden" alt="DolpStack Logo" />
          <img src="/logo-dark.png" className="hidden h-6 w-6 object-contain rounded-md dark:block" alt="DolpStack Logo" />
          <span className="text-[15px] font-semibold tracking-tight" style={display}>DolpStack</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#modules" className="transition-colors hover:text-foreground">Modules</a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">Workflow</a>
          <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const shouldReduce = useReducedMotion();
  const leftItem = heroLeftItemVariants(!!shouldReduce);
  const rightItem = heroRightVariants(!!shouldReduce);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10 hairline-grid opacity-40" />
      <div className={`${container} grid items-center gap-12 pt-20 pb-24 md:grid-cols-[1.05fr_0.95fr] md:pt-28 md:pb-32`}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroLeftContainerVariants}
          className="space-y-7"
        >
          <motion.div variants={leftItem} className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Now in general availability</span>
          </motion.div>
          <motion.h1 variants={leftItem} className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl" style={display}>
            The workspace built for<br />
            <span className="text-muted-foreground">engineering teams that ship.</span>
          </motion.h1>
          <motion.p variants={leftItem} className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            DolpStack unifies documentation, trackers, AI agents, and collaborative debuggers into a single command center — no more context switching between fifty tabs.
          </motion.p>
          <motion.div variants={leftItem} className="flex items-center gap-6 pt-2 text-xs text-muted-foreground">
            <span>SOC 2 Type II</span>
            <span className="h-3 w-px bg-border" />
            <span>Self-hosted available</span>
            <span className="h-3 w-px bg-border" />
            <span>SSO & SAML</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightItem}
          className="relative h-[440px] w-full md:h-[600px] md:-mr-16 lg:-mr-24 md:w-[115%]"
        >
          <NeuralCanvas />
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const dur = 1000;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref} className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl" style={display}>{n}{suffix}</div>;
}


function Stats() {
  const items = [
    { v: 100, s: "+", l: "Resources" },
    { v: 99, s: "%", l: "AI Powered" },
    { v: 250, s: "k", l: "Developers" },
    { v: 12, s: "", l: "Platforms" },
  ];
  return (
    <section className="py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="border border-border rounded-[24px] overflow-hidden bg-card grid grid-cols-2 sm:grid-cols-4 shadow-none"
        >
          {items.map((i, index) => (
            <motion.div
              variants={cardVariants}
              key={i.l}
              className={`p-6 md:p-8 flex flex-col justify-center transition-premium border-border
                ${index % 2 === 0 ? "border-r" : ""}
                ${index < 2 ? "border-b" : ""}
                sm:border-b-0
                sm:border-r
                sm:last:border-r-0`}
            >
              <Counter target={i.v} suffix={i.s} />
              <div className="mt-1 text-xs text-muted-foreground">{i.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


function Mission() {
  return (
    <section id="features" className="border-b border-border py-16 md:py-20">
      <div className={`${container} space-y-16 md:space-y-20`}>
        <MissionRow
          eyebrow="Persistent context"
          title="Centralize your mental model."
          body="Every task, documentation snippet, and debugging session lives in a persistent environment. Stop losing flow when switching context — the workspace evolves with your project."
          bullets={["Unified environment for all APIs", "Context-aware search across docs", "Persistent AI memory per project"]}
        />
        <MissionRow
          reverse
          eyebrow="Real-time collaboration"
          title="Debug together, in one place."
          body="Shared, synchronized terminals and canvases. No screen-sharing lag, no disconnected notes — every teammate sees the same state."
          bullets={["Shared breakpoints & stack traces", "Multiplayer cursors and selection", "Auto-indexed team knowledge"]}
        />
      </div>
    </section>
  );
}

function MissionRow({ eyebrow, title, body, bullets, reverse }: {
  eyebrow: string; title: string; body: string; bullets: string[]; reverse?: boolean;
}) {
  const shouldReduce = useReducedMotion();
  const leftItem = missionLeftItemVariants(!!shouldReduce, !!reverse);
  const rightItem = missionRightVariants(!!shouldReduce, !!reverse);

  return (
    <div className={`grid items-center gap-12 md:grid-cols-2 md:gap-20 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
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
        <motion.h2 variants={leftItem} className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>{title}</motion.h2>
        <motion.p variants={leftItem} className="text-base leading-relaxed text-muted-foreground md:text-lg">{body}</motion.p>
        <motion.ul variants={leftItem} className="space-y-3 pt-2">
          {bullets.map(t => (
            <li key={t} className="flex items-start gap-2.5 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
              <span>{t}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={rightItem}
      >
        <MockPanel />
      </motion.div>
    </div>
  );
}


function MockPanel() {
  const { handleMouseMove, handleMouseLeave } = useCardParallax();
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden rounded-[24px] border border-border bg-card elev-sm card-hover-effects parallax-card"
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
        <div className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="ml-3 text-[11px] text-muted-foreground">workspace / api-gateway</div>
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xs font-medium text-foreground">Active resources</div>
          <div className="text-[11px] text-muted-foreground">Updated 2s ago</div>
        </div>
        <div className="divide-y divide-border">
          {[
            ["api-gateway", "production", "Healthy"],
            ["worker-queue", "production", "Healthy"],
            ["postgres-primary", "production", "Degraded"],
            ["cache-layer", "staging", "Healthy"],
          ].map(([n, e, s]) => (
            <div key={n} className="flex items-center justify-between py-2.5 text-sm transition-all duration-200 hover:translate-y-[-2px] hover:brightness-105">
              <div className="flex items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full ${s === "Healthy" ? "bg-[var(--success)]" : "bg-[var(--warning)]"}`} />
                <span className="font-medium text-foreground">{n}</span>
                <span className="text-xs text-muted-foreground">{e}</span>
              </div>
              <span className="text-xs text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Modules() {
  const mods = [
    { icon: Mic, name: "Voice control", desc: "Command your workspace with ultra-low latency voice recognition." },
    { icon: Bug, name: "Shared debug", desc: "Shared breakpoints and stack traces in real time across the team." },
    { icon: LayoutGrid, name: "Resource grid", desc: "Organize AWS, Vercel, and GitHub resources in one unified surface." },
    { icon: LayoutDashboard, name: "Custom HUD", desc: "Configurable heads-up display for mission-critical signals." },
    { icon: Activity, name: "Analytics", desc: "Performance metrics and health checks for every deployment." },
    { icon: Languages, name: "Global docs", desc: "Instant translation for any library documentation you pull." },
    { icon: PenTool, name: "Canvas", desc: "Spatial workspace for architecture diagrams and brainstorming." },
    { icon: CheckSquare, name: "Quest log", desc: "Track engineering challenges and sprint goals without leaving flow." },
  ];
  return (
    <section id="modules" className="border-b border-border py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-14 max-w-2xl space-y-3"
        >
          <Eyebrow>Modules</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>Every surface you need, in one place.</h2>
          <p className="text-base leading-relaxed text-muted-foreground">Composable modules that plug into your workspace. Enable what you need, hide the rest.</p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="border border-border rounded-[24px] overflow-hidden bg-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-none"
        >
          {mods.map((m, i) => {
            const { handleMouseMove, handleMouseLeave } = useCardParallax();
            return (
              <motion.div
                variants={cardVariants}
                key={m.name}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`group p-6 bg-card border-border flex flex-col justify-between card-hover-effects parallax-card
                  ${i % 4 !== 3 ? "lg:border-r" : ""}
                  ${i < 4 ? "lg:border-b" : "lg:border-b-0"}
                  ${i % 2 !== 1 ? "sm:border-r" : "sm:border-r-0"}
                  ${i < 6 ? "sm:border-b" : "sm:border-b-0"}
                  ${i < 7 ? "border-b" : "border-b-0"}`}
              >
                <div>
                  <m.icon className="h-4 w-4 text-muted-foreground opacity-70 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:-translate-y-[2px] group-hover:rotate-3" strokeWidth={1.75} />
                  <h3 className="mt-4 text-sm font-semibold text-foreground/85 transition-premium group-hover:text-foreground">{m.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


function Walkthrough() {
  return (
    <section className="border-b border-border py-16 md:py-20">
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
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>Watch it evolve with your work.</h2>
            <p className="text-sm text-muted-foreground">This dashboard preview is fully interactive. Hover over the metric cards and move your cursor to explore the parallax motion.</p>
          </div>
        </motion.div>
        <ProductTour />
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    ["Context", "Documentation in Chrome, DB in client, code in editor", "Persistent, spatially organized workspace"],
    ["Switching cost", "20 minutes/day finding the right tab", "One shortcut across every surface"],
    ["Team knowledge", "Buried in DMs and screenshots", "Auto-indexed and shared by default"],
    ["Debug workflow", "Screen-share, describe, repeat", "Shared breakpoints and cursors"],
  ];
  return (
    <section className="border-b border-border py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12 max-w-2xl space-y-3"
        >
          <Eyebrow>Comparison</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>The old way, and the DolpStack way.</h2>
        </motion.div>
        <div className="overflow-hidden rounded-[24px] border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="w-40 px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground"></th>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Before</th>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">With DolpStack</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, a, b]) => (
                <tr key={k} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium text-foreground">{k}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-2"><Minus className="h-3.5 w-3.5 text-muted-foreground" />{a}</span>
                  </td>
                  <td className="px-5 py-4 text-foreground">
                    <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />{b}</span>
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
    { n: "01", name: "Create", desc: "Spin up a project workspace and connect your repos in seconds." },
    { n: "02", name: "Compose", desc: "Drop in the modules you need. Databases, agents, terminals, canvases." },
    { n: "03", name: "Ship", desc: "Execute at the speed of thought. Your tools finally work for you." },
  ];
  return (
    <section id="how-it-works" className="border-b border-border py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12 max-w-2xl space-y-3"
        >
          <Eyebrow>Workflow</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>From setup to shipping in three steps.</h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-border pt-6">
              <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground" style={display}>{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Precision() {
  return (
    <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden border-b border-border py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-70">
        <PrecisionCanvas />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative z-10 mx-auto max-w-2xl space-y-4 px-6 text-center"
      >
        <Eyebrow>Engineered for scale</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl" style={display}>Architectural precision.</h2>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">A high-performance runtime keeps your workspace fluid, even with hundreds of active modules and long-lived sessions.</p>
      </motion.div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { quote: "The context-aware documentation search alone saved me from pulling my hair out. It's a professional's tool through and through.", name: "Marcus Thorne", role: "Staff Engineer @ CloudScale", roleColor: "text-primary", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4wqV6n7FCyIdR_APS0z3io3PccOBfS-VnVg18di6Eq--6wijtkLvxXdlOxv4nc_huMjuzhTTT871463EVj0TiVolkgA4pAh8w65NMZ2fSUXJOqT05IEqgjSo8zwKnjSvwZJ6iejLmDCHu50NsAmMVrn-3dPSSOxk7Mt5nIIB43oBfxjRZdBQYLuIhH-7g-YkNTtWLGWRxflvBu_lllY5bO3gFlb9Z123FsCCtu2jUO3btXXP3Ny1N9AmO10ac5BEby_rXfli2Ms8" },
    { quote: "Finally, a dashboard that doesn't feel like a toy. The spatial organization changed how I think about my microservices.", name: "Elena Rodriguez", role: "Fullstack Developer @ FinCore", roleColor: "text-tertiary", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8XMwydOzo6RGZhmt03VF_C6eyISSi3A4YoyvAS1_lbGH9Z6wMP0pOZdAhSa9mBtopv84dCvS1DyEfF-kYqc6_WT54Gbbaqfj0UGOBQUULyLclqLnR6BljLkvACY8oJn4mEnfA79uIk7bKP8z4QrZHF--eD0K6XUDtX3m03gSoUtZ0a0qfpUKV1DQ3RiTSYA2OQHyT99fgHoBAqnlie0WfPesP40mDMMEgFqmWgfAf3ecnFng_c7SitUOuZu9dTTerriVVmCJNtj0" },
    { quote: "Multi-player debugging is the feature I didn't know I needed. We solve production fires in half the time now.", name: "Jordan Wu", role: "CTO @ DataNexus", roleColor: "text-accent", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbz_fDjguk-heeufqqhOBYZEsLEEMJBqlzXyS5vbIYHVVyOQmsGTyavhGHdfR2xFP-HP5LATYrfGYqX1y7JEF1EJVg7Xeoi3BfMwvmRItPA7PLgMUM6epNxJ-VpbFsjnBULj2wlggXklkdEyBOOxwYkS6JHLqeq7FPRi_AobFs4uUyr5qPpTaIViVctW5I7arFKGG5NEeRbHmckFNgMYQJaSWE05y2YtnogWdCTakOP0vcB8MaBlSLJhAKMXORz7xlNhXQpk4KTSI" },
  ];
  const doubled = [...items, ...items];
  return (
    <section className="overflow-hidden border-b border-border py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className={`${container} mb-12 max-w-2xl space-y-3`}
      >
        <Eyebrow>Customers</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>Trusted by engineering teams.</h2>
      </motion.div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max gap-4 animate-marquee">
          {doubled.map((t, i) => {
              const { handleMouseMove, handleMouseLeave } = useCardParallax();
              return (
                <figure
                  key={i}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="group w-[380px] shrink-0 rounded-[24px] border border-border bg-card p-6 card-hover-effects parallax-card"
                >
                  <blockquote className="text-sm leading-relaxed text-foreground">"{t.quote}"</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <div className="avatar-preview h-8 w-8 rounded-full border border-border bg-cover bg-center transition-all duration-200" style={{ backgroundImage: `url('${t.avatar}')` }} />
                    <div className="text-xs">
                      <div className="font-medium text-foreground">{t.name}</div>
                      <div className="text-muted-foreground">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is DolpStack available for desktop?", a: "Yes. DolpStack ships as a native cross-platform desktop app for macOS, Windows, and Linux, alongside the web workspace." },
    { q: "How secure is my code?", a: "DolpStack never stores your source. We connect to your existing providers (GitHub, GitLab) and process everything in your workspace with per-project isolation." },
    { q: "Can I build my own modules?", a: "Yes — our SDK lets you build custom modules in React or Vue and deploy them to a private team marketplace." },
    { q: "Do you support SSO and SAML?", a: "SSO, SAML, and SCIM are available on the Business and Enterprise plans, alongside audit logs and role-based access control." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-border py-16 md:py-20">
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
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>Frequently asked.</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">Can't find what you're looking for? <a href="#" className="text-foreground underline underline-offset-4 hover:no-underline">Talk to sales</a>.</p>
          </motion.div>
          <div className="border-t border-border">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-border">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-5 text-left">
                  <span className="text-sm font-medium text-foreground">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-200 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
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
    <section className="border-b border-border py-16 md:py-20">
      <div className={`${container} flex flex-col items-center text-center max-w-2xl`}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="space-y-3"
        >
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={display}>Ready to reclaim your focus?</h2>
          <p className="text-base leading-relaxed text-muted-foreground">Join 50,000+ engineers who've moved beyond tab chaos. Free for 14 days, no card required.</p>
        </motion.div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="py-12">
      <div className={`${container} flex flex-col items-start justify-between gap-6 md:flex-row md:items-center`}>
        <div className="flex items-center gap-2">
          <img src="/logo-light.png" className="h-6 w-6 object-contain rounded-md dark:hidden" alt="DolpStack Logo" />
          <img src="/logo-dark.png" className="hidden h-6 w-6 object-contain rounded-md dark:block" alt="DolpStack Logo" />
          <span className="text-sm font-semibold tracking-tight" style={display}>DolpStack</span>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 DolpStack, Inc.</div>
      </div>
    </footer>
  );
}
