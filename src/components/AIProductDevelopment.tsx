import { Lightbulb, Code2, Puzzle, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

const stageKeys = ["concept", "design", "integration", "launch"] as const;
const stageIcons = [Lightbulb, Code2, Puzzle, Rocket];

export const AIProductDevelopment = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: stagesRef, isVisible: stagesVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.3 });
  const { t } = useTranslation();

  return (
    <section id="ai-product-development" className="py-24 sm:py-32 relative overflow-hidden section-8">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div ref={headerRef} className="mb-20 max-w-4xl">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              {t("aiProduct.eyebrow")}
            </span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              {t("aiProduct.titleA")}<br />
              <span className="text-gradient">{t("aiProduct.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
            <p className="text-subheading text-muted-foreground leading-relaxed mt-8" style={staggerStyle(3, headerVisible)}>
              {t("aiProduct.intro")}
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed mt-6 max-w-3xl" style={staggerStyle(4, headerVisible)}>
              {t("aiProduct.intro2")}
            </p>
          </div>

          <div ref={stagesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30 relative">
            {stageKeys.map((key, i) => {
              const Icon = stageIcons[i];
              const n = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={key}
                  className="group relative bg-background hover:bg-primary/5 transition-all duration-500 p-8 flex flex-col"
                  style={staggerStyle(i, stagesVisible, { delay: 0.12 })}
                >
                  {i < stageKeys.length - 1 && (
                    <div className="hidden lg:flex absolute top-12 -right-3 z-10 w-6 h-6 items-center justify-center bg-background border border-border/40 rounded-full">
                      <ArrowRight className="w-3 h-3 text-primary/60" />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-mono text-primary/40 text-xs">{n}</span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {t(`aiProduct.stages.${key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`aiProduct.stages.${key}.description`)}</p>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              );
            })}
          </div>

          <div ref={ctaRef} className="mt-24 text-center max-w-screen-2xl mx-auto">
            <p className="text-heading leading-tight" style={staggerStyle(0, ctaVisible)}>
              {t("aiProduct.calloutA")}{" "}
              <span className="text-gradient">{t("aiProduct.calloutHighlight")}</span>,<br className="hidden sm:block" />
              {t("aiProduct.calloutB")}
            </p>

            <div className="mt-12 flex justify-center" style={staggerStyle(2, ctaVisible)}>
              <Button asChild size="lg" className="group px-8 py-6 font-semibold glow">
                <a href="#cta">
                  {t("aiProduct.cta")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
