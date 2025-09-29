import React, { useState, useEffect } from 'react';
import { Star, Calendar, Heart, Bookmark, BookmarkCheck, Youtube } from 'lucide-react';
import { Movie } from '../types/movie';
import { profileService } from '../services/profileService';
import type { User } from '@supabase/supabase-js';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  user: User | null;
  onAuthClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, user, onAuthClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Load favorites and watchlist from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsFavorite(favorites.includes(movie.id));
    setIsInWatchlist(watchlist.includes(movie.id));
  }, [movie.id]);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is authenticated
    if (!user) {
      // Show sign-in prompt
      if (window.confirm('Please sign in to add movies to your favorites. Would you like to sign in now?')) {
        onAuthClick();
      }
      return;
    }
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie.id];
    }
    
    // Update through profile service (handles both localStorage and database)
    await profileService.updateFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  const handleWatchlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is authenticated
    if (!user) {
      // Show sign-in prompt
      if (window.confirm('Please sign in to add movies to your watchlist. Would you like to sign in now?')) {
        onAuthClick();
      }
      return;
    }
    
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    let updatedWatchlist;
    
    if (isInWatchlist) {
      updatedWatchlist = watchlist.filter((id: number) => id !== movie.id);
    } else {
      updatedWatchlist = [...watchlist, movie.id];
    }
    
    // Update through profile service (handles both localStorage and database)
    await profileService.updateWatchlist(updatedWatchlist);
    setIsInWatchlist(!isInWatchlist);
  };

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
      {/* Horizontal Black Ribbon with Genres */}
      <div className="absolute top-6 right-0 z-20">
        <div className="bg-black text-white px-4 py-2 shadow-lg relative">
          <div className="text-xs font-semibold uppercase tracking-wider">
            {movie.isGame ? '🎮 Game' : movie.isSeries ? '📺 Series' : movie.isAnime ? '🎌 Anime' : '🎬 Movie'}
          </div>
          {movie.genres && movie.genres.length > 0 && (
            <div className="text-[10px] font-medium mt-1 opacity-90">
              {movie.genres.slice(0, 2).map((genre) => (
                <span key={genre.id} className="bg-white/20 rounded px-2 py-0.5 mr-1 inline-block">
                  {genre.name.toUpperCase()}
                </span>
              ))}
              {movie.genres.length > 2 && (
                <span className="text-white/60">+{movie.genres.length - 2}</span>
              )}
            </div>
          )}
          {/* Triangle pointer on left */}
          <div className="absolute left-0 top-0 h-full w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[8px] border-r-black transform -translate-x-full"></div>
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
        
        {/* Rating Badge - Positioned above black ribbon */}
        <div className="absolute top-1 right-4 bg-yellow-500 rounded-lg px-3 py-1 flex items-center space-x-1 shadow-lg z-30">
          <Star className="w-4 h-4 text-white fill-current" />
          <span className="text-white text-sm font-semibold">{formatRating(movie.vote_average)}</span>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/90 text-red-500 hover:bg-white hover:text-red-600'
            }`}
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleWatchlistToggle}
            className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
              isInWatchlist 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-white/90 text-blue-500 hover:bg-white hover:text-blue-600'
            }`}
            title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {isInWatchlist ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
          
          {/* View Gameplay Button for Games */}
          {movie.isGame && movie.gameplayVideoLink && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(movie.gameplayVideoLink, '_blank');
              }}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-200"
              title="View Gameplay Video"
            >
              <Youtube className="w-4 h-4" />
            </button>
          )}
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