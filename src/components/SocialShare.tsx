import React from 'react';
import { Share2, Facebook, Twitter, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Movie } from '../types/movie';

interface SocialShareProps {
  movie: Movie;
  className?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ movie, className = '' }) => {
  const shareUrl = `${window.location.origin}?movie=${movie.id}`;
  const shareText = `Check out "${movie.title}" on CineReviews! ⭐ ${movie.vote_average}/10`;
  const hashtags = movie.isGame ? 'gaming,gamereviews' : movie.isAnime ? 'anime,otaku' : movie.isSeries ? 'series,tvshows' : 'movies,cinema';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
  };

  const handleShare = async (platform: string) => {
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        console.log('Native sharing failed, falling back to social links');
      }
    }

    const link = shareLinks[platform as keyof typeof shareLinks];
    if (link) {
      window.open(link, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm font-medium text-gray-600">Share:</span>
      
      {navigator.share && (
        <button
          onClick={() => handleShare('native')}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      <button
        onClick={() => handleShare('facebook')}
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare('twitter')}
        className="p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-all duration-200"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare('telegram')}
        className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200"
        title="Share on Telegram"
      >
        <Instagram className="w-4 h-4" />
      </button>
    </div>
  );
};