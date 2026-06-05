import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTheme } from "@/components/ThemeProvider";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import formabuildLogo from "@/assets/formabuild-logo.png";
import eliteAutoLogo from "@/assets/elite-auto-logo.png";
import fintekinLogoLight from "@/assets/fintekin-logo-light.png";
import fintekinLogoDark from "@/assets/fintekin-logo-dark.png";
import deepwellLogo from "@/assets/deepwell-logo.png";

export const About = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const { theme } = useTheme();

  const logos = [
    { src: aptLocatorLogo, alt: "APT Locator" },
    { src: eenLogo, alt: "EEN" },
    { src: formabuildLogo, alt: "Formabuild" },
    { src: eliteAutoLogo, alt: "Elite Auto+" },
    { src: theme === "dark" ? fintekinLogoDark : fintekinLogoLight, alt: "Fintekin" },
    { src: deepwellLogo, alt: "Deepwell" },
  ];


  return (
    <section id="about" className="pt-4 sm:pt-6 pb-24 sm:pb-32 relative overflow-hidden section-3">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16" style={staggerStyle(0, isVisible)}>
            <span className="text-mono text-primary/70 block mb-6">Our clients</span>
            <h2 className="text-heading">
              Trusted by<br />
              <span className="text-gradient italic font-light">innovative companies.</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>

          <div
            className="flex flex-col gap-y-16 md:gap-y-24 py-8"
            style={staggerStyle(1, isVisible)}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 md:gap-x-20 gap-y-16 items-center justify-items-center">
              {logos.slice(0, 4).map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 md:max-h-28 max-w-[200px] md:max-w-[280px] object-contain"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-12 md:gap-x-20 items-center justify-items-center max-w-2xl mx-auto w-full">
              {logos.slice(4, 6).map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 md:max-h-28 max-w-[200px] md:max-w-[280px] object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
