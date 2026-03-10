import { Play, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden section-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
            {/* Left — heading + video */}
            <div
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out',
              }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-mono text-primary/80 mb-4 sm:mb-6">
                <Play className="w-3.5 h-3.5 inline mr-2" />
                Testimonials
              </span>
              <h2 className="text-heading">
                Future of <span className="text-gradient">Efficiency</span> is Here
              </h2>

              {/* Video */}
              <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-border/30 bg-card/30 overflow-hidden">
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
            </div>

            {/* Right — testimonial quotes */}
            <div
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out 0.3s',
              }}
            >
              <div className="rounded-xl sm:rounded-2xl border border-border/30 bg-card/30 p-6 sm:p-8 lg:p-10">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/30 mb-4 sm:mb-6" />
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground leading-relaxed mb-6 sm:mb-8">
                  "Flow Theory AI did a great job helping us integrate our CRM and improve our overall business efficiency. We would definitely recommend them to other tech-oriented businesses."
                </blockquote>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-base sm:text-lg">E</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">Empower Estates Network</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Real Estate Technology</p>
                  </div>
                </div>
              </div>

              {/* Additional mini testimonial */}
              <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-border/30 bg-card/30 p-5 sm:p-6">
                <p className="text-muted-foreground italic text-xs sm:text-sm leading-relaxed">
                  "Using this has transformed the way we work. Tasks that used to take hours now complete in minutes. It's a game-changer for our team."
                </p>
                <div className="mt-3 sm:mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-xs">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">APT Locator</p>
                    <p className="text-xs text-muted-foreground">Business Strategist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
