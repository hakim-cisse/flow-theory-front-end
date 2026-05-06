import { useEffect, useRef } from "react";

/**
 * Fixed full-viewport ambient layer:
 * - Animated mesh-gradient orbs (slow drift)
 * - Cursor-following primary glow (throttled, transform-only)
 * - Subtle SVG noise grain
 * - Faint grid overlay
 * Sits behind all content (z-0). Page content should set its own stacking.
 */
export const AmbientBackground = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0.5);
  const targetY = useRef(0.3);
  const currentX = useRef(0.5);
  const currentY = useRef(0.3);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetX.current = e.clientX / window.innerWidth;
      targetY.current = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      // Ease toward target
      currentX.current += (targetX.current - currentX.current) * 0.06;
      currentY.current += (targetY.current - currentY.current) * 0.06;
      const el = glowRef.current;
      if (el) {
        el.style.transform = `translate3d(${currentX.current * 100 - 50}vw, ${
          currentY.current * 100 - 50
        }vh, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(193 100% 50% / 0.08), transparent 60%)",
        }}
      />

      {/* Drifting orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute rounded-full opacity-[0.18] blur-[120px] animate-drift-1"
          style={{
            width: "55vw",
            height: "55vw",
            left: "-10vw",
            top: "10vh",
            background: "radial-gradient(circle, hsl(193 100% 50%), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.12] blur-[140px] animate-drift-2"
          style={{
            width: "45vw",
            height: "45vw",
            right: "-8vw",
            top: "40vh",
            background: "radial-gradient(circle, hsl(220 90% 55%), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.10] blur-[160px] animate-drift-3"
          style={{
            width: "60vw",
            height: "60vw",
            left: "20vw",
            top: "100vh",
            background: "radial-gradient(circle, hsl(193 80% 60%), transparent 70%)",
          }}
        />
      </div>

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{
          width: "70vw",
          height: "70vw",
          marginLeft: "-35vw",
          marginTop: "-35vw",
          background: "radial-gradient(circle, hsl(193 100% 60% / 0.06), transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(193 100% 70%) 1px, transparent 1px), linear-gradient(to bottom, hsl(193 100% 70%) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
};
