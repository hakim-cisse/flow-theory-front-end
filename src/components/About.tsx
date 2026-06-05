import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import formabuildLogo from "@/assets/formabuild-logo.png";
import eliteAutoLogo from "@/assets/elite-auto-logo.jpg.asset.json";
import fintekinLogo from "@/assets/fintekin-logo.jpg.asset.json";
import deepwellLogo from "@/assets/deepwell-logo.jpg.asset.json";

const logos = [
  { src: aptLocatorLogo, alt: "APT Locator" },
  { src: eenLogo, alt: "EEN" },
  { src: formabuildLogo, alt: "Formabuild" },
  { src: eliteAutoLogo.url, alt: "Elite Auto+" },
  { src: fintekinLogo.url, alt: "Fintekin" },
  { src: deepwellLogo.url, alt: "Deepwell" },
];

export const About = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden section-3">
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border/30 border border-border/30"
            style={staggerStyle(1, isVisible)}
          >
            {logos.map((logo, i) => (
              <div
                key={i}
                className="group bg-background hover:bg-primary/5 transition-colors duration-500 aspect-[4/3] flex items-center justify-center p-6"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-16 md:max-h-20 max-w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
