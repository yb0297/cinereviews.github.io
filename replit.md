# CineReviews - Replit Setup

## Project Overview
CineReviews is a modern movie comment website built with React, TypeScript, Vite, and Tailwind CSS. Users can browse movies and leave YouTube-style comments. It features Supabase integration for authentication and database functionality.

## Recent Changes
- **September 28, 2025**: Initial Replit environment setup completed
  - Installed all project dependencies
  - Configured development workflow on port 5000
  - Created proper .gitignore file
  - Verified Vite configuration for Replit environment
- **September 28, 2025**: Converted from review system to comment system
  - Replaced complex review system (ratings, pros/cons, recommendations) with simple YouTube-style comments
  - Updated database schema from reviews table to comments table
  - Converted all API endpoints from review operations to comment operations
  - Updated all frontend services and components to handle comments
  - Comments are now simpler: just text content, user info, and timestamps
  - Users can add, view, and delete their own comments when logged in

## Project Architecture
- **Frontend**: React 18 with TypeScript
- **Build System**: Vite with hot module replacement
- **Styling**: Tailwind CSS with PostCSS
- **Authentication**: Supabase Auth (requires environment variables)
- **Database**: Supabase PostgreSQL (optional - app works without)
- **Icons**: Lucide React
- **Deployment**: Configured for GitHub Pages, Netlify, and Vercel

## Development Setup
- **Host**: 0.0.0.0 (properly configured for Replit proxy)
- **Port**: 5000 (frontend development server)
- **Workflow**: `npm run dev` - starts Vite development server

## Environment Configuration
The application supports Supabase integration but works without it:
- `VITE_SUPABASE_URL` - Optional: Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Optional: Supabase anonymous key

Without these variables, the app shows a warning but continues to work with authentication features disabled.

## Current State
- ✅ Dependencies installed (including serve for production)
- ✅ Development server running on port 5000
- ✅ Vite configured correctly for Replit (host: 0.0.0.0, allowedHosts: true)
- ✅ Application responding to requests (HTTP 200)
- ✅ Deployment configuration set up for production
- ✅ .gitignore file created with proper exclusions
- ⚠️ Supabase environment variables not configured (optional - app works without them)

## User Preferences
- Project follows existing conventions and structure
- Maintains clean, organized codebase
- Uses TypeScript for type safety
- Responsive design with Tailwind CSS