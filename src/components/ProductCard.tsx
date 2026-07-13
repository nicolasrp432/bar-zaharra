import { motion } from 'framer-motion'
import type { Product } from '../data/menu'
import type { ThemeSpec } from './themes'
import { useFavorites } from '../hooks/useFavorites'
import ProductScene from './scenes/ProductScene'
import Meters from './Meters'
import Smoke from './fx/Smoke'
import { IconHeart, IconStar } from './Icons'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
} as const

const textStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
} as const

/**
 * Tarjeta inmersiva: el plato se monta capa a capa al entrar en pantalla,
 * después llegan ingredientes, precio, medidores, protagonista y maridaje.
 */
export default function ProductCard({ product, theme }: { product: Product; theme: ThemeSpec }) {
  const { isFavorite, toggle } = useFavorites()
  const fav = isFavorite(product.id)
  const ink = theme.light

  return (
    <motion.article
      id={product.id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto flex min-h-[92svh] w-full max-w-xl scroll-mt-16 flex-col justify-center px-5 py-14"
    >
      {/* escenario del plato */}
      <motion.div
        variants={fadeUp}
        className="brass-frame group relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 75% 65% at 50% 62%, ${theme.glow}, transparent 75%), ${
            ink ? 'rgb(255 255 255 / 0.35)' : 'rgb(0 0 0 / 0.35)'
          }`,
        }}
      >
        <div className="absolute inset-0 transition-transform duration-700 motion-safe:animate-breathe group-hover:scale-[1.04]">
          <ProductScene product={product} />
        </div>
        {theme.smoke && <Smoke />}

        {/* badges tipográficos */}
        <div className="absolute left-3 top-3 flex max-w-[70%] flex-wrap gap-1.5">
          {product.badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-ink/75 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-sm"
            >
              {/más pedid/i.test(b) && <IconStar size={9} />}
              {b}
            </span>
          ))}
        </div>

        {/* corazón */}
        <motion.button
          type="button"
          onClick={() => toggle(product.id)}
          whileTap={{ scale: 0.82 }}
          aria-pressed={fav}
          aria-label={fav ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
          className={`absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border backdrop-blur-sm transition-colors ${
            fav
              ? 'border-coral/40 bg-coral/90 text-white'
              : 'border-white/15 bg-ink/60 text-cream/75 hover:text-cream'
          }`}
        >
          <motion.span
            key={String(fav)}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            className="grid place-items-center"
          >
            <IconHeart size={18} filled={fav} />
          </motion.span>
        </motion.button>
      </motion.div>

      {/* texto */}
      <motion.div variants={textStagger} className="mt-7">
        <motion.h3
          variants={fadeUp}
          className="font-display text-3xl font-semibold leading-tight sm:text-4xl"
          style={{ color: ink ? '#1c1610' : '#f3e9d2' }}
        >
          {product.name}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          className={`mt-2 font-serif text-lg italic leading-snug ${ink ? 'text-ink/70' : 'text-cream-dim'}`}
        >
          {product.tagline}
        </motion.p>

        {/* ingredientes, uno a uno */}
        <motion.ul variants={textStagger} className="mt-5 flex flex-wrap gap-2" aria-label="Ingredientes">
          {product.ingredients.map((ing) => (
            <motion.li
              key={ing}
              variants={fadeUp}
              className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${
                ink ? 'border-ink/20 text-ink/70' : 'border-white/12 text-cream/80'
              }`}
            >
              {ing}
            </motion.li>
          ))}
        </motion.ul>

        {/* precio */}
        <motion.p variants={fadeUp} className="mt-6 flex items-baseline gap-3">
          <span className="font-display text-5xl font-semibold" style={{ color: theme.accent }}>
            {product.price}
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
              ink ? 'text-ink/55' : 'text-cream-dim'
            }`}
          >
            {product.priceNote}
          </span>
        </motion.p>

        {/* medidores + protagonista */}
        <motion.div variants={fadeUp} className="mt-6 grid gap-5 sm:grid-cols-2">
          <Meters meters={product.meters} light={ink} accent={theme.accent} />
          <div
            className={`rounded-xl border p-4 ${
              ink ? 'border-ink/12 bg-white/40' : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <p className={`text-[9px] font-semibold uppercase tracking-[0.24em] ${ink ? 'text-ink/50' : 'text-cream-dim'}`}>
              El protagonista
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold" style={{ color: theme.accent }}>
              {product.protagonist.name}
            </p>
            <p className={`mt-1 text-sm leading-relaxed ${ink ? 'text-ink/75' : 'text-cream/80'}`}>
              {product.protagonist.text}
            </p>
          </div>
        </motion.div>

        {product.pairing && (
          <motion.p
            variants={fadeUp}
            className="mt-6 border-l pl-4 font-serif text-lg italic"
            style={{
              color: ink ? '#8a4a2b' : '#d9b36a',
              borderColor: ink ? 'rgb(138 74 43 / 0.3)' : 'rgb(217 179 106 / 0.3)',
            }}
          >
            {product.pairing}
          </motion.p>
        )}
      </motion.div>
    </motion.article>
  )
}
