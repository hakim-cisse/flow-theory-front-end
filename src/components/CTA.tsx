export const CTA = () => {
  return (
    <section id="cta" className="py-24 sm:py-32 relative overflow-hidden section-9">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-mono text-primary/70 block mb-6">Let's talk</span>
            <h2 className="text-heading">
              Ready to stop guessing<br />
              <span className="text-gradient">and start building?</span>
            </h2>
            <div className="accent-bar mt-6" />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8">
              Book a 30-minute alignment call. We'll identify how AI can create real leverage in your business — no pitch, just clarity.
            </p>
          </div>

          <div className="w-full aspect-[16/9] sm:aspect-[16/10] lg:aspect-[16/9] border border-border/30 bg-card/30 overflow-hidden">
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
    </section>
  );
};
