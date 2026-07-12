/** Variants compartidos: la pila de ingredientes entra capa a capa. */
export const stack = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } },
} as const

export const layer = {
  hidden: { opacity: 0, y: -46, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 230, damping: 21 },
  },
} as const

/** Para elementos que suben desde abajo (vasos, salsas). */
export const rise = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 180, damping: 22 },
  },
} as const
