# YBY CineReviews - Content Management Guide

This comprehensive guide will help you add new movies, series, anime, games, reviews, comments, and links to your YBY CineReviews website.

## 📁 File Structure Overview

```
src/
├── services/
│   └── movieService.ts    # Main file where all content data is stored
├── types/
│   └── movie.ts          # TypeScript interface definitions
└── components/           # React components (no edits needed for adding content)
```

## 🎯 Quick Reference - Where to Make Changes

| What you want to add | File to edit | Section |
|---------------------|--------------|---------|
| New Movies | `src/services/movieService.ts` | `movies` array (lines 5-111) |
| New TV Series | `src/services/movieService.ts` | `series` array (lines 114-179) |
| New Anime | `src/services/movieService.ts` | `anime` array (lines 182-231) |
| New Games | `src/services/movieService.ts` | `games` array (lines 234-322) |
| Comments | `src/services/movieService.ts` | `mockComments` object (lines 372-389) |
| Sample Reviews | `src/services/sampleReviewsSetup.ts` | `sampleReviews` array (lines 5-54) |
| Genres | `src/services/movieService.ts` | `mockGenres` array (lines 329-369) |

---

## 🎬 Adding New Content

### 1. Adding Movies

**Location:** `src/services/movieService.ts` - `movies` array (lines 5-111)

**Template:**
```javascript
{
  id: 8, // Use next available ID (check existing movies first)
  title: "Your Movie Title",
  poster_path: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Your movie description here. Keep it engaging and informative.",
  release_date: "2024-01-15", // YYYY-MM-DD format
  vote_average: 8.5, // Rating out of 10
  vote_count: 25000, // Number of reviews/votes
  genre_ids: [28, 878, 53], // See Genre IDs section below
  pros: [
    "Amazing visual effects",
    "Compelling storyline", 
    "Great acting performances",
    "Excellent soundtrack"
  ],
  cons: [
    "Lengthy runtime",
    "Complex plot might confuse some",
    "Some pacing issues in middle"
  ],
  trailerLink: "https://www.youtube.com/watch?v=YOUR_TRAILER_ID",
  watchLink: "https://www.netflix.com/title/YOUR_MOVIE_ID"
}
```

### 2. Adding TV Series

**Location:** `src/services/movieService.ts` - `series` array (lines 114-179)

**Template:**
```javascript
{
  id: 105, // Series IDs start from 101
  title: "Your Series Title",
  poster_path: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Your series description here.",
  release_date: "2024-03-01",
  vote_average: 8.8,
  vote_count: 45000,
  genre_ids: [18, 80, 53],
  isSeries: true, // IMPORTANT: Always include this for series
  pros: [
    "Excellent character development",
    "Gripping storyline",
    "High production value"
  ],
  cons: [
    "Slow start",
    "Complex plot",
    "Violence may disturb some"
  ],
  trailerLink: "https://www.youtube.com/watch?v=YOUR_TRAILER_ID",
  watchLink: "https://www.netflix.com/title/YOUR_SERIES_ID"
}
```

### 3. Adding Anime

**Location:** `src/services/movieService.ts` - `anime` array (lines 182-231)

**Template:**
```javascript
{
  id: 204, // Anime IDs start from 201
  title: "Your Anime Title",
  poster_path: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Your anime description here.",
  release_date: "2024-04-07",
  vote_average: 8.9,
  vote_count: 67000,
  genre_ids: [16, 28, 50002], // Include anime-specific genres (50001-50008)
  isAnime: true, // IMPORTANT: Always include this for anime
  pros: [
    "Beautiful animation",
    "Emotional story",
    "Great soundtrack",
    "Character development"
  ],
  cons: [
    "Some violent scenes",
    "Emotional intensity",
    "Fast-paced action"
  ],
  trailerLink: "https://www.youtube.com/watch?v=YOUR_TRAILER_ID",
  watchLink: "https://www.crunchyroll.com/your-anime-title"
}
```

### 4. Adding Games

**Location:** `src/services/movieService.ts` - `games` array (lines 234-322)

