import { Building2, HeartPulse, ShoppingCart, Users, ArrowRight } from "lucide-react";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    description: "Eliminating friction in high-volume deal flow and client operations.",
    highlights: ["Lead routing automation", "CRM workflow optimization", "Disposition acceleration"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Reducing administrative burden so teams can focus on patient care.",
    highlights: ["Patient intake automation", "Compliance-ready systems", "Operational reporting"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Building scalable operations behind fast-growing storefronts.",
    highlights: ["Order fulfillment automation", "Customer journey optimization", "AI-powered support"],
  },
  {
    icon: Users,
    title: "Recruitment",
    description: "Accelerating hiring pipelines without sacrificing candidate quality.",
    highlights: ["Candidate screening automation", "Interview scheduling workflows", "Pipeline management"],
  },
];

export const Industries = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden section-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="mb-20">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>Where we operate</span>
            <h2 className="text-heading max-w-3xl" style={staggerStyle(1, headerVisible)}>
              Industries We<br />
              <span className="text-gradient">Specialize In</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8" style={staggerStyle(3, headerVisible)}>
              We design systems and automation tailored to how each industry actually operates.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {industries.map((industry, i) => (
              <div
                key={industry.title}
                className="group relative rounded-lg border border-border/30 bg-card/40 p-7 sm:p-9 transition-all duration-500 hover:border-primary/25 hover:bg-primary/[0.03] hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.15)] hover:-translate-y-1"
                style={staggerStyle(i, gridVisible, { delay: 0.12 })}
              >
                <div className="w-11 h-11 rounded-md flex items-center justify-center bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <industry.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {industry.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {industry.description}
                </p>

                <ul className="space-y-2.5">
                  {industry.highlights.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-muted-foreground/80">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground/50 mt-10 tracking-wide" style={staggerStyle(5, gridVisible)}>
            Don't see your industry? We focus on operational complexity, not labels.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
