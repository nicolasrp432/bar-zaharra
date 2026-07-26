import type { AllergenId } from '../data/allergens'

interface AllergenIconProps {
  id: AllergenId
  className?: string
  size?: number
}

export default function AllergenIcon({ id, className = '', size = 16 }: AllergenIconProps) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.75',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }

  switch (id) {
    case 'gluten':
      // Espiga de trigo
      return (
        <svg {...commonProps}>
          <path d="M12 2v20M12 4c-2.5 1-4.5 3-4.5 5.5S9.5 13 12 14M12 4c2.5 1 4.5 3 4.5 5.5S14.5 13 12 14M12 10c-3 1-5 3.5-5 6M12 10c3 1 5 3.5 5 6" />
        </svg>
      )
    case 'crustaceos':
      // Gamba/cangrejo
      return (
        <svg {...commonProps}>
          <path d="M12 3a7 7 0 0 0-7 7c0 4 3.5 7 7 11 3.5-4 7-7 7-11a7 7 0 0 0-7-7z" />
          <path d="M9 10a3 3 0 0 1 6 0" />
          <path d="M8 14h8" />
        </svg>
      )
    case 'huevos':
      // Huevo
      return (
        <svg {...commonProps}>
          <path d="M12 3C8 3 5 8 5 14a7 7 0 0 0 14 0c0-6-3-11-7-11z" />
          <path d="M12 11a3 3 0 0 0-3 3" />
        </svg>
      )
    case 'pescado':
      // Pescado
      return (
        <svg {...commonProps}>
          <path d="M6.5 12C3 9 2 5 2 5s4 1 7 4.5c2.5-1.5 5.5-1.5 8 0C20.5 6 22 5 22 5s-1 4-4.5 7c3.5 3 4.5 7 4.5 7s-1.5-1-5-4.5c-2.5 1.5-5.5 1.5-8 0C6 18 2 19 2 19s1-4 4.5-7z" />
          <circle cx="16" cy="10" r="1" fill="currentColor" />
        </svg>
      )
    case 'cacahuetes':
      // Cacahuete
      return (
        <svg {...commonProps}>
          <path d="M8 7c-2 2-2 5 0 7 1.5 1.5 2 3.5 1 5.5 2 0 4-1 5-2.5 1-1.5 1-3.5 0-5 2-1 3-3 2.5-5S13 4 11 5C9.5 4 8.5 5.5 8 7z" />
        </svg>
      )
    case 'soja':
      // Vaina de soja / hoja
      return (
        <svg {...commonProps}>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
          <path d="M12 6a4 4 0 0 1 4 4c0 4-4 8-4 8s-4-4-4-8a4 4 0 0 1 4-4z" />
        </svg>
      )
    case 'lacteos':
      // Botella de leche / queso
      return (
        <svg {...commonProps}>
          <path d="M8 3h8v3l2 4v11H6V10l2-4V3z" />
          <path d="M6 13h12" />
          <path d="M10 3v3M14 3v3" />
        </svg>
      )
    case 'frutos_secos':
      // Nuez
      return (
        <svg {...commonProps}>
          <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z" />
          <path d="M12 3v18" />
          <path d="M12 8c-3 0-5 2-5 4s2 4 5 4M12 8c3 0 5 2 5 4s-2 4-5 4" />
        </svg>
      )
    case 'apio':
      // Tallo de apio
      return (
        <svg {...commonProps}>
          <path d="M12 22V8M8 22V12c0-3 2-5 4-7 2 2 4 4 4 7v10M5 7c2 0 3.5 1.5 3.5 3M19 7c-2 0-3.5 1.5-3.5 3" />
        </svg>
      )
    case 'mostaza':
      // Tarro / semilla de mostaza
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          <circle cx="14" cy="11" r="1" fill="currentColor" />
          <circle cx="11" cy="14" r="1.2" fill="currentColor" />
          <circle cx="14" cy="14" r="1" fill="currentColor" />
        </svg>
      )
    case 'sesamo':
      // Semilla
      return (
        <svg {...commonProps}>
          <path d="M12 3c-4 5-6 9-6 12a6 6 0 0 0 12 0c0-3-2-7-6-12z" />
        </svg>
      )
    case 'sulfitos':
      // Copa de vino / sulfito
      return (
        <svg {...commonProps}>
          <path d="M8 22h8M12 15v7M7 3h10l-1 7a4 4 0 0 1-8 0L7 3z" />
          <path d="M7 7h10" />
        </svg>
      )
    case 'altramuces':
      // Flor / legumbre
      return (
        <svg {...commonProps}>
          <path d="M12 2a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" />
          <path d="M7 11a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" />
          <path d="M17 11a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" />
        </svg>
      )
    case 'moluscos':
      // Calamar / Almeja
      return (
        <svg {...commonProps}>
          <path d="M12 4a8 8 0 0 0-8 8c0 4.4 3.6 8 8 8s8-3.6 8-8a8 8 0 0 0-8-8z" />
          <path d="M12 4v16M6 8l12 8M18 8L6 16" />
        </svg>
      )
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      )
  }
}
