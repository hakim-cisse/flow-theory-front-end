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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 md:pt-0">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up">
          {/* Case Study Link */}
          <button
            onClick={scrollToCaseStudy}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary hover:bg-primary/20 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 animate-[slideInDown_0.6s_ease-out_0.3s_both]"
          >
            <FileText className="w-4 h-4 group-hover:rotate-6 transition-transform duration-300" />
            <span>How we saved $96,000 a year for one of the largest apartment locators in the U.S.</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-foreground min-h-[1.2em]">
              <TypewriterText phrases={animatedPhrases} className="text-gradient" />
            </span>
            <span className="block text-foreground mt-1 sm:mt-2">Built on Strategy and ROI.</span>
          </h1>
          
          <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value.
          </p>

          <div className="flex justify-center items-center pt-2 sm:pt-4 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto group bg-gradient-to-r from-primary to-primary/80 hover:from-primary-glow hover:to-primary text-primary-foreground font-semibold px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg glow transition-all duration-300"
              asChild
            >
              <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                Start Your AI Transformation
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
