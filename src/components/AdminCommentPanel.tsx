import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, MessageSquare, User, Mail, Calendar } from 'lucide-react';
import { manualCommentService, ManualComment } from '../services/manualCommentService';

interface AdminCommentPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCommentPanel: React.FC<AdminCommentPanelProps> = ({ isOpen, onClose }) => {
  const [comments, setComments] = useState<ManualComment[]>([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [formData, setFormData] = useState({
    movieId: '',
    movieTitle: '',
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen]);

  const loadComments = () => {
    const allComments = manualCommentService.getAllComments();
    setComments(allComments);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.movieId || !formData.movieTitle || !formData.name || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    const movieId = parseInt(formData.movieId);
    if (isNaN(movieId)) {
      alert('Movie ID must be a number');
      return;
    }

    manualCommentService.addComment({
      movieId,
      movieTitle: formData.movieTitle,
      name: formData.name,
      email: formData.email,
      message: formData.message
    });

    // Reset form
    setFormData({
      movieId: '',
      movieTitle: '',
      name: '',
      email: '',
      message: ''
    });
    setIsAddingComment(false);
    loadComments();
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      manualCommentService.deleteComment(commentId);
      loadComments();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Manage Comments</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Add Comment Button */}
            <div className="mb-6">
              <button
                onClick={() => setIsAddingComment(!isAddingComment)}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Comment</span>
              </button>
            </div>

            {/* Add Comment Form */}
            {isAddingComment && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Comment from FormCarry</h3>
                <form onSubmit={handleAddComment} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Movie ID *
                      </label>
                      <input
                        type="number"
                        value={formData.movieId}
                        onChange={(e) => setFormData(prev => ({ ...prev, movieId: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="e.g., 1, 2, 3..."
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        1=Dark Knight, 2=Inception, 3=Interstellar, 4=Parasite, 5=Dune
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Movie Title *
                      </label>
                      <input
                        type="text"
                        value={formData.movieTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, movieTitle: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Movie title"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Commenter's name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Commenter's email (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Comment message"
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                    >
                      Add Comment
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingComment(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Comments List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                All Comments ({comments.length})
              </h3>
              
              {comments.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No comments yet</p>
                  <p className="text-gray-400 text-sm">Add comments from FormCarry submissions</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-gray-900">{comment.name}</span>
                            {comment.email && (
                              <>
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{comment.email}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                            <span className="font-medium text-red-600">
                              {comment.movieTitle} (ID: {comment.movieId})
                            </span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(comment.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete comment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};