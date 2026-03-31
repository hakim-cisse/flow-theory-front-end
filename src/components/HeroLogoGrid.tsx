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
  { name: "Zendesk", color: "#03363D", icon: "https://cdn.simpleicons.org/zendesk/49A8A1" },
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
];

const COLS = 5;
const ROWS = 6;
const TOTAL_CELLS = COLS * ROWS;
const VISIBLE_COUNT = 6;

// Connections as cell index pairs (adjacent cells)
const CONNECTIONS: [number, number][] = [
  [1, 6], [6, 11], [3, 8], [8, 13],
  [12, 17], [17, 22], [14, 19], [19, 24],
  [2, 7], [7, 12], [10, 15], [15, 20],
  [4, 9], [9, 14], [21, 26], [16, 21],
  [22, 27], [23, 28],
];

export const HeroLogoGrid = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centers, setCenters] = useState<{ x: number; y: number }[]>([]);
  const [filledCells, setFilledCells] = useState<Map<number, LogoDef>>(new Map());
  const [activeLineIdx, setActiveLineIdx] = useState(0);

  // Measure real cell centers
  useLayoutEffect(() => {
    const measure = () => {
      if (!wrapRef.current) return;
      const wrapRect = wrapRef.current.getBoundingClientRect();
      const pts = cellRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - wrapRect.left + r.width / 2,
          y: r.top - wrapRect.top + r.height / 2,
        };
      });
      setCenters(pts);
    };
    // Measure after initial render + small delay for layout
    const raf = requestAnimationFrame(() => setTimeout(measure, 50));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Pick random logos
  const pickNewLogos = useCallback(() => {
    const cells = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, VISIBLE_COUNT);
    const shuffled = [...ALL_LOGOS].sort(() => Math.random() - 0.5);
    const map = new Map<number, LogoDef>();
    cells.forEach((cell, i) => map.set(cell, shuffled[i % shuffled.length]));
    return map;
  }, []);

  useEffect(() => {
    setFilledCells(pickNewLogos());
  }, [pickNewLogos]);

  // Rotate 2 logos every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setFilledCells((prev) => {
        const newMap = new Map(prev);
        const keys = Array.from(newMap.keys()).sort(() => Math.random() - 0.5);
        const toRemove = keys.slice(0, 2);
        toRemove.forEach((k) => newMap.delete(k));

        const empty = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
          .filter((i) => !newMap.has(i))
          .sort(() => Math.random() - 0.5);
        const usedNames = new Set(Array.from(newMap.values()).map((l) => l.name));
        const available = ALL_LOGOS.filter((l) => !usedNames.has(l.name)).sort(
          () => Math.random() - 0.5
        );
        for (let i = 0; i < 2 && i < empty.length && i < available.length; i++) {
          newMap.set(empty[i], available[i]);
        }
        return newMap;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cycle active line
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLineIdx((prev) => (prev + 1) % CONNECTIONS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const hasCenters = centers.length === TOTAL_CELLS && centers.some((c) => c.x > 0);

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:flex items-center justify-end pointer-events-none overflow-hidden">
      {/* Fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--section-1))] via-[hsl(var(--section-1)/0.8)] to-transparent z-10" />

      <div ref={wrapRef} className="relative pr-6 xl:pr-12 z-0">
        {/* Connection lines — rendered from measured centers */}
        {hasCenters && (
          <svg
            className="absolute inset-0 z-0 overflow-visible"
            style={{ width: "100%", height: "100%" }}
          >
            {CONNECTIONS.map(([from, to], i) => {
              if (from >= TOTAL_CELLS || to >= TOTAL_CELLS) return null;
              const s = centers[from];
              const e = centers[to];
              if (!s || !e) return null;

              const isActive = i === activeLineIdx;

              return (
                <g key={`${from}-${to}`}>
                  {/* Dim base line */}
                  <line
                    x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity="0.1"
                  />
                  {/* Active animated line */}
                  {isActive && (
                    <>
                      <motion.line
                        x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                        stroke="hsl(var(--primary))"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.5, 0.5, 0] }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                      />
                      <motion.circle
                        cx={s.x} cy={s.y} r="3"
                        fill="hsl(var(--primary))"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0] }}
                        transition={{ duration: 1.8 }}
                      />
                      <motion.circle
                        cx={e.x} cy={e.y} r="3"
                        fill="hsl(var(--primary))"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0] }}
                        transition={{ duration: 1.8, delay: 0.4 }}
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Grid */}
        <div
          className="relative grid gap-[10px] z-[1]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 80px)`,
            gridTemplateRows: `repeat(${ROWS}, 80px)`,
          }}
        >
          {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
            const logo = filledCells.get(i);
            return (
              <div
                key={i}
                ref={(el) => { cellRefs.current[i] = el; }}
                className="relative rounded-xl border transition-all duration-500"
                style={{
                  borderColor: logo ? `${logo.color}30` : "hsl(var(--border) / 0.1)",
                  backgroundColor: logo ? `${logo.color}06` : "transparent",
                }}
              >
                <AnimatePresence mode="wait">
                  {logo && (
                    <motion.div
                      key={logo.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={logo.icon}
                        alt={logo.name}
                        className="w-8 h-8"
                        style={{ filter: `drop-shadow(0 0 8px ${logo.color}40)` }}
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
