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
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: LayoutGrid, label: "Resources" },
  { icon: Bug, label: "Debug" },
  { icon: Languages, label: "Docs" },
  { icon: PenTool, label: "Glassboard" },
  { icon: Activity, label: "Analytics" },
];

const BARS = [38, 62, 45, 74, 58, 88, 70, 96, 64, 82, 55, 92];

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
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      className="relative mx-auto w-full max-w-[1120px]"
      style={{ perspective: "1600px" }}
    >
      {/* soft glow underneath */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-14 -bottom-14 top-6 -z-10 rounded-[48px] opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.28), rgba(236, 72, 153, 0.2), rgba(56, 189, 248, 0.18), transparent 70%)",
        }}
      />

      <motion.div
        animate={
          reduce
            ? undefined
            : { rotateX: 8 + tilt.x, rotateY: tilt.y, y: [0, -8, 0] }
        }
        transition={{
          rotateX: { duration: 0.6, ease: EASE },
          rotateY: { duration: 0.6, ease: EASE },
          y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_40px_120px_-40px_rgba(0,0,0,0.45)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground">
            <Search className="h-3 w-3" />
            dolpstack.app / workspace
          </div>
        </div>

        <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[180px_1fr]">
          {/* sidebar */}
          <div className="hidden border-r border-border bg-muted/30 p-3 sm:block">
            <div className="mb-4 px-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Workspace
            </div>
            <div className="space-y-1">
              {NAV.map((n) => (
                <div
                  key={n.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] ${
                    n.active
                      ? "bg-background font-medium text-foreground shadow-xs"
                      : "text-muted-foreground"
                  }`}
                >
                  <n.icon className="h-3.5 w-3.5" />
                  {n.label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 border-r border-border bg-muted/30 py-4 sm:hidden">
            {NAV.map((n) => (
              <n.icon
                key={n.label}
                className={`h-4 w-4 ${n.active ? "text-foreground" : "text-muted-foreground"}`}
              />
            ))}
          </div>

          {/* main */}
          <div className="min-w-0 p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">Team overview</div>
                <div className="text-[11px] text-muted-foreground">Synced 2s ago</div>
              </div>
              <div className="hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Live
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                ["Resources", "128"],
                ["Open bugs", "6"],
                ["Docs indexed", "1.2k"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border bg-background p-2.5 sm:p-3">
                  <div className="text-[10px] text-muted-foreground sm:text-[11px]">{label}</div>
                  <div className="mt-1 text-base font-semibold text-foreground sm:text-xl">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:mt-4 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-lg border border-border bg-background p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[11px] font-medium text-foreground">Weekly activity</div>
                  <TrendingUp className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="flex h-24 items-end gap-1.5 sm:h-28">
                  {BARS.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.7, delay: 0.6 + i * 0.04, ease: EASE }}
                      className="flex-1 rounded-sm bg-accent/70"
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-3 sm:p-4">
                <div className="mb-2 text-[11px] font-medium text-foreground">Recent activity</div>
                <div className="divide-y divide-border">
                  {[
                    "api-gateway deployed",
                    "3 docs auto-indexed",
                    "Bug #204 resolved",
                    "Glassboard synced",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 py-1.5 text-[11px] text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                      <span className="truncate">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}