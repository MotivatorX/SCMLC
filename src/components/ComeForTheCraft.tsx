import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CLUB_IMAGES } from '../data/clubData';

interface ComeForTheCraftProps {
  onMeetTheClub: () => void;
}

export const ComeForTheCraft: React.FC<ComeForTheCraftProps> = ({ onMeetTheClub }) => {
  return (
    <section className="bg-[#152E20] text-[#F7F4EE] py-20 lg:py-28" id="come-for-the-craft-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Photo of Colonial Shooters */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-sm border border-[#244b34] shadow-2xl">
              <img
                src={CLUB_IMAGES.historicShooters}
                alt="Australian colonial muzzle loading shooters in historical slouch hats on the grassy Sackville range"
                className="w-full h-[360px] sm:h-[440px] object-cover object-center filter brightness-[0.95]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-white/10 pointer-events-none" />
            </div>
            {/* Subtle vintage stamp or caption */}
            <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#A6BAAE]">
              <span>Sackville Range, NSW</span>
              <span>Heritage Fellowship</span>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[#F7F4EE] leading-[1.18] mb-6">
              Come for the craft.
              <br />
              Stay for the company.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#D3DECE] leading-relaxed max-w-2xl mb-8 font-light">
              <p>
                The Sydney Colonial Muzzle Loading Club (SCMLC) is dedicated to colonial-era connection, camaraderie and authentic heritage shooting craft.
              </p>
              <p>
                Devoted to the craft, and its members: focused on safety, fun, and the shared excitement towards traditional historical equipment, artifacts, custom calibers and target practice.
              </p>
            </div>

            <div>
              <button
                id="meet-the-club-btn"
                onClick={onMeetTheClub}
                className="inline-flex items-center gap-2.5 bg-[#C0633C] hover:bg-[#A9532F] text-white px-6 py-3.5 rounded text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <span>MEET THE CLUB</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
