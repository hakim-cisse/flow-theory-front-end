import { useState, useRef } from "react";
import { Clock, DollarSign, Building2, ChevronDown, ChevronUp, CheckCircle, PhoneOff, Zap } from "lucide-react";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import eenLogo from "@/assets/een-logo.png";
import { cn } from "@/lib/utils";

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
      "Despite strong demand, APT Locator's processes were slowing the business down. ISAs spent too much time qualifying leads and manually compiling apartment suggestions. Founders were losing hours each month to invoice creation and follow-up. Internal AI adoption was low, and the company lacked a scalable operational foundation to support their growth. These bottlenecks created slow response times, inconsistent client experiences, and unnecessary labor costs.",
    solution:
      "Flow Theory AI redesigned APT Locator's workflows from the ground up. We automated core ISA tasks and introduced a streamlined qualification process that significantly reduced their workload. We built a custom AI-powered apartment suggestion bot that could generate personalized recommendations in seconds, improving both speed and consistency. We also automated their entire invoicing workflow, removing manual data entry and accelerating cash collection. Finally, we trained the founders to integrate AI into daily operations, giving them long-term independence and eliminating vendor reliance.",
    results:
      "APT Locator now operates with a faster, leaner, and more scalable system. Their ISAs work with dramatically reduced friction, apartment recommendations are generated almost instantly, and invoicing runs automatically. The result is a stronger operational backbone, improved customer experience, and leadership that is fully equipped to leverage AI across the company.",
  },
  {
    id: "empower-estates-network",
    company: "Empower Estates Network",
    logo: eenLogo,
    tagline: "Real Estate Wholesaling Network",
    overview:
      "Empower Estates Network is a growing real estate wholesaling company managing high volumes of seller and buyer activity through their CRM. As deal flow increased, operational inefficiencies began to surface. Sales reps were unintentionally calling the same sellers multiple times due to duplicated contact records tied to the same property. Buyer outreach was slow and largely manual, and founders lacked real-time visibility into key sales moments. Flow Theory AI partnered with Empower Estates Network to rebuild these workflows using automation and custom integrations beyond the limits of their CRM.",
    metrics: [
      { icon: <PhoneOff className="w-7 h-7 text-primary" />, value: "0 duplicate seller calls", label: "Across Active Dialer Queues" },
      { icon: <Zap className="w-7 h-7 text-primary" />, value: "3–5× faster", label: "Buyer Outreach After Contract" },
    ],
    problem:
      "Empower Estates Network's CRM did not account for multiple contacts associated with a single property address. This caused sellers to receive repeated calls from different reps, creating frustration and wasting dialer capacity. Buyer outreach only began after manual intervention, slowing dispositions once properties went under contract. In addition, founders had limited insight into when reps generated hot leads, limiting accountability and real-time performance awareness.",
    solution:
      "Flow Theory AI redesigned Empower Estates Network's operational workflows. We built a system that identifies all contacts tied to a single property address and automatically removes duplicates from the dialer queue, eliminating repeat outreach. We then created an automated buyer outreach system that contacts matched buyers within minutes of a property going under contract, reducing disposition delays. Finally, we implemented a real-time notification bot that alerts the team when a sales rep generates a hot lead, increasing transparency and reinforcing performance. These solutions required external tools and integrations to extend beyond native CRM limitations.",
    results:
      "Empower Estates Network now operates with a cleaner, more efficient sales system. Duplicate seller calls were reduced to near zero, buyer outreach time decreased by an estimated 60–75%, and founders gained immediate visibility into high-intent leads as they occur. Sales reps experience fewer stalled deals, improved focus, and clearer feedback loops, resulting in faster deal execution and a more disciplined sales operation.",
  },
];

const CaseStudyCard = ({ study }: { study: CaseStudyData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div ref={cardRef} className="relative border border-border/30 bg-card/30 hover:border-primary/20 transition-all duration-500">
      <div className="p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <img src={study.logo} alt={`${study.company} logo`} className="w-16 h-16 object-contain shrink-0" />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold mb-1">{study.company}</h3>
            <p className="text-muted-foreground text-sm">{study.tagline}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {study.metrics.map((metric, index) => (
            <div key={index} className="bg-primary/5 border border-primary/10 p-6">
              <div className="flex items-center gap-3 mb-2">{metric.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{metric.value}</div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleToggle}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary/10 hover:bg-primary/15 text-primary font-semibold transition-all duration-300 border border-primary/20 text-sm"
        >
          {isExpanded ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>View Full Case Study <ChevronDown className="w-4 h-4" /></>}
        </button>
      </div>

      <div
        ref={contentRef}
        className={cn("grid transition-all duration-500 ease-in-out", isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
      >
        <div className="overflow-hidden">
          <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-2 space-y-6">
            <div className="bg-primary/5 border border-primary/10 p-6">
              <h4 className="text-lg font-semibold mb-3">Overview</h4>
              <p className="text-muted-foreground leading-relaxed">{study.overview}</p>
            </div>
            {sections.map((section, index) => (
              <div key={section.title} className="bg-primary/5 border border-primary/10 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold">{section.title}</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20">
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
  return (
    <section id="case-studies" className="py-24 sm:py-32 relative overflow-hidden section-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <span className="text-mono text-primary/70 block mb-6">
              <Building2 className="w-3.5 h-3.5 inline mr-2" />
              Case Studies
            </span>
            <h2 className="text-heading max-w-3xl">
              Real businesses.<br />
              <span className="text-gradient">Real results.</span>
            </h2>
            <div className="accent-bar mt-6" />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8">
              Discover how we've helped founders streamline operations, reduce costs, and scale with AI-powered solutions.
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
