import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Product } from '../data/menu'
import { ALLERGENS, type AllergenId } from '../data/allergens'
import { useFavorites } from '../hooks/useFavorites'
import Meters from './Meters'
import AllergenIcon from './AllergenIcons'
import { IconChevronDown, IconHeart, IconStar } from './Icons'

interface ProductCardProps {
  product: Product
  accent: string
  filteredOut?: boolean
  selectedAllergens?: AllergenId[]
}

/**
 * Entrada de carta limpia y elegante:
 * - Vista principal: Nombre, línea de puntos, precio, ingredientes principales e insignias destacadas (p.ej. MÁS PEDIDO).
 * - Desplegable de Detalle: Muestra los Alérgenos del plato (con iconos y nombres claros), historia/tagline, medidores y maridaje.
 */
export default function ProductCard({
  product,
  accent,
  filteredOut = false,
  selectedAllergens = [],
}: ProductCardProps) {
  const { isFavorite, toggle } = useFavorites()
  const [open, setOpen] = useState(false)
  const fav = isFavorite(product.id)

  const hasAllergens = !!product.allergens && product.allergens.length > 0

  // Se considera que el plato tiene detalles si posee alérgenos, historia, medidores o maridaje
  const hasDetail =
    hasAllergens ||
    !!product.tagline ||
    !!product.protagonist ||
    !!product.pairing ||
    !!product.meters?.length

  // Verificar si el plato contiene alguno de los alérgenos seleccionados para filtrar
  const containsExcludedAllergen = selectedAllergens.some((a) => product.allergens?.includes(a))

  return (
    <motion.article
      id={product.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: filteredOut || containsExcludedAllergen ? 0.35 : 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`group relative scroll-mt-24 border-b border-ink/10 py-6 transition-all duration-300 ${
        containsExcludedAllergen ? 'grayscale-[50%]' : ''
      }`}
    >
      {/* Aviso de alérgeno excluido si el usuario lo filtró */}
      {containsExcludedAllergen && (
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-rust/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-rust">
          <span>⚠️ Contiene alérgeno a evitar</span>
        </div>
      )}

      {/* Nombre ..... Precio */}
      <div className="flex items-baseline gap-2.5">
        <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-ink transition-colors group-hover:text-amber-950">
          {product.name}
        </h3>
        <span aria-hidden className="dot-leader mx-1 mb-[7px] min-w-6 flex-1 self-end opacity-60 transition-opacity group-hover:opacity-100" />
        <p
          className="shrink-0 font-display text-2xl font-semibold transition-transform group-hover:scale-105"
          style={{ color: accent }}
        >
          {product.price}
        </p>
      </div>

      {/* Ingredientes principales en una línea */}
      {product.ingredients.length > 0 && (
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
          {product.ingredients.join(' · ')}
        </p>
      )}

      {/* Badges + Acciones principales */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {product.priceNote && (
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink/55">
            {product.priceNote}
          </span>
        )}

        {product.badges.map((b) => (
          <span
            key={b}
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all"
            style={{
              color: /más pedid/i.test(b) ? accent : 'rgb(36 28 18 / 0.7)',
              backgroundColor: /más pedid/i.test(b) ? `${accent}15` : 'transparent',
            }}
          >
            {/más pedid/i.test(b) && <IconStar size={10} className="animate-pulse" />}
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
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-ink/10 bg-paper-2/40 px-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/75 transition-all hover:border-gold/40 hover:bg-paper-2 hover:text-ink"
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
            aria-label={
              fav ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`
            }
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
              fav ? 'text-rust bg-rust/10' : 'text-ink/60 hover:bg-ink/5 hover:text-rust'
            }`}
          >
            <IconHeart size={16} filled={fav} />
          </motion.button>
        </span>
      </div>

      {/* Desplegable de Detalle limpio (Alérgenos + Historia + Maridaje) */}
      <AnimatePresence initial={false}>
        {open && hasDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-2xl bg-paper-2/50 p-5 ring-1 ring-gold/20 backdrop-blur-xs">
              {/* Sección de Alérgenos dentro del detalle */}
              {hasAllergens && (
                <div className="mb-4 border-b border-ink/10 pb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold mb-2">
                    Alérgenos del plato
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.allergens!.map((allergenId) => {
                      const info = ALLERGENS[allergenId]
                      const isExcluded = selectedAllergens.includes(allergenId)
                      return (
                        <div
                          key={allergenId}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium border transition-colors ${
                            isExcluded
                              ? 'bg-rust/15 border-rust text-rust font-bold'
                              : 'bg-paper border-ink/10 text-ink/80'
                          }`}
                        >
                          <AllergenIcon id={allergenId} size={13} className={isExcluded ? 'text-rust' : 'text-gold'} />
                          <span>{info?.shortName || allergenId}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Tagline / Storytelling */}
              {product.tagline && (
                <p className="font-serif text-lg italic leading-relaxed text-ink/85">
                  «{product.tagline}»
                </p>
              )}

              {/* Medidores y Protagonista */}
              {(product.meters?.length || product.protagonist) && (
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {product.meters?.length ? (
                    <Meters meters={product.meters} accent={accent} />
                  ) : (
                    <div />
                  )}
                  {product.protagonist && (
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
                        El protagonista
                      </p>
                      <p className="mt-0.5 font-display text-lg font-semibold text-ink">
                        {product.protagonist.name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink/75">
                        {product.protagonist.text}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Maridaje */}
              {product.pairing && (
                <p
                  className="mt-4 border-l-2 pl-3.5 font-serif text-base italic text-ink/80"
                  style={{ borderColor: accent }}
                >
                  <span className="font-sans text-[9px] font-bold uppercase not-italic tracking-widest text-gold block mb-0.5">
                    Maridaje sugerido
                  </span>
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
