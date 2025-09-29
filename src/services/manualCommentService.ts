export interface ManualComment {
  id: string;
  movieId: number;
  movieTitle: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export const manualCommentService = {
  getStorageKey: () => 'manual_comments',

  getAllComments(): ManualComment[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading manual comments from localStorage:', error);
      return [];
    }
  },

  saveAllComments(comments: ManualComment[]): void {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(comments));
    } catch (error) {
      console.error('Error saving manual comments to localStorage:', error);
    }
  },

  getCommentsForMovie(movieId: number): ManualComment[] {
    const allComments = this.getAllComments();
    return allComments
      .filter(comment => comment.movieId === movieId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addComment(commentData: Omit<ManualComment, 'id' | 'createdAt'>): ManualComment {
    const allComments = this.getAllComments();
    
    const newComment: ManualComment = {
      ...commentData,
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    allComments.push(newComment);
    this.saveAllComments(allComments);
    
    return newComment;
  },

  deleteComment(commentId: string): boolean {
    try {
      const allComments = this.getAllComments();
      const filteredComments = allComments.filter(comment => comment.id !== commentId);
      
      if (filteredComments.length === allComments.length) {
        return false; // No comment was deleted
      }
      
      this.saveAllComments(filteredComments);
      return true;
    } catch (error) {
      console.error('Error deleting manual comment:', error);
      return false;
    }
  },

  // Initialize with sample comments for demonstration
  initializeSampleComments(): void {
    const existingComments = this.getAllComments();
    if (existingComments.length > 0) return; // Already has data

    const sampleComments: ManualComment[] = [
      {
        id: 'sample_1',
        movieId: 1,
        movieTitle: 'The Dark Knight',
        name: 'John Smith',
        email: 'john@example.com',
        message: 'Best Batman movie ever! Heath Ledger\'s performance as the Joker was absolutely phenomenal.',
        createdAt: '2024-12-15T10:30:00.000Z'
      },
      {
        id: 'sample_2',
        movieId: 1,
        movieTitle: 'The Dark Knight',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        message: 'The cinematography and action sequences were incredible. This movie set a new standard for superhero films.',
        createdAt: '2024-12-14T15:45:00.000Z'
      },
      {
        id: 'sample_3',
        movieId: 2,
        movieTitle: 'Inception',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        message: 'Mind-bending masterpiece! Christopher Nolan really outdid himself with this one.',
        createdAt: '2024-12-13T20:15:00.000Z'
      },
      {
        id: 'sample_4',
        movieId: 3,
        movieTitle: 'Interstellar',
        name: 'Emma Davis',
        email: 'emma@example.com',
        message: 'Made me cry! The emotional depth combined with the scientific accuracy was beautiful.',
        createdAt: '2024-12-12T14:20:00.000Z'
      }
    },
    {
      id: 'sample_5',
      movieId: 6,
      movieTitle: 'Cyberpunk 2077',
      name: 'Alex Chen',
      email: 'alex@example.com',
      message: 'Amazing open-world RPG! The graphics and storyline are incredible. Night City feels so alive!',
      createdAt: '2024-12-11T16:30:00.000Z'
    },
    {
      id: 'sample_6',
      movieId: 7,
      movieTitle: 'The Witcher 3',
      name: 'Lisa Wang',
      email: 'lisa@example.com',
      message: 'Best RPG ever made! The side quests are better than most games\' main stories. Geralt is such a great character.',
      createdAt: '2024-12-10T12:45:00.000Z'
    ];

    this.saveAllComments(sampleComments);
    console.log('Sample manual comments initialized');
  }
};

// Initialize sample comments on import
if (typeof window !== 'undefined') {
  manualCommentService.initializeSampleComments();
}