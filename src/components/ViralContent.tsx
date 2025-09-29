import React from 'react';
import { TrendingUp, Flame, Users, Award } from 'lucide-react';
import { Movie } from '../types/movie';

interface ViralContentProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const ViralContent: React.FC<ViralContentProps> = ({ movies, onMovieClick }) => {
  const viralMovies = movies.slice(0, 4);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 m-4 text-white">
      <div className="flex items-center space-x-2 mb-6">
        <Flame className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold">🔥 Viral Right Now</h2>
        <TrendingUp className="w-5 h-5 text-green-400" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {viralMovies.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="cursor-pointer group relative bg-black/20 rounded-lg overflow-hidden hover:bg-black/30 transition-all duration-300 transform hover:scale-105"
          >
            <img
              src={movie.poster_path || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300'}
              alt={movie.title}
              className="w-full h-40 object-cover"
            />
            
            <div className="absolute top-2 left-2">
              {index === 0 && <Flame className="w-5 h-5 text-yellow-400" />}
              {index === 1 && <Award className="w-5 h-5 text-yellow-400" />}
              {index === 2 && <TrendingUp className="w-5 h-5 text-green-400" />}
              {index === 3 && <Users className="w-5 h-5 text-blue-400" />}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <h3 className="font-bold text-sm mb-1 line-clamp-1">{movie.title}</h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-yellow-400">⭐ {movie.vote_average}</span>
                <span className="text-red-300">#{index + 1} Trending</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-red-200 text-sm">💡 Share your favorites to join the conversation!</p>
      </div>
    </div>
  );
};