**Template:**
```javascript
{
  id: 304, // Game IDs start from 301
  title: "Your Game Title",
  poster_path: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Your game description here.",
  release_date: "2024-06-15",
  vote_average: 9.1,
  vote_count: 38000,
  genre_ids: [28, 12, 40001, 40010], // Include game-specific genres (40001-40010)
  isGame: true, // IMPORTANT: Always include this for games
  pros: [
    "Incredible graphics",
    "Engaging gameplay",
    "Great storyline",
    "Immersive world"
  ],
  cons: [
    "High system requirements",
    "Steep learning curve",
    "Some bugs at launch"
  ],
  buyLink: "https://store.steampowered.com/app/YOUR_GAME_ID/",
  watchLink: "https://www.youtube.com/watch?v=YOUR_GAMEPLAY_VIDEO", // Optional: gameplay video
  recommendedRequirements: {
    os: "Windows 10 64-bit",
    processor: "Intel Core i7-8700K or AMD Ryzen 5 3600",
    memory: "16 GB RAM",
    graphics: "NVIDIA GeForce RTX 2070 or AMD Radeon RX 6700 XT",
    storage: "80 GB available space"
  },
  minimumRequirements: {
    os: "Windows 10 64-bit",
    processor: "Intel Core i5-6600K or AMD Ryzen 3 2300X",
    memory: "8 GB RAM",
    graphics: "NVIDIA GeForce GTX 1060 or AMD Radeon RX 580",
    storage: "80 GB available space"
  }
}
```

---

## 💬 Adding Comments and Reviews

### Adding Comments

**Location:** `src/services/movieService.ts` - `mockComments` object (lines 372-389)

**How to add:**
```javascript
// Add to the mockComments object
const mockComments: Record<number, { user: string; message: string; date: string }[]> = {
  1: [
    { user: "Aman", message: "Best Batman movie ever!", date: "2025-09-01" },
    { user: "Priya", message: "Heath Ledger's Joker is legendary.", date: "2025-09-05" },
  ],
  // Add comments for your new content
  8: [ // Use the same ID as your movie/series/anime/game
    { user: "YourName", message: "Your review text here!", date: "2025-09-29" },
    { user: "AnotherUser", message: "Loved the visual effects!", date: "2025-09-30" },
  ],
};
```

**Comment Format:**
- `user`: Name of the person who left the comment
- `message`: The actual comment text
- `date`: Date in YYYY-MM-DD format

### Adding Sample Reviews

**Location:** `src/services/sampleReviewsSetup.ts` - `sampleReviews` array (lines 5-54)

Reviews are more detailed than comments and include ratings, pros/cons, and recommendations. They are primarily user-generated through the website interface, but you can add sample/demo reviews for testing.

**Template:**
```javascript
{
  id: 'sample_4', // Use unique ID like 'sample_4', 'sample_5', etc.
  user_id: 'user_demo_4', // Unique user ID
  movie_id: 8, // Must match your movie/series/anime/game ID
  movie_title: 'Your Movie Title', // Must match exactly
  rating: 9, // Rating out of 10
  title: 'Your review headline here',
  content: 'Your detailed review content. This is where you write the full review text explaining your thoughts about the movie.',
  pros: [
    'Amazing visual effects',
    'Great storyline',
    'Excellent acting',
    'Outstanding soundtrack'
  ],
  cons: [
    'Bit too long',
    'Some slow pacing',
    'Complex plot'
  ],
  recommendation: 'highly_recommend', // Options: 'highly_recommend', 'recommend', 'mixed', 'not_recommend'
  created_at: '2025-09-29T14:30:00.000Z', // ISO date format
  updated_at: '2025-09-29T14:30:00.000Z', // Same as created_at for new reviews
  user_name: 'Your Name',
  user_avatar: undefined // Leave as undefined for text-based avatars
}
```

**Recommendation Options:**
- `'highly_recommend'`: 👍 Highly Recommend
- `'recommend'`: ✅ Recommend  
- `'mixed'`: 🤔 Mixed Feelings
- `'not_recommend'`: 👎 Not Recommended

**Important Notes:**
- Reviews are automatically saved to localStorage and will appear on the movie detail pages
- The `movie_id` must match exactly with your content ID
- The `movie_title` should match exactly with your content title  
- Reviews include both simple comments AND detailed analysis with pros/cons
- Users can create reviews through the website interface - these sample reviews are just for demonstration/testing
- Live user reviews are handled by `src/services/reviewService.ts` which manages database storage and user authentication

---

## 🔗 Adding Links (Watch, Trailer, Buy)

### Link Types Available:

1. **trailerLink**: YouTube trailer URL
2. **watchLink**: Streaming platform URL (Netflix, Hulu, etc.)
3. **buyLink**: Purchase link (Steam, Epic Games, etc.) - **Games only**

### Examples:

