import { NewsItem } from '../types/news';

// Sample viral news data for movies, series, anime, and games
const sampleNews: NewsItem[] = [
  {
    id: 'news1',
    title: 'Avatar 3 and 4 Release Dates Confirmed by James Cameron',
    excerpt: 'Director James Cameron announces official release dates for the highly anticipated Avatar sequels, promising groundbreaking underwater sequences.',
    content: 'James Cameron has officially confirmed the release dates for Avatar 3 and Avatar 4, with the third installment set to hit theaters in December 2025...',
    imageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80',
    category: 'movie',
    publishedAt: '2024-12-28T10:00:00Z',
    author: 'Entertainment Weekly',
    tags: ['Avatar', 'James Cameron', 'Sequel', 'Sci-Fi'],
    isBreaking: true,
    readTime: 3
  },
  {
    id: 'news2',
    title: 'The Last of Us Season 2 Gets First Official Trailer',
    excerpt: 'HBO unveils the highly anticipated first trailer for The Last of Us Season 2, featuring Kaitlyn Dever as Abby.',
    content: 'HBO has released the first official trailer for The Last of Us Season 2, giving fans their first glimpse of the post-apocalyptic world...',
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80',
    category: 'series',
    publishedAt: '2024-12-28T08:30:00Z',
    author: 'The Hollywood Reporter',
    tags: ['The Last of Us', 'HBO', 'Trailer', 'Drama'],
    isBreaking: false,
    readTime: 2
  },
  {
    id: 'news3',
    title: 'One Piece Live-Action Season 2 Cast Reveals Major Characters',
    excerpt: 'Netflix announces the complete cast for One Piece Season 2, including actors for Chopper, Robin, and other Straw Hat crew members.',
    content: 'Netflix has revealed the highly anticipated cast members for One Piece Season 2, with several major characters from the anime making their live-action debut...',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    category: 'anime',
    publishedAt: '2024-12-28T12:15:00Z',
    author: 'Variety',
    tags: ['One Piece', 'Netflix', 'Live-Action', 'Anime'],
    isBreaking: true,
    readTime: 4
  },
  {
    id: 'news4',
    title: 'Grand Theft Auto 6 Official Gameplay Trailer Drops',
    excerpt: 'Rockstar Games finally releases the first official gameplay trailer for GTA 6, showcasing the return to Vice City.',
    content: 'After years of anticipation, Rockstar Games has unveiled the first official gameplay trailer for Grand Theft Auto 6...',
    imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80',
    category: 'game',
    publishedAt: '2024-12-28T14:00:00Z',
    author: 'IGN',
    tags: ['GTA 6', 'Rockstar', 'Gameplay', 'Open World'],
    isBreaking: true,
    readTime: 5
  },
  {
    id: 'news5',
    title: 'Marvel Studios Announces Phase 6 Complete Lineup',
    excerpt: 'Kevin Feige reveals the complete lineup for MCU Phase 6, including new X-Men and Fantastic Four projects.',
    content: 'Marvel Studios President Kevin Feige has officially announced the complete lineup for Phase 6 of the Marvel Cinematic Universe...',
    imageUrl: 'https://images.unsplash.com/photo-1635863138275-d9864d3ed51a?w=800&q=80',
    category: 'movie',
    publishedAt: '2024-12-28T09:45:00Z',
    author: 'Marvel.com',
    tags: ['Marvel', 'MCU', 'X-Men', 'Fantastic Four'],
    isBreaking: false,
    readTime: 6
  },
  {
    id: 'news6',
    title: 'Stranger Things Spin-off Series Officially Greenlit',
    excerpt: 'Netflix confirms multiple Stranger Things spin-off series, including one focusing on the Upside Down mythology.',
    content: 'Netflix has officially greenlit several Stranger Things spin-off series, expanding the beloved supernatural universe...',
    imageUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&q=80',
    category: 'series',
    publishedAt: '2024-12-28T11:20:00Z',
    author: 'Entertainment Tonight',
    tags: ['Stranger Things', 'Netflix', 'Spin-off', 'Sci-Fi'],
    isBreaking: false,
    readTime: 3
  },
  {
    id: 'news7',
    title: 'Attack on Titan Creator Announces New Manga Series',
    excerpt: 'Hajime Isayama reveals his upcoming manga project, promising a completely different genre from Attack on Titan.',
    content: 'After concluding the epic Attack on Titan saga, creator Hajime Isayama has announced his next manga project...',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    category: 'anime',
    publishedAt: '2024-12-28T13:30:00Z',
    author: 'Anime News Network',
    tags: ['Attack on Titan', 'Hajime Isayama', 'Manga', 'New Series'],
    isBreaking: false,
    readTime: 4
  },
  {
    id: 'news8',
    title: 'The Elder Scrolls 6 Gets First In-Engine Footage',
    excerpt: 'Bethesda releases the first in-engine footage of The Elder Scrolls 6, showing off the new Creation Engine 2.',
    content: 'Bethesda has finally shared the first in-engine footage of The Elder Scrolls 6, giving fans their first real look at the highly anticipated RPG...',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
    category: 'game',
    publishedAt: '2024-12-28T15:45:00Z',
    author: 'GameSpot',
    tags: ['Elder Scrolls 6', 'Bethesda', 'RPG', 'Creation Engine'],
    isBreaking: true,
    readTime: 4
  }
];

export const newsService = {
  getAllNews: (): NewsItem[] => {
    return sampleNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  getBreakingNews: (): NewsItem[] => {
    return sampleNews.filter(news => news.isBreaking);
  },

  getNewsByCategory: (category: 'movie' | 'series' | 'anime' | 'game'): NewsItem[] => {
    return sampleNews.filter(news => news.category === category);
  },

  getNewsById: (id: string): NewsItem | null => {
    return sampleNews.find(news => news.id === id) || null;
  },

  getLatestNews: (limit: number = 6): NewsItem[] => {
    return sampleNews
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }
};