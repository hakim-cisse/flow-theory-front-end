import { useTranslation } from "react-i18next";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

export const Thesis = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  const points = t("thesis.points", { returnObjects: true }) as string[];

  return (
    <section className="pb-24 sm:pb-32 relative overflow-hidden section-3">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div
            className="border border-border/60 bg-background/50 backdrop-blur-sm p-8 sm:p-12 lg:p-16 relative"
            style={staggerStyle(0, isVisible)}
          >
            {/* Corner registration ticks */}
            <span className="absolute top-0 left-0 w-3 h-px bg-primary" />
            <span className="absolute top-0 left-0 w-px h-3 bg-primary" />
            <span className="absolute top-0 right-0 w-3 h-px bg-primary" />
            <span className="absolute top-0 right-0 w-px h-3 bg-primary" />
            <span className="absolute bottom-0 left-0 w-3 h-px bg-primary" />
            <span className="absolute bottom-0 left-0 w-px h-3 bg-primary" />
            <span className="absolute bottom-0 right-0 w-3 h-px bg-primary" />
            <span className="absolute bottom-0 right-0 w-px h-3 bg-primary" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5" style={staggerStyle(1, isVisible)}>
                <span className="text-mono text-primary/70 block mb-6">
                  {t("thesis.label")}
                </span>
                <h2 className="text-heading font-serif">
                  {t("thesis.titleA")}{" "}
                  <span className="text-gradient italic font-light">
                    {t("thesis.titleB")}
                  </span>
                </h2>
                <div className="accent-bar mt-6" />
              </div>

              <div className="lg:col-span-7" style={staggerStyle(2, isVisible)}>
                <p className="text-lead text-foreground/90 mb-10">
                  {t("thesis.lead")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {points.map((point, index) => (
                    <div
                      key={index}
                      className="border border-border/40 p-5 bg-secondary/30"
                    >
                      <span className="text-mono text-primary/60 block mb-3">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-body text-foreground/90">{point}</p>
                    </div>
                  ))}
                </div>
                <p className="text-mono text-primary mt-10 pt-6 border-t border-border/60">
                  {t("thesis.closing")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
