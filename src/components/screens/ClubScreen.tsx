import React from 'react';
import { Shield, Target, Award, Users, MapPin, CheckCircle, Calendar, ArrowRight, Mail, MailCheck, User, ExternalLink, Navigation } from 'lucide-react';
import { CLUB_IMAGES, CLUB_CONTACTS, CLUB_HISTORY_TIMELINE } from '../../data/clubData';
import { ClubLogo } from '../ClubLogo';

interface ClubScreenProps {
  onOpenRegister: () => void;
  onViewCalendar: () => void;
  onExploreDisciplines: () => void;
}

export const ClubScreen: React.FC<ClubScreenProps> = ({
  onOpenRegister,
  onViewCalendar,
  onExploreDisciplines,
}) => {
  return (
    <div className="bg-[#FAF6EE] text-[#1C1917] min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#152E20] text-[#F7F4EE] py-20 lg:py-28 relative overflow-hidden border-b border-[#234832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C0633C] block mb-3">
              Founded 1962 · Hawkesbury Valley, NSW
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-normal leading-[1.1] mb-6">
              The Sydney Colonial Muzzle Loading Club
            </h1>
            <p className="text-base sm:text-xl text-[#D8E4D5] font-light leading-relaxed mb-8">
              For over six decades, our members have dedicated themselves to keeping the sounds, smells, and genuine marksmanship of Australia&apos;s colonial era alive.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenRegister}
                className="bg-[#C0633C] hover:bg-[#A9532F] text-white px-6 py-3.5 rounded text-xs font-semibold tracking-[0.14em] uppercase transition-all shadow-md"
              >
                VISIT THE RANGE
              </button>
              <button
                onClick={onViewCalendar}
                className="bg-transparent border border-[#F7F4EE]/40 hover:border-white text-[#F7F4EE] px-6 py-3.5 rounded text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
              >
                UPCOMING SHOOTS
              </button>
            </div>
          </div>
        </div>

        {/* Subtle watermark crest */}
        <div className="absolute right-[-40px] top-[-30px] opacity-15 pointer-events-none hidden lg:block select-none">
          <ClubLogo size={500} theme="dark" />
        </div>
      </section>

      {/* Main Story & History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 text-[#383126] leading-relaxed font-light">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#152E20]">
              Our Heritage & Living Traditions
            </h2>
            <p className="text-base sm:text-lg">
              Chartered in 1962, the Sydney Colonial Muzzle Loading Club (SCMLC) is one of Australia&apos;s oldest continually operating historical shooting institutions. While modern competitive shooting prioritizes polymer frames and micro-second electronics, we believe in the timeless craft of black powder, linen patches, flint, and iron.
            </p>
            <p>
              Every shoot is a tactile journey into 19th-century ballistics. Shooters carefully measure each charge of authentic black powder, lubricate soft cotton drill patches with traditional mutton tallow or beeswax recipes, and seat swaged lead round balls with hickory ramrods.
            </p>
            <p>
              Our members range from certified master gunsmiths and historical researchers to enthusiastic weekend novices. What binds us all is a shared reverence for safe marksmanship, craftsmanship, and good old-fashioned Australian bush hospitality.
            </p>

            <div className="pt-2">
              <button
                onClick={onExploreDisciplines}
                className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-wider text-[#8C3A16] hover:text-[#C0633C] border-b border-[#C0633C] pb-0.5"
              >
                <span>Discover our four shooting disciplines</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-sm overflow-hidden border border-[#D5C2A7] shadow-xl">
              <img
                src={CLUB_IMAGES.historicShooters}
                alt="Colonial Club Shooters"
                className="w-full h-[360px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-[#F2EADA] border-t border-[#D5C2A7] text-xs text-[#5C503F] flex items-center justify-between">
                <span className="font-medium">SCMLC Annual Gathering at Sackville</span>
                <span className="italic">Photo courtesy of Club Archives</span>
              </div>
            </div>

            {/* Official Insignia Feature Card */}
            <div className="bg-[#FAF6EE] border border-[#D5C2A7] p-5 rounded-sm flex items-center gap-5 shadow-sm">
              <div className="shrink-0 p-1 bg-[#152E20] rounded-full border border-[#C5A880]/50 shadow-md">
                <ClubLogo size={82} theme="dark" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C3A16]">
                    Official Insignia
                  </span>
                  <span className="text-[10px] bg-[#0D4827]/10 text-[#0D4827] px-2 py-0.5 rounded font-mono font-medium">
                    EST. 1962
                  </span>
                </div>
                <h4 className="text-sm font-serif font-semibold text-[#152E20]">
                  The Sydney Colonial Muzzle-Loading Club Crest
                </h4>
                <p className="text-xs text-[#5C503F] leading-relaxed">
                  Featuring the crossed percussion muzzle-loaders, heraldic S·M·L·C quadrants, and the Australian kangaroo mark of marksmanship excellence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 65-Year Historical Milestone Timeline */}
        <div className="mt-16 pt-12 border-t border-[#D5C2A7]">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A16] block mb-1">
              Decades of Preservation
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#152E20]">
              The SCMLC Historical Timeline (1962 – Present)
            </h3>
            <p className="text-xs sm:text-sm text-[#5C503F] mt-1">
              Tracing our journey from a small guild of Sydney historical gunsmiths to NSW’s premier black powder club.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLUB_HISTORY_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF6EE] p-5 rounded-sm border border-[#D5C2A7] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#8C3A16] bg-[#8C3A16]/10 px-2.5 py-0.5 rounded inline-block mb-2">
                    {item.year}
                  </span>
                  <h4 className="text-base font-serif font-semibold text-[#152E20] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#4E4436] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Sackville Range */}
      <section className="bg-[#EFE8DA] py-20 border-y border-[#D6C5AD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A16] block mb-2">
              Range Facilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#152E20]">
              The Historic Sackville Range
            </h2>
            <p className="text-sm sm:text-base text-[#564B3B] mt-3 leading-relaxed">
              Situated in the picturesque Hawkesbury sandstone valley, our private range complex offers an idyllic natural retreat compliant with all NSW Firearms Registry range safety certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF6EE] p-8 rounded-sm border border-[#D5C2A7] shadow-sm">
              <div className="w-12 h-12 bg-[#152E20] text-[#C0633C] rounded-sm flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-[#152E20] mb-2">25m to 200m Firing Lines</h3>
              <p className="text-xs sm:text-sm text-[#4E4436] leading-relaxed">
                Dedicated 25m turning-target pistol bays, covered 50m and 100m rifle benches, and a back 200m steel silhouette gong line designed for military Enfields and Whitworth match rifles.
              </p>
            </div>

            <div className="bg-[#FAF6EE] p-8 rounded-sm border border-[#D5C2A7] shadow-sm">
              <div className="w-12 h-12 bg-[#152E20] text-[#C0633C] rounded-sm flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-[#152E20] mb-2">Sporting Clays Valley</h3>
              <p className="text-xs sm:text-sm text-[#4E4436] leading-relaxed">
                Natural bush gully equipped with commercial clay target traps, simulating traditional walked-up game and driven bird flights for muzzle-loading double barrel shotguns.
              </p>
            </div>

            <div className="bg-[#FAF6EE] p-8 rounded-sm border border-[#D5C2A7] shadow-sm">
              <div className="w-12 h-12 bg-[#152E20] text-[#C0633C] rounded-sm flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-[#152E20] mb-2">Heritage Clubhouse & BBQ</h3>
              <p className="text-xs sm:text-sm text-[#4E4436] leading-relaxed">
                Covered pavilion with tea-making facilities, authentic wood-fired camp kitchen, armory inspection tables, and ample spectator verandas sheltered from summer sun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Club Contacts & Address Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A16] block mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#152E20]">
            Club Contacts & Correspondence
          </h2>
          <p className="text-sm sm:text-base text-[#564B3B] mt-3 leading-relaxed">
            Have questions about visiting, renewing your membership, range facilities, or club historical archives? Reach out to our executive committee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Physical Address */}
          <div className="bg-[#FAF6EE] p-6 rounded-sm border border-[#D5C2A7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#152E20] text-[#C0633C] rounded-xs flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A16] block">
                  Range Physical Address
                </span>
                <h3 className="text-lg font-serif text-[#152E20] mt-0.5">
                  Sackville Range
                </h3>
              </div>
              <p className="text-xs text-[#4E4436] leading-relaxed">
                {CLUB_CONTACTS.address.full}
              </p>
              <p className="text-[11px] text-[#7A6B56] italic">
                {CLUB_CONTACTS.address.notes}
              </p>
            </div>

            <a
              href={CLUB_CONTACTS.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C3A16] hover:text-[#C0633C] pt-2 border-t border-[#DECBB5]"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Card 2: Postal Address */}
          <div className="bg-[#FAF6EE] p-6 rounded-sm border border-[#D5C2A7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#152E20] text-[#C5A880] rounded-xs flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A16] block">
                  Postal Correspondence
                </span>
                <h3 className="text-lg font-serif text-[#152E20] mt-0.5">
                  Mail To
                </h3>
              </div>
              <p className="text-xs text-[#4E4436] leading-relaxed">
                Sydney Colonial Muzzle Loading Club<br />
                {CLUB_CONTACTS.mailTo.poBox}<br />
                {CLUB_CONTACTS.mailTo.suburb}, {CLUB_CONTACTS.mailTo.state} {CLUB_CONTACTS.mailTo.postcode}
              </p>
              <p className="text-[11px] text-[#7A6B56]">
                Official mail, regulatory forms, and written postal submissions.
              </p>
            </div>

            <div className="text-[11px] font-mono text-[#7A6B56] pt-2 border-t border-[#DECBB5]">
              NSW 2765, Australia
            </div>
          </div>

          {/* Card 3: Membership Secretary */}
          <div className="bg-[#FAF6EE] p-6 rounded-sm border border-[#D5C2A7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#152E20] text-[#81D89D] rounded-xs flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D4827] block">
                  {CLUB_CONTACTS.membershipSecretary.role}
                </span>
                <h3 className="text-lg font-serif text-[#152E20] mt-0.5">
                  {CLUB_CONTACTS.membershipSecretary.name}
                </h3>
                <span className="text-xs text-[#7A6B56] font-medium">
                  {CLUB_CONTACTS.membershipSecretary.title}
                </span>
              </div>
              <p className="text-xs text-[#4E4436] leading-relaxed">
                {CLUB_CONTACTS.membershipSecretary.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#DECBB5]">
              <a
                href={`mailto:${CLUB_CONTACTS.membershipSecretary.email}`}
                className="text-xs font-semibold text-[#8C3A16] hover:text-[#C0633C] block truncate"
                title={CLUB_CONTACTS.membershipSecretary.email}
              >
                {CLUB_CONTACTS.membershipSecretary.email}
              </a>
            </div>
          </div>

          {/* Card 4: Club Secretary */}
          <div className="bg-[#FAF6EE] p-6 rounded-sm border border-[#D5C2A7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#152E20] text-[#81D89D] rounded-xs flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D4827] block">
                  {CLUB_CONTACTS.clubSecretary.role}
                </span>
                <h3 className="text-lg font-serif text-[#152E20] mt-0.5">
                  {CLUB_CONTACTS.clubSecretary.name}
                </h3>
                <span className="text-xs text-[#7A6B56] font-medium">
                  Executive Committee
                </span>
              </div>
              <p className="text-xs text-[#4E4436] leading-relaxed">
                {CLUB_CONTACTS.clubSecretary.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#DECBB5]">
              <a
                href={`mailto:${CLUB_CONTACTS.clubSecretary.email}`}
                className="text-xs font-semibold text-[#8C3A16] hover:text-[#C0633C] block truncate"
                title={CLUB_CONTACTS.clubSecretary.email}
              >
                {CLUB_CONTACTS.clubSecretary.email}
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Safety & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-[#152E20] text-[#F7F4EE] p-8 sm:p-12 lg:p-16 rounded-sm shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C0633C] uppercase">
                <Shield className="w-4 h-4" />
                <span>Range Safety Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif">
                Uncompromising Safety in Every Grain
              </h2>
              <p className="text-sm sm:text-base text-[#D0DEC9] font-light leading-relaxed max-w-2xl">
                Because black powder operates with low pressures but open handling, SCMLC strictly enforces pre-measured powder charging, designated capping lines, and certified Range Officer oversight. We are proud of our unbroken multi-decade safety record.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={onOpenRegister}
                className="w-full bg-[#C0633C] hover:bg-[#A9532F] text-white py-3.5 rounded text-xs font-semibold tracking-[0.14em] uppercase text-center transition-colors"
              >
                REGISTER VISITOR DAY
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
