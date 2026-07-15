import { useState } from 'react'
import { CATEGORIES, timeSuggestion } from '../data/menu'
import { CategoryIcon, IconClose } from './Icons'

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
    <div className="sticky top-16 z-40 flex justify-center px-4">
      <div className="flex max-w-full items-center gap-1 rounded-full border border-white/10 bg-ink-2/95 py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/40 backdrop-blur-xl">
        <a
          href={`#${category.id}`}
          className="flex min-w-0 items-center gap-2.5 text-xs text-cream/90"
        >
          <span className="text-gold" aria-hidden>
            <CategoryIcon id={category.id} size={15} />
          </span>
          <span className="truncate">{message}</span>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
            Ir
          </span>
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Cerrar sugerencia"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-cream-dim hover:text-cream"
        >
          <IconClose size={13} />
        </button>
      </div>
    </div>
  )
}
