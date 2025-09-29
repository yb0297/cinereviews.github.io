import { supabase } from '../lib/supabase';
import { Profile, ProfileFormData } from '../types/profile';

export const profileService = {
  async getCurrentUserProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  async getProfileById(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  async updateProfile(profileData: ProfileFormData): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to update profile');
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

    return data;
  },

  async createOrUpdateProfile(user: any): Promise<Profile | null> {
    // First try to get existing profile
    const existingProfile = await this.getCurrentUserProfile();
    
    if (existingProfile) {
      // Sync localStorage data with profile on sign-in
      await this.syncLocalStorageWithProfile();
      return existingProfile;
    }

    // Get localStorage data to include in new profile
    const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const localWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

    // Create new profile if it doesn't exist
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        username: user.user_metadata?.preferred_username || user.email?.split('@')[0] || null,
        bio: '',
        favorites: localFavorites,
        watchlist: localWatchlist
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }

    return data;
  },

  async syncLocalStorageWithProfile(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const localWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

      // Update profile with localStorage data
      const { error } = await supabase
        .from('profiles')
        .update({
          favorites: localFavorites,
          watchlist: localWatchlist,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error syncing localStorage with profile:', error);
      }
    } catch (error) {
      console.error('Error syncing localStorage with profile:', error);
    }
  },

  async updateFavorites(favorites: number[]): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // If not authenticated, just use localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return;
      }

      // Update both localStorage and database
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      const { error } = await supabase
        .from('profiles')
        .update({
          favorites: favorites,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating favorites in profile:', error);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  },

  async updateWatchlist(watchlist: number[]): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // If not authenticated, just use localStorage
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        return;
      }

      // Update both localStorage and database
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      
      const { error } = await supabase
        .from('profiles')
        .update({
          watchlist: watchlist,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating watchlist in profile:', error);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  },

  async loadUserPreferences(): Promise<{ favorites: number[], watchlist: number[] }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // If not authenticated, use localStorage
        return {
          favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
          watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]')
        };
      }

      // Get from profile database
      const profile = await this.getCurrentUserProfile();
      if (profile && profile.favorites && profile.watchlist) {
        // Sync database data to localStorage
        localStorage.setItem('favorites', JSON.stringify(profile.favorites));
        localStorage.setItem('watchlist', JSON.stringify(profile.watchlist));
        return {
          favorites: profile.favorites,
          watchlist: profile.watchlist
        };
      }

      // Fallback to localStorage if profile doesn't have data
      return {
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]')
      };
    } catch (error) {
      console.error('Error loading user preferences:', error);
      return {
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]')
      };
    }
  }
};