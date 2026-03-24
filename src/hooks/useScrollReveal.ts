import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useScrollReveal = ({
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
  once = true,
}: UseScrollRevealOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
};

/**
 * Returns inline style for staggered children animations.
 * Usage: style={staggerStyle(index, isVisible, { delay: 0.1 })}
 */
export const staggerStyle = (
  index: number,
  isVisible: boolean,
  options?: { delay?: number; duration?: number; distance?: number }
): React.CSSProperties => {
  const { delay = 0.1, duration = 0.6, distance = 30 } = options || {};
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity ${duration}s ease-out ${index * delay}s, transform ${duration}s ease-out ${index * delay}s`,
  };
};
