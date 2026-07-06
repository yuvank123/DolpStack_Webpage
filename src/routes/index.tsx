import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, PlayCircle, Zap, Mic, Bug, LayoutGrid, LayoutDashboard,
  Activity, Languages, PenTool, CheckSquare, CheckCircle2, Users,
  ChevronDown, Sparkles, Code2, Boxes,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,transparent_20%,var(--background)_80%)]" />
      <Nav />
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
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass-card px-6 py-3">
        <a href="#" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/20">
            <Boxes className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>DevScale</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#modules" className="hover:text-foreground transition">Modules</a>
          <a href="#how-it-works" className="hover:text-foreground transition">How it Works</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/40">
          Start Free
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-40 pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">The Next Evolution is Here</span>
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            One Workspace.<br />Every Tool.<br />
            <span className="text-primary glow-text">Infinite Productivity.</span>
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">
            Stop switching between 50 tabs. DevScale unifies your documentation, trackers, AI agents, and collaborative debuggers into a single, high-performance command center.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/40">
              Start Building <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl glass-card px-8 py-4 text-sm font-semibold text-foreground transition hover:bg-white/5">
              Watch Demo <PlayCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="relative h-[500px] w-full">
          <div className="absolute inset-0 rounded-3xl glass-card overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklch,var(--primary)_35%,transparent),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,color-mix(in_oklch,var(--tertiary)_30%,transparent),transparent_55%)]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="animate-float relative">
                <div className="grid h-40 w-40 place-items-center rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl">
                  <Sparkles className="h-16 w-16 text-primary glow-text" />
                </div>
                <div className="absolute -right-16 top-6 rounded-2xl glass-card p-3 text-xs">
                  <Code2 className="h-4 w-4 text-tertiary" />
                </div>
                <div className="absolute -left-14 bottom-4 rounded-2xl glass-card p-3 text-xs">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl glass-card p-4 animate-float">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-tertiary/20">
                <Zap className="h-5 w-5 text-tertiary" />
              </div>
              <div>
                <div className="text-sm font-bold">+40% Flow State</div>
                <div className="text-[10px] text-muted-foreground">Measured across 500+ teams</div>
              </div>
            </div>
          </div>
        </div>
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
        const dur = 1400;
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
  return <div ref={ref} className="text-5xl font-bold text-primary" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{n}{suffix}</div>;
}

