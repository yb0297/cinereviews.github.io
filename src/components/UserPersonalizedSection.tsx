import React, { useState, useEffect } from 'react';
import { Heart, Clock, Star, Calendar, User as UserIcon, BookmarkPlus } from 'lucide-react';
import { Movie } from '../types/movie';
import { movieService } from '../services/movieService';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface UserPersonalizedSectionProps {
  user: SupabaseUser;
  onMovieClick: (movie: Movie) => void;
}

export const UserPersonalizedSection: React.FC<UserPersonalizedSectionProps> = ({ user, onMovieClick }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchlist'>('favorites');

  useEffect(() => {
    loadUserPreferences();
  }, [user]);

  const loadUserPreferences = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load favorites
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favoriteIds.length > 0) {
        const allMovies = await movieService.getContentByCategory('all');
        const favorites = allMovies.filter(movie => favoriteIds.includes(movie.id));
        setFavoriteMovies(favorites);
      }

      // Load watchlist
      const watchlistIds = JSON.parse(localStorage.getItem('watchlist') || '[]');
      if (watchlistIds.length > 0) {
        const allMovies = await movieService.getContentByCategory('all');
        const watchlist = allMovies.filter(movie => watchlistIds.includes(movie.id));
        setWatchlistMovies(watchlist);
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (movieId: number) => {
    const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    const favoriteIds = updatedFavorites.map(movie => movie.id);
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  };

  const removeFromWatchlist = (movieId: number) => {
    const updatedWatchlist = watchlistMovies.filter(movie => movie.id !== movieId);
    setWatchlistMovies(updatedWatchlist);
    const watchlistIds = updatedWatchlist.map(movie => movie.id);
    localStorage.setItem('watchlist', JSON.stringify(watchlistIds));
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  if (favoriteMovies.length === 0 && watchlistMovies.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-2">
            <UserIcon className="w-8 h-8 text-blue-400" />
            <span>Your Personal Collection</span>
          </h2>
          <div className="text-sm text-gray-400">
            {user.user_metadata?.full_name || user.email}
          </div>
        </div>
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <BookmarkPlus className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-2">Your personal collection is empty</p>
          <p className="text-gray-500">Start adding movies to your favorites and watchlist!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-2">
          <UserIcon className="w-8 h-8 text-blue-400" />
          <span>Your Personal Collection</span>
        </h2>
        <div className="text-sm text-gray-400">
          {user.user_metadata?.full_name || user.email}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
            activeTab === 'favorites'
              ? 'bg-red-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favorites ({favoriteMovies.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
            activeTab === 'watchlist'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Watchlist ({watchlistMovies.length})</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative">
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favoriteMovies.map((movie) => (
              <div
                key={movie.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={movie.poster_path || ''}
                    alt={movie.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    onClick={() => onMovieClick(movie)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>

                  {/* Content Type Badge */}
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {movie.isGame ? 'Game' : movie.isSeries ? 'Series' : movie.isAnime ? 'Anime' : 'Movie'}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(movie.id);
                    }}
                    className="absolute top-2 right-10 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart className="w-3 h-3 fill-current" />
                  </button>
                  
                  {/* Title and Info */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => onMovieClick(movie)}
                  >
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-300">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'watchlist' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchlistMovies.map((movie) => (
              <div
                key={movie.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={movie.poster_path || ''}
                    alt={movie.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    onClick={() => onMovieClick(movie)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>

                  {/* Content Type Badge */}
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {movie.isGame ? 'Game' : movie.isSeries ? 'Series' : movie.isAnime ? 'Anime' : 'Movie'}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(movie.id);
                    }}
                    className="absolute top-2 right-10 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Clock className="w-3 h-3" />
                  </button>
                  
                  {/* Title and Info */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => onMovieClick(movie)}
                  >
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-300">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};