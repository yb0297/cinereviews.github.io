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
        <p key={index} className="text-gray-300 text-base leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full z-10 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header Image */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            
            {/* Black Bookmark Ribbon */}
            <div className="absolute top-0 right-6 w-16 h-20 bg-black shadow-lg">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black"></div>
              <div className="flex items-center justify-center h-full">
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
          <div className="p-8">
            {/* Title */}
            <h1 className="text-4xl font-black text-white mb-6 leading-tight">
              {news.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center space-x-6 mb-8 text-sm text-gray-400">
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
            <div className="bg-gray-800 border-l-4 border-orange-500 p-6 mb-8 rounded-r-lg">
              <p className="text-gray-300 text-lg italic leading-relaxed">
                {news.excerpt}
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none">
              {formatContent(news.content)}
            </div>

            {/* Article Image (Additional Image) */}
            <div className="my-8">
              <img
                src={news.imageUrl}
                alt="Article content"
                className="w-full rounded-lg shadow-lg"
              />
              <p className="text-gray-500 text-sm mt-2 text-center">
                Related content from {news.category} category
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {news.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Source Link */}
            {news.sourceUrl && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold mb-1">Read Original Article</h3>
                    <p className="text-gray-400 text-sm">View the complete story on the original source</p>
                  </div>
                  <button
                    onClick={() => window.open(news.sourceUrl, '_blank')}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-4 h-4" />
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