/**
 * La carta de Bar Zaharra, transcrita de la carta física real.
 * Los platos de la casa (burgers, nachos, bocatas, batidos, malteadas)
 * llevan su capa de storytelling opcional: tagline, protagonista, medidores
 * y maridaje. El resto se muestra como entrada de carta: nombre, ingredientes
 * y precio.
 */
import type { AllergenId } from './allergens'

export type CategoryId =
  | 'ensaladas'
  | 'entrantes'
  | 'compartir'
  | 'raciones'
  | 'carnes'
  | 'hamburguesas'
  | 'bocatas'
  | 'batidos'
  | 'malteadas'
  | 'postres'

export type Theme = 'ember' | 'brass' | 'rustic' | 'fresh' | 'cream' | 'garden'

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
  ingredients: string[]
  badges: string[]
  allergens?: AllergenId[]
  /** storytelling opcional (solo en los platos de la casa) */
  tagline?: string
  protagonist?: { name: string; text: string }
  pairing?: string
  meters?: Meter[]
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
  theme: Theme
}

export const CATEGORIES: Category[] = [
  {
    id: 'ensaladas',
    name: 'Ensaladas',
    chapter: 'Capítulo I',
    lead: 'Para empezar en verde',
    sub: 'Frescas, de cuchillo y tenedor.',
    theme: 'garden',
  },
  {
    id: 'entrantes',
    name: 'Entrantes',
    chapter: 'Capítulo II',
    lead: 'Lo primero que llega a la mesa',
    sub: 'A la plancha, para abrir boca.',
    theme: 'brass',
  },
  {
    id: 'compartir',
    name: 'Para compartir',
    chapter: 'Capítulo III',
    lead: 'Al centro de la mesa',
    sub: 'Y que se lo pelee la cuadrilla.',
    theme: 'rustic',
  },
  {
    id: 'raciones',
    name: 'Raciones',
    chapter: 'Capítulo IV',
    lead: 'De picar. O de no soltar.',
    sub: 'Cercanas, calientes, de mojar.',
    theme: 'fresh',
  },
  {
    id: 'carnes',
    name: 'Carnes',
    chapter: 'Capítulo V',
    lead: 'A la plancha, al punto',
    sub: 'Para cuando el hambre es en serio.',
    theme: 'ember',
  },
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    chapter: 'Capítulo VI',
    lead: 'Fuego, plancha y pan',
    sub: 'Hechas al momento. Como debe ser.',
    theme: 'ember',
  },
  {
    id: 'bocatas',
    name: 'Bocatas',
    chapter: 'Capítulo VII',
    lead: 'Pan crujiente, manos llenas',
    sub: 'Todos los panes son artesanales.',
    theme: 'rustic',
  },
  {
    id: 'batidos',
    name: 'Batidos',
    chapter: 'Capítulo VIII',
    lead: 'De la fruta a tu vaso',
    sub: 'Fríos, frescos, naturales.',
    theme: 'fresh',
  },
  {
    id: 'malteadas',
    name: 'Malteadas',
    chapter: 'Capítulo IX',
    lead: 'Con bola de helado',
    sub: 'Lentas, densas, cremosas. Sin prisa.',
    theme: 'cream',
  },
  {
    id: 'postres',
    name: 'Postres',
    chapter: 'Capítulo X',
    lead: 'El final feliz',
    sub: 'Siempre queda un hueco para esto.',
    theme: 'cream',
  },
]

