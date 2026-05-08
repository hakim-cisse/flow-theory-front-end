import { useEffect, useState } from "react";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const stats = [
  { value: 47, suffix: "+", label: "Hours saved / week" },
  { value: 3,  suffix: "x", label: "Average ROI in 90 days" },
  { value: 90, suffix: "d", label: "To first measurable result" },
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
        <div className="max-w-5xl mx-auto">
          {/* Mission statement */}
          <span className="text-mono text-primary/70 block mb-6">Our mission</span>
          <p
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-foreground/85"
            style={staggerStyle(0, isVisible)}
          >
            We transform how businesses operate —{" "}
            <span className="italic text-primary font-light">starting with an honest look</span>
            {" "}at how they work today.
          </p>
          <p className="mt-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed" style={staggerStyle(1, isVisible)}>
            Most consultants start by selling you tools. We start by understanding your operations. That means sitting with your team, mapping your workflows, and finding where time and money are quietly leaking — before we ever recommend a solution.
          </p>

          {/* Stat strip */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 border-t border-border/60 mt-20 md:mt-28"
            style={staggerStyle(1, isVisible)}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 md:py-10 ${i > 0 ? "md:border-l border-border/60 md:pl-8" : "md:pr-8"} ${i < stats.length - 1 ? "border-b md:border-b-0 border-border/60" : ""}`}
              >
                <div className="font-display text-5xl md:text-6xl text-foreground tracking-tight leading-none mb-3">
                  {isVisible && <CountUp end={stat.value} suffix={stat.suffix} duration={1.6} />}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
