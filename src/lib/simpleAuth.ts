// Simple authentication system using localStorage
export interface SimpleUser {
  id: string;
  username: string;
  full_name: string;
}

export const simpleAuth = {
  getCurrentUser(): SimpleUser | null {
    try {
      const stored = localStorage.getItem('simple_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
      return null;
    }
  },

  async setUser(username: string): Promise<SimpleUser> {
    const user: SimpleUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username: username.trim(),
      full_name: username.trim()
    };
    
    // Try to create profile in database if available
    try {
      const { databaseCommentService } = await import('../services/databaseCommentService');
      await databaseCommentService.ensureUserProfile(user.id, {
        username: user.username,
        full_name: user.full_name
      });
    } catch (error) {
      console.warn('Could not create user profile in database:', error);
    }
    
    localStorage.setItem('simple_auth_user', JSON.stringify(user));
    return user;
  },

  signOut(): void {
    localStorage.removeItem('simple_auth_user');
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};