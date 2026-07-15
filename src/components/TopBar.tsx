import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES } from '../data/menu'
import { useActiveChapter } from '../hooks/useActiveChapter'
import { IconMenu } from './Icons'

/**
 * Barra superior translúcida: aparece al dejar atrás el hero. Marca a la
 * izquierda, capítulo activo en el centro y acceso al índice a la derecha.
 */
export default function TopBar({ onIndex }: { onIndex: () => void }) {
  const [visible, setVisible] = useState(false)
  const active = useActiveChapter()
  const category = CATEGORIES.find((c) => c.id === active)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl"
        >
          <div className="mx-auto flex h-13 max-w-3xl items-center justify-between gap-3 px-4 py-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-gold"
              aria-label="Volver arriba"
            >
              Zaharra
            </button>

            <AnimatePresence mode="wait">
              {category && (
                <motion.span
                  key={category.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="hidden font-serif text-sm italic text-cream/60 sm:block"
                >
                  {category.chapter} · {category.name}
                </motion.span>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={onIndex}
              className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/85 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <IconMenu size={15} />
              Índice
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
