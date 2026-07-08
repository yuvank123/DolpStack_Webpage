import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, PlayCircle, Zap, Mic, Bug, LayoutGrid, LayoutDashboard,
  Activity, Languages, PenTool, CheckSquare, CheckCircle2, Users,
  ChevronDown, Boxes,
} from "lucide-react";
import { PrecisionCanvas } from "@/components/PrecisionCanvas";
import { NeuralCanvas } from "@/components/NeuralCanvas";

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
      <div className="mx-auto mt-6 flex max-w-[90rem] w-[95%] items-center justify-between rounded-2xl glass-card px-8 py-4">
        <a href="#" className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20">
            <Boxes className="h-5 w-5 text-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>DolpStack</span>
        </a>
        <nav className="hidden items-center gap-10 text-base font-medium text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#modules" className="hover:text-foreground transition">Modules</a>
          <a href="#how-it-works" className="hover:text-foreground transition">How it Works</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <button className="rounded-xl bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-105 hover:shadow-primary/40">
          Start Free
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-8 md:px-16 pt-48 pb-32">
      <div className="mx-auto grid max-w-[90rem] items-center gap-16 md:grid-cols-2">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">The Next Evolution is Here</span>
          </div>
          <h1 className="text-6xl font-extrabold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            One Workspace.<br />Every Tool.<br />
            <span className="text-primary glow-text">Infinite Productivity.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl leading-relaxed text-muted-foreground/90 font-light">
            Stop switching between 50 tabs. DevScale unifies your documentation, trackers, AI agents, and collaborative debuggers into a single, high-performance command center.
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <button className="inline-flex items-center gap-3 rounded-2xl bg-primary px-10 py-5 text-base md:text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50">
              Start Building <ArrowRight className="h-5 w-5" />
            </button>
            <button className="inline-flex items-center gap-3 rounded-2xl glass-card px-10 py-5 text-base md:text-lg font-bold text-foreground transition-all hover:scale-105 hover:bg-white/10">
              Watch Demo <PlayCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative h-[500px] w-full md:h-[650px] lg:h-[750px]">
          <NeuralCanvas />
          <div className="absolute -bottom-6 -left-6 rounded-2xl glass-card p-6 animate-float z-10">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-tertiary/20">
                <Zap className="h-6 w-6 text-tertiary" />
              </div>
              <div>
                <div className="text-base font-bold">+40% Flow State</div>
                <div className="text-xs text-muted-foreground">Measured across 500+ teams</div>
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
  return <div ref={ref} className="text-6xl md:text-7xl font-extrabold text-primary" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{n}{suffix}</div>;
}

