import React, { useState } from 'react';
import { Clock, User, ExternalLink, Flame } from 'lucide-react';
import { NewsItem } from '../types/news';
import { NewsModal } from './NewsModal';

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className="w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
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
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
          {news.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
          {news.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 mb-4 text-xs text-gray-400">
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
          {news.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-medium hover:bg-gray-600 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {news.tags.length > 3 && (
            <span className="text-gray-500 text-xs py-1">
              +{news.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Read Full Story Subcard */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-semibold text-sm">Read Full Story</h4>
                <p className="text-gray-400 text-xs">Click to read the complete article</p>
              </div>
            </div>
            <div className="text-gray-400">
              <ExternalLink className="w-5 h-5" />
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