import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABanner } from "@/components/CTABanner";
import { AIProductDevelopment } from "@/components/AIProductDevelopment";
import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const capabilityKeys = ["products", "features", "integrations", "saas"] as const;

const AIEngineeringPage = () => {
  const { t } = useTranslation();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: capRef, isVisible: capVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <SiteLayout>
      <SEO
        title="AI Engineering Services"
        description="Senior engineering pods that ship production-grade AI products, integrations, and custom SaaS you fully own."
        canonicalUrl="https://www.flowtheoryai.com/services/ai-engineering"
      />

      <section className="pt-14 pb-20 sm:pb-28 relative overflow-hidden">
        <div ref={heroRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <Breadcrumbs
              items={[
                { label: t("nav.services"), href: "/services" },
                { label: t("svc.engineering.title") },
              ]}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <div className="lg:col-span-7" style={staggerStyle(0, heroVisible)}>
                <span className="text-mono text-primary/70 block mb-6">
                  {t("svc.engineering.eyebrow")}
                </span>
                <h1 className="text-display font-serif">{t("svc.engineering.title")}</h1>
                <div className="accent-bar mt-6" />
              </div>
              <div className="lg:col-span-5 space-y-5" style={staggerStyle(1, heroVisible)}>
                <p className="text-lead text-foreground/90">{t("svc.engineering.lead1")}</p>
                <p className="text-body text-muted-foreground">{t("svc.engineering.lead2")}</p>
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

      <section className="pb-20 sm:pb-28 relative">
        <div ref={capRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12 max-w-4xl" style={staggerStyle(0, capVisible)}>
              <span className="text-mono text-primary/70 block mb-6">
                {t("svc.engineering.capabilities.label")}
              </span>
              <h2 className="text-heading font-serif">{t("svc.engineering.capabilities.title")}</h2>
              <div className="accent-bar mt-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30 border border-border/40">
              {capabilityKeys.map((key, i) => (
                <div
                  key={key}
                  className="relative bg-background p-8 group hover:bg-primary/[0.03] transition-colors duration-500"
                  style={staggerStyle(i, capVisible, { delay: 0.06 })}
                >
                  <span className="absolute top-0 left-0 h-px w-0 group-hover:w-full bg-primary transition-all duration-500" />
                  <span className="text-mono text-[10px] tracking-widest text-foreground/40 block mb-5">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl tracking-tight mb-3">
                    {t(`svc.engineering.capabilities.items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`svc.engineering.capabilities.items.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AIProductDevelopment />
      <HowItWorks />
      <CTABanner />
    </SiteLayout>
  );
};

export default AIEngineeringPage;
