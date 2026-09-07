import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  Shield,
  CheckCircle,
  AlertCircle,
  Save,
  Trash2,
  Sparkles,
  Bold,
  Italic,
  List,
  Eye,
  Edit3,
} from 'lucide-react';
import { ClubEvent } from '../../types';

interface EventEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveEvent: (event: ClubEvent) => void;
  onDeleteEvent?: (eventId: string) => void;
  editingEvent?: ClubEvent | null;
}

const DISCIPLINES = [
  'Single Action',
  'Pistol events',
  'Rifle events',
  'Shotgun events',
  'The Club',
];

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const EventEditorModal: React.FC<EventEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveEvent,
  onDeleteEvent,
  editingEvent,
}) => {
  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('SEP');
  const [year, setYear] = useState('2026');
  const [discipline, setDiscipline] = useState('Single Action');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Sackville Range');
  const [time, setTime] = useState('9:00 AM');
  const [themeColor, setThemeColor] = useState<'rust' | 'green' | 'tan'>('rust');
  const [description, setDescription] = useState('');
  const [matchDirector, setMatchDirector] = useState('');
  const [rangesOpen, setRangesOpen] = useState('8:00 AM Sign-in');
  const [fees, setFees] = useState('$15 match fee');
  const [safetyBriefing, setSafetyBriefing] = useState('Eye and ear protection mandatory. Capping only on firing line.');
  const [visitorFriendly, setVisitorFriendly] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    if (editingEvent) {
      setDay(editingEvent.day || '01');
      setMonth(editingEvent.month || 'SEP');
      setYear(editingEvent.year || '2026');
      setDiscipline(editingEvent.discipline || 'Single Action');
      setTitle(editingEvent.title || '');
      setLocation(editingEvent.location || 'Sackville Range');
      setTime(editingEvent.time || '9:00 AM');
      setThemeColor(editingEvent.themeColor || 'rust');
      setDescription(editingEvent.description || '');
      setMatchDirector(editingEvent.matchDirector || '');
      setRangesOpen(editingEvent.rangesOpen || '8:00 AM Sign-in');
      setFees(editingEvent.fees || '$15 match fee');
      setSafetyBriefing(editingEvent.safetyBriefing || 'Standard safety briefing at 8:45am.');
      setVisitorFriendly(editingEvent.visitorFriendly ?? true);
    } else {
      const now = new Date();
      const currentMonthIndex = now.getMonth();
      setDay(String(now.getDate()).padStart(2, '0'));
      setMonth(MONTHS[currentMonthIndex]);
      setYear(String(now.getFullYear()));
      setDiscipline('Single Action');
      setTitle('');
      setLocation('Sackville Range');
      setTime('9:00 AM - 3:00 PM');
      setThemeColor('rust');
      setDescription('');
      setMatchDirector('Club Match Director');
      setRangesOpen('8:00 AM Sign-in & Setup');
      setFees('$15 match fee');
      setSafetyBriefing('Eye and ear protection mandatory. Pre-measured powder charges only.');
      setVisitorFriendly(true);
    }
    setStatusMsg(null);
    setActiveTab('edit');
  }, [editingEvent, isOpen]);

  if (!isOpen) return null;

  const handleInsertText = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('event-desc-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = description.substring(start, end);
    const replacement = prefix + (selected || 'text') + suffix;
    const newText = description.substring(0, start) + replacement + description.substring(end);
    setDescription(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMsg({ type: 'error', text: 'Please provide a title for the event.' });
      return;
    }

    const eventToSave: ClubEvent = {
      id: editingEvent?.id || `evt-custom-${Date.now()}`,
      day: day.padStart(2, '0'),
      month: month.toUpperCase(),
      year: year.trim() || '2026',
      discipline: discipline.trim(),
      title: title.trim(),
      location: location.trim() || 'Sackville Range',
      time: time.trim() || '9:00 AM',
      themeColor,
      description: description.trim() || 'Scheduled club shoot and colonial black powder marksmanship event.',
      matchDirector: matchDirector.trim() || 'Range Captain',
      rangesOpen: rangesOpen.trim() || '8:00 AM Setup',
      fees: fees.trim() || '$15 match fee',
      safetyBriefing: safetyBriefing.trim() || 'Eye and ear protection mandatory.',
      visitorFriendly,
    };

    onSaveEvent(eventToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#152E20]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-[#FAF6EE] text-[#1C1917] border border-[#D5C2A7] rounded-sm shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#152E20] text-[#F7F4EE] px-6 py-4 border-b border-[#264D35] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#C5A880]" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block">
                WYSIWYG Calendar Manager
              </span>
              <h2 className="text-lg font-serif font-semibold text-[#F7F4EE]">
                {editingEvent ? 'Edit Calendar Event' : 'Add New Calendar Match Event'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#0D2418] p-0.5 rounded-xs border border-[#234832] text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'edit'
                    ? 'bg-[#C0633C] text-white'
                    : 'text-[#A6BAAE] hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Form Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-[#C0633C] text-white'
                    : 'text-[#A6BAAE] hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Card Preview</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#D5E2D0] hover:text-white hover:bg-[#234832] rounded-xs transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status banner */}
        {statusMsg && (
          <div
            className={`px-6 py-2.5 text-xs flex items-center gap-2 shrink-0 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-b border-amber-200'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {activeTab === 'edit' ? (
            <form onSubmit={handleSubmit} className="space-y-6" id="event-editor-form">
              {/* Row 1: Discipline & Title */}
              <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                    1. Discipline & Match Title
                  </h3>
                  <span className="text-[11px] text-[#7A6B56]">Required</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#152E20]">
                    Select Discipline / Category <span className="text-[#C0633C]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DISCIPLINES.map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => {
                          setDiscipline(d);
                          if (d === 'Single Action') setThemeColor('rust');
                          else if (d === 'Pistol events') setThemeColor('tan');
                          else if (d === 'Rifle events') setThemeColor('rust');
                          else if (d === 'Shotgun events') setThemeColor('green');
                          else setThemeColor('green');
                        }}
                        className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                          discipline.toLowerCase() === d.toLowerCase()
                            ? 'bg-[#152E20] text-[#FAF6EE] border-[#152E20] shadow-xs'
                            : 'bg-[#FAF6EE] text-[#554632] border-[#DECBB5] hover:border-[#8C3A16]'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#152E20] mb-1">
                    Event / Match Title <span className="text-[#C0633C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Frontier Steel Challenge & Campfire Damper"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-sm font-medium text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                  />
                </div>
              </div>

              {/* Row 2: Date, Time, Location & Theme */}
              <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                  2. Date, Time & Visual Theme
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#152E20] mb-1">
                      Day (01-31)
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      value={day}
                      onChange={(e) => setDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
                      placeholder="07"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-center font-mono text-sm font-bold text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#152E20] mb-1">
                      Month
                    </label>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-center font-mono text-sm font-bold text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#152E20] mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={year}
                      onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="2026"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-center font-mono text-sm font-bold text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#152E20] mb-1">
                      Badge Color
                    </label>
                    <div className="flex gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setThemeColor('rust')}
                        className={`flex-1 py-1.5 rounded-xs text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          themeColor === 'rust'
                            ? 'bg-[#C0633C] text-white ring-2 ring-[#8C3A16]'
                            : 'bg-[#C0633C]/20 text-[#8C3A16] hover:bg-[#C0633C]/40'
                        }`}
                      >
                        Rust
                      </button>
                      <button
                        type="button"
                        onClick={() => setThemeColor('green')}
                        className={`flex-1 py-1.5 rounded-xs text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          themeColor === 'green'
                            ? 'bg-[#152E20] text-white ring-2 ring-[#0D2418]'
                            : 'bg-[#152E20]/20 text-[#152E20] hover:bg-[#152E20]/40'
                        }`}
                      >
                        Green
                      </button>
                      <button
                        type="button"
                        onClick={() => setThemeColor('tan')}
                        className={`flex-1 py-1.5 rounded-xs text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          themeColor === 'tan'
                            ? 'bg-[#554632] text-white ring-2 ring-[#3A2E1F]'
                            : 'bg-[#554632]/20 text-[#554632] hover:bg-[#554632]/40'
                        }`}
                      >
                        Tan
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Match Time
                    </label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g., 9:00 AM or 8:30am - 3:30pm"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Sackville Range, Hawkesbury"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Match Details & Fees */}
              <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                  3. Operational & Director Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Match Director
                    </label>
                    <input
                      type="text"
                      value={matchDirector}
                      onChange={(e) => setMatchDirector(e.target.value)}
                      placeholder="e.g., J. MacIntyre"
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1">
                      Gates / Range Open
                    </label>
                    <input
                      type="text"
                      value={rangesOpen}
                      onChange={(e) => setRangesOpen(e.target.value)}
                      placeholder="e.g., 8:00 AM Sign-in"
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Match Entry Fees
                    </label>
                    <input
                      type="text"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      placeholder="e.g., $15 match fee"
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Safety Briefing Notes
                    </label>
                    <input
                      type="text"
                      value={safetyBriefing}
                      onChange={(e) => setSafetyBriefing(e.target.value)}
                      placeholder="e.g., Eye & ear protection mandatory. Capping only on firing line."
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs mt-auto">
                    <div>
                      <div className="text-xs font-bold text-[#152E20]">Visitor & Spectator Friendly?</div>
                      <div className="text-[11px] text-[#7A6B56]">Welcome observers & unlicensed guests with RO</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={visitorFriendly}
                      onChange={(e) => setVisitorFriendly(e.target.checked)}
                      className="w-4 h-4 text-[#0D4827] accent-[#152E20] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: WYSIWYG Description Toolbar & Text */}
              <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                    4. Event Description & Match Program
                  </h3>
                  <span className="text-[11px] text-[#7A6B56]">Shown in event popup modal</span>
                </div>

                {/* Quick WYSIWYG helper buttons */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs">
                  <span className="text-[10px] font-bold uppercase text-[#7A6B56] mr-1">Quick Tools:</span>
                  <button
                    type="button"
                    onClick={() => handleInsertText('**', '**')}
                    className="p-1.5 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-xs font-bold text-[#152E20] cursor-pointer"
                    title="Bold text"
                  >
                    <Bold className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText('*', '*')}
                    className="p-1.5 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-xs italic text-[#152E20] cursor-pointer"
                    title="Italic text"
                  >
                    <Italic className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText('\n• Stage 1: ')}
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] flex items-center gap-1 cursor-pointer"
                  >
                    <List className="w-3 h-3 text-[#8C3A16]" />
                    <span>Add Stage</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText('\nBBQ lunch and refreshments served at 12:30pm.')}
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] cursor-pointer"
                  >
                    + BBQ Note
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText('\nBring pre-measured powder tubes and authentic patches.')}
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] cursor-pointer"
                  >
                    + Loading Note
                  </button>
                </div>

                <textarea
                  id="event-desc-textarea"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the match stages, course of fire, targets, historical themes, and special requirements..."
                  className="w-full px-3.5 py-3 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C] leading-relaxed"
                />
              </div>
            </form>
          ) : (
            /* Live Card & Modal Preview Tab */
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 bg-[#152E20] text-[#F7F4EE] rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block">
                    Real-Time Preview
                  </span>
                  <h3 className="text-base font-serif font-medium">
                    How this event appears on the calendar
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className="px-3 py-1.5 bg-[#C0633C] text-white rounded-xs text-xs font-semibold uppercase tracking-wider"
                >
                  Return to Form
                </button>
              </div>

              {/* Event Card Component Simulation */}
              <div className="bg-[#FAF6EE] border border-[#D5C2A7] rounded-sm p-6 shadow-md flex flex-col md:flex-row gap-6 items-start">
                <div
                  className={`w-20 py-3.5 px-2 rounded-xs text-center shrink-0 flex flex-col items-center justify-center font-serif leading-none shadow-xs ${
                    themeColor === 'rust'
                      ? 'bg-[#C0633C] text-white'
                      : themeColor === 'green'
                      ? 'bg-[#152E20] text-white'
                      : 'bg-[#554632] text-[#FAF6EE]'
                  }`}
                >
                  <span className="text-2xl font-bold">{day || '01'}</span>
                  <span className="text-xs uppercase font-sans font-semibold tracking-wider mt-0.5">
                    {month || 'SEP'}
                  </span>
                  <span className="text-[10px] font-mono tracking-tight opacity-90 mt-1">
                    {year || '2026'}
                  </span>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#8C3A16]">
                      {discipline}
                    </span>
                    {visitorFriendly && (
                      <span className="text-[10px] bg-[#0D4827]/10 text-[#0D4827] px-2 py-0.5 rounded font-medium">
                        Visitors Welcome
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif font-normal text-[#152E20]">
                    {title || 'Match Title'}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4E4436] leading-relaxed">
                    {description || 'Event description will appear here...'}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs border-t border-[#DECBB5]">
                    <div>
                      <span className="text-[10px] text-[#7A6B56] uppercase block font-semibold">Time</span>
                      <span className="font-semibold text-[#152E20]">{time}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7A6B56] uppercase block font-semibold">Location</span>
                      <span className="font-semibold text-[#152E20]">{location}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7A6B56] uppercase block font-semibold">Director</span>
                      <span className="font-semibold text-[#152E20]">{matchDirector || 'RO'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7A6B56] uppercase block font-semibold">Fees</span>
                      <span className="font-semibold text-[#8C3A16]">{fees}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Controls Footer */}
        <div className="bg-[#FAF6EE] px-6 py-4 border-t border-[#DECBB5] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div>
            {editingEvent && onDeleteEvent && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${editingEvent.title}"?`)) {
                    onDeleteEvent(editingEvent.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Event</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-[#FAF6EE] text-[#4A3D2C] border border-[#DECBB5] rounded-xs text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#152E20] hover:bg-[#234832] text-[#FAF6EE] rounded-xs text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <Save className="w-4 h-4 text-[#C5A880]" />
              <span>{editingEvent ? 'Save Changes' : 'Add Event to Calendar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