export const PRODUCTS: Product[] = [
  // ——— ENSALADAS ———
  {
    id: 'ensalada-mixta',
    category: 'ensaladas',
    name: 'Ensalada Mixta',
    price: '8,50€',
    priceNote: '',
    ingredients: [],
    badges: [],
    allergens: ['pescado', 'huevos', 'sulfitos'],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'ensalada-tomate',
    category: 'ensaladas',
    name: 'Ensalada de Tomate con Bonito',
    price: '11€',
    priceNote: 'con cebolleta',
    ingredients: ['Tomate', 'Bonito', 'Cebolleta'],
    badges: [],
    allergens: ['pescado', 'sulfitos'],
    hearty: false,
    meat: false,
  },

  // ——— ENTRANTES ———
  {
    id: 'alcachofa-jamon',
    category: 'entrantes',
    name: 'Alcachofa a la Plancha con Jamón',
    price: '13€',
    priceNote: 'crema de boletus',
    ingredients: ['Alcachofa a la plancha', 'Crema de boletus', 'Jamón'],
    badges: [],
    allergens: ['lacteos'],
    hearty: false,
    meat: true,
    share: true,
  },
  {
    id: 'alcachofa',
    category: 'entrantes',
    name: 'Alcachofa a la Plancha',
    price: '12€',
    priceNote: 'crema de boletus · sin jamón',
    ingredients: ['Alcachofa a la plancha', 'Crema de boletus'],
    badges: [],
    allergens: ['lacteos'],
    hearty: false,
    meat: false,
    share: true,
  },
  {
    id: 'croquetas-iberico',
    category: 'entrantes',
    name: 'Croquetas de Jamón Ibérico',
    price: '7€',
    priceNote: '8 uds.',
    ingredients: ['Jamón ibérico', 'Bechamel', 'Rebozado crujiente'],
    badges: [],
    allergens: ['gluten', 'lacteos', 'huevos'],
    hearty: false,
    meat: true,
    kids: true,
    share: true,
  },
  {
    id: 'txipirones',
    category: 'entrantes',
    name: 'Txipirones a la Plancha',
    price: '16,50€',
    priceNote: 'cebolla caramelizada · salsa especial',
    ingredients: ['Txipirones a la plancha', 'Cebolla caramelizada', 'Salsa especial'],
    badges: [],
    allergens: ['moluscos', 'sulfitos', 'huevos'],
    hearty: true,
    meat: false,
    share: true,
  },
  {
    id: 'pulpo',
    category: 'entrantes',
    name: 'Pulpo a la Plancha',
    price: '22€',
    priceNote: 'con parmentier',
    ingredients: ['Pulpo a la plancha', 'Parmentier'],
    badges: [],
    allergens: ['moluscos', 'lacteos'],
    hearty: true,
    meat: false,
    share: true,
  },

  // ——— PARA COMPARTIR ———
  {
    id: 'nachos-cargados',
    category: 'compartir',
    name: 'Nachos Cargados con Pollo',
    price: '13€',
    priceNote: 'para 2 personas',
    ingredients: [
      'Pollo a la plancha',
      'Chips',
      'Salsa de queso',
      'Jalapeños',
      'Guacamole',
      'Crema agria',
      'Pico de gallo',
    ],
    tagline: 'La montaña que se pide para compartir y se defiende con el tenedor.',
    protagonist: {
      name: 'El pollo a la plancha',
      text: 'Marcado en la plancha y repartido por toda la montaña, para que ningún chip se quede solo.',
    },
    pairing: 'Combinan perfecto con un batido de mango bien frío.',
    badges: ['Para compartir'],
    allergens: ['lacteos', 'sulfitos'],
    meters: [
      { label: 'Queso', value: 5 },
      { label: 'Picante', value: 3 },
      { label: 'De compartir', value: 5 },
    ],
    hearty: true,
    meat: true,
    share: true,
  },

  // ——— RACIONES ———
  {
    id: 'patatas',
    category: 'raciones',
    name: 'Patatas Fritas',
    price: '5€',
    priceNote: 'con salsa brava o alioli',
    ingredients: ['Patatas fritas', 'Salsa brava', 'Alioli'],
    tagline: 'Doradas por fuera, tiernas por dentro. Con brava, la cosa se pone seria.',
    protagonist: {
      name: 'La patata',
      text: 'Frita dos veces: la primera para el corazón tierno, la segunda para el crujido.',
    },
    pairing: 'El escudero oficial de cualquier hamburguesa de la casa.',
    badges: [],
    allergens: ['huevos', 'sulfitos'],
    meters: [
      { label: 'Crujiente', value: 4 },
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
    priceNote: 'salsa a elegir',
    ingredients: ['Pollo jugoso', 'Rebozado crujiente', 'Ketchup', 'Alioli', 'Búffalo'],
    tagline: 'Rebozado crujiente y tres salsas donde mojar. Elegir solo una es el reto.',
    protagonist: {
      name: 'El rebozado',
      text: 'Crujiente de verdad: se oye desde la otra punta de la barra.',
    },
    pairing: 'Con la salsa búffalo y un batido de fresa, combo ganador.',
    badges: ['Favorito de los peques'],
    allergens: ['gluten', 'huevos', 'mostaza', 'sulfitos'],
    meters: [
      { label: 'Crujiente', value: 5 },
      { label: 'De compartir', value: 4 },
    ],
    hearty: false,
    meat: true,
    kids: true,
    share: true,
  },
  {
    id: 'alitas-pollo',
    category: 'raciones',
    name: 'Alitas de Pollo',
    price: '7€',
    priceNote: '',
    ingredients: ['Alitas de pollo', 'Salsa de la casa'],
    badges: [],
    allergens: ['soja', 'gluten', 'sulfitos'],
    hearty: false,
    meat: true,
    kids: true,
    share: true,
  },
  {
    id: 'croquetas',
    category: 'raciones',
    name: 'Croquetas',
    price: '7€',
    priceNote: 'caseras',
    ingredients: [],
    badges: [],
    allergens: ['gluten', 'lacteos', 'huevos'],
    hearty: false,
    meat: true,
    kids: true,
    share: true,
  },

  // ——— CARNES ———
  {
    id: 'entrecot',
    category: 'carnes',
    name: 'Entrecot',
    price: '19,50€',
    priceNote: '',
    ingredients: ['Entrecot', 'Patatas fritas', 'Pimiento asado'],
    badges: [],
    allergens: [],
    hearty: true,
    meat: true,
  },
  {
    id: 'solomillo',
    category: 'carnes',
    name: 'Solomillo a la Plancha',
    price: '21€',
    priceNote: '',
    ingredients: ['Solomillo a la plancha', 'Patatas fritas', 'Pimiento asado'],
    badges: [],
    allergens: [],
    hearty: true,
    meat: true,
  },
  {
    id: 'chuleta',
    category: 'carnes',
    name: 'Chuleta de 1,2 kg',
    price: '60€',
    priceNote: 'aprox. para 2 personas',
    ingredients: ['Chuleta 1,2 kg', 'Pimientos', 'Patatas fritas', 'Pan', 'Agua y vino crianza'],
    badges: ['Para compartir'],
    allergens: ['gluten', 'sulfitos'],
    hearty: true,
    meat: true,
    share: true,
  },

  // ——— HAMBURGUESAS ———
  {
    id: 'burger-pollo',
    category: 'hamburguesas',
    name: 'Burger de Pollo',
    price: '8€',
    priceNote: 'hecha al momento',
    ingredients: [
      'Pollo crujiente',
      'Queso fundido',
      'Lechuga',
      'Tomate',
      'Cebolla caramelizada',
      'Mayonesa',
    ],
    tagline: 'Pollo crujiente, queso fundido y cebolla caramelizada. La ligera de la familia.',
    protagonist: {
      name: 'La cebolla caramelizada',
      text: 'Horas a fuego lento hasta volverse dulce. Es la que le da el toque Zaharra.',
    },
    pairing: 'Combina perfecto con un batido de mango.',
    badges: [],
    allergens: ['gluten', 'lacteos', 'huevos', 'sesamo'],
    meters: [
      { label: 'Popularidad', value: 4 },
      { label: 'Contundencia', value: 3 },
      { label: 'Queso', value: 4 },
    ],
    hearty: true,
    meat: true,
    kids: true,
  },
  {
    id: 'burger-casa',
    category: 'hamburguesas',
    name: 'Burger de la Casa',
    price: '12€',
    priceNote: 'hecha al momento',
    ingredients: [
      'Carne de vacuno',
      'Bacon',
      'Huevo frito',
      'Lechuga',
      'Tomate',
      'Cebolla caramelizada',
      'Mayonesa',
    ],
    tagline: 'Vacuno, bacon y huevo frito con la yema líquida. La que lleva nuestro nombre.',
    protagonist: {
      name: 'El bacon',
      text: 'A la plancha hasta el punto exacto: dorado, crujiente y con el humo justo.',
    },
    pairing: 'Combina perfecto con una malteada de vainilla.',
    badges: ['La más pedida'],
    allergens: ['gluten', 'huevos', 'sesamo', 'sulfitos'],
    meters: [
      { label: 'Popularidad', value: 5 },
      { label: 'Contundencia', value: 5 },
      { label: 'Queso', value: 3 },
    ],
    hearty: true,
    meat: true,
  },
  {
    id: 'burger-sepia',
    category: 'hamburguesas',
    name: 'Burger de Sepia',
    price: '14€',
    priceNote: 'hecha al momento',
    ingredients: [
      'Sepia a la plancha',
      'Tomate',
      'Cebolla caramelizada',
      'Pimiento verde y rojo',
      'Queso',
      'Mayonesa',
    ],
    tagline: 'La rebelde de la carta: sepia a la plancha, tomate y pimientos.',
    protagonist: {
      name: 'La sepia',
      text: 'A la plancha con fuego fuerte, tierna por dentro y marcada por fuera. Del puerto a la barra.',
    },
    pairing: 'Con un batido de mango, viaje de ida y vuelta.',
    badges: ['La sorpresa del mar'],
    allergens: ['gluten', 'moluscos', 'lacteos', 'huevos', 'sesamo'],
    meters: [
      { label: 'Popularidad', value: 4 },
      { label: 'Sabor a mar', value: 5 },
      { label: 'Queso', value: 3 },
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
    ingredients: [
      'Pollo',
      'Queso fundido',
      'Lechuga',
      'Tomate',
      'Cebolla confitada',
      'Mayonesa',
      'Salsa de la casa',
    ],
    tagline: 'Pollo jugoso y queso fundido dentro de un pan que cruje al primer bocado.',
    protagonist: {
      name: 'El pan',
      text: 'Artesanal, del día. Si no cruje, no sale de la cocina.',
    },
    pairing: 'De media mañana, con un batido de fresa.',
    badges: [],
    allergens: ['gluten', 'lacteos', 'huevos'],
    meters: [
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
    ingredients: ['Lomo de cerdo', 'Pimiento rojo asado', 'Queso fundido'],
    tagline: 'Lomo de cerdo con pimiento rojo asado y queso fundido. Un clásico que no falla.',
    protagonist: {
      name: 'El pimiento asado',
      text: 'Asado entero y pelado a mano. Dulce, ahumado, imprescindible.',
    },
    pairing: 'Con unas patatas para la mesa.',
    badges: [],
    allergens: ['gluten', 'lacteos'],
    meters: [
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
    priceNote: 'pan rústico',
    ingredients: ['Ternera', 'Lechuga', 'Tomate', 'Cebolla', 'Mayonesa', 'Salsa de la casa'],
    tagline: 'Ternera a la plancha en pan rústico. El bocata serio de la casa.',
    protagonist: {
      name: 'La ternera',
      text: 'Cortada fina y hecha en plancha bien caliente, para sellarla sin secarla.',
    },
    pairing: 'Combina perfecto con una malteada de chocolate.',
    badges: ['El más pedido'],
    allergens: ['gluten', 'huevos', 'mostaza'],
    meters: [
      { label: 'Popularidad', value: 5 },
      { label: 'Contundencia', value: 5 },
    ],
    hearty: true,
    meat: true,
  },

  // ——— BATIDOS ———
  {
    id: 'batido-mango',
    category: 'batidos',
    name: 'Batido de Mango',
    price: '5€',
    priceNote: 'fruta natural',
    ingredients: ['Mango natural', 'Frío', 'Cremoso'],
    tagline: 'Mango natural, frío y cremoso. Verano en vaso, todo el año.',
    protagonist: {
      name: 'El mango',
      text: 'Fruta de verdad, madura en su punto. Nada de sabores: fruta.',
    },
    pairing: 'El compañero fresco de la Burger de Sepia.',
    badges: ['Fruta natural'],
    allergens: [],
    meters: [
      { label: 'Frescura', value: 5 },
      { label: 'Fruta', value: 5 },
    ],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'batido-fresa',
    category: 'batidos',
    name: 'Batido de Fresa',
    price: '5€',
    priceNote: 'de la fruta a tu vaso',
    ingredients: ['Fresa natural', 'Frío', 'Intenso'],
    tagline: 'Fresa natural, frío e intenso. De la fruta a tu vaso, sin escalas.',
    protagonist: {
      name: 'La fresa',
      text: 'Batida entera en el momento. El color rojo lo pone ella sola.',
    },
    pairing: 'A los peques con nuggets les cambia la cara.',
    badges: ['Fruta natural'],
    allergens: [],
    meters: [
      { label: 'Frescura', value: 5 },
      { label: 'Fruta', value: 5 },
    ],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'batido-maracuya',
    category: 'batidos',
    name: 'Batido de Maracuyá',
    price: '5€',
    priceNote: 'fruta natural',
    ingredients: ['Maracuyá natural', 'Frío', 'Intenso'],
    badges: ['Fruta natural'],
    allergens: [],
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
    ingredients: ['Helado de vainilla', 'Leche', 'Cremosa'],
    tagline: 'Helado de vainilla y leche, batidos despacio. Cremosa de cuchara y pajita.',
    protagonist: {
      name: 'La bola de helado',
      text: 'Entera dentro del vaso. Por eso la última parte se come, no se bebe.',
    },
    pairing: 'El dúo clásico con la Burger de la Casa.',
    badges: ['Con bola de helado'],
    allergens: ['lacteos'],
    meters: [
      { label: 'Cremosidad', value: 5 },
      { label: 'Dulzura', value: 4 },
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
    ingredients: ['Helado de fresa', 'Leche', 'Intensa'],
    tagline: 'Helado de fresa y leche. Intensa, rosa y peligrosamente fácil de terminar.',
    protagonist: {
      name: 'El helado de fresa',
      text: 'Intenso de fruta, no de colorante. Se nota en la primera pajita.',
    },
    pairing: 'De postre después de unos nachos, cierra el círculo.',
    badges: ['Con bola de helado'],
    allergens: ['lacteos'],
    meters: [
      { label: 'Cremosidad', value: 5 },
      { label: 'Dulzura', value: 4 },
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
    ingredients: ['Helado de chocolate', 'Leche', 'Profunda'],
    tagline: 'Helado de chocolate y leche. Profunda, oscura y sin remordimientos.',
    protagonist: {
      name: 'El chocolate',
      text: 'Del oscuro. Profundo como la madera de la barra.',
    },
    pairing: 'Combina perfecto con el Bocata de Ternera. Palabra.',
    badges: ['Con bola de helado'],
    allergens: ['lacteos', 'soja'],
    meters: [
      { label: 'Cremosidad', value: 5 },
      { label: 'Intensidad', value: 5 },
    ],
    hearty: false,
    meat: false,
    kids: true,
  },

  // ——— POSTRES ———
  {
    id: 'mousse-limon',
    category: 'postres',
    name: 'Mousse de Limón',
    price: '5€',
    priceNote: '',
    ingredients: [],
    badges: [],
    allergens: ['lacteos', 'huevos'],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'torrija',
    category: 'postres',
    name: 'Torrija',
    price: '6€',
    priceNote: '',
    ingredients: [],
    badges: [],
    allergens: ['gluten', 'lacteos', 'huevos'],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'tarta-queso',
    category: 'postres',
    name: 'Tarta de Queso',
    price: '6€',
    priceNote: '',
    ingredients: [],
    badges: [],
    allergens: ['gluten', 'lacteos', 'huevos'],
    hearty: false,
    meat: false,
    kids: true,
  },
  {
    id: 'copa-helado',
    category: 'postres',
    name: 'Copa de Helado',
    price: '5€',
    priceNote: '',
    ingredients: [],
    badges: [],
    allergens: ['lacteos'],
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
