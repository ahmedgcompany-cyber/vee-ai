// Logo component for VEE.ai

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
}

const sizes = {
  sm: { container: 'w-8 h-8', text: 'text-xl' },
  md: { container: 'w-10 h-10', text: 'text-2xl' },
  lg: { container: 'w-14 h-14', text: 'text-3xl' },
  xl: { container: 'w-20 h-20', text: 'text-4xl' },
};

export default function Logo({ size = 'md', showText = true, animated = true }: LogoProps) {
  const { container, text } = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {/* Logo Icon */}
      <div className={`${container} relative`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer hexagon */}
          <path
            d="M50 5L93.3013 30V80L50 105L6.69873 80V30L50 5Z"
            className="stroke-nexus-accent"
            strokeWidth="3"
            fill="none"
            transform="scale(0.85) translate(8.5, 8.5)"
          />
          
          {/* Inner V shape */}
          <path
            d="M30 25L50 70L70 25"
            className="stroke-nexus-accent"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* AI circuit dots */}
          <circle cx="25" cy="30" r="4" className="fill-nexus-accent" />
          <circle cx="75" cy="30" r="4" className="fill-nexus-accent" />
          <circle cx="50" cy="75" r="4" className="fill-nexus-accent" />
          
          {/* Connecting lines */}
          <line x1="25" y1="30" x2="50" y2="75" className="stroke-nexus-accent" strokeWidth="1.5" opacity="0.5" />
          <line x1="75" y1="30" x2="50" y2="75" className="stroke-nexus-accent" strokeWidth="1.5" opacity="0.5" />
          
          {/* Glow effect */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated pulse ring */}
          {animated && (
            <>
              <circle
                cx="50"
                cy="50"
                r="35"
                className="stroke-nexus-accent"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="r"
                  values="35;42;35"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`font-heading font-bold ${text} tracking-tight`}>
          <span className="text-nexus-text">VEE</span>
          <span className="text-nexus-accent">.ai</span>
        </span>
      )}
    </div>
  );
}

// Simple icon-only version for favicon/small uses
export function LogoIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 5L93.3013 30V80L50 105L6.69873 80V30L50 5Z"
        className="stroke-nexus-accent"
        strokeWidth="4"
        fill="none"
        transform="scale(0.85) translate(8.5, 8.5)"
      />
      <path
        d="M30 25L50 70L70 25"
        className="stroke-nexus-accent"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="25" cy="30" r="5" className="fill-nexus-accent" />
      <circle cx="75" cy="30" r="5" className="fill-nexus-accent" />
      <circle cx="50" cy="75" r="5" className="fill-nexus-accent" />
    </svg>
  );
}
