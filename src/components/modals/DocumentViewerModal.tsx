import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  FileText,
  Shield,
  Search,
  ExternalLink,
  CheckCircle,
  Copy,
  BookOpen,
} from 'lucide-react';
import { OfficialDocument, OFFICIAL_DOCUMENTS } from '../../data/officialDocuments';
import { generateOfficialDocumentPDF } from '../../utils/pdfGenerator';
import { ClubLogo } from '../ClubLogo';

interface DocumentViewerModalProps {
  document: OfficialDocument | null;
  onClose: () => void;
  onSelectDocument?: (doc: OfficialDocument) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  onClose,
  onSelectDocument,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!document) return null;

  const handleDownload = () => {
    setIsGeneratingPdf(true);
    try {
      generateOfficialDocumentPDF(document);
    } catch (e) {
      console.error('Error generating PDF:', e);
    } finally {
      setTimeout(() => setIsGeneratingPdf(false), 500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const fullText = [
      document.title,
      document.description,
      '',
      ...document.sections.flatMap((s) => [
        `=== ${s.title} ===`,
        ...(Array.isArray(s.content) ? s.content : [s.content || '']),
        '',
      ]),
    ].join('\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Filter sections by search term if provided
  const filteredSections迷 = document.sections.map((sec) => {
    if (!searchTerm.trim()) return sec;
    const term = searchTerm.toLowerCase();
    const titleMatch = sec.title.toLowerCase().includes(term);
    const content = Array.isArray(sec.content) ? sec.content : [sec.content || ''];
    const matchedItems = content.filter((item) => item.toLowerCase().includes(term));
    if (titleMatch || matchedItems.length > 0) {
      return {
        ...sec,
        content: titleMatch ? content : matchedItems,
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#152E20]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-[#FAF6EE] text-[#1C1917] border border-[#D5C2A7] rounded-sm shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#152E20] text-[#F7F4EE] px-6 py-4 border-b border-[#264D35] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <ClubLogo size={36} theme="dark" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880]">
                  Official Document Viewer
                </span>
                <span className="text-[9px] bg-[#0D4827] text-[#81D89D] px-1.5 py-0.5 rounded font-mono">
                  {document.category}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-serif font-semibold truncate text-[#F7F4EE]">
                {document.shortTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isGeneratingPdf}
              className="px-3 py-1.5 bg-[#C0633C] hover:bg-[#8C3A16] text-[#FAF6EE] rounded-xs text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Download clean PDF document"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#D5E2D0] hover:text-white hover:bg-[#234832] rounded-xs transition-colors cursor-pointer"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Toolbar & Document Switcher */}
        <div className="bg-[#F2EADA] border-b border-[#DECBB5] px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          {/* Quick Doc Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            <span className="text-[#7A6B56] uppercase font-bold text-[10px] tracking-wider shrink-0">
              Switch:
            </span>
            {OFFICIAL_DOCUMENTS.map((doc) => (
              <button
                key={doc.id}
                onClick={() => onSelectDocument && onSelectDocument(doc)}
                className={`px-2.5 py-1 rounded-xs whitespace-nowrap transition-colors cursor-pointer text-xs ${
                  doc.id === document.id
                    ? 'bg-[#152E20] text-[#F7F4EE] font-semibold'
                    : 'bg-white/80 hover:bg-white text-[#4A3D2C] border border-[#DECBB5]'
                }`}
              >
                {doc.shortTitle}
              </button>
            ))}
          </div>

          {/* Search & Utility */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7A6B56]" />
              <input
                type="text"
                placeholder="Search clauses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 bg-white border border-[#DECBB5] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C0633C]"
              />
            </div>

            <button
              onClick={handleCopyText}
              className="p-1.5 bg-white hover:bg-[#FAF6EE] text-[#4A3D2C] border border-[#DECBB5] rounded-xs transition-colors cursor-pointer"
              title="Copy text to clipboard"
            >
              {isCopied ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 bg-white hover:bg-[#FAF6EE] text-[#4A3D2C] border border-[#DECBB5] rounded-xs transition-colors cursor-pointer"
              title="Print document"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Document Header Banner */}
          <div className="bg-white border border-[#DECBB5] p-6 rounded-sm shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#DECBB5]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C3A16] block mb-1">
                  Sydney Colonial Muzzle Loading Club Incorporated
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#152E20]">
                  {document.title}
                </h1>
                <div className="text-xs text-[#6B5C49] mt-1">
                  Organisation Number: <span className="font-mono font-semibold">Y0181644</span> · Official Range Instrument
                </div>
              </div>

              <div className="text-right shrink-0 bg-[#FAF6EE] p-3 rounded-xs border border-[#E5D7C3] text-xs space-y-0.5">
                <div className="text-[#152E20] font-semibold">Status: Active</div>
                <div className="text-[#6B5C49]">{document.version}</div>
                <div className="text-[11px] text-[#8C3A16] font-medium">Updated: {document.updatedDate}</div>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#4E4131] leading-relaxed italic">
              {document.description}
            </p>
          </div>

          {/* Clauses / Content Sections */}
          <div className="space-y-6">
            {filteredSections迷.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#DECBB5] p-5 sm:p-6 rounded-sm shadow-2xs space-y-3"
              >
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#152E20] flex items-center gap-2 border-b border-[#EFE5D5] pb-2">
                  <span className="text-[#C0633C] text-sm font-sans font-semibold">§</span>
                  {sec?.title}
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#383025] leading-relaxed">
                  {sec?.content && (Array.isArray(sec.content) ? sec.content : [sec.content]).map((paragraph, pIdx) => {
                    const isWarning = paragraph.startsWith('RISK WARNING') || paragraph.startsWith('IMPORTANT:') || paragraph.startsWith('THE SAFE HANDLING');
                    const isSignatureLine = paragraph.includes('Signature:') || paragraph.includes('DOB:');

                    return (
                      <div
                        key={pIdx}
                        className={`${
                          isWarning
                            ? 'bg-[#FFF7ED] border-l-4 border-[#C0633C] p-3 text-[#7C2D12] font-medium rounded-r-xs'
                            : isSignatureLine
                            ? 'bg-[#FAF6EE] p-3 rounded-xs font-mono text-[11px] text-[#4A3D2C] border border-[#DECBB5]'
                            : ''
                        }`}
                      >
                        {paragraph}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Download CTA Bar at Bottom */}
          <div className="bg-[#152E20] text-[#F7F4EE] p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-serif font-semibold text-[#F7F4EE]">
                Need a physical or offline copy?
              </h4>
              <p className="text-xs text-[#D5E2D0]">
                Download the official formatted PDF file ({document.fileSize}) for your records, gear bag, or licensing application.
              </p>
            </div>
            <button
              onClick={handleDownload}
              disabled={isGeneratingPdf}
              className="px-5 py-2.5 bg-[#C0633C] hover:bg-[#8C3A16] text-[#FAF6EE] rounded-xs text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Preparing PDF...' : `Download ${document.shortTitle} PDF`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
