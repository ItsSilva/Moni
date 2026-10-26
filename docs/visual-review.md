# Revisión visual · 25 de octubre de 2026

## Alcance y referencias

Landings A y B completas, React/TypeScript/Vite y CSS propio. Convenciones: README, AGENTS, ACCESSIBILITY y product-baseline. Base: `a334aa858bcc5b6b9451abd2622a74bdb3cffa0c`. Se leyeron README y AGENTS de main y las nueve skills locales; procedencia comprobada en skills-lock. No se instala un sistema visual externo.

GitHub permite lectura y push/admin; Vercel permite leer el proyecto existente y su producción READY. Figma MCP permite leer el archivo y los componentes. El conector no expone comentarios; en el navegador, activar Comentario abre un modal de registro. **Comentarios de mentoría no verificados**. No se atribuyen frases al docente ni se declaran comentarios resueltos.

Nu Cuenta y Revolut Kids & Teens se consultaron en sus URLs oficiales: se toman jerarquía de producto, demostración concreta y claridad del recorrido. No se reutilizan imágenes, copy comercial ni afirmaciones de esas entidades.

## Social: matriz de continuidad

Los originales están en `../Social`, fuera del repositorio. Se revisó el JPEG completo y la secuencia visual de ambos videos mediante fotogramas cada 0,5 s a lo largo de toda su duración; además se decodificaron íntegramente ambas pistas hasta EOF sin errores. No se realizó una transcripción del audio. Derivados y hojas de contacto locales en `.qa/social`, ignorados y sin publicar.

| Archivo real | Formato y dimensiones | Contenido observado | Relación con la landing |
| --- | --- | --- | --- |
| InstagramPostsFeed.jpeg | JPEG, 946 × 1224 | Cuadrícula P01–P09, tipografía pesada, azul/amarillo/rosa, tarjeta, app, preguntas y CTA | Comunicación común; autonomía, acompañamiento y hábitos |
| TikTokReel1.mp4 | H.264/AAC, 1080 × 1920, 30 fps, 18,07 s | 0–4 s primera tarjeta; 4,5–7 s límites; 7,5–8,5 s compras; 9–10,5 s metas; 11–14,5 s autonomía/tranquilidad; 15–18,07 s cierre/registro | A predominante con aprendizaje común; finales $18.000, límite $50.000, gasto $32.000, meta $60.000/$100.000 |
| TikTokReel2.mp4 | H.264/AAC, 1080 × 1920, 30 fps, 11,07 s | 0–5,5 s mesada agotada; 6–11,07 s acompañamiento, tarjeta rosa y CTA | Mensaje cercano a A; no muestra una app nueva |

**Discrepancias previas:** las tarjetas publicitarias tienen ojos; Reel 2 utiliza rosa. El componente `32:885` de Figma y el código tienen tarjeta azul sin ojos. Los logos/cierres de Social también tienen tratamientos distintos del SVG actual. Las pantallas finales de Reel 1 corresponden a las tres vistas del código y Figma; los importes intermedios son animaciones del anuncio. El panel de Figma `32:862` se consultó con contexto y captura.

**Decisión para este alcance:** congelar el producto vigente de main, registrado en product-baseline. No se declara que la tarjeta sin ojos sea una aprobación nueva del usuario ni que todas las versiones sean idénticas. No alterar tarjeta, logo, pantallas o sus estilos internos. Una unificación futura con Social requiere que el usuario elija la versión aprobada antes de modificar el producto. La continuidad aquí se mejora en composición, Outfit y proporción de los colores existentes.

## Dirección Taste

Inventario propio: Moni, tarjeta débito conceptual, app de familia, primera autonomía, acompañamiento, Cali, cuidadores adultos, hipótesis secuenciales, límites $50.000, movimientos $32.000 y meta de audífonos. Argumento: reconocer el producto → entender las herramientas → ver las pantallas completas → resolver dudas → registrar interés informado.

Sorteo: dark-room / colour-chapters / quiet-instrument. Elegida **Colour chapters**, semilla **261026**: los campos de color de las piezas de Moni se convierten en capítulos de lectura con un producto constante. Outfit, logo y paleta se conservan (`--keep palette,type`). La interacción real es el formulario existente y las preguntas nativas.

