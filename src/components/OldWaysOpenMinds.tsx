import React from 'react';
import { CLUB_IMAGES } from '../data/clubData';

interface OldWaysOpenMindsProps {
  onReadTheJournal: () => void;
}

export const OldWaysOpenMinds: React.FC<OldWaysOpenMindsProps> = ({ onReadTheJournal }) => {
  return (
    <section className="relative w-full min-h-[460px] sm:min-h-[500px] flex items-center overflow-hidden bg-[#0F2218]" id="old-ways-open-minds-section">
      {/* Background Image: Antique flintlock, powder horn, lead balls, patch knife */}
      <div className="absolute inset-0 z-0">
        <img
          src={CLUB_IMAGES.antiqueFlintlock}
          alt="Antique colonial flintlock pistol, brass powder horn, lead balls and patch knife on rustic wood"
          className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Dark radial and right-side gradient overlay for high contrast editorial legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-[#0B1A12]/80 to-[#0B1A12]/95 md:w-3/5 md:ml-auto" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full flex justify-end">
        <div className="max-w-xl md:pl-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[#F7F4EE] leading-[1.15] mb-5">
            Old ways.
            <br />
            Open minds.
          </h2>

          <p className="text-sm sm:text-base text-[#D4DEC9] font-light leading-relaxed mb-8 max-w-lg">
            Discovering colonial firearms techniques, connecting across generations, and cultivating true certified range craftsmanship with genuine antique and reproduction black powder arms.
          </p>

          <div>
            <button
              id="read-the-journal-btn"
              onClick={onReadTheJournal}
              className="inline-flex items-center bg-[#C0633C] hover:bg-[#A9532F] text-white px-6 py-3.5 rounded text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>READ THE JOURNAL</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
