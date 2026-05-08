import { useEffect, useRef, useState } from "react";

interface MorphingWordProps {
  words: string[];
  className?: string;
  interval?: number;
  scrambleDuration?: number;
}

const GLYPHS = "abcdefghijklmnopqrstuvwxyz";

/**
 * Cycles through words with a per-letter scramble morph between each.
 * Width is locked to the longest word to prevent layout shift.
 */
export const MorphingWord = ({
  words,
  className = "",
  interval = 2600,
  scrambleDuration = 800,
}: MorphingWordProps) => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(words[0]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const tick = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(tick);
  }, [interval, words.length]);

  useEffect(() => {
    const target = words[index];
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / scrambleDuration);
      // Reveal letters left-to-right; unrevealed = random glyph
      const revealCount = Math.floor(t * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < revealCount) {
          out += target[i];
        } else if (target[i] === " ") {
          out += " ";
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [index, words, scrambleDuration]);

  // Lock width to the longest word so layout doesn't jump
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Invisible spacer holds layout width */}
      <span aria-hidden="true" className="invisible">
        {longest}
      </span>
      <span className="absolute inset-0">{display}</span>
    </span>
  );
};
