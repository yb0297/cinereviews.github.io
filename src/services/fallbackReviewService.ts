import { Review, ReviewFormData } from '../types/review';

// Simple localStorage-based review system as fallback
export const fallbackReviewService = {
  getStorageKey: (movieId: number) => `reviews_movie_${movieId}`,
  getUserStorageKey: (userId: string) => `user_reviews_${userId}`,

  getReviewsForMovie(movieId: number): Review[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(movieId));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading reviews from localStorage:', error);
      return [];
    }
  },

  getUserReviews(userId: string): Review[] {
    try {
      const stored = localStorage.getItem(this.getUserStorageKey(userId));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading user reviews from localStorage:', error);
      return [];
    }
  },

  createReview(movieId: number, movieTitle: string, reviewData: ReviewFormData, userId: string, userName: string): Review {
    const review: Review = {
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      movie_id: movieId,
      movie_title: movieTitle,
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      pros: reviewData.pros,
      cons: reviewData.cons,
      recommendation: reviewData.recommendation,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_name: userName,
      user_avatar: undefined
    };

    // Save to movie reviews
    const movieReviews = this.getReviewsForMovie(movieId);
    movieReviews.push(review);
    localStorage.setItem(this.getStorageKey(movieId), JSON.stringify(movieReviews));

    // Save to user reviews
    const userReviews = this.getUserReviews(userId);
    userReviews.push(review);
    localStorage.setItem(this.getUserStorageKey(userId), JSON.stringify(userReviews));

    return review;
  },

  updateReview(reviewId: string, movieId: number, userId: string, reviewData: Partial<ReviewFormData>): Review | null {
    // Update in movie reviews
    const movieReviews = this.getReviewsForMovie(movieId);
    const movieReviewIndex = movieReviews.findIndex(r => r.id === reviewId && r.user_id === userId);
    
    if (movieReviewIndex === -1) return null;

    const updatedReview = {
      ...movieReviews[movieReviewIndex],
      ...reviewData,
      updated_at: new Date().toISOString()
    };
    
    movieReviews[movieReviewIndex] = updatedReview;
    localStorage.setItem(this.getStorageKey(movieId), JSON.stringify(movieReviews));

    // Update in user reviews
    const userReviews = this.getUserReviews(userId);
    const userReviewIndex = userReviews.findIndex(r => r.id === reviewId);
    if (userReviewIndex !== -1) {
      userReviews[userReviewIndex] = updatedReview;
      localStorage.setItem(this.getUserStorageKey(userId), JSON.stringify(userReviews));
    }

    return updatedReview;
  },

  deleteReview(reviewId: string, movieId: number, userId: string): boolean {
    try {
      // Remove from movie reviews
      const movieReviews = this.getReviewsForMovie(movieId);
      const filteredMovieReviews = movieReviews.filter(r => !(r.id === reviewId && r.user_id === userId));
      localStorage.setItem(this.getStorageKey(movieId), JSON.stringify(filteredMovieReviews));

      // Remove from user reviews  
      const userReviews = this.getUserReviews(userId);
      const filteredUserReviews = userReviews.filter(r => r.id !== reviewId);
      localStorage.setItem(this.getUserStorageKey(userId), JSON.stringify(filteredUserReviews));

      return true;
    } catch (error) {
      console.error('Error deleting review from localStorage:', error);
      return false;
    }
  },

  getUserReviewForMovie(movieId: number, userId: string): Review | null {
    const movieReviews = this.getReviewsForMovie(movieId);
    return movieReviews.find(r => r.user_id === userId) || null;
  }
};