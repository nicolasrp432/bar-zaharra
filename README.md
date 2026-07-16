# Taberna Zaharra · Carta digital

Carta digital para **Taberna Zaharra** (desde 2002), pensada para el QR de la mesa: un menú
claro y elegante que da la información al momento y ayuda a elegir sin fricción.

**🌐 En producción: https://nicolasrp432.github.io/bar-zaharra/** — cada push a `main`
redespliega automáticamente (workflow `.github/workflows/deploy.yml`, publica en la rama
`gh-pages`). Ese es el enlace para generar el QR de las mesas.

## La experiencia

Carta clara y premium, tipo *fine dining*: papel crema, tipografía Cormorant Garamond y solo
iconos de línea como detalle gráfico. Sin imágenes: la información manda.

- **Portada**: el logotipo tipográfico de la casa — TABERNA · Zaharra · Desde 2002 — con
  entrada suave, el lema *"Hecho al momento. Como debe ser."* y dos acciones: Ver la carta
  y Ayúdame a elegir.
- **La carta como menú legible**: entradas clásicas con línea de puntos entre plato y precio,
  ingredientes en versalitas y un desplegable "Detalle" con la historia, medidores (n/5),
  "El protagonista" y el maridaje.
- **Navegación**: barra superior con capítulo activo + índice editorial a pantalla completa
  (capítulos, nº de platos, precio "desde") + píldora inferior de 3 acciones.
- **Ayudas para elegir**: ❤ favoritos persistentes, Sorpréndeme (ruleta tipográfica),
  recomendador de 3 preguntas y sugerencia según la hora del día.
- **Historia** 2002 → hoy y cierre "¡Gracias por venir!".

## Desarrollo

```bash
npm install
npm run dev       # servidor local
npm run build     # comprobación de tipos + build de producción (dist/)
```

Stack: React 19 + Vite + TypeScript + Tailwind CSS 4 + Framer Motion. Fuentes autoalojadas (Cormorant Garamond + Manrope). Sin backend: todo es estático.

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
