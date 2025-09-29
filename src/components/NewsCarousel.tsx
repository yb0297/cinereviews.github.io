import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, ExternalLink, Flame } from 'lucide-react';
import { NewsItem } from '../types/news';

interface NewsCarouselProps {
  news: NewsItem[];
  title?: string;
}

export const NewsCarousel: React.FC<NewsCarouselProps> = ({ news, title = "Latest News" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, news.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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

  if (news.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 text-sm">Stay updated with the latest entertainment news</p>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl">
        {/* Main Carousel */}
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {news.map((item) => (
            <div 
              key={item.id} 
              className="w-full flex-shrink-0 relative h-[600px]"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                }}
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <div className="max-w-3xl">
                    {/* Breaking/Category Badge */}
                    <div className="flex items-center space-x-3 mb-4">
                      {item.isBreaking && (
                        <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
                          <Flame className="w-4 h-4 text-white animate-pulse" />
                          <span className="text-white font-bold text-xs uppercase tracking-wide">
                            Breaking
                          </span>
                        </div>
                      )}
                      <div className={`${getCategoryColor(item.category)} px-3 py-1 rounded-full flex items-center space-x-1`}>
                        <span className="text-white text-xs">
                          {getCategoryEmoji(item.category)}
                        </span>
                        <span className="text-white font-semibold text-xs uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-2xl mb-10 leading-relaxed max-w-4xl">
                      {item.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center space-x-6 mb-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(item.publishedAt)}</span>
                      </div>
                      {item.readTime && (
                        <span>{item.readTime} min read</span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                      <span>Read Full Story</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {news.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {news.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
            style={{ 
              width: `${((currentIndex + 1) / news.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};