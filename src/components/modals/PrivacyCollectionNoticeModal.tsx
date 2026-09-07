import React, { useState, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  Building,
  Target,
  Users,
  Cloud,
  ListFilter,
  Clock,
  KeyRound,
  MailCheck,
  AlertOctagon,
  Download,
  Printer,
  Search,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { PRIVACY_COLLECTION_NOTICE_ITEMS } from '../../data/privacyNoticeData';
import { OFFICIAL_DOCUMENTS } from '../../data/officialDocuments';
import { generateOfficialDocumentPDF } from '../../utils/pdfGenerator';
import { CLUB_CONTACTS } from '../../data/clubData';

interface PrivacyCollectionNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyCollectionNoticeModal: React.FC<PrivacyCollectionNoticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'table' | 'contacts'>('all');
  const [isExporting, setIsExporting] = useState(false);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return PRIVACY_COLLECTION_NOTICE_ITEMS;
    const q = searchQuery.toLowerCase();
    return PRIVACY_COLLECTION_NOTICE_ITEMS.filter(
      item =>
        item.item.toLowerCase().includes(q) ||
        item.question.toLowerCase().includes(q) ||
        item.plainLanguageAnswer.toLowerCase().includes(q) ||
        item.details.some(d => d.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleDownloadPDF = () => {
    setIsExporting(true);
    try {
      const doc = OFFICIAL_DOCUMENTS.find(d => d.id === 'privacy-collection-notice');
      if (doc) {
        generateOfficialDocumentPDF(doc);
      }
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setTimeout(() => setIsExporting(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      id="privacy-collection-notice-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF6EE] text-[#1C1917] rounded-sm shadow-2xl border border-[#D5C2A7] overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#152E20] text-[#F7F4EE] px-6 py-5 flex items-center justify-between border-b border-[#234530] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#0E2016] border border-[#234530] text-[#81D89D] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-[#C5A880] block">
                Statutory Privacy Disclosure · Privacy Act 1988 (Cth)
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-normal">
                Privacy Collection Notice
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E2016] hover:bg-[#234530] text-[#F7F4EE] border border-[#264D35] rounded-xs text-xs font-medium cursor-pointer transition-colors"
              title="Download formal Privacy Notice as PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-[#EAE2D2]/70 hover:text-white p-1.5 rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Subheader / Search & View Switcher */}
        <div className="bg-[#EFE7D8] border-b border-[#D6C5AD] px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#152E20] text-[#FAF6EE]'
                  : 'bg-white/70 text-[#554A3A] hover:bg-white'
              }`}
            >
              All 9 Disclosures
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'table'
                  ? 'bg-[#152E20] text-[#FAF6EE]'
                  : 'bg-white/70 text-[#554A3A] hover:bg-white'
              }`}
            >
              Notice Table View
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-[#152E20] text-[#FAF6EE]'
                  : 'bg-white/70 text-[#554A3A] hover:bg-white'
              }`}
            >
              Officers & Escalation
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-[#7A6B56] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notice items (e.g. Jotform, P650, Retention)..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#D1BFA5] rounded-xs text-xs text-[#1C1917] placeholder:text-[#8E7E6B] focus:outline-none focus:border-[#C0633C]"
            />
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Introductory Notice Banner */}
          <div className="bg-white border border-[#D5C2A7] p-4.5 rounded-sm shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#152E20]">
              <FileText className="w-4 h-4 text-[#C0633C]" />
              <span>Statutory Pre-Collection Disclosure Requirement</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4E4436] leading-relaxed">
              Before submitting any online registration form, membership application, event entry, or safety declaration (such as NSW Police Form P650), the Sydney Colonial Muzzle Loading Club Incorporated provides this plain-language explanation of our information handling practices in full compliance with the <em>Privacy Act 1988 (Cth)</em> and Australian Privacy Principles (APPs).
            </p>
          </div>

          {/* VIEW TAB 1: ALL 9 SECTIONS BREAKDOWN */}
          {activeTab === 'all' && (
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7A6B56]">
                  No matching privacy disclosures found for "{searchQuery}".
                </div>
              ) : (
                filteredItems.map((item, idx) => (
                  <div
                    key={item.id}
                    id={`notice-${item.id}`}
                    className="bg-white border border-[#E0D2BE] rounded-sm p-5 shadow-2xs hover:border-[#C5A880] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0E4D3]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#152E20] text-[#FAF6EE] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[#152E20] font-serif">
                            {item.item}
                          </h4>
                          <div className="text-xs text-[#8C3A16] font-medium mt-0.5">
                            {item.question}
                          </div>
                        </div>
                      </div>

                      {item.badge && (
                        <span className="self-start sm:self-auto bg-[#FAF6EE] text-[#705E49] border border-[#D6C5AD] text-[10px] font-mono px-2 py-0.5 rounded-xs uppercase tracking-wider font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="pt-3.5 space-y-3">
                      <p className="text-xs sm:text-sm text-[#2A231A] leading-relaxed font-normal">
                        {item.plainLanguageAnswer}
                      </p>

                      <div className="bg-[#FAF8F3] border border-[#EFE5D6] p-3.5 rounded-xs space-y-1.5">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5B47]">
                          Key Operational & Compliance Details:
                        </div>
                        <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#4A4032]">
                          {item.details.map((bullet, bIdx) => (
                            <li key={bIdx} className="leading-snug">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* VIEW TAB 2: STRUCTURED TABLE VIEW */}
          {activeTab === 'table' && (
            <div className="overflow-x-auto bg-white border border-[#D5C2A7] rounded-sm shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#152E20] text-[#F7F4EE] border-b border-[#234530]">
                    <th className="p-3.5 font-semibold uppercase tracking-wider text-[11px] w-1/4">
                      Notice Item
                    </th>
                    <th className="p-3.5 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                      Question Answered
                    </th>
                    <th className="p-3.5 font-semibold uppercase tracking-wider text-[11px]">
                      Plain-Language Summary
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0D2BE]">
                  {PRIVACY_COLLECTION_NOTICE_ITEMS.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F3]'}
                    >
                      <td className="p-3.5 font-semibold text-[#152E20] align-top">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-[#8C3A16]">
                            0{idx + 1}.
                          </span>
                          <span>{item.item}</span>
                        </div>
                        {item.badge && (
                          <span className="mt-1 inline-block text-[9px] bg-[#EFE7D8] text-[#554A3A] px-1.5 py-0.5 rounded-xs font-mono uppercase">
                            {item.badge}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-[#8C3A16] font-medium align-top leading-snug">
                        {item.question}
                      </td>
                      <td className="p-3.5 text-[#332C23] align-top leading-relaxed">
                        {item.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VIEW TAB 3: CONTACTS & ESCALATION PATHWAY */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Internal Club Privacy Officer */}
                <div className="bg-white border border-[#D5C2A7] p-5 rounded-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#152E20]">
                    <Building className="w-4 h-4 text-[#C0633C]" />
                    <span>Primary Club Privacy Officer</span>
                  </div>
                  <div className="text-xs text-[#4A4032] space-y-1.5">
                    <div className="font-semibold text-sm text-[#152E20]">
                      {CLUB_CONTACTS.clubSecretary.name}
                    </div>
                    <div className="text-[#7A6B56]">{CLUB_CONTACTS.clubSecretary.title}</div>
                    <div className="pt-1">
                      <a
                        href={`mailto:${CLUB_CONTACTS.clubSecretary.email}`}
                        className="font-mono text-xs text-[#C0633C] hover:underline"
                      >
                        {CLUB_CONTACTS.clubSecretary.email}
                      </a>
                    </div>
                    <div className="text-[11px] text-[#615341] pt-1">
                      Address: PO Box 91, Riverstone NSW 2765, Australia
                    </div>
                  </div>
                  <div className="bg-[#FAF8F3] p-2.5 rounded-xs text-[11px] text-[#554A3A]">
                    Handles official data access requests, record corrections, and internal privacy inquiries. Written responses provided within 30 days.
                  </div>
                </div>

                {/* External OAIC Regulatory Escalation */}
                <div className="bg-white border border-[#D5C2A7] p-5 rounded-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#152E20]">
                    <AlertOctagon className="w-4 h-4 text-[#8C3A16]" />
                    <span>External Escalation (OAIC)</span>
                  </div>
                  <div className="text-xs text-[#4A4032] space-y-1.5">
                    <div className="font-semibold text-sm text-[#152E20]">
                      Office of the Australian Information Commissioner
                    </div>
                    <div className="text-[#7A6B56]">National Privacy Regulator</div>
                    <div className="pt-1 space-y-0.5 text-xs font-mono">
                      <div>
                        Website:{' '}
                        <a
                          href="https://www.oaic.gov.au"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C0633C] hover:underline"
                        >
                          www.oaic.gov.au ↗
                        </a>
                      </div>
                      <div>Phone: 1300 363 992</div>
                      <div className="text-[11px] text-[#615341] font-sans">
                        Post: GPO Box 5218, Sydney NSW 2001
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FAF8F3] p-2.5 rounded-xs text-[11px] text-[#554A3A]">
                    If your complaint is not resolved by the Club Committee within 30 business days, you have the right to lodge an external dispute with the OAIC.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#EFE7D8] px-6 py-4 border-t border-[#D6C5AD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-[#685B49] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#152E20]" />
            <span>Sydney Colonial Muzzle Loading Club Inc. · Form Collection Protocol</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="sm:hidden px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#152E20] bg-white border border-[#D1BFA5] rounded-xs"
            >
              Export PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#152E20] hover:bg-[#0E2016] text-[#FAF6EE] px-6 py-2.5 rounded-xs text-xs uppercase tracking-widest font-semibold cursor-pointer transition-colors shadow-xs"
            >
              Close Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
