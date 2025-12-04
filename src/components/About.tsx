import { Sparkles, Zap, Network, Search, Workflow, Puzzle } from "lucide-react";

const features = [
  {
    icon: Zap,
    label: "Automation",
  },
  {
    icon: Sparkles,
    label: "Intelligence",
  },
  {
    icon: Network,
    label: "Connection",
  },
];

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
];

export const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Your <span className="text-gradient">AI Transformation</span> Partner.
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We help businesses reclaim time and scale faster by turning everyday operations into intelligent systems. From workflow automation to AI integration, Flow Theory AI builds the foundation for long-term leverage and growth.
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 max-w-4xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="group flex flex-col items-center space-y-4 p-6 rounded-2xl glass hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 group-hover:glow">
                    <feature.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-lg font-semibold text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              What We <span className="text-gradient">Build</span>
            </h3>

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
                      <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
