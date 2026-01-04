import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const hideCursor = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <svg
      className="fixed pointer-events-none z-[9999] transition-opacity duration-75 ease-out"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
        width: 32,
        height: 32,
      }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 4L20 12L4 20L8 12L4 4Z"
        fill="hsl(194, 83%, 61%)"
      />
    </svg>
  );
};
