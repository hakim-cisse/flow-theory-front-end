import { useState, useEffect, useRef } from "react";
import { Search, Target, PenTool, Rocket, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    phase: "01",
    title: "Discover",
    description: "Deep-dive interviews, workflow mapping, and pain point analysis to understand your business inside out.",
    icon: Search,
    detail: "Most firms skip this. We don't. Because building the wrong thing fast is still waste.",
  },
  {
    phase: "02",
    title: "Diagnose",
    description: "Validate priorities and identify the highest-ROI opportunities hiding in your operations.",
    icon: Target,
    detail: "Data-driven assessment to separate real bottlenecks from symptoms.",
  },
  {
    phase: "03",
    title: "Design",
    description: "A clear, measurable execution plan — no vague decks, no buzzword roadmaps.",
    icon: PenTool,
    detail: "Custom roadmap with timelines, milestones, and success metrics you'll actually track.",
  },
  {
    phase: "04",
    title: "Deploy",
    description: "Implement fast, prove results, and train your team to own the systems we build.",
    icon: Rocket,
    detail: "Agile implementation with continuous feedback. Your team learns alongside us.",
  },
  {
    phase: "05",
    title: "Scale",
    description: "Turn early wins into company-wide systems. We don't leave until you're self-sufficient.",
    icon: TrendingUp,
    detail: "Expand successful solutions across your entire organization with confidence.",
  },
];

export const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CYCLE_MS = 4000;
  const TICK_MS = 30;

  useEffect(() => {
    if (!isAutoPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);
    let elapsed = 0;

    progressRef.current = setInterval(() => {
      elapsed += TICK_MS;
      setProgress(Math.min((elapsed / CYCLE_MS) * 100, 100));
    }, TICK_MS);

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
      elapsed = 0;
      setProgress(0);
    }, CYCLE_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoPlaying, active]);

  const handleSelect = (i: number) => {
    setIsAutoPlaying(false);
    setActive(i);
    setProgress(0);
  };

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

          <div className="flex flex-col lg:flex-row gap-0 border border-border/30 rounded-lg overflow-hidden bg-card/30">
            {/* Left: Step list */}
            <div className="lg:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-r border-border/20">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = active === i;
                return (
                  <button
                    key={step.phase}
                    onClick={() => handleSelect(i)}
                    className={cn(
                      "w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-300 border-b last:border-b-0 border-border/10 relative overflow-hidden",
                      isActive ? "bg-primary/[0.07]" : "hover:bg-primary/[0.03]"
                    )}
                  >
                    {/* Progress bar background */}
                    {isActive && isAutoPlaying && (
                      <div
                        className="absolute inset-y-0 left-0 bg-primary/10 transition-none"
                        style={{ width: `${progress}%` }}
                      />
                    )}

                    {/* Active side indicator */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 bottom-0 w-[3px] bg-primary transition-all duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />

                    <div className={cn(
                      "relative w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 shrink-0",
                      isActive ? "bg-primary text-primary-foreground" :
                      i < active ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary/40"
                    )}>
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>

                    <div className="relative flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] font-mono transition-colors duration-300",
                          isActive ? "text-primary" : "text-muted-foreground/40"
                        )}>
                          {step.phase}
                        </span>
                        <span className={cn(
                          "text-sm font-semibold transition-colors duration-300 truncate",
                          isActive ? "text-primary" : "text-muted-foreground/70"
                        )}>
                          {step.title}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={cn(
                      "w-3.5 h-3.5 shrink-0 transition-all duration-300 relative",
                      isActive ? "text-primary translate-x-0 opacity-100" : "text-transparent -translate-x-1 opacity-0"
                    )} />
                  </button>
                );
              })}
            </div>

            {/* Right: Content panel */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center min-h-[220px] relative">
              <div
                key={active}
                className="animate-fade-in"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                    <CurrentIcon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-mono text-primary/50 text-xs block">{current.phase}</span>
                    <h3 className="text-xl font-bold text-foreground">{current.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {current.description}
                </p>

                <p className="text-sm text-primary/60 italic leading-relaxed">
                  {current.detail}
                </p>
              </div>

              {/* Step dots */}
              <div className="flex items-center gap-1.5 mt-8">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      active === i ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/30"
                    )}
                  />
                ))}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={cn(
                    "ml-3 text-[10px] font-mono uppercase tracking-wider transition-colors duration-300",
                    isAutoPlaying ? "text-primary/50" : "text-muted-foreground/30 hover:text-primary/50"
                  )}
                >
                  {isAutoPlaying ? "Auto" : "Paused"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
