import { useState } from "react";
import { Building2, HeartPulse, ShoppingCart, Users, ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
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
  const [active, setActive] = useState(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: stackRef, isVisible: stackVisible } = useScrollReveal({ threshold: 0.1 });

  const next = () => setActive((prev) => (prev + 1) % industries.length);
  const prev = () => setActive((prev) => (prev - 1 + industries.length) % industries.length);

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

          {/* Stacked cards */}
          <div
            ref={stackRef}
            className="relative mx-auto max-w-xl"
            style={{
              height: 340,
              opacity: stackVisible ? 1 : 0,
              transform: stackVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            {industries.map((industry, i) => {
              const offset = ((i - active + industries.length) % industries.length);
              const isTop = offset === 0;
              const zIndex = industries.length - offset;
              const scale = 1 - offset * 0.04;
              const translateY = offset * 14;
              const opacity = offset > 2 ? 0 : 1 - offset * 0.15;

              return (
                <div
                  key={industry.title}
                  onClick={() => !isTop && setActive(i)}
                  className={cn(
                    "absolute inset-x-0 rounded-lg border p-7 sm:p-9 transition-all duration-500 ease-out",
                    isTop
                      ? "border-primary/30 bg-card/80 shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.2)] cursor-default"
                      : "border-border/20 bg-card/60 cursor-pointer hover:border-primary/15"
                  )}
                  style={{
                    zIndex,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    transformOrigin: "top center",
                  }}
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                      "w-11 h-11 rounded-md flex items-center justify-center transition-all duration-300",
                      isTop ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    )}>
                      <industry.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className={cn(
                      "text-lg font-bold transition-colors duration-300",
                      isTop ? "text-primary" : "text-foreground"
                    )}>
                      {industry.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={cn(
                    "text-sm leading-relaxed mb-5 transition-colors duration-300",
                    isTop ? "text-muted-foreground" : "text-muted-foreground/50"
                  )}>
                    {industry.description}
                  </p>

                  {/* Highlights — only visible on top card */}
                  <div className={cn(
                    "space-y-2.5 border-t border-primary/10 pt-4 transition-all duration-500",
                    isTop ? "opacity-100" : "opacity-0"
                  )}>
                    {industry.highlights.map((bullet, j) => (
                      <div
                        key={bullet}
                        className="flex items-center gap-2.5 text-sm"
                        style={{
                          opacity: isTop ? 1 : 0,
                          transform: isTop ? "translateX(0)" : "translateX(-8px)",
                          transition: `opacity 0.3s ease-out ${j * 0.1 + 0.2}s, transform 0.3s ease-out ${j * 0.1 + 0.2}s`,
                        }}
                      >
                        <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                        <span className="text-muted-foreground">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-md border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {industries.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    active === i ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/30"
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-md border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground/50 mt-8 tracking-wide">
            Don't see your industry? We focus on operational complexity, not labels.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
