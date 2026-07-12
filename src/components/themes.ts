import type { Category } from '../data/menu'

/**
 * Identidad visual de cada capítulo. Los capítulos calientes son oscuros
 * (brasa, latón, madera); batidos y malteadas rompen a claro para que el
 * recorrido tenga contraste, como pide el concepto.
 */
export interface ThemeSpec {
  /** fondo de la sección */
  bg: string
  /** color de acento (títulos, precios, marcos) */
  accent: string
  /** resplandor del escenario del producto */
  glow: string
  /** sección clara → tipografía oscura */
  light: boolean
  /** ¿lleva humo/vapor el plato? */
  smoke: boolean
}

export const THEMES: Record<Category['theme'], ThemeSpec> = {
  ember: {
    bg: 'linear-gradient(180deg, #170b04 0%, #1f1006 45%, #0c0805 100%)',
    accent: '#ff8c42',
    glow: 'rgb(255 140 66 / 0.16)',
    light: false,
    smoke: true,
  },
  brass: {
    bg: 'linear-gradient(180deg, #14100b 0%, #1c1610 50%, #0c0805 100%)',
    accent: '#d9b36a',
    glow: 'rgb(217 179 106 / 0.14)',
    light: false,
    smoke: true,
  },
  rustic: {
    bg: 'linear-gradient(180deg, #191006 0%, #241809 50%, #0c0805 100%)',
    accent: '#e2ab5c',
    glow: 'rgb(226 171 92 / 0.15)',
    light: false,
    smoke: true,
  },
  fresh: {
    bg: 'linear-gradient(180deg, #f8eed7 0%, #fbe3c3 55%, #f6d8d4 100%)',
    accent: '#d3541e',
    glow: 'rgb(255 179 71 / 0.35)',
    light: true,
    smoke: false,
  },
  cream: {
    bg: 'linear-gradient(180deg, #f6d8d4 0%, #f3e4cd 45%, #2a1a12 100%)',
    accent: '#8a4a2b',
    glow: 'rgb(247 232 201 / 0.5)',
    light: true,
    smoke: false,
  },
}
