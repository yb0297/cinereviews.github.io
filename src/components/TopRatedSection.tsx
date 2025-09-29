import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';

interface TopRatedSectionProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const TopRatedSection: React.FC<TopRatedSectionProps> = ({ movies, onMovieClick }) => {
  const topRatedMovies = movies
    .filter(movie => movie.vote_average >= 8.0)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  if (topRatedMovies.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-2">
          <Star className="w-8 h-8 text-yellow-400 fill-current" />
          <span>Top Rated</span>
        </h2>
        <div className="text-sm text-gray-400">
          Movies & Shows • 8.0+ Rating
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {topRatedMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={movie.poster_path || ''}
                alt={movie.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
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
              
              {/* Title and Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
    </section>
  );
};