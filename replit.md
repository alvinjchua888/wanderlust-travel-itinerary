# Wanderlust - AI Travel Itinerary Generator

## Overview
AI-powered travel itinerary generator that creates personalized multi-day trip plans using Google Gemini. Users input their destination, travel dates, and duration to receive a detailed day-by-day itinerary with restaurants, tourist attractions, and transport suggestions.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **AI**: Google Gemini via Replit AI Integrations (direct fetch API)
- **Routing**: wouter (frontend)
- **State Management**: React Query + useState

## Project Structure
```
client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── HeroSection.tsx      # Hero with trip planning form
│   │   ├── DayCard.tsx          # Collapsible day itinerary
│   │   ├── LocationCard.tsx     # Restaurant/attraction cards
│   │   ├── MapSection.tsx       # Trip overview section
│   │   ├── ExportBar.tsx        # Print/share/download actions
│   │   ├── LoadingState.tsx     # Loading skeleton
│   │   └── ItineraryResults.tsx # Results container
│   ├── pages/
│   │   └── Home.tsx       # Main app page
│   └── lib/
│       └── queryClient.ts # API helpers
server/
├── lib/
│   └── gemini.ts          # Gemini AI integration
├── routes.ts              # API endpoints
└── index.ts               # Express server
```

## API Endpoints
- `POST /api/itinerary/generate` - Generate travel itinerary
  - Body: `{ destination: string, duration: number }`
  - Response: `{ destination: string, days: DayItinerary[] }`

## Environment Variables
- `AI_INTEGRATIONS_GEMINI_API_KEY` - Auto-configured by Replit
- `AI_INTEGRATIONS_GEMINI_BASE_URL` - Auto-configured by Replit

## Running the App
The app runs on port 5000 via `npm run dev`.

## Features
- Beautiful hero section with Santorini sunset image
- Trip planning form with destination, date picker, and duration
- AI-generated itineraries with real restaurant and attraction names
- Day-by-day breakdown with morning/afternoon/evening sections
- Transport suggestions between locations
- Print, share, and download functionality
- Responsive design for mobile and desktop
- **Must-Try Dishes**: Each restaurant includes 3 AI-recommended dishes with descriptions (hover to see details)
- **Stock Images**: Restaurants and attractions display curated stock photos for visual appeal
