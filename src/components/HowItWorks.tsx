import { useState } from "react";
import { Search, Target, PenTool, Rocket, TrendingUp, MapPin, Flag } from "lucide-react";

const steps = [
  {
    phase: "Phase 1",
    title: "Discover",
    description: "Understand the business and surface bottlenecks",
    icon: Search,
    detail: "Deep-dive interviews, workflow mapping, and pain point analysis",
  },
  {
    phase: "Phase 2",
    title: "Diagnose",
    description: "Validate priorities and identify highest ROI opportunities",
    icon: Target,
    detail: "Data-driven assessment to prioritize quick wins and long-term gains",
  },
  {
    phase: "Phase 3",
    title: "Design",
    description: "Present a clear, measurable execution plan",
    icon: PenTool,
    detail: "Custom roadmap with timelines, milestones, and success metrics",
  },
  {
    phase: "Phase 4",
    title: "Deploy",
    description: "Implement fast and prove results",
    icon: Rocket,
    detail: "Agile implementation with continuous feedback and iteration",
  },
  {
    phase: "Phase 5",
    title: "Scale",
    description: "Turn wins into long-term systems",
    icon: TrendingUp,
    detail: "Expand successful solutions across your entire organization",
  },
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background map texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
      </div>

      {/* Decorative compass */}
      <div className="absolute top-20 right-10 w-24 h-24 opacity-10 hidden lg:block">
        <div className="w-full h-full border-2 border-primary rounded-full relative">
          <div className="absolute inset-2 border border-primary/50 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-px h-8 bg-primary -translate-x-1/2 -translate-y-full" />
          <div className="absolute top-1/2 left-1/2 w-8 h-px bg-primary -translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Journey to AI Excellence</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              The <span className="text-gradient">Roadmap</span> to Results
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow the path from discovery to scale — click each phase to explore
            </p>
          </div>

          {/* Map Path - Desktop */}
          <div className="hidden lg:block relative">
            {/* SVG Path */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1200 300"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Dotted path line */}
              <path
                d="M 100 150 Q 250 50, 400 150 T 700 150 T 1000 150"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="opacity-30"
              />
              {/* Animated dot traveling the path */}
              <circle r="6" fill="hsl(var(--primary))" className="opacity-60">
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path="M 100 150 Q 250 50, 400 150 T 700 150 T 1000 150"
                />
              </circle>
            </svg>

            {/* Steps Grid */}
            <div className="grid grid-cols-5 gap-6 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                const isLast = index === steps.length - 1;

                return (
                  <div
                    key={step.phase}
                    className={`relative cursor-pointer transition-all duration-500 ${
                      index % 2 === 0 ? "mt-0" : "mt-16"
                    }`}
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {/* Step card */}
                    <div
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-500 ${
                        isActive
                          ? "bg-primary/10 border-primary shadow-[0_0_40px_hsl(var(--primary)/0.3)] scale-105"
                          : "glass border-primary/20 hover:border-primary/40"
                      }`}
                    >
                      {/* Phase badge */}
                      <div
                        className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-primary/30 text-primary"
                        }`}
                      >
                        <span className="text-xs font-mono font-bold whitespace-nowrap">
                          {step.phase}
                        </span>
                      </div>

                      {/* Pin marker */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <div
                          className={`transition-all duration-300 ${
                            isActive ? "scale-125" : ""
                          }`}
                        >
                          {isLast ? (
                            <Flag
                              className={`w-6 h-6 ${
                                isActive ? "text-primary" : "text-primary/50"
                              }`}
                            />
                          ) : (
                            <MapPin
                              className={`w-6 h-6 ${
                                isActive ? "text-primary" : "text-primary/50"
                              }`}
                            />
                          )}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="relative mx-auto mb-4 mt-4">
                        <div
                          className={`absolute inset-0 bg-primary/30 rounded-full blur-xl transition-opacity duration-500 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        <div
                          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 border border-primary/20"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 transition-all duration-300 ${
                              isActive ? "scale-110" : "text-primary"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-bold text-center mb-2 transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">
                        {step.description}
                      </p>

                      {/* Expanded detail on hover */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isActive ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-4 border-t border-primary/20">
                          <p className="text-xs text-primary/80 text-center leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Path - Mobile/Tablet */}
          <div className="lg:hidden relative">
            {/* Vertical dotted line */}
            <div className="absolute left-8 top-0 bottom-0 w-px border-l-2 border-dashed border-primary/30" />

            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                const isLast = index === steps.length - 1;

                return (
                  <div
                    key={step.phase}
                    className="relative pl-20 cursor-pointer"
                    onClick={() => setActiveStep(isActive ? null : index)}
                  >
                    {/* Pin on the line */}
                    <div className="absolute left-4 top-6 -translate-x-1/2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-primary-foreground scale-125"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {isLast ? (
                          <Flag className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Step card */}
                    <div
                      className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
                        isActive
                          ? "bg-primary/10 border-primary shadow-[0_0_30px_hsl(var(--primary)/0.2)]"
                          : "glass border-primary/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isActive ? "" : "text-primary"
                            }`}
                          />
                        </div>

                        <div className="flex-1">
                          {/* Phase & Title */}
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-mono font-bold px-2 py-0.5 rounded transition-colors duration-300 ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-primary/10 text-primary"
                              }`}
                            >
                              {step.phase}
                            </span>
                          </div>
                          <h3
                            className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                              isActive ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>

                          {/* Expanded detail */}
                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              isActive ? "max-h-24 opacity-100 mt-3" : "max-h-0 opacity-0"
                            }`}
                          >
                            <p className="text-xs text-primary/80 pt-3 border-t border-primary/20">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
