import hakimImage from "@/assets/hakim.jpg";
import yassineImage from "@/assets/yassine.png";
import yunusImage from "@/assets/yunus.jpg";

const founders = [
  {
    name: "Hakim Cisse",
    title: "Founder & CEO",
    image: hakimImage,
    description: "Visionary entrepreneur leading Flow Theory AI's mission to help companies scale intelligently through automation and AI systems.",
  },
  {
    name: "Yassine Diallo",
    title: "Co-Founder & CTO",
    image: yassineImage,
    description: "Technical leader and automation architect focused on building stable, high-performance AI ecosystems for clients.",
  },
  {
    name: "Yunus Kounkourou",
    title: "Co-Founder & COO",
    image: yunusImage,
    description: "Operations leader with technical experience enabling scalable execution and efficiency.",
  },
];

export const Founders = () => {
  return (
    <section id="founders" className="py-24 sm:py-32 relative section-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-mono text-primary/70 block mb-6">Our team</span>
            <h2 className="text-heading">
              Built by founders,<br />
              <span className="text-gradient">for founders.</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group flex flex-col items-center text-center p-10 bg-background hover:bg-primary/5 transition-all duration-500"
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
                  <p className="text-mono text-primary">{founder.title}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-xs">
                  {founder.description}
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
