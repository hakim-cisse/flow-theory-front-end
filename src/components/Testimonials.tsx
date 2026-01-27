import { Play } from "lucide-react";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Play className="w-4 h-4" />
              Client Testimonial
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Hear From Our <span className="text-gradient">Clients</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real businesses. See how Flow Theory AI transformed operations for our partners.
            </p>
          </div>

          {/* Video Container */}
          <div className="relative pt-8">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm shadow-[0_0_60px_hsl(var(--primary)/0.1)]">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Video embed with responsive aspect ratio for vertical video */}
              <div className="relative w-full" style={{ paddingBottom: '120.54%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Xq-JeAsenKM"
                  title="Real Estate Startup Boosts Efficiency with Flow Theory AI | Client Testimonial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
          </div>

          {/* Optional quote highlight */}
          <div className="pt-8">
            <blockquote className="text-xl sm:text-2xl font-medium text-foreground italic">
              "Flow Theory AI transformed how we handle our operations—saving us countless hours every week."
            </blockquote>
            <p className="mt-4 text-muted-foreground">— Apt Locator Team</p>
          </div>
        </div>
      </div>
    </section>
  );
};
