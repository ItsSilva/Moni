# Moni · Su autonomía, tu compañía

> **Continuidad para cualquier modelo o agente de IA — actualizado el 28 de octubre de 2026 (medición opcional, sección 18).**
> **Landing v2:** por decisión explícita de la usuaria, la web adopta el lenguaje de las piezas de redes (bloques de palabra, personajes con ojos, tarjeta coral con ojos) y las pantallas de la app C «Equilibrio». El H1 aprobado es «Su primera tarjeta débito.» + «Tú acuerdas sus límites.» (A) / «Aprende a ahorrar contigo.» (B). Diseño en Figma, página «Landing v2 · Redes + App C» (`127:788`). Las secciones 5.3 y 10.1 reemplazan la protección y el copy anteriores.
> **Estado anterior (26/10):** ambas landings están rediseñadas y publicadas. A es la predeterminada; B requiere `?variant=b`. Cabecera y footer usan el SVG vectorial nuevo; el footer no contiene contacto. No mostrar «proyecto académico» en la web ni restaurar esa etiqueta desde versiones anteriores de Figma o documentación.
> **Medición opcional (28/10):** GA4 y Meta configurados para visitas con consentimiento separado, sin cambios al formulario. IDs reales, límites de verificación y pendientes en la sección 18 y en [la guía de medición](docs/measurement-setup.md). Las auditorías anteriores son evidencia fechada, no prueba de recepción de eventos actuales.

Este documento permite continuar sin el chat original. Describe producto, decisiones, archivos, servicios, pruebas y pendientes. No contiene secretos ni transfiere credenciales. Las instrucciones vigentes del usuario determinan el alcance: los ejemplos de tareas futuras no autorizan su ejecución.

La landing valida interés en una propuesta de tarjeta y app; no representa un banco operativo. El contexto académico se conserva en la documentación interna, mientras la web mantiene información sobre investigación, consentimiento, propuesta de producto y lista de espera. Las secciones 1–24 describen el estado vigente y procedimientos; las 25–26 son historial fechado, no tareas por repetir.

## Índice

