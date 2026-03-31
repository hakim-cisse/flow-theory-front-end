import { useEffect, useState, useRef, useLayoutEffect, useCallback } from "react";
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

const COLS = 5;
const ROWS = 7;
const TOTAL_CELLS = COLS * ROWS;
const VISIBLE_COUNT = 5;

// Circuit-board style connections — vertical and horizontal between adjacent cells
const CONNECTIONS: [number, number][] = [];
// Vertical connections (cell to cell below)
for (let r = 0; r < ROWS - 1; r++) {
  for (let c = 0; c < COLS; c++) {
    // Only add some connections to keep it sparse like the reference
    if ((r + c) % 2 === 0) {
      CONNECTIONS.push([r * COLS + c, (r + 1) * COLS + c]);
    }
  }
}
// Horizontal connections
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS - 1; c++) {
    if ((r + c) % 3 === 0) {
      CONNECTIONS.push([r * COLS + c, r * COLS + c + 1]);
    }
  }
}

export const HeroLogoGrid = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centers, setCenters] = useState<{ x: number; y: number }[]>([]);
  const [filledCells, setFilledCells] = useState<Map<number, LogoDef>>(new Map());

  // Measure real cell positions
  useLayoutEffect(() => {
    const measure = () => {
      if (!wrapRef.current) return;
      const wr = wrapRef.current.getBoundingClientRect();
      setCenters(
        cellRefs.current.map((el) => {
          if (!el) return { x: 0, y: 0 };
          const r = el.getBoundingClientRect();
          return { x: r.left - wr.left + r.width / 2, y: r.top - wr.top + r.height / 2 };
        })
      );
    };
    const raf = requestAnimationFrame(() => setTimeout(measure, 80));
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", measure); };
  }, []);

  // Initial logos
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

  // Swap one logo at a time every 2.5s for smooth continuous rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFilledCells((prev) => {
        const newMap = new Map(prev);
        const keys = Array.from(newMap.keys());
        // Remove one random
        const removeIdx = keys[Math.floor(Math.random() * keys.length)];
        newMap.delete(removeIdx);
        // Add one in a new random empty cell
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

  const hasCenters = centers.length === TOTAL_CELLS && centers.some((c) => c.x > 0);

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[58%] hidden lg:flex items-center justify-center pointer-events-none">
      {/* Left fade into section background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--section-1))] via-[hsl(var(--section-1)/0.85)] to-transparent z-10" />

      <div
        ref={wrapRef}
        className="relative z-0 h-full flex items-center"
        style={{ paddingRight: "clamp(16px, 3vw, 48px)" }}
      >
        {/* Always-visible circuit-board lines */}
        {hasCenters && (
          <svg className="absolute inset-0 z-0 overflow-visible w-full h-full">
            {CONNECTIONS.map(([from, to], i) => {
              if (from >= TOTAL_CELLS || to >= TOTAL_CELLS) return null;
              const s = centers[from];
              const e = centers[to];
              if (!s || !e || (s.x === 0 && s.y === 0)) return null;
              return (
                <line
                  key={i}
                  x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.15"
                />
              );
            })}
            {/* Small dots at each cell center */}
            {centers.map((c, i) => (
              c.x > 0 && (
                <circle
                  key={`dot-${i}`}
                  cx={c.x} cy={c.y} r="2"
                  fill="hsl(var(--border))"
                  opacity="0.2"
                />
              )
            ))}
          </svg>
        )}

        {/* Cell grid */}
        <div
          className="relative grid z-[1]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 88px)`,
            gridTemplateRows: `repeat(${ROWS}, 88px)`,
            gap: "12px",
          }}
        >
          {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
            const logo = filledCells.get(i);
            return (
              <div
                key={i}
                ref={(el) => { cellRefs.current[i] = el; }}
                className="relative rounded-2xl border transition-all duration-700"
                style={{
                  borderColor: logo ? `${logo.color}25` : "hsl(var(--border) / 0.08)",
                  backgroundColor: logo ? `${logo.color}05` : "transparent",
                }}
              >
                <AnimatePresence mode="wait">
                  {logo && (
                    <motion.div
                      key={logo.name}
                      initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={logo.icon}
                        alt={logo.name}
                        className="w-9 h-9"
                        style={{ filter: `drop-shadow(0 0 12px ${logo.color}50)` }}
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
