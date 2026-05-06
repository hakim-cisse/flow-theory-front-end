/**
 * Editorial ambient layer — token-driven so it adapts to light/dark theme.
 */
export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, var(--ambient-vignette), transparent 55%)",
        }}
      />

      {/* Hairline grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--ambient-grid)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--ambient-grid)) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Paper / film grain */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--ambient-grain-opacity)",
          mixBlendMode: "var(--ambient-grain-blend)" as any,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "220px 220px",
        }}
      />

      {/* Corner warmth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 110%, var(--ambient-corner), transparent 50%)",
        }}
      />
    </div>
  );
};
