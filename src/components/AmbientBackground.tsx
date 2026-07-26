import { motion } from 'framer-motion'

/**
 * Fondo atmosférico ultra suave y sutil para matizar el tono de papel sin distraer.
 */
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Resplandor ambiental de luz cálida superior ultra tenue */}
      <motion.div
        initial={{ opacity: 0.12, scale: 0.8 }}
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [0.8, 1.05, 0.8] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-radial from-amber-500/15 via-amber-700/5 to-transparent blur-3xl"
      />

      {/* Resplandor lateral suave */}
      <motion.div
        initial={{ opacity: 0.08 }}
        animate={{ opacity: [0.08, 0.16, 0.08], y: [-15, 15, -15] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-radial from-amber-600/10 to-transparent blur-3xl"
      />

      {/* Chispas flotantes casi imperceptibles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 17 + 10) % 100}vw`,
              y: `${(i * 23 + 15) % 100}vh`,
              opacity: 0.08 + (i % 2) * 0.06,
              scale: 0.5,
            }}
            animate={{
              y: [`${(i * 23 + 15) % 100}vh`, `${((i * 23 + 15) % 100) - 10}vh`],
              opacity: [0.06, 0.18, 0.06],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 1.2,
            }}
            className="absolute h-1 w-1 rounded-full bg-amber-400/40 blur-[0.5px]"
          />
        ))}
      </div>
    </div>
  )
}