1. [Arranque para cualquier IA](#1-arranque-para-cualquier-ia)
2. [Contexto y decisiones](#2-contexto-y-decisiones)
3. [Recursos, conexiones y permisos](#3-recursos-conexiones-y-permisos)
4. [Estado verificado y límites de la evidencia](#4-estado-verificado-y-límites-de-la-evidencia)
5. [Reglas visuales que no se negocian](#5-reglas-visuales-que-no-se-negocian)
6. [Carpeta Social y continuidad de campaña](#6-carpeta-social-y-continuidad-de-campaña)
7. [Referencias Nu y Revolut](#7-referencias-nu-y-revolut)
8. [Skills instaladas y orden de trabajo](#8-skills-instaladas-y-orden-de-trabajo)
9. [Dirección del rediseño por sección](#9-dirección-del-rediseño-por-sección)
10. [Variantes A/B y enlaces](#10-variantes-ab-y-enlaces)
11. [Arquitectura y mapa de archivos](#11-arquitectura-y-mapa-de-archivos)
12. [Desarrollo local y entornos](#12-desarrollo-local-y-entornos)
13. [Variables y secretos](#13-variables-y-secretos)
14. [Formulario y contratos API](#14-formulario-y-contratos-api)
15. [Redis, retención y deduplicación](#15-redis-retención-y-deduplicación)
16. [Medición y análisis del estudio](#16-medición-y-análisis-del-estudio)
17. [Exportación y solicitudes sobre datos](#17-exportación-y-solicitudes-sobre-datos)
18. [GA4 y Meta: medición opcional](#18-ga4-y-meta-medición-opcional)
19. [Accesibilidad, rendimiento y seguridad](#19-accesibilidad-rendimiento-y-seguridad)
20. [Pruebas y criterios de aceptación](#20-pruebas-y-criterios-de-aceptación)
21. [Publicación, pausa y recuperación](#21-publicación-pausa-y-recuperación)
22. [Plan de ejecución y pendientes](#22-plan-de-ejecución-y-pendientes)
23. [Prompt listo para retomar](#23-prompt-listo-para-retomar)
24. [Fuentes y trazabilidad](#24-fuentes-y-trazabilidad)
25. [Historial del rediseño](#25-entrega-visual-del-25-de-octubre-de-2026)
26. [Historial de footer y logotipo](#26-corrección-de-presentación-pública-y-footer--26-de-octubre-de-2026)

## 1. Arranque para cualquier IA

1. Leer completos [README.md](README.md) y [AGENTS.md](AGENTS.md), aunque el modelo no cargue automáticamente archivos de instrucciones. Leer también [skills-lock](docs/skills-lock.json) y [product-baseline](docs/product-baseline.json). Confirmar la tarea actual del usuario; no ejecutar pendientes por inferencia.
2. Inspeccionar la carpeta abierta antes de clonar o editar. La distribución local es `Moni Back App/Moni` (repositorio), `Moni Back App/Social` (referencias privadas) y los exports `Logotipo.svg` / `LogotipoMoni.png` junto a esas carpetas. Desde el repo, Social es `../Social`.
3. Si no existe copia, clonar `https://github.com/ItsSilva/Moni.git` en la subcarpeta libre `Moni`. Nunca clonar sobre la carpeta padre no vacía ni mover/borrar Social. Si existe, revisar `git status --short`, `git branch --show-current`, `git log -1 --oneline` y `git remote -v`; comprobar `origin/main`. Con el árbol limpio y `main` sin divergencia, `git pull --ff-only origin main` actualiza sin reescribir historia. Con cambios o divergencia, preservarlos y resolver el caso antes de integrar; no usar reset/clean/force push.
4. Confirmar conexiones disponibles para la operación: GitHub, Vercel y Figma no heredan permisos del chat anterior. La sección 3 distingue lectura, edición y comentarios. Si solo se cambia documentación, no hace falta editar diseños ni consultar datos personales.
5. Leer los archivos relacionados con la tarea según la sección 11. Para una revisión visual integral, leer las nueve skills y sus referencias aplicables; para un ajuste acotado, las instrucciones pertinentes. Las skills están en archivos y pueden utilizarse aunque otro modelo no tenga integración automática.
6. Antes de cambios visuales, capturar A/B en móvil/escritorio con `test=1`, revisar Social cuando afecte identidad/producto y distinguir estado publicado de Figma. Aplicar las restricciones de la sección 5; usar el flujo 5.5 si el usuario pide expresamente modificar pantallas.
7. Implementar solo el alcance solicitado, verificar con las pruebas de la sección 20 y revisar el diff. No alterar API, datos, atribución, infraestructura o producto como efecto secundario.
8. Publicar cambios autorizados mediante el flujo de la sección 21 y entregar evidencia correspondiente al cambio. Actualizar este documento si cambia configuración, comportamiento, fuente de referencia o procedimiento. Declarar lo no comprobado.

**Puntos de entrada:** cambio de landing → secciones 5, 8, 9, 11 y 20; cambio de pantallas/Figma → 3.4 y 5.5; formulario/datos → 13–17; Meta Pixel → 18; despliegue → 21. El prompt de la sección 23 permite concretar una nueva tarea sin depender de Codex.

## 2. Contexto y decisiones

### 2.1 Qué es Moni

Moni es una propuesta académica de tarjeta débito y app para que padres, madres y cuidadores acompañen el aprendizaje y uso del dinero de niños y niñas de **8 a 14 años**. La investigación inicial se enfoca en familias de **Cali, Colombia**.

La página busca validar interés mediante una lista de espera. No abre cuentas, emite tarjetas, recibe depósitos, cobra dinero ni garantiza participación en un piloto. Las pantallas del producto son conceptuales y sus cifras son de demostración.

### 2.2 Dirección de producto vigente

Mantener y mejorar la calidad de ejecución de la landing: que se perciba cuidada, coherente, clara, profesional y propia de Moni. La referencia bancaria se aplica al nivel de diseño y a la claridad de la comunicación; no autoriza inventar licencias, respaldo financiero, alianzas, métricas comerciales o funcionalidades operativas.

El usuario ya creó videos para publicidad y publicaciones de Instagram. La web debe ser la continuación visual de esas piezas. No se busca renovar la identidad de marca ni diseñar una app nueva.

### 2.3 Decisiones ya tomadas

| Tema | Decisión vigente |
| --- | --- |
| Nombre público | Moni Bank |
| Contacto | `monibank.proyecto@gmail.com`, solo en avisos de privacidad/accesibilidad; sin bloque de contacto en footer |
| Dominio | Subdominio de Vercel; no consta dominio propio adquirido |
| Variantes | A: control y acompañamiento; B: aprendizaje y ahorro |
| Secuencia | Primero A; luego B; sin reparto aleatorio ni cambio automático |
| Público del formulario | Solo adultos cuidadores |
| Datos de menores | No solicitarlos ni incorporarlos a eventos |
| Identidad visual | Conservar Outfit, logo, paleta y estilo del producto |
| App de demostración | Pantallas de la app C «Equilibrio» (Figma `101:2547`) exportadas a `public/app/` y tarjeta coral con ojos de las piezas de redes; decisión de la usuaria del 27/10/2026 que resuelve la discrepancia de la sección 6 |
| Lenguaje visual (v2) | Campaña arriba (hero y registro con bloques de palabra y personajes), reglas de la app C abajo: un bloque saturado por sección, tintes para guiar, familia sobria en navy |
| Encabezado A/B (v2) | Rótulo común «Su primera tarjeta débito.» en texto blanco; el H1 grande es la hipótesis: «Tú acuerdas sus límites.» (A) / «Aprende a ahorrar contigo.» (B), misma estructura y colores |
| Backend | Funciones de Vercel y Upstash Redis REST; ya operativo |
| Canal publicitario previsto | Meta Ads; las campañas se administran fuera de este repositorio |
| GA4 y Meta Pixel | Visitas con consentimiento separado; conversiones de registro pendientes. Ver sección 18 |
| Correo transaccional | No implementado; el formulario guarda en Redis |
| Publicación | El usuario autorizó cambios y correcciones en `main` y despliegues del proyecto |

### 2.4 Evolución que no debe deshacerse

Se pasó de una idea de página estática con medición desde Meta Ads a una landing con registro propio y medición de primera parte. Se incorporó el feedback de mentoría/Figma a ambas variantes respetando su copy. La versión vigente centra el relato en tarjeta y app, y ya no utiliza la mascota ni el simulador anterior.

Se habilitó el almacenamiento real después de comprobar su funcionamiento. Se añadió compatibilidad con las variables `KV_REST_API_*` que Vercel Marketplace inyecta al conectar Upstash. No volver a una implementación que acepte únicamente nombres `UPSTASH_REDIS_REST_*`.

El chat refiere una mentoría y comentarios de Figma. No se adjuntan aquí una transcripción íntegra ni un inventario verificado de todos los comentarios; no inventar citas del docente ni dar comentarios por resueltos sin leerlos. Los contenidos actuales de Figma, del código y de Social deben contrastarse antes del siguiente rediseño.

## 3. Recursos, conexiones y permisos

### 3.1 Enlaces principales

| Recurso | Enlace / identificador | Uso |
| --- | --- | --- |
| GitHub | [ItsSilva/Moni](https://github.com/ItsSilva/Moni) | Fuente de código; repositorio público |
| Rama de producción | [main](https://github.com/ItsSilva/Moni/tree/main) | Conectada al despliegue automático |
| Vercel | [itssilvas-projects / moni](https://vercel.com/itssilvas-projects/moni) | Configuración, variables, builds y logs |
| Web | [moni-sigma-eight.vercel.app](https://moni-sigma-eight.vercel.app/) | URL estable para la landing |
| Figma completo | [Moni-Juan](https://www.figma.com/design/Tzv22s3Pj865kCNPNwJNgS/Moni-Juan?node-id=0-1) | Archivo del diseño y sus comentarios |
| Figma A | [Control de gastos, nodo 1:2](https://www.figma.com/design/Tzv22s3Pj865kCNPNwJNgS/Moni-Juan?node-id=1-2) | Variante A documentada en el repositorio |
| Figma B | [Aprendizaje financiero, nodo 12:259](https://www.figma.com/design/Tzv22s3Pj865kCNPNwJNgS/Moni-Juan?node-id=12-259) | Variante B documentada en el repositorio |
| GitHub Actions | [Quality and accessibility](https://github.com/ItsSilva/Moni/actions) | Resultados y artefactos de pruebas |
| Nu | [Cuenta Nu Colombia](https://nu.com.co/cuenta) | Referencia de claridad y presentación de producto |
| Revolut | [Kids & Teens / padres y tutores](https://www.revolut.com/es-ES/revolut-kids-and-teens-parent-and-guardians/) | Referencia de producto familiar |
| Social | Carpeta local proporcionada por el usuario | Videos y posts que condicionan el rediseño |

Los nodos A/B se confirmaron mediante metadata de Figma el 26/10/2026. No están sincronizados con todos los cambios publicados: consultar la sección 3.4 antes de implementar desde ellos. Los comentarios de mentoría siguen sin verificarse.

### 3.2 Identificación de infraestructura

Estos identificadores orientan las herramientas, pero **no son credenciales**:

- Equipo Vercel: `itssilvas-projects` / `team_rt7zaPZlV7yHtdr5jSnIElW5`.
- Proyecto Vercel: `moni` / `prj_y4V39SoH1Qrta8d9iUStbNJ2ngUG`.
- Repositorio GitHub: `ItsSilva/Moni`, ID `1422735433`.
- Archivo Figma: `Tzv22s3Pj865kCNPNwJNgS`.
- Base Redis: `moni-registros`.
- Store Vercel: `store_uc5BqDrPNiLNoL1f`.
- Región de Redis: `iad1`.

### 3.3 Qué significa tener acceso en la nueva sesión

Un README proporciona contexto y destinos; no transfiere sesiones autenticadas entre modelos, chats o equipos. En el entorno de destino:

| Servicio | Comprobación necesaria | Si falta acceso |
| --- | --- | --- |
| GitHub | Leer `main` y comprobar capacidad de publicar en el repositorio autorizado | Conectar la cuenta/instalación correcta; conservar el trabajo local |
| Vercel | Leer el proyecto, metadata de variables y último despliegue; capacidad de desplegar | Conectar Vercel o usar su CLI autenticada en el equipo correcto |
| Figma | Verificar por separado lectura de frames, edición y acceso a comentarios | Solicitar solo el permiso o contenido imprescindible; leer metadata no prueba permiso de edición ni lectura de comentarios |
| Web | Abrir A/B, inspeccionar estados y realizar QA con `test=1` | Registrar el bloqueo concreto, sin declarar el sitio verificado |
| Social | Leer archivos locales de la carpeta indicada | Solicitar su ruta real o montaje; no inferir su contenido |
| Meta | Acceder al dataset/píxel y a Eventos de prueba cuando se implemente | Pedir identificador público del píxel y conexión apropiada; no contraseñas |

Preferir conectores/MCP cuando cubran la operación. Una sesión de Codex en la nube no ve automáticamente carpetas del PC. La instalación de skills tampoco instala ni autentica conectores de GitHub, Vercel o Figma.

No copiar tokens, cookies, contraseñas, `.env.local` ni secretos dentro de este README, issues, PRs, capturas públicas o logs. No hacer público Figma o Social para resolver un problema de acceso. No pedir contraseñas por chat.

La autorización existente permite avanzar con el proyecto y sus correcciones. No es una autorización para contratar servicios de pago, publicar los originales de Social, cambiar de propietario, borrar datos del estudio o iniciar campañas con presupuesto no definido.

### 3.4 Mapa de Figma y relación con código

Archivo `Tzv22s3Pj865kCNPNwJNgS`, página `0:1`. Mapa comprobado por metadata el 26/10/2026; volver a resolver los IDs antes de editar, porque pueden cambiar si se reemplazan nodos.

| Elemento | Nodo Figma | Correspondencia manual en código |
| --- | --- | --- |
| Landing A / Control de gastos | `1:2` | `variants.a` de `src/content.ts` y composición compartida de `src/main.tsx` |
| Landing B / Aprendizaje | `12:259` | `variants.b` y la misma composición |
| Producto y patrones / Mentoría 20 oct | `32:859`; grupo Producto `32:862` | Referencia de tarjeta, pantallas y beneficios |
| **Landing v2 (vigente)** | Página `127:788`: Desktop A `127:789`, Desktop B `130:1325`, Mobile A `134:1787`, éxito `134:7576`, notas de interacción `134:7612`, opciones de header `138:3020` | `src/main.tsx`, `src/styles.css`, `src/content.ts` |
| Componentes de redes | Página «contenido» `44:788`: bloque de palabra `55:1159`, personajes `55:1161` (moneda), `55:1172` (pentágono), `55:1181` (flor), `55:1190` (media luna), `55:1200` (cuadro), nube `111:5190` | `Word`, `Moni` y `CardWithEyes` en `src/Art.tsx`; SVG en `src/art/` |
| App C · pantallas | `105:3469` (C14 controles), `103:2832` (C05 mi tarjeta), `105:3210` (C12 resumen), `103:3069` (C07 metas), `105:3365` (C13 solicitudes), `103:2973` (C06 pausa), `104:3172` (C10 misión cumplida), `102:2820` (C03 inicio) | `public/app/screen-cXX.webp` (render 1,75× sin sombra) y `AppScreen` en `src/Art.tsx` |
| Tarjeta débito (histórica) | `32:885` | Ya no se usa en la web; la tarjeta v2 es la coral con ojos (`CardWithEyes`) |
| App / Resumen, Movimientos, Metas (históricas) | `32:921`, `32:961`, `32:999` | Sustituidas por las pantallas de la app C |
| Beneficios: límites / compras / ahorro (históricos) | `32:1010` / `32:1022` / `32:1031` | Sustituidos por el bento de la v2 |
| Pregunta frecuente | `32:1038` | `questions()` en `src/content.ts` y `<details>` en `src/main.tsx` |

Abrir un nodo con el enlace del archivo y `?node-id=32-921`, por ejemplo. No confundir las referencias actuales con los históricos `11:2` («Original antes de mentoría 3», oculto), `32:343` y `32:601` («Antes del 20 oct»).

**Desincronización comprobada:** los frames actuales A/B aún contienen rótulos académicos en registro (`34:894`, `34:1117`) y footer (`12:257`, `12:357`), retirados de la web por instrucción posterior del usuario. Los cambios de landing, footer y logo del 25–26/10 se implementaron en código, sin actualizar el archivo Figma. No regenerar la web desde esos frames como si fueran la última versión aprobada. La decisión pública vigente, el código publicado y el nuevo SVG prevalecen para esos cambios; Figma conserva el diseño de referencia del producto.

No hay sincronización automática Figma→React en el repositorio ni un comando para publicar pantallas desde Figma. Esta tabla es un mapa manual; cambiar un nodo no actualiza la web, y editar React no modifica Figma. Antes de una edición, inspeccionar si se trata de componente principal o instancia y sus usos; verificar propiedades y overrides para no cambiar solo una copia por accidente.

**Acceso observado:** el MCP permite leer metadata/diseño. No se efectuó una escritura de prueba para demostrar permisos. No expone una herramienta de comentarios en esta sesión; la revisión visual anterior encontró un acceso de navegador que pedía registro. Por tanto, comentarios y su resolución permanecen sin verificar. Las notas visibles del lienzo no sustituyen los hilos de comentarios.

Si el entorno ofrece skills oficiales de Figma, leer la requerida por la operación antes de usar sus herramientas: implementación desde Figma necesita contexto de diseño y captura, no solo metadata; una edición de lienzo requiere el flujo de edición correspondiente. Las nueve skills del repo no proporcionan conexión ni permisos de escritura a Figma.

## 4. Estado verificado y límites de la evidencia

### 4.1 Estado comprobado al auditar

| Elemento | Evidencia al 26/10/2026 |
| --- | --- |
| Código vigente auditado | `009e5d0469fb24a5f539b192b43c181503fb6e6d`; HEAD local y `main` remoto coinciden antes de esta actualización documental |
| Producción de ese código | `dpl_C28sxjFd51CLi89XvhK5qJfufMTo`, `READY`, SHA coincidente; URL estable de la sección 3 |
| CI de ese commit | [Ejecución 40350901314](https://github.com/ItsSilva/Moni/actions/runs/40350901314), correcta |
| Landing | Rediseño A/B, footer profesional, logo vectorial 89:32, sin contacto en footer ni rótulo académico público |
| Formulario y configuración | Production `true`; Preview/Development `false`; responsable `Moni Bank`; correo público en avisos |
| Redis | Variables sensibles solo en Production; metadata comprobada sin imprimir valores secretos |
| Pruebas del código vigente | 34 unitarias/API, build y 22 E2E (11 casos × 2 perfiles), aprobados en la entrega del SVG y en CI |
| Infraestructura en esa entrega | Build con PING, escritura Lua, lectura exacta, TTL y limpieza de su clave temporal; formularios A/B publicados con `test=1` y correos ficticios confirmados |
| Producto y skills | Auditoría de hashes: 8 archivos protegidos y 91 archivos de las nueve skills coinciden, normalizando CRLF a LF |
| Social | Tres originales locales inventariados; revisión visual de ambos videos documentada en `docs/visual-review.md` |
| Figma | Metadata y mapa de nodos leídos; diferencias con la web identificadas; comentarios y permiso de edición no verificados |
| Dependencias | Auditoría npm actual: 6 avisos en cadena de desarrollo; `npm audit --omit=dev`: 0 (sección 19.4) |
| Alcance de esta auditoría | Código, contratos, pruebas, scripts, configuración, referencias, manifests y continuidad documental; solo README se modifica |

El commit `c54d4e5701a95220e05144c4ce48af8194103e52` sigue siendo la base histórica de `product-baseline`, no el HEAD actual. No sustituir esa referencia solo para hacer pasar una comprobación de producto.

La evidencia de formularios y comparación visual procede de la entrega inmediatamente anterior sobre el mismo código. Esta auditoría documental no repite envíos ni exporta contactos reales. La prueba de Redis lee únicamente su propia clave temporal; no equivale a una auditoría de toda la base. Tampoco se realizó pentesting ni se certifica seguridad o conformidad legal. Tras futuros commits, verificar el SHA y sus resultados actuales; estos IDs son evidencia fechada.

Capturas `.qa/` y reportes locales están ignorados: no viajarán con un clon. GitHub conserva los artefactos de CI 14 días. Para obtener evidencia nueva, usar el procedimiento reproducible de la sección 20.4; no presentar rutas de otra máquina como capturas accesibles.

### 4.2 Lo que todavía no se debe afirmar

- Que Meta Pixel está instalado, enviando eventos o atribuyendo conversiones.
- Que existen campañas activas o presupuesto contratado desde este trabajo.
- Que Gmail recibe cada formulario: los datos se guardan en Redis, no se envían por correo.
- Que los tests con mocks verifican por sí solos la infraestructura real.
- Que se obtuvo certificación WCAG o se completó una auditoría manual con lector de pantalla.
- Que Figma, Social y la web son idénticos o que todos los comentarios de mentoría fueron revisados/resueltos.
- Que una puntuación Lighthouse o métricas de usuarios reales ya fueron medidas; deberán recogerse.
- Que la marca Moni Bank es una entidad jurídica o financiera autorizada.

## 5. Reglas visuales que no se negocian

### 5.1 Jerarquía de decisiones

Aplicar las instrucciones vigentes del usuario y las restricciones de este proyecto antes que preferencias genéricas de cualquier skill. Usar Social y Figma para contrastar continuidad. Si muestran versiones distintas, documentar la diferencia y aclarar únicamente qué archivo es la referencia aprobada; no rediseñar arbitrariamente la app para resolverla.

**Una recomendación de Taste no autoriza cambiar la interfaz del producto, la paleta, la familia tipográfica, el copy de la hipótesis ni las condiciones de la propuesta de producto.**

### 5.2 Marca a conservar

| Token / recurso | Valor actual | Tratamiento |
| --- | --- | --- |
| Familia | Outfit | Conservar; pesos locales 400, 500, 600, 700 y 800 (800 solo para bloques de palabra) |
| Azul principal | `#2667FF` | Color de acción y marca |
| Azul hover | `#164ED1` | Estado actual de interacción |
| Tinta | `#101828` | Texto principal |
| Texto secundario | `#475467` | Usar con contraste comprobado |
| Fondo suave | `#F2F5FF` | Superficie de marca |
| Amarillo | `#F2ED6F` | Acento existente; no sustituir por una paleta genérica |
| Rosa | `#EEB1E4` | Acento existente; protagonista de metas en B |
| Coral | `#FF4D41` | De las piezas de redes; solo bloques grandes (texto blanco ≥ 24 px) y personajes |
| Tintes | `#DCE4FF`, `#FFFBD6`, `#FCE6F7` | Fondos de apoyo de la app C; nunca compiten con el bloque saturado de la sección |
| Profundidad de botones | sombra sólida 3 px `#164ED1` / `#CFA92A` | Como en la app C; se hunde al presionar |
| Azul oscuro | `#111E3E` | Sección de demostración y producto |
| Bordes | `#7C879B` | Token actual; cualquier ajuste debe preservar controles legibles |
| Logo de cabecera/footer | `public/moni-logotype.svg` | Export nuevo del usuario; viewport 89×32, `height: auto`; no deformar |
| Logo interno / favicon | `public/moni-logo.svg` | Versión protegida; no sustituir al cambiar el logo externo |
| Recursos de producto | `public/product/` | Conservar originales |

Es válido mejorar la proporción de uso de colores, el espaciado y la jerarquía en la landing. No es válido reemplazar la identidad por el morado de Nu, una estética genérica de Revolut, otra fuente o un kit descargado.

### 5.3 Producto en la landing (v2, 27/10/2026)

La usuaria decidió que la web muestre el producto de las piezas de redes y de la app C. Esto sustituye la protección de `ProductPreview.tsx` (eliminado) y la decisión de congelar la tarjeta azul sin ojos.

- **Pantallas:** `public/app/screen-cXX.webp`, renders del Figma (tabla 3.4) a 1,75× sin la sombra del nodo; la sombra y el redondeo los pone `.app-screen`. Son imágenes con texto alternativo descriptivo y la aclaración de datos de demostración; no hay controles falsos en el orden de tabulación.
- **Qué pantalla va dónde** está en `src/content.ts` (`heroScreen`, `benefits[].screen`, `demoScreens`). A: hero C14; beneficios C05, C12, C07; demo C13 y C06. B: hero C07; beneficios C03, C12, C14; demo C06 y C10.
- **Tarjeta:** `CardWithEyes` en `src/Art.tsx`, en HTML/CSS con los assets de `public/product/`; sus rótulos van en SVG porque son parte del dibujo. Color coral como lo dejó la usuaria en el Figma de la v2.
- **Personajes:** SVG de `src/art/` copiados de los componentes de redes, con el grupo `.eyes` para el parpadeo.
- **Si cambian las pantallas en Figma:** volver a exportar el nodo (clonar, quitar efectos, captura a 1,75×, convertir a WebP) y reemplazar el archivo. No redibujar pantallas a mano en React ni cambiar cifras en la web sin cambiarlas en Figma.
- No convertir estas ilustraciones en formularios o simuladores ni introducir comportamientos financieros reales.

[docs/product-baseline.json](docs/product-baseline.json) registra los hashes de los assets de producto de la v2. Sirve para detectar cambios de archivos; **no reemplaza la comparación visual**.

### 5.4 Cambios permitidos al trabajar en la landing

Mejor composición del hero, jerarquía tipográfica en la página, anchos de texto, ritmo entre secciones, alineación, navegación, presentación de beneficios, transiciones de color, calidad de estados, responsive y accesibilidad. Se puede reorganizar código para hacerlo mantenible sin cambiar su comportamiento ni el aspecto del producto.

Evitar secciones de relleno, estadísticas inventadas, testimonios ficticios, sellos de seguridad o logos de alianzas inexistentes, cintillos decorativos sin función, exceso de tarjetas, efectos de cursor, gradientes genéricos, animaciones permanentes y fotografías que se presenten como clientes reales sin serlo.

### 5.5 Si el usuario pide modificar pantallas de la app

La protección anterior es el estado por defecto para trabajos sobre la landing; no impide una nueva instrucción explícita del usuario sobre el producto. Esa instrucción prevalece dentro de su alcance. No pedir una segunda aprobación si ya identifica el cambio y la referencia; aclarar solo diferencias imprescindibles que sigan sin resolver.

1. Determinar si la entrega pedida es Figma, web o ambas. Un ejemplo de posible modificación no es una orden de ejecutarla. Abrir los nodos de 3.4, leer contexto/capturas y comentarios disponibles, y comparar con `ProductPreview.tsx`, CSS y Social.
2. Registrar la versión de partida y la modificación concreta autorizada. Si afecta a la diferencia de tarjeta (rosa/azul, ojos/sin ojos), resolver cuál se quiere antes de unificar. Conservar referencias anteriores; no sobrescribir los originales de Social.
3. En Figma, intervenir los componentes e instancias correctos, preservando otros frames y versiones históricas. Revisar los tres estados, navegación, tarjeta y variantes que comparten componentes. No añadir pantallas o datos por inferencia.
4. Si se pide implementación web, trasladar el cambio a `Phone`/`DebitCard`/`BenefitPreview`, assets y estilos pertinentes. La app aquí es una ilustración, no una aplicación bancaria funcional. Revisar `HeroProduct` (600×580) y `AppPreview` (600×576): `Canvas` adapta uniformemente artboards mediante ResizeObserver; no alterar sus proporciones para encajar un diseño.
5. Comparar antes/después: el cambio autorizado debe verse y el resto permanecer estable. Probar A/B, vistas `limits`, `purchases`, `savings`, beneficios y móvil/escritorio. Los hashes antiguos cambiarán si se modifica un archivo protegido: explicar el diff, no ocultarlo regenerándolos primero. Actualizar baseline, documentación y pruebas solo después de verificar la nueva referencia aprobada y cuando ese cambio esté dentro del encargo.
6. Entregar enlaces a nodos modificados, capturas, archivos/commit y pruebas. Si se cambió solo Figma, declarar que producción sigue igual; si se cambió solo código, registrar la desincronización pendiente. Publicar únicamente el alcance autorizado.

## 6. Carpeta Social y continuidad de campaña

En este equipo, Social está junto al repo: `Moni Back App/Social`, accesible como `../Social`. Inventario confirmado: `InstagramPostsFeed.jpeg` (946×1224), `TikTokReel1.mp4` (1080×1920, 30 fps, 18,07 s) y `TikTokReel2.mp4` (1080×1920, 30 fps, 11,07 s). No está en GitHub y otro entorno necesita su propia copia autorizada.

La entrega del 25/10 revisó el JPEG y la secuencia completa de ambos videos con fotogramas cada 0,5 s y decodificación hasta EOF; no transcribió el audio. Ver matriz y evidencia en [docs/visual-review.md](docs/visual-review.md). La auditoría del 26/10 reconfirma los archivos y consulta esa revisión; no afirma una nueva reproducción de los videos.

**Discrepancia pendiente:** Social muestra tarjetas con ojos y una tarjeta rosa en Reel 2; Figma/código muestran tarjeta azul sin ojos. Las pantallas finales de Reel 1 corresponden a las tres vistas existentes, con importes intermedios animados en el anuncio. Para los trabajos de landing se conserva el producto de main; eso no declara resuelta la identidad de la tarjeta. El nuevo `Logotipo.svg` fue autorizado para cabecera/footer, no para sustituir logos dentro del producto.

### 6.1 Protocolo de revisión

1. Localizar `Social` dentro del workspace autorizado o pedir su ruta si está fuera. No recorrer todo el equipo para buscar datos personales.
2. Listar nombres, formatos, duración/resolución de videos y dimensiones de posts. Registrar las rutas reales.
3. Ver las piezas completas y extraer fotogramas relevantes de tarjeta, app, logo, colores, títulos y cierres. No quedarse únicamente con la portada del video.
4. Identificar qué piezas corresponden a A, B o a comunicación común. No asignarlas por su nombre si el contenido no lo confirma.
5. Comparar esos fotogramas con Figma y con la web actual. Registrar discrepancias antes de editar.
6. Preparar una matriz: archivo, variante, mensaje, interfaz mostrada, elemento protegido, sección relacionada de la landing y evidencia visual.
7. Revisar nuevamente esa matriz al terminar. La persona que llega desde un anuncio debe reconocer el mismo producto.

### 6.2 Manejo de archivos

Social es material de referencia, no una autorización para publicar todos los videos en GitHub o `public/`. No mover, renombrar, sobrescribir ni recomprimir los originales. Si se decide usar una pieza en la web, producir un derivado optimizado, comprobar permisos de uso y mantener su original intacto.

Se ignoran las rutas habituales `Social/` y `social/` dentro del repositorio para evitar un commit accidental. Si están fuera del repositorio, conservarlas allí. No inventar nombres de archivos en la documentación. La ausencia de Social bloquea la validación de continuidad visual, pero no impide realizar lectura técnica, inventario o pruebas independientes.

No añadir reproducción automática con sonido. Si un video existente aporta información real, utilizar poster, dimensiones reservadas, controles adecuados, carga diferida cuando corresponda y alternativa estática para movimiento reducido. No incorporar video solo para satisfacer una cuota de una skill.

## 7. Referencias Nu y Revolut

Las páginas enlazadas se consultaron como referencias reales. Volver a observar su diseño y comportamiento en móvil/escritorio al ejecutar el rediseño: cambian con el tiempo. Este documento describe principios que se pueden trasladar, no una copia de sus assets ni una auditoría visual exhaustiva.

| Referencia | Qué estudiar | Aplicación propuesta en Moni |
| --- | --- | --- |
| Nu Cuenta | Jerarquía entre propuesta de valor, producto, beneficios y dudas; lenguaje directo; recorrido hacia la acción | Un hero claro, beneficio comprensible, presentación protagonista de la tarjeta/app y FAQ útil |
| Revolut Kids & Teens | Relación entre autonomía del menor y acompañamiento del adulto; demostración visual de funcionalidades y explicación por situaciones | Explicar control en A y aprendizaje en B con el mismo producto y escenas coherentes |

No trasladar tasas, comisiones, número de usuarios, calificaciones, funcionalidades, marcas de redes de pago, Apple Pay/Google Wallet, garantías, licencias ni afirmaciones regulatorias de esos servicios. No copiar textos completos ni descargar sus imágenes para presentarlas como propias de Moni.

La dirección deseada combina claridad editorial, espacio bien utilizado, producto reconocible, confianza por transparencia y ejecución cuidada. No significa eliminar el carácter cercano y familiar de Moni para convertirlo en una web corporativa fría.

## 8. Skills instaladas y orden de trabajo

### 8.1 Instalación incluida en el repositorio

Las skills están incorporadas **a nivel de proyecto** en `.agents/skills/`. Se copiaron desde los repositorios originales, con sus archivos auxiliares y licencias MIT. Su uso en el rediseño ya está documentado en `docs/visual-review.md`, incluidos los fallos/excepciones del inspector Taste; no confundir la instalación original con su ejecución posterior.

Al clonar la versión actual de Moni, los archivos viajan con el repositorio. No hace falta reinstalar globalmente ni descargar versiones flotantes antes de empezar. La nueva sesión debe comprobar cómo carga instrucciones su modelo; si no detecta las skills, leer sus rutas explícitas. No se afirma que otro modelo o equipo ya las haya cargado.

| Skill | Ruta | Función en Moni |
| --- | --- | --- |
| Taste Skill (`design-taste-frontend`) | `.agents/skills/design-taste-frontend/SKILL.md` | Auditoría inicial y dirección visual de la landing dentro de las restricciones |
| `better-interface` | `.agents/skills/better-interface/SKILL.md` | Revisión integral y consolidación de hallazgos |
| `find-animation-opportunities` | `.agents/skills/find-animation-opportunities/SKILL.md` | Detectar oportunidades de movimiento y descartar las innecesarias; es de análisis, no implementación |
| `better-accessibility` | `.agents/skills/better-accessibility/SKILL.md` | Teclado, foco, formularios y accesibilidad |
| `better-layout` | `.agents/skills/better-layout/SKILL.md` | Estructura, agrupación y adaptación |
| `better-writing` | `.agents/skills/better-writing/SKILL.md` | Claridad del texto sin cambiar la hipótesis |
| `better-typography` | `.agents/skills/better-typography/SKILL.md` | Jerarquía, lectura y ajuste responsive manteniendo Outfit |
| `better-colors` | `.agents/skills/better-colors/SKILL.md` | Roles y contraste manteniendo la paleta |
| `better-ui` | `.agents/skills/better-ui/SKILL.md` | Estados, superficies, rendimiento y pulido |

Las seis skills `better-*` complementarias son dependencias de la revisión integral de `better-interface`; instalar únicamente su archivo principal deja dominios sin revisar. No se añade una biblioteca de UI al runtime por instalar estas instrucciones.

### 8.2 Procedencia reproducible

| Fuente original | Commit de la copia |
| --- | --- |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | `12af471f627f866411b4bd785b19646d3672784c` |
| [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `592aedc44d7d5b3e29740984252902f3e5402a1c` |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) | `2d228630ba1446365f614a108cb8252f1feda202` |

[docs/skills-lock.json](docs/skills-lock.json) registra repositorio, commit, ruta de origen, ruta instalada y hashes de cada archivo. Conservar licencias. Si se actualizan skills, comparar instrucciones y referencias antes de reemplazarlas y actualizar ese registro; no mezclar una versión nueva de `SKILL.md` con scripts de otra versión.

Las páginas solicitadas por el usuario son [Taste Skill](https://www.tasteskill.dev/), [better-interface en UI Skills](https://www.ui-skills.com/skills/jakubkrehel/better-interface) y [Find Animation Opportunities](https://aiuxplayground.com/skills/find-animation-opportunities). Los catálogos pueden diferir del contenido del commit instalado; la copia versionada es la referencia reproducible de este traspaso.

### 8.3 Uso de Taste con una marca ya definida

Leer la skill completa y sus referencias pertinentes. Su nombre visible es Taste Skill, pero su `name` real es **`design-taste-frontend`**. La carpeta original se llama `taste-skill`; aquí se instala bajo su nombre de invocación.

Si se utiliza el generador de dirección, mantener paleta y tipografía con `--keep palette,type`. Elegir opciones compatibles con los assets existentes, las dos variantes y Social. No ejecutar su flujo de diseño de app para reemplazar las pantallas protegidas.

La copia instalada incluye reglas genéricas como cantidad mínima de movimiento, imágenes, diseños sin tarjetas o límites de líneas. **No son objetivos obligatorios de Moni cuando contradicen continuidad, accesibilidad, contenido o rendimiento.** No añadir ocho animaciones ni cuatro fotografías por cumplir un contador. No recortar el significado del copy para forzar dos líneas en cualquier pantalla. Documentar las excepciones justificadas; no declarar un inspector aprobado si informa fallos.

Sus scripts de inspección pueden necesitar Chrome/Chromium y Node. Si faltan recursos que una referencia de la skill menciona, registrar la limitación y utilizar las verificaciones existentes del proyecto; no inventar resultados ni descargar sustitutos no revisados. La skill no debe importar sus estilos de ejemplo directamente sobre la app de Moni.

### 8.4 Secuencia recomendada

1. **Taste:** leer brief, marca, Social y código; capturar el antes; proponer una dirección compatible.
2. **better-interface:** revisar accesibilidad, layout, escritura, tipografía, color y UI con sus skills dependientes. Consolidar hallazgos, con archivo/componente y evidencia.
3. **Implementación:** resolver primero composición y estados estáticos; mantener contratos y producto.
4. **Find Animation Opportunities:** preguntar explícitamente qué movimientos mejorarían esta landing, qué propósito tendrían y cuáles deben descartarse. Emitir propuestas concretas, sin modificar código en esa fase.
5. **Implementación de movimiento:** aplicar solo propuestas útiles mediante el flujo de desarrollo, conservando la preferencia de movimiento reducido y sin rediseñar el interior de la app.
6. **Revisión final:** ejecutar pruebas, comparar capturas y repetir los dominios afectados de `better-interface`.

No hace falta instalar más estilos genéricos, nuevos frameworks o varias librerías de animación. Si el entorno ofrece skills oficiales de Figma, Vercel o React, usarlas para sus operaciones concretas; no forman parte de las nueve copias incluidas ni equivalen a conexiones autenticadas.

## 9. Dirección del rediseño por sección

El rediseño inicial ya está implementado (secciones 25–26). Esta tabla orienta futuras mejoras solicitadas; no es una lista de trabajos pendientes por repetir.

| Sección | Objetivo | Mantener | Mejoras que evaluar |
| --- | --- | --- | --- |
| Navegación | Identidad visible y recorrido sencillo | Logo, enlaces funcionales, CTA a registro | Alineación, separación, adaptación móvil, foco |
| Hero | Entender propuesta y siguiente paso en pocos segundos | Mensaje específico A/B, producto existente, CTA | Relación texto/producto, escala, espacio, primer viewport móvil |
| Franja de principios | Reforzar el enfoque de cada variante | Sentido del mensaje | Integración con el recorrido y legibilidad |
| Beneficios | Mostrar utilidad concreta | Límites, compras y metas; orden por variante | Ritmo editorial, agrupación, equilibrio de contenido y producto |
| Demostración | Explicar el acompañamiento sin simular un servicio activo | App protegida y nota de demostración | Composición externa, lectura de pantallas, transición entre secciones |
| FAQ | Resolver objeciones reales | Respuestas sobre tarifas no definidas, entrega y alcance | Espaciado, targets, foco y divulgación clara |
| Formulario | Registro sencillo, accesible y confiable | Campos, validación, consentimiento y estados reales | Jerarquía, ayudas, contraste y respuesta de interacción |
| Pie y diálogos | Cierre coherente e información localizable | Logo SVG, lema, navegación, privacidad y accesibilidad; contacto solo dentro de avisos | Alineación, lectura y adaptación móvil, sin restaurar rótulo académico ni contacto en footer |

No convertir cada sección en el mismo patrón de título y tres tarjetas. Tampoco eliminar información útil solo para que la captura se vea minimalista. Un cambio en el orden narrativo debe aplicarse de forma comparable a A y B, conservando el tratamiento experimental.

El formulario debe ser usable sin hover y sin esperar a que termine una animación. El texto, la app y el CTA no pueden quedar ocultos si falla un script de entrada. No añadir scroll secuestrado, navegación horizontal obligatoria o pantallas completas vacías.

## 10. Variantes A/B y enlaces

### 10.1 Mensajes vigentes

| Elemento | A: control y acompañamiento | B: aprendizaje financiero |
| --- | --- | --- |
| Rótulo común | Su primera tarjeta débito. | Su primera tarjeta débito. |
| Título (hipótesis, bloques grandes) | Tú acuerdas sus límites. | Aprende a ahorrar contigo. |
| H1 completo | Su primera tarjeta débito. Tú acuerdas sus límites. | Su primera tarjeta débito. Aprende a ahorrar contigo. |
| Apoyo | Conoce cómo tu hijo usa su dinero y acuerda límites de gasto desde tu app. | Ayuda a tu hijo a decidir qué gastar y qué ahorrar, con una tarjeta y una app para aprender juntos. |
| Prioridad | Límites y compras visibles | Metas, ahorro y decisiones |
| Orden de beneficios | Límites → compras → metas | Metas → compras → límites |
| Pantalla protagonista | C14 · controles de tarjeta (límite) | C07 · mis metas (ahorro) |
| Demostración | C13 solicitudes + C06 pausa antes de comprar | C06 pausa antes de comprar + C10 meta cumplida |
| CTA | Únete a la lista de espera | Únete a la lista de espera |
| Formulario y condiciones | Iguales | Iguales |

El copy completo está en `src/content.ts`. Mantener un único sistema visual con contenido parametrizado. No crear dos aplicaciones o copias independientes que se desincronicen.

### 10.2 Selección y clasificación de origen

`src/attribution.ts` decide:

- `variant=b` muestra B; el resto muestra A.
- Solo los valores exactos `variant=a` o `variant=b` se consideran selección explícita y producen `source='campaign'`.
- Sin una variante válida, `source='direct'`, incluso si hay UTM. No inferir variante por fecha o por el nombre de campaña.
- **`campaign` es una clasificación técnica por variante explícita, no prueba de que el visitante pagó un anuncio o llegó desde Meta.** Una visita manual con `?variant=a` también entra en esa clasificación si falta `test=1`.
- `test=1` activa el espacio de pruebas y una identidad local separada.
- No hay selector público, reparto aleatorio, feature flag de A/B ni alternancia automática.

### 10.3 Enlaces de trabajo

| Uso | URL |
| --- | --- |
| A, QA del equipo | https://moni-sigma-eight.vercel.app/?variant=a&test=1&utm_source=meta&utm_medium=paid_social&utm_campaign=moni_qa&utm_content=a |
| B, QA del equipo | https://moni-sigma-eight.vercel.app/?variant=b&test=1&utm_source=meta&utm_medium=paid_social&utm_campaign=moni_qa&utm_content=b |
| A, ejemplo para campaña real | https://moni-sigma-eight.vercel.app/?variant=a&utm_source=meta&utm_medium=paid_social&utm_campaign=moni_control&utm_content=a |
| B, ejemplo para campaña real | https://moni-sigma-eight.vercel.app/?variant=b&utm_source=meta&utm_medium=paid_social&utm_campaign=moni_aprendizaje&utm_content=b |
| Tráfico directo | https://moni-sigma-eight.vercel.app/ |

Los nombres de campaña de los ejemplos son convenciones propuestas; no prueban que esas campañas existan en Ads Manager. Usar los valores acordados para cada anuncio y mantener `variant` explícita. **Nunca usar enlaces con `test=1` como destino de anuncios reales.**

### 10.4 Secuencia del estudio

Lanzar A primero. Al iniciar la segunda etapa, pausar el anuncio de A y utilizar la URL de B. No es necesario cambiar la variante por defecto del código. Mantener ambas rutas disponibles para trazabilidad y QA.

Documentar fechas, presupuesto, audiencia, creatividades, dispositivos, interrupciones y versión del sitio. Completar el rediseño de A y B antes de iniciar la comparación cuando sea posible. Si una campaña ya está corriendo, registrar el cambio de versión y no mezclar silenciosamente resultados anteriores y posteriores.

Una prueba secuencial está expuesta a efectos de tiempo y cambios de audiencia: tratarla como evidencia exploratoria, no como un experimento causal aleatorio.

## 11. Arquitectura y mapa de archivos

### 11.1 Stack actual

React `19.3.1`, React DOM `19.3.1`, TypeScript `7.0.2`, Vite `8.3.4`, Vitest `5.0.5`, Playwright `1.64.1`, axe Playwright `4.14.0` y fuentes locales `@fontsource/outfit` `5.3.0`. Las versiones exactas están fijadas en `package.json` y `package-lock.json`.

No se utiliza Next.js, Tailwind, shadcn/ui, un CMS, una base SQL o una librería de animaciones. No migrar por preferencia de una skill. La landing es un frontend estático con funciones serverless; no es una web exclusivamente estática porque persiste registros y eventos.

`package.json` admite Node `>=22.12.0 <25`. CI usa Node 22. En el despliegue base Vercel informó uso de **Node 24.x**, porque el rango de engines prevaleció sobre la selección 22.x del proyecto. No documentar 22.x como runtime productivo comprobado. Alinear versiones es una tarea explícita si se decide realizarla, no parte obligatoria del rediseño.

### 11.2 Archivos relevantes

| Archivo / directorio | Responsabilidad |
| --- | --- |
| `src/main.tsx` | Composición, CTA, formulario, estados, FAQ y diálogos |
| `src/content.ts` | Copy, beneficios, orden y FAQs por variante |
| `src/Art.tsx` | Bloques de palabra, personajes, tarjeta con ojos, pantallas de la app y hooks de movimiento (aparición, inclinación) |
| `src/art/` | SVG de personajes y ojos (componentes de redes del Figma) |
| `public/app/` | Pantallas de la app C exportadas del Figma (WebP) |
| `src/styles.css` | Todo el CSS de la landing v2: tokens, secciones, responsive, movimiento y movimiento reducido (`landing.css` se integró aquí) |
| `src/attribution.ts` | Variante, UTM, identidad del navegador y exposición cruzada |
| `src/analytics.ts` | Configuración pública, visita y eventos de primera parte |
| `src/external-measurement.ts`, `src/measurement-policy.ts` | SDK opcionales y exclusión de QA/hosts/URLs no admitidos |
| `src/MeasurementConsent.tsx`, `src/measurement.css` | Elección independiente de medición y aviso complementario |
| `docs/measurement-setup.md` | Activos GA4/Meta, enlaces de campaña, configuración, evidencia y límites |
| `api/lead.ts` | Validación y escritura del registro |
| `api/visit.ts` | Persistencia de visitas deduplicadas |
| `api/event.ts` | Persistencia de eventos permitidos |
| `server/research.ts` | Contratos, HMAC, conexión REST, límites y script Lua |
| `scripts/check-storage.mjs` | Comprobación real de Redis durante build Vercel |
| `scripts/capture-visual.mjs` | Capturas A/B y clones normalizados del producto en `.qa/`; procedimiento en 20.4 |
| `scripts/export-results.mjs` | Exportación privada de cohorte real v2 |
| `scripts/delete-contact.mjs` | Eliminación de contacto por correo recibido en stdin |
| `public/moni-logotype.svg` | Logo vectorial vigente de cabecera/footer; origen `../Logotipo.svg` |
| `public/moni-logo.svg` | Logo protegido dentro del producto y favicon; no confundir con el anterior |
| `public/moni-logotype.png`, `public/moni-mascot.svg` | Recursos heredados sin uso en la página actual; no restaurarlos por inferencia |
| `public/product/` | Assets exportados del producto |
| `tests/research.unit.test.ts` | Validación, atribución, API y almacenamiento simulado |
| `tests/landing.e2e.ts` | Navegación, accesibilidad, responsive, estados y medición simulada |
| `playwright.config.ts` | Servidor de prueba y perfiles escritorio/móvil |
| `.github/workflows/quality.yml` | CI en pushes, PRs y ejecución manual |
| `vercel.json` | Build, framework, directorio de salida y cabeceras |
| `.env.example` | Nombres de configuración sin secretos |
| `ACCESSIBILITY.md` | Alcance de accesibilidad y revisión manual pendiente |
| `.agents/skills/` | Nueve skills versionadas; fuera del runtime público |
| `docs/skills-lock.json` | Procedencia y hashes de las skills |
| `docs/product-baseline.json` | Línea base de componentes/assets protegidos; no incluye CSS compartido |
| `docs/visual-review.md`, `docs/footer-review.md` | Revisiones fechadas, decisiones y límites; el footer-review precede al cambio posterior a SVG/sin contacto |
| `index.html` | Idioma, título, descripción para buscadores y favicon |
| `AGENTS.md` | Reglas breves para agentes que trabajen en el repositorio |

### 11.3 Recorrido de una solicitud

El navegador carga la landing desde Vercel y determina su atribución. La medición envía JSON a `/api/visit` y `/api/event`. El formulario validado envía JSON a `/api/lead`. Las funciones validan configuración y contenido, aplican rate limit y usan Redis REST desde el servidor. La interfaz muestra éxito únicamente tras recibir una respuesta correcta con `ok: true`.

Los tokens de Redis nunca llegan al cliente. No hay API pública de exportación ni panel administrativo público. La lectura de resultados se realiza con scripts privados y credenciales autorizadas.

## 12. Desarrollo local y entornos

### 12.1 Preparación

Desde la carpeta `Moni` del repositorio (no desde `Moni Back App`), con Git y Node compatible instalados:

```sh
npm ci
npm run dev
```

`npm run dev` sirve el frontend. **No ejecuta automáticamente las funciones de Vercel.** `npm run preview` sirve el bundle construido, tampoco sustituye el backend serverless.

Para construir e inspeccionar el frontend:

```sh
npm run build
npm run preview
```

No modificar `package-lock.json` con una actualización masiva para iniciar el diseño. Si hay dependencias que deben corregirse, hacerlo como cambio identificado y verificar su efecto por separado.

### 12.2 Entornos y pruebas

| Entorno | Propósito | Estado de registro/base |
| --- | --- | --- |
| Production | Captación real y QA marcado | Habilitado; Redis real conectado |
| Preview | Revisión de cambios | Pausado por defecto; sin Redis productivo |
| Development | Desarrollo local | Pausado en plantilla; no contiene secretos |
| Playwright | Tests reproducibles | Fuerza configuración de prueba y simula endpoints |

Los tests E2E establecen responsable/correo ficticios y habilitan su formulario local; interceptan las APIs, por lo que no necesitan credenciales ni escriben en Redis. Si hay un servidor local ya abierto con otra configuración, detenerlo antes de Playwright para evitar que `reuseExistingServer` reutilice variables distintas.

Para probar la API localmente se necesita un runtime compatible con Vercel y configuración de una base de pruebas. Para una Preview funcional, crear/conectar una base separada y habilitar el registro únicamente allí. No ampliar a Preview el alcance de las credenciales productivas por comodidad.

El QA publicado debe usar `test=1`. Son claves de prueba dentro de la misma base productiva, no una base independiente ni una barrera de seguridad. Ese QA consume cuotas y comparte rate limits con el tráfico real; realizar un número reducido de envíos.

## 13. Variables y secretos

| Variable | Visibilidad | Configuración / función |
| --- | --- | --- |
| `VITE_CONTACT_EMAIL` | Pública, incluida en build | `monibank.proyecto@gmail.com` |
| `VITE_DATA_CONTROLLER` | Pública, incluida en build | `Moni Bank` |
| `VITE_REGISTRATION_ENABLED` | Pública y leída por servidor | `true` en Production; `false` en Preview y Development |
| `KV_REST_API_URL` | Solo servidor; Sensitive | Endpoint REST de Upstash inyectado por Marketplace |
| `KV_REST_API_TOKEN` | Solo servidor; Sensitive | Token REST con escritura del mismo par |
| `LEAD_HASH_SECRET` | Solo servidor; Sensitive | HMAC estable de al menos 32 caracteres |
| `UPSTASH_REDIS_REST_URL` | Solo servidor | Alternativa soportada; no necesaria con el par KV actual |
| `UPSTASH_REDIS_REST_TOKEN` | Solo servidor | Token del par alternativo |
| `KV_REST_API_READ_ONLY_TOKEN` | Solo servidor; Sensitive | Inyectado por integración; el código actual no lo utiliza |
| `KV_URL` / `REDIS_URL` | Solo servidor; Sensitive | Inyectadas por integración; no son el endpoint HTTP usado por las funciones |

Si existe `UPSTASH_REDIS_REST_URL`, el código selecciona **su** token; de lo contrario selecciona el par `KV_REST_API_*`. No combinar una URL con el token de otro par. No utilizar un token de solo lectura para `/api/lead`.

Todas las variables `VITE_` son públicas: nunca poner secretos bajo ese prefijo. Una modificación de configuración necesita un nuevo despliegue para que frontend y funciones adopten los valores. Mantener el mismo `LEAD_HASH_SECRET` durante el estudio; rotarlo cambia identificadores y rompe continuidad de deduplicación.

El flag actual pausa cuando vale exactamente la cadena `false`. El build de comprobación exige configuración completa cuando vale exactamente `true`. Utilizar explícitamente esos dos valores; no confiar en un flag ausente o en variantes como `False`/`1`.

No se requiere contraseña de Gmail, Google Workspace ni un dominio propio para el formulario. El correo se conserva en los avisos de privacidad/accesibilidad para solicitudes sobre datos y barreras; no se muestra como contacto del footer. El equipo debe mantenerlo accesible y atender solicitudes; no equivale a un servicio automático de email.

El nombre de marca es el valor actualmente configurado. La identificación formal del responsable debe mantenerse conforme al acuerdo académico aplicable; este README no certifica que una marca sustituya por sí sola una identidad responsable.

## 14. Formulario y contratos API

### 14.1 Campos del registro

| Campo | Valores | Regla |
| --- | --- | --- |
| `email` | Correo del adulto | Obligatorio; máximo 254 caracteres; normalizado a minúsculas y sin espacios extremos |
| `city` | `cali`, `other` | Obligatorio |
| `willingness` | `yes`, `maybe`, `no` | Obligatorio; una respuesta negativa no invalida el registro |
| `adult` | `true` | Confirma mayoría de edad y rol de cuidador; es declaración, no verificación documental |
| `consent` | `true` | Autoriza registro/investigación y contacto del piloto |
| `website` | Vacío | Honeypot; no es dato del estudio |
| `attribution` | Objeto descrito abajo | Obligatorio para coherencia de medición |

No solicitar nombre, edad del menor, colegio, teléfono, documento, información bancaria o tarjeta. La versión actual tampoco pregunta edad del adulto: solo su confirmación. Los campos extra no forman parte del registro normalizado.

`willingness` mide disposición a considerar un medio de pago supervisado; **no mide cuánto pagarían ni intención de aceptar una tarifa**. Evitar esa interpretación en reportes y copy.

### 14.2 Atribución

Campos admitidos por el servidor: `variant`, `firstVariant`, `source`, `crossExposure`, `isTest`, `visitorId` y `campaign`. Valores: variantes `a|b`, origen `campaign|direct`, indicadores booleanos e identificador aleatorio con formato esperado. El cliente conserva además `expiresAt` para su identidad local; el servidor no lo usa como TTL de Redis.

Los UTM aceptados son `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, limitados a 160 caracteres cada uno. No se debe introducir información personal en sus valores. No se captura `fbclid` en el esquema actual.

### 14.3 Ejemplo de registro de prueba

Este ejemplo ilustra el contrato, no debe enviarse masivamente ni convertirse en una fixture con datos reales:

```json
{
  "email": "qa@example.com",
  "city": "cali",
  "willingness": "maybe",
  "adult": true,
  "consent": true,
  "website": "",
  "attribution": {
    "variant": "a",
    "firstVariant": "a",
    "source": "campaign",
    "crossExposure": false,
    "isTest": true,
    "visitorId": "11111111-1111-4111-8111-111111111111",
    "campaign": {
      "utm_source": "meta",
      "utm_medium": "paid_social",
      "utm_campaign": "moni_qa",
      "utm_content": "a"
    }
  }
}
```

### 14.4 Endpoints

| Ruta | Cuerpo | Operación |
| --- | --- | --- |
| `POST /api/lead` | Datos del formulario y atribución | Escribe o deduplica contacto |
| `POST /api/visit` | `{ "attribution": { ... } }` | Registra navegador por variante y origen |
| `POST /api/event` | `{ "name": "...", "placement": "...", "attribution": { ... } }` | Registra acción permitida |

Todos esperan `Content-Type: application/json`, rechazan cuerpos mayores de 8192 bytes y responden con `Cache-Control: no-store`. Se rechaza `sec-fetch-site: cross-site`; esto no es autenticación ni elimina la posibilidad de bots que llamen directamente a la API.

| HTTP | Significado habitual |
| --- | --- |
| `200` + `{ "ok": true }` | Operación aceptada por el almacenamiento; para lead puede ser nuevo o repetido |
| `400` | Payload, atribución o honeypot inválidos |
| `403` | Solicitud identificada como cross-site |
| `405` | Método distinto de POST |
| `413` | Cuerpo demasiado grande |
| `415` | Tipo de contenido incorrecto |
| `429` | Límite de solicitudes; lead añade `Retry-After: 600` |
| `503` | Registro pausado, configuración incompleta o almacenamiento no disponible |

El mismo resultado de éxito para un correo nuevo y uno existente evita revelar a un tercero si ese correo está registrado. **No añadir `isNew` o `alreadyRegistered` a la respuesta pública sin evaluar esa consecuencia**, especialmente al implementar Pixel.

### 14.5 Estados que debe conservar el rediseño

Inicial; validación con resumen enfocado y errores por campo; envío en curso con botón deshabilitado; éxito solo tras persistencia confirmada; error recuperable con valores conservados; rate limit con instrucción de esperar; formulario pausado con aviso comprensible.

No simular éxito con un temporizador, no hacer la escritura opcional, no borrar lo escrito ante un fallo y no enviar el contenido de los campos como analítica.

## 15. Redis, retención y deduplicación

### 15.1 Configuración existente

La base `moni-registros` está conectada únicamente a Production. La metadata del traspaso original indicó plan Free, sin auto-upgrade ni eviction, región `iad1` y credenciales sensibles; el plan/cuotas no se volvieron a consultar al proveedor en la auditoría documental del 26/10. Verificar cuotas actuales en el proveedor al aumentar tráfico; no prometer que el plan o sus límites serán iguales en el futuro.

### 15.2 Espacios de claves

| Patrón | Contenido |
| --- | --- |
| `moni:live:v2:lead:<hmac-email>` | Contactos reales |
| `moni:test:v2:lead:<hmac-email>` | Contactos de prueba |
| `moni:<live\|test>:v2:visit:<visitorHash>:<source>:<variant>` | Visitas deduplicadas |
| `moni:<live\|test>:v2:event:<visitorHash>:<source>:<variant>:<name>:<placement>` | Eventos deduplicados |
| `moni:rate:<kind>:<hmac-ip>:<ventana>` | Contador temporal de rate limit |
| `moni:test:v2:probe:<uuid>` | Clave temporal del chequeo de build |

Los corchetes angulares son marcadores descriptivos, no claves literales. Nunca ejecutar `FLUSHDB`, `FLUSHALL` o una eliminación global para limpiar pruebas.

### 15.3 Datos guardados

El contacto contiene correo en texto, ciudad, disposición, declaraciones, elegibilidad, atribución sin `visitorId` crudo, `visitorHash`, fecha, versión de aviso y número de envíos. El HMAC protege las claves e identificadores; **no cifra el correo dentro del registro**. Los registros siguen siendo datos personales y la exportación sin correo es seudonimizada, no una garantía de anonimato irreversible.

El servidor no persiste IP cruda: usa un HMAC para el rate limit. Esto describe las claves de la aplicación, no todos los logs que puedan conservar los proveedores de infraestructura.

### 15.4 Retención y repetición

- Registros, visitas y eventos: TTL de 180 días desde su primera escritura.
- Identidad del navegador: 30 días en `localStorage`.
- Rate limit: ventana de 10 minutos y TTL de 600 segundos.
- Clave de comprobación del build: 60 segundos como respaldo y eliminación al finalizar.
- Lead repetido: incrementa `submissions` y actualiza exposición cruzada; conserva primer registro, respuestas originales, fecha, origen y TTL mediante Lua y `KEEPTTL`.
- Visitas/eventos usan `SET ... NX`: conservan el primer registro de cada clave. Repetirlos no actualiza su fecha, UTM o exposición cruzada; no son un historial completo de navegación.
- No se unifican automáticamente aliases de correo como puntos o `+etiqueta`.

La actualización atómica evita duplicados por solicitudes simultáneas. No sustituirla por un GET seguido de SET no atómico.

Rate limit: 10 intentos de lead por IP protegida/ventana; 120 para visitas y 120 para eventos. Test y live comparten el mecanismo. No hacer pruebas de carga contra producción.

## 16. Medición y análisis del estudio

### 16.1 Eventos existentes

| Evento | Ubicación permitida | Qué significa |
| --- | --- | --- |
| `cta_click` | `header`, `hero`, `product` | Navegador pulsa una entrada al formulario |
| `form_start` | `form` | Primer cambio de campo observado |
| `engaged_visit` | `page` | Aproximadamente 10 segundos acumulados de página visible |
| `faq_open` | `faq` | Apertura tras interacción; las FAQs inician abiertas |

El frontend deduplica durante la carga y Redis deduplica por navegador, origen, variante, acción y ubicación. Los datos expresan navegadores que realizaron una acción, **no clics totales, sesiones ni personas únicas**. No incluir valores introducidos en los campos.

Las claves locales `moni-research-v2-test` y `moni-research-v2-live` separan identidades. Se registra la primera variante vista y exposición cruzada. Bloqueos de almacenamiento, varios dispositivos o borrado del navegador afectan esa aproximación.

### 16.2 Elegibilidad

Un registro elegible en v2 cumple la declaración de adulto cuidador, consentimiento y ciudad Cali. La propuesta se dirige a familias con menores de 8–14 años, pero el formulario no comprueba la edad del menor ni que pertenezca realmente a ese rango.

`willingness='no'` sigue siendo elegible y se analiza por separado. No excluir respuestas negativas para aumentar la conversión. Otra ciudad es un registro válido pero no elegible para esa definición del estudio.

### 16.3 Métricas y cautelas

| Métrica | Cálculo / fuente |
| --- | --- |
| CTR | Clics definidos para el informe / impresiones de Meta; documentar si son clics en enlace u otro tipo |
| Conversión web | Registros elegibles / navegadores registrados en la cohorte comparable |
| Costo por registro | Inversión / registros elegibles del periodo y campaña seleccionados |
| Interés por CTA | Navegadores con `cta_click`; separación por ubicación |
| Inicio de formulario | Navegadores con `form_start` |
| Permanencia | Navegadores con `engaged_visit`; no duración media |

Con denominador cero, devolver no calculable. No mezclar visitas directas con campaña ni test con live. No confundir clics de Meta, sesiones, navegadores identificados y personas.

El script actual agrega toda la cohorte live v2 por variante; **no implementa filtros de fecha, campaña, versión de diseño ni exclusión automática de exposición cruzada**. Para reportes por periodo se necesita una transformación privada explícita. Conservar las columnas de atribución y fechas para ello. Los registros no guardan el SHA o versión visual de la web; `noticeVersion` identifica el aviso, no el diseño. Mantener un registro externo de despliegues/fechas/creatividades para segmentar resultados, sin alterar retrospectivamente los datos.

Revisar `eligibleWithoutRecordedVisit`, fallos de medición, duplicados, equipo/spam y cambios de creatividad. Como el contacto conserva su primera atribución, reenvíos posteriores no se reasignan a la campaña más reciente. El resumen por variante filtra `source=campaign`; los registros directos se separan. Un navegador puede registrar más de un correo, y una visita/evento puede fallar sin que falle el lead: la razón contactos/navegadores no es una probabilidad garantizada ≤100%. El frontend no garantiza reenvío automático de visitas fallidas. No presentar los números exportados como un análisis estadístico ya validado.

## 17. Exportación y solicitudes sobre datos

### 17.1 Exportación privada

Solo en un equipo autorizado, cargar las credenciales por un mecanismo seguro en `.env.local` y crear el directorio de salida:

```sh
node -e "require('node:fs').mkdirSync('exports', {recursive:true})"
node --env-file=.env.local scripts/export-results.mjs ./exports/resultados.json
```

No publicar el archivo. El script usa SCAN sobre `moni:live:v2:*`, obtiene registros y genera resumen por variante, registros directos, leads y visitas seudonimizados. Los eventos intervienen en el resumen; no se exporta actualmente un listado detallado de cada evento.

Para una gestión de contactos que lo requiera, de forma privada:

```sh
node --env-file=.env.local scripts/export-results.mjs ./exports/contactos.json --include-contacts
```

Sin esa opción se omiten los correos. `anonymousId` es un identificador derivado, no una prueba de anonimización completa. `exports/` y `.env*` están ignorados por Git, excepto `.env.example`. Las copias exportadas no heredan el TTL de Redis: gestionar su retención y acceso por separado.

No ejecutar exportaciones completas como parte rutinaria de un rediseño. Si solo se necesita comprobar infraestructura, usar la clave temporal de `check-storage.mjs`, no descargar contactos reales.

### 17.2 Eliminación de un contacto

Ante una solicitud legítima, usar:

```sh
node --env-file=.env.local scripts/delete-contact.mjs
```

Proporcionar el correo por entrada estándar y terminar con EOF. Así no se coloca como argumento en el historial del shell. Requiere el mismo secreto HMAC usado al guardar los datos. El script intenta eliminar las claves de lead v2 y las heredadas sin versión, tanto test como live, del correo indicado.

No ejecutar ese procedimiento solo para demostrar que funciona con contactos reales. No borra exportaciones privadas, registros de infraestructura ni visitas/eventos independientes. Revisar las copias que mantiene el equipo y el alcance de la solicitud; no prometer eliminación global automática.

## 18. GA4 y Meta: medición opcional

Configurados el 28/10/2026: GA4 `G-PTJVQQ1KM2` (propiedad «Moni · Landing» `561084377`) y Meta `1002049382950703` (portfolio «Moni Bank» `2541299039710328`). La guía completa para el equipo y futuras IA está en [docs/measurement-setup.md](docs/measurement-setup.md).

### 18.1 Alcance vigente

Un `page_view` de GA4 y un `PageView` de Meta por carga autorizada. No se envían conversiones de registro ni campos del formulario. Redis sigue siendo la fuente del estudio: métricas de visitas, eventos y registros guardados/deduplicados. La medición mejorada de GA4, las coincidencias avanzadas y los eventos sin código de Meta están desactivados.

La guía local de Gemini contenía IDs de ejemplo, scripts inline sin consentimiento, una ruta `main.jsx` inexistente y una sustitución de `vercel.json` que perdía comprobaciones existentes. Se adaptó su intención mediante módulos aislados; no se copió literalmente.

### 18.2 Consentimiento y privacidad

Aceptar, rechazar o elegir cada proveedor en el bloque al final de la página; cambiar la decisión en «Preferencias de medición». Antes de aceptar no se cargan proveedores. La elección dura 180 días y es independiente del checkbox de investigación/contacto. Retirarla no recarga el formulario. El aviso complementario se versiona como `moni-measurement-v1`; no cambia el consentimiento de registro `moni-interest-v2`, las claves Redis ni su retención.

Quien no llega al aviso o no acepta queda fuera de los terceros. Esta muestra no representa el total de visitas: no usarla como denominador de la tasa de registro del estudio.

### 18.3 Configuración y código

Solo Production recibe `VITE_MEASUREMENT_ENABLED=true`, `VITE_MEASUREMENT_HOST=moni-sigma-eight.vercel.app`, `VITE_GA4_MEASUREMENT_ID` y `VITE_META_PIXEL_ID` con los IDs anteriores. Requiere redeploy. Los IDs son públicos; nunca añadir tokens bajo `VITE_`.

`src/measurement-policy.ts` valida configuración, URL y consentimiento; `src/external-measurement.ts` carga los SDK; `src/MeasurementConsent.tsx` y `src/measurement.css` contienen exclusivamente los controles y aviso opcionales. No conectar estos módulos con `Registration` ni interceptar `/api/lead`. CSP limitada a orígenes concretos; se conserva `check-storage.mjs`. No añadir otra instalación en HTML/GTM.

### 18.4 QA y límites

Cualquier parámetro `test` excluye terceros incluso con consentimiento guardado. Preview, hosts ajenos, rutas o parámetros desconocidos también quedan excluidos. UTM sin datos personales y con letras ASCII, números, guion, guion bajo, punto o `~`; usar siempre `variant=a` o `variant=b` explícito en campañas.

Verificados: 37 unitarias/API, 32 E2E escritorio/móvil, build, formulario con proveedores bloqueados, rechazo/cambio de preferencia y ausencia de eventos tardíos tras revocación. SDK reales comprobados en localhost con CSP real y eventos interceptados: un evento de visita por proveedor, sin campos del formulario ni errores CSP. **La recepción en paneles aún no está confirmada**; no confundir emisión interceptada con recepción.

### 18.5 Pendientes de conversión y campaña

No hay `Lead`, `CompleteRegistration`, `generate_lead` ni CAPI. Antes de añadirlos, definir si se mide registro recibido o alta nueva deduplicada. Una respuesta pública `ok: true` también puede ser un duplicado; no exponer esa diferencia para implementar publicidad ni disparar conversión al hacer clic. Cualquier evento de registro requerirá persistencia correcta y consentimiento, con pruebas propias.

Falta confirmar recepción con tráfico real consentido o un diagnóstico separado autorizado y revisar permisos/vinculación de la cuenta publicitaria que utilizará el equipo. No se crearon campañas ni presupuestos. No desactivar las restricciones de categoría financiera de Meta para obtener más datos.

## 19. Accesibilidad, rendimiento y seguridad

### 19.1 Accesibilidad

Objetivo: WCAG 2.2 AA, sin afirmar conformidad total por un análisis automático. Ver [ACCESSIBILITY.md](ACCESSIBILITY.md).

Conservar HTML semántico, idioma `es-CO`, un H1, jerarquía de títulos, enlace de salto, etiquetas de campos, errores asociados, resumen enfocado, estados anunciados, foco visible y controles accesibles por teclado. Los diálogos deben cerrarse con Escape y devolver el foco. Mantener controles de tamaño suficiente; objetivo de proyecto de 44 px en acciones principales.

Las ilustraciones de app tienen descripciones y no deben introducir decenas de controles falsos en el orden de Tab. El producto está representado como demostración, no como UI bancaria interactiva.

Probar 320 px, zoom 200% y 400%, textos largos, teclado, lector de pantalla y estados de error. No quitar el contorno de foco ni usar el color como única señal.

### 19.2 Movimiento

La implementación vigente desactiva animaciones/transiciones y desplazamiento suave con `prefers-reduced-motion: reduce`. **Conservar ese comportamiento**, aunque una skill sugiera simplemente reducir intensidad.

Animar solo donde mejore comprensión o feedback. Priorizar `transform`/`opacity`, no desplazar el layout para efectos decorativos. Hover solo cuando el dispositivo lo permite. No animar cifras, compras o progreso dentro de la app protegida para hacerla parecer un producto distinto.

### 19.3 Rendimiento

Medir antes/después; no declarar resultados sin ejecutar herramientas. Conservar fuentes locales y evitar cargar dos familias o pesos innecesarios. Reservar dimensiones de medios; evitar saltos del formulario. El producto del hero debe ser visible pronto y no depender de un video pesado.

Si se añaden medios, optimizar formato/tamaño, usar poster y carga apropiada. No añadir una librería de animación grande para resolver una transición CSS. Evaluar el tamaño del bundle y la experiencia en conexión móvil. LCP, INP y CLS son indicadores a medir; los resultados de laboratorio no equivalen a métricas de usuarios reales.

### 19.4 Seguridad y dependencias

Mantener secretos en servidor, cabeceras de seguridad, validación, honeypot, límites y respuestas sin enumeración. No crear un endpoint de lectura pública para facilitar el QA. No registrar cuerpos completos del formulario en logs.

Auditoría repetida el 26/10/2026: `npm audit` informa **6 avisos (2 moderados y 4 altos)** en `@vercel/node` y su cadena de desarrollo (`@vercel/static-config`, `@fastify/busboy`, `ajv`, `path-to-regexp`, `undici`). `npm audit --omit=dev` informa **0**. Esto clasifica el árbol npm, no demuestra ausencia de riesgos en herramientas de desarrollo/build ni certifica el runtime administrado de Vercel.

La solución automática propone cambiar a `@vercel/node@4.0.0` desde `24.0.2`: no se aplicó ese cambio mayor ni se modificó el lockfile. Pendiente evaluar versiones compatibles y ejecutar pruebas de servidor/build antes de corregir. No usar `npm audit fix --force` a ciegas ni describir avisos como prueba de una explotación.

## 20. Pruebas y criterios de aceptación

### 20.1 Comandos existentes

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

GitHub Actions usa `npx playwright install --with-deps chromium` en Linux. Ejecuta instalación reproducible, pruebas unitarias/API, build y E2E; guarda `playwright-report/` y `test-results/` durante 14 días. El perfil móvil emula un iPhone 13 sobre Chromium: no equivale a haber probado Safari en un iPhone físico.

La comprobación real de almacenamiento se ejecuta en Vercel mediante:

```sh
npm run build && node scripts/check-storage.mjs
```

No basta con `npm run build` para afirmar que Redis fue probado. Sin variables Redis y con registro pausado, el script omite la prueba y lo informa. Con registro habilitado, exige conexión, responsable, correo y HMAC. Si Redis está configurado, comprueba escritura/lectura aunque la captación esté pausada. Un fallo impide publicar ese build.

### 20.2 Matriz de QA del rediseño

| Área | Comprobación |
| --- | --- |
| A/B | Copy correcto, producto correcto, mismos campos y CTA |
| Producto protegido | Capturas antes/después y contraste con Social; sin cambios internos |
| Viewports | 320, 390, 768, 1024 y 1440 px; sin overflow ni controles cortados |
| Navegación | Enlaces, anclas, foco y acceso al formulario |
| Formulario | Vacío, email inválido, selectores, consentimientos, envío, éxito, fallo y rate limit |
| Datos | `test=1`, variante, UTMs y deduplicación preservados |
| Analítica | Eventos permitidos, sin contenido de campos, sin duplicación involuntaria |
| Accesibilidad | axe, teclado, diálogos, zoom, movimiento reducido y revisión manual pendiente |
| Rendimiento | Bundle y medios; pruebas antes/después con contexto de ejecución |
| Producción | Commit correcto, READY, aliases correctos, storage check y formulario real |
| Meta | Solo si se implementa: matriz de aceptación/rechazo, pruebas, fallos y no duplicación |

Utilizar correos ficticios en `example.com`, no datos de integrantes o personas reales para pruebas. Mantener `test=1` incluso cuando se inspecciona una landing solo para diseño, porque las visitas también se miden.

No actualizar los tests únicamente para aceptar una regresión. Los tests que esperan el H1 actual deben cambiarse solo cuando exista una decisión explícita de copy compatible con la hipótesis. No borrar pruebas de API para facilitar un cambio visual.

### 20.3 Definición de terminado

Un cambio visual solicitado se considera completado cuando ambas variantes se ven profesionales y coherentes con Social, el producto permanece reconocible e intacto, las pruebas relevantes pasan, el flujo real de guardado funciona y la versión publicada se verifica. Entregar capturas comparables, cambios realizados, resultados reales y pendientes. Una captura bonita del hero no demuestra que la página completa esté terminada.

### 20.4 Capturas y evidencia reproducible

Con Chromium instalado, iniciar Vite en `127.0.0.1:4173` con configuración pública ficticia. Ejemplo PowerShell, sin credenciales Redis:

```powershell
$env:VITE_REGISTRATION_ENABLED='true'
$env:VITE_DATA_CONTROLLER='Equipo de prueba'
$env:VITE_CONTACT_EMAIL='qa@example.com'
npm run dev -- --host 127.0.0.1 --port 4173
```

Desde otra terminal en el repo:

```sh
node scripts/capture-visual.mjs before http://127.0.0.1:4173
# Después del cambio:
node scripts/capture-visual.mjs after http://127.0.0.1:4173
```

El script captura A/B a 1440 y 390 px, página completa, hero y, a 1440 px, el escenario del hero y las pantallas de la demo (v2). Escribe `.qa/before/` y `.qa/after/`, con `test=1` y movimiento reducido. Comparar imágenes, métricas y producto; no basta la existencia del archivo. El script **solo simula APIs cuando la URL contiene `127.0.0.1`**; no sustituirla por `localhost` suponiendo que tiene el mismo comportamiento. Contra una URL remota usa endpoints reales de prueba y puede crear visitas/eventos, aunque no envía formularios.

La suite E2E amplía responsive/estados y usa dos perfiles Chromium; no prueba Safari real, toda la matriz de fallos de red ni un lector de pantalla. Los tests unitarios inspeccionan comandos y simulan Redis; no ejecutan por sí solos el Lua sobre el proveedor. No hay un comparador automático de imágenes ni un guard de hashes en CI: realizar esas comprobaciones cuando el cambio visual lo requiera. Normalizar CRLF→LF al verificar los manifests evita falsos positivos por el checkout de Windows.

Para cambios exclusivamente documentales, verificar enlaces, consistencia con código y `git diff --check`; no repetir envíos al formulario sin un cambio funcional que lo justifique. CI y Vercel siguen ejecutándose al publicar. Distinguir en la entrega las pruebas nuevas de la evidencia anterior sobre código intacto.

## 21. Publicación, pausa y recuperación

### 21.1 Flujo de publicación

1. Consultar el HEAD actual de `main` y el estado del workspace. No sobrescribir cambios ajenos.
2. Trabajar en una rama o cambios controlados para revisar el diff. La autorización para publicar en `main` ya existe; no pedirla de nuevo rutinariamente para el alcance acordado.
3. Ejecutar pruebas correspondientes y comprobar continuidad con Social.
4. Publicar el commit sin force push. Confirmar que el despliegue usa ese SHA.
5. Revisar build logs, estado READY y la línea `Storage verification passed: PING, Lua write, exact read-back and expiration.` cuando se verifique Redis.
6. Comprobar la URL estable y realizar QA A/B con `test=1`.
7. Consultar errores de funciones y registrar el resultado. No equiparar READY con éxito del formulario.

La conexión GitHub→Vercel ya existe: no crear otro proyecto por defecto. Un push a `main` dispara despliegue. Cambiar variables necesita redeploy aunque no cambie el código. Una actualización documental puede disparar igualmente CI y Vercel; no deshabilitar esas comprobaciones como efecto secundario.

### 21.2 Pausar captación

Establecer `VITE_REGISTRATION_ENABLED=false` en Production y redesplegar. Verificar aviso, botón deshabilitado y respuesta `503 registration-paused`. Esto pausa también la medición de la aplicación. No borrar Redis para cerrar la prueba.

### 21.3 Recuperar una versión

Identificar el último despliegue funcional, revisar compatibilidad de sus variables/contratos y restaurar mediante los mecanismos de Vercel o un revert de Git controlado. Conservar registros y HMAC. Un rollback de frontend no debe usarse para improvisar una migración de datos.

Documentar qué versión y periodo estuvieron activos. Si se revierte una integración de Pixel, revisar también aviso, consentimiento, variables y CSP; no dejar políticas que describan una implementación diferente.

### 21.4 Diagnóstico rápido

| Síntoma | Revisar primero |
| --- | --- |
| Formulario pausado | Flag del entorno y fecha del último redeploy |
| `not-configured` | Par URL/token, HMAC, responsable y correo en ese entorno |
| Redis funciona pero API falla | Token con escritura, nombre exacto de variables, runtime y logs |
| `429` en pruebas | Número de intentos y ventana compartida; esperar, no eliminar protección |
| Vite local devuelve 404 en API | Es frontend solo; usar mocks o runtime de funciones |
| Preview no guarda | Es el estado esperado sin base/flag de pruebas configurados |
| Se ve A cuando se esperaba B | `variant=b` exacto y URL real del anuncio |
| Datos de QA aparecen en cohorte real | Faltó `test=1`; registrar exclusión privada, no borrar indiscriminadamente |
| Meta no recibe registros | Se miden visitas autorizadas; conversión de registros aún no implementada. Ver sección 18 |
| App cambia tras rediseño | Tokens/estilos heredados y selectores compartidos, además del componente |

## 22. Plan de ejecución y pendientes

**Completado:** rediseño de ambas landings; revisión de Social; footer y eliminación del rótulo académico público; SVG vectorial sin deformación; retirada del contacto del footer; preservación del producto, formulario y almacenamiento; verificación y publicación. No tratarlos como pendientes de la próxima IA.

| Prioridad / condición | Pendiente real | Evidencia de cierre |
| --- | --- | --- |
| En cada nuevo entorno | Comprobar conexiones y disponibilidad local de referencias | Accesos efectivos y límites declarados; sin asumir credenciales heredadas |
| Antes de aplicar mentoría no leída | Acceso a comentarios de Figma | Hilos relevantes leídos y decisiones trazables; no confundirlos con notas del lienzo |
| Si se pide sincronizar Figma | Incorporar allí los cambios posteriores de landing/footer/logo | Nodos y capturas concordantes; no regenerar la web desde el Figma desactualizado |
| Si se cambia tarjeta/producto | Resolver versión aprobada frente a Social | Elección explícita y comparación; no unificación automática |
| Técnica | Corregir de forma controlada los 6 avisos npm de desarrollo | Dependencias compatibles y reporte/pruebas actualizados |
| Accesibilidad | NVDA/VoiceOver, zoom nativo y Safari/iPhone real | Plataforma, pasos y barreras documentados; no equivalencia con emulación Chromium |
| Rendimiento | Medición de laboratorio y, cuando exista muestra, datos reales | LCP/INP/CLS y contexto de ejecución; no cifras inventadas |
| Antes de seguimiento Meta | ID/dataset real, acceso a Events Manager, conversión, consentimiento, aviso y CSP | Criterios de sección 18; no es bloqueo para el estudio con datos propios |
| Técnica, si se acuerda | Alinear Node de CI y Vercel | Versiones efectivas y compatibilidad verificadas |
| Antes de comparar campañas | Fechas, audiencias, creatividades, versión desplegada y filtros del reporte | Análisis privado reproducible; sin mezcla de cohortes o exposición cruzada silenciosa |
| Opcional, por petición | Dominio propio, correo automático, CAPI o panel privado | Necesidad y alcance explícitos; no requisitos de la landing |

No crear por inferencia autenticación bancaria, pagos, KYC, una app operativa, nuevas bases o campañas. La lista de pendientes informa futuras decisiones, no autoriza ejecutarlas todas.

### Entrega de una próxima tarea

Informar qué cambió y por qué, archivos/commit, verificaciones nuevas y sus límites, enlaces de producción o Figma según alcance y pendientes concretos. En cambios visuales incluir capturas comparables A/B y revisión del producto. Si cambia configuración, contrato, medición, referencia aprobada o procedimiento, actualizar el README; no añadir entradas que contradigan secciones vigentes.

## 23. Prompt listo para retomar

Copiar al abrir el repo con cualquier modelo y reemplazar el marcador por una tarea concreta. No sustituye la lectura de documentación:

> Continúa Moni en ItsSilva/Moni. Mi tarea actual es: [DESCRIBIR CAMBIO Y ENTREGA: CÓDIGO, FIGMA O AMBOS]. Lee completos README.md y AGENTS.md, y consulta docs/skills-lock.json y docs/product-baseline.json. Inspecciona primero el workspace y conserva cambios existentes; el repo debe estar en Moni, junto a Social. Confirma el estado de main y las conexiones disponibles sin asumir credenciales heredadas. Las landings y el footer ya están rediseñados, usan el SVG nuevo y no muestran la etiqueta académica ni contacto en footer. Figma conserva versiones anteriores en partes de la landing: usa el mapa y las decisiones vigentes del README. No ejecutes otra vez el rediseño ni los pendientes por inferencia. Conserva identidad, producto y datos fuera del alcance; si pido cambiar pantallas explícitamente, aplica el flujo 5.5 al destino solicitado y declara qué queda sincronizado. A es predeterminada, B requiere variant=b, primero se estudia A y luego B. Conserva validación, consentimiento, guardado real, deduplicación, retención y medición; todo QA publicado lleva test=1 y datos ficticios. No exportes contactos para revisar diseño ni publiques Social. Usa las skills pertinentes, verifica y entrega evidencia proporcional al cambio. Las correcciones acordadas pueden publicarse en main y el Vercel existente sin force push. GA4 y Meta miden visitas opcionales según la sección 18; no añadir conversiones ni modificar el formulario por inferencia. Actualiza documentación solo cuando corresponda e informa accesos imprescindibles faltantes con precisión.

## 24. Fuentes y trazabilidad

Fuentes de contexto y evidencia: instrucciones del usuario; código actual `009e5d0469fb24a5f539b192b43c181503fb6e6d` y base histórica `c54d4e5701a95220e05144c4ce48af8194103e52`; metadata de Figma y Vercel; CI enlazada; revisiones versionadas y pruebas A/B de la entrega previa. Los datos de acceso y fechas son una fotografía del momento del traspaso, no secretos ni promesas de disponibilidad futura.

Referencias de diseño y skills:

- [Nu Cuenta](https://nu.com.co/cuenta).
- [Revolut Kids & Teens / padres y tutores](https://www.revolut.com/es-ES/revolut-kids-and-teens-parent-and-guardians/).
- [Taste Skill](https://www.tasteskill.dev/) y [repositorio original](https://github.com/Leonxlnx/taste-skill).
- [better-interface en UI Skills](https://www.ui-skills.com/skills/jakubkrehel/better-interface) y [repositorio original](https://github.com/jakubkrehel/skills).
- [Find Animation Opportunities](https://aiuxplayground.com/skills/find-animation-opportunities) y [repositorio original](https://github.com/emilkowalski/skills).
- [Catálogo UI Skills](https://www.ui-skills.com/).

Referencias técnicas para comprobar al implementar:

- [Skills de Codex](https://developers.openai.com/codex/skills).
- [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite).
- [Variables de Vercel](https://vercel.com/docs/environment-variables).
- [API REST de Upstash](https://upstash.com/docs/redis/features/restapi).
- [Meta Pixel](https://developers.facebook.com/documentation/meta-pixel).
- [Conversion tracking de Meta](https://developers.facebook.com/documentation/meta-pixel/implementation/conversion-tracking).
- [Control de consentimiento del Pixel](https://developers.facebook.com/documentation/meta-pixel/implementation/gdpr), como referencia técnica; no sustituye evaluar las reglas aplicables al estudio.

Este documento distingue **estado implementado**, **procedimientos para futuras tareas** y **pendientes**. Ante una contradicción con el código o los servicios actuales, comprobar la realidad, conservar los límites del usuario y actualizar la documentación con evidencia.

## 25. Entrega visual del 25 de octubre de 2026

- Repo clonado en `Moni`, junto a `../Social`; originales intactos y fuera del repositorio. Formatos reales: `InstagramPostsFeed.jpeg`, `TikTokReel1.mp4` y `TikTokReel2.mp4`. Inventario, duración y discrepancias en [visual-review](docs/visual-review.md).
- Dirección: capítulos de color de Moni, Outfit y producto existente. Hero con jerarquía entre tarjeta y promesa A/B, escenario de producto, beneficio principal destacado, FAQ con medida de lectura y formulario con mejor composición. No se inventan testimonios, métricas o capacidades operativas.
- `src/landing.css` contiene únicamente estilos de la landing. `src/styles.css`, `src/ProductPreview.tsx`, logo y assets de producto están sin cambios. Las capturas normalizadas del hero y pareja de pantallas tienen cero píxeles diferentes antes/después para A y B.
- Formulario: región de éxito persistente, foco de confirmación, `aria-busy` y email sin corrector. Guardado, campos, consentimientos, errores, datos, API, medición, atribución, Redis y configuración Vercel se conservan.
- Microinteracciones: pulsación de CTA, aparición de confirmación y diálogo. Sin movimiento del producto o al recorrer secciones; movimiento reducido desactiva todo. Hover condicionado al puntero.
- Verificación local: **34 unitarias/API y 22 E2E**, TypeScript/build, axe, teclado, estados de formulario, cinco anchos 320–1440 px, reflujo equivalente a zoom 200/400% y aviso de registro pausado. Los E2E usan mocks; las pruebas publicadas y el chequeo de build de Vercel verifican el almacenamiento real por separado. No se declara revisión con NVDA/VoiceOver ni Safari físico.
- Capturas reproducibles: con Vite y configuración pública ficticia de QA, ejecutar `node scripts/capture-visual.mjs final`. Escribe `.qa/final/`, siempre con `test=1`, y normaliza solo la colocación externa de clones para comparar producto. `.qa/`, `.qa-tools/` y `.taste-skill/` son locales e ignorados. Ningún original de Social se publica.
- Auditoría npm: los seis avisos heredados están en la cadena de desarrollo de `@vercel/node` (`undici`, `@fastify/busboy`, `path-to-regexp`, `ajv`, `@vercel/static-config`). `npm audit --omit=dev` devuelve cero. No se aplicó la propuesta automática de downgrade mayor a `@vercel/node@4`; queda una revisión técnica controlada. Esto no certifica el runtime administrado de Vercel.
- Taste y better-interface se ejecutaron con hallazgos y excepciones documentados. El inspector estricto de Taste **no se declara aprobado**: reclama, entre otros, copy de más de dos líneas, sombras y rótulos internos del producto y una cuota de fotografías/movimiento que contradice Moni. No se cambió el producto ni se añadió relleno para satisfacer esos contadores.
- Figma: diseño y componentes accesibles por MCP; comentarios no expuestos por el conector y bloqueados por registro en el navegador integrado. Pendiente iniciar sesión allí o facilitar los comentarios para revisarlos. No se modifica Figma.
- **Meta Pixel sigue pendiente y sin activar.** Hacen falta ID real/dataset, acceso a Events Manager y Eventos de prueba, definición de conversión y consentimiento publicitario separado con aviso/CSP verificados según el plan de la sección 18.
- Pendiente de producto: escoger la tarjeta aprobada para una eventual unificación. Social tiene ojos y tarjeta rosa; Figma/código vigentes, azul sin ojos. En esta entrega se mantiene congelado el producto de main.

Consultar el SHA de publicación, READY y comprobación de producción en la entrega del chat y los registros de GitHub/Vercel del commit. La aprobación automática de pruebas no sustituye las limitaciones documentadas.

## 26. Corrección de presentación pública y footer · 26 de octubre de 2026

**Ajuste posterior vigente:** cabecera y footer usan `public/moni-logotype.svg` a partir del export vectorial `../Logotipo.svg` del usuario. Se conserva el trazado y se elimina solo el viewport vacío lateral (128×32 → 89×32), con altura automática. El PNG anterior ya no se usa. Se retira el bloque «Hablemos» completo del footer y se equilibran dos columnas en escritorio, una en móvil. El correo permanece dentro de los avisos para solicitudes sobre datos y barreras de accesibilidad. No se cambian formulario, configuración o almacenamiento.

- A petición expresa del usuario, se retira la etiqueta «proyecto académico» de cabecera, registro, footer, privacidad y descripción para buscadores. `VITE_DATA_CONTROLLER` pasa a `Moni Bank` en Production/Preview/Development; requiere un nuevo despliegue. La documentación conserva el contexto de investigación y su historial. Esta decisión sustituye las indicaciones públicas anteriores sobre esa etiqueta.
- Se mantienen los fines de investigación, consentimiento, retención de 180 días y la aclaración de propuesta de producto y lista de espera. No se añade ninguna afirmación de banco operativo. Es una corrección editorial: no cambia el tratamiento ni el contrato de consentimiento `moni-interest-v2`.
- Primera revisión del footer (histórica): marca, lema, navegación, contacto y avisos en tres columnas. El ajuste posterior descrito arriba elimina contacto y pasa a dos columnas; no restaurar aquella composición. Sin estadísticas, alianzas, sellos o servicios inventados.
- Primera sustitución del logo (histórica): `../LogotipoMoni.png` con margen transparente recortado en `public/moni-logotype.png`. Quedó sustituido en cabecera/footer por el SVG posterior. La proporción 89:32 y altura automática se mantienen; `public/moni-logo.svg`, tarjeta, pantallas, `ProductPreview.tsx` y `styles.css` permanecen intactos.
- QA: 34 unitarias/API, build TypeScript/Vite y 22 E2E correctos. Revisión A/B a 320/390/768/1440 px: sin overflow ni infracciones axe en las reglas ejecutadas; enlaces, diálogos y retorno de foco correctos. El logo mantiene proporción medida en 320/390/1440. Cuatro capturas normalizadas del producto: cero píxeles diferentes frente al estado anterior.
- Evidencia local ignorada: `.qa/footer-before/` y `.qa/footer-final/`; revisión detallada en [footer-review](docs/footer-review.md). Pruebas publicadas siempre con `test=1`; sin consultar contactos reales.
- Meta Pixel sigue pendiente, sin activarse. No se requiere para validar interés con la medición propia actual; su incorporación futura debe seguir la sección 18.

## 27. Landing v2 · lenguaje de redes y app C · 27 de octubre de 2026

- **Pedido de la usuaria:** mejorar el diseño con el lenguaje del contenido de redes sin perder el foco de la investigación, diseñarlo primero en Figma y construirlo en React con más interacción. Decisiones explícitas: producto de redes/app C (tarjeta con ojos, pantallas C), personajes con ojos «como en redes», revisión en Figma, sin campaña corriendo todavía.
- **Figma:** página «Landing v2 · Redes + App C» (`127:788`) con Desktop A/B, Mobile A, éxito del registro, notas de interacción y las dos opciones de header. Se eligió la **opción 2** (hipótesis contrastada). La usuaria ajustó después el rótulo común a texto blanco sin bloque y la tarjeta del hero a coral; el código sigue esa versión. Mobile B no está dibujado: es Mobile A con el copy y las pantallas de B.
- **Código:** `ProductPreview.tsx` y `landing.css` eliminados; nuevo `Art.tsx`, `src/art/`, `public/app/`. Formulario, validación, consentimientos, estados, API, atribución, medición, Redis y configuración Vercel sin cambios funcionales. Se añade el peso 800 de Outfit.
- **Movimiento** (todo anulado con `prefers-reduced-motion: reduce`): botones que se hunden 3 px al presionar, entrada escalonada de los bloques de palabra, entrada del teléfono, la tarjeta y los personajes en el hero, parpadeo ocasional de ojos, inclinación de la tarjeta con el puntero (solo puntero fino), aparición de pantallas al entrar en viewport, pasos numerados que aparecen en secuencia, icono +/− de FAQ, confeti breve al registrarse. Sin JS o con movimiento reducido todo queda visible.
- **Pruebas:** 34 unitarias/API, build TypeScript/Vite y 22/22 E2E (Chromium escritorio e iPhone 13 emulado) con axe sin violaciones. Los E2E se actualizaron al H1 aprobado y a la nueva ilustración de producto (comprobación de que el teléfono y los bloques del H1 caben en 320–1440 px y de que las pantallas tienen texto alternativo); la prueba de assets recorre la página porque las pantallas cargan en diferido.
- **Pendiente:** QA publicado con `test=1` tras el despliegue, comparar en Safari/iPhone real, decidir si Mobile B se dibuja en Figma, y sincronizar Figma si se cambian pantallas o copy desde código.
