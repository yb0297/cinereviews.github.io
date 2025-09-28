import { Movie, MovieDetails, Genre } from '../types/movie';

// Mock data for demonstration - in production, this would connect to TMDB API
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    poster_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 28000,
    genre_ids: [28, 80, 18]
  },
  {
    id: 2,
    title: "Inception",
    poster_path: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 32000,
    genre_ids: [28, 878, 53]
  },
  {
    id: 3,
    title: "Interstellar",
    poster_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    release_date: "2014-11-07",
    vote_average: 8.6,
    vote_count: 29000,
    genre_ids: [18, 878]
  },
  {
    id: 4,
    title: "Parasite",
    poster_path: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.",
    release_date: "2019-05-30",
    vote_average: 8.5,
    vote_count: 15000,
    genre_ids: [35, 18, 53]
  },
  {
    id: 5,
    title: "Dune",
    poster_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.",
    release_date: "2021-10-22",
    vote_average: 8.0,
    vote_count: 18000,
    genre_ids: [12, 18, 878]
  },
  {
    id: 6,
    title: "Everything Everywhere All at Once",
    poster_path: "https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led.",
    release_date: "2022-03-25",
    vote_average: 8.1,
    vote_count: 12000,
    genre_ids: [28, 12, 35]
  }
];

const mockGenres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

export const movieService = {
  async getPopularMovies(): Promise<Movie[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMovies;
  },

  async getTrendingMovies(): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMovies.slice(0, 4);
  },

  async getMovieById(id: number): Promise<MovieDetails | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const movie = mockMovies.find(m => m.id === id);
    if (!movie) return null;

    return {
      ...movie,
      runtime: 148,
      genres: movie.genre_ids.map(id => mockGenres.find(g => g.id === id)!).filter(Boolean),
      production_companies: [
        { id: 1, name: "Warner Bros.", logo_path: null }
      ],
      spoken_languages: [
        { iso_639_1: "en", name: "English" }
      ],
      status: "Released",
      tagline: "Why so serious?"
    };
  },

  async searchMovies(query: string): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  },

  async getGenres(): Promise<Genre[]> {
    return mockGenres;
  }
};