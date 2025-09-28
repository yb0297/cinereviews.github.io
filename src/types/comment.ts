export interface Comment {
  id: string;
  user_id: string;
  movie_id: number;
  movie_title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_avatar?: string;
}

export interface CommentFormData {
  content: string;
}