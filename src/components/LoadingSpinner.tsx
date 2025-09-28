import React from 'react';
import { Film } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="relative">
          <Film className="w-12 h-12 text-red-500 animate-pulse mx-auto mb-4" />
          <div className="absolute inset-0 animate-spin">
            <div className="w-12 h-12 border-2 border-red-200 border-t-red-500 rounded-full"></div>
          </div>
        </div>
        <p className="text-gray-600 font-medium">Loading amazing movies...</p>
      </div>
    </div>
  );
};