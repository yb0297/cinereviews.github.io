import React from 'react';
import { Clock, Calendar, Star } from 'lucide-react';
import { Movie } from '../types/movie';

interface ComingSoonSectionProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({ movies, onMovieClick }) => {
  const currentDate = new Date();
  const comingSoonMovies = movies
    .filter(movie => new Date(movie.release_date) > currentDate)
    .sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime())
    .slice(0, 6);

  if (comingSoonMovies.length === 0) return null;

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysUntilRelease = (dateString: string) => {
    const releaseDate = new Date(dateString);
    const diffTime = releaseDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-2">
          <Clock className="w-8 h-8 text-blue-400" />
          <span>Coming Soon</span>
        </h2>
        <div className="text-sm text-gray-400">
          Upcoming Releases
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comingSoonMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <img
                src={movie.backdrop_path || movie.poster_path || ''}
                alt={movie.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent" />
              
              {/* Content Type Badge */}
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                {movie.isGame ? 'Game' : movie.isSeries ? 'Series' : movie.isAnime ? 'Anime' : 'Movie'}
              </div>

              {/* Days Until Release */}
              <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                {getDaysUntilRelease(movie.release_date)} days
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatReleaseDate(movie.release_date)}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                {movie.overview}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-blue-400 text-xs font-semibold">
                  Coming Soon
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors duration-200">
                  Remind Me
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};