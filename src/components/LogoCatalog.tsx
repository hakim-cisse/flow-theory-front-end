import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import formabuildLogo from "@/assets/formabuild-logo.png";

const logos = [
  { src: aptLocatorLogo, alt: "APT Locator" },
  { src: eenLogo, alt: "EEN" },
  { src: formabuildLogo, alt: "Formabuild" },
];

export const LogoCatalog = () => {
  // Repeat enough times for seamless loop
  const repeated = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-8 md:py-10 section-2 overflow-hidden">
      <p className="text-mono text-muted-foreground text-center mb-6">
        Trusted by businesses building the future
      </p>

      <div className="relative w-full overflow-hidden">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(var(--section-2))] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(var(--section-2))] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-[scroll_25s_linear_infinite]">
          {repeated.map((logo, i) => (
            <div key={i} className="flex-shrink-0 mx-10 md:mx-14 flex items-center justify-center h-10 md:h-12 w-28 md:w-36 grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-300">
              <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
