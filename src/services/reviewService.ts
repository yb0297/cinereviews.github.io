import { supabase } from '../lib/supabase';
import { Review, ReviewFormData } from '../types/review';
import { fallbackReviewService } from './fallbackReviewService';

export const reviewService = {
  async getReviewsForMovie(movieId: number): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            full_name,
            username,
            avatar_url
          )
        `)
        .eq('movie_id', movieId)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase error, using fallback storage:', error);
        return fallbackReviewService.getReviewsForMovie(movieId);
      }

      // Transform the data to include user information
      return (data || []).map((review: any) => ({
        ...review,
        user_name: review.profiles?.full_name || review.profiles?.username || 'Anonymous User',
        user_avatar: review.profiles?.avatar_url || null
      }));
    } catch (error) {
      console.warn('Database connection failed, using fallback storage:', error);
      return fallbackReviewService.getReviewsForMovie(movieId);
    }
  },

  async getUserReviews(userId?: string): Promise<Review[]> {
    let targetUserId = userId;
    
    if (!targetUserId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      targetUserId = user.id;
    }

    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles (
          full_name,
          username,
          avatar_url
        )
      `)
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user reviews:', error);
      return [];
    }

    return (data || []).map((review: any) => ({
      ...review,
      user_name: review.profiles?.full_name || review.profiles?.username || 'Anonymous User',
      user_avatar: review.profiles?.avatar_url || null
    }));
  },

  async createReview(movieId: number, movieTitle: string, reviewData: ReviewFormData): Promise<Review | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to create a review');
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          movie_id: movieId,
          movie_title: movieTitle,
          ...reviewData
        })
        .select(`
          *,
          profiles (
            full_name,
            username,
            avatar_url
          )
        `)
        .single();

      if (error) {
        console.warn('Supabase error, using fallback storage:', error);
        return fallbackReviewService.createReview(
          movieId, 
          movieTitle, 
          reviewData, 
          user.id, 
          user.user_metadata?.full_name || user.email || 'Anonymous User'
        );
      }

      return {
        ...data,
        user_name: data.profiles?.full_name || data.profiles?.username || 'Anonymous User',
        user_avatar: data.profiles?.avatar_url || null
      };
    } catch (error) {
      console.warn('Database connection failed, using fallback storage:', error);
      return fallbackReviewService.createReview(
        movieId, 
        movieTitle, 
        reviewData, 
        user.id, 
        user.user_metadata?.full_name || user.email || 'Anonymous User'
      );
    }
  },

  async updateReview(reviewId: string, reviewData: Partial<ReviewFormData>): Promise<Review | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to update a review');
    }

    const { data, error } = await supabase
      .from('reviews')
      .update({
        ...reviewData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .select(`
        *,
        profiles (
          full_name,
          username,
          avatar_url
        )
      `)
      .single();

    if (error) {
      console.error('Error updating review:', error);
      throw error;
    }

    return {
      ...data,
      user_name: data.profiles?.full_name || data.profiles?.username || 'Anonymous User',
      user_avatar: data.profiles?.avatar_url || null
    };
  },

  async deleteReview(reviewId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to delete a review');
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting review:', error);
      throw error;
    }

    return true;
  },

  async getUserReviewForMovie(movieId: number): Promise<Review | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            full_name,
            username,
            avatar_url
          )
        `)
        .eq('movie_id', movieId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Supabase error, using fallback storage:', error);
        return fallbackReviewService.getUserReviewForMovie(movieId, user.id);
      }

      if (!data) return null;

      return {
        ...data,
        user_name: data.profiles?.full_name || data.profiles?.username || 'Anonymous User',
        user_avatar: data.profiles?.avatar_url || null
      };
    } catch (error) {
      console.warn('Database connection failed, using fallback storage:', error);
      return fallbackReviewService.getUserReviewForMovie(movieId, user.id);
    }
  }
};