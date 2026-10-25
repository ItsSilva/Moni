# Moni · Su autonomía, tu compañía

Landing de investigación ajustada a la mentoría del 20 de octubre de 2026 y al Figma aprobado. Moni Bank se presenta como proyecto académico, sin afirmar que sea una entidad financiera operativa. React, TypeScript y Vite, con funciones de Vercel y almacenamiento Redis REST de Upstash. Se conserva la identidad original de Moni: Outfit, logotipo y paleta. La tarjeta y las vistas conceptuales de la app reemplazan la mascota y el simulador anterior.

## Diseño y variantes

- [Figma A · Control de gastos](https://www.figma.com/design/Tzv22s3Pj865kCNPNwJNgS/Moni-Juan?node-id=1-2)
- [Figma B · Aprendizaje financiero](https://www.figma.com/design/Tzv22s3Pj865kCNPNwJNgS/Moni-Juan?node-id=12-259)
- A: `/?variant=a&utm_source=meta&utm_medium=paid_social&utm_campaign=moni_control&utm_content=a`
- B: `/?variant=b&utm_source=meta&utm_medium=paid_social&utm_campaign=moni_aprendizaje&utm_content=b`

Cambian encabezado, apoyo, principios, orden y copy de beneficios, explicación de la app e invitación al registro. A enfatiza control y acompañamiento; B, aprendizaje y ahorro. Producto, formulario, CTA y condiciones son comunes. Sin selector público A/B ni asignación aleatoria que altere la campaña secuencial. Primero se lanza A; después se pausa su anuncio y se activa B con su URL explícita. Sin variante explícita, se muestra A y el registro se separa como directo. No hay cambio automático por fecha. `?variant=b&test=1` permite una prueba excluida del análisis. Añadir `test=1` a todas las pruebas del equipo.

## Estado del despliegue

Proyecto Vercel **moni**, espacio **itssilvas-projects**, vinculado a `ItsSilva/Moni`. Dirección asignada: https://moni-sigma-eight.vercel.app. Contacto confirmado: **monibank.proyecto@gmail.com**. La base **moni-registros** de Upstash está conectada solo a Production, con credenciales sensibles, plan Free, región `iad1`, sin eviction ni actualización automática de plan. La apertura se controla con `VITE_REGISTRATION_ENABLED`: `false` pausa formulario y medición; `true` habilita la captación tras redesplegar. Preview y Development permanecen pausados. Antes de publicar, cada build con Redis comprueba PING, escritura Lua, lectura exacta y TTL usando una clave temporal de prueba que elimina al terminar; un fallo impide publicar ese build.

## Desplegar en Vercel

1. Importa `ItsSilva/Moni` en Vercel. Directorio raíz del repositorio, preset **Vite**, Node **22.x**, build `npm run build`, salida `dist`. `vercel.json` incluye la configuración y cabeceras de seguridad. Las funciones están en `api/`.
2. Crea o conecta una base **Upstash Redis** con API REST. Copia sus credenciales a las variables de entorno del proyecto (nunca al repositorio):

| Variable | Contenido |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` o `KV_REST_API_URL` | Endpoint HTTPS REST de la base; Marketplace usa `KV_REST_API_URL` |
| `UPSTASH_REDIS_REST_TOKEN` o `KV_REST_API_TOKEN` | Token privado de escritura/lectura del mismo par; Marketplace usa `KV_REST_API_TOKEN` |
| `LEAD_HASH_SECRET` | Secreto aleatorio de al menos 32 caracteres; mantener estable durante el estudio |
| `VITE_DATA_CONTROLLER` | Identidad real del responsable del tratamiento, acordada con el docente |
| `VITE_CONTACT_EMAIL` | Correo real para consultas, retiro de autorización y eliminación; puede ser Gmail |
| `VITE_REGISTRATION_ENABLED` | `false` pausa formulario y medición; cambiar a `true` y redesplegar al completar la conexión de almacenamiento |

Las variables `VITE_` son públicas y se incorporan al build; las demás solo viven en el servidor. Genera el secreto en tu equipo, por ejemplo `openssl rand -hex 32`. Activa las variables en Production; usa otra base para Preview o limita las pruebas a `test=1`. Al cambiar las variables públicas, vuelve a desplegar.

3. Despliega (`vercel.json` ejecuta también `scripts/check-storage.mjs`) y registra un contacto de prueba por variante. Comprueba que aparecen `moni:test:v2:lead:*` y `moni:test:v2:visit:*` en Redis. Comprueba también `moni:test:v2:event:*` al pulsar CTA, cambiar un campo, reabrir una FAQ y permanecer 10 segundos con la página visible. Después usa las URLs sin `test=1` exclusivamente para el lanzamiento real.
4. Verifica el aviso de datos con el responsable antes de abrir la captación y define fechas, presupuesto, criterios mínimos y anuncios con el docente.

La web puede desplegarse sin credenciales, pero el formulario se mantiene deshabilitado si falta responsable o contacto; el API rechaza escrituras cuando falta configuración. Nunca se confirma un registro sin que el almacenamiento responda correctamente. La base real ya está conectada. No se han creado campañas desde este repositorio. Las verificaciones del equipo deben usar `test=1`; no compartir esos enlaces como destino de anuncios.

## Correo y nombre del proyecto

No hace falta Google Workspace para el piloto académico. Una cuenta gratuita `@gmail.com` dedicada al proyecto sirve como canal de contacto. Crear en [Gmail](https://www.google.com/intl/es-419/gmail/about/) → Crear una cuenta → Para uso personal. Elegir una dirección disponible, completar la verificación de Google y activar verificación en dos pasos. El equipo confirmó la creación de `monibank.proyecto@gmail.com`.

El nombre público es **Moni Bank · Proyecto académico**. Si Moni Bank no es una persona jurídica constituida, no asumir que la marca sustituye la identificación del responsable real: definir con el docente quién asume el tratamiento y qué identidad/contacto se publicarán. `VITE_DATA_CONTROLLER` se conserva configurable; no se inventan nombres ni correos.

El buzón recibe consultas enviadas por los usuarios. Los envíos del formulario se guardan en Redis; esta implementación no envía notificaciones por email. No se necesita contraseña de Gmail en Vercel ni en el código. Un subdominio web de alojamiento no concede un dominio propio para usar en Google Workspace.

## Desarrollo y verificaciones

```sh
npm ci
npm run dev
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run dev` sirve el frontend. Para probar funciones con Redis real, usa un despliegue Preview de Vercel y `test=1`. Los tests de interfaz interceptan `/api/lead`, `/api/visit` y `/api/event`; no escriben datos reales.

El workflow **Quality and accessibility** ejecuta instalación reproducible, pruebas unitarias/API, TypeScript, build y Playwright con axe en escritorio y móvil. Revisa variantes, formularios, éxito/error, diálogos, teclado, movimiento reducido, assets y reflow a 320 px. Sus reportes y capturas están en los artefactos de Actions. La suite automatizada no equivale a una certificación WCAG: completar revisión manual con lector de pantalla y zoom antes de la campaña. Ver `ACCESSIBILITY.md`.

## Interacciones

Botones con hover/pressed y desplazamiento al formulario, tarjetas con elevación, FAQ nativo abierto inicialmente (se puede contraer), estados del formulario y diálogos de privacidad/accesibilidad con Escape y retorno de foco. Las pantallas de la app son vistas conceptuales de solo lectura con datos de demostración; no realizan operaciones financieras. Se respeta `prefers-reduced-motion`. Fuentes y SVG locales, sin trackers ni píxeles de terceros.

## Datos y metodología

- Solo correo del adulto, ciudad, disposición al pago supervisado y autorización. No se solicita ni se guarda edad, incluso si alguien la envía manualmente al API. Sin nombres, colegio, datos bancarios ni datos de identificación del menor.
- Elegible en v2: adulto cuidador, Cali y consentimiento. La propuesta sigue dirigida a familias con niños de 8–14 años, pero el formulario ya no confirma ese criterio. No presentar registros como edades verificadas. **Una respuesta “No” al medio de pago sigue siendo elegible** y se analiza por separado.
- Email normalizado a minúsculas y espacios extremos eliminados. No se fusionan alias del proveedor automáticamente.
- Deduplicación atómica por HMAC del correo; conserva el primer registro válido, su fecha y atribución. Las repeticiones aumentan `submissions`, marcan exposición cruzada y no cambian respuestas originales ni prolongan retención.
- Sin `variant=a|b`, el origen es directo y queda fuera de A/B. Los UTM se conservan sin inferir origen por fecha. No incluir correos ni datos personales dentro de UTM.
- Visitas: identificador aleatorio del navegador, con caducidad de 30 días. Cuenta una vez por variante y origen. Se conserva su HMAC en el servidor, sin IP cruda. Es una aproximación a navegadores únicos, **no personas únicas**: múltiples dispositivos, bloqueos, borrado de almacenamiento o errores pueden sesgar el denominador. Reportar faltantes y exposición cruzada.
- Registros, visitas y eventos expiran en 180 días mediante TTL. Rate limit distribuido: 10 intentos de registro por IP protegida/10 minutos; visitas y eventos 120 por tipo/10 minutos. Honeypot, validación en servidor y límite de tamaño. No sustituye protección avanzada contra bots a gran escala.
- Los registros `test=1` usan un espacio de claves y una identidad local separados de producción. Esta revisión usa `moni:live:v2:*` / `moni:test:v2:*` y aviso `moni-interest-v2`, sin mezclar datos de v1. Los registros del equipo enviados sin esta marca deben excluirse manualmente. No se guarda spam bloqueado ni se ofrece una exportación pública.
- No se carga Meta Pixel. Para CTR, inversión e impresiones, exportar Meta Ads; para visitas y contactos, usar esta base. La ejecución por semanas sigue siendo exploratoria, no evidencia causal.

## Exportar resultados

En tu equipo, crea `.env.local` con las credenciales privadas y un directorio `exports`. Ejecuta:

```sh
mkdir -p exports
node --env-file=.env.local scripts/export-results.mjs ./exports/resultados.json
```

La exportación omite correos por defecto, separa tráfico directo y reporta visitantes por variante, permanencia de al menos 10 segundos visibles, navegadores que pulsan CTA (total y por ubicación), inicio de formulario, apertura de FAQ, registros elegibles, duplicados, exposición cruzada, ineligibles, registros sin visita y conversión. Los eventos se deduplican por navegador, variante, origen, acción y ubicación: son navegadores que realizaron una acción, no el total de clics ni sesiones. El registro confirmado procede del API de contactos, no de un evento del navegador. Los eventos no guardan valores escritos en el formulario. Para gestionar contactos de forma privada puedes añadir `--include-contacts`. No subir exportaciones al repositorio público; `exports/` está ignorado. Cada exportación mantiene su propia retención bajo responsabilidad del equipo y debe borrarse al cumplir el plazo.

Antes de usar cifras finales: excluir contactos del equipo y spam detectado, documentar interrupciones, revisar visitantes faltantes, cruzar inversión y fechas de Meta. CTR = clics/impresiones; conversión = registros elegibles/visitantes; costo por registro = inversión/registros elegibles. Con cero denominador: no calculable. Guardar exportaciones antes de que expire el TTL.

## Solicitudes sobre datos

Para retirar un contacto, ejecuta `node --env-file=.env.local scripts/delete-contact.mjs` y proporciona el correo por entrada estándar; termina con EOF. El script elimina el registro de contacto de prueba y de producción. Revisar también exportaciones privadas y copias administradas por el equipo. Para acceso/corrección, usar el panel privado de Redis y el contacto publicado. Los identificadores de visitas separados no incluyen el correo.

## Fuentes técnicas

[Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite), [API REST de Upstash](https://upstash.com/docs/redis/features/restapi), [Lua/EVAL](https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval).
