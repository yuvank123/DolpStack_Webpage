import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import {
  Activity,
  Bug,
  CheckCircle2,
  LayoutGrid,
  LayoutDashboard,
  Languages,
  PenTool,
  Search,
  TrendingUp,
  Wifi,
  Battery,
  Rocket,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Clock,
  Apple,
  Bell,
  SlidersHorizontal,
  MoreHorizontal,
  Sparkles,
  Layers,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: LayoutGrid, label: "Resources", count: "128" },
  { icon: Bug, label: "Debug", count: "6" },
  { icon: Languages, label: "Docs", count: "1.2k" },
  { icon: PenTool, label: "Glassboard" },
  { icon: Activity, label: "Analytics" },
];

const BARS = [42, 68, 52, 84, 65, 96, 78, 100, 72, 88, 60, 94, 82, 98];
const BARS_MOBILE = [42, 68, 52, 84, 65, 96, 78, 100, 72, 88];

export function HeroProductVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: -dy * 3, y: dx * 4 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 70, rotateX: 18 }}
      animate={{ opacity: 1, y: 0, rotateX: 10 }}
      transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
      className="relative mx-auto w-full max-w-[1380px] px-2 sm:px-4 pt-1"
      style={{ perspective: "2400px" }}
    >
      {/* Ambient background glow using theme accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-16 -bottom-20 top-4 -z-10 rounded-[60px] opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--accent) 35%, transparent), transparent 70%)",
        }}
      />

      {/* =========================================================================
          1. MOBILE PHONE VIEW (< 640px)
          Authentic iPhone 16 Pro Titanium frame with Dynamic Island, native mobile app layout,
          ultra-thin 2mm bezels, hardware buttons, seamless background gradient blend and bottom fade mask
          ========================================================================= */}
      <div className="block sm:hidden mx-auto max-w-[350px] relative">
        {/* Hardware Side Buttons */}
        <span className="absolute -left-[3px] top-[74px] h-3.5 w-[3px] rounded-l-[1px] bg-slate-400 dark:bg-zinc-600" />
        <span className="absolute -left-[3px] top-[110px] h-7 w-[3px] rounded-l-[1px] bg-slate-400 dark:bg-zinc-600" />
        <span className="absolute -left-[3px] top-[150px] h-7 w-[3px] rounded-l-[1px] bg-slate-400 dark:bg-zinc-600" />
        <span className="absolute -right-[3px] top-[102px] h-11 w-[3px] rounded-r-[1px] bg-slate-400 dark:bg-zinc-600" />

        <div
          className="relative overflow-hidden rounded-t-[48px] p-[3px] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-300 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] transition-all duration-300"
          style={{
            maskImage: "linear-gradient(to bottom, black 40%, rgba(0,0,0,0.85) 70%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, rgba(0,0,0,0.85) 70%, transparent 95%)",
          }}
        >
          {/* Inner Black Display Bezel */}
          <div className="rounded-t-[45px] p-[2px] bg-black">
            <div className="rounded-t-[43px] bg-card text-card-foreground flex flex-col overflow-hidden shadow-2xl">
              {/* Mobile Status Bar with Dynamic Island */}
              <div className="relative flex items-center justify-between border-b border-border/50 bg-slate-200/90 dark:bg-[#090D14] px-6 pt-3 pb-2 text-[11px] font-semibold tabular-nums text-slate-800 dark:text-zinc-300">
                <span>9:41</span>
                {/* Dynamic Island Pill */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-[24px] w-[90px] rounded-full bg-black flex items-center justify-between px-2.5 z-30 shadow-inner">
                  <span className="h-2 w-2 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/90 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-400">
                  <span className="text-[9px] font-bold">5G</span>
                  <Wifi className="h-3 w-3" />
                  <Battery className="h-3 w-3" />
                </div>
              </div>

            {/* Mobile App Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-xs">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold tracking-tight text-foreground">DolpStack</span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                      Live
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">Workspace / Team</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Bell className="h-3.5 w-3.5" />
                </button>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent">
                  JD
                </div>
              </div>
            </div>

            {/* Mobile App Search Bar */}
            <div className="p-3 bg-muted/20 border-b border-border">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground shadow-xs">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate text-[11px]">Search workspace & resources...</span>
                <SlidersHorizontal className="h-3 w-3 ml-auto text-muted-foreground shrink-0" />
              </div>
            </div>

            {/* Mobile Scrollable App Body */}
            <div className="p-3 space-y-3.5 max-h-[460px] overflow-y-auto bg-background/50">
              {/* Project Surface Title */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-accent">
                    Project Surface
                  </div>
                  <div className="text-sm font-bold tracking-tight text-foreground">
                    Team Overview & Analytics
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[9px] text-muted-foreground shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Synced 2s ago
                </span>
              </div>

              {/* Mobile Stat Cards Grid (2x2) */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border bg-card p-2.5 shadow-xs">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Resources</span>
                    <Layers className="h-3 w-3 text-accent" />
                  </div>
                  <div className="mt-1 text-lg font-bold tracking-tight text-foreground tabular-nums">
                    128
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">+12 this week</div>
                </div>

                <div className="rounded-xl border border-border bg-card p-2.5 shadow-xs">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Open Bugs</span>
                    <Bug className="h-3 w-3 text-amber-500" />
                  </div>
                  <div className="mt-1 text-lg font-bold tracking-tight text-foreground tabular-nums">
                    6
                  </div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">3 in review</div>
                </div>

                <div className="rounded-xl border border-border bg-card p-2.5 shadow-xs">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Docs</span>
                    <Languages className="h-3 w-3 text-blue-500" />
                  </div>
                  <div className="mt-1 text-lg font-bold tracking-tight text-foreground tabular-nums">
                    1.2k
                  </div>
                  <div className="text-[10px] text-muted-foreground">Instant search</div>
                </div>

                <div className="rounded-xl border border-border bg-card p-2.5 shadow-xs">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>AI Speedup</span>
                    <Zap className="h-3 w-3 text-accent" />
                  </div>
                  <div className="mt-1 text-lg font-bold tracking-tight text-foreground tabular-nums">
                    99%
                  </div>
                  <div className="text-[10px] text-muted-foreground">Auto-context</div>
                </div>
              </div>

              {/* Mobile Weekly Activity Chart */}
              <div className="rounded-xl border border-border bg-card p-3 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-foreground">Weekly Activity</div>
                    <div className="text-[10px] text-muted-foreground">Realtime throughput</div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-3 w-3" /> +24%
                  </span>
                </div>
                <div className="flex h-20 items-end gap-1.5 pt-1">
                  {BARS_MOBILE.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.03, ease: EASE }}
                      className="flex-1 rounded-xs bg-gradient-to-t from-accent to-accent/70"
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Recent Activity */}
              <div className="rounded-xl border border-border bg-card p-3 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-foreground">Recent Activity</div>
                  <Zap className="h-3 w-3 text-accent" />
                </div>
                <div className="divide-y divide-border text-[11px]">
                  {[
                    ["api-gateway deployed", "2m ago"],
                    ["3 docs auto-indexed", "15m ago"],
                    ["Bug #204 resolved", "1h ago"],
                  ].map(([title, time]) => (
                    <div key={title} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-1.5 text-foreground/90 truncate min-w-0">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{title}</span>
                      </div>
                      <span className="text-[9px] text-muted-foreground shrink-0 ml-1">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Bottom Tab Navigation */}
            <div className="grid grid-cols-5 border-t border-border bg-card px-1 py-1.5 shadow-lg">
              <button className="flex flex-col items-center gap-0.5 text-accent py-0.5">
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-[9px] font-semibold">Home</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-muted-foreground py-0.5 hover:text-foreground relative">
                <LayoutGrid className="h-4 w-4" />
                <span className="text-[9px]">Resources</span>
                <span className="absolute top-0 right-3.5 h-1.5 w-1.5 rounded-full bg-accent" />
              </button>
              <button className="flex flex-col items-center gap-0.5 text-muted-foreground py-0.5 hover:text-foreground relative">
                <Bug className="h-4 w-4" />
                <span className="text-[9px]">Debug</span>
                <span className="absolute top-0 right-3.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
              </button>
              <button className="flex flex-col items-center gap-0.5 text-muted-foreground py-0.5 hover:text-foreground">
                <Languages className="h-4 w-4" />
                <span className="text-[9px]">Docs</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-muted-foreground py-0.5 hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
                <span className="text-[9px]">More</span>
              </button>
            </div>

            {/* Mobile Home Indicator */}
            <div className="flex justify-center bg-card pb-1.5 pt-0.5">
              <span className="h-1 w-24 rounded-full bg-foreground/30" />
            </div>
          </div>
          </div>

          {/* Deep Bottom Fade Mask Overlay for Mobile */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/85 to-transparent z-30"
          />
        </div>
      </div>

      {/* =========================================================================
          2. TABLET IPAD VIEW (640px <= width < 1024px)
          iPad tablet chassis, iPadOS status bar, tablet-optimized split navigation & layout,
          seamless background gradient blend and bottom fade mask
          ========================================================================= */}
      <div className="hidden sm:block lg:hidden mx-auto max-w-[720px] relative">
        <div
          className="relative overflow-hidden rounded-t-[28px] sm:rounded-t-[32px] border-t border-x border-slate-300/80 dark:border-white/15 bg-slate-200 dark:bg-[#0B0F17] p-3 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-300"
          style={{
            maskImage: "linear-gradient(to bottom, black 35%, rgba(0,0,0,0.85) 60%, transparent 92%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 35%, rgba(0,0,0,0.85) 60%, transparent 92%)",
          }}
        >
          {/* iPad Top Status Bar */}
          <div className="relative flex items-center justify-between rounded-t-[20px] border-b border-slate-300/60 dark:border-white/10 bg-slate-300/70 dark:bg-[#080B10] px-4 py-1.5 text-[11px] text-slate-700 dark:text-zinc-400">
            <span className="font-semibold text-slate-900 dark:text-foreground">9:41 AM · Tue Sep 24</span>
            {/* Centered Front Camera */}
            <div className="h-2 w-2 rounded-full bg-slate-600 dark:bg-zinc-800 ring-1 ring-slate-400/30" />
            <div className="flex items-center gap-2.5">
              <Wifi className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold">100%</span>
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* iPad Inner Application Window */}
          <div className="relative bg-card text-card-foreground rounded-b-[20px] border-t border-x border-border shadow-md overflow-hidden">
            {/* Tablet Window Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-foreground tracking-tight">DolpStack Workspace</span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  Tablet View
                </span>
              </div>

              {/* Tablet Search */}
              <div className="flex flex-1 max-w-xs items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground mx-3">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate text-[11px]">Search dolpstack.app...</span>
                <span className="ml-auto rounded border border-border px-1 text-[9px] font-mono">⌘K</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground shadow-xs">
                  <Rocket className="h-3.5 w-3.5" /> Deploy
                </button>
              </div>
            </div>

            {/* Tablet Surface Layout (Compact Rail + Grid) */}
            <div className="grid grid-cols-[160px_1fr] min-h-[420px]">
              {/* Tablet Compact Rail */}
              <div className="border-r border-border bg-muted/30 p-2.5 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Workspace
                </div>
                {NAV.map((n) => (
                  <div
                    key={n.label}
                    className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      n.active
                        ? "bg-background text-foreground shadow-xs border border-border"
                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <n.icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{n.label}</span>
                    </div>
                    {n.count && (
                      <span className="rounded-full bg-muted px-1.5 py-0.2 text-[9px] text-muted-foreground">
                        {n.count}
                      </span>
                    )}
                  </div>
                ))}

                <div className="mt-6 rounded-lg border border-border bg-background/70 p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground">
                    <Shield className="h-3.5 w-3.5 text-accent shrink-0" /> SOC2 Verified
                  </div>
                </div>
              </div>

              {/* Tablet Main Surface Content */}
              <div className="p-4 space-y-3.5 bg-background/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-accent">
                      Project Surface
                    </div>
                    <div className="text-base font-bold tracking-tight text-foreground">
                      Team Overview & Analytics
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] text-muted-foreground shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Synced 2s ago
                  </span>
                </div>

                {/* 4 Stat Cards in 4 columns */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    ["Resources", "128", "+12 this week"],
                    ["Open bugs", "6", "3 in review"],
                    ["Docs indexed", "1.2k", "Instant search"],
                    ["AI Speedup", "99%", "Auto-context"],
                  ].map(([label, value, sub]) => (
                    <div key={label} className="rounded-lg border border-border bg-card p-2.5 shadow-xs">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                        {label}
                      </div>
                      <div className="mt-0.5 text-lg font-bold tracking-tight text-foreground tabular-nums">
                        {value}
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Chart + Activity Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl border border-border bg-card p-3 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-foreground">Weekly Activity</div>
                      <TrendingUp className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div className="flex h-24 items-end gap-1 pt-1">
                      {BARS.slice(0, 12).map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.6, delay: 0.3 + i * 0.03, ease: EASE }}
                          className="flex-1 rounded-xs bg-gradient-to-t from-accent to-accent/70"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-3 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-foreground">Recent Activity</div>
                      <Zap className="h-3 w-3 text-accent" />
                    </div>
                    <div className="divide-y divide-border text-[11px]">
                      {[
                        ["api-gateway deployed", "2m ago"],
                        ["3 docs auto-indexed", "15m ago"],
                        ["Bug #204 resolved", "1h ago"],
                      ].map(([title, time]) => (
                        <div key={title} className="flex items-center justify-between py-1.5">
                          <div className="flex items-center gap-1.5 text-foreground/90 truncate min-w-0">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span className="truncate">{title}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0 ml-1">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet Home Indicator */}
            <div className="flex justify-center bg-card py-1.5 border-t border-border/40">
              <span className="h-1 w-32 rounded-full bg-foreground/30" />
            </div>
          </div>

          {/* Deep Bottom Fade Mask Overlay for Tablet */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/85 to-transparent z-30"
          />
        </div>
      </div>

      {/* =========================================================================
          3. DESKTOP MACBOOK VIEW (>= 1024px / lg)
          Original 3D Floating MacBook Outer Shell, macOS status bar & notch,
          inner macOS desktop app window with traffic lights and rich interface
          ========================================================================= */}
      <div className="hidden lg:block">
        <motion.div
          animate={
            reduce
              ? undefined
              : { rotateX: 8 + tilt.x, rotateY: tilt.y, y: [0, -7, 0] }
          }
          transition={{
            rotateX: { duration: 0.6, ease: EASE },
            rotateY: { duration: 0.6, ease: EASE },
            y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative overflow-hidden rounded-t-[32px] border-t border-x border-slate-300/80 dark:border-white/15 bg-slate-200 dark:bg-[#0B0F17] p-4 shadow-[0_50px_140px_-25px_rgba(0,0,0,0.4)] dark:shadow-[0_50px_140px_-25px_rgba(0,0,0,0.8)] transition-all duration-300"
          style={{
            transformStyle: "preserve-3d",
            maskImage: "linear-gradient(to bottom, black 35%, rgba(0,0,0,0.85) 60%, transparent 92%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 35%, rgba(0,0,0,0.85) 60%, transparent 92%)",
          }}
        >
          {/* Top MacBook Status Bar & Notch */}
          <div className="relative flex items-center justify-between rounded-t-[24px] border-b border-slate-300/60 dark:border-white/10 bg-slate-300/70 dark:bg-[#080B10] px-3.5 py-1.5 text-[11px] text-slate-700 dark:text-zinc-400">
            {/* Top Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-40 rounded-b-xl border-b border-x border-slate-400/40 dark:border-white/10 bg-slate-300 dark:bg-[#080B10] flex items-center justify-center gap-2 z-30 pointer-events-none">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-600 dark:bg-zinc-800" />
              <span className="h-1 w-1 rounded-full bg-emerald-500/80" />
            </div>

            {/* Left status items: Apple icon + Menu links */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-zinc-300">
                <Apple className="h-3.5 w-3.5 fill-current" />
                <span className="font-semibold text-slate-900 dark:text-foreground">DolpStack</span>
                <span className="inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">File</span>
                <span className="inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">Edit</span>
                <span className="inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">View</span>
                <span className="inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">Go</span>
                <span className="inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">Window</span>
                <span className="inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">Help</span>
              </div>
            </div>

            {/* Right status items: Wifi, Battery, Time */}
            <div className="flex items-center gap-3 text-slate-700 dark:text-zinc-400">
              <Wifi className="h-3.5 w-3.5" />
              <Battery className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium inline">Fri 2:55 PM</span>
            </div>
          </div>

          {/* MacBook Display Screen Area */}
          <div className="relative bg-slate-100 dark:bg-[#0e131d] p-6 rounded-t-none rounded-b-none overflow-hidden min-h-[480px] flex items-center justify-center">

            {/* INNER FLOATING APPLICATION WINDOW */}
            <div className="relative w-full rounded-2xl border border-slate-300/80 dark:border-white/15 bg-card text-card-foreground shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300">

              {/* Inner Application Window Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  {/* Traffic lights inside app window */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <ChevronLeft className="h-3.5 w-3.5 cursor-pointer hover:text-foreground" />
                    <ChevronRight className="h-3.5 w-3.5 cursor-pointer hover:text-foreground" />
                    <Clock className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-foreground" />
                  </div>
                </div>

                {/* Inner App Search Bar */}
                <div className="flex flex-1 max-w-md items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground mx-3 min-w-0">
                  <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate text-xs">Search dolpstack.app / workspace</span>
                  <span className="ml-auto rounded border border-border px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground inline">
                    ⌘K
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted shadow-xs">
                    <Rocket className="h-3.5 w-3.5" /> Deploy
                  </button>
                </div>
              </div>

              {/* Inner Application Content Surface */}
              <div className="grid grid-cols-[210px_1fr] min-h-[420px]">
                {/* Sidebar Navigation */}
                <div className="border-r border-border bg-muted/30 p-3.5">
                  <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Workspace
                  </div>
                  <div className="space-y-1">
                    {NAV.map((n) => (
                      <div
                        key={n.label}
                        className={`flex items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium transition-colors ${
                          n.active
                            ? "bg-background text-foreground shadow-xs border border-border"
                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <n.icon className="h-3.5 w-3.5" />
                          <span>{n.label}</span>
                        </div>
                        {n.count && (
                          <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] text-muted-foreground">
                            {n.count}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-md border border-border bg-background/60 p-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-foreground">
                      <Shield className="h-3.5 w-3.5 text-accent" /> Security Verified
                    </div>
                    <div className="text-[10px] text-muted-foreground">SOC2 Type II Compliant</div>
                  </div>
                </div>

                {/* Main Application Interface */}
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Project Surface
                      </div>
                      <div className="text-lg font-semibold tracking-tight text-foreground">
                        Team Overview & Analytics
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground shadow-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Synced 2s ago
                      </span>
                    </div>
                  </div>

                  {/* Stat Cards Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      ["Resources", "128", "+12 this week"],
                      ["Open bugs", "6", "3 in review"],
                      ["Docs indexed", "1.2k", "Instant search"],
                      ["AI Speedup", "99%", "Auto-context"],
                    ].map(([label, value, sub]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-border bg-background p-3.5 shadow-xs"
                      >
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          {label}
                        </div>
                        <div className="mt-1 text-2xl font-bold tracking-tight text-foreground tabular-nums">
                          {value}
                        </div>
                        <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Analytics Chart & Activity Grid */}
                  <div className="grid gap-4 grid-cols-[1.6fr_1fr]">
                    <div className="rounded-xl border border-border bg-background p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-foreground">Weekly Activity</div>
                          <div className="text-[11px] text-muted-foreground">
                            Realtime event throughput
                          </div>
                        </div>
                        <TrendingUp className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex h-32 items-end gap-2 pt-2">
                        {BARS.map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.7, delay: 0.4 + i * 0.03, ease: EASE }}
                            className="flex-1 rounded-sm bg-gradient-to-t from-accent to-accent/65 transition-opacity hover:opacity-100 opacity-90"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity Card */}
                    <div className="rounded-xl border border-border bg-background p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-foreground">Recent Activity</div>
                        <Zap className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <div className="divide-y divide-border text-xs">
                        {[
                          ["api-gateway deployed", "2m ago"],
                          ["3 docs auto-indexed", "15m ago"],
                          ["Bug #204 resolved", "1h ago"],
                          ["Glassboard pipeline synced", "2h ago"],
                        ].map(([title, time]) => (
                          <div key={title} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2 text-foreground/90 min-w-0">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate text-xs">{title}</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground shrink-0 ml-1">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Deep Bottom Fade Mask Overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-background via-background/85 to-transparent z-30"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}