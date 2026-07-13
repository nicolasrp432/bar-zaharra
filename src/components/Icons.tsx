import type { ReactElement, SVGProps } from 'react'
import type { CategoryId } from '../data/menu'

/**
 * Iconografía propia de la casa: iconos de línea minimalistas (stroke 1.5,
 * currentColor) para sustituir a los emojis en toda la interfaz.
 */

type P = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 20, ...props }: P) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...props,
  }
}

/** Bol para compartir, con vapor */
export const IconShare = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 12.5h17c0 3-2 6.5-8.5 6.5s-8.5-3.5-8.5-6.5Z" />
    <path d="M6 19h12" />
    <path d="M9.5 9.5c-.8-1 .8-1.8 0-3M14.5 9.5c-.8-1 .8-1.8 0-3" />
  </svg>
)

/** Cucurucho de patatas */
export const IconFries = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.5 10.5 8 20h8l1.5-9.5" />
    <path d="M6 10.5h12" />
    <path d="M9.5 10.5v-5M12 10.5V4M14.5 10.5v-5" />
  </svg>
)

/** Hamburguesa */
export const IconBurger = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 9.5C4.5 6 7.5 4 12 4s7.5 2 7.5 5.5H4.5Z" />
    <path d="M4 13h16M5 16.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0" />
    <path d="M5.5 19.5h13" />
  </svg>
)

/** Barra de pan */
export const IconBaguette = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 15.5C3 12 6.5 7.5 11 5.5s8.5-.5 9 2.5-2.5 7.5-7 9.5-8 .5-9-2Z" />
    <path d="M9 9.8l2.2 2.2M12.6 8l2.2 2.2M16.2 6.6l2 2" />
  </svg>
)

/** Vaso alto con pajita */
export const IconShake = (p: P) => (
  <svg {...base(p)}>
    <path d="M7.5 8h9l-1.2 12h-6.6L7.5 8Z" />
    <path d="M8 11.5h8" />
    <path d="M12.5 8 15 3l2 .8" />
  </svg>
)

/** Copa de malteada con nata */
export const IconSundae = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.5 10h11c-.5 3.5-2.5 5.5-4 6.5V20h-3v-3.5c-1.5-1-3.5-3-4-6.5Z" />
    <path d="M8.5 20h7" />
    <path d="M8.5 10c-.5-2.5 1-4 3.5-4s4 1.5 3.5 4" />
    <path d="M12 6V4.5" />
  </svg>
)

export const IconHeart = ({ filled = false, ...p }: P & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.4 4.4 0 0 1 9 5.5c1.3 0 2.4.7 3 1.7.6-1 1.7-1.7 3-1.7a4.4 4.4 0 0 1 4.5 4.5c0 5.4-7.5 10-7.5 10Z" />
  </svg>
)

export const IconSparkle = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
    <path d="M18.5 15.5c.3 1.5 1 2.2 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-1 2.5-2.5Z" />
  </svg>
)

export const IconStar = ({ filled = true, ...p }: P & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 0 : 1.5}>
    <path d="m12 3.5 2.5 5.4 5.9.6-4.4 4 1.2 5.8L12 16.4l-5.2 2.9 1.2-5.8-4.4-4 5.9-.6L12 3.5Z" />
  </svg>
)

export const IconChevronDown = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
)

export const IconArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5" />
  </svg>
)

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const IconFlame = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20c-3.6 0-6-2.3-6-5.6 0-2.6 1.7-4.6 3.2-6.4.5 1 1.3 1.7 2.3 2 0-2.5.9-5 3-6.5-.2 2.2.7 3.5 2 5 1.3 1.6 1.5 2.9 1.5 4.4C18 17.7 15.6 20 12 20Z" />
  </svg>
)

const CATEGORY_ICONS: Record<CategoryId, (p: P) => ReactElement> = {
  compartir: IconShare,
  raciones: IconFries,
  hamburguesas: IconBurger,
  bocatas: IconBaguette,
  batidos: IconShake,
  malteadas: IconSundae,
}

export function CategoryIcon({ id, ...p }: P & { id: CategoryId }) {
  const C = CATEGORY_ICONS[id]
  return <C {...p} />
}
