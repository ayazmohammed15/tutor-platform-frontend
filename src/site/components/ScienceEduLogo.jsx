import React from 'react';

export const ScienceEduLogo = ({
  size = 'md',
  variant = 'auto',
  showSubtitle = true,
  showBadge = true,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
  }[size];

  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Mark with Science Orbit + Academic Crest */}
      <div className={`relative ${iconDimensions} shrink-0`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Main Gradient */}
            <linearGradient id="sciEduBg" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E3A8A" />
              <stop offset="0.5" stopColor="#1D4ED8" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>

            {/* Orbit Gradient */}
            <linearGradient id="sciOrbit" x1="10" y1="12" x2="38" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>

            {/* Core Gradient */}
            <linearGradient id="sciCore" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EF4444" />
            </linearGradient>

            <linearGradient id="sciCap" x1="12" y1="14" x2="36" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Rounded Squircle Background */}
          <rect width="48" height="48" rx="14" fill="url(#sciEduBg)" />

          {/* Subtle Outer Glow Ring */}
          <rect
            x="0.75"
            y="0.75"
            width="46.5"
            height="46.5"
            rx="13.25"
            stroke="url(#sciOrbit)"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />

          {/* Atomic Orbital Ellipse 1 (Angled 45 deg) */}
          <ellipse
            cx="24"
            cy="24"
            rx="15"
            ry="6"
            transform="rotate(-30 24 24)"
            stroke="url(#sciOrbit)"
            strokeWidth="1.6"
            strokeDasharray="28 4 6 4"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Atomic Orbital Ellipse 2 (Angled -45 deg) */}
          <ellipse
            cx="24"
            cy="24"
            rx="15"
            ry="6"
            transform="rotate(40 24 24)"
            stroke="#93C5FD"
            strokeWidth="1.6"
            strokeDasharray="30 5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Academic Graduation Cap Crest (Upper Center) */}
          <path
            d="M24 13L35 18L24 23L13 18L24 13Z"
            fill="url(#sciCap)"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.25))"
          />

          {/* Tassel & Cap Rim */}
          <path
            d="M17 20.5V25.5C17 27.5 20.1 29.2 24 29.2C27.9 29.2 31 27.5 31 25.5V20.5"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M32.5 19.5V26.5"
            stroke="#FDE047"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <circle cx="32.5" cy="27" r="1" fill="#FDE047" />

          {/* Science Atom Core / Quantum Energy Dot */}
          <circle cx="24" cy="24.5" r="3" fill="url(#sciCore)" />
          <circle cx="24" cy="24.5" r="1.2" fill="#FFFFFF" />

          {/* Orbiting Quantum Electrons */}
          <circle cx="35" cy="18" r="1.5" fill="#38BDF8" />
          <circle cx="13" cy="29" r="1.5" fill="#60A5FA" />
        </svg>
      </div>

      {/* Brand Typography & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-extrabold tracking-tight font-sans ${titleSizes} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Science<span className="text-blue-600">Edu</span>
          </span>

          {showBadge && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9.5px] font-bold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
              IIT • Medical
            </span>
          )}
        </div>

        {showSubtitle && (
          <span
            className={`text-[10.5px] font-medium tracking-normal mt-1 hidden sm:inline-block ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Live 1-on-1 Tutoring & Structured Courses
          </span>
        )}
      </div>
    </div>
  );
};
