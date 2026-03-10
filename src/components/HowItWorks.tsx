import { useState } from "react";
import { Search, Target, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    phase: "01",
    title: "Discover",
    description: "We listen first. Deep-dive interviews, workflow mapping, and pain point analysis to understand your business inside out.",
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
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative overflow-hidden section-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <span className="text-mono text-primary/70 block mb-6">Our process</span>
            <h2 className="text-heading max-w-3xl">
              Discovery first.<br />
              <span className="text-gradient">Results always.</span>
            </h2>
            <div className="accent-bar mt-6" />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8">
              We don't guess what your business needs. We follow a disciplined process that puts understanding before action.
            </p>
          </div>

          {/* Steps — stacked editorial layout */}
          <div className="space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <div
                  key={step.phase}
                  className={`group relative border-t border-border/30 cursor-pointer transition-all duration-500 ${
                    isActive ? 'bg-primary/5' : 'hover:bg-card/50'
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="grid grid-cols-12 gap-4 py-8 sm:py-10 px-2 sm:px-6">
                    {/* Phase number */}
                    <div className="col-span-2 sm:col-span-1">
                      <span className={`text-mono transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {step.phase}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="col-span-2 sm:col-span-1 flex justify-center">
                      <div className={`w-10 h-10 flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="col-span-8 sm:col-span-3">
                      <h3 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`}>
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="col-span-12 sm:col-span-7">
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        {step.description}
                      </p>
                      <div className={`overflow-hidden transition-all duration-500 ${
                        isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-sm text-primary/80 italic pt-2">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Bottom border */}
            <div className="border-t border-border/30" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
