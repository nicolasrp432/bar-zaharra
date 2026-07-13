import { useState } from 'react'
import { CATEGORIES, productsByCategory } from './data/menu'
import { FavoritesProvider } from './hooks/useFavorites'
import { THEMES } from './components/themes'
import Intro from './components/Intro'
import Hero from './components/Hero'
import SmartBanner from './components/SmartBanner'
import ChapterIntro from './components/ChapterIntro'
import ProductCard from './components/ProductCard'
import HistoryTimeline from './components/HistoryTimeline'
import BottomNav from './components/BottomNav'
import FavoritesDrawer from './components/FavoritesDrawer'
import SurpriseMode from './components/SurpriseMode'
import Recommender from './components/Recommender'

export default function App() {
  const [surpriseOpen, setSurpriseOpen] = useState(false)
  const [recommenderOpen, setRecommenderOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)

  return (
    <FavoritesProvider>
      <Intro />

      <main>
        <Hero
          onSurprise={() => setSurpriseOpen(true)}
          onRecommend={() => setRecommenderOpen(true)}
        />
        <SmartBanner />

        {/* la carta como recorrido: un capítulo por categoría */}
        {CATEGORIES.map((category) => {
          const theme = THEMES[category.theme]
          return (
            <section
              key={category.id}
              id={category.id}
              className={`relative scroll-mt-4 ${theme.light ? '' : 'film-grain'}`}
              style={{ background: theme.bg }}
              aria-label={category.name}
            >
              <ChapterIntro category={category} theme={theme} />
              {productsByCategory(category.id).map((product) => (
                <ProductCard key={product.id} product={product} theme={theme} />
              ))}
            </section>
          )
        })}

        <HistoryTimeline />

        {/* cierre, como la carta física */}
        <footer className="border-t border-gold/15 bg-ink px-6 pb-32 pt-14 text-center">
          <p className="font-serif text-3xl font-semibold italic text-gold">¡Gracias por venir!</p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-cream-dim">
            Todos los panes son artesanales · Hecho al momento
          </p>
          <p className="mt-6 font-serif text-xs text-cream/40">
            Taberna Zaharra · Desde 2002
          </p>
        </footer>
      </main>

      <BottomNav
        onFavorites={() => setFavoritesOpen(true)}
        onSurprise={() => setSurpriseOpen(true)}
      />
      <FavoritesDrawer open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
      <SurpriseMode open={surpriseOpen} onClose={() => setSurpriseOpen(false)} />
      <Recommender open={recommenderOpen} onClose={() => setRecommenderOpen(false)} />
    </FavoritesProvider>
  )
}
