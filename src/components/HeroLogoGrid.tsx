import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Logo {
  name: string;
  color: string;
  icon: string; // CDN URL
}

const logos: Logo[] = [
  { name: "n8n", color: "#EA4B71", icon: "https://cdn.simpleicons.org/n8n/EA4B71" },
  { name: "Make", color: "#6D3BF5", icon: "https://cdn.simpleicons.org/integromat/6D3BF5" },
  { name: "Zapier", color: "#FF4A00", icon: "https://cdn.simpleicons.org/zapier/FF4A00" },
  { name: "Slack", color: "#E01E5A", icon: "https://cdn.simpleicons.org/slack/E01E5A" },
  { name: "Shopify", color: "#7AB55C", icon: "https://cdn.simpleicons.org/shopify/7AB55C" },
  { name: "Google Calendar", color: "#4285F4", icon: "https://cdn.simpleicons.org/googlecalendar/4285F4" },
  { name: "HubSpot", color: "#FF7A59", icon: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Salesforce", color: "#00A1E0", icon: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "Notion", color: "#FFFFFF", icon: "https://cdn.simpleicons.org/notion/FFFFFF" },
  { name: "Airtable", color: "#18BFFF", icon: "https://cdn.simpleicons.org/airtable/18BFFF" },
  { name: "Stripe", color: "#635BFF", icon: "https://cdn.simpleicons.org/stripe/635BFF" },
  { name: "Twilio", color: "#F22F46", icon: "https://cdn.simpleicons.org/twilio/F22F46" },
  { name: "Monday.com", color: "#FF3D57", icon: "https://cdn.simpleicons.org/mondaydotcom/FF3D57" },
  { name: "Pipedrive", color: "#1DB954", icon: "https://cdn.simpleicons.org/pipedrive/1DB954" },
  { name: "Zendesk", color: "#03363D", icon: "https://cdn.simpleicons.org/zendesk/17494D" },
  { name: "Mailchimp", color: "#FFE01B", icon: "https://cdn.simpleicons.org/mailchimp/FFE01B" },
  { name: "Calendly", color: "#006BFF", icon: "https://cdn.simpleicons.org/calendly/006BFF" },
  { name: "Intercom", color: "#6AFDEF", icon: "https://cdn.simpleicons.org/intercom/6AFDEF" },
  { name: "Asana", color: "#F06A6A", icon: "https://cdn.simpleicons.org/asana/F06A6A" },
  { name: "Jira", color: "#0052CC", icon: "https://cdn.simpleicons.org/jira/0052CC" },
  { name: "GitHub", color: "#FFFFFF", icon: "https://cdn.simpleicons.org/github/FFFFFF" },
  { name: "Discord", color: "#5865F2", icon: "https://cdn.simpleicons.org/discord/5865F2" },
  { name: "WhatsApp", color: "#25D366", icon: "https://cdn.simpleicons.org/whatsapp/25D366" },
  { name: "Webflow", color: "#4353FF", icon: "https://cdn.simpleicons.org/webflow/4353FF" },
  { name: "Squarespace", color: "#FFFFFF", icon: "https://cdn.simpleicons.org/squarespace/FFFFFF" },
  { name: "QuickBooks", color: "#2CA01C", icon: "https://cdn.simpleicons.org/quickbooks/2CA01C" },
  { name: "Zoho", color: "#C8202B", icon: "https://cdn.simpleicons.org/zoho/E42527" },
  { name: "ClickUp", color: "#7B68EE", icon: "https://cdn.simpleicons.org/clickup/7B68EE" },
  { name: "Supabase", color: "#3ECF8E", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "Trello", color: "#0052CC", icon: "https://cdn.simpleicons.org/trello/0052CC" },
];

const COLS = 5;
const ROWS = 6;
const CELL = 76; // px cell size
const GAP = 12;  // px gap

// Highlighted indices (logos that appear bright)
const HIGHLIGHTED = [2, 4, 7, 9, 12, 16, 20, 23, 27];

// Workflow connection paths (index pairs forming animated lines)
const CONNECTIONS: [number, number][] = [
  [2, 7],   // Zapier → HubSpot
  [7, 12],  // HubSpot → Monday
  [4, 9],   // Shopify → Airtable
  [9, 14],  // Airtable → Zendesk
  [16, 21], // Calendly → Discord
  [20, 21], // GitHub → Discord
  [23, 28], // Webflow → Supabase
  [12, 17], // Monday → Intercom
  [3, 8],   // Slack → Notion
  [27, 22], // ClickUp → WhatsApp
];

// Get center of a cell in the grid
const getCellCenter = (index: number) => {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  return {
    x: col * (CELL + GAP) + CELL / 2,
    y: row * (CELL + GAP) + CELL / 2,
  };
};

export const HeroLogoGrid = () => {
  const [activeConnection, setActiveConnection] = useState(0);
  const [pulsingIndices, setPulsingIndices] = useState<Set<number>>(new Set());

  // Cycle through connections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % CONNECTIONS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Track which logos are part of the active connection for glow
  useEffect(() => {
    const [from, to] = CONNECTIONS[activeConnection];
    setPulsingIndices(new Set([from, to]));
  }, [activeConnection]);

  const gridWidth = COLS * CELL + (COLS - 1) * GAP;
  const gridHeight = ROWS * CELL + (ROWS - 1) * GAP;

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:flex items-center justify-end pointer-events-none overflow-hidden">
      {/* Fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--section-1))] via-[hsl(var(--section-1)/0.7)] to-transparent z-10" />

      <div className="relative pr-8 xl:pr-16 z-0" style={{ width: gridWidth, height: gridHeight }}>
        {/* Animated connection lines */}
        <svg
          className="absolute inset-0 z-0"
          width={gridWidth}
          height={gridHeight}
          viewBox={`0 0 ${gridWidth} ${gridHeight}`}
        >
          {CONNECTIONS.map(([from, to], i) => {
            const start = getCellCenter(from);
            const end = getCellCenter(to);
            const isActive = i === activeConnection;
            const fromLogo = logos[from];

            // Curved path
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const cx = midX - dy * 0.15;
            const cy = midY + dx * 0.15;
            const d = `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;

            return (
              <g key={`${from}-${to}`}>
                {/* Base line (always visible, very dim) */}
                <path
                  d={d}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.1"
                  strokeDasharray="4 4"
                />
                {/* Active animated line */}
                {isActive && (
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={fromLogo.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.6, 0.6, 0] }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                )}
                {/* Traveling dot */}
                {isActive && (
                  <motion.circle
                    r="3"
                    fill={fromLogo.color}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                      offsetPath: `path('${d}')`,
                      filter: `drop-shadow(0 0 6px ${fromLogo.color})`,
                    } as any}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Logo grid */}
        <div
          className="relative grid z-[1]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
            gap: `${GAP}px`,
          }}
        >
          {logos.slice(0, COLS * ROWS).map((logo, i) => {
            const isHighlighted = HIGHLIGHTED.includes(i);
            const isPulsing = pulsingIndices.has(i);

            return (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.035 }}
                className="relative"
              >
                <div
                  className="w-full h-full rounded-xl border flex items-center justify-center transition-all duration-500"
                  style={{
                    borderColor: isPulsing
                      ? `${logo.color}50`
                      : isHighlighted
                        ? `${logo.color}25`
                        : "hsl(var(--border) / 0.12)",
                    backgroundColor: isPulsing
                      ? `${logo.color}12`
                      : isHighlighted
                        ? `${logo.color}06`
                        : "hsl(var(--card) / 0.12)",
                  }}
                >
                  <img
                    src={logo.icon}
                    alt={logo.name}
                    className="w-7 h-7 transition-all duration-500"
                    style={{
                      opacity: isPulsing ? 0.9 : isHighlighted ? 0.5 : 0.12,
                      filter: isPulsing
                        ? `drop-shadow(0 0 8px ${logo.color}60)`
                        : "none",
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Glow ring on active connection */}
                <AnimatePresence>
                  {isPulsing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        boxShadow: `0 0 25px ${logo.color}25, inset 0 0 15px ${logo.color}08`,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
