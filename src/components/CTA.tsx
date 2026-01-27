import { Sparkles, Zap, Network } from "lucide-react";

const features = [
  { icon: Zap, label: "Automation" },
  { icon: Sparkles, label: "Intelligence" },
  { icon: Network, label: "Connection" },
];

export const CTA = () => {
  return (
    <section id="cta" className="py-24 sm:py-32 relative overflow-hidden bg-muted">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Your <span className="text-gradient">AI Transformation</span> Partner
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We help businesses reclaim time and scale faster by turning everyday operations into intelligent systems. Let's identify how AI can revolutionize your business—one system at a time.
            </p>

            {/* Icon Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 max-w-md mx-auto">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="group flex flex-col items-center space-y-2 p-4 rounded-xl glass hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full aspect-[16/9] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-card bg-card">
            <iframe
              src="https://cal.com/flow-theory-ai/alignment-call"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Book Your Alignment Call"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
