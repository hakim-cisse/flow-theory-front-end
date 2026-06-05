import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, DollarSign, Building2, PhoneOff, Zap, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Car, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import eliteAutoLogo from "@/assets/elite-auto-logo.png.asset.json";
import { cn } from "@/lib/utils";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

interface MetricItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface TimelineStep {
  phase: string;
  title: string;
  description: string;
}

interface CaseStudyData {
  id: string;
  company: string;
  logo: string;
  tagline: string;
  slug: string;
  metrics: MetricItem[];
  timeline: TimelineStep[];
}

const caseStudies: CaseStudyData[] = [
  {
    id: "apt-locator",
    company: "APT Locator",
    logo: aptLocatorLogo,
    tagline: "Leading Apartment Locating Company",
    slug: "69219a0c-d59b-449d-a342-7aa75e06316e-saving-120k-and-55-hours-a-week-how-apt-locator-automated-th",
    metrics: [
      { icon: <DollarSign className="w-4 h-4" />, value: "$72K–$120K", label: "Yearly Savings" },
      { icon: <Clock className="w-4 h-4" />, value: "~55 hrs", label: "Saved Weekly" },
    ],
    timeline: [
      {
        phase: "Problem",
        title: "Scaling bottlenecks",
        description: "ISAs spent too much time qualifying leads and manually compiling apartment suggestions. Invoicing and follow-up consumed hours of founder time monthly.",
      },
      {
        phase: "Solution",
        title: "End-to-end automation",
        description: "Automated core ISA tasks, built an AI-powered apartment suggestion bot, streamlined invoicing workflows, and trained founders on AI integration.",
      },
      {
        phase: "Results",
        title: "Operational transformation",
        description: "Dramatically reduced ISA friction, near-instant apartment recommendations, fully automated invoicing, and a stronger operational backbone.",
      },
    ],
  },
  {
    id: "empower-estates-network",
    company: "Empower Estates Network",
    logo: eenLogo,
    tagline: "Real Estate Wholesaling Network",
    slug: "1dfcc5a9-37be-4f2b-8327-cbcbc932b828-rebuilding-the-engine-how-empower-estates-network-scaled-the",
    metrics: [
      { icon: <PhoneOff className="w-4 h-4" />, value: "0 duplicates", label: "Seller Call Overlap" },
      { icon: <Zap className="w-4 h-4" />, value: "3–5× faster", label: "Buyer Outreach" },
    ],
    timeline: [
      {
        phase: "Problem",
        title: "Operational chaos",
        description: "Multiple contacts tied to a single property caused repeated calls. Buyer outreach was delayed by manual processes, and founders lacked hot lead visibility.",
      },
      {
        phase: "Solution",
        title: "Intelligent systems",
        description: "Built a deduplication system for the dialer queue, automated buyer outreach triggered on contract, and implemented real-time hot lead notifications.",
      },
      {
        phase: "Results",
        title: "Streamlined deal flow",
        description: "Duplicate seller calls reduced to near zero, buyer outreach 60–75% faster, and founders gained immediate visibility into high-intent leads.",
      },
    ],
  },
  {
    id: "elite-auto-plus",
    company: "Elite Auto Plus",
    logo: eliteAutoLogo.url,
    tagline: "Car Rental & Fleet Management — Niger",
    slug: "#",
    metrics: [
      { icon: <TrendingUp className="w-4 h-4" />, value: "+23%", label: "Fleet Utilization" },
      { icon: <Clock className="w-4 h-4" />, value: "60%", label: "Admin Hours Cut" },
    ],
    timeline: [
      {
        phase: "Problem",
        title: "Infrastructure, not effort",
        description: "Tools didn't talk to each other and data lived in silos. Founders spent their days chasing updates, vehicles sat idle without visibility, invoices aged for weeks, and 3–4 hours daily were lost to manual logging and reporting.",
      },
      {
        phase: "Solution",
        title: "STRATUM Brain deployment",
        description: "Deployed an agentic intelligence layer with four core agents — Fleet, Revenue & Bookings, Payments, and Operations — unified under a central registry with confidence-tiered autonomy and on-demand plain-English querying.",
      },
      {
        phase: "Results",
        title: "From operators to executives",
        description: "+23% fleet utilization, 60% reduction in daily admin hours, 18-day cut in payment collection cycle, 2 hours/day reclaimed for founders, and zero additional hires needed to absorb the scale-up.",
      },
    ],
  },
    ],
  },
];

const phaseColors: Record<string, string> = {
  Problem: "text-red-400 border-red-400/30 bg-red-400/5",
  Solution: "text-primary border-primary/30 bg-primary/5",
  Results: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
};

const phaseDotColors: Record<string, string> = {
  Problem: "bg-red-400 shadow-red-400/40",
  Solution: "bg-primary shadow-primary/40",
  Results: "bg-emerald-400 shadow-emerald-400/40",
};

export const CaseStudy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const active = caseStudies[activeIndex];
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const handleSwitch = (i: number) => {
    setActiveIndex(i);
    setActiveStep(0);
  };

  return (
    <section id="case-studies" className="py-20 sm:py-28 relative overflow-hidden section-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-12">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>
              <Building2 className="w-3.5 h-3.5 inline mr-2" />
              Case Studies
            </span>
            <h2 className="text-heading max-w-3xl" style={staggerStyle(1, headerVisible)}>
              Real businesses.<br />
              <span className="text-gradient">Real results.</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
          </div>

          {/* Company selector */}
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

          {/* Main content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="border border-border/30 bg-card/30 rounded-sm overflow-hidden"
            >
              {/* Top: Metrics + Company info */}
              <div className="flex flex-col sm:flex-row items-stretch border-b border-border/20">
                <div className="flex-1 p-5 sm:p-6 flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-border/20">
                  <img src={active.logo} alt={active.company} className="w-8 h-8 object-contain opacity-70" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{active.company}</h3>
                    <p className="text-xs text-muted-foreground">{active.tagline}</p>
                  </div>
                </div>
                {active.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 p-5 sm:p-6 flex items-center gap-3",
                      i === 0 && "border-b sm:border-b-0 sm:border-r border-border/20"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {metric.icon}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gradient">{metric.value}</div>
                      <p className="text-[11px] text-muted-foreground">{metric.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="p-5 sm:p-6">
                {/* Timeline steps nav */}
                <div className="flex items-center gap-0 mb-6 relative">
                  {active.timeline.map((step, i) => (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                      <button
                        onClick={() => setActiveStep(i)}
                        className="flex items-center gap-2.5 group relative z-10"
                      >
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full transition-all duration-300 shadow-sm",
                            activeStep === i
                              ? cn(phaseDotColors[step.phase], "scale-125 shadow-md")
                              : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                            activeStep === i ? "text-foreground" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                          )}
                        >
                          {step.phase}
                        </span>
                      </button>
                      {i < active.timeline.length - 1 && (
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

                {/* Step content */}
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
                          phaseColors[active.timeline[activeStep].phase]
                        )}
                      >
                        {active.timeline[activeStep].phase}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1.5">
                          {active.timeline[activeStep].title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {active.timeline[activeStep].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/15">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Previous
                    </button>
                    <div className="flex gap-1.5">
                      {active.timeline.map((_, i) => (
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
                      onClick={() => setActiveStep(Math.min(active.timeline.length - 1, activeStep + 1))}
                      disabled={activeStep === active.timeline.length - 1}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Link
                    to={`/blog/${active.slug}`}
                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors group"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
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
