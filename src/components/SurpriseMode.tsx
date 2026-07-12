import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS, type Product } from '../data/menu'
import ProductScene from './scenes/ProductScene'

/**
 * Modo "tengo hambre": una ruleta rápida recorre la carta y la casa elige
 * por ti. "Hoy deberías pedir esto."
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

          <p className="relative text-xs uppercase tracking-[0.4em] text-cream-dim">
            La casa elige
          </p>

          <div className="relative mt-6 h-56 w-72 sm:h-64 sm:w-80">
            <motion.div
              key={pick.id + phase}
              initial={{ scale: phase === 'done' ? 0.7 : 0.94, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={
                phase === 'done'
                  ? { type: 'spring', stiffness: 180, damping: 14 }
                  : { duration: 0.08 }
              }
              className="h-full w-full"
            >
              {/* durante la ruleta basta el emoji; el plato completo, al parar */}
              {phase === 'rolling' ? (
                <div className="grid h-full w-full place-items-center text-7xl">
                  {pick.scene.startsWith('burger') ? '🍔' : pick.scene === 'bocata' ? '🥖' : pick.scene.startsWith('shake') ? '🥤' : pick.scene.startsWith('malteada') ? '🍦' : '🍟'}
                </div>
              ) : (
                <ProductScene product={pick} />
              )}
            </motion.div>
          </div>

          <div className="relative mt-4 min-h-32">
            <motion.h3
              key={pick.id}
              initial={{ opacity: 0.4, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl text-cream"
            >
              {pick.name}
            </motion.h3>
            {phase === 'done' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <p className="mt-1 font-display text-2xl text-ember">{pick.price}</p>
                <p className="mt-2 font-script text-2xl text-gold">Hoy deberías pedir esto.</p>
              </motion.div>
            )}
          </div>

          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`#${pick.id}`}
              onClick={onClose}
              className={`rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-opacity ${
                phase === 'done' ? 'opacity-100' : 'pointer-events-none opacity-30'
              }`}
            >
              Verlo en la carta
            </a>
            <button
              type="button"
              onClick={roll}
              className="rounded-full border border-gold/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold"
            >
              🎲 Otra vez
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream-dim hover:text-cream"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
