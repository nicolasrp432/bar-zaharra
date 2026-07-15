import { useFavorites } from '../hooks/useFavorites'
import { IconHeart, IconMenu, IconSparkle } from './Icons'

/**
 * Píldora inferior mínima: índice, favoritos y sorpréndeme. La navegación
 * por capítulos vive en el índice a pantalla completa (MenuIndex).
 */
export default function BottomNav({
  onIndex,
  onFavorites,
  onSurprise,
}: {
  onIndex: () => void
  onFavorites: () => void
  onSurprise: () => void
}) {
  const { favorites } = useFavorites()

  return (
    <nav
      aria-label="Navegación de la carta"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/85 px-2 py-1.5 shadow-[0_16px_48px_-12px_rgb(0_0_0/0.8)] backdrop-blur-2xl">
        <button
          type="button"
          onClick={onIndex}
          className="flex h-10 items-center gap-2.5 rounded-full bg-white/[0.06] px-5 text-cream/90 transition-colors hover:text-gold"
        >
          <IconMenu size={17} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Índice</span>
        </button>

        <span className="mx-1 h-5 w-px bg-white/10" aria-hidden />

        <button
          type="button"
          onClick={onFavorites}
          aria-label={`Tus favoritos (${favorites.length})`}
          className="relative grid h-10 w-11 place-items-center rounded-full text-cream/60 transition-colors hover:text-coral"
        >
          <IconHeart size={18} filled={favorites.length > 0} className={favorites.length > 0 ? 'text-coral' : undefined} />
          {favorites.length > 0 && (
            <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full border border-ink bg-coral px-1 text-[9px] font-bold text-white">
              {favorites.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onSurprise}
          aria-label="Sorpréndeme"
          className="grid h-10 w-11 place-items-center rounded-full text-gold/80 transition-colors hover:text-gold"
        >
          <IconSparkle size={18} />
        </button>
      </div>
    </nav>
  )
}
