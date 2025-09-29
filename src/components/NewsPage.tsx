import React, { useState } from 'react';
import { Flame, Filter } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { newsService } from '../services/newsService';
import { NewsItem } from '../types/news';

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'movie' | 'series' | 'anime' | 'game'>('all');
  const [showBreakingOnly, setShowBreakingOnly] = useState(false);

  const getFilteredNews = (): NewsItem[] => {
    let news = newsService.getAllNews();
    
    if (showBreakingOnly) {
      news = news.filter(item => item.isBreaking);
    }
    
    if (selectedCategory !== 'all') {
      news = news.filter(item => item.category === selectedCategory);
    }
    
    return news;
  };

  const categories = [
    { key: 'all' as const, label: 'All News', emoji: '📰' },
    { key: 'movie' as const, label: 'Movies', emoji: '🎬' },
    { key: 'series' as const, label: 'Series', emoji: '📺' },
    { key: 'anime' as const, label: 'Anime', emoji: '🎌' },
    { key: 'game' as const, label: 'Games', emoji: '🎮' },
  ];

  const filteredNews = getFilteredNews();

  return (
    <div className="min-h-screen bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-black text-white">Entertainment News</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news and viral stories from the world of movies, series, anime, and games
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 font-medium">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      selectedCategory === category.key
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <span>{category.emoji}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Breaking News Toggle */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 font-medium">Breaking Only:</span>
              <button
                onClick={() => setShowBreakingOnly(!showBreakingOnly)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  showBreakingOnly
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Flame className={`w-4 h-4 ${showBreakingOnly ? 'animate-pulse' : ''}`} />
                <span>Breaking News</span>
              </button>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">No news found</h3>
            <p className="text-gray-500">
              {showBreakingOnly 
                ? 'No breaking news matches your current filters.' 
                : 'No news articles match your current filters.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setShowBreakingOnly(false);
              }}
              className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};