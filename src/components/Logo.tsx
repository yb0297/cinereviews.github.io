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
      <div className="relative">
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-2 rounded-xl shadow-lg">
          <Film className={`${iconSizes[size]} text-white`} />
        </div>
        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
          <Play className="w-3 h-3 text-red-600" />
        </div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <div className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent`}>
          YBY<span className="text-gray-800">cine</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">reviews</span>
        </div>
        {size !== 'small' && (
          <div className="text-xs text-gray-500 font-medium tracking-wider">
            YOUR ENTERTAINMENT GUIDE
          </div>
        )}
      </div>
    </div>
  );
};