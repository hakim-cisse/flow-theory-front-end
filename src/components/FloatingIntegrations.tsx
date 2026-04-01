import { motion } from "framer-motion";
import { 
  MessageSquare, Database, Zap, Brain, 
  Table2, FileSpreadsheet, Mail, Calendar,
  BarChart3, Users, Workflow, Globe
} from "lucide-react";

interface IntegrationNode {
  icon: React.ElementType;
  label: string;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  color: string;
  delay: number;
}

const nodes: IntegrationNode[] = [
  { icon: MessageSquare, label: "Slack", x: 75, y: 8, size: "lg", color: "hsl(var(--primary))", delay: 0 },
  { icon: Zap, label: "Zapier", x: 30, y: 22, size: "md", color: "hsl(24 100% 50%)", delay: 0.3 },
  { icon: Database, label: "CRM", x: 80, y: 35, size: "lg", color: "hsl(142 60% 45%)", delay: 0.6 },
  { icon: Brain, label: "AI", x: 15, y: 48, size: "md", color: "hsl(280 80% 60%)", delay: 0.2 },
  { icon: Table2, label: "Notion", x: 55, y: 55, size: "lg", color: "hsl(0 0% 80%)", delay: 0.8 },
  { icon: FileSpreadsheet, label: "Sheets", x: 85, y: 62, size: "md", color: "hsl(142 70% 45%)", delay: 0.4 },
  { icon: Mail, label: "Email", x: 25, y: 72, size: "sm", color: "hsl(200 80% 55%)", delay: 1.0 },
  { icon: Calendar, label: "Calendar", x: 60, y: 80, size: "md", color: "hsl(210 70% 55%)", delay: 0.5 },
  { icon: BarChart3, label: "Analytics", x: 90, y: 88, size: "sm", color: "hsl(45 90% 50%)", delay: 0.7 },
  { icon: Workflow, label: "Make", x: 45, y: 35, size: "sm", color: "hsl(280 60% 55%)", delay: 0.9 },
  { icon: Users, label: "HubSpot", x: 10, y: 30, size: "sm", color: "hsl(15 85% 55%)", delay: 1.1 },
  { icon: Globe, label: "API", x: 70, y: 15, size: "sm", color: "hsl(var(--primary))", delay: 0.1 },
];

// Connections between node indices
const connections: [number, number][] = [
  [0, 3], [0, 9], [1, 3], [1, 10],
  [2, 5], [2, 9], [3, 4], [4, 7],
  [4, 6], [5, 8], [7, 8], [9, 11],
  [0, 11], [1, 4], [6, 7], [2, 4],
];

const sizeMap = { sm: 40, md: 52, lg: 64 };
const iconSizeMap = { sm: 16, md: 20, lg: 24 };

export const FloatingIntegrations = () => {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {connections.map(([from, to], i) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];
          const fromSize = sizeMap[fromNode.size];
          const toSize = sizeMap[toNode.size];
          return (
            <motion.line
              key={i}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y + (fromSize / 10)}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y + (toSize / 10)}%`}
              stroke="hsl(var(--primary) / 0.12)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.08, ease: "easeOut" }}
            />
          );
        })}
        {/* Small dots at connection endpoints */}
        {connections.map(([from, to], i) => {
          const midX = (nodes[from].x + nodes[to].x) / 2;
          const midY = (nodes[from].y + nodes[to].y) / 2;
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={`${midX}%`}
              cy={`${midY + 2}%`}
              r="2"
              fill="hsl(var(--primary) / 0.3)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 + i * 0.06 }}
            />
          );
        })}
      </svg>

      {/* Integration nodes */}
      {nodes.map((node, i) => {
        const size = sizeMap[node.size];
        const iconSize = iconSizeMap[node.size];
        return (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center rounded-xl border border-border/30 bg-card/60 backdrop-blur-sm shadow-lg cursor-default"
            style={{
              width: size,
              height: size,
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            transition={{ 
              duration: 0.6, 
              delay: node.delay + 0.3,
              ease: "easeOut" 
            }}
            whileHover={{ 
              scale: 1.15, 
              borderColor: node.color,
              boxShadow: `0 0 20px ${node.color}40`,
              transition: { duration: 0.2 }
            }}
          >
            {/* Floating animation wrapper */}
            <motion.div
              animate={{ 
                y: [0, -6, 0, 4, 0],
              }}
              transition={{ 
                duration: 5 + (i % 3) * 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: node.delay 
              }}
            >
              <node.icon 
                size={iconSize} 
                strokeWidth={1.5} 
                style={{ color: node.color }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Ambient glow pulses */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{ 
          left: "50%", top: "40%", 
          background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)" 
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
