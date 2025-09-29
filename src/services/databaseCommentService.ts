import { Comment } from '../types/comment';
import { supabase } from '../lib/supabase';

export const databaseCommentService = {
  // Check if database is available
  isAvailable(): boolean {
    return supabase && typeof supabase.from === 'function';
  },

  async getCommentsForMovie(movieId: number): Promise<Comment[]> {
    if (!this.isAvailable()) {
      console.warn('Database not available, falling back to localStorage');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('comments')
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
        console.error('Error fetching comments:', error);
        return [];
      }

      return (data || []).map((comment: any) => ({
        ...comment,
        user_name: comment.profiles?.full_name || comment.profiles?.username || 'Anonymous User',
        user_avatar: comment.profiles?.avatar_url
      }));
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  },

  async ensureUserProfile(userId: string, userData: { username: string; full_name: string }): Promise<void> {
    if (!this.isAvailable()) {
      console.warn('Database not available for user profile creation');
      return;
    }

    try {
      await supabase
        .from('profiles')
        .upsert({
          id: userId,
          username: userData.username,
          full_name: userData.full_name
        })
        .select();
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  }
};