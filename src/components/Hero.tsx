import { motion } from 'framer-motion'
import { IconChevronDown, IconStar } from './Icons'

const seq = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
} as const

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' as const } },
} as const

/** Filete con rombo y destello dorado, como los ornamentos de la carta física. */
function Ornament() {
  return (
    <motion.div variants={fade} aria-hidden className="flex items-center justify-center gap-3">
      <span className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-gold/40" />
      <span className="h-2 w-2 rotate-45 border border-gold bg-gold/20 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
      <span className="h-px w-20 bg-gradient-to-l from-transparent via-gold to-gold/40" />
    </motion.div>
  )
}

interface HeroProps {
  onRecommend: () => void
}

/**
 * Portada de autor centrada e integrada:
 * - Subtítulo superior: BAR · RESTAURANTE
 * - Título principal: Zaharra
 * - Botones principales: Ver la carta & Ayúdame a elegir
 */
export default function Hero({ onRecommend }: HeroProps) {
  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* marco fino de carta de lujo */}
      <div aria-hidden className="pointer-events-none absolute inset-3 rounded-xl border border-gold/25 sm:inset-5" />
      <div aria-hidden className="pointer-events-none absolute inset-4.5 rounded-lg border border-gold/10 sm:inset-6.5" />

      {/* Esquineras ornamentales */}
      <div aria-hidden className="pointer-events-none absolute top-5 left-5 h-6 w-6 border-t-2 border-l-2 border-gold/40" />
      <div aria-hidden className="pointer-events-none absolute top-5 right-5 h-6 w-6 border-t-2 border-r-2 border-gold/40" />
      <div aria-hidden className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b-2 border-l-2 border-gold/40" />
      <div aria-hidden className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b-2 border-r-2 border-gold/40" />

      <motion.div variants={seq} initial="hidden" animate="show" className="relative z-10 w-full max-w-md mx-auto">
        <Ornament />

        <motion.p
          variants={{
            hidden: { opacity: 0, letterSpacing: '0.7em' },
            show: { opacity: 1, letterSpacing: '0.55em', transition: { duration: 1.3 } },
          }}
          className="mt-8 text-[11px] font-bold uppercase tracking-[0.55em] text-gold drop-shadow-xs"
        >
          Bar · Restaurante
        </motion.p>

        <motion.h1
          variants={fade}
          className="mt-2 font-display text-7xl font-semibold tracking-tight text-ink sm:text-8xl md:text-9xl drop-shadow-sm"
        >
          Zaharra
        </motion.h1>

        <div className="mt-8">
          <Ornament />
        </div>

        <motion.p variants={fade} className="mt-8 font-serif text-2xl italic text-ink/80 max-w-xs mx-auto">
          «Hecho al momento. Como debe ser.»
        </motion.p>

        <motion.div variants={fade} className="mt-10 flex flex-col items-center justify-center gap-3.5">
          <a
            href="#compartir"
            className="w-full max-w-xs inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-paper shadow-lg shadow-ink/15 transition-transform hover:scale-[1.03] active:scale-95 ring-1 ring-gold/30"
          >
            Ver la carta
            <IconChevronDown size={13} className="motion-safe:animate-bob" />
          </a>

          <button
            type="button"
            onClick={onRecommend}
            className="w-full max-w-xs inline-flex items-center justify-center gap-1.5 rounded-full border border-gold/40 bg-paper/80 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink backdrop-blur-xs shadow-sm transition-all hover:bg-gold/15 hover:border-gold hover:scale-[1.02] active:scale-95"
          >
            <IconStar size={12} className="text-gold" />
            Ayúdame a elegir
          </button>
        </motion.div>
      </motion.div>
    </header>
  )
}
