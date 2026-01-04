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
    <div
      className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full bg-primary mix-blend-difference transition-transform duration-75 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};
