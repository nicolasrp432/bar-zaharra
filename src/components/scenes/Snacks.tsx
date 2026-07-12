import { motion } from 'framer-motion'
import { stack, layer, rise } from './anim'

/** Nachos cargados: bol de barro, chips, queso cayendo, jalapeños, guac y crema. */
export function Nachos() {
  return (
    <motion.svg variants={stack} viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label="Ilustración de los nachos">
      <motion.ellipse variants={layer} cx="200" cy="288" rx="140" ry="14" fill="#000" opacity="0.4" />

      {/* bol de barro */}
      <motion.g variants={rise}>
        <path d="M80 226 h240 q-10 62 -120 62 t-120 -62 Z" fill="#8a4a2b" />
        <path d="M80 226 h240 l-4 12 h-232 Z" fill="#a35a35" />
      </motion.g>

      {/* chips en pila */}
      <motion.g variants={layer}>
        {[
          [130, 208, -24, '#e8b356'], [176, 190, 10, '#f0c26a'], [226, 200, 30, '#e0a94e'],
          [156, 222, -8, '#f0c26a'], [252, 218, -18, '#e8b356'], [200, 214, 4, '#dfa54a'],
          [110, 224, 14, '#f0c26a'], [284, 226, 8, '#e8b356'],
        ].map(([x, y, r, c], i) => (
          <path key={i} d="M0 -26 L26 20 L-26 20 Z" fill={c as string} transform={`translate(${x} ${y}) rotate(${r})`} stroke="#b07c2c" strokeWidth="2" />
        ))}
      </motion.g>

      {/* queso fundido cayendo */}
      <motion.g variants={layer}>
        <path
          d="M118 196 q40 -24 84 -20 q46 -4 84 18 q8 6 -2 10 q-14 4 -16 18 q-2 10 -8 -2 q-6 -14 -18 -6 q-10 8 -14 22 q-4 10 -8 -4 q-4 -18 -16 -12 q-12 4 -14 20 q-3 12 -8 0 q-6 -18 -18 -14 q-10 4 -12 14 q-4 10 -8 -2 q-4 -16 -14 -18 q-14 -4 -12 -14 q0 -6 10 -10 Z"
          fill="#f5a93d"
        />
      </motion.g>

      {/* jalapeños + pico */}
      <motion.g variants={layer}>
        {[[150, 186], [218, 176], [268, 194]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="11" fill="#4f8f3a" />
            <circle cx={x} cy={y} r="6" fill="#7db85e" />
          </g>
        ))}
        {[[132, 172], [196, 162], [246, 168], [288, 182]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.5" fill="#d24435" />
        ))}
      </motion.g>

      {/* guac y sour cream */}
      <motion.g variants={layer}>
        <path d="M148 158 q18 -16 40 -6 q14 8 4 18 q-20 12 -40 2 q-12 -8 -4 -14 Z" fill="#78a844" />
        <path d="M232 150 q16 -12 34 -3 q12 7 3 15 q-16 10 -33 2 q-11 -7 -4 -14 Z" fill="#f6efdd" />
      </motion.g>
    </motion.svg>
  )
}

/** Patatas en vaso kraft con doble salsa (brava y alioli). */
export function Patatas() {
  return (
    <motion.svg variants={stack} viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label="Ilustración de las patatas">
      <motion.ellipse variants={layer} cx="200" cy="290" rx="110" ry="13" fill="#000" opacity="0.4" />

      {/* patatas asomando */}
      <motion.g variants={layer}>
        {[
          [156, 108, -16], [176, 92, -6], [200, 86, 2], [224, 92, 10], [246, 108, 18],
          [166, 120, -10], [212, 104, 6], [234, 120, 14], [190, 100, -2],
        ].map(([x, y, r], i) => (
          <rect key={i} x={-9} y={-58} width="18" height="116" rx="8" fill={i % 2 ? '#f2c363' : '#e8b34e'} transform={`translate(${x} ${y + 60}) rotate(${r})`} />
        ))}
      </motion.g>

      {/* vaso kraft con banda dorada */}
      <motion.g variants={rise}>
        <path d="M136 156 h128 l-14 132 h-100 Z" fill="#efe3c8" />
        <path d="M136 156 h128 l-3 26 h-122 Z" fill="#d9b36a" opacity="0.9" />
        <text x="200" y="242" textAnchor="middle" fontFamily="Rye, serif" fontSize="34" fill="#a5813f">Z</text>
        <path d="M150 156 l11 132 M250 156 l-11 132" stroke="#d9c9a4" strokeWidth="3" opacity="0.7" />
      </motion.g>

      {/* salsas por encima */}
      <motion.g variants={layer}>
        <path d="M150 148 q30 -22 52 0 q26 -20 50 2" fill="none" stroke="#d24435" strokeWidth="8" strokeLinecap="round" />
        <path d="M162 132 q26 -18 44 0 q22 -16 40 2" fill="none" stroke="#f6efdd" strokeWidth="7" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  )
}

/** Nuggets sobre tabla con las tres salsas. */
export function Nuggets() {
  return (
    <motion.svg variants={stack} viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label="Ilustración de los nuggets">
      <motion.ellipse variants={layer} cx="200" cy="290" rx="150" ry="13" fill="#000" opacity="0.4" />

      {/* tabla de madera */}
      <motion.g variants={rise}>
        <rect x="52" y="216" width="296" height="66" rx="14" fill="#7a4a28" />
        <rect x="52" y="216" width="296" height="12" rx="6" fill="#95603a" />
        <circle cx="332" cy="250" r="7" fill="#5c351c" opacity="0.5" />
      </motion.g>

      {/* nuggets dorados */}
      <motion.g variants={layer}>
        {[
          [116, 196, -12], [172, 184, 8], [230, 190, -6], [284, 198, 12], [144, 214, 4], [256, 216, -10], [200, 210, 14],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-26 -14 q8 -14 26 -12 q20 -2 26 12 q6 12 -4 22 q-10 10 -22 8 q-14 2 -24 -8 q-10 -10 -2 -22 Z" fill={i % 2 ? '#e8ab4a' : '#df9d3a'} />
            <circle cx="-8" cy="-2" r="2.5" fill="#b07626" />
            <circle cx="8" cy="6" r="2.5" fill="#b07626" />
            <circle cx="2" cy="-8" r="2" fill="#b07626" />
          </g>
        ))}
      </motion.g>

      {/* tres salsas: ketchup, alioli, búffalo */}
      <motion.g variants={layer}>
        {[
          ['#d24435', 120], ['#f3ead4', 200], ['#e07b2f', 280],
        ].map(([c, x], i) => (
          <g key={i}>
            <ellipse cx={x as number} cy="258" rx="27" ry="13" fill="#3a2c1c" />
            <ellipse cx={x as number} cy="254" rx="22" ry="9" fill={c as string} />
          </g>
        ))}
      </motion.g>
    </motion.svg>
  )
}
