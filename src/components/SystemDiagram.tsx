import { useEffect, useRef, useState } from "react";

/**
 * Editorial animated system diagram.
 * Hairline nodes + edges draw themselves on mount, then nodes pulse softly.
 * Token-driven (uses currentColor + --primary), so it adapts to light/dark.
 */
export const SystemDiagram = ({ className = "" }: { className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Layout: 3 input nodes (left) → 2 processing nodes (middle) → 1 output (right)
  const nodes = [
    { id: "i1", x: 60, y: 40, label: "DATA" },
    { id: "i2", x: 60, y: 110, label: "OPS" },
    { id: "i3", x: 60, y: 180, label: "INPUT" },
    { id: "p1", x: 360, y: 75, label: "MODEL" },
    { id: "p2", x: 360, y: 145, label: "LOGIC" },
    { id: "o1", x: 660, y: 110, label: "OUTCOME" },
  ];

  const edges = [
    ["i1", "p1"],
    ["i2", "p1"],
    ["i2", "p2"],
    ["i3", "p2"],
    ["p1", "o1"],
    ["p2", "o1"],
  ] as const;

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      ref={ref}
      viewBox="0 0 720 220"
      className={className}
      role="img"
      aria-label="Animated diagram of an AI system: inputs flow through model and logic into a measurable outcome."
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="sd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      <g stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.9">
        {edges.map(([a, b], i) => {
          const A = nodeMap[a];
          const B = nodeMap[b];
          const len = Math.hypot(B.x - A.x, B.y - A.y);
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                strokeDasharray={len}
                strokeDashoffset={visible ? 0 : len}
                style={{
                  transition: `stroke-dashoffset 1.1s ease-out ${0.2 + i * 0.12}s`,
                }}
              />
              {/* Traveling pulse */}
              {visible && (
                <circle r="2.5" fill="hsl(var(--primary))" filter="url(#sd-glow)">
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    begin={`${1.4 + i * 0.18}s`}
                    path={`M ${A.x} ${A.y} L ${B.x} ${B.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.85;1"
                    dur="3.2s"
                    repeatCount="indefinite"
                    begin={`${1.4 + i * 0.18}s`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </g>

      {/* Nodes */}
      <g>
        {nodes.map((n, i) => {
          const isOutput = n.id === "o1";
          return (
            <g
              key={n.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
                transformOrigin: `${n.x}px ${n.y}px`,
                transition: `opacity 0.6s ease-out ${0.05 + i * 0.08}s, transform 0.6s ease-out ${0.05 + i * 0.08}s`,
              }}
            >
              {/* Soft pulse ring */}
              <circle
                cx={n.x}
                cy={n.y}
                r="14"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                opacity="0.35"
              >
                {visible && (
                  <animate
                    attributeName="r"
                    values="14;22;14"
                    dur="3.6s"
                    repeatCount="indefinite"
                    begin={`${0.6 + i * 0.2}s`}
                  />
                )}
                {visible && (
                  <animate
                    attributeName="opacity"
                    values="0.45;0;0.45"
                    dur="3.6s"
                    repeatCount="indefinite"
                    begin={`${0.6 + i * 0.2}s`}
                  />
                )}
              </circle>

              {/* Node body — square to match editorial radius */}
              <rect
                x={n.x - 8}
                y={n.y - 8}
                width="16"
                height="16"
                fill={isOutput ? "hsl(var(--primary))" : "hsl(var(--background))"}
                stroke="hsl(var(--primary))"
                strokeWidth="1.25"
              />

              {/* Label */}
              <text
                x={n.x}
                y={n.y + (n.y < 100 ? -22 : 30)}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="1.5"
                fill="hsl(var(--foreground))"
                opacity="0.55"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};
