import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Bookmark,
  StickyNote,
  MessageSquare,
  GitBranch,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Globe,
  PenTool,
  Plus,
  Share2,
  CheckSquare,
  Mic,
  Sparkles,
  Bug,
  Languages,
  LayoutDashboard,
  LayoutGrid,
  MoreHorizontal,
  Wifi,
} from "lucide-react";

/* Brand: Blue #0b2fd1 · Lime #c6ff00 (blue flips to lime on dark backgrounds) */
const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 7000;
const STORAGE_KEY = "dolp:hero-slide";
const CTA_HREF = "#"; // swap for a real page later
const FILL = "bg-[#0b2fd1] dark:bg-[#c6ff00]";
const INK = "text-[#0b2fd1] dark:text-[#c6ff00]";
const ON_FILL = "text-white dark:text-[#0b2fd1]";

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

  // load / persist slide
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw != null) {
        const n = parseInt(raw, 10);
        if (!Number.isNaN(n) && n >= 0 && n < SLIDES.length) setIndex(n);
      }
    } catch {
      // ignore
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(index));
    } catch {
      // ignore
    }
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
      if (!rootRef.current?.contains(document.activeElement)) return;
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

  // horizontal wheel + swipe (vertical wheel is left alone so the page scrolls normally)
  const wheelLock = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < 30 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    const now = performance.now();
    if (now - wheelLock.current < 500) return;
    wheelLock.current = now;
    if (e.deltaX > 0) next();
    else prev();
  };
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const resume = useRef(0);
  useEffect(() => () => window.clearTimeout(resume.current), []);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    window.clearTimeout(resume.current);
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    resume.current = window.setTimeout(() => setPaused(false), 8000);
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
  };

  const slide = SLIDES[index];
  const arrowBtn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground text-foreground transition-all hover:-translate-y-0.5 hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b2fd1]";

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
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-14">
        {/* LEFT — text */}
        <div className="flex min-w-0 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + ":text"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-5"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#c6ff00] px-3 py-1 text-[11px] font-bold text-[#0b2fd1]">
                <span className="font-wide text-[10px]">
                  {String(index + 1).padStart(2, "0")}/{String(SLIDES.length).padStart(2, "0")}
                </span>
                {slide.category}
              </span>
              <h2 className="font-wide break-words text-[clamp(1.6rem,3.4vw,2.7rem)] leading-[0.98]">
                {slide.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {slide.description}
              </p>
              <ul className="space-y-2.5 pt-1">
                {slide.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm font-medium">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c6ff00] text-[#0b2fd1]">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={CTA_HREF}
                  className={`group inline-flex items-center gap-2 rounded-full ${FILL} ${ON_FILL} py-2.5 pl-6 pr-2.5 text-sm font-extrabold shadow-[0_6px_0_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none`}
                >
                  {slide.cta}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c6ff00] text-[#0b2fd1] dark:bg-[#0b2fd1] dark:text-[#c6ff00]">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
                <button onClick={prev} aria-label="Previous slide" className={arrowBtn}>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={next} aria-label="Next slide" className={arrowBtn}>
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
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? `w-10 ${FILL}` : "w-4 bg-border hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — mock window */}
        <div className="min-w-0">
          <MockWindow
            title={`dolpstack.app — ${slide.category}`}
            category={slide.category}
            slideId={slide.id}
            onSelect={(id) => {
              const i = SLIDES.findIndex((x) => x.id === id);
              if (i >= 0) setIndex(i);
            }}
          >
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

/* -------------------------- device frames ---------------------------- */

type Device = "phone" | "tablet" | "desktop";

function subscribeDevice(cb: () => void) {
  const qs = [window.matchMedia("(min-width:640px)"), window.matchMedia("(min-width:1024px)")];
  qs.forEach((q) => q.addEventListener("change", cb));
  return () => qs.forEach((q) => q.removeEventListener("change", cb));
}
function deviceSnapshot(): Device {
  if (window.matchMedia("(min-width:1024px)").matches) return "desktop";
  if (window.matchMedia("(min-width:640px)").matches) return "tablet";
  return "phone";
}
/** Only ONE frame is mounted at a time, so slide state and animations never run in hidden copies. */
function useDevice(): Device {
  return useSyncExternalStore(subscribeDevice, deviceSnapshot, () => "desktop" as Device);
}

/** Phone tab bar groups. Tapping a tab jumps to the first slide in its group. */
const TABS = [
  { label: "Home", icon: LayoutDashboard, ids: ["dashboard", "study"] },
  { label: "Debug", icon: Bug, ids: ["debug"] },
  { label: "Resources", icon: LayoutGrid, ids: ["resources"] },
  { label: "Docs", icon: Languages, ids: ["docs"] },
  { label: "More", icon: MoreHorizontal, ids: ["canvas", "dsa", "voice"] },
];

type FrameProps = {
  title: string;
  category: string;
  slideId: string;
  onSelect: (id: string) => void;
  children: React.ReactNode;
};

function StatusIcons({ tablet = false }: { tablet?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      {tablet ? (
        <>
          <Wifi className="h-3.5 w-3.5" />
          <span className="text-[10px]">100%</span>
        </>
      ) : (
        <>
          <span className="flex items-end gap-[2px]">
            {[4, 6, 8, 10].map((h) => (
              <span key={h} className="w-[3px] rounded-[1px] bg-foreground" style={{ height: h }} />
            ))}
          </span>
          <span className="text-[10px] font-bold">5G</span>
        </>
      )}
      <span className="relative flex h-[11px] w-[22px] items-center rounded-[4px] border border-foreground/50 p-[1.5px]">
        <span className="h-full w-[82%] rounded-[2px] bg-foreground" />
        <span className="absolute -right-[3px] h-[4px] w-[1.5px] rounded-r bg-foreground/50" />
      </span>
    </span>
  );
}

function Glare() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"
    />
  );
}

