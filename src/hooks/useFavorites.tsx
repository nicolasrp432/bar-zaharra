import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'zaharra-favoritos'

interface FavoritesCtx {
  favorites: string[]
  isFavorite: (id: string) => boolean
  toggle: (id: string) => void
}

const Ctx = createContext<FavoritesCtx>({
  favorites: [],
  isFavorite: () => false,
  toggle: () => {},
})

function readStored(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      /* modo incógnito sin storage: los favoritos viven solo en memoria */
    }
  }, [favorites])

  const toggle = (id: string) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  return (
    <Ctx.Provider value={{ favorites, isFavorite: (id) => favorites.includes(id), toggle }}>
      {children}
    </Ctx.Provider>
  )
}

export const useFavorites = () => useContext(Ctx)
