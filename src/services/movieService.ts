import { Movie, MovieDetails, Genre } from '../types/movie';

// Mock data
const mockMovies: Movie[] = [
  { id: 1, title: "The Dark Knight", poster_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "When the menace known as the Joker wreaks havoc...", release_date: "2008-07-18", vote_average: 9.0, vote_count: 28000, genre_ids: [28, 80, 18] },
  { id: 2, title: "Inception", poster_path: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A thief who steals corporate secrets...", release_date: "2010-07-16", vote_average: 8.8, vote_count: 32000, genre_ids: [28, 878, 53] },
  { id: 3, title: "Interstellar", poster_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A team of explorers travel through a wormhole...", release_date: "2014-11-07", vote_average: 8.6, vote_count: 29000, genre_ids: [18, 878] },
  { id: 4, title: "Parasite", poster_path: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A poor family schemes...", release_date: "2019-05-30", vote_average: 8.5, vote_count: 15000, genre_ids: [35, 18, 53] },
  { id: 5, title: "Dune", poster_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "Paul Atreides, a brilliant young man...", release_date: "2021-10-22", vote_average: 8.0, vote_count: 18000, genre_ids: [12, 18, 878] },
  { id: 6, title: "Everything Everywhere All at Once", poster_path: "https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "An aging Chinese immigrant...", release_date: "2022-03-25", vote_average: 8.1, vote_count: 12000, genre_ids: [28, 12, 35] },
];

const mockGenres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

export const movieService = {
  async getPopularMovies(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return mockMovies;
  },

  async searchMovies(query: string): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    if (!query.trim()) return mockMovies;
    return mockMovies.filter(m => m.title.toLowerCase().includes(query.toLowerCase().trim()));
  },
};
