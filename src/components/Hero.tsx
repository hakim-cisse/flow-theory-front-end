import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background"></div>
      </div>

      {/* Animated Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-foreground">Become an</span>
            <span className="block text-gradient mt-2">AI-First Business.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Flow Theory AI helps small and growing companies evolve from manual operations to intelligent, automated ecosystems that give you the speed, focus, and leverage of the future.
          </p>

          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Stop working harder. Start working smarter with systems that think, act, and adapt alongside you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary-glow hover:to-primary text-primary-foreground font-semibold px-8 py-6 text-lg glow transition-all duration-300"
              asChild
            >
              <a href="https://cal.com/hakim-cisse/alignment-call" target="_blank" rel="noopener noreferrer">
                Start Your AI Transformation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary font-semibold px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <a href="https://cal.com/hakim-cisse/alignment-call" target="_blank" rel="noopener noreferrer">
                See How It Works
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};
