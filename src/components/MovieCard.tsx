import React from 'react';
import { Star, Calendar, Eye } from 'lucide-react';
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
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-rotate-1 group relative"
      onClick={() => onClick(movie)}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl scale-105"></div>
      
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={movie.poster_path || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {(movie.isGame || movie.isSeries || movie.isAnime) && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-3 py-1 text-white text-xs font-bold uppercase tracking-wide">
            {movie.isGame ? '🎮 Game' : movie.isSeries ? '📺 Series' : movie.isAnime ? '🎌 Anime' : '🎬 Movie'}
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
          <Star className="w-3 h-3 text-white fill-current" />
          <span className="text-white text-xs font-bold">{formatRating(movie.vote_average)}</span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-sm rounded-full p-4 shadow-2xl transform transition-transform duration-300 group-hover:rotate-12">
            <Eye className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div className="p-6 relative">
        {/* Title with gradient effect */}
        <h3 className="font-black text-xl text-gray-900 mb-3 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{formatDate(movie.release_date)}</span>
          </div>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1">
            <span className="text-gray-600 text-xs">{movie.vote_count.toLocaleString()} votes</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed mb-4">
          {movie.overview}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-white fill-current" />
              <span className="font-bold text-white text-sm">{formatRating(movie.vote_average)}</span>
              <span className="text-white/80 text-xs">/10</span>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};