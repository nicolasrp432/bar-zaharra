import { useEffect, useState } from 'react'
import { CATEGORIES } from '../data/menu'
import { useFavorites } from '../hooks/useFavorites'

/**
 * Barra inferior fija estilo app: un icono por capítulo con scroll-spy,
 * más favoritos y Sorpréndeme. Es toda la navegación que hay: el resto es scroll.
 */
export default function BottomNav({
  onFavorites,
  onSurprise,
}: {
  onFavorites: () => void
  onSurprise: () => void
}) {
  const { favorites } = useFavorites()
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    for (const c of CATEGORIES) {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Capítulos de la carta"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-0.5 rounded-full border border-gold/25 bg-ink/90 px-2 py-1.5 shadow-xl shadow-black/50 backdrop-blur-md">
        {CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-label={c.name}
            aria-current={active === c.id ? 'true' : undefined}
            className={`grid h-10 w-10 place-items-center rounded-full text-lg transition-all ${
              active === c.id ? 'scale-110 bg-gold/20' : 'opacity-55 hover:opacity-90'
            }`}
          >
            <span aria-hidden>{c.emoji}</span>
          </a>
        ))}

        <span className="mx-1 h-6 w-px bg-gold/25" aria-hidden />

        <button
          type="button"
          onClick={onFavorites}
          aria-label={`Tus favoritos (${favorites.length})`}
          className="relative grid h-10 w-10 place-items-center rounded-full text-lg text-coral"
        >
          ♥
          {favorites.length > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[10px] font-bold text-white">
              {favorites.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onSurprise}
          aria-label="Sorpréndeme"
          className="grid h-10 w-10 place-items-center rounded-full text-lg"
        >
          ✨
        </button>
      </div>
    </nav>
  )
}
