import { useState } from "react";
import { Building2, HeartPulse, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    tagline: "Automated lead routing, CRM integrations, and deal pipeline optimization.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    tagline: "Streamlined patient workflows, scheduling, and compliant data systems.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    tagline: "Intelligent inventory management and AI-powered customer support.",
  },
  {
    icon: Users,
    title: "Recruitment",
    tagline: "Automated candidate screening, scheduling, and talent pipeline management.",
  },
];

export const Industries = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="border-y border-primary/20 overflow-hidden bg-primary/[0.03]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-mono text-primary/70 text-center pt-6 pb-2 text-xs tracking-widest uppercase">
          Industries We Specialize In
        </p>
        <div className="pb-1 flex flex-col sm:flex-row items-stretch">
          {industries.map((industry, i) => (
            <button
              key={industry.title}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "group relative flex-1 py-5 sm:py-6 px-5 sm:px-6 text-left transition-all duration-400 border-b sm:border-b-0 sm:border-r last:border-0 border-primary/10",
                active === i
                  ? "bg-primary/10"
                  : "bg-transparent hover:bg-primary/[0.04]"
              )}
            >
              {/* Active indicator */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-[3px] bg-primary transition-all duration-400",
                  active === i ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
              />

              <div className="flex items-center gap-3">
                <industry.icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-300 shrink-0",
                    active === i ? "text-primary" : "text-muted-foreground/50"
                  )}
                  strokeWidth={1.5}
                />
                <span
                  className={cn(
                    "text-sm font-bold tracking-wider transition-colors duration-300 uppercase",
                    active === i ? "text-primary" : "text-muted-foreground/60"
                  )}
                >
                  {industry.title}
                </span>
              </div>

              <p
                className={cn(
                  "text-xs leading-relaxed mt-2 transition-all duration-400",
                  active === i
                    ? "text-foreground/70 opacity-100 max-h-16"
                    : "text-muted-foreground/40 opacity-0 sm:opacity-50 max-h-0 sm:max-h-16"
                )}
              >
                {industry.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
