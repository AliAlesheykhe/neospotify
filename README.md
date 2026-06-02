neospotify:

A web app similar to spotify.

Web Programming course. Sharif University of Technology. CE Department. Spring 2026

Ali Alesheykh, Arman Anjidani, Mehdi Torabi


### Project Structure
```text
neospotify/
├──frontend/
│    ├── public/                 # Static assets (favicons, manifest.json)
│    ├── src/
│    │   ├── app/                # Next.js App Router (Entry points)
│    │   │   ├── (auth)/         # Route group for auth pages
│    │   │   │   ├── login/
│    │   │   │   │   └── page.tsx
│    │   │   ├── (main)/         # Route group for main app
│    │   │   │   ├── dashboard/
│    │   │   │   │   └── page.tsx
│    │   │   ├── api/            # API routes
│    │   │   ├── layout.tsx      # Root layout
│    │   │   └── page.tsx        # Landing page
│    │   ├── components/         # Global shared UI components
│    │   │   ├── ui/             # Buttons, Inputs, Cards (the "atoms")
│    │   │   └── layout/         # Navbar, Footer, Sidebar
│    │   ├── features/           # BUSINESS LOGIC (Core features)
│    │   │   ├── auth/
│    │   │   │   ├── api/        # Auth-specific API calls
│    │   │   │   ├── components/ # LoginForm.tsx, AuthGuard.tsx
│    │   │   │   ├── hooks/      # useAuth.ts
│    │   │   │   ├── types/      # auth.types.ts
│    │   │   │   └── index.ts    # Public API for this feature
│    │   │   └── profile/        # ... (same structure)
│    │   ├── hooks/              # Global application hooks
│    │   ├── lib/                # Third-party configurations (axios, etc)
│    │   ├── services/           # Global service functions
│    │   ├── store/              # Global state management
│    │   ├── styles/             # Global CSS or Tailwind config
│    │   ├── types/              # Global TypeScript interfaces
│    │   └── utils/              # Pure utility functions
│    │
│    ├── tests/                  # Integration and E2E tests
│    ├── next.config.js          # Next.js configuration
│    ├── pwa.config.js           # PWA configuration
│    └── package.json
