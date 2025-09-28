import { Comment, CommentFormData } from '../types/comment';
import { supabase } from '../lib/supabase';

export const commentService = {
  async getCommentsForMovie(movieId: number): Promise<Comment[]> {
    try {
      const { data, error } = await supabase
        .from('comments')
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
        console.warn('Supabase error:', error);
        return [];
      }

      // Transform the data to include user information
      return (data || []).map((comment: any) => ({
        ...comment,
        user_name: comment.profiles?.full_name || comment.profiles?.username || 'Anonymous User',
        user_avatar: comment.profiles?.avatar_url || null
      }));
    } catch (error) {
      console.warn('Database connection failed:', error);
      return [];
    }
  },

  async getUserComments(userId?: string): Promise<Comment[]> {
    let targetUserId = userId;
    
    if (!targetUserId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      targetUserId = user.id;
    }

    const { data, error } = await supabase
      .from('comments')
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
      console.error('Error fetching user comments:', error);
      return [];
    }

    return (data || []).map((comment: any) => ({
      ...comment,
      user_name: comment.profiles?.full_name || comment.profiles?.username || 'Anonymous User',
      user_avatar: comment.profiles?.avatar_url || null
    }));
  },

  async createComment(movieId: number, movieTitle: string, commentData: CommentFormData): Promise<Comment | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to create a comment');
      }

      const { data, error } = await supabase
        .from('comments')
        .insert({
          user_id: user.id,
          movie_id: movieId,
          movie_title: movieTitle,
          content: commentData.content
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
        console.warn('Supabase error:', error);
        return null;
      }

      return {
        ...data,
        user_name: data.profiles?.full_name || data.profiles?.username || 'Anonymous User',
        user_avatar: data.profiles?.avatar_url || null
      };
    } catch (error) {
      console.warn('Database connection failed:', error);
      return null;
    }
  },

  async updateComment(commentId: string, commentData: Partial<CommentFormData>): Promise<Comment | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to update a comment');
      }

      const { data, error } = await supabase
        .from('comments')
        .update({
          content: commentData.content,
          updated_at: new Date().toISOString()
        })
        .eq('id', commentId)
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
        console.warn('Supabase error:', error);
        return null;
      }

      return {
        ...data,
        user_name: data.profiles?.full_name || data.profiles?.username || 'Anonymous User',
        user_avatar: data.profiles?.avatar_url || null
      };
    } catch (error) {
      console.warn('Database connection failed:', error);
      return null;
    }
  },

  async deleteComment(commentId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to delete a comment');
      }

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) {
        console.warn('Supabase error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.warn('Database connection failed:', error);
      return false;
    }
  }
};