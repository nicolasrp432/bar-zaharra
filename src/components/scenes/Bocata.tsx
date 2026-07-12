import { motion } from 'framer-motion'
import { stack, layer } from './anim'

type Variant = 'bocata-pollo' | 'bocata-lomo' | 'bocata-ternera'

const FILLINGS: Record<Variant, { meat: string; meatHi: string; extra: string; extraHi: string }> = {
  'bocata-pollo': { meat: '#d99a4e', meatHi: '#eab86f', extra: '#f5b73d', extraHi: '#8fc06a' },
  'bocata-lomo': { meat: '#b56a4a', meatHi: '#cf8a63', extra: '#c94434', extraHi: '#f5b73d' },
  'bocata-ternera': { meat: '#7a4a2c', meatHi: '#95603a', extra: '#8fc06a', extraHi: '#d24435' },
}

/** Bocata en pan artesanal, visto de lado, montado capa a capa. */
export default function Bocata({ variant }: { variant: Variant }) {
  const f = FILLINGS[variant]
  return (
    <motion.svg
      variants={stack}
      viewBox="0 0 400 320"
      className="h-full w-full"
      role="img"
      aria-label="Ilustración del bocata"
    >
      <defs>
        <linearGradient id="bread" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2ab5c" />
          <stop offset="100%" stopColor="#b67c33" />
        </linearGradient>
        <linearGradient id="crumb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6e3bd" />
          <stop offset="100%" stopColor="#e9cf9e" />
        </linearGradient>
      </defs>

      <motion.ellipse variants={layer} cx="200" cy="284" rx="150" ry="14" fill="#000" opacity="0.4" />

      {/* pan de abajo (miga a la vista) */}
      <motion.g variants={layer}>
        <path d="M52 248 q148 34 296 0 l-8 18 q-140 28 -280 0 Z" fill="url(#bread)" />
        <path d="M52 248 q148 34 296 0 q-148 26 -296 0 Z" fill="url(#crumb)" />
      </motion.g>

      {/* relleno principal (carne) */}
      <motion.g variants={layer}>
        <path
          d="M60 240 q30 -18 60 -6 q28 -16 58 -4 q30 -14 60 -3 q30 -12 58 0 q26 -8 44 6 q6 8 -4 12 q-140 26 -272 2 q-10 -3 -4 -7 Z"
          fill={f.meat}
        />
        <path d="M84 236 q22 -10 44 -2 M150 230 q24 -10 48 -2 M222 228 q24 -8 46 0" stroke={f.meatHi} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
      </motion.g>

      {/* extras: queso fundido / pimiento / lechuga+tomate */}
      <motion.g variants={layer}>
        <path
          d="M70 232 q34 -12 66 -4 q-4 16 -12 16 q-6 0 -8 -10 q-24 -4 -46 2 Z M160 224 q34 -10 66 -3 q-2 14 -10 15 q-7 1 -9 -9 q-24 -5 -47 1 Z M252 222 q32 -8 62 0 q0 13 -9 14 q-7 0 -9 -9 q-22 -5 -44 -1 Z"
          fill={f.extra}
          opacity="0.95"
        />
        <path d="M100 222 q26 -10 52 -4 M200 216 q26 -8 52 -2" stroke={f.extraHi} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
      </motion.g>

      {/* pan de arriba con cortes */}
      <motion.g variants={layer}>
        <path d="M50 232 q6 -58 150 -58 t150 56 q0 12 -14 14 q-136 22 -272 0 q-14 -2 -14 -12 Z" fill="url(#bread)" />
        <path d="M120 190 q-10 14 -4 28 M190 182 q-8 16 -2 30 M258 188 q-8 14 -2 28" stroke="#8a5a20" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M96 204 q40 -22 104 -24" stroke="#f2cd8b" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.45" />
      </motion.g>
    </motion.svg>
  )
}
