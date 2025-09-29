import React, { useState } from 'react';
import { X, Star, Calendar, User, MessageSquare, ExternalLink, ShoppingCart, Eye, Play, Gamepad2, Youtube } from 'lucide-react';
import { Movie } from '../types/movie';
import { AdBanner } from './AdBanner';
import { manualCommentService, ManualComment } from '../services/manualCommentService';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
  onAuthRequired: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  isOpen,
  onClose,
  user,
  onAuthRequired,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leave' | 'view' | 'cast'>('overview');
  const [comments, setComments] = useState<ManualComment[]>([]);

  // Load comments when modal opens or tab changes
  React.useEffect(() => {
    if (isOpen && movie && activeTab === 'view') {
      const movieComments = manualCommentService.getCommentsForMovie(movie.id);
      setComments(movieComments);
    }
  }, [isOpen, movie, activeTab]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-3xl font-bold text-gray-900">{movie.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-1 px-6 py-2">
            {['overview', 'leave', 'view', 'cast'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                {tab === 'overview'
                  ? '🎬 Overview'
                  : tab === 'leave'
                  ? '💬 Leave Comment'
                  : tab === 'view'
                  ? '👀 View Comments'
                  : '🎭 Cast'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 bg-white">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div>
              <div className="flex gap-8 mb-8">
                <div className="flex flex-col space-y-4">
                  {/* Main Poster Image */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={movie.poster_path?.startsWith('http') 
                        ? movie.poster_path 
                        : movie.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600'
                      }
                      alt={movie.title}
                      className="w-80 h-auto object-cover"
                    />
                  </div>
                  
                  {/* Second Image Space */}
                  <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <img
                      src={movie.backdrop_path?.startsWith('http') 
                        ? movie.backdrop_path 
                        : movie.backdrop_path 
                          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                          : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600'
                      }
                      alt={`${movie.title} scene`}
                      className="w-80 h-48 object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="flex items-center flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-yellow-500 rounded-lg px-4 py-2 shadow-md">
                      <Star className="w-5 h-5 fill-white text-white" />
                      <span className="font-semibold text-white text-lg">
                        {movie.vote_average}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-600 text-white rounded-lg px-4 py-2 shadow-md">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    {movie.isGame && (
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md">
                        🎮 Game
                      </span>
                    )}
                    {movie.isSeries && (
                      <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md">
                        📺 Series
                      </span>
                    )}
                    {movie.isAnime && (
                      <span className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md">
                        🎌 Anime
                      </span>
                    )}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                    <p className="text-gray-800 leading-relaxed text-base">
                      {movie.overview}
                    </p>
                  </div>
                  
                  {/* Pros and Cons */}
                  {(movie.pros || movie.cons) && (
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {movie.pros && (
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Pros
                          </h4>
                          <ul className="space-y-2">
                            {movie.pros.map((pro, index) => (
                              <li key={index} className="text-green-700 text-sm flex items-start">
                                <span className="text-green-500 mr-2 text-xs">•</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {movie.cons && (
                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                          <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                            <span className="text-red-500 mr-2">✗</span>
                            Cons
                          </h4>
                          <ul className="space-y-2">
                            {movie.cons.map((con, index) => (
                              <li key={index} className="text-red-700 text-sm flex items-start">
                                <span className="text-red-500 mr-2 text-xs">•</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  {(movie.watchLink || movie.trailerLink || movie.buyLink || movie.gameplayVideoLink) && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                        {movie.isGame ? 'Game Actions' : 'Watch Options'}
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {movie.isGame ? (
                          <>
                            {movie.watchLink && (
                              <button
                                onClick={() => window.open(movie.watchLink, '_blank')}
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md"
                              >
                                <Gamepad2 className="w-5 h-5" />
                                <span>Watch Gameplay</span>
                              </button>
                            )}
                            {movie.gameplayVideoLink && (
                              <button
                                onClick={() => window.open(movie.gameplayVideoLink, '_blank')}
                                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md"
                              >
                                <Youtube className="w-5 h-5" />
                                <span>View Gameplay Video</span>
                              </button>
                            )}
                            {movie.buyLink && (
                              <button
                                onClick={() => window.open(movie.buyLink, '_blank')}
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md"
                              >
                                <ShoppingCart className="w-5 h-5" />
                                <span>Buy Game</span>
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            {movie.watchLink && (
                              <button
                                onClick={() => window.open(movie.watchLink, '_blank')}
                                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md"
                              >
                                <Play className="w-5 h-5 fill-current" />
                                <span>Watch Now</span>
                              </button>
                            )}
                            {movie.trailerLink && (
                              <button
                                onClick={() => window.open(movie.trailerLink, '_blank')}
                                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md"
                              >
                                <Eye className="w-5 h-5" />
                                <span>Watch Trailer</span>
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* System Requirements for Games */}
                  {movie.isGame && (movie.minimumRequirements || movie.recommendedRequirements) && (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="text-gray-600 mr-2">🖥️</span>
                        System Requirements
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {movie.minimumRequirements && (
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-800 mb-3 text-center bg-gray-100 py-2 rounded">
                              Minimum Requirements
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div><span className="font-medium text-gray-600">OS:</span> {movie.minimumRequirements.os}</div>
                              <div><span className="font-medium text-gray-600">Processor:</span> {movie.minimumRequirements.processor}</div>
                              <div><span className="font-medium text-gray-600">Memory:</span> {movie.minimumRequirements.memory}</div>
                              <div><span className="font-medium text-gray-600">Graphics:</span> {movie.minimumRequirements.graphics}</div>
                              <div><span className="font-medium text-gray-600">Storage:</span> {movie.minimumRequirements.storage}</div>
                            </div>
                          </div>
                        )}
                        
                        {movie.recommendedRequirements && (
                          <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-green-200">
                            <h4 className="font-semibold text-gray-800 mb-3 text-center bg-green-100 py-2 rounded">
                              Recommended Requirements
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div><span className="font-medium text-gray-600">OS:</span> {movie.recommendedRequirements.os}</div>
                              <div><span className="font-medium text-gray-600">Processor:</span> {movie.recommendedRequirements.processor}</div>
                              <div><span className="font-medium text-gray-600">Memory:</span> {movie.recommendedRequirements.memory}</div>
                              <div><span className="font-medium text-gray-600">Graphics:</span> {movie.recommendedRequirements.graphics}</div>
                              <div><span className="font-medium text-gray-600">Storage:</span> {movie.recommendedRequirements.storage}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <AdBanner adSlot="movie-modal-banner" />
            </div>
          )}

          {/* Leave Comment */}
          {activeTab === 'leave' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>

              {user ? (
                <form
                  action="https://formcarry.com/s/xjw9Y3VD56J"
                  method="POST"
                  encType="multipart/form-data"
                  className="space-y-4 max-w-md"
                >
                  <div>
                    <label
                      htmlFor="fc-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="fc-name"
                      placeholder="Your name"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="fc-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="fc-email"
                      placeholder="you@example.com"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="fc-message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="fc-message"
                      placeholder="Enter your comment..."
                      rows={4}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Send Comment
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
                  <p className="text-gray-600 mb-3">Sign in to leave a comment</p>
                  <button
                    onClick={onAuthRequired}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Sign In
                  </button>
                </div>
              )}

              <AdBanner adSlot="movie-comments-banner" />
            </div>
          )}

          {/* View Comments */}
          {activeTab === 'view' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                All Comments ({comments.length})
              </h3>
              
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">
                              {comment.name}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <span>{formatDate(comment.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-gray-700 leading-relaxed ml-10">
                        {comment.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No comments yet</p>
                  <p className="text-gray-400 mb-4">Be the first to leave a comment!</p>
                  <button
                    onClick={() => setActiveTab('leave')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Leave a Comment
                  </button>
                </div>
              )}

              <div className="mt-8">
                <AdBanner
                  adSlot="1234567894"
                  style={{ display: 'block', width: '100%', height: '200px' }}
                />
              </div>
            </div>
          )}

          {/* Cast */}
          {activeTab === 'cast' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Cast & Crew</h3>
              <p className="text-gray-500">
                Cast information will be available soon.
              </p>
              <AdBanner
                adSlot="1234567895"
                style={{ display: 'block', width: '100%', height: '200px' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
