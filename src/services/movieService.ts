// services/movieService.ts
import { Movie, Genre } from "../types/movie";

// Movies data
const movies: Movie[] = [
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
    cons: ["Quite dark and intense", "Long runtime may feel slow to some", "Complex plot requires attention"],
    trailerLink: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    watchLink: "https://www.netflix.com/title/70079583"
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
    cons: ["Can be confusing on first watch", "Complex plot may alienate some viewers", "Pacing can feel slow at times"],
    trailerLink: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    watchLink: "https://www.netflix.com/title/70131314"
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
    cons: ["Third act becomes very abstract", "Some scientific explanations are complex", "Can be emotionally heavy"],
    trailerLink: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    watchLink: "https://www.netflix.com/title/70305903"
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
    cons: ["Requires subtitles for non-Korean speakers", "Dark themes may disturb some", "Complex social messages"],
    trailerLink: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    watchLink: "https://www.hulu.com/movie/parasite-2019"
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
    cons: ["Only covers half of the first book", "Slow pacing in parts", "Complex mythology for newcomers"],
    trailerLink: "https://www.youtube.com/watch?v=n9xhJrPXop4",
    watchLink: "https://www.hbo.com/movies/dune-2021"
  },
  {
    id: 6,
    title: "The Conjuring",
    poster_path: "https://images.pexels.com/photos/7991987/pexels-photo-7991987.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991987/pexels-photo-7991987.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    release_date: "2013-07-19",
    vote_average: 7.5,
    vote_count: 45000,
    genre_ids: [27, 53, 9648],
    pros: ["Genuinely scary atmosphere", "Great performances", "Excellent cinematography", "Classic horror storytelling"],
    cons: ["Very frightening content", "Jump scares may be intense", "Not suitable for sensitive viewers"],
    trailerLink: "https://www.youtube.com/watch?v=k10ETZ41q5o",
    watchLink: "https://www.netflix.com/title/70239506"
  },
  {
    id: 7,
    title: "Superbad",
    poster_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    release_date: "2007-08-17",
    vote_average: 7.6,
    vote_count: 28000,
    genre_ids: [35, 18, 10749],
    pros: ["Hilarious dialogue", "Great chemistry between leads", "Authentic teenage experience", "Memorable supporting characters"],
    cons: ["Crude humor throughout", "Strong language", "May not appeal to all audiences"],
    trailerLink: "https://www.youtube.com/watch?v=4eaZ_48ZYog",
    watchLink: "https://www.netflix.com/title/70056113"
  }
];

// Series data
const series: Movie[] = [
  {
    id: 101,
    title: "Breaking Bad",
    poster_path: "https://images.pexels.com/photos/7991324/pexels-photo-7991324.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991324/pexels-photo-7991324.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
    release_date: "2008-01-20",
    vote_average: 9.5,
    vote_count: 125000,
    genre_ids: [18, 80, 53],
    isSeries: true,
    pros: ["Outstanding character development", "Brilliant writing and acting", "Perfect pacing and tension", "Memorable dialogues"],
    cons: ["Can be very intense", "Slow start for some viewers", "Dark themes throughout"],
    trailerLink: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    watchLink: "https://www.netflix.com/title/70143836"
  },
  {
    id: 104,
    title: "The Walking Dead",
    poster_path: "https://images.pexels.com/photos/7991445/pexels-photo-7991445.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991445/pexels-photo-7991445.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family.",
    release_date: "2010-10-31",
    vote_average: 8.1,
    vote_count: 89000,
    genre_ids: [27, 18, 53],
    isSeries: true,
    pros: ["Intense zombie action", "Character development", "Survival themes", "Post-apocalyptic atmosphere"],
    cons: ["Very violent and gory", "Can be emotionally heavy", "Some seasons weaker than others"],
    trailerLink: "https://www.youtube.com/watch?v=sfAc2U20uyg",
    watchLink: "https://www.netflix.com/title/70177057"
  },
  {
    id: 102,
    title: "Game of Thrones",
    poster_path: "https://images.pexels.com/photos/7991987/pexels-photo-7991987.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991987/pexels-photo-7991987.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    release_date: "2011-04-17",
    vote_average: 9.2,
    vote_count: 98000,
    genre_ids: [18, 14, 28],
    isSeries: true,
    pros: ["Epic fantasy world-building", "Complex political intrigue", "Outstanding production values", "Memorable characters"],
    cons: ["Controversial final seasons", "Very violent content", "Complex plot to follow"],
    trailerLink: "https://www.youtube.com/watch?v=KPLWWIOCOOQ",
    watchLink: "https://www.hbo.com/game-of-thrones"
  },
  {
    id: 103,
    title: "Stranger Things",
    poster_path: "https://images.pexels.com/photos/7991445/pexels-photo-7991445.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991445/pexels-photo-7991445.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    release_date: "2016-07-15",
    vote_average: 8.7,
    vote_count: 76000,
    genre_ids: [18, 14, 27],
    isSeries: true,
    pros: ["Perfect 80s nostalgia", "Great young cast", "Supernatural mystery elements", "Excellent soundtrack"],
    cons: ["Can be scary for younger viewers", "Some seasons weaker than others", "Repetitive plot elements"],
    trailerLink: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    watchLink: "https://www.netflix.com/title/80057281"
  }
];

