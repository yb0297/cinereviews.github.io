import React, { useState } from 'react';
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

export const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose, user, onAuthRequired }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'cast'>('overview');

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{movie.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'overview' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'comments' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab('cast')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'cast' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Cast
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              {/* Movie Info */}
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
                      <span className="font-semibold">{movie.vote_average}/10</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
                </div>
              </div>
              <AdBanner />
            </div>
          )}

          {activeTab === 'comments' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>

              {user ? (
                <section className="formcarry-container">
                  <form 
                    action="https://formcarry.com/s/xjw9Y3VD56J" 
                    method="POST" 
                    encType="multipart/form-data"
                  >
                    <div className="formcarry-block">
                      <label htmlFor="fc-name">Full Name</label>
                      <input type="text" name="name" id="fc-name" placeholder="Your name" />
                    </div>
                    
                    <div className="formcarry-block">
                      <label htmlFor="fc-email">Email</label>
                      <input type="email" name="email" id="fc-email" placeholder="you@example.com" />
                    </div>
                    
                    <div className="formcarry-block">
                      <label htmlFor="fc-message">Message</label>
                      <textarea name="message" id="fc-message" placeholder="Enter your comment..." />
                    </div>
                    
                    <div className="formcarry-block">
                      <button type="submit">Send</button>
                    </div>
                  </form>
                </section>
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

          {activeTab === 'cast' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Cast & Crew</h3>
              <p className="text-gray-500">Cast information will be available soon.</p>
              <AdBanner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
