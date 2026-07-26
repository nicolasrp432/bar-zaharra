import { motion } from 'framer-motion'
import type { Category } from '../data/menu'
import { CategoryIcon } from './Icons'

/** Cabecera de sección: compacta, editorial, con el acento del capítulo y resplandor refinado. */
export default function ChapterIntro({ category, accent }: { category: Category; accent: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="relative flex flex-col items-center pb-4 pt-20 text-center"
    >
      {/* Resplandor ambiental temático de fondo */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-36 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-2xl transition-all duration-700"
        style={{ backgroundColor: accent }}
        aria-hidden
      />

      <motion.span
        variants={{
          hidden: { opacity: 0, scale: 0.6 },
          show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
        }}
        aria-hidden
        className="grid h-12 w-12 place-items-center rounded-full bg-paper-2/60 ring-1 ring-gold/20 shadow-xs"
        style={{ color: accent }}
      >
        <CategoryIcon id={category.id} size={24} />
      </motion.span>

      <motion.p
        variants={{
          hidden: { opacity: 0, letterSpacing: '0.55em' },
          show: { opacity: 1, letterSpacing: '0.38em', transition: { duration: 0.9, delay: 0.1 } },
        }}
        className="mt-4 text-[10px] font-bold uppercase tracking-[0.38em] text-ink/75"
      >
        {category.chapter}
      </motion.p>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
        }}
        className="mt-2 font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl drop-shadow-xs"
      >
        {category.name}
      </motion.h2>

      <motion.p
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.7, delay: 0.4 } },
        }}
        className="mt-2.5 max-w-sm font-serif text-lg italic text-ink/80"
      >
        {category.lead}. {category.sub}
      </motion.p>

      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.8, delay: 0.5 } },
        }}
        className="mt-6 flex items-center gap-2"
      >
        <span className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${accent})` }} />
        <span className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: accent }} />
        <span className="h-px w-12" style={{ background: `linear-gradient(-90deg, transparent, ${accent})` }} />
      </motion.div>
    </motion.div>
  )
}
