import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { findProduct, type Product } from '../data/menu'
import { IconClose } from './Icons'

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

const COMPANY_OPTIONS: { id: Company; label: string }[] = [
  { id: 'solo', label: 'Vengo solo' },
  { id: 'amigos', label: 'Con amigos' },
  { id: 'pareja', label: 'En pareja' },
  { id: 'niños', label: 'Con niños' },
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

  const Option = ({ index, label, onPick }: { index: number; label: string; onPick: () => void }) => (
    <button
      type="button"
      onClick={onPick}
      className="group flex w-full items-baseline gap-4 rounded-2xl bg-white/50 px-5 py-4 text-left ring-1 ring-ink/10 transition-all hover:ring-gold/60 active:scale-[0.98]"
    >
      <span className="font-display text-xs font-semibold text-gold/70 transition-colors group-hover:text-gold">
        {String(index).padStart(2, '0')}
      </span>
      <span className="font-display text-2xl font-medium text-ink">{label}</span>
    </button>
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-paper"
          role="dialog"
          aria-modal="true"
          aria-label="¿Qué pido?"
        >
          <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-6 py-16">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-ink/70">
              {result ? 'La casa recomienda' : `Pregunta ${step + 1} — 3`}
            </p>

            <AnimatePresence mode="wait">
              {!result && step === 0 && (
                <motion.div key="q1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="mt-6">
                  <h3 className="text-center font-display text-4xl font-medium text-ink">
                    ¿Cómo vienes hoy?
                  </h3>
                  <div className="mt-7 space-y-3">
                    {COMPANY_OPTIONS.map((o, i) => (
                      <Option
                        key={o.id}
                        index={i + 1}
                        label={o.label}
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
                  <h3 className="text-center font-display text-4xl font-medium text-ink">
                    ¿Tienes mucha hambre?
                  </h3>
                  <div className="mt-7 space-y-3">
                    <Option index={1} label="Mucha. Vengo en serio" onPick={() => { setHungry(true); setStep(2) }} />
                    <Option index={2} label="Solo algo de picar" onPick={() => { setHungry(false); setStep(2) }} />
                  </div>
                </motion.div>
              )}

              {!result && step === 2 && (
                <motion.div key="q3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="mt-6">
                  <h3 className="text-center font-display text-4xl font-medium text-ink">
                    ¿Te apetece carne?
                  </h3>
                  <div className="mt-7 space-y-3">
                    <Option index={1} label="Sí, claro" onPick={() => setResult(recommend(company, hungry, true))} />
                    <Option index={2} label="Hoy no" onPick={() => setResult(recommend(company, hungry, false))} />
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
                  <h3 className="font-display text-5xl font-medium leading-tight text-ink">
                    {result.main.name}
                  </h3>
                  <p className="mt-2 font-display text-3xl font-semibold text-gold">{result.main.price}</p>
                  {result.side && (
                    <p className="mt-3 font-serif text-xl italic text-ink/75">
                      + {result.side.name} · {result.side.price}
                    </p>
                  )}
                  <p className="mx-auto mt-5 max-w-xs font-serif text-xl italic text-ink/70">
                    {result.phrase}
                  </p>
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <a
                      href={`#${result.main.id}`}
                      onClick={close}
                      className="rounded-full bg-ink px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-paper"
                    >
                      Verlo en la carta
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-full border border-ink/15 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70 hover:border-gold hover:text-gold"
                    >
                      Volver a empezar
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
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/65 hover:text-ink"
          >
            <IconClose size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