Excepciones explícitas al generador: su hero tipográfico sin producto contradice el brief; no se divide/redibuja el logo ni se modifica el copy experimental. No se añaden switches financieros ni simuladores a los beneficios. No se fuerzan capítulos de 90svh, cuatro fotografías ajenas, vídeo público, ocho animaciones, encabezados de dos líneas o interfaces nuevas. El producto protegido conserva sus sombras, círculo, tamaños y jerarquía. Estas excepciones no equivalen a un PASS de los contadores genéricos de Taste.

## better-interface: auditoría inicial

Cobertura: seis dominios con sus SKILL.md y referencias pertinentes; A/B a 1440 y 390, línea base E2E incluyendo 320 px, formulario y diálogos. Los 34 tests unitarios/API y 14 E2E pasan antes de editar.

| Severidad | Dominio | Localización inicial | Antes | Después previsto | Motivo |
| --- | --- | --- | --- | --- | --- |
| MEDIUM | Layout | src/main.tsx:39, src/styles.css:11 | Tres beneficios con misma composición y escala | Una herramienta principal amplia y dos apoyos; textos y vistas separados | La prioridad propia de cada hipótesis no tiene expresión visual |
| MEDIUM | Typography | src/styles.css:2,17 | Titulares con escala semejante y FAQ a todo el ancho | Escala editorial fluida y FAQ en dos columnas con medida limitada | La lectura pierde jerarquía y las respuestas recorren demasiado ancho |
| MEDIUM | Accessibility | src/main.tsx:19 | Confirmación montada con role=status al mismo tiempo que su texto | Región persistente y foco a confirmación tras guardado | Anuncio de éxito dependiente del lector; origen del foco desaparece |
| LOW | UI | src/styles.css:3,11 | Hover levanta CTA y tarjetas no interactivas, incluso en táctil | Hover condicionado, tarjetas estáticas, feedback de pulsación | El movimiento sugiere acciones donde no existen |
| LOW | Layout | src/main.tsx:37, src/styles.css:4 | Hero y navegación no explicitan el contexto académico hasta más abajo | Identificación académica en cabecera y nota de propuesta junto al CTA | Aclarar el alcance desde la entrada sin añadir claims |
| LOW | UI | src/styles.css:16 | Dialog sin overscroll-behavior | Contener desplazamiento del diálogo | Evitar encadenar el scroll a la página de fondo |

Writing: vocabulario, títulos A/B, preguntas, respuestas, consentimientos y términos de registro conservados. Colors: paleta y pares de contraste existentes conservados, verificados con axe en línea base; comprobar todos los estados finales. Accessibility: teclado, nombres y foco de diálogos pasan la línea base; revisión manual con lector de pantalla pendiente. No se declara certificación WCAG.

## Find Animation Opportunities: propuestas, antes de implementar

| # | Lugar | Hoy | Propósito | Frecuencia | Receta y evaluación |
| --- | --- | --- | --- | --- | --- |
| 1 | src/main.tsx:19, confirmación | Sustitución inmediata del formulario | Indicación de estado | Una vez por registro | Opacidad 0→1 y translateY(8px)→0, 240ms cubic-bezier(0.23,1,0.32,1). El icono, título, texto y foco persisten sin movimiento. No retrasa el guardado ni el foco. |
| 2 | src/main.tsx:12, CTA | Hover vertical; active sin escala | Feedback | Pocas acciones por visita | scale(0.97), transición transform 150ms ease-out, únicamente en no-preference y enabled. Static cue: color/label. |
| 3 | src/main.tsx:44, diálogo | Apertura inmediata | Evitar aparición brusca | Ocasional | @starting-style opacity 0, translateY(8px)→0, 200ms cubic-bezier(0.23,1,0.32,1); interacción y foco inmediatos. Fallback nativo instantáneo. |

Descartados: animar saldo/progreso/compras (datos para leer y producto protegido); parallax o rotar teléfono/tarjeta (no explica una función); entradas escalonadas de todas las secciones (retrasa lectura); colapsar preguntas por defecto (cambiaría exposición y medición); navegación/foco animados (teclado debe responder inmediatamente). No hay arrastre, menús, listas dinámicas o toasts adicionales que lo justifiquen.

Veredicto de movimiento: tres respuestas breves bastan; la confirmación tiene mayor utilidad. La fase de esta skill es solo análisis. La implementación posterior está autorizada por el usuario. En movimiento reducido se elimina **toda** animación/transición y scroll suave conforme a Moni, prevaleciendo sobre el crossfade genérico recomendado por las skills.

