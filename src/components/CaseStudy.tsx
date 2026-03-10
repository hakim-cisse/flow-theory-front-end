import { useState, useRef } from "react";
import { Clock, DollarSign, Building2, ChevronDown, ChevronUp, CheckCircle, PhoneOff, Zap } from "lucide-react";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
      "APT Locator is one of the largest apartment locating companies in the United States. As their lead volume grew, their internal systems couldn't keep up. ISAs were overwhelmed with repetitive tasks, apartment recommendations took too long, and invoicing required hours of manual work. Flow Theory AI partnered with them to modernize their operations using automation and AI, while also empowering the founders to use AI internally without relying on external vendors.",
    metrics: [
      { icon: <DollarSign className="w-7 h-7 text-primary" />, value: "$6,000–$10,000", label: "Monthly Cost Savings" },
      { icon: <Clock className="w-7 h-7 text-primary" />, value: "~55 hours", label: "Saved Weekly Across Team" },
    ],
    problem:
      "Despite strong demand, APT Locator's processes were slowing the business down. ISAs spent too much time qualifying leads and manually compiling apartment suggestions. Founders were losing hours each month to invoice creation and follow-up. Internal AI adoption was low, and the company lacked a scalable operational foundation to support their growth.",
    solution:
      "Flow Theory AI redesigned APT Locator's workflows from the ground up. We automated core ISA tasks and introduced a streamlined qualification process. We built a custom AI-powered apartment suggestion bot that could generate personalized recommendations in seconds. We also automated their entire invoicing workflow and trained the founders to integrate AI into daily operations.",
    results:
      "APT Locator now operates with a faster, leaner, and more scalable system. Their ISAs work with dramatically reduced friction, apartment recommendations are generated almost instantly, and invoicing runs automatically.",
  },
  {
    id: "empower-estates-network",
    company: "Empower Estates Network",
    logo: eenLogo,
    tagline: "Real Estate Wholesaling Network",
    overview:
      "Empower Estates Network is a growing real estate wholesaling company managing high volumes of seller and buyer activity through their CRM. As deal flow increased, operational inefficiencies began to surface.",
    metrics: [
      { icon: <PhoneOff className="w-7 h-7 text-primary" />, value: "0 duplicate seller calls", label: "Across Active Dialer Queues" },
      { icon: <Zap className="w-7 h-7 text-primary" />, value: "3–5× faster", label: "Buyer Outreach After Contract" },
    ],
    problem:
      "Empower Estates Network's CRM did not account for multiple contacts associated with a single property address. This caused sellers to receive repeated calls from different reps, creating frustration and wasting dialer capacity.",
    solution:
      "Flow Theory AI redesigned Empower Estates Network's operational workflows. We built a system that identifies all contacts tied to a single property address and automatically removes duplicates from the dialer queue. We created an automated buyer outreach system and implemented a real-time notification bot.",
    results:
      "Duplicate seller calls were reduced to near zero, buyer outreach time decreased by an estimated 60–75%, and founders gained immediate visibility into high-intent leads as they occur.",
  },
];

const CaseStudyCard = ({ study, index }: { study: CaseStudyData; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation();

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    } else {
      setIsExpanded(false);
      setTimeout(() => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const sections = [
    { title: "Problem", content: study.problem },
    { title: "Solution", content: study.solution },
    { title: "Results", content: study.results },
  ];

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className="relative rounded-2xl border border-border/30 bg-card/30 hover:border-primary/20 transition-all duration-500 overflow-hidden"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s ease-out ${index * 0.2}s`,
      }}
    >
      <div className="p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center border border-border/30">
            <img src={study.logo} alt={`${study.company} logo`} className="w-12 h-12 object-contain" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold mb-1">{study.company}</h3>
            <p className="text-muted-foreground text-sm">{study.tagline}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {study.metrics.map((metric, idx) => (
            <div key={idx} className="rounded-xl bg-primary/5 border border-primary/10 p-6">
              <div className="flex items-center gap-3 mb-2">{metric.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{metric.value}</div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleToggle}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-primary/10 hover:bg-primary/15 text-primary font-semibold transition-all duration-300 border border-primary/20 text-sm"
        >
          {isExpanded ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>View Full Case Study <ChevronDown className="w-4 h-4" /></>}
        </button>
      </div>

      <div
        ref={contentRef}
        className={cn("grid transition-all duration-500 ease-in-out", isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
      >
        <div className="overflow-hidden">
          <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-2 space-y-4">
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-6">
              <h4 className="text-lg font-semibold mb-3">Overview</h4>
              <p className="text-muted-foreground leading-relaxed">{study.overview}</p>
            </div>
            {sections.map((section, idx) => (
              <div key={section.title} className="rounded-xl bg-primary/5 border border-primary/10 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-semibold">{section.title}</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-500 text-sm">Transformation Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CaseStudy = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="case-studies" className="py-24 sm:py-32 relative overflow-hidden section-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            ref={ref}
            className="mb-16"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.7s ease-out',
            }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-mono text-primary/80 mb-6">
              <Building2 className="w-3.5 h-3.5 inline mr-2" />
              Case Studies
            </span>
            <h2 className="text-heading max-w-3xl">
              Real founders.<br />
              <span className="text-gradient">Real results.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mt-6">
              Discover how we've helped founders streamline operations, reduce costs, and scale with AI-powered solutions.
            </p>
          </div>

          <div className="space-y-6">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
