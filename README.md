# Gig Gazette

A live music discovery platform for Nashville. Audiences can explore shows, open mics, and writers rounds on an interactive map, while venue managers can submit and manage events.

## Features

### For Audiences
- Interactive map of shows, open mics, and writers rounds across Nashville
- Filter by event type and genre, search by artist or venue name
- View event details including date, time, and description
- Browse and upload photos for events

### For Managers
- Submit and manage shows, open mics, and writers rounds
- Create and manage venue listings with images
- Edit or delete existing events from a personal dashboard

## Tech Stack

- **React 19** with React Router DOM v6
- **Vite** for development and builds
- **Leaflet / React-Leaflet** for interactive map rendering
- **Font Awesome** for icons
- **REST API** — [Gig Gazette API](https://github.com/jackgardner99/Gig-Gazette-API) hosted on Railway

## Getting Started

### Prerequisites

- Node.js v18+
- Backend API running locally at `http://localhost:8000` or via Railway

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.development` file for local development:

```
VITE_API_URL=http://localhost:8000
```

A `.env.production` file is used automatically during `npm run build`:

```
VITE_API_URL=https://gig-gazette-api-production.up.railway.app
```

If `VITE_API_URL` is not set, the app defaults to the Railway production URL.

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

```bash
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── auth/        # Login and registration forms
│   ├── details/     # Event details page (show, open mic, writers round)
│   ├── edit/        # Edit event form (shared across event types)
│   ├── map/         # Interactive map page with filters
│   ├── nav/         # Customer and manager navbars
│   ├── submit/      # Submit event form
│   ├── venue/       # Create and edit venue forms
│   └── views/       # Route wrappers (CustomerView, ManagerView, Authorized)
├── services/        # API modules (shows, venues, events, photos, auth, etc.)
├── CSS/             # Global stylesheet
├── App.jsx          # Route definitions
└── main.jsx         # App entry point
```

## Authentication

Managers log in with a username and password. The auth token is stored in `sessionStorage` under the key `"user"` as `{ id, token }`. Protected routes are guarded by the `Authorized` component. Unauthenticated users attempting restricted actions (such as uploading photos) are redirected to `/login` and returned to their previous page after signing in.

## Deployment

The frontend is deployed on **Netlify**. A `_redirects` file and `netlify.toml` handle client-side routing so React Router works correctly on all routes.

The backend API is deployed on **Railway**. Set `VITE_API_URL` in Netlify's environment variable settings to point to the Railway URL.

## Database Schema

See [ERD.dbml](./ERD.dbml) for the full database schema.
