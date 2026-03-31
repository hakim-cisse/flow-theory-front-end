import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoDef {
  name: string;
  color: string;
  icon: string;
}

const ALL_LOGOS: LogoDef[] = [
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
  { name: "Zendesk", color: "#17494D", icon: "https://cdn.simpleicons.org/zendesk/17494D" },
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
  { name: "Zoho", color: "#E42527", icon: "https://cdn.simpleicons.org/zoho/E42527" },
  { name: "ClickUp", color: "#7B68EE", icon: "https://cdn.simpleicons.org/clickup/7B68EE" },
  { name: "Supabase", color: "#3ECF8E", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "Trello", color: "#0052CC", icon: "https://cdn.simpleicons.org/trello/0052CC" },
  { name: "Google Sheets", color: "#34A853", icon: "https://cdn.simpleicons.org/googlesheets/34A853" },
  { name: "Microsoft Teams", color: "#6264A7", icon: "https://cdn.simpleicons.org/microsoftteams/6264A7" },
];

const COLS = 5;
const ROWS = 6;
const TOTAL_CELLS = COLS * ROWS;
const CELL = 80;
const GAP = 10;

// How many logos are visible at once
const VISIBLE_COUNT = 6;

// Connection lines between adjacent cells (col-row pairs)
// Stored as cell index pairs
const STATIC_LINES: [number, number][] = [
  [1, 6], [6, 11], [3, 8], [8, 13],
  [12, 17], [17, 22], [14, 19], [19, 24],
  [2, 7], [7, 12], [10, 15], [15, 20],
  [4, 9], [9, 14], [21, 26], [16, 21],
  [22, 27], [23, 28], [5, 10],
];

const getCellCenter = (index: number) => {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  return {
    x: col * (CELL + GAP) + CELL / 2,
    y: row * (CELL + GAP) + CELL / 2,
  };
};

export const HeroLogoGrid = () => {
  // Track which cells currently have logos, and which logo
  const [filledCells, setFilledCells] = useState<Map<number, LogoDef>>(new Map());
  const [activeLineIdx, setActiveLineIdx] = useState(0);

  // Pick random cells to fill with logos, cycling over time
  const pickNewLogos = useCallback(() => {
    const availableCells = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    // Shuffle
    for (let i = availableCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableCells[i], availableCells[j]] = [availableCells[j], availableCells[i]];
    }
    const selectedCells = availableCells.slice(0, VISIBLE_COUNT);

    // Shuffle logos too
    const shuffledLogos = [...ALL_LOGOS].sort(() => Math.random() - 0.5);

    const newMap = new Map<number, LogoDef>();
    selectedCells.forEach((cell, i) => {
      newMap.set(cell, shuffledLogos[i % shuffledLogos.length]);
    });
    return newMap;
  }, []);

  // Initial fill
  useEffect(() => {
    setFilledCells(pickNewLogos());
  }, [pickNewLogos]);

  // Rotate logos every 3 seconds — swap 2-3 logos at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setFilledCells((prev) => {
        const newMap = new Map(prev);
        const currentKeys = Array.from(newMap.keys());
        const emptySlots = Array.from({ length: TOTAL_CELLS }, (_, i) => i).filter(
          (i) => !newMap.has(i)
        );

        // Remove 2 random existing logos
        const toRemove = currentKeys.sort(() => Math.random() - 0.5).slice(0, 2);
        toRemove.forEach((k) => newMap.delete(k));

        // Add 2 new logos in random empty slots
        const shuffledEmpty = [...emptySlots, ...toRemove].sort(() => Math.random() - 0.5);
        const usedLogos = new Set(Array.from(newMap.values()).map((l) => l.name));
        const availableLogos = ALL_LOGOS.filter((l) => !usedLogos.has(l.name)).sort(
          () => Math.random() - 0.5
        );

        for (let i = 0; i < 2 && i < shuffledEmpty.length && i < availableLogos.length; i++) {
          newMap.set(shuffledEmpty[i], availableLogos[i]);
        }

        return newMap;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate connection lines
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLineIdx((prev) => (prev + 1) % STATIC_LINES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const gridWidth = COLS * CELL + (COLS - 1) * GAP;
  const gridHeight = ROWS * CELL + (ROWS - 1) * GAP;

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:flex items-center justify-end pointer-events-none overflow-hidden">
      {/* Left fade into background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--section-1))] via-[hsl(var(--section-1)/0.8)] to-transparent z-10" />

      <div className="relative pr-6 xl:pr-12 z-0" style={{ width: gridWidth, height: gridHeight }}>
        {/* Connection lines SVG */}
        <svg
          className="absolute inset-0 z-0"
          width={gridWidth}
          height={gridHeight}
          viewBox={`0 0 ${gridWidth} ${gridHeight}`}
        >
          {STATIC_LINES.map(([from, to], i) => {
            if (from >= TOTAL_CELLS || to >= TOTAL_CELLS) return null;
            const start = getCellCenter(from);
            const end = getCellCenter(to);
            const isActive = i === activeLineIdx;
            const isNearActive =
              Math.abs(i - activeLineIdx) <= 1 ||
              (activeLineIdx === 0 && i === STATIC_LINES.length - 1);

            return (
              <g key={`line-${from}-${to}`}>
                {/* Static dim line */}
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.12"
                />
                {/* Active line */}
                {isActive && (
                  <motion.line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.5, 0.5, 0] }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                )}
                {/* Node dots at intersections */}
                {isNearActive && (
                  <>
                    <motion.circle
                      cx={start.x}
                      cy={start.y}
                      r="2"
                      fill="hsl(var(--primary))"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.6, 0] }}
                      transition={{ duration: 1.8 }}
                    />
                    <motion.circle
                      cx={end.x}
                      cy={end.y}
                      r="2"
                      fill="hsl(var(--primary))"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.6, 0] }}
                      transition={{ duration: 1.8, delay: 0.3 }}
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Grid cells */}
        <div
          className="relative grid z-[1]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
            gap: `${GAP}px`,
          }}
        >
          {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
            const logo = filledCells.get(i);

            return (
              <div
                key={i}
                className="relative rounded-xl border transition-all duration-500"
                style={{
                  borderColor: logo
                    ? `${logo.color}30`
                    : "hsl(var(--border) / 0.1)",
                  backgroundColor: logo
                    ? `${logo.color}06`
                    : "transparent",
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
                        style={{
                          filter: `drop-shadow(0 0 10px ${logo.color}40)`,
                        }}
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
    </div>
  );
};
