import React, { useState, useRef } from 'react';
import {
  Lock,
  Unlock,
  Upload,
  FileText,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Trash2,
  Download,
  Calendar,
  Eye,
  Copy,
  Plus,
  RefreshCw,
  ArrowRight,
  Sparkles,
  BookOpen,
  Edit,
  AlertTriangle,
  Search,
  Filter,
  Layers,
  MapPin,
  Mail,
  User,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ClubEvent, UploadedImage, JournalArticle, Notice } from '../../types';
import { parseCalendarCSV, generateSampleCalendarCSV } from '../../utils/csvParser';
import { UPCOMING_EVENTS, JOURNAL_ARTICLES, NOTICES, CLUB_CONTACTS } from '../../data/clubData';
import { EventEditorModal } from '../modals/EventEditorModal';
import { NoticeEditorModal } from '../modals/NoticeEditorModal';
import { JournalEditorModal } from '../modals/JournalEditorModal';

interface AdminPortalProps {
  isAdmin: boolean;
  onLogin: (success: boolean) => void;
  onLogout: () => void;
  events: ClubEvent[];
  onUpdateEvents: (newEvents: ClubEvent[]) => void;
  images: UploadedImage[];
  onUpdateImages: (newImages: UploadedImage[]) => void;
  articles?: JournalArticle[];
  onUpdateArticles?: (newArticles: JournalArticle[]) => void;
  notices?: Notice[];
  onUpdateNotices?: (newNotices: Notice[]) => void;
  onNavigateToCalendar?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isAdmin,
  onLogin,
  onLogout,
  events,
  onUpdateEvents,
  images,
  onUpdateImages,
  articles = JOURNAL_ARTICLES,
  onUpdateArticles,
  notices = NOTICES,
  onUpdateNotices,
  onNavigateToCalendar,
}) => {
  // Login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Admin tabs: 'events' | 'notices' | 'journal' | 'images' | 'contacts'
  const [activeTab, setActiveTab] = useState<'events' | 'notices' | 'journal' | 'images' | 'contacts'>('events');

  // WYSIWYG Event Editor state
  const [isEventEditorOpen, setIsEventEditorOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ClubEvent | null>(null);
  const [eventSearchQuery, setEventSearchQuery] = useState('');
  const [eventDisciplineFilter, setEventDisciplineFilter] = useState('ALL');
  const [showCsvImporter, setShowCsvImporter] = useState(false);

  // WYSIWYG Notice Editor state
  const [isNoticeEditorOpen, setIsNoticeEditorOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  // WYSIWYG Journal Editor state
  const [isJournalEditorOpen, setIsJournalEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);

  // Image Upload state
  const [imageCategory, setImageCategory] = useState('Range Facilities');
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [imageUploadStatus, setImageUploadStatus] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // CSV Importer state
  const [csvText, setCsvText] = useState('');
  const [csvFileName, setCsvFileName] = useState('');
  const [parsedPreviewEvents, setParsedPreviewEvents] = useState<ClubEvent[]>([]);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const [csvSuccessMsg, setCsvSuccessMsg] = useState<string | null>(null);
  const [isDraggingCsv, setIsDraggingCsv] = useState(false);
  const csvInputRef = useRef<HTMLInputElement>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Verification: username 'admin' and password 'U12pintara'
    if (username.trim().toLowerCase() === 'admin' && password === 'U12pintara') {
      onLogin(true);
      setUsername('');
      setPassword('');
      showToast('Welcome Admin! You now have full WYSIWYG control over the site.');
    } else {
      setLoginError('Invalid credentials. (Hint: username is admin)');
    }
  };

  // Process selected image file
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setImageUploadStatus('Please select a valid image file (JPG, PNG, WebP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const newImg: UploadedImage = {
          id: `img-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          category: imageCategory,
          url: dataUrl,
          size: `${Math.round(file.size / 1024)} KB`,
          uploadDate: new Date().toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        };
        const updated = [newImg, ...images];
        onUpdateImages(updated);
        setImageUploadStatus(`Success: "${file.name}" saved to library.`);
        showToast('Image uploaded successfully to club library.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImage(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleDeleteImage = (id: string) => {
    const updated = images.filter((img) => img.id !== id);
    onUpdateImages(updated);
    showToast('Image removed from library.');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // =========================================================================
  // EVENT HANDLERS (WYSIWYG)
  // =========================================================================
  const handleSaveEvent = (savedEvent: ClubEvent) => {
    const existingIndex = events.findIndex((e) => e.id === savedEvent.id);
    let updated: ClubEvent[];
    if (existingIndex >= 0) {
      updated = [...events];
      updated[existingIndex] = savedEvent;
      showToast(`Updated event: "${savedEvent.title}"`);
    } else {
      updated = [savedEvent, ...events];
      showToast(`Added new match event: "${savedEvent.title}"`);
    }
    onUpdateEvents(updated);
    setIsEventEditorOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    const updated = events.filter((e) => e.id !== eventId);
    onUpdateEvents(updated);
    showToast('Event removed from schedule.');
  };

  const handleDuplicateEvent = (evt: ClubEvent) => {
    const duplicated: ClubEvent = {
      ...evt,
      id: `evt-dup-${Date.now()}`,
      title: `${evt.title} (Copy)`,
    };
    const updated = [duplicated, ...events];
    onUpdateEvents(updated);
    showToast(`Duplicated event: "${duplicated.title}"`);
  };

  const handleResetEventsToDefault = () => {
    if (confirm('Reset calendar schedule back to official club fixtures?')) {
      onUpdateEvents(UPCOMING_EVENTS);
      showToast('Calendar reset to default fixtures.');
    }
  };

  // =========================================================================
  // NOTICE HANDLERS (WYSIWYG)
  // =========================================================================
  const handleSaveNotice = (savedNotice: Notice) => {
    const existingIndex = notices.findIndex((n) => n.id === savedNotice.id);
    let updated: Notice[];
    if (existingIndex >= 0) {
      updated = [...notices];
      updated[existingIndex] = savedNotice;
      showToast(`Updated notice: "${savedNotice.title}"`);
    } else {
      updated = [savedNotice, ...notices];
      showToast(`Posted notice: "${savedNotice.title}"`);
    }
    if (onUpdateNotices) {
      onUpdateNotices(updated);
    }
    setIsNoticeEditorOpen(false);
    setEditingNotice(null);
  };

  const handleDeleteNotice = (noticeId: string) => {
    const updated = notices.filter((n) => n.id !== noticeId);
    if (onUpdateNotices) {
      onUpdateNotices(updated);
    }
    showToast('Notice removed from board.');
  };

  const handleResetNotices = () => {
    if (confirm('Reset noticeboard back to default notices?')) {
      if (onUpdateNotices) {
        onUpdateNotices(NOTICES);
      }
      showToast('Notices reset to default.');
    }
  };

  // =========================================================================
  // JOURNAL HANDLERS (WYSIWYG)
  // =========================================================================
  const handleSaveArticle = (savedArticle: JournalArticle) => {
    const existingIndex = articles.findIndex((a) => a.id === savedArticle.id);
    let updated: JournalArticle[];
    if (existingIndex >= 0) {
      updated = [...articles];
      updated[existingIndex] = savedArticle;
      showToast(`Updated journal article: "${savedArticle.title}"`);
    } else {
      updated = [savedArticle, ...articles];
      showToast(`Published journal essay: "${savedArticle.title}"`);
    }
    if (onUpdateArticles) {
      onUpdateArticles(updated);
    }
    setIsJournalEditorOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteArticle = (articleId: string) => {
    const updated = articles.filter((a) => a.id !== articleId);
    if (onUpdateArticles) {
      onUpdateArticles(updated);
    }
    showToast('Article removed from journal.');
  };

  const handleResetArticles = () => {
    if (confirm('Reset journal back to default historical craft essays?')) {
      if (onUpdateArticles) {
        onUpdateArticles(JOURNAL_ARTICLES);
      }
      showToast('Journal reset to default articles.');
    }
  };

  // =========================================================================
  // CSV BATCH HANDLERS
  // =========================================================================
  const handleCsvTextChange = (text: string) => {
    setCsvText(text);
    setCsvSuccessMsg(null);
    if (!text.trim()) {
      setParsedPreviewEvents([]);
      setCsvErrors([]);
      return;
    }
    const result = parseCalendarCSV(text);
    if (result.events.length > 0) {
      setParsedPreviewEvents(result.events);
      setCsvErrors(result.errors);
    } else {
      setParsedPreviewEvents([]);
      setCsvErrors(result.errors);
    }
  };

  const handleCsvFile = (file: File) => {
    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        handleCsvTextChange(content);
      }
    };
    reader.readAsText(file);
  };

  const handleApplyCsvEvents = (replaceExisting: boolean) => {
    if (parsedPreviewEvents.length === 0) return;
    const finalEvents = replaceExisting
      ? parsedPreviewEvents
      : [...events, ...parsedPreviewEvents];
    onUpdateEvents(finalEvents);
    setCsvSuccessMsg(
      `Successfully ${replaceExisting ? 'replaced all fixtures with' : 'added'} ${
        parsedPreviewEvents.length
      } event(s)!`
    );
    setCsvText('');
    setParsedPreviewEvents([]);
    showToast('Batch CSV events imported successfully.');
  };

  const handleDownloadSampleCsv = () => {
    const csvContent = generateSampleCalendarCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'scmlc_calendar_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Events for list
  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      e.discipline.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      e.month.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      (e.matchDirector && e.matchDirector.toLowerCase().includes(eventSearchQuery.toLowerCase()));

    const matchesDiscipline =
      eventDisciplineFilter === 'ALL' ||
      e.discipline.toLowerCase().includes(eventDisciplineFilter.toLowerCase());

    return matchesSearch && matchesDiscipline;
  });

  // =========================================================================
  // IF NOT LOGGED IN: SHOW ADMIN LOGIN CARD
  // =========================================================================
  if (!isAdmin) {
    return (
      <div className="bg-[#FAF6EE] border border-[#DECBB5] rounded-sm p-6 sm:p-8 shadow-sm">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#152E20] text-[#C5A880] rounded-sm mx-auto flex items-center justify-center shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C3A16] block">
              Club Administration
            </span>
            <h3 className="text-2xl font-serif text-[#152E20]">
              Administrator Sign In
            </h3>
            <p className="text-xs text-[#554632] leading-relaxed">
              Log in to manage calendar fixtures, noticeboard bulletins, heritage essays, image uploads, and contact records with easy WYSIWYG tools.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#152E20] mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 bg-white border border-[#DECBB5] rounded-xs text-sm text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152E20] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DECBB5] rounded-xs text-sm text-[#1C1917] focus:outline-none focus:border-[#C0633C] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-xs text-[#7A6B56] hover:text-[#152E20] cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#152E20] hover:bg-[#234832] text-[#FAF6EE] rounded-xs text-xs font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <Unlock className="w-4 h-4 text-[#C5A880]" />
              <span>Sign In to Admin Portal</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // LOGGED IN ADMIN PORTAL VIEW
  // =========================================================================
  return (
    <div className="bg-[#FAF6EE] border border-[#DECBB5] rounded-sm p-6 sm:p-8 shadow-sm space-y-6" id="admin-portal-dashboard">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xs flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation & Logout Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#DECBB5]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#152E20] text-[#81D89D] rounded-xs flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-serif font-bold text-[#152E20]">
                SCMLC Admin Studio
              </h3>
              <span className="bg-[#0D4827] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                WYSIWYG Active
              </span>
            </div>
            <p className="text-xs text-[#554632]">
              Easily add and edit events, notices, posts, photos & contacts in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToCalendar && (
            <button
              onClick={onNavigateToCalendar}
              className="px-3 py-1.5 bg-white hover:bg-[#F2EADA] text-[#152E20] border border-[#DECBB5] rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#8C3A16]" />
              <span>View Public Calendar</span>
            </button>
          )}
          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xs text-xs font-semibold cursor-pointer transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#EAE2D2] border border-[#D5C2A7] rounded-xs">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-xs text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'events'
              ? 'bg-[#152E20] text-[#FAF6EE] shadow-xs'
              : 'text-[#4A3D2C] hover:bg-[#FAF6EE]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Calendar Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-xs text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'notices'
              ? 'bg-[#152E20] text-[#FAF6EE] shadow-xs'
              : 'text-[#4A3D2C] hover:bg-[#FAF6EE]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-[#C0633C]" />
          <span>Club Notices ({notices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-xs text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'journal'
              ? 'bg-[#152E20] text-[#FAF6EE] shadow-xs'
              : 'text-[#4A3D2C] hover:bg-[#FAF6EE]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#81D89D]" />
          <span>Journal & Posts ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('images')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xs text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'images'
              ? 'bg-[#152E20] text-[#FAF6EE] shadow-xs'
              : 'text-[#4A3D2C] hover:bg-[#FAF6EE]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Photo Library ({images.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xs text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'contacts'
              ? 'bg-[#152E20] text-[#FAF6EE] shadow-xs'
              : 'text-[#4A3D2C] hover:bg-[#FAF6EE]'
          }`}
        >
          <User className="w-3.5 h-3.5 text-[#81D89D]" />
          <span>Club Contacts Reference</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CALENDAR EVENTS (WYSIWYG) */}
      {/* ========================================================================= */}
      {activeTab === 'events' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Action Row */}
          <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C3A16] block">
                  Event Management
                </span>
                <h4 className="text-xl font-serif text-[#152E20]">
                  Match & Fixture Calendar
                </h4>
                <p className="text-xs text-[#554632]">
                  Add, edit, duplicate, or delete match events with live visual card previews.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setIsEventEditorOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#C0633C] hover:bg-[#A9532F] text-white rounded-xs text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Event (WYSIWYG)</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-[#DECBB5]">
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#7A6B56]" />
                <input
                  type="text"
                  value={eventSearchQuery}
                  onChange={(e) => setEventSearchQuery(e.target.value)}
                  placeholder="Search matches by title, director, or month..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={eventDisciplineFilter}
                  onChange={(e) => setEventDisciplineFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                >
                  <option value="ALL">All Disciplines ({events.length})</option>
                  <option value="Single Action">Single Action</option>
                  <option value="Pistol">Pistol events</option>
                  <option value="Rifle">Rifle events</option>
                  <option value="Shotgun">Shotgun events</option>
                  <option value="Club">The Club</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleResetEventsToDefault}
                  className="w-full px-2 py-2 bg-white hover:bg-[#FAF6EE] text-[#7A6B56] hover:text-[#152E20] border border-[#DECBB5] rounded-xs text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  title="Reset to original fixtures"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>
          </div>

          {/* Events List Cards */}
          <div className="space-y-3">
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center bg-white border border-[#DECBB5] rounded-xs text-xs text-[#7A6B56] space-y-3">
                <p>No events found matching your search.</p>
                <button
                  onClick={() => {
                    setEventSearchQuery('');
                    setEventDisciplineFilter('ALL');
                  }}
                  className="text-[#8C3A16] font-semibold underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white border border-[#DECBB5] hover:border-[#8C3A16] p-4 sm:p-5 rounded-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs group"
                >
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div
                      className={`w-14 py-2 rounded-xs text-center shrink-0 flex flex-col items-center justify-center font-serif leading-none shadow-2xs ${
                        evt.themeColor === 'rust'
                          ? 'bg-[#C0633C] text-white'
                          : evt.themeColor === 'green'
                          ? 'bg-[#152E20] text-white'
                          : 'bg-[#554632] text-[#FAF6EE]'
                      }`}
                    >
                      <span className="text-lg font-bold">{evt.day}</span>
                      <span className="text-[10px] uppercase font-sans font-semibold tracking-wider mt-0.5">
                        {evt.month}
                      </span>
                      <span className="text-[8px] font-mono opacity-80 mt-0.5">
                        {evt.year || '2026'}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C3A16]">
                          {evt.discipline}
                        </span>
                        {evt.visitorFriendly && (
                          <span className="text-[9px] bg-[#0D4827]/10 text-[#0D4827] px-1.5 py-0.2 rounded font-medium">
                            Visitors Welcome
                          </span>
                        )}
                      </div>

                      <h5 className="text-base font-serif font-bold text-[#152E20] group-hover:text-[#C0633C] transition-colors">
                        {evt.title}
                      </h5>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#554632]">
                        <span>{evt.time}</span>
                        <span>•</span>
                        <span>{evt.location}</span>
                        {evt.matchDirector && (
                          <>
                            <span>•</span>
                            <span className="italic">RO: {evt.matchDirector}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#DECBB5]">
                    <button
                      onClick={() => {
                        setEditingEvent(evt);
                        setIsEventEditorOpen(true);
                      }}
                      className="px-3 py-1.5 bg-[#152E20] hover:bg-[#234832] text-[#FAF6EE] rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      title="Edit this event in WYSIWYG form"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDuplicateEvent(evt)}
                      className="px-2.5 py-1.5 bg-[#FAF6EE] hover:bg-[#EAE2D2] text-[#554632] border border-[#DECBB5] rounded-xs text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Duplicate for another month"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplicate</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${evt.title}"?`)) {
                          handleDeleteEvent(evt.id);
                        }
                      }}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xs transition-colors cursor-pointer"
                      title="Delete event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Advanced Collapsible CSV Batch Importer */}
          <div className="bg-white rounded-sm border border-[#DECBB5] overflow-hidden">
            <button
              onClick={() => setShowCsvImporter(!showCsvImporter)}
              className="w-full p-4 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#152E20] bg-[#F2EADA] hover:bg-[#EAE0CD] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8C3A16]" />
                <span>Advanced: Bulk CSV Schedule Importer / Exporter</span>
              </div>
              {showCsvImporter ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showCsvImporter && (
              <div className="p-6 space-y-5 border-t border-[#DECBB5] animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-[#554632]">
                    Quickly batch import monthly matches from Excel or Google Sheets using CSV format.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadSampleCsv}
                    className="px-3 py-1.5 bg-[#FAF6EE] hover:bg-[#EAE2D2] text-[#8C3A16] border border-[#DECBB5] rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV Template</span>
                  </button>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingCsv(true);
                  }}
                  onDragLeave={() => setIsDraggingCsv(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingCsv(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleCsvFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => csvInputRef.current?.click()}
                  className={`p-6 border-2 border-dashed rounded-xs text-center cursor-pointer transition-all ${
                    isDraggingCsv
                      ? 'border-[#C0633C] bg-[#FFF7ED]'
                      : 'border-[#DECBB5] bg-[#FAF6EE] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <input
                    ref={csvInputRef}
                    type="file"
                    accept=".csv,text/csv"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleCsvFile(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="text-xs font-semibold text-[#152E20]">
                    Drop a .csv file here or click to browse
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={csvText}
                  onChange={(e) => handleCsvTextChange(e.target.value)}
                  placeholder="Or paste CSV rows directly here..."
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs font-mono text-xs text-[#1C1917] focus:outline-none"
                />

                {parsedPreviewEvents.length > 0 && (
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleApplyCsvEvents(false)}
                      className="px-4 py-2 bg-[#152E20] hover:bg-[#234832] text-white rounded-xs text-xs font-semibold cursor-pointer"
                    >
                      Append {parsedPreviewEvents.length} Events to Schedule
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyCsvEvents(true)}
                      className="px-4 py-2 bg-[#C0633C] hover:bg-[#A9532F] text-white rounded-xs text-xs font-semibold cursor-pointer"
                    >
                      Replace All Fixtures with CSV
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CLUB NOTICES (WYSIWYG) */}
      {/* ========================================================================= */}
      {activeTab === 'notices' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C3A16] block">
                  Noticeboard & Announcements
                </span>
                <h4 className="text-xl font-serif text-[#152E20]">
                  Official Club Bulletins & Alerts
                </h4>
                <p className="text-xs text-[#554632]">
                  Post AGM notices, range closures, maintenance work days, and committee announcements.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingNotice(null);
                    setIsNoticeEditorOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#C0633C] hover:bg-[#A9532F] text-white rounded-xs text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Post New Notice (WYSIWYG)</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetNotices}
                  className="px-3 py-2 bg-white hover:bg-[#FAF6EE] text-[#7A6B56] hover:text-[#152E20] border border-[#DECBB5] rounded-xs text-xs font-semibold cursor-pointer"
                >
                  Reset Default
                </button>
              </div>
            </div>
          </div>

          {/* Notice cards */}
          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className="bg-white border border-[#DECBB5] hover:border-[#8C3A16] p-5 rounded-xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-2xs group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#7A6B56]">
                    <span className="font-medium">{n.date}</span>
                    <span>•</span>
                    <span className="bg-[#E7DAC7] text-[#554632] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      {n.category}
                    </span>
                    {n.urgent && (
                      <span className="bg-[#C0633C] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                        Urgent Alert
                      </span>
                    )}
                  </div>

                  <h5 className="text-lg font-serif font-bold text-[#152E20] group-hover:text-[#C0633C] transition-colors">
                    {n.title}
                  </h5>

                  <p className="text-xs text-[#4E4334] leading-relaxed">
                    {n.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#DECBB5]">
                  <button
                    onClick={() => {
                      setEditingNotice(n);
                      setIsNoticeEditorOpen(true);
                    }}
                    className="px-3 py-1.5 bg-[#152E20] hover:bg-[#234832] text-[#FAF6EE] rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Edit WYSIWYG</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete notice "${n.title}"?`)) {
                        handleDeleteNotice(n.id);
                      }
                    }}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xs transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: JOURNAL & HERITAGE ESSAYS (WYSIWYG) */}
      {/* ========================================================================= */}
      {activeTab === 'journal' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C3A16] block">
                  Heritage Craft Journal
                </span>
                <h4 className="text-xl font-serif text-[#152E20]">
                  Historical Articles & Armory Guides
                </h4>
                <p className="text-xs text-[#554632]">
                  Write craft essays, gunsmithing tutorials, and black powder technical articles with image uploads.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingArticle(null);
                    setIsJournalEditorOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#C0633C] hover:bg-[#A9532F] text-white rounded-xs text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Write New Essay (WYSIWYG)</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetArticles}
                  className="px-3 py-2 bg-white hover:bg-[#FAF6EE] text-[#7A6B56] hover:text-[#152E20] border border-[#DECBB5] rounded-xs text-xs font-semibold cursor-pointer"
                >
                  Reset Default
                </button>
              </div>
            </div>
          </div>

          {/* Articles list cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-white border border-[#DECBB5] hover:border-[#8C3A16] rounded-xs overflow-hidden shadow-2xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-video w-full bg-[#EAE2D2] overflow-hidden relative">
                    <img
                      src={art.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {art.tags.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-[#152E20]/90 text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-[#7A6B56]">
                      <span>{art.author}</span> · <span>{art.date}</span>
                    </div>

                    <h5 className="text-base font-serif font-bold text-[#152E20] group-hover:text-[#C0633C] transition-colors line-clamp-2">
                      {art.title}
                    </h5>

                    <p className="text-xs text-[#4E4334] line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF6EE] border-t border-[#DECBB5] flex items-center justify-between">
                  <span className="text-[11px] text-[#7A6B56] italic">{art.readTime}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingArticle(art);
                        setIsJournalEditorOpen(true);
                      }}
                      className="px-3 py-1.5 bg-[#152E20] hover:bg-[#234832] text-white rounded-xs text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${art.title}"?`)) {
                          handleDeleteArticle(art.id);
                        }
                      }}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xs cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: IMAGE & MEDIA LIBRARY */}
      {/* ========================================================================= */}
      {activeTab === 'images' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
            <h4 className="text-lg font-serif text-[#152E20]">
              Upload Club Images & Archival Photos
            </h4>
            <p className="text-xs text-[#554632]">
              Uploaded photos can be attached to match events, journal posts, or website galleries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#152E20] mb-1">
                  Assign Category
                </label>
                <select
                  value={imageCategory}
                  onChange={(e) => setImageCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917]"
                >
                  <option value="Range Facilities">Range Facilities</option>
                  <option value="Single Action">Single Action</option>
                  <option value="Muzzle Loading Rifle">Muzzle Loading Rifle</option>
                  <option value="Shotgun & Clays">Shotgun & Clays</option>
                  <option value="Heritage Craft">Heritage Craft</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingImage(true);
                  }}
                  onDragLeave={() => setIsDraggingImage(false)}
                  onDrop={handleImageDrop}
                  onClick={() => imageInputRef.current?.click()}
                  className={`p-6 border-2 border-dashed rounded-xs text-center cursor-pointer transition-all ${
                    isDraggingImage
                      ? 'border-[#C0633C] bg-[#FFF7ED]'
                      : 'border-[#DECBB5] bg-[#FAF6EE] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        processImageFile(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#152E20]">
                    <Upload className="w-4 h-4 text-[#8C3A16]" />
                    <span>Drop image here or click to browse</span>
                  </div>
                </div>
              </div>
            </div>

            {imageUploadStatus && (
              <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xs border border-emerald-200">
                {imageUploadStatus}
              </div>
            )}
          </div>

          {/* Uploaded Images Gallery */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#8C3A16]">
              Uploaded Library ({images.length})
            </h5>
            {images.length === 0 ? (
              <div className="p-8 text-center bg-white border border-[#DECBB5] rounded-xs text-xs text-[#7A6B56]">
                No custom images uploaded yet. Drag and drop photos above to add them to the club library.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="bg-white border border-[#DECBB5] rounded-xs overflow-hidden shadow-2xs group flex flex-col justify-between"
                  >
                    <div className="aspect-square bg-[#EAE2D2] relative overflow-hidden">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600/90 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-2.5 space-y-1">
                      <div className="text-[11px] font-bold text-[#152E20] truncate">{img.name}</div>
                      <div className="text-[10px] text-[#7A6B56]">{img.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: OFFICIAL CLUB CONTACTS REFERENCE */}
      {/* ========================================================================= */}
      {activeTab === 'contacts' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C3A16] block">
                Official Directory Reference
              </span>
              <h4 className="text-xl font-serif text-[#152E20]">
                Club Address & Executive Contacts
              </h4>
              <p className="text-xs text-[#554632]">
                Official contact details displayed on footer and club screen. One-click copy for administrative correspondence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Range Address */}
              <div className="p-4 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C3A16] uppercase">
                    <MapPin className="w-4 h-4" />
                    <span>Range Physical Address</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(CLUB_CONTACTS.address.full, 'Range Address')}
                    className="text-[11px] font-semibold text-[#8C3A16] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="text-sm font-semibold text-[#152E20]">
                  {CLUB_CONTACTS.address.full}
                </div>
                <div className="text-xs text-[#7A6B56]">
                  {CLUB_CONTACTS.address.notes}
                </div>
              </div>

              {/* Postal Address */}
              <div className="p-4 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C3A16] uppercase">
                    <Mail className="w-4 h-4" />
                    <span>Postal Address (Mail To)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(CLUB_CONTACTS.mailTo.full, 'Postal Address')}
                    className="text-[11px] font-semibold text-[#8C3A16] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="text-sm font-semibold text-[#152E20]">
                  {CLUB_CONTACTS.mailTo.full}
                </div>
                <div className="text-xs text-[#7A6B56]">
                  Sydney Colonial Muzzle Loading Club official registry mail.
                </div>
              </div>

              {/* Membership Secretary */}
              <div className="p-4 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D4827] uppercase">
                    <User className="w-4 h-4" />
                    <span>{CLUB_CONTACTS.membershipSecretary.role}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(CLUB_CONTACTS.membershipSecretary.email, 'Membership Email')}
                    className="text-[11px] font-semibold text-[#8C3A16] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Email</span>
                  </button>
                </div>
                <div className="text-sm font-semibold text-[#152E20]">
                  {CLUB_CONTACTS.membershipSecretary.name} – {CLUB_CONTACTS.membershipSecretary.title}
                </div>
                <div className="text-xs text-[#C0633C] font-mono">
                  {CLUB_CONTACTS.membershipSecretary.email}
                </div>
                <div className="text-xs text-[#7A6B56]">
                  {CLUB_CONTACTS.membershipSecretary.description}
                </div>
              </div>

              {/* Club Secretary */}
              <div className="p-4 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D4827] uppercase">
                    <User className="w-4 h-4" />
                    <span>{CLUB_CONTACTS.clubSecretary.role}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(CLUB_CONTACTS.clubSecretary.email, 'Secretary Email')}
                    className="text-[11px] font-semibold text-[#8C3A16] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Email</span>
                  </button>
                </div>
                <div className="text-sm font-semibold text-[#152E20]">
                  {CLUB_CONTACTS.clubSecretary.name}
                </div>
                <div className="text-xs text-[#C0633C] font-mono">
                  {CLUB_CONTACTS.clubSecretary.email}
                </div>
                <div className="text-xs text-[#7A6B56]">
                  {CLUB_CONTACTS.clubSecretary.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WYSIWYG Modals */}
      <EventEditorModal
        isOpen={isEventEditorOpen}
        onClose={() => {
          setIsEventEditorOpen(false);
          setEditingEvent(null);
        }}
        onSaveEvent={handleSaveEvent}
        onDeleteEvent={handleDeleteEvent}
        editingEvent={editingEvent}
      />

      <NoticeEditorModal
        isOpen={isNoticeEditorOpen}
        onClose={() => {
          setIsNoticeEditorOpen(false);
          setEditingNotice(null);
        }}
        onSaveNotice={handleSaveNotice}
        onDeleteNotice={handleDeleteNotice}
        editingNotice={editingNotice}
      />

      <JournalEditorModal
        isOpen={isJournalEditorOpen}
        onClose={() => {
          setIsJournalEditorOpen(false);
          setEditingArticle(null);
        }}
        onSaveArticle={handleSaveArticle}
        onDeleteArticle={handleDeleteArticle}
        editingArticle={editingArticle}
      />
    </div>
  );
};
