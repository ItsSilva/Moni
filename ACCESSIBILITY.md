# Accesibilidad y alcance de validación

Objetivo de implementación: WCAG 2.2 AA. No se afirma conformidad total a partir de pruebas automáticas.

Implementado: HTML semántico, idioma es-CO, salto al contenido, jerarquía de títulos, alt del logotipo/ilustración decorativa, etiquetas de campos, errores asociados con aria-describedby, resumen enfocado, avisos de estado y error, botones de 44 px o más, controles nativos, foco visible, diálogo modal con Escape, fuentes locales, diseño responsive y movimiento reducido. El demo usa datos simulados y es navegable con teclado.

## Pruebas reproducibles

- `npm test`: validación, elegibilidad, atribución, expiración, respuestas API, límites y fallos de almacenamiento.
- `npm run build`: TypeScript y build de producción.
- `npm run test:e2e`: axe WCAG A/AA 2.0, 2.1 y 2.2; escritorio y móvil; ambas variantes; errores y éxito de registro; modal; teclado; carga de imágenes; overflow a 320px; movimiento reducido.
- GitHub Actions guarda el reporte y las capturas de Playwright. Consultar el resultado del commit concreto; la presencia del workflow no significa que la ejecución haya pasado.

## Revisión manual pendiente del entorno final

Recorrer con NVDA/Firefox o VoiceOver/Safari, zoom de 200% y 400%, teclado completo, contraste en estados del navegador y revisión de copy del aviso con el responsable. Verificar funciones serverless con una base real: las pruebas de navegador simulan respuestas, y las unitarias simulan Redis. Los bloqueos de almacenamiento pueden afectar medición, no deben impedir el formulario.

No se dispuso de navegador de QA compatible dentro del entorno de edición. Las pruebas de navegador se delegan al workflow del repositorio; el estado real se consulta en Actions. No se declara una revisión manual con lector de pantalla.
