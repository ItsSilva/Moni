# Instrucciones para trabajar en Moni

Lee README.md completo antes de cambiar la web. Es el documento de continuidad del proyecto y contiene accesos, arquitectura, metodología, pruebas, despliegue y pendientes.

## Alcance y continuidad

- Mejora visual de ambas landings; conservar la implementación funcional existente.
- La web es un proyecto académico de interés/lista de espera, no un banco operativo.
- Decisión pública vigente del usuario (26/10/2026): no mostrar la etiqueta «proyecto académico» ni sus variantes en la web, metadatos o responsable público. Conservar la transparencia sobre investigación, consentimiento, propuesta de producto y condiciones de lista de espera. Las menciones históricas de la documentación no deben restaurar esa etiqueta pública.
- El logo de cabecera/footer es ahora `public/moni-logotype.png`, exportado por el usuario como `../LogotipoMoni.png` y recortado solo en su margen transparente. Mantener su proporción 89:32 y `height: auto`. El logo SVG del producto protegido permanece intacto.
- Referencias: Nu Cuenta y Revolut Kids & Teens, enlazadas en README. No copiar marca, assets o afirmaciones comerciales.
- Revisar primero los videos y posts de la carpeta local `Social` del usuario. No se presupone que esté en GitHub. Si falta, pedir su ruta mientras se avanza en lectura técnica independiente.
- No publicar, mover, sobrescribir o modificar originales de Social.

## Restricciones prioritarias del usuario

- Conservar logo, Outfit, paleta y estilo gráfico de Moni.
- No rediseñar la interfaz de app ni la tarjeta presentes en los anuncios. Proteger `src/ProductPreview.tsx`, `public/moni-logo.svg`, `public/product/` y los estilos de producto en `src/styles.css`.
- Un cambio de CSS global puede modificar la app sin cambiar el componente. Comparar pantallas antes/después y contra Social.
- Se permite mejorar composición externa, espaciado y escala uniforme responsive; no cambiar estructura, rótulos, cifras, colores, iconos o controles internos del producto.
- Los hashes de `docs/product-baseline.json` ayudan a detectar cambios, pero no reemplazan QA visual.
- Mantener hipótesis A (control/acompañamiento) y B (aprendizaje/ahorro). Primero A, después B; sin asignación aleatoria ni cambio automático. Default A; `?variant=b` muestra B.
- Formularios, CTA y condiciones comparables en ambas variantes. No reintroducir edades, nombres de menores o datos bancarios.

## Skills

Están instaladas en `.agents/skills/` con licencias y origen en `docs/skills-lock.json`:

- `design-taste-frontend` (Taste Skill).
- `better-interface` y sus dependencias `better-accessibility`, `better-layout`, `better-writing`, `better-typography`, `better-colors`, `better-ui`.
- `find-animation-opportunities` (análisis de oportunidades; no implementación de código en esa fase).

Leer las instrucciones relevantes completas. La identidad, el producto protegido, el copy de la hipótesis, la accesibilidad y la privacidad prevalecen sobre preferencias de las skills. Con Taste mantener paleta/tipografía; no rediseñar la app ni añadir cuotas de imágenes o movimiento. Registrar excepciones sin fingir que las herramientas aprobaron controles que fallaron. No ejecutar scripts auxiliares de terceros sin revisar su propósito y dependencias. No migrar de stack por seguir ejemplos de una skill.

## Funcionalidad que debe permanecer

- React + TypeScript + Vite; APIs en `api/`; Redis REST en servidor.
- Conservar compatibilidad de pares `KV_REST_API_*` y `UPSTASH_REDIS_REST_*`; nunca mezclar tokens.
- Guardado real antes de éxito, errores recuperables, validación, honeypot, rate limits y deduplicación Lua atómica.
- No exponer si un correo ya existe ni crear una exportación pública.
- No rotar `LEAD_HASH_SECRET` durante el estudio ni borrar registros reales para probar.
- Production habilitado; Preview/Development pausados sin Redis productivo. Cambios de env necesitan redeploy.
- Todo QA del equipo lleva `test=1`; correos ficticios de `example.com`. Test comparte base/cuota/rate limit, aunque usa claves e identidad separadas.
- No introducir valores de formulario en eventos, UTM, logs o capturas públicas.
- Mantener `prefers-reduced-motion: reduce` sin animaciones/transiciones ni scroll suave.

## Verificación y entrega

- Antes: comprobar HEAD, cambios existentes, A/B y línea base visual.
- Pruebas: `npm test`, `npm run build`, `npm run test:e2e` con Chromium instalado. No reescribir tests para aceptar regresiones.
- Vite local no ejecuta las funciones. E2E simula endpoints; el build Vercel ejecuta `scripts/check-storage.mjs` con Redis real.
- Comprobar móvil/escritorio, 320 px, teclado, formulario, diálogos y screenshots de ambas variantes.
- Antes de publicar: diff revisado, producto intacto, contratos preservados. Ya existe autorización del usuario para cambios acordados en main y despliegue del proyecto existente. No force push ni sobrescritura de cambios ajenos.
- Después: comprobar SHA, READY, storage check, URL estable y registros A/B de prueba. No basta con ver el build verde.
- Actualizar README si cambian configuración o comportamiento. Informar pruebas no realizadas y accesos faltantes con precisión.

## Meta y datos

Meta Pixel está pendiente. No confundir UTM/medición en Redis con conversiones enviadas a Meta. Seguir el plan del README: ID real, consentimiento separado, aviso actualizado, CSP limitada, exclusión de QA y evento solo después de persistencia. La respuesta pública actual no distingue nuevos/duplicados; no exponer esa diferencia para implementar Pixel. No activar advanced matching, CAPI, presupuestos o campañas por inferencia.

El correo del proyecto es público; credenciales y exportaciones son privadas. No subir `.env`, `.vercel`, exports, originales de Social o tokens. Los permisos de servicios deben comprobarse en cada entorno: el README y las skills no transfieren sesiones autenticadas.
