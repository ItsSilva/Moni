# GA4 y Meta · guía de continuidad

Actualizado: 29/10/2026. Alcance vigente: medición de visitas, modal inicial y ampliación autorizada del selector de ciudades con validación de servidor; los demás contratos del formulario se conservan.

## Activos reales

| Servicio | Configuración |
| --- | --- |
| Google Analytics | Según captura del usuario del 29/10: cuenta `413978908`, propiedad `561416665`; recepción aún no comprobada |
| Flujo web | «Moni · Web» `16231236814` según captura; sitio `https://moni-sigma-eight.vercel.app` |
| GA4 ID público vigente | `G-LZQ06TMWJ0`, suministrado por la compañera el 29/10 |
| Región de informes | Pendiente de confirmar en la nueva propiedad |
| Meta portfolio | «Moni Bank» `2541299039710328` |
| Meta dataset/píxel | «Moni · Landing» `1002049382950703` |

El usuario aceptó los términos de Google y autorizó expresamente la aceptación de las condiciones de Meta. No se crearon campañas, presupuestos, CAPI ni credenciales. La cuenta publicitaria personal mostrada en Meta no se asoció por inferencia al portfolio.

Histórico de Google (28/10): cuenta «Moni» `413709066`, propiedad «Moni · Landing» `561084377`, flujo «Moni · Web» `16222575128`, ID `G-PTJVQQ1KM2`, Colombia/COP. Allí se desactivó la medición mejorada, incluida la automática de formularios, y se desmarcaron las opciones de compartir datos. Estos ajustes no se trasladan por cambiar el ID en Vercel. La captura aportada el 29/10 muestra medición mejorada desactivada en `G-LZQ06TMWJ0`; la prueba con su SDK real no emitió formularios ni visitas duplicadas. Las opciones de compartir datos de la cuenta nueva no se inspeccionaron. Meta: categoría «Servicio financiero», coincidencias avanzadas automáticas desactivadas y seguimiento automático de eventos sin código desactivado. No retirar las restricciones de categoría para obtener más datos.

## Qué mide cada sistema

- Redis conserva la medición propia existente y los registros realmente guardados, con deduplicación. Es la fuente de resultados del estudio.
- El código envía a GA4 un `page_view` manual por carga, con variante/UTM permitidos en `page_location`. Su SDK puede añadir metadatos estándar de sesión/usuario. El código no envía eventos de formulario ni valores de campos; mantener desactivados los ajustes automáticos del flujo indicados arriba.
- Meta recibe un `PageView` por carga. La configuración básica/restricciones del proveedor pueden reducir URL/parámetros. No asumir que Meta conserva `variant` o UTM exactamente como Redis.
- **No se envían `Lead`, `CompleteRegistration` ni `generate_lead`.** Un clic, intento o respuesta duplicada no es un alta nueva. La guía local de Gemini solicitaba etiquetas base; no definía una conversión válida.

Las cifras de Redis, GA4 y Meta no serán iguales: consentimiento, bloqueadores, identidades, retención, ventanas de atribución y restricciones son diferentes. El aviso opcional aparece como modal inicial desde el 29/10; quienes rechazan o bloquean las etiquetas no se miden con terceros. No interpretar esa muestra como el total de visitantes ni sustituir con ella el denominador propio del estudio.

## Consentimiento y límites

`MeasurementConsent.tsx` muestra un modal inicial y ofrece aceptar, rechazar o elegir GA4/Meta por separado. El fondo queda inerte mientras está abierto; cualquiera de las decisiones permite continuar. Cerrar/Escape sin decisión guarda rechazo. No se exige aceptar para ver la web ni registrarse. Los consentimientos/negativas anteriores se respetan. «Preferencias de medición» permite cambiar la decisión. Se guarda durante 180 días en `moni-measurement-v1`; la medición propia mantiene su identidad y retención existentes. El aviso complementario tiene versión `moni-measurement-v1`; el consentimiento de registro y `NOTICE_VERSION=moni-interest-v2` conservan su finalidad y contrato.

Sin consentimiento no se solicitan scripts, imágenes ni pings de Google/Meta. Al retirarlo se comunica la revocación, se deshabilita GA y se eliminan cookies propias conocidas de los proveedores cuando el navegador lo permite; no se recarga la página ni se borra lo escrito. La elección se sincroniza entre pestañas y se comprueba al volver a la página. Retirar el permiso no elimina retroactivamente información ya enviada.

Las etiquetas se excluyen con **cualquier parámetro `test`**, aunque exista una autorización anterior. También se excluyen en otros hosts/rutas, con parámetros desconocidos, valores que no cumplan el formato de campaña o fragmentos desconocidos. Los valores UTM deben usar letras ASCII, números, guiones, puntos, guion bajo o `~`, sin espacios ni datos personales. GA recibe una URL filtrada y referrer vacío; Meta puede tratar información técnica y de navegación según sus controles. No introducir nunca correos u otros datos personales en URL, UTM o referrer.

## Vercel

Variables públicas en **Production**:

```text
VITE_MEASUREMENT_ENABLED=true
VITE_MEASUREMENT_HOST=moni-sigma-eight.vercel.app
VITE_GA4_MEASUREMENT_ID=G-LZQ06TMWJ0
VITE_META_PIXEL_ID=1002049382950703
```

Los cambios de variables requieren un despliegue. Por solicitud del usuario, **solo el ID de GA4** también está en Preview y Development; esos entornos siguen sin la activación de medición ni las credenciales de Redis productivo. Para pausar terceros, establecer `VITE_MEASUREMENT_ENABLED=false` y desplegar. No tocar `VITE_REGISTRATION_ENABLED` para pausar solamente analíticas.

