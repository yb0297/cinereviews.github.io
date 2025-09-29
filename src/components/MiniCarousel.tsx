import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Play, Eye, Gamepad2, ShoppingCart } from 'lucide-react';
import { Movie } from '../types/movie';

interface MiniCarouselProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  title: string;
}

export const MiniCarousel: React.FC<MiniCarouselProps> = ({ movies, onMovieClick, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 4000); // Slightly faster than main carousel

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <span>{title}</span>
        </h3>
      </div>
      
      <div className="relative overflow-hidden bg-gray-800 rounded-lg shadow-lg">
        {/* Main Carousel */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="w-full flex-shrink-0 relative h-[250px] cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <div className="max-w-xl">
                    {/* Title */}
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                      {movie.title}
                    </h4>

                    {/* Movie Info */}
                    <div className="flex items-center space-x-3 mb-3 text-white/80">
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
                    <p className="text-white/90 text-sm mb-4 leading-relaxed line-clamp-2 max-w-md">
                      {movie.overview}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {movie.isGame ? (
                        <>
                          {movie.watchLink && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(movie.watchLink, '_blank');
                              }}
                              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 transform hover:scale-105"
                            >
                              <Gamepad2 className="w-4 h-4" />
                              <span>Play</span>
                            </button>
                          )}
                          {movie.buyLink && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(movie.buyLink, '_blank');
                              }}
                              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 transform hover:scale-105"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Buy</span>
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          {movie.watchLink && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(movie.watchLink, '_blank');
                              }}
                              className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 transform hover:scale-105"
                            >
                              <Play className="w-4 h-4 fill-current" />
                              <span>Watch</span>
                            </button>
                          )}
                          {movie.trailerLink && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(movie.trailerLink, '_blank');
                              }}
                              className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 transform hover:scale-105"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Trailer</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {movies.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {movies.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-red-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};