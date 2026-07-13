import { motion } from 'framer-motion'
import type { Category } from '../data/menu'
import type { ThemeSpec } from './themes'
import { CategoryIcon } from './Icons'

/** Portada de capítulo editorial: numeral fantasma gigante detrás del título. */
export default function ChapterIntro({ category, theme }: { category: Category; theme: ThemeSpec }) {
  const ink = theme.light
  const numeral = category.chapter.split(' ')[1] ?? ''

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="relative flex min-h-[62svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* numeral romano fantasma */}
      <motion.span
        variants={{
          hidden: { opacity: 0, scale: 1.1 },
          show: { opacity: 1, scale: 1, transition: { duration: 1.4 } },
        }}
        aria-hidden
        className={`pointer-events-none absolute select-none font-display text-[11rem] font-semibold leading-none sm:text-[15rem] ${
          ink ? 'text-ink/[0.05]' : 'text-cream/[0.04]'
        }`}
      >
        {numeral}
      </motion.span>

      <motion.span
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
        aria-hidden
        className="relative"
        style={{ color: theme.accent }}
      >
        <CategoryIcon id={category.id} size={26} />
      </motion.span>

      <motion.p
        variants={{
          hidden: { opacity: 0, letterSpacing: '0.6em' },
          show: { opacity: 1, letterSpacing: '0.38em', transition: { duration: 1, delay: 0.1 } },
        }}
        className={`relative mt-5 text-[10px] font-semibold uppercase ${ink ? 'text-ink/50' : 'text-cream-dim'}`}
      >
        {category.chapter}
      </motion.p>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 22 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } },
        }}
        className="relative mt-3 font-display text-5xl font-semibold leading-tight sm:text-6xl"
        style={{ color: theme.accent }}
      >
        {category.name}
      </motion.h2>

      <motion.p
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.8, delay: 0.5 } },
        }}
        className={`relative mt-4 max-w-sm font-serif text-lg italic ${ink ? 'text-ink/70' : 'text-cream/75'}`}
      >
        {category.lead}. {category.sub}
      </motion.p>

      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.9, delay: 0.6 } },
        }}
        className="relative mt-7 h-px w-32"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
      />
    </motion.div>
  )
}
