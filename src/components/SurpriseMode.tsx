import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS, type Product } from '../data/menu'
import ProductScene from './scenes/ProductScene'
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
          className="wood fixed inset-0 z-[70] flex flex-col items-center justify-center px-6 text-center"
          role="dialog"
          aria-modal="true"
          aria-label="Sorpréndeme"
        >
          <div
            className="absolute inset-0 animate-flicker"
            style={{
              background:
                'radial-gradient(ellipse 65% 50% at 50% 45%, rgb(255 140 66 / 0.14), transparent 72%)',
            }}
          />

          <p className="relative flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-cream-dim">
            <IconSparkle size={13} className="text-gold" />
            La casa elige
          </p>

          {/* durante la ruleta, los nombres pasan en Fraunces; al parar, el plato */}
          <div className="relative mt-8 flex h-64 w-full max-w-sm flex-col items-center justify-center">
            {phase === 'rolling' ? (
              <motion.p
                key={pick.id}
                initial={{ opacity: 0.3, y: 14, filter: 'blur(2px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.09 }}
                className="font-display text-4xl font-semibold italic text-cream/85"
              >
                {pick.name}
              </motion.p>
            ) : (
              <motion.div
                key={`done-${pick.id}`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                className="h-full w-full"
              >
                <ProductScene product={pick} />
              </motion.div>
            )}
          </div>

          <div className="relative mt-4 min-h-32">
            {phase === 'done' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="font-display text-3xl font-semibold text-cream">{pick.name}</h3>
                <p className="mt-1 font-display text-2xl font-semibold text-ember">{pick.price}</p>
                <p className="mt-3 font-serif text-xl italic text-gold">Hoy deberías pedir esto.</p>
              </motion.div>
            )}
          </div>

          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`#${pick.id}`}
              onClick={onClose}
              className={`rounded-full bg-gold px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-opacity ${
                phase === 'done' ? 'opacity-100' : 'pointer-events-none opacity-30'
              }`}
            >
              Verlo en la carta
            </a>
            <button
              type="button"
              onClick={roll}
              className="rounded-full border border-white/15 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold hover:border-gold/40"
            >
              Otra vez
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream-dim hover:text-cream"
          >
            <IconClose size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
