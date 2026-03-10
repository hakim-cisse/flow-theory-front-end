import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { TypewriterText } from "./TypewriterText";

const animatedPhrases = [
  "AI Transformation",
  "Automations/Integrations",
  "Custom AI Systems",
  "AI-First Deployment",
  "AI Training for Teams",
  "Ongoing Optimization",
];

export const Hero = () => {
  const scrollToCaseStudy = () => {
    const element = document.querySelector("#case-studies");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden section-1 pt-20 md:pt-0">
      {/* Vertical accent line */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      
      {/* Corner glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-glow-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          {/* Mono label */}
          <div className="mb-8">
            <button
              onClick={scrollToCaseStudy}
              className="group inline-flex items-center gap-3 text-mono text-primary/70 hover:text-primary transition-colors duration-300"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>We saved a top apartment locator $96K/year</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Main headline — asymmetric, massive */}
          <div className="space-y-4 mb-12">
            <h1 className="text-display">
              <span className="block text-foreground">Your business runs</span>
              <span className="block text-foreground">on decisions.</span>
              <span className="block text-foreground mt-2">We deliver</span>
              <span className="block mt-2">
                <TypewriterText phrases={animatedPhrases} className="text-gradient" />
              </span>
              <span className="block text-foreground text-[0.4em] mt-1 opacity-70">that make them smarter</span>
            </h1>
          </div>

          <div className="accent-bar mb-8" />

          <p className="text-subheading text-muted-foreground max-w-2xl mb-12">
            As a founder, you don't need more AI hype. You need a partner who discovers what actually matters, trains your team to own it, and delivers results you can measure.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button 
              size="lg" 
              className="group font-semibold px-8 py-6 text-base glow transition-all duration-300"
              asChild
            >
              <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                Book Your Discovery Call
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <button
              onClick={scrollToCaseStudy}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium underline underline-offset-4 py-3"
            >
              See founder results →
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
