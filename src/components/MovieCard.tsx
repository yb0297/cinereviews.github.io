import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group relative border border-gray-200 w-full max-w-sm mx-auto"
      onClick={() => onClick(movie)}
    >
      {/* Bookmark Ribbon */}
      <div className="absolute top-0 left-0 z-20">
        <div className="bg-black w-12 h-24 shadow-lg relative">
          {/* Bookmark V-notch cut-out */}
          <div className="absolute bottom-0 left-1/2 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[12px] border-t-black transform -translate-x-1/2 translate-y-full"></div>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <img
          src={movie.poster_path || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500'}
          alt={movie.title}
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {(movie.isGame || movie.isSeries || movie.isAnime) && (
          <div className="absolute top-4 left-4 bg-blue-600 rounded-lg px-3 py-1 text-white text-xs font-semibold uppercase tracking-wide shadow-lg">
            {movie.isGame ? '🎮 Game' : movie.isSeries ? '📺 Series' : movie.isAnime ? '🎌 Anime' : '🎬 Movie'}
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-yellow-500 rounded-lg px-3 py-1 flex items-center space-x-1 shadow-lg">
          <Star className="w-4 h-4 text-white fill-current" />
          <span className="text-white text-sm font-semibold">{formatRating(movie.vote_average)}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{formatDate(movie.release_date)}</span>
          </div>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1">
            <span className="text-gray-600 text-xs">{movie.vote_count.toLocaleString()} votes</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed mb-6">
          {movie.overview}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold text-gray-700 text-sm">{formatRating(movie.vote_average)}</span>
            <span className="text-gray-500 text-xs">/10</span>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};