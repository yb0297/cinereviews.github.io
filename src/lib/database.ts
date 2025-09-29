// Database schema types for compatibility (using pg instead of drizzle/neon)

// Simple database interface for PostgreSQL
export interface Comment {
  id: string;
  user_id: string;
  movie_id: number;
  movie_title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  username?: string;
  bio?: string;
  created_at: Date;
  updated_at: Date;
}

// Database connection placeholder - using server API instead
export const db = null;