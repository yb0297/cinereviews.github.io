import { Movie, MovieDetails, Genre } from '../types/movie';

// Expanded mock data with more movies for better search results
const mockMovies: Movie[] = [
  { id: 1, title: "The Dark Knight", poster_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", release_date: "2008-07-18", vote_average: 9.0, vote_count: 28000, genre_ids: [28, 80, 18] },
  { id: 2, title: "Inception", poster_path: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", release_date: "2010-07-16", vote_average: 8.8, vote_count: 32000, genre_ids: [28, 878, 53] },
  { id: 3, title: "Interstellar", poster_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", release_date: "2014-11-07", vote_average: 8.6, vote_count: 29000, genre_ids: [18, 878] },
  { id: 4, title: "Parasite", poster_path: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.", release_date: "2019-05-30", vote_average: 8.5, vote_count: 15000, genre_ids: [35, 18, 53] },
  { id: 5, title: "Dune", poster_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "Paul Atreides, a brilliant young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.", release_date: "2021-10-22", vote_average: 8.0, vote_count: 18000, genre_ids: [12, 18, 878] },
  { id: 6, title: "Everything Everywhere All at Once", poster_path: "https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led.", release_date: "2022-03-25", vote_average: 8.1, vote_count: 12000, genre_ids: [28, 12, 35] },
  { id: 7, title: "Avatar", poster_path: "https://images.pexels.com/photos/7991890/pexels-photo-7991890.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991890/pexels-photo-7991890.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.", release_date: "2009-12-18", vote_average: 7.8, vote_count: 25000, genre_ids: [28, 12, 878] },
  { id: 8, title: "The Avengers", poster_path: "https://images.pexels.com/photos/7991234/pexels-photo-7991234.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991234/pexels-photo-7991234.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.", release_date: "2012-05-04", vote_average: 8.0, vote_count: 22000, genre_ids: [28, 12, 878] },
  { id: 9, title: "Joker", poster_path: "https://images.pexels.com/photos/7991345/pexels-photo-7991345.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991345/pexels-photo-7991345.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.", release_date: "2019-10-04", vote_average: 8.4, vote_count: 19000, genre_ids: [80, 18, 53] },
  { id: 10, title: "Spider-Man: No Way Home", poster_path: "https://images.pexels.com/photos/7991567/pexels-photo-7991567.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991567/pexels-photo-7991567.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.", release_date: "2021-12-17", vote_average: 8.2, vote_count: 21000, genre_ids: [28, 12, 878] },
  { id: 11, title: "Black Panther", poster_path: "https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.", release_date: "2018-02-16", vote_average: 7.3, vote_count: 17000, genre_ids: [28, 12, 18] },
  { id: 12, title: "Top Gun: Maverick", poster_path: "https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission.", release_date: "2022-05-27", vote_average: 8.3, vote_count: 16000, genre_ids: [28, 18] },
  { id: 13, title: "Oppenheimer", poster_path: "https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.", release_date: "2023-07-21", vote_average: 8.7, vote_count: 25000, genre_ids: [18, 36] },
  { id: 14, title: "Oppenheimer", poster_path: "https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg?auto=compress&cs=tinysrgb&w=400", backdrop_path: "https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg?auto=compress&cs=tinysrgb&w=1200", overview: "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.", release_date: "2023-07-21", vote_average: 8.7, vote_count: 25000, genre_ids: [18, 36] },
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
  { id: 36, name: "History" },
];

// 🎬 Sample comments for each movie
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
  6: [
    { user: "Arjun", message: "Insanely creative!", date: "2025-09-08" },
  ],
  7: [
    { user: "Isha", message: "Pandora feels real. Stunning!", date: "2025-09-09" },
  ],
  8: [
    { user: "Rohan", message: "Avengers assemble!", date: "2025-09-10" },
  ],
  9: [
    { user: "Neha", message: "Dark but brilliant.", date: "2025-09-11" },
  ],
  10: [
    { user: "Manish", message: "Best Spidey movie!", date: "2025-09-12" },
  ],
  11: [
    { user: "Divya", message: "Wakanda forever!", date: "2025-09-13" },
  ],
  12: [
    { user: "Rahul", message: "Goosebumps! Maverick rocks.", date: "2025-09-14" },
  ],
  13: [
    { user: "Sophia", message: "Cillian Murphy’s performance was outstanding!", date: "2023-07-23" },
    { user: "Liam", message: "One of Nolan’s best works, very thought-provoking.", date: "2023-07-24" },
  ],
};

export const movieService = {
  async getPopularMovies(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return [...mockMovies].sort((a, b) => b.vote_average - a.vote_average);
  },

  async getTrendingMovies(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    // Sort by a combination of rating and vote count for "trending"
    return [...mockMovies].sort((a, b) => {
      const scoreA = a.vote_average * Math.log(a.vote_count);
      const scoreB = b.vote_average * Math.log(b.vote_count);
      return scoreB - scoreA;
    });
  },

  async searchMovies(query: string): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    
    if (!query.trim()) {
      return mockMovies;
    }

    const searchTerm = query.toLowerCase().trim();
    
    const results = mockMovies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(searchTerm);
      const overviewMatch = movie.overview.toLowerCase().includes(searchTerm);
      const searchWords = searchTerm.split(' ');
      const wordMatch = searchWords.some(word => 
        movie.title.toLowerCase().includes(word) || 
        movie.overview.toLowerCase().includes(word)
      );
      return titleMatch || overviewMatch || wordMatch;
    });

    return results.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      if (aTitle === searchTerm) return -1;
      if (bTitle === searchTerm) return 1;
      if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm)) return -1;
      if (bTitle.startsWith(searchTerm) && !aTitle.startsWith(searchTerm)) return 1;
      if (aTitle.includes(searchTerm) && !bTitle.includes(searchTerm)) return -1;
      if (bTitle.includes(searchTerm) && !aTitle.includes(searchTerm)) return 1;
      return b.vote_average - a.vote_average;
    });
  },

  async getGenres(): Promise<Genre[]> {
    await new Promise(res => setTimeout(res, 100));
    return mockGenres;
  },

  async getComments(movieId: number) {
    await new Promise(res => setTimeout(res, 200));
    return mockComments[movieId] || [];
  }
};
