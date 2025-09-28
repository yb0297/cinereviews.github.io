import { Review, ReviewFormData } from '../types/review';
import { enhancedReviewService } from './enhancedReviewService';
import { simpleAuth } from '../lib/simpleAuth';

// Initialize sample data
enhancedReviewService.initializeSampleData();

export const reviewService = {
  async getReviewsForMovie(movieId: number): Promise<Review[]> {
    return enhancedReviewService.getReviewsForMovie(movieId);
  },

  async getUserReviews(userId?: string): Promise<Review[]> {
    let targetUserId = userId;
    
    if (!targetUserId) {
      const user = simpleAuth.getCurrentUser();
      if (!user) return [];
      targetUserId = user.id;
    }

    return enhancedReviewService.getUserReviews(targetUserId);
  },

  async createReview(movieId: number, movieTitle: string, reviewData: ReviewFormData): Promise<Review | null> {
    const user = simpleAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User must be authenticated to create a review');
    }

    return enhancedReviewService.createReview(
      movieId, 
      movieTitle, 
      reviewData, 
      user.id, 
      user.full_name
    );
  },

  async updateReview(reviewId: string, reviewData: Partial<ReviewFormData>): Promise<Review | null> {
    const user = simpleAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User must be authenticated to update a review');
    }

    return enhancedReviewService.updateReview(reviewId, reviewData, user.id);
  },

  async deleteReview(reviewId: string): Promise<boolean> {
    const user = simpleAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User must be authenticated to delete a review');
    }

    return enhancedReviewService.deleteReview(reviewId, user.id);
  },

  async getUserReviewForMovie(movieId: number): Promise<Review | null> {
    const user = simpleAuth.getCurrentUser();
    
    if (!user) return null;

    return enhancedReviewService.getUserReviewForMovie(movieId, user.id);
  }
};