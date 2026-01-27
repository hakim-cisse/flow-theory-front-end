import { Search, Target, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business and surface bottlenecks",
    icon: Search,
  },
  {
    number: "02",
    title: "Diagnose",
    description: "Validate priorities and identify highest ROI opportunities",
    icon: Target,
  },
  {
    number: "03",
    title: "Design",
    description: "Present a clear, measurable execution plan",
    icon: PenTool,
  },
  {
    number: "04",
    title: "Deploy",
    description: "Implement fast and prove results",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Scale",
    description: "Turn wins into long-term systems",
    icon: TrendingUp,
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven 5-step process to transform your operations and deliver measurable results
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line - hidden on mobile */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="group relative flex flex-col items-center text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Step card */}
                    <div className="relative w-full p-6 rounded-2xl glass hover:bg-primary/5 transition-all duration-500">
                      {/* Step number */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                        <span className="text-xs font-mono text-primary font-semibold">
                          {step.number}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="relative mx-auto mb-4 mt-2">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/20 transition-all duration-500">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow connector - visible on mobile/tablet between cards */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden flex items-center justify-center my-4">
                        <div className="w-px h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                      </div>
                    )}
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
