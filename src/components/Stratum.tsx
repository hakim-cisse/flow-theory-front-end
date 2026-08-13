import { Search, Target, ShieldCheck, Rocket, GraduationCap, LineChart, Infinity as InfinityIcon, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import stratumBrainScreenshot from "@/assets/stratum-brain-screenshot.png";
import { useTranslation } from "react-i18next";

// STRATUM letters + short titles stay in English by design.
const layers = [
  { letter: "S", title: "Scan", key: "scan", icon: Search },
  { letter: "T", title: "Target", key: "target", icon: Target },
  { letter: "R", title: "Resolve", key: "resolve", icon: ShieldCheck },
  { letter: "A", title: "Activate", key: "activate", icon: Rocket },
  { letter: "T", title: "Transfer", key: "transfer", icon: GraduationCap },
  { letter: "U", title: "Uplift", key: "uplift", icon: LineChart },
  { letter: "M", title: "Multiply", key: "multiply", icon: InfinityIcon },
] as const;

const principleKeys = ["quickWins", "builtIn", "limits"] as const;

export const Stratum = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: stackRef, isVisible: stackVisible } = useScrollReveal({ threshold: 0.05 });
  const { ref: principlesRef, isVisible: principlesVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: showcaseRef, isVisible: showcaseVisible } = useScrollReveal({ threshold: 0.15 });
  const { t } = useTranslation();

  return (
    <section id="stratum" className="py-24 sm:py-32 relative overflow-hidden section-6">
      {/* Cheap gradient washes (no blur filters) so the section stays smooth while scrolling */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 40% at 10% 33%, hsl(var(--primary) / 0.06), transparent 70%), radial-gradient(40% 35% at 95% 100%, hsl(var(--accent) / 0.06), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div ref={headerRef} className="mb-20 max-w-4xl">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              {t("stratum.eyebrow")}
            </span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              {t("stratum.titleA")}<br />
              <span className="text-gradient">{t("stratum.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
            <p className="text-subheading text-muted-foreground leading-relaxed mt-8" style={staggerStyle(3, headerVisible)}>
              {t("stratum.intro")}
            </p>
          </div>

          <div ref={stackRef} className="relative">
            <div
              className="absolute left-6 sm:left-10 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              style={{ opacity: stackVisible ? 1 : 0, transition: "opacity 1s ease-out 0.3s" }}
            />

            <div className="space-y-4 sm:space-y-5">
              {layers.map((layer, i) => {
                const Icon = layer.icon;
                const offset = i * 14;
                return (
                  <div
                    key={`${layer.letter}-${layer.title}`}
                    className="relative group"
                    style={{
                      ...staggerStyle(i, stackVisible, { delay: 0.1, distance: 30 }),
                      paddingLeft: `clamp(0px, ${offset}px, ${offset}px)`,
                    }}
                  >
                    <div className="relative flex flex-col sm:flex-row items-start gap-5 sm:gap-7 p-6 sm:p-8 border border-border/40 bg-card/40 transition-colors duration-300 hover:border-primary/40 hover:bg-primary/[0.03]">
                      <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3 shrink-0 sm:w-24">
                        <span className="font-serif text-4xl sm:text-5xl leading-none text-primary tabular-nums">
                          {layer.letter}
                        </span>
                        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {layer.title}
                          </h3>
                          <span className="text-mono text-[10px] text-primary/50">
                            {t("stratum.layerLabel")} 0{i + 1}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {t(`stratum.layers.${layer.key}`)}
                        </p>
                      </div>

                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary/40 transition-colors duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div ref={showcaseRef} className="mt-28 sm:mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div
                  className="inline-flex items-center gap-2 text-mono text-xs text-primary/80 border border-primary/20 bg-primary/5 px-3 py-1.5 mb-6"
                  style={staggerStyle(0, showcaseVisible)}
                >
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                  {t("stratum.showcase.badge")}
                </div>
                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5"
                  style={staggerStyle(1, showcaseVisible)}
                >
                  {t("stratum.showcase.titleA")} <span className="text-gradient">{t("stratum.showcase.titleB")}</span>
                </h3>
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  style={staggerStyle(2, showcaseVisible)}
                >
                  {t("stratum.showcase.body")}
                </p>
                <ul className="space-y-3" style={staggerStyle(3, showcaseVisible)}>
                  {(["b1", "b2", "b3"] as const).map((k) => (
                    <li key={k} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-2 w-1.5 h-1.5 bg-primary shrink-0" />
                      <span>{t(`stratum.showcase.${k}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="lg:col-span-8 order-1 lg:order-2 relative group"
                style={staggerStyle(2, showcaseVisible, { delay: 0.15, distance: 40 })}
              >
                

                <div className="relative border border-primary/20 bg-card/60 p-2 sm:p-3 shadow-[0_20px_50px_-30px_hsl(var(--primary)/0.4)]">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-background/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                    </div>
                    <div className="text-mono text-[10px] sm:text-xs text-muted-foreground truncate px-3">
                      stratum.yourcompany.com
                    </div>
                    <div className="text-mono text-[10px] text-primary/60 hidden sm:block">LIVE</div>
                  </div>

                  <div className="relative overflow-hidden bg-background">
                    <img
                      src={stratumBrainScreenshot}
                      alt="STRATUM interface answering a plain-English query against live CRM data, with confidence and reasoning."
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-primary/10" />
                  </div>
                </div>

                <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-primary/60 pointer-events-none" />
              </div>
            </div>
          </div>

          <div ref={principlesRef} className="mt-24">
            <div className="text-center mb-12" style={staggerStyle(0, principlesVisible)}>
              <span className="text-mono text-primary/70">{t("stratum.principlesEyebrow")}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
              {principleKeys.map((k, i) => (
                <div
                  key={k}
                  className="group p-8 bg-background hover:bg-primary/5 transition-colors duration-300"
                  style={staggerStyle(i + 1, principlesVisible, { delay: 0.1 })}
                >
                  <span className="text-mono text-xs text-primary/60 block mb-3">0{i + 1}</span>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(`stratum.principles.${k}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`stratum.principles.${k}.description`)}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center" style={staggerStyle(4, principlesVisible)}>
              <p className="text-subheading text-foreground/90 mb-6">
                {t("stratum.ctaLine")}
              </p>
              <Button asChild size="lg" className="group px-8 py-6 font-semibold glow">
                <Link to="/contact">
                  {t("stratum.ctaButton")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