## Verificación final local

| Dominio | Evidencia inspeccionada | Resultado |
| --- | --- | --- |
| Accessibility | axe en A/B, formulario inicial/errores/éxito, diálogos; Tab/Enter/Escape/foco; 320 px; reduced motion | Sin hallazgos HIGH en las superficies comprobadas; lector de pantalla manual pendiente |
| Layout | A/B a 320, 390, 768, 1024, 1440; hojas completas de móvil, tablet y escritorio | Sin overflow ni artboards recortados; prioridades y márgenes comunes |
| Writing | content.ts, consentimientos, aviso y mensajes de todos los estados | Copy de hipótesis y condiciones conservados; ninguna afirmación financiera nueva |
| Typography | Outfit cargada, encabezados, medidas de párrafo y FAQ | Jerarquía nueva de tarjeta/promesa; medidas limitadas. Excepción de dos líneas y tamaños de la app conservados |
| Colors | Pares renderizados en axe, superficies pastel/navy, CTA, errores y foco | Sin violaciones de contraste reportadas por axe; no certifica todos los estados del SO |
| UI | CTA/hover/press, formulario pendiente/éxito/error/429, ambos diálogos, reduced motion | Feedback breve, foco inmediato y ausencia de movimiento decorativo; tarjetas no interactivas estáticas |

Hallazgos iniciales resueltos: prioridad de beneficio, jerarquía de texto, ancho de FAQ, región/foco de éxito, hover engañoso y scroll de diálogo. El contexto académico aparece en cabecera de escritorio y se conserva en formulario/pie para todos los anchos. No se afirma que todas las limitaciones previas del producto o todos los comentarios de Figma estén resueltos.

Comandos y resultados:

- `npm test`: **34/34**.
- `npm run test:e2e -- --workers=4`: **22/22**, Chromium escritorio e iPhone 13 emulado. Incluye 503, espera antes de persistencia, 429/reintento, email inválido, falta de consentimiento, respuesta negativa, error recuperable, atribución, eventos sin datos de campos y separación test/live. Endpoints simulados.
- `npm run build`: TypeScript y Vite correctos. JS gzip 75,63→75,80 kB; CSS gzip 4,11→5,87 kB. Sin dependencias de runtime nuevas, fuentes locales conservadas. No se afirma Lighthouse ni Core Web Vitals de usuarios reales.
- Registro pausado: bundle local de producción sin configuración, aviso visible y submit deshabilitado. No se cambian variables de Vercel para probarlo.
- `.qa/stress.mjs`: reflujo equivalente de 200%/400% a 720/360 CSS px y confirmación con movimiento reducido correctos. El zoom nativo manual y lector de pantalla siguen pendientes; CSS zoom no es una simulación equivalente de media queries.
- Comparación normalizada a escala 1: **cero diferencias de píxeles** en `a-product-hero`, `a-product-apps`, `b-product-hero`, `b-product-apps`. Se normaliza solo el posicionamiento externo de clones, nunca sus componentes/estilos.
- Los 8 archivos de product-baseline y 91 archivos de las nueve skills coinciden con sus SHA-256 **normalizando CRLF→LF**. El checkout Windows convierte finales de línea; hashes crudos difieren por ello. No se reemplazan hashes para encubrir cambios. `git diff` confirma producto, estilos originales, contenido, APIs, atribución, analítica y configuración sin cambios.
- `git diff --check`: correcto. Social permanece fuera del repo y no forma parte del commit.

### Inspector Taste: resultados reales y excepciones

Ejecutado sobre **bundle servido por Vite preview**, A/B con `test=1`, a 1440/768/390, sin allowances ni esconder el producto. Se abrieron las 14 imágenes que listó: folds y todas las hojas completas de ambos diseños. Reportes locales `.taste-skill/final-a/report.json` y `final-b/report.json`.

Resultado estricto: **A: 8 FAIL / 3 WARN; B: 7 FAIL / 4 WARN**. No es un PASS ni una certificación. Explicación revisada contra los renders:

