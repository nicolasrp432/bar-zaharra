import type { Category } from '../data/menu'

/**
 * Sobre papel crema, cada capítulo se distingue solo por un acento sutil
 * (numerales, precios, barras y filetes). Tonos apagados, legibles en claro.
 */
export const ACCENTS: Record<Category['theme'], string> = {
  ember: '#a63d1e', // brasa
  brass: '#8a6a2f', // latón
  rustic: '#8a5424', // pan
  fresh: '#9a520a', // mango
  cream: '#9c4f63', // fresa
}
