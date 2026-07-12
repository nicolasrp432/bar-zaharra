import { useState } from 'react'
import { motion } from 'framer-motion'
import Burger from './scenes/Burger'
import Smoke from './fx/Smoke'

/**
 * Portada: bodegón cinematográfico de la hamburguesa estrella, muy oscuro y
 * cálido. Si existe /img/hero.jpg (foto real), sustituye a la ilustración.
 */
export default function Hero({
  onSurprise,
  onRecommend,
}: {
  onSurprise: () => void
  onRecommend: () => void
}) {
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <header className="wood vignette film-grain relative flex min-h-svh flex-col overflow-hidden">
      <p className="relative z-10 pt-7 text-center font-serif text-[11px] uppercase tracking-[0.5em] text-gold">
        Taberna Zaharra · Desde 2002
      </p>

      {/* el bodegón */}
      <div className="relative z-[1] mx-auto mt-2 w-full max-w-md flex-1 px-6">
        <div
          className="absolute inset-x-0 top-1/2 h-3/4 -translate-y-1/2 animate-flicker"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 55%, rgb(255 140 66 / 0.16), transparent 70%)',
          }}
        />
        <motion.div
          initial="hidden"
          animate="show"
          className="relative h-full min-h-[240px] motion-safe:animate-breathe"
        >
          {hasPhoto ? (
            <img
              src="/img/hero.jpg"
              alt="La Burger de la Casa, recién hecha"
              className="h-full w-full rounded-b-3xl object-cover"
              onError={() => setHasPhoto(false)}
            />
          ) : (
            <Burger variant="casa" />
          )}
        </motion.div>
        <Smoke />
      </div>

      {/* el mensaje único */}
      <div className="relative z-10 px-6 pb-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mx-auto max-w-md font-display text-4xl leading-tight text-cream sm:text-5xl"
        >
          Hecho al momento.
          <br />
          <span className="text-gold">Como debe ser.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <a
            href="#compartir"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-transform hover:scale-105 active:scale-95"
          >
            ↓ Ver carta
          </a>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onSurprise}
              className="rounded-full border border-gold/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold/10"
            >
              ✨ Sorpréndeme
            </button>
            <button
              type="button"
              onClick={onRecommend}
              className="rounded-full border border-gold/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold/10"
            >
              🍽 ¿Qué pido?
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
