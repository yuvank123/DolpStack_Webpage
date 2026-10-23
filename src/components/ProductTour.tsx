import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard,
  LayoutGrid,
  Bug,
  Languages,
  PenTool,
  Search,
  Bookmark,
  TrendingUp,
  Star,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  GitBranch,
  FileText,
  Globe,
  Plus,
  StickyNote,
  Share2,
  Rocket,
  Wifi,
} from "lucide-react";

/* Brand: Blue #0b2fd1 · Lime #c6ff00 (blue flips to lime on dark backgrounds) */
const EASE = [0.22, 1, 0.36, 1] as const;
const FILL = "bg-[#0b2fd1] dark:bg-[#c6ff00]";
const INK = "text-[#0b2fd1] dark:text-[#c6ff00]";
const ON_FILL = "text-white dark:text-[#0b2fd1]";

type TabId = "overview" | "resources" | "debug" | "docs" | "canvas";

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "resources", label: "Resources", icon: LayoutGrid },
  { id: "debug", label: "Debug", icon: Bug },
  { id: "docs", label: "Docs", icon: Languages },
  { id: "canvas", label: "Canvas", icon: PenTool },
];

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduce]);
  return value;
}

const pageVariants = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.18, ease: EASE } },
};
const staggerParent = { animate: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } };
const staggerChild = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={`min-w-0 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-[#0b2fd1]/50 dark:hover:border-[#c6ff00]/50 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="truncate text-[11px] font-semibold text-muted-foreground">{children}</div>;
}

/* ------------------------- device detection ------------------------- */
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
/** One frame mounted at a time, so state and animations never run in hidden copies. */
function useDevice(): Device {
  return useSyncExternalStore(subscribeDevice, deviceSnapshot, () => "desktop" as Device);
}

/* ------------------------------- frames ------------------------------- */

/** Renders the active page. The @container lets every page adapt to the width of ITS screen. */
function Screen({ active }: { active: TabId }) {
  return (
    <div className="@container min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="p-3.5 @lg:p-5 @3xl:p-6"
        >
          {active === "overview" && <OverviewPage />}
          {active === "resources" && <ResourcesPage />}
          {active === "debug" && <DebugPage />}
          {active === "docs" && <DocsPage />}
          {active === "canvas" && <CanvasPage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

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

type FrameProps = { active: TabId; setActive: (t: TabId) => void; label: string };

function PhoneFrame({ active, setActive, label }: FrameProps) {
  const btn = "absolute w-[3px] bg-slate-400 dark:bg-zinc-600";
  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      {/* action, volume up/down, power, camera control */}
      <span className={`${btn} -left-[3px] top-[86px] h-6 rounded-l`} />
      <span className={`${btn} -left-[3px] top-[132px] h-10 rounded-l`} />
      <span className={`${btn} -left-[3px] top-[184px] h-10 rounded-l`} />
      <span className={`${btn} -right-[3px] top-[150px] h-16 rounded-r`} />
      <span className={`${btn} -right-[3px] top-[400px] h-12 rounded-r opacity-70`} />

      <div className="rounded-[58px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 p-[3px] shadow-[8px_8px_0_#c6ff00,0_30px_60px_-20px_rgba(0,0,0,0.5)] dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800">
        <div className="rounded-[55px] bg-black p-[6px]">
          <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[49px] bg-background text-foreground">
            <div className="absolute left-1/2 top-[10px] z-30 flex h-[28px] w-[96px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3">
              <span className="h-2 w-2 rounded-full bg-[#0a1230] ring-1 ring-slate-800" />
            </div>

            <div className="relative z-20 flex h-[50px] shrink-0 items-end justify-between px-7 pb-1.5 text-[13px] font-semibold tabular-nums">
              <span>9:41</span>
              <StatusIcons />
            </div>

            <div className="flex shrink-0 items-center justify-between gap-2 px-4 pb-2.5 pt-1">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-muted-foreground">dolpstack.app</div>
                <div className="truncate text-[17px] font-extrabold leading-tight tracking-tight">
                  {label}
                </div>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c6ff00] text-[11px] font-black text-[#0b2fd1]">
                AL
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col border-y border-border/60 bg-muted/20">
              <Screen active={active} />
            </div>

            <nav className="grid shrink-0 grid-cols-5 bg-card/95 px-2 pb-1 pt-1.5 backdrop-blur">
              {TABS.map((t) => {
                const on = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    aria-current={on}
                    className="flex min-w-0 flex-col items-center gap-0.5"
                  >
                    <span
                      className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${
                        on ? `${FILL} ${ON_FILL}` : "text-muted-foreground"
                      }`}
                    >
                      <t.icon className="h-4 w-4" />
                    </span>
                    <span className={`truncate text-[9px] font-semibold ${on ? "" : "text-muted-foreground"}`}>
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

