import { useState } from "react";
import { Search, Target, PenTool, Rocket, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    phase: "01",
    title: "Discover",
    short: "Understand your business",
    description: "Deep-dive interviews, workflow mapping, and pain point analysis to understand your business inside out.",
    icon: Search,
    detail: "Most firms skip this. We don't. Because building the wrong thing fast is still waste.",
  },
  {
    phase: "02",
    title: "Diagnose",
    short: "Find highest-ROI wins",
    description: "Validate priorities and identify the highest-ROI opportunities hiding in your operations.",
    icon: Target,
    detail: "Data-driven assessment to separate real bottlenecks from symptoms.",
  },
  {
    phase: "03",
    title: "Design",
    short: "Build the roadmap",
    description: "A clear, measurable execution plan — no vague decks, no buzzword roadmaps.",
    icon: PenTool,
    detail: "Custom roadmap with timelines, milestones, and success metrics you'll actually track.",
  },
  {
    phase: "04",
    title: "Deploy",
    short: "Ship & train",
    description: "Implement fast, prove results, and train your team to own the systems we build.",
    icon: Rocket,
    detail: "Agile implementation with continuous feedback. Your team learns alongside us.",
  },
  {
    phase: "05",
    title: "Scale",
    short: "Expand company-wide",
    description: "Turn early wins into company-wide systems. We don't leave until you're self-sufficient.",
    icon: TrendingUp,
    detail: "Expand successful solutions across your entire organization with confidence.",
  },
];

export const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const current = steps[active];
  const CurrentIcon = current.icon;

  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative overflow-hidden section-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <span className="text-mono text-primary/70 block mb-6">Our process</span>
            <h2 className="text-heading max-w-3xl">
              Discovery first.<br />
              <span className="text-gradient">Results always.</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>

          <div className="border border-border/30 bg-card/30">
            {/* Step selector - horizontal on desktop, vertical on mobile */}
            <div className="grid grid-cols-5 border-b border-border/20">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <button
                    key={step.phase}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative py-4 sm:py-5 px-2 sm:px-4 text-center transition-all duration-300 border-r last:border-r-0 border-border/20",
                      active === i ? "bg-primary/[0.07]" : "hover:bg-primary/[0.03]"
                    )}
                  >
                    {/* Active bar */}
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[2px] bg-primary transition-all duration-300",
                        active === i ? "opacity-100" : "opacity-0"
                      )}
                    />

                    {/* Progress connector */}
                    <div
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 right-0 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] transition-colors duration-300 translate-x-[3px] z-10 hidden sm:block",
                        i < steps.length - 1 && (
                          i < active ? "border-l-primary/40" : 
                          i === active ? "border-l-primary" : "border-l-border/30"
                        ),
                        i === steps.length - 1 && "hidden sm:hidden"
                      )}
                    />

                    <div className={cn(
                      "w-8 h-8 sm:w-9 sm:h-9 mx-auto mb-1.5 flex items-center justify-center transition-all duration-300",
                      active === i ? "bg-primary text-primary-foreground" : 
                      i < active ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary/50"
                    )}>
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>

                    <span className={cn(
                      "text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 block",
                      active === i ? "text-primary" : "text-muted-foreground/50"
                    )}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content panel */}
            <div className="p-6 sm:p-8 min-h-[180px]">
              <div className="flex items-start gap-5">
                <div className="hidden sm:flex w-12 h-12 items-center justify-center bg-primary/10 text-primary shrink-0">
                  <CurrentIcon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-mono text-primary/60 text-xs">{current.phase}</span>
                    <h3 className="text-xl font-bold text-foreground">{current.title}</h3>
                    <span className="text-xs text-muted-foreground/60 hidden sm:inline">— {current.short}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {current.description}
                  </p>
                  <p className="text-sm text-primary/70 italic">
                    {current.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
