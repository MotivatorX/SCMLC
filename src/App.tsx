/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NoticeboardBanner } from './components/NoticeboardBanner';
import { FourWaysToShoot } from './components/FourWaysToShoot';
import { ComeForTheCraft } from './components/ComeForTheCraft';
import { NextOnCalendar } from './components/NextOnCalendar';
import { HistoryAndNewsFeed } from './components/HistoryAndNewsFeed';
import { OldWaysOpenMinds } from './components/OldWaysOpenMinds';
import { Footer } from './components/Footer';

import { ClubScreen } from './components/screens/ClubScreen';
import { DisciplinesScreen } from './components/screens/DisciplinesScreen';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { MembersScreen } from './components/screens/MembersScreen';
import { JournalScreen } from './components/screens/JournalScreen';

import { RegisterInterestModal } from './components/modals/RegisterInterestModal';
import { EventDetailModal } from './components/modals/EventDetailModal';
import { NoticeDetailModal } from './components/modals/NoticeDetailModal';
import { DocumentViewerModal } from './components/modals/DocumentViewerModal';
import { ArticleReaderModal } from './components/modals/ArticleReaderModal';
import { PrivacyCollectionNoticeModal } from './components/modals/PrivacyCollectionNoticeModal';

import { NavScreen, ClubEvent, Notice, UploadedImage, JournalArticle } from './types';
import { NOTICES, UPCOMING_EVENTS, JOURNAL_ARTICLES } from './data/clubData';
import { OfficialDocument } from './data/officialDocuments';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>('single-action');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<OfficialDocument | null>(null);
  const [selectedArticleForModal, setSelectedArticleForModal] = useState<JournalArticle | null>(null);
  const [isPrivacyNoticeOpen, setIsPrivacyNoticeOpen] = useState(false);

  // Admin authentication state (persists across page reloads)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('scmlc_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Dynamic club events (initialized from localStorage or default UPCOMING_EVENTS)
  const [events, setEvents] = useState<ClubEvent[]>(() => {
    try {
      const saved = localStorage.getItem('scmlc_events_v3') || localStorage.getItem('scmlc_events');
      if (saved) {
        const parsed: ClubEvent[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge UPCOMING_EVENTS into parsed list so newly published shotgun calendar events appear immediately
          const existingIds = new Set(parsed.map(e => e.id));
          const combined = [...parsed];
          UPCOMING_EVENTS.forEach(defaultEvt => {
            if (!existingIds.has(defaultEvt.id)) {
              combined.push(defaultEvt);
            } else {
              // Update with enhanced program details if available
              const idx = combined.findIndex(e => e.id === defaultEvt.id);
              if (idx !== -1 && defaultEvt.program && !combined[idx].program) {
                combined[idx] = { ...combined[idx], ...defaultEvt };
              }
            }
          });
          return combined;
        }
      }
    } catch (e) {
      console.error('Error loading events from storage:', e);
    }
    return UPCOMING_EVENTS;
  });

  // Admin uploaded images (persisted in localStorage)
  const [images, setImages] = useState<UploadedImage[]>(() => {
    try {
      const saved = localStorage.getItem('scmlc_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading images from storage:', e);
    }
    return [];
  });

  // Journal Articles & Heritage Craft Posts (persisted in localStorage)
  const [articles, setArticles] = useState<JournalArticle[]>(() => {
    try {
      const saved = localStorage.getItem('scmlc_journal_articles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading journal articles from storage:', e);
    }
    return JOURNAL_ARTICLES;
  });

  // Club Notices (persisted in localStorage)
  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem('scmlc_notices');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map(n => n.id));
          const combined = [...parsed];
          NOTICES.forEach(defaultNotice => {
            if (!existingIds.has(defaultNotice.id)) {
              combined.push(defaultNotice);
            }
          });
          return combined;
        }
      }
    } catch (e) {
      console.error('Error loading notices from storage:', e);
    }
    return NOTICES;
  });

  const handleAdminLogin = (success: boolean) => {
    setIsAdmin(success);
    try {
      if (success) {
        localStorage.setItem('scmlc_admin_auth', 'true');
      } else {
        localStorage.removeItem('scmlc_admin_auth');
      }
    } catch {
      // ignore
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('scmlc_admin_auth');
    } catch {
      // ignore
    }
  };

  const handleUpdateEvents = (newEvents: ClubEvent[]) => {
    setEvents(newEvents);
    try {
      localStorage.setItem('scmlc_events', JSON.stringify(newEvents));
    } catch (e) {
      console.error('Error saving events:', e);
    }
  };

  const handleUpdateImages = (newImages: UploadedImage[]) => {
    setImages(newImages);
    try {
      localStorage.setItem('scmlc_images', JSON.stringify(newImages));
    } catch (e) {
      console.error('Error saving images to localStorage:', e);
    }
  };

  const handleUpdateArticles = (newArticles: JournalArticle[]) => {
    setArticles(newArticles);
    try {
      localStorage.setItem('scmlc_journal_articles', JSON.stringify(newArticles));
    } catch (e) {
      console.error('Error saving journal articles to localStorage:', e);
    }
  };

  const handleUpdateNotices = (newNotices: Notice[]) => {
    setNotices(newNotices);
    try {
      localStorage.setItem('scmlc_notices', JSON.stringify(newNotices));
    } catch (e) {
      console.error('Error saving notices to localStorage:', e);
    }
  };

  // Check URL on load and on hash change for shared event links
  useEffect(() => {
    const handleUrlEventCheck = () => {
      try {
        const hash = window.location.hash;
        const searchParams = new URLSearchParams(window.location.search);
        let eventId: string | null = null;

        if (hash.includes('event=')) {
          const match = hash.match(/event=([^&]+)/);
          if (match) eventId = match[1];
        } else if (searchParams.get('event')) {
          eventId = searchParams.get('event');
        }

        if (eventId) {
          const found = events.find(e => e.id === eventId) || UPCOMING_EVENTS.find(e => e.id === eventId);
          if (found) {
            setSelectedEvent(found);
          }
        }
      } catch (err) {
        console.error('Error parsing event from URL:', err);
      }
    };

    handleUrlEventCheck();
    window.addEventListener('hashchange', handleUrlEventCheck);
    window.addEventListener('popstate', handleUrlEventCheck);

    return () => {
      window.removeEventListener('hashchange', handleUrlEventCheck);
      window.removeEventListener('popstate', handleUrlEventCheck);
    };
  }, [events]);

  const handleNavigate = (screen: NavScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
    try {
      if (window.location.hash.startsWith('#event=')) {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeeWhatsOn = () => {
    handleNavigate('calendar');
  };

  const handleSelectDiscipline = (discId: string) => {
    setSelectedDisciplineId(discId);
    handleNavigate('disciplines');
  };

  const handleOpenNoticeboard = () => {
    handleNavigate('members');
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1C1917] flex flex-col font-sans antialiased selection:bg-[#C0633C] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onSelectDiscipline={handleSelectDiscipline}
        onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
        isAdmin={isAdmin}
        onLogout={handleAdminLogout}
      />

      {/* Screen Views */}
      <main className="grow">
        {currentScreen === 'home' && (
          <div className="animate-in fade-in duration-200">
            {/* 1. Hero: "History, in hand." */}
            <Hero
              onSeeWhatsOn={handleSeeWhatsOn}
              onOurStory={() => handleNavigate('club')}
            />

            {/* 2. Noticeboard Banner: "ON THE NOTICEBOARD: 2027 AGM..." */}
            <NoticeboardBanner
              activeNotice={notices[0] || null}
              onOpenNotice={(n) => {
                if (n) {
                  setSelectedNotice(n);
                } else {
                  handleOpenNoticeboard();
                }
              }}
            />

            {/* 3. Four ways to shoot (Single Action, Pistol, Rifle, Shotgun) */}
            <FourWaysToShoot
              onExploreAll={() => handleNavigate('disciplines')}
              onSelectDisciplineDetail={handleSelectDiscipline}
            />

            {/* 4. Come for the craft. Stay for the company. */}
            <ComeForTheCraft onMeetTheClub={() => handleNavigate('club')} />

            {/* 5. Next on the calendar (3 cards: 07 JUN, 14 JUN, 28 JUN) */}
            <NextOnCalendar
              onViewFullCalendar={() => handleNavigate('calendar')}
              onSelectEvent={(evt) => setSelectedEvent(evt)}
              events={events}
            />

            {/* 6. History & News Feed (66th Australian Championships & Dispatches) */}
            <HistoryAndNewsFeed
              articles={articles}
              notices={notices}
              onReadArticle={(art) => setSelectedArticleForModal(art)}
              onNavigateToJournal={() => handleNavigate('journal')}
              onNavigateToClub={() => handleNavigate('club')}
            />

            {/* 7. Old ways. Open minds. */}
            <OldWaysOpenMinds onReadTheJournal={() => handleNavigate('journal')} />
          </div>
        )}

        {currentScreen === 'club' && (
          <ClubScreen
            onOpenRegister={() => setIsRegisterOpen(true)}
            onViewCalendar={() => handleNavigate('calendar')}
            onExploreDisciplines={() => handleNavigate('disciplines')}
          />
        )}

        {currentScreen === 'disciplines' && (
          <DisciplinesScreen
            initialDisciplineId={selectedDisciplineId}
            onOpenRegister={() => setIsRegisterOpen(true)}
            onViewCalendar={() => handleNavigate('calendar')}
          />
        )}

        {currentScreen === 'calendar' && (
          <CalendarScreen
            onSelectEvent={(evt) => setSelectedEvent(evt)}
            onOpenRegister={() => setIsRegisterOpen(true)}
            events={events}
          />
        )}

        {currentScreen === 'members' && (
          <MembersScreen
            onSelectNotice={(notice) => setSelectedNotice(notice)}
            isAdmin={isAdmin}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            events={events}
            onUpdateEvents={handleUpdateEvents}
            images={images}
            onUpdateImages={handleUpdateImages}
            articles={articles}
            onUpdateArticles={handleUpdateArticles}
            notices={notices}
            onUpdateNotices={handleUpdateNotices}
            onNavigateToCalendar={() => handleNavigate('calendar')}
            onOpenDocumentViewer={(doc) => setSelectedDocument(doc)}
            onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
          />
        )}

        {currentScreen === 'journal' && (
          <JournalScreen
            isAdmin={isAdmin}
            articles={articles}
            onUpdateArticles={handleUpdateArticles}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
      />

      {/* Modals & Dialogs */}
      <RegisterInterestModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenFullPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
      />

      <EventDetailModal
        event={selectedEvent}
        onClose={handleCloseEvent}
        onOpenRegister={() => {
          handleCloseEvent();
          setIsRegisterOpen(true);
        }}
      />

      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

      <DocumentViewerModal
        isOpen={!!selectedDocument}
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      <ArticleReaderModal
        article={selectedArticleForModal}
        onClose={() => setSelectedArticleForModal(null)}
        onNavigateToJournal={() => handleNavigate('journal')}
      />

      <PrivacyCollectionNoticeModal
        isOpen={isPrivacyNoticeOpen}
        onClose={() => setIsPrivacyNoticeOpen(false)}
      />
    </div>
  );
}
