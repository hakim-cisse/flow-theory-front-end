import { Building2, HeartPulse, ShoppingCart, Users, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    description: "Automated lead qualification, CRM integrations, and deal pipeline optimization that close deals faster.",
    highlights: ["Lead routing automation", "CRM workflow optimization", "Disposition acceleration"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Streamlined patient workflows, scheduling automation, and compliant data systems that reduce admin burden.",
    highlights: ["Patient intake automation", "Scheduling optimization", "Compliance-ready systems"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Intelligent inventory management, customer journey automation, and AI-powered support that scales with you.",
    highlights: ["Order fulfillment automation", "Customer journey optimization", "AI-powered support"],
  },
  {
    icon: Users,
    title: "Recruitment",
    description: "Automated candidate screening, interview scheduling, and talent pipeline management that cut time-to-hire.",
    highlights: ["Candidate screening automation", "Interview scheduling", "Pipeline management"],
  },
];

export const Industries = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden section-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-mono text-primary/70 block mb-6">Industries we specialize in</span>
            <h2 className="text-heading max-w-3xl">
              Focused on verticals where<br />
              <span className="text-gradient">AI delivers fastest.</span>
            </h2>
            <div className="accent-bar mt-6" />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8">
              We go deep in four high-impact industries where automation and AI produce the most measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/30">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="group p-8 sm:p-10 bg-background hover:bg-primary/5 transition-all duration-500"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300">
                      <industry.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {industry.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>

                  <ul className="space-y-2.5">
                    {industry.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
