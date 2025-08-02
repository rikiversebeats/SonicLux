# RIKIVAULT COLLECTIVE - Premium Music Platform

## Overview

RIKIVAULT COLLECTIVE is a premium music platform built as a modern full-stack web application. The project features a sophisticated dark theme with gold accents, providing an elegant interface for showcasing premium music content. The application includes advanced audio visualization with multiple modes, a full-featured music player with playlist functionality, an interactive music gallery with comprehensive filtering, contact form with social media integration, responsive design, and a complete music browsing experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for server state management and API data fetching
- **Tailwind CSS** with **shadcn/ui** component library for styling and UI components
- **Custom CSS variables** implementing a luxury dark theme with gold accent colors

### Component Structure
- **Modular component architecture** with separation between UI components and page components
- **Advanced Audio Visualizer** with multiple visualization modes (bars, circular, waveform, particles)
- **Music Player** with full playlist functionality, volume control, and track management
- **Interactive Music Gallery** with filtering, search, sorting, and grid/list view modes
- **Contact Form** with comprehensive project inquiry system and social media integration
- **Custom hooks** for reusable logic (audio visualization, GSAP animations, mobile detection)
- **Responsive design** with mobile-first approach using Tailwind breakpoints

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **RESTful API design** with `/api` prefix for all backend routes
- **Middleware setup** for JSON parsing, logging, and error handling
- **Development/production environment** handling with Vite integration

### Data Storage
- **Drizzle ORM** with PostgreSQL database configuration
- **Neon Database** serverless PostgreSQL integration via `@neondatabase/serverless`
- **In-memory storage fallback** using `MemStorage` class for development
- **Database schema** defined in shared TypeScript files with Zod validation

### Styling and Design System
- **Luxury aesthetic** with dark backgrounds and gold accent colors
- **CSS custom properties** for consistent theming across components
- **shadcn/ui component system** with Radix UI primitives for accessibility
- **Responsive typography** and spacing using Tailwind utility classes

### Animation and Interactions
- **GSAP integration** loaded dynamically from CDN for smooth animations
- **Custom animation hooks** for fade-in effects and timeline management
- **Audio visualization** using Web Audio API with canvas rendering
- **Intersection Observer** for scroll-triggered animations

## External Dependencies

### Database and ORM
- **PostgreSQL** database with connection via `DATABASE_URL` environment variable
- **Drizzle Kit** for database migrations and schema management
- **Drizzle Zod** for runtime schema validation

### UI and Styling
- **Radix UI** component primitives for accessible UI elements including Progress
- **Tailwind CSS** with PostCSS for utility-first styling
- **Lucide React** for consistent icon system
- **Class Variance Authority** for component variant management

### Development Tools
- **TypeScript** for type safety across the entire stack
- **Vite** with React plugin and error overlay for development
- **ESBuild** for production bundling of server code
- **TSX** for running TypeScript files in development

### External Services
- **GSAP** animation library loaded from CDN
- **Replit integration** with development banner and cartographer plugin
- **Web Audio API** for advanced audio processing and multi-mode visualization

### Form and State Management
- **React Hook Form** with Hookform Resolvers for comprehensive form handling
- **TanStack Query** for server state and API caching
- **Zod** for schema validation and type inference

## Recent Updates (August 2025)

### Advanced Features Added
- **Multi-mode Audio Visualizer**: Frequency bars, circular spectrum, waveform, and particle field visualizations
- **Full Music Player**: Complete playlist functionality with play/pause/skip, volume control, repeat/shuffle modes
- **Interactive Music Gallery**: Advanced filtering by genre, search, sorting options, grid/list views, track statistics
- **Contact Form System**: Comprehensive project inquiry form with budget ranges, timelines, and social media integration
- **Enhanced Navigation**: Added contact page to main navigation structure
