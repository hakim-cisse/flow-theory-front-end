import { useEffect, useState } from "react";

const stats = [
  { value: 25, suffix: "+", label: "Average Hours Saved Weekly" },
  { value: 40, suffix: "%", label: "Reduced Lead Time" },
  { value: 100, suffix: "%", label: "Scalable Without Hiring" },
];

export const Results = () => {
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

    const element = document.getElementById("results");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="results" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            Transformation in <span className="text-gradient">Action</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-8 rounded-2xl glass text-center space-y-4 hover:bg-primary/5 transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl sm:text-6xl font-bold text-gradient">
                  {isVisible && (
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                  )}
                </div>
                <p className="text-lg text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl glass max-w-3xl mx-auto text-center">
            <blockquote className="text-xl text-muted-foreground italic leading-relaxed">
              "Flow Theory AI transformed how we operate. We've automated workflows that used to take hours and now focus on growth, not busywork."
            </blockquote>
            <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
