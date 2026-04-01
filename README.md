# Gig Gazette

A live music discovery and booking platform for Nashville. Connects artists and bands with venues, and helps audiences find live shows near them.

## Features

### For Audiences
- Interactive map of live shows and open mic events across Nashville
- Filter by genre, search by artist/venue name, or toggle intimate sets
- View event details and access ticket links

### For Managers
- Create and manage artists and bands
- Schedule shows at venues with automatic time conflict detection
- Create and manage open mic events (one-time or recurring weekly/monthly)
- View all managed talent and upcoming events from a single dashboard

## Tech Stack

- **React 19** with React Router DOM v6
- **Vite** for development and builds
- **Leaflet / React-Leaflet** for interactive map rendering
- **REST API** at `http://localhost:3000` (requires a running backend)

## Getting Started

### Prerequisites

- Node.js (v18+)
- REST API for App [https://github.com/jackgardner99/Gig-Gazette-API/tree/main]
- A running backend API at `http://localhost:3000`

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

```bash
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── auth/        # Login and registration forms
│   ├── clients/     # Manager dashboard (artist/open mic list)
│   ├── create/      # Create artist, show, and open mic forms
│   ├── edit/        # Edit artist, show, and open mic forms
│   ├── map/         # Interactive map page
│   ├── nav/         # Customer and manager navbars
│   ├── shows/       # Artist and venue show views
│   └── views/       # Route wrappers (CustomerView, ManagerView, Authorized)
├── services/        # API service modules (artists, shows, venues, genres, etc.)
├── CSS/             # Stylesheets
├── App.jsx          # Route definitions
└── main.jsx         # App entry point
```

## Authentication

Authentication is email-based. Manager credentials are stored in `localStorage` after login. Protected manager routes are guarded by the `Authorized` component.

## Database Schema

See [ERD.dbml](./ERD.dbml) for the full database schema including tables for Managers, Artists, Genres, Venues, Shows, and Music Platforms.
