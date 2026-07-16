/**
 * La carta de Taberna Zaharra, transcrita de la carta física (2026).
 * Cada producto lleva su capa de storytelling: protagonista, maridaje,
 * medidores visuales y las pistas que usa el recomendador.
 */

export type CategoryId =
  | 'compartir'
  | 'raciones'
  | 'hamburguesas'
  | 'bocatas'
  | 'batidos'
  | 'malteadas'

export interface Meter {
  label: string
  value: number // sobre 5
}

export interface Product {
  id: string
  category: CategoryId
  name: string
  price: string
  priceNote: string
  tagline: string
  ingredients: string[]
  protagonist: { name: string; text: string }
  pairing?: string
  badges: string[]
  meters: Meter[]
  /** pistas para el recomendador */
  hearty: boolean // ¿quita mucha hambre?
  meat: boolean
  kids?: boolean
  share?: boolean
}

export interface Category {
  id: CategoryId
  name: string
  chapter: string // numeración de capítulo
  lead: string // frase de portada
  sub: string
  theme: 'ember' | 'brass' | 'rustic' | 'fresh' | 'cream'
}

export const CATEGORIES: Category[] = [
  {
    id: 'compartir',
    name: 'Para compartir',
    chapter: 'Capítulo I',
    lead: 'Lo que llega al centro de la mesa',
    sub: 'Y desaparece antes de que llegue lo demás.',
    theme: 'brass',
  },
  {
    id: 'raciones',
    name: 'Raciones',
    chapter: 'Capítulo II',
    lead: 'De picar. O de no soltar.',
    sub: 'Cercanas, calientes, de las de mojar pan.',
    theme: 'brass',
  },
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    chapter: 'Capítulo III',
    lead: 'Fuego, humo y pan artesanal',
    sub: 'Hechas al momento. Como debe ser.',
    theme: 'ember',
  },
  {
    id: 'bocatas',
    name: 'Bocatas',
    chapter: 'Capítulo IV',
    lead: 'Pan crujiente, manos llenas',
    sub: 'Todos los panes son artesanales.',
    theme: 'rustic',
  },
  {
    id: 'batidos',
    name: 'Batidos',
    chapter: 'Capítulo V',
    lead: 'De la fruta a tu vaso',
    sub: 'Fríos, frescos, sin azúcares añadidos.',
    theme: 'fresh',
  },
  {
    id: 'malteadas',
    name: 'Malteadas',
    chapter: 'Capítulo VI',
    lead: 'Con bola de helado',
    sub: 'Lentas, densas, cremosas. Sin prisa.',
    theme: 'cream',
  },
]

