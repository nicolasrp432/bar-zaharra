import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Product } from '../data/menu'
import { useFavorites } from '../hooks/useFavorites'
import Meters from './Meters'
import { IconChevronDown, IconHeart, IconStar } from './Icons'

/**
 * Entrada de carta clásica y legible: nombre, línea de puntos y precio.
 * El detalle (historia, medidores, maridaje) vive en un desplegable
 * discreto y solo aparece en los platos que lo tienen.
 */
export default function ProductCard({ product, accent }: { product: Product; accent: string }) {
  const { isFavorite, toggle } = useFavorites()
  const [open, setOpen] = useState(false)
  const fav = isFavorite(product.id)

  const hasDetail =
    !!product.tagline || !!product.protagonist || !!product.pairing || !!product.meters?.length

  return (
    <motion.article
      id={product.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 border-b border-ink/10 py-6"
    >
      {/* nombre ..... precio */}
      <div className="flex items-baseline gap-2.5">
        <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-ink">
          {product.name}
        </h3>
        <span aria-hidden className="dot-leader mx-1 mb-[7px] min-w-6 flex-1 self-end" />
        <p className="shrink-0 font-display text-2xl font-semibold" style={{ color: accent }}>
          {product.price}
        </p>
      </div>

      {/* ingredientes en una línea (si los hay) */}
      {product.ingredients.length > 0 && (
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
          {product.ingredients.join(' · ')}
        </p>
      )}

      {/* nota + badges + acciones */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {product.priceNote && (
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink/55">
            {product.priceNote}
          </span>
        )}
        {product.badges.map((b) => (
          <span
            key={b}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: /más pedid/i.test(b) ? accent : 'rgb(36 28 18 / 0.6)' }}
          >
            {/más pedid/i.test(b) && <IconStar size={9} />}
            {b}
          </span>
        ))}

        <span className="ml-auto flex items-center gap-1">
          {hasDetail && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={`Detalles de ${product.name}`}
              className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
            >
              Detalle
              <IconChevronDown
                size={12}
                className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </button>
          )}
          <motion.button
            type="button"
            onClick={() => toggle(product.id)}
            whileTap={{ scale: 0.8 }}
            aria-pressed={fav}
            aria-label={fav ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
              fav ? 'text-rust' : 'text-ink/70 hover:text-rust'
            }`}
          >
            <IconHeart size={16} filled={fav} />
          </motion.button>
        </span>
      </div>

      {/* detalle desplegable */}
      <AnimatePresence initial={false}>
        {open && hasDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-xl bg-white/45 p-5 ring-1 ring-ink/8">
              {product.tagline && (
                <p className="font-serif text-xl italic leading-snug text-ink/80">
                  {product.tagline}
                </p>
              )}

              {(product.meters?.length || product.protagonist) && (
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  {product.meters?.length ? <Meters meters={product.meters} accent={accent} /> : <div />}
                  {product.protagonist && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink/70">
                        El protagonista
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold" style={{ color: accent }}>
                        {product.protagonist.name}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink/70">
                        {product.protagonist.text}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {product.pairing && (
                <p
                  className="mt-5 border-l-2 pl-4 font-serif text-lg italic text-ink/70"
                  style={{ borderColor: `${accent}55` }}
                >
                  {product.pairing}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
