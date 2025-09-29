export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: 'movie' | 'series' | 'anime' | 'game';
  publishedAt: string;
  author: string;
  tags: string[];
  sourceUrl?: string;
  isBreaking?: boolean;
  readTime?: number;
}

export interface NewsSection {
  title: string;
  items: NewsItem[];
}