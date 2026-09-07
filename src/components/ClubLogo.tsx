import React from 'react';

interface ClubLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
  theme?: 'light' | 'dark' | 'cream';
  variant?: 'crest' | 'horizontal';
  onClick?: () => void;
  interactive?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({
  size = 52,
  className = '',
  showText = false,
  textColor = 'text-white',
  variant = 'crest',
  onClick,
  interactive = false,
}) => {
  if (variant === 'horizontal') {
    return (
      <div
        className={`inline-flex items-center select-none ${interactive ? 'cursor-pointer' : ''} ${className}`}
        id="club-brand-logo-horizontal"
        onClick={onClick}
      >
        <img
          src="/scmlc_logo_horizontal.png"
          alt="The Sydney Colonial Muzzle-Loading Club Logo"
          height={size}
          style={{ height: size, width: 'auto' }}
          className="object-contain pointer-events-none select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${interactive ? 'cursor-pointer' : ''} ${className}`}
      id="club-brand-logo"
      onClick={onClick}
    >
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <img
          src="/scmlc_crest.png"
          alt="The Sydney Colonial Muzzle-Loading Club Official Crest"
          width={size}
          height={size}
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`text-xs tracking-[0.25em] font-semibold uppercase leading-tight ${textColor}`}>
            The Sydney Colonial
          </span>
          <span className={`text-[10px] tracking-[0.18em] opacity-85 uppercase font-serif ${textColor}`}>
            Muzzle-Loading Club · Est. 1962
          </span>
        </div>
      )}
    </div>
  );
};
