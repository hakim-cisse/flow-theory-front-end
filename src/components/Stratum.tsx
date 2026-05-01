import { Plug, BookOpen, Network, BrainCircuit, Bot, Infinity as InfinityIcon, ServerOff, Rocket, KeyRound, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import stratumBrainScreenshot from "@/assets/stratum-brain-screenshot.png";

const layers = [
  {
    n: "01",
    icon: Plug,
    title: "Data Connections",
    description:
      "Stratum connects directly to the tools you already use — calendars, project management, banking, CRM. No migration. No new database. Your data stays where it lives.",
  },
  {
    n: "02",
    icon: BookOpen,
    title: "Business Intelligence Layer",
    description:
      "A living knowledge base that learns your business: your rules, your context, your language. This is what makes Stratum understand your business — not just any business.",
  },
  {
    n: "03",
    icon: Network,
    title: "Unified Automation Ecosystem",
    description:
      "A connected ecosystem of automations that share context with each other. Every workflow knows what the others are doing — eliminating conflicts, duplication, and the chaos of isolated tools.",
  },
  {
    n: "04",
    icon: BrainCircuit,
    title: "Stratum Brain",
    description:
      'The centerpiece. Query your business in plain English: "What\'s our cash runway?", "Which clients haven\'t had contact in 30 days?", "Which proposals are stalled?" Instant answers from live data. No analysts. No dashboards to learn.',
    highlight: true,
  },
  {
    n: "05",
    icon: Bot,
    title: "Agents",
    description:
      "Autonomous processes that take action across your connected tools on behalf of your business. Not just answers — outcomes.",
  },
  {
    n: "06",
    icon: InfinityIcon,
    title: "Compounding Intelligence",
    description:
      "Every automation, connection, and agent added makes the entire system smarter. Intelligence compounds. The longer you run Stratum, the more valuable it becomes.",
  },
];

const benefits = [
  {
    icon: ServerOff,
    title: "No infrastructure headaches",
    description:
      "No servers, no complex dependencies. Built to be maintained and expanded without technical overhead on your side.",
  },
  {
    icon: Rocket,
    title: "ROI before full deployment",
    description:
      "Engagements start with targeted quick wins in weeks 1–6, before the full framework is even introduced.",
  },
  {
    icon: KeyRound,
    title: "You own everything",
    description:
      "Every automation, every integration, every workflow. No lock-in to Flow Theory AI. Ever.",
  },
];

export const Stratum = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: stackRef, isVisible: stackVisible } = useScrollReveal({ threshold: 0.05 });
  const { ref: showcaseRef, isVisible: showcaseVisible } = useScrollReveal({ threshold: 0.15 });
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="stratum" className="py-24 sm:py-32 relative overflow-hidden section-6">
      {/* Ambient background */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-20 max-w-4xl">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              Introducing Stratum
            </span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              Our proprietary framework.<br />
              <span className="text-gradient">Built to compound, not to break.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
            <p className="text-subheading text-muted-foreground leading-relaxed mt-8" style={staggerStyle(3, headerVisible)}>
              Stratum is Flow Theory AI's AI transformation framework, designed exclusively for startups and SMBs.
              No complex infrastructure. No servers. No technical debt. Everything runs through one intelligent,
              modular system that grows with your business.
            </p>
          </div>

          {/* Stacked layers */}
          <div ref={stackRef} className="relative">
            {/* Vertical connecting line */}
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
                // Each layer offsets slightly to the right to create a "building upward" stair feel
                const offset = i * 16;

                return (
                  <div
                    key={layer.n}
                    className="relative group"
                    style={{
                      ...staggerStyle(i, stackVisible, { delay: 0.12, distance: 30 }),
                      paddingLeft: `clamp(0px, ${offset}px, ${offset}px)`,
                    }}
                  >
                    <div
                      className={`relative flex flex-col sm:flex-row items-start gap-5 sm:gap-7 p-6 sm:p-8 border bg-card/40 backdrop-blur-sm transition-all duration-500 ${
                        layer.highlight
                          ? "border-primary/40 bg-primary/[0.04] shadow-[0_0_40px_-15px_hsl(var(--primary)/0.4)]"
                          : "border-border/40 hover:border-primary/30 hover:bg-primary/[0.02]"
                      }`}
                    >
                      {/* Number + icon column */}
                      <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3 shrink-0 sm:w-20">
                        <span className={`text-mono text-xs ${layer.highlight ? "text-primary" : "text-primary/50"}`}>
                          {layer.n}
                        </span>
                        <div
                          className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                            layer.highlight
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary group-hover:bg-primary/20"
                          }`}
                        >
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3
                            className={`text-xl sm:text-2xl font-bold transition-colors ${
                              layer.highlight ? "text-gradient" : "text-foreground group-hover:text-primary"
                            }`}
                          >
                            {layer.title}
                          </h3>
                          {layer.highlight && (
                            <span className="text-mono text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20">
                              The centerpiece
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {layer.description}
                        </p>
                      </div>

                      {/* Right edge accent */}
                      <div
                        className={`absolute right-0 top-0 bottom-0 w-1 transition-all duration-500 ${
                          layer.highlight ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stratum Brain in action — screenshot showcase */}
          <div ref={showcaseRef} className="mt-28 sm:mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div
                  className="inline-flex items-center gap-2 text-mono text-xs text-primary/80 border border-primary/20 bg-primary/5 px-3 py-1.5 mb-6"
                  style={staggerStyle(0, showcaseVisible)}
                >
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                  Live demo
                </div>
                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5"
                  style={staggerStyle(1, showcaseVisible)}
                >
                  Ask your business <span className="text-gradient">anything</span>.
                </h3>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={staggerStyle(2, showcaseVisible)}
                >
                  This is the Stratum Brain — querying live ClickUp CRM data in plain English.
                  No dashboards. No analysts. No exports. Just answers, with the receipts.
                </p>
                <ul className="space-y-3" style={staggerStyle(3, showcaseVisible)}>
                  {[
                    "Reads directly from your connected tools",
                    "Shows confidence + reasoning, not just numbers",
                    "Trained on your business — not a generic LLM",
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
                {/* Glow */}
                <div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-primary/5 to-accent/20 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

                {/* Frame */}
                <div className="relative border border-primary/20 bg-card/60 backdrop-blur-sm p-2 sm:p-3 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.5)]">
                  {/* Faux browser chrome */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-background/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                    </div>
                    <div className="text-mono text-[10px] sm:text-xs text-muted-foreground truncate px-3">
                      stratum.flowtheoryai.com
                    </div>
                    <div className="text-mono text-[10px] text-primary/60 hidden sm:block">LIVE</div>
                  </div>

                  {/* Screenshot */}
                  <div className="relative overflow-hidden bg-background">
                    <img
                      src={stratumBrainScreenshot}
                      alt="Stratum Brain interface showing a live query against ClickUp CRM data with answer, confidence rating, and reasoning."
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-primary/10" />
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-primary/60 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Benefits row */}
          <div ref={benefitsRef} className="mt-24">
            <div className="text-center mb-12" style={staggerStyle(0, benefitsVisible)}>
              <span className="text-mono text-primary/70">Why it works for you</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="group p-8 bg-background hover:bg-primary/5 transition-all duration-500"
                    style={staggerStyle(i + 1, benefitsVisible, { delay: 0.1 })}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300 mb-5">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center" style={staggerStyle(4, benefitsVisible)}>
              <Button asChild size="lg" className="group px-8 py-6 font-semibold glow">
                <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                  See Stratum in Action
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
