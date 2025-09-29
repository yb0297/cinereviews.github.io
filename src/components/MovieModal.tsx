import React, { useState } from 'react';
import { X, Star, Calendar, User, MessageSquare, ExternalLink, ShoppingCart, Eye } from 'lucide-react';
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
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/60 to-pink-900/50 backdrop-blur-2xl flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-3xl rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-[0_40px_80px_-12px_rgba(0,0,0,0.4)] border border-white/20"
           style={{
             backdropFilter: 'blur(40px) saturate(200%)',
             background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
             boxShadow: '0 40px 80px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.05)'
           }}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-2xl border-b border-white/20 p-6 flex justify-between items-center rounded-t-3xl"
             style={{
               backdropFilter: 'blur(30px) saturate(180%)',
               background: 'linear-gradient(90deg, rgba(79,70,229,0.8) 0%, rgba(139,69,193,0.8) 50%, rgba(219,39,119,0.8) 100%)'
             }}>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-10 bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-600 rounded-full shadow-lg animate-pulse"></div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-2xl">{movie.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/20 rounded-full transition-all duration-500 group border-2 border-white/30 backdrop-blur-xl hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20"
          >
            <X className="w-6 h-6 text-white group-hover:text-red-300 transition-colors duration-500 drop-shadow-lg" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border-b border-white/20">
          <div className="flex space-x-3 px-8 py-4">
            {['overview', 'leave', 'view', 'cast'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 relative overflow-hidden backdrop-blur-xl border ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500/80 via-blue-600/80 to-violet-700/80 text-white shadow-2xl transform scale-110 border-white/40'
                    : 'text-gray-700 bg-white/10 hover:bg-gradient-to-r hover:from-emerald-400/20 hover:via-cyan-500/20 hover:to-blue-600/20 hover:text-indigo-700 hover:shadow-xl hover:scale-105 border-white/20 hover:border-white/40'
                }`}
                style={{
                  backdropFilter: 'blur(20px) saturate(150%)'
                }}
              >
                <span className="relative z-10 drop-shadow-sm">
                  {tab === 'overview'
                    ? '🎬 Overview'
                    : tab === 'leave'
                    ? '💬 Leave Comment'
                    : tab === 'view'
                    ? '👀 View Comments'
                    : '🎭 Cast'}
                </span>
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 via-blue-400/30 to-violet-500/30 animate-pulse rounded-2xl blur-sm"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div>
              <div className="flex gap-8 mb-8">
                <div className="relative group">
                  <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                  <img
                    src={movie.poster_path?.startsWith('http') 
                      ? movie.poster_path 
                      : movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600'
                    }
                    alt={movie.title}
                    className="w-80 h-auto rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:scale-110 border-4 border-white/50 backdrop-blur-sm relative z-10"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-cyan-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"></div>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="flex items-center flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-400/90 via-teal-500/90 to-cyan-600/90 backdrop-blur-2xl rounded-3xl px-6 py-3 shadow-2xl border-2 border-white/40 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/40 via-orange-400/40 to-red-500/40 blur-xl animate-pulse"></div>
                      <Star className="w-7 h-7 fill-white text-white drop-shadow-2xl relative z-10" />
                      <span className="font-black text-white text-xl drop-shadow-2xl relative z-10">
                        {movie.vote_average}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600/90 via-purple-700/90 to-pink-700/90 backdrop-blur-2xl text-white rounded-3xl px-6 py-3 shadow-2xl border-2 border-white/40">
                      <Calendar className="w-6 h-6 relative z-10" />
                      <span className="font-bold text-lg relative z-10">{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    {movie.isGame && (
                      <span className="bg-gradient-to-r from-violet-600/90 via-purple-700/90 to-indigo-800/90 backdrop-blur-2xl text-white px-6 py-3 rounded-3xl font-bold text-sm shadow-2xl border-2 border-white/40 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-500/30 blur-sm animate-pulse"></div>
                        <span className="relative z-10">🎮 Game</span>
                      </span>
                    )}
                    {movie.isSeries && (
                      <span className="bg-gradient-to-r from-blue-600/90 via-cyan-600/90 to-teal-700/90 backdrop-blur-2xl text-white px-6 py-3 rounded-3xl font-bold text-sm shadow-2xl border-2 border-white/40 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 blur-sm animate-pulse"></div>
                        <span className="relative z-10">📺 Series</span>
                      </span>
                    )}
                    {movie.isAnime && (
                      <span className="bg-gradient-to-r from-pink-600/90 via-rose-600/90 to-red-700/90 backdrop-blur-2xl text-white px-6 py-3 rounded-3xl font-bold text-sm shadow-2xl border-2 border-white/40 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-rose-500/30 blur-sm animate-pulse"></div>
                        <span className="relative z-10">🎌 Anime</span>
                      </span>
                    )}
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-inner border border-gray-200/50 mb-6">
                    <p className="text-gray-800 leading-relaxed text-lg font-medium">
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
                  
                  {/* External Links */}
                  {(movie.watchLink || movie.buyLink) && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
                      <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                        {movie.isGame ? 'Buy Game' : movie.isSeries || movie.isAnime ? 'Watch Now' : 'Watch Movie'}
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {movie.watchLink && (
                          <a
                            href={movie.watchLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <Eye className="w-5 h-5" />
                            <span>Watch Now</span>
                          </a>
                        )}
                        {movie.buyLink && (
                          <a
                            href={movie.buyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Buy Game</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* System Requirements for Games */}
                  {movie.isGame && (movie.minimumRequirements || movie.recommendedRequirements) && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <span className="text-blue-600 mr-2">🖥️</span>
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