export const PRODUCTS: Product[] = [
  // ——— PARA COMPARTIR ———
  {
    id: 'nachos-cargados',
    category: 'compartir',
    name: 'Nachos Cargados',
    price: '12€',
    priceNote: 'para 2 · o para uno, no juzgamos',
    tagline: 'La montaña que se pide para compartir y se defiende con el tenedor.',
    ingredients: ['Chips', 'Queso fundido', 'Jalapeños', 'Guac', 'Sour cream', 'Pico'],
    protagonist: {
      name: 'El queso fundido',
      text: 'Fundido en el momento, cae caliente sobre los chips y llega a la mesa todavía en movimiento.',
    },
    pairing: 'Combinan perfecto con un batido de mango bien frío.',
    badges: ['Para compartir', 'Hecho al momento'],
    meters: [
      { label: 'Queso', value: 5 },
      { label: 'Picante', value: 3 },
      { label: 'De compartir', value: 5 },
    ],
    hearty: true,
    meat: false,
    share: true,
  },

  // ——— RACIONES ———
  {
    id: 'patatas',
    category: 'raciones',
    name: 'Patatas',
    price: '5€',
    priceNote: 'fritas · o bravas',
    tagline: 'Doradas por fuera, tiernas por dentro. Con bravas, la cosa se pone seria.',
    ingredients: ['Patata en gajos', 'Fritas o bravas', 'Salsa brava de la casa'],
    protagonist: {
      name: 'La patata',
      text: 'Cortada aquí y frita dos veces: la primera para el corazón tierno, la segunda para el crujido.',
    },
    pairing: 'El escudero oficial de cualquier hamburguesa de la casa.',
    badges: ['Hecho al momento'],
    meters: [
      { label: 'Crujiente', value: 4 },
      { label: 'Picante (bravas)', value: 3 },
      { label: 'De compartir', value: 4 },
    ],
    hearty: false,
    meat: false,
    kids: true,
    share: true,
  },
  {
    id: 'nuggets',
    category: 'raciones',
    name: 'Nuggets de Pollo',
    price: '6 uds 5€ · 12 uds 10€',
    priceNote: 'salsa a elegir: ketchup · alioli · búffalo',
    tagline: 'Rebozado crujiente y tres salsas donde mojar. Elegir solo una es el reto.',
    ingredients: ['Pollo jugoso', 'Rebozado crujiente', 'Ketchup', 'Alioli', 'Búffalo'],
    protagonist: {
      name: 'El rebozado',
      text: 'Crujiente de verdad: se oye desde la otra punta de la barra.',
    },
    pairing: 'Con la salsa búffalo y un batido de fresa, combo ganador.',
    badges: ['Favorito de los peques', 'Hecho al momento'],
    meters: [
      { label: 'Crujiente', value: 5 },
      { label: 'Contundencia', value: 3 },
      { label: 'De compartir', value: 4 },
    ],
    hearty: false,
    meat: true,
    kids: true,
    share: true,
  },

  // ——— HAMBURGUESAS ———
  {
    id: 'burger-pollo',
    category: 'hamburguesas',
    name: 'Burger de Pollo',
    price: '8,50€',
    priceNote: 'hecha al momento',
    tagline: 'La ligera de la familia. Pollo a la plancha, queso fundido y cebolla dulce.',
    ingredients: ['Pollo', 'Queso fundido', 'Lechuga', 'Tomate', 'Cebolla confitada', 'Mayo'],
    protagonist: {
      name: 'La cebolla confitada',
      text: 'Horas a fuego lento hasta volverse dulce. Es la que le da el toque Zaharra.',
    },
    pairing: 'Combina perfecto con un batido de mango.',
    badges: ['Hecha al momento'],
    meters: [
      { label: 'Popularidad', value: 4 },
      { label: 'Contundencia', value: 3 },
      { label: 'Queso', value: 4 },
      { label: 'Picante', value: 1 },
    ],
    hearty: true,
    meat: true,
    kids: true,
  },
  {
    id: 'burger-casa',
    category: 'hamburguesas',
    name: 'Burger de la Casa',
    price: '10€',
    priceNote: 'hecha al momento',
    tagline: 'Vacuno, bacon y huevo frito con la yema líquida. La que lleva nuestro nombre.',
    ingredients: [
      'Pan brioche',
      'Carne de vacuno',
      'Bacon',
      'Huevo frito',
      'Lechuga',
      'Tomate',
      'Cebolla confitada',
    ],
    protagonist: {
      name: 'El bacon',
      text: 'A la plancha hasta el punto exacto: dorado, crujiente y con el humo justo.',
    },
    pairing: 'Combina perfecto con una malteada de vainilla.',
    badges: ['La más pedida', 'Hecha al momento'],
    meters: [
      { label: 'Popularidad', value: 5 },
      { label: 'Contundencia', value: 5 },
      { label: 'Queso', value: 3 },
      { label: 'Picante', value: 1 },
    ],
    hearty: true,
    meat: true,
  },
  {
    id: 'burger-sepia',
    category: 'hamburguesas',
    name: 'Burger de Sepia',
    price: '12€',
    priceNote: 'hecha al momento',
    tagline: 'La rebelde de la carta: sepia a la plancha, tomate confitado y pimientos.',
    ingredients: ['Sepia a la plancha', 'Tomate confitado', 'Pimiento V/R', 'Queso', 'Mayonesa'],
    protagonist: {
      name: 'La sepia',
      text: 'A la plancha con fuego fuerte, tierna por dentro y marcada por fuera. Del puerto a la barra.',
    },
    pairing: 'Con un batido de mango, viaje de ida y vuelta.',
    badges: ['La sorpresa del mar', 'Hecha al momento'],
    meters: [
      { label: 'Popularidad', value: 4 },
      { label: 'Sabor a mar', value: 5 },
      { label: 'Queso', value: 3 },
      { label: 'Picante', value: 2 },
    ],
    hearty: true,
    meat: false,
  },

  // ——— BOCATAS ———
  {
    id: 'bocata-pollo',
    category: 'bocatas',
    name: 'Bocata de Pollo',
    price: '7€',
    priceNote: 'pan artesanal',
    tagline: 'Pollo jugoso y queso fundido dentro de un pan que cruje al primer bocado.',
    ingredients: ['Pollo', 'Queso fundido', 'Lechuga', 'Tomate', 'Cebolla confitada'],
    protagonist: {
      name: 'El pan',
      text: 'Artesanal, del día. Si no cruje, no sale de la cocina.',
    },
    pairing: 'De media mañana, con un batido de fresa.',
    badges: ['Pan artesanal', 'Hecho al momento'],
    meters: [
      { label: 'Popularidad', value: 3 },
      { label: 'Contundencia', value: 3 },
      { label: 'Queso', value: 4 },
    ],
    hearty: true,
    meat: true,
    kids: true,
  },
  {
    id: 'bocata-lomo',
    category: 'bocatas',
    name: 'Bocata de Lomo',
    price: '8€',
    priceNote: 'pan artesanal',
    tagline: 'Lomo de cerdo con pimiento rojo asado y queso fundido. Un clásico que no falla.',
    ingredients: ['Lomo de cerdo', 'Pimiento rojo asado', 'Queso fundido', 'Pan crujiente'],
    protagonist: {
      name: 'El pimiento asado',
      text: 'Asado entero y pelado a mano. Dulce, ahumado, imprescindible.',
    },
    pairing: 'Con unas patatas bravas para la mesa.',
    badges: ['Pan artesanal', 'Hecho al momento'],
    meters: [
      { label: 'Popularidad', value: 4 },
      { label: 'Contundencia', value: 4 },
      { label: 'Queso', value: 4 },
    ],
    hearty: true,
    meat: true,
  },
  {
    id: 'bocata-ternera',
    category: 'bocatas',
    name: 'Bocata de Ternera',
    price: '9€',
    priceNote: 'pan rústico crujiente',
    tagline: 'Ternera a la plancha en pan rústico. El bocata serio de la casa.',
    ingredients: ['Ternera', 'Lechuga', 'Tomate', 'Cebolla', 'Pan rústico crujiente'],
    protagonist: {
      name: 'La ternera',
      text: 'Cortada fina y hecha en plancha bien caliente, para sellarla sin secarla.',
    },
    pairing: 'Combina perfecto con una malteada de chocolate.',
    badges: ['El más pedido', 'Pan artesanal'],
    meters: [
      { label: 'Popularidad', value: 5 },
      { label: 'Contundencia', value: 5 },
      { label: 'Queso', value: 1 },
    ],
    hearty: true,
    meat: true,
  },

  // ——— BATIDOS ———
  {
    id: 'batido-mango',
    category: 'batidos',
    name: 'Batido de Mango',
    price: '6€',
    priceNote: 'sin azúcares añadidos',
    tagline: 'Mango natural, frío y cremoso. Verano en vaso, todo el año.',
    ingredients: ['Mango natural', 'Frío', 'Cremoso', 'Sin azúcares añadidos'],
    protagonist: {
      name: 'El mango',
      text: 'Fruta de verdad, madura en su punto. Nada de sabores: fruta.',
    },
    pairing: 'El compañero fresco de la Burger de Sepia.',
    badges: ['Sin azúcares añadidos', 'Fruta natural'],
    meters: [
      { label: 'Frescura', value: 5 },
      { label: 'Fruta', value: 5 },
      { label: 'Cremosidad', value: 3 },
    ],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'batido-fresa',
    category: 'batidos',
    name: 'Batido de Fresa',
    price: '6€',
    priceNote: 'de la fruta a tu vaso',
    tagline: 'Fresa natural, frío e intenso. De la fruta a tu vaso, sin escalas.',
    ingredients: ['Fresa natural', 'Frío', 'Intenso', 'De la fruta a tu vaso'],
    protagonist: {
      name: 'La fresa',
      text: 'Batida entera en el momento. El color rojo lo pone ella sola.',
    },
    pairing: 'A los peques con nuggets les cambia la cara.',
    badges: ['Sin azúcares añadidos', 'Fruta natural'],
    meters: [
      { label: 'Frescura', value: 5 },
      { label: 'Fruta', value: 5 },
      { label: 'Cremosidad', value: 3 },
    ],
    hearty: false,
    meat: false,
    kids: true,
  },

  // ——— MALTEADAS ———
  {
    id: 'malteada-vainilla',
    category: 'malteadas',
    name: 'Malteada de Vainilla',
    price: '8€',
    priceNote: 'con bola de helado',
    tagline: 'Helado de vainilla y leche, batidos despacio. Cremosa de cuchara y pajita.',
    ingredients: ['Helado de vainilla', 'Leche', 'Cremosa'],
    protagonist: {
      name: 'La bola de helado',
      text: 'Entera dentro del vaso. Por eso la última parte se come, no se bebe.',
    },
    pairing: 'El dúo clásico con la Burger de la Casa.',
    badges: ['Con bola de helado'],
    meters: [
      { label: 'Cremosidad', value: 5 },
      { label: 'Dulzura', value: 4 },
      { label: 'Frescura', value: 4 },
    ],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'malteada-fresa',
    category: 'malteadas',
    name: 'Malteada de Fresa',
    price: '8€',
    priceNote: 'con bola de helado',
    tagline: 'Helado de fresa y leche. Intensa, rosa y peligrosamente fácil de terminar.',
    ingredients: ['Helado de fresa', 'Leche', 'Intensa'],
    protagonist: {
      name: 'El helado de fresa',
      text: 'Intenso de fruta, no de colorante. Se nota en la primera pajita.',
    },
    pairing: 'De postre después de unos nachos, cierra el círculo.',
    badges: ['Con bola de helado'],
    meters: [
      { label: 'Cremosidad', value: 5 },
      { label: 'Dulzura', value: 4 },
      { label: 'Fruta', value: 4 },
    ],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'malteada-chocolate',
    category: 'malteadas',
    name: 'Malteada de Chocolate',
    price: '8€',
    priceNote: 'con bola de helado',
    tagline: 'Helado de chocolate y leche. Profunda, oscura y sin remordimientos.',
    ingredients: ['Helado de chocolate', 'Leche', 'Profunda'],
    protagonist: {
      name: 'El chocolate',
      text: 'Del oscuro. Profundo como la madera de la barra.',
    },
    pairing: 'Combina perfecto con el Bocata de Ternera. Palabra.',
    badges: ['Con bola de helado'],
    meters: [
      { label: 'Cremosidad', value: 5 },
      { label: 'Dulzura', value: 5 },
      { label: 'Intensidad', value: 5 },
    ],
    hearty: false,
    meat: false,
    kids: true,
  },
]

