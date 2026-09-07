import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Download,
  Clock,
  Maximize2,
  Minimize2,
  ExternalLink,
  UserCheck,
  CreditCard,
  Eye,
  CheckCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { NOTICES } from '../../data/clubData';
import { Notice, ClubEvent, UploadedImage, JournalArticle } from '../../types';
import { OFFICIAL_DOCUMENTS, OfficialDocument } from '../../data/officialDocuments';
import { generateOfficialDocumentPDF } from '../../utils/pdfGenerator';
import { AdminPortal } from '../admin/AdminPortal';
import { ClubLogo } from '../ClubLogo';

interface MembersScreenProps {
  onSelectNotice: (notice: Notice) => void;
  isAdmin: boolean;
  onLogin: (success: boolean) => void;
  onLogout: () => void;
  events: ClubEvent[];
  onUpdateEvents: (newEvents: ClubEvent[]) => void;
  images: UploadedImage[];
  onUpdateImages: (newImages: UploadedImage[]) => void;
  articles: JournalArticle[];
  onUpdateArticles: (newArticles: JournalArticle[]) => void;
  notices?: Notice[];
  onUpdateNotices?: (newNotices: Notice[]) => void;
  onNavigateToCalendar?: () => void;
  onOpenDocumentViewer: (doc: OfficialDocument) => void;
  onOpenPrivacyNotice?: () => void;
}

