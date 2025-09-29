import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MovieGrid } from './components/MovieGrid';
import { MovieModal } from './components/MovieModal';
import { AuthModal } from './components/AuthModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AdBanner } from './components/AdBanner';
import { AdSidebar } from './components/AdSidebar';
import { ContactForm } from './components/ContactForm';
import { ProfileModal } from './components/ProfileModal';
import { movieService } from './services/movieService';
import { Movie } from './types/movie';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [carouselMovies, setCarouselMovies] = useState<Movie[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setUser(session?.user ?? null);
      }
    );

    loadMovies();
    loadCarouselMovies();
    
    // Listen for contact form events
    const handleOpenContactForm = () => setIsContactFormOpen(true);
    window.addEventListener('openContactForm', handleOpenContactForm);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('openContactForm', handleOpenContactForm);
    };
  }, []);

  // Automatic carousel effect
  useEffect(() => {
    if (carouselMovies.length === 0 || currentSection !== 'home' || searchQuery) {
      return;
    }

    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselMovies.length;
        setFeaturedMovie(carouselMovies[nextIndex]);
        return nextIndex;
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [carouselMovies, currentSection, searchQuery]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await movieService.getPopularMovies();
      setMovies(popularMovies);
      // Only set featuredMovie if carousel is not active
      if (carouselMovies.length === 0 && !featuredMovie) {
        setFeaturedMovie(popularMovies[0] || null);
      }
      setCurrentSection('home');
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCarouselMovies = async () => {
    try {
      // Fetch movies from different categories for carousel
      const categories = ['movies', 'series', 'anime', 'games'];
      const allCarouselMovies: Movie[] = [];
      
      // Load categories in parallel and handle failures gracefully
      const categoryPromises = categories.map(async (category) => {
        try {
          const categoryMovies = await movieService.getContentByCategory(category);
          return categoryMovies.slice(0, 2); // Get first 2 movies from each category
        } catch (error) {
          console.error(`Error loading ${category}:`, error);
          return []; // Return empty array if category fails
        }
      });
      
      const categoryResults = await Promise.all(categoryPromises);
      categoryResults.forEach(movies => allCarouselMovies.push(...movies));
      
      // Remove duplicates based on movie ID
      const uniqueMovies = allCarouselMovies.filter((movie, index, self) => 
        index === self.findIndex((m) => m.id === movie.id)
      );
      
      setCarouselMovies(uniqueMovies);
      if (uniqueMovies.length > 0 && !featuredMovie) {
        setFeaturedMovie(uniqueMovies[0]);
      }
    } catch (error) {
      console.error('Error loading carousel movies:', error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      // If search is empty, go back to home
      await loadMovies();
      return;
    }

    try {
      setLoading(true);
      const searchResults = await movieService.searchMovies(query);
      setMovies(searchResults);
      setCurrentSection('search');
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]); // Show empty results on error
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = async (section: string) => {
    setCurrentSection(section);
    setSearchQuery('');

    try {
      setLoading(true);
      const newMovies = await movieService.getContentByCategory(section);
      setMovies(newMovies);
      
      // Update featured movie based on section, but respect carousel for home
      if (section === 'home') {
        // Don't override carousel for home section
        if (carouselMovies.length === 0 && newMovies.length > 0) {
          setFeaturedMovie(newMovies[0]);
        }
      } else if (newMovies.length > 0) {
        setFeaturedMovie(newMovies[0]);
      }
    } catch (error) {
      console.error('Error loading section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const getSectionTitle = () => {
    if (searchQuery && currentSection === 'search') {
      return `Search Results for "${searchQuery}"`;
    }
    switch (currentSection) {
      case 'home':
        return 'Popular Movies';
      case 'movies':
        return 'Movies';
      case 'series':
        return 'TV Series';
      case 'anime':
        return 'Anime';
      case 'games':
        return 'Games';
      case 'trending':
        return 'Trending Now';
      case 'top-rated':
        return 'Top Rated Movies';
      case 'coming-soon':
        return 'Coming Soon';
      default:
        return 'Movies';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        currentSection={currentSection}
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
      />

      {/* Hero Section */}
      {currentSection === 'home' && !searchQuery && featuredMovie && (
        <HeroSection
          featuredMovie={featuredMovie}
          onWatchTrailer={() => console.log('Watch trailer')}
          onViewDetails={() => handleMovieClick(featuredMovie)}
        />
      )}

      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2 text-center">Advertisement</p>
          <AdBanner
            adSlot="1234567892"
            style={{ display: 'block', width: '100%', height: '90px' }}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {getSectionTitle()}
              </h2>
              <p className="text-gray-600">
                {searchQuery && currentSection === 'search'
                  ? `Found ${movies.length} results`
                  : 'Discover your next favorite movie'}
              </p>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : movies.length === 0 && searchQuery && currentSection === 'search' ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">No movies found for "{searchQuery}"</div>
                <div className="text-gray-400 mb-4">Try searching for a different movie title</div>
                <button
                  onClick={() => handleSearch('')}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear search and browse all movies
                </button>
              </div>
            ) : (
              <>
                <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
                
                {/* In-content Ad */}
                {movies.length > 4 && (
                  <div className="my-12 bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2 text-center">Advertisement</p>
                    <AdBanner
                      adSlot="1234567893"
                      style={{ display: 'block', width: '100%', height: '250px' }}
                      className="mx-auto"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Sidebar with Ads */}
          <div className="lg:w-80 flex-shrink-0">
            <AdSidebar />
          </div>
        </div>
      </main>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
        onAuthRequired={() => setIsAuthModalOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onAuthChange={setUser}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
      />

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold">CineReviews</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your ultimate destination for movie reviews, ratings, and
                recommendations. Discover your next favorite film with our
                curated collection.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Movies</h4>
              <ul className="space-y-2 text-gray-400">
                <li 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleNavigate('movies')}
                >
                  Movies
                </li>
                <li 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleNavigate('series')}
                >
                  TV Series
                </li>
                <li 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleNavigate('anime')}
                >
                  Anime
                </li>
                <li 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleNavigate('games')}
                >
                  Games
                </li>
                <li 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleNavigate('trending')}
                >
                  Trending
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Help Center
                </li>
                <li 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  Contact Us
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CineReviews. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