**Trailer Links:**
```javascript
trailerLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

**Watch Links:**
```javascript
// Netflix
watchLink: "https://www.netflix.com/title/70079583"

// Hulu  
watchLink: "https://www.hulu.com/movie/your-movie"

// HBO Max
watchLink: "https://www.hbo.com/movies/your-movie"

// Crunchyroll (Anime)
watchLink: "https://www.crunchyroll.com/your-anime-title"
```

**Buy Links (Games only):**
```javascript
buyLink: "https://store.steampowered.com/app/1091500/Your_Game_Title/"
```

---

## 🏷️ Genre IDs Reference

### Movie/Series/Anime Genres (1-50000):
- **28**: Action
- **12**: Adventure  
- **16**: Animation
- **35**: Comedy
- **80**: Crime
- **18**: Drama
- **878**: Science Fiction
- **53**: Thriller
- **27**: Horror
- **9648**: Mystery
- **10749**: Romance
- **14**: Fantasy
- **37**: Western
- **10752**: War
- **99**: Documentary
- **10402**: Music
- **10751**: Family

### Game-Specific Genres (40001-40010):
- **40001**: RPG
- **40002**: Shooter
- **40003**: Strategy
- **40004**: Racing
- **40005**: Sports
- **40006**: Fighting
- **40007**: Simulation
- **40008**: Puzzle
- **40009**: Platformer
- **40010**: Open World

### Anime-Specific Genres (50001-50008):
- **50001**: Slice of Life
- **50002**: Shounen
- **50003**: Shoujo
- **50004**: Mecha
- **50005**: Supernatural
- **50006**: School
- **50007**: Isekai
- **50008**: Psychological

---

## 📷 Getting Images

### Recommended Image Sources:
1. **Pexels** (Free): `https://images.pexels.com/photos/XXXXX/`
2. **Unsplash** (Free): `https://images.unsplash.com/photo-XXXXX/`
3. **Official movie/game/anime posters** (Fair use)

### Image Requirements:
- **poster_path**: Poster image (400px width) - vertical orientation
- **backdrop_path**: Background image (1200px width) - horizontal orientation

### Pexels URL Format:
```
https://images.pexels.com/photos/[PHOTO_ID]/pexels-photo-[PHOTO_ID].jpeg?auto=compress&cs=tinysrgb&w=400
```

---

## 🔄 Step-by-Step Process

### Before Adding New Content:

1. **Check existing IDs**: Look through the arrays to find the highest ID
   - Movies: Start from 8+ 
   - Series: Start from 105+
   - Anime: Start from 204+
   - Games: Start from 304+

2. **Gather information**:
   - Title, description, release date
   - Find appropriate images
   - Get trailer/watch/buy links
   - Choose genre IDs
   - Write pros and cons

### Adding Process:

1. Open `src/services/movieService.ts`
2. Find the appropriate array (movies, series, anime, games)
3. Add your new content object at the end of the array
4. **Don't forget the comma** after the previous entry
5. Add comments if desired in the `mockComments` section
6. Save the file

### Testing Your Changes:

1. Restart your development server
2. Navigate to the appropriate section (Movies, Series, Anime, Games)
3. Check that your content appears correctly
4. Test all buttons (Watch Now, Watch Trailer, Buy Game, etc.)
5. Verify comments are showing up

---

## ⚠️ Common Mistakes to Avoid

1. **Missing comma**: Always add a comma after each object in the array
2. **Wrong ID range**: Use correct ID ranges for each content type
3. **Missing type flags**: Don't forget `isSeries: true`, `isAnime: true`, or `isGame: true`
4. **Invalid dates**: Use YYYY-MM-DD format for dates
5. **Broken links**: Always test your trailer/watch/buy links
6. **Genre IDs**: Make sure genre IDs exist in the mockGenres array

---

## 🛠️ Advanced Customization

### Adding New Genres:
If you need a new genre not in the list, add it to the `mockGenres` array:

```javascript
const mockGenres: Genre[] = [
  // ... existing genres
  { id: 60001, name: "Your New Genre" }, // Use IDs 60001+ for custom genres
];
```

### System Requirements for Games:
Always include both `recommendedRequirements` and `minimumRequirements` for games to help users understand if they can run the game.

---

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all commas and syntax are correct  
3. Ensure IDs are unique and in the correct range
4. Double-check that required fields are filled

## 🎉 You're Ready!

You now have everything you need to add new movies, series, anime, games, comments, and links to your YBY CineReviews website. Happy content managing!