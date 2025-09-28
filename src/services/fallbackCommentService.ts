import { Review, ReviewFormData } from '../types/review';

// Simple localStorage-based review system as fallback
export const fallbackReviewService = {
  getStorageKey: (movieId: number) => `reviews_movie_${movieId}`,
  getUserStorageKey: (userId: string) => `user_reviews_${userId}`,

  getReviewsForMovie(movieId: number): Review[] {
    try {
      // Initialize sample reviews if localStorage is empty
      this.initializeSampleReviewsIfNeeded();
      
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
    // If movieId is 0, we need to find the movie from existing reviews
    if (movieId === 0) {
      // Search through all stored reviews to find this review and get the movie ID
      const allKeys = Object.keys(localStorage).filter(key => key.startsWith('reviews_movie_'));
      for (const key of allKeys) {
        try {
          const reviews = JSON.parse(localStorage.getItem(key) || '[]');
          const found = reviews.find((r: any) => r.id === reviewId && r.user_id === userId);
          if (found) {
            movieId = found.movie_id;
            break;
          }
        } catch (e) {
          continue;
        }
      }
      if (movieId === 0) return null;
    }
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
    // If movieId is 0, we need to find the movie from existing reviews
    if (movieId === 0) {
      const allKeys = Object.keys(localStorage).filter(key => key.startsWith('reviews_movie_'));
      for (const key of allKeys) {
        try {
          const reviews = JSON.parse(localStorage.getItem(key) || '[]');
          const found = reviews.find((r: any) => r.id === reviewId && r.user_id === userId);
          if (found) {
            movieId = found.movie_id;
            break;
          }
        } catch (e) {
          continue;
        }
      }
      if (movieId === 0) return false;
    }
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
  },

  initializeSampleReviewsIfNeeded() {
    // Check if sample reviews are already initialized
    const initialized = localStorage.getItem('sample_reviews_initialized');
    if (initialized) return;

    // Sample reviews to demonstrate multi-user functionality
    const sampleReviews = [
      {
        id: 'sample_1',
        user_id: 'user_demo_1',
        movie_id: 157336, // Interstellar
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
        movie_id: 157336, // Interstellar
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
        movie_id: 550, // Fight Club
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
      },
      {
        id: 'sample_4',
        user_id: 'user_demo_1',
        movie_id: 550, // Fight Club
        movie_title: 'Fight Club',
        rating: 8,
        title: 'Thought-provoking but disturbing',
        content: 'An excellent film that makes you question society, but some scenes were quite intense. Brad Pitt and Edward Norton deliver phenomenal performances.',
        pros: ['Excellent acting', 'Unique storytelling', 'Social commentary'],
        cons: ['Very dark themes', 'Violent scenes'],
        recommendation: 'recommend',
        created_at: '2025-09-24T14:20:00.000Z',
        updated_at: '2025-09-24T14:20:00.000Z',
        user_name: 'Sarah Johnson',
        user_avatar: undefined
      },
      {
        id: 'sample_5',
        user_id: 'user_demo_2',
        movie_id: 299536, // Avengers: Infinity War
        movie_title: 'Avengers: Infinity War',
        rating: 9,
        title: 'Epic superhero spectacle!',
        content: 'Marvel has created something truly special here. The way they balanced so many characters and storylines is incredible. Thanos is a phenomenal villain.',
        pros: ['Amazing action sequences', 'Great character development', 'Thanos is compelling'],
        cons: ['Overwhelming for newcomers', 'Cliffhanger ending'],
        recommendation: 'highly_recommend',
        created_at: '2025-09-23T18:00:00.000Z',
        updated_at: '2025-09-23T18:00:00.000Z',
        user_name: 'Mike Chen',
        user_avatar: undefined
      }
    ];

    // Add sample reviews to localStorage
    sampleReviews.forEach(review => {
      const storageKey = this.getStorageKey(review.movie_id);
      const existingReviews = localStorage.getItem(storageKey);
      const reviews = existingReviews ? JSON.parse(existingReviews) : [];
      
      // Only add if not already present
      if (!reviews.find((r: any) => r.id === review.id)) {
        reviews.push(review);
        localStorage.setItem(storageKey, JSON.stringify(reviews));
      }
    });

    // Mark as initialized
    localStorage.setItem('sample_reviews_initialized', 'true');
    console.log('Sample reviews initialized - you can now see reviews from multiple users!');
  }
};