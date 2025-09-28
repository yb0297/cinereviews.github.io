import React, { useState, useEffect } from 'react';
import { X, Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';
import { AdBanner } from './AdBanner';
import type { User } from '@supabase/supabase-js';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onAuthRequired: () => void;
}

interface Comment {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  isOpen,
  onClose,
  user,
  onAuthRequired,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leave' | 'view' | 'cast'>('overview');
  const [comments, setComments] = useState<Comment[]>([]);

  // 🔹 Example: replace this with Formcarry API fetch
  useEffect(() => {
    if (activeTab === 'view') {
      // TODO: Replace with real Formcarry API call
      // For now, using mock comments
      setComments([
        {
          id: '1',
          name: 'Alice',
          message: 'Loved this movie! ❤️',
          created_at: '2025-09-25',
        },
        {
          id: '2',
          name: 'John',
          message: 'Great acting and visuals!',
          created_at: '2025-09-26',
        },
      ]);
    }
  }, [activeTab]);

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{movie.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-8 px-6">
            {['overview', 'leave', 'view', 'cast'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview'
                  ? 'Overview'
                  : tab === 'leave'
                  ? 'Leave Comment'
                  : tab === 'view'
                  ? 'View Comments'
                  : 'Cast'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div>
              <div className="flex gap-6 mb-6">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-48 rounded-lg"
                />
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {movie.vote_average}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {movie.overview}
                  </p>
                </div>
              </div>
              <AdBanner />
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

              <AdBanner />
            </div>
          )}

          {/* View Comments */}
          {activeTab === 'view' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">All Comments</h3>
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">
                          {c.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {c.created_at}
                        </span>
                      </div>
                      <p className="text-gray-700">{c.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No comments yet. Be the first!</p>
              )}

              <AdBanner />
            </div>
          )}

          {/* Cast */}
          {activeTab === 'cast' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Cast & Crew</h3>
              <p className="text-gray-500">
                Cast information will be available soon.
              </p>
              <AdBanner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
