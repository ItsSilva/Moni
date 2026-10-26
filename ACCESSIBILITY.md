# Accesibilidad y alcance de validación

Objetivo de implementación: WCAG 2.2 AA. No se afirma conformidad total a partir de pruebas automáticas.

Implementado: HTML semántico, idioma es-CO, salto al contenido, jerarquía de títulos, alt del logotipo/ilustración decorativa, etiquetas de campos, errores asociados con aria-describedby, resumen enfocado, avisos de estado y error, botones de 44 px o más, controles nativos, foco visible, diálogo modal con Escape, fuentes locales, diseño responsive y movimiento reducido. Las vistas de la app usan datos simulados, están etiquetadas como ilustraciones y no contienen controles falsamente interactivos. Las preguntas frecuentes se operan con teclado.

## Pruebas reproducibles

- `npm test`: validación, elegibilidad, atribución, expiración, respuestas API, límites y fallos de almacenamiento.
- `npm run build`: TypeScript y build de producción.
- `npm run test:e2e`: axe WCAG A/AA 2.0, 2.1 y 2.2; escritorio y móvil; ambas variantes; errores y éxito de registro; modal; teclado; carga de imágenes; overflow a 320px; movimiento reducido.
- GitHub Actions guarda el reporte y las capturas de Playwright. Consultar el resultado del commit concreto; la presencia del workflow no significa que la ejecución haya pasado.

## Revisión manual pendiente del entorno final

Recorrer con NVDA/Firefox o VoiceOver/Safari, zoom de 200% y 400%, teclado completo, contraste en estados del navegador y revisión de copy del aviso con el responsable. Verificar funciones serverless con una base real: las pruebas de navegador simulan respuestas, y las unitarias simulan Redis. Los bloqueos de almacenamiento pueden afectar medición, no deben impedir el formulario.

La revisión visual se realiza en navegador y las pruebas automatizadas de escritorio/móvil se ejecutan en el workflow del repositorio; consultar el resultado del commit concreto en Actions. No se declara una revisión manual con lector de pantalla.

## Entrega visual · 25 de octubre de 2026

Se conserva el producto protegido y se aísla el CSS de la landing. Se añade foco a la confirmación después del guardado, región de estado persistente, `aria-busy` durante envío, contención de scroll del diálogo y hover condicionado al puntero. Las 22 pruebas E2E incluyen error 429/reintento, espera sin éxito anticipado, consentimiento, email inválido y foco de ambos diálogos, además de axe y la suite anterior. Hay comprobación de 320, 390, 768, 1024 y 1440 px para A y B.

Se comprobó reflujo a 720 y 360 CSS px, equivalente a 200% y 400% sobre una ventana de 1440 px. No se equipara a una prueba manual de zoom del navegador con lector de pantalla. Un ensayo con `html { zoom: 4 }` produjo overflow porque CSS zoom no cambia las media queries; se descartó como simulación de zoom del navegador y no se presenta como prueba aprobada. La revisión manual nativa, NVDA/VoiceOver y Safari físico siguen pendientes.

La preferencia de movimiento reducido elimina transiciones, animaciones y scroll suave. Ningún importe, progreso o elemento interno del producto se anima. No se afirma conformidad WCAG completa.
