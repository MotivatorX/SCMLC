import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Search, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { UPCOMING_EVENTS } from '../../data/clubData';
import { ClubEvent } from '../../types';
import {
  getCurrentMonthFullName,
  getCurrentMonthShort,
  getCurrentYearString,
  MONTH_NAMES_SHORT,
  MONTH_NAMES_FULL,
} from '../../utils/dateUtils';

interface CalendarScreenProps {
  onSelectEvent: (event: ClubEvent) => void;
  onOpenRegister: () => void;
  events?: ClubEvent[];
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  onSelectEvent,
  onOpenRegister,
  events,
}) => {
  const currentMonthShort = getCurrentMonthShort();
  const currentMonthFull = getCurrentMonthFullName();
  const currentYear = getCurrentYearString();

  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('current'); // 'current', 'all', or 'AUG-2026'
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const eventList = events && events.length > 0 ? events : UPCOMING_EVENTS;

  // Extract unique month-years present in the events list for dynamic tabs
  const availableMonthYears = useMemo(() => {
    const map = new Map<string, { label: string; key: string; count: number }>();
    eventList.forEach(evt => {
      const yr = evt.year || currentYear;
      const m = (evt.month || '').toUpperCase().slice(0, 3);
      const key = `${m}-${yr}`;
      const mIdx = MONTH_NAMES_SHORT.indexOf(m as any);
      const fullM = mIdx !== -1 ? MONTH_NAMES_FULL[mIdx] : m;
      const label = `${fullM} ${yr}`;
      
      if (!map.has(key)) {
        map.set(key, { label, key, count: 1 });
      } else {
        map.get(key)!.count += 1;
      }
    });
    return Array.from(map.values());
  }, [eventList, currentYear]);

  const filteredEvents = useMemo(() => {
    return eventList.filter(evt => {
      const evtYear = evt.year || currentYear;
      const evtMonth = (evt.month || '').toUpperCase().slice(0, 3);
      const evtKey = `${evtMonth}-${evtYear}`;

      // Month filtering
      let matchesMonth = true;
      if (selectedMonthFilter === 'current') {
        matchesMonth = evtMonth === currentMonthShort && evtYear === currentYear;
      } else if (selectedMonthFilter !== 'all') {
        matchesMonth = evtKey === selectedMonthFilter;
      }

      // Discipline filtering
      const matchesFilter =
        filterCategory === 'all' ||
        evt.discipline.toLowerCase().includes(filterCategory.toLowerCase()) ||
        evt.title.toLowerCase().includes(filterCategory.toLowerCase());

      // Search filtering
      const matchesSearch =
        searchTerm === '' ||
        evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evtMonth.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evtYear.includes(searchTerm);

      return matchesMonth && matchesFilter && matchesSearch;
    });
  }, [eventList, selectedMonthFilter, filterCategory, searchTerm, currentMonthShort, currentYear]);

  return (
    <div className="bg-[#FAF6EE] text-[#1C1917] min-h-screen">
      {/* Header */}
      <section className="bg-[#152E20] text-[#F7F4EE] py-16 sm:py-20 border-b border-[#234832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C0633C] block">
              Sackville Range Schedule
            </span>
            <span className="text-xs text-[#DECBB5]/60">·</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#234832] text-[#81D89D] text-[11px] font-semibold tracking-wider uppercase">
              <CalendarIcon className="w-3 h-3" />
              Current Month: {currentMonthFull} {currentYear}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-4">
            Event Calendar
          </h1>
          <p className="text-base sm:text-lg text-[#D5E2D0] max-w-2xl font-light">
            Our shooting calendar runs on regular monthly Sundays at the Sackville Range. Match days for the {currentYear} season and beyond.
          </p>
        </div>
      </section>

      {/* Month Selection Bar */}
      <div className="bg-[#EAE2D2] border-b border-[#D8C6AE] py-3.5 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#63513B] shrink-0 mr-1 hidden sm:inline">
                View Month:
              </span>

              {/* Current Month Highlight Button */}
              <button
                id="filter-current-month-btn"
                onClick={() => setSelectedMonthFilter('current')}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedMonthFilter === 'current'
                    ? 'bg-[#8C3A16] text-white shadow-xs'
                    : 'bg-white/90 hover:bg-white text-[#8C3A16] border border-[#C0633C]/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Current: {currentMonthShort} {currentYear}</span>
              </button>

              {/* All Months Button */}
              <button
                id="filter-all-months-btn"
                onClick={() => setSelectedMonthFilter('all')}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  selectedMonthFilter === 'all'
                    ? 'bg-[#152E20] text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#524535] border border-[#DECBB5]'
                }`}
              >
                All Season Months
              </button>

              {/* Dynamic Month Tabs */}
              {availableMonthYears.map(my => {
                const isCurrent = my.key === `${currentMonthShort}-${currentYear}`;
                if (isCurrent) return null; // Already shown as primary current button
                return (
                  <button
                    key={my.key}
                    onClick={() => setSelectedMonthFilter(my.key)}
                    className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                      selectedMonthFilter === my.key
                        ? 'bg-[#152E20] text-white shadow-xs'
                        : 'bg-white/70 hover:bg-white text-[#524535] border border-[#DECBB5]'
                    }`}
                  >
                    {my.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#EFE8DA] border-b border-[#D8C6AE] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'single action', label: 'Single Action' },
              { id: 'pistol', label: 'Pistol' },
              { id: 'rifle', label: 'Rifle' },
              { id: 'shotgun', label: 'Shotgun' },
              { id: 'agm', label: 'AGM & Club' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-[#152E20] text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#524535] border border-[#DECBB5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#8C7A65] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search matches or month..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#DECBB5] rounded-xs text-xs focus:outline-none focus:border-[#C0633C]"
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Results indicator */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#DECBB5]">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#665842]">
            {selectedMonthFilter === 'current' ? (
              <span>
                Showing matches for <strong className="text-[#8C3A16]">Current Month ({currentMonthFull} {currentYear})</strong> ({filteredEvents.length} events)
              </span>
            ) : selectedMonthFilter === 'all' ? (
              <span>Showing All Season Matches ({filteredEvents.length} events)</span>
            ) : (
              <span>
                Showing matches for <strong className="text-[#152E20]">{selectedMonthFilter.replace('-', ' ')}</strong> ({filteredEvents.length} events)
              </span>
            )}
          </div>

          {selectedMonthFilter !== 'all' && (
            <button
              onClick={() => setSelectedMonthFilter('all')}
              className="text-xs uppercase tracking-wider font-semibold text-[#8C3A16] hover:underline cursor-pointer"
            >
              Show all months
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 bg-[#F3ECE0] rounded-sm border border-[#DECBB5] p-8">
              <CalendarIcon className="w-10 h-10 text-[#8C3A16] mx-auto mb-3 opacity-60" />
              <p className="text-lg text-[#6E5E4A] font-serif mb-2">No matches found for this selection.</p>
              <p className="text-xs text-[#82715C] max-w-md mx-auto mb-4">
                There may be no matches matching your active discipline or month filter.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedMonthFilter('all');
                    setFilterCategory('all');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 bg-[#152E20] text-white text-xs uppercase font-semibold tracking-wider rounded-xs cursor-pointer"
                >
                  View All Season Matches
                </button>
                <button
                  onClick={() => setSelectedMonthFilter('current')}
                  className="px-4 py-2 bg-[#8C3A16] text-white text-xs uppercase font-semibold tracking-wider rounded-xs cursor-pointer"
                >
                  Current Month ({currentMonthShort} {currentYear})
                </button>
              </div>
            </div>
          ) : (
            filteredEvents.map(event => {
              const displayYear = event.year || currentYear;
              const isCurrentMonthEvt =
                (event.month || '').toUpperCase().slice(0, 3) === currentMonthShort &&
                displayYear === currentYear;

              return (
                <div
                  key={event.id}
                  id={`calendar-event-row-${event.id}`}
                  onClick={() => onSelectEvent(event)}
                  className={`bg-[#FAF6EE] hover:bg-[#F3ECE0] border p-6 sm:p-8 rounded-xs transition-all duration-150 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group shadow-2xs ${
                    isCurrentMonthEvt ? 'border-[#C0633C]/60 hover:border-[#C0633C]' : 'border-[#DECBB5] hover:border-[#152E20]'
                  }`}
                >
                  {/* Left: Date Block & Info */}
                  <div className="flex items-start sm:items-center gap-6">
                    {/* Date Badge with Year */}
                    <div
                      className={`w-20 sm:w-24 py-3 px-1 rounded-xs text-center shrink-0 flex flex-col justify-center ${
                        event.themeColor === 'rust'
                          ? 'bg-[#C0633C] text-white'
                          : event.themeColor === 'green'
                          ? 'bg-[#152E20] text-[#FAF6EE]'
                          : 'bg-[#EAE2D2] text-[#152E20]'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl font-serif font-bold leading-none">
                        {event.day}
                      </span>
                      <span className="text-[11px] uppercase tracking-widest font-bold mt-1">
                        {event.month}
                      </span>
                      <span className="text-[10px] font-semibold tracking-wider opacity-90 border-t border-current/20 mt-1 pt-0.5">
                        {displayYear}
                      </span>
                    </div>

                    {/* Title & Metadata */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#8C3A16]">
                          {event.discipline}
                        </span>
                        {isCurrentMonthEvt && (
                          <span className="inline-flex items-center gap-1 bg-[#8C3A16] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs">
                            Current Month
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-serif text-[#152E20] group-hover:text-[#8C3A16] transition-colors mb-2">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B5A45]">
                        <span className="flex items-center gap-1 font-medium">
                          <CalendarIcon className="w-3.5 h-3.5 text-[#8C3A16]" />
                          {event.day} {event.month} {displayYear}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </span>
                        {event.visitorFriendly && (
                          <span className="bg-[#E7DAC7] text-[#554632] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                            Visitors Welcome
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action */}
                  <div className="flex items-center justify-end gap-3 shrink-0">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#8C3A16] group-hover:underline hidden sm:inline">
                      Match Details
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#EAE2D2] group-hover:bg-[#C0633C] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Visitor CTA */}
        <div className="mt-16 bg-[#152E20] text-[#F7F4EE] p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-2xl font-serif mb-2">Want to attend a match day?</h3>
            <p className="text-xs sm:text-sm text-[#D3E0CD] font-light max-w-xl">
              Register as a visitor ahead of time so our Range Captains can arrange loan equipment and ensure an accredited Range Officer is paired with you.
            </p>
          </div>
          <button
            onClick={onOpenRegister}
            className="bg-[#C0633C] hover:bg-[#A9532F] text-white px-6 py-3.5 rounded text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors cursor-pointer"
          >
            REGISTER VISITOR ATTENDANCE
          </button>
        </div>
      </section>
    </div>
  );
};
