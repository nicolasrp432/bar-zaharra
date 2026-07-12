# Taberna Zaharra · La carta que cobra vida

Carta digital inmersiva para **Taberna Zaharra** (desde 2002). Pensada para el QR de la mesa:
al abrirla no aparece una lista ni un PDF, sino un recorrido — intro cinematográfica, capítulos
con identidad propia por categoría y cada plato contando su historia.

## La experiencia

- **Intro cinematográfica** — pantalla negra, una luz cálida se enciende sobre la madera y aparece
  el logotipo. Una vez por sesión, con botón *Saltar* y respeto a `prefers-reduced-motion`.
- **Hero** — bodegón oscuro y cálido de la Burger de la Casa con humo, grano de película y el
  mensaje de la casa: *"Hecho al momento. Como debe ser."*
- **La carta como recorrido** — seis capítulos (Para compartir → Raciones → Hamburguesas →
  Bocatas → Batidos → Malteadas). Los capítulos calientes son oscuros, de brasa y latón; batidos
  y malteadas rompen a claro y fresco.
- **Tarjetas inmersivas** — el plato se monta capa a capa al hacer scroll (pan → carne → bacon →
  huevo…), después ingredientes, precio grande, medidores visuales (🥩🧀🌶️), el bloque
  **"El protagonista"** y el maridaje recomendado.
- **❤️ Favoritos** — persistentes en el dispositivo (localStorage), con cajón inferior para
  cantarle la comanda al camarero.
- **✨ Sorpréndeme** — la casa elige por ti con una ruleta. *"Hoy deberías pedir esto."*
- **🍽 ¿Qué pido?** — recomendador de 3 preguntas (¿cómo vienes? ¿mucha hambre? ¿carne?).
- **Menú inteligente** — sugerencia según la hora (mañana: bocatas · mediodía: hamburguesas ·
  tarde: batidos · noche: para compartir).
- **Historia** — línea de tiempo 2002 → hoy (hitos editables en `src/components/HistoryTimeline.tsx`).
- **Navegación tipo app** — solo scroll y una barra inferior con scroll-spy. Sin menús.

## Desarrollo

```bash
npm install
npm run dev       # servidor local
npm run build     # comprobación de tipos + build de producción (dist/)
```

Stack: React 19 + Vite + TypeScript + Tailwind CSS 4 + Framer Motion. Fuentes autoalojadas
(@fontsource: Rye, Playfair Display, Work Sans, Caveat). Sin backend: todo es estático y se
puede desplegar gratis en Vercel/Netlify/GitHub Pages.

## Cómo poner las fotos reales

Hoy cada plato se dibuja con una **escena ilustrada animada** (no hay fotos todavía). En cuanto
tengas fotos de verdad, solo hay que soltarlas en `public/img/`:

- `public/img/hero.jpg` — la foto de portada (la hamburguesa estrella).
- `public/img/products/<id>.jpg` — una por plato, p. ej. `burger-casa.jpg`,
  `batido-mango.jpg`. Los `id` válidos están en `src/data/menu.ts`.

Si el archivo existe, la web lo usa automáticamente; si no, muestra la ilustración. No hay que
tocar código.

## Cómo editar la carta

Todo el contenido (platos, precios, ingredientes, historias, maridajes, medidores, badges y
franjas horarias) vive en **`src/data/menu.ts`**. Es un archivo de datos comentado: cambiar un
precio o añadir un plato es editar ese archivo.

## Fase 2 (fuera de este primer alcance)

- Panel de administración (estilo Linear/Notion) con Supabase: editar productos, disponibilidad,
  producto del día.
- Inventario visual con semáforos y "últimas unidades".
- Estadísticas: top ventas, horas fuertes, ticket medio (requiere integración con TPV).
- Automatizaciones: banners por clima, partidos, viernes, aniversario.
- Vídeos "cómo se hace" de 15 segundos por hamburguesa.
- Audio ambiente de taberna (necesita un clip con licencia; el hueco del toggle está previsto).
