import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Users, TrendingUp, Clock } from "lucide-react";
import { TypewriterText } from "./TypewriterText";
import { useCountUp } from "@/hooks/useScrollAnimation";
import hero3d from "@/assets/hero-3d.png";

const animatedPhrases = [
  "AI Transformation",
  "Automations",
  "Custom AI Systems",
  "AI-First Deployment",
  "AI Training",
  "Optimization",
];

const stats = [
  { value: 125, suffix: "+", prefix: "", label: "Hours Saved", icon: Clock },
  { value: 96, suffix: "K", prefix: "$", label: "Annual Savings", icon: TrendingUp },
  { value: 15, suffix: "+", prefix: "", label: "Happy Clients", icon: Users },
];

export const Hero = () => {
  const scrollToCaseStudy = () => {
    const element = document.querySelector("#case-studies");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden section-1 pt-24 pb-12 md:pt-0 md:pb-0">
      {/* Background effects */}
      <div className="absolute -top-40 -right-40 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-primary/5 rounded-full blur-[120px] md:blur-[180px] animate-glow-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/3 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(193_100%_50%/0.05),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main hero grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
            {/* Left content */}
            <div className="animate-fade-in-up">
              {/* Tag */}
              <div className="mb-6 md:mb-8">
                <button
                  onClick={scrollToCaseStudy}
                  className="group inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary/80 hover:text-primary hover:border-primary/40 transition-all duration-300"
                >
                  <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider">Saved a locator $96K/yr</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
                </button>
              </div>

              {/* Headline */}
              <div className="space-y-2 mb-6 md:mb-8">
                <h1 className="text-display">
                  <span className="block text-foreground">Your business</span>
                  <span className="block text-foreground">runs on decisions.</span>
                  <span className="block mt-2 md:mt-3 min-h-[1.2em] overflow-hidden">
                    <TypewriterText phrases={animatedPhrases} className="text-gradient" />
                  </span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mt-2">that make them smarter.</p>
              </div>

              <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 md:mb-10 leading-relaxed">
                As a founder, you don't need more AI hype. You need a partner who discovers what actually matters, trains your team to own it, and delivers results you can measure.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="group font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full glow transition-all duration-300 w-full sm:w-auto"
                  asChild
                >
                  <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                    Book Your Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <button
                  onClick={scrollToCaseStudy}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium underline underline-offset-4 py-3 text-center sm:text-left"
                >
                  See founder results →
                </button>
              </div>
            </div>

            {/* Right — 3D visual */}
            <div className="relative flex items-center justify-center animate-fade-in-up order-first lg:order-last" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg mx-auto">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[60px] md:blur-[80px] animate-glow-pulse" />
                <img
                  src={hero3d}
                  alt="Abstract 3D AI visualization"
                  className="relative w-full h-auto animate-float"
                />

                {/* Floating badges — hidden on very small screens */}
                <div className="hidden sm:block absolute -top-4 -right-4 glass rounded-2xl px-3 sm:px-4 py-2 sm:py-3 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-medium text-foreground">AI-Powered</span>
                  </div>
                </div>

                <div className="hidden sm:block absolute -bottom-4 -left-4 glass rounded-2xl px-3 sm:px-4 py-2 sm:py-3 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">Real ROI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-10 lg:mt-24 grid grid-cols-3 gap-2 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const display = useCountUp(stat.value, 2, true, stat.prefix, stat.suffix);
              return (
                <div
                  key={stat.label}
                  className="group relative p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-gradient">{display}</div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