export const MembersScreen: React.FC<MembersScreenProps> = ({
  onSelectNotice,
  isAdmin,
  onLogin,
  onLogout,
  events,
  onUpdateEvents,
  images,
  onUpdateImages,
  articles,
  onUpdateArticles,
  notices = NOTICES,
  onUpdateNotices,
  onNavigateToCalendar,
  onOpenDocumentViewer,
  onOpenPrivacyNotice,
}) => {
  const [isAdminExpanded, setIsAdminExpanded] = useState(false);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  const handleDownloadDoc = (doc: OfficialDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingDocId(doc.id);
    try {
      generateOfficialDocumentPDF(doc);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => setDownloadingDocId(null), 600);
    }
  };

  const REVOLUTIONISE_URL = 'https://www.revolutionise.com.au/scmlc/registration';

  return (
    <div className="bg-[#FAF6EE] text-[#1C1917] min-h-screen">
      {/* Header */}
      <section className="bg-[#152E20] text-[#F7F4EE] py-16 sm:py-20 border-b border-[#234832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C0633C] block mb-3">
                Member Resources & Administration
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-4">
                Members Area
              </h1>
              <p className="text-base sm:text-lg text-[#D5E2D0] max-w-2xl font-light">
                Online membership registration, annual renewals, official club instruments, Range Standing Orders, and administrative portals for the Sydney Colonial Muzzle Loading Club.
              </p>
            </div>

            {isAdmin && (
              <div className="bg-[#0E2016] border border-[#264D35] p-3.5 rounded-xs flex items-center gap-3 shrink-0 shadow-lg">
                <div className="text-right">
                  <div className="text-[11px] uppercase font-bold tracking-wider text-[#81D89D]">
                    Admin Mode Active
                  </div>
                  <div className="text-[10px] text-[#A6BAAE]">Events CSV · Image Library · Journal Posts</div>
                </div>
                <button
                  onClick={() => setIsAdminExpanded(!isAdminExpanded)}
                  className="px-3 py-1.5 bg-[#152E20] hover:bg-[#234832] text-[#FAF6EE] border border-[#264D35] rounded-xs text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  title={isAdminExpanded ? 'Exit full width view' : 'Expand full width view'}
                >
                  {isAdminExpanded ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>Compact View</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Width</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* ========================================================================= */}
        {/* SECTION 1: REVOLUTIONISE ONLINE MEMBERSHIP & RENEWAL BANNER */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-[#152E20] to-[#0D1F15] text-[#F7F4EE] border-2 border-[#C5A880] p-6 sm:p-8 rounded-sm shadow-xl relative overflow-hidden">
          {/* Subtle watermark crest */}
          <div className="absolute right-[-20px] top-[-30px] opacity-10 pointer-events-none hidden md:block">
            <ClubLogo size={320} theme="dark" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#C0633C] text-[#FAF6EE] text-[10px] uppercase font-bold tracking-[0.2em] px-2.5 py-1 rounded-xs">
                  Official Online Portal
                </span>
                <span className="text-xs text-[#C5A880] font-mono font-medium">
                  revolutioniseSPORT / SCMLC
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#F7F4EE] leading-tight">
                Membership Renewal & New Applications
              </h2>

              <p className="text-xs sm:text-sm text-[#D5E2D0] leading-relaxed max-w-2xl font-light">
                All club registrations, financial memberships, annual renewals, and NSW Firearms Registry attendance compliance records are securely processed through our dedicated revolutioniseSPORT portal.
              </p>

              {/* Key Features Pill Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#0D2418]/80 border border-[#234832] p-3 rounded-xs flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#81D89D] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#F7F4EE]">New Member Signup</div>
                    <div className="text-[11px] text-[#A6BAAE]">Probationary & full licenses</div>
                  </div>
                </div>

                <div className="bg-[#0D2418]/80 border border-[#234832] p-3 rounded-xs flex items-start gap-2.5">
                  <CreditCard className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#F7F4EE]">Annual Renewals</div>
                    <div className="text-[11px] text-[#A6BAAE]">Instant card / EFTPOS billing</div>
                  </div>
                </div>

                <div className="bg-[#0D2418]/80 border border-[#234832] p-3 rounded-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#81D89D] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#F7F4EE]">Registry Compliance</div>
                    <div className="text-[11px] text-[#A6BAAE]">Automated attendance returns</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="lg:col-span-4 flex flex-col items-stretch justify-center bg-[#0B1A12] border border-[#264D35] p-6 rounded-sm text-center space-y-4">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A880]">
                  Direct Access Link
                </div>
                <div className="text-xs text-[#A6BAAE]">
                  Secure external revolutionise portal
                </div>
              </div>

              <a
                href={REVOLUTIONISE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#C0633C] hover:bg-[#8C3A16] text-[#FAF6EE] rounded-xs font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Go to Registration & Renewal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="text-[10px] text-[#8EA396] leading-tight">
                Opens revolutionise.com.au/scmlc/registration in a new secure window.
              </div>
            </div>
          </div>
        </div>

        {/* If Admin is logged in and chooses expanded full-width view */}
        {isAdmin && isAdminExpanded ? (
          <div className="space-y-12 animate-in fade-in duration-200">
            <AdminPortal
              isAdmin={isAdmin}
              onLogin={onLogin}
              onLogout={onLogout}
              events={events}
              onUpdateEvents={onUpdateEvents}
              images={images}
              onUpdateImages={onUpdateImages}
              articles={articles}
              onUpdateArticles={onUpdateArticles}
              notices={notices}
              onUpdateNotices={onUpdateNotices}
              onNavigateToCalendar={onNavigateToCalendar}
            />

            <div className="border-t border-[#DECBB5] pt-12">
              <h2 className="text-2xl font-serif text-[#152E20] mb-6">
                Club Noticeboard & Range Standing Orders
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Official Bulletins */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C3A16]">
                    Official Bulletins
                  </h3>
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => onSelectNotice(notice)}
                      className="bg-[#FAF6EE] hover:bg-[#F3ECE0] border border-[#DECBB5] p-5 rounded-xs transition-all cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs text-[#7A6B56] mb-2 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {notice.date}
                        </span>
                        <span className="bg-[#E7DAC7] text-[#554632] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                          {notice.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-serif text-[#152E20] group-hover:text-[#C0633C] transition-colors mb-1">
                        {notice.title}
                      </h4>
                      <p className="text-xs text-[#4E4334] line-clamp-2">
                        {notice.summary}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Standing Orders */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C3A16] mb-4">
                    Range Standing Orders Summary
                  </h3>
                  <div className="space-y-3 text-xs text-[#3E3528] bg-[#F2EADA] p-6 rounded-xs border border-[#DECBB5]">
                    <div>
                      <strong className="text-[#152E20]">1. Pre-Measured Powder Only:</strong> No loose powder horns or cans on the firing line.
                    </div>
                    <div>
                      <strong className="text-[#152E20]">2. No Smokeless Powders:</strong> Modern nitro powders are strictly banned. Only genuine black powder or approved replicas.
                    </div>
                    <div>
                      <strong className="text-[#152E20]">3. Muzzle Direction:</strong> Muzzles elevated vertically above hat height at all times between benches.
                    </div>
                    <div>
                      <strong className="text-[#152E20]">4. Capping and Priming:</strong> Restricted strictly downrange at designated firing stations under Range Officer control.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standard 2-Column Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Official PDF Documents & Notices */}
            <div className="lg:col-span-7 space-y-10">
              {/* ========================================================================= */}
              {/* OFFICIAL PDF DOCUMENTS SECTION (ATTACHED PDFS DOWNLOADS) */}
              {/* ========================================================================= */}
              <div className="bg-[#FAF6EE] p-6 sm:p-7 rounded-sm border border-[#DECBB5] shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DECBB5]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C3A16]">
                        Official Instruments
                      </span>
                      <span className="text-[10px] bg-[#0D4827]/10 text-[#0D4827] px-2 py-0.5 rounded font-mono font-medium">
                        PDF Downloads
                      </span>
                    </div>
                    <h2 className="text-2xl font-serif text-[#152E20] font-bold">
                      Club Legal & Safety Documents
                    </h2>
                  </div>
                  <span className="text-xs text-[#7A6B56] italic">
                    Click to view or download
                  </span>
                </div>

                <p className="text-xs text-[#544837] leading-relaxed">
                  These official instruments govern all activities, memberships, and range conduct at the Sydney Colonial Muzzle Loading Club. All shooters and guests must be familiar with these requirements.
                </p>

                {/* PDF Document Cards */}
                <div className="space-y-4">
                  {OFFICIAL_DOCUMENTS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => onOpenDocumentViewer(doc)}
                      className="bg-white border border-[#DECBB5] hover:border-[#C0633C] p-4 sm:p-5 rounded-xs transition-all hover:shadow-md cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="p-2.5 bg-[#FAF6EE] group-hover:bg-[#F2EADA] rounded-xs border border-[#DECBB5] text-[#8C3A16] shrink-0 transition-colors">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold bg-[#EAE2D2] text-[#4A3D2C] px-1.5 py-0.5 rounded">
                              {doc.category}
                            </span>
                            <span className="text-[11px] text-[#7A6B56]">
                              {doc.pages} Pages · {doc.fileSize}
                            </span>
                          </div>
                          <h3 className="text-base font-serif font-bold text-[#152E20] group-hover:text-[#C0633C] transition-colors leading-snug">
                            {doc.title}
                          </h3>
                          <p className="text-xs text-[#6B5D4B] line-clamp-2">
                            {doc.description}
                          </p>
                          <div className="text-[11px] text-[#8C3A16] font-medium pt-0.5">
                            {doc.version}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DECBB5]/40 justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDocumentViewer(doc);
                          }}
                          className="px-3 py-1.5 bg-[#FAF6EE] hover:bg-[#F2EADA] text-[#152E20] border border-[#DECBB5] rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Read full document in viewer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#8C3A16]" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={(e) => handleDownloadDoc(doc, e)}
                          disabled={downloadingDocId === doc.id}
                          className="px-3 py-1.5 bg-[#152E20] hover:bg-[#234832] text-[#FAF6EE] rounded-xs text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          title="Download PDF to your computer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span>
                            {downloadingDocId === doc.id ? 'Generating...' : 'PDF'}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Club Notices */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-[#152E20] flex items-center gap-2 font-bold">
                    <AlertTriangle className="w-6 h-6 text-[#C0633C]" />
                    Club Noticeboard
                  </h2>
                  <span className="text-xs text-[#7A6B56] uppercase tracking-wider font-semibold">
                    Official Bulletins
                  </span>
                </div>

                <div className="space-y-4">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => onSelectNotice(notice)}
                      className="bg-white hover:bg-[#FAF6EE] border border-[#DECBB5] p-6 rounded-xs transition-all cursor-pointer group shadow-2xs hover:shadow-md"
                    >
                      <div className="flex items-center justify-between text-xs text-[#7A6B56] mb-2 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {notice.date}
                        </span>
                        <span className="bg-[#E7DAC7] text-[#554632] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                          {notice.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-serif text-[#152E20] group-hover:text-[#C0633C] transition-colors mb-2">
                        {notice.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4E4334] leading-relaxed">
                        {notice.summary}
                      </p>
                      <div className="mt-3 text-xs uppercase tracking-wider font-semibold text-[#8C3A16] group-hover:underline">
                        Read full notice →
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standing Orders Summary */}
              <div className="border-t border-[#DECBB5] pt-8">
                <h2 className="text-2xl font-serif text-[#152E20] mb-4 flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-6 h-6 text-[#152E20]" />
                  Range Standing Orders Summary
                </h2>
                <div className="space-y-3 text-xs sm:text-sm text-[#3E3528] bg-[#F2EADA] p-6 rounded-xs border border-[#DECBB5]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#C0633C] font-bold">1.</span>
                    <div>
                      <strong className="text-[#152E20]">Pre-Measured Powder Only:</strong> No loose powder horns or cans allowed on the firing line. Charges must be measured into dedicated plastic or brass tubes at the rear loading bench.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#C0633C] font-bold">2.</span>
                    <div>
                      <strong className="text-[#152E20]">No Smokeless Powders:</strong> Smokeless, modern nitrocellulose powders are strictly banned on the muzzle-loading ranges. Only genuine black powder (Swiss, Wano, Goex) or approved replica black powder may be used.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#C0633C] font-bold">3.</span>
                    <div>
                      <strong className="text-[#152E20]">Muzzle Direction:</strong> Longarms must be carried vertically, muzzles elevated above hat height at all times when moving between racks and firing benches.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#C0633C] font-bold">4.</span>
                    <div>
                      <strong className="text-[#152E20]">Capping and Priming:</strong> Capping nipples or priming flintlock flash pans is strictly restricted to when the firearm is pointed safely downrange at the firing station under Range Officer control.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Admin Portal & Quick Links */}
            <div className="lg:col-span-5 space-y-8">
              {/* Admin Portal */}
              <AdminPortal
                isAdmin={isAdmin}
                onLogin={onLogin}
                onLogout={onLogout}
                events={events}
                onUpdateEvents={onUpdateEvents}
                images={images}
                onUpdateImages={onUpdateImages}
                articles={articles}
                onUpdateArticles={onUpdateArticles}
                notices={notices}
                onUpdateNotices={onUpdateNotices}
                onNavigateToCalendar={onNavigateToCalendar}
              />

              {/* Membership Registration FAQs & Quick Guidance */}
              <div className="bg-[#F2EADA] p-6 rounded-sm border border-[#DECBB5] space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0D4827]" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#152E20]">
                    Membership & Licensing FAQ
                  </h4>
                </div>

                <div className="space-y-3 text-xs text-[#44382A]">
                  <div>
                    <strong className="text-[#152E20]">Q: How do I renew my annual club subscription?</strong>
                    <p className="text-[11px] text-[#554632] mt-0.5">
                      Visit the revolutioniseSPORT portal link above, log in with your member email, and submit payment. Receipts and updated digital cards are issued immediately.
                    </p>
                  </div>

                  <div>
                    <strong className="text-[#152E20]">Q: I am new to shooting. Can I join?</strong>
                    <p className="text-[11px] text-[#554632] mt-0.5">
                      Yes! Unlicensed prospective members complete a probationary period under Form P650 supervision with our licensed Range Officers.
                    </p>
                  </div>

                  <div>
                    <strong className="text-[#152E20]">Q: When is the Club financial year?</strong>
                    <p className="text-[11px] text-[#554632] mt-0.5">
                      Pursuant to Clause 21 of the Constitution, the club financial year ends on 30 June. AGM is held annually in July.
                    </p>
                  </div>
                </div>
              </div>

              {/* Statutory Privacy Collection Notice Card */}
              <div className="bg-[#152E20] text-[#F7F4EE] p-6 rounded-sm border border-[#264D35] space-y-3.5 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#81D89D]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                      Statutory Privacy Notice
                    </span>
                  </div>
                  <span className="text-[9px] bg-[#0E2016] text-[#81D89D] font-mono px-2 py-0.5 rounded-xs border border-[#234530]">
                    9 APPs Disclosures
                  </span>
                </div>

                <p className="text-xs text-[#D5E2D0] leading-relaxed font-light">
                  Before submitting any registration form, NSW Form P650 declaration, or membership application, read our plain-language disclosures regarding entity identity, cloud storage (Jotform / revolutionise), 7-year statutory retention, and access rights.
                </p>

                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {onOpenPrivacyNotice && (
                    <button
                      type="button"
                      onClick={onOpenPrivacyNotice}
                      className="w-full sm:w-auto px-4 py-2 bg-[#C0633C] hover:bg-[#A9532F] text-white rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                    >
                      Read 9 Plain-Language Disclosures
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const doc = OFFICIAL_DOCUMENTS.find(d => d.id === 'privacy-collection-notice');
                      if (doc) onOpenDocumentViewer(doc);
                    }}
                    className="w-full sm:w-auto px-3 py-2 bg-[#0E2016] hover:bg-[#234530] text-[#EAE2D2] border border-[#264D35] rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    View Official Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
