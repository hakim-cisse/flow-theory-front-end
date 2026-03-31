import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const logos = [
  { name: "n8n", color: "#EA4B71" },
  { name: "Make", color: "#6D3BF5" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Slack", color: "#4A154B" },
  { name: "Shopify", color: "#96BF48" },
  { name: "Google Calendar", color: "#4285F4", short: "GCal" },
  { name: "Squarespace", color: "#FFFFFF" },
  { name: "GoHighLevel", color: "#F6A609", short: "GHL" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Salesforce", color: "#00A1E0" },
  { name: "Notion", color: "#FFFFFF" },
  { name: "Airtable", color: "#18BFFF" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Twilio", color: "#F22F46" },
  { name: "Monday.com", color: "#FF3D57", short: "Monday" },
  { name: "Pipedrive", color: "#017737" },
  { name: "Freshworks", color: "#F47920" },
  { name: "Zendesk", color: "#03363D" },
  { name: "Mailchimp", color: "#FFE01B" },
  { name: "SendGrid", color: "#1A82E2" },
  { name: "Calendly", color: "#006BFF" },
  { name: "Typeform", color: "#262627" },
  { name: "Intercom", color: "#1F8FED" },
  { name: "Asana", color: "#F06A6A" },
  { name: "Trello", color: "#0052CC" },
  { name: "Jira", color: "#0052CC" },
  { name: "GitHub", color: "#FFFFFF" },
  { name: "Discord", color: "#5865F2" },
  { name: "WhatsApp", color: "#25D366" },
  { name: "Webflow", color: "#4353FF" },
  { name: "QuickBooks", color: "#2CA01C" },
  { name: "Xero", color: "#13B5EA" },
  { name: "Zoho", color: "#C8202B" },
  { name: "ActiveCampaign", color: "#356AE6", short: "ActiveC" },
  { name: "ClickUp", color: "#7B68EE" },
  { name: "Supabase", color: "#3ECF8E" },
];

// Workflow simulation data
const workflows = [
  {
    label: "Lead Capture → CRM",
    steps: ["Typeform", "n8n", "HubSpot", "Slack"],
    colors: ["#262627", "#EA4B71", "#FF7A59", "#4A154B"],
  },
  {
    label: "E-Commerce Sync",
    steps: ["Shopify", "Make", "Airtable", "Mailchimp"],
    colors: ["#96BF48", "#6D3BF5", "#18BFFF", "#FFE01B"],
  },
  {
    label: "Scheduling Pipeline",
    steps: ["Calendly", "Zapier", "Google Calendar", "Slack"],
    colors: ["#006BFF", "#FF4A00", "#4285F4", "#4A154B"],
  },
  {
    label: "Support Ticket Flow",
    steps: ["Intercom", "n8n", "Jira", "Discord"],
    colors: ["#1F8FED", "#EA4B71", "#0052CC", "#5865F2"],
  },
];

const GRID_COLS = 6;
const GRID_ROWS = 6;

export const Integrations = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  // Cycle through workflow steps
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 3) {
          setActiveWorkflow((w) => (w + 1) % workflows.length);
          return -1;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isVisible]);

  const currentWorkflow = workflows[activeWorkflow];

  // Determine which logos are "active" in the current workflow step
  const activeLogo = activeStep >= 0 ? currentWorkflow.steps[activeStep] : null;
  const activeLogos = currentWorkflow.steps.slice(0, activeStep + 1);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 section-3 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-mono text-primary tracking-widest uppercase text-sm mb-6"
            >
              Integrations & Automation
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              <span className="text-foreground">Your team builds</span>
              <br />
              <span className="text-foreground">integrations.</span>
              <br />
              <span className="text-muted-foreground">We automate them.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8 leading-relaxed"
            >
              We connect <strong className="text-foreground">CRMs, ERPs, databases,</strong> and
              any system with an API — delivered in{" "}
              <strong className="text-foreground">1–2 weeks</strong>.
            </motion.p>

            {/* Workflow indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-3">
                <Zap className="w-3 h-3 text-primary" />
                Live Workflow Preview
              </div>
              <div className="bg-card/50 border border-border/40 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeWorkflow}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-sm font-medium text-foreground"
                    >
                      {currentWorkflow.label}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-3">
                  {currentWorkflow.steps.map((step, i) => {
                    const isActive = i <= activeStep;
                    const isCurrent = i === activeStep;
                    return (
                      <div key={`${activeWorkflow}-${i}`} className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale: isCurrent ? 1.1 : 1,
                            opacity: isActive ? 1 : 0.3,
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all duration-300"
                            style={{
                              borderColor: isActive
                                ? currentWorkflow.colors[i]
                                : "hsl(var(--border))",
                              backgroundColor: isActive
                                ? `${currentWorkflow.colors[i]}20`
                                : "transparent",
                              color: isActive
                                ? currentWorkflow.colors[i]
                                : "hsl(var(--muted-foreground))",
                            }}
                          >
                            {(logos.find((l) => l.name === step) as any)?.short?.[0] ||
                              step[0]}
                          </div>
                          {isCurrent && (
                            <motion.div
                              layoutId="workflow-pulse"
                              className="absolute inset-0 rounded-lg"
                              style={{
                                boxShadow: `0 0 20px ${currentWorkflow.colors[i]}40`,
                              }}
                            />
                          )}
                        </motion.div>
                        {i < currentWorkflow.steps.length - 1 && (
                          <motion.div
                            animate={{
                              scaleX: i < activeStep ? 1 : 0,
                              opacity: i < activeStep ? 1 : 0.2,
                            }}
                            className="w-6 h-px origin-left"
                            style={{
                              backgroundColor:
                                i < activeStep
                                  ? currentWorkflow.colors[i]
                                  : "hsl(var(--border))",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
                Scope Your Integration <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-border/50 text-foreground hover:bg-card"
              >
                See what we build
              </Button>
            </motion.div>
          </div>

          {/* Right side - Logo grid */}
          <div className="relative hidden lg:block">
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
              }}
            >
              {logos.slice(0, GRID_COLS * GRID_ROWS).map((logo, index) => {
                const isInWorkflow = activeLogos.includes(logo.name);
                const isCurrentStep = activeLogo === logo.name;
                const isHovered = hoveredLogo === logo.name;
                const shouldHighlight = isInWorkflow || isHovered;

                return (
                  <motion.div
                    key={logo.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isVisible
                        ? {
                            opacity: 1,
                            scale: isCurrentStep ? 1.08 : 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.4,
                      delay: index * 0.03,
                      scale: { type: "spring", stiffness: 300 },
                    }}
                    onMouseEnter={() => setHoveredLogo(logo.name)}
                    onMouseLeave={() => setHoveredLogo(null)}
                    className="relative group cursor-pointer"
                  >
                    <div
                      className="aspect-square rounded-xl border flex items-center justify-center transition-all duration-300 relative overflow-hidden"
                      style={{
                        borderColor: shouldHighlight
                          ? `${logo.color}60`
                          : "hsl(var(--border) / 0.3)",
                        backgroundColor: shouldHighlight
                          ? `${logo.color}10`
                          : "hsl(var(--card) / 0.3)",
                      }}
                    >
                      {/* Glow effect */}
                      {isCurrentStep && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 rounded-xl"
                          style={{
                            boxShadow: `inset 0 0 30px ${logo.color}15, 0 0 30px ${logo.color}20`,
                          }}
                        />
                      )}

                      <span
                        className="text-[10px] font-semibold tracking-tight text-center leading-tight px-1 relative z-10 transition-all duration-300"
                        style={{
                          color: shouldHighlight
                            ? logo.color
                            : "hsl(var(--muted-foreground) / 0.4)",
                        }}
                      >
                        {(logo as any).short || logo.name}
                      </span>
                    </div>

                    {/* Hover tooltip */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border/50 rounded-md px-2 py-1 text-[10px] text-foreground whitespace-nowrap z-20 shadow-lg"
                      >
                        {logo.name}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Connection lines overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ opacity: 0.15 }}
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Workflow selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-2 mt-16 flex-wrap"
        >
          {workflows.map((wf, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveWorkflow(i);
                setActiveStep(-1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                activeWorkflow === i
                  ? "bg-primary/10 border-primary/40 text-primary"
                  : "bg-card/30 border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
              }`}
            >
              {wf.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
