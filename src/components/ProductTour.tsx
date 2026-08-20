import { useEffect, useState } from "react";
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
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

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
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
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

const staggerParent = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

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
      className={`rounded-[14px] border border-border bg-card p-4 transition-colors hover:border-foreground/20 hover:shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function ProductTour() {
  const [active, setActive] = useState<TabId>("overview");
  const activeLabel = TABS.find((t) => t.id === active)?.label ?? "Overview";

  return (
    <div className="mx-auto w-full max-w-[362px] max-md:phone-frame md:max-w-none">
    <div className="mx-auto flex h-[620px] w-full max-w-[340px] flex-col overflow-hidden max-md:phone-screen md:block md:h-auto md:rounded-[24px] bg-card elev-md md:max-w-none md:border md:border-border">
      {/* Mobile status bar */}
      <div className="relative flex items-center justify-between border-b border-border bg-muted/50 px-5 py-2 text-[10px] font-medium tabular-nums text-muted-foreground md:hidden">
        <span>9:41</span>
        <span className="absolute left-1/2 top-1.5 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
          <span>5G</span>
          <span className="inline-block h-2 w-4 rounded-[3px] border border-current" />
        </span>
      </div>
      {/* Mobile app header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/20 px-4 py-2.5 md:hidden">
        <span className="text-sm font-semibold text-foreground">{activeLabel}</span>
        <span className="text-[10px] text-muted-foreground">dolpstack.app</span>
      </div>
      {/* Browser chrome */}
      <div className="hidden items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5 md:flex">
        <div className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="ml-4 text-xs text-muted-foreground">dolpstack.app — {activeLabel}</div>
      </div>

      <div className="flex min-h-0 flex-1 md:h-[540px] md:flex-none">
        {/* Sidebar */}
        <nav className="hidden w-56 shrink-0 flex-col border-r border-border bg-muted/30 p-3 md:flex h-full">
          <div className="mb-2 px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Workspace
          </div>
          {TABS.map((t) => {
            const isActive = t.id === active;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`group relative flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:translate-x-[4px] hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="tour-active-bg"
                    className="absolute inset-0 rounded-md bg-background"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="tour-active-bar"
                    className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-foreground"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
                <Icon
                  className={`relative h-4 w-4 transition-opacity ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
                />
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
          <div className="mt-auto rounded-md border border-border bg-background/50 p-3">
            <div className="text-[11px] text-muted-foreground">Workspace</div>
            <div className="mt-0.5 text-sm font-medium text-foreground">Developer</div>
          </div>
        </nav>

        {/* Content */}
        <div className="relative min-w-0 flex-1 overflow-y-auto md:h-full md:overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="p-4 sm:p-5 md:h-full md:overflow-y-auto md:p-6"
            >
              {active === "overview" && <OverviewPage />}
              {active === "resources" && <ResourcesPage />}
              {active === "debug" && <DebugPage />}
              {active === "docs" && <DocsPage />}
              {active === "canvas" && <CanvasPage />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="grid grid-cols-5 border-t border-border bg-muted/30 md:hidden">
        {TABS.map((t) => {
          const isActive = t.id === active;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex min-w-0 flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{t.label}</span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center bg-muted/30 pb-2 md:hidden">
        <span className="h-1 w-24 rounded-full bg-foreground/30" />
      </div>
    </div>
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
    <motion.div variants={staggerParent} initial="initial" animate="animate" className="space-y-5">
      <motion.div variants={staggerChild} className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Project</div>
          <div className="text-lg font-semibold tracking-tight text-foreground">
            Developer Workspace
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:-translate-y-[2px] hover:border-foreground/30">
          <Rocket className="h-3.5 w-3.5" /> Deploy
        </button>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-4">
        <MetricCard label="Productivity" value={`${productivity}%`} sub="+6% vs last week" />
        <MetricCard label="Active projects" value={String(projects)} sub="3 shipping this sprint" />
        <MetricCard label="Bugs resolved" value={String(bugs)} sub="This month" />
        <MetricCard label="Learning hours" value={`${hours}h`} sub="This week" />
      </div>

      <Card className="!p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-medium text-foreground">Weekly focus</div>
          <div className="text-[11px] text-muted-foreground">Last 7 days</div>
        </div>
        <svg viewBox="0 0 400 90" className="h-24 w-full text-accent">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            d="M0,70 C40,60 70,35 110,40 C150,45 180,65 220,55 C260,45 300,20 340,28 L400,22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            d="M0,70 C40,60 70,35 110,40 C150,45 180,65 220,55 C260,45 300,20 340,28 L400,22 L400,90 L0,90 Z"
            fill="currentColor"
            fillOpacity="0.08"
          />
        </svg>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <div className="mb-3 text-sm font-medium text-foreground">Recent activity</div>
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
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">
                  <span className="text-foreground">{k}</span> {v}
                </span>
                <span className="text-[11px] text-muted-foreground">{t}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 text-sm font-medium text-foreground">Upcoming tasks</div>
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
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                  {task}
                </span>
                <span className="text-[11px] text-muted-foreground">{when}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
        {value}
      </div>
      <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
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
    <motion.div variants={staggerParent} initial="initial" animate="animate" className="space-y-5">
      <motion.div variants={staggerChild} className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search 731 curated resources…</span>
        </div>
        <button className="rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground hover:border-foreground/30">
          All
        </button>
      </motion.div>

      <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-4">
        {cats.map((c) => (
          <Card key={c.name}>
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  {c.trending && (
                    <span className="inline-flex items-center gap-0.5 rounded-full border border-accent/30 bg-accent/10 px-1.5 py-0.2 text-[9px] font-medium text-accent">
                      <TrendingUp className="h-2.5 w-2.5" /> Trending
                    </span>
                  )}
                </div>
                <div className="mt-1.5 text-[11px] text-muted-foreground tabular-nums">
                  {c.count} resources
                </div>
              </div>
              <Bookmark className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <Star className="h-3.5 w-3.5" /> Popular this week
          </div>
          <ul className="space-y-2 text-sm">
            {[
              "react.dev — Suspense patterns",
              "vercel.com — Edge streaming",
              "kubernetes.io — HPA guide",
              "openai.com — Function calling",
            ].map((r) => (
              <li key={r} className="flex items-center justify-between text-muted-foreground">
                <span>{r}</span>
                <Bookmark className="h-3 w-3" />
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="h-3.5 w-3.5" /> Recently visited
          </div>
          <ul className="space-y-2 text-sm">
            {[
              "tanstack.com/router",
              "supabase.com/docs/auth",
              "postgresql.org/docs/16",
              "tailwindcss.com/v4",
            ].map((r) => (
              <li key={r} className="flex items-center justify-between text-muted-foreground">
                <span>{r}</span>
                <span className="text-[11px]">just now</span>
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
    {
      id: "BUG-482",
      title: "Memory leak in React Dashboard",
      status: "Open",
      contrib: "amelia",
      messages: 12,
      active: true,
    },
    {
      id: "BUG-471",
      title: "JWT refresh loop on expiry",
      status: "In review",
      contrib: "kenji",
      messages: 8,
      active: false,
    },
    {
      id: "BUG-465",
      title: "Docker build failing on arm64",
      status: "Resolved",
      contrib: "priya",
      messages: 5,
      active: false,
    },
  ];
  return (
    <motion.div
      variants={staggerParent}
      initial="initial"
      animate="animate"
      className="grid gap-4 md:grid-cols-[1fr_1.2fr]"
    >
      <motion.div variants={staggerChild} className="space-y-2">
        <div className="text-sm font-medium text-foreground">Active bugs</div>
        {bugs.map((b) => (
          <div
            key={b.id}
            className={`rounded-[14px] border p-3 transition-all hover:-translate-y-[3px] hover:border-foreground/25 hover:shadow-sm ${
              b.active ? "border-foreground/25 bg-muted/40" : "border-border bg-card"
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
            <div className="mt-1 text-sm font-medium text-foreground">{b.title}</div>
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

      <Card className="!p-5">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">BUG-482</div>
        <div className="mt-0.5 text-base font-semibold text-foreground">
          Memory leak in React Dashboard
        </div>
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
            <div className="mt-1 flex items-center gap-2 text-[var(--success)]">
              <CheckCircle2 className="h-3.5 w-3.5" /> Return unsubscribe from effect + weak-ref
              cache
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
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{title}</div>
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
      className="grid w-full min-w-0 max-w-full gap-4 md:grid-cols-[200px_1fr]"
    >
      <motion.div variants={staggerChild} className="min-w-0 space-y-3">
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Search docs</span>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground">English</span>
          <span className="ml-auto text-[10px] text-muted-foreground">+12</span>
        </div>
        <ul className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 text-sm md:mx-0 md:block md:space-y-1 md:overflow-visible md:px-0">
          {["Getting started", "Authentication", "Realtime sync", "Voice API", "Deployments"].map(
            (d, i) => (
              <li
                key={d}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs md:w-full md:rounded md:border-0 md:px-2 md:text-sm ${i === 2 ? "border-foreground/20 bg-muted text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                <FileText className="h-3 w-3 shrink-0" /> {d}
              </li>
            ),
          )}
        </ul>
      </motion.div>

      <motion.div variants={staggerChild} className="min-w-0 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Realtime sync
            </div>
            <div className="text-[11px] text-muted-foreground">
              Updated 2 days ago · Translated from English
            </div>
          </div>
          <span className="w-fit shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
            AI-translated
          </span>
        </div>
        <Card className="min-w-0 !p-4">
          <pre className="w-full min-w-0 max-w-full overflow-x-auto whitespace-pre-wrap break-all text-[11px] leading-relaxed text-foreground/85 md:whitespace-pre md:break-normal md:text-[12px]">
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
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              Recently opened
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Voice API · overview</li>
              <li>Deployments · rollbacks</li>
            </ul>
          </Card>
          <Card>
            <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              Suggested
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
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
    {
      x: 6,
      y: 8,
      color: "bg-[oklch(0.92_0.08_85)] text-[oklch(0.25_0.05_85)]",
      text: "Client requests /api",
    },
    {
      x: 40,
      y: 18,
      color: "bg-[oklch(0.9_0.09_180)] text-[oklch(0.25_0.05_200)]",
      text: "Edge gateway routes + auth",
    },
    {
      x: 72,
      y: 10,
      color: "bg-[oklch(0.9_0.08_320)] text-[oklch(0.25_0.05_320)]",
      text: "Fan-out to workers",
    },
    {
      x: 20,
      y: 62,
      color: "bg-[oklch(0.92_0.08_140)] text-[oklch(0.25_0.05_140)]",
      text: "Postgres primary",
    },
    {
      x: 60,
      y: 66,
      color: "bg-[oklch(0.92_0.09_60)] text-[oklch(0.25_0.05_60)]",
      text: "Cache layer (Redis)",
    },
  ];
  return (
    <motion.div variants={staggerParent} initial="initial" animate="animate" className="space-y-4">
      <motion.div variants={staggerChild} className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Glassboard
          </div>
          <div className="text-base font-semibold text-foreground">Realtime pipeline — v0.3</div>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-1">
          <ToolBtn icon={StickyNote} />
          <ToolBtn icon={Plus} />
          <ToolBtn icon={Share2} />
        </div>
      </motion.div>

      <div
        className="relative h-[380px] w-full overflow-hidden rounded-[14px] border border-border"
      >
        <svg
          className="absolute inset-0 h-full w-full text-muted-foreground/50"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            x1="15"
            y1="14"
            x2="45"
            y2="24"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            x1="55"
            y1="24"
            x2="76"
            y2="16"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            x1="50"
            y1="30"
            x2="30"
            y2="66"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            x1="52"
            y1="30"
            x2="65"
            y2="70"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
        </svg>
        {notes.map((n, i) => (
          <motion.div
            key={n.text}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.35, ease: EASE }}
            whileHover={{ y: -3 }}
            className={`absolute w-[150px] rounded-md p-2.5 text-[11px] leading-snug shadow-sm ${n.color}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.text}
          </motion.div>
        ))}
        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 text-[10px] text-muted-foreground">
          <AlertCircle className="h-3 w-3" /> Draft · 3 collaborators
        </div>
      </div>
    </motion.div>
  );
}

function ToolBtn({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