export const productsByCategory = (id: CategoryId): Product[] =>
  PRODUCTS.filter((p) => p.category === id)

export const findProduct = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id)

/** Primer importe de un precio ('8,50€' → 8.5; '6 uds 5€ · 12 uds 10€' → 5). */
function firstAmount(price: string): number {
  const m = price.match(/\d+(?:,\d+)?/)
  return m ? parseFloat(m[0].replace(',', '.')) : 0
}

/** Resumen para el índice: nº de platos y precio "desde" de la categoría. */
export function categorySummary(id: CategoryId): { count: number; from: string } {
  const items = productsByCategory(id)
  const min = Math.min(...items.map((p) => firstAmount(p.price)))
  return { count: items.length, from: `${min.toLocaleString('es-ES')}€` }
}

/** Franja horaria → sugerencia contextual de la casa. */
export function timeSuggestion(hour: number): {
  categoryId: CategoryId
  message: string
} {
  if (hour >= 6 && hour < 12)
    return { categoryId: 'bocatas', message: 'Media mañana: hora de un bocata recién hecho' }
  if (hour >= 12 && hour < 16)
    return { categoryId: 'hamburguesas', message: 'Mediodía: las hamburguesas están saliendo de la plancha' }
  if (hour >= 16 && hour < 20)
    return { categoryId: 'batidos', message: 'Tarde: un batido frío y la merienda está hecha' }
  return { categoryId: 'compartir', message: 'Noche: algo para el centro de la mesa' }
}
