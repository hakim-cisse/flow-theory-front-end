import { useState } from "react";
import { Workflow, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { HowItWorks } from "@/components/HowItWorks";
import { AIProductDevelopment } from "@/components/AIProductDevelopment";

type TabKey = "process" | "build";

const tabs: {
  key: TabKey;
  label: string;
  eyebrow: string;
  tagline: string;
  icon: typeof Layers;
}[] = [
  {
    key: "process",
    label: "The Process",
    eyebrow: "01 / How we engage",
    tagline: "A five-phase model for any AI transformation, framework or not.",
    icon: Workflow,
  },
  {
    key: "build",
    label: "Build with AI",
    eyebrow: "02 / Product & feature development",
    tagline: "Ship a new AI product, or add intelligence to one you already have.",
    icon: Boxes,
  },
];

export const WhatWeDo = () => {
  const [active, setActive] = useState<TabKey>("process");
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: tabsRef, isVisible: tabsVisible } = useScrollReveal({ threshold: 0.2 });

  const activeTab = tabs.find((t) => t.key === active)!;

  return (
    <section id="what-we-do" className="relative section-4">
      {/* Header + tab bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8">
        <div className="max-w-screen-2xl mx-auto">
          <div ref={headerRef} className="mb-12 max-w-4xl">
            <span
              className="text-mono text-primary/70 block mb-6"
              style={staggerStyle(0, headerVisible)}
            >
              What we do
            </span>
            <h2 className="text-heading" style={staggerStyle(1, headerVisible)}>
              Three ways forward.<br />
              <span className="text-gradient">One clear starting point.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
          </div>

          {/* Tab bar */}
          <div
            ref={tabsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30 border border-border/40"
            style={staggerStyle(0, tabsVisible)}
          >
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={cn(
                    "group relative text-left p-6 sm:p-8 transition-all duration-500 bg-background flex flex-col gap-3",
                    isActive
                      ? "bg-primary/5"
                      : "hover:bg-primary/[0.03]"
                  )}
                  style={staggerStyle(i, tabsVisible, { delay: 0.08 })}
                >
                  {/* Active top accent */}
                  <div
                    className={cn(
                      "absolute top-0 left-0 h-px bg-primary transition-all duration-500",
                      isActive ? "w-full" : "w-0 group-hover:w-1/4"
                    )}
                  />
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 border border-border/40 flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-primary/10 border-primary/50 text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-mono text-xs text-muted-foreground/70">
                      {tab.eyebrow}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "text-2xl sm:text-3xl font-display tracking-tight transition-colors",
                      isActive ? "text-foreground" : "text-foreground/80"
                    )}
                  >
                    {tab.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tab.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active panel */}
      <div key={active} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {active === "process" && <HowItWorks />}
        {active === "stratum" && <Stratum />}
        {active === "build" && <AIProductDevelopment />}
      </div>
    </section>
  );
};
