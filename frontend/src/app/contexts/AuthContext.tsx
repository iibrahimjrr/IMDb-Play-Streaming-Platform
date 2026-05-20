import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi, userApi } from '../services/api'

export interface User {
  id: string; name: string; email: string; role: 'user'|'admin'
  avatar?: string; myList?: number[]; favorites?: number[]
}

interface Ctx {
  user: User|null; loading: boolean; isAuth: boolean
  login(e: string, p: string): Promise<void>
  register(n: string, e: string, p: string): Promise<void>
  logout(): void
  updateUser(d: Partial<User>): void
  addList(id: number): Promise<void>;   removeList(id: number): Promise<void>
  addFav(id: number):  Promise<void>;   removeFav(id: number):  Promise<void>
}

const Cx = createContext<Ctx|undefined>(undefined)

const TK = 'imdb_token', UK = 'imdb_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User|null>(() => {
    try { return JSON.parse(localStorage.getItem(UK) || 'null') } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  // verify token on mount
  useEffect(() => {
    if (!localStorage.getItem(TK)) return
    authApi.me()
      .then(u => fetchAndMerge(u))
      .catch(() => { localStorage.removeItem(TK); localStorage.removeItem(UK); setUser(null) })
  }, [])

  // listen for 401 fired by axios interceptor
  useEffect(() => {
    const h = () => setUser(null)
    window.addEventListener('auth:expired', h)
    return () => window.removeEventListener('auth:expired', h)
  }, [])

  async function fetchAndMerge(baseUser: any) {
    const profile = await userApi.profile().catch(() => baseUser)
    const merged: User = {
      ...baseUser,
      myList:    (profile.myList    || []).map(Number),
      favorites: (profile.favorites || []).map(Number),
    }
    setUser(merged)
    localStorage.setItem(UK, JSON.stringify(merged))
    return merged
  }

  async function login(email: string, password: string) {
    setLoading(true)
    try {
      const { token, user: u } = await authApi.login(email, password)
      localStorage.setItem(TK, token)
      await fetchAndMerge(u)
    } finally { setLoading(false) }
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true)
    try {
      const { token, user: u } = await authApi.register(name, email, password)
      localStorage.setItem(TK, token)
      const merged: User = { ...u, myList: [], favorites: [] }
      setUser(merged)
      localStorage.setItem(UK, JSON.stringify(merged))
    } finally { setLoading(false) }
  }

  function logout() {
    authApi.logout().catch(() => {})
    localStorage.removeItem(TK); localStorage.removeItem(UK)
    setUser(null)
  }

  function updateUser(d: Partial<User>) {
    if (!user) return
    const u = { ...user, ...d }
    setUser(u); localStorage.setItem(UK, JSON.stringify(u))
  }

  async function addList(id: number) {
    await userApi.addToMyList(id)
    updateUser({ myList: [...new Set([...(user?.myList||[]), id])] })
  }
  async function removeList(id: number) {
    await userApi.removeFromMyList(id)
    updateUser({ myList: (user?.myList||[]).filter(x=>x!==id) })
  }
  async function addFav(id: number) {
    await userApi.addToFavorites(id)
    updateUser({ favorites: [...new Set([...(user?.favorites||[]), id])] })
  }
  async function removeFav(id: number) {
    await userApi.removeFromFavorites(id)
    updateUser({ favorites: (user?.favorites||[]).filter(x=>x!==id) })
  }

  return (
    <Cx.Provider value={{ user, loading, isAuth: !!user, login, register, logout, updateUser, addList, removeList, addFav, removeFav }}>
      {children}
    </Cx.Provider>
  )
}

export const useAuth = () => {
  const c = useContext(Cx)
  if (!c) throw new Error('useAuth outside AuthProvider')
  return c
}
