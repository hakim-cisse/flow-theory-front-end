import { useEffect, useRef } from "react";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import formabuildLogo from "@/assets/formabuild-logo.png";
import eliteAutoLogo from "@/assets/elite-auto-logo.jpg.asset.json";
import fintekinLogo from "@/assets/fintekin-logo.jpg.asset.json";

const logos = [
  { src: aptLocatorLogo, alt: "APT Locator" },
  { src: eenLogo, alt: "EEN" },
  { src: formabuildLogo, alt: "Formabuild" },
  { src: eliteAutoLogo.url, alt: "Elite Auto+" },
  { src: fintekinLogo.url, alt: "Fintekin" },
];

export const About = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    let pos = 0;
    const speed = 0.5;
    const tick = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const stop = () => cancelAnimationFrame(raf);
    const start = () => { raf = requestAnimationFrame(tick); };
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", start);
    };
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden section-3">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-12" style={staggerStyle(0, isVisible)}>
            <span className="text-mono text-primary/70 block mb-6">Our clients</span>
            <h2 className="text-heading">
              Trusted by<br />
              <span className="text-gradient italic font-light">innovative companies.</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>

          <div
            ref={scrollRef}
            className="flex items-center gap-14 md:gap-24 overflow-x-hidden mt-16"
            style={{ ...staggerStyle(1, isVisible), scrollBehavior: "auto" }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="flex-shrink-0">
                <div className="relative h-14 md:h-20 w-32 md:w-44 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500">
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
