import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Lock,
  ExternalLink,
  Info,
  CheckCircle2,
  Building,
  Target,
  Users,
  Cloud,
  ListFilter,
  Clock,
  KeyRound,
  MailCheck,
  AlertOctagon,
} from 'lucide-react';
import { PRIVACY_COLLECTION_NOTICE_ITEMS, PrivacyNoticeItem } from '../../data/privacyNoticeData';

interface PrivacyNoticeBlockProps {
  onOpenFullNotice?: () => void;
  defaultExpanded?: boolean;
  compact?: boolean;
}

export const PrivacyNoticeBlock: React.FC<PrivacyNoticeBlockProps> = ({
  onOpenFullNotice,
  defaultExpanded = false,
  compact = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const getIconForItem = (id: string) => {
    switch (id) {
      case 'identity':
        return <Building className="w-4 h-4 text-[#C0633C]" />;
      case 'purpose':
        return <Target className="w-4 h-4 text-[#C0633C]" />;
      case 'access':
        return <Users className="w-4 h-4 text-[#C0633C]" />;
      case 'jotform':
        return <Cloud className="w-4 h-4 text-[#C0633C]" />;
      case 'voluntary':
        return <ListFilter className="w-4 h-4 text-[#C0633C]" />;
      case 'retention':
        return <Clock className="w-4 h-4 text-[#C0633C]" />;
      case 'rights':
        return <KeyRound className="w-4 h-4 text-[#C0633C]" />;
      case 'marketing':
        return <MailCheck className="w-4 h-4 text-[#C0633C]" />;
      case 'complaints':
        return <AlertOctagon className="w-4 h-4 text-[#C0633C]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#C0633C]" />;
    }
  };

  return (
    <div
      id="privacy-collection-notice-block"
      className="bg-[#F4EDE0] border border-[#D5C2A7] rounded-sm p-4 sm:p-5 text-left transition-all"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DFCDB7]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xs bg-[#152E20] text-[#81D89D] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-serif font-bold text-[#152E20] uppercase tracking-wider">
                Privacy Collection Notice
              </h4>
              <span className="bg-[#152E20]/10 text-[#152E20] text-[9px] font-mono px-1.5 py-0.5 rounded-xs font-semibold uppercase">
                Privacy Act 1988 (Cth)
              </span>
            </div>
            <p className="text-[11px] text-[#615341] mt-0.5 font-light">
              How SCMLC collects, stores, and protects your information before form submission.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onOpenFullNotice && (
            <button
              type="button"
              onClick={onOpenFullNotice}
              className="text-[11px] text-[#8C3A16] hover:text-[#C0633C] font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Notice & Rights</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-1 bg-white hover:bg-[#FAF6EE] text-[#152E20] border border-[#D5C2A7] rounded-xs text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>{isExpanded ? 'Hide Details' : 'Read 9 Notice Items'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Brief Summary (Always visible) */}
      <div className="mt-3 text-[11px] text-[#4A3F31] leading-relaxed">
        <p>
          <strong className="font-semibold text-[#152E20]">The Sydney Colonial Muzzle Loading Club Inc. (SCMLC)</strong>{' '}
          collects your details solely for range safety, shoot day bookings, statutory NSW Police Form P650 declarations, and membership administration. Data is processed securely via Jotform / revolutioniseSPORT cloud services and is never sold to third parties.
        </p>
      </div>

      {/* Expanded Interactive Q&A Checklist for all 9 Notice Items */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-[#DFCDB7] space-y-2.5 animate-in fade-in duration-200">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8C3A16] mb-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Plain-Language Statutory Disclosures (9 Questions Answered):</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {PRIVACY_COLLECTION_NOTICE_ITEMS.map((item, idx) => {
              const isOpen = activeItem === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-xs transition-colors overflow-hidden ${
                    isOpen ? 'border-[#C0633C] shadow-xs' : 'border-[#E0D2BE] hover:border-[#C5A880]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveItem(isOpen ? null : item.id)}
                    className="w-full px-3 py-2.5 flex items-center justify-between text-left gap-2 cursor-pointer bg-white"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-[#FAF6EE] border border-[#D5C2A7] text-[#152E20] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#152E20]">
                            {item.item}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] bg-[#EFE7D8] text-[#705E49] px-1.5 py-0.2 rounded-xs font-mono uppercase">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#615341] truncate font-light">
                          {item.question}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-[#8C3A16]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-3 pt-1 border-t border-[#F0E4D3] bg-[#FAF8F3] text-xs text-[#3E3528] space-y-2">
                      <p className="leading-relaxed font-normal text-[#2A231A]">
                        {item.plainLanguageAnswer}
                      </p>
                      <ul className="space-y-1 pl-4 list-disc text-[11px] text-[#554A3A]">
                        {item.details.map((bullet, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-[#736350] border-t border-[#DFCDB7]/60">
            <div>
              Registered under NSW Associations Incorporation Act 2009 (Y0181644) · Privacy Act 1988 (Cth)
            </div>
            <div>
              Contact Privacy Officer:{' '}
              <a
                href="mailto:scmlc.secretary@gmail.com"
                className="font-mono text-[#8C3A16] hover:underline"
              >
                scmlc.secretary@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
