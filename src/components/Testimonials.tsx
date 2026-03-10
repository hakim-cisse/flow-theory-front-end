import { Play } from "lucide-react";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden section-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <Play className="w-4 h-4" />
              Client Testimonial
            </div>
            <h2 className="text-scale-section font-bold">
              Hear From Our <span className="text-gradient">Clients</span>
            </h2>
            <p className="text-scale-sub text-muted-foreground max-w-2xl mx-auto">
              Real results from real businesses. See how Flow Theory AI transformed operations for our partners.
            </p>
          </div>

          <div className="relative pt-8">
            <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-card/50">
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
          </div>

          <div className="pt-8">
            <blockquote className="text-xl sm:text-2xl font-medium text-foreground italic">
              "Flow Theory AI did a great job helping us integrate our CRM and improve our overall business efficiency. We would definitely recommend them to other tech-oriented businesses."
            </blockquote>
            <p className="mt-4 text-muted-foreground">— Empower Estates Network</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