- `headline-lines`: tres líneas conservando el copy de hipótesis; no se acorta el mensaje para cumplir el contador. Se separa tipográficamente producto y promesa, con mismas reglas en A/B.
- `eyebrow`, `shadow`, `small-text`, parte de `size-count`: rótulos, sombras y tipografía de las pantallas protegidas. Se conservan intencionalmente, con comparación de píxeles. La página no importa la base de Taste sobre el producto.
- `icon-cards`: el detector agrupa las cinco preguntas con sus iconos de disclosure; son controles nativos con respuestas útiles, no tarjetas de iconos de relleno. Se mantiene su exposición abierta y medición.
- `few-pictures`, `no-footage`: no se publican Social ni fotos ajenas; el producto real en HTML/SVG demuestra la propuesta. El detector no cuenta esos fragmentos al no añadir atributos al componente protegido.
- `still-page`: no se impone movimiento a la lectura por cumplir una cuota. Los tres movimientos propuestos son de interacción y no se disparan al cargar/recorrer la página. Verificados sus estados y la anulación completa en reduced motion.
- `off-centre` a 768: el medidor compara la columna de texto limitada a 640 px con la cabecera completa. Los wraps exteriores tienen 24 px simétricos; el producto de 640 px está centrado. Se comprobó la composición de la tablet.
- Lint de main/landing: 3 FAIL: marca `✓` de confirmación preexistente como emoji y dos reglas `box-shadow: none` como sombras. No se eliminan feedback accesible ni anulaciones de sombras por esos falsos positivos.

### Crítica de renders

ROUND 1

Seen in one second: tarjeta azul y pantalla de familia.
Idea (one sentence): los colores publicados de Moni ordenan capítulos, con el mismo producto acompañando dos mensajes.
Live thing: formulario real de interés y FAQ nativa.
Layout words by section: hero=split / principios=band / beneficios=dominante+apoyos / demo=split / FAQ=índice+respuestas / registro=entrada abierta.
Scores: design 7 · usability 8 · creativity 7 · content 8 → overall 7.4 antes de caps; **6.0 bajo el rubric estricto de Taste**.
Caps applied: FAIL genéricos, producto con sombras y encabezados de más de dos líneas.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `.qa/after/a-1440-hero.png`: promesa tan grande como nombre del producto; diferenciar su escala sin cambiar palabras.
2. `.qa/final/a-1440-hero.png` de la iteración inicial: salto de línea duplicado antes de la promesa; normalizar white-space solo en ese span.
3. `.qa/after/a-1440-full.png`: índices 01/02/03 manuales; conservar secuencia semántica con marcadores nativos del ol.

ROUND 2

Seen in one second: tarjeta/app y “Su primera tarjeta débito”.
Idea (one sentence): capítulos de Moni con prioridad de límites en A y ahorro en B.
Live thing: registro persistente, con estados, y FAQ accesible.
Layout words by section: hero=split / principios=band / beneficios=dominante+apoyos / demo=split / FAQ=índice+respuestas / registro=entrada abierta.
Scores: design 7.5 · usability 8 · creativity 7 · content 8 → overall 7.65 antes de caps; **6.0 bajo el rubric estricto de Taste**.
Caps applied: mismas excepciones de brief; no se retocan contadores o reglas para inflar la puntuación.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `.taste-skill/final-a/mobile-page-01.jpg`: la pareja de pantallas queda pequeña en móvil; se conserva su escala uniforme y su interfaz. Cambiarla requeriría otra presentación aprobada, no recomponer pantallas internas.
2. `.taste-skill/final-b/tablet-page-01.jpg`: beneficios secundarios más compactos a tablet; contenido completo y sin overflow, no se añade un carrusel.
3. `.taste-skill/final-a/desktop-page-02.jpg`: el formulario del preview está pausado por configuración local; se verifica ese estado y se comprueba el habilitado en tests y producción por separado.

**Veredicto better-interface: Approve para los seis dominios y estados efectivamente inspeccionados, sin HIGH pendientes en ese alcance.** No cubre lector de pantalla manual, Safari físico, comentarios de Figma o una elección de tarjeta entre versiones discrepantes. El inspector estricto de Taste mantiene sus FAIL documentados y no se presenta como aprobado.

## Publicación y comprobación real

La entrega utiliza `main` y el proyecto Vercel existente, con autorización del usuario. Comprobar SHA/READY, logs de build con storage verification y formularios A/B reales en `test=1`. La evidencia del despliegue y sus identificadores se conserva en el chat y `.qa/`; no se exportan registros del estudio ni secretos.
