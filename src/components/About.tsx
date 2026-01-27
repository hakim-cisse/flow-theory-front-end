import { useEffect, useState } from "react";

const stats = [
  { value: 25, suffix: "+", label: "Average Hours Saved Weekly" },
  { value: 40, suffix: "%", label: "Reduced Lead Time" },
  { value: 100, suffix: "%", label: "Scalable Without Hiring" },
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group flex flex-col items-center space-y-4 p-6 rounded-2xl glass hover:bg-primary/5 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-gradient">
                  {isVisible && (
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                  )}
                </div>
                <span className="text-lg font-semibold text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};