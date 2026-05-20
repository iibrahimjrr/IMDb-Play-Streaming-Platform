import axios from 'axios'

// ── axios instance ────────────────────────────────────────────────────────────
// We use a relative base URL '/api' so the Vite dev-server proxy
// forwards requests to Laravel and avoids CORS issues.
let csrfLoaded = false

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  withCredentials: true,   // allow cookies for Sanctum CSRF / stateful requests
})

async function loadCsrfCookie() {
  if (csrfLoaded) return
  await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
  csrfLoaded = true
}

// Attach Bearer token on every request
api.interceptors.request.use(async cfg => {
  if (['post', 'put', 'patch', 'delete'].includes(cfg.method || '')) {
    await loadCsrfCookie()
  }

  const token = localStorage.getItem('imdb_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// Global 401 handler
api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('imdb_token')
      localStorage.removeItem('imdb_user')
      window.dispatchEvent(new Event('auth:expired'))
    }
    return Promise.reject(err)
  }
)

export default api

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password, password_confirmation: password })
      .then(r => r.data.data),                    // { token, user }

  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password })
      .then(r => r.data.data),                    // { token, user }

  logout: () => api.post('/auth/logout'),

  me: () => api.get('/auth/me').then(r => r.data.data),
}

// ── User ──────────────────────────────────────────────────────────────────────
export const userApi = {
  profile: () => api.get('/user').then(r => r.data.data),
  update:  (data: any) => api.put('/user', data).then(r => r.data.data),
  changePw:(cp: string, np: string) =>
    api.put('/user/password', { current_password: cp, password: np, password_confirmation: np })
      .then(r => r.data),

  getMyList:         () => api.get('/my-list').then(r => r.data.data),
  addToMyList:       (id: number) => api.post(`/my-list/${id}`),
  removeFromMyList:  (id: number) => api.delete(`/my-list/${id}`),

  getFavorites:       () => api.get('/favorites').then(r => r.data.data),
  addToFavorites:     (id: number) => api.post(`/favorites/${id}`),
  removeFromFavorites:(id: number) => api.delete(`/favorites/${id}`),
}

// ── Content ───────────────────────────────────────────────────────────────────
export const contentApi = {
  all:       (p?: any) => api.get('/contents', { params: p }).then(r => r.data.data),
  featured:  ()        => api.get('/contents/featured').then(r => r.data.data),
  trending:  ()        => api.get('/contents/trending').then(r => r.data.data),
  topRated:  ()        => api.get('/contents/top-rated').then(r => r.data.data),
  movies:    (g?: string) => api.get('/contents/movies', { params: { genre: g } }).then(r => r.data.data),
  series:    (g?: string) => api.get('/contents/series-list', { params: { genre: g } }).then(r => r.data.data),
  search:    (q: string)  => api.get('/contents/search', { params: { q } }).then(r => r.data.data),
  byGenre:   (g: string)  => api.get(`/contents/genre/${g}`).then(r => r.data.data),
  show:      (id: number) => api.get(`/contents/${id}`).then(r => r.data.data),
  related:   (id: number) => api.get(`/contents/${id}/related`).then(r => r.data.data),
  seasons:   (id: number) => api.get(`/series/${id}/seasons`).then(r => r.data.data),
  episode:   (id: number) => api.get(`/episodes/${id}`).then(r => r.data.data),
  byDirector:(name: string) => api.get(`/directors/${encodeURIComponent(name)}/contents`).then(r => r.data.data),
  byCast:    (name: string) => api.get(`/cast/${encodeURIComponent(name)}/contents`).then(r => r.data.data),
}

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminApi = {
  stats:         ()      => api.get('/admin/stats').then(r => r.data.data),
  users:         ()      => api.get('/admin/users').then(r => r.data.data),
  deleteUser:    (id: any) => api.delete(`/admin/users/${id}`),
  addContent:    (d: any)  => api.post('/admin/contents', d).then(r => r.data.data),
  updateContent: (id: number, d: any) => api.put(`/admin/contents/${id}`, d).then(r => r.data.data),
  deleteContent: (id: number) => api.delete(`/admin/contents/${id}`),
  setFeatured:   (id: number) => api.put(`/admin/contents/${id}/featured`).then(r => r.data.data),
  addSeason:     (cid: number, d: any) => api.post(`/admin/contents/${cid}/seasons`, d).then(r => r.data.data),
  addEpisode:    (sid: number, d: any) => api.post(`/admin/seasons/${sid}/episodes`, d).then(r => r.data.data),
}
