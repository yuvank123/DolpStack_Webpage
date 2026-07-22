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

  // Track viewport-relative card/panel rects to dynamically dim dots behind them
  const cardRectsRef = useRef<{ left: number; right: number; top: number; bottom: number }[]>([]);

  const mouseRef = useRef({
    x: 0,
    y: 0,
    active: false,
    lastMoveTime: 0,
  });

  const screenConfig = useRef({
    spacing: 24,
    interactionRadius: 140,
    dotRadius: 0.75,
    maxRipples: 3,
  });

  // Calculate configuration based on viewport width
  const getScreenConfig = (width: number) => {
    if (width <= 768) {
      // Mobile
      return {
        spacing: 32,
        interactionRadius: 90,
        dotRadius: 0.7,
        maxRipples: 1,
      };
    } else if (width <= 1024) {
      // Tablet
      return {
        spacing: 28,
        interactionRadius: 120,
        dotRadius: 0.75,
        maxRipples: 2,
      };
    } else {
      // Desktop
      return {
        spacing: 24,
        interactionRadius: 140,
        dotRadius: 0.75,
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
          twinkleSpeed: 0.3 + Math.random() * 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleAmount: 0.003 + Math.random() * 0.009,
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

    // Query card coordinates relative to the viewport
    const updateCardRects = () => {
      const elements = document.querySelectorAll(
        ".parallax-card, .surface-panel, header, footer, .bg-background, .bg-background\\/50, .bg-background\\/85, [data-card]"
      );
      const rects = [];
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      for (let i = 0; i < elements.length; i++) {
        const r = elements[i].getBoundingClientRect();
        if (r.right >= 0 && r.left <= viewportWidth && r.bottom >= 0 && r.top <= viewportHeight) {
          rects.push({
            left: r.left,
            right: r.right,
            top: r.top,
            bottom: r.bottom,
          });
        }
      }
      cardRectsRef.current = rects;
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

        // Trigger subtle wave on quick swipe
        if (
          speed > 1.4 &&
          now - lastRippleTime.current > 400 &&
          ripplesRef.current.length < screenConfig.current.maxRipples
        ) {
          ripplesRef.current.push({
            x,
            y,
            radius: 0,
            maxRadius: screenConfig.current.interactionRadius * 1.3,
            speed: 0.45,
            strength: 0.75,
            waveWidth: 40,
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

    // Canvas resizing
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
      updateCardRects();
    };

    // Initial setup
    resizeCanvas();
    const initialCardTimer = setTimeout(updateCardRects, 150);

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", updateCardRects, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    mediaQuery.addEventListener("change", handleMotionPreferenceChange);

    // Theme Mutation Observer
    const themeObserver = new MutationObserver(() => {
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
      const cardRects = cardRectsRef.current;

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

      // 1. Reduced motion path (draw static grid without interactions)
      if (reducedMotion) {
        ctx.beginPath();
        for (const dot of dots) {
          // Check card occlusion
          let isBehindCard = false;
          for (let j = 0; j < cardRects.length; j++) {
            const rect = cardRects[j];
            if (
              dot.baseX >= rect.left &&
              dot.baseX <= rect.right &&
              dot.baseY >= rect.top &&
              dot.baseY <= rect.bottom
            ) {
              isBehindCard = true;
              break;
            }
          }

          const baseOpacity = isDark ? 0.07 : 0.06;
          const finalOpacity = isBehindCard ? baseOpacity * 0.55 : baseOpacity;

          // Render perfectly static rounded coordinates
          const x = Math.round(dot.baseX);
          const y = Math.round(dot.baseY);

          ctx.moveTo(x + dotRadius, y);
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        }
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.06)";
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
            // Cosine falloff (smooth transition: 100% near center -> 50% middle -> 0% outer edge)
            const ratio = dist / config.interactionRadius;
            targetGlow = (1 + Math.cos(Math.PI * ratio)) / 2;
          }
        }

        // Ripple wave check
        for (const r of updatedRipples) {
          const dx = dot.baseX - r.x;
          const dy = dot.baseY - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - r.radius);
          if (diff < r.waveWidth) {
            const ratio = diff / r.waveWidth;
            const waveIntensity = (1 + Math.cos(Math.PI * ratio)) / 2;
            const rippleGlow = r.strength * waveIntensity * (1.0 - r.radius / r.maxRadius);
            targetGlow = Math.max(targetGlow, rippleGlow);
          }
        }

        // Lerp glow
        dot.glow += (targetGlow - dot.glow) * easeFactor;
      }

      const tSeconds = time * 0.001;
      const breathing = Math.sin(tSeconds * 0.5) * 0.003; // Extremely subtle global breathing (0.3% max variance)

      // 3. Draw base dots in 4 groups to optimize performance
      const groupCount = 4;
      const baseOpacity = isDark ? 0.07 : 0.06;

      for (let g = 0; g < groupCount; g++) {
        const phaseOffset = (g * Math.PI) / 2;
        const groupTwinkle = Math.sin(tSeconds * 1.4 + phaseOffset) * 0.004; // Extremely subtle twinkle

        const opacityNormal = Math.max(0.015, baseOpacity + breathing + groupTwinkle);
        const opacityDimmed = opacityNormal * 0.55;

        // Path for non-occluded dots
        ctx.beginPath();
        for (let i = g; i < dots.length; i += groupCount) {
          const dot = dots[i];

          // Check if dot falls behind cards/panels
          let isBehindCard = false;
          for (let j = 0; j < cardRects.length; j++) {
            const rect = cardRects[j];
            if (
              dot.baseX >= rect.left &&
              dot.baseX <= rect.right &&
              dot.baseY >= rect.top &&
              dot.baseY <= rect.bottom
            ) {
              isBehindCard = true;
              break;
            }
          }

          if (!isBehindCard) {
            // Render perfectly static rounded coordinates
            const x = Math.round(dot.baseX);
            const y = Math.round(dot.baseY);

            ctx.moveTo(x + dotRadius, y);
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          }
        }
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${opacityNormal})`
          : `rgba(0, 0, 0, ${opacityNormal})`;
        ctx.fill();

        // Path for occluded dots
        ctx.beginPath();
        for (let i = g; i < dots.length; i += groupCount) {
          const dot = dots[i];

          // Check if dot falls behind cards/panels
          let isBehindCard = false;
          for (let j = 0; j < cardRects.length; j++) {
            const rect = cardRects[j];
            if (
              dot.baseX >= rect.left &&
              dot.baseX <= rect.right &&
              dot.baseY >= rect.top &&
              dot.baseY <= rect.bottom
            ) {
              isBehindCard = true;
              break;
            }
          }

          if (isBehindCard) {
            // Render perfectly static rounded coordinates
            const x = Math.round(dot.baseX);
            const y = Math.round(dot.baseY);

            ctx.moveTo(x + dotRadius, y);
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          }
        }
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${opacityDimmed})`
          : `rgba(0, 0, 0, ${opacityDimmed})`;
        ctx.fill();
      }

      // 4. Draw interactive glowing dots on top
      for (const dot of dots) {
        if (dot.glow > 0.01) {
          // Check if dot falls behind cards/panels
          let isBehindCard = false;
          for (let j = 0; j < cardRects.length; j++) {
            const rect = cardRects[j];
            if (
              dot.baseX >= rect.left &&
              dot.baseX <= rect.right &&
              dot.baseY >= rect.top &&
              dot.baseY <= rect.bottom
            ) {
              isBehindCard = true;
              break;
            }
          }

          let glowOpacity = dot.glow * 0.18; // Max 18% opacity
          if (isBehindCard) {
            glowOpacity *= 0.55; // Dim by 45% if behind card
          }

          const x = Math.round(dot.baseX);
          const y = Math.round(dot.baseY);

          // Slightly enlarge dot size (12% increase)
          const currentRadius = dotRadius * 1.12;

          // Theme-based colors
          // Dark Mode: Soft Indigo (rgb(129, 140, 248))
          // Light Mode: Indigo (rgb(79, 70, 229))
          const r = isDark ? 129 : 79;
          const g = isDark ? 140 : 70;
          const b = isDark ? 248 : 229;

          // Draw compact outer halo (3.5x size, extremely low opacity)
          ctx.beginPath();
          ctx.arc(x, y, currentRadius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${glowOpacity * 0.22})`;
          ctx.fill();

          // Draw inner glowing core dot
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
      clearTimeout(initialCardTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateCardRects);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      themeObserver.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-[-1]"
      style={{
        display: "block",
        willChange: "transform",
      }}
    />
  );
}
