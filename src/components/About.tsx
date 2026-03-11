import { useEffect, useState } from "react";
import { Clock, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: 47, suffix: "+", label: "Hours Saved", icon: Clock, qualifier: "Per week across client workflows" },
  { value: 10000, suffix: "+", label: "Saved", icon: DollarSign, qualifier: "Average monthly cost reduction", prefix: "$" },
];

const CountUp = ({ end, suffix, duration, prefix = "" }: { end: number; suffix: string; duration: number; prefix?: string }) => {
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

  return <span>{prefix}{end >= 1000 ? count.toLocaleString() : count}{suffix}</span>;
};

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById("about");
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden section-3">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — editorial text */}
            <div className="space-y-8">
              <span className="text-mono text-primary/70">Why founders choose us</span>
              <h2 className="text-heading">
                You don't need <span className="text-gradient">more tools.</span><br />
                You need the right systems.
              </h2>
              <div className="accent-bar" />
              <p className="text-subheading text-muted-foreground leading-relaxed">
                We help businesses reclaim time and scale faster by turning everyday operations into intelligent systems. From workflow automation to AI integration, we build the foundation for long-term leverage and growth.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Button asChild size="lg" className="group px-8 py-6 font-semibold glow">
                  <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                    See Where You're Losing Time
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <a href="#case-studies" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium underline underline-offset-4 py-3">
                  See Case Studies
                </a>
              </div>
            </div>

            {/* Right — stats */}
            <div className="space-y-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative p-8 border border-border/40 bg-card/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.6s ease-out ${index * 0.2}s`
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-4xl sm:text-5xl font-bold text-gradient mb-1">
                          {isVisible && <CountUp end={stat.value} suffix={stat.suffix} duration={2} prefix={stat.prefix || ""} />}
                        </div>
                        <span className="text-lg font-semibold text-foreground">{stat.label}</span>
                        <p className="text-sm text-muted-foreground mt-1">{stat.qualifier}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-muted-foreground italic pl-2">
                Based on real client implementations and internal audits
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
