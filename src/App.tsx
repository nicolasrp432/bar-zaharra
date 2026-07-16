import { useState } from 'react'
import { CATEGORIES, productsByCategory } from './data/menu'
import { FavoritesProvider } from './hooks/useFavorites'
import { ACCENTS } from './components/themes'
import Hero from './components/Hero'
import TopBar from './components/TopBar'
import MenuIndex from './components/MenuIndex'
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
  const [indexOpen, setIndexOpen] = useState(false)

  return (
    <FavoritesProvider>
      <div className="paper" aria-hidden />
      <TopBar onIndex={() => setIndexOpen(true)} />

      <main className="relative z-[2]">
        <Hero onRecommend={() => setRecommenderOpen(true)} />
        <SmartBanner />

        {/* la carta: un capítulo por categoría */}
        {CATEGORIES.map((category) => {
          const accent = ACCENTS[category.theme]
          return (
            <section
              key={category.id}
              id={category.id}
              className="mx-auto max-w-xl scroll-mt-14 px-6"
              aria-label={category.name}
            >
              <ChapterIntro category={category} accent={accent} />
              {productsByCategory(category.id).map((product) => (
                <ProductCard key={product.id} product={product} accent={accent} />
              ))}
            </section>
          )
        })}

        <HistoryTimeline />

        {/* cierre, como la carta física */}
        <footer className="border-t border-ink/10 px-6 pb-32 pt-14 text-center">
          <p className="font-serif text-3xl font-semibold italic text-gold">¡Gracias por venir!</p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/45">
            Todos los panes son artesanales · Hecho al momento
          </p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-ink/30">
            Taberna Zaharra · Desde 2002
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
    </FavoritesProvider>
  )
}
