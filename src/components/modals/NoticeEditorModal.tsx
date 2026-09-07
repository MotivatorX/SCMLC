import React, { useState, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  Calendar,
  Tag,
  Save,
  Trash2,
  Bold,
  Italic,
  List,
  Heading,
  Quote,
  Eye,
  Edit3,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Notice } from '../../types';

interface NoticeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNotice: (notice: Notice) => void;
  onDeleteNotice?: (noticeId: string) => void;
  editingNotice?: Notice | null;
}

const CATEGORIES = ['AGM', 'Range', 'Safety', 'Notice', 'Event', 'Compliance'];

export const NoticeEditorModal: React.FC<NoticeEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveNotice,
  onDeleteNotice,
  editingNotice,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<'AGM' | 'Range' | 'Safety' | 'Notice'>('Notice');
  const [urgent, setUrgent] = useState(false);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    if (editingNotice) {
      setTitle(editingNotice.title || '');
      setDate(editingNotice.date || '');
      setCategory((editingNotice.category as any) || 'Notice');
      setUrgent(editingNotice.urgent || false);
      setSummary(editingNotice.summary || '');
      setBody(editingNotice.body || '');
    } else {
      const now = new Date();
      const formattedDate = `${now.getDate()}th ${now.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}`;
      setTitle('');
      setDate(formattedDate);
      setCategory('Notice');
      setUrgent(false);
      setSummary('');
      setBody('');
    }
    setStatusMsg(null);
    setActiveTab('edit');
  }, [editingNotice, isOpen]);

  if (!isOpen) return null;

  const handleInsertBodyText = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('notice-body-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = body.substring(start, end);
    const replacement = prefix + (selected || 'text') + suffix;
    const newText = body.substring(0, start) + replacement + body.substring(end);
    setBody(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMsg({ type: 'error', text: 'Notice title is required.' });
      return;
    }
    if (!body.trim()) {
      setStatusMsg({ type: 'error', text: 'Notice details/body is required.' });
      return;
    }

    const noticeToSave: Notice = {
      id: editingNotice?.id || `notice-${Date.now()}`,
      title: title.trim(),
      date: date.trim() || 'August 2026',
      category,
      urgent,
      summary: summary.trim() || body.trim().slice(0, 140) + '...',
      body: body.trim(),
    };

    onSaveNotice(noticeToSave);
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
            <AlertTriangle className="w-6 h-6 text-[#C0633C]" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block">
                WYSIWYG Noticeboard Publisher
              </span>
              <h2 className="text-lg font-serif font-semibold text-[#F7F4EE]">
                {editingNotice ? 'Edit Club Notice' : 'Post New Notice to Board'}
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

        {/* Modal Form Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {activeTab === 'edit' ? (
            <form onSubmit={handleSubmit} className="space-y-6" id="notice-editor-form">
              {/* Header Info */}
              <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                  1. Notice Header & Category
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#152E20] mb-1">
                    Notice Headline <span className="text-[#C0633C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., 2027 AGM: Sunday 11th July 2027 @ 9:30am"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-sm font-medium text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Date Display
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g., 11th July 2027"
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs mt-auto">
                    <div>
                      <div className="text-xs font-bold text-[#152E20]">Urgent Banner Alert</div>
                      <div className="text-[10px] text-[#7A6B56]">Show in top alert banner</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={urgent}
                      onChange={(e) => setUrgent(e.target.checked)}
                      className="w-4 h-4 text-[#C0633C] accent-[#C0633C] rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#152E20] mb-1">
                    Summary / Teaser
                  </label>
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Short 1-sentence overview displayed on the notice card..."
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                  />
                </div>
              </div>

              {/* WYSIWYG Body */}
              <div className="bg-white p-5 rounded-sm border border-[#DECBB5] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                    2. Full Notice Announcement Body <span className="text-[#C0633C]">*</span>
                  </h3>
                  <span className="text-[11px] text-[#7A6B56]">WYSIWYG Markdown formatting supported</span>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs">
                  <button
                    type="button"
                    onClick={() => handleInsertBodyText('**', '**')}
                    className="p-1.5 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-xs font-bold text-[#152E20] cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertBodyText('*', '*')}
                    className="p-1.5 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-xs italic text-[#152E20] cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertBodyText('\n\n### ')}
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] flex items-center gap-1 cursor-pointer"
                  >
                    <Heading className="w-3 h-3 text-[#8C3A16]" />
                    <span>Heading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertBodyText('\n1. ')}
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] flex items-center gap-1 cursor-pointer"
                  >
                    <List className="w-3 h-3 text-[#8C3A16]" />
                    <span>1. List</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertBodyText('\n• ')}
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] flex items-center gap-1 cursor-pointer"
                  >
                    <List className="w-3 h-3 text-[#8C3A16]" />
                    <span>• Bullet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertBodyText('\n> ')}
                    className="p-1.5 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-xs text-[#152E20] cursor-pointer"
                    title="Quote"
                  >
                    <Quote className="w-3 h-3 text-[#8C3A16]" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertBodyText(
                        '\n\nNotice is hereby given to all members that...'
                      )
                    }
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] cursor-pointer ml-auto"
                  >
                    + Official Formal Template
                  </button>
                </div>

                <textarea
                  id="notice-body-textarea"
                  required
                  rows={8}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter the full text, agenda items, safety notes, or event details for this club notice..."
                  className="w-full px-3.5 py-3 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C] leading-relaxed font-sans"
                />
              </div>
            </form>
          ) : (
            /* Preview Mode */
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 bg-[#152E20] text-[#F7F4EE] rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block">
                    Live Notice Card Simulation
                  </span>
                  <h3 className="text-base font-serif font-medium">
                    How members see this noticeboard post
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

              {/* Card Preview */}
              <div className="bg-white border border-[#DECBB5] p-6 rounded-xs shadow-md space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7A6B56] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8C3A16]" />
                    {date || 'Today'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {urgent && (
                      <span className="bg-[#C0633C] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                        Urgent
                      </span>
                    )}
                    <span className="bg-[#E7DAC7] text-[#554632] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      {category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#152E20]">
                  {title || 'Notice Title'}
                </h3>

                <p className="text-xs sm:text-sm text-[#4E4334] font-medium">
                  {summary || 'Summary teaser will display here...'}
                </p>

                <div className="pt-3 border-t border-[#DECBB5]/60 text-xs text-[#383126] whitespace-pre-line leading-relaxed">
                  {body || 'Full notice text will be rendered here...'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Controls Footer */}
        <div className="bg-[#FAF6EE] px-6 py-4 border-t border-[#DECBB5] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div>
            {editingNotice && onDeleteNotice && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete notice "${editingNotice.title}"?`)) {
                    onDeleteNotice(editingNotice.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Notice</span>
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
              <span>{editingNotice ? 'Save Notice' : 'Publish Notice'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
