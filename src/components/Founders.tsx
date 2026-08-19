import meshHakim from "@/assets/mesh-hakim.png";
import meshYassine from "@/assets/mesh-yassine.png";
import meshYunus from "@/assets/mesh-yunus.png";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

const founders = [
  { key: "hakim", name: "Hakim Cisse", mesh: meshHakim, id: "MSH_01" },
  { key: "yassine", name: "Yassine Diallo", mesh: meshYassine, id: "MSH_02" },
  { key: "yunus", name: "Yunus Kounkourou", mesh: meshYunus, id: "MSH_03" },
] as const;

const FounderRow = ({
  founder,
  index,
}: {
  founder: (typeof founders)[number];
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const { t } = useTranslation();
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid grid-cols-12 gap-8 md:gap-12 items-center py-14 md:py-20 border-t border-foreground/12"
    >
      {/* Mesh portrait */}
      <div
        className={`col-span-12 md:col-span-5 ${flipped ? "md:order-2 md:col-start-8" : ""}`}
        style={staggerStyle(0, isVisible, { delay: 0.05, distance: 28 })}
      >
        <div className="relative mx-auto md:mx-0 w-full max-w-[360px] aspect-square">
          {/* technical grid backdrop */}
          <div
            className="absolute inset-0 opacity-[0.10] pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* corner ticks */}
          <span className="absolute top-0 left-0 w-3 h-px bg-primary" />
          <span className="absolute top-0 left-0 w-px h-3 bg-primary" />
          <span className="absolute bottom-0 right-0 w-3 h-px bg-foreground/40" />
          <span className="absolute bottom-0 right-0 w-px h-3 bg-foreground/40" />

          <img
            src={founder.mesh}
            alt={`${founder.name}, 3D wireframe mesh portrait`}
            className="relative w-full h-full object-contain founder-mesh"
          />

          <span className="absolute -bottom-6 left-0 text-mono text-muted-foreground">
            {founder.id} / TOPOLOGY
          </span>
        </div>
      </div>

      {/* Bio */}
      <div
        className={`col-span-12 md:col-span-6 ${flipped ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
        style={staggerStyle(1, isVisible, { delay: 0.15, distance: 28 })}
      >
        <span className="text-mono text-primary/70 block mb-4">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
          {founder.name}
        </h3>
        <p className="text-mono text-primary mt-3">
          {t(`founders.members.${founder.key}.title`)}
        </p>
        <div className="accent-bar my-6" />
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
          {t(`founders.members.${founder.key}.description`)}
        </p>
      </div>
    </div>
  );
};

export const Founders = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <section id="founders" className="py-24 sm:py-32 relative section-8">
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="pixelate" x="0" y="0" width="100%" height="100%">
            <feFlood x="2" y="2" height="1" width="1" />
            <feComposite width="10" height="10" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="5" />
          </filter>
        </defs>
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div ref={headerRef} className="mb-10 sm:mb-14">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              {t("founders.eyebrow")}
            </span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              {t("founders.titleA")}<br />
              <span className="text-gradient">{t("founders.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
          </div>

          <div>
            {founders.map((founder, i) => (
              <FounderRow key={founder.key} founder={founder} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
