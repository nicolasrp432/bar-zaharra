import type { Meter } from '../data/menu'

/** Comparador visual: barras finas con el acento del capítulo. */
export default function Meters({ meters, accent }: { meters: Meter[]; accent: string }) {
  return (
    <dl className="space-y-3">
      {meters.map((m) => (
        <div key={m.label}>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/70">
              {m.label}
            </dt>
            <dd
              className="font-display text-sm font-semibold tabular-nums"
              style={{ color: accent }}
              aria-label={`${m.value} de 5`}
            >
              {m.value}/5
            </dd>
          </div>
          <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-ink/10" aria-hidden>
            <div
              className="h-full rounded-full"
              style={{
                width: `${(m.value / 5) * 100}%`,
                background: `linear-gradient(90deg, ${accent}88, ${accent})`,
              }}
            />
          </div>
        </div>
      ))}
    </dl>
  )
}
