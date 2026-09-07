import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Sparkles,
  Tag,
  Share2,
} from 'lucide-react';
import { JournalArticle } from '../../types';
import { JournalEditorModal } from '../modals/JournalEditorModal';
import { ClubLogo } from '../ClubLogo';

interface JournalScreenProps {
  articles: JournalArticle[];
  onUpdateArticles: (newArticles: JournalArticle[]) => void;
  isAdmin: boolean;
  onNavigateToMembers?: () => void;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({
  articles,
  onUpdateArticles,
  isAdmin,
  onNavigateToMembers,
}) => {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Collect all unique tags
  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags || []))
  );

  const filteredArticles = selectedTag
    ? articles.filter((a) => a.tags && a.tags.includes(selectedTag))
    : articles;

  const handleCreateNew = () => {
    setEditingArticle(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (article: JournalArticle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingArticle(article);
    setIsEditorOpen(true);
  };

  const handleDelete = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Are you sure you want to remove this journal article?')) {
      const updated = articles.filter((a) => a.id !== articleId);
      onUpdateArticles(updated);
      if (activeArticle && activeArticle.id === articleId) {
        setActiveArticle(null);
      }
    }
  };

  const handleSaveArticle = (savedArticle: JournalArticle) => {
    const exists = articles.some((a) => a.id === savedArticle.id);
    let updated: JournalArticle[];
    if (exists) {
      updated = articles.map((a) => (a.id === savedArticle.id ? savedArticle : a));
    } else {
      updated = [savedArticle, ...articles];
    }
    onUpdateArticles(updated);
    if (activeArticle && activeArticle.id === savedArticle.id) {
      setActiveArticle(savedArticle);
    }
  };

  return (
    <div className="bg-[#FAF6EE] text-[#1C1917] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#152E20] text-[#F7F4EE] py-16 sm:py-20 border-b border-[#234832] relative overflow-hidden">
        {/* Watermark Crest */}
        <div className="absolute right-[-20px] top-[-20px] opacity-15 pointer-events-none hidden lg:block select-none">
          <ClubLogo size={420} theme="dark" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1 bg-[#0E2016] rounded-full border border-[#C5A880]/50 shadow-sm shrink-0">
                  <ClubLogo size={36} theme="dark" />
                </div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C0633C]">
                  Heritage Journal & Living Craftsmanship · Est. 1962
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-4">
                Journal and Posts
              </h1>
              <p className="text-base sm:text-lg text-[#D5E2D0] max-w-2xl font-light">
                Essays, historical ballistics, gunsmithing craft, match reports, and living histories from sixty-five years of muzzle-loading in the Hawkesbury basin.
              </p>
            </div>

            {isAdmin && (
              <div className="shrink-0">
                <button
                  onClick={handleCreateNew}
                  className="px-5 py-3 bg-[#C0633C] hover:bg-[#8C3A16] text-[#FAF6EE] rounded-xs text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Craft Essay</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Article Detail View */}
        {activeArticle ? (
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 md:p-12 rounded-sm border border-[#D5C2A7] shadow-md animate-in fade-in duration-200">
            {/* Top Navigation / Admin Controls */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#DECBB5]">
              <button
                onClick={() => setActiveArticle(null)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C3A16] hover:text-[#C0633C] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all essays</span>
              </button>

              {isAdmin && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(activeArticle)}
                    className="px-3 py-1.5 bg-[#FAF6EE] hover:bg-[#F2EADA] text-[#152E20] border border-[#DECBB5] rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#8C3A16]" />
                    <span>Edit Article</span>
                  </button>
                  <button
                    onClick={(e) => handleDelete(activeArticle.id, e)}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xs cursor-pointer transition-colors"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Byline & Title */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A6B56] mb-3">
                <span className="flex items-center gap-1.5 font-medium text-[#152E20]">
                  <User className="w-3.5 h-3.5 text-[#C0633C]" />
                  {activeArticle.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.readTime}
                </span>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#152E20] leading-tight mb-3">
                {activeArticle.title}
              </h2>
              {activeArticle.subtitle && (
                <p className="text-lg sm:text-xl text-[#64523B] font-serif italic">
                  {activeArticle.subtitle}
                </p>
              )}
            </div>

            {/* Featured Image */}
            {activeArticle.image && (
              <div className="my-8 rounded-sm overflow-hidden border border-[#D5C2A7] shadow-sm">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full max-h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-6 text-base sm:text-lg text-[#383025] leading-relaxed font-light font-serif">
              {activeArticle.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags Footer */}
            {activeArticle.tags && activeArticle.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[#DECBB5] flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A16] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Tags:
                </span>
                {activeArticle.tags.map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      setSelectedTag(tag);
                      setActiveArticle(null);
                    }}
                    className="text-xs bg-[#F2EADA] hover:bg-[#E7DAC7] text-[#554632] px-3 py-1 rounded cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Article Grid View */
          <div className="space-y-8">
            {/* Tag Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DECBB5]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A6B56] mr-1">
                  Topics:
                </span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    selectedTag === null
                      ? 'bg-[#152E20] text-[#F7F4EE]'
                      : 'bg-white text-[#544837] border border-[#DECBB5] hover:bg-[#F2EADA]'
                  }`}
                >
                  All ({articles.length})
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      selectedTag === tag
                        ? 'bg-[#8C3A16] text-white'
                        : 'bg-white text-[#544837] border border-[#DECBB5] hover:bg-[#F2EADA]'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {isAdmin && (
                <div className="text-xs text-[#0D4827] font-semibold bg-[#0D4827]/10 px-3 py-1.5 rounded flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#0D4827]" />
                  <span>Admin Posting Mode: Click "Post New" or hover to edit</span>
                </div>
              )}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="bg-[#FAF6EE] hover:bg-[#F3ECE0] border border-[#DECBB5] hover:border-[#C0633C] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-lg hover:-translate-y-1 relative"
                >
                  {/* Card Thumbnail */}
                  <div>
                    <div className="h-52 overflow-hidden relative bg-[#152E20]/10">
                      <img
                        src={article.image || '/src/assets/images/historic_shooters_1788140102348.jpg'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95]"
                        referrerPolicy="no-referrer"
                      />

                      {/* Admin Quick Action Floating Buttons */}
                      {isAdmin && (
                        <div
                          className="absolute top-2 right-2 flex items-center gap-1.5 bg-[#152E20]/90 backdrop-blur-xs p-1 rounded shadow-md opacity-90 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => handleEdit(article, e)}
                            className="p-1 text-[#D5E2D0] hover:text-white hover:bg-[#234832] rounded cursor-pointer"
                            title="Edit this post"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(article.id, e)}
                            className="p-1 text-red-300 hover:text-red-100 hover:bg-red-900/50 rounded cursor-pointer"
                            title="Delete this post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-[#8C3A16] font-semibold mb-2">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-xl font-serif text-[#152E20] group-hover:text-[#C0633C] transition-colors mb-2 leading-snug">
                        {article.title}
                      </h3>

                      {article.subtitle && (
                        <div className="text-xs text-[#64523B] font-serif italic mb-2 line-clamp-1">
                          {article.subtitle}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-[#544837] leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#8C3A16] border-t border-[#DECBB5]/40 mt-4">
                    <span className="group-hover:underline">Read Craft Essay</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16 bg-white border border-[#DECBB5] rounded-sm p-8">
                <BookOpen className="w-12 h-12 text-[#DECBB5] mx-auto mb-3" />
                <h3 className="text-lg font-serif text-[#152E20] mb-1">No articles found in this category</h3>
                <p className="text-xs text-[#7A6B56] mb-4">Try selecting a different topic or clear the filter.</p>
                <button
                  onClick={() => setSelectedTag(null)}
                  className="px-4 py-2 bg-[#152E20] text-[#FAF6EE] text-xs font-semibold rounded-xs"
                >
                  Show All Articles
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Admin Journal Editor Modal */}
      <JournalEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingArticle(null);
        }}
        onSaveArticle={handleSaveArticle}
        onDeleteArticle={(id) => handleDelete(id)}
        editingArticle={editingArticle}
      />
    </div>
  );
};
