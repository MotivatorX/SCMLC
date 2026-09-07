import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Check, Shield, Share2, Copy, CheckCircle2 } from 'lucide-react';
import { ClubEvent } from '../../types';

interface EventDetailModalProps {
  event: ClubEvent | null;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onOpenRegister,
}) => {
  const [rsvpd, setRsvpd] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const eventShareUrl = `${window.location.origin}${window.location.pathname}#event=${event.id}`;

  const handleShare = async () => {
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(eventShareUrl);
        success = true;
      }
    } catch (err) {
      console.warn('Clipboard API write failed, attempting fallback', err);
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = eventShareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
    }

    // Update browser URL hash cleanly without page jump
    try {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}#event=${event.id}`
      );
    } catch {
      // ignore
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FAF6EE] text-[#1C1917] rounded-sm shadow-2xl border border-[#D5C2A7] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div
          className={`px-6 py-5 flex items-center justify-between text-white ${
            event.themeColor === 'rust'
              ? 'bg-[#C0633C]'
              : event.themeColor === 'green'
              ? 'bg-[#152E20]'
              : 'bg-[#534127]'
          }`}
        >
          <div>
            <span className="text-[10px] tracking-[0.2em] font-semibold uppercase opacity-90 block mb-1">
              SCMLC Match Calendar · {event.day} {event.month} {event.year || new Date().getFullYear()}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-normal capitalize">
              {event.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Header Share Button */}
            <button
              id="event-detail-header-share-btn"
              onClick={handleShare}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white px-2.5 py-1.5 rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              title="Share event link"
              aria-label="Share event link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#81D89D]" />
                  <span className="text-[11px] text-[#81D89D]">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              id="event-detail-close-btn"
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#F2EADA] p-4 rounded-xs border border-[#DECBB5] text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C3A16] shrink-0" />
              <div>
                <div className="text-[10px] uppercase text-[#73634E] font-medium">Date</div>
                <div className="font-semibold text-[#152E20]">{event.day} {event.month} {event.year || new Date().getFullYear()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8C3A16] shrink-0" />
              <div>
                <div className="text-[10px] uppercase text-[#73634E] font-medium">Commences</div>
                <div className="font-semibold text-[#152E20]">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <MapPin className="w-4 h-4 text-[#8C3A16] shrink-0" />
              <div>
                <div className="text-[10px] uppercase text-[#73634E] font-medium">Location</div>
                <div className="font-semibold text-[#152E20]">{event.location}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8C3A16]">
                Match Overview
              </h4>
              <div className="flex items-center gap-2">
                {event.trophies && (
                  <span className="inline-flex items-center gap-1 bg-[#F4E8D6] text-[#7A4B1A] border border-[#DFC4A0] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                    🏆 {event.trophies}
                  </span>
                )}
                {event.lunchIncluded && (
                  <span className="inline-flex items-center gap-1 bg-[#E2ECE3] text-[#1E562F] border border-[#BFD9C3] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                    🥪 Lunch Included
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-[#3E3528] leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Match Program Stages Breakdown if available */}
          {event.program && event.program.length > 0 && (
            <div className="bg-[#FAF3E8] border border-[#DECBB5] rounded-xs p-4">
              <div className="flex items-center justify-between mb-3 border-b border-[#DECBB5]/70 pb-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#152E20]">
                  Program Stages & Targets
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#8C3A16] tracking-wider">
                  S.C.M.L.C. Official Schedule
                </span>
              </div>
              <div className="divide-y divide-[#DECBB5]/50 text-xs">
                {event.program.map((stage, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#152E20] text-[#FAF6EE] text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-[#1C1917]">{stage.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[#65543F] font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#DECBB5]">
                        {stage.targets}
                      </span>
                      {stage.type && (
                        <span
                          className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            stage.type.toLowerCase().includes('non')
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {stage.type}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule & Rules Breakdown */}
          <div className="space-y-3 border-t border-[#DECBB5] pt-4 text-xs text-[#4A4032]">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#C0633C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#152E20]">Gates & Range Setup:</strong> {event.rangesOpen}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-[#C0633C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#152E20]">Match Director:</strong> {event.matchDirector}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-[#C0633C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#152E20]">Safety Notice:</strong> {event.safetyBriefing}
              </div>
            </div>
            <div>
              <strong className="text-[#152E20]">Fees:</strong> {event.fees}
            </div>
          </div>

          {/* Copied Notification Banner */}
          {copied && (
            <div
              id="event-share-copied-banner"
              className="bg-[#152E20] text-[#FAF6EE] p-3 rounded-xs border border-[#234832] flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#81D89D] shrink-0" />
                <span className="font-medium">
                  Link copied to clipboard!
                </span>
                <span className="text-[#A2BA9D] hidden sm:inline text-[11px] truncate max-w-xs font-mono">
                  ({eventShareUrl})
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#81D89D] tracking-wider shrink-0">
                Ready to Paste
              </span>
            </div>
          )}

          {/* Action row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-4 border-t border-[#DECBB5]">
            {/* Primary Share Button */}
            <button
              id="event-detail-share-btn"
              onClick={handleShare}
              className={`px-4 py-2.5 rounded-xs text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
                copied
                  ? 'bg-[#152E20] text-[#81D89D] border border-[#234832]'
                  : 'bg-[#EAE2D2] hover:bg-[#E0D5C3] text-[#423626] border border-[#DECBB5]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#81D89D]" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#8C3A16]" />
                  <span>Share Event</span>
                </>
              )}
            </button>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 grow justify-end">
              <button
                id="event-rsvp-btn"
                onClick={() => setRsvpd(!rsvpd)}
                className={`px-4 py-2.5 rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  rsvpd
                    ? 'bg-[#152E20] text-white'
                    : 'bg-white border border-[#C0633C] text-[#8C3A16] hover:bg-[#FAF4EE]'
                }`}
              >
                {rsvpd ? (
                  <>
                    <Check className="w-4 h-4 text-[#C0633C]" />
                    <span>Attending</span>
                  </>
                ) : (
                  <span>RSVP</span>
                )}
              </button>

              <button
                id="event-visitor-register-btn"
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
                className="bg-[#C0633C] hover:bg-[#A9532F] text-white px-4 py-2.5 rounded-xs text-xs font-semibold tracking-[0.12em] uppercase transition-all cursor-pointer whitespace-nowrap text-center"
              >
                Register as Visitor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
