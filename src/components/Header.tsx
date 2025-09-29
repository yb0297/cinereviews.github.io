import React, { useState } from "react";
import {
  Search,
  Film,
  Menu,
  X,
  Star,
  TrendingUp,
  Clock,
  Play,
  Tv,
  Gamepad2,
  User,
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Logo } from "./Logo";

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
  currentSection: string;
  user: SupabaseUser | null;
  onAuthClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onNavigate,
  currentSection,
  user,
  onAuthClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    // Debounced search - only search after user stops typing
    if (value.trim()) {
      onSearch(value);
    } else {
      onSearch(""); // Clear search results
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Film },
    { id: "movies", label: "Movies", icon: Film },
    { id: "series", label: "Series", icon: Tv },
    { id: "anime", label: "Anime", icon: Play },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "top-rated", label: "Top Rated", icon: Star },
    { id: "coming-soon", label: "Coming Soon", icon: Clock },
  ];

  return (
    <header className="bg-gray-900 text-white px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Logo */}
      <div
        className="cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
        onClick={() => onNavigate("home")}
      >
        <Logo size="medium" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              currentSection === id
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Search Bar */}
      <div className="hidden sm:flex items-center">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search movies..."
            className="bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-700 transition-colors"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </form>
      </div>

      {/* User Profile / Admin */}
      <div className="hidden sm:flex items-center">
        <button
          onClick={onAuthClick}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 group"
        >
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover border-2 border-transparent group-hover:border-red-400 transition-colors"
            />
          ) : (
            <User className="w-4 h-4" />
          )}
          <span className="text-sm">
            {user
              ? user.user_metadata?.full_name || user.user_metadata?.name || "Profile"
              : "Sign In"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-700">
          <div className="flex flex-col space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  onNavigate(id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentSection === id
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}

            {/* Mobile Search */}
            <div className="pt-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-700 transition-colors"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </form>
            </div>

            {/* Mobile User Profile */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors"
              >
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {user ? user.user_metadata?.full_name || "Profile" : "Sign In"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
