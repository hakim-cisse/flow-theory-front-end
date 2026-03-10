import { Search, Workflow, Puzzle, GraduationCap, Code, Dumbbell, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Search,
    title: "AI Audits",
    description: "We identify what's costing you time and money before writing a single line of code.",
    span: "",
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Tailored automation systems that eliminate repetitive work your team shouldn't be doing.",
    span: "",
  },
  {
    icon: Puzzle,
    title: "AI Integrations",
    description: "Connect your tools into one intelligent ecosystem that learns and adapts with your business.",
    span: "",
  },
  {
    icon: Code,
    title: "Development",
    description: "Custom AI-powered applications built for your specific business problems — not generic templates.",
    span: "sm:col-span-2 lg:col-span-1",
  },
  {
    icon: Dumbbell,
    title: "Training",
    description: "Hands-on training so your team owns the AI systems we build. No vendor lock-in.",
    span: "",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Empower your people with AI knowledge and best practices for lasting transformation.",
    span: "",
  },
];

export const Services = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden section-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className="mb-10 sm:mb-16"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.7s ease-out',
            }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-mono text-primary/80 mb-4 sm:mb-6">
              Our Services
            </span>
            <h2 className="text-heading max-w-3xl">
              Systems that give<br />
              <span className="text-gradient">founders leverage.</span>
            </h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`group p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-border/30 bg-card/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ${service.span}`}
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.6s ease-out ${i * 0.1}s`,
                }}
              >
                <div className="space-y-4 sm:space-y-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300">
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom SaaS Block */}
          <div
            className="mt-3 sm:mt-4 group p-5 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all duration-500"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s ease-out 0.7s',
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-primary/20 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300 shrink-0">
                  <Layers className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    Custom SaaS Development
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    From concept to launch — we design and build scalable SaaS platforms tailored to your market and growth goals.
                  </p>
                </div>
              </div>
              <Button asChild size="lg" className="gap-2 shrink-0 self-stretch sm:self-start lg:self-center w-full sm:w-auto rounded-full glow">
                <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                  Let's Talk
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
