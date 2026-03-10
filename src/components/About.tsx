import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden section-3">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className="max-w-6xl mx-auto"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8">
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-mono text-primary/80">
                About Us
              </span>
              <h2 className="text-heading">
                You don't need <span className="text-gradient">more tools.</span><br />
                You need the right systems.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We help founders reclaim time and scale faster by turning everyday operations into intelligent systems. From workflow automation to AI integration, we build the foundation for long-term leverage and growth.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Button asChild size="lg" className="group px-8 py-6 font-semibold rounded-full glow">
                  <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                    See Where You're Losing Time
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right — feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Proven Expertise", desc: "Our team has AI experience, delivering tailored solutions." },
                { title: "Custom AI Solutions", desc: "We create tools that fit your needs, integrating with systems." },
                { title: "Efficiency Redefined", desc: "We streamline operations, reduce costs, and boost productivity." },
                { title: "Founder-Focused", desc: "Built by founders who understand the challenges you face." },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-2xl border border-border/30 bg-card/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
                  style={{
                    transitionDelay: `${i * 0.1}s`,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.6s ease-out ${i * 0.15}s`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
