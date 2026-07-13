import hakimAsset from "@/assets/hakim.png.asset.json";
import yassineImage from "@/assets/yassine.png";
import yunusImage from "@/assets/yunus.jpg";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

const founders = [
  { key: "hakim", name: "Hakim Cisse", image: hakimAsset.url },
  { key: "yassine", name: "Yassine Diallo", image: yassineImage },
  { key: "yunus", name: "Yunus Kounkourou", image: yunusImage },
] as const;

export const Founders = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.1 });
  const { t } = useTranslation();

  return (
    <section id="founders" className="py-24 sm:py-32 relative section-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div ref={headerRef} className="mb-10 sm:mb-12">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>{t("founders.eyebrow")}</span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              {t("founders.titleA")}<br />
              <span className="text-gradient">{t("founders.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
            {founders.map((founder, i) => (
              <div
                key={founder.name}
                className="group flex flex-col items-center text-center p-10 bg-background hover:bg-primary/5 transition-all duration-500"
                style={staggerStyle(i, gridVisible, { delay: 0.15 })}
              >
                <div className="relative mb-8">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="relative w-40 h-40 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">{founder.name}</h3>
                  <p className="text-mono text-primary">{t(`founders.members.${founder.key}.title`)}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-xs">
                  {t(`founders.members.${founder.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
