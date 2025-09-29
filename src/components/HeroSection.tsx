import React from 'react';
import { Play, Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../types/movie';

interface HeroSectionProps {
  featuredMovie: Movie;
  onWatchTrailer: () => void;
  onViewDetails: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  featuredMovie, 
  onWatchTrailer, 
  onViewDetails 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${featuredMovie.backdrop_path || featuredMovie.poster_path})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl transition-all duration-1000 ease-in-out">
            {/* Movie Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {featuredMovie.title}
            </h1>

            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-white/90">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{featuredMovie.vote_average.toFixed(1)}</span>
                <span className="text-white/70">/10</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(featuredMovie.release_date)}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="w-5 h-5" />
                <span>148 min</span>
              </div>
            </div>

            {/* Overview */}
            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
              {featuredMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onWatchTrailer}
                className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Trailer</span>
              </button>
              
              <button
                onClick={onViewDetails}
                className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 border border-white/30"
              >
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};