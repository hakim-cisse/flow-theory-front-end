import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export const CTABanner = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const { t } = useTranslation();

  return (
    <section id="cta" className="relative py-20 sm:py-28 border-t border-border/20">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8" style={staggerStyle(0, isVisible)}>
            <span className="text-mono text-primary/70 block mb-6">{t("cta.eyebrow")}</span>
            <h2 className="text-heading">
              {t("cta.titleA")}<br />
              <span className="text-gradient italic font-light">{t("cta.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>
          <div className="md:col-span-4 flex md:justify-end" style={staggerStyle(1, isVisible)}>
            <Button asChild size="lg" className="group rounded-none font-medium tracking-wide px-8 py-6 text-sm uppercase">
              <Link to="/contact">
                {t("common.getInTouch")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
