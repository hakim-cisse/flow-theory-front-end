import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

export const CTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="cta" className="py-24 sm:py-32 relative overflow-hidden section-9">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, isVisible)}>Let's talk</span>
            <h2 className="text-heading" style={staggerStyle(1, isVisible)}>
              Not sure where to start?<br />
              <span className="text-gradient">That's exactly what we're here for.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, isVisible)} />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8" style={staggerStyle(3, isVisible)}>
              Book a discovery call and we'll walk through your operations together. No pressure, no pitch — just a clear-eyed look at where your business can move faster.
            </p>
          </div>

          <div className="w-full border border-border/30 bg-card/30 overflow-hidden" style={staggerStyle(4, isVisible, { distance: 20 })}>
            <div className="aspect-[3/4] sm:aspect-[16/10] lg:aspect-[16/9]">
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
