import React from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/clubData';
import { ClubEvent } from '../types';
import {
  getCurrentMonthFullName,
  getCurrentYearString,
  getEventsForCurrentMonth,
} from '../utils/dateUtils';

interface NextOnCalendarProps {
  onViewFullCalendar: () => void;
  onSelectEvent: (event: ClubEvent) => void;
  events?: ClubEvent[];
}

export const NextOnCalendar: React.FC<NextOnCalendarProps> = ({
  onViewFullCalendar,
  onSelectEvent,
  events,
}) => {
  const eventList = events && events.length > 0 ? events : UPCOMING_EVENTS;
  
  // Show events for current month (or next available if current month is finished)
  const currentMonthName = getCurrentMonthFullName();
  const currentYear = getCurrentYearString();
  const monthEvents = getEventsForCurrentMonth(eventList);
  
  // Display the top 3-4 events
  const featuredEvents = monthEvents.slice(0, 3);

  return (
    <section className="bg-[#FAF6EE] text-[#1C1917] py-20 lg:py-28 border-t border-[#DECBB5]" id="next-on-calendar-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAE2D2] border border-[#DECBB5] rounded-xs text-[#8C3A16] text-xs font-semibold uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Current Month · {currentMonthName} {currentYear}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-[#152E20] mb-4">
              Next on the calendar.
            </h2>
            <p className="text-sm sm:text-base text-[#665842] max-w-xl font-light">
              Our regular shooting days at our historic Sackville range and Club branches for {currentMonthName} {currentYear}.
            </p>
          </div>

          <button
            id="view-full-calendar-header-btn"
            onClick={onViewFullCalendar}
            className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase font-semibold tracking-[0.16em] text-[#152E20] hover:text-[#C0633C] border-b-2 border-[#152E20] hover:border-[#C0633C] pb-1 transition-colors cursor-pointer"
          >
            <span>VIEW FULL CALENDAR</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredEvents.map((event) => {
            // Determine styles based on theme color
            let cardClasses = '';
            let dateColor = '';
            let titleColor = '';
            let subColor = '';
            let arrowColor = '';
            let yearBadgeColor = '';

            if (event.themeColor === 'rust') {
              cardClasses = 'bg-[#C0633C] text-white hover:bg-[#B35832]';
              dateColor = 'text-white';
              titleColor = 'text-white';
              subColor = 'text-white/85';
              arrowColor = 'text-white';
              yearBadgeColor = 'bg-white/20 text-white';
            } else if (event.themeColor === 'green') {
              cardClasses = 'bg-[#152E20] text-[#F7F4EE] hover:bg-[#112519]';
              dateColor = 'text-[#F7F4EE]';
              titleColor = 'text-[#F7F4EE]';
              subColor = 'text-[#C7D4CA]';
              arrowColor = 'text-[#EAE2D2]';
              yearBadgeColor = 'bg-white/15 text-[#F7F4EE]';
            } else {
              // Tan
              cardClasses = 'bg-[#EAE2D2] text-[#152E20] hover:bg-[#E3D8C3]';
              dateColor = 'text-[#152E20]';
              titleColor = 'text-[#152E20]';
              subColor = 'text-[#5C503C]';
              arrowColor = 'text-[#152E20]';
              yearBadgeColor = 'bg-[#152E20]/10 text-[#152E20]';
            }

            const displayYear = event.year || currentYear;

            return (
              <div
                key={event.id}
                id={`calendar-card-${event.id}`}
                onClick={() => onSelectEvent(event)}
                className={`group relative p-7 sm:p-8 rounded-xs cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[280px] shadow-sm hover:shadow-md hover:-translate-y-1 ${cardClasses}`}
              >
                {/* Top Row: Date and Year and Arrow */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className={`text-4xl sm:text-5xl font-serif font-medium leading-none ${dateColor}`}>
                      {event.day}
                    </span>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className={`text-xs uppercase tracking-[0.2em] font-semibold opacity-90 ${dateColor}`}>
                        {event.month}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-xs tracking-wider ${yearBadgeColor}`}>
                        {displayYear}
                      </span>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-full group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <ArrowUpRight className={`w-5 h-5 ${arrowColor}`} />
                  </div>
                </div>

                {/* Bottom Row: Title and Location */}
                <div className="mt-8">
                  <span className={`text-[11px] uppercase tracking-[0.14em] font-semibold block mb-1 opacity-80 ${dateColor}`}>
                    {event.discipline}
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-serif font-normal capitalize mb-2 ${titleColor}`}>
                    {event.title}
                  </h3>
                  <p className={`text-xs tracking-wider uppercase font-medium ${subColor}`}>
                    {event.location} · {event.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Calendar Footer Link */}
        <div className="mt-12 sm:mt-16 text-center sm:text-left">
          <button
            id="view-full-calendar-btn"
            onClick={onViewFullCalendar}
            className="inline-block text-xs sm:text-sm uppercase font-semibold tracking-[0.16em] text-[#152E20] hover:text-[#C0633C] border-b-2 border-[#152E20] hover:border-[#C0633C] pb-1 transition-colors cursor-pointer"
          >
            VIEW FULL {currentYear} SHOOTING CALENDAR
          </button>
        </div>
      </div>
    </section>
  );
};
