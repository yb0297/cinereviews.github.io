// services/movieService.ts
import { Movie, Genre } from "../types/movie";

// Mock movies
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
    genre_ids: [28, 80, 18],
    pros: ["Exceptional performance by Heath Ledger", "Outstanding cinematography and direction", "Complex moral themes", "Incredible action sequences"],
    cons: ["Quite dark and intense", "Long runtime may feel slow to some", "Complex plot requires attention"]
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
    genre_ids: [28, 878, 53],
    pros: ["Mind-bending and original concept", "Stunning visual effects", "Great ensemble cast", "Multiple layer storytelling"],
    cons: ["Can be confusing on first watch", "Complex plot may alienate some viewers", "Pacing can feel slow at times"]
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
    genre_ids: [18, 878],
    pros: ["Breathtaking space visuals", "Emotional father-daughter story", "Scientific accuracy", "Hans Zimmer's incredible score"],
    cons: ["Third act becomes very abstract", "Some scientific explanations are complex", "Can be emotionally heavy"]
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
    genre_ids: [35, 18, 53],
    pros: ["Brilliant social commentary", "Perfect blend of genres", "Outstanding cinematography", "Unpredictable plot twists"],
    cons: ["Requires subtitles for non-Korean speakers", "Dark themes may disturb some", "Complex social messages"]
  },
  { 
    id: 5, 
    title: "Dune", 
    poster_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=400", 
    backdrop_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=1200", 
    overview: "Paul Atreides, a brilliant young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.", 
    release_date: "2021-10-22", 
    vote_average: 8.0, 
    vote_count: 18000, 
    genre_ids: [12, 18, 878],
    pros: ["Stunning desert cinematography", "Epic world-building", "Excellent cast performances", "Faithful to source material"],
    cons: ["Only covers half of the first book", "Slow pacing in parts", "Complex mythology for newcomers"]
  },
  { 
    id: 6, 
    title: "Cyberpunk 2077", 
    poster_path: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400", 
    backdrop_path: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200", 
    overview: "An open-world, action-adventure RPG set in the futuristic Night City, where you play as a cyberpunk mercenary involved in a fight for survival.", 
    release_date: "2020-12-10", 
    vote_average: 8.2, 
    vote_count: 45000, 
    genre_ids: [28, 878, 12],
    isGame: true,
    pros: ["Incredible Night City atmosphere", "Engaging main storyline", "Deep character customization", "Impressive graphics on high-end systems"],
    cons: ["Launch was buggy", "AI behavior can be inconsistent", "Some promised features missing", "Performance issues on older consoles"],
    recommendedRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-4790 or AMD Ryzen 3 3200G",
      memory: "12 GB RAM",
      graphics: "NVIDIA GeForce GTX 1060 6GB or AMD Radeon R9 Fury",
      storage: "70 GB available space"
    },
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-3570K or AMD FX-8310",
      memory: "8 GB RAM", 
      graphics: "NVIDIA GeForce GTX 780 or AMD Radeon RX 470",
      storage: "70 GB available space"
    }
  },
  { 
    id: 7, 
    title: "The Witcher 3", 
    poster_path: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400", 
    backdrop_path: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200", 
    overview: "A story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.", 
    release_date: "2015-05-19", 
    vote_average: 9.3, 
    vote_count: 52000, 
    genre_ids: [12, 14, 18],
    isGame: true,
    pros: ["Exceptional storytelling", "Massive open world", "Meaningful side quests", "Beautiful graphics and music"],
    cons: ["Combat system can feel clunky", "Overwhelming amount of content", "Steep learning curve for newcomers"],
    recommendedRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel CPU Core i7 3770 3.4 GHz or AMD CPU AMD FX-8350 4 GHz",
      memory: "8 GB RAM",
      graphics: "NVIDIA GPU GeForce GTX 770 or AMD GPU Radeon R9 290",
      storage: "50 GB available space"
    },
    minimumRequirements: {
      os: "Windows 7 64-bit", 
      processor: "Intel CPU Core i5-2500K 3.3GHz or AMD A10-5800K APU",
      memory: "6 GB RAM",
      graphics: "NVIDIA GeForce GTX 660 or AMD Radeon HD 7870",
      storage: "50 GB available space"
    }
  },
  { 
    id: 8, 
    title: "Red Dead Redemption 2", 
    poster_path: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400", 
    backdrop_path: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200", 
    overview: "An epic tale of life in America's unforgiving heartland, featuring a vast and atmospheric world that will also provide the foundation for a brand new online multiplayer experience.", 
    release_date: "2018-10-26", 
    vote_average: 9.7, 
    vote_count: 38000, 
    genre_ids: [28, 12, 18],
    isGame: true,
    pros: ["Incredible attention to detail", "Immersive western atmosphere", "Strong narrative and characters", "Stunning visuals"],
    cons: ["Slow pacing may not suit everyone", "Controls can feel heavy", "Long missions with checkpoints"],
    recommendedRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-4770K or AMD Ryzen 5 1500X", 
      memory: "12 GB RAM",
      graphics: "NVIDIA GeForce GTX 1060 6GB or AMD Radeon RX 480 4GB",
      storage: "150 GB available space"
    },
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-2500K or AMD FX-6300",
      memory: "8 GB RAM",
      graphics: "NVIDIA GeForce GTX 770 2GB or AMD Radeon R9 280",
      storage: "150 GB available space"
    }
  },
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
