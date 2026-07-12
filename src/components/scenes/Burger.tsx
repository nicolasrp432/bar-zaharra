import { motion } from 'framer-motion'
import { stack, layer } from './anim'

type Variant = 'casa' | 'pollo' | 'sepia'

/**
 * Hamburguesa ilustrada por capas. Cada capa es un motion.g que entra
 * escalonado (pan de abajo → carne → extras → pan de arriba) cuando la
 * tarjeta entra en pantalla.
 */
export default function Burger({ variant }: { variant: Variant }) {
  const patty =
    variant === 'casa' ? '#5b3620' : variant === 'pollo' ? '#d99a4e' : '#e9d9bd'

  return (
    <motion.svg
      variants={stack}
      viewBox="0 0 400 320"
      className="h-full w-full"
      role="img"
      aria-label="Ilustración de la hamburguesa"
    >
      <defs>
        <linearGradient id={`bun-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8b365" />
          <stop offset="70%" stopColor="#c98b3f" />
          <stop offset="100%" stopColor="#a96f2d" />
        </linearGradient>
      </defs>

      {/* sombra sobre la madera */}
      <motion.ellipse variants={layer} cx="200" cy="292" rx="128" ry="15" fill="#000" opacity="0.4" />

      {/* pan de abajo */}
      <motion.g variants={layer}>
        <path
          d="M104 242 h192 a4 4 0 0 1 4 4 v10 a22 22 0 0 1 -22 22 H122 a22 22 0 0 1 -22 -22 v-10 a4 4 0 0 1 4 -4 Z"
          fill={`url(#bun-${variant})`}
        />
      </motion.g>

      {/* lechuga */}
      <motion.g variants={layer}>
        <path
          d="M92 240 q12 -14 26 -2 q12 -13 26 -1 q12 -13 27 -2 q13 -12 27 -1 q13 -12 27 -2 q13 -11 26 -1 q14 -12 27 -1 q14 -10 22 6 q4 10 -8 10 H98 q-12 0 -6 -6 Z"
          fill="#6da34d"
        />
        <path
          d="M100 244 q14 -8 26 0 q14 -9 27 0 q14 -9 27 0 q14 -9 27 0 q14 -9 27 0 q14 -9 27 0 q14 -9 26 0 v4 H100 Z"
          fill="#8fc06a"
        />
      </motion.g>

      {/* tomate (dos rodajas) */}
      <motion.g variants={layer}>
        <rect x="118" y="226" width="76" height="12" rx="6" fill="#c0392b" />
        <rect x="204" y="226" width="76" height="12" rx="6" fill="#d24435" />
      </motion.g>

      {/* carne / pollo / sepia */}
      <motion.g variants={layer}>
        <rect x="106" y="194" width="188" height="32" rx="16" fill={patty} />
        {variant === 'casa' && (
          <>
            <rect x="106" y="194" width="188" height="16" rx="8" fill="#6b4226" opacity="0.55" />
            <circle cx="140" cy="212" r="3" fill="#2e1a0d" opacity="0.6" />
            <circle cx="188" cy="216" r="2.5" fill="#2e1a0d" opacity="0.6" />
            <circle cx="236" cy="210" r="3" fill="#2e1a0d" opacity="0.6" />
            <circle cx="268" cy="215" r="2.5" fill="#2e1a0d" opacity="0.6" />
          </>
        )}
        {variant === 'pollo' && (
          <>
            <circle cx="142" cy="208" r="3" fill="#f4c073" opacity="0.9" />
            <circle cx="196" cy="214" r="2.5" fill="#f4c073" opacity="0.9" />
            <circle cx="250" cy="207" r="3" fill="#f4c073" opacity="0.9" />
          </>
        )}
        {variant === 'sepia' && (
          <>
            <rect x="122" y="198" width="8" height="24" rx="4" fill="#b39a72" opacity="0.7" />
            <rect x="162" y="198" width="8" height="24" rx="4" fill="#b39a72" opacity="0.7" />
            <rect x="202" y="198" width="8" height="24" rx="4" fill="#b39a72" opacity="0.7" />
            <rect x="242" y="198" width="8" height="24" rx="4" fill="#b39a72" opacity="0.7" />
          </>
        )}
      </motion.g>

      {/* queso fundido con goteo (mayo en la de sepia) */}
      <motion.g variants={layer}>
        <path
          d="M112 196 h176 q6 0 6 6 v2 q0 8 -8 8 q-4 12 -12 2 v-4 h-24 q-2 16 -10 16 t-10 -16 h-40 q-3 12 -10 12 t-10 -12 h-38 q-2 10 -9 10 t-9 -12 q-8 4 -8 -6 v-0 q0 -6 6 -6 Z"
          fill={variant === 'sepia' ? '#f3ead4' : '#f5b73d'}
          opacity="0.96"
        />
      </motion.g>

      {/* extras: bacon + huevo (casa) · pimientos (sepia) · cebolla (pollo) */}
      {variant === 'casa' && (
        <>
          <motion.g variants={layer}>
            <path
              d="M96 186 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 q10 5 16 0 l2 8 q-22 10 -42 1 t-40 0 t-40 0 t-40 0 t-40 0 q-10 4 -18 -1 Z"
              fill="#a4321f"
            />
            <path
              d="M100 189 q18 -7 36 0 t38 0 t38 0 t38 0 t38 0 l1 3 q-19 7 -38 0 t-38 0 t-38 0 t-38 0 t-36 0 Z"
              fill="#e0765a"
            />
          </motion.g>
          <motion.g variants={layer}>
            <path
              d="M226 168 q26 -14 52 -2 q20 8 12 20 q-6 8 -26 6 q-30 4 -44 -6 q-10 -10 6 -18 Z"
              fill="#f7f1e3"
            />
            <circle cx="262" cy="178" r="10" fill="#f5a623" />
            <circle cx="259" cy="175" r="3.5" fill="#ffd27a" />
          </motion.g>
        </>
      )}
      {variant === 'sepia' && (
        <motion.g variants={layer}>
          <path d="M110 184 q40 -12 88 -4 l-4 10 q-44 -6 -82 2 Z" fill="#c94434" />
          <path d="M206 180 q42 -8 84 2 l-4 9 q-40 -8 -78 -2 Z" fill="#5f8f3e" />
        </motion.g>
      )}
      {variant === 'pollo' && (
        <motion.g variants={layer}>
          <path d="M120 186 q30 -10 70 -4" fill="none" stroke="#e8b365" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
          <path d="M210 182 q34 -8 72 0" fill="none" stroke="#d9924a" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
        </motion.g>
      )}

      {/* pan de arriba con sésamo */}
      <motion.g variants={layer}>
        <path d="M100 172 q0 -74 100 -74 t100 74 q0 10 -10 10 H110 q-10 0 -10 -10 Z" fill={`url(#bun-${variant})`} />
        <path d="M126 130 q30 -24 74 -26" fill="none" stroke="#f2cd8b" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
        {[
          [150, 132, -20], [190, 118, 8], [232, 124, 24], [264, 142, 38], [128, 152, -32], [210, 146, 10], [172, 148, -6],
        ].map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3.4" fill="#f6e0ae" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </motion.g>
    </motion.svg>
  )
}
