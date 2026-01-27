import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";

const logos = [
  { name: "APT Locator", src: aptLocatorLogo },
  { name: "EEN", src: eenLogo },
  { name: "APT Locator", src: aptLocatorLogo },
  { name: "EEN", src: eenLogo },
  { name: "APT Locator", src: aptLocatorLogo },
  { name: "EEN", src: eenLogo },
];

export const TrustedBy = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Trusted by innovative companies
        </p>
        
        {/* Logo belt with infinite scroll animation */}
        <div className="relative">
          {/* Gradient fade left */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
          
          {/* Gradient fade right */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling logos */}
          <div className="flex animate-scroll">
            {/* First set of logos */}
            <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10">
              {logos.map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10">
              {logos.map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
