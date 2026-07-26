import { motion } from 'framer-motion'

function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function IconMapPin({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconClock({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export default function ContactLocation() {
  return (
    <section className="mx-auto max-w-xl px-6 pt-16 pb-12" aria-label="Contacto y Ubicación">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-gold/30 bg-gradient-to-b from-paper-2/70 via-paper/90 to-paper-2/50 p-8 shadow-md text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold mb-4 ring-1 ring-gold/30">
          <IconMapPin size={24} />
        </div>

        <h2 className="font-display text-4xl font-semibold text-ink">Visítanos y Contáctanos</h2>
        <p className="mt-2 font-serif text-lg italic text-ink/75">
          Te esperamos en nuestra barra con la cocina abierta.
        </p>

        {/* Tarjeta Instagram */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-paper p-5 transition-transform hover:scale-[1.01]">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 text-left">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-amber-600 via-rust to-pink-600 text-white shadow-xs">
                <IconInstagram size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink/60">
                  Síguenos en Instagram
                </p>
                <p className="font-display text-xl font-bold text-ink">@taberna.zaharra</p>
              </div>
            </div>
            <a
              href="https://instagram.com/taberna.zaharra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-paper shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              Seguir
            </a>
          </div>
        </div>

        {/* Ubicación y Horarios */}
        <div className="mt-4 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-2">
              <IconMapPin size={16} />
              <span>Ubicación</span>
            </div>
            <p className="font-display text-lg font-semibold text-ink">Bar Zaharra</p>
            <p className="mt-1 text-xs leading-relaxed text-ink/70">
              Calle Mayor, 12<br />
              Parte Vieja, San Sebastián
            </p>
            <a
              href="https://maps.google.com/?q=San+Sebastian+Bar+Zaharra"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[11px] font-bold text-rust uppercase tracking-wider underline underline-offset-4"
            >
              Ver en Google Maps →
            </a>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-2">
              <IconClock size={16} />
              <span>Horarios</span>
            </div>
            <p className="font-display text-lg font-semibold text-ink">Abiertos cada día</p>
            <p className="mt-1 text-xs leading-relaxed text-ink/70">
              Martes a Domingo:<br />
              <strong className="text-ink font-semibold">12:00h – 23:30h</strong><br />
              <span className="text-ink/50">Lunes cerrado por descanso</span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
