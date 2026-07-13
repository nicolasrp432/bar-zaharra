import { useState } from 'react'
import type { Product } from '../../data/menu'
import Burger from './Burger'
import Bocata from './Bocata'
import { Nachos, Patatas, Nuggets } from './Snacks'
import { Shake, Malteada } from './Drinks'

/**
 * Visual del producto. Intenta cargar la foto real recortada
 * (public/img/products/<id>.png, fondo transparente); si no existe todavía,
 * muestra la escena ilustrada animada. Así, cuando el bar tenga fotos de
 * verdad basta con soltarlas en esa carpeta.
 */
export default function ProductScene({ product }: { product: Product }) {
  const [hasPhoto, setHasPhoto] = useState(true)

  if (hasPhoto) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-contain p-6"
        style={{ filter: 'drop-shadow(0 28px 36px rgb(0 0 0 / 0.5))' }}
        onError={() => setHasPhoto(false)}
      />
    )
  }

  switch (product.scene) {
    case 'burger-casa':
      return <Burger variant="casa" />
    case 'burger-pollo':
      return <Burger variant="pollo" />
    case 'burger-sepia':
      return <Burger variant="sepia" />
    case 'bocata':
      return <Bocata variant={product.id as 'bocata-pollo' | 'bocata-lomo' | 'bocata-ternera'} />
    case 'nachos':
      return <Nachos />
    case 'patatas':
      return <Patatas />
    case 'nuggets':
      return <Nuggets />
    case 'shake-mango':
      return <Shake flavor="mango" />
    case 'shake-fresa':
      return <Shake flavor="fresa" />
    case 'malteada-vainilla':
      return <Malteada flavor="vainilla" />
    case 'malteada-fresa':
      return <Malteada flavor="fresa" />
    case 'malteada-chocolate':
      return <Malteada flavor="chocolate" />
  }
}
