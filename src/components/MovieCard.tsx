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
      className="bg-gradient-to-br from-white/40 via-white/20 to-white/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-110 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.25)] hover:-rotate-2 group relative border border-white/30"
      onClick={() => onClick(movie)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}
    >
      {/* Enhanced multi-layer glowing effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-40 transition-all duration-700 blur-3xl scale-110 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-blue-500/20 to-violet-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-transparent to-rose-500/10 rounded-3xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
      
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={movie.poster_path || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500'}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-125 filter group-hover:contrast-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {(movie.isGame || movie.isSeries || movie.isAnime) && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500/80 via-purple-600/80 to-pink-600/80 backdrop-blur-xl rounded-2xl px-4 py-2 text-white text-xs font-black uppercase tracking-wider shadow-2xl border border-white/40 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-violet-600/30 rounded-2xl blur-sm"></div>
            <span className="relative z-10">
              {movie.isGame ? '🎮 Game' : movie.isSeries ? '📺 Series' : movie.isAnime ? '🎌 Anime' : '🎬 Movie'}
            </span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-400/90 via-teal-500/90 to-cyan-600/90 backdrop-blur-xl rounded-2xl px-4 py-2 flex items-center space-x-2 shadow-2xl border-2 border-white/50 transition-all duration-500 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/40 via-orange-400/40 to-red-500/40 rounded-2xl blur-sm animate-pulse"></div>
          <Star className="w-4 h-4 text-white fill-current drop-shadow-2xl relative z-10" />
          <span className="text-white text-sm font-black drop-shadow-2xl relative z-10">{formatRating(movie.vote_average)}</span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-90">
          <div className="bg-gradient-to-br from-white/30 via-cyan-50/40 to-violet-100/30 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl transform transition-all duration-500 group-hover:rotate-12 border-2 border-white/70">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
            <Eye className="w-10 h-10 text-indigo-600 drop-shadow-2xl relative z-10" />
          </div>
        </div>
      </div>

      <div className="p-6 relative bg-gradient-to-br from-white/20 via-white/10 to-white/20 backdrop-blur-lg border-t border-white/30">
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
            <div className="flex items-center space-x-1 bg-gradient-to-r from-emerald-400/80 via-teal-500/80 to-cyan-600/80 backdrop-blur-xl rounded-full px-4 py-2 border border-white/40 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 to-orange-400/30 rounded-full blur-sm animate-pulse"></div>
              <Star className="w-4 h-4 text-white fill-current relative z-10" />
              <span className="font-bold text-white text-sm relative z-10">{formatRating(movie.vote_average)}</span>
              <span className="text-white/90 text-xs relative z-10">/10</span>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-indigo-500/90 via-purple-600/90 to-pink-600/90 hover:from-cyan-500/90 hover:via-blue-600/90 hover:to-violet-700/90 backdrop-blur-xl text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-500 transform hover:scale-110 shadow-2xl border border-white/30 hover:border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10">View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};