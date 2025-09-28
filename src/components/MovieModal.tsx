import React, { useState } from 'react';
import { X, Star, Calendar, Clock, Share2, ExternalLink, Youtube, Send, Trash2 } from 'lucide-react';
import { Movie } from '../types/movie';
import { Comment, CommentFormData } from '../types/comment';
import { commentService } from '../services/commentService';
import { simpleAuth } from '../lib/simpleAuth';
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
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [newComment, setNewComment] = useState<CommentFormData>({
    content: ''
  });

  // Load comments when modal opens and comments tab is active
  React.useEffect(() => {
    if (isOpen && movie && activeTab === 'comments') {
      loadComments();
    }
  }, [isOpen, movie, activeTab]);

  // Clear comment form when user logs out
  React.useEffect(() => {
    if (!user && !simpleAuth.getCurrentUser()) {
      setNewComment({ content: '' });
    }
  }, [user]);

  const loadComments = async () => {
    if (!movie) return;
    
    setLoadingComments(true);
    try {
      const movieComments = await commentService.getCommentsForMovie(movie.id);
      setComments(movieComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!movie || !newComment.content.trim()) return;
    
    const currentUser = user || simpleAuth.getCurrentUser();
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    setSubmittingComment(true);
    try {
      await commentService.createComment(movie.id, movie.title, newComment);
      setNewComment({ content: '' });
      await loadComments();
      alert('Comment posted successfully!');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await commentService.deleteComment(commentId);
      await loadComments();
      alert('Comment deleted successfully!');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  if (!isOpen || !movie) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentUser = user || simpleAuth.getCurrentUser();

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
              Comments ({comments.length})
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
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                
                {/* Comment Form */}
                {currentUser && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-3">Add a Comment</h4>
                    <textarea
                      value={newComment.content}
                      onChange={(e) => setNewComment({ content: e.target.value })}
                      placeholder="Share your thoughts about this movie..."
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={4}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-500">
                        Commenting as {currentUser.email || currentUser.full_name}
                      </span>
                      <button
                        onClick={handleSubmitComment}
                        disabled={submittingComment || !newComment.content.trim()}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {submittingComment ? 'Posting...' : 'Post Comment'}
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {!currentUser && (
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

                {/* Comments List */}
                {loadingComments ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading comments...</p>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {(comment.user_name || 'A')[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{comment.user_name || 'Anonymous User'}</p>
                              <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                            </div>
                          </div>
                          {currentUser && comment.user_id === currentUser.id && (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete comment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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