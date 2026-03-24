import { useState } from "react";
import { Building2, HeartPulse, ShoppingCart, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [active, setActive] = useState<number | null>(null);
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
            {industries.map((industry, i) => {
              const isActive = active === i;
              return (
                <button
                  key={industry.title}
                  onClick={() => setActive(isActive ? null : i)}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={cn(
                    "group relative rounded-lg border text-left p-7 sm:p-9 transition-all duration-500 cursor-pointer overflow-hidden",
                    isActive
                      ? "border-primary/40 bg-primary/[0.06] shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.2)] -translate-y-1"
                      : "border-border/30 bg-card/40 hover:border-primary/20"
                  )}
                  style={staggerStyle(i, gridVisible, { delay: 0.12 })}
                >
                  {/* Glow effect */}
                  <div className={cn(
                    "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] transition-opacity duration-500",
                    isActive ? "bg-primary/10 opacity-100" : "opacity-0"
                  )} />

                  <div className="relative z-10">
                    {/* Icon + Title row */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn(
                        "w-11 h-11 rounded-md flex items-center justify-center transition-all duration-300",
                        isActive
                          ? "bg-primary text-primary-foreground scale-110"
                          : "bg-primary/10 text-primary"
                      )}>
                        <industry.icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <h3 className={cn(
                        "text-lg font-bold transition-colors duration-300",
                        isActive ? "text-primary" : "text-foreground"
                      )}>
                        {industry.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {industry.description}
                    </p>

                    {/* Highlights — expand on active */}
                    <div className={cn(
                      "grid transition-all duration-500 ease-in-out",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden">
                        <div className="pt-3 border-t border-primary/10 space-y-2.5">
                          {industry.highlights.map((bullet, j) => (
                            <div
                              key={bullet}
                              className="flex items-center gap-2.5 text-sm"
                              style={{
                                opacity: isActive ? 1 : 0,
                                transform: isActive ? "translateX(0)" : "translateX(-8px)",
                                transition: `opacity 0.3s ease-out ${j * 0.08}s, transform 0.3s ease-out ${j * 0.08}s`,
                              }}
                            >
                              <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                              <span className="text-muted-foreground">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
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