// Anime data
const anime: Movie[] = [
  {
    id: 201,
    title: "Your Name",
    poster_path: "https://images.pexels.com/photos/7991663/pexels-photo-7991663.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991663/pexels-photo-7991663.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.",
    release_date: "2016-08-26",
    vote_average: 8.2,
    vote_count: 45000,
    genre_ids: [16, 35, 18],
    isAnime: true,
    pros: ["Stunning animation quality", "Emotional storytelling", "Beautiful soundtrack", "Unique time-travel concept"],
    cons: ["Can be confusing at first", "Requires attention to detail", "Emotional intensity"],
    trailerLink: "https://www.youtube.com/watch?v=xU47nhruN-Q",
    watchLink: "https://www.crunchyroll.com/your-name"
  },
  {
    id: 202,
    title: "Attack on Titan",
    poster_path: "https://images.pexels.com/photos/7991887/pexels-photo-7991887.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991887/pexels-photo-7991887.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "Humans fight for survival against giant humanoid Titans that have brought civilization to the brink of extinction.",
    release_date: "2013-04-07",
    vote_average: 9.0,
    vote_count: 67000,
    genre_ids: [16, 28, 18],
    isAnime: true,
    pros: ["Intense action sequences", "Complex mystery elements", "Character development", "Political intrigue"],
    cons: ["Very violent content", "Can be emotionally heavy", "Complex plot"],
    trailerLink: "https://www.youtube.com/watch?v=LHtdKWJdif4",
    watchLink: "https://www.crunchyroll.com/attack-on-titan"
  },
  {
    id: 203,
    title: "Demon Slayer",
    poster_path: "https://images.pexels.com/photos/7991556/pexels-photo-7991556.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/7991556/pexels-photo-7991556.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.",
    release_date: "2019-04-06",
    vote_average: 8.7,
    vote_count: 89000,
    genre_ids: [16, 28, 14],
    isAnime: true,
    pros: ["Incredible animation quality", "Emotional family story", "Amazing fight choreography", "Beautiful art style"],
    cons: ["Violent demon battles", "Can be sad at times", "Fast-paced action"],
    trailerLink: "https://www.youtube.com/watch?v=VQGCKyvzIM4",
    watchLink: "https://www.crunchyroll.com/demon-slayer-kimetsu-no-yaiba"
  }
];

// Games data
const games: Movie[] = [
  {
    id: 301,
    title: "Cyberpunk 2077",
    poster_path: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "An open-world, action-adventure RPG set in the futuristic Night City, where you play as a cyberpunk mercenary involved in a fight for survival.",
    release_date: "2020-12-10",
    vote_average: 8.2,
    vote_count: 45000,
    genre_ids: [28, 878, 40001, 40010],
    isGame: true,
    pros: ["Incredible Night City atmosphere", "Engaging main storyline", "Deep character customization", "Impressive graphics on high-end systems"],
    cons: ["Launch was buggy", "AI behavior can be inconsistent", "Some promised features missing", "Performance issues on older consoles"],
    buyLink: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
    gameplayVideoLink: "https://www.youtube.com/watch?v=BO8lX3hDU30",
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
    id: 302,
    title: "The Witcher 3",
    poster_path: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "A story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    release_date: "2015-05-19",
    vote_average: 9.3,
    vote_count: 52000,
    genre_ids: [12, 14, 40001],
    isGame: true,
    pros: ["Exceptional storytelling", "Massive open world", "Meaningful side quests", "Beautiful graphics and music"],
    cons: ["Combat system can feel clunky", "Overwhelming amount of content", "Steep learning curve for newcomers"],
    buyLink: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/",
    gameplayVideoLink: "https://www.youtube.com/watch?v=c0i88t0Kacs",
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
    id: 303,
    title: "Red Dead Redemption 2",
    poster_path: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdrop_path: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200",
    overview: "An epic tale of life in America's unforgiving heartland, featuring a vast and atmospheric world that will also provide the foundation for a brand new online multiplayer experience.",
    release_date: "2018-10-26",
    vote_average: 9.7,
    vote_count: 38000,
    genre_ids: [28, 12, 40010],
    isGame: true,
    pros: ["Incredible attention to detail", "Immersive western atmosphere", "Strong narrative and characters", "Stunning visuals"],
    cons: ["Slow pacing may not suit everyone", "Controls can feel heavy", "Long missions with checkpoints"],
    buyLink: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/",
    gameplayVideoLink: "https://www.youtube.com/watch?v=gmA6MrX81z4",
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
  }
];

