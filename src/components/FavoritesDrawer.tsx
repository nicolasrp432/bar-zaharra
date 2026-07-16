import { AnimatePresence, motion } from 'framer-motion'
import { findProduct } from '../data/menu'
import { useFavorites } from '../hooks/useFavorites'
import { IconClose, IconHeart } from './Icons'

/** Cajón inferior con los platos guardados. Persisten en el dispositivo. */
export default function FavoritesDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { favorites, toggle } = useFavorites()
  const items = favorites.map(findProduct).filter((p) => p !== undefined)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/25 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-[65] max-h-[75svh] overflow-y-auto rounded-t-3xl border-t border-ink/10 bg-paper px-5 pb-10 pt-4 shadow-[0_-16px_50px_-12px_rgb(36_28_18/0.35)]"
            role="dialog"
            aria-label="Tus favoritos"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-ink/15" />
            <h3 className="mt-5 flex items-center gap-2.5 font-display text-3xl font-semibold text-ink">
              <IconHeart size={19} filled className="text-rust" />
              Tus favoritos
            </h3>

            {items.length === 0 ? (
              <p className="mt-3 pb-4 font-serif text-xl italic text-ink/70">
                Aún no has guardado nada. Toca el corazón de un plato y te esperará aquí para
                cuando llegue el camarero.
              </p>
            ) : (
              <>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-ink/70">
                  Tu comanda, lista para cantar
                </p>
                <ul className="mt-5 space-y-3">
                  {items.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-3 rounded-xl bg-white/50 px-4 py-3 ring-1 ring-ink/10"
                    >
                      <a href={`#${p.id}`} onClick={onClose} className="min-w-0">
                        <p className="truncate font-display text-xl font-semibold text-ink">{p.name}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/70">
                          {p.priceNote}
                        </p>
                      </a>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-display text-xl font-semibold text-gold">{p.price}</span>
                        <button
                          type="button"
                          onClick={() => toggle(p.id)}
                          aria-label={`Quitar ${p.name} de favoritos`}
                          className="grid h-9 w-9 place-items-center rounded-full border border-rust/25 text-rust"
                        >
                          <IconClose size={13} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
