export interface ManualComment {
  id: string;
  movieId: number;
  movieTitle: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// Sample comments data
const sampleComments: ManualComment[] = [
  {
    id: 'sample_1',
    movieId: 1,
    movieTitle: 'The Matrix',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    message: 'An incredible movie that redefined sci-fi cinema. The visual effects were groundbreaking for its time.',
    createdAt: '2024-12-15T10:30:00.000Z'
  },
  {
    id: 'sample_2', 
    movieId: 1,
    movieTitle: 'The Matrix',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    message: 'Love the philosophical themes and the action sequences. Keanu Reeves was perfect as Neo.',
    createdAt: '2024-12-14T15:20:00.000Z'
  },
  {
    id: 'sample_3',
    movieId: 2,
    movieTitle: 'Inception',
    name: 'Mike Chen',
    email: 'mike@example.com',
    message: 'Mind-bending plot that keeps you thinking long after the credits roll. Nolan is a genius.',
    createdAt: '2024-12-13T09:45:00.000Z'
  },
  {
    id: 'sample_4',
    movieId: 3,
    movieTitle: 'Interstellar',
    name: 'Emma Davis',
    email: 'emma@example.com',
    message: 'Beautiful cinematography and emotional story about love transcending time and space.',
    createdAt: '2024-12-12T14:10:00.000Z'
  },
  {
    id: 'sample_5',
    movieId: 4,
    movieTitle: 'The Dark Knight',
    name: 'Tom Rodriguez',
    email: 'tom@example.com',
    message: 'Heath Ledger\'s Joker is one of the greatest performances in cinema history. Dark and compelling.',
    createdAt: '2024-12-11T11:25:00.000Z'
  }
];

export const manualCommentService = {
  // Get all comments for a specific movie
  getCommentsForMovie(movieId: number): ManualComment[] {
    return sampleComments.filter(comment => comment.movieId === movieId);
  },

  // Get all comments
  getAllComments(): ManualComment[] {
    return sampleComments;
  },

  // Add a new comment (simulated - in real app this would persist to database)
  addComment(comment: Omit<ManualComment, 'id' | 'createdAt'>): ManualComment {
    const newComment: ManualComment = {
      ...comment,
      id: `comment_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    sampleComments.unshift(newComment); // Add to beginning for most recent first
    return newComment;
  },

  // Get comments by user email
  getCommentsByUser(email: string): ManualComment[] {
    return sampleComments.filter(comment => comment.email === email);
  }
};