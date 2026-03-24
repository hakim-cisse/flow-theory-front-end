import { useState } from "react";
import { Building2, HeartPulse, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    tagline: "Close deals faster with automated lead routing and pipeline optimization.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    tagline: "Reduce admin burden with streamlined patient workflows and scheduling.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    tagline: "Scale operations with intelligent inventory and customer journey automation.",
  },
  {
    icon: Users,
    title: "Recruitment",
    tagline: "Cut time-to-hire with automated screening and pipeline management.",
  },
];

export const Industries = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="border-y border-border/20 section-7 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-stretch">
          {industries.map((industry, i) => (
            <button
              key={industry.title}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "group relative flex-1 py-6 sm:py-8 px-4 sm:px-6 text-left transition-all duration-500 border-b sm:border-b-0 sm:border-r last:border-0 border-border/20",
                active === i
                  ? "bg-primary/5"
                  : "bg-transparent hover:bg-primary/[0.02]"
              )}
            >
              {/* Active indicator bar */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-500",
                  active === i ? "opacity-100" : "opacity-0"
                )}
              />

              <div className="flex items-center gap-3 mb-2">
                <industry.icon
                  className={cn(
                    "w-4 h-4 transition-colors duration-300 shrink-0",
                    active === i ? "text-primary" : "text-muted-foreground"
                  )}
                  strokeWidth={1.5}
                />
                <span
                  className={cn(
                    "text-sm font-semibold tracking-wide transition-colors duration-300",
                    active === i ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {industry.title}
                </span>
              </div>

              <p
                className={cn(
                  "text-xs leading-relaxed transition-all duration-500 overflow-hidden",
                  active === i
                    ? "text-muted-foreground max-h-20 opacity-100"
                    : "text-muted-foreground/0 max-h-0 sm:max-h-20 sm:text-muted-foreground/50 opacity-0 sm:opacity-100"
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
