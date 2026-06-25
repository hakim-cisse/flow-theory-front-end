import { Search, Target, ShieldCheck, Rocket, GraduationCap, LineChart, Infinity as InfinityIcon, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import stratumBrainScreenshot from "@/assets/stratum-brain-screenshot.png";

const layers = [
  {
    letter: "S",
    title: "Scan",
    description:
      "Multi-level discovery across leadership and knowledge workers, not just the top.",
    icon: Search,
  },
  {
    letter: "T",
    title: "Target",
    description:
      "User-centered solution design with confidence and irreversibility gating.",
    icon: Target,
  },
  {
    letter: "R",
    title: "Resolve",
    description:
      "IT as a co-designer in every solution, with a formal AI Governance milestone after Quick Wins.",
    icon: ShieldCheck,
  },
  {
    letter: "A",
    title: "Activate",
    description:
      "Phased deployment inside the tools teams already use. Quick Wins first.",
    icon: Rocket,
  },
  {
    letter: "T",
    title: "Transfer",
    description:
      "Role-specific AI fluency so teams own their AI, not just use it.",
    icon: GraduationCap,
  },
  {
    letter: "U",
    title: "Uplift",
    description:
      "ROI measured against baselines set at the start, not estimated after.",
    icon: LineChart,
  },
  {
    letter: "M",
    title: "Multiply",
    description:
      "Long-horizon strategic bets built on a proven foundation.",
    icon: InfinityIcon,
  },
];

const principles = [
  {
    title: "Quick Wins first",
    description:
      "We start with high-confidence, high-reversibility value in 60 to 90 days. That credibility funds everything that comes after.",
  },
  {
    title: "Built into your tools",
    description:
      "Every solution runs inside the platforms your teams already use. No new tool unless it is clearly the best path, and no adoption barrier from day one.",
  },
  {
    title: "AI that knows its limits",
    description:
      "Every system we build has a confidence threshold. When the data is insufficient or the right action is unclear, it defers to a human instead of guessing.",
  },
];

export const Stratum = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: stackRef, isVisible: stackVisible } = useScrollReveal({ threshold: 0.05 });
  const { ref: principlesRef, isVisible: principlesVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="stratum" className="py-24 sm:py-32 relative overflow-hidden section-6">
      {/* Ambient background */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-20 max-w-4xl">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              The STRATUM Methodology
            </span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              Why 80% of AI projects fail,<br />
              <span className="text-gradient">and how we fix it.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
            <p className="text-subheading text-muted-foreground leading-relaxed mt-8" style={staggerStyle(3, headerVisible)}>
              Most AI transformations fail not because of the technology, but because of human and organizational
              factors: solutions designed without the people doing the work, built without IT involvement, and
              deployed without any way to measure what changed. STRATUM is our answer to that. It is a seven-layer
              AI transformation methodology that addresses every failure mode, in sequence, with nothing skipped.
            </p>
          </div>

          {/* Layer stack */}
          <div ref={stackRef} className="relative">
            <div
              className="absolute left-6 sm:left-10 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              style={{
                opacity: stackVisible ? 1 : 0,
                transition: "opacity 1s ease-out 0.3s",
              }}
            />

            <div className="space-y-4 sm:space-y-5">
              {layers.map((layer, i) => {
                const Icon = layer.icon;
                const offset = i * 14;

                return (
                  <div
                    key={`${layer.letter}-${layer.title}`}
                    className="relative group"
                    style={{
                      ...staggerStyle(i, stackVisible, { delay: 0.1, distance: 30 }),
                      paddingLeft: `clamp(0px, ${offset}px, ${offset}px)`,
                    }}
                  >
                    <div className="relative flex flex-col sm:flex-row items-start gap-5 sm:gap-7 p-6 sm:p-8 border border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-primary/[0.03]">
                      {/* Letter + icon column */}
                      <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3 shrink-0 sm:w-24">
                        <span className="font-serif text-4xl sm:text-5xl leading-none text-primary tabular-nums">
                          {layer.letter}
                        </span>
                        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {layer.title}
                          </h3>
                          <span className="text-mono text-[10px] text-primary/50">
                            LAYER 0{i + 1}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {layer.description}
                        </p>
                      </div>

                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary/40 transition-all duration-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Principles */}
          <div ref={principlesRef} className="mt-24">
            <div className="text-center mb-12" style={staggerStyle(0, principlesVisible)}>
              <span className="text-mono text-primary/70">Principles we hold to</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className="group p-8 bg-background hover:bg-primary/5 transition-all duration-500"
                  style={staggerStyle(i + 1, principlesVisible, { delay: 0.1 })}
                >
                  <span className="text-mono text-xs text-primary/60 block mb-3">
                    0{i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center" style={staggerStyle(4, principlesVisible)}>
              <p className="text-subheading text-foreground/90 mb-6">
                See how STRATUM applies to your organization.
              </p>
              <Button asChild size="lg" className="group px-8 py-6 font-semibold glow">
                <a href="#cta">
                  Get in touch
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
