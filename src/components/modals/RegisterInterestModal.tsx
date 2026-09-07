import React, { useState } from 'react';
import { X, CheckCircle, Shield, AlertCircle, ShieldCheck } from 'lucide-react';
import { RegistrationFormData } from '../../types';
import { PrivacyNoticeBlock } from '../common/PrivacyNoticeBlock';

interface RegisterInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullPrivacyNotice?: () => void;
}

export const RegisterInterestModal: React.FC<RegisterInterestModalProps> = ({
  isOpen,
  onClose,
  onOpenFullPrivacyNotice,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    licenseStatus: 'unlicensed_visitor',
    licenseNumber: '',
    disciplines: ['single-action'],
    preferredDate: 'Next Available Shoot Day',
    experienceLevel: 'complete_beginner',
    notes: '',
  });

  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleDisciplineToggle = (id: string) => {
    setFormData(prev => {
      const exists = prev.disciplines.includes(id);
      return {
        ...prev,
        disciplines: exists
          ? prev.disciplines.filter(d => d !== id)
          : [...prev.disciplines, id],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAcknowledged) {
      alert('Please acknowledge the Privacy Collection Notice to proceed.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] text-[#1C1917] rounded-sm shadow-2xl border border-[#D5C2A7] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#152E20] text-[#F7F4EE] px-6 py-5 flex items-center justify-between border-b border-[#234530]">
          <div>
            <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-[#C0633C] block mb-1">
              Visitor Day & Membership
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-normal">
              Register Your Interest
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#EAE2D2]/70 hover:text-white p-1 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#152E20] text-[#C0633C] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#C0633C]">
                <CheckCircle className="w-10 h-10 text-[#C0633C]" />
              </div>
              <h4 className="text-2xl font-serif text-[#152E20]">
                Thank you, {formData.fullName || 'friend'}.
              </h4>
              <p className="text-sm text-[#4E4436] max-w-md mx-auto leading-relaxed">
                Your interest has been logged with the SCMLC Secretary. A committee member will reach out to confirm range availability, safety orientation briefing, and loan equipment.
              </p>

              <div className="bg-[#EFE7D8] p-4 rounded-sm border border-[#D6C5AD] text-left text-xs text-[#3E3528] max-w-md mx-auto space-y-2 mt-6">
                <div className="font-semibold text-[#152E20] uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#C0633C]" />
                  What to bring to Sackville Range:
                </div>
                <ul className="list-disc list-inside space-y-1 text-[#554A3A]">
                  <li>Sturdy, fully enclosed leather boots or shoes</li>
                  <li>Eye and ear protection (or ask a Range Officer on arrival)</li>
                  <li>Sun hat and water bottle (Hawkesbury weather)</li>
                  <li>Photo ID or Firearms License (if currently licensed)</li>
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="bg-[#152E20] hover:bg-[#0E2016] text-[#FAF6EE] px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Direct revolutioniseSPORT Membership Banner */}
              <div className="bg-[#152E20] text-[#F7F4EE] p-4 rounded-xs border border-[#C5A880] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
                    <span>Existing or Ready to Join?</span>
                  </div>
                  <div className="text-xs text-[#D5E2D0] font-light mt-0.5">
                    For official membership registration & renewals, proceed directly to revolutioniseSPORT.
                  </div>
                </div>
                <a
                  href="https://www.revolutionise.com.au/scmlc/registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#C0633C] hover:bg-[#8C3A16] text-[#FAF6EE] rounded-xs text-[11px] font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                >
                  <span>Online Portal</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#554A3A] leading-relaxed">
                Whether you are an experienced black powder shooter or have never fired a historic firearm before, visitors are warmly invited to experience our range days at Sackville.
              </p>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#152E20] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Samuel Thompson"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D1BFA5] rounded-xs text-sm focus:outline-none focus:border-[#C0633C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#152E20] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="samuel@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D1BFA5] rounded-xs text-sm focus:outline-none focus:border-[#C0633C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#152E20] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0400 000 000"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D1BFA5] rounded-xs text-sm focus:outline-none focus:border-[#C0633C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#152E20] mb-1">
                    Firearms License Status
                  </label>
                  <select
                    value={formData.licenseStatus}
                    onChange={e => setFormData({ ...formData, licenseStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D1BFA5] rounded-xs text-sm focus:outline-none focus:border-[#C0633C]"
                  >
                    <option value="unlicensed_visitor">Unlicensed Visitor (P650 Form provided on-site)</option>
                    <option value="licensed_cat_ab">NSW Category A / B Licensed</option>
                    <option value="licensed_cat_h">NSW Category H (Handgun) Licensed</option>
                    <option value="interstate_licensed">Interstate / Reciprocal Licensed</option>
                  </select>
                </div>
              </div>

              {/* Disciplines of interest */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#152E20] mb-2">
                  Disciplines of Interest (Select any)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'single-action', label: 'Single Action' },
                    { id: 'pistol-events', label: 'Pistol Events' },
                    { id: 'rifle-events', label: 'Rifle Events' },
                    { id: 'shotgun-events', label: 'Shotgun Events' },
                  ].map(disc => (
                    <label
                      key={disc.id}
                      className={`flex items-center gap-2 p-2.5 border rounded-xs cursor-pointer text-xs transition-colors ${
                        formData.disciplines.includes(disc.id)
                          ? 'border-[#C0633C] bg-[#F7EFE1] text-[#8C3A16] font-semibold'
                          : 'border-[#D5C2A7] bg-white text-[#4A4032]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.disciplines.includes(disc.id)}
                        onChange={() => handleDisciplineToggle(disc.id)}
                        className="accent-[#C0633C]"
                      />
                      <span>{disc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience level */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#152E20] mb-1">
                  Shooting Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={e => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D1BFA5] rounded-xs text-sm focus:outline-none focus:border-[#C0633C]"
                >
                  <option value="complete_beginner">Complete beginner to target shooting</option>
                  <option value="modern_shooter_new_to_blackpowder">Experienced modern shooter, new to black powder muzzle-loading</option>
                  <option value="experienced_muzzleloader">Experienced muzzleloader / re-enactor</option>
                </select>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#152E20] mb-1">
                  Questions or Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us if you own historical arms, have specific dates in mind, or have questions about club membership..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D1BFA5] rounded-xs text-sm focus:outline-none focus:border-[#C0633C]"
                />
              </div>

              <div className="bg-[#EFE7D8] p-3.5 rounded-xs flex items-start gap-2.5 text-xs text-[#524636]">
                <AlertCircle className="w-4 h-4 text-[#8C3A16] shrink-0 mt-0.5" />
                <span>
                  Under NSW Firearms Registry provisions, unlicensed visitors may participate in target shooting under the direct 1:1 supervision of an approved Range Officer upon completion of the standard Form P650 declaration.
                </span>
              </div>

              {/* Statutory Privacy Collection Notice Block (9 Questions Disclosed in Plain Language) */}
              <PrivacyNoticeBlock
                onOpenFullNotice={onOpenFullPrivacyNotice}
                defaultExpanded={false}
              />

              {/* Mandatory Privacy Acknowledgement Checkbox */}
              <div className="bg-white border border-[#D5C2A7] p-3.5 rounded-xs">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-[#332A20]">
                  <input
                    type="checkbox"
                    required
                    checked={privacyAcknowledged}
                    onChange={e => setPrivacyAcknowledged(e.target.checked)}
                    className="accent-[#C0633C] w-4 h-4 mt-0.5 shrink-0 cursor-pointer"
                  />
                  <span className="leading-snug">
                    <strong className="text-[#152E20] font-semibold">
                      Privacy Notice Acknowledgement *
                    </strong>
                    : I acknowledge that I have read the SCMLC Privacy Collection Notice. I understand that my information is collected for safety, booking, and club compliance purposes, may be processed via secure cloud services (Jotform / revolutioniseSPORT), and is handled in accordance with the <em>Privacy Act 1988 (Cth)</em>.
                  </span>
                </label>
              </div>

              {/* Submit button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#685B49] hover:text-[#152E20]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!privacyAcknowledged}
                  className={`px-7 py-3 rounded-xs text-xs font-semibold tracking-[0.14em] uppercase transition-all shadow hover:shadow-md cursor-pointer ${
                    privacyAcknowledged
                      ? 'bg-[#C0633C] hover:bg-[#A9532F] text-white'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  Submit Registration
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
