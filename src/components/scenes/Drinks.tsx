import { motion } from 'framer-motion'
import { stack, layer, rise } from './anim'

const SHAKE_COLORS = {
  mango: { body: '#ffb347', light: '#ffd28a', fruit: '#ff9a1f' },
  fresa: { body: '#ff6b8a', light: '#ffa3b8', fruit: '#e0304f' },
} as const

/** Batido de fruta: vaso alto, pajita y fruta en el borde. */
export function Shake({ flavor }: { flavor: keyof typeof SHAKE_COLORS }) {
  const c = SHAKE_COLORS[flavor]
  return (
    <motion.svg variants={stack} viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label="Ilustración del batido">
      <motion.ellipse variants={layer} cx="200" cy="296" rx="86" ry="11" fill="#000" opacity="0.25" />

      {/* vaso con líquido */}
      <motion.g variants={rise}>
        <path d="M150 84 h100 l-10 208 h-80 Z" fill="#ffffff" opacity="0.35" />
        <path d="M156 110 h88 l-9 176 h-70 Z" fill={c.body} />
        <path d="M156 110 h88 l-2 34 q-42 14 -84 0 Z" fill={c.light} />
        <path d="M158 96 l8 190 M244 96 l-8 190" stroke="#fff" strokeWidth="4" opacity="0.4" />
        {/* burbujas frescas */}
        {[[176, 180], [212, 210], [194, 246], [222, 160]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#fff" opacity="0.35" />
        ))}
      </motion.g>

      {/* pajita de rayas */}
      <motion.g variants={layer}>
        <path d="M216 26 l24 4 l-22 92 l-16 -2 Z" fill="#f3ead4" />
        <path d="M219 40 l19 3 M216 58 l18 3 M213 76 l18 3 M210 94 l17 3" stroke="#d24435" strokeWidth="5" opacity="0.85" />
      </motion.g>

      {/* fruta en el borde + hojita */}
      <motion.g variants={layer}>
        {flavor === 'fresa' ? (
          <g>
            <path d="M148 96 q-20 4 -18 24 q2 18 20 12 q16 -6 12 -24 q-3 -14 -14 -12 Z" fill={c.fruit} />
            {[[142, 112], [150, 120], [146, 104]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.8" fill="#ffe08a" />
            ))}
            <path d="M146 94 q6 -8 14 -6 q-4 8 -14 6 Z" fill="#5f8f3e" />
          </g>
        ) : (
          <g>
            <rect x="126" y="92" width="24" height="24" rx="6" fill={c.fruit} transform="rotate(-14 138 104)" />
            <rect x="134" y="112" width="20" height="20" rx="5" fill={c.light} transform="rotate(10 144 122)" />
          </g>
        )}
      </motion.g>
    </motion.svg>
  )
}

const MALT_COLORS = {
  vainilla: { body: '#f2e3bd', light: '#faf1da', top: '#fffdf6' },
  fresa: { body: '#f7a8bd', light: '#fbc9d6', top: '#fff4f7' },
  chocolate: { body: '#5a3a26', light: '#7a5136', top: '#f7ecd9' },
} as const

/** Malteada: copa curvada, nata montada en espiral, guinda y goteo lento. */
export function Malteada({ flavor }: { flavor: keyof typeof MALT_COLORS }) {
  const c = MALT_COLORS[flavor]
  return (
    <motion.svg variants={stack} viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label="Ilustración de la malteada">
      <motion.ellipse variants={layer} cx="200" cy="298" rx="80" ry="10" fill="#000" opacity="0.25" />

      {/* copa con cintura */}
      <motion.g variants={rise}>
        <path d="M144 108 h112 q-4 60 -28 84 q-8 10 -8 34 h-40 q0 -24 -8 -34 q-24 -24 -28 -84 Z" fill="#ffffff" opacity="0.35" />
        <path d="M150 116 h100 q-4 52 -26 74 q-8 9 -8 30 h-32 q0 -21 -8 -30 q-22 -22 -26 -74 Z" fill={c.body} />
        <path d="M150 116 h100 l-3 22 q-47 12 -94 0 Z" fill={c.light} />
        <rect x="178" y="252" width="44" height="10" rx="4" fill="#fff" opacity="0.4" />
        <rect x="164" y="262" width="72" height="12" rx="6" fill="#fff" opacity="0.45" />
      </motion.g>

      {/* goteo por el borde */}
      <motion.g variants={layer}>
        <path d="M150 118 q4 26 -2 34 q-6 -4 -4 -34 Z M250 118 q6 30 0 40 q-8 -6 -6 -40 Z" fill={c.body} opacity="0.9" />
      </motion.g>

      {/* nata en espiral */}
      <motion.g variants={layer}>
        <ellipse cx="200" cy="108" rx="58" ry="20" fill={c.top} />
        <ellipse cx="200" cy="90" rx="42" ry="17" fill="#fffef9" />
        <ellipse cx="200" cy="74" rx="27" ry="13" fill={c.top} />
        <path d="M200 42 q14 8 4 24 q-8 -2 -12 -10 q-2 -10 8 -14 Z" fill="#fffef9" />
      </motion.g>

      {/* guinda y pajita */}
      <motion.g variants={layer}>
        <circle cx="222" cy="52" r="10" fill="#c0392b" />
        <path d="M222 42 q4 -12 14 -14" fill="none" stroke="#5f8f3e" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M172 18 l18 2 l-10 52 l-13 -2 Z" fill="#f3ead4" />
        <path d="M174 30 l14 2 M172 44 l13 2" stroke="#d9b36a" strokeWidth="4" opacity="0.9" />
      </motion.g>
    </motion.svg>
  )
}
