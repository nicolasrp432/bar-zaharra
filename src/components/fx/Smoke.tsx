/** Columnas de humo/vapor cálido que suben lentamente sobre los platos calientes. */
export default function Smoke({ className = '' }: { className?: string }) {
  const plumes = [
    { left: '32%', delay: '0s', size: 70, dur: '11s' },
    { left: '48%', delay: '3.5s', size: 95, dur: '14s' },
    { left: '62%', delay: '7s', size: 60, dur: '12.5s' },
  ]
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {plumes.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[28%] block rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.7,
            background:
              'radial-gradient(ellipse at center, rgb(243 233 210 / 0.16), transparent 70%)',
            filter: 'blur(10px)',
            animation: `drift ${p.dur} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
