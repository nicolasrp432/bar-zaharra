import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/menu'
import { useFavorites } from '../hooks/useFavorites'
import { CategoryIcon, IconHeart, IconSparkle } from './Icons'

const SHORT_NAMES: Record<string, string> = {
  compartir: 'Compartir',
  raciones: 'Raciones',
  hamburguesas: 'Burgers',
  bocatas: 'Bocatas',
  batidos: 'Batidos',
  malteadas: 'Malteadas',
}

/**
 * Barra inferior fija estilo app: iconos de línea propios con scroll-spy;
 * el capítulo activo se expande mostrando su nombre. Es toda la navegación
 * que hay: el resto es scroll.
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
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-ink/85 px-2 py-1.5 shadow-[0_16px_48px_-12px_rgb(0_0_0/0.8)] backdrop-blur-2xl">
        {CATEGORIES.map((c) => {
          const isActive = active === c.id
          return (
            <motion.a
              key={c.id}
              layout
              href={`#${c.id}`}
              aria-label={c.name}
              aria-current={isActive ? 'true' : undefined}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className={`flex h-10 items-center justify-center gap-2 rounded-full px-2.5 transition-colors ${
                isActive ? 'bg-white/[0.07] text-gold' : 'text-cream/45 hover:text-cream/80'
              }`}
            >
              <CategoryIcon id={c.id} size={19} />
              {isActive && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.22em]"
                >
                  {SHORT_NAMES[c.id]}
                </motion.span>
              )}
            </motion.a>
          )
        })}

        <span className="mx-1.5 h-5 w-px bg-white/10" aria-hidden />

        <button
          type="button"
          onClick={onFavorites}
          aria-label={`Tus favoritos (${favorites.length})`}
          className="relative grid h-10 w-10 place-items-center rounded-full text-cream/60 transition-colors hover:text-coral"
        >
          <IconHeart size={19} filled={favorites.length > 0} className={favorites.length > 0 ? 'text-coral' : undefined} />
          {favorites.length > 0 && (
            <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full border border-ink bg-coral px-1 text-[9px] font-bold text-white">
              {favorites.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onSurprise}
          aria-label="Sorpréndeme"
          className="grid h-10 w-10 place-items-center rounded-full text-gold/80 transition-colors hover:text-gold"
        >
          <IconSparkle size={19} />
        </button>
      </div>
    </nav>
  )
}
