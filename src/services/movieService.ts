// services/movieService.ts
import { Movie, Genre } from "../types/movie";

// Mock movies
const mockMovies: Movie[] = [
  { id: 1, title: "The Dark Knight", poster_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", release_date: "2008-07-18", vote_average: 9.0, vote_count: 28000, genre_ids: [28, 80, 18] },
  { id: 2, title: "Inception", poster_path: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", release_date: "2010-07-16", vote_average: 8.8, vote_count: 32000, genre_ids: [28, 878, 53] },
  { id: 3, title: "Interstellar", poster_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", release_date: "2014-11-07", vote_average: 8.6, vote_count: 29000, genre_ids: [18, 878] },
  { id: 4, title: "Parasite", poster_path: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.", release_date: "2019-05-30", vote_average: 8.5, vote_count: 15000, genre_ids: [35, 18, 53] },
  { id: 5, title: "Dune", poster_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "Paul Atreides, a brilliant young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.", release_date: "2021-10-22", vote_average: 8.0, vote_count: 18000, genre_ids: [12, 18, 878] },
];

// Mock genres
const mockGenres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 36, name: "History" },
];

// Mock comments
const mockComments: Record<number, { user: string; message: string; date: string }[]> = {
  1: [
    { user: "Aman", message: "Best Batman movie ever!", date: "2025-09-01" },
    { user: "Priya", message: "Heath Ledger’s Joker is legendary.", date: "2025-09-05" },
  ],
  2: [
    { user: "Karan", message: "Mind-bending masterpiece!", date: "2025-09-03" },
  ],
  3: [
    { user: "Meera", message: "Made me cry, so beautiful!", date: "2025-09-04" },
  ],
  4: [
    { user: "Ravi", message: "Parasite blew my mind.", date: "2025-09-06" },
  ],
  5: [
    { user: "Sneha", message: "Epic visuals, loved the desert world.", date: "2025-09-07" },
  ],
};

export const movieService = {
  async getPopularMovies(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return [...mockMovies].sort((a, b) => b.vote_average - a.vote_average);
  },

  async getTrendingMovies(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return [...mockMovies].sort((a, b) => {
      const scoreA = a.vote_average * Math.log(a.vote_count);
      const scoreB = b.vote_average * Math.log(b.vote_count);
      return scoreB - scoreA;
    });
  },

  async searchMovies(query: string): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    if (!query.trim()) return mockMovies;
    const searchTerm = query.toLowerCase().trim();
    return mockMovies.filter(
      movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.overview.toLowerCase().includes(searchTerm)
    );
  },

  async getGenres(): Promise<Genre[]> {
    await new Promise(res => setTimeout(res, 100));
    return mockGenres;
  },

  async getComments(movieId: number) {
    await new Promise(res => setTimeout(res, 200));
    const comments = mockComments[movieId] || [];
    // Map to format expected by component
    return comments.map((c, index) => ({
      id: index + 1,
      author: c.user,
      text: c.message,
    }));
  },
};
