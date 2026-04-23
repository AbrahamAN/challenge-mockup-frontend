# Frontend Challenge: Data Dashboard & Real-Time Visualization

¡Bienvenido al desafío técnico para Frontend! Este challenge está diseñado para evaluar no solo tus habilidades escribiendo código, sino también tus decisiones de arquitectura, manejo de estado complejo, optimización de rendimiento y buenas prácticas.

## El Objetivo

Tu misión es construir un **Dashboard Analítico** en formato SPA (Single Page Application) o SSR que muestre datos de entidades complejas (por ejemplo, activos financieros, monitorización de servidores o métricas de e-commerce).

No buscamos un diseño "pixel-perfect" basado en un mockup estricto, sino una interfaz limpia, accesible y altamente responsiva donde demuestres tu dominio técnico y sensibilidad por la UX/UI.

## Requerimientos Técnicos

1. **Stack Tecnológico:**
   - **Framework:** React (Next.js App Router / Pages Router o Vite son recomendados) o el framework en el que mejor te desenvuelvas si la oferta es agnóstica.
   - **Tipado:** TypeScript estricto de uso obligatorio (sin `any` injustificados).
   - **Estilos:** Tailwind CSS, SCSS, styled-components, o herramientas modernas de CSS-in-JS.

2. **Funcionalidades Clave:**
   - **Data Fetching & Caching:** Conéctate a una API pública (ej. CoinCap para criptomonedas o Rick and Morty/PokeAPI si prefieres un dominio más sencillo manejando un volumen alto de datos).
   - **Real-Time Data:** Implementa WebSockets (o polling secundario persistente usando TanStack Query/SWR) para actualizar la información sin bloquear la UI ni causar re-renders innecesarios.
   - **Filtros e Interacción:** El usuario debe poder buscar, aplicar filtros múltiples y visualizar los datos mediante paginación o *Infinite Scroll* virtualizado.
   - **Visualización Gráfica:** Integra gráficos (ej. Recharts, Chart.js o D3) para mostrar métricas o históricos de la entidad seleccionada.

3. **Arquitectura y Calidad de Código:**
   - **Patrones de Diseño:** Aplica principios SOLID y diseña componentes reutilizables, separando la lógica de negocio (hooks/servicios) de las vistas.
   - **Manejo de Estado:** Utiliza las herramientas adecuadas para cada caso: estado local vs estado global (Zustand, Context, Redux) vs estado de servidor (TanStack Query, SWR).
   - **Testing:** 
     - Tests unitarios y de componentes críticos usando Jest/Vitest y React Testing Library.
     - (Opcional) Al menos un flujo End-to-End con Cypress o Playwright.

4. **Experiencia de Usuario (UX) y Performance:**
   - **Web Vitals & Rendimiento:** Manejo óptimo de la carga inicial (*First Contentful Paint*), *Code Splitting*, *Lazy Loading* e implementación de `useMemo`/`useCallback`/`memo` solo donde aporte valor real.
   - **Manejo de Errores:** Implementación de *Error Boundaries* y *skeleton loaders* para la carga asíncrona.

## Entregables
1. Repositorio en Git.
2. Un archivo `README.md` propio dentro del proyecto que incluya:
   - Instrucciones claras para inicializar el proyecto en local.
   - **Decisiones de arquitectura:** Un breve apartado justificando tu elección de stack tecnológico, librerías y patrones utilizados.
   - **Trade-offs:** ¿Qué cosas hubieras hecho diferente de contar con más tiempo?
3. **[Bonus]** Despliegue del proyecto en Vercel, Netlify o similar.

## Criterios de Evaluación
- **Estructura del Proyecto:** Qué tan escalable y mantenible es la base de código.
- **Resiliencia:** Cómo la aplicación maneja caídas de red, latencia alta, y visualización de errores controlados.
- **Madurez de TypeScript:** Uso y creación de interfaces complejas, utilidades de tipos y genéricos.
- **Testing Estratégico:** No te pedimos 100% de coverage, sino pruebas que aseguren el comportamiento principal y aporten valor.
- **Autonomía:** Capacidad de comunicar el "por qué" detrás del código escrito.

---

*Nota:* Sabemos que tu tiempo libre es valioso. No esperamos que le inviertas una cantidad de horas desmesurada. Enfócate en estructurar una base sólida, modular, que cumpla con los requisitos esenciales y demuestre tu nivel de experiencia. ¡Mucho éxito!