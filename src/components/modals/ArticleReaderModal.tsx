import React from 'react';
import { X, Clock, User, Tag, Share2, ExternalLink, BookOpen, Check } from 'lucide-react';
import { JournalArticle } from '../../types';

interface ArticleReaderModalProps {
  article: JournalArticle | null;
  onClose: () => void;
  onNavigateToJournal?: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onNavigateToJournal,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const handleShare = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  const isChampionship = article.id.includes('66th') || article.title.includes('66th');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF6EE] text-[#1C1917] rounded-sm border border-[#D5C2A7] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tags on Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {article.tags.map((t, i) => (
                <span
                  key={i}
                  className="bg-[#152E20]/90 text-[#D8E4D5] text-[10px] uppercase font-mono px-2.5 py-0.5 rounded backdrop-blur-xs border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white leading-snug">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DECBB5] text-xs text-[#5C503F]">
            <div className="flex items-center gap-4">
              <span className="font-medium text-[#8C3A16] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {article.author}
              </span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C3A16] hover:text-[#C0633C] cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>

          {/* Subtitle / Excerpt */}
          {article.subtitle && (
            <p className="text-base sm:text-lg font-serif italic text-[#4E4436] leading-relaxed">
              &ldquo;{article.subtitle}&rdquo;
            </p>
          )}

          {/* TryBooking Special Banner if Championship */}
          {isChampionship && (
            <div className="bg-[#152E20] text-[#F7F4EE] p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#234832]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C0633C] font-semibold block">
                  Official Event Portal · TryBooking #1591800
                </span>
                <h4 className="text-base font-serif font-medium mt-0.5">
                  66th Australian Muzzle Loading Championships
                </h4>
                <p className="text-xs text-[#D8E4D5] font-light mt-1">
                  Hosted by SCMLC · Promoted by NSW Muzzle Loading Association
                </p>
              </div>
              <a
                href="https://www.trybooking.com/events/landing/1591800"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 bg-[#C0633C] hover:bg-[#A9532F] text-white px-4 py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <span>TryBooking Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Body Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-[#383126] font-light leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Bottom Controls */}
          <div className="pt-6 border-t border-[#DECBB5] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#FAF6EE] hover:bg-[#F2EADA] text-[#152E20] border border-[#D5C2A7] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Story
            </button>

            {onNavigateToJournal && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToJournal();
                }}
                className="inline-flex items-center gap-2 bg-[#152E20] hover:bg-[#234832] text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore All Journal Articles</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
