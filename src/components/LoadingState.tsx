import logoSrc from "@/assets/flow-theory-logo.png";

interface LoadingStateProps {
  className?: string;
  label?: string;
}

const LoadingState = ({ className = "", label }: LoadingStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 py-20 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center h-24 w-24">
        <span className="absolute inset-0 rounded-full border-2 border-primary/15" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        <img
          src={logoSrc}
          alt="Flow Theory AI"
          className="h-12 w-12 object-contain animate-pulse"
        />
      </div>
      {label && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
      )}
    </div>
  );
};

export default LoadingState;
