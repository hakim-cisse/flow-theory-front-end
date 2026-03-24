import { useState } from "react";
import { Building2, HeartPulse, ShoppingCart, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    tagline: "Lead routing, CRM automation, and deal pipeline optimization that close deals faster.",
    highlights: ["Lead qualification", "CRM workflows", "Pipeline acceleration"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    tagline: "Patient workflows, scheduling automation, and compliant data systems that reduce admin burden.",
    highlights: ["Patient intake", "Scheduling", "Compliance systems"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    tagline: "Inventory management, customer journey automation, and AI-powered support that scales.",
    highlights: ["Order fulfillment", "Journey optimization", "AI support"],
  },
  {
    icon: Users,
    title: "Recruitment",
    tagline: "Candidate screening, interview scheduling, and talent pipeline management that cut time-to-hire.",
    highlights: ["Screening automation", "Interview scheduling", "Pipeline management"],
  },
];

export const Industries = () => {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden section-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <span className="text-mono text-primary/70 block mb-4">Industries we specialize in</span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Focused on verticals where{" "}
              <span className="text-gradient">AI delivers fastest.</span>
            </h2>
            <div className="accent-bar mt-5" />
          </div>

          {/* Tab bar + content */}
          <div className="border border-border/30 bg-card/30">
            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-border/20">
              {industries.map((industry, i) => (
                <button
                  key={industry.title}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "relative py-4 sm:py-5 px-4 sm:px-5 text-left transition-all duration-300 border-r last:border-r-0 border-border/20",
                    i < 2 && "border-b sm:border-b-0 border-border/20",
                    active === i ? "bg-primary/[0.07]" : "hover:bg-primary/[0.03]"
                  )}
                >
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-[2px] bg-primary transition-all duration-300",
                      active === i ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2.5">
                    <industry.icon
                      className={cn(
                        "w-4 h-4 shrink-0 transition-colors duration-300",
                        active === i ? "text-primary" : "text-muted-foreground/50"
                      )}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300",
                        active === i ? "text-primary" : "text-muted-foreground/60"
                      )}
                    >
                      {industry.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary">
                    <current.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{current.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {current.tagline}
                </p>
              </div>

              <div className="sm:border-l sm:border-border/20 sm:pl-8 space-y-3 w-full sm:w-auto sm:min-w-[220px]">
                <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">Key areas</span>
                {current.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
