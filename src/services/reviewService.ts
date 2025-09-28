import { Review, ReviewFormData } from '../types/review';
import { enhancedReviewService } from './enhancedReviewService';
import { databaseReviewService } from './databaseReviewService';
import { simpleAuth } from '../lib/simpleAuth';

// Initialize sample data (for both localStorage and database)
let initialized = false;

const initializeSampleData = async () => {
  if (initialized) return;
  initialized = true;
  
  // Try database first, then fall back to localStorage
  if (databaseReviewService.isAvailable()) {
    console.log('Database available, initializing sample data in database');
    await databaseReviewService.initializeSampleData();
  } else {
    console.log('Database not available, initializing sample data in localStorage');
    enhancedReviewService.initializeSampleData();
  }
};

// Initialize on import
initializeSampleData();

export const reviewService = {
  async getReviewsForMovie(movieId: number): Promise<Review[]> {
    // Try database first, then fall back to localStorage
    if (databaseReviewService.isAvailable()) {
      const dbReviews = await databaseReviewService.getReviewsForMovie(movieId);
      if (dbReviews.length > 0 || !enhancedReviewService.getAllReviews().length) {
        return dbReviews;
      }
    }
    
    return enhancedReviewService.getReviewsForMovie(movieId);
  },

  async getUserReviews(userId?: string): Promise<Review[]> {
    let targetUserId = userId;
    
    if (!targetUserId) {
      const user = simpleAuth.getCurrentUser();
      if (!user) return [];
      targetUserId = user.id;
    }

    // Try database first, then fall back to localStorage
    if (databaseReviewService.isAvailable()) {
      return await databaseReviewService.getUserReviews(targetUserId);
    }
    
    return enhancedReviewService.getUserReviews(targetUserId);
  },

  async createReview(movieId: number, movieTitle: string, reviewData: ReviewFormData): Promise<Review | null> {
    const user = simpleAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User must be authenticated to create a review');
    }

    // Try database first, then fall back to localStorage
    if (databaseReviewService.isAvailable()) {
      return await databaseReviewService.createReview(
        movieId, 
        movieTitle, 
        reviewData, 
        user.id, 
        user.full_name
      );
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

    // Try database first, then fall back to localStorage
    if (databaseReviewService.isAvailable()) {
      return await databaseReviewService.updateReview(reviewId, reviewData, user.id);
    }

    return enhancedReviewService.updateReview(reviewId, reviewData, user.id);
  },

  async deleteReview(reviewId: string): Promise<boolean> {
    const user = simpleAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User must be authenticated to delete a review');
    }

    // Try database first, then fall back to localStorage
    if (databaseReviewService.isAvailable()) {
      return await databaseReviewService.deleteReview(reviewId, user.id);
    }

    return enhancedReviewService.deleteReview(reviewId, user.id);
  },

  async getUserReviewForMovie(movieId: number): Promise<Review | null> {
    const user = simpleAuth.getCurrentUser();
    
    if (!user) return null;

    // Try database first, then fall back to localStorage
    if (databaseReviewService.isAvailable()) {
      return await databaseReviewService.getUserReviewForMovie(movieId, user.id);
    }

    return enhancedReviewService.getUserReviewForMovie(movieId, user.id);
  }
};