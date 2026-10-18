# Moni · Su autonomía, tu compañía

Landing de investigación ajustada a la tercera mentoría. React, TypeScript y Vite, con funciones de Vercel y almacenamiento Redis REST de Upstash. Se conserva la identidad original de Moni: Outfit, logotipo, mascota y paleta.

## Diseño y variantes

- [Figma A · Control de gastos](https://www.figma.com/design/Tzv22s3Pj865kCNPNwJNgS/Moni-Juan?node-id=1-2)
- [Figma B · Aprendizaje financiero](https://www.figma.com/design/Tzv22s3Pj865kCNPNwJNgS/Moni-Juan?node-id=12-259)
- A: `/?variant=a&utm_source=meta&utm_medium=paid_social&utm_campaign=moni_control&utm_content=a`
- B: `/?variant=b&utm_source=meta&utm_medium=paid_social&utm_campaign=moni_aprendizaje&utm_content=b`

Cambian encabezado, apoyo y orden de beneficios. Producto, formulario, CTA, condiciones, demo e interacciones son comunes. Sin selector público A/B ni asignación aleatoria que altere la campaña secuencial. Sin variante explícita, se muestra A y el registro se separa como directo. `?variant=b&test=1` permite una prueba excluida del análisis. Añadir `test=1` a todas las pruebas del equipo.

## Desplegar en Vercel

1. Importa `ItsSilva/Moni` en Vercel. Directorio raíz del repositorio, preset **Vite**, Node **22.x**, build `npm run build`, salida `dist`. `vercel.json` incluye la configuración y cabeceras de seguridad. Las funciones están en `api/`.
2. Crea o conecta una base **Upstash Redis** con API REST. Copia sus credenciales a las variables de entorno del proyecto (nunca al repositorio):

| Variable | Contenido |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Endpoint HTTPS REST de la base |
| `UPSTASH_REDIS_REST_TOKEN` | Token privado de escritura/lectura |
| `LEAD_HASH_SECRET` | Secreto aleatorio de al menos 32 caracteres; mantener estable durante el estudio |
| `VITE_DATA_CONTROLLER` | Nombre real de la persona o equipo responsable de los registros |
| `VITE_CONTACT_EMAIL` | Correo real para consultas, retiro de autorización y eliminación |

Las dos variables `VITE_` son públicas y se incorporan al build; las demás solo viven en el servidor. Genera el secreto en tu equipo, por ejemplo `openssl rand -hex 32`. Activa las variables en Production; usa otra base para Preview o limita las pruebas a `test=1`. Al cambiar las variables públicas, vuelve a desplegar.

3. Despliega y registra un contacto de prueba por variante. Comprueba que aparecen `moni:test:lead:*` y `moni:test:visit:*` en Redis. Después visita las URLs de campaña sin `test=1` para el lanzamiento real.
4. Verifica el aviso de datos con el responsable antes de abrir la captación y define fechas, presupuesto, criterios mínimos y anuncios con el docente (pendiente V5 del documento).

La web puede desplegarse sin credenciales, pero el formulario se mantiene deshabilitado si falta responsable o contacto; el API rechaza escrituras cuando falta configuración. Nunca se confirma un registro sin que el almacenamiento responda correctamente. No se ha conectado una base real ni se han creado campañas desde este repositorio.

## Desarrollo y verificaciones

```sh
npm ci
npm run dev
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run dev` sirve el frontend. Para probar funciones con Redis real, usa un despliegue Preview de Vercel y `test=1`. Los tests de interfaz interceptan `/api/lead` y `/api/visit`; no escriben datos reales.

El workflow **Quality and accessibility** ejecuta instalación reproducible, pruebas unitarias/API, TypeScript, build y Playwright con axe en escritorio y móvil. Revisa variantes, formularios, éxito/error, diálogos, teclado, movimiento reducido, assets y reflow a 320 px. Sus reportes y capturas están en los artefactos de Actions. La suite automatizada no equivale a una certificación WCAG: completar revisión manual con lector de pantalla y zoom antes de la campaña. Ver `ACCESSIBILITY.md`.

## Interacciones

Botones con hover/pressed, entrada de mascota, tarjetas con elevación, FAQ nativo, pestañas Gastos/Ahorro, acuerdo semanal con teclado, progreso ilustrativo, estados del formulario y diálogos de privacidad/accesibilidad con Escape y retorno de foco. Se respeta `prefers-reduced-motion`. Fuentes y SVG locales, sin trackers ni píxeles de terceros.

## Datos y metodología

- Solo correo del adulto, ciudad, rango de edad, disposición al pago supervisado y autorización. Sin nombres, colegio, datos bancarios ni datos de identificación del menor.
- Elegible: adulto cuidador, Cali, menor 8–14 y consentimiento. **Una respuesta “No” al medio de pago sigue siendo elegible** y se analiza por separado.
- Email normalizado a minúsculas y espacios extremos eliminados. No se fusionan alias del proveedor automáticamente.
- Deduplicación atómica por HMAC del correo; conserva el primer registro válido, su fecha y atribución. Las repeticiones aumentan `submissions`, marcan exposición cruzada y no cambian respuestas originales ni prolongan retención.
- Sin `variant=a|b`, el origen es directo y queda fuera de A/B. Los UTM se conservan sin inferir origen por fecha. No incluir correos ni datos personales dentro de UTM.
- Visitas: identificador aleatorio del navegador, con caducidad de 30 días. Cuenta una vez por variante y origen. Se conserva su HMAC en el servidor, sin IP cruda. Es una aproximación a navegadores únicos, **no personas únicas**: múltiples dispositivos, bloqueos, borrado de almacenamiento o errores pueden sesgar el denominador. Reportar faltantes y exposición cruzada.
- Registros y visitas expiran en 180 días mediante TTL. Rate limit distribuido: 10 intentos de registro por IP protegida/10 minutos; visitas 120/10 minutos. Honeypot, validación en servidor y límite de tamaño. No sustituye protección avanzada contra bots a gran escala.
- Los registros `test=1` usan un espacio de claves separado. Los registros del equipo enviados sin esta marca deben excluirse manualmente. No se guarda spam bloqueado ni se ofrece una exportación pública.
- No se carga Meta Pixel. Para CTR, inversión e impresiones, exportar Meta Ads; para visitas y contactos, usar esta base. La ejecución por semanas sigue siendo exploratoria, no evidencia causal.

## Exportar resultados

En tu equipo, crea `.env.local` con las credenciales privadas y un directorio `exports`. Ejecuta:

```sh
mkdir -p exports
node --env-file=.env.local scripts/export-results.mjs ./exports/resultados.json
```

La exportación omite correos por defecto, separa tráfico directo y reporta visitantes por variante, registros elegibles, duplicados, exposición cruzada, ineligibles, registros sin visita y conversión. Para gestionar contactos de forma privada puedes añadir `--include-contacts`. No subir exportaciones al repositorio público; `exports/` está ignorado. Cada exportación mantiene su propia retención bajo responsabilidad del equipo y debe borrarse al cumplir el plazo.

Antes de usar cifras finales: excluir contactos del equipo y spam detectado, documentar interrupciones, revisar visitantes faltantes, cruzar inversión y fechas de Meta. CTR = clics/impresiones; conversión = registros elegibles/visitantes; costo por registro = inversión/registros elegibles. Con cero denominador: no calculable. Guardar exportaciones antes de que expire el TTL.

## Solicitudes sobre datos

Para retirar un contacto, ejecuta `node --env-file=.env.local scripts/delete-contact.mjs` y proporciona el correo por entrada estándar; termina con EOF. El script elimina el registro de contacto de prueba y de producción. Revisar también exportaciones privadas y copias administradas por el equipo. Para acceso/corrección, usar el panel privado de Redis y el contacto publicado. Los identificadores de visitas separados no incluyen el correo.

## Fuentes técnicas

[Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite), [API REST de Upstash](https://upstash.com/docs/redis/features/restapi), [Lua/EVAL](https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval).
