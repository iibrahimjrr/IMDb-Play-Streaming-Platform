# Contributing to IMDb Play

Thank you for considering contributing to **IMDb Play**! We welcome contributions from everyone — whether it's fixing a bug, adding a new feature, improving the API, enhancing the UI, or optimizing the codebase.

---

## 📖 Table of Contents

- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Ideas for Contribution](#ideas-for-contribution)

---

## How to Contribute

1. **Fork the repository**

2. **Create a new branch**

```bash
git checkout -b feature/your-feature-name

# Examples:
# git checkout -b feature/add-content-ratings
# git checkout -b fix/login-token-expiry
# git checkout -b feature/google-oauth
```

3. **Make your changes** — whether it's a new API endpoint, a React component, a UI fix, or a database migration

4. **Commit and push**

```bash
git add .
git commit -m "feat: add user ratings to movies and series"
git push origin feature/your-feature-name
```

5. **Open a Pull Request (PR)** and describe clearly what you changed, why, and how to test it

---

## Development Setup

### Backend (Laravel 12)

```bash
cd backend

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure your DB in .env then run
php artisan migrate --seed

# Start server
php artisan serve
# → http://localhost:8000
```

- Use **Laravel 12** and follow its conventions (Eloquent, Form Requests, Resource Controllers)
- Auth is handled via **Laravel Sanctum Bearer Tokens** — do not switch to session/cookie auth
- Keep controllers thin — move business logic to Services or Models where applicable
- Validate all incoming request data using `$request->validate()` or dedicated Form Request classes
- Follow PSR-12 coding standards and existing naming conventions

### Frontend (React 18)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173
```

- The Vite dev server proxies `/api/*` to `http://localhost:8000` automatically — no extra config needed
- Use **TypeScript** for all new components and files
- Keep components small and focused — extract reusable logic into custom hooks where applicable
- Follow the existing Context API pattern for state management (Auth, Content, Theme)

---

## Contribution Guidelines

- **Small, focused PRs** — Don't bundle unrelated changes in one PR. One feature or fix per PR keeps reviews fast and clean.

- **Commit messages** — Use clear, descriptive messages following this convention:

```
feat: add user ratings to movies and series
fix: resolve token expiry on page refresh
style: improve mobile layout on movie detail page
refactor: extract content card into reusable component
docs: update API reference for new endpoints
chore: upgrade axios to latest version
test: add feature tests for AuthController
```

- **API changes** — Any new or modified endpoint must be documented in the README API reference section before opening a PR.

- **Database changes** — Always create a new migration file — never edit existing migrations directly.

- **Code style** — Follow the existing style: indentation, naming conventions, inline CSS variables (no Tailwind utilities in new components beyond what's already used), and consistent file naming.

- **Accessibility** — Ensure all interactive elements are keyboard-accessible and have proper `alt` / `aria` attributes.

- **Discuss first** — For large changes (new sections, architecture overhauls, new dependencies), open an issue to discuss before starting implementation — to avoid wasted effort.

- **Respect others** — Be kind, constructive, and professional in all communications.

---

## Ideas for Contribution

Here are areas where your contributions would be especially valuable:

### 🔐 Auth & Security

- **Google OAuth** — Add Sign in with Google using Laravel Socialite on the backend and a Google button on the login/register pages
- **Email Verification** — Send a verification email after registration and block access until verified
- **Token Refresh** — Implement automatic token refresh before expiry to keep users logged in
- **2FA** — Add optional two-factor authentication via email or authenticator app
- **Rate Limiting** — Add API rate limiting to auth endpoints to prevent brute force attacks

### 🎬 Content & Streaming

- **User Ratings** — Allow users to rate movies and series (1–10 stars) and display aggregated ratings
- **User Reviews** — Let users write and publish short reviews for any title
- **Watch History** — Track what a user has watched and show a "Continue Watching" section
- **Watchlist** — Add a "Watch Later" status separate from My List and Favorites
- **Content Recommendations** — Suggest titles based on the user's watch history and genre preferences
- **Search Suggestions** — Add a live autocomplete dropdown in the header search with poster thumbnails
- **Content Pagination** — Add backend pagination and infinite scroll or page navigation on listing pages
- **Advanced Filters** — Filter content by year, rating range, type, and multiple genres simultaneously

### 👤 User Experience

- **Reading Progress** — Let users mark episodes as watched and track series completion percentage
- **Notifications** — Notify users when new content is added in their favorite genres
- **Social Sharing** — Improve the share button to open native share sheet on mobile
- **Profile Photo Upload** — Allow users to upload a custom avatar instead of the default gradient icon
- **Watch Party** — Let users invite friends to watch content at the same time

### 🎨 UI / Design

- **Skeleton Loaders** — Replace loading spinners with skeleton screens on all content grids and rows
- **Content Card Animations** — Add smoother hover transitions on movie and series cards
- **Empty State Illustrations** — Add friendly illustrations for empty My List and Favorites pages
- **Onboarding Flow** — Add a genre preference step after registration to personalize the home page
- **Banner Slideshow** — Make the hero section auto-rotate between multiple featured titles

### ✨ Animations & Interactions

- **Page Transitions** — Add smooth fade or slide transitions between routes
- **Toast Notifications** — Add a global toast system for actions like adding to list or favoriting
- **Scroll to Top** — Add a floating scroll-to-top button on long listing pages
- **Drag to Reorder** — Let users reorder their My List with drag and drop

### ⚙️ Technical Improvements

- **Testing (Backend)** — Add PHPUnit feature tests for all API controllers and edge cases
- **Testing (Frontend)** — Add React Testing Library unit tests for key components and hooks
- **CI/CD** — Set up GitHub Actions for automated linting, type checking, tests, and build verification on every PR
- **Docker** — Add `docker-compose.yml` to spin up the full stack (PHP, MySQL, Node) for new contributors
- **Caching** — Add a Laravel cache layer for the content listing and featured endpoints
- **Image Optimization** — Add lazy loading and blur-up placeholders for all poster images
- **PWA Support** — Add a service worker and web manifest for offline support and installability

### 📝 Documentation

- Improve inline code comments for complex logic in controllers and context providers
- Add JSDoc comments to all service functions in `src/app/services/api.ts`
- Document all Laravel controllers with PHPDoc blocks
- Add a Postman collection JSON to the repo for easy API testing and exploration

---

We're excited to see your contributions! 🚀

---

Built with ❤️ by **Ibrahim Elsayed** — [@iibrahimjrr](https://github.com/iibrahimjrr)
