import React from 'react';
import { X, Calendar, User, Clock, ExternalLink, Flame } from 'lucide-react';
import { NewsItem } from '../types/news';

interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, isOpen, onClose }) => {
  if (!isOpen || !news) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'movie': return 'bg-red-500';
      case 'series': return 'bg-blue-500';
      case 'anime': return 'bg-purple-500';
      case 'game': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'movie': return '🎬';
      case 'series': return '📺';
      case 'anime': return '🎌';
      case 'game': return '🎮';
      default: return '📰';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      return (
        <p key={index} className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose mb-4 md:mb-6 max-w-none">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-1 md:p-4">
      <div className="bg-gray-900 rounded-none md:rounded-2xl shadow-2xl w-full h-full md:w-[95vw] md:h-[95vh] overflow-hidden relative animate-in fade-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-gray-800/90 hover:bg-gray-700 text-white p-3 md:p-4 rounded-full z-20 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        >
          <X className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-full">
          {/* Header Image */}
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            
            {/* Black Bookmark Ribbon */}
            <div className="absolute top-0 right-6 w-16 h-24 bg-black shadow-lg"
                 style={{
                   clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)'
                 }}>
              <div className="flex items-center justify-center h-full pt-2">
                <span className="text-white text-xs font-bold transform -rotate-90">NEWS</span>
              </div>
            </div>
            
            {/* Breaking/Category Badge */}
            <div className="absolute top-6 left-6 flex items-center space-x-3">
              {news.isBreaking && (
                <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
                  <Flame className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-white font-bold text-xs uppercase tracking-wide">
                    Breaking
                  </span>
                </div>
              )}
              <div className={`${getCategoryColor(news.category)} px-3 py-1 rounded-full flex items-center space-x-1`}>
                <span className="text-white text-xs">
                  {getCategoryEmoji(news.category)}
                </span>
                <span className="text-white font-semibold text-xs uppercase tracking-wide">
                  {news.category}
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24 md:py-12">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 md:mb-8 leading-tight max-w-6xl">
              {news.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8 text-sm md:text-base text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>By {news.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatTimeAgo(news.publishedAt)}</span>
              </div>
              {news.readTime && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{news.readTime} min read</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="bg-gray-800 border-l-4 border-orange-500 p-4 md:p-6 lg:p-8 mb-8 md:mb-10 rounded-r-lg max-w-5xl">
              <p className="text-gray-300 text-lg md:text-xl lg:text-2xl italic leading-relaxed">
                {news.excerpt}
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-6xl text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose space-y-4 md:space-y-6">
              {formatContent(news.content)}
            </div>

            {/* Article Image (Additional Image) */}
            <div className="my-8 md:my-12">
              <img
                src={news.imageUrl}
                alt="Article content"
                className="w-full rounded-lg shadow-lg max-h-96 md:max-h-[500px] object-cover"
              />
              <p className="text-gray-500 text-sm md:text-base mt-2 md:mt-4 text-center">
                Related content from {news.category} category
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
              {news.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-800 text-gray-300 px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base font-medium hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Source Link */}
            {news.sourceUrl && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base md:text-lg">Read Original Article</h3>
                    <p className="text-gray-400 text-sm md:text-base">View the complete story on the original source</p>
                  </div>
                  <button
                    onClick={() => window.open(news.sourceUrl, '_blank')}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm md:text-base"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};