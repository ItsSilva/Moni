# Revisión acotada · 29/10/2026

Alcance: modal de cookies al entrar, diagnóstico GA4 y catálogo nacional de ciudades. Sin cambios A/B simultáneos, campañas o criterios de elegibilidad. Skills aplicadas: better-accessibility, better-writing, Vercel verification, deployments-cicd y react-best-practices. Se conserva React/Vite/CSS del proyecto.

## Accesibilidad y redacción

| Severidad | Ubicación | Antes | Después | Motivo |
| --- | --- | --- | --- | --- |
| Media | `src/MeasurementConsent.tsx` | Aviso solo al pie; poca exposición | Diálogo inicial con aceptar/rechazar/configurar equivalentes | Decisión visible, explícita y comprensible; requisito del usuario |
| Media | `src/MeasurementConsent.tsx` | Diálogo de preferencias solo manual | Diálogo nativo, fondo inerte, título enfocado, Tab/Shift+Tab, Escape y retorno de foco | WCAG 2.1.1, 2.4.3; cerrar no concede consentimiento |
| Media | `src/measurement.css` | Primera implementación móvil estiraba botones por flex-basis | Botones de altura natural y diálogo desplazable | Acciones accesibles a 320 px; WCAG 1.4.10 |
| Media | `src/main.tsx`, `src/cities.ts` | Cali/otra ciudad | Selector nativo, departamentos y nombres repetidos distinguidos; servidor usa mismo catálogo | Evitar respuestas ambiguas y conservar validación; WCAG 3.3.2 |

Approve para el alcance inspeccionado: teclado, nombres/estados nativos y axe sin infracciones en reglas ejecutadas, reflujo 320–1440 y movimiento reducido. No verificado con NVDA/VoiceOver ni Safari físico; no es certificación WCAG. Copy revisado contra acciones reales, sin prometer apertura de cuenta ni obligar a aceptar cookies.

## Evidencia

- 48 pruebas unitarias/API y 36 E2E (escritorio/móvil) aprobadas; build TypeScript/Vite.
- SDK oficiales con ID real `G-LZQ06TMWJ0` y CSP real en localhost: un `page_view` GA4 y un `PageView` Meta tras aceptar; ningún proveedor antes; ningún dato de formulario ni error CSP. Todos los eventos se interceptaron antes de entregarse al proveedor: recepción en panel pendiente.
- Validación de ciudad con todos los códigos oficiales, rechazo de entradas arbitrarias, códigos con cero inicial, Cali/other heredados y nombres derivados por servidor. UI comprueba 1.122 opciones y envío de Medellín. Errores, rate limit, reintento, consentimiento y éxito tras respuesta se mantienen.
- Cuatro capturas de producto A/B (hero y app) antes/después: idénticas píxel a píxel. Sin cambios en assets, Art.tsx o styles.css. Cinco hashes de pantallas de `product-baseline.json` ya no coinciden con main; se documenta la divergencia heredada, sin regenerar la referencia ni modificar esas imágenes.
- Evidencias privadas: `.qa/consent-before`, `.qa/consent-after`, `.qa/measurement/sdk-smoke.json`, `test-results/`. No contienen contactos reales ni originales Social. La captura publicada siempre usa `test=1`.
- El intento inicial de captura con `networkidle` agotó el tiempo; se capturó de nuevo esperando carga/document.fonts, sin cambiar el sitio para ocultar el timeout.

La etiqueta manual ya estaba instalada. Se mantiene una única carga externa de gtag y consentimiento básico; el cambio que aumenta su visibilidad es el modal inicial. No declarar que el mensaje de Google desapareció sin evidencia en su panel.
