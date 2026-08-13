import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const { t } = useTranslation();

  const scrollToCaseStudy = () => {
    const element = document.querySelector("#case-studies");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const metrics = [
    { label: t("hero.metrics.savedLabel"), value: t("hero.metrics.savedValue") },
    { label: t("hero.metrics.hoursLabel"), value: t("hero.metrics.hoursValue") },
    { label: t("hero.metrics.layersLabel"), value: t("hero.metrics.layersValue") },
    { label: t("hero.metrics.buildLabel"), value: t("hero.metrics.buildValue") },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden section-1 pt-24 md:pt-20 pb-16">
      <div ref={ref} className="relative z-10 container mx-auto px-4 md:px-10 lg:px-16 max-w-[1600px]">
        {/* Instrument panel frame */}
        <div className="relative border border-foreground/15 p-1">
          {/* Corner registration marks */}
          <div className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-primary" />
          <div className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 border-t border-r border-foreground/40" />
          <div className="absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 border-b border-l border-foreground/40" />
          <div className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 border-b border-r border-foreground/40" />

          <div className="border border-foreground/15 bg-card/40 overflow-hidden">
            {/* Metadata bar */}
            <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-foreground/15 bg-muted/40">
              <div className="flex items-center gap-5 min-w-0">
                <span className="text-mono text-muted-foreground truncate">
                  {t("hero.panel.status")}
                </span>
                <span className="hidden sm:inline text-mono text-muted-foreground">
                  {t("hero.panel.ref")}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
                <span className="text-mono text-foreground/70">{t("hero.panel.live")}</span>
              </div>
            </div>

            {/* Main console body */}
            <div className="relative px-6 md:px-12 lg:px-16 py-14 md:py-20">
              {/* Hairline grid */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Eyebrow featured link */}
              <div
                className="relative z-10 mb-10 md:mb-14"
                style={staggerStyle(0, isVisible, { delay: 0.1, distance: 16 })}
              >
                <button
                  onClick={scrollToCaseStudy}
                  className="group inline-flex items-center gap-3 border border-foreground/20 bg-background/60 px-3 py-1.5 hover:border-primary/60 transition-colors"
                >
                  <FileText className="w-3 h-3 text-primary" />
                  <span className="text-mono text-primary">{t("hero.panel.featuredTag")}</span>
                  <span className="w-px h-3 bg-foreground/20" />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {t("hero.featured")}
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>

              <div className="relative z-10 grid grid-cols-12 gap-6 md:gap-10 items-start">
                <div
                  className="col-span-12 lg:col-span-9"
                  style={staggerStyle(1, isVisible, { delay: 0.15, duration: 0.9, distance: 40 })}
                >
                  <h1 className="text-display text-foreground">
                    <span className="block">{t("hero.title1")}</span>
                    <span className="block italic text-primary" style={{ fontWeight: 300 }}>
                      {t("hero.title2")}
                    </span>
                  </h1>
                </div>

                <aside
                  className="col-span-12 lg:col-span-3 lg:pt-6 lg:border-l lg:border-foreground/15 lg:pl-6"
                  style={staggerStyle(2, isVisible, { delay: 0.25, distance: 20 })}
                >
                  <div className="text-mono text-muted-foreground mb-3">{t("hero.panel.brief")}</div>
                  <p className="text-italic-accent text-lg md:text-xl leading-snug text-foreground/85">
                    {t("hero.sideNote")}
                  </p>
                </aside>
              </div>

              {/* Bottom controls */}
              <div className="relative z-10 grid grid-cols-12 gap-6 md:gap-10 mt-14 md:mt-20 items-end">
                <div
                  className="col-span-12 md:col-span-7"
                  style={staggerStyle(3, isVisible, { delay: 0.3, distance: 20 })}
                >
                  <p className="text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed">
                    {t("hero.tagline")}
                  </p>
                </div>

                <div
                  className="col-span-12 md:col-span-5 flex flex-col sm:flex-row md:justify-end items-start sm:items-center gap-5"
                  style={staggerStyle(4, isVisible, { delay: 0.35, distance: 20 })}
                >
                  <Button
                    asChild
                    size="lg"
                    className="group rounded-none font-medium tracking-wide px-8 py-6 text-sm uppercase"
                  >
                    <Link to="/contact">
                      {t("hero.cta")}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <button
                    onClick={scrollToCaseStudy}
                    className="text-mono text-foreground/70 hover:text-primary transition-colors story-link"
                  >
                    {t("hero.explore")}
                  </button>
                </div>
              </div>
            </div>

            {/* Readout strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-foreground/15 divide-x divide-foreground/15">
              {metrics.map((m) => (
                <div key={m.label} className="p-4 flex flex-col gap-1 border-b md:border-b-0 border-foreground/15">
                  <span className="text-mono text-muted-foreground">{m.label}</span>
                  <span className="text-sm text-foreground/85">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel footer rail */}
        <div className="mt-4 flex items-center justify-between text-mono text-foreground/45">
          <span>{t("hero.footerLeft")}</span>
          <span className="hidden md:inline">{t("hero.scroll")}</span>
          <span>v.2026</span>
        </div>
      </div>
    </section>
  );
};
