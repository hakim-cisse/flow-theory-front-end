import { useState } from "react";
import { Search, Target, PenTool, Rocket, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden section-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <div
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out',
              }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-mono text-primary/80 mb-4 sm:mb-6">
                How It Works
              </span>
              <h2 className="text-heading max-w-md">
                Accelerate Business <span className="text-gradient">Performance.</span>
              </h2>
            </div>
            <div
              className="flex items-start lg:items-end"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out 0.2s',
              }}
            >
              <div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  We don't guess what your business needs. We follow a disciplined process that puts understanding before action.
                </p>
                <Button asChild size="lg" className="rounded-full glow w-full sm:w-auto">
                  <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2 sm:space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <div
                  key={step.phase}
                  className={`group relative rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-500 ${
                    isActive ? 'bg-primary/5 border-primary/30' : 'border-border/30 bg-card/20 hover:bg-card/40 hover:border-border/50'
                  }`}
                  onClick={() => setActiveStep(isActive ? null : index)}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.6s ease-out ${index * 0.1}s`,
                  }}
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1">
                        <span className={`text-mono text-[0.65rem] sm:text-xs transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                          {step.phase}
                        </span>
                        <h3 className={`text-base sm:text-xl font-bold transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <p className="text-xs sm:text-sm text-primary/80 italic">{step.detail}</p>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-all duration-300 hidden sm:block ${
                      isActive ? 'text-primary translate-x-1' : 'text-muted-foreground'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
