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
      className="relative mx-auto w-[96vw] max-w-[1380px] pt-1"
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

      {/* Main 3D Floating MacBook Outer Shell (Grey in light mode, Black in dark mode) */}
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
        className="relative overflow-hidden rounded-t-[24px] sm:rounded-t-[32px] border-t border-x border-slate-300/80 dark:border-white/15 bg-slate-200 dark:bg-[#0B0F17] p-2.5 sm:p-4 shadow-[0_50px_140px_-25px_rgba(0,0,0,0.4)] dark:shadow-[0_50px_140px_-25px_rgba(0,0,0,0.8)] transition-all duration-300"
        style={{
          transformStyle: "preserve-3d",
          maskImage: "linear-gradient(to bottom, black 35%, rgba(0,0,0,0.85) 60%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 35%, rgba(0,0,0,0.85) 60%, transparent 92%)",
        }}
      >
        {/* Top MacBook Status Bar & Notch */}
        <div className="relative flex items-center justify-between rounded-t-[18px] sm:rounded-t-[24px] border-b border-slate-300/60 dark:border-white/10 bg-slate-300/70 dark:bg-[#080B10] px-3.5 py-1.5 text-[11px] text-slate-700 dark:text-zinc-400">
          {/* Top Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-32 sm:w-40 rounded-b-xl border-b border-x border-slate-400/40 dark:border-white/10 bg-slate-300 dark:bg-[#080B10] flex items-center justify-center gap-2 z-30 pointer-events-none">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600 dark:bg-zinc-800" />
            <span className="h-1 w-1 rounded-full bg-emerald-500/80" />
          </div>

          {/* Left status items: Apple icon + Menu links */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-zinc-300">
              <Apple className="h-3.5 w-3.5 fill-current" />
              <span className="font-semibold text-slate-900 dark:text-foreground">DolpStack</span>
              <span className="hidden sm:inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">File</span>
              <span className="hidden sm:inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">Edit</span>
              <span className="hidden sm:inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">View</span>
              <span className="hidden sm:inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">Go</span>
              <span className="hidden sm:inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">Window</span>
              <span className="hidden sm:inline hover:text-slate-900 dark:hover:text-foreground cursor-pointer">Help</span>
            </div>
          </div>

          {/* Right status items: Wifi, Battery, Time */}
          <div className="flex items-center gap-3 text-slate-700 dark:text-zinc-400">
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Fri 2:55 PM</span>
          </div>
        </div>

        {/* MacBook Display Screen Area */}
        <div className="relative bg-slate-100 dark:bg-[#0e131d] p-3 sm:p-6 rounded-t-none rounded-b-none overflow-hidden min-h-[480px] flex items-center justify-center">

          {/* INNER FLOATING APPLICATION WINDOW */}
          <div className="relative w-full rounded-xl sm:rounded-2xl border border-slate-300/80 dark:border-white/15 bg-card text-card-foreground shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300">

            {/* Inner Application Window Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2.5">
              <div className="flex items-center gap-3">
                {/* Traffic lights inside app window */}
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                <div className="hidden sm:flex items-center gap-1 text-muted-foreground">
                  <ChevronLeft className="h-3.5 w-3.5 cursor-pointer hover:text-foreground" />
                  <ChevronRight className="h-3.5 w-3.5 cursor-pointer hover:text-foreground" />
                  <Clock className="h-3.5 w-3.5 ml-1 cursor-pointer hover:text-foreground" />
                </div>
              </div>

              {/* Inner App Search Bar */}
              <div className="flex flex-1 max-w-md items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground mx-3">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">Search dolpstack.app / workspace</span>
                <span className="ml-auto rounded border border-border px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground">
                  ⌘K
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted">
                  <Rocket className="h-3.5 w-3.5" /> Deploy
                </button>
              </div>
            </div>

            {/* Inner Application Content Surface */}
            <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[210px_1fr] min-h-[420px]">
              {/* Sidebar Navigation */}
              <div className="border-r border-border bg-muted/30 p-3.5 hidden sm:block">
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

              {/* Mobile Sidebar icons */}
              <div className="flex flex-col items-center gap-3 border-r border-border bg-muted/30 py-4 sm:hidden">
                {NAV.map((n) => (
                  <n.icon
                    key={n.label}
                    className={`h-4 w-4 ${n.active ? "text-foreground" : "text-muted-foreground"}`}
                  />
                ))}
              </div>

              {/* Main Application Interface */}
              <div className="p-4 sm:p-6 space-y-5">
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
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Synced 2s ago
                    </span>
                  </div>
                </div>

                {/* Stat Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
                <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                  <div className="rounded-xl border border-border bg-background p-4 space-y-3">
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
                  <div className="rounded-xl border border-border bg-background p-4 space-y-3">
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
                          <div className="flex items-center gap-2 text-foreground/90">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{title}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64 sm:h-80 bg-gradient-to-t from-background via-background/85 to-transparent z-30"
        />
      </motion.div>
    </motion.div>
  );
}