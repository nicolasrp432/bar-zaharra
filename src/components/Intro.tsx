import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SEEN_KEY = 'zaharra-intro-vista'

/**
 * Apertura cinematográfica: negro absoluto, una luz cálida crece sobre la
 * madera de la barra y aparece el logotipo. Se muestra una vez por sesión.
 */
export default function Intro() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      return sessionStorage.getItem(SEEN_KEY) !== '1'
    } catch {
      return true
    }
  })

  const dismiss = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* sin storage no pasa nada: solo se repetiría la intro */
    }
    setVisible(false)
  }

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    const t = setTimeout(dismiss, 4600)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="wood fixed inset-0 z-[80] grid place-items-center overflow-hidden"
          role="dialog"
          aria-label="Bienvenida a Taberna Zaharra"
        >
          {/* la luz cálida que se enciende */}
          <motion.div
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.6, ease: 'easeOut' }}
            className="absolute inset-0 animate-flicker"
            style={{
              background:
                'radial-gradient(ellipse 62% 48% at 50% 46%, rgb(217 179 106 / 0.20), rgb(211 84 30 / 0.05) 55%, transparent 75%)',
            }}
          />

          <div className="relative px-6 text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.42em' }}
              transition={{ delay: 1.1, duration: 1.4 }}
              className="font-serif text-sm uppercase text-gold"
            >
              Taberna
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.5, duration: 1.3, ease: 'easeOut' }}
              className="font-display text-6xl text-cream sm:text-7xl"
            >
              Zaharra
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 1 }}
              className="mt-3 text-xs uppercase tracking-[0.5em] text-cream-dim"
            >
              · Desde 2002 ·
            </motion.p>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="absolute bottom-8 right-6 rounded-full border border-cream/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream-dim transition-colors hover:text-cream"
          >
            Saltar →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
