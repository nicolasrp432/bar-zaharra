import { useState } from 'react'
import { motion } from 'framer-motion'
import Burger from './scenes/Burger'
import Smoke from './fx/Smoke'
import { IconChevronDown, IconSparkle } from './Icons'

/**
 * Portada: bodegón cinematográfico de la hamburguesa estrella, muy oscuro y
 * cálido. Si existe /img/hero.png (foto recortada, fondo transparente),
 * sustituye a la ilustración y flota sobre la luz.
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
      <p className="relative z-10 pt-7 text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-gold">
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
              src={`${import.meta.env.BASE_URL}img/hero.png`}
              alt="La Burger de la Casa, recién hecha"
              className="h-full w-full object-contain"
              style={{ filter: 'drop-shadow(0 36px 44px rgb(0 0 0 / 0.55))' }}
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
          className="mx-auto max-w-md font-display text-5xl font-semibold leading-[1.05] text-cream sm:text-6xl"
        >
          Hecho al momento.
          <br />
          <span className="italic text-gold">Como debe ser.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <a
            href="#compartir"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-transform hover:scale-105 active:scale-95"
          >
            Ver carta
            <IconChevronDown size={14} className="motion-safe:animate-bob" />
          </a>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onSurprise}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:border-gold/40 hover:bg-gold/5"
            >
              <IconSparkle size={13} />
              Sorpréndeme
            </button>
            <button
              type="button"
              onClick={onRecommend}
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:border-gold/40 hover:bg-gold/5"
            >
              ¿Qué pido?
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
