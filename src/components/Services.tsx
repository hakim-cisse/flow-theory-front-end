import { Search, Workflow, Puzzle, GraduationCap, Code, Dumbbell, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Search,
    title: "AI Audits",
    description: "We identify what's costing you time and money before writing a single line of code.",
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Tailored automation systems that eliminate repetitive work your team shouldn't be doing.",
  },
  {
    icon: Puzzle,
    title: "AI Integrations",
    description: "Connect your tools into one intelligent ecosystem that learns and adapts with your business.",
  },
  {
    icon: Code,
    title: "Development",
    description: "Custom AI-powered applications built for your specific business problems — not generic templates.",
  },
  {
    icon: Dumbbell,
    title: "Training",
    description: "Hands-on training so your team owns the AI systems we build. No vendor lock-in.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Empower your people with AI knowledge and best practices for lasting transformation.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden section-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <span className="text-mono text-primary/70 block mb-6">What we build</span>
            <h2 className="text-heading max-w-3xl">
              Systems that give<br />
              <span className="text-gradient">businesses leverage.</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-8 sm:p-10 bg-background hover:bg-primary/5 transition-all duration-500"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300">
                    <service.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom SaaS Block */}
          <div className="mt-px group p-8 sm:p-12 bg-background hover:bg-primary/5 border border-border/30 transition-all duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300 shrink-0">
                  <Layers className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    Custom SaaS Development
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    From concept to launch, we design and build scalable SaaS platforms tailored to your market and growth goals. Architecture, development, and deployment handled end to end.
                  </p>
                </div>
              </div>
              <Button asChild size="lg" className="gap-2 shrink-0 self-start lg:self-center w-full sm:w-auto glow">
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
