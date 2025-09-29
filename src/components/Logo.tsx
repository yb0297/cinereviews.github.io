import React from 'react';
import { Film, Play } from 'lucide-react';

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

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative group">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
          <Film className={`${iconSizes[size]} text-white`} />
        </div>
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1.5 shadow-lg">
          <Play className="w-3 h-3 text-white" />
        </div>
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl scale-110"></div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <div className={`${sizeClasses[size]} font-black tracking-tight`}>
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            CINE
          </span>
          <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
            HUB
          </span>
        </div>
        {size !== 'small' && (
          <div className="text-xs text-gray-600 font-semibold tracking-widest uppercase">
            Movies • Series • Anime • Games
          </div>
        )}
      </div>
    </div>
  );
};