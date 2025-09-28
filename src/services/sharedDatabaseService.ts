import { Review, ReviewFormData } from '../types/review';

// Simple shared database service that connects directly to PostgreSQL
export class SharedDatabaseService {
  private apiUrl: string;

  constructor() {
    // Use the backend API endpoint on port 3001
    // In Replit environment, use the actual domain
    const domain = window.location.hostname;
    this.apiUrl = `https://${domain.replace('-5000', '-3001')}/api`;
  }

  async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getReviewsForMovie(movieId: number): Promise<Review[]> {
    try {
      return await this.makeRequest(`/reviews/movie/${movieId}`);
    } catch (error) {
      console.error('Error fetching reviews from shared database:', error);
      return [];
    }
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    try {
      return await this.makeRequest(`/reviews/user/${userId}`);
    } catch (error) {
      console.error('Error fetching user reviews from shared database:', error);
      return [];
    }
  }

  async createReview(
    movieId: number,
    movieTitle: string,
    reviewData: ReviewFormData,
    userId: string,
    userName: string
  ): Promise<Review | null> {
    try {
      return await this.makeRequest('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          movieId,
          movieTitle,
          ...reviewData,
          userId,
          userName,
        }),
      });
    } catch (error) {
      console.error('Error creating review in shared database:', error);
      return null;
    }
  }

  async updateReview(
    reviewId: string,
    reviewData: Partial<ReviewFormData>,
    userId: string
  ): Promise<Review | null> {
    try {
      return await this.makeRequest(`/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({ ...reviewData, userId }),
      });
    } catch (error) {
      console.error('Error updating review in shared database:', error);
      return null;
    }
  }

  async deleteReview(reviewId: string, userId: string): Promise<boolean> {
    try {
      await this.makeRequest(`/reviews/${reviewId}`, {
        method: 'DELETE',
        body: JSON.stringify({ userId }),
      });
      return true;
    } catch (error) {
      console.error('Error deleting review from shared database:', error);
      return false;
    }
  }

  async getUserReviewForMovie(movieId: number, userId: string): Promise<Review | null> {
    try {
      return await this.makeRequest(`/reviews/movie/${movieId}/user/${userId}`);
    } catch (error) {
      console.error('Error fetching user review from shared database:', error);
      return null;
    }
  }
}

export const sharedDatabaseService = new SharedDatabaseService();