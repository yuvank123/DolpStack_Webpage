import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Bookmark,
  StickyNote,
  FileText,
  Rocket,
  Bug,
  MessageSquare,
  GitBranch,
  CheckCircle2,
  LayoutGrid,
  TrendingUp,
  Activity,
  Calendar,
  Languages,
  Globe,
  PenTool,
  Plus,
  Share2,
  ListChecks,
  CheckSquare,
  Mic,
  Sparkles,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 7000;
const STORAGE_KEY = "dolp:hero-slide";

type Slide = {
  id: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  render: (active: boolean) => React.ReactNode;
};

/* ------------------------------ carousel ------------------------------ */
export function HeroCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // load persisted slide
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw != null) {
        const n = parseInt(raw, 10);
        if (!Number.isNaN(n) && n >= 0 && n < SLIDES.length) setIndex(n);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(index));
    } catch {}
  }, [index]);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  // autoplay
  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(next, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, next]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!rootRef.current) return;
      const active = document.activeElement;
      const inside = rootRef.current.contains(active);
      if (!inside) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // wheel + swipe
  const wheelLock = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    const now = performance.now();
    if (now - wheelLock.current < 500) return;
    if (Math.abs(e.deltaX) < 15 && Math.abs(e.deltaY) < 15) return;
    wheelLock.current = now;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX > 0 : e.deltaY > 0) next();
    else prev();
  };
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStart.current = null;
  };

  const slide = SLIDES[index];

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-10">
        {/* LEFT — text */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + ":text"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-5"
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                {slide.category}
              </div>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[44px]">
                {slide.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {slide.description}
              </p>
              <ul className="space-y-2 pt-1">
                {slide.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 pt-2">
                <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-md">
                  {slide.cta} <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                className={`h-1 rounded-full transition-all ${
                  i === index ? "w-8 bg-foreground" : "w-4 bg-border hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — mock window */}
        <div className="min-w-0">
          <MockWindow title={`dolpstack.app — ${slide.category}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + ":view"}
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.99, y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-full"
              >
                {slide.render(true)}
              </motion.div>
            </AnimatePresence>
          </MockWindow>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- window chrome ---------------------------- */
function MockWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="group/window mx-auto w-full max-w-[340px] overflow-hidden rounded-[38px] border-[10px] border-foreground/80 bg-card shadow-[0_20px_60px_-20px_rgba(99,102,241,0.12),_0_0_100px_-10px_rgba(99,102,241,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_30px_80px_-20px_rgba(99,102,241,0.18),_0_0_120px_-10px_rgba(99,102,241,0.1)] md:max-w-none md:rounded-[20px] md:border md:border-border dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),_0_0_120px_-10px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),_0_0_140px_-5px_rgba(99,102,241,0.2)]">
      {/* mobile status bar */}
      <div className="relative flex items-center justify-between border-b border-border bg-muted/40 px-5 py-2 text-[10px] font-medium tabular-nums text-muted-foreground md:hidden">
        <span>9:41</span>
        <span className="absolute left-1/2 top-1.5 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground/80" />
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
          <span>5G</span>
          <span className="inline-block h-2 w-4 rounded-[3px] border border-current" />
        </span>
      </div>
      {/* title bar */}
      <div className="hidden items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5 md:flex">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="ml-3 truncate text-[11px] text-muted-foreground">{title}</div>
        <div className="ml-auto hidden items-center gap-1 text-[10px] text-muted-foreground sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" /> Live
        </div>
      </div>
      {/* body */}
      <div className="h-[500px] overflow-y-auto overflow-x-hidden bg-background md:h-[480px] md:overflow-hidden">
        {children}
      </div>
      {/* home indicator (mobile) */}
      <div className="flex justify-center border-t border-border bg-muted/30 py-2 md:hidden">
        <span className="h-1 w-24 rounded-full bg-foreground/30" />
      </div>
      {/* status bar */}
      <div className="hidden items-center justify-between border-t border-border bg-muted/30 px-4 py-1.5 text-[10px] text-muted-foreground md:flex">
        <span>workspace / main</span>
        <span className="tabular-nums">v4.2.1 · synced</span>
      </div>
    </div>
  );
}

/* ============================ SLIDES ============================ */

function useCount(target: number, active: boolean, dur = 900) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!active || reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur, reduce]);
  return n;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[12px] border border-border bg-card p-3 transition-all hover:-translate-y-[2px] hover:border-foreground/20 ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------- 1. Dashboard ------------- */
function DashboardSlide({ active }: { active: boolean }) {
  const notes = useCount(12, active);
  const bookmarks = useCount(48, active);
  const streak = useCount(23, active);
  return (
    <div className="grid h-full grid-cols-12 gap-3 overflow-auto p-5">
      <div className="col-span-12 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Home</div>
          <div className="text-base font-semibold text-foreground">Good afternoon, Alex</div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-foreground hover:-translate-y-[2px]">
          <Plus className="h-3 w-3" /> Quick add
        </button>
      </div>
      <Panel className="col-span-4 !p-3">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Sticky notes
        </div>
        <div className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{notes}</div>
      </Panel>
      <Panel className="col-span-4 !p-3">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Bookmarks</div>
        <div className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{bookmarks}</div>
      </Panel>
      <Panel className="col-span-4 !p-3">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Day streak</div>
        <div className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{streak}</div>
      </Panel>

      <Panel className="col-span-7">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-foreground">
          <StickyNote className="h-3 w-3" /> Sticky notes
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              c: "bg-[oklch(0.94_0.08_85)] text-[oklch(0.3_0.05_85)]",
              t: "Refactor auth store",
              s: "Personal",
            },
            {
              c: "bg-[oklch(0.92_0.08_180)] text-[oklch(0.3_0.05_200)]",
              t: "Ship voice beta by Fri",
              s: "Work",
            },
            {
              c: "bg-[oklch(0.93_0.08_320)] text-[oklch(0.3_0.05_320)]",
              t: "Read TanStack RFC",
              s: "Learning",
            },
            {
              c: "bg-[oklch(0.93_0.08_140)] text-[oklch(0.3_0.05_140)]",
              t: "Pair on realtime sync",
              s: "Team",
            },
          ].map((n, i) => (
            <motion.div
              key={n.t}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3, ease: EASE }}
              className={`rounded-md p-2 text-[11px] leading-snug shadow-sm ${n.c}`}
            >
              <div className="font-medium">{n.t}</div>
              <div className="mt-1 text-[9px] opacity-70">{n.s}</div>
            </motion.div>
          ))}
        </div>
      </Panel>

      <Panel className="col-span-5">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-foreground">
          <Bookmark className="h-3 w-3" /> Recent bookmarks
        </div>
        <ul className="space-y-1.5 text-[11px]">
          {[
            "tanstack.com/router",
            "supabase.com/auth",
            "vercel.com/edge",
            "react.dev/suspense",
          ].map((r, i) => (
            <motion.li
              key={r}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.3, ease: EASE }}
              className="flex items-center justify-between text-muted-foreground hover:text-foreground"
            >
              <span className="truncate">{r}</span>
              <span className="text-[9px]">↗</span>
            </motion.li>
          ))}
        </ul>
      </Panel>

      <Panel className="col-span-12">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[11px] font-medium text-foreground">Weekly progress</div>
          <div className="text-[10px] text-muted-foreground">87% goal</div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "87%" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-full rounded-full bg-accent"
          />
        </div>
      </Panel>
    </div>
  );
}

/* ------------- 2. Debug ------------- */
function DebugSlide() {
  return (
    <div className="grid h-full grid-cols-[1fr_1.2fr] gap-3 overflow-auto p-5">
      <div className="space-y-2">
        <div className="text-[11px] font-medium text-foreground">Active bugs</div>
        {[
          { id: "BUG-482", t: "Memory leak in Dashboard", s: "Open", u: "amelia", m: 12, on: true },
          {
            id: "BUG-471",
            t: "JWT refresh loop on expiry",
            s: "In review",
            u: "kenji",
            m: 8,
            on: false,
          },
          {
            id: "BUG-465",
            t: "Docker build failing arm64",
            s: "Resolved",
            u: "priya",
            m: 5,
            on: false,
          },
        ].map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3, ease: EASE }}
            className={`rounded-md border p-2 text-[11px] transition-all hover:-translate-y-[2px] ${b.on ? "border-foreground/25 bg-muted/40" : "border-border bg-card"}`}
          >
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{b.id}</span>
              <span
                className={`rounded-full border px-1.5 py-0.5 ${b.s === "Resolved" ? "border-[var(--success)]/40 text-[var(--success)]" : b.s === "In review" ? "border-[var(--warning)]/40 text-[var(--warning)]" : "border-border"}`}
              >
                {b.s}
              </span>
            </div>
            <div className="mt-1 font-medium text-foreground">{b.t}</div>
            <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MessageSquare className="h-2.5 w-2.5" /> {b.m}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitBranch className="h-2.5 w-2.5" /> @{b.u}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <Panel>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">BUG-482</div>
        <div className="mt-0.5 text-sm font-semibold text-foreground">Memory leak in Dashboard</div>
        <div className="mt-3 space-y-2 text-[11px]">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Thread</div>
            <div className="mt-1 space-y-1.5">
              {[
                { u: "amelia", t: "Repro: open /analytics for 1hr, RSS grows ~40MB/hr" },
                { u: "kenji", t: "Hypothesis: socket sub without cleanup in useEffect" },
                { u: "priya", t: "Confirmed. Missing unsubscribe on unmount ✅" },
              ].map((r, i) => (
                <motion.div
                  key={r.t}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.3, ease: EASE }}
                  className="flex gap-2"
                >
                  <div className="h-5 w-5 shrink-0 rounded-full bg-muted text-center text-[9px] leading-5 text-foreground">
                    {r.u[0]}
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-foreground">@{r.u}</span> {r.t}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-md border border-[var(--success)]/30 bg-[var(--success)]/5 px-2 py-1.5 text-[var(--success)]">
            <CheckCircle2 className="h-3 w-3" /> Accepted: return cleanup from effect
          </div>
          <pre className="mt-2 overflow-x-auto rounded bg-muted/60 p-2 text-[10px] leading-relaxed text-foreground/80">
            <code>{`at Dashboard.tsx:42
at ChartWidget.tsx:118
at socket.subscribe()`}</code>
          </pre>
        </div>
      </Panel>
    </div>
  );
}

/* ------------- 3. Website grid ------------- */
function ResourcesSlide() {
  const [filter, setFilter] = useState("All");
  const chips = ["All", "Frontend", "Backend", "DevOps", "AI"];
  const cats = [
    { n: "Frontend", c: 128 },
    { n: "Backend", c: 96 },
    { n: "DevOps", c: 74 },
    { n: "AI", c: 152 },
    { n: "Cloud", c: 89 },
    { n: "Security", c: 41 },
    { n: "Database", c: 58 },
    { n: "Testing", c: 63 },
  ];
  const visible = cats.filter((c) => filter === "All" || c.n === filter);
  return (
    <div className="h-full space-y-3 overflow-auto p-5">
      <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[11px] text-muted-foreground">Search 731 curated resources…</span>
        <span className="ml-1 inline-block h-3 w-[1px] bg-foreground animate-caret" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-2.5 py-1 text-[11px] transition-all ${
              c === filter
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((c, i) => (
            <motion.div
              key={c.n}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ delay: i * 0.03, duration: 0.25, ease: EASE }}
              whileHover={{ y: -3 }}
              className="rounded-[12px] border border-border bg-card p-3 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-start justify-between">
                <div className="text-[11px] font-medium text-foreground">{c.n}</div>
                <LayoutGrid className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="mt-2 text-[10px] tabular-nums text-muted-foreground">
                {c.c} resources
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                <TrendingUp className="h-2 w-2" /> Trending
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------- 4. Study analyzer ------------- */
function StudySlide({ active }: { active: boolean }) {
  const score = useCount(87, active);
  const consistency = useCount(93, active);
  const hoursActive = useCount(42, active);
  const bars = [0.4, 0.65, 0.55, 0.8, 0.7, 0.92, 0.6];
  return (
    <div className="grid h-full grid-cols-12 gap-3 overflow-auto p-5">
      <div className="col-span-12 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Study analyzer
          </div>
          <div className="text-base font-semibold text-foreground">Weekly report</div>
        </div>
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
          Sep 15 – Sep 21
        </span>
      </div>

      <Panel className="col-span-4">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Study score
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-semibold tabular-nums text-foreground">{score}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: EASE }}
            className="h-full bg-accent"
          />
        </div>
      </Panel>
      <Panel className="col-span-4">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Consistency
        </div>
        <div className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
          {consistency}%
        </div>
      </Panel>
      <Panel className="col-span-4">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Active time
        </div>
        <div className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
          {hoursActive}h
        </div>
      </Panel>

      <Panel className="col-span-7">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[11px] font-medium text-foreground">Weekly focus</div>
          <div className="text-[10px] text-muted-foreground">hrs / day</div>
        </div>
        <div className="flex h-24 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h * 100}%` }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: EASE }}
              className="flex-1 rounded-t-sm bg-accent/70"
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
      </Panel>

      <Panel className="col-span-5">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-foreground">
          <Calendar className="h-3 w-3" /> Heatmap
        </div>
        <div
          className="grid grid-cols-14 gap-1"
          style={{ gridTemplateColumns: "repeat(14, minmax(0,1fr))" }}
        >
          {Array.from({ length: 14 * 5 }).map((_, i) => {
            const v = (Math.sin(i * 1.37) + 1) / 2;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i % 14) * 0.015 + 0.1, duration: 0.25 }}
                className="aspect-square rounded-[2px]"
                style={{
                  backgroundColor: `color-mix(in oklch, var(--accent) ${Math.round(v * 90 + 10)}%, transparent)`,
                }}
              />
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

/* ------------- 5. Docs multilingual ------------- */
function DocsSlide() {
  const [lang, setLang] = useState("ES");
  const langs = ["EN", "ES", "JA", "FR", "DE"];
  const translations: Record<string, { title: string; body: string }> = {
    EN: {
      title: "Realtime sync",
      body: "Channels multiplex over a single websocket. Subscribers reconcile missed events on reconnect.",
    },
    ES: {
      title: "Sincronización en tiempo real",
      body: "Los canales se multiplexan sobre un único websocket. Los suscriptores reconcilian eventos perdidos al reconectarse.",
    },
    JA: {
      title: "リアルタイム同期",
      body: "チャンネルは単一の WebSocket で多重化されます。購読者は再接続時に失われたイベントを調整します。",
    },
    FR: {
      title: "Synchronisation en temps réel",
      body: "Les canaux sont multiplexés sur un seul websocket. Les abonnés réconcilient les événements manqués à la reconnexion.",
    },
    DE: {
      title: "Echtzeit-Synchronisation",
      body: "Kanäle werden über einen einzigen Websocket gemultiplext. Abonnenten gleichen verpasste Ereignisse beim Wiederverbinden ab.",
    },
  };
  const t = translations[lang];
  return (
    <div className="flex h-full flex-col overflow-hidden p-5">
      <div className="mb-3 flex items-center gap-2">
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`relative rounded px-2 py-1 text-[10px] font-medium transition-colors ${l === lang ? "text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              {l === lang && (
                <motion.span
                  layoutId="lang-pill"
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute inset-0 rounded bg-foreground"
                />
              )}
              <span className="relative">{l}</span>
            </button>
          ))}
        </div>
        <span className="ml-auto text-[10px] text-muted-foreground">AI-translated</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3 overflow-hidden">
        <Panel className="flex flex-col overflow-hidden">
          <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            Original · EN
          </div>
          <div className="text-sm font-semibold text-foreground">Realtime sync</div>
          <div className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            Channels multiplex over a single websocket. Subscribers reconcile missed events on
            reconnect.
          </div>
          <pre className="mt-2 overflow-x-auto rounded bg-muted/60 p-2 text-[10px] text-foreground/80">
            <code>{`sync.channel("ws:42")
  .on("update", handle);`}</code>
          </pre>
        </Panel>
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Panel className="flex flex-col overflow-hidden">
              <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                Translated · {lang}
              </div>
              <div className="text-sm font-semibold text-foreground">{t.title}</div>
              <div className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {t.body}
              </div>
              <pre className="mt-2 overflow-x-auto rounded bg-muted/60 p-2 text-[10px] text-foreground/80">
                <code>{`sync.channel("ws:42")
  .on("update", handle);`}</code>
              </pre>
            </Panel>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------- 6. Glassboard ------------- */
function GlassboardSlide() {
  const notes = [
    { x: 6, y: 12, c: "bg-[oklch(0.94_0.08_85)] text-[oklch(0.3_0.05_85)]", t: "Client → /api" },
    {
      x: 42,
      y: 22,
      c: "bg-[oklch(0.92_0.08_180)] text-[oklch(0.3_0.05_200)]",
      t: "Edge gateway auth",
    },
    {
      x: 72,
      y: 14,
      c: "bg-[oklch(0.93_0.08_320)] text-[oklch(0.3_0.05_320)]",
      t: "Fan-out workers",
    },
    {
      x: 18,
      y: 62,
      c: "bg-[oklch(0.93_0.08_140)] text-[oklch(0.3_0.05_140)]",
      t: "Postgres primary",
    },
    { x: 62, y: 65, c: "bg-[oklch(0.94_0.09_60)] text-[oklch(0.3_0.05_60)]", t: "Redis cache" },
  ];
  return (
    <div className="flex h-full flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Glassboard
          </div>
          <div className="text-sm font-semibold text-foreground">Realtime pipeline — v0.3</div>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-1">
          {[PenTool, StickyNote, Plus, Share2].map((I, i) => (
            <button
              key={i}
              className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <I className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>
      <div
        className="relative flex-1 overflow-hidden rounded-[12px] border border-border"
      >
        <svg
          className="absolute inset-0 h-full w-full text-muted-foreground/60"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[
            ["16", "18", "46", "28"],
            ["56", "28", "76", "20"],
            ["50", "32", "28", "64"],
            ["52", "32", "66", "66"],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: EASE }}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.3"
              strokeDasharray="1 1"
            />
          ))}
        </svg>
        {notes.map((n, i) => (
          <motion.div
            key={n.t}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.35, ease: EASE }}
            whileHover={{ y: -3 }}
            className={`absolute w-[125px] rounded-md p-2 text-[10px] font-medium leading-snug shadow-sm ${n.c}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------- 7. DSA Tracker ------------- */
function DsaSlide({ active }: { active: boolean }) {
  const solved = useCount(214, active);
  const pct = 42;
  const problems = [
    { n: "Two Sum", d: "Easy", ok: true },
    { n: "LRU Cache", d: "Medium", ok: true },
    { n: "Word Ladder", d: "Hard", ok: false },
    { n: "Meeting Rooms II", d: "Medium", ok: true },
    { n: "Trapping Rain Water", d: "Hard", ok: false },
    { n: "Binary Tree Zigzag", d: "Medium", ok: true },
  ];
  const diffColor = (d: string) =>
    d === "Easy"
      ? "text-[var(--success)]"
      : d === "Medium"
        ? "text-[var(--warning)]"
        : "text-destructive";
  return (
    <div className="grid h-full grid-cols-12 gap-3 overflow-auto p-5">
      <Panel className="col-span-5 flex flex-col items-center justify-center">
        <div className="relative h-24 w-24">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="var(--color-border)"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              stroke="var(--accent)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - pct / 100) }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-lg font-semibold tabular-nums text-foreground">{solved}</div>
            <div className="text-[9px] text-muted-foreground">solved</div>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-muted-foreground">of 512 tracked</div>
      </Panel>
      <Panel className="col-span-7">
        <div className="mb-2 flex items-center gap-1">
          {["All", "Easy", "Medium", "Hard"].map((c, i) => (
            <button
              key={c}
              className={`rounded-full border px-2 py-0.5 text-[10px] ${i === 0 ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
            <Search className="h-2.5 w-2.5" /> problems
          </div>
        </div>
        <div className="divide-y divide-border">
          {problems.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.25, ease: EASE }}
              className="flex items-center justify-between py-1.5 text-[11px]"
            >
              <div className="flex items-center gap-2">
                <CheckSquare
                  className={`h-3 w-3 ${p.ok ? "text-[var(--success)]" : "text-muted-foreground/40"}`}
                />
                <span className={p.ok ? "text-foreground" : "text-muted-foreground"}>{p.n}</span>
              </div>
              <span className={`text-[10px] font-medium ${diffColor(p.d)}`}>{p.d}</span>
            </motion.div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ------------- 8. AI Voice ------------- */
function VoiceSlide() {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Voice assistant
          </div>
          <div className="text-sm font-semibold text-foreground">Listening…</div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-1 text-[10px]">
          <Sparkles className="h-2.5 w-2.5 text-accent" /> gpt-voice-4o
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 py-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-lg">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
          <Mic className="relative h-5 w-5" />
        </div>
        <div className="ml-4 flex h-10 items-end gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="w-[3px] origin-bottom rounded-full bg-accent/70 animate-wave"
              style={{ animationDelay: `${(i % 8) * 0.08}s`, height: `${20 + (i % 6) * 6}%` }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm border border-border bg-muted/60 px-3 py-2 text-[11px] text-foreground"
        >
          "Explain the useEffect cleanup pattern"
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3, ease: EASE }}
          className="max-w-[85%] space-y-2 rounded-2xl rounded-tl-sm border border-border bg-card px-3 py-2 text-[11px] text-foreground/90"
        >
          <div>
            Return a function from your effect. React invokes it on unmount to clean up
            subscriptions.
          </div>
          <pre className="overflow-x-auto rounded bg-muted/60 p-2 text-[10px] text-foreground/85">
            <code>{`useEffect(() => {
  const s = socket.subscribe();
  return () => s.unsubscribe();
}, []);`}</code>
          </pre>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
        >
          <span className="inline-flex gap-0.5">
            <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground" />
            <span
              className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground"
              style={{ animationDelay: "0.3s" }}
            />
          </span>
          thinking
        </motion.div>
      </div>
    </div>
  );
}

/* --------- registry --------- */
const SLIDES: Slide[] = [
  {
    id: "dashboard",
    category: "Developer Dashboard",
    title: "Your entire workspace, at a glance.",
    description:
      "Sticky notes, bookmarks, recent documents, and progress widgets — all synced to a single home screen.",
    bullets: [
      "Persistent sticky notes across devices",
      "Bookmarks with smart categorization",
      "Weekly progress and streak tracking",
    ],
    cta: "Open dashboard",
    render: (a) => <DashboardSlide active={a} />,
  },
  {
    id: "debug",
    category: "Collaborative Debugging",
    title: "Debug together, in one thread.",
    description:
      "Shared bug threads with hypotheses, stack traces, and accepted solutions. No more scattered Slack messages.",
    bullets: [
      "Hypothesis tracking with @mentions",
      "Live stack trace and repro logs",
      "One-click accepted solutions",
    ],
    cta: "Open debug space",
    render: () => <DebugSlide />,
  },
  {
    id: "resources",
    category: "Website Grid",
    title: "Every resource, one search away.",
    description:
      "Frontend, backend, DevOps, AI, cloud, security — curated and filterable in a single grid.",
    bullets: [
      "Filter by category with instant chips",
      "Full-text search across 731+ resources",
      "Trending signals from the community",
    ],
    cta: "Browse resources",
    render: () => <ResourcesSlide />,
  },
  {
    id: "study",
    category: "Study Behaviour Analyzer",
    title: "Understand how you learn.",
    description:
      "Charts, heatmaps, and consistency scores turn hours of practice into a clear signal.",
    bullets: [
      "Study score with weekly breakdown",
      "Consistency and active-time metrics",
      "GitHub-style contribution heatmap",
    ],
    cta: "See your report",
    render: (a) => <StudySlide active={a} />,
  },
  {
    id: "docs",
    category: "Multilingual Docs",
    title: "Read documentation in your language.",
    description:
      "AI-translated docs with side-by-side view. Code snippets stay identical — only prose translates.",
    bullets: [
      "12+ supported languages",
      "Side-by-side original + translated",
      "Code blocks preserved verbatim",
    ],
    cta: "Open docs",
    render: () => <DocsSlide />,
  },
  {
    id: "canvas",
    category: "Glassboard",
    title: "Diagram anything, together.",
    description:
      "A floating whiteboard with sticky notes, arrows, and realtime multiplayer cursors.",
    bullets: [
      "Sticky notes and flowchart arrows",
      "Sketching + realtime collaboration",
      "Floating toolbar and infinite canvas",
    ],
    cta: "Open glassboard",
    render: () => <GlassboardSlide />,
  },
  {
    id: "dsa",
    category: "DSA Tracker",
    title: "Practice with intent.",
    description:
      "LeetCode-style problem grid with difficulty, completion, and a progress ring you'll actually watch.",
    bullets: [
      "Filter by Easy / Medium / Hard",
      "Completion streaks and totals",
      "Search across 512 tracked problems",
    ],
    cta: "Start practicing",
    render: (a) => <DsaSlide active={a} />,
  },
  {
    id: "voice",
    category: "AI Voice Assistant",
    title: "Ask, out loud.",
    description:
      "Push-to-talk voice with animated waveform, thinking indicator, and code responses inline.",
    bullets: [
      "Sub-second speech recognition",
      "Streaming code + prose replies",
      "Hands-free — never leave your editor",
    ],
    cta: "Try voice",
    render: () => <VoiceSlide />,
  },
];
