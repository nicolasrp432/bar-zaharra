import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES, categorySummary } from '../data/menu'
import { THEMES } from './themes'
import { useActiveChapter } from '../hooks/useActiveChapter'
import { useFavorites } from '../hooks/useFavorites'
import { IconArrowRight, IconClose, IconHeart, IconSparkle } from './Icons'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
} as const

const row = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const

/**
 * Índice editorial a pantalla completa: los capítulos de la carta en grande,
 * con nº de platos y precio "desde". La navegación principal de la casa.
 */
export default function MenuIndex({
  open,
  onClose,
  onFavorites,
  onSurprise,
}: {
  open: boolean
  onClose: () => void
  onFavorites: () => void
  onSurprise: () => void
}) {
  const active = useActiveChapter()
  const { favorites } = useFavorites()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="wood fixed inset-0 z-[70] flex flex-col overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Índice de la carta"
        >
          <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-6 pb-10 pt-5">
            {/* cabecera */}
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-gold">
                Zaharra
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar índice"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-cream-dim transition-colors hover:text-cream"
              >
                <IconClose size={16} />
              </button>
            </div>

            <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.4em] text-cream-dim">
              La carta
            </p>

            {/* capítulos */}
            <motion.nav
              variants={list}
              initial="hidden"
              animate="show"
              aria-label="Capítulos"
              className="mt-4 flex-1"
            >
              {CATEGORIES.map((c) => {
                const { count, from } = categorySummary(c.id)
                const numeral = c.chapter.split(' ')[1]
                const isActive = active === c.id
                const accent = THEMES[c.theme].accent
                return (
                  <motion.a
                    key={c.id}
                    variants={row}
                    href={`#${c.id}`}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 border-b border-white/[0.07] py-5"
                  >
                    <span
                      className="w-8 shrink-0 font-display text-xs font-semibold"
                      style={{ color: isActive ? accent : 'rgb(203 191 164 / 0.55)' }}
                    >
                      {numeral}
                    </span>
                    <span
                      className="font-display text-3xl font-semibold leading-none transition-colors sm:text-4xl"
                      style={{ color: isActive ? accent : '#f3e9d2' }}
                    >
                      {c.name}
                    </span>
                    <span className="ml-auto shrink-0 text-right text-[10px] font-medium uppercase tracking-[0.16em] text-cream-dim">
                      {count} {count === 1 ? 'plato' : 'platos'}
                      <span className="block text-gold/80">desde {from}</span>
                    </span>
                    <IconArrowRight
                      size={16}
                      className="hidden shrink-0 -translate-x-1 self-center text-gold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                    />
                  </motion.a>
                )
              })}
            </motion.nav>

            {/* acciones */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onFavorites()
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/85 transition-colors hover:border-coral/40 hover:text-coral"
              >
                <IconHeart size={14} filled={favorites.length > 0} className={favorites.length > 0 ? 'text-coral' : undefined} />
                Favoritos{favorites.length > 0 ? ` · ${favorites.length}` : ''}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onSurprise()
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:border-gold/40"
              >
                <IconSparkle size={14} />
                Sorpréndeme
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              className="mt-8 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-cream/35"
            >
              Hecho al momento · Desde 2002
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
