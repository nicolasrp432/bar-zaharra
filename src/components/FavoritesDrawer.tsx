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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-[65] max-h-[75svh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-ink-2 px-5 pb-10 pt-4"
            role="dialog"
            aria-label="Tus favoritos"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-cream/20" />
            <h3 className="mt-5 flex items-center gap-2.5 font-display text-2xl font-semibold text-cream">
              <IconHeart size={19} filled className="text-coral" />
              Tus favoritos
            </h3>

            {items.length === 0 ? (
              <p className="mt-4 pb-4 font-serif text-lg italic text-cream-dim">
                Aún no has guardado nada. Toca el corazón de un plato y te esperará aquí para
                cuando llegue el camarero.
              </p>
            ) : (
              <>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-dim">
                  Tu comanda soñada, lista para cantar
                </p>
                <ul className="mt-5 space-y-3">
                  {items.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-3/70 px-4 py-3"
                    >
                      <a href={`#${p.id}`} onClick={onClose} className="min-w-0">
                        <p className="truncate font-serif text-lg text-cream">{p.name}</p>
                        <p className="text-[10px] uppercase tracking-wider text-cream-dim">
                          {p.priceNote}
                        </p>
                      </a>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-display text-xl font-semibold text-gold">{p.price}</span>
                        <button
                          type="button"
                          onClick={() => toggle(p.id)}
                          aria-label={`Quitar ${p.name} de favoritos`}
                          className="grid h-9 w-9 place-items-center rounded-full border border-coral/25 text-coral"
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
