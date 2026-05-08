import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

export const Philosophy = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="philosophy" className="py-24 sm:py-32 relative overflow-hidden section-8">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, isVisible)}>
            Our philosophy
          </span>
          <p
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-foreground/85"
            style={staggerStyle(1, isVisible)}
          >
            We build systems{" "}
            <span className="italic text-primary font-light">you own</span>
            {" "}— not ones you depend on us for.
          </p>
          <p
            className="mt-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed"
            style={staggerStyle(2, isVisible)}
          >
            Our goal isn't recurring dependency. It's to design, build, and transfer operational capability directly into your team — so you come back because you want to grow, not because you have to.
          </p>
        </div>
      </div>
    </section>
  );
};
