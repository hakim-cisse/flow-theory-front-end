import { useState, useRef } from "react";
import { Clock, DollarSign, Building2, ChevronRight, PhoneOff, Zap } from "lucide-react";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import { cn } from "@/lib/utils";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

interface MetricItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface CaseStudyData {
  id: string;
  company: string;
  logo: string;
  tagline: string;
  overview: string;
  metrics: MetricItem[];
  problem: string;
  solution: string;
  results: string;
}

const caseStudies: CaseStudyData[] = [
  {
    id: "apt-locator",
    company: "APT Locator",
    logo: aptLocatorLogo,
    tagline: "Leading Apartment Locating Company",
    overview:
      "APT Locator is one of the largest apartment locating companies in the United States. As their lead volume grew, their internal systems couldn't keep up. Flow Theory AI partnered with them to modernize their operations using automation and AI.",
    metrics: [
      { icon: <DollarSign className="w-5 h-5 text-primary" />, value: "$72K–$120K", label: "Yearly Savings" },
      { icon: <Clock className="w-5 h-5 text-primary" />, value: "~55 hrs", label: "Saved Weekly" },
    ],
    problem:
      "ISAs spent too much time qualifying leads and manually compiling apartment suggestions. Founders were losing hours each month to invoice creation and follow-up. Internal AI adoption was low.",
    solution:
      "We automated core ISA tasks, built a custom AI-powered apartment suggestion bot, automated their entire invoicing workflow, and trained the founders to integrate AI into daily operations.",
    results:
      "ISAs work with dramatically reduced friction, apartment recommendations are generated almost instantly, and invoicing runs automatically. The result is a stronger operational backbone and improved customer experience.",
  },
  {
    id: "empower-estates-network",
    company: "Empower Estates Network",
    logo: eenLogo,
    tagline: "Real Estate Wholesaling Network",
    overview:
      "Empower Estates Network is a growing real estate wholesaling company. As deal flow increased, operational inefficiencies surfaced. Flow Theory AI rebuilt their workflows using automation and custom integrations.",
    metrics: [
      { icon: <PhoneOff className="w-5 h-5 text-primary" />, value: "0 duplicates", label: "Seller Call Overlap" },
      { icon: <Zap className="w-5 h-5 text-primary" />, value: "3–5× faster", label: "Buyer Outreach" },
    ],
    problem:
      "Multiple contacts tied to a single property caused repeated calls. Buyer outreach only began after manual intervention, and founders had limited insight into hot leads.",
    solution:
      "We built a deduplication system for the dialer queue, created an automated buyer outreach system triggered on contract, and implemented a real-time hot lead notification bot.",
    results:
      "Duplicate seller calls reduced to near zero, buyer outreach time decreased by 60–75%, and founders gained immediate visibility into high-intent leads as they occur.",
  },
];

export const CaseStudy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const active = caseStudies[activeIndex];

  const sections = [
    { key: "overview", title: "Overview", content: active.overview },
    { key: "problem", title: "Problem", content: active.problem },
    { key: "solution", title: "Solution", content: active.solution },
    { key: "results", title: "Results", content: active.results },
  ];

  return (
    <section id="case-studies" className="py-20 sm:py-28 relative overflow-hidden section-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-14">
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

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {caseStudies.map((study, i) => (
              <button
                key={study.id}
                onClick={() => { setActiveIndex(i); setExpandedSection(null); }}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-all duration-300 border",
                  activeIndex === i
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-card/30 border-border/30 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                )}
              >
                <img src={study.logo} alt={study.company} className="w-6 h-6 object-contain" />
                <span className="hidden sm:inline">{study.company}</span>
              </button>
            ))}
          </div>

          {/* Active Card */}
          <div className="border border-border/30 bg-card/30 transition-all duration-500">
            {/* Metrics row */}
            <div className="grid grid-cols-2 border-b border-border/20">
              {active.metrics.map((metric, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-5 sm:p-6 flex items-center gap-4",
                    i === 0 && "border-r border-border/20"
                  )}
                >
                  {metric.icon}
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gradient">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable sections */}
            <div className="divide-y divide-border/20">
              {sections.map((section) => (
                <div key={section.key}>
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === section.key ? null : section.key)
                    }
                    className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left hover:bg-primary/[0.03] transition-colors duration-200"
                  >
                    <span className={cn(
                      "text-sm font-semibold transition-colors duration-200",
                      expandedSection === section.key ? "text-primary" : "text-foreground"
                    )}>
                      {section.title}
                    </span>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform duration-300",
                        expandedSection === section.key && "rotate-90 text-primary"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-400 ease-in-out",
                      expandedSection === section.key
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
