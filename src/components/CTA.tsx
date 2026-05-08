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
              <span className="text-gradient">That is exactly what we are here for.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, isVisible)} />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8" style={staggerStyle(3, isVisible)}>
              Book a discovery call and we will walk through your operations together. No pressure, no pitch. Just a clear-eyed look at where your business can move faster.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6" style={staggerStyle(4, isVisible, { distance: 20 })}>
              <a
                href="https://cal.com/flow-theory-ai/alignment-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-none font-medium tracking-wide px-8 py-4 text-sm uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Book a Discovery Call
              </a>
              <a
                href="https://www.flowtheoryai.com"
                className="text-mono text-foreground/70 hover:text-primary transition-colors story-link"
              >
                www.flowtheoryai.com
              </a>
            </div>
          </div>

          <div className="w-full border border-border/30 bg-card/30 overflow-hidden" style={staggerStyle(5, isVisible, { distance: 20 })}>
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
