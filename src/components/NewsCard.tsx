import React, { useState } from 'react';
import { Clock, User, ExternalLink, Flame, ChevronRight, ChevronLeft } from 'lucide-react';
import { NewsItem } from '../types/news';
import { NewsModal } from './NewsModal';

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
        <p key={index} className="text-gray-300 text-sm leading-relaxed mb-3">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-700 w-full ${
      isExpanded 
        ? 'transform scale-100' 
        : 'hover:scale-[1.02]'
    }`}>
      {/* Image Header */}
      <div className={`relative overflow-hidden transition-all duration-500 ${
        isExpanded ? 'h-64' : 'h-48'
      }`}>
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Black Bookmark Ribbon */}
        <div className="absolute top-0 right-6 w-16 h-24 bg-black shadow-lg"
             style={{
               clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)'
             }}>
          <div className="flex items-center justify-center h-full pt-2">
            <span className="text-white text-xs font-bold transform -rotate-90">NEWS</span>
          </div>
        </div>
        
        {/* Breaking/Category Badges */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          {news.isBreaking && (
            <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded-full">
              <Flame className="w-3 h-3 text-white animate-pulse" />
              <span className="text-white font-bold text-xs uppercase">
                Breaking
              </span>
            </div>
          )}
          <div className={`${getCategoryColor(news.category)} px-2 py-1 rounded-full flex items-center space-x-1`}>
            <span className="text-white text-xs">
              {getCategoryEmoji(news.category)}
            </span>
            <span className="text-white font-semibold text-xs uppercase">
              {news.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`transition-all duration-500 ${isExpanded ? 'p-8' : 'p-6'}`}>
        <div className={`${isExpanded ? 'flex gap-8' : 'flex gap-6'}`}>
          {/* Left Column - Main Content */}
          <div className={`${isExpanded ? 'flex-1' : 'flex-1'}`}>
            {/* Title */}
            <h3 className={`font-bold text-white mb-3 leading-tight transition-all duration-300 ${
              isExpanded ? 'text-2xl' : 'text-xl line-clamp-2'
            }`}>
              {news.title}
            </h3>

            {/* Excerpt */}
            <p className={`text-gray-300 text-sm mb-4 leading-relaxed transition-all duration-300 ${
              isExpanded ? '' : 'line-clamp-3'
            }`}>
              {news.excerpt}
            </p>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="mb-6 animate-in fade-in duration-500">
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h4 className="text-white font-semibold mb-3">Full Article Preview</h4>
                  <div className="max-h-40 overflow-y-auto">
                    {formatContent(news.content)}
                  </div>
                </div>
              </div>
            )}

            {/* Meta Information */}
            <div className={`flex items-center mb-4 text-xs text-gray-400 transition-all duration-300 ${
              isExpanded ? 'space-x-6' : 'space-x-4'
            }`}>
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(news.publishedAt)}</span>
              </div>
              {news.readTime && (
                <span>{news.readTime} min read</span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {(isExpanded ? news.tags : news.tags.slice(0, 3)).map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-medium hover:bg-gray-600 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {!isExpanded && news.tags.length > 3 && (
                <span className="text-gray-500 text-xs py-1">
                  +{news.tags.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Right Column - Always present but conditional content */}
          <div className={`flex-shrink-0 transition-all duration-500 ${
            isExpanded ? 'w-80 opacity-100' : 'w-20 opacity-50'
          }`}>
            {isExpanded ? (
              <div className="animate-in slide-in-from-right duration-500">
                <div className="bg-gray-700/30 rounded-lg p-4 mb-4">
                  <h4 className="text-white font-semibold mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Full Article</span>
                    </button>
                    {news.sourceUrl && (
                      <button 
                        onClick={() => window.open(news.sourceUrl, '_blank')}
                        className="w-full bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Original Source</span>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Category</h4>
                  <div className={`${getCategoryColor(news.category)} px-3 py-2 rounded-full flex items-center space-x-2 justify-center`}>
                    <span className="text-white text-sm">
                      {getCategoryEmoji(news.category)}
                    </span>
                    <span className="text-white font-semibold text-sm uppercase">
                      {news.category}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className={`${getCategoryColor(news.category)} p-3 rounded-full mb-2`}>
                  <span className="text-white text-lg">
                    {getCategoryEmoji(news.category)}
                  </span>
                </div>
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                  {news.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Expand/Collapse Toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-all duration-200 cursor-pointer mt-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                {isExpanded ? (
                  <ChevronLeft className="w-4 h-4 text-white" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="text-left">
                <h4 className="text-white font-semibold text-sm">
                  {isExpanded ? 'Collapse Article' : 'Expand to Read More'}
                </h4>
                <p className="text-gray-400 text-xs">
                  {isExpanded 
                    ? 'Click to collapse and see less content' 
                    : 'Click to expand and see full preview'
                  }
                </p>
              </div>
            </div>
            <div className="text-gray-400">
              {isExpanded ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </div>
          </div>
        </button>
      </div>

      {/* News Modal */}
      <NewsModal
        news={news}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};