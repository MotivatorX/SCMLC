import React, { useId } from 'react';

interface ClubLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
  theme?: 'light' | 'dark' | 'cream';
  onClick?: () => void;
  interactive?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({
  size = 52,
  className = '',
  showText = false,
  textColor = 'text-white',
  theme = 'dark',
  onClick,
  interactive = false,
}) => {
  const rawId = useId();
  // Sanitize id for SVG href usage
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');
  const textArcId = `scmlc-text-arc-${id}`;
  const rifleDefId = `scmlc-rifle-def-${id}`;

  const goldColor = '#C5A880';
  const greenFieldColor = '#0D4827';
  const darkCharcoal = theme === 'cream' ? '#1E1B18' : '#161514';

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
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full transform transition-transform duration-300 hover:scale-105 drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="The Sydney Colonial Muzzle-Loading Club Official Crest"
        >
          <defs>
            {/* Top Text Path (Clockwise from lower-left around top to lower-right) */}
            <path
              id={textArcId}
              d="M 42,242 A 162,162 0 1,1 358,242"
              fill="none"
            />

            {/* Muzzle-Loading Longarm / Rifle Vector Template */}
            <g id={rifleDefId}>
              {/* Octagonal Barrel */}
              <polygon
                points="-8,-1.8 74,-1.2 74,1.2 -8,1.8"
                fill={goldColor}
              />
              {/* Muzzle nose ring and front bead sight */}
              <rect
                x="71"
                y="-2.6"
                width="3.2"
                height="5.2"
                rx="0.4"
                fill={goldColor}
              />
              <polygon
                points="66,-1.4 67.5,-3.8 69.5,-3.8 70,-1.4"
                fill={goldColor}
              />
              {/* Ramrod mounted beneath barrel */}
              <rect
                x="8"
                y="1.8"
                width="64"
                height="1.2"
                fill={goldColor}
              />
              {/* Ramrod thimbles / pipes */}
              <rect
                x="26"
                y="1.5"
                width="4"
                height="1.8"
                fill={goldColor}
              />
              <rect
                x="48"
                y="1.5"
                width="4"
                height="1.8"
                fill={goldColor}
              />
              {/* Wooden forearm stock channel */}
              <polygon
                points="-8,-1.8 54,-1.2 50,2.8 -8,3.2"
                fill={goldColor}
              />
              {/* Percussion Lockplate, Cock & Hammer */}
              <path
                d="M -9,-1.8 C -9,-7 -3.5,-9 1,-5.2 C 2.5,-4 0.5,-1.8 2.5,-1.2 Z"
                fill={goldColor}
              />
              <circle
                cx="-2.5"
                cy="-5.4"
                r="1.8"
                fill={darkCharcoal}
              />
              <path
                d="M 0,-1.8 L 3.5,-4"
                stroke={goldColor}
                strokeWidth="1.4"
              />
              {/* Scroll Trigger Guard & Trigger Blade */}
              <path
                d="M -15,2.8 C -15,9 -2,9 -1,2.8 C -3,2.8 -4,6.2 -8,6.2 C -12,6.2 -12,2.8 -15,2.8 Z"
                fill={goldColor}
              />
              <path
                d="M -7,2.8 C -7,5.5 -9,6 -9,5"
                stroke={goldColor}
                strokeWidth="1.2"
                fill="none"
              />
              {/* Drop Wooden Buttstock with Brass Crescent Buttplate */}
              <path
                d="M -8,-1.8 C -24,-3 -44,-5.5 -72,-9.5 C -74,-8.5 -70,2 -74,10.5 C -68,12 -58,9 -42,5.5 C -24,4.2 -8,3.4 -8,2.8 Z"
                fill={goldColor}
              />
            </g>
          </defs>

          {/* Outermost Dark Ring & Gold Rim */}
          <circle
            cx="200"
            cy="200"
            r="194"
            fill={darkCharcoal}
            stroke={goldColor}
            strokeWidth="3.5"
          />

          {/* Inner Bottle Green Circle Field */}
          <circle
            cx="200"
            cy="200"
            r="144"
            fill={greenFieldColor}
            stroke={goldColor}
            strokeWidth="3.5"
          />

          {/* Arched Club Name Text */}
          <text
            fill={goldColor}
            fontSize="15.8"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="bold"
            letterSpacing="2.8"
          >
            <textPath href={`#${textArcId}`} startOffset="50%" textAnchor="middle">
              THE SYDNEY COLONIAL MUZZLE-LOADING CLUB
            </textPath>
          </text>

          {/* Three Stars at Bottom Arc (Center slightly enlarged) */}
          <polygon
            points="200,344 202.82,351.12 210.46,351.6 204.57,356.48 206.47,363.9 200,359.8 193.53,363.9 195.43,356.48 189.54,351.6 197.18,351.12"
            fill={goldColor}
          />
          <polygon
            points="165.94,339.75 169.42,344.48 175.21,343.5 171.79,348.27 174.51,353.46 168.92,351.69 164.82,355.88 164.78,350.01 159.52,347.41 165.09,345.56"
            fill={goldColor}
          />
          <polygon
            points="234.06,339.75 234.91,345.56 240.48,347.41 235.22,350.01 235.18,355.88 231.08,351.69 225.49,353.46 228.21,348.27 224.79,343.5 230.58,344.48"
            fill={goldColor}
          />

          {/* Central Heraldic Shield (Escutcheon) */}
          {/* Outer Shield with Gold Border & Charcoal Body */}
          <path
            d="M 106,138 C 122,126 156,128 200,136 C 244,128 278,126 294,138 C 290,186 280,228 200,318 C 120,228 110,186 106,138 Z"
            fill={darkCharcoal}
            stroke={goldColor}
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Inner Delicate Gold Rim */}
          <path
            d="M 116,144 C 130,134 158,136 200,143 C 242,136 270,134 284,144 C 280,184 271,222 200,306 C 129,222 120,184 116,144 Z"
            fill="none"
            stroke={goldColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Crossed Muzzle-Loading Rifles */}
          {/* Left Rifle: Stock lower-left, barrel upper-right */}
          <g transform="translate(200, 192) rotate(-50)">
            <use href={`#${rifleDefId}`} />
          </g>
          {/* Right Rifle: Stock lower-right, barrel upper-left (Mirrored) */}
          <g transform="translate(200, 192) scale(-1, 1) rotate(-50)">
            <use href={`#${rifleDefId}`} />
          </g>

          {/* Quadrant Letters: S M L C */}
          {/* S (Top) */}
          <text
            x="200"
            y="168"
            textAnchor="middle"
            fill={goldColor}
            fontSize="36"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="bold"
          >
            S
          </text>
          {/* M (Left) */}
          <text
            x="152"
            y="204"
            textAnchor="middle"
            fill={goldColor}
            fontSize="35"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="bold"
          >
            M
          </text>
          {/* L (Right) */}
          <text
            x="248"
            y="204"
            textAnchor="middle"
            fill={goldColor}
            fontSize="35"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="bold"
          >
            L
          </text>
          {/* C (Bottom) */}
          <text
            x="200"
            y="240"
            textAnchor="middle"
            fill={goldColor}
            fontSize="36"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="bold"
          >
            C
          </text>

          {/* Australian Kangaroo Silhouette in Lower Apex of Shield */}
          <path
            d="M 183,267 C 184,263 186,259 188,255 C 189,252 191,254 191,258 C 192,253 194,255 194,259 C 194,264 197,267 200,268 C 205,270 210,272 215,276 C 222,280 231,283 238,279 C 241,277 238,272 235,273 C 229,276 221,275 215,271 C 213,270 211,272 209,275 C 212,281 210,290 205,294 C 202,296 195,296 190,296 C 187,296 188,293 191,293 C 196,292 199,287 199,282 C 198,280 195,279 193,276 C 190,277 186,278 183,276 C 182,274 184,272 187,272 C 189,269 186,268 183,267 Z"
            fill={goldColor}
          />
        </svg>
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

