import { createBrowserRouter, Outlet } from 'react-router'
import { AuthProvider }    from './contexts/AuthContext'
import { ThemeProvider }   from './contexts/ThemeContext'
import { ContentProvider } from './contexts/ContentContext'
import { HomePage }        from './pages/HomePage'
import { MoviesPage, SeriesPage, TrendingPage, TopRatedPage } from './pages/ContentPages'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/AuthPages'
import { UserDashboard, SettingsPage, ProfilePage, DirectorPage, CastPage, EpisodePage, NotFound, AdminDashboard, Soon, Privacy_Policy, Terms, Cookies } from './pages/OtherPages'

function Root() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <Outlet />
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true,             Component: HomePage },
      { path: 'movies',          Component: MoviesPage },
      { path: 'series',          Component: SeriesPage },
      { path: 'trending',        Component: TrendingPage },
      { path: 'top-rated',       Component: TopRatedPage },
      { path: 'title/:id',       Component: MovieDetailPage },
      { path: 'episode/:id',     Component: EpisodePage },
      { path: 'director/:name',  Component: DirectorPage },
      { path: 'cast/:name',      Component: CastPage },
      { path: 'login',           Component: LoginPage },
      { path: 'register',        Component: RegisterPage },
      { path: 'forgot-password', Component: ForgotPasswordPage },
      { path: 'dashboard',       Component: UserDashboard },
      { path: 'profile',         Component: ProfilePage },
      { path: 'settings',        Component: SettingsPage },
      { path: 'admin',           Component: AdminDashboard },
      { path: '*',               Component: NotFound },
      { path: '/soon',           Component: Soon },
      { path: '/Privacy_Policy',           Component: Privacy_Policy },
      { path: '/Terms',           Component: Terms },
      { path: '/Cookies',           Component: Cookies },
    ],
  },
])
