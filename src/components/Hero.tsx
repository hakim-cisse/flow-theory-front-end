import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import flowTheoryLogo from "@/assets/flow-theory-logo.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Logo in top left */}
      <img 
        src={flowTheoryLogo} 
        alt="Flow Theory AI Logo" 
        className="absolute top-4 left-4 w-12 h-12 sm:top-8 sm:left-8 sm:w-20 sm:h-20 z-20"
      />
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up pt-12 sm:pt-0">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-foreground">Become an</span>
            <span className="block text-gradient mt-1 sm:mt-2">AI-First Business.</span>
          </h1>
          
          <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Flow Theory AI helps small and growing companies evolve from manual operations to intelligent, automated ecosystems that give you the speed, focus, and leverage of the future.
          </p>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 max-w-2xl mx-auto px-2">
            Stop working harder. Start working smarter with systems that think, act, and adapt alongside you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto group bg-gradient-to-r from-primary to-primary/80 hover:from-primary-glow hover:to-primary text-primary-foreground font-semibold px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg glow transition-all duration-300"
              asChild
            >
              <a href="https://cal.com/hakim-cisse/alignment-call" target="_blank" rel="noopener noreferrer">
                Start Your AI Transformation
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary font-semibold px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <a href="https://cal.com/hakim-cisse/alignment-call" target="_blank" rel="noopener noreferrer">
                See How It Works
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
