import { useState } from "react";
import { Building2, HeartPulse, ShoppingCart, Users, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    problem: "Automating deal flow, underwriting, and investor operations.",
    highlights: [
      "Lead intake + deduplication systems",
      "ARV / CMA tools and deal analysis workflows",
      "Pipeline and disposition acceleration",
    ],
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    problem: "Reducing administrative burden and improving patient flow.",
    highlights: [
      "Intake + scheduling automation",
      "Data organization and internal workflows",
      "Compliance-ready reporting systems",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    problem: "Scaling operations beyond manual processes.",
    highlights: [
      "Order and fulfillment automation",
      "Customer lifecycle + retention systems",
      "AI-powered support and routing",
    ],
  },
  {
    icon: Users,
    title: "Recruitment",
    problem: "Streamlining candidate pipelines and placements.",
    highlights: [
      "Candidate screening + outreach automation",
      "CRM and workflow optimization",
      "Interview scheduling systems",
    ],
  },
];

const cardVariants = {
  rest: {
    y: 0,
    boxShadow: "0 2px 12px -4px hsl(193 100% 50% / 0)",
  },
  hover: {
    y: -6,
    boxShadow: "0 16px 48px -12px hsl(193 100% 50% / 0.15)",
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const expandVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto" as const,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
};

const bulletVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.35, ease: "easeOut" as const },
  }),
};

const IndustryCard = ({ industry, index, isActive, onToggle, isVisible }: {
  industry: typeof industries[0];
  index: number;
  isActive: boolean;
  onToggle: () => void;
  isVisible: boolean;
}) => {
  const Icon = industry.icon;

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onClick={onToggle}
      className={cn(
        "relative rounded-xl border cursor-pointer overflow-hidden transition-colors duration-500",
        isActive
          ? "border-primary/30 bg-primary/[0.04]"
          : "border-border/30 bg-card/50 hover:border-primary/20"
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease-out ${index * 0.12}s, transform 0.6s ease-out ${index * 0.12}s`,
      }}
    >
      {/* Glow orb */}
      <motion.div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] bg-primary/10 pointer-events-none"
        animate={{ opacity: isActive ? 0.8 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 p-7 sm:p-9">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.div
              className={cn(
                "w-11 h-11 rounded-lg flex items-center justify-center transition-colors duration-300",
                isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              )}
              animate={{ scale: isActive ? 1.08 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>
            <h3 className={cn(
              "text-lg font-bold transition-colors duration-300",
              isActive ? "text-primary" : "text-foreground"
            )}>
              {industry.title}
            </h3>
          </div>

          <motion.div
            animate={{ rotate: isActive ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-primary/40"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Problem statement */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {industry.problem}
        </p>

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              variants={expandVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-primary/10 space-y-3">
                {industry.highlights.map((bullet, j) => (
                  <motion.div
                    key={bullet}
                    variants={bulletVariants}
                    initial="hidden"
                    animate="visible"
                    custom={j}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground">{bullet}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const Industries = () => {
  const [active, setActive] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden section-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="mb-20">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, headerVisible)}>Where we operate</span>
            <h2 className="text-heading max-w-3xl" style={staggerStyle(1, headerVisible)}>
              Industries We<br />
              <span className="text-gradient">Specialize In</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, headerVisible)} />
            <p className="text-subheading text-muted-foreground max-w-2xl mt-8" style={staggerStyle(3, headerVisible)}>
              We design systems and automation tailored to how each industry actually operates.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {industries.map((industry, i) => (
              <IndustryCard
                key={industry.title}
                industry={industry}
                index={i}
                isActive={active === i}
                onToggle={() => setActive(active === i ? null : i)}
                isVisible={gridVisible}
              />
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground/50 mt-10 tracking-wide" style={staggerStyle(5, gridVisible)}>
            Don't see your industry? We focus on operational complexity, not labels.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
