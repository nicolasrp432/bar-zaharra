import { motion } from 'framer-motion'
import { IconChevronDown } from './Icons'

const seq = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
} as const

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' as const } },
} as const

/** Filete con rombo, como los ornamentos de la carta física. */
function Ornament() {
  return (
    <motion.div variants={fade} aria-hidden className="flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-gold/50" />
      <span className="h-1.5 w-1.5 rotate-45 border border-gold/70" />
      <span className="h-px w-16 bg-gold/50" />
    </motion.div>
  )
}

/**
 * Portada: el logotipo de la casa sobre papel, sin más. Un menú empieza
 * por su nombre.
 */
export default function Hero({ onRecommend }: { onRecommend: () => void }) {
  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
      {/* marco fino de carta */}
      <div aria-hidden className="pointer-events-none absolute inset-3 border border-ink/15 sm:inset-5" />
      <div aria-hidden className="pointer-events-none absolute inset-4.5 border border-ink/8 sm:inset-6.5" />

      <motion.div variants={seq} initial="hidden" animate="show" className="relative">
        <Ornament />

        <motion.p
          variants={{
            hidden: { opacity: 0, letterSpacing: '0.7em' },
            show: { opacity: 1, letterSpacing: '0.52em', transition: { duration: 1.3 } },
          }}
          className="mt-8 text-[11px] font-semibold uppercase text-gold"
        >
          Taberna
        </motion.p>

        <motion.h1
          variants={fade}
          className="mt-2 font-display text-7xl font-medium text-ink sm:text-8xl"
        >
          Zaharra
        </motion.h1>

        <div className="mt-8">
          <Ornament />
        </div>

        <motion.p variants={fade} className="mt-8 font-serif text-2xl italic text-ink/70">
          Hecho al momento. Como debe ser.
        </motion.p>

        <motion.div variants={fade} className="mt-10 flex flex-col items-center gap-3">
          <a
            href="#compartir"
            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-9 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-paper transition-transform hover:scale-[1.03] active:scale-95"
          >
            Ver la carta
            <IconChevronDown size={13} className="motion-safe:animate-bob" />
          </a>
          <button
            type="button"
            onClick={onRecommend}
            className="rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold underline-offset-4 transition-colors hover:text-ink"
          >
            Ayúdame a elegir
          </button>
        </motion.div>
      </motion.div>
    </header>
  )
}
