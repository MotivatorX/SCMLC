import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Menu, X, Calendar, ShieldCheck, BookOpen, Target, Sparkles, Lock, Unlock } from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { NavScreen } from '../types';

interface NavbarProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  onOpenRegister: () => void;
  onSelectDiscipline?: (disciplineId: string) => void;
  onOpenPrivacyNotice?: () => void;
  isAdmin?: boolean;
  onLogout?: () => void;
}

type DropdownMenu = 'club' | 'disciplines' | null;

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenRegister,
  onSelectDiscipline,
  onOpenPrivacyNotice,
  isAdmin,
  onLogout,
}) => {
  const [openDropdown, setOpenDropdown] = useState<DropdownMenu>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const clubContainerRef = useRef<HTMLDivElement>(null);
  const discContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown helper
  const closeAllDropdowns = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(null);
  }, []);

  // Open a dropdown and clear any pending close timer
  const handleMouseEnter = (menu: 'club' | 'disciplines') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(menu);
  };

  // Immediate or brief mouse leave closure
  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  const handleToggleClick = (e: React.MouseEvent, menu: 'club' | 'disciplines') => {
    e.stopPropagation();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  // Close on outside click, escape key, and scroll
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideClub = clubContainerRef.current?.contains(target);
      const isInsideDisc = discContainerRef.current?.contains(target);
      if (!isInsideClub && !isInsideDisc) {
        closeAllDropdowns();
      }
    };

    const handleScroll = () => {
      if (openDropdown !== null) {
        closeAllDropdowns();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('touchstart', handleDocumentClick, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [openDropdown, closeAllDropdowns]);

  return (
    <header className="sticky top-0 z-40 bg-[#152E20] border-b border-[#1f402c] shadow-md">
      {/* Invisible backdrop when any desktop dropdown is open to guarantee instant dismissal on outside click */}
      {openDropdown !== null && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={closeAllDropdowns}
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50">
        {/* Left: Brand / Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => {
            closeAllDropdowns();
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          aria-label="Sydney Colonial Muzzle Loading Club Home"
        >
          <ClubLogo size={52} showText={false} theme="dark" />
          <div className="hidden sm:flex flex-col">
            <span className="text-[13px] tracking-[0.22em] font-semibold text-[#F7F4EE] uppercase leading-tight font-sans group-hover:text-[#EAE2D2] transition-colors">
              Sydney Colonial
            </span>
            <span className="text-[11px] tracking-[0.16em] text-[#C4B79B] uppercase font-serif">
              Muzzle Loading Club · Est. 1962
            </span>
          </div>
        </button>

        {/* Center/Right: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {/* THE CLUB Dropdown */}
          <div
            ref={clubContainerRef}
            className="relative"
            onMouseEnter={() => handleMouseEnter('club')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              id="nav-club-btn"
              onClick={(e) => handleToggleClick(e, 'club')}
              aria-expanded={openDropdown === 'club'}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3 py-2 text-[12px] xl:text-[13px] tracking-[0.12em] font-medium uppercase transition-colors rounded-sm cursor-pointer ${
                currentScreen === 'club' || openDropdown === 'club'
                  ? 'text-[#EAE2D2] font-semibold'
                  : 'text-[#EAE2D2]/80 hover:text-white'
              }`}
            >
              <span>THE CLUB</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openDropdown === 'club' ? 'rotate-180 text-[#C0633C]' : 'opacity-70'
                }`}
              />
            </button>

            {openDropdown === 'club' && (
              <div
                className="absolute left-0 mt-1 w-64 bg-[#112519] border border-[#234530] shadow-2xl py-2 rounded-sm z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    onNavigate('club');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-[#EAE2D2] hover:bg-[#1a3826] hover:text-white flex items-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C0633C]" />
                  <div>
                    <div className="font-medium tracking-wide">Our Story & Heritage</div>
                    <div className="text-[10px] text-[#A69980]">Founded 1962 in Sydney</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    onNavigate('club');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-[#EAE2D2] hover:bg-[#1a3826] hover:text-white flex items-center gap-2.5 cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-[#C0633C]" />
                  <div>
                    <div className="font-medium tracking-wide">The Sackville Range</div>
                    <div className="text-[10px] text-[#A69980]">Hawkesbury Valley facilities</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    onNavigate('members');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-[#EAE2D2] hover:bg-[#1a3826] hover:text-white flex items-center gap-2.5 border-t border-[#1f3f2a] cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C0633C]" />
                  <div>
                    <div className="font-medium tracking-wide">Safety & Standing Orders</div>
                    <div className="text-[10px] text-[#A69980]">Black powder range rules</div>
                  </div>
                </button>
                {onOpenPrivacyNotice && (
                  <button
                    onClick={() => {
                      closeAllDropdowns();
                      onOpenPrivacyNotice();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-[#EAE2D2] hover:bg-[#1a3826] hover:text-white flex items-center gap-2.5 border-t border-[#1f3f2a] cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#81D89D]" />
                    <div>
                      <div className="font-medium tracking-wide text-[#FAF6EE]">Privacy Collection Notice</div>
                      <div className="text-[10px] text-[#81D89D]">9 plain-language disclosures</div>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* DISCIPLINES Dropdown */}
          <div
            ref={discContainerRef}
            className="relative"
            onMouseEnter={() => handleMouseEnter('disciplines')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              id="nav-disciplines-btn"
              onClick={(e) => handleToggleClick(e, 'disciplines')}
              aria-expanded={openDropdown === 'disciplines'}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3 py-2 text-[12px] xl:text-[13px] tracking-[0.12em] font-medium uppercase transition-colors rounded-sm cursor-pointer ${
                currentScreen === 'disciplines' || openDropdown === 'disciplines'
                  ? 'text-[#EAE2D2] font-semibold'
                  : 'text-[#EAE2D2]/80 hover:text-white'
              }`}
            >
              <span>DISCIPLINES</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openDropdown === 'disciplines' ? 'rotate-180 text-[#C0633C]' : 'opacity-70'
                }`}
              />
            </button>

            {openDropdown === 'disciplines' && (
              <div
                className="absolute left-0 mt-1 w-72 bg-[#112519] border border-[#234530] shadow-2xl py-2 rounded-sm z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    onNavigate('disciplines');
                    if (onSelectDiscipline) onSelectDiscipline('single-action');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-[#EAE2D2] hover:bg-[#1a3826] hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="font-medium text-[#FAF4EE]">01 Single Action</div>
                    <div className="text-[10px] text-[#A69980]">Frontier scenario & steel match</div>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C0633C] font-semibold">1st Sun</span>
                </button>
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    onNavigate('disciplines');
                    if (onSelectDiscipline) onSelectDiscipline('pistol-events');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-[#EAE2D2] hover:bg-[#1a3826] hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="font-medium text-[#FAF4EE]">02 Pistol Events</div>
                    <div className="text-[10px] text-[#A69980]">Flintlock & percussion 25m precision</div>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C0633C] font-semibold">1st Sun</span>
                </button>
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    onNavigate('disciplines');
                    if (onSelectDiscipline) onSelectDiscipline('rifle-events');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-[#EAE2D2] hover:bg-[#1a3826] hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="font-medium text-[#FAF4EE]">03 Rifle Events</div>
                    <div className="text-[10px] text-[#A69980]">50m, 100m & 200m Enfields, Hawken</div>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C0633C] font-semibold">1st Sun</span>
                </button>
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    onNavigate('disciplines');
                    if (onSelectDiscipline) onSelectDiscipline('shotgun-events');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-[#EAE2D2] hover:bg-[#1a3826] hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="font-medium text-[#FAF4EE]">04 Shotgun Events</div>
                    <div className="text-[10px] text-[#A69980]">Black powder muzzle-loading clays</div>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C0633C] font-semibold">1st Sun</span>
                </button>
              </div>
            )}
          </div>

          {/* EVENT CALENDAR Link */}
          <button
            id="nav-calendar-btn"
            onClick={() => {
              closeAllDropdowns();
              onNavigate('calendar');
            }}
            className={`px-3 py-2 text-[12px] xl:text-[13px] tracking-[0.12em] font-medium uppercase transition-colors rounded-sm cursor-pointer ${
              currentScreen === 'calendar'
                ? 'text-[#EAE2D2] font-semibold'
                : 'text-[#EAE2D2]/80 hover:text-white'
            }`}
          >
            EVENT CALENDAR
          </button>

          {/* JOURNAL AND POSTS Link */}
          <button
            id="nav-journal-btn"
            onClick={() => {
              closeAllDropdowns();
              onNavigate('journal');
            }}
            className={`px-3 py-2 text-[12px] xl:text-[13px] tracking-[0.12em] font-medium uppercase transition-colors rounded-sm cursor-pointer ${
              currentScreen === 'journal'
                ? 'text-[#EAE2D2] font-semibold'
                : 'text-[#EAE2D2]/80 hover:text-white'
            }`}
          >
            JOURNAL & POSTS
          </button>

          {/* MEMBERS AREA Link */}
          <button
            id="nav-members-btn"
            onClick={() => {
              closeAllDropdowns();
              onNavigate('members');
            }}
            className={`px-3 py-2 text-[12px] xl:text-[13px] tracking-[0.12em] font-medium uppercase transition-colors rounded-sm cursor-pointer ${
              currentScreen === 'members'
                ? 'text-[#EAE2D2] font-semibold'
                : 'text-[#EAE2D2]/80 hover:text-white'
            }`}
          >
            MEMBERS AREA
          </button>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#1f402c]">
              <button
                onClick={() => {
                  closeAllDropdowns();
                  onNavigate('members');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0E2016] hover:bg-[#163522] border border-[#264D35] hover:border-[#81D89D]/40 text-[#81D89D] text-[11px] xl:text-xs uppercase font-semibold tracking-wider rounded-xs transition-colors cursor-pointer"
                title="Admin Active - Manage uploads and calendar"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Admin Active</span>
              </button>
              {onLogout && (
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    onLogout();
                  }}
                  className="p-1.5 text-[#A6BAAE] hover:text-[#FFA294] transition-colors cursor-pointer"
                  title="Log out of Admin"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* REGISTER INTEREST Button (Terracotta/Rust button) */}
          <button
            id="nav-register-interest-btn"
            onClick={() => {
              closeAllDropdowns();
              onOpenRegister();
            }}
            className="ml-3 xl:ml-5 bg-[#C0633C] hover:bg-[#A9532F] text-white px-5 py-2.5 rounded text-[12px] xl:text-[13px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
          >
            REGISTER INTEREST
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => {
              closeAllDropdowns();
              onOpenRegister();
            }}
            className="bg-[#C0633C] hover:bg-[#A9532F] text-white px-3 py-1.5 rounded text-[11px] font-semibold tracking-[0.1em] uppercase cursor-pointer"
          >
            REGISTER
          </button>
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => {
              closeAllDropdowns();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-[#EAE2D2] hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#112519] border-t border-[#20422d] px-4 pt-3 pb-6 space-y-3 relative z-50">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left py-2 text-sm tracking-wider uppercase font-medium ${
              currentScreen === 'home' ? 'text-[#C0633C]' : 'text-[#EAE2D2]'
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => {
              onNavigate('club');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left py-2 text-sm tracking-wider uppercase font-medium ${
              currentScreen === 'club' ? 'text-[#C0633C]' : 'text-[#EAE2D2]'
            }`}
          >
            THE CLUB & SACKVILLE RANGE
          </button>
          <button
            onClick={() => {
              onNavigate('disciplines');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left py-2 text-sm tracking-wider uppercase font-medium ${
              currentScreen === 'disciplines' ? 'text-[#C0633C]' : 'text-[#EAE2D2]'
            }`}
          >
            DISCIPLINES (01-04)
          </button>
          <button
            onClick={() => {
              onNavigate('calendar');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left py-2 text-sm tracking-wider uppercase font-medium ${
              currentScreen === 'calendar' ? 'text-[#C0633C]' : 'text-[#EAE2D2]'
            }`}
          >
            EVENT CALENDAR
          </button>
          <button
            onClick={() => {
              onNavigate('members');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left py-2 text-sm tracking-wider uppercase font-medium ${
              currentScreen === 'members' ? 'text-[#C0633C]' : 'text-[#EAE2D2]'
            }`}
          >
            MEMBERS AREA & STANDING ORDERS
          </button>
          <button
            onClick={() => {
              onNavigate('journal');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left py-2 text-sm tracking-wider uppercase font-medium ${
              currentScreen === 'journal' ? 'text-[#C0633C]' : 'text-[#EAE2D2]'
            }`}
          >
            JOURNAL AND POSTS
          </button>
          {onOpenPrivacyNotice && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrivacyNotice();
              }}
              className="w-full text-left py-2 text-sm tracking-wider uppercase font-medium text-[#81D89D] flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#81D89D]" />
              <span>PRIVACY COLLECTION NOTICE</span>
            </button>
          )}
          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full bg-[#C0633C] text-white py-3 rounded text-center font-semibold text-xs tracking-widest uppercase shadow-md cursor-pointer"
            >
              REGISTER INTEREST / VISIT RANGE
            </button>

            {/* Mobile Admin Link */}
            {isAdmin ? (
              <div className="pt-2 border-t border-[#20422d] flex items-center justify-between">
                <button
                  onClick={() => {
                    onNavigate('members');
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs uppercase font-bold text-[#81D89D] flex items-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Admin Active (Uploads & Calendar)</span>
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-[#FFA294] hover:text-[#FF6655] underline uppercase cursor-pointer"
                  >
                    Log Out
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  onNavigate('members');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left pt-2 text-xs text-[#A6BAAE] hover:text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-t border-[#20422d]"
              >
                <Lock className="w-3 h-3 text-[#C0633C]" />
                <span>Administrator Portal Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
