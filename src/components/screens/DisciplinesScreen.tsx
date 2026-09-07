import React, { useState } from 'react';
import { Target, Flame, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { DISCIPLINES } from '../../data/clubData';
import { ClubLogo } from '../ClubLogo';

interface DisciplinesScreenProps {
  initialDisciplineId?: string;
  onOpenRegister: () => void;
  onViewCalendar: () => void;
}

export const DisciplinesScreen: React.FC<DisciplinesScreenProps> = ({
  initialDisciplineId = 'single-action',
  onOpenRegister,
  onViewCalendar,
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialDisciplineId);

  const activeDiscipline = DISCIPLINES.find(d => d.id === selectedId) || DISCIPLINES[0];

  return (
    <div className="bg-[#FAF6EE] text-[#1C1917] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#152E20] text-[#F7F4EE] py-16 sm:py-20 border-b border-[#244933] relative overflow-hidden">
        {/* Watermark Crest */}
        <div className="absolute right-[-20px] top-[-20px] opacity-15 pointer-events-none hidden lg:block select-none">
          <ClubLogo size={420} theme="dark" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1 bg-[#0E2016] rounded-full border border-[#C5A880]/50 shadow-sm shrink-0">
              <ClubLogo size={36} theme="dark" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C0633C]">
              Colonial Shooting Disciplines · Est. 1962
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-4">
            Shooting Disciplines
          </h1>
          <p className="text-base sm:text-lg text-[#D5E2D0] max-w-2xl font-light">
            Every match is an encounter with authentic 19th-century history. Choose a discipline below to explore firearm categories, regulations, and course formats.
          </p>
        </div>
      </section>

      {/* Tabs navigation */}
      <div className="bg-[#EFE8DA] border-b border-[#D8C6AE] sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto scrollbar-none py-2 gap-2">
          {DISCIPLINES.map(disc => {
            const isActive = disc.id === selectedId;
            return (
              <button
                key={disc.id}
                onClick={() => setSelectedId(disc.id)}
                className={`px-5 py-3 rounded-xs text-xs sm:text-sm uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#152E20] text-[#F7F4EE] shadow-sm'
                    : 'bg-transparent text-[#5B4F3D] hover:text-[#152E20] hover:bg-[#E5DBCA]'
                }`}
              >
                <span className="text-[#C0633C] mr-2 font-serif">{disc.number}</span>
                {disc.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Discipline Detail View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A16] mb-2">
                <span>Discipline {activeDiscipline.number}</span>
                <span>•</span>
                <span>{activeDiscipline.schedule}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#152E20] mb-4">
                {activeDiscipline.title}
              </h2>
              <p className="text-lg text-[#6C583E] font-serif italic mb-6">
                {activeDiscipline.tagline}
              </p>
              <p className="text-base text-[#3E3528] leading-relaxed font-light">
                {activeDiscipline.description}
              </p>
            </div>

            {/* Course of fire */}
            <div className="bg-[#F3ECE0] p-6 sm:p-8 rounded-xs border border-[#D5C2A7]">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#152E20] mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#C0633C]" />
                Course of Fire & Targets
              </h3>
              <p className="text-sm text-[#3E3528] leading-relaxed">
                {activeDiscipline.courseOfFire}
              </p>
            </div>

            {/* Firearms & Calibers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F3ECE0] p-6 rounded-xs border border-[#D5C2A7]">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16] mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Historical Firearms Used
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#3E3528]">
                  {activeDiscipline.firearms.map((arm, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C0633C] font-bold">•</span>
                      <span>{arm}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F3ECE0] p-6 rounded-xs border border-[#D5C2A7]">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16] mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Powder & Loading Specifications
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-[#3E3528]">
                  <div>
                    <strong className="text-[#152E20] block">Calibers:</strong>
                    {activeDiscipline.calibers}
                  </div>
                  <div>
                    <strong className="text-[#152E20] block">Powder Specs:</strong>
                    {activeDiscipline.powderSpecs}
                  </div>
                  <div>
                    <strong className="text-[#152E20] block">Safety Notes:</strong>
                    {activeDiscipline.equipmentNotes}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Get Started as a Novice */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#152E20] text-[#F7F4EE] p-6 sm:p-8 rounded-sm shadow-md">
              <h3 className="text-xl font-serif mb-3 text-white">
                Don&apos;t own a firearm yet?
              </h3>
              <p className="text-xs sm:text-sm text-[#D1DEC8] leading-relaxed mb-6 font-light">
                Visitors without their own black powder equipment are warmly invited to our shoots. SCMLC maintains club loan arms, and seasoned mentors will guide you through powder measuring, swabbing, and firing.
              </p>
              <button
                onClick={onOpenRegister}
                className="w-full bg-[#C0633C] hover:bg-[#A9532F] text-white py-3 rounded-xs text-xs font-semibold uppercase tracking-widest transition-colors mb-3"
              >
                BOOK A VISITOR TRY-SHOOT
              </button>
              <button
                onClick={onViewCalendar}
                className="w-full bg-transparent border border-[#F7F4EE]/30 hover:border-white text-white py-3 rounded-xs text-xs font-semibold uppercase tracking-widest transition-colors"
              >
                CHECK SHOOT DATES
              </button>
            </div>

            {/* Equipment Checklist */}
            <div className="bg-[#FAF6EE] p-6 rounded-sm border border-[#D5C2A7]">
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16] mb-3">
                Shooter Essentials
              </h4>
              <div className="space-y-2 text-xs text-[#524636]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C0633C]" />
                  <span>Enclosed leather footwear</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C0633C]" />
                  <span>Safety glasses & earmuffs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C0633C]" />
                  <span>Pre-measured powder tubes only</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C0633C]" />
                  <span>Natural fiber clothing (cotton/wool)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