// All content combined
const mockMovies = [...movies, ...series, ...anime, ...games,
];

// Mock genres - comprehensive list for movies, series, anime and games
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
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 14, name: "Fantasy" },
  { id: 37, name: "Western" },
  { id: 10752, name: "War" },
  { id: 99, name: "Documentary" },
  { id: 10402, name: "Music" },
  { id: 10751, name: "Family" },
  { id: 10770, name: "TV Movie" },
  // Game-specific genres
  { id: 40001, name: "RPG" },
  { id: 40002, name: "Shooter" },
  { id: 40003, name: "Strategy" },
  { id: 40004, name: "Racing" },
  { id: 40005, name: "Sports" },
  { id: 40006, name: "Fighting" },
  { id: 40007, name: "Simulation" },
  { id: 40008, name: "Puzzle" },
  { id: 40009, name: "Platformer" },
  { id: 40010, name: "Open World" },
  // Anime-specific genres
  { id: 50001, name: "Slice of Life" },
  { id: 50002, name: "Shounen" },
  { id: 50003, name: "Shoujo" },
  { id: 50004, name: "Mecha" },
  { id: 50005, name: "Supernatural" },
  { id: 50006, name: "School" },
  { id: 50007, name: "Isekai" },
  { id: 50008, name: "Psychological" },
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

// Helper function to populate genres for movies
const populateGenres = (contentList: Movie[]): Movie[] => {
  return contentList.map(item => ({
    ...item,
    genres: item.genre_ids.map(genreId => 
      mockGenres.find(genre => genre.id === genreId)
    ).filter(Boolean) as Genre[]
  }));
};

export const movieService = {
  async getPopularMovies(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return populateGenres([...movies]).sort((a, b) => b.vote_average - a.vote_average);
  },

  async getMovies(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return populateGenres([...movies]);
  },

  async getSeries(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return populateGenres([...series]);
  },

  async getAnime(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return populateGenres([...anime]);
  },

  async getGames(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return populateGenres([...games]);
  },

  async getTrendingMovies(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    const trending = populateGenres([...mockMovies]).sort((a, b) => {
      const scoreA = a.vote_average * Math.log(a.vote_count);
      const scoreB = b.vote_average * Math.log(b.vote_count);
      return scoreB - scoreA;
    });
    return trending;
  },

  async getTopRated(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    return populateGenres([...mockMovies]).sort((a, b) => b.vote_average - a.vote_average).slice(0, 20);
  },

  async getComingSoon(): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    const now = new Date();
    return populateGenres([...mockMovies]).filter(movie => new Date(movie.release_date) > now);
  },

  async searchMovies(query: string): Promise<Movie[]> {
    await new Promise(res => setTimeout(res, 300));
    const allContent = populateGenres([...mockMovies]);
    if (!query.trim()) return allContent;
    const searchTerm = query.toLowerCase().trim();
    return allContent.filter(
      movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.overview.toLowerCase().includes(searchTerm)
    );
  },

  async getContentByCategory(category: string): Promise<Movie[]> {
    switch (category) {
      case 'movies':
        return this.getMovies();
      case 'series':
        return this.getSeries();
      case 'anime':
        return this.getAnime();
      case 'games':
        return this.getGames();
      case 'trending':
        return this.getTrendingMovies();
      case 'top-rated':
        return this.getTopRated();
      case 'coming-soon':
        return this.getComingSoon();
      default:
        return populateGenres([...mockMovies]);
    }
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
