import React from 'react';
import { ExternalLink, Play, ShoppingCart, Gift } from 'lucide-react';
import { Movie } from '../types/movie';

interface AffiliateLinksProps {
  movie: Movie;
  className?: string;
}

export const AffiliateLinks: React.FC<AffiliateLinksProps> = ({ movie, className = '' }) => {
  const affiliateLinks = [
    {
      name: 'Netflix',
      url: `https://netflix.com/search?q=${encodeURIComponent(movie.title)}`,
      icon: <Play className="w-4 h-4" />,
      color: 'bg-red-600 hover:bg-red-700',
      earnings: '💰 We earn commission'
    },
    {
      name: 'Amazon Prime',
      url: `https://amazon.com/s?k=${encodeURIComponent(movie.title)}&tag=cinereviews-20`,
      icon: <ShoppingCart className="w-4 h-4" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      earnings: '💰 We earn commission'
    },
    {
      name: 'Disney+',
      url: `https://disneyplus.com/search?q=${encodeURIComponent(movie.title)}`,
      icon: <Play className="w-4 h-4" />,
      color: 'bg-blue-800 hover:bg-blue-900',
      earnings: '💰 We earn commission'
    }
  ];

  if (movie.isGame) {
    affiliateLinks.push(
      {
        name: 'Steam',
        url: movie.buyLink || `https://store.steampowered.com/search/?term=${encodeURIComponent(movie.title)}`,
        icon: <ShoppingCart className="w-4 h-4" />,
        color: 'bg-gray-800 hover:bg-gray-900',
        earnings: '💰 We earn commission'
      },
      {
        name: 'Epic Games',
        url: `https://store.epicgames.com/en-US/browse?q=${encodeURIComponent(movie.title)}`,
        icon: <Gift className="w-4 h-4" />,
        color: 'bg-gray-700 hover:bg-gray-800',
        earnings: '💰 We earn commission'
      }
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
        <ExternalLink className="w-4 h-4" />
        <span>Watch/Buy Now</span>
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {affiliateLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 flex items-center justify-between group shadow-lg`}
            title={link.earnings}
          >
            <div className="flex items-center space-x-2">
              {link.icon}
              <span>{link.name}</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-75 group-hover:opacity-100" />
          </a>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
        💡 <strong>Affiliate Notice:</strong> We may earn a small commission from purchases made through these links at no extra cost to you. This helps keep CineReviews free!
      </div>
    </div>
  );
};