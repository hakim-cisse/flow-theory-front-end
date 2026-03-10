import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { TypewriterText } from "./TypewriterText";

const animatedPhrases = [
  "AI Transformation",
  "Automation & Integrations",
  "Custom AI Systems",
  "AI-First Deployment",
  "AI Training for Teams",
  "Ongoing Optimization",
];

export const Hero = () => {
  const scrollToCaseStudy = () => {
    const element = document.querySelector("#case-studies");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-1 pt-20 md:pt-0">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(193 100% 56% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(193 100% 56% / 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          {/* Case Study Link */}
          <button
            onClick={scrollToCaseStudy}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 text-sm text-primary hover:bg-primary/10 transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            <span>How we saved $96,000/year for a top apartment locator</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <h1 className="text-scale-hero font-bold tracking-tight">
            <span className="block text-foreground min-h-[1.2em]">
              <TypewriterText phrases={animatedPhrases} className="text-gradient" />
            </span>
            <span className="block text-foreground mt-2">Built on Strategy and ROI.</span>
          </h1>
          
          <p className="text-scale-sub text-muted-foreground max-w-3xl mx-auto">
            Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value.
          </p>

          <div className="flex justify-center items-center pt-4 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto group font-semibold px-8 py-6 text-lg glow transition-all duration-300"
              asChild
            >
              <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                Start Your AI Transformation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
