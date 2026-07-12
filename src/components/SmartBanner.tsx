import { useState } from 'react'
import { CATEGORIES, timeSuggestion } from '../data/menu'

/**
 * Menú inteligente: según la hora del día, la casa sugiere un capítulo.
 * Aparece como una chapita flotante bajo el hero, descartable.
 */
export default function SmartBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { categoryId, message } = timeSuggestion(new Date().getHours())
  const category = CATEGORIES.find((c) => c.id === categoryId)!

  if (dismissed) return null

  return (
    <div className="sticky top-3 z-40 flex justify-center px-4">
      <div className="flex max-w-full items-center gap-1 rounded-full border border-gold/30 bg-ink-2/95 py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/40 backdrop-blur">
        <a
          href={`#${category.id}`}
          className="flex min-w-0 items-center gap-2 text-xs text-cream/90"
        >
          <span aria-hidden>{category.emoji}</span>
          <span className="truncate">{message}</span>
          <span className="shrink-0 font-semibold uppercase tracking-wider text-gold">Ir →</span>
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Cerrar sugerencia"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-cream-dim hover:text-cream"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
