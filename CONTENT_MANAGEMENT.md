# Content Management Guide

This guide provides instructions for manually adding movies, series, anime, games, and comments to the CineReviews platform.

## Table of Contents
- [Adding Movies](#adding-movies)
- [Adding TV Series](#adding-tv-series)
- [Adding Anime](#adding-anime)
- [Adding Games](#adding-games)
- [Adding Genres](#adding-genres)
- [Managing Comments](#managing-comments)
- [Data Structure Reference](#data-structure-reference)
- [Best Practices](#best-practices)

## Adding Movies

### Step 1: Navigate to Movie Service
Open `src/services/movieService.ts` and locate the `movies` array around line 5.

### Step 2: Add Movie Object
Add a new movie object to the `movies` array following this structure:

```typescript
{
  id: 999, // Unique ID (use next available number)
  title: "Movie Title",
  poster_path: "https://images.pexels.com/photos/xxxxx/image.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/xxxxx/image.jpeg?auto=compress&cs=tinysrgb&w=1200", 
  overview: "Detailed description of the movie plot and story.",
  release_date: "YYYY-MM-DD", // ISO date format
  vote_average: 8.5, // Rating out of 10
  vote_count: 25000, // Number of votes
  genre_ids: [28, 53, 18], // Genre IDs (see genre reference below)
  pros: ["Positive aspect 1", "Positive aspect 2", "Positive aspect 3"],
  cons: ["Negative aspect 1", "Negative aspect 2", "Negative aspect 3"]
}
```

### Example Movie Addition:
```typescript
{
  id: 26,
  title: "Dune",
  poster_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/7991123/pexels-photo-7991123.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Paul Atreides leads nomadic tribes in a revolt against the galactic emperor and his father's evil nemesis when he is thrust into the stewardship of the desert planet Arrakis.",
  release_date: "2021-10-22",
  vote_average: 8.2,
  vote_count: 45000,
  genre_ids: [28, 12, 878],
  pros: ["Stunning visuals and cinematography", "Excellent world-building", "Strong performances", "Hans Zimmer's epic score"],
  cons: ["Complex plot for newcomers", "Slow pacing in parts", "Cliffhanger ending"]
}
```

## Adding TV Series

### Step 1: Navigate to Series Array
In `src/services/movieService.ts`, locate the `series` array around line 100.

### Step 2: Add Series Object
Add a new series object with the `isSeries: true` flag:

```typescript
{
  id: 199, // Use 100+ range for series
  title: "Series Title",
  poster_path: "https://images.pexels.com/photos/xxxxx/image.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/xxxxx/image.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Detailed description of the series plot and story.",
  release_date: "YYYY-MM-DD", // First episode air date
  vote_average: 9.0,
  vote_count: 75000,
  genre_ids: [18, 80, 53],
  isSeries: true, // Required for series
  pros: ["Strong character development", "Engaging storyline", "Great acting"],
  cons: ["Slow start", "Complex plot", "Dark themes"],
  watchLink: "https://www.netflix.com/title/xxxxxxx" // Optional streaming link
}
```

### Example Series Addition:
```typescript
{
  id: 109,
  title: "The Mandalorian",
  poster_path: "https://images.pexels.com/photos/7991987/pexels-photo-7991987.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/7991987/pexels-photo-7991987.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "A lone bounty hunter in the outer reaches of the galaxy far from the authority of the New Republic.",
  release_date: "2019-11-12",
  vote_average: 8.7,
  vote_count: 67000,
  genre_ids: [28, 12, 878],
  isSeries: true,
  pros: ["Excellent special effects", "Strong storytelling", "Great character development", "Baby Yoda appeal"],
  cons: ["Episodic nature", "Some filler episodes", "Requires Star Wars knowledge"],
  watchLink: "https://www.disneyplus.com/series/the-mandalorian"
}
```

## Adding Anime

### Step 1: Navigate to Anime Array
In `src/services/movieService.ts`, locate the `anime` array around line 164.

### Step 2: Add Anime Object
Add a new anime object with the `isAnime: true` flag:

```typescript
{
  id: 299, // Use 200+ range for anime
  title: "Anime Title",
  poster_path: "https://images.pexels.com/photos/xxxxx/image.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/xxxxx/image.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Detailed description of the anime plot and story.",
  release_date: "YYYY-MM-DD",
  vote_average: 8.9,
  vote_count: 34000,
  genre_ids: [16, 28, 14], // Include 16 for Animation
  isAnime: true, // Required for anime
  pros: ["Beautiful animation", "Compelling story", "Great soundtrack"],
  cons: ["Complex plot", "Violent scenes", "Emotional intensity"],
  watchLink: "https://www.crunchyroll.com/anime-title" // Optional streaming link
}
```

### Example Anime Addition:
```typescript
{
  id: 210,
  title: "Spirited Away",
  poster_path: "https://images.pexels.com/photos/7991663/pexels-photo-7991663.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/7991663/pexels-photo-7991663.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
  release_date: "2001-07-20",
  vote_average: 9.3,
  vote_count: 87000,
  genre_ids: [16, 14, 10751],
  isAnime: true,
  pros: ["Masterful animation by Studio Ghibli", "Rich storytelling", "Universal themes", "Memorable characters"],
  cons: ["Can be intense for young children", "Complex mythology", "Emotional moments"],
  watchLink: "https://www.hbomax.com/series/spirited-away"
}
```

## Adding Games

### Step 1: Navigate to Games Array
In `src/services/movieService.ts`, locate the `games` array around line 213.

### Step 2: Add Game Object
Add a new game object with the `isGame: true` flag and system requirements:

```typescript
{
  id: 399, // Use 300+ range for games
  title: "Game Title",
  poster_path: "https://images.pexels.com/photos/xxxxx/image.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/xxxxx/image.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Detailed description of the game and gameplay.",
  release_date: "YYYY-MM-DD",
  vote_average: 8.5,
  vote_count: 42000,
  genre_ids: [28, 12, 40001], // Include gaming genres (40000+ range)
  isGame: true, // Required for games
  pros: ["Engaging gameplay", "Great graphics", "Immersive story"],
  cons: ["Steep learning curve", "Performance issues", "Long load times"],
  buyLink: "https://store.steampowered.com/app/xxxxxx/game-title/", // Purchase link
  recommendedRequirements: {
    os: "Windows 10 64-bit",
    processor: "Intel Core i7-8700K or AMD Ryzen 5 3600",
    memory: "16 GB RAM",
    graphics: "NVIDIA GeForce RTX 3060 or AMD Radeon RX 6600 XT",
    storage: "75 GB available space"
  },
  minimumRequirements: {
    os: "Windows 10 64-bit",
    processor: "Intel Core i5-6600K or AMD Ryzen 3 1300X",
    memory: "8 GB RAM",
    graphics: "NVIDIA GeForce GTX 1060 or AMD Radeon RX 580",
    storage: "75 GB available space"
  }
}
```

### Example Game Addition:
```typescript
{
  id: 310,
  title: "Elden Ring",
  poster_path: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R.R. Martin.",
  release_date: "2022-02-25",
  vote_average: 9.1,
  vote_count: 89000,
  genre_ids: [28, 12, 14, 40001],
  isGame: true,
  pros: ["Massive open world", "Incredible boss fights", "Deep character customization", "Beautiful visuals"],
  cons: ["Very challenging difficulty", "Steep learning curve", "Can be overwhelming"],
  buyLink: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
  recommendedRequirements: {
    os: "Windows 10 64-bit",
    processor: "Intel Core i7-8700K or AMD Ryzen 5 3600",
    memory: "16 GB RAM",
    graphics: "NVIDIA GeForce GTX 1070 or AMD Radeon RX Vega 56",
    storage: "60 GB available space"
  },
  minimumRequirements: {
    os: "Windows 10 64-bit",
    processor: "Intel Core i5-8400 or AMD Ryzen 3 3300X",
    memory: "12 GB RAM",
    graphics: "NVIDIA GeForce GTX 1060 or AMD Radeon RX 580",
    storage: "60 GB available space"
  }
}
```

## Adding Genres

### Step 1: Navigate to Genres Array
In `src/services/movieService.ts`, locate the `mockGenres` array around line 340.

### Step 2: Add Genre Object
Add a new genre following this structure:

```typescript
{ id: 99, name: "Genre Name" }
```

### Current Genre Reference:
- **Movies/Series/Anime**: 1-99
  - 28: Action, 12: Adventure, 16: Animation, 35: Comedy, 80: Crime
  - 99: Documentary, 18: Drama, 10751: Family, 14: Fantasy, 36: History
  - 27: Horror, 10402: Music, 9648: Mystery, 10749: Romance, 878: Science Fiction
  - 10770: TV Movie, 53: Thriller, 10752: War, 37: Western

- **Gaming Genres**: 40000+
  - 40001: RPG, 40002: FPS, 40003: Strategy, 40004: Sports, 40005: Racing
  - 40006: Fighting, 40007: Puzzle, 40008: Simulation, 40009: Platform, 40010: Adventure

### Example Genre Addition:
```typescript
{ id: 40011, name: "Battle Royale" }
```

## Managing Comments

Comments are managed through the Supabase database. To add mock comments for development:

### Step 1: Navigate to Mock Comments
In `src/services/movieService.ts`, locate the `mockComments` object around line 370.

### Step 2: Add Comments for Movie ID
Add comments for a specific movie ID:

```typescript
mockComments[movieId] = [
  {
    user: "Username",
    message: "This is a great movie! Really enjoyed the storyline and acting.",
    timestamp: "2024-01-15T10:30:00Z"
  },
  {
    user: "AnotherUser",
    message: "Amazing cinematography and soundtrack. Highly recommended!",
    timestamp: "2024-01-16T14:20:00Z"
  }
];
```

### Example Comment Addition:
```typescript
mockComments[26] = [ // For Dune (ID: 26)
  {
    user: "SciFiFan92",
    message: "Visually stunning adaptation of Frank Herbert's masterpiece. Can't wait for Part 2!",
    timestamp: "2024-01-20T09:15:00Z"
  },
  {
    user: "MovieCritic",
    message: "Hans Zimmer's score is absolutely incredible. The sound design is phenomenal.",
    timestamp: "2024-01-21T16:45:00Z"
  }
];
```

## Data Structure Reference

### Movie Interface (src/types/movie.ts)
```typescript
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  pros?: string[];
  cons?: string[];
  
  // Content type flags
  isGame?: boolean;
  isSeries?: boolean;
  isAnime?: boolean;
  
  // External links
  watchLink?: string;
  buyLink?: string;
  
  // Game-specific requirements
  recommendedRequirements?: SystemRequirements;
  minimumRequirements?: SystemRequirements;
}
```

### Genre Interface
```typescript
interface Genre {
  id: number;
  name: string;
}
```

### Comment Interface
```typescript
interface Comment {
  user: string;
  message: string;
  timestamp: string;
}
```

## Best Practices

### Content Guidelines
1. **Unique IDs**: Always use unique IDs in the appropriate ranges:
   - Movies: 1-99
   - Series: 100-199
   - Anime: 200-299
   - Games: 300-399

2. **Image URLs**: Use high-quality images from Pexels or similar royalty-free sources
   - Poster: 400px width recommended
   - Backdrop: 1200px width recommended

3. **Release Dates**: Use ISO date format (YYYY-MM-DD)

4. **Ratings**: Use realistic ratings between 1.0-10.0

5. **Content Descriptions**: Write engaging, informative overviews

### Technical Guidelines
1. **Genre Assignment**: Assign relevant genre IDs for accurate filtering
2. **Content Flags**: Always set the appropriate content type flag (isGame, isSeries, isAnime)
3. **External Links**: Include valid streaming/purchase links when available
4. **System Requirements**: For games, include both minimum and recommended specs

### Quality Assurance
1. **Test Content**: After adding content, test that it appears correctly in:
   - Homepage carousel
   - Genre filtering
   - Search functionality
   - Profile favorites/watchlist

2. **Verify Data**: Ensure all required fields are present and properly formatted

3. **Check Responsiveness**: Test content display on different screen sizes

## Troubleshooting

### Common Issues
1. **Content Not Appearing**: Check that the ID is unique and content is added to the correct array
2. **Images Not Loading**: Verify image URLs are accessible and properly formatted
3. **Genre Filtering Issues**: Ensure genre IDs exist in the mockGenres array
4. **Type Badge Issues**: Verify content type flags (isGame, isSeries, isAnime) are set correctly

### Development Testing
- Use browser developer tools to check for console errors
- Verify network requests for image loading
- Test user interactions (favorites, watchlist, comments)

## Support

For technical assistance or questions about content management:
1. Check the console for error messages
2. Verify data structure matches the interface definitions
3. Test individual components in isolation
4. Review existing content examples for reference

---

*Last updated: September 29, 2025*
*Version: 1.0.0*