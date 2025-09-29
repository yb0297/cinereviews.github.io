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

## 📝 How to Add Articles/Content to the Website

### Adding Movies, Series, Anime, and Games

To add new content to your website, you need to modify the `src/services/movieService.ts` file. Here's how to add different types of content:

#### 1. Adding Movies
```javascript
// In src/services/movieService.ts, add to the mockMovies array:
{
  id: 9, // Use next available ID
  title: "Your Movie Title",
  poster_path: "https://images.pexels.com/photos/YOUR_IMAGE_ID/pexels-photo-YOUR_IMAGE_ID.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/YOUR_IMAGE_ID/pexels-photo-YOUR_IMAGE_ID.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Your movie description here...",
  release_date: "2024-01-01", // YYYY-MM-DD format
  vote_average: 8.5, // Rating out of 10
  vote_count: 25000, // Number of votes
  genre_ids: [28, 12, 878] // Genre IDs (Action=28, Adventure=12, Sci-Fi=878)
}
```

#### 2. Adding TV Series
```javascript
// Series are filtered from movies in the handleNavigate function
// Add a movie entry and it will automatically appear in the Series section
// The system adds "(Series)" to the title automatically
```

#### 3. Adding Anime
```javascript
// Anime are filtered from movies in the handleNavigate function  
// Add a movie entry and it will automatically appear in the Anime section
// The system adds "(Anime)" to the title automatically
```

#### 4. Adding Games
```javascript
// Games are filtered from movies in the handleNavigate function
// Add entries like the existing game examples:
{
  id: 9,
  title: "Your Game Title",
  poster_path: "https://images.pexels.com/photos/GAME_IMAGE_ID/pexels-photo-GAME_IMAGE_ID.jpeg?auto=compress&cs=tinysrgb&w=400",
  backdrop_path: "https://images.pexels.com/photos/GAME_IMAGE_ID/pexels-photo-GAME_IMAGE_ID.jpeg?auto=compress&cs=tinysrgb&w=1200",
  overview: "Your game description with gameplay details...",
  release_date: "2024-01-01",
  vote_average: 9.0,
  vote_count: 30000,
  genre_ids: [28, 12, 878]
}
```

### Content Categories and Filtering

The website automatically categorizes content based on the navigation:

- **Movies**: Shows all content in the main movies section
- **Series**: Filters movies and adds "(Series)" suffix
- **Anime**: Filters movies and adds "(Anime)" suffix  
- **Games**: Filters movies and adds "(Game)" suffix

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