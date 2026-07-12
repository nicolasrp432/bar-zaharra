import { motion } from 'framer-motion'
import type { Category } from '../data/menu'
import type { ThemeSpec } from './themes'

/** Portada de capítulo: cada categoría abre como un escenario propio. */
export default function ChapterIntro({ category, theme }: { category: Category; theme: ThemeSpec }) {
  const ink = theme.light
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="relative flex min-h-[62svh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, letterSpacing: '0.6em' },
          show: { opacity: 1, letterSpacing: '0.38em', transition: { duration: 1 } },
        }}
        className={`text-[11px] uppercase ${ink ? 'text-ink/50' : 'text-cream-dim'}`}
      >
        {category.chapter}
      </motion.p>

      <motion.span
        variants={{
          hidden: { opacity: 0, scale: 0.6, y: 12 },
          show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring' as const, stiffness: 200, damping: 16, delay: 0.15 },
          },
        }}
        aria-hidden
        className="mt-4 text-5xl motion-safe:animate-bob"
      >
        {category.emoji}
      </motion.span>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 22 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } },
        }}
        className="mt-4 font-display text-4xl leading-tight sm:text-5xl"
        style={{ color: theme.accent }}
      >
        {category.name}
      </motion.h2>

      <motion.p
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.8, delay: 0.5 } },
        }}
        className={`mt-4 max-w-sm font-serif text-lg italic ${ink ? 'text-ink/70' : 'text-cream/75'}`}
      >
        {category.lead}. {category.sub}
      </motion.p>

      {/* filete decorativo, como los recuadros de la carta */}
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.9, delay: 0.6 } },
        }}
        className="mt-6 h-px w-40"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
      />
    </motion.div>
  )
}
