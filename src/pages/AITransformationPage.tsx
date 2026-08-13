import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABanner } from "@/components/CTABanner";
import { Stratum } from "@/components/Stratum";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const CornerTicks = () => (
  <>
    <span className="absolute top-0 left-0 w-3 h-px bg-primary" />
    <span className="absolute top-0 left-0 w-px h-3 bg-primary" />
    <span className="absolute top-0 right-0 w-3 h-px bg-primary" />
    <span className="absolute top-0 right-0 w-px h-3 bg-primary" />
    <span className="absolute bottom-0 left-0 w-3 h-px bg-primary" />
    <span className="absolute bottom-0 left-0 w-px h-3 bg-primary" />
    <span className="absolute bottom-0 right-0 w-3 h-px bg-primary" />
    <span className="absolute bottom-0 right-0 w-px h-3 bg-primary" />
  </>
);

const pillarKeys = ["product", "process", "people"] as const;
const capabilityKeys = ["process", "executive", "interviews", "training", "tooling", "engineering"] as const;
const whyKeys = ["p1", "p2", "p3", "p4"] as const;

const AITransformationPage = () => {
  const { t } = useTranslation();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: stratRef, isVisible: stratVisible } = useScrollReveal({ threshold: 0.15 });
  const { ref: execRef, isVisible: execVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: whyRef, isVisible: whyVisible } = useScrollReveal({ threshold: 0.15 });
  const { ref: capRef, isVisible: capVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <SiteLayout>
      <SEO
        title="AI Transformation Services"
        description="Strategy, process, and people transformation. Flow Theory AI architects your AI roadmap, quantifies ROI, and executes it end to end."
        canonicalUrl="https://www.flowtheoryai.com/services/ai-transformation"
      />

      {/* Hero */}
      <section className="pt-14 pb-20 sm:pb-28 relative overflow-hidden">
        <div ref={heroRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <Breadcrumbs
              items={[
                { label: t("nav.services"), href: "/services" },
                { label: t("svc.transformation.title") },
              ]}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <div className="lg:col-span-7" style={staggerStyle(0, heroVisible)}>
                <span className="text-mono text-primary/70 block mb-6">
                  {t("svc.transformation.eyebrow")}
                </span>
                <h1 className="text-display font-serif">{t("svc.transformation.title")}</h1>
                <div className="accent-bar mt-6" />
              </div>
              <div className="lg:col-span-5 space-y-5" style={staggerStyle(1, heroVisible)}>
                <p className="text-lead text-foreground/90">{t("svc.transformation.lead1")}</p>
                <p className="text-body text-muted-foreground">{t("svc.transformation.lead2")}</p>
                <Button asChild size="lg" className="group rounded-none text-mono uppercase px-8 py-6">
                  <Link to="/contact">
                    {t("common.getInTouch")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="pb-20 sm:pb-28 relative">
        <div ref={stratRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div
              className="relative border border-border/60 bg-background/50 backdrop-blur-sm p-8 sm:p-12 lg:p-16"
              style={staggerStyle(0, stratVisible)}
            >
              <CornerTicks />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-5">
                  <span className="text-mono text-primary/70 block mb-6">
                    {t("svc.transformation.strategy.label")}
                  </span>
                  <h2 className="text-heading font-serif">{t("svc.transformation.strategy.title")}</h2>
                </div>
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-lead text-foreground/90">{t("svc.transformation.strategy.p1")}</p>
                  <p className="text-body text-muted-foreground">{t("svc.transformation.strategy.p2")}</p>
                  <p className="text-body text-muted-foreground border-t border-border/60 pt-6">
                    {t("svc.transformation.strategy.p3")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution */}
      <section className="pb-20 sm:pb-28 relative">
        <div ref={execRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12 max-w-4xl" style={staggerStyle(0, execVisible)}>
              <span className="text-mono text-primary/70 block mb-6">
                {t("svc.transformation.execution.label")}
              </span>
              <h2 className="text-heading font-serif">{t("svc.transformation.execution.title")}</h2>
              <div className="accent-bar mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30 border border-border/40">
              {pillarKeys.map((key, i) => (
                <article
                  key={key}
                  className="relative bg-background p-8 lg:p-10 group hover:bg-primary/[0.03] transition-colors duration-500"
                  style={staggerStyle(i, execVisible, { delay: 0.08 })}
                >
                  <span className="absolute top-0 left-0 h-px w-0 group-hover:w-full bg-primary transition-all duration-500" />
                  <span className="text-mono text-primary/60 block mb-6">
                    {t(`svc.transformation.execution.pillars.${key}.index`)}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl tracking-tight mb-3">
                    {t(`svc.transformation.execution.pillars.${key}.name`)}
                  </h3>
                  <p className="text-mono text-xs text-primary/70 mb-5">
                    {t(`svc.transformation.execution.pillars.${key}.tagline`)}
                  </p>
                  <p className="text-body text-muted-foreground">
                    {t(`svc.transformation.execution.pillars.${key}.body`)}
                  </p>
                </article>
              ))}
            </div>

            <Link
              to="/services/ai-engineering"
              className="mt-px flex flex-wrap items-center gap-x-2 gap-y-1 border border-border/40 border-t-0 bg-secondary/30 px-8 py-6 text-sm hover:bg-primary/[0.05] transition-colors group"
            >
              <span className="text-muted-foreground">{t("svc.transformation.execution.linkA")}</span>
              <span className="text-foreground">{t("svc.transformation.execution.linkB")}</span>
              <span className="text-primary inline-flex items-center gap-1">
                {t("svc.transformation.execution.linkC")}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why you need us */}
      <section className="pb-20 sm:pb-28 relative">
        <div ref={whyRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5" style={staggerStyle(0, whyVisible)}>
              <span className="text-mono text-primary/70 block mb-6">{t("svc.transformation.why.label")}</span>
              <h2 className="text-heading font-serif">{t("svc.transformation.why.title")}</h2>
              <div className="accent-bar mt-6" />
            </div>
            <div className="lg:col-span-7" style={staggerStyle(1, whyVisible)}>
              <ul className="divide-y divide-border/40 border-y border-border/40">
                {whyKeys.map((key, i) => (
                  <li key={key} className="flex gap-6 py-6">
                    <span className="text-mono text-primary/60 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-body text-foreground/90">{t(`svc.transformation.why.${key}`)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-20 sm:pb-28 relative">
        <div ref={capRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12 max-w-4xl" style={staggerStyle(0, capVisible)}>
              <span className="text-mono text-primary/70 block mb-6">
                {t("svc.transformation.capabilities.label")}
              </span>
              <h2 className="text-heading font-serif">{t("svc.transformation.capabilities.title")}</h2>
              <div className="accent-bar mt-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 border border-border/40">
              {capabilityKeys.map((key, i) => (
                <div
                  key={key}
                  className="bg-background p-8 group hover:bg-primary/[0.03] transition-colors duration-500"
                  style={staggerStyle(i, capVisible, { delay: 0.06 })}
                >
                  <span className="text-mono text-[10px] tracking-widest text-foreground/40 block mb-5">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl tracking-tight mb-3">
                    {t(`svc.transformation.capabilities.items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`svc.transformation.capabilities.items.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Stratum />
      <CTABanner />
    </SiteLayout>
  );
};

export default AITransformationPage;
