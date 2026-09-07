import React from 'react';
import { X, AlertTriangle, Calendar, FileText, MapPin } from 'lucide-react';
import { Notice } from '../../types';

interface NoticeDetailModalProps {
  notice: Notice | null;
  onClose: () => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({ notice, onClose }) => {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] text-[#1C1917] rounded-sm shadow-2xl border border-[#D5C2A7] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Banner */}
        <div className="bg-[#EEDBBD] border-b border-[#DECBB5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C3A16]">
            <AlertTriangle className="w-4 h-4 text-[#A84A22]" />
            <span>OFFICIAL NOTICEBOARD ANNOUNCEMENT</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#645139] hover:text-black p-1 rounded-full transition-colors cursor-pointer"
            aria-label="Close notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-4 text-xs text-[#7A6B56] mb-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {notice.date}
              </span>
              <span className="bg-[#E7DAC7] px-2 py-0.5 rounded text-[10px] uppercase font-bold text-[#554632]">
                Category: {notice.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#152E20] leading-snug">
              {notice.title}
            </h3>
          </div>

          <div className="border-t border-[#DECBB5] pt-4 whitespace-pre-line text-sm text-[#3C3428] leading-relaxed font-sans">
            {notice.body}
          </div>

          <div className="bg-[#F2EADA] p-4 rounded-xs border border-[#DECBB5] flex items-center justify-between text-xs text-[#524636]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C3A16]" />
              <span>Sackville Range Clubhouse, Hawkesbury NSW</span>
            </div>
            <div className="flex items-center gap-2 text-[#776650]">
              <FileText className="w-4 h-4" />
              <span>Reference: SCMLC-AGM-27</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="bg-[#152E20] hover:bg-[#0D2016] text-[#F7F4EE] px-6 py-2.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Close Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
