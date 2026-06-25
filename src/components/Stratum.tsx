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
  const { ref: showcaseRef, isVisible: showcaseVisible } = useScrollReveal({ threshold: 0.15 });

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

          {/* Showcase: Stratum Brain — simplify data access */}
          <div ref={showcaseRef} className="mt-28 sm:mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div
                  className="inline-flex items-center gap-2 text-mono text-xs text-primary/80 border border-primary/20 bg-primary/5 px-3 py-1.5 mb-6"
                  style={staggerStyle(0, showcaseVisible)}
                >
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                  STRATUM in action
                </div>
                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5"
                  style={staggerStyle(1, showcaseVisible)}
                >
                  Simplify data access. <span className="text-gradient">Ask your business anything.</span>
                </h3>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={staggerStyle(2, showcaseVisible)}
                >
                  One of the outcomes STRATUM unlocks: instant, plain-English access to live data across
                  the tools your teams already use. No dashboards to learn, no analysts in the loop, no
                  exports. Just answers, with the reasoning attached.
                </p>
                <ul className="space-y-3" style={staggerStyle(3, showcaseVisible)}>
                  {[
                    "Reads directly from your connected systems",
                    "Shows confidence and reasoning, not just numbers",
                    "Defers to a human when the answer is unclear",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-2 w-1.5 h-1.5 bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: screenshot frame */}
              <div
                className="lg:col-span-8 order-1 lg:order-2 relative group"
                style={staggerStyle(2, showcaseVisible, { delay: 0.15, distance: 40 })}
              >
                <div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-primary/5 to-accent/20 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

                <div className="relative border border-primary/20 bg-card/60 backdrop-blur-sm p-2 sm:p-3 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.5)]">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-background/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                    </div>
                    <div className="text-mono text-[10px] sm:text-xs text-muted-foreground truncate px-3">
                      stratum.yourcompany.com
                    </div>
                    <div className="text-mono text-[10px] text-primary/60 hidden sm:block">LIVE</div>
                  </div>

                  <div className="relative overflow-hidden bg-background">
                    <img
                      src={stratumBrainScreenshot}
                      alt="STRATUM interface answering a plain-English query against live CRM data, with confidence and reasoning."
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-primary/10" />
                  </div>
                </div>

                <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-primary/60 pointer-events-none" />
              </div>
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
