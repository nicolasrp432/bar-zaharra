import { useEffect, useState } from 'react'
import { CATEGORIES, type CategoryId } from '../data/menu'

/** Scroll-spy compartido: qué capítulo de la carta está en pantalla. */
export function useActiveChapter(): CategoryId | null {
  const [active, setActive] = useState<CategoryId | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as CategoryId)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    for (const c of CATEGORIES) {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return active
}
