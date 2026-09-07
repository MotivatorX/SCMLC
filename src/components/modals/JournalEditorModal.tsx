import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Save,
  Trash2,
  Sparkles,
  BookOpen,
  Calendar,
  User,
  Clock,
  Tag,
  AlertCircle,
  CheckCircle,
  Bold,
  Italic,
  Heading,
  List,
  Quote,
  Eye,
  Edit3,
} from 'lucide-react';
import { JournalArticle } from '../../types';
import { CLUB_IMAGES } from '../../data/clubData';

interface JournalEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveArticle: (article: JournalArticle) => void;
  onDeleteArticle?: (articleId: string) => void;
  editingArticle?: JournalArticle | null;
}

export const JournalEditorModal: React.FC<JournalEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveArticle,
  onDeleteArticle,
  editingArticle,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [excerpt, setExcerpt] = useState('');
  const [tagsRaw, setTagsRaw] = useState('Heritage, Craft, Technique');
  const [selectedImage, setSelectedImage] = useState<string>(CLUB_IMAGES.heroSmoke);
  const [contentRaw, setContentRaw] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title || '');
      setSubtitle(editingArticle.subtitle || '');
      setAuthor(editingArticle.author || '');
      setDate(editingArticle.date || '');
      setReadTime(editingArticle.readTime || '5 min read');
      setExcerpt(editingArticle.excerpt || '');
      setTagsRaw(editingArticle.tags ? editingArticle.tags.join(', ') : 'Heritage');
      setSelectedImage(editingArticle.image || CLUB_IMAGES.heroSmoke);
      setContentRaw(editingArticle.content ? editingArticle.content.join('\n\n') : '');
      setUploadPreview(null);
    } else {
      const now = new Date();
      setTitle('');
      setSubtitle('');
      setAuthor('Club Historian & Armourer');
      setDate(
        now.toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      );
      setReadTime('6 min read');
      setExcerpt('');
      setTagsRaw('Heritage, Ballistics, Workshop');
      setSelectedImage(CLUB_IMAGES.historicShooters);
      setContentRaw('');
      setUploadPreview(null);
    }
    setStatusMsg(null);
    setActiveTab('edit');
  }, [editingArticle, isOpen]);

  if (!isOpen) return null;

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMsg({ type: 'error', text: 'Please select a valid image file (PNG, JPG, WebP).' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setSelectedImage(result);
        setUploadPreview(result);
        setStatusMsg({ type: 'success', text: `Image "${file.name}" loaded successfully!` });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleInsertBodyText = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('journal-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = contentRaw.substring(start, end);
    const replacement = prefix + (selected || 'text') + suffix;
    const newText = contentRaw.substring(0, start) + replacement + contentRaw.substring(end);
    setContentRaw(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setStatusMsg({ type: 'error', text: 'Article title is required.' });
      return;
    }

    if (!contentRaw.trim()) {
      setStatusMsg({ type: 'error', text: 'Article content text is required.' });
      return;
    }

    const paragraphs = contentRaw
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const articleToSave: JournalArticle = {
      id: editingArticle?.id || `journal-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      author: author.trim() || 'SCMLC Member',
      date: date.trim() || 'August 2026',
      readTime: readTime.trim() || '5 min read',
      excerpt: excerpt.trim() || paragraphs[0]?.slice(0, 160) + '...',
      tags: tags.length > 0 ? tags : ['Heritage'],
      image: selectedImage,
      content: paragraphs.length > 0 ? paragraphs : [contentRaw],
    };

    onSaveArticle(articleToSave);
    onClose();
  };

  const presetImages = [
    { label: 'Historic Shooters & Sackville Camp', url: CLUB_IMAGES.historicShooters },
    { label: 'Black Powder Rifle Range Smoke', url: CLUB_IMAGES.heroSmoke },
    { label: 'Antique Flintlock Lock Detail', url: CLUB_IMAGES.antiqueFlintlock },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#152E20]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-[#FAF6EE] text-[#1C1917] border border-[#D5C2A7] rounded-sm shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#152E20] text-[#F7F4EE] px-6 py-4 border-b border-[#264D35] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#C5A880]" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block">
                WYSIWYG Journal & Heritage Editor
              </span>
              <h2 className="text-lg font-serif font-semibold text-[#F7F4EE]">
                {editingArticle ? 'Edit Heritage Essay / Journal Post' : 'Post New Heritage Craft Essay'}
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
                <span>Live Article Preview</span>
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

        {/* Status alert */}
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {activeTab === 'edit' ? (
            <form onSubmit={handleSubmit} className="space-y-6" id="journal-editor-form">
              {/* Section 1: Title & Subtitle */}
              <div className="space-y-4 bg-white p-5 rounded-sm border border-[#DECBB5]">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                  1. Article Header & Metadata
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#152E20] mb-1">
                    Article Title <span className="text-[#C0633C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., The Physics of Patch Lubrication & Swaged Soft Lead"
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-sm text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#152E20] mb-1">
                    Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g., Why tallow and beeswax formulations maintain breech velocity over 50 rounds"
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-sm text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g., Robert 'Jack' MacIntyre (Club Armourer)"
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Publication Date
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g., 28 August 2026"
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8C3A16]" />
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g., 6 min read"
                      className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Image Upload & Visual Asset */}
              <div className="space-y-4 bg-white p-5 rounded-sm border border-[#DECBB5]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#8C3A16]" />
                    2. Featured Article Image & Photo Upload
                  </h3>
                  <span className="text-[11px] text-[#7A6B56]">Accepts drag & drop or local files</span>
                </div>

                {/* Dropzone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 border-2 border-dashed rounded-xs text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#C0633C] bg-[#FFF7ED]'
                      : 'border-[#DECBB5] bg-[#FAF6EE] hover:bg-[#F3ECE0] hover:border-[#8C3A16]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleImageFile(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 bg-[#152E20] text-[#C5A880] rounded-full flex items-center justify-center shadow-xs">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-semibold text-[#152E20]">
                      Click to upload an image from your computer, or drag & drop here
                    </div>
                    <p className="text-[11px] text-[#7A6B56]">
                      Supports JPG, PNG, WebP format. Images are saved locally for this post.
                    </p>
                  </div>
                </div>

                {/* Current Image Preview & Preset Select */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2">
                  <div className="sm:col-span-4">
                    <span className="text-[11px] font-semibold text-[#7A6B56] block mb-1">
                      Active Image Preview:
                    </span>
                    <div className="aspect-video w-full rounded-xs overflow-hidden border border-[#DECBB5] bg-[#EAE2D2] relative">
                      <img
                        src={selectedImage}
                        alt="Article preview"
                        className="w-full h-full object-cover"
                      />
                      {uploadPreview && (
                        <span className="absolute bottom-1 right-1 bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Uploaded Custom File
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-8 space-y-2">
                    <span className="text-[11px] font-semibold text-[#7A6B56] block">
                      Or Choose from SCMLC Heritage Photo Library:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {presetImages.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedImage(preset.url);
                            setUploadPreview(null);
                          }}
                          className={`p-1.5 text-left rounded border transition-all cursor-pointer flex items-center gap-2 ${
                            selectedImage === preset.url
                              ? 'border-[#C0633C] bg-[#FFF7ED] ring-1 ring-[#C0633C]'
                              : 'border-[#DECBB5] bg-[#FAF6EE] hover:bg-[#F3ECE0]'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt=""
                            className="w-8 h-8 object-cover rounded shrink-0"
                          />
                          <span className="text-[10px] text-[#332B20] font-medium truncate">
                            {preset.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Excerpt & Tags */}
              <div className="space-y-4 bg-white p-5 rounded-sm border border-[#DECBB5]">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                  3. Excerpt & Heritage Tags
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#152E20] mb-1">
                    Summary / Excerpt (displayed in journal index cards)
                  </label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Short 2-3 sentence overview introducing the craft piece..."
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#152E20] mb-1 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#8C3A16]" />
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsRaw}
                    onChange={(e) => setTagsRaw(e.target.value)}
                    placeholder="e.g., Heritage, Ballistics, Workshop, Lubrication"
                    className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
                  />
                </div>
              </div>

              {/* Section 4: Full Article Body Text with WYSIWYG Toolbar */}
              <div className="space-y-3 bg-white p-5 rounded-sm border border-[#DECBB5]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C3A16]">
                    4. Article Body & Paragraphs <span className="text-[#C0633C]">*</span>
                  </h3>
                  <span className="text-[11px] text-[#7A6B56]">WYSIWYG format tools</span>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-xs">
                  <span className="text-[10px] font-bold uppercase text-[#7A6B56] mr-1">Quick Tools:</span>
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
                    onClick={() => handleInsertBodyText('\n\n### Historical Context: ')}
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] flex items-center gap-1 cursor-pointer"
                  >
                    <Heading className="w-3 h-3 text-[#8C3A16]" />
                    <span>Heading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertBodyText('\n\n• Technical Note: ')}
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] flex items-center gap-1 cursor-pointer"
                  >
                    <List className="w-3 h-3 text-[#8C3A16]" />
                    <span>Bullet Note</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertBodyText('\n\n> "In colonial marksmanship, consistency of powder weight is everything."\n')}
                    className="p-1.5 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-xs text-[#152E20] cursor-pointer"
                    title="Quote"
                  >
                    <Quote className="w-3 h-3 text-[#8C3A16]" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertBodyText(
                        '\n\n----------------------------------------\n'
                      )
                    }
                    className="px-2 py-1 bg-white hover:bg-[#F2EADA] border border-[#DECBB5] rounded text-[11px] font-semibold text-[#152E20] cursor-pointer ml-auto"
                  >
                    + Section Divider
                  </button>
                </div>

                <textarea
                  id="journal-content-textarea"
                  required
                  rows={9}
                  value={contentRaw}
                  onChange={(e) => setContentRaw(e.target.value)}
                  placeholder="Write the full craft essay or technical guide here. Separate each paragraph with an empty line (double Enter)..."
                  className="w-full px-3.5 py-3 bg-[#FAF6EE] border border-[#DECBB5] rounded-xs text-sm text-[#1C1917] focus:outline-none focus:border-[#C0633C] leading-relaxed font-serif"
                />
              </div>
            </form>
          ) : (
            /* Live Article Reader Simulation */
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 bg-[#152E20] text-[#F7F4EE] rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block">
                    Live Journal Preview
                  </span>
                  <h3 className="text-base font-serif font-medium">
                    How members and visitors read this article
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className="px-3 py-1.5 bg-[#C0633C] text-white rounded-xs text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Return to Form
                </button>
              </div>

              {/* Formatted Article View */}
              <div className="bg-white border border-[#DECBB5] rounded-xs shadow-md overflow-hidden">
                <div className="aspect-video sm:aspect-21/9 w-full overflow-hidden bg-[#EAE2D2] relative">
                  <img
                    src={selectedImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <div className="flex gap-2">
                        {tagsRaw.split(',').map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-[#C0633C] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-xs"
                          >
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif text-white">
                        {title || 'Article Title'}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#7A6B56] border-b border-[#DECBB5] pb-4 gap-2">
                    <div>
                      <span className="font-semibold text-[#152E20]">{author || 'SCMLC Member'}</span> ·{' '}
                      <span>{date || 'Today'}</span>
                    </div>
                    <span className="italic">{readTime || '5 min read'}</span>
                  </div>

                  {subtitle && (
                    <p className="text-base sm:text-lg font-serif italic text-[#8C3A16] border-l-2 border-[#8C3A16] pl-4">
                      {subtitle}
                    </p>
                  )}

                  <div className="space-y-4 text-sm text-[#383126] font-serif leading-relaxed">
                    {contentRaw
                      .split('\n\n')
                      .filter((p) => p.trim().length > 0)
                      .map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    {contentRaw.trim().length === 0 && (
                      <p className="text-[#7A6B56] italic">Article paragraphs will appear here...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Controls Footer */}
        <div className="bg-[#FAF6EE] px-6 py-4 border-t border-[#DECBB5] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div>
            {editingArticle && onDeleteArticle && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${editingArticle.title}"?`)) {
                    onDeleteArticle(editingArticle.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Article</span>
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
              <span>{editingArticle ? 'Save Changes' : 'Publish Article'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
