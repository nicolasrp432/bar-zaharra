import { motion } from 'framer-motion'
import type { Product } from '../data/menu'
import type { ThemeSpec } from './themes'
import { useFavorites } from '../hooks/useFavorites'
import ProductScene from './scenes/ProductScene'
import Meters from './Meters'
import Smoke from './fx/Smoke'

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

        {/* badges */}
        <div className="absolute left-3 top-3 flex max-w-[70%] flex-wrap gap-1.5">
          {product.badges.map((b) => (
            <span
              key={b}
              className="rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur-sm"
            >
              {b}
            </span>
          ))}
        </div>

        {/* corazón */}
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={fav}
          aria-label={fav ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
          className={`absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-xl backdrop-blur-sm transition-transform active:scale-90 ${
            fav ? 'bg-coral/90 text-white' : 'bg-ink/70 text-cream/80'
          }`}
        >
          {fav ? '♥' : '♡'}
        </button>
      </motion.div>

      {/* texto */}
      <motion.div variants={textStagger} className="mt-7">
        <motion.h3
          variants={fadeUp}
          className="font-display text-3xl leading-tight sm:text-4xl"
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
              className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.12em] ${
                ink ? 'border-ink/25 text-ink/75' : 'border-gold/30 text-cream/85'
              }`}
            >
              {ing}
            </motion.li>
          ))}
        </motion.ul>

        {/* precio */}
        <motion.p variants={fadeUp} className="mt-6 flex items-baseline gap-3">
          <span className="font-display text-5xl" style={{ color: theme.accent }}>
            {product.price}
          </span>
          <span
            className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
              ink ? 'text-ink/55' : 'text-cream-dim'
            }`}
          >
            {product.priceNote}
          </span>
        </motion.p>

        {/* medidores + protagonista */}
        <motion.div variants={fadeUp} className="mt-6 grid gap-5 sm:grid-cols-2">
          <Meters meters={product.meters} light={ink} />
          <div
            className={`rounded-xl border p-4 ${
              ink ? 'border-ink/15 bg-white/40' : 'border-gold/20 bg-white/[0.04]'
            }`}
          >
            <p className={`text-[10px] uppercase tracking-[0.22em] ${ink ? 'text-ink/50' : 'text-cream-dim'}`}>
              El protagonista
            </p>
            <p className="mt-1 text-lg font-semibold" style={{ color: theme.accent }}>
              {product.protagonist.emoji} {product.protagonist.name}
            </p>
            <p className={`mt-1 text-sm leading-relaxed ${ink ? 'text-ink/75' : 'text-cream/80'}`}>
              {product.protagonist.text}
            </p>
          </div>
        </motion.div>

        {product.pairing && (
          <motion.p
            variants={fadeUp}
            className="mt-5 font-script text-2xl"
            style={{ color: ink ? '#8a4a2b' : '#d9b36a' }}
          >
            {product.pairing}
          </motion.p>
        )}
      </motion.div>
    </motion.article>
  )
}
