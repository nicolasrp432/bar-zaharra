export type AllergenId =
  | 'gluten'
  | 'crustaceos'
  | 'huevos'
  | 'pescado'
  | 'cacahuetes'
  | 'soja'
  | 'lacteos'
  | 'frutos_secos'
  | 'apio'
  | 'mostaza'
  | 'sesamo'
  | 'sulfitos'
  | 'altramuces'
  | 'moluscos'

export interface Allergen {
  id: AllergenId
  name: string
  shortName: string
  description: string
}

export const ALLERGENS: Record<AllergenId, Allergen> = {
  gluten: {
    id: 'gluten',
    name: 'Gluten (Cereales)',
    shortName: 'Gluten',
    description: 'Trigo, centeno, cebada, avena o sus variedades híbridas.',
  },
  crustaceos: {
    id: 'crustaceos',
    name: 'Crustáceos',
    shortName: 'Crustáceos',
    description: 'Cangrejos, langostas, gambas, langostinos, carabineros, etc.',
  },
  huevos: {
    id: 'huevos',
    name: 'Huevos',
    shortName: 'Huevos',
    description: 'Huevos y productos a base de huevo.',
  },
  pescado: {
    id: 'pescado',
    name: 'Pescado',
    shortName: 'Pescado',
    description: 'Pescado y productos a base de pescado.',
  },
  cacahuetes: {
    id: 'cacahuetes',
    name: 'Cacahuetes',
    shortName: 'Cacahuetes',
    description: 'Cacahuetes y productos a base de cacahuetes.',
  },
  soja: {
    id: 'soja',
    name: 'Soja',
    shortName: 'Soja',
    description: 'Soja y productos a base de soja.',
  },
  lacteos: {
    id: 'lacteos',
    name: 'Lácteos / Leche',
    shortName: 'Lácteos',
    description: 'Leche y sus derivados (incluida la lactosa).',
  },
  frutos_secos: {
    id: 'frutos_secos',
    name: 'Frutos de Cáscara',
    shortName: 'Frutos Secos',
    description: 'Almendras, avellanas, nueces, anacardos, pistachos, etc.',
  },
  apio: {
    id: 'apio',
    name: 'Apio',
    shortName: 'Apio',
    description: 'Apio y productos derivados.',
  },
  mostaza: {
    id: 'mostaza',
    name: 'Mostaza',
    shortName: 'Mostaza',
    description: 'Mostaza y productos derivados.',
  },
  sesamo: {
    id: 'sesamo',
    name: 'Granos de Sésamo',
    shortName: 'Sésamo',
    description: 'Granos de sésamo y productos derivados.',
  },
  sulfitos: {
    id: 'sulfitos',
    name: 'Dióxido de Azufre y Sulfitos',
    shortName: 'Sulfitos',
    description: 'En concentraciones superiores a 10 mg/kg o 10 mg/litro.',
  },
  altramuces: {
    id: 'altramuces',
    name: 'Altramuces',
    shortName: 'Altramuces',
    description: 'Altramuces y productos a base de altramuces.',
  },
  moluscos: {
    id: 'moluscos',
    name: 'Moluscos',
    shortName: 'Moluscos',
    description: 'Mejillones, almejas, calamares, pulpo, caracoles, etc.',
  },
}