function Stats() {
  const items = [
    { v: 100, s: "+", l: "Resources" },
    { v: 99, s: "%", l: "AI Powered" },
    { v: 250, s: "k", l: "Developers" },
    { v: 12, s: "", l: "Platforms" },
  ];
  return (
    <section className="border-y border-white/5 bg-surface-low/40 py-16 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.l} className="space-y-2 text-center">
            <Counter target={i.v} suffix={i.s} />
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{i.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="features" className="overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-32">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Centralize Your <span className="text-tertiary">Mental Model</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Every task, documentation snippet, and debugging session lives in a persistent environment. Stop losing your flow when switching context—the workspace evolves with your project.
            </p>
            <ul className="space-y-4">
              {["Unified environment for all APIs","Context-aware search across documentation","Persistent AI memory per project"].map(t => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 flex-1 overflow-hidden rounded-3xl glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="h-full w-full overflow-hidden rounded-xl border border-white/10 bg-surface-low shadow-2xl">
                <div className="flex h-6 items-center gap-1.5 bg-surface-high px-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
                  <div className="h-2.5 w-2.5 rounded-full bg-tertiary" />
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <div className="space-y-4 p-4">
                  <div className="h-4 w-1/2 rounded bg-white/10" />
                  <div className="grid grid-cols-2 gap-4">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="h-20 rounded-lg border border-white/5 bg-white/5 p-3">
                        <div className="mb-2 h-2 w-3/4 rounded bg-primary/30" />
                        <div className="h-2 w-full rounded bg-white/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-16 md:flex-row-reverse">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Real-time <span className="text-primary">Collaborative Focus</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Debug complex issues with your team in a shared, synchronized terminal and whiteboard. No more screen-sharing lag or disconnected notes.
            </p>
            <div className="rounded-2xl glass-card border-l-4 border-primary p-6">
              <p className="italic">"DevScale saved us 15 hours a week in architectural syncs."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/40" />
                <div>
                  <div className="text-sm font-bold">Sarah Chen</div>
                  <div className="text-[10px] text-muted-foreground">Lead Architect @ Innovate.io</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex h-80 flex-1 items-center justify-center overflow-hidden rounded-3xl glass-card p-12">
            <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-tertiary/30 blur-3xl" />
            <div className="relative space-y-4 rounded-2xl glass-card p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-primary" />
              <div className="text-xl font-bold">Live Multiplayer</div>
              <div className="flex -space-x-2 justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-background bg-primary" />
                <div className="h-8 w-8 rounded-full border-2 border-background bg-tertiary" />
                <div className="h-8 w-8 rounded-full border-2 border-background bg-muted-foreground" />
                <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-background bg-surface-high text-[10px]">+4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  const mods = [
    { icon: Mic, name: "AI Voice", desc: "Command your workspace with ultra-low latency voice recognition.", color: "text-primary bg-primary/10" },
    { icon: Bug, name: "Multi-Debug", desc: "Shared breakpoints and stack trace analysis in real-time.", color: "text-tertiary bg-tertiary/10" },
    { icon: LayoutGrid, name: "Resource Grid", desc: "Organize your AWS, Vercel, and GitHub repos in one grid.", color: "text-primary bg-primary/10" },
    { icon: LayoutDashboard, name: "Dynamic HUD", desc: "Customizable heads-up display for all mission-critical data.", color: "text-accent bg-accent/10" },
    { icon: Activity, name: "Analytics", desc: "Performance metrics and health checks for every deployment.", color: "text-destructive bg-destructive/10" },
    { icon: Languages, name: "Global Docs", desc: "Instant AI translation for any library documentation you pull.", color: "text-primary bg-primary/10" },
    { icon: PenTool, name: "Glassboard", desc: "A spatial canvas for architectural diagrams and brainstorming.", color: "text-tertiary bg-tertiary/10" },
    { icon: CheckSquare, name: "Quest Log", desc: "Track engineering challenges and sprint goals effortlessly.", color: "text-foreground bg-white/10" },
  ];
  return (
    <section id="modules" className="bg-surface-low/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
          <h2 className="text-4xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Powerful Modules</h2>
          <p className="text-muted-foreground">Every tool you need, reimagined for a glass-ui workspace. Modular and infinitely extensible.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mods.map(m => (
            <div key={m.name} className="group cursor-pointer rounded-2xl glass-card p-6 transition hover:-translate-y-1">
              <div className={`mb-6 grid h-12 w-12 place-items-center rounded-xl transition-transform group-hover:scale-110 ${m.color}`}>
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Walkthrough() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Watch it Evolve</h2>
          <p className="mt-2 text-muted-foreground">The workspace that scales with your ambition.</p>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl glass-card p-4 shadow-2xl">
          <div className="relative flex h-full w-full rounded-xl border border-white/5 bg-surface-low">
            <div className="flex h-full w-16 flex-col items-center gap-6 border-r border-white/5 bg-surface-high py-6">
              <div className="h-8 w-8 rounded-lg bg-primary/30" />
              <div className="h-8 w-8 rounded-lg bg-white/5" />
              <div className="h-8 w-8 rounded-lg bg-white/5" />
              <div className="h-8 w-8 rounded-lg bg-white/5" />
            </div>
            <div className="flex-1 space-y-6 p-8">
              <div className="h-8 w-48 rounded bg-white/10" />
              <div className="grid grid-cols-3 gap-6">
                {[[ "bg-primary/40"],[ "bg-tertiary/40"],[ "bg-accent/40"]].map(([c],i) => (
                  <div key={i} className="h-32 rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className={`mb-3 h-2 w-1/2 rounded ${c}`} />
                    <div className="h-12 w-full rounded bg-white/5" />
                  </div>
                ))}
              </div>
              <div className="grid h-40 w-full place-items-center rounded-xl border border-white/5 bg-white/5 text-sm text-muted-foreground">
                [ Live Stream Connected ]
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50" />
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const old = ["Scattered Context","Tab Fatigue","Isolated Silos"];
  const oldDesc = ["Documentation in Chrome, DB in client, code in VSCode, Slack for sync.","Losing 20 minutes a day just finding the right browser tab.","Team knowledge buried in private Slack threads and DM screenshots."];
  const nw = ["Unified State","Focus Flow","Knowledge Mesh"];
  const nwDesc = ["Everything is persistent and spatially organized. Pick up where you left.","One keyboard shortcut for everything. Your mental energy stays on the code.","Shared workspace automatically indexes team actions and documentation."];
  return (
    <section className="relative bg-surface-low/20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative grid gap-16 md:grid-cols-2 md:gap-24">
          <div className="absolute inset-y-0 left-1/2 hidden w-px bg-white/10 md:block" />
          <div className="space-y-10">
            <h3 className="text-3xl font-bold text-destructive/80 md:text-right md:pr-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>The Old Way</h3>
            {old.map((t,i) => (
              <div key={t} className="rounded-2xl glass-card border-l-4 border-destructive/50 p-6 opacity-70 md:mr-8 md:text-right">
                <div className="mb-2 text-lg font-bold">{t}</div>
                <p className="text-sm text-muted-foreground">{oldDesc[i]}</p>
              </div>
            ))}
          </div>
          <div className="space-y-10">
            <h3 className="text-3xl font-bold text-primary md:pl-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>The DevScale Way</h3>
            {nw.map((t,i) => (
              <div key={t} className="rounded-2xl glass-card border-l-4 border-primary p-6 md:ml-8">
                <div className="mb-2 text-lg font-bold">{t}</div>
                <p className="text-sm text-muted-foreground">{nwDesc[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    { n: 1, name: "Create", desc: "Spin up a project-specific workspace in seconds. Connect your repos.", color: "bg-primary/10 border-primary/30 text-primary" },
    { n: 2, name: "Choose", desc: "Drop in the modules you need. DB explorer, AI agents, or terminal grids.", color: "bg-tertiary/10 border-tertiary/30 text-tertiary" },
    { n: 3, name: "Boost", desc: "Execute at the speed of thought. Your tools now work for you.", color: "bg-accent/10 border-accent/30 text-accent" },
  ];
  return (
    <section id="how-it-works" className="overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-24 text-center text-4xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Three Steps to Mastery</h2>
        <div className="relative grid gap-12 md:grid-cols-3">
          {steps.map((s,i) => (
            <div key={s.n} className="group relative text-center">
              <div className={`mx-auto mb-8 grid h-20 w-20 place-items-center rounded-2xl border ${s.color}`}>
                <span className="text-4xl font-black">{s.n}</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold">{s.name}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute left-[60%] top-10 hidden h-px w-full bg-gradient-to-r from-primary/60 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Precision() {
  return (
    <section className="relative flex h-[500px] items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-tertiary/20 blur-[120px]" />
      </div>
      <div className="z-10 max-w-2xl space-y-6 px-6 text-center">
        <h2 className="text-5xl font-bold glow-text" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Architectural Precision</h2>
        <p className="text-lg text-muted-foreground">Built on a custom high-performance engine to ensure your workspace remains fluid even with hundreds of active modules.</p>
      </div>
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
    <section className="overflow-hidden border-t border-white/5 py-24">
      <div className="mx-auto mb-16 max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Loved by Architects</h2>
      </div>
      <div className="relative">
        <div className="flex w-max gap-8 animate-marquee px-6">
          {doubled.map((t,i) => (
            <div key={i} className="w-[400px] shrink-0 space-y-6 rounded-3xl glass-card p-8">
              <p className="text-lg italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full border border-white/10 bg-cover bg-center" style={{ backgroundImage: `url('${t.avatar}')` }} />
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className={`text-xs uppercase tracking-wide ${t.roleColor}`}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is DevScale available for desktop?", a: "Yes, DevScale is built as a cross-platform desktop application using Rust and Webview tech for maximum performance and minimum memory footprint." },
    { q: "How secure is my code?", a: "DevScale never stores your source code. We connect to your existing providers (GitHub, GitLab) and process everything locally in your workspace." },
    { q: "Can I build my own modules?", a: "Absolutely. Our SDK allows you to build custom glass-ui modules using React or Vue and deploy them to your private team marketplace." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-surface-low/20 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-16 text-center text-4xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Frequently Asked</h2>
        <div className="space-y-4">
          {faqs.map((f,i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl glass-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-6 text-left">
                <span className="text-lg font-semibold">{f.q}</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-32">
      <div className="relative mx-auto max-w-6xl space-y-8 overflow-hidden rounded-[40px] glass-card p-16 text-center">
        <div className="absolute inset-0 -z-10 bg-primary/5" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-tertiary/20 blur-[100px]" />
        <h2 className="text-4xl font-bold md:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Ready to transform the way you build software?</h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Join 50,000+ developers who have already transcended the tab-switching chaos. Start your 14-day free trial today.
        </p>
        <div className="flex flex-col justify-center gap-4 pt-4 md:flex-row">
          <button className="rounded-2xl bg-primary px-12 py-5 font-semibold text-primary-foreground shadow-2xl shadow-primary/30 transition hover:scale-105">Get Started Now</button>
          <button className="rounded-2xl glass-card px-12 py-5 font-semibold text-foreground transition hover:bg-white/5">Book Enterprise Demo</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/20">
            <Boxes className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>DevScale</span>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 DevScale. All rights reserved.</div>
      </div>
    </footer>
  );
}
