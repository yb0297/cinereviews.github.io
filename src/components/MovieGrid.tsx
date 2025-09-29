import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../types/movie';
import type { User } from '@supabase/supabase-js';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  loading?: boolean;
  user: User | null;
  onAuthClick: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick, loading = false, user, onAuthClick }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="w-full h-80 bg-gray-300" />
            <div className="p-4">
              <div className="h-6 bg-gray-300 rounded mb-2" />
              <div className="h-4 bg-gray-300 rounded mb-3 w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded" />
                <div className="h-3 bg-gray-300 rounded" />
                <div className="h-3 bg-gray-300 rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No movies found</div>
        <div className="text-gray-400">Try adjusting your search criteria</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
          user={user}
          onAuthClick={onAuthClick}
        />
      ))}
    </div>
  );
};