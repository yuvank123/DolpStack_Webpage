import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  Activity,
  Battery,
  Bell,
  Bug,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Languages,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  MoreHorizontal,
  PenTool,
  Rocket,
  Search,
  Shield,
  SlidersHorizontal,
  TrendingUp,
  Wifi,
  Zap,
} from "lucide-react";

/* Brand: Blue #0b2fd1 · Lime #c6ff00 · type: Archivo wide (.font-wide) */
const EASE = [0.22, 1, 0.36, 1] as const;
const FILL = "bg-[#0b2fd1] dark:bg-[#c6ff00]";
const INK = "text-[#0b2fd1] dark:text-[#c6ff00]";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: LayoutGrid, label: "Resources", count: "128" },
  { icon: Bug, label: "Debug", count: "6" },
  { icon: Languages, label: "Docs", count: "1.2k" },
  { icon: PenTool, label: "Glassboard" },
  { icon: Activity, label: "Analytics" },
];

const STATS: [string, string, string, React.ElementType][] = [
  ["Resources", "128", "+12 this week", LayoutGrid],
  ["Open bugs", "6", "3 in review", Bug],
  ["Docs indexed", "1.2k", "Instant search", Languages],
  ["AI speedup", "99%", "Auto-context", Zap],
];

const ACTIVITY = [
  ["api-gateway deployed", "2m ago"],
  ["3 docs auto-indexed", "15m ago"],
  ["Bug #204 resolved", "1h ago"],
  ["Glassboard pipeline synced", "2h ago"],
];

const BARS = [42, 68, 52, 84, 65, 96, 78, 100, 72, 88, 60, 94, 82, 98];

const WALLPAPER = [
  "radial-gradient(55% 70% at 85% 5%, rgba(198,255,0,.40), transparent 60%)",
  "radial-gradient(60% 70% at 5% 100%, rgba(120,150,255,.65), transparent 60%)",
  "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
  "linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
  "linear-gradient(135deg, #0b2fd1, #08197a)",
].join(",");

/* ------------------------------ shared bits ------------------------------ */

function Glare() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent"
    />
  );
}

function Stat({
  label,
  value,
  sub,
  Icon,
  hero = false,
  dense = false,
}: {
  label: string;
  value: string;
  sub: string;
  Icon: React.ElementType;
  hero?: boolean;
  dense?: boolean;
}) {
  return (
    <div
      className={`min-w-0 rounded-2xl border ${dense ? "p-2.5" : "p-3"} ${
        hero ? "border-transparent bg-[#0b2fd1] text-white" : "border-border bg-card"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-1 text-[10px] font-semibold ${
          hero ? "text-white/70" : "text-muted-foreground"
        }`}
      >
        <span className="truncate">{label}</span>
        <Icon className={`h-3 w-3 shrink-0 ${hero ? "text-[#c6ff00]" : INK}`} />
      </div>
      <div className={`font-wide mt-1 tabular-nums ${dense ? "text-lg" : "text-xl"} ${hero ? "text-[#c6ff00]" : ""}`}>
        {value}
      </div>
      <div className={`truncate text-[10px] ${hero ? "text-white/70" : "text-muted-foreground"}`}>
        {sub}
      </div>
    </div>
  );
}

