import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { DISCIPLINES } from '../data/clubData';

interface FourWaysToShootProps {
  onExploreAll: () => void;
  onSelectDisciplineDetail: (id: string) => void;
}

export const FourWaysToShoot: React.FC<FourWaysToShootProps> = ({
  onExploreAll,
  onSelectDisciplineDetail,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#FAF6EE] text-[#1C1917] py-20 lg:py-28" id="four-ways-to-shoot-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-[#152E20] mb-12 sm:mb-16">
          Four ways to shoot.
        </h2>

        {/* List of 4 disciplines */}
        <div className="border-t border-[#DECBB5]">
          {DISCIPLINES.map((discipline) => {
            const isExpanded = expandedId === discipline.id;

            return (
              <div
                key={discipline.id}
                id={`discipline-accordion-${discipline.id}`}
                className="border-b border-[#DECBB5] transition-colors"
              >
                {/* Accordion Header row */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(discipline.id)}
                  aria-expanded={isExpanded}
                  className="w-full py-7 sm:py-9 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left group hover:bg-[#F3ECE0]/50 px-2 transition-colors cursor-pointer"
                >
                  {/* Left: Number and Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-serif text-2xl sm:text-3xl text-[#944622] group-hover:text-[#C0633C] transition-colors font-medium">
                      {discipline.number}
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#152E20] group-hover:text-[#0C1C13] transition-colors">
                      {discipline.title}
                    </span>
                  </div>

                  {/* Right: Schedule & Chevron */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0">
                    <span className="text-xs sm:text-[13px] tracking-[0.16em] uppercase font-semibold text-[#665842] group-hover:text-[#152E20] transition-colors">
                      {discipline.schedule}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-[#88785E] group-hover:text-[#C0633C] transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-[#C0633C]' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                {isExpanded && (
                  <div className="px-2 sm:px-14 pb-9 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-base sm:text-lg text-[#3E382E] leading-relaxed max-w-3xl mb-6">
                      {discipline.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F4EDE0] p-6 rounded-sm border border-[#DECBB5] mb-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#8C3A16] mb-3 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5" />
                          Historical Arms & Calibers
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-[#383126]">
                          {discipline.firearms.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#C0633C] font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#8C3A16] mb-3 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Course of Fire & Loading Specs
                        </h4>
                        <p className="text-xs sm:text-sm text-[#383126] mb-3">
                          <strong className="text-[#152E20]">Course:</strong> {discipline.courseOfFire}
                        </p>
                        <p className="text-xs sm:text-sm text-[#383126] mb-3">
                          <strong className="text-[#152E20]">Powder:</strong> {discipline.powderSpecs}
                        </p>
                        <p className="text-xs sm:text-sm text-[#665842] italic">
                          {discipline.equipmentNotes}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onSelectDisciplineDetail(discipline.id)}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8C3A16] hover:text-[#C0633C] transition-colors"
                      >
                        <span>View complete {discipline.title} guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Link: EXPLORE ALL DISCIPLINES */}
        <div className="mt-12 sm:mt-16">
          <button
            id="explore-all-disciplines-btn"
            onClick={onExploreAll}
            className="inline-block text-xs sm:text-sm uppercase font-semibold tracking-[0.16em] text-[#152E20] hover:text-[#C0633C] border-b-2 border-[#152E20] hover:border-[#C0633C] pb-1 transition-colors cursor-pointer"
          >
            EXPLORE ALL DISCIPLINES
          </button>
        </div>
      </div>
    </section>
  );
};
