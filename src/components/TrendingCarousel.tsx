import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Star, Play } from 'lucide-react';
import { Movie } from '../types/movie';

interface TrendingCarouselProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ movies, onMovieClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, movies.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative overflow-hidden bg-gray-900 rounded-xl shadow-2xl">
      {/* Main Carousel */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className="w-full flex-shrink-0 relative h-[400px] cursor-pointer"
            onClick={() => onMovieClick(movie)}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${movie.backdrop_path || movie.poster_path})`,
              }}
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  {/* Trending Badge */}
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    <span className="text-red-500 font-semibold text-sm uppercase tracking-wide">
                      #{index + 1} Trending Now
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    {movie.title}
                  </h2>

                  {/* Movie Info */}
                  <div className="flex items-center space-x-4 mb-4 text-white/80">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span>•</span>
                    <span className="bg-blue-600 px-2 py-1 rounded text-xs font-semibold">
                      {movie.isGame ? 'Game' : movie.isSeries ? 'Series' : movie.isAnime ? 'Anime' : 'Movie'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/90 text-lg mb-6 leading-relaxed line-clamp-3 max-w-lg">
                    {movie.overview}
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMovieClick(movie);
                    }}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-red-500 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div 
          className="h-full bg-red-500 transition-all duration-300"
          style={{ 
            width: `${((currentIndex + 1) / movies.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};