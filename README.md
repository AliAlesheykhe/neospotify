neospotify:

A web app similar to spotify.

Web Programming course. Sharif University of Technology. CE Department. Spring 2026

Ali Alesheykh, Arman Anjidani, Mehdi Torabi


my-project/
├── public/                 # Static assets (favicons, manifest.json for PWA)
├── src/
│   ├── app/                # Next.js App Router (The entry points)
│   │   ├── (auth)/         # Route group for auth pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   ├── (main)/         # Route group for main app
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   ├── api/            # API routes (if needed)
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   │
│   ├── components/         # Global shared UI components
│   │   ├── ui/             # Buttons, Inputs, Cards (the "atoms")
│   │   └── layout/         # Navbar, Footer, Sidebar
│   │
│   ├── features/           # BUSINESS LOGIC (The core of your score)
│   │   ├── auth/
│   │   │   ├── api/        # Auth-specific API calls
│   │   │   ├── components/ # LoginForm.tsx, AuthGuard.tsx
│   │   │   ├── hooks/      # useAuth.ts
│   │   │   ├── types/      # auth.types.ts
│   │   │   └── index.ts    # Public API for this feature
│   │   └── profile/        # ... (same structure)
│   │
│   ├── hooks/              # Global application hooks (e.g., useTheme, useWindowSize)
│   ├── lib/                # Third-party configurations (e.g., axios.ts, auth-options.ts)
│   ├── services/           # Global service functions (e.g., api-client.ts)
│   ├── store/              # Global state (e.g., Redux, Zustand, React Context)
│   ├── styles/             # Global CSS or Tailwind configuration
│   ├── types/              # Global TypeScript interfaces
│   └── utils/              # Pure utility functions (e.g., format-date.ts)
│
├── tests/                  # Integration and E2E tests
├── next.config.js          # Next.js configuration
├── pwa.config.js           # PWA configuration (for your 200 bonus points)
└── package.json
