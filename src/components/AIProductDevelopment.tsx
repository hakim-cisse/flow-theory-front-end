import { Lightbulb, Code2, Puzzle, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const stages = [
  {
    n: "01",
    icon: Lightbulb,
    title: "Concept & Strategy",
    description:
      "We define what the product or feature is, who it's for, and what it needs to do. Feasibility, scoping, and a clear roadmap before a single line of code is written.",
  },
  {
    n: "02",
    icon: Code2,
    title: "Design & Development",
    description:
      "We build it. Full AI products, standalone features, integrations, interfaces, and infrastructure, handled by a team that specializes in AI, not a generalist agency learning on your budget.",
  },
  {
    n: "03",
    icon: Puzzle,
    title: "AI Feature Integration",
    description:
      "Already have a product? We identify where AI creates the most value and build those features directly into your existing platform: smarter search, intelligent recommendations, automated workflows, natural language interfaces.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Launch & Beyond",
    description:
      "We take the product to market with you and stay on to iterate, optimize, and scale. Launch is the beginning of the engagement, not the end.",
  },
];

export const AIProductDevelopment = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: stagesRef, isVisible: stagesVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section id="ai-product-development" className="py-24 sm:py-32 relative overflow-hidden section-8">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-20 max-w-4xl">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              AI Product & Feature Development
            </span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              From zero, or<br />
              <span className="text-gradient">adding AI to what you have.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
            <p className="text-subheading text-muted-foreground leading-relaxed mt-8" style={staggerStyle(3, headerVisible)}>
              Whether you're starting from a blank page or making an existing product smarter, we build it. Early-stage startups validating their first AI product, growing companies adding AI features, and established businesses launching standalone AI products. No idea is too early, no scope is too large.
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed mt-6 max-w-3xl" style={staggerStyle(4, headerVisible)}>
              One accountable partner across the entire journey: concept, feasibility, design, development, testing, and launch. No stitching together agencies, freelancers, and internal teams.
            </p>
          </div>

          {/* Stages flow */}
          <div ref={stagesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30 relative">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.n}
                  className="group relative bg-background hover:bg-primary/5 transition-all duration-500 p-8 flex flex-col"
                  style={staggerStyle(i, stagesVisible, { delay: 0.12 })}
                >
                  {/* Connector arrow (desktop) */}
                  {i < stages.length - 1 && (
                    <div className="hidden lg:flex absolute top-12 -right-3 z-10 w-6 h-6 items-center justify-center bg-background border border-border/40 rounded-full">
                      <ArrowRight className="w-3 h-3 text-primary/60" />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-mono text-primary/40 text-xs">{stage.n}</span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              );
            })}
          </div>

          {/* Strong callout */}
          <div ref={ctaRef} className="mt-24 text-center max-w-screen-2xl mx-auto">
            <p
              className="text-heading leading-tight"
              style={staggerStyle(0, ctaVisible)}
            >
              From the first conversation to{" "}
              <span className="text-gradient">your first customer</span>,<br className="hidden sm:block" />
              we're with you the entire way.
            </p>

            <div className="mt-12 flex justify-center" style={staggerStyle(2, ctaVisible)}>
              <Button asChild size="lg" className="group px-8 py-6 font-semibold glow">
                <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                  Start Building With Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
