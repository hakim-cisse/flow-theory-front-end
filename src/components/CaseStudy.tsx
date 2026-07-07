import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, DollarSign, Building2, PhoneOff, Zap, ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import eliteAutoLogo from "@/assets/elite-auto-logo.png";
import { cn } from "@/lib/utils";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

type PhaseKey = "problem" | "solution" | "results";

interface CaseStudyData {
  key: "apt" | "een" | "elite";
  id: string;
  company: string;
  logo: string;
  slug: string;
  metricValues: [string, string];
  metricIcons: [React.ReactNode, React.ReactNode];
}

const caseStudies: CaseStudyData[] = [
  {
    key: "apt",
    id: "apt-locator",
    company: "APT Locator",
    logo: aptLocatorLogo,
    slug: "saving-120k-and-55-hours-a-week-how-apt-locator-automated-the-future-of-apartment-finding",
    metricValues: ["$72K–$120K", "~55 hrs"],
    metricIcons: [<DollarSign className="w-4 h-4" />, <Clock className="w-4 h-4" />],
  },
  {
    key: "een",
    id: "empower-estates-network",
    company: "Empower Estates Network",
    logo: eenLogo,
    slug: "rebuilding-the-engine-how-empower-estates-network-scaled-their-wholesaling-operations",
    metricValues: ["0 duplicates", "3–5× faster"],
    metricIcons: [<PhoneOff className="w-4 h-4" />, <Zap className="w-4 h-4" />],
  },
  {
    key: "elite",
    id: "elite-auto-plus",
    company: "Elite Auto Plus",
    logo: eliteAutoLogo,
    slug: "we-gave-a-car-rental-company-in-niger-an-intelligence-layer-heres-what-happened",
    metricValues: ["+23%", "60%"],
    metricIcons: [<TrendingUp className="w-4 h-4" />, <Clock className="w-4 h-4" />],
  },
];

const phaseOrder: PhaseKey[] = ["problem", "solution", "results"];

const phaseColors: Record<PhaseKey, string> = {
  problem: "text-red-400 border-red-400/30 bg-red-400/5",
  solution: "text-primary border-primary/30 bg-primary/5",
  results: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
};

const phaseDotColors: Record<PhaseKey, string> = {
  problem: "bg-red-400 shadow-red-400/40",
  solution: "bg-primary shadow-primary/40",
  results: "bg-emerald-400 shadow-emerald-400/40",
};

export const CaseStudy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const active = caseStudies[activeIndex];
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { t } = useTranslation();

  const handleSwitch = (i: number) => {
    setActiveIndex(i);
    setActiveStep(0);
  };

  const currentPhase = phaseOrder[activeStep];

  return (
    <section id="case-studies" className="py-20 sm:py-28 relative overflow-hidden section-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div ref={headerRef} className="mb-12">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              <Building2 className="w-3.5 h-3.5 inline mr-2" />
              {t("caseStudy.eyebrow")}
            </span>
            <h2 className="text-heading max-w-3xl" style={staggerStyle(1, headerVisible)}>
              {t("caseStudy.titleA")}<br />
              <span className="text-gradient">{t("caseStudy.titleB")}</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
          </div>

          <div className="flex items-center gap-3 mb-8">
            {caseStudies.map((study, i) => (
              <button
                key={study.id}
                onClick={() => handleSwitch(i)}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-all duration-300 border rounded-sm",
                  activeIndex === i
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-card/30 border-border/30 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                )}
              >
                <img src={study.logo} alt={study.company} className="w-5 h-5 object-contain" />
                <span className="hidden sm:inline">{study.company}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="border border-border/30 bg-card/30 rounded-sm overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-stretch border-b border-border/20">
                <div className="flex-1 p-5 sm:p-6 flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-border/20">
                  <img src={active.logo} alt={active.company} className="w-8 h-8 object-contain opacity-70" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{active.company}</h3>
                    <p className="text-xs text-muted-foreground">{t(`caseStudy.companies.${active.key}.tagline`)}</p>
                  </div>
                </div>
                {active.metricValues.map((value, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 p-5 sm:p-6 flex items-center gap-3",
                      i === 0 && "border-b sm:border-b-0 sm:border-r border-border/20"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {active.metricIcons[i]}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gradient">{value}</div>
                      <p className="text-[11px] text-muted-foreground">{t(`caseStudy.companies.${active.key}.metrics.m${i + 1}`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-0 mb-6 relative">
                  {phaseOrder.map((phase, i) => (
                    <div key={phase} className="flex items-center flex-1 last:flex-none">
                      <button
                        onClick={() => setActiveStep(i)}
                        className="flex items-center gap-2.5 group relative z-10"
                      >
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full transition-all duration-300 shadow-sm",
                            activeStep === i
                              ? cn(phaseDotColors[phase], "scale-125 shadow-md")
                              : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                            activeStep === i ? "text-foreground" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                          )}
                        >
                          {t(`caseStudy.phases.${phase}`)}
                        </span>
                      </button>
                      {i < phaseOrder.length - 1 && (
                        <div className="flex-1 mx-3">
                          <div
                            className={cn(
                              "h-px transition-colors duration-500",
                              i < activeStep ? "bg-primary/40" : "bg-border/40"
                            )}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active.id}-${activeStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[80px]"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border shrink-0 mt-0.5",
                          phaseColors[currentPhase]
                        )}
                      >
                        {t(`caseStudy.phases.${currentPhase}`)}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1.5">
                          {t(`caseStudy.companies.${active.key}.steps.${currentPhase}.title`)}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`caseStudy.companies.${active.key}.steps.${currentPhase}.description`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/15">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      {t("common.previous")}
                    </button>
                    <div className="flex gap-1.5">
                      {phaseOrder.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveStep(i)}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-300",
                            activeStep === i ? "bg-primary w-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                          )}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveStep(Math.min(phaseOrder.length - 1, activeStep + 1))}
                      disabled={activeStep === phaseOrder.length - 1}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      {t("common.next")}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {active.slug && active.slug !== "#" && (
                    <Link
                      to={`/blog/${active.slug}`}
                      className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors group"
                    >
                      {t("caseStudy.readFull")}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
