# Crypto Dashboard

Dashboard analítico de criptomonedas en tiempo real construido con Next.js, TypeScript y TanStack Query.

## ✨ Features

- 📊 Tabla de assets con Infinite Scroll y deduplicación automática
- 🔍 Búsqueda en tiempo real por nombre o símbolo
- 🎛️ Filtros múltiples por cambio 24h y market cap
- 📈 Gráfico de histórico de precios al clickear un asset
- 📄 Página de detalle por asset con estadísticas clave
- ⚡ Polling automático cada 30 segundos para precios actualizados
- 💀 Skeleton loaders y Error Boundaries para manejo de estados asíncronos
- 🚫 Empty state cuando los filtros no devuelven resultados

## 🚀 Cómo iniciar el proyecto

### Requisitos previos

- Node.js 18+
- Una API key gratuita de CoinCap en [pro.coincap.io](https://pro.coincap.io)

### Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/AbrahamAN/challenge-mockup-frontend.git
cd challenge-mockup-frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_COINCAP_API_KEY=tu_api_key_aqui
```

4. Correr el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir [http://localhost:3000](http://localhost:3000) en el browser.

### Correr los tests

Tests unitarios y de componentes:

```bash
npm test
```

Tests end-to-end (requiere el servidor corriendo):

```bash
npx playwright test
```

---

## 🏗️ Decisiones de arquitectura

### Stack tecnológico

- **Next.js 15 (App Router)** — Elegido por su routing basado en archivos, soporte de server components y defaults listos para producción.
- **TypeScript (strict mode)** — Aplicado en todo el proyecto. Todas las respuestas de la API están completamente tipadas con interfaces modeladas directamente desde la API de CoinCap v3.
- **Tailwind CSS v4** — Estilos utility-first con soporte de dark mode mediante la variante `dark:`.
- **TanStack Query** — Maneja todo el estado del servidor: fetching, caching, polling e infinite scroll.
- **Zustand** — Estado global liviano para concerns de UI: búsqueda, filtros y asset seleccionado.
- **Recharts** — Librería de gráficos nativa para React, usada para el gráfico de área del histórico de precios.
- **Vitest + React Testing Library** — Tests unitarios y de componentes.
- **Playwright** — Tests end-to-end cubriendo los flujos principales del usuario.

### Estructura de carpetas

Arquitectura feature-based bajo `src/features/assets/`, con separación clara entre:

- `services/` — Llamadas a la API (funciones puras, sin side effects)
- `hooks/` — Lógica de negocio (fetching, manejo de estado)
- `store/` — Estado global de UI (Zustand)
- `components/` — Capa de presentación (sin llamadas directas a la API)
- `utils/` — Utilidades de formato compartidas

### Estrategia de manejo de estado

| Tipo de estado      | Herramienta    | Ejemplo                               |
| ------------------- | -------------- | ------------------------------------- |
| Estado del servidor | TanStack Query | Precios de assets, histórico          |
| Estado global de UI | Zustand        | Búsqueda, filtros, asset seleccionado |
| Estado local        | useState       | No fue necesario en este scope        |

### Datos en tiempo real

Implementado mediante polling (`refetchInterval: 30s`) en la query principal de assets. Se consideraron WebSockets pero se eligió polling por simplicidad y estabilidad, dado que la API de CoinCap actualiza cada 30 segundos.

### Infinite Scroll

Construido con `useInfiniteQuery` y la API nativa `IntersectionObserver` — sin librerías adicionales. El observer se pausa cuando hay filtros o búsqueda activa para evitar llamadas innecesarias a la API.

### Resiliencia

- `ErrorBoundary` como class component captura errores de rendering
- `retry: 2` en el QueryClient reintenta requests fallidos automáticamente
- Todas las funciones del service lanzan errores tipados ante respuestas no-ok
- Skeleton loaders para estados de carga asíncrona
- Empty state cuando los filtros no devuelven resultados

---

## ⚖️ Trade-offs

### Qué haría diferente con más tiempo

- **WebSockets** — Reemplazar el polling con la API WebSocket de CoinCap para actualizaciones verdaderamente en tiempo real sin el delay de 30 segundos.
- **Filtrado server-side** — El filtrado actual es client-side, lo que funciona bien para el dataset cargado pero no escalaría a miles de assets.
- **Lista virtualizada** — Reemplazar el infinite scroll actual con una lista virtualizada usando `react-virtual` para manejar datasets muy grandes sin problemas de performance en el DOM.
- **Toggle de Dark/Light mode** — Los estilos de dark mode ya están implementados via las clases `dark:` de Tailwind. Agregar un toggle manual con `next-themes` completaría la feature.
- **Sorting** — Clickear los headers de la tabla para ordenar por precio, market cap o cambio 24h.
- **Mayor cobertura E2E** — Tests de Playwright más completos cubriendo la página de detalle y combinaciones de filtros.

### Limitaciones de la API

CoinCap v3 no garantiza orden consistente entre requests paginados cuando los precios cambian en tiempo real. Se implementó deduplicación client-side por `id` del asset usando un `Map` para manejar esto de forma controlada.