La CSP permite únicamente los orígenes requeridos de Google/Meta. Conserva el build con `check-storage.mjs`, las cabeceras existentes y las restricciones de scripts; no añade `unsafe-inline`, `unsafe-eval` ni un comodín `https:` a scripts. No instalar además los snippets en `index.html`, GTM o otra integración: duplicaría eventos y podría eludir consentimiento.

## Enlaces para la compañera que prepara campañas

Ejemplos para tráfico real (primero A, después B):

```text
https://moni-sigma-eight.vercel.app/?variant=a&utm_source=instagram&utm_medium=paid_social&utm_campaign=moni_control&utm_content=reel_1
https://moni-sigma-eight.vercel.app/?variant=b&utm_source=instagram&utm_medium=paid_social&utm_campaign=moni_ahorro&utm_content=reel_2
```

Para QA del equipo añadir `&test=1` y usar únicamente datos ficticios `example.com`. No copiar ese parámetro al anuncio final. `variant` debe ser explícito para que la atribución propia reconozca la campaña; `utm_content=B` por sí solo no selecciona B.

## Verificación y pendientes

- 29/10: ID de GA4 actualizado en los tres entornos y redeploy READY del código `a63e69c`; comprobación Redis del build correcta. Formulario A/escritorio y B/móvil verificado con registros ficticios `test=1`: guardado HTTP 200, sin solicitudes a Google/Meta ni errores de página. El cambio de ID no modifica el código de la web. Las verificaciones siguientes se actualizaron posteriormente con el modal y el catálogo nacional.

- 29/10, modal y ciudades: 48 pruebas unitarias/API; 36 E2E escritorio/móvil, con proveedores y APIs simulados. Incluyen categorías independientes, rechazo, revocación durante carga, exclusión QA, ausencia de campos/conversiones y formulario operativo con proveedores bloqueados.
- Build TypeScript/Vite correcto. El selector de ciudad y su validación de servidor se ampliaron con DIVIPOLA. Los demás campos, consentimiento de registro, deduplicación, retención, atribución, contenido de variantes, pantallas, personajes y CSS del producto se conservan. Ver [catálogo](colombia-places.md).
- Prueba adicional repetida el 29/10 con `G-LZQ06TMWJ0`, bundle en localhost, SDK reales y CSP real: un `page_view` GA4 y un `PageView` Meta observados e interceptados antes de enviarse; sin errores de consola/CSP ni datos del formulario. El perfil HeadlessChrome es filtrado por Meta; la comprobación usa el perfil estándar Desktop Chrome de Playwright.
- Revisión de interfaz nueva: controles nativos, nombres accesibles, Escape y devolución de foco; sin desbordamiento a 320 px ni infracciones axe en reglas ejecutadas. Sin animaciones nuevas. No se certifica accesibilidad total ni prueba manual de lector de pantalla.
- **Pendiente: confirmar recepción en los paneles de Google y Meta con tráfico real consentido o un entorno de diagnóstico separado autorizado.** Las pruebas interceptadas confirman la emisión, no la recepción. No quitar `test=1` a un envío QA para hacer aparecer datos en los paneles.
- **Pendiente si se necesita optimizar anuncios por registros:** acordar definición de conversión y señal segura de persistencia/deduplicación; implementarla como tarea separada. La API pública seguirá sin revelar si un correo ya existía.
- La responsable de campañas debe verificar sus permisos sobre estos activos y la cuenta publicitaria correcta. No se amplió acceso de personas, no se vinculó una cuenta por inferencia y no se activaron anuncios.

Evidencias locales privadas en `.qa/measurement/` y `test-results/`; no publicar originales de Social, credenciales, trazas de sesión ni contactos reales.

Referencias: [consentimiento de Google](https://developers.google.com/tag-platform/security/guides/consent), [CSP de Google](https://developers.google.com/tag-platform/security/guides/csp), [Meta Pixel](https://developers.facebook.com/docs/meta-pixel/). La documentación de Meta devolvió 429 durante esta sesión; el código y los ajustes se comprobaron en Events Manager y con su SDK oficial.

## Diagnóstico del aviso de Google (29/10)

La etiqueta ya existía y Vercel contenía `G-LZQ06TMWJ0`. El snippet pegado en el chat apuntaba al flujo anterior `G-PTJVQQ1KM2`, distinto al de la captura. No añadirlo: produciría medición en otra propiedad y una segunda instalación sin el consentimiento existente.

El aviso anterior al pie de página requería que las personas llegaran hasta él y aceptaran. Esto puede explicar ausencia de tráfico consentido, pero no demuestra la causa exclusiva del aviso de Google. Se sustituyó por un modal inicial. La comprobación con SDK oficial observó una solicitud `g/collect` con `tid=G-LZQ06TMWJ0` y `en=page_view`, después de aceptar, sin errores de consola/CSP; solicitudes interceptadas antes del proveedor. Sin aceptar, al rechazar y con `test` no se carga Google.

Para confirmar recepción, la responsable debe consultar Tiempo real del flujo correcto durante tráfico real consentido. Las visitas de QA del equipo siguen con `test=1` y no aparecerán en Google. No quitar ese parámetro para fabricar resultados ni declarar que el mensaje del panel desapareció sin verlo. Las decisiones previas se respetan; se pueden cambiar en el footer. Las campañas deben usar enlaces explícitos de variante y UTM admitidos por `measurement-policy.ts`.
