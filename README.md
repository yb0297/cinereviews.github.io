# CineReviews 🎬

A modern, responsive movie review website built with React, TypeScript, and Tailwind CSS.

![CineReviews](https://img.shields.io/badge/CineReviews-Movie%20Reviews-red?style=for-the-badge&logo=react)

## 🌟 Features

- **Modern Design**: Beautiful, responsive UI with smooth animations
- **Movie Discovery**: Browse popular, trending, and top-rated movies
- **Advanced Search**: Find movies by title with real-time results
- **Detailed Views**: Comprehensive movie information with ratings and reviews
- **Interactive Elements**: Like, bookmark, and rate movies
- **Mobile Optimized**: Perfect experience across all devices
- **Fast Performance**: Optimized loading and smooth transitions

## 🚀 Live Demo

Visit the live website: [https://yb0297.github.io/cinereviews.github.io/](https://yb0297.github.io/cinereviews.github.io/)

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **GitHub Pages** - Free hosting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yb0297/cinereviews.github.io.git
cd cinereviews.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

This project supports deployment to multiple platforms including Netlify, Vercel, and GitHub Pages.

### Quick Setup
1. Copy environment variables: `cp .env.example .env`
2. Add your Supabase credentials to `.env`
3. For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Supported Platforms
- **Netlify** (Recommended for automatic deployments)
- **Vercel** (Great for React apps)
- **GitHub Pages** (Free static hosting)

### Manual Deployment
```bash
npm run deploy  # GitHub Pages
npm run build   # Build for any platform
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Featured movie section
│   ├── MovieCard.tsx   # Individual movie cards
│   ├── MovieGrid.tsx   # Movie grid layout
│   ├── MovieModal.tsx  # Movie details modal
│   ├── AuthModal.tsx   # Authentication modal
│   ├── ProfileModal.tsx # User profile management
│   ├── LoadingSpinner.tsx # Loading component
│   ├── AdBanner.tsx    # Advertisement banners
│   ├── AdSidebar.tsx   # Sidebar advertisements
│   └── ContactForm.tsx # Contact form modal
├── lib/                # External service configurations
│   └── supabase.ts     # Supabase client setup
├── services/           # API services
│   ├── movieService.ts # Movie data service
│   ├── profileService.ts # User profile service
│   ├── reviewService.ts # Movie review service
│   ├── commentService.ts # Comment service
│   └── manualCommentService.ts # Manual comment management
├── types/              # TypeScript types
│   ├── movie.ts        # Movie-related types
│   ├── profile.ts      # User profile types
│   ├── review.ts       # Review types
│   └── comment.ts      # Comment types
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles

Configuration:
├── .env.example        # Environment variables template
├── DEPLOYMENT.md       # Deployment instructions
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 📝 How to Manually Add Content to Your YBYCineReviews Website

This comprehensive guide will teach you how to add movies, series, anime, and games to your CineReviews website through code modifications. Follow these step-by-step instructions to expand your content library.

### 🎬 Adding Movies, Series, Anime, and Games

To add new content to your website, you need to modify the `src/services/movieService.ts` file. All content types use the same data structure but with different properties for enhanced features.

### 🎯 Step-by-Step Instructions

#### 1. **Adding Movies**

Movies are the foundation of your website. Here's how to add a new movie with full details including pros and cons:

```javascript
// In src/services/movieService.ts, add to the mockMovies array:
{
  id: 9, // Use next available ID (check existing movies first)
  title: "Avatar: The Way of Water",
  poster_path: "https://images.pexels.com/photos/YOUR_IMAGE_ID/pexels-photo-YOUR_IMAGE_ID.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/YOUR_IMAGE_ID/pexels-photo-YOUR_IMAGE_ID.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Set more than a decade after the events of the first film, Avatar: The Way of Water tells the story of the Sully family and the trouble that follows them.",
  release_date: "2022-12-16", // YYYY-MM-DD format
  vote_average: 8.1, // Rating out of 10
  vote_count: 28000, // Number of votes  
  genre_ids: [12, 14, 878], // Adventure=12, Fantasy=14, Sci-Fi=878
  pros: [
    "Stunning underwater cinematography",
    "Groundbreaking visual effects",
    "Emotional family storyline",
    "Immersive world-building"
  ],
  cons: [
    "Very long runtime (3+ hours)",
    "Slow pacing in middle sections",
    "Requires knowledge of first film"
  ]
}
```

#### 2. **Adding TV Series**

Series use the same structure as movies but are categorized differently in the app:

```javascript
{
  id: 10,
  title: "House of the Dragon",
  poster_path: "https://images.pexels.com/photos/YOUR_SERIES_IMAGE/pexels-photo-YOUR_SERIES_IMAGE.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/YOUR_SERIES_IMAGE/pexels-photo-YOUR_SERIES_IMAGE.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "The Targaryen civil war begins. Based on George R.R. Martin's 'Fire & Blood,' 200 years before the events of Game of Thrones.",
  release_date: "2022-08-21",
  vote_average: 8.4,
  vote_count: 15000,
  genre_ids: [18, 14, 28], // Drama=18, Fantasy=14, Action=28
  pros: [
    "Excellent production values",
    "Strong character development", 
    "Epic dragon sequences",
    "Political intrigue and drama"
  ],
  cons: [
    "Violent content may not suit all audiences",
    "Complex political storylines",
    "High expectations from Game of Thrones fans"
  ]
}
```

#### 3. **Adding Anime**

Anime content follows the same structure with unique characteristics:

```javascript
{
  id: 11,
  title: "Your Name",
  poster_path: "https://images.pexels.com/photos/YOUR_ANIME_IMAGE/pexels-photo-YOUR_ANIME_IMAGE.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/YOUR_ANIME_IMAGE/pexels-photo-YOUR_ANIME_IMAGE.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "A teenage boy and girl embark on a quest to find each other after discovering they are swapping bodies.",
  release_date: "2016-08-26",
  vote_average: 8.2,
  vote_count: 18000,
  genre_ids: [16, 18, 14], // Animation=16, Drama=18, Fantasy=14
  pros: [
    "Beautiful hand-drawn animation",
    "Emotional and touching storyline",
    "Excellent soundtrack by RADWIMPS",
    "Universal themes of connection"
  ],
  cons: [
    "May be too emotional for some viewers",
    "Requires subtitles for non-Japanese speakers",
    "Complex time-travel elements"
  ]
}
```

#### 4. **Adding Games** 🎮

Games are special content that includes system requirements for PC gaming. Set `isGame: true` and include both minimum and recommended specifications:

```javascript
{
  id: 12,
  title: "Baldur's Gate 3",
  poster_path: "https://images.pexels.com/photos/YOUR_GAME_IMAGE/pexels-photo-YOUR_GAME_IMAGE.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/YOUR_GAME_IMAGE/pexels-photo-YOUR_GAME_IMAGE.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "An epic RPG adventure based on Dungeons & Dragons, featuring turn-based combat, deep character customization, and branching storylines.",
  release_date: "2023-08-03",
  vote_average: 9.2,
  vote_count: 42000,
  genre_ids: [12, 14, 18], // Adventure=12, Fantasy=14, Drama=18
  isGame: true, // IMPORTANT: Mark as game
  pros: [
    "Deep character customization and choices",
    "Excellent voice acting and dialogue",
    "Strategic turn-based combat system",
    "Co-op multiplayer support"
  ],
  cons: [
    "Steep learning curve for D&D newcomers",
    "Long loading times on slower systems",
    "Some technical bugs at launch"
  ],
  // System Requirements
  minimumRequirements: {
    os: "Windows 10 64-bit",
    processor: "Intel Core i5-4690 / AMD FX 4350",
    memory: "8 GB RAM",
    graphics: "NVIDIA GTX 970 / AMD RX 480",
    storage: "150 GB available space"
  },
  recommendedRequirements: {
    os: "Windows 10/11 64-bit",
    processor: "Intel Core i7-8700K / AMD Ryzen 5 3600",
    memory: "16 GB RAM", 
    graphics: "NVIDIA RTX 2060 Super / AMD RX 6700 XT",
    storage: "150 GB SSD space"
  }
}
```

## 🛠️ Technical Implementation Details

### Content Categories and Filtering

The website automatically categorizes content based on the navigation:

- **Movies**: Shows all content in the main movies section
- **Series**: Shows content categorized as series
- **Anime**: Shows content categorized as anime
- **Games**: Shows content marked with `isGame: true` - includes system requirements

### Required Fields for All Content

**Essential Fields:**
```javascript
{
  id: number,           // Unique identifier (increment from existing)
  title: string,        // Content title
  poster_path: string,  // Poster image URL
  backdrop_path: string,// Background image URL  
  overview: string,     // Description/synopsis
  release_date: string, // YYYY-MM-DD format
  vote_average: number, // Rating 0-10
  vote_count: number,   // Number of reviews
  genre_ids: number[]   // Genre ID array
}
```

**Enhanced Fields (Optional):**
```javascript
{
  pros: string[],       // Positive aspects
  cons: string[],       // Negative aspects
  isGame: boolean,      // Mark as game for special features
  minimumRequirements: {}, // Game system requirements
  recommendedRequirements: {} // Game recommended specs
}
```

### Adding Comments for New Content

To add sample comments for your new content, modify `src/services/manualCommentService.ts`:

```javascript
// Add to the sampleComments array:
{
  id: 'sample_new',
  movieId: 9, // Match your content ID
  movieTitle: 'Your Content Title',
  name: 'Reviewer Name',
  email: 'reviewer@example.com',
  message: 'Your review comment here...',
  createdAt: '2024-12-15T10:00:00.000Z'
}
```

### Image Guidelines

- Use high-quality images from [Pexels](https://pexels.com)
- Poster images: 400px width recommended
- Backdrop images: 1200px width recommended
- Use the format: `https://images.pexels.com/photos/IMAGE_ID/pexels-photo-IMAGE_ID.jpeg?auto=compress&cs=tinysrgb&w=WIDTH`

### Genre IDs Reference

Common genre IDs used in the system:
- **28**: Action
- **12**: Adventure  
- **16**: Animation
- **35**: Comedy
- **80**: Crime
- **18**: Drama
- **14**: Fantasy
- **878**: Science Fiction
- **53**: Thriller
- **36**: History

### Steps to Add New Content:

1. **Choose Content Type**: Decide if it's a movie, series, anime, or game
2. **Find Images**: Get poster and backdrop images from Pexels
3. **Edit movieService.ts**: Add your content to the `mockMovies` array
4. **Add Comments** (Optional): Add sample comments in `manualCommentService.ts`
5. **Test**: Check that your content appears in the correct section

### Example: Adding a New Game

```javascript
// 1. Add to mockMovies in movieService.ts:
{
  id: 10,
  title: "Elden Ring",
  poster_path: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200", 
  overview: "A fantasy action RPG adventure set in the Lands Between, featuring an open world full of mystery and danger.",
  release_date: "2022-02-25",
  vote_average: 9.5,
  vote_count: 67000,
  genre_ids: [28, 12, 14]
}

// 2. Add sample comment in manualCommentService.ts:
{
  id: 'sample_elden_ring',
  movieId: 10,
  movieTitle: 'Elden Ring',
  name: 'Gaming Expert',
  email: 'gamer@example.com', 
  message: 'Incredible open-world design! FromSoftware has created their masterpiece.',
  createdAt: '2024-12-15T14:30:00.000Z'
}
```

This content will automatically appear in the Games section with the title "Elden Ring (Game)" and include the sample comment.

## 🎨 Features Overview

### 🏠 Home Page
- Hero section with featured movie
- Popular movies grid
- Responsive navigation

### 🔍 Search & Browse
- Real-time movie search
- Category browsing (Popular, Trending, Top Rated, Coming Soon)
- Advanced filtering options

### 🎬 Movie Details
- Comprehensive movie information
- User ratings and reviews
- Interactive elements (like, bookmark, share)
- Tabbed interface for different content types

### 📱 Mobile Experience
- Fully responsive design
- Touch-friendly interactions
- Optimized performance on mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**YB0297**
- GitHub: [@yb0297](https://github.com/yb0297)
- Website: [https://yb0297.github.io/cinereviews.github.io/](https://yb0297.github.io/cinereviews.github.io/)

## 🙏 Acknowledgments

- Movie data and images from [Pexels](https://pexels.com)
- Icons by [Lucide](https://lucide.dev)
- Built with [Vite](https://vitejs.dev) and [React](https://reactjs.org)

---

⭐ Star this repository if you found it helpful!