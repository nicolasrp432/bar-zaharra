import type { Meter } from '../data/menu'

/** Comparador visual: 🥩🥩🥩🥩 en lugar de una ficha técnica. */
export default function Meters({ meters, light }: { meters: Meter[]; light: boolean }) {
  return (
    <dl className="space-y-1.5">
      {meters.map((m) => (
        <div key={m.label} className="flex items-baseline justify-between gap-4">
          <dt
            className={`text-[11px] uppercase tracking-[0.18em] ${
              light ? 'text-ink/60' : 'text-cream-dim'
            }`}
          >
            {m.label}
          </dt>
          <dd className="text-base leading-none" aria-label={`${m.value} de 5`}>
            <span aria-hidden>
              {m.icon.repeat(m.value)}
              <span className="opacity-20">{m.icon.repeat(5 - m.value)}</span>
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
