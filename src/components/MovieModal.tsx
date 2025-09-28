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
                  <section class="formcarry-container">
  <form action="https://formcarry.com/s/xjw9Y3VD56J" method="POST" enctype="multipart/form-data">
    
    <div class="formcarry-block">
      <label for="fc-generated-1-name">Full Name</label>
      <input type="text" name="name" id="fc-generated-1-name" placeholder="Your first and last name" />
    </div>
  	
    <div class="formcarry-block">
      <label for="fc-generated-1-email">Your Email Address</label>
      <input type="email" name="email" id="fc-generated-1-email" placeholder="john@doe.com" />
    </div>
  	
    <div class="formcarry-block">
      <label for="fc-generated-1-message">Your message</label>
      <textarea name="message" name="message" id="fc-generated-1-message" placeholder="Enter your message..."></textarea>
    </div>
  	
    <div class="formcarry-block">  
      <button type="submit">Send</button>
    </div>
  
  </form>
</section>

<style>
  
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

    .formcarry-container {
      box-sizing: border-box;
      margin: 40px auto 0 auto;
      padding: 0;
      font-family: "Inter", sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.01em;

      width: 400px;

      /* NORMAL */
      --fc-border-color: #ECEFF9;
      --fc-normal-text-color: #0E0B3D;
      --fc-normal-placeholder-color: #B3B8D0;

      /* PRIMARY COLOR | HSL FORMAT*/
      --fc-primary-color-hue: 220;
      --fc-error-color-hue: 356;
      --fc-primary-hsl: var(--fc-primary-color-hue), 100%, 54%;
      --fc-error-hsl: var(--fc-error-color-hue), 100%, 54%;

      /* HOVER */
      --fc-field-hover-bg-color: #F7F9FC;
      --fc-border-hover-color: #DDE0EE;
      --fc-field-hover-text-color: #B3B8D0;

      --fc-border-active-color: #1463FF;
    }

    .formcarry-container * {
      box-sizing: border-box;
    }

    .formcarry-container label {
      display: block;
      cursor: pointer;
    }

    .formcarry-container .formcarry-block:not(:first-child) {
      margin-top: 16px;
    }

    /*=============================================
    =            Fields           =
    =============================================*/
    
    .formcarry-container input,
    .formcarry-container textarea,
    .formcarry-container select {
      margin-top: 4px;
      width: 100%;
      height: 42px;
      border: 1px solid var(--fc-border-color);
      color: var(--fc-normal-text-color);
      border-radius: 6px;
      padding: 8px 12px;
      
      font-family: "Inter", sans-serif;
      font-size:14px;
      transition: 125ms background, 125ms color, 125ms box-shadow;
    }

    .formcarry-container textarea{
      min-height: 188px;
      max-width: 100%;
      padding-top: 12px;
    }

    .formcarry-container input::placeholder,
    .formcarry-container textarea::placeholder,
    .formcarry-container select::placeholder {
      color: var(--fc-normal-placeholder-color);
    }

    .formcarry-container input:hover,
    .formcarry-container textarea:hover,
    .formcarry-container select:hover {
      border-color: var(--fc-border-hover-color);
      background-color: var(--fc-field-hover-bg-color);
    }

    .formcarry-container input:hover::placeholder,
    .formcarry-container textarea:hover::placeholder,
    .formcarry-container select:hover::placeholder {
      color: var(--fc-field-hover-text-color);
    }

    .formcarry-container input:focus,
    .formcarry-container textarea:focus,
    .formcarry-container select:focus {
      background-color: #fff;
      border-color: hsl(var(--fc-primary-hsl));
      box-shadow: hsla(var(--fc-primary-hsl), 8%) 0px 0px 0px 3px;
      outline: none;
    }

    .formcarry-container select {
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.9997 14.5001L8.46387 10.9642L9.64303 9.78589L11.9997 12.1434L14.3564 9.78589L15.5355 10.9642L11.9997 14.5001Z' fill='%236C6F93'/%3E%3C/svg%3E%0A");
      /* background-position: calc(100% - 20px) calc(1em + 4px), calc(100% - 15px) calc(1em + 4px); */
      background-size: 24px 24px;
      background-position: 98%;
      background-repeat: no-repeat;
      appearance: none;
      -webkit-appearance: none;
    }

    .formcarry-container button {
      font-family: "Inter", sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.02em;
      height: 42px;
      line-height: 40px;
      width: 100%;
      border-radius: 6px;
      box-sizing: border-box;
      border: 1px solid hsla(var(--fc-primary-hsl));
      background-color: hsla(var(--fc-primary-hsl));
      color: #fff;
      cursor: pointer;
    }

    .formcarry-container button {
      font-family: "Inter", sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.02em;
      height: 40px;
      line-height: 24px;
      width: 100%;
      border: 0;
      border-radius: 6px;
      box-sizing: border-box;
      background-color: hsla(var(--fc-primary-hsl));
      color: #fff;
      cursor: pointer;
      box-shadow: 0 0 0 0 transparent;
      
      transition: 125ms all;
    }
    
    .formcarry-container button:hover {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), hsla(var(--fc-primary-hsl));
    }
    
    .formcarry-container button:focus {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), hsla(var(--fc-primary-hsl));
      border-inline: 1px solid inline rgba(255, 255, 255, 0.6);
      box-shadow: 0px 0px 0px 3px rgba(var(--fc-primary-hsl), 12%);
    }

    .formcarry-container button:active {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), hsla(var(--fc-primary-hsl));
    }

    .formcarry-container button:disabled {
      background-color: hsla(var(--fc-primary-hsl), 40%);
      cursor: not-allowed;
    }

    .formcarry-container input:focus:required:invalid,
    .formcarry-container input:focus:invalid, 
    .formcarry-container select:focus:required:invalid,
    .formcarry-container select:focus:invalid
    {
      color: hsl(var(--fc-error-hsl)); 
      border-color: hsl(var(--fc-error-hsl));
      box-shadow: 0px 0px 0px 3px hsla(var(--fc-error-hsl), 12%);
    }

    /*=====  End of Fields  ======*/
</style>
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
