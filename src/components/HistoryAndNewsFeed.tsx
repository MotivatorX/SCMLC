import React, { useState } from 'react';
import {
  Shield,
  ChevronRight,
  Clock,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';
import {
  CLUB_HISTORY_TIMELINE,
} from '../data/clubData';
import { JournalArticle, Notice } from '../types';

interface HistoryAndNewsFeedProps {
  articles: JournalArticle[];
  notices?: Notice[];
  onReadArticle: (article: JournalArticle) => void;
  onNavigateToJournal: () => void;
  onNavigateToClub: () => void;
}

export const HistoryAndNewsFeed: React.FC<HistoryAndNewsFeedProps> = ({
  articles,
  notices = [],
  onReadArticle,
  onNavigateToJournal,
  onNavigateToClub,
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'championships' | 'reports' | 'craft' | 'notices'>('all');

  // Filter articles based on selected tab
  const filteredArticles = articles.filter((art) => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'championships') {
      return (
        art.tags.some((t) => /championship|national|trophy/i.test(t)) ||
        art.title.toLowerCase().includes('championship')
      );
    }
    if (selectedTab === 'reports') {
      return (
        art.tags.some((t) => /report|match|rifle|shotgun|hawkesbury/i.test(t)) ||
        art.title.toLowerCase().includes('match') ||
        art.title.toLowerCase().includes('championship')
      );
    }
    if (selectedTab === 'craft') {
      return (
        art.tags.some((t) => /craft|reloading|ballistics|tuning|flintlock/i.test(t)) ||
        art.title.toLowerCase().includes('casting') ||
        art.title.toLowerCase().includes('ignition')
      );
    }
    if (selectedTab === 'notices') {
      return false; // Handled separately in the notice section
    }
    return true;
  });

  return (
    <section className="bg-[#F6F0E4] text-[#1C1917] py-20 lg:py-28 border-b border-[#D8C7B0]" id="history-news-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION 1: CLUB HISTORY & 65-YEAR LIVING HERITAGE TIMELINE                 */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Heritage Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8C3A16]">
                <div className="w-5 h-5 flex items-center justify-center bg-[#152E20] rounded-full text-[#C5A880] shrink-0">
                  <Shield className="w-3 h-3" />
                </div>
                <span>Club History & Living Heritage · Est. 1962</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#152E20] leading-tight">
                65 Years of Black Powder Marksmanship
              </h2>
              <p className="text-sm text-[#4E4436] leading-relaxed">
                Founded in 1962, the Sydney Colonial Muzzle Loading Club stands as one of Australia’s premier historical shooting institutions. We keep the craft, ballistics, and fellowship of Australia’s colonial era vibrant and accessible.
              </p>
              <p className="text-xs text-[#5C503F] leading-relaxed">
                From early Japanese matchlocks and Napoleonic flintlocks to British Enfield service muskets, frontier buffalo guns, and 19th-century percussion revolvers, our members celebrate living history through tactile practice.
              </p>

              <div className="pt-2">
                <button
                  onClick={onNavigateToClub}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C3A16] hover:text-[#C0633C] border-b border-[#8C3A16] pb-1 cursor-pointer"
                >
                  <span>Explore full club history & facilities</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Milestone Timeline Cards */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CLUB_HISTORY_TIMELINE.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF6EE] p-5 rounded-sm border border-[#D5C2A7] shadow-sm hover:border-[#8C3A16]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#8C3A16] bg-[#8C3A16]/10 px-2 py-0.5 rounded inline-block mb-2">
                        {item.year}
                      </span>
                      <h4 className="text-base font-serif font-semibold text-[#152E20] mb-1.5">
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
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: JOURNAL AND POSTS & NEWS FEED                                 */}
        {/* ========================================================================= */}
        <div className="pt-12 border-t border-[#D5C2A7]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0D4827] mb-2">
                <div className="w-5 h-5 flex items-center justify-center bg-[#152E20] rounded-full text-[#C5A880] shrink-0">
                  <BookOpen className="w-3 h-3" />
                </div>
                <span>The Colonial Dispatches · Official Journal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#152E20]">
                Journal and Posts
              </h2>
              <p className="text-xs sm:text-sm text-[#685D4D] mt-1">
                Articles, technical guides, match reports, and colonial dispatches from the firing line.
              </p>
            </div>

            {/* News Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  selectedTab === 'all'
                    ? 'bg-[#152E20] text-white shadow-sm'
                    : 'bg-[#FAF6EE] text-[#5C503F] hover:bg-white border border-[#D5C2A7]'
                }`}
              >
                All News
              </button>
              <button
                onClick={() => setSelectedTab('championships')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  selectedTab === 'championships'
                    ? 'bg-[#152E20] text-white shadow-sm'
                    : 'bg-[#FAF6EE] text-[#5C503F] hover:bg-white border border-[#D5C2A7]'
                }`}
              >
                Championships
              </button>
              <button
                onClick={() => setSelectedTab('reports')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  selectedTab === 'reports'
                    ? 'bg-[#152E20] text-white shadow-sm'
                    : 'bg-[#FAF6EE] text-[#5C503F] hover:bg-white border border-[#D5C2A7]'
                }`}
              >
                Match Reports
              </button>
              <button
                onClick={() => setSelectedTab('craft')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  selectedTab === 'craft'
                    ? 'bg-[#152E20] text-white shadow-sm'
                    : 'bg-[#FAF6EE] text-[#5C503F] hover:bg-white border border-[#D5C2A7]'
                }`}
              >
                Heritage Craft
              </button>
            </div>
          </div>

          {/* News Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onReadArticle(article)}
                className="bg-[#FAF6EE] rounded-sm border border-[#D5C2A7] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-44 overflow-hidden bg-stone-800">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-[#152E20]/90 text-[#D8E4D5] text-[10px] uppercase font-mono px-2 py-0.5 rounded backdrop-blur-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-2.5 right-3 text-[11px] text-[#EAE2D5] font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-[#8C3A16] font-medium">
                      {article.date} · by {article.author}
                    </div>
                    <h3 className="text-lg font-serif font-normal text-[#152E20] group-hover:text-[#8C3A16] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#5C503F] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-[#8C3A16] group-hover:text-[#C0633C] border-t border-[#DECBB5]/60 mt-2">
                  <span>Read full dispatch</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Bar: Go to full journal */}
          <div className="flex justify-center">
            <button
              onClick={onNavigateToJournal}
              className="inline-flex items-center gap-2 bg-transparent border border-[#152E20] hover:bg-[#152E20] text-[#152E20] hover:text-white px-6 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>Visit Full Heritage Journal & Archives</span>
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
