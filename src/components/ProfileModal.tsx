import React, { useState, useEffect } from 'react';
import { X, User, CreditCard as Edit3, Save, Calendar, Star, Film, Heart, Bookmark } from 'lucide-react';
import { profileService } from '../services/profileService';
import { movieService } from '../services/movieService';
import { Profile, ProfileFormData } from '../types/profile';
import { Movie } from '../types/movie';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'watchlist'>('overview');
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    username: '',
    bio: ''
  });

  useEffect(() => {
    if (isOpen && user) {
      loadProfile();
      loadUserReviews();
      loadFavoriteMovies();
      loadWatchlistMovies();
    }
  }, [isOpen, user]);

  const loadProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let userProfile = await profileService.getCurrentUserProfile();
      
      // If profile doesn't exist, create it
      if (!userProfile) {
        userProfile = await profileService.createOrUpdateProfile(user);
      }
      
      setProfile(userProfile);
      if (userProfile) {
        setFormData({
          full_name: userProfile.full_name || '',
          username: userProfile.username || '',
          bio: userProfile.bio || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserReviews = async () => {
    if (!user) return;
    
    try {
      const reviews: any[] = []; // TODO: Load user reviews if needed
      setUserReviews(reviews);
    } catch (error) {
      console.error('Error loading user reviews:', error);
    }
  };

  const loadFavoriteMovies = async () => {
    try {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favoriteIds.length === 0) {
        setFavoriteMovies([]);
        return;
      }
      
      // Get all movies and filter by favorite IDs
      const allMovies = await movieService.getContentByCategory('all');
      const favorites = allMovies.filter(movie => favoriteIds.includes(movie.id));
      setFavoriteMovies(favorites);
    } catch (error) {
      console.error('Error loading favorite movies:', error);
    }
  };

  const loadWatchlistMovies = async () => {
    try {
      const watchlistIds = JSON.parse(localStorage.getItem('watchlist') || '[]');
      if (watchlistIds.length === 0) {
        setWatchlistMovies([]);
        return;
      }
      
      // Get all movies and filter by watchlist IDs
      const allMovies = await movieService.getContentByCategory('all');
      const watchlist = allMovies.filter(movie => watchlistIds.includes(movie.id));
      setWatchlistMovies(watchlist);
    } catch (error) {
      console.error('Error loading watchlist movies:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const updatedProfile = await profileService.updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const averageRating = userReviews.length > 0 
    ? (userReviews.reduce((sum: number, review: any) => sum + review.rating, 0) / userReviews.length).toFixed(1)
    : '0.0';

  const removeFromFavorites = async (movieId: number) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter((id: number) => id !== movieId);
    await profileService.updateFavorites(updatedFavorites);
    loadFavoriteMovies();
  };

  const removeFromWatchlist = async (movieId: number) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const updatedWatchlist = watchlist.filter((id: number) => id !== movieId);
    await profileService.updateWatchlist(updatedWatchlist);
    loadWatchlistMovies();
  };

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
            className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading profile...</p>
            </div>
          ) : (
            <div className="p-8">
              {/* Profile Header */}
              <div className="flex items-start space-x-6 mb-8">
                <div className="flex-shrink-0">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-200">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.full_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Your username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                        >
                          {saving ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          <span>{saving ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          disabled={saving}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {profile?.full_name || profile?.username || 'Anonymous User'}
                        </h2>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-2">@{profile?.username || 'username'}</p>
                      <p className="text-gray-700 mb-4">{profile?.bio || 'No bio yet.'}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {profile ? formatDate(profile.created_at) : 'Recently'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Film className="w-4 h-4" />
                          <span>{userReviews.length} Reviews</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{favoriteMovies.length} Favorites</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bookmark className="w-4 h-4" />
                          <span>{watchlistMovies.length} Watchlist</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>Avg Rating: {averageRating}/10</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'favorites'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Favorites ({favoriteMovies.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('watchlist')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'watchlist'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Watchlist ({watchlistMovies.length})
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">My Reviews ({userReviews.length})</h3>
                
                {userReviews.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Film className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No reviews yet</p>
                    <p className="text-gray-400 text-sm">Start watching movies and share your thoughts!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {userReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.movie_title}</h4>
                            <p className="text-sm text-gray-600">{review.title}</p>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{review.rating}/10</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-2 line-clamp-2">{review.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{formatDate(review.created_at)}</span>
                          <span className={`px-2 py-1 rounded-full ${
                            review.recommendation === 'highly_recommend' ? 'bg-green-100 text-green-700' :
                            review.recommendation === 'recommend' ? 'bg-blue-100 text-blue-700' :
                            review.recommendation === 'neutral' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {review.recommendation.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">My Favorites ({favoriteMovies.length})</h3>
                  
                  {favoriteMovies.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No favorites yet</p>
                      <p className="text-gray-400 text-sm">Start adding movies to your favorites!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {favoriteMovies.map((movie) => (
                        <div key={movie.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                          <div className="relative">
                            <img
                              src={movie.poster_path || 'https://via.placeholder.com/300x450'}
                              alt={movie.title}
                              className="w-full h-32 object-cover"
                            />
                            <button
                              onClick={() => removeFromFavorites(movie.id)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              title="Remove from favorites"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {movie.isGame ? '🎮' : movie.isSeries ? '📺' : movie.isAnime ? '🎌' : '🎬'}
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">{movie.title}</h4>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{new Date(movie.release_date).getFullYear()}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span>{movie.vote_average.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Watchlist Tab */}
              {activeTab === 'watchlist' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">My Watchlist ({watchlistMovies.length})</h3>
                  
                  {watchlistMovies.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No items in watchlist</p>
                      <p className="text-gray-400 text-sm">Add movies you want to watch later!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {watchlistMovies.map((movie) => (
                        <div key={movie.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                          <div className="relative">
                            <img
                              src={movie.poster_path || 'https://via.placeholder.com/300x450'}
                              alt={movie.title}
                              className="w-full h-32 object-cover"
                            />
                            <button
                              onClick={() => removeFromWatchlist(movie.id)}
                              className="absolute top-2 right-2 p-1 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                              title="Remove from watchlist"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {movie.isGame ? '🎮' : movie.isSeries ? '📺' : movie.isAnime ? '🎌' : '🎬'}
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">{movie.title}</h4>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{new Date(movie.release_date).getFullYear()}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span>{movie.vote_average.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};