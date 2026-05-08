import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (props: IconProps) => ({
  width: props.size ?? 24,
  height: props.size ?? 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

/** AI Audits — concentric circles + crosshair, like a sighting reticle */
export const AuditIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.25" fill="currentColor" />
    <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
  </svg>
);

/** Custom Workflows — three nodes connected by orthogonal flow paths */
export const WorkflowIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="2" y="3" width="5" height="5" />
    <rect x="17" y="9.5" width="5" height="5" />
    <rect x="2" y="16" width="5" height="5" />
    <path d="M7 5.5h6a2 2 0 0 1 2 2V12M7 18.5h6a2 2 0 0 0 2-2V12" />
  </svg>
);

/** AI Integrations — two interlocking squares (rotated overlap) */
export const IntegrationIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="3" width="11" height="11" />
    <rect x="10" y="10" width="11" height="11" />
    <path d="M14 10v4M10 14h4" />
  </svg>
);

/** Development — angle brackets bracketed by a hairline frame */
export const DevelopmentIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="2.5" y="4.5" width="19" height="15" />
    <path d="M9 9l-3 3 3 3M15 9l3 3-3 3M13.5 8.5l-3 7" />
  </svg>
);

/** Training — triangle inside a circle, geometric compass */
export const TrainingIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 4.5l6.5 11.25h-13L12 4.5z" />
    <circle cx="12" cy="12" r="1.25" fill="currentColor" />
  </svg>
);

/** Education — stacked horizontal lines pierced by a vertical axis (open book / signal) */
export const EducationIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 6h8M13 6h8M3 12h8M13 12h8M3 18h8M13 18h8" />
    <path d="M12 3v18" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/** Custom SaaS — stacked platform layers in isometric view */
export const SaaSIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
    <path d="M3 12l9 4.5 9-4.5" />
    <path d="M3 16.5l9 4.5 9-4.5" />
  </svg>
);
