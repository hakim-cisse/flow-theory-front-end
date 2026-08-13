import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import meshTeam from "@/assets/mesh-team-cutout.png";

export const CTABanner = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const { t } = useTranslation();

  return (
    <section id="cta" className="relative border-t border-border/20 overflow-hidden">
      {/* technical grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.35) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      {/* team mesh blended into the environment */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none select-none flex items-end justify-center lg:justify-end">
        <img
          src={meshTeam}
          alt="Wireframe mesh render of the Flow Theory AI founding team"
          className="h-[85%] lg:h-[92%] w-auto max-w-none object-contain opacity-20 lg:opacity-50"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 28%), linear-gradient(to top, transparent 0%, black 18%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 28%), linear-gradient(to top, transparent 0%, black 18%)",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>


      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-28">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7" style={staggerStyle(0, isVisible)}>
            <span className="text-mono text-primary/70 block mb-6">{t("ctaBanner.eyebrow")}</span>
            <h2 className="text-heading font-serif">
              {t("ctaBanner.titleA")}
              <br />
              <span className="text-gradient italic font-light">{t("ctaBanner.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" />
            <p className="text-body text-muted-foreground mt-8 max-w-xl">{t("ctaBanner.lead")}</p>
            <Button
              asChild
              size="lg"
              className="group mt-10 rounded-none font-medium tracking-wide px-8 py-6 text-sm uppercase"
            >
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
