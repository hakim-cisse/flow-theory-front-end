import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoDef {
  name: string;
  color: string;
  icon: string;
}

const ALL_LOGOS: LogoDef[] = [
  { name: "n8n", color: "#EA4B71", icon: "https://cdn.simpleicons.org/n8n/EA4B71" },
  { name: "Make", color: "#6D3BF5", icon: "https://cdn.simpleicons.org/make/6D3BF5" },
  { name: "Zapier", color: "#FF4A00", icon: "https://cdn.simpleicons.org/zapier/FF4A00" },
  { name: "Slack", color: "#E01E5A", icon: "https://cdn.simpleicons.org/slack/E01E5A" },
  { name: "Shopify", color: "#7AB55C", icon: "https://cdn.simpleicons.org/shopify/7AB55C" },
  { name: "Google Calendar", color: "#4285F4", icon: "https://cdn.simpleicons.org/googlecalendar/4285F4" },
  { name: "HubSpot", color: "#FF7A59", icon: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Salesforce", color: "#00A1E0", icon: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "Notion", color: "#ABABAB", icon: "https://cdn.simpleicons.org/notion/ABABAB" },
  { name: "Airtable", color: "#18BFFF", icon: "https://cdn.simpleicons.org/airtable/18BFFF" },
  { name: "Stripe", color: "#635BFF", icon: "https://cdn.simpleicons.org/stripe/635BFF" },
  { name: "Twilio", color: "#F22F46", icon: "https://cdn.simpleicons.org/twilio/F22F46" },
  { name: "Monday", color: "#FF3D57", icon: "https://cdn.simpleicons.org/mondaydotcom/FF3D57" },
  { name: "Pipedrive", color: "#1DB954", icon: "https://cdn.simpleicons.org/pipedrive/1DB954" },
  { name: "Zendesk", color: "#49A8A1", icon: "https://cdn.simpleicons.org/zendesk/49A8A1" },
  { name: "Mailchimp", color: "#FFE01B", icon: "https://cdn.simpleicons.org/mailchimp/FFE01B" },
  { name: "Calendly", color: "#006BFF", icon: "https://cdn.simpleicons.org/calendly/006BFF" },
  { name: "Intercom", color: "#6AFDEF", icon: "https://cdn.simpleicons.org/intercom/6AFDEF" },
  { name: "Asana", color: "#F06A6A", icon: "https://cdn.simpleicons.org/asana/F06A6A" },
  { name: "Jira", color: "#0052CC", icon: "https://cdn.simpleicons.org/jira/0052CC" },
  { name: "GitHub", color: "#C9D1D9", icon: "https://cdn.simpleicons.org/github/C9D1D9" },
  { name: "Discord", color: "#5865F2", icon: "https://cdn.simpleicons.org/discord/5865F2" },
  { name: "WhatsApp", color: "#25D366", icon: "https://cdn.simpleicons.org/whatsapp/25D366" },
  { name: "Webflow", color: "#4353FF", icon: "https://cdn.simpleicons.org/webflow/4353FF" },
  { name: "Squarespace", color: "#C9D1D9", icon: "https://cdn.simpleicons.org/squarespace/C9D1D9" },
  { name: "QuickBooks", color: "#2CA01C", icon: "https://cdn.simpleicons.org/quickbooks/2CA01C" },
  { name: "Zoho", color: "#E42527", icon: "https://cdn.simpleicons.org/zoho/E42527" },
  { name: "ClickUp", color: "#7B68EE", icon: "https://cdn.simpleicons.org/clickup/7B68EE" },
  { name: "Supabase", color: "#3ECF8E", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "Trello", color: "#0052CC", icon: "https://cdn.simpleicons.org/trello/0052CC" },
  { name: "Google Sheets", color: "#34A853", icon: "https://cdn.simpleicons.org/googlesheets/34A853" },
  { name: "Microsoft Teams", color: "#6264A7", icon: "https://cdn.simpleicons.org/microsoftteams/6264A7" },
];

const COLS = 4;
const ROWS = 6;
const TOTAL_CELLS = COLS * ROWS;
const VISIBLE_COUNT = 7;

interface HeroLogoGridProps {
  className?: string;
}

export const HeroLogoGrid = ({ className = "" }: HeroLogoGridProps) => {
  const [filledCells, setFilledCells] = useState<Map<number, LogoDef>>(new Map());

  const pickLogos = useCallback(() => {
    const cells = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, VISIBLE_COUNT);
    const shuffled = [...ALL_LOGOS].sort(() => Math.random() - 0.5);
    const m = new Map<number, LogoDef>();
    cells.forEach((c, i) => m.set(c, shuffled[i]));
    return m;
  }, []);

  useEffect(() => { setFilledCells(pickLogos()); }, [pickLogos]);

  // Rotate one logo every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setFilledCells((prev) => {
        const newMap = new Map(prev);
        const keys = Array.from(newMap.keys());
        const removeIdx = keys[Math.floor(Math.random() * keys.length)];
        newMap.delete(removeIdx);
        const empty = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
          .filter((i) => !newMap.has(i))
          .sort(() => Math.random() - 0.5);
        const usedNames = new Set(Array.from(newMap.values()).map((l) => l.name));
        const avail = ALL_LOGOS.filter((l) => !usedNames.has(l.name))
          .sort(() => Math.random() - 0.5);
        if (empty.length && avail.length) {
          newMap.set(empty[0], avail[0]);
        }
        return newMap;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative hidden h-full w-full items-center justify-start overflow-visible pl-6 pointer-events-none select-none lg:flex xl:pl-10 ${className}`}>
      {/* Fade edges into background */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, hsl(var(--section-1)) 0%, transparent 15%),
            linear-gradient(to top, hsl(var(--section-1)) 0%, transparent 15%)
          `,
        }}
      />

      {/* Grid */}
      <div
        className="relative z-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 90px)`,
          gridTemplateRows: `repeat(${ROWS}, 90px)`,
          gap: "20px",
        }}
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
          const logo = filledCells.get(i);
          return (
            <div
              key={i}
              className="relative rounded-2xl transition-all duration-700"
              style={{
                border: `1px solid ${logo ? `${logo.color}30` : "hsl(var(--border) / 0.12)"}`,
                backgroundColor: logo ? `${logo.color}08` : "transparent",
              }}
            >
              <AnimatePresence mode="wait">
                {logo && (
                  <motion.div
                    key={logo.name}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={logo.icon}
                      alt={logo.name}
                      className="w-8 h-8"
                      style={{ filter: `drop-shadow(0 0 10px ${logo.color}40)` }}
                      loading="lazy"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
