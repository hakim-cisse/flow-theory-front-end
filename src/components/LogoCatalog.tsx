import { useEffect, useRef } from "react";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import formabuildLogo from "@/assets/formabuild-logo.png";

const logos = [
  { src: aptLocatorLogo, alt: "APT Locator", name: "APT Locator" },
  { src: eenLogo, alt: "EEN", name: "EEN" },
  { src: formabuildLogo, alt: "Formabuild", name: "Formabuild" },
  { src: aptLocatorLogo, alt: "APT Locator", name: "APT Locator" },
  { src: eenLogo, alt: "EEN", name: "EEN" },
  { src: formabuildLogo, alt: "Formabuild", name: "Formabuild" },
];

export const LogoCatalog = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) scrollPosition = 0;
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate); };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-10 md:py-14 section-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
          <p className="text-mono text-muted-foreground whitespace-nowrap">
            Trusted by
          </p>
          
          <div className="w-px h-8 bg-border/30 hidden sm:block" />

          <div 
            ref={scrollRef}
            className="flex items-center gap-14 md:gap-20 overflow-x-hidden flex-1"
            style={{ scrollBehavior: "auto" }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 group cursor-pointer">
                <div className="relative h-10 md:h-14 w-28 md:w-36 flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-80 transition-all duration-300">
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
