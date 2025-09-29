import React from 'react';
import { Film, Play, Star } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  const iconSizes = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  };

  const containerPadding = {
    small: 'p-2.5',
    medium: 'p-3.5',
    large: 'p-4'
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Enhanced Logo Icon */}
      <div className="relative group cursor-pointer">
        {/* Outer glow ring */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl opacity-75 blur-lg scale-125 group-hover:opacity-100 transition-all duration-500"></div>
        
        {/* Main icon container */}
        <div className={`relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 ${containerPadding[size]} rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/20 backdrop-blur-sm`}>
          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/30 to-pink-500/20 rounded-3xl"></div>
          
          {/* Film icon with enhanced styling */}
          <div className="relative">
            <Film className={`${iconSizes[size]} text-white drop-shadow-lg`} />
          </div>
        </div>
        
        {/* Enhanced play button */}
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full p-2 shadow-xl border-2 border-white/30 group-hover:scale-125 transition-all duration-300">
          <Play className="w-3 h-3 text-white fill-white drop-shadow-sm" />
        </div>
        
        {/* Decorative star elements */}
        <div className="absolute -top-2 -left-2 text-yellow-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <Star className="w-3 h-3 fill-current animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -right-3 text-pink-400 opacity-60 group-hover:opacity-90 transition-opacity duration-300">
          <Star className="w-2 h-2 fill-current animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      
      {/* Enhanced Logo Text */}
      <div className="flex flex-col space-y-1">
        <div className={`${sizeClasses[size]} font-black tracking-tight relative`}>
          {/* Text shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent blur-sm opacity-50">
            YBYCineReviews
          </div>
          
          {/* Main text */}
          <div className="relative">
            <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 bg-clip-text text-transparent font-extrabold drop-shadow-sm">
              YBY
            </span>
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent font-extrabold drop-shadow-sm">
              CineReviews
            </span>
          </div>
        </div>
        
        {size !== 'small' && (
          <div className="flex items-center space-x-1">
            <div className="text-xs text-gray-500 font-bold tracking-wider uppercase bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
              Movies
            </div>
            <span className="text-orange-400 text-xs">•</span>
            <div className="text-xs text-gray-500 font-bold tracking-wider uppercase bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Series
            </div>
            <span className="text-pink-400 text-xs">•</span>
            <div className="text-xs text-gray-500 font-bold tracking-wider uppercase bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Anime
            </div>
            <span className="text-green-400 text-xs">•</span>
            <div className="text-xs text-gray-500 font-bold tracking-wider uppercase bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Games
            </div>
          </div>
        )}
      </div>
    </div>
  );
};