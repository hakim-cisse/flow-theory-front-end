/**
 * Editorial metrics ticker — continuous marquee of real ROI numbers.
 * Hairline strip, mono labels, cyan accents on the numerals.
 */
const METRICS = [
  { value: "$96K", label: "Saved · APT Locator" },
  { value: "55 hrs", label: "Reclaimed weekly" },
  { value: "3×", label: "ROI average" },
  { value: "47+ hrs", label: "Saved per week" },
  { value: "3–5×", label: "Faster outreach · Empower Estates" },
  { value: "100%", label: "Built on your existing stack" },
];

export const MetricsTicker = ({ className = "" }: { className?: string }) => {
  // Duplicate for seamless loop
  const items = [...METRICS, ...METRICS];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
      aria-label="Key outcomes we deliver"
    >
      <div
        className="flex gap-12 sm:gap-16 whitespace-nowrap"
        style={{
          animation: "metrics-marquee 40s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((m, i) => (
          <div key={i} className="flex items-baseline gap-3 shrink-0">
            <span
              className="font-display text-2xl sm:text-3xl text-primary"
              style={{ fontWeight: 400 }}
            >
              {m.value}
            </span>
            <span className="text-mono text-foreground/55">{m.label}</span>
            <span className="text-foreground/20 ml-12 sm:ml-16">/</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes metrics-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
