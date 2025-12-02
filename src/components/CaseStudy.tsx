import { Clock, DollarSign, Building2, CheckCircle } from "lucide-react";
import aptLocatorLogo from "@/assets/apt-locator-logo.png";

const metrics = [
  {
    icon: DollarSign,
    value: "$6,000–$10,000",
    label: "Monthly Cost Savings",
  },
  {
    icon: Clock,
    value: "~55 hours",
    label: "Saved Weekly Across Team",
  },
];

const sections = [
  {
    title: "Problem",
    content:
      "Despite strong demand, APT Locator's processes were slowing the business down. ISAs spent too much time qualifying leads and manually compiling apartment suggestions. Founders were losing hours each month to invoice creation and follow-up. Internal AI adoption was low, and the company lacked a scalable operational foundation to support their growth. These bottlenecks created slow response times, inconsistent client experiences, and unnecessary labor costs.",
  },
  {
    title: "Solution",
    content:
      "Flow Theory AI redesigned APT Locator's workflows from the ground up. We automated core ISA tasks and introduced a streamlined qualification process that significantly reduced their workload. We built a custom AI-powered apartment suggestion bot that could generate personalized recommendations in seconds, improving both speed and consistency. We also automated their entire invoicing workflow, removing manual data entry and accelerating cash collection. Finally, we trained the founders to integrate AI into daily operations, giving them long-term independence and eliminating vendor reliance.",
  },
  {
    title: "Results",
    content:
      "APT Locator now operates with a faster, leaner, and more scalable system. Their ISAs work with dramatically reduced friction, apartment recommendations are generated almost instantly, and invoicing runs automatically. The result is a stronger operational backbone, improved customer experience, and leadership that is fully equipped to leverage AI across the company.",
  },
];

export const CaseStudy = () => {
  return (
    <section id="case-study" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Case Study
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              AI Transformation for One of the{" "}
              <span className="text-gradient">Largest Apartment Locating Companies</span>{" "}
              in the U.S.
            </h2>
          </div>

          {/* Company & Overview */}
          <div className="glass rounded-2xl p-8 sm:p-10 mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <img 
                src={aptLocatorLogo} 
                alt="APT Locator logo" 
                className="w-24 h-24 object-contain shrink-0"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold mb-1">APT Locator</h3>
                <p className="text-muted-foreground">Leading Apartment Locating Company</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              APT Locator is one of the largest apartment locating companies in the United States. As their lead volume grew, their internal systems couldn't keep up. ISAs were overwhelmed with repetitive tasks, apartment recommendations took too long, and invoicing required hours of manual work. Flow Theory AI partnered with them to modernize their operations using automation and AI, while also empowering the founders to use AI internally without relying on external vendors.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="glass rounded-2xl p-8 text-center hover:bg-primary/5 transition-all duration-500"
              >
                <metric.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {metric.value}
                </div>
                <p className="text-muted-foreground font-medium">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Problem, Solution, Results */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="glass rounded-2xl p-8 sm:p-10 hover:bg-primary/5 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold">{section.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Success Indicator */}
          <div className="mt-10 flex items-center justify-center gap-3 text-primary">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">Transformation Complete</span>
          </div>
        </div>
      </div>
    </section>
  );
};
