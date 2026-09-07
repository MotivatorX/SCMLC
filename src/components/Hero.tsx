import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CLUB_IMAGES } from '../data/clubData';

interface HeroProps {
  onSeeWhatsOn: () => void;
  onOurStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSeeWhatsOn, onOurStory }) => {
  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#152E20]" id="hero-section">
      {/* Background Image with Authentic Billowing Black Powder Smoke */}
      <div className="absolute inset-0 z-0">
        <img
          src={CLUB_IMAGES.heroSmoke}
          alt="Colonial muzzle-loader rifle being fired on the Australian range with authentic billowing smoke"
          className="w-full h-full object-cover object-center lg:object-[50%_35%] filter brightness-[0.92] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic gradient overlays for maximum editorial contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1F15]/90 via-[#0E1F15]/65 to-transparent sm:w-3/4 lg:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F15]/80 via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl sm:max-w-3xl">
          {/* Main Title matching the screenshot */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#F7F4EE] font-serif leading-[1.08] drop-shadow-sm mb-5">
            History, in hand.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-[#E6DCBF] font-light leading-relaxed max-w-xl mb-9 opacity-95">
            A working range, a generous community, and a living connection to Australia&apos;s colonial shooting traditions.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Primary Button */}
            <button
              id="hero-see-whats-on-btn"
              onClick={onSeeWhatsOn}
              className="inline-flex items-center gap-2 bg-[#C0633C] hover:bg-[#A9532F] text-white px-6 py-3.5 rounded text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>SEE WHAT&apos;S ON</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Button */}
            <button
              id="hero-our-story-btn"
              onClick={onOurStory}
              className="inline-flex items-center bg-[#132A1C]/75 hover:bg-[#183523] text-[#F7F4EE] border border-[#EAE2D2]/40 hover:border-[#EAE2D2] px-6 py-3.5 rounded text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              <span>OUR STORY</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
