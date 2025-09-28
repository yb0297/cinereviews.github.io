import { Review, ReviewFormData } from '../types/review';

// Enhanced localStorage service that simulates a shared database
// All reviews are stored in a global key, making them visible to all users
export const enhancedReviewService = {
  getGlobalStorageKey: () => 'cinereview_global_reviews',
  getGlobalUserStorageKey: () => 'cinereview_global_users',

  getAllReviews(): Review[] {
    try {
      const stored = localStorage.getItem(this.getGlobalStorageKey());
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading global reviews from localStorage:', error);
      return [];
    }
  },

  saveAllReviews(reviews: Review[]): void {
    try {
      localStorage.setItem(this.getGlobalStorageKey(), JSON.stringify(reviews));
    } catch (error) {
      console.error('Error saving global reviews to localStorage:', error);
    }
  },

  getReviewsForMovie(movieId: number): Review[] {
    const allReviews = this.getAllReviews();
    return allReviews.filter(review => review.movie_id === movieId)
                     .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getUserReviews(userId: string): Review[] {
    const allReviews = this.getAllReviews();
    return allReviews.filter(review => review.user_id === userId)
                     .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  createReview(movieId: number, movieTitle: string, reviewData: ReviewFormData, userId: string, userName: string): Review {
    const allReviews = this.getAllReviews();
    
    // Check if user already has a review for this movie
    const existingReviewIndex = allReviews.findIndex(r => r.user_id === userId && r.movie_id === movieId);
    
    const review: Review = {
      id: existingReviewIndex >= 0 ? allReviews[existingReviewIndex].id : `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      movie_id: movieId,
      movie_title: movieTitle,
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      pros: reviewData.pros,
      cons: reviewData.cons,
      recommendation: reviewData.recommendation,
      created_at: existingReviewIndex >= 0 ? allReviews[existingReviewIndex].created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_name: userName,
      user_avatar: undefined
    };

    // Update existing review or add new one
    if (existingReviewIndex >= 0) {
      allReviews[existingReviewIndex] = review;
    } else {
      allReviews.push(review);
    }

    this.saveAllReviews(allReviews);
    return review;
  },

  updateReview(reviewId: string, reviewData: Partial<ReviewFormData>, userId: string): Review | null {
    const allReviews = this.getAllReviews();
    const reviewIndex = allReviews.findIndex(r => r.id === reviewId && r.user_id === userId);
    
    if (reviewIndex === -1) return null;

    const updatedReview = {
      ...allReviews[reviewIndex],
      ...reviewData,
      updated_at: new Date().toISOString()
    };
    
    allReviews[reviewIndex] = updatedReview;
    this.saveAllReviews(allReviews);

    return updatedReview;
  },

  deleteReview(reviewId: string, userId: string): boolean {
    try {
      const allReviews = this.getAllReviews();
      const filteredReviews = allReviews.filter(r => !(r.id === reviewId && r.user_id === userId));
      
      if (filteredReviews.length === allReviews.length) {
        return false; // No review was deleted
      }
      
      this.saveAllReviews(filteredReviews);
      return true;
    } catch (error) {
      console.error('Error deleting review from localStorage:', error);
      return false;
    }
  },

  getUserReviewForMovie(movieId: number, userId: string): Review | null {
    const allReviews = this.getAllReviews();
    return allReviews.find(r => r.user_id === userId && r.movie_id === movieId) || null;
  },

  // Initialize with some sample data for demonstration
  initializeSampleData(): void {
    const existingReviews = this.getAllReviews();
    if (existingReviews.length > 0) return; // Already has data

    const sampleReviews: Review[] = [
      {
        id: 'sample_1',
        user_id: 'user_demo_1',
        movie_id: 157336,
        movie_title: 'Interstellar',
        rating: 9,
        title: 'Mind-blowing sci-fi masterpiece!',
        content: 'Christopher Nolan has outdone himself with this incredible journey through space and time. The emotional depth combined with stunning visuals makes this a must-watch.',
        pros: ['Amazing visual effects', 'Emotional storyline', 'Outstanding soundtrack by Hans Zimmer'],
        cons: ['Complex plot might confuse some viewers', 'Long runtime'],
        recommendation: 'highly_recommend',
        created_at: '2025-09-27T10:30:00.000Z',
        updated_at: '2025-09-27T10:30:00.000Z',
        user_name: 'Sarah Johnson',
        user_avatar: undefined
      },
      {
        id: 'sample_2',
        user_id: 'user_demo_2',
        movie_id: 157336,
        movie_title: 'Interstellar',
        rating: 8,
        title: 'Great movie but could be shorter',
        content: 'While I appreciated the scientific accuracy and emotional core, I felt the movie dragged in certain parts. Still, definitely worth watching for the experience.',
        pros: ['Scientific accuracy', 'Great acting by McConaughey', 'Beautiful cinematography'],
        cons: ['Too long', 'Some scenes feel unnecessary'],
        recommendation: 'recommend',
        created_at: '2025-09-26T15:45:00.000Z',
        updated_at: '2025-09-26T15:45:00.000Z',
        user_name: 'Mike Chen',
        user_avatar: undefined
      },
      {
        id: 'sample_3',
        user_id: 'user_demo_3',
        movie_id: 550,
        movie_title: 'Fight Club',
        rating: 10,
        title: 'A perfect psychological thriller',
        content: 'This movie completely changed my perspective on modern society. The twist ending is legendary and the performances are flawless.',
        pros: ['Incredible plot twist', 'Outstanding performances', 'Deep social commentary'],
        cons: ['Dark themes might not be for everyone'],
        recommendation: 'highly_recommend',
        created_at: '2025-09-25T20:15:00.000Z',
        updated_at: '2025-09-25T20:15:00.000Z',
        user_name: 'Alex Rodriguez',
        user_avatar: undefined
      }
    ];

    this.saveAllReviews(sampleReviews);
    console.log('Sample reviews initialized for demonstration');
  }
};