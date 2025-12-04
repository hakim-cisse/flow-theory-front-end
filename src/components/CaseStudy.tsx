import { useState, useRef } from "react";
import { Clock, DollarSign, Building2, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";
import { cn } from "@/lib/utils";

interface CaseStudyData {
  id: string;
  company: string;
  logo: string;
  tagline: string;
  overview: string;
  metrics: {
    costSavings: string;
    timeSavings: string;
  };
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
    metrics: {
      costSavings: "$6,000–$10,000",
      timeSavings: "~55 hours",
    },
    problem:
      "Despite strong demand, APT Locator's processes were slowing the business down. ISAs spent too much time qualifying leads and manually compiling apartment suggestions. Founders were losing hours each month to invoice creation and follow-up. Internal AI adoption was low, and the company lacked a scalable operational foundation to support their growth. These bottlenecks created slow response times, inconsistent client experiences, and unnecessary labor costs.",
    solution:
      "Flow Theory AI redesigned APT Locator's workflows from the ground up. We automated core ISA tasks and introduced a streamlined qualification process that significantly reduced their workload. We built a custom AI-powered apartment suggestion bot that could generate personalized recommendations in seconds, improving both speed and consistency. We also automated their entire invoicing workflow, removing manual data entry and accelerating cash collection. Finally, we trained the founders to integrate AI into daily operations, giving them long-term independence and eliminating vendor reliance.",
    results:
      "APT Locator now operates with a faster, leaner, and more scalable system. Their ISAs work with dramatically reduced friction, apartment recommendations are generated almost instantly, and invoicing runs automatically. The result is a stronger operational backbone, improved customer experience, and leadership that is fully equipped to leverage AI across the company.",
  },
];

const CaseStudyCard = ({ study }: { study: CaseStudyData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    } else {
      setIsExpanded(false);
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const sections = [
    { title: "Problem", content: study.problem },
    { title: "Solution", content: study.solution },
    { title: "Results", content: study.results },
  ];

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 p-[2px] shadow-xl shadow-primary/10"
    >
      <div className="glass rounded-2xl overflow-hidden bg-background/80 backdrop-blur-xl">
        {/* Header - Always Visible */}
        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <img
              src={study.logo}
              alt={`${study.company} logo`}
              className="w-20 h-20 object-contain shrink-0"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold mb-1">{study.company}</h3>
              <p className="text-muted-foreground">{study.tagline}</p>
            </div>
          </div>

          {/* Metrics - Always Visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-primary/5 rounded-xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                {study.metrics.costSavings}
              </div>
              <p className="text-sm text-muted-foreground font-medium">Monthly Cost Savings</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-5 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                {study.metrics.timeSavings}
              </div>
              <p className="text-sm text-muted-foreground font-medium">Saved Weekly Across Team</p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 text-primary font-semibold transition-all duration-300 border border-primary/20"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-5 h-5 transition-transform duration-300" />
              </>
            ) : (
              <>
                View Full Case Study <ChevronDown className="w-5 h-5 transition-transform duration-300 animate-bounce" />
              </>
            )}
          </button>
        </div>

        {/* Expandable Content */}
        <div
          ref={contentRef}
          className={cn(
            "grid transition-all duration-500 ease-in-out",
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-2 space-y-6">
              {/* Overview */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-3">Overview</h4>
                <p className="text-muted-foreground leading-relaxed">{study.overview}</p>
              </div>

              {/* Problem, Solution, Results */}
              {sections.map((section, index) => (
                <div
                  key={section.title}
                  className="bg-primary/5 border border-primary/10 rounded-xl p-6 transform transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-semibold">{section.title}</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}

              {/* Success Indicator */}
              <div className="flex items-center justify-center gap-3 text-primary pt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-500">Transformation Complete</span>
                </div>
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
    <section id="case-study" className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      {/* Background Effects */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 shadow-lg shadow-primary/10">
              <Building2 className="w-4 h-4" />
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              AI Transformation for{" "}
              <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how we've helped businesses streamline operations, reduce costs, and scale with AI-powered solutions.
            </p>
          </div>

          {/* Case Studies */}
          <div className="space-y-8">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
