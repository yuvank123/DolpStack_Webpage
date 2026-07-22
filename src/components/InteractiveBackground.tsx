import { useEffect, useRef } from "react";

interface Dot {
  baseX: number;
  baseY: number;
  glow: number;
  phaseX: number;
  phaseY: number;
  twinkleSpeed: number;
  twinklePhase: number;
  twinkleAmount: number;
  group: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number; // in pixels per millisecond
  strength: number;
  waveWidth: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastRippleTime = useRef<number>(0);
  const isTabActiveRef = useRef<boolean>(true);
  const prefersReducedMotionRef = useRef<boolean>(false);

  const mouseRef = useRef({
    x: 0,
    y: 0,
    active: false,
    lastMoveTime: 0,
  });

  const screenConfig = useRef({
    spacing: 24,
    interactionRadius: 200,
    dotRadius: 0.9,
    maxRipples: 3,
  });

  // Calculate configuration based on viewport width
  const getScreenConfig = (width: number) => {
    if (width <= 768) {
      // Mobile
      return {
        spacing: 32,
        interactionRadius: 120,
        dotRadius: 0.75,
        maxRipples: 1,
      };
    } else if (width <= 1024) {
      // Tablet
      return {
        spacing: 28,
        interactionRadius: 160,
        dotRadius: 0.85,
        maxRipples: 2,
      };
    } else {
      // Desktop
      return {
        spacing: 24,
        interactionRadius: 200,
        dotRadius: 0.95,
        maxRipples: 3,
      };
    }
  };

