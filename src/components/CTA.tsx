import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 sm:p-16 rounded-3xl glass glow text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Ready to work <span className="text-gradient">smarter</span>, not harder?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's identify how AI can revolutionize your business one system at a time.
            </p>

            <Button 
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary-glow hover:to-primary text-primary-foreground font-semibold px-10 py-7 text-xl glow transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://cal.com/hakim-cisse/alignment-call" target="_blank" rel="noopener noreferrer">
                Book Your Alignment Call
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
