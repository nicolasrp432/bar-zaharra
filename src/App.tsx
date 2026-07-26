import { useState } from 'react'
import { CATEGORIES, productsByCategory } from './data/menu'
import type { AllergenId } from './data/allergens'
import { FavoritesProvider } from './hooks/useFavorites'
import { ACCENTS } from './components/themes'
import AmbientBackground from './components/AmbientBackground'
import Hero from './components/Hero'
import TopBar from './components/TopBar'
import MenuIndex from './components/MenuIndex'
import SmartBanner from './components/SmartBanner'
import ChapterIntro from './components/ChapterIntro'
import ProductCard from './components/ProductCard'
import ContactLocation from './components/ContactLocation'
import BottomNav from './components/BottomNav'
import FavoritesDrawer from './components/FavoritesDrawer'
import SurpriseMode from './components/SurpriseMode'
import Recommender from './components/Recommender'
import AllergenFilterModal from './components/AllergenFilterModal'

export default function App() {
  const [surpriseOpen, setSurpriseOpen] = useState(false)
  const [recommenderOpen, setRecommenderOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [indexOpen, setIndexOpen] = useState(false)

  // Estado del filtro de alérgenos
  const [allergensOpen, setAllergensOpen] = useState(false)
  const [selectedAllergens, setSelectedAllergens] = useState<AllergenId[]>([])

  const handleToggleAllergen = (id: AllergenId) => {
    setSelectedAllergens((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const handleClearAllergens = () => {
    setSelectedAllergens([])
  }

  return (
    <FavoritesProvider>
      {/* Fondo atmosférico animado tenue */}
      <AmbientBackground />

      <div className="paper" aria-hidden />
      <TopBar onIndex={() => setIndexOpen(true)} />

      <main className="relative z-[2]">
        <Hero onRecommend={() => setRecommenderOpen(true)} />
        <SmartBanner />

        {/* Indicador de filtro activo en la carta */}
        {selectedAllergens.length > 0 && (
          <div className="mx-auto max-w-xl px-6 pt-4">
            <div className="flex items-center justify-between rounded-xl bg-rust/10 border border-rust/30 px-4 py-2.5 text-xs text-rust">
              <span className="font-semibold">
                Filtro activo: evitando {selectedAllergens.length} alérgeno(s)
              </span>
              <button
                type="button"
                onClick={handleClearAllergens}
                className="font-bold underline uppercase tracking-wider"
              >
                Limpiar
              </button>
            </div>
          </div>
        )}

        {/* la carta: un capítulo por categoría */}
        {CATEGORIES.map((category) => {
          const accent = ACCENTS[category.theme]
          const products = productsByCategory(category.id)

          return (
            <section
              key={category.id}
              id={category.id}
              className="mx-auto max-w-xl scroll-mt-14 px-6"
              aria-label={category.name}
            >
              <ChapterIntro category={category} accent={accent} />
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  accent={accent}
                  selectedAllergens={selectedAllergens}
                />
              ))}
            </section>
          )
        })}

        {/* Contacto y Ubicación */}
        <ContactLocation />

        {/* cierre, como la carta física */}
        <footer className="border-t border-ink/10 px-6 pb-32 pt-14 text-center">
          <p className="font-serif text-3xl font-semibold italic text-gold">¡Gracias por venir!</p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/70">
            Todos los panes son artesanales · Hecho al momento
          </p>
        </footer>
      </main>

      <BottomNav
        onIndex={() => setIndexOpen(true)}
        onFavorites={() => setFavoritesOpen(true)}
        onSurprise={() => setSurpriseOpen(true)}
      />
      <MenuIndex
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        onFavorites={() => setFavoritesOpen(true)}
        onSurprise={() => setSurpriseOpen(true)}
      />
      <FavoritesDrawer open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
      <SurpriseMode open={surpriseOpen} onClose={() => setSurpriseOpen(false)} />
      <Recommender open={recommenderOpen} onClose={() => setRecommenderOpen(false)} />
      <AllergenFilterModal
        open={allergensOpen}
        onClose={() => setAllergensOpen(false)}
        selectedAllergens={selectedAllergens}
        onToggleAllergen={handleToggleAllergen}
        onClear={handleClearAllergens}
      />
    </FavoritesProvider>
  )
}
