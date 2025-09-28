import { Review, ReviewFormData } from '../types/review';
import { supabase } from '../lib/supabase';

// Database-backed review service using Supabase
export const databaseReviewService = {
  // Check if database is available
  isAvailable(): boolean {
    return supabase && typeof supabase.from === 'function';
  },

  async getReviewsForMovie(movieId: number): Promise<Review[]> {
    if (!this.isAvailable()) {
      console.warn('Database not available, falling back to localStorage');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('movie_id', movieId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }

      return (data || []).map((review: any) => ({
        ...review,
        user_name: review.profiles?.full_name || review.profiles?.username || 'Anonymous User',
        user_avatar: review.profiles?.avatar_url
      }));
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  },

  async getUserReviews(userId: string): Promise<Review[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user reviews:', error);
        return [];
      }

      return (data || []).map((review: any) => ({
        ...review,
        user_name: review.profiles?.full_name || review.profiles?.username || 'Anonymous User',
        user_avatar: review.profiles?.avatar_url
      }));
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  },

  async createReview(
    movieId: number,
    movieTitle: string,
    reviewData: ReviewFormData,
    userId: string,
    userName: string
  ): Promise<Review | null> {
    if (!this.isAvailable()) {
      console.warn('Database not available');
      return null;
    }

    try {
      // Check if user already has a review for this movie
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('id')
        .eq('user_id', userId)
        .eq('movie_id', movieId)
        .single();

      const reviewRecord = {
        user_id: userId,
        movie_id: movieId,
        movie_title: movieTitle,
        rating: reviewData.rating,
        title: reviewData.title,
        content: reviewData.content,
        pros: reviewData.pros,
        cons: reviewData.cons,
        recommendation: reviewData.recommendation,
        updated_at: new Date().toISOString()
      };

      let result;
      if (existingReview) {
        // Update existing review
        result = await supabase
          .from('reviews')
          .update(reviewRecord)
          .eq('id', existingReview.id)
          .select(`
            *,
            profiles:user_id (
              username,
              full_name,
              avatar_url
            )
          `)
          .single();
      } else {
        // Create new review
        result = await supabase
          .from('reviews')
          .insert(reviewRecord)
          .select(`
            *,
            profiles:user_id (
              username,
              full_name,
              avatar_url
            )
          `)
          .single();
      }

      const { data, error } = result;

      if (error) {
        console.error('Error creating/updating review:', error);
        return null;
      }

      return {
        ...data,
        user_name: data.profiles?.full_name || data.profiles?.username || userName,
        user_avatar: data.profiles?.avatar_url
      };
    } catch (error) {
      console.error('Database error:', error);
      return null;
    }
  },

  async updateReview(reviewId: string, reviewData: Partial<ReviewFormData>, userId: string): Promise<Review | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .update({
          ...reviewData,
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId)
        .eq('user_id', userId)
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        console.error('Error updating review:', error);
        return null;
      }

      return {
        ...data,
        user_name: data.profiles?.full_name || data.profiles?.username || 'Anonymous User',
        user_avatar: data.profiles?.avatar_url
      };
    } catch (error) {
      console.error('Database error:', error);
      return null;
    }
  },

  async deleteReview(reviewId: string, userId: string): Promise<boolean> {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting review:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Database error:', error);
      return false;
    }
  },

  async getUserReviewForMovie(movieId: number, userId: string): Promise<Review | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', userId)
        .eq('movie_id', movieId)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        ...data,
        user_name: data.profiles?.full_name || data.profiles?.username || 'Anonymous User',
        user_avatar: data.profiles?.avatar_url
      };
    } catch (error) {
      console.error('Database error:', error);
      return null;
    }
  },

  // Create or update user profile
  async ensureUserProfile(userId: string, userData: { username: string; full_name?: string }): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          username: userData.username,
          full_name: userData.full_name || userData.username,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) {
        console.error('Error creating/updating profile:', error);
      }
    } catch (error) {
      console.error('Database error:', error);
    }
  },

  // Initialize sample data in database
  async initializeSampleData(): Promise<void> {
    if (!this.isAvailable()) {
      console.log('Database not available, skipping sample data initialization');
      return;
    }

    try {
      // Check if reviews already exist
      const { data: existingReviews } = await supabase
        .from('reviews')
        .select('id')
        .limit(1);

      if (existingReviews && existingReviews.length > 0) {
        console.log('Sample data already exists in database');
        return;
      }

      // Create sample user profiles
      const sampleProfiles = [
        {
          id: 'user_demo_1',
          username: 'sarah_johnson',
          full_name: 'Sarah Johnson',
          email: 'sarah@example.com'
        },
        {
          id: 'user_demo_2',
          username: 'mike_chen',
          full_name: 'Mike Chen',
          email: 'mike@example.com'
        },
        {
          id: 'user_demo_3',
          username: 'alex_rodriguez',
          full_name: 'Alex Rodriguez',
          email: 'alex@example.com'
        }
      ];

      // Insert sample profiles
      await supabase.from('profiles').upsert(sampleProfiles, { onConflict: 'id' });

      // Create sample reviews
      const sampleReviews = [
        {
          user_id: 'user_demo_1',
          movie_id: 157336,
          movie_title: 'Interstellar',
          rating: 9,
          title: 'Mind-blowing sci-fi masterpiece!',
          content: 'Christopher Nolan has outdone himself with this incredible journey through space and time. The emotional depth combined with stunning visuals makes this a must-watch.',
          pros: ['Amazing visual effects', 'Emotional storyline', 'Outstanding soundtrack by Hans Zimmer'],
          cons: ['Complex plot might confuse some viewers', 'Long runtime'],
          recommendation: 'highly_recommend',
          created_at: '2025-09-27T10:30:00.000Z'
        },
        {
          user_id: 'user_demo_2',
          movie_id: 157336,
          movie_title: 'Interstellar',
          rating: 8,
          title: 'Great movie but could be shorter',
          content: 'While I appreciated the scientific accuracy and emotional core, I felt the movie dragged in certain parts. Still, definitely worth watching for the experience.',
          pros: ['Scientific accuracy', 'Great acting by McConaughey', 'Beautiful cinematography'],
          cons: ['Too long', 'Some scenes feel unnecessary'],
          recommendation: 'recommend',
          created_at: '2025-09-26T15:45:00.000Z'
        },
        {
          user_id: 'user_demo_3',
          movie_id: 550,
          movie_title: 'Fight Club',
          rating: 10,
          title: 'A perfect psychological thriller',
          content: 'This movie completely changed my perspective on modern society. The twist ending is legendary and the performances are flawless.',
          pros: ['Incredible plot twist', 'Outstanding performances', 'Deep social commentary'],
          cons: ['Dark themes might not be for everyone'],
          recommendation: 'highly_recommend',
          created_at: '2025-09-25T20:15:00.000Z'
        }
      ];

      const { error } = await supabase.from('reviews').insert(sampleReviews);

      if (error) {
        console.error('Error inserting sample reviews:', error);
      } else {
        console.log('Sample data initialized in database successfully');
      }
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }
};