import { useState, useEffect } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const TypewriterText = ({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 50,
  pauseDuration = 1000,
  className = "",
}: TypewriterTextProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      const deleteTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(deleteTimeout);
    }

    if (displayedText === currentPhrase) {
      setIsPaused(true);
      return;
    }

    const typeTimeout = setTimeout(() => {
      setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
    }, typingSpeed);
    return () => clearTimeout(typeTimeout);
  }, [displayedText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  const showCursor = !isPaused;

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle ${
          showCursor ? "animate-pulse" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </span>
  );
};
