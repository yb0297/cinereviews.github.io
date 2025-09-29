import React from 'react';
import { Clock, User, ExternalLink, Flame } from 'lucide-react';
import { NewsItem } from '../types/news';

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
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
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
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

        {/* Read More Button */}
        <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
          <span>Read Full Story</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};