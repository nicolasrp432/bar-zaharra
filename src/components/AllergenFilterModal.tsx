import { motion, AnimatePresence } from 'framer-motion'
import { ALLERGENS, type AllergenId } from '../data/allergens'
import AllergenIcon from './AllergenIcons'
import { IconClose } from './Icons'

interface AllergenFilterModalProps {
  open: boolean
  onClose: () => void
  selectedAllergens: AllergenId[]
  onToggleAllergen: (id: AllergenId) => void
  onClear: () => void
}

export default function AllergenFilterModal({
  open,
  onClose,
  selectedAllergens,
  onToggleAllergen,
  onClear,
}: AllergenFilterModalProps) {
  const allergenList = Object.values(ALLERGENS)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-h-[80vh] max-w-lg overflow-y-auto rounded-2xl bg-paper p-6 shadow-2xl ring-1 ring-gold/30 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Información de Alérgenos
                </h2>
                <p className="mt-1 text-xs text-ink/70">
                  Selecciona los alérgenos que deseas evitar o consultar
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-ink/60 hover:bg-ink/5 hover:text-ink transition-colors"
                aria-label="Cerrar ventana de alérgenos"
              >
                <IconClose size={20} />
              </button>
            </div>

            {/* Grid de alérgenos */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {allergenList.map((allergen) => {
                const active = selectedAllergens.includes(allergen.id)
                return (
                  <button
                    key={allergen.id}
                    type="button"
                    onClick={() => onToggleAllergen(allergen.id)}
                    className={`group flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                      active
                        ? 'border-rust bg-rust/10 text-rust shadow-sm ring-1 ring-rust/30'
                        : 'border-ink/10 bg-paper-2/60 text-ink/80 hover:border-gold/50 hover:bg-paper-2'
                    }`}
                  >
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                        active ? 'bg-rust text-paper' : 'bg-gold/15 text-gold group-hover:bg-gold/25'
                      }`}
                    >
                      <AllergenIcon id={allergen.id} size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs font-semibold uppercase tracking-wider">
                          {allergen.shortName}
                        </span>
                        {active && (
                          <span className="text-[10px] font-bold text-rust uppercase tracking-widest">
                            Evitar
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-ink/60">
                        {allergen.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* footer acciones */}
            <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
              <button
                type="button"
                onClick={onClear}
                disabled={selectedAllergens.length === 0}
                className="text-xs font-medium text-ink/60 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink disabled:opacity-40 disabled:no-underline"
              >
                Limpiar filtro
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-ink px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-paper shadow-md transition-transform hover:scale-[1.02] active:scale-95"
              >
                Ver carta {selectedAllergens.length > 0 ? `(${selectedAllergens.length} desarticulados)` : ''}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
