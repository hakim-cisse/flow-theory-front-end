import { Play } from "lucide-react";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden section-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="text-mono text-primary/70 block mb-6">
              <Play className="w-3.5 h-3.5 inline mr-2" />
              Client Testimonial
            </span>
            <h2 className="text-heading">
              Founders <span className="text-gradient">talk back.</span>
            </h2>
            <div className="accent-bar mt-6" />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8">
              Real results from real businesses. See how Flow Theory AI transformed operations for our partners.
            </p>
          </div>

          <div className="border border-border/30 bg-card/30">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/Xq-JeAsenKM"
                title="Real Estate Startup Boosts Efficiency with Flow Theory AI | Client Testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-8 sm:mt-12 border-l-2 border-primary/40 pl-6 sm:pl-8">
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-foreground italic leading-relaxed">
              "Flow Theory AI did a great job helping us integrate our CRM and improve our overall business efficiency. We would definitely recommend them to other tech-oriented businesses."
            </blockquote>
            <p className="mt-4 text-mono text-muted-foreground">— Empower Estates Network</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
