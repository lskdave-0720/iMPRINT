interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/**
 * Imprint logo — stacked imprint blocks linked by neural nodes.
 * Memory × Identity × Trace × Proof.
 */
export const Logo = ({ className = "", showWordmark = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Imprint"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="imprint-grad" x1="0" y1="32" x2="32" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(230, 90%, 60%)" />
            <stop offset="100%" stopColor="hsl(250, 95%, 72%)" />
          </linearGradient>
        </defs>

        {/* Stamped imprint blocks — ascending, offset for forward motion */}
        <rect x="3" y="22" width="14" height="6" rx="1.6" fill="hsl(230, 90%, 60%)" opacity="0.28" />
        <rect x="7" y="14" width="14" height="6" rx="1.6" fill="url(#imprint-grad)" opacity="0.55" />
        <rect x="11" y="6" width="14" height="6" rx="1.6" fill="url(#imprint-grad)" />

        {/* Connection trace between nodes */}
        <path
          d="M10 25 L14 17 L18 9"
          stroke="url(#imprint-grad)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Neural nodes */}
        <circle cx="10" cy="25" r="1.6" fill="hsl(250, 95%, 80%)" />
        <circle cx="14" cy="17" r="1.6" fill="hsl(250, 95%, 80%)" />
        <circle cx="18" cy="9" r="1.8" fill="hsl(250, 95%, 85%)">
          <animate attributeName="r" values="1.8;2.6;1.8" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
      {showWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-foreground">
          Imprint
        </span>
      )}
    </div>
  );
};
