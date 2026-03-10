import hakimImage from "@/assets/hakim.jpg";
import yassineImage from "@/assets/yassine.png";
import yunusImage from "@/assets/yunus.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="founders" className="py-24 sm:py-32 relative section-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div
            className="mb-16"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.7s ease-out',
            }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-mono text-primary/80 mb-6">
              Our Team
            </span>
            <h2 className="text-heading">
              Built by founders,<br />
              <span className="text-gradient">for founders.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder, i) => (
              <div
                key={founder.name}
                className="group flex flex-col items-center text-center p-8 rounded-2xl border border-border/30 bg-card/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.6s ease-out ${i * 0.15}s`,
                }}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all duration-500" />
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="relative w-32 h-32 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{founder.name}</h3>
                  <p className="text-mono text-primary text-xs">{founder.title}</p>
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
