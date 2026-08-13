import { useTranslation } from "react-i18next";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

export const FlowDefinition = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  const definitions = t("flowDefinition.definitions", { returnObjects: true }) as string[];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden section-3">
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

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
              <div className="lg:w-1/2" style={staggerStyle(1, isVisible)}>
                <span className="text-mono text-primary/70 block mb-6">
                  {t("flowDefinition.label")}
                </span>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <h2 className="text-display font-serif text-foreground lowercase">
                    {t("flowDefinition.word")}
                  </h2>
                  <span className="text-mono text-muted-foreground">
                    {t("flowDefinition.phonetic")}
                  </span>
                  <span className="text-mono text-primary/80 px-2 py-0.5 border border-primary/30">
                    {t("flowDefinition.part")}
                  </span>
                </div>
              </div>

              <div className="lg:w-1/2" style={staggerStyle(2, isVisible)}>
                <ol className="space-y-6">
                  {definitions.map((definition, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="text-mono text-primary/60 shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-body text-foreground/90 leading-relaxed">
                        {definition}
                      </p>
                    </li>
                  ))}
                </ol>
                <div className="mt-10 pt-6 border-t border-border/60">
                  <p className="text-mono text-primary">
                    {t("flowDefinition.closing")}
                  </p>
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