  // Initialize dots grid
  const initDots = (width: number, height: number) => {
    const config = getScreenConfig(width);
    const spacing = config.spacing;
    const dots: Dot[] = [];
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    const offsetX = (width - (cols - 1) * spacing) / 2;
    const offsetY = (height - (rows - 1) * spacing) / 2;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        dots.push({
          baseX: offsetX + c * spacing,
          baseY: offsetY + r * spacing,
          glow: 0,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.4 + Math.random() * 0.8,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleAmount: 0.005 + Math.random() * 0.015,
          group: (c + r) % 4,
        });
      }
    }

    return { dots, config };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frameId = 0;
    let lastTime = performance.now();
    const dpr = window.devicePixelRatio || 1;

    // Detect dark theme
    const checkDarkTheme = () => {
      return document.documentElement.classList.contains("dark");
    };

    // Handle mouse movement and velocity detection
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;

      if (mouse.active) {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dt = Math.max(1, now - mouse.lastMoveTime);
        const speed = dist / dt;

        // If mouse moves rapidly (speed > 1.3px/ms) and ripple cooldown allows
        if (
          speed > 1.3 &&
          now - lastRippleTime.current > 350 &&
          ripplesRef.current.length < screenConfig.current.maxRipples
        ) {
          ripplesRef.current.push({
            x,
            y,
            radius: 0,
            maxRadius: screenConfig.current.interactionRadius * 1.25,
            speed: 0.45, // speed in px per ms
            strength: 0.85,
            waveWidth: 45,
          });
          lastRippleTime.current = now;
        }
      }

      mouse.x = x;
      mouse.y = y;
      mouse.active = true;
      mouse.lastMoveTime = now;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouseRef.current.active = true;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.lastMoveTime = performance.now();
    };

    // Tab Inactivity Event Listeners
    const handleVisibilityChange = () => {
      isTabActiveRef.current = document.visibilityState === "visible";
      if (isTabActiveRef.current) {
        lastTime = performance.now();
      }
    };

    // Media Query for Reduced Motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreferenceChange = (e: MediaQueryListEvent | MediaQueryList) => {
      prefersReducedMotionRef.current = e.matches;
    };
    handleMotionPreferenceChange(mediaQuery);

    // Initial canvas setup
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      const res = initDots(width, height);
      dotsRef.current = res.dots;
      screenConfig.current = res.config;
    };
    resizeCanvas();

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    mediaQuery.addEventListener("change", handleMotionPreferenceChange);

    // Theme Mutation Observer
    const themeObserver = new MutationObserver(() => {
      // Force repaint when theme changes
      lastTime = performance.now();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Render loop
    const loop = (time: number) => {
      if (!canvasRef.current || !isTabActiveRef.current) {
        frameId = requestAnimationFrame(loop);
        return;
      }

      const canvasEl = canvasRef.current;
      const ctx = canvasEl.getContext("2d");
      if (!ctx) return;

      const deltaTime = Math.min(32, time - lastTime);
      lastTime = time;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const isDark = checkDarkTheme();
      const reducedMotion = prefersReducedMotionRef.current;
      const dots = dotsRef.current;
      const ripples = ripplesRef.current;
      const mouse = mouseRef.current;
      const config = screenConfig.current;
      const dotRadius = config.dotRadius;

      // Update ripples
      const updatedRipples: Ripple[] = [];
      for (const r of ripples) {
        r.radius += r.speed * deltaTime;
        r.strength = 1.0 - r.radius / r.maxRadius;
        if (r.radius < r.maxRadius && r.strength > 0) {
          updatedRipples.push(r);
        }
      }
      ripplesRef.current = updatedRipples;

      // 1. Reduced motion path (draw static grid)
      if (reducedMotion) {
        ctx.beginPath();
        for (const dot of dots) {
          ctx.moveTo(dot.baseX + dotRadius, dot.baseY);
          ctx.arc(dot.baseX, dot.baseY, dotRadius, 0, Math.PI * 2);
        }
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.09)" : "rgba(0, 0, 0, 0.05)";
        ctx.fill();

        frameId = requestAnimationFrame(loop);
        return;
      }

      // 2. Update interactive glow values
      const interactionRadiusSq = config.interactionRadius * config.interactionRadius;
      const easeFactor = 1 - Math.exp(-9.0 * (deltaTime * 0.001)); // ~300ms ease

      for (const dot of dots) {
        let targetGlow = 0;

        // Mouse distance check
        if (mouse.active) {
          const dx = dot.baseX - mouse.x;
          const dy = dot.baseY - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < interactionRadiusSq) {
            const dist = Math.sqrt(distSq);
            targetGlow = Math.pow(1 - dist / config.interactionRadius, 1.8);
          }
        }

        // Ripple wave check
        for (const r of updatedRipples) {
          const dx = dot.baseX - r.x;
          const dy = dot.baseY - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - r.radius);
          if (diff < r.waveWidth) {
            const rippleGlow =
              r.strength * (1.0 - diff / r.waveWidth) * (1.0 - r.radius / r.maxRadius);
            targetGlow = Math.max(targetGlow, rippleGlow);
          }
        }

        // Lerp glow
        dot.glow += (targetGlow - dot.glow) * easeFactor;
      }

      const tSeconds = time * 0.001;
      const breathing = Math.sin(tSeconds * 0.7) * 0.012; // slow breathing opacity

      // 3. Draw base dots in 4 groups to optimize performance
      const groupCount = 4;
      const baseOpacity = isDark ? 0.09 : 0.05;

      for (let g = 0; g < groupCount; g++) {
        const phaseOffset = (g * Math.PI) / 2;
        const groupTwinkle = Math.sin(tSeconds * 1.6 + phaseOffset) * 0.014;
        const groupOpacity = Math.max(0.015, baseOpacity + breathing + groupTwinkle);

        ctx.beginPath();
        for (let i = g; i < dots.length; i += groupCount) {
          const dot = dots[i];

          // Sub-pixel drifting motion for ambient feel
          const dx = Math.sin(tSeconds * 0.3 + dot.phaseX) * 0.9;
          const dy = Math.cos(tSeconds * 0.35 + dot.phaseY) * 0.9;
          const x = dot.baseX + dx;
          const y = dot.baseY + dy;

          ctx.moveTo(x + dotRadius, y);
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        }
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${groupOpacity})`
          : `rgba(0, 0, 0, ${groupOpacity})`;
        ctx.fill();
      }

      // 4. Draw interactive glowing dots on top
      for (const dot of dots) {
        if (dot.glow > 0.005) {
          const dx = Math.sin(tSeconds * 0.3 + dot.phaseX) * 0.9;
          const dy = Math.cos(tSeconds * 0.35 + dot.phaseY) * 0.9;
          const x = dot.baseX + dx;
          const y = dot.baseY + dy;

          // Slightly enlarge size when glowing
          const currentRadius = dotRadius * (1.0 + dot.glow * 0.25);
          const glowOpacity = dot.glow * 0.16; // Maintain glow opacity strictly below 20%

          // Interactive color (Indigo -> Soft blue -> Cyan tint shift)
          const colorOffset = (dot.baseX + dot.baseY) * 0.0008 + tSeconds * 0.15;
          const r = Math.round(99 + Math.sin(colorOffset) * 18); // 81 to 117 (Indigo range)
          const g = Math.round(112 + Math.cos(colorOffset) * 22); // 90 to 134 (Blue/Cyan range)
          const b = Math.round(242 + Math.sin(colorOffset * 1.2) * 10); // 232 to 252 (Soft blue/indigo tint)

          ctx.beginPath();
          ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${glowOpacity})`;
          ctx.fill();
        }
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    // Cleanups
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      themeObserver.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
      style={{
        display: "block",
        willChange: "transform",
      }}
    />
  );
}
