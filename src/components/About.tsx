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

  const formattedCount = end >= 1000 ? count.toLocaleString() : count;

  return <span>{prefix}{formattedCount}{suffix}</span>;
};

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden section-3">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-scale-section font-bold">
            Your <span className="text-gradient">AI Transformation</span> Partner.
          </h2>
          
          <p className="text-scale-sub text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We help businesses reclaim time and scale faster by turning everyday operations into intelligent systems. From workflow automation to AI integration, Flow Theory AI builds the foundation for long-term leverage and growth.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={stat.label}
                  className={`
                    group relative flex flex-col items-center p-8 rounded-2xl cursor-pointer
                    border transition-all duration-500 ease-out overflow-hidden
                    ${isActive 
                      ? 'border-primary/60 bg-primary/5' 
                      : 'border-border/40 hover:border-primary/30 bg-card/50'
                    }
                  `}
                  style={{ 
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.6s ease-out ${index * 0.15}s`
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`mb-4 p-4 rounded-xl transition-all duration-500
                      ${isActive ? 'bg-primary text-primary-foreground scale-110' : 'bg-primary/10 text-primary'}
                    `}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="text-5xl sm:text-6xl font-bold text-gradient mb-3">
                      {isVisible && (
                        <CountUp end={stat.value} suffix={stat.suffix} duration={2} prefix={stat.prefix || ""} />
                      )}
                    </div>

                    <span className={`text-xl font-semibold mb-3 transition-colors duration-300
                      ${isActive ? 'text-primary' : 'text-foreground'}
                    `}>
                      {stat.label}
                    </span>

                    <p className="text-sm text-muted-foreground text-center max-w-[220px]">
                      {stat.qualifier}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-muted-foreground pt-6 italic">
            Based on real client implementations and internal audits
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              asChild 
              size="lg" 
              className="group px-8 py-6 text-lg font-semibold glow transition-all duration-300"
            >
              <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                See Where You're Losing Time
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            
            <a 
              href="#case-studies" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium underline underline-offset-4"
            >
              See Case Studies
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
