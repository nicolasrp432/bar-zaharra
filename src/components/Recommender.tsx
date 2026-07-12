import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { findProduct, type Product } from '../data/menu'

type Company = 'solo' | 'amigos' | 'pareja' | 'niños'

interface Result {
  main: Product
  side?: Product
  phrase: string
}

/** Reglas sencillas de la casa: tres preguntas y una recomendación honesta. */
function recommend(company: Company, hungry: boolean, meat: boolean): Result {
  const p = (id: string) => findProduct(id)!

  if (company === 'niños')
    return {
      main: p('nuggets'),
      side: p('batido-fresa'),
      phrase: 'Con los peques no se falla: crujiente, salsas para mojar y un batido rosa.',
    }
  if (!meat) {
    if (hungry)
      return {
        main: p('burger-sepia'),
        side: p('batido-mango'),
        phrase: 'Sin carne y con hambre: la rebelde del mar y un batido bien frío.',
      }
    return {
      main: p('nachos-cargados'),
      side: p('batido-mango'),
      phrase: 'Para picar sin carne, la montaña de nachos nunca decepciona.',
    }
  }
  if (hungry) {
    if (company === 'amigos')
      return {
        main: p('burger-casa'),
        side: p('nachos-cargados'),
        phrase: 'Plan de cuadrilla: la más pedida para ti y nachos al centro.',
      }
    if (company === 'pareja')
      return {
        main: p('burger-casa'),
        side: p('malteada-vainilla'),
        phrase: 'El clásico de la casa y una malteada con dos pajitas.',
      }
    return {
      main: p('burger-casa'),
      side: p('patatas'),
      phrase: 'Hambre seria: la Burger de la Casa con sus patatas. Sin experimentos.',
    }
  }
  if (company === 'amigos')
    return {
      main: p('patatas'),
      side: p('nuggets'),
      phrase: 'Para ir picando entre todos: bravas y nuggets con tres salsas.',
    }
  return {
    main: p('bocata-pollo'),
    side: p('malteada-chocolate'),
    phrase: 'Algo ligero pero de verdad: bocata en pan artesanal y capricho dulce.',
  }
}

const COMPANY_OPTIONS: { id: Company; label: string; emoji: string }[] = [
  { id: 'solo', label: 'Solo', emoji: '🧍' },
  { id: 'amigos', label: 'Con amigos', emoji: '🍻' },
  { id: 'pareja', label: 'En pareja', emoji: '💛' },
  { id: 'niños', label: 'Con niños', emoji: '🧒' },
]

/** Quiz de tres preguntas a pantalla completa: ¿con quién, cuánta hambre, carne? */
export default function Recommender({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [company, setCompany] = useState<Company>('solo')
  const [hungry, setHungry] = useState(true)
  const [result, setResult] = useState<Result | null>(null)

  const reset = () => {
    setStep(0)
    setResult(null)
  }
  const close = () => {
    onClose()
    reset()
  }

  const Option = ({ label, emoji, onPick }: { label: string; emoji: string; onPick: () => void }) => (
    <button
      type="button"
      onClick={onPick}
      className="brass-frame flex w-full items-center gap-4 rounded-2xl bg-ink-3/80 px-5 py-4 text-left transition-transform hover:scale-[1.02] active:scale-95"
    >
      <span className="text-2xl" aria-hidden>
        {emoji}
      </span>
      <span className="font-serif text-lg text-cream">{label}</span>
    </button>
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="wood fixed inset-0 z-[70] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="¿Qué pido?"
        >
          <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-6 py-16">
            <p className="text-center text-xs uppercase tracking-[0.4em] text-cream-dim">
              {result ? 'La casa recomienda' : `Pregunta ${step + 1} de 3`}
            </p>

            <AnimatePresence mode="wait">
              {!result && step === 0 && (
                <motion.div key="q1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="mt-6">
                  <h3 className="text-center font-display text-3xl text-cream">¿Cómo vienes hoy?</h3>
                  <div className="mt-6 space-y-3">
                    {COMPANY_OPTIONS.map((o) => (
                      <Option
                        key={o.id}
                        label={o.label}
                        emoji={o.emoji}
                        onPick={() => {
                          setCompany(o.id)
                          setStep(1)
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {!result && step === 1 && (
                <motion.div key="q2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="mt-6">
                  <h3 className="text-center font-display text-3xl text-cream">¿Tienes mucha hambre?</h3>
                  <div className="mt-6 space-y-3">
                    <Option label="Mucha. Vengo en serio" emoji="🔥" onPick={() => { setHungry(true); setStep(2) }} />
                    <Option label="Solo algo de picar" emoji="🤏" onPick={() => { setHungry(false); setStep(2) }} />
                  </div>
                </motion.div>
              )}

              {!result && step === 2 && (
                <motion.div key="q3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="mt-6">
                  <h3 className="text-center font-display text-3xl text-cream">¿Te apetece carne?</h3>
                  <div className="mt-6 space-y-3">
                    <Option label="Sí, claro" emoji="🥩" onPick={() => setResult(recommend(company, hungry, true))} />
                    <Option label="Hoy no" emoji="🌊" onPick={() => setResult(recommend(company, hungry, false))} />
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 170, damping: 16 }}
                  className="mt-6 text-center"
                >
                  <h3 className="font-display text-4xl leading-tight text-gold">{result.main.name}</h3>
                  <p className="mt-1 font-display text-2xl text-ember">{result.main.price}</p>
                  {result.side && (
                    <p className="mt-3 font-serif text-lg italic text-cream/85">
                      + {result.side.name} · {result.side.price}
                    </p>
                  )}
                  <p className="mt-4 font-script text-2xl text-cream-dim">{result.phrase}</p>
                  <div className="mt-7 flex flex-col items-center gap-3">
                    <a
                      href={`#${result.main.id}`}
                      onClick={close}
                      className="rounded-full bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
                    >
                      Verlo en la carta
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-full border border-gold/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold"
                    >
                      ← Volver a empezar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream-dim hover:text-cream"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
