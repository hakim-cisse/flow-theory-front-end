import { useState, useRef, useEffect } from "react";
import { Building2, HeartPulse, ShoppingCart, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accentColor: "text-blue-400",
    accentBg: "bg-blue-500",
    problem: "Automating deal flow, underwriting, and investor operations.",
    highlights: [
      "Lead intake + deduplication systems",
      "ARV / CMA tools and deal analysis workflows",
      "Pipeline and disposition acceleration",
    ],
    stat: "3x",
    statLabel: "Faster Deal Flow",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500",
    problem: "Reducing administrative burden and improving patient flow.",
    highlights: [
      "Intake + scheduling automation",
      "Data organization and internal workflows",
      "Compliance-ready reporting systems",
    ],
    stat: "60%",
    statLabel: "Less Admin Time",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accentColor: "text-orange-400",
    accentBg: "bg-orange-500",
    problem: "Scaling operations beyond manual processes.",
    highlights: [
      "Order and fulfillment automation",
      "Customer lifecycle + retention systems",
      "AI-powered support and routing",
    ],
    stat: "40%",
    statLabel: "Cost Reduction",
  },
  {
    icon: Users,
    title: "Recruitment",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accentColor: "text-violet-400",
    accentBg: "bg-violet-500",
    problem: "Streamlining candidate pipelines and placements.",
    highlights: [
      "Candidate screening + outreach automation",
      "CRM and workflow optimization",
      "Interview scheduling systems",
    ],
    stat: "5x",
    statLabel: "Placements / Month",
  },
];

export const Industries = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.1 });

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, industries.length - 1));
    setActiveIndex(clamped);
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[clamped] as HTMLElement;
    if (card) {
      const scrollLeft = card.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  // Sync active index on manual scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(container.children) as HTMLElement[];
      const containerLeft = container.scrollLeft + container.offsetWidth / 3;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - containerLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const active = industries[activeIndex];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden section-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-16">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              Where we operate
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-heading max-w-3xl" style={staggerStyle(1, headerVisible)}>
                  Industries We<br />
                  <span className="text-gradient">Specialize In</span>
                </h2>
                <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
              </div>
              {/* Navigation arrows - desktop */}
              <div
                className="hidden lg:flex items-center gap-3"
                style={staggerStyle(2, headerVisible)}
              >
                <button
                  onClick={() => scrollTo(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo(activeIndex + 1)}
                  disabled={activeIndex === industries.length - 1}
                  className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8" style={staggerStyle(3, headerVisible)}>
              We design systems and automation tailored to how each industry actually operates.
            </p>
          </div>

          {/* Horizontal scroll cards */}
          <div
            ref={cardsRef}
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {industries.map((industry, i) => {
                const Icon = industry.icon;
                const isActive = activeIndex === i;

                return (
                  <motion.div
                    key={industry.title}
                    onClick={() => scrollTo(i)}
                    className={cn(
                      "relative flex-shrink-0 w-[300px] sm:w-[340px] rounded-2xl border cursor-pointer snap-start overflow-hidden transition-all duration-500",
                      isActive
                        ? "border-primary/30 bg-card"
                        : "border-border/20 bg-card/60 hover:border-border/40"
                    )}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient background */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
                      industry.gradient,
                      isActive && "opacity-100"
                    )} />

                    <div className="relative z-10 p-7 sm:p-8 flex flex-col h-full min-h-[340px]">
                      {/* Icon + Title */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                          isActive
                            ? `${industry.accentBg} text-white`
                            : "bg-primary/10 text-primary"
                        )}>
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <h3 className={cn(
                          "text-lg font-bold transition-colors duration-300",
                          isActive ? industry.accentColor : "text-foreground"
                        )}>
                          {industry.title}
                        </h3>
                      </div>

                      {/* Stat */}
                      <div className="mb-5">
                        <span className={cn(
                          "text-4xl font-bold tracking-tight transition-colors duration-300",
                          isActive ? industry.accentColor : "text-foreground/20"
                        )}>
                          {industry.stat}
                        </span>
                        <span className="text-xs text-muted-foreground block mt-1 uppercase tracking-wider">
                          {industry.statLabel}
                        </span>
                      </div>

                      {/* Problem */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {industry.problem}
                      </p>

                      {/* Highlights */}
                      <div className="mt-auto space-y-2.5">
                        {industry.highlights.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-2.5 text-sm">
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 transition-colors duration-300",
                              isActive ? industry.accentBg : "bg-muted-foreground/30"
                            )} />
                            <span className="text-muted-foreground">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active indicator line */}
                    <div className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500",
                      isActive ? industry.accentBg : "bg-transparent"
                    )} />
                  </motion.div>
                );
              })}
            </div>

            {/* Dots + mobile nav */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {industries.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    activeIndex === i
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
          </div>

          <p
            className="text-center text-xs text-muted-foreground/50 mt-10 tracking-wide"
            style={staggerStyle(5, cardsVisible)}
          >
            Don't see your industry? We focus on operational complexity, not labels.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
