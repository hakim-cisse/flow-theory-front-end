import { Compass, Handshake, Zap } from "lucide-react";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const values = [
  {
    icon: Compass,
    title: "Clarity over complexity",
    description:
      "We simplify — not to dumb things down, but to make sure every system we build is something your team can actually use and own.",
  },
  {
    icon: Handshake,
    title: "Integrity in every interaction",
    description:
      "We say what we mean, deliver what we promise, and tell you when something isn't the right fit — even if that means walking away.",
  },
  {
    icon: Zap,
    title: "Impact through innovation",
    description:
      "We apply automation where it moves the needle — not because it's trendy, but because we can show you the before and after.",
  },
];

export const Values = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="values" className="py-24 sm:py-32 relative overflow-hidden section-3">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-4xl">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, isVisible)}>
              Our values
            </span>
            <h2 className="text-heading" style={staggerStyle(1, isVisible)}>
              What we stand for,<br />
              <span className="text-gradient">in every engagement.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, isVisible)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border/60 mt-16">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group p-8 md:p-10 border-r border-b border-border/60 bg-background hover:bg-primary/5 transition-colors duration-500"
                style={staggerStyle(i, isVisible, { delay: 0.06 })}
              >
                <v.icon className="h-7 w-7 text-primary mb-8" strokeWidth={1.5} />
                <h3 className="font-display text-2xl text-foreground mb-3 tracking-tight">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
