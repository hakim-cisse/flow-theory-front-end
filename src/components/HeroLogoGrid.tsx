import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "n8n", color: "#EA4B71" },
  { name: "Make", color: "#6D3BF5" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Slack", color: "#E01E5A" },
  { name: "Shopify", color: "#96BF48" },
  { name: "GCal", color: "#4285F4" },
  { name: "GHL", color: "#F6A609" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Salesforce", color: "#00A1E0" },
  { name: "Notion", color: "#FFFFFFCC" },
  { name: "Airtable", color: "#18BFFF" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Twilio", color: "#F22F46" },
  { name: "Monday", color: "#FF3D57" },
  { name: "Pipedrive", color: "#017737" },
  { name: "Zendesk", color: "#03363D" },
  { name: "Mailchimp", color: "#FFE01B" },
  { name: "SendGrid", color: "#1A82E2" },
  { name: "Calendly", color: "#006BFF" },
  { name: "Intercom", color: "#1F8FED" },
  { name: "Asana", color: "#F06A6A" },
  { name: "Jira", color: "#0052CC" },
  { name: "GitHub", color: "#FFFFFFCC" },
  { name: "Discord", color: "#5865F2" },
  { name: "Webflow", color: "#4353FF" },
  { name: "Xero", color: "#13B5EA" },
  { name: "Zoho", color: "#C8202B" },
  { name: "ClickUp", color: "#7B68EE" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "Trello", color: "#0052CC" },
];

const COLS = 5;
const ROWS = 6;

// Indices that will be "highlighted" (have a colored logo visible)
const HIGHLIGHTED = [2, 7, 8, 13, 18, 21, 24, 28];

export const HeroLogoGrid = () => {
  const [pulseIndex, setPulseIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(HIGHLIGHTED[Math.floor(Math.random() * HIGHLIGHTED.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:flex items-center justify-end pointer-events-none overflow-hidden">
      {/* Fade overlay so logos blend into the dark background on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--section-1))] via-[hsl(var(--section-1)/0.6)] to-transparent z-10" />
      
      <div
        className="relative grid gap-3 pr-8 xl:pr-16 z-0"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 72px)`,
          gridTemplateRows: `repeat(${ROWS}, 72px)`,
        }}
      >
        {logos.slice(0, COLS * ROWS).map((logo, i) => {
          const isHighlighted = HIGHLIGHTED.includes(i);
          const isPulsing = pulseIndex === i;

          return (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.04 }}
              className="relative"
            >
              <div
                className="w-[72px] h-[72px] rounded-xl border flex items-center justify-center transition-all duration-700"
                style={{
                  borderColor: isHighlighted
                    ? `${logo.color}35`
                    : "hsl(var(--border) / 0.15)",
                  backgroundColor: isHighlighted
                    ? `${logo.color}08`
                    : "hsl(var(--card) / 0.15)",
                }}
              >
                <span
                  className="text-[11px] font-semibold tracking-tight text-center leading-tight transition-all duration-700"
                  style={{
                    color: isHighlighted ? logo.color : "hsl(var(--muted-foreground) / 0.15)",
                  }}
                >
                  {logo.name}
                </span>
              </div>

              {/* Random pulse glow */}
              {isPulsing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    boxShadow: `0 0 30px ${logo.color}30, inset 0 0 20px ${logo.color}10`,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
