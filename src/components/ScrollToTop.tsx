import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToTarget = () => {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0 });
        return;
      }

      const element = document.querySelector(hash);

      if (!element) {
        window.scrollTo({ top: 0, left: 0 });
        return;
      }

      const headerOffset = 96;
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" });
    };

    const timeoutId = window.setTimeout(scrollToTarget, 60);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
