import { Search, Workflow, Puzzle, GraduationCap, Code, Dumbbell, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Search,
    title: "AI Audits",
    description: "Identify bottlenecks and automation opportunities to unlock efficiency.",
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Streamline operations with tailored automation systems.",
  },
  {
    icon: Puzzle,
    title: "AI Integrations",
    description: "Connect your tools into one intelligent ecosystem that learns and adapts.",
  },
  {
    icon: Code,
    title: "Development",
    description: "Build custom AI-powered applications and solutions tailored to your business needs.",
  },
  {
    icon: Dumbbell,
    title: "Training",
    description: "Hands-on training programs to upskill your team on AI tools and workflows.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Empower your team with AI knowledge and best practices for lasting transformation.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            What We <span className="text-gradient">Build</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 rounded-2xl glass hover:bg-primary/5 transition-all duration-500 hover:glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    <service.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom SaaS Development Featured Block */}
          <div className="mt-12 group p-10 md:p-12 rounded-2xl glass hover:bg-primary/5 transition-all duration-500 hover:glow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="inline-flex p-5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Layers className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    Custom SaaS Development
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
                    Design and build scalable SaaS platforms from concept to launch. We handle architecture, development, and deployment, tailored to your market and growth goals.
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shrink-0 self-start md:self-center"
              >
                <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                  Let's Talk
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
