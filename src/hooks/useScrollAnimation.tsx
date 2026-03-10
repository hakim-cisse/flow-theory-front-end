import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

export const useCountUp = (end: number, duration: number, trigger: boolean, prefix = "", suffix = "") => {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplay(`${prefix}${end >= 1000 ? end.toLocaleString() : end}${suffix}`);
        clearInterval(timer);
      } else {
        const val = Math.floor(start);
        setDisplay(`${prefix}${val >= 1000 ? val.toLocaleString() : val}${suffix}`);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration, trigger, prefix, suffix]);

  return display;
};
