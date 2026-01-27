import { useEffect, useState } from "react";
import { Clock, DollarSign } from "lucide-react";

const stats = [
  { value: 47, suffix: "+", label: "Hours Saved", icon: Clock, description: "Weekly time reclaimed through automation" },
  { value: 10000, suffix: "+", label: "Dollars Saved", icon: DollarSign, description: "Monthly cost reduction for our clients", prefix: "$" },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={stat.label}
                  className={`
                    group relative flex flex-col items-center p-8 rounded-2xl cursor-pointer
                    border bg-card/80 backdrop-blur-sm
                    transition-all duration-500 ease-out overflow-hidden
                    ${isActive 
                      ? 'border-primary shadow-[0_0_50px_hsl(var(--primary)/0.3)] scale-[1.02]' 
                      : 'border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]'
                    }
                  `}
                  style={{ 
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.6s ease-out ${index * 0.15}s`
                  }}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Animated background gradient */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10
                    transition-opacity duration-500
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                  `} />

                  {/* Animated border glow */}
                  <div className={`
                    absolute inset-0 rounded-2xl
                    transition-all duration-500
                    ${isActive ? 'animate-pulse' : ''}
                  `} style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, hsl(var(--primary) / 0.2), transparent, hsl(var(--primary) / 0.2))' 
                      : 'transparent'
                  }} />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Icon with animation */}
                    <div className={`
                      mb-4 p-4 rounded-xl transition-all duration-500
                      ${isActive 
                        ? 'bg-primary text-primary-foreground scale-110 rotate-3' 
                        : 'bg-primary/10 text-primary group-hover:scale-105'
                      }
                    `}>
                      <Icon className={`w-7 h-7 transition-transform duration-500 ${isActive ? 'animate-bounce' : ''}`} />
                    </div>

                    {/* Stat Value */}
                    <div className={`
                      text-5xl sm:text-6xl font-bold text-gradient mb-3
                      transition-transform duration-300
                      ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                    `}>
                      {isVisible && (
                        <CountUp 
                          end={stat.value} 
                          suffix={stat.suffix} 
                          duration={2}
                          prefix={stat.prefix || ""}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span className={`
                      text-xl font-semibold mb-3 transition-colors duration-300
                      ${isActive ? 'text-primary' : 'text-foreground'}
                    `}>
                      {stat.label}
                    </span>

                    {/* Description - Always visible */}
                    <p className="text-sm text-muted-foreground text-center max-w-[220px]">
                      {stat.description}
                    </p>
                  </div>

                  {/* Corner accents */}
                  <div className={`
                    absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-2xl
                    transition-all duration-500
                    ${isActive ? 'border-primary' : 'border-transparent group-hover:border-primary/30'}
                  `} />
                  <div className={`
                    absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-2xl
                    transition-all duration-500
                    ${isActive ? 'border-primary' : 'border-transparent group-hover:border-primary/30'}
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