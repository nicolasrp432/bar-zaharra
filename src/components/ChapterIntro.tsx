import { motion } from 'framer-motion'
import type { Category } from '../data/menu'
import { CategoryIcon } from './Icons'

/** Cabecera de sección: compacta, editorial, con el acento del capítulo. */
export default function ChapterIntro({ category, accent }: { category: Category; accent: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="flex flex-col items-center pb-4 pt-20 text-center"
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 8 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        aria-hidden
        style={{ color: accent }}
      >
        <CategoryIcon id={category.id} size={22} />
      </motion.span>

      <motion.p
        variants={{
          hidden: { opacity: 0, letterSpacing: '0.55em' },
          show: { opacity: 1, letterSpacing: '0.38em', transition: { duration: 0.9, delay: 0.1 } },
        }}
        className="mt-4 text-[9px] font-bold uppercase text-ink/45"
      >
        {category.chapter}
      </motion.p>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
        }}
        className="mt-2 font-display text-5xl font-medium text-ink"
      >
        {category.name}
      </motion.h2>

      <motion.p
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.7, delay: 0.4 } },
        }}
        className="mt-2.5 max-w-sm font-serif text-lg italic text-ink/60"
      >
        {category.lead}. {category.sub}
      </motion.p>

      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.8, delay: 0.5 } },
        }}
        className="mt-6 h-px w-24"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
    </motion.div>
  )
}
