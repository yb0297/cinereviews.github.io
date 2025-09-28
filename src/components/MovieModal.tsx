import React, { useState } from 'react';
import { X, Star, Calendar, Clock, Play, Heart, Share2, Bookmark } from 'lucide-react';
import { Movie } from '../types/movie';
import { movieService } from '../services/movieService';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'cast'>('overview');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);

  // Load user rating when movie changes
  React.useEffect(() => {
    if (movie) {
      const savedRating = movieService.getUserRating(movie.id);
      setUserRating(savedRating);
    }
  }, [movie]);

  if (!isOpen || !movie) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    movieService.setUserRating(movie.id, rating);
    setShowRatingSuccess(true);
    setTimeout(() => setShowRatingSuccess(false), 2000);
  };

  const handleRatingRemove = () => {
    setUserRating(0);
    movieService.removeUserRating(movie.id);
    setShowRatingSuccess(true);
    setTimeout(() => setShowRatingSuccess(false), 2000);
  };

  const mockReviews = [
    {
      id: '1',
      userName: 'MovieBuff2024',
      rating: 9,
      title: 'Absolutely Phenomenal!',
      content: 'This movie exceeded all my expectations. The cinematography is breathtaking and the story keeps you engaged from start to finish.',
      date: '2024-01-15',
      helpful: 24
    },
    {
      id: '2',
      userName: 'CinemaLover',
      rating: 8,
      title: 'Great Entertainment',
      content: 'Solid performances all around. While not perfect, it delivers on entertainment value and has some truly memorable moments.',
      date: '2024-01-10',
      helpful: 18
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Hero Section */}
          <div className="relative h-64 sm:h-80">
            <img
              src={movie.backdrop_path || movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{movie.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>148 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Trailer</span>
              </button>
              
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'cast', label: 'Cast & Crew' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === 'overview' && (
                <div>
                  <p className="text-gray-700 leading-relaxed mb-6">{movie.overview}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Movie Details</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Release Date:</dt>
                          <dd className="text-gray-900">{formatDate(movie.release_date)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Runtime:</dt>
                          <dd className="text-gray-900">148 minutes</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Rating:</dt>
                          <dd className="text-gray-900">{movie.vote_average.toFixed(1)}/10</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Votes:</dt>
                          <dd className="text-gray-900">{movie.vote_count.toLocaleString()}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Your Rating</h4>
                      <div className="flex items-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRatingClick(rating)}
                            onMouseEnter={() => setHoverRating(rating)}
                            onMouseLeave={() => setHoverRating(0)}
                            className={`w-6 h-6 ${
                              rating <= (hoverRating || userRating) 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                            } hover:text-yellow-400`}
                          >
                            <Star className="w-full h-full fill-current" />
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {userRating > 0 ? (
                          <p className="text-sm text-gray-600">
                            You rated this movie <span className="font-semibold text-yellow-600">{userRating}/10</span>
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">Click stars to rate this movie</p>
                        )}
                        
                        {userRating > 0 && (
                          <button
                            onClick={handleRatingRemove}
                            className="text-xs text-red-600 hover:text-red-700 transition-colors"
                          >
                            Remove Rating
                          </button>
                        )}
                      </div>
                      
                      {showRatingSuccess && (
                        <div className="mt-2 p-2 bg-green-100 text-green-700 text-sm rounded-md">
                          {userRating > 0 ? 'Rating saved!' : 'Rating removed!'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-semibold text-gray-900">{review.title}</h5>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{review.userName}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{review.rating}/10</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{review.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="hover:text-gray-700 transition-colors">
                          👍 Helpful ({review.helpful})
                        </button>
                        <button className="hover:text-gray-700 transition-colors">Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'cast' && (
                <div>
                  <p className="text-gray-500 text-center py-8">Cast and crew information coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};