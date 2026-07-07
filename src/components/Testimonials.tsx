import { Play } from "lucide-react";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden section-7">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, isVisible)}>
              <Play className="w-3.5 h-3.5 inline mr-2" />
              {t("testimonials.eyebrow")}
            </span>
            <h2 className="text-heading" style={staggerStyle(1, isVisible)}>
              {t("testimonials.titleA")} <span className="text-gradient">{t("testimonials.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, isVisible)} />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8" style={staggerStyle(3, isVisible)}>
              {t("testimonials.intro")}
            </p>
          </div>

          <div className="border border-border/30 bg-card/30" style={staggerStyle(4, isVisible, { distance: 20 })}>
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

          <div className="mt-8 sm:mt-12 border-l-2 border-primary/40 pl-6 sm:pl-8" style={staggerStyle(5, isVisible, { distance: 20 })}>
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-foreground italic leading-relaxed">
              &ldquo;{t("testimonials.quote")}&rdquo;
            </blockquote>
            <p className="mt-4 text-mono text-muted-foreground">{t("testimonials.quoteAuthor")}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
