import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { Notice } from '../types';

interface NoticeboardBannerProps {
  onOpenNotice: (notice?: Notice) => void;
  activeNotice?: Notice | null;
}

export const NoticeboardBanner: React.FC<NoticeboardBannerProps> = ({
  onOpenNotice,
  activeNotice,
}) => {
  const displayTitle = activeNotice
    ? `${activeNotice.title}${activeNotice.date ? ` (${activeNotice.date})` : ''}`
    : '2027 AGM: Sunday 11th July 2027 @ 9:30am';

  return (
    <div
      onClick={() => onOpenNotice(activeNotice || undefined)}
      id="noticeboard-banner-bar"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenNotice(activeNotice || undefined);
        }
      }}
      className="w-full bg-[#EEDBBD] hover:bg-[#E8D4B4] border-y border-[#D6BF9E] py-3.5 px-4 sm:px-6 cursor-pointer transition-colors duration-150 group"
      aria-label="View noticeboard bulletin details"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs sm:text-[13px] md:text-[14px] text-[#4A3821] font-medium tracking-wide">
          <AlertTriangle className="w-4 h-4 text-[#A84A22] shrink-0" />
          <span className="font-semibold uppercase tracking-[0.08em] text-[#8C3A16]">
            ON THE NOTICEBOARD:
          </span>
          <span className="text-[#362714] font-medium line-clamp-1">
            {displayTitle}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-[#8C3A16] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform shrink-0">
          <span>Read notice</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
