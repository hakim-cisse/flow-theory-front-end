import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const stats = [
  { value: 47, suffix: "+", label: "Hours saved / week", qualifier: "Across client workflows" },
  { value: 3,  suffix: "x", label: "Average ROI",        qualifier: "Within the first 90 days" },
  { value: 90, suffix: "d", label: "To first result",    qualifier: "From kickoff to measurable impact" },
];

const CountUp = ({ end, suffix, duration }: { end: number; suffix: string; duration: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}{suffix}</span>;
};

export const About = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden section-3">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Editorial header row */}
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24 items-end">
            <div className="col-span-12 md:col-span-3" style={staggerStyle(0, isVisible)}>
              <span className="text-mono text-primary/70 block">№ 02 — The gap</span>
              <span className="text-mono text-foreground/40 mt-2 block">Built for startups &amp; SMBs</span>
            </div>

            <div className="col-span-12 md:col-span-9" style={staggerStyle(1, isVisible)}>
              <h2 className="text-display leading-[0.95]">
                Fragmented tools.{" "}
                <span className="italic text-primary font-light">No time to fix them.</span>
              </h2>
            </div>
          </div>

          {/* Pull quote + CTA */}
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-20 md:mb-28 items-start">
            <div className="hidden md:block md:col-span-3">
              <div className="accent-bar" style={staggerStyle(2, isVisible)} />
            </div>
            <div className="col-span-12 md:col-span-6" style={staggerStyle(3, isVisible)}>
              <p className="text-italic-accent text-2xl md:text-3xl leading-snug text-foreground/90">
                We design the AI system.<br />
                <span className="text-foreground/55">You run the business.</span>
              </p>
            </div>
            <div className="col-span-12 md:col-span-3 md:text-right" style={staggerStyle(4, isVisible)}>
              <Button asChild size="lg" className="group rounded-none uppercase text-xs tracking-wider px-6 py-5">
                <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                  Book intro
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          {/* Stat strip */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 border-t border-border/60"
            style={staggerStyle(5, isVisible)}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 md:py-10 ${i > 0 ? "md:border-l border-border/60 md:pl-8" : "md:pr-8"} ${i < stats.length - 1 ? "border-b md:border-b-0 border-border/60" : ""}`}
              >
                <div className="text-mono text-foreground/40 mb-3">0{i + 1}</div>
                <div className="font-display text-5xl md:text-6xl text-foreground tracking-tight leading-none mb-3">
                  {isVisible && <CountUp end={stat.value} suffix={stat.suffix} duration={1.6} />}
                </div>
                <div className="text-foreground font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.qualifier}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
