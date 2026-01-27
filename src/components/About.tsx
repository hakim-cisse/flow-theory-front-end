import { useEffect, useState } from "react";
import { Clock, TrendingDown, Rocket } from "lucide-react";

const stats = [
  { value: 47, suffix: "+", label: "Hours Saved", icon: Clock, description: "Weekly time reclaimed through automation" },
  { value: 38.5, suffix: "%", label: "Lead Time", icon: TrendingDown, description: "Faster project delivery cycles" },
  { value: 100, suffix: "%", label: "Scalable", icon: Rocket, description: "Growth without additional headcount" },
];

const CountUp = ({ end, suffix, duration, decimals = 0 }: { end: number; suffix: string; duration: number; decimals?: number }) => {
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
        setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration, decimals]);

  return <span>{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>;
};

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Your <span className="text-gradient">AI Transformation</span> Partner.
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We help businesses reclaim time and scale faster by turning everyday operations into intelligent systems. From workflow automation to AI integration, Flow Theory AI builds the foundation for long-term leverage and growth.
          </p>

          {/* Interactive Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={stat.label}
                  className={`
                    group relative flex flex-col items-center p-8 rounded-2xl cursor-pointer
                    border border-border/50 bg-card/50 backdrop-blur-sm
                    transition-all duration-500 ease-out
                    ${isHovered ? 'scale-105 border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)]' : 'hover:border-primary/30'}
                  `}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.6s ease-out ${index * 0.1}s`
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Icon */}
                  <div className={`
                    mb-4 p-3 rounded-xl transition-all duration-300
                    ${isHovered ? 'bg-primary text-primary-foreground scale-110' : 'bg-primary/10 text-primary'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Stat Value */}
                  <div className="text-5xl sm:text-6xl font-bold text-gradient mb-2">
                    {isVisible && (
                      <CountUp 
                        end={stat.value} 
                        suffix={stat.suffix} 
                        duration={2} 
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span className="text-xl font-semibold text-foreground mb-2">{stat.label}</span>

                  {/* Description - Shows on hover */}
                  <p className={`
                    text-sm text-muted-foreground text-center max-w-[200px]
                    transition-all duration-300
                    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                  `}>
                    {stat.description}
                  </p>

                  {/* Glow effect on hover */}
                  <div className={`
                    absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent
                    transition-opacity duration-300 pointer-events-none
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                  `} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};