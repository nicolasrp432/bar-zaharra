import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES } from '../data/menu'
import { useActiveChapter } from '../hooks/useActiveChapter'
import { IconMenu } from './Icons'

/**
 * Barra superior sobre papel: aparece al dejar atrás la portada. Marca a la
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
          className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-2.5">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-lg font-semibold tracking-[0.18em] text-ink uppercase"
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
                  className="hidden font-serif text-base italic text-ink/55 sm:block"
                >
                  {category.chapter} · {category.name}
                </motion.span>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={onIndex}
              className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ink/75 transition-colors hover:border-gold hover:text-gold"
            >
              <IconMenu size={14} />
              Índice
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
