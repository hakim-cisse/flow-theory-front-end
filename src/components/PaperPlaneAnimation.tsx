import { useState, useEffect } from "react";
import { Send } from "lucide-react";

interface PaperPlaneAnimationProps {
  className?: string;
}

export const PaperPlaneAnimation = ({ className }: PaperPlaneAnimationProps) => {
  const [isFlying, setIsFlying] = useState(false);
  const [showPeriod, setShowPeriod] = useState(true);

  useEffect(() => {
    // Start animation every 8-12 seconds
    const scheduleNextFlight = () => {
      const delay = 8000 + Math.random() * 4000;
      return setTimeout(() => {
        setIsFlying(true);
        setShowPeriod(false);
      }, delay);
    };

    let timeout = scheduleNextFlight();

    return () => clearTimeout(timeout);
  }, [isFlying]);

  useEffect(() => {
    if (isFlying) {
      // Animation duration: fly down (2s) + fly up (2s) = 4s total
      const timer = setTimeout(() => {
        setIsFlying(false);
        setShowPeriod(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isFlying]);

  return (
    <span className={`inline-block relative ${className}`}>
      {/* Period that shows when not flying */}
      <span
        className={`transition-opacity duration-300 ${
          showPeriod ? "opacity-100" : "opacity-0"
        }`}
      >
        .
      </span>

      {/* Paper plane that flies */}
      {isFlying && (
        <span
          className="absolute left-0 top-0 text-primary animate-paper-plane-flight"
          style={{
            transformOrigin: "center center",
          }}
        >
          <Send
            className="h-[0.5em] w-[0.5em] rotate-45"
            strokeWidth={2.5}
            fill="currentColor"
          />
        </span>
      )}
    </span>
  );
};
