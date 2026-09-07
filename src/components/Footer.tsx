import React from 'react';
import { MapPin, Mail, MailCheck, User, ExternalLink } from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { NavScreen } from '../types';
import { CLUB_CONTACTS } from '../data/clubData';

interface FooterProps {
  onNavigate: (screen: NavScreen) => void;
  onOpenRegister: () => void;
  onOpenPrivacyNotice?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenRegister,
  onOpenPrivacyNotice,
}) => {
  return (
    <footer className="bg-[#0D2016] text-[#EAE2D2] border-t border-[#1C3A27]" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Logo & Since 1962 (Col span 3) */}
          <div className="md:col-span-3 flex flex-col items-start space-y-4">
            <ClubLogo size={70} showText={false} theme="dark" />
            <div className="space-y-1.5">
              <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F7F4EE]">
                SINCE 1962
              </h3>
              <p className="text-xs text-[#A6BAAE] leading-relaxed">
                Sydney Colonial Muzzle Loading Club. Preserving 19th-century shooting arts and black powder craftsmanship.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-block text-[10px] font-mono uppercase tracking-wider bg-[#152E20] text-[#C5A880] px-2.5 py-1 rounded-xs border border-[#234832]">
                Hawkesbury Valley · NSW
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (Col span 2) */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4B79B] mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#D8E2D5]">
              <li>
                <button
                  onClick={() => onNavigate('club')}
                  className="hover:text-[#C0633C] transition-colors cursor-pointer text-left"
                >
                  The Club
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disciplines')}
                  className="hover:text-[#C0633C] transition-colors cursor-pointer text-left"
                >
                  Disciplines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-[#C0633C] transition-colors cursor-pointer text-left"
                >
                  Event Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('members')}
                  className="hover:text-[#C0633C] transition-colors cursor-pointer text-left"
                >
                  Members Area
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-[#C0633C] transition-colors cursor-pointer text-left"
                >
                  Journal and Posts
                </button>
              </li>
              {onOpenPrivacyNotice && (
                <li>
                  <button
                    onClick={onOpenPrivacyNotice}
                    className="hover:text-[#81D89D] text-[#81D89D]/90 font-medium transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Privacy Notice</span>
                    <span className="text-[9px] bg-[#122A1C] border border-[#234832] px-1 py-0.2 rounded-xs uppercase">9 APPs</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Club Contacts & Addresses (Col span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4B79B] mb-4">
              CLUB CONTACTS
            </h4>

            {/* Physical Address */}
            <div className="flex items-start gap-2.5 text-xs text-[#D8E2D5]">
              <MapPin className="w-4 h-4 text-[#C0633C] shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#C4B79B]">
                  Range Address
                </div>
                <div className="leading-snug text-white font-medium">
                  {CLUB_CONTACTS.address.full}
                </div>
              </div>
            </div>

            {/* Postal Address */}
            <div className="flex items-start gap-2.5 text-xs text-[#D8E2D5]">
              <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#C4B79B]">
                  Mail To
                </div>
                <div className="leading-snug text-white font-medium">
                  {CLUB_CONTACTS.mailTo.full}
                </div>
              </div>
            </div>

            {/* Club Membership Secretary */}
            <div className="bg-[#122A1C] border border-[#234832] p-2.5 rounded-xs space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#81D89D]">
                <User className="w-3.5 h-3.5 text-[#81D89D]" />
                <span>{CLUB_CONTACTS.membershipSecretary.role}</span>
              </div>
              <div className="text-[#F7F4EE] font-medium text-xs">
                {CLUB_CONTACTS.membershipSecretary.name} – {CLUB_CONTACTS.membershipSecretary.title}
              </div>
              <a
                href={`mailto:${CLUB_CONTACTS.membershipSecretary.email}`}
                className="inline-flex items-center gap-1 text-[11px] text-[#C0633C] hover:text-[#FFA280] transition-colors"
              >
                <span>• {CLUB_CONTACTS.membershipSecretary.email}</span>
              </a>
            </div>

            {/* Club Secretary */}
            <div className="bg-[#122A1C] border border-[#234832] p-2.5 rounded-xs space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#81D89D]">
                <User className="w-3.5 h-3.5 text-[#81D89D]" />
                <span>{CLUB_CONTACTS.clubSecretary.role}</span>
              </div>
              <div className="text-[#F7F4EE] font-medium text-xs">
                {CLUB_CONTACTS.clubSecretary.name}
              </div>
              <a
                href={`mailto:${CLUB_CONTACTS.clubSecretary.email}`}
                className="inline-flex items-center gap-1 text-[11px] text-[#C0633C] hover:text-[#FFA280] transition-colors"
              >
                <span>• {CLUB_CONTACTS.clubSecretary.email}</span>
              </a>
            </div>
          </div>

          {/* Column 4: Come and have a look / CTA (Col span 3) */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="text-xl sm:text-2xl font-normal font-serif text-[#F7F4EE] mb-2">
              Come and have a look.
            </h4>
            <p className="text-xs text-[#A6BAAE] mb-5 font-light leading-relaxed">
              Come visit for a shoot day or explore how we preserve Australia&apos;s living colonial shooting heritage.
            </p>
            <button
              id="footer-register-interest-btn"
              onClick={onOpenRegister}
              className="w-full bg-[#C0633C] hover:bg-[#A9532F] text-white px-5 py-3 rounded text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer text-center"
            >
              REGISTER YOUR INTEREST
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#1C3A27]/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86998C] tracking-wider gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© · Sydney Colonial Muzzle Loading Club (SCMLC) · All Rights Reserved</span>
            {onOpenPrivacyNotice && (
              <button
                onClick={onOpenPrivacyNotice}
                className="text-[#C4B79B] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Privacy Collection Notice
              </button>
            )}
          </div>
          <div className="flex items-center gap-6">
            <span>Sackville Range, Hawkesbury NSW</span>
            <span>Est. 1962</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

