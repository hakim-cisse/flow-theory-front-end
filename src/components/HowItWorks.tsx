import { useState } from "react";
import { Search, Target, PenTool, Rocket, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const stepKeys = ["discover", "diagnose", "design", "deploy", "scale"] as const;
const stepIcons = [Search, Target, PenTool, Rocket, TrendingUp];

export const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative overflow-hidden section-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <span className="text-mono text-primary/70 block mb-6">{t("howItWorks.eyebrow")}</span>
            <h2 className="text-heading">
              {t("howItWorks.titleA")}<br />
              <span className="text-gradient">{t("howItWorks.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>

          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-px bg-border/50 hidden md:block" />
            <div
              className="absolute top-6 left-0 h-px bg-primary transition-all duration-500 hidden md:block"
              style={{ width: `${((active + 1) / stepKeys.length) * 100}%` }}
            />

            <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-4">
              {stepKeys.map((key, i) => {
                const Icon = stepIcons[i];
                const isActive = i === active;
                const isPast = i < active;
                const phase = String(i + 1).padStart(2, "0");
                return (
                  <li key={key} className="relative">
                    <button
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="group w-full text-left"
                    >
                      <div className="relative z-10 mb-5 flex md:justify-start">
                        <div
                          className={cn(
                            "w-12 h-12 border flex items-center justify-center bg-background transition-all duration-300",
                            isActive
                              ? "border-primary text-primary scale-110"
                              : isPast
                              ? "border-primary/40 text-primary/60"
                              : "border-border text-muted-foreground"
                          )}
                        >
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                      </div>

                      <div
                        className={cn(
                          "text-mono text-xs mb-2 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground/60"
                        )}
                      >
                        {phase}
                      </div>
                      <h3
                        className={cn(
                          "font-display text-xl sm:text-2xl tracking-tight mb-2 transition-colors",
                          isActive ? "text-foreground" : "text-foreground/70"
                        )}
                      >
                        {t(`howItWorks.steps.${key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`howItWorks.steps.${key}.blurb`)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