function Stats() {
  const items = [
    { v: 100, s: "+", l: "Resources" },
    { v: 99, s: "%", l: "AI Powered" },
    { v: 250, s: "k", l: "Developers" },
    { v: 12, s: "", l: "Platforms" },
  ];
  return (
    <section className="border-y border-white/5 bg-surface-low/40 py-24 backdrop-blur-md">
      <div className="mx-auto grid max-w-[90rem] w-[90%] grid-cols-2 gap-12 px-8 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.l} className="space-y-3 text-center">
            <Counter target={i.v} suffix={i.s} />
            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">{i.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="features" className="overflow-hidden px-8 md:px-16 py-36">
      <div className="mx-auto max-w-[90rem] space-y-48">
        <div className="flex flex-col items-center gap-24 md:flex-row">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-extrabold md:text-6xl tracking-tight leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Centralize Your <span className="text-tertiary">Mental Model</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground/90 font-light leading-relaxed">
              Every task, documentation snippet, and debugging session lives in a persistent environment. Stop losing your flow when switching context—the workspace evolves with your project.
            </p>
            <ul className="space-y-6">
              {["Unified environment for all APIs","Context-aware search across documentation","Persistent AI memory per project"].map(t => (
                <li key={t} className="flex items-center gap-4 text-lg md:text-xl font-medium">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] md:h-[480px] flex-1 overflow-hidden rounded-[2.5rem] glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-low shadow-2xl">
                <div className="flex h-8 items-center gap-2 bg-surface-high px-6">
                  <div className="h-3.5 w-3.5 rounded-full bg-destructive" />
                  <div className="h-3.5 w-3.5 rounded-full bg-tertiary" />
                  <div className="h-3.5 w-3.5 rounded-full bg-primary" />
                </div>
                <div className="space-y-6 p-6">
                  <div className="h-6 w-1/2 rounded bg-white/10 animate-pulse" />
                  <div className="grid grid-cols-2 gap-6">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="h-28 rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
                        <div className="h-3 w-3/4 rounded bg-primary/30" />
                        <div className="h-3 w-full rounded bg-white/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-24 md:flex-row-reverse">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-extrabold md:text-6xl tracking-tight leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Real-time <span className="text-primary">Collaborative Focus</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground/90 font-light leading-relaxed">
              Debug complex issues with your team in a shared, synchronized terminal and whiteboard. No more screen-sharing lag or disconnected notes.
            </p>
            <div className="rounded-3xl glass-card border-l-4 border-primary p-8">
              <p className="text-lg md:text-xl italic font-light leading-relaxed">"DevScale saved us 15 hours a week in architectural syncs."</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/40" />
                <div>
                  <div className="text-base font-bold">Sarah Chen</div>
                  <div className="text-xs text-muted-foreground">Lead Architect @ Innovate.io</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex h-[400px] md:h-[480px] flex-1 items-center justify-center overflow-hidden rounded-[2.5rem] glass-card p-16">
            <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-tertiary/30 blur-3xl" />
            <div className="relative space-y-6 rounded-3xl glass-card p-10 text-center w-full max-w-sm">
              <Users className="mx-auto h-16 w-16 text-primary" />
              <div className="text-2xl font-bold">Live Multiplayer</div>
              <div className="flex -space-x-3 justify-center">
                <div className="h-10 w-10 rounded-full border-2 border-background bg-primary" />
                <div className="h-10 w-10 rounded-full border-2 border-background bg-tertiary" />
                <div className="h-10 w-10 rounded-full border-2 border-background bg-muted-foreground" />
                <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-background bg-surface-high text-xs font-semibold">+4</div>
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
    <section id="modules" className="bg-surface-low/30 py-32">
      <div className="mx-auto max-w-[90rem] w-full px-8 md:px-16">
        <div className="mx-auto mb-20 max-w-3xl space-y-6 text-center">
          <h2 className="text-5xl font-extrabold md:text-6xl tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Powerful Modules</h2>
          <p className="text-xl text-muted-foreground/90 font-light">Every tool you need, reimagined for a glass-ui workspace. Modular and infinitely extensible.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {mods.map(m => (
            <div key={m.name} className="group cursor-pointer rounded-3xl glass-card p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/5">
              <div className={`mb-8 grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${m.color}`}>
                <m.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl md:text-2xl font-bold">{m.name}</h3>
              <p className="text-base text-muted-foreground/90 font-light leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Walkthrough() {
  return (
    <section className="px-8 md:px-16 py-36">
      <div className="mx-auto max-w-[90rem] w-full">
        <div className="mb-20 text-center space-y-4">
          <h2 className="text-5xl font-extrabold md:text-6xl tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Watch it Evolve</h2>
          <p className="text-xl text-muted-foreground/90 font-light">The workspace that scales with your ambition.</p>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] glass-card p-6 shadow-2xl">
          <div className="relative flex h-full w-full rounded-2xl border border-white/5 bg-surface-low">
            <div className="flex h-full w-20 flex-col items-center gap-8 border-r border-white/5 bg-surface-high py-8">
              <div className="h-10 w-10 rounded-xl bg-primary/30" />
              <div className="h-10 w-10 rounded-xl bg-white/5" />
              <div className="h-10 w-10 rounded-xl bg-white/5" />
              <div className="h-10 w-10 rounded-xl bg-white/5" />
            </div>
            <div className="flex-1 space-y-8 p-12">
              <div className="h-10 w-64 rounded bg-white/10" />
              <div className="grid grid-cols-3 gap-8">
                {[[ "bg-primary/40"],[ "bg-tertiary/40"],[ "bg-accent/40"]].map(([c],i) => (
                  <div key={i} className="h-40 rounded-2xl border border-white/5 bg-white/5 p-6 flex flex-col justify-between">
                    <div className={`h-3 w-1/2 rounded ${c}`} />
                    <div className="h-16 w-full rounded bg-white/5" />
                  </div>
                ))}
              </div>
              <div className="grid h-56 w-full place-items-center rounded-2xl border border-white/5 bg-white/5 text-base md:text-lg text-muted-foreground/80">
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
    <section className="relative bg-surface-low/20 py-32">
      <div className="mx-auto max-w-[90rem] w-full px-8 md:px-16">
        <div className="relative grid gap-16 md:grid-cols-2 md:gap-32">
          <div className="absolute inset-y-0 left-1/2 hidden w-px bg-white/10 md:block" />
          <div className="space-y-12">
            <h3 className="text-4xl font-extrabold text-destructive/80 md:text-right md:pr-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>The Old Way</h3>
            {old.map((t,i) => (
              <div key={t} className="rounded-3xl glass-card border-l-4 border-destructive/50 p-8 opacity-70 md:mr-8 md:text-right">
                <div className="mb-3 text-xl md:text-2xl font-bold">{t}</div>
                <p className="text-base text-muted-foreground/90 font-light leading-relaxed">{oldDesc[i]}</p>
              </div>
            ))}
          </div>
          <div className="space-y-12">
            <h3 className="text-4xl font-extrabold text-primary md:pl-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>The DevScale Way</h3>
            {nw.map((t,i) => (
              <div key={t} className="rounded-3xl glass-card border-l-4 border-primary p-8 md:ml-8">
                <div className="mb-3 text-xl md:text-2xl font-bold">{t}</div>
                <p className="text-base text-muted-foreground/90 font-light leading-relaxed">{nwDesc[i]}</p>
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
    <section id="how-it-works" className="overflow-hidden py-40">
      <div className="mx-auto max-w-[90rem] w-full px-8 md:px-16">
        <h2 className="mb-32 text-center text-5xl font-extrabold md:text-6xl tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Three Steps to Mastery</h2>
        <div className="relative grid gap-16 md:grid-cols-3">
          {steps.map((s,i) => (
            <div key={s.n} className="group relative text-center">
              <div className={`mx-auto mb-10 grid h-24 w-24 place-items-center rounded-[2rem] border transition-transform duration-300 group-hover:scale-105 ${s.color}`}>
                <span className="text-5xl font-black">{s.n}</span>
              </div>
              <h3 className="mb-4 text-3xl font-extrabold">{s.name}</h3>
              <p className="text-lg text-muted-foreground/90 font-light leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute left-[60%] top-12 hidden h-px w-full bg-gradient-to-r from-primary/60 to-transparent md:block" />
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
    <section className="relative flex h-[600px] items-center justify-center overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute left-1/3 top-1/3 h-[600px] w-[600px] rounded-full bg-tertiary/20 blur-[150px]" />
      </div>
      <PrecisionCanvas />
      <div className="z-10 max-w-4xl space-y-8 px-8 text-center">
        <h2 className="text-6xl md:text-7xl font-extrabold glow-text leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Architectural Precision</h2>
        <p className="text-xl md:text-2xl text-muted-foreground/90 font-light leading-relaxed">Built on a custom high-performance engine to ensure your workspace remains fluid even with hundreds of active modules.</p>
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
    <section className="overflow-hidden border-t border-white/5 py-32">
      <div className="mx-auto mb-20 max-w-[90rem] w-full px-8 md:px-16">
        <h2 className="text-center text-5xl font-extrabold md:text-6xl tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Loved by Architects</h2>
      </div>
      <div className="relative">
        <div className="flex w-max gap-10 animate-marquee px-8">
          {doubled.map((t,i) => (
            <div key={i} className="w-[500px] shrink-0 space-y-8 rounded-[2.5rem] glass-card p-10 transition-colors duration-300 hover:bg-white/5">
              <p className="text-xl italic font-light leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-full border border-white/10 bg-cover bg-center" style={{ backgroundImage: `url('${t.avatar}')` }} />
                <div>
                  <div className="text-lg font-bold">{t.name}</div>
                  <div className={`text-sm uppercase tracking-wide font-semibold ${t.roleColor}`}>{t.role}</div>
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
    <section id="faq" className="bg-surface-low/20 px-8 md:px-16 py-32">
      <div className="mx-auto max-w-5xl w-full">
        <h2 className="mb-20 text-center text-5xl font-extrabold md:text-6xl tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Frequently Asked</h2>
        <div className="space-y-6">
          {faqs.map((f,i) => (
            <div key={f.q} className="overflow-hidden rounded-3xl glass-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-8 text-left transition-colors hover:bg-white/5">
                <span className="text-xl font-bold">{f.q}</span>
                <ChevronDown className={`h-6 w-6 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-8 pb-8 text-lg text-muted-foreground/90 font-light leading-relaxed">{f.a}</p>
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
    <section className="px-8 md:px-16 py-40">
      <div className="relative mx-auto max-w-[90rem] w-[95%] space-y-12 overflow-hidden rounded-[3rem] glass-card p-20 md:p-24 text-center">
        <div className="absolute inset-0 -z-10 bg-primary/5" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-tertiary/20 blur-[150px]" />
        <h2 className="text-5xl font-extrabold md:text-6xl lg:text-7xl tracking-tight leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Ready to transform the way you build software?</h2>
        <p className="mx-auto max-w-4xl text-xl md:text-2xl text-muted-foreground/90 font-light leading-relaxed">
          Join 50,000+ developers who have already transcended the tab-switching chaos. Start your 14-day free trial today.
        </p>
        <div className="flex flex-col justify-center gap-6 pt-6 sm:flex-row">
          <button className="rounded-2xl bg-primary px-16 py-6 text-lg md:text-xl font-bold text-primary-foreground shadow-2xl shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-primary/50">Get Started Now</button>
          <button className="rounded-2xl glass-card px-16 py-6 text-lg md:text-xl font-bold text-foreground transition-all duration-300 hover:scale-105 hover:bg-white/10">Book Enterprise Demo</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-8 md:px-16 py-16">
      <div className="mx-auto flex max-w-[90rem] w-[95%] flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20">
            <Boxes className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>DevScale</span>
        </div>
        <div className="flex gap-10 text-base font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Terms</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </div>
        <div className="text-sm text-muted-foreground">© 2026 DevScale. All rights reserved.</div>
      </div>
    </footer>
  );
}
