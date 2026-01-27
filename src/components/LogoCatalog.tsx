import { useEffect, useRef } from "react";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import formabuildLogo from "@/assets/formabuild-logo.png";
import creperyLogo from "@/assets/crepery-logo.png";

const logos = [
  { src: aptLocatorLogo, alt: "APT Locator", name: "APT Locator" },
  { src: eenLogo, alt: "EEN", name: "EEN" },
  { src: formabuildLogo, alt: "Formabuild", name: "Formabuild" },
  { src: creperyLogo, alt: "Crepery", name: "Crepery" },
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
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 bg-background border-y border-border/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Trusted by innovative companies
        </p>
        
        <div 
          ref={scrollRef}
          className="flex items-center gap-12 md:gap-16 overflow-x-hidden"
          style={{ scrollBehavior: "auto" }}
        >
          {/* Double the logos for seamless infinite scroll */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 group cursor-pointer transition-all duration-300"
            >
              <div className="relative h-12 md:h-16 w-32 md:w-40 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
