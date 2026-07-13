import type { Meter } from '../data/menu'

/** Comparador visual: barras finas con el acento del capítulo, sin emojis. */
export default function Meters({
  meters,
  light,
  accent,
}: {
  meters: Meter[]
  light: boolean
  accent: string
}) {
  return (
    <dl className="space-y-3">
      {meters.map((m) => (
        <div key={m.label}>
          <div className="flex items-baseline justify-between gap-4">
            <dt
              className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                light ? 'text-ink/55' : 'text-cream-dim'
              }`}
            >
              {m.label}
            </dt>
            <dd
              className="font-display text-xs tabular-nums"
              style={{ color: accent }}
              aria-label={`${m.value} de 5`}
            >
              {m.value}/5
            </dd>
          </div>
          <div
            className={`mt-1.5 h-[3px] overflow-hidden rounded-full ${
              light ? 'bg-ink/10' : 'bg-white/10'
            }`}
            aria-hidden
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${(m.value / 5) * 100}%`,
                background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 55%, transparent), ${accent})`,
              }}
            />
          </div>
        </div>
      ))}
    </dl>
  )
}
