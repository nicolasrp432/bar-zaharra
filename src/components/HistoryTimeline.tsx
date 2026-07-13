import { motion } from 'framer-motion'
import { IconStar } from './Icons'

/** Hitos editables de la historia del local. */
const MILESTONES = [
  {
    year: '2002',
    title: 'Se encienden las luces',
    text: 'Abre Taberna Zaharra: una barra de madera, pocas mesas y una idea fija — todo hecho al momento.',
  },
  {
    year: '2010',
    title: 'El pan, en casa',
    text: 'Empezamos a trabajar solo con pan artesanal. Desde entonces, si no cruje, no sale.',
  },
  {
    year: '2018',
    title: 'Nace la Burger de la Casa',
    text: 'Vacuno, bacon y huevo frito. Se convirtió en la más pedida y ya no salió de la carta.',
  },
  {
    year: 'Hoy',
    title: 'La misma taberna',
    text: 'Más de veinte años después seguimos igual: fuego, plancha y las cosas como deben ser.',
  },
]

/** La historia del local, de 2002 a hoy, como un pequeño recorrido vertical. */
export default function HistoryTimeline() {
  return (
    <section className="wood relative px-6 py-24" aria-label="Nuestra historia">
      <div className="mx-auto max-w-xl">
        <p className="text-center text-[11px] uppercase tracking-[0.4em] text-cream-dim">
          Nuestra historia
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold text-gold">Desde 2002</h2>

        <div className="relative mt-12">
          <span className="absolute left-[19px] top-1 h-full w-px bg-gold/25" aria-hidden />
          <ol className="space-y-10">
            {MILESTONES.map((m) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
                className="relative flex gap-6"
              >
                <span
                  aria-hidden
                  className="brass-frame z-[1] grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink-2 text-xs font-bold text-gold"
                >
                  {m.year === 'Hoy' ? <IconStar size={13} /> : m.year.slice(2)}
                </span>
                <div>
                  <p className="font-display text-xl text-cream">
                    {m.year} · <span className="text-gold">{m.title}</span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/70">{m.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
