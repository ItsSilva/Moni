# Revisión de footer y logo · 26/10/2026

## Alcance y cobertura

Corrección puntual en React/TypeScript y CSS existente. Convenciones: README, AGENTS y producto congelado. Instrucción vigente del usuario: retirar la etiqueta académica pública y usar su nuevo export de logo. Las revisiones visuales de la entrega anterior siguen como historial, sin imponer rótulos retirados.

| Dominio | Evidencia inspeccionada | Resultado |
| --- | --- | --- |
| Accessibility | Footer nativo, nombres, foco, Enter/Escape y retorno; axe en A/B y cuatro anchos | Sin hallazgos pendientes en este alcance |
| Layout | Columnas, orden DOM, correo largo; capturas 320/390/768/1440 | Sin recortes ni overflow |
| Writing | Cabecera, registro, footer, metadatos y ambos diálogos; responsable público Vercel | Etiqueta retirada; fines y condiciones conservados |
| Typography | Outfit existente, rótulos, párrafos y controles del footer | Jerarquía 32/16/14 px y líneas sin truncar |
| Colors | Tokens soft/ink/muted/hover; auditoría axe de colores renderizados | Sin fallos en las reglas ejecutadas |
| UI | Logo, superficie de marca, hover condicionado al puntero y foco | Nuevo export proporcional; sin animación añadida |

## Hallazgos resueltos

| Severidad | Dominio | Lugar | Antes | Después | Motivo |
| --- | --- | --- | --- | --- | --- |
| MEDIUM | Writing | `src/main.tsx`, `index.html`, Vercel `VITE_DATA_CONTROLLER` | Etiqueta pública repetida | Retirada de todas las superficies públicas | Aplicar la decisión vigente sin quitar información sobre el uso de datos |
| MEDIUM | Layout | Footer `src/main.tsx`, `src/landing.css` | Una fila sin navegación/contacto y sin jerarquía | Grupos de marca, navegación, contacto y políticas | Encontrar destinos y entender el cierre en móvil/escritorio |
| MEDIUM | UI | Logo de cabecera/footer | Export SVG percibido como estirado | PNG autorizado; proporción 89:32, altura automática | Conservar las proporciones del archivo proporcionado por el usuario |

## Verificación

- `npm test`: 34/34; `npm run build`: correcto; `npm run test:e2e -- --workers=4`: 22/22. E2E simula las APIs; no equivale al guardado publicado.
- Revisión adicional de A/B: 320, 390, 768 y 1440 px; sin overflow, sin la etiqueta en cuerpo/meta/diálogos, navegación del footer y teclado correctos, cero infracciones axe en los tags WCAG ejecutados.
- Logo de cabecera y footer: dimensiones naturales 89×32 y proporción renderizada comprobada numéricamente en 320/390/1440 px. Capturas `header-*.png` y footer por variante en `.qa/footer-final/`.
- Cuatro imágenes normalizadas hero/app A/B comparadas con PIL ImageChops: ninguna diferencia. Originales Social sin cambios.
- Los primeros intentos de navegador fallaron por ruta de caché/aislamiento de localhost; se repitieron correctamente con el navegador instalado y servidor en el mismo entorno. No se contabilizan esos fallos como pruebas aprobadas.
- No verificado en esta corrección: lector de pantalla físico, Safari/iOS físico y traducciones/RTL (web solo en español). No se declara certificación WCAG.

## Veredicto

Approve para el alcance inspeccionado. Sin hallazgos HIGH pendientes. Meta Pixel y los límites de acceso a comentarios de Figma siguen como pendientes independientes documentados; no afectan esta corrección del footer.
