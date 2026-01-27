import { useEffect, useState } from "react";

const stats = [
  { value: 40, suffix: "+", label: "Hours Saved", sublabel: "Weekly" },
  { value: 40, suffix: "%", label: "Lead Time", sublabel: "Reduced" },
  { value: 100, suffix: "%", label: "Scalable", sublabel: "Without Hiring" },
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
  const [isVisible, setIsVisible] = useState(false);

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
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Your <span className="text-gradient">AI Transformation</span> Partner.
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We help businesses reclaim time and scale faster by turning everyday operations into intelligent systems. From workflow automation to AI integration, Flow Theory AI builds the foundation for long-term leverage and growth.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient tracking-tight">
                    {isVisible && (
                      <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg sm:text-xl font-semibold text-foreground">{stat.label}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.sublabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};