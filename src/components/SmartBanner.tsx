import { useState } from 'react'
import { CATEGORIES, timeSuggestion } from '../data/menu'
import { CategoryIcon, IconClose } from './Icons'

/**
 * Menú inteligente: según la hora del día, la casa sugiere un capítulo.
 * Aparece como una chapita flotante bajo la portada, descartable.
 */
export default function SmartBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { categoryId, message } = timeSuggestion(new Date().getHours())
  const category = CATEGORIES.find((c) => c.id === categoryId)!

  if (dismissed) return null

  return (
    <div className="sticky top-16 z-40 flex justify-center px-4">
      <div className="flex max-w-full items-center gap-1 rounded-full border border-ink/12 bg-paper py-1.5 pl-4 pr-1.5 shadow-[0_10px_30px_-10px_rgb(36_28_18/0.3)]">
        <a href={`#${category.id}`} className="flex min-w-0 items-center gap-2.5 text-xs text-ink/80">
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
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink/40 hover:text-ink"
        >
          <IconClose size={13} />
        </button>
      </div>
    </div>
  )
}
