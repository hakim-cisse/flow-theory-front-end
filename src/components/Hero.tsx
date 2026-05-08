import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

export const Hero = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const scrollToCaseStudy = () => {
    const element = document.querySelector("#case-studies");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden section-1 pt-24 md:pt-20 pb-16">
      {/* Vertical hairline */}
      <div className="hidden md:block absolute left-12 lg:left-20 top-24 bottom-16 w-px bg-foreground/15" />
      <div className="hidden md:block absolute right-12 lg:right-20 top-24 bottom-16 w-px bg-foreground/15" />

      <div ref={ref} className="relative z-10 container mx-auto px-6 md:px-20 lg:px-28 max-w-[1600px]">
        {/* Top meta row — featured case study only */}
        <div
          className="flex justify-end mb-12 md:mb-20"
          style={staggerStyle(0, isVisible, { delay: 0.1, distance: 16 })}
        >
          <button
            onClick={scrollToCaseStudy}
            className="group inline-flex items-center gap-2 text-mono text-primary story-link"
          >
            <FileText className="w-3 h-3" />
            <span>Featured: $96K saved · APT Locator</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Editorial main grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Headline */}
          <div className="col-span-12 lg:col-span-9" style={staggerStyle(1, isVisible, { delay: 0.15, duration: 0.9, distance: 40 })}>
            <h1 className="text-display text-foreground">
              <span className="block">Smarter operations.</span>
              <span className="block italic text-primary" style={{ fontWeight: 300 }}>
                Built around you.
              </span>
            </h1>
          </div>

          {/* Right rail — editorial side note */}
          <aside
            className="col-span-12 lg:col-span-3 lg:pt-6"
            style={staggerStyle(2, isVisible, { delay: 0.25, distance: 20 })}
          >
            <div className="accent-bar mb-5" />
            <p className="text-italic-accent text-lg md:text-xl leading-snug text-foreground/85">
              We design, build, and scale systems that move the bottom line.
            </p>
          </aside>
        </div>

        {/* Bottom meta + CTAs */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mt-16 md:mt-24 items-end">
          <div className="col-span-12 md:col-span-7" style={staggerStyle(3, isVisible, { delay: 0.3, distance: 20 })}>
            <p className="text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed">
              We analyze how your business runs today, identify exactly where automation creates leverage, and build systems your team will actually use.
            </p>
          </div>

          <div
            className="col-span-12 md:col-span-5 flex flex-col sm:flex-row md:justify-end items-start sm:items-center gap-5"
            style={staggerStyle(4, isVisible, { delay: 0.35, distance: 20 })}
          >
            <Button
              size="lg"
              className="group rounded-none font-medium tracking-wide px-8 py-6 text-sm uppercase"
              asChild
            >
              <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                Book a Discovery Call
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <button
              onClick={scrollToCaseStudy}
              className="text-mono text-foreground/70 hover:text-primary transition-colors story-link"
            >
              Explore Our Work →
            </button>
          </div>
        </div>

        {/* Footer of hero */}
        <div className="mt-12 md:mt-16 pt-6 border-t border-foreground/15 flex items-center justify-between text-mono text-foreground/45">
          <span>Strategy / Systems / Impact</span>
          <span className="hidden md:inline">Scroll ↓</span>
          <span>v.2026</span>
        </div>
      </div>
    </section>
  );
};
