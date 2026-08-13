import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { Services } from "@/components/Services";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const tracks = [
  { key: "transformation", href: "/services/ai-transformation" },
  { key: "engineering", href: "/services/ai-engineering" },
] as const;

const ServicesPage = () => {
  const { t } = useTranslation();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <SiteLayout>
      <SEO
        title="Services: AI Transformation and AI Engineering"
        description="Flow Theory AI offers two services: AI Transformation for strategy, process and people, and AI Engineering for production-grade AI software."
        canonicalUrl="https://www.flowtheoryai.com/services"
      />

      <section className="pt-14 pb-20 sm:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <div ref={headerRef} className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7" style={staggerStyle(0, headerVisible)}>
                <span className="text-mono text-primary/70 block mb-6">{t("svc.hub.eyebrow")}</span>
                <h1 className="text-display font-serif">
                  {t("svc.hub.titleA")}<br />
                  <span className="text-gradient italic font-light">{t("svc.hub.titleB")}</span>
                </h1>
                <div className="accent-bar mt-6" />
              </div>
              <div className="lg:col-span-5" style={staggerStyle(1, headerVisible)}>
                <p className="text-lead text-muted-foreground">{t("svc.hub.lead")}</p>
              </div>
            </div>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 border border-border/40"
            >
              {tracks.map((track, i) => (
                <Link
                  key={track.key}
                  to={track.href}
                  className="group relative bg-background p-8 sm:p-10 lg:p-12 flex flex-col hover:bg-primary/[0.03] transition-colors duration-500"
                  style={staggerStyle(i, cardsVisible, { delay: 0.08 })}
                >
                  <span className="absolute top-0 left-0 h-px w-0 group-hover:w-full bg-primary transition-all duration-500" />
                  <span className="pointer-events-none absolute -top-6 -right-2 font-display text-[160px] leading-none tracking-tighter select-none text-foreground/[0.04]">
                    {t(`svc.hub.cards.${track.key}.index`)}
                  </span>

                  <span className="text-mono text-xs text-muted-foreground/70 mb-5">
                    {t(`svc.hub.cards.${track.key}.eyebrow`)}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05] mb-5">
                    {t(`svc.hub.cards.${track.key}.label`)}
                  </h2>
                  <p className="text-body text-muted-foreground mb-8">
                    {t(`svc.hub.cards.${track.key}.tagline`)}
                  </p>

                  <ul className="space-y-2 border-t border-border/60 pt-5 mb-10">
                    {(["p1", "p2", "p3"] as const).map((p) => (
                      <li key={p} className="flex items-center gap-3 text-sm text-foreground/80">
                        <span className="h-px w-5 bg-primary shrink-0" />
                        {t(`svc.hub.cards.${track.key}.${p}`)}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-2 text-mono text-primary">
                    {t("svc.hub.explore")}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Services />
    </SiteLayout>
  );
};

export default ServicesPage;