function TabletFrame({ active, setActive, label }: FrameProps) {
  const edge = "absolute -top-[3px] h-[3px] rounded-t bg-slate-400 dark:bg-zinc-600";
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <span className={`${edge} right-24 w-12`} />
      <span className={`${edge} right-44 w-8`} />
      <span className={`${edge} right-[13.5rem] w-8`} />
      <div className="rounded-[40px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 p-[3px] shadow-[8px_8px_0_#c6ff00,0_30px_60px_-20px_rgba(0,0,0,0.5)] dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800">
        <div className="relative rounded-[37px] bg-black p-[13px]">
          <span className="absolute left-1/2 top-[5px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#0a1230] ring-1 ring-slate-700" />
          <div className="relative flex h-[520px] flex-col overflow-hidden rounded-[25px] bg-background text-foreground">
            <div className="flex shrink-0 items-center justify-between px-6 py-1.5 text-[11px] font-semibold tabular-nums">
              <span>9:41 AM &nbsp; Sat 24 Oct</span>
              <StatusIcons tablet />
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 pb-2.5 pt-1">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-muted-foreground">dolpstack.app</div>
                <div className="truncate text-base font-extrabold leading-tight">{label}</div>
              </div>
              <nav className="flex shrink-0 gap-1">
                {TABS.map((t) => {
                  const on = t.id === active;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActive(t.id)}
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
            <div className="flex min-h-0 flex-1 flex-col bg-muted/20">
              <Screen active={active} />
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

function DesktopFrame({ active, setActive, label }: FrameProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-[#0b2fd1] bg-card shadow-[10px_10px_0_#c6ff00] dark:border-[#c6ff00]/60">
      <div className="flex items-center gap-2 bg-[#0b2fd1] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c6ff00]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        </div>
        <div className="ml-3 truncate text-[11px] text-white/80">dolpstack.app — {label}</div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c6ff00]" /> Live
        </div>
      </div>

      <div className="flex h-[540px]">
        <nav className="flex h-full w-56 shrink-0 flex-col border-r border-border bg-muted/30 p-3">
          <div className="mb-2 px-2 text-[11px] font-semibold text-muted-foreground">Workspace</div>
          {TABS.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  on ? ON_FILL : "text-muted-foreground hover:translate-x-1 hover:text-foreground"
                }`}
              >
                {on && (
                  <motion.div
                    layoutId="tour-active-bg"
                    className={`absolute inset-0 rounded-xl ${FILL}`}
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
                <t.icon className="relative h-4 w-4" />
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
          <div className="mt-auto rounded-2xl bg-[#c6ff00] p-3 text-[#0b2fd1]">
            <div className="text-[11px] font-semibold opacity-80">Workspace</div>
            <div className="mt-0.5 text-sm font-extrabold">Developer</div>
          </div>
        </nav>
        <div className="flex min-w-0 flex-1 flex-col bg-background">
          <Screen active={active} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ main export ------------------------------ */
export function ProductTour() {
  const [active, setActive] = useState<TabId>("overview");
  const device = useDevice();
  const label = TABS.find((t) => t.id === active)?.label ?? "Overview";
  const props = { active, setActive, label };

  return (
    <div className="mx-auto w-full">
      {device === "phone" && <PhoneFrame {...props} />}
      {device === "tablet" && <TabletFrame {...props} />}
      {device === "desktop" && <DesktopFrame {...props} />}
    </div>
  );
}

/* ------------------------------- Overview ------------------------------- */
function OverviewPage() {
  const productivity = useCountUp(87, true);
  const projects = useCountUp(12, true);
  const bugs = useCountUp(34, true);
  const hours = useCountUp(14, true);

  return (
    <motion.div variants={staggerParent} initial="initial" animate="animate" className="space-y-4 @lg:space-y-5">
      <motion.div variants={staggerChild} className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <Label>Project</Label>
          <div className="truncate text-lg font-extrabold tracking-tight">Developer Workspace</div>
        </div>
        <button className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#c6ff00] px-3.5 py-2 text-xs font-extrabold text-[#0b2fd1] transition-transform hover:-translate-y-0.5">
          <Rocket className="h-3.5 w-3.5" /> Deploy
        </button>
      </motion.div>

      <div className="grid grid-cols-2 gap-2.5 @2xl:grid-cols-4 @2xl:gap-3">
        <MetricCard label="Productivity" value={`${productivity}%`} sub="+6% vs last week" hero />
        <MetricCard label="Active projects" value={String(projects)} sub="3 shipping this sprint" />
        <MetricCard label="Bugs resolved" value={String(bugs)} sub="This month" />
        <MetricCard label="Learning hours" value={`${hours}h`} sub="This week" />
      </div>

      <Card className="!p-4 @lg:!p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-bold">Weekly focus</div>
          <span className="rounded-full bg-[#c6ff00] px-2 py-0.5 text-[10px] font-bold text-[#0b2fd1]">
            Last 7 days
          </span>
        </div>
        <svg viewBox="0 0 400 90" className={`h-24 w-full ${INK}`} preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            d="M0,70 C40,60 70,35 110,40 C150,45 180,65 220,55 C260,45 300,20 340,28 L400,22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            d="M0,70 C40,60 70,35 110,40 C150,45 180,65 220,55 C260,45 300,20 340,28 L400,22 L400,90 L0,90 Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      </Card>

      <div className="grid gap-3 @lg:grid-cols-2">
        <Card>
          <div className="mb-3 text-sm font-bold">Recent activity</div>
          <ul className="space-y-2.5 text-sm">
            {[
              ["Merged", "PR #482 — auth refresh flow", "2h"],
              ["Deployed", "api-gateway to production", "5h"],
              ["Resolved", "Memory leak in Dashboard", "1d"],
            ].map(([k, v, t], i) => (
              <motion.li
                key={v}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.3, ease: EASE }}
                className="flex items-start justify-between gap-3"
              >
                <span className="min-w-0 text-muted-foreground">
                  <span className="font-semibold text-foreground">{k}</span> {v}
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{t}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 text-sm font-bold">Upcoming tasks</div>
          <ul className="space-y-2.5 text-sm">
            {[
              ["Review architecture RFC", "Today"],
              ["Pair on realtime sync", "Tomorrow"],
              ["Ship voice control beta", "Fri"],
            ].map(([task, when], i) => (
              <motion.li
                key={task}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.3, ease: EASE }}
                className="flex items-center justify-between gap-3"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${FILL}`} />
                  <span className="truncate">{task}</span>
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{when}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  hero = false,
}: {
  label: string;
  value: string;
  sub: string;
  hero?: boolean;
}) {
  return (
    <Card className={`!p-3.5 ${hero ? "!border-transparent !bg-[#0b2fd1] text-white" : ""}`}>
      <div className={`truncate text-[11px] font-semibold ${hero ? "text-white/70" : "text-muted-foreground"}`}>
        {label}
      </div>
      <div className={`font-wide mt-1 text-2xl tabular-nums ${hero ? "text-[#c6ff00]" : INK}`}>{value}</div>
      <div className={`mt-1 truncate text-[11px] ${hero ? "text-white/70" : "text-muted-foreground"}`}>
        {sub}
      </div>
    </Card>
  );
}

/* ------------------------------- Resources ------------------------------ */
function ResourcesPage() {
  const cats = [
    { name: "Frontend", count: 128, trending: true },
    { name: "Backend", count: 96, trending: false },
    { name: "DevOps", count: 74, trending: true },
    { name: "AI", count: 152, trending: true },
    { name: "UI/UX", count: 63, trending: false },
    { name: "Databases", count: 58, trending: false },
    { name: "Cloud", count: 89, trending: false },
    { name: "APIs", count: 71, trending: true },
  ];
  return (
    <motion.div variants={staggerParent} initial="initial" animate="animate" className="space-y-4 @lg:space-y-5">
      <motion.div variants={staggerChild} className="flex items-center gap-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border-2 border-[#0b2fd1] bg-background px-4 py-2 dark:border-[#c6ff00]/60">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate text-sm text-muted-foreground">Search 731 curated resources…</span>
        </div>
        <button className={`rounded-full ${FILL} ${ON_FILL} px-4 py-2.5 text-xs font-bold`}>All</button>
      </motion.div>

      <div className="grid grid-cols-2 gap-2.5 @2xl:grid-cols-4">
        {cats.map((c) => (
          <Card key={c.name} className="!p-3.5">
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-bold">{c.name}</span>
                  {c.trending && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-[#c6ff00] px-1.5 py-0.5 text-[9px] font-bold text-[#0b2fd1]">
                      <TrendingUp className="h-2.5 w-2.5" /> Trending
                    </span>
                  )}
                </div>
                <div className="mt-1.5 text-[11px] tabular-nums text-muted-foreground">
                  {c.count} resources
                </div>
              </div>
              <Bookmark className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 @lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-2 text-sm font-bold">
            <Star className="h-3.5 w-3.5" /> Popular this week
          </div>
          <ul className="space-y-2 text-sm">
            {[
              "react.dev — Suspense patterns",
              "vercel.com — Edge streaming",
              "kubernetes.io — HPA guide",
              "openai.com — Function calling",
            ].map((r) => (
              <li key={r} className="flex items-center justify-between gap-2 text-muted-foreground">
                <span className="truncate">{r}</span>
                <Bookmark className="h-3 w-3 shrink-0" />
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 flex items-center gap-2 text-sm font-bold">
            <Clock className="h-3.5 w-3.5" /> Recently visited
          </div>
          <ul className="space-y-2 text-sm">
            {[
              "tanstack.com/router",
              "supabase.com/docs/auth",
              "postgresql.org/docs/16",
              "tailwindcss.com/v4",
            ].map((r) => (
              <li key={r} className="flex items-center justify-between gap-2 text-muted-foreground">
                <span className="truncate">{r}</span>
                <span className="shrink-0 text-[11px]">just now</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}

/* --------------------------------- Debug -------------------------------- */
function DebugPage() {
  const bugs = [
    { id: "BUG-482", title: "Memory leak in React Dashboard", status: "Open", contrib: "amelia", messages: 12, active: true },
    { id: "BUG-471", title: "JWT refresh loop on expiry", status: "In review", contrib: "kenji", messages: 8, active: false },
    { id: "BUG-465", title: "Docker build failing on arm64", status: "Resolved", contrib: "priya", messages: 5, active: false },
  ];
  return (
    <motion.div
      variants={staggerParent}
      initial="initial"
      animate="animate"
      className="grid gap-4 @lg:grid-cols-[1fr_1.2fr]"
    >
      <motion.div variants={staggerChild} className="space-y-2">
        <div className="text-sm font-bold">Active bugs</div>
        {bugs.map((b) => (
          <div
            key={b.id}
            className={`rounded-2xl border p-3 transition-all hover:-translate-y-0.5 ${
              b.active
                ? "border-[#0b2fd1] bg-[#0b2fd1]/5 dark:border-[#c6ff00]"
                : "border-border bg-card hover:border-[#0b2fd1]/50 dark:hover:border-[#c6ff00]/50"
            }`}
          >
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{b.id}</span>
              <span
                className={`rounded-full border px-1.5 py-0.5 ${
                  b.status === "Resolved"
                    ? "border-[var(--success)]/40 text-[var(--success)]"
                    : b.status === "In review"
                      ? "border-[var(--warning)]/40 text-[var(--warning)]"
                      : "border-border"
                }`}
              >
                {b.status}
              </span>
            </div>
            <div className="mt-1 text-sm font-semibold">{b.title}</div>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MessageSquare className="h-3 w-3" /> {b.messages}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitBranch className="h-3 w-3" /> @{b.contrib}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      <Card className="!p-4 @lg:!p-5">
        <Label>BUG-482</Label>
        <div className="mt-0.5 text-base font-extrabold">Memory leak in React Dashboard</div>
        <div className="mt-4 space-y-3 text-sm">
          <Section title="Description">
            Memory grows ~40MB/hr on the analytics view when live sockets are open.
          </Section>
          <Section title="Root cause">
            Chart component subscribes to a socket in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">useEffect</code> without a
            cleanup function.
          </Section>
          <Section title="Hypotheses">
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
              <li>Missing unsubscribe on unmount</li>
              <li>Stale closure retaining datapoints</li>
            </ul>
          </Section>
          <Section title="Resolved solution">
            <div className="mt-1 flex items-start gap-2 rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/5 px-2.5 py-2 text-[var(--success)]">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Return unsubscribe from effect + weak-ref cache
            </div>
          </Section>
        </div>
      </Card>
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{title}</Label>
      <div className="mt-1 text-foreground/90">{children}</div>
    </div>
  );
}

/* --------------------------------- Docs --------------------------------- */
function DocsPage() {
  return (
    <motion.div
      variants={staggerParent}
      initial="initial"
      animate="animate"
      className="grid w-full min-w-0 max-w-full gap-4 @2xl:grid-cols-[200px_1fr]"
    >
      <motion.div variants={staggerChild} className="min-w-0 space-y-3">
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Search docs</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium">English</span>
          <span className="ml-auto rounded-full bg-[#c6ff00] px-1.5 text-[10px] font-bold text-[#0b2fd1]">
            +12
          </span>
        </div>
        <ul className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 text-sm @2xl:mx-0 @2xl:block @2xl:space-y-1 @2xl:overflow-visible @2xl:px-0">
          {["Getting started", "Authentication", "Realtime sync", "Voice API", "Deployments"].map(
            (d, i) => (
              <li
                key={d}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium @2xl:w-full @2xl:border-0 @2xl:text-sm ${
                  i === 2
                    ? `border-transparent ${FILL} ${ON_FILL}`
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-3 w-3 shrink-0" /> {d}
              </li>
            ),
          )}
        </ul>
      </motion.div>

      <motion.div variants={staggerChild} className="min-w-0 space-y-4">
        <div className="flex flex-col gap-2 @lg:flex-row @lg:items-center @lg:justify-between">
          <div className="min-w-0">
            <div className="text-lg font-extrabold tracking-tight">Realtime sync</div>
            <div className="text-[11px] text-muted-foreground">
              Updated 2 days ago · Translated from English
            </div>
          </div>
          <span className="w-fit shrink-0 rounded-full bg-[#c6ff00] px-2.5 py-0.5 text-[10px] font-bold text-[#0b2fd1]">
            AI-translated
          </span>
        </div>
        <Card className="!p-3.5">
          <pre className="w-full min-w-0 max-w-full overflow-x-auto whitespace-pre-wrap break-all text-[11px] leading-relaxed text-foreground/85 @2xl:whitespace-pre @2xl:break-normal @2xl:text-[12px]">
            <code>{`import { sync } from "@dolpstack/realtime";

sync.channel("workspace:42").on("update", (msg) => {
  console.log(msg.payload);
});`}</code>
          </pre>
        </Card>
        <div className="text-sm leading-relaxed text-muted-foreground">
          Channels multiplex over a single websocket. Subscribers automatically reconcile missed
          events on reconnect, ensuring every collaborator sees the same state within ~40ms.
        </div>
        <div className="grid gap-3 @lg:grid-cols-2">
          <Card>
            <Label>Recently opened</Label>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>Voice API · overview</li>
              <li>Deployments · rollbacks</li>
            </ul>
          </Card>
          <Card>
            <Label>Suggested</Label>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>Presence and cursors</li>
              <li>Conflict resolution</li>
            </ul>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------- Canvas -------------------------------- */
function CanvasPage() {
  const notes = [
    { x: 5, y: 8, color: "bg-[oklch(0.92_0.08_85)] text-[oklch(0.25_0.05_85)]", text: "Client requests /api" },
    { x: 36, y: 28, color: "bg-[oklch(0.9_0.09_180)] text-[oklch(0.25_0.05_200)]", text: "Edge gateway routes + auth" },
    { x: 66, y: 8, color: "bg-[oklch(0.9_0.08_320)] text-[oklch(0.25_0.05_320)]", text: "Fan-out to workers" },
    { x: 10, y: 62, color: "bg-[oklch(0.92_0.08_140)] text-[oklch(0.25_0.05_140)]", text: "Postgres primary" },
    { x: 56, y: 64, color: "bg-[oklch(0.92_0.09_60)] text-[oklch(0.25_0.05_60)]", text: "Cache layer (Redis)" },
  ];
  // centre points of the notes above (percent of the board)
  const lines = [
    [19, 17, 50, 37],
    [50, 37, 80, 17],
    [50, 37, 24, 71],
    [50, 37, 70, 73],
  ];
  return (
    <motion.div variants={staggerParent} initial="initial" animate="animate" className="space-y-4">
      <motion.div variants={staggerChild} className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <Label>Glassboard</Label>
          <div className="truncate text-base font-extrabold">Realtime pipeline — v0.3</div>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-background p-1">
          <ToolBtn icon={StickyNote} />
          <ToolBtn icon={Plus} />
          <ToolBtn icon={Share2} />
        </div>
      </motion.div>

      <div className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-border @lg:h-[380px]">
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
              transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
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
            key={n.text}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.35, ease: EASE }}
            whileHover={{ y: -3 }}
            className={`absolute w-[28%] min-w-[92px] max-w-[150px] rounded-xl p-2.5 text-[11px] font-semibold leading-snug shadow-sm ${n.color}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.text}
          </motion.div>
        ))}
        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-background/80 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur">
          <AlertCircle className="h-3 w-3" /> Draft · 3 collaborators
        </div>
      </div>
    </motion.div>
  );
}

function ToolBtn({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button
      aria-label="Tool"
      className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-[#c6ff00] hover:text-[#0b2fd1]"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}