function Chart({ bars, height }: { bars: number[]; height: string }) {
  const peak = bars.length - 4;
  return (
    <div className={`relative flex items-end gap-1.5 ${height}`}>
      {[25, 50, 75].map((g) => (
        <span
          key={g}
          className="absolute inset-x-0 border-t border-dashed border-border"
          style={{ bottom: `${g}%` }}
        />
      ))}
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.7, delay: 0.4 + i * 0.03, ease: EASE }}
          className={`relative z-10 flex-1 rounded-t-md ${
            i === peak ? "bg-[#c6ff00] dark:bg-white" : `${FILL} opacity-80`
          }`}
        >
          {i === peak && (
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-1.5 py-0.5 text-[9px] font-bold text-background">
              {h}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function ActivityList({ rows }: { rows: string[][] }) {
  return (
    <div className="divide-y divide-border text-[11px]">
      {rows.map(([title, time]) => (
        <div key={title} className="flex items-center justify-between gap-2 py-1.5">
          <span className="flex min-w-0 items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
            <span className="truncate">{title}</span>
          </span>
          <span className="shrink-0 text-[9px] text-muted-foreground">{time}</span>
        </div>
      ))}
    </div>
  );
}

/** Sidebar + dashboard used inside the laptop window and the iPad. */
function AppBody({ side = "w-48", dense = false }: { side?: string; dense?: boolean }) {
  return (
    <div className="flex min-h-0 flex-1">
      <aside className={`${side} shrink-0 border-r border-border bg-muted/40 p-3`}>
        <div className="mb-2 px-2 text-[10px] font-semibold text-muted-foreground">Workspace</div>
        <nav className="space-y-1">
          {NAV.map((n) => (
            <div
              key={n.label}
              className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold ${
                n.active ? "bg-[#0b2fd1] text-white" : "text-muted-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <n.icon className="h-3.5 w-3.5" />
                {n.label}
              </span>
              {n.count && (
                <span
                  className={`rounded-full px-1.5 text-[9px] ${
                    n.active ? "bg-[#c6ff00] text-[#0b2fd1]" : "bg-muted"
                  }`}
                >
                  {n.count}
                </span>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-5 rounded-2xl bg-[#c6ff00] p-3 text-[#0b2fd1]">
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold">
            <Shield className="h-3.5 w-3.5" /> SOC2 verified
          </div>
          <div className="mt-0.5 text-[10px] opacity-80">Type II compliant</div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 space-y-3 overflow-hidden p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-muted-foreground">Project surface</div>
            <div className={`truncate font-extrabold ${dense ? "text-sm" : "text-base"}`}>
              Team overview & analytics
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Synced 2s ago
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {STATS.map(([l, v, s, I], i) => (
            <Stat key={l} label={l} value={v} sub={s} Icon={I} hero={i === 0} dense={dense} />
          ))}
        </div>

        <div className="grid grid-cols-[1.6fr_1fr] gap-3">
          <div className="rounded-2xl border border-border bg-card p-3.5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold">Weekly activity</div>
                <div className="text-[10px] text-muted-foreground">Realtime event throughput</div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#c6ff00] px-2 py-0.5 text-[10px] font-bold text-[#0b2fd1]">
                <TrendingUp className="h-3 w-3" /> +24%
              </span>
            </div>
            <Chart bars={BARS.slice(0, dense ? 12 : 14)} height={dense ? "h-20" : "h-28"} />
          </div>
          <div className="rounded-2xl border border-border bg-card p-3.5">
            <div className="mb-1 flex items-center justify-between text-xs font-bold">
              Recent activity <Zap className={`h-3 w-3 ${INK}`} />
            </div>
            <ActivityList rows={ACTIVITY.slice(0, dense ? 3 : 4)} />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------ main export ------------------------------ */

export function HeroProductVisual() {
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setTilt({ x: -dy * 2.5, y: dx * 3.5 });
  };

  const dock: [React.ElementType, string, string][] = [
    [LayoutDashboard, "from-sky-400 to-blue-600", "text-white"],
    [LayoutGrid, "from-fuchsia-400 to-purple-600", "text-white"],
    [Bug, "from-amber-300 to-orange-500", "text-white"],
    [Languages, "from-emerald-300 to-green-600", "text-white"],
    [PenTool, "from-[#c6ff00] to-lime-400", "text-[#0b2fd1]"],
    [Rocket, "from-rose-400 to-red-600", "text-white"],
  ];

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    >
      {/* brand glow behind the device */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 inset-y-10 -z-10 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(40% 50% at 30% 50%, rgba(11,47,209,.45), transparent 70%), radial-gradient(35% 45% at 75% 45%, rgba(198,255,0,.35), transparent 70%)",
        }}
      />

      {/* ===================== PHONE (< 640px) ===================== */}
      <div className="relative mx-auto max-w-[330px] sm:hidden">
        {/* hardware buttons */}
        <span className="absolute -left-[3px] top-[92px] h-6 w-[3px] rounded-l bg-slate-400 dark:bg-zinc-600" />
        <span className="absolute -left-[3px] top-[138px] h-10 w-[3px] rounded-l bg-slate-400 dark:bg-zinc-600" />
        <span className="absolute -left-[3px] top-[190px] h-10 w-[3px] rounded-l bg-slate-400 dark:bg-zinc-600" />
        <span className="absolute -right-[3px] top-[150px] h-16 w-[3px] rounded-r bg-slate-400 dark:bg-zinc-600" />

        <div className="rounded-[56px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800">
          <div className="rounded-[53px] bg-black p-[6px]">
            <div className="relative flex h-[620px] flex-col overflow-hidden rounded-[47px] bg-background">
              {/* dynamic island */}
              <div className="absolute left-1/2 top-2.5 z-30 flex h-[28px] w-[96px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3">
                <span className="h-2 w-2 rounded-full bg-[#0a1230] ring-1 ring-slate-800" />
              </div>

              {/* status bar */}
              <div className="relative z-20 flex h-12 shrink-0 items-end justify-between px-8 pb-1 text-[12px] font-semibold tabular-nums">
                <span>9:41</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold">5G</span>
                  <Wifi className="h-3 w-3" />
                  <Battery className="h-4 w-4" />
                </span>
              </div>

              {/* app body */}
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-muted-foreground">Good afternoon</div>
                    <div className="font-wide text-xl leading-none">Alex</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border">
                      <Bell className="h-4 w-4" />
                      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#0b2fd1] dark:bg-[#c6ff00]" />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c6ff00] text-xs font-black text-[#0b2fd1]">
                      AL
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2.5 text-[11px] text-muted-foreground">
                  <Search className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Search workspace & resources</span>
                  <SlidersHorizontal className="ml-auto h-3.5 w-3.5 shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {STATS.map(([l, v, s, I], i) => (
                    <Stat key={l} label={l} value={v} sub={s} Icon={I} hero={i === 0} dense />
                  ))}
                </div>

                <div className="rounded-2xl border border-border bg-card p-3.5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold">Weekly activity</div>
                      <div className="text-[10px] text-muted-foreground">Realtime throughput</div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#c6ff00] px-2 py-0.5 text-[10px] font-bold text-[#0b2fd1]">
                      <TrendingUp className="h-3 w-3" /> +24%
                    </span>
                  </div>
                  <Chart bars={BARS.slice(0, 10)} height="h-20" />
                </div>

                <div className="rounded-2xl border border-border bg-card p-3.5">
                  <div className="mb-1 text-xs font-bold">Recent activity</div>
                  <ActivityList rows={ACTIVITY.slice(0, 3)} />
                </div>
              </div>

              {/* tab bar */}
              <div className="z-20 grid shrink-0 grid-cols-5 border-t border-border bg-card/95 px-2 pb-1 pt-1.5 backdrop-blur">
                {[
                  [LayoutDashboard, "Home", true],
                  [LayoutGrid, "Resources", false],
                  [Bug, "Debug", false],
                  [Languages, "Docs", false],
                  [MoreHorizontal, "More", false],
                ].map(([I, label, on]) => {
                  const Icon = I as React.ElementType;
                  return (
                    <div key={label as string} className="flex flex-col items-center gap-0.5">
                      <span
                        className={`flex h-7 w-11 items-center justify-center rounded-full ${
                          on ? "bg-[#0b2fd1] text-white dark:bg-[#c6ff00] dark:text-[#0b2fd1]" : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className={`text-[9px] font-semibold ${on ? "" : "text-muted-foreground"}`}>
                        {label as string}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex shrink-0 justify-center bg-card pb-2 pt-1">
                <span className="h-1 w-32 rounded-full bg-foreground/80" />
              </div>
              <Glare />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== TABLET (640px – 1023px) ===================== */}
      <div className="relative mx-auto hidden max-w-[780px] sm:block lg:hidden">
        <span className="absolute -top-[3px] right-24 h-[3px] w-12 rounded-t bg-slate-400 dark:bg-zinc-600" />
        <span className="absolute -top-[3px] right-44 h-[3px] w-8 rounded-t bg-slate-400 dark:bg-zinc-600" />
        <span className="absolute -top-[3px] right-[13.5rem] h-[3px] w-8 rounded-t bg-slate-400 dark:bg-zinc-600" />

        <div className="rounded-[40px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 p-[3px] shadow-[0_40px_90px_-25px_rgba(0,0,0,0.55)] dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800">
          <div className="relative rounded-[37px] bg-black p-[13px]">
            <span className="absolute left-1/2 top-[5px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#0a1230] ring-1 ring-slate-700" />
            <div className="relative flex h-[480px] flex-col overflow-hidden rounded-[25px] bg-background">
              <div className="flex shrink-0 items-center justify-between bg-background px-6 py-1.5 text-[11px] font-semibold tabular-nums">
                <span>9:41 AM &nbsp; Sat 24 Oct</span>
                <span className="flex items-center gap-1.5">
                  <Wifi className="h-3.5 w-3.5" />
                  100%
                  <Battery className="h-4 w-4" />
                </span>
              </div>
              <div className="flex shrink-0 items-center justify-between gap-3 border-y border-border bg-muted/50 px-4 py-2">
                <span className="font-wide text-sm">DolpStack</span>
                <div className="flex max-w-xs flex-1 items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground">
                  <Search className="h-3 w-3 shrink-0" />
                  <span className="truncate">Search workspace</span>
                  <span className="ml-auto rounded border border-border px-1 font-mono text-[9px]">⌘K</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c6ff00] px-3 py-1 text-[11px] font-extrabold text-[#0b2fd1]">
                  <Rocket className="h-3 w-3" /> Deploy
                </span>
              </div>
              <AppBody side="w-40" dense />
              <div className="flex shrink-0 justify-center bg-background pb-1.5 pt-1">
                <span className="h-1 w-36 rounded-full bg-foreground/70" />
              </div>
              <Glare />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== LAPTOP (>= 1024px) ===================== */}
      <div className="hidden lg:block" style={{ perspective: "2200px" }}>
        <motion.div
          animate={reduce ? undefined : { rotateX: tilt.x, rotateY: tilt.y, y: [0, -6, 0] }}
          transition={{
            rotateX: { duration: 0.6, ease: EASE },
            rotateY: { duration: 0.6, ease: EASE },
            y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* lid */}
          <div className="mx-auto w-[92%] rounded-t-[26px] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 p-[5px] shadow-[0_-1px_0_rgba(255,255,255,0.5)_inset] dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800">
            <div className="relative rounded-t-[21px] bg-black px-[14px] pb-[26px] pt-[14px]">
              <div className="relative h-[500px] overflow-hidden rounded-[10px] xl:h-[570px]" style={{ background: WALLPAPER, backgroundSize: "auto, auto, 56px 56px, 56px 56px, auto" }}>
                {/* camera notch */}
                <div className="absolute left-1/2 top-0 z-30 flex h-[18px] w-36 -translate-x-1/2 items-center justify-center gap-2 rounded-b-xl bg-black">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0a1230] ring-1 ring-slate-700" />
                  <span className="h-1 w-1 rounded-full bg-emerald-500/80" />
                </div>

                {/* menu bar */}
                <div className="absolute inset-x-0 top-0 z-20 flex h-[22px] items-center justify-between bg-black/30 px-4 text-[11px] font-medium text-white backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <img src="/dolpstack_logo_dark.png" alt="" className="h-3.5 w-auto" />
                    <span className="font-bold">DolpStack</span>
                    {["File", "Edit", "View", "Go", "Window", "Help"].map((m) => (
                      <span key={m} className="hidden text-white/85 xl:inline">
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pr-1">
                    <Wifi className="h-3.5 w-3.5" />
                    <Battery className="h-3.5 w-3.5" />
                    <span>Sat 2:55 PM</span>
                  </div>
                </div>

                {/* app window */}
                <div className="absolute inset-x-6 bottom-[84px] top-10 z-10 flex flex-col overflow-hidden rounded-xl border border-white/30 bg-card text-card-foreground shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
                  <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-muted/60 px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full border border-[#E0443E] bg-[#FF5F56]" />
                        <span className="h-2.5 w-2.5 rounded-full border border-[#DEA123] bg-[#FFBD2E]" />
                        <span className="h-2.5 w-2.5 rounded-full border border-[#1AAB29] bg-[#27C93F]" />
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                    <div className="flex max-w-md flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground">
                      <Lock className="h-3 w-3" /> dolpstack.app/dashboard
                      <span className="ml-auto rounded border border-border px-1 font-mono text-[9px]">⌘K</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c6ff00] px-3 py-1 text-[11px] font-extrabold text-[#0b2fd1]">
                      <Rocket className="h-3 w-3" /> Deploy
                    </span>
                  </div>
                  <AppBody side="w-48" />
                </div>

                {/* dock */}
                <div className="absolute inset-x-0 bottom-2 z-20 flex justify-center">
                  <div className="flex items-end gap-2.5 rounded-[22px] border border-white/30 bg-white/20 px-3 py-2 backdrop-blur-xl">
                    {dock.map(([I, grad, ink], i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-[13px] bg-gradient-to-b ${grad} ${ink} shadow-md`}
                        >
                          <I className="h-5 w-5" />
                        </span>
                        <span className={`h-1 w-1 rounded-full ${i === 0 ? "bg-white" : "bg-transparent"}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <Glare />
              </div>
              <span className="absolute inset-x-0 bottom-[7px] text-center text-[8px] font-semibold tracking-[0.3em] text-white/30">
                DOLPSTACK PRO
              </span>
            </div>
          </div>

          {/* hinge + base */}
          <div className="relative mx-auto h-[15px] w-full rounded-b-[28px] rounded-t-[3px] bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_2px_0_rgba(0,0,0,0.12)] dark:from-zinc-500 dark:via-zinc-600 dark:to-zinc-800">
            <span className="absolute left-1/2 top-0 h-[6px] w-32 -translate-x-1/2 rounded-b-xl bg-slate-400/80 dark:bg-zinc-900/80" />
          </div>
          <div className="mx-auto mt-1 h-5 w-[94%] rounded-[100%] bg-black/30 blur-xl" />
        </motion.div>
      </div>
    </motion.div>
  );
}