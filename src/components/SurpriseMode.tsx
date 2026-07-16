import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS, type Product } from '../data/menu'
import { IconClose, IconSparkle } from './Icons'

/**
 * Modo "tengo hambre": una ruleta tipográfica recorre la carta y la casa
 * elige por ti. "Hoy deberías pedir esto."
 */
export default function SurpriseMode({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<'rolling' | 'done'>('rolling')
  const [pick, setPick] = useState<Product>(PRODUCTS[0])
  const timers = useRef<number[]>([])

  const roll = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('rolling')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const spins = reduced ? 1 : 9
    for (let i = 0; i < spins; i++) {
      timers.current.push(
        window.setTimeout(() => {
          setPick(PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)])
          if (i === spins - 1) setPhase('done')
        }, 90 + i * (55 + i * 22)),
      )
    }
  }

  useEffect(() => {
    if (open) roll()
    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-paper px-6 text-center"
          role="dialog"
          aria-modal="true"
          aria-label="Sorpréndeme"
        >
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-ink/45">
            <IconSparkle size={13} className="text-gold" />
            La casa elige
          </p>

          <div className="mt-10 flex min-h-40 w-full max-w-sm flex-col items-center justify-center">
            <motion.p
              key={pick.id + phase}
              initial={
                phase === 'done'
                  ? { scale: 0.8, opacity: 0 }
                  : { opacity: 0.3, y: 14, filter: 'blur(2px)' }
              }
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={
                phase === 'done'
                  ? { type: 'spring', stiffness: 200, damping: 16 }
                  : { duration: 0.09 }
              }
              className={`font-display font-medium text-ink ${phase === 'done' ? 'text-6xl' : 'text-4xl italic opacity-70'}`}
            >
              {pick.name}
            </motion.p>

            {phase === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="mt-3 font-display text-3xl font-semibold text-gold">{pick.price}</p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/45">
                  {pick.priceNote}
                </p>
                <p className="mt-5 font-serif text-2xl italic text-ink/70">
                  Hoy deberías pedir esto.
                </p>
              </motion.div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`#${pick.id}`}
              onClick={onClose}
              className={`rounded-full bg-ink px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-paper transition-opacity ${
                phase === 'done' ? 'opacity-100' : 'pointer-events-none opacity-30'
              }`}
            >
              Verlo en la carta
            </a>
            <button
              type="button"
              onClick={roll}
              className="rounded-full border border-ink/15 px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ink/70 hover:border-gold hover:text-gold"
            >
              Otra vez
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/50 hover:text-ink"
          >
            <IconClose size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
