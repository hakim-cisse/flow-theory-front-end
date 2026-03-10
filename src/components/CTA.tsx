import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import hero3d from "@/assets/hero-3d.png";

export const CTA = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="cta" className="py-24 sm:py-32 relative overflow-hidden section-9">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(193_100%_50%/0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className="max-w-5xl mx-auto"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out',
          }}
        >
          {/* CTA card */}
          <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card/50 to-primary/10 p-8 sm:p-12 lg:p-16 overflow-hidden">
            {/* Decorative image */}
            <img
              src={hero3d}
              alt=""
              className="absolute -right-20 -top-20 w-64 h-64 opacity-20 blur-sm pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-mono text-primary/80 mb-8">
                ✨ AI-Powered
              </span>
              <h2 className="text-heading mb-6">
                Ready to Maximize<br />
                <span className="text-gradient">Your Profits?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Book a 30-minute alignment call. We'll identify how AI can create real leverage in your business — no pitch, just clarity.
              </p>
              <Button asChild size="lg" className="rounded-full px-10 py-6 text-base font-semibold glow">
                <a href="https://cal.com/flow-theory-ai/alignment-call" target="_blank" rel="noopener noreferrer">
                  Try AI Tools
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Calendar embed */}
          <div className="mt-8 w-full rounded-2xl border border-border/30 bg-card/30 overflow-hidden">
            <div className="aspect-[16/9] sm:aspect-[16/10] lg:aspect-[16/9]">
              <iframe
                src="https://cal.com/flow-theory-ai/alignment-call"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book Your Alignment Call"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
