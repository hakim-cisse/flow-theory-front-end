import hakimImage from "@/assets/hakim.jpg";
import yassineImage from "@/assets/yassine.jpg";
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
    title: "Co-Founder & CRO",
    image: yunusImage,
    description: "Growth strategist with extensive technical experience driving scalable expansion and market development initiatives.",
  },
];

export const Founders = () => {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            The People Behind <span className="text-gradient">the Vision</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group flex flex-col items-center text-center space-y-6 p-8 rounded-2xl glass hover:bg-primary/5 transition-all duration-500"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="relative w-48 h-48 rounded-full object-cover border-4 border-primary/30 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{founder.name}</h3>
                  <p className="text-primary font-semibold">{founder.title}</p>
                </div>

                <p className="text-muted-foreground leading-relaxed max-w-md">
                  {founder.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
