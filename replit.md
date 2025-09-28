# CineReviews - Replit Setup

## Project Overview
CineReviews is a modern movie review website built with React, TypeScript, Vite, and Tailwind CSS. It features a complete review system with shared reviews, user authentication, and full CRUD functionality.

## Recent Changes
- **September 28, 2025**: Complete review system implementation
  - ✅ Implemented shared review system where all users can see each other's reviews
  - ✅ Added simple username-based authentication system 
  - ✅ Created enhanced localStorage service for persistent, shared review storage
  - ✅ Added full CRUD functionality: Create, Read, Update, Delete reviews
  - ✅ Users can edit and delete their own reviews
  - ✅ Sample reviews initialized for demonstration
  - ✅ Fixed browser compatibility issues
  - ✅ Updated all components to work with new authentication system

## Project Architecture
- **Frontend**: React 18 with TypeScript
- **Build System**: Vite with hot module replacement
- **Styling**: Tailwind CSS with PostCSS
- **Authentication**: Simple username-based system (browser localStorage)
- **Review Storage**: Enhanced localStorage service (simulates shared database)
- **Icons**: Lucide React
- **Deployment**: Configured for GitHub Pages, Netlify, and Vercel

## Review System Features
- **Shared Reviews**: All users can see reviews from all other users
- **User Authentication**: Simple name-based authentication for review attribution
- **Full CRUD Operations**:
  - ✅ **Create**: Users can write new movie reviews
  - ✅ **Read**: View all reviews from all users  
  - ✅ **Update**: Users can edit their own reviews
  - ✅ **Delete**: Users can delete their own reviews with confirmation
- **Rich Review Content**: Ratings, pros/cons, recommendations, and detailed content
- **Sample Data**: Pre-populated with demonstration reviews

## Development Setup
- **Host**: 0.0.0.0 (properly configured for Replit proxy)
- **Port**: 5000 (frontend development server)
- **Workflow**: `npm run dev` - starts Vite development server

## Authentication System
- **Type**: Simple username-based authentication
- **Storage**: Browser localStorage for session management
- **Features**: 
  - Users enter their name to identify themselves
  - Session persists across browser sessions
  - Reviews are attributed to user names
  - Only review authors can edit/delete their own reviews

## Review Storage System
- **Enhanced localStorage Service**: Simulates a shared database experience
- **Global Storage**: All reviews stored in shared localStorage keys
- **Cross-User Visibility**: Reviews visible to all users on the same machine
- **Persistent**: Data survives browser refreshes and sessions
- **Sample Data**: Automatically initializes with demonstration reviews

## Current State
- ✅ Dependencies installed
- ✅ Development server running on port 5000
- ✅ Application fully functional with complete review system
- ✅ Simple authentication working
- ✅ Shared review system operational
- ✅ Edit/delete functionality implemented
- ✅ Sample reviews loaded for demonstration

## User Preferences
- Project follows existing conventions and structure
- Maintains clean, organized codebase
- Uses TypeScript for type safety
- Responsive design with Tailwind CSS
- Simple, user-friendly authentication system