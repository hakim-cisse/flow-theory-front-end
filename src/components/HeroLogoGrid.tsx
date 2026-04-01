import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiAirtable,
  SiAsana,
  SiCalendly,
  SiClickup,
  SiDiscord,
  SiGithub,
  SiGooglecalendar,
  SiGooglesheets,
  SiHubspot,
  SiIntercom,
  SiJira,
  SiMailchimp,
  SiMake,
  SiN8N,
  SiNotion,
  SiQuickbooks,
  SiSalesforce,
  SiShopify,
  SiSlack,
  SiSquarespace,
  SiStripe,
  SiSupabase,
  SiTrello,
  SiTwilio,
  SiWebflow,
  SiWhatsapp,
  SiZapier,
  SiZendesk,
  SiZoho,
} from "react-icons/si";

interface LogoDef {
  name: string;
  color: string;
  icon: IconType;
}

const ALL_LOGOS: LogoDef[] = [
  { name: "n8n", color: "344 78% 60%", icon: SiN8N },
  { name: "Make", color: "255 86% 60%", icon: SiMake },
  { name: "Zapier", color: "18 100% 54%", icon: SiZapier },
  { name: "Slack", color: "336 77% 51%", icon: SiSlack },
  { name: "Shopify", color: "96 37% 53%", icon: SiShopify },
  { name: "Google Calendar", color: "217 89% 61%", icon: SiGooglecalendar },
  { name: "HubSpot", color: "16 100% 67%", icon: SiHubspot },
  { name: "Salesforce", color: "198 100% 44%", icon: SiSalesforce },
  { name: "Notion", color: "0 0% 92%", icon: SiNotion },
  { name: "Airtable", color: "199 100% 55%", icon: SiAirtable },
  { name: "Stripe", color: "244 100% 67%", icon: SiStripe },
  { name: "Twilio", color: "351 90% 55%", icon: SiTwilio },
  { name: "Mailchimp", color: "51 100% 55%", icon: SiMailchimp },
  { name: "Calendly", color: "215 100% 50%", icon: SiCalendly },
  { name: "Intercom", color: "183 95% 67%", icon: SiIntercom },
  { name: "Asana", color: "0 81% 68%", icon: SiAsana },
  { name: "Jira", color: "217 100% 40%", icon: SiJira },
  { name: "GitHub", color: "0 0% 88%", icon: SiGithub },
  { name: "Discord", color: "235 86% 65%", icon: SiDiscord },
  { name: "WhatsApp", color: "142 70% 48%", icon: SiWhatsapp },
  { name: "Webflow", color: "234 100% 63%", icon: SiWebflow },
  { name: "Squarespace", color: "0 0% 85%", icon: SiSquarespace },
  { name: "QuickBooks", color: "126 59% 38%", icon: SiQuickbooks },
  { name: "Zoho", color: "1 76% 52%", icon: SiZoho },
  { name: "ClickUp", color: "248 79% 69%", icon: SiClickup },
  { name: "Supabase", color: "153 61% 53%", icon: SiSupabase },
  { name: "Trello", color: "217 100% 40%", icon: SiTrello },
  { name: "Google Sheets", color: "134 52% 44%", icon: SiGooglesheets },
  { name: "Zendesk", color: "176 37% 47%", icon: SiZendesk },
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
    const map = new Map<number, LogoDef>();
    cells.forEach((cell, index) => map.set(cell, shuffled[index]));
    return map;
  }, []);

  useEffect(() => {
    setFilledCells(pickLogos());
  }, [pickLogos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilledCells((prev) => {
        const next = new Map(prev);
        const keys = Array.from(next.keys());
        const removeIdx = keys[Math.floor(Math.random() * keys.length)];
        next.delete(removeIdx);

        const emptyCells = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
          .filter((i) => !next.has(i))
          .sort(() => Math.random() - 0.5);

        const usedNames = new Set(Array.from(next.values()).map((logo) => logo.name));
        const available = ALL_LOGOS.filter((logo) => !usedNames.has(logo.name)).sort(() => Math.random() - 0.5);

        if (emptyCells.length && available.length) {
          next.set(emptyCells[0], available[0]);
        }

        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative hidden h-full w-full items-center overflow-visible pointer-events-none select-none lg:flex ${className}`}>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, hsl(var(--section-1)) 0%, transparent 14%),
            linear-gradient(to top, hsl(var(--section-1)) 0%, transparent 14%)
          `,
        }}
      />

      <div
        className="relative z-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 88px)`,
          gridTemplateRows: `repeat(${ROWS}, 88px)`,
          gap: "22px",
        }}
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
          const logo = filledCells.get(i);
          const Icon = logo?.icon;

          return (
            <div
              key={i}
              className="relative rounded-[22px] border transition-all duration-700"
              style={{
                height: "88px",
                width: "88px",
                borderColor: logo ? `hsl(${logo.color} / 0.28)` : "hsl(var(--border) / 0.12)",
                backgroundColor: logo ? `hsl(${logo.color} / 0.05)` : "hsl(var(--background) / 0.08)",
                boxShadow: logo ? `0 0 32px hsl(${logo.color} / 0.08)` : "none",
              }}
            >
              <AnimatePresence mode="wait">
                {logo && Icon && (
                  <motion.div
                    key={logo.name}
                    initial={{ opacity: 0, scale: 0.72, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.72, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Icon
                      className="h-8 w-8"
                      style={{
                        color: `hsl(${logo.color})`,
                        filter: `drop-shadow(0 0 12px hsl(${logo.color} / 0.35))`,
                      }}
                      aria-label={logo.name}
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
