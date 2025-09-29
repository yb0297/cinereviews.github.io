export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  runtime?: number;
  genres?: Genre[];
  pros?: string[];
  cons?: string[];
  // Category-specific fields
  isGame?: boolean;
  isSeries?: boolean;
  isAnime?: boolean;
  watchLink?: string;
  trailerLink?: string;
  buyLink?: string;
  gameplayVideoLink?: string;
  recommendedRequirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  minimumRequirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Review {
  id: string;
  movieId: number;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  helpful: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  spoken_languages: Language[];
  status: string;
  tagline: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface Language {
  iso_639_1: string;
  name: string;
}