import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark'|'light'
const Cx = createContext<{ theme: Theme; toggle(): void }|undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('imdb_theme') as Theme) || 'dark'
  )

  useEffect(() => {
    localStorage.setItem('imdb_theme', theme)
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <Cx.Provider value={{ theme, toggle: () => setTheme(t => t==='dark'?'light':'dark') }}>
      {children}
    </Cx.Provider>
  )
}

export const useTheme = () => {
  const c = useContext(Cx); if (!c) throw new Error(); return c
}
