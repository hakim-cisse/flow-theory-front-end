import { useState } from "react";
import { Search, Target, PenTool, Rocket, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { phase: "01", title: "Discovery Call", blurb: "Listen to the founder, understand how the business operates today, and identify the highest-leverage opportunities.", icon: Search },
  { phase: "02", title: "Deep-Dive Session", blurb: "Go deeper with your team to map workflows, validate insights, and agree on the priorities that matter most.", icon: Target },
  { phase: "03", title: "Proposal and Alignment", blurb: "Present a clear plan with defined deliverables, quick wins, and projected ROI. No vague consulting speak.", icon: PenTool },
  { phase: "04", title: "Pilot and Build", blurb: "Move fast and measure everything. A short pilot lets you see results before we scale the full system.", icon: Rocket },
  { phase: "05", title: "Scale and Grow", blurb: "Review results, capture learnings, and hand you a roadmap for sustainable growth. Your team fully in the driver's seat.", icon: TrendingUp },
];

export const HowItWorks = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative overflow-hidden section-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-14 max-w-3xl">
            <span className="text-mono text-primary/70 block mb-6">Our process</span>
            <h2 className="text-heading">
              How the<br />
              <span className="text-gradient">process works.</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-border/50 hidden md:block" />
            <div
              className="absolute top-6 left-0 h-px bg-primary transition-all duration-500 hidden md:block"
              style={{ width: `${((active + 1) / steps.length) * 100}%` }}
            />

            <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <li key={step.phase} className="relative">
                    <button
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="group w-full text-left"
                    >
                      {/* Node */}
                      <div className="relative z-10 mb-5 flex md:justify-start">
                        <div
                          className={cn(
                            "w-12 h-12 border flex items-center justify-center bg-background transition-all duration-300",
                            isActive
                              ? "border-primary text-primary scale-110"
                              : isPast
                              ? "border-primary/40 text-primary/60"
                              : "border-border text-muted-foreground"
                          )}
                        >
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Phase + title */}
                      <div
                        className={cn(
                          "text-mono text-xs mb-2 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground/60"
                        )}
                      >
                        {step.phase}
                      </div>
                      <h3
                        className={cn(
                          "font-display text-xl sm:text-2xl tracking-tight mb-2 transition-colors",
                          isActive ? "text-foreground" : "text-foreground/70"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.blurb}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
