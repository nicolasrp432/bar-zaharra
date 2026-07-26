import { useFavorites } from '../hooks/useFavorites'
import { IconHeart, IconMenu, IconSparkle } from './Icons'

interface BottomNavProps {
  onIndex: () => void
  onFavorites: () => void
  onSurprise: () => void
}

/**
 * Navegación inferior flotante:
 * - Botón principal: "VER MENÚ" (abre el índice de categorías para navegar la carta).
 * - Favoritos y Sorpréndeme.
 */
export default function BottomNav({
  onIndex,
  onFavorites,
  onSurprise,
}: BottomNavProps) {
  const { favorites } = useFavorites()

  return (
    <nav
      aria-label="Navegación de la carta"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-1 rounded-full border border-gold/30 bg-paper/94 px-2 py-1.5 shadow-[0_12px_40px_-8px_rgb(36_28_18/0.25)] backdrop-blur-xl ring-1 ring-white/60">
        <button
          type="button"
          onClick={onIndex}
          className="flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-paper transition-transform active:scale-95 shadow-sm"
        >
          <IconMenu size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Ver Menú</span>
        </button>

        <span className="mx-1 h-5 w-px bg-ink/10" aria-hidden />

        <button
          type="button"
          onClick={onFavorites}
          aria-label={`Tus favoritos (${favorites.length})`}
          className="relative grid h-10 w-11 place-items-center rounded-full text-ink/70 transition-colors hover:text-rust"
        >
          <IconHeart
            size={18}
            filled={favorites.length > 0}
            className={favorites.length > 0 ? 'text-rust' : undefined}
          />
          {favorites.length > 0 && (
            <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full border border-paper bg-rust px-1 text-[10px] font-bold text-white">
              {favorites.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onSurprise}
          aria-label="Sorpréndeme"
          className="grid h-10 w-11 place-items-center rounded-full text-gold transition-colors hover:text-ink"
        >
          <IconSparkle size={18} />
        </button>
      </div>
    </nav>
  )
}
