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
│   └── LoadingSpinner.tsx # Loading component
├── lib/                # External service configurations
│   └── supabase.ts     # Supabase client setup
├── services/           # API services
│   ├── movieService.ts # Movie data service
│   ├── profileService.ts # User profile service
│   └── reviewService.ts # Movie review service
├── types/              # TypeScript types
│   ├── movie.ts        # Movie-related types
│   ├── profile.ts      # User profile types
│   └── review.ts       # Review types
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles

Configuration:
├── .env.example        # Environment variables template
├── DEPLOYMENT.md       # Deployment instructions
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

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