function PhoneFrame({ category, slideId, onSelect, children }: FrameProps) {
  const btn = "absolute w-[3px] bg-slate-400 dark:bg-zinc-600";
  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      {/* hardware buttons: action, volume up/down, power, camera control */}
      <span className={`${btn} -left-[3px] top-[86px] h-6 rounded-l`} />
      <span className={`${btn} -left-[3px] top-[132px] h-10 rounded-l`} />
      <span className={`${btn} -left-[3px] top-[184px] h-10 rounded-l`} />
      <span className={`${btn} -right-[3px] top-[150px] h-16 rounded-r`} />
      <span className={`${btn} -right-[3px] top-[400px] h-12 rounded-r opacity-70`} />

      <div className="rounded-[58px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 p-[3px] shadow-[8px_8px_0_#c6ff00,0_30px_60px_-20px_rgba(0,0,0,0.5)] dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800">
        <div className="rounded-[55px] bg-black p-[6px]">
          <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[49px] bg-background text-foreground">
            {/* dynamic island */}
            <div className="absolute left-1/2 top-[10px] z-30 flex h-[28px] w-[96px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3">
              <span className="h-2 w-2 rounded-full bg-[#0a1230] ring-1 ring-slate-800" />
            </div>

            {/* status bar */}
            <div className="relative z-20 flex h-[50px] shrink-0 items-end justify-between px-7 pb-1.5 text-[13px] font-semibold tabular-nums">
              <span>9:41</span>
              <StatusIcons />
            </div>

            {/* app nav bar */}
            <div className="flex shrink-0 items-center justify-between gap-2 px-4 pb-2.5 pt-1">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-muted-foreground">dolpstack.app</div>
                <div className="truncate text-[17px] font-extrabold leading-tight tracking-tight">
                  {category}
                </div>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c6ff00] text-[11px] font-black text-[#0b2fd1]">
                AL
              </span>
            </div>

            {/* slide content: container queries let the slide adapt to THIS screen width */}
            <div className="min-h-0 flex-1 border-y border-border/60 bg-muted/20">
              <div className="@container h-full">{children}</div>
            </div>

            {/* tab bar */}
            <nav className="grid shrink-0 grid-cols-5 bg-card/95 px-2 pb-1 pt-1.5 backdrop-blur">
              {TABS.map((t) => {
                const on = t.ids.includes(slideId);
                return (
                  <button
                    key={t.label}
                    onClick={() => onSelect(t.ids[0])}
                    aria-label={t.label}
                    aria-current={on}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <span
                      className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${
                        on ? `${FILL} ${ON_FILL}` : "text-muted-foreground"
                      }`}
                    >
                      <t.icon className="h-4 w-4" />
                    </span>
                    <span className={`text-[9px] font-semibold ${on ? "" : "text-muted-foreground"}`}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </nav>
            <div className="flex shrink-0 justify-center bg-card pb-2 pt-1">
              <span className="h-1 w-32 rounded-full bg-foreground/80" />
            </div>
            <Glare />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletFrame({ category, slideId, onSelect, children }: FrameProps) {
  const edge = "absolute -top-[3px] h-[3px] rounded-t bg-slate-400 dark:bg-zinc-600";
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <span className={`${edge} right-24 w-12`} />
      <span className={`${edge} right-44 w-8`} />
      <span className={`${edge} right-[13.5rem] w-8`} />
      <div className="rounded-[40px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 p-[3px] shadow-[8px_8px_0_#c6ff00,0_30px_60px_-20px_rgba(0,0,0,0.5)] dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800">
        <div className="relative rounded-[37px] bg-black p-[13px]">
          <span className="absolute left-1/2 top-[5px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#0a1230] ring-1 ring-slate-700" />
          <div className="relative flex h-[480px] flex-col overflow-hidden rounded-[25px] bg-background text-foreground">
            <div className="flex shrink-0 items-center justify-between px-6 py-1.5 text-[11px] font-semibold tabular-nums">
              <span>9:41 AM &nbsp; Sat 24 Oct</span>
              <StatusIcons tablet />
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 pb-2.5 pt-1">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-muted-foreground">dolpstack.app</div>
                <div className="truncate text-base font-extrabold leading-tight">{category}</div>
              </div>
              <nav className="flex shrink-0 gap-1">
                {TABS.map((t) => {
                  const on = t.ids.includes(slideId);
                  return (
                    <button
                      key={t.label}
                      onClick={() => onSelect(t.ids[0])}
                      aria-current={on}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
                        on ? `${FILL} ${ON_FILL}` : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="min-h-0 flex-1 bg-muted/20">
              <div className="@container h-full">{children}</div>
            </div>
            <div className="flex shrink-0 justify-center bg-background pb-1.5 pt-1">
              <span className="h-1 w-36 rounded-full bg-foreground/70" />
            </div>
            <Glare />
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopFrame({ title, children }: Pick<FrameProps, "title" | "children">) {
  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-[#0b2fd1] bg-card shadow-[10px_10px_0_#c6ff00] dark:border-[#c6ff00]/60">
      <div className="flex items-center gap-2 bg-[#0b2fd1] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c6ff00]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        </div>
        <div className="ml-3 truncate text-[11px] text-white/80">{title}</div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c6ff00]" /> Live
        </div>
      </div>
      <div className="h-[480px] overflow-hidden bg-background">
        <div className="@container h-full">{children}</div>
      </div>
      <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-1.5 text-[10px] text-muted-foreground">
        <span>workspace / main</span>
        <span className="tabular-nums">v4.2.1 · synced</span>
      </div>
    </div>
  );
}

function MockWindow(props: FrameProps) {
  const device = useDevice();
  if (device === "phone") return <PhoneFrame {...props} />;
  if (device === "tablet") return <TabletFrame {...props} />;
  return <DesktopFrame title={props.title}>{props.children}</DesktopFrame>;
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
      className={`rounded-[16px] border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-[#0b2fd1]/50 dark:hover:border-[#c6ff00]/50 ${className}`}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="truncate text-[10px] font-semibold text-muted-foreground">{children}</div>;
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all ${
        active
          ? `border-transparent ${FILL} ${ON_FILL}`
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </span>
  );
}

/* ------------- 1. Dashboard ------------- */
function DashboardSlide({ active }: { active: boolean }) {
  const notes = useCount(12, active);
  const bookmarks = useCount(48, active);
  const streak = useCount(23, active);
  return (
    <div className="grid h-full grid-cols-12 content-start gap-3 overflow-auto p-3.5 @lg:p-5">
      <div className="col-span-12 flex items-center justify-between">
        <div>
          <Label>Home</Label>
          <div className="text-base font-extrabold">Good afternoon, Alex</div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-[#c6ff00] px-3 py-1.5 text-[11px] font-bold text-[#0b2fd1] transition-transform hover:-translate-y-0.5">
          <Plus className="h-3 w-3" /> Quick add
        </button>
      </div>
      {[
        ["Sticky notes", notes],
        ["Bookmarks", bookmarks],
        ["Day streak", streak],
      ].map(([l, v]) => (
        <Panel key={l} className="col-span-4">
          <Label>{l}</Label>
          <div className={`font-wide mt-1 text-2xl tabular-nums ${INK}`}>{v}</div>
        </Panel>
      ))}

      <Panel className="col-span-12 @lg:col-span-7">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold">
          <StickyNote className="h-3 w-3" /> Sticky notes
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { c: "bg-[oklch(0.94_0.08_85)] text-[oklch(0.3_0.05_85)]", t: "Refactor auth store", s: "Personal" },
            { c: "bg-[oklch(0.92_0.08_180)] text-[oklch(0.3_0.05_200)]", t: "Ship voice beta by Fri", s: "Work" },
            { c: "bg-[oklch(0.93_0.08_320)] text-[oklch(0.3_0.05_320)]", t: "Read TanStack RFC", s: "Learning" },
            { c: "bg-[oklch(0.93_0.08_140)] text-[oklch(0.3_0.05_140)]", t: "Pair on realtime sync", s: "Team" },
          ].map((n, i) => (
            <motion.div
              key={n.t}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3, ease: EASE }}
              className={`rounded-xl p-2.5 text-[11px] leading-snug shadow-sm ${n.c}`}
            >
              <div className="font-semibold">{n.t}</div>
              <div className="mt-1 text-[9px] opacity-70">{n.s}</div>
            </motion.div>
          ))}
        </div>
      </Panel>

      <Panel className="col-span-12 @lg:col-span-5">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold">
          <Bookmark className="h-3 w-3" /> Recent bookmarks
        </div>
        <ul className="space-y-1.5 text-[11px]">
          {["tanstack.com/router", "supabase.com/auth", "vercel.com/edge", "react.dev/suspense"].map(
            (r, i) => (
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
            ),
          )}
        </ul>
      </Panel>

      <Panel className="col-span-12">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[11px] font-bold">Weekly progress</div>
          <div className="text-[10px] text-muted-foreground">87% goal</div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "87%" }}
            transition={{ duration: 1.1, ease: EASE }}
            className={`h-full rounded-full ${FILL}`}
          />
        </div>
      </Panel>
    </div>
  );
}

/* ------------- 2. Debug ------------- */
function DebugSlide() {
  const bugs = [
    { id: "BUG-482", t: "Memory leak in Dashboard", s: "Open", u: "amelia", m: 12, on: true },
    { id: "BUG-471", t: "JWT refresh loop on expiry", s: "In review", u: "kenji", m: 8, on: false },
    { id: "BUG-465", t: "Docker build failing arm64", s: "Resolved", u: "priya", m: 5, on: false },
  ];
  return (
    <div className="grid h-full grid-cols-1 content-start gap-3 overflow-auto p-3.5 @lg:grid-cols-[1fr_1.2fr] @lg:p-5">
      <div className="space-y-2">
        <div className="text-[11px] font-bold">Active bugs</div>
        {bugs.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3, ease: EASE }}
            className={`rounded-2xl border p-3 text-[11px] transition-all hover:-translate-y-0.5 ${
              b.on ? "border-[#0b2fd1] bg-[#0b2fd1]/5 dark:border-[#c6ff00]" : "border-border bg-card"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{b.id}</span>
              <span
                className={`rounded-full border px-1.5 py-0.5 ${
                  b.s === "Resolved"
                    ? "border-[var(--success)]/40 text-[var(--success)]"
                    : b.s === "In review"
                      ? "border-[var(--warning)]/40 text-[var(--warning)]"
                      : "border-border"
                }`}
              >
                {b.s}
              </span>
            </div>
            <div className="mt-1 font-semibold">{b.t}</div>
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
        <Label>BUG-482</Label>
        <div className="mt-0.5 text-sm font-extrabold">Memory leak in Dashboard</div>
        <div className="mt-3 space-y-2 text-[11px]">
          <Label>Thread</Label>
          <div className="space-y-1.5">
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
                <div className="h-5 w-5 shrink-0 rounded-full bg-[#c6ff00] text-center text-[9px] font-bold uppercase leading-5 text-[#0b2fd1]">
                  {r.u[0]}
                </div>
                <div className="text-muted-foreground">
                  <span className="font-semibold text-foreground">@{r.u}</span> {r.t}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/5 px-2.5 py-2 text-[var(--success)]">
            <CheckCircle2 className="h-3 w-3" /> Accepted: return cleanup from effect
          </div>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-muted/60 p-2.5 text-[10px] leading-relaxed text-foreground/80">
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
    <div className="h-full space-y-3 overflow-auto p-3.5 @lg:p-5">
      <div className="flex items-center gap-2 rounded-full border-2 border-[#0b2fd1] bg-background px-4 py-2 dark:border-[#c6ff00]/60">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[11px] text-muted-foreground">Search 731 curated resources…</span>
        <span className="ml-1 inline-block h-3 w-[1px] animate-caret bg-foreground" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <button key={c} onClick={() => setFilter(c)}>
            <Chip active={c === filter}>{c}</Chip>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 @lg:grid-cols-4">
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
              className="rounded-2xl border border-border bg-card p-3 transition-colors hover:border-[#0b2fd1]/50 dark:hover:border-[#c6ff00]/50"
            >
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold">{c.n}</div>
                  <div className="mt-1 text-[10px] tabular-nums text-muted-foreground">
                    {c.c} resources
                  </div>
                </div>
                <div className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#c6ff00] px-1.5 py-0.5 text-[9px] font-bold text-[#0b2fd1]">
                  <TrendingUp className="h-2 w-2" /> Trending
                </div>
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
    <div className="grid h-full grid-cols-12 content-start gap-3 overflow-auto p-3.5 @lg:p-5">
      <div className="col-span-12 flex items-center justify-between">
        <div>
          <Label>Study analyzer</Label>
          <div className="text-base font-extrabold">Weekly report</div>
        </div>
        <span className="rounded-full bg-[#c6ff00] px-2.5 py-1 text-[10px] font-bold text-[#0b2fd1]">
          Sep 15 – Sep 21
        </span>
      </div>

      <Panel className="col-span-12 @sm:col-span-4">
        <Label>Study score</Label>
        <div className="mt-1 flex items-baseline gap-1">
          <span className={`font-wide text-2xl tabular-nums ${INK}`}>{score}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: EASE }}
            className={`h-full ${FILL}`}
          />
        </div>
      </Panel>
      <Panel className="col-span-12 @sm:col-span-4">
        <Label>Consistency</Label>
        <div className={`font-wide mt-1 text-2xl tabular-nums ${INK}`}>{consistency}%</div>
      </Panel>
      <Panel className="col-span-12 @sm:col-span-4">
        <Label>Active time</Label>
        <div className={`font-wide mt-1 text-2xl tabular-nums ${INK}`}>{hoursActive}h</div>
      </Panel>

      <Panel className="col-span-12 @lg:col-span-7">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[11px] font-bold">Weekly focus</div>
          <div className="text-[10px] text-muted-foreground">hrs / day</div>
        </div>
        <div className="flex h-24 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h * 100}%` }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: EASE }}
              className={`flex-1 rounded-t-md ${FILL} ${i === 5 ? "" : "opacity-70"}`}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
      </Panel>

      <Panel className="col-span-12 @lg:col-span-5">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold">
          <Calendar className="h-3 w-3" /> Heatmap
        </div>
        <div
          className="grid gap-1 [--hm:#0b2fd1] dark:[--hm:#c6ff00]"
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
                className="aspect-square rounded-[3px]"
                style={{
                  backgroundColor: `color-mix(in oklch, var(--hm) ${Math.round(v * 90 + 10)}%, transparent)`,
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
    EN: { title: "Realtime sync", body: "Channels multiplex over a single websocket. Subscribers reconcile missed events on reconnect." },
    ES: { title: "Sincronización en tiempo real", body: "Los canales se multiplexan sobre un único websocket. Los suscriptores reconcilian eventos perdidos al reconectarse." },
    JA: { title: "リアルタイム同期", body: "チャンネルは単一の WebSocket で多重化されます。購読者は再接続時に失われたイベントを調整します。" },
    FR: { title: "Synchronisation en temps réel", body: "Les canaux sont multiplexés sur un seul websocket. Les abonnés réconcilient les événements manqués à la reconnexion." },
    DE: { title: "Echtzeit-Synchronisation", body: "Kanäle werden über einen einzigen Websocket gemultiplext. Abonnenten gleichen verpasste Ereignisse beim Wiederverbinden ab." },
  };
  const t = translations[lang];
  const code = `sync.channel("ws:42")
  .on("update", handle);`;
  return (
    <div className="flex h-full flex-col overflow-auto p-3.5 @lg:p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`relative rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors ${
                l === lang ? ON_FILL : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l === lang && (
                <motion.span
                  layoutId="lang-pill"
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`absolute inset-0 rounded-full ${FILL}`}
                />
              )}
              <span className="relative">{l}</span>
            </button>
          ))}
        </div>
        <span className="ml-auto rounded-full bg-[#c6ff00] px-2 py-0.5 text-[10px] font-bold text-[#0b2fd1]">
          AI-translated
        </span>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 @lg:grid-cols-2">
        <Panel className="flex flex-col overflow-hidden">
          <Label>Original · EN</Label>
          <div className="mt-1 text-sm font-extrabold">Realtime sync</div>
          <div className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            {translations.EN.body}
          </div>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-muted/60 p-2.5 text-[10px] text-foreground/80">
            <code>{code}</code>
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
            <Panel className="flex flex-col overflow-hidden !border-[#0b2fd1] dark:!border-[#c6ff00]">
              <Label>Translated · {lang}</Label>
              <div className="mt-1 text-sm font-extrabold">{t.title}</div>
              <div className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{t.body}</div>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-muted/60 p-2.5 text-[10px] text-foreground/80">
                <code>{code}</code>
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
    { x: 6, y: 10, c: "bg-[oklch(0.94_0.08_85)] text-[oklch(0.3_0.05_85)]", t: "Client → /api" },
    { x: 36, y: 30, c: "bg-[oklch(0.92_0.08_180)] text-[oklch(0.3_0.05_200)]", t: "Edge gateway auth" },
    { x: 66, y: 10, c: "bg-[oklch(0.93_0.08_320)] text-[oklch(0.3_0.05_320)]", t: "Fan-out workers" },
    { x: 12, y: 62, c: "bg-[oklch(0.93_0.08_140)] text-[oklch(0.3_0.05_140)]", t: "Postgres primary" },
    { x: 54, y: 64, c: "bg-[oklch(0.94_0.09_60)] text-[oklch(0.3_0.05_60)]", t: "Redis cache" },
  ];
  const lines = [
    ["20", "17", "50", "37"],
    ["50", "37", "80", "17"],
    ["50", "37", "26", "69"],
    ["50", "37", "68", "71"],
  ];
  return (
    <div className="flex h-full flex-col p-3.5 @lg:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <Label>Glassboard</Label>
          <div className="text-sm font-extrabold">Realtime pipeline — v0.3</div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
          {[PenTool, StickyNote, Plus, Share2].map((I, i) => (
            <button
              key={i}
              aria-label="Tool"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-[#c6ff00] hover:text-[#0b2fd1]"
            >
              <I className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-border">
        <svg
          className="absolute inset-0 h-full w-full text-[#0b2fd1]/50 dark:text-[#c6ff00]/50"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {lines.map(([x1, y1, x2, y2], i) => (
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
              strokeWidth="0.4"
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
            className={`absolute w-[28%] min-w-[88px] max-w-[140px] rounded-xl p-2.5 text-[10px] font-semibold leading-snug shadow-sm ${n.c}`}
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
  const C = 2 * Math.PI * 42;
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
    <div className="grid h-full grid-cols-12 content-start gap-3 overflow-auto p-3.5 @lg:p-5">
      <Panel className="col-span-12 flex flex-col items-center justify-center @lg:col-span-5">
        <div className="relative h-28 w-28">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" strokeWidth="9" fill="none" className="stroke-muted" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
              className="stroke-[#0b2fd1] dark:stroke-[#c6ff00]"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C * (1 - pct / 100) }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-wide text-xl tabular-nums">{solved}</div>
            <div className="text-[9px] text-muted-foreground">solved</div>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-muted-foreground">of 512 tracked</div>
      </Panel>
      <Panel className="col-span-12 @lg:col-span-7">
        <div className="mb-2 flex items-center gap-1">
          {["All", "Easy", "Medium", "Hard"].map((c, i) => (
            <Chip key={c} active={i === 0}>
              {c}
            </Chip>
          ))}
          <div className="ml-auto flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
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
                <span className={p.ok ? "font-medium" : "text-muted-foreground"}>{p.n}</span>
              </div>
              <span className={`text-[10px] font-bold ${diffColor(p.d)}`}>{p.d}</span>
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
    <div className="flex h-full flex-col p-3.5 @lg:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <Label>Voice assistant</Label>
          <div className="text-sm font-extrabold">Listening…</div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-[#c6ff00] px-2.5 py-1 text-[10px] font-bold text-[#0b2fd1]">
          <Sparkles className="h-2.5 w-2.5" /> gpt-voice-4o
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 py-4">
        <div
          className={`relative flex h-14 w-14 items-center justify-center rounded-full ${FILL} ${ON_FILL} shadow-lg`}
        >
          <span className={`absolute inset-0 animate-ping rounded-full ${FILL} opacity-40`} />
          <Mic className="relative h-5 w-5" />
        </div>
        <div className="ml-4 flex h-10 items-end gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={`w-[3px] origin-bottom animate-wave rounded-full ${FILL} opacity-70`}
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
          className={`ml-auto max-w-[80%] rounded-2xl rounded-tr-sm ${FILL} ${ON_FILL} px-3 py-2 text-[11px] font-medium`}
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
          <pre className="overflow-x-auto rounded-xl bg-muted/60 p-2.5 text-[10px] text-foreground/85">
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
            {[0, 0.15, 0.3].map((d) => (
              <span
                key={d}
                className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
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