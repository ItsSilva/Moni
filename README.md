# Moni · Su autonomía, tu compañía

> **Documento de continuidad para Codex — actualizado el 26 de octubre de 2026.**
> **Decisión pública vigente:** se retira la etiqueta «proyecto académico» de toda la web y se renuevan footer y logo de la landing. Ver sección 26; las menciones académicas históricas de este documento no son instrucciones para restaurar ese rótulo público.
> **Actualización visual implementada:** ambas variantes comparten una composición nueva, con producto protegido y contratos existentes. Ver [revisión visual y evidencia](docs/visual-review.md) y [continuidad de esta entrega](#25-entrega-visual-del-25-de-octubre-de-2026). **Primero se utiliza A y después B; A sigue por defecto.** Las secciones 1–24 conservan el traspaso previo y su contexto histórico; el estado de esta entrega se registra al final.

Este README reúne el contexto de producto, las decisiones tomadas, el estado comprobado, las conexiones necesarias, las skills instaladas, los límites del rediseño, el funcionamiento técnico y los pendientes. Está escrito para que otro agente pueda continuar sin disponer del chat original. No contiene secretos y no concede acceso por sí mismo a cuentas privadas.

**Instrucción principal:** mejorar la landing hasta alcanzar una ejecución visual comparable con páginas profesionales de producto financiero, tomando referencias de Nu y Revolut, **conservando siempre el estilo gráfico de Moni y la interfaz de su app**. Moni Bank sigue siendo un proyecto académico; el acabado profesional no debe sugerir que ya opera como banco.

## Índice

1. [Arranque para Codex](#1-arranque-para-codex)
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
18. [Meta Pixel: implementación pendiente](#18-meta-pixel-implementación-pendiente)
19. [Accesibilidad, rendimiento y seguridad](#19-accesibilidad-rendimiento-y-seguridad)
20. [Pruebas y criterios de aceptación](#20-pruebas-y-criterios-de-aceptación)
21. [Publicación, pausa y recuperación](#21-publicación-pausa-y-recuperación)
22. [Plan de ejecución y pendientes](#22-plan-de-ejecución-y-pendientes)
23. [Prompt listo para retomar](#23-prompt-listo-para-retomar)
24. [Fuentes y trazabilidad](#24-fuentes-y-trazabilidad)

## 1. Arranque para Codex

Antes de editar la interfaz:

1. Leer este documento y [AGENTS.md](AGENTS.md) completos. Confirmar el estado actual de `main`; esta documentación describe una línea base, no garantiza que producción siga en el mismo commit meses después.
2. Abrir el repositorio **ItsSilva/Moni**. Leer `package.json`, `src/content.ts`, `src/main.tsx`, `src/ProductPreview.tsx`, `src/styles.css`, `src/attribution.ts`, `src/analytics.ts`, `server/research.ts` y `vercel.json`.
3. Comprobar acceso real a GitHub, al proyecto correcto de Vercel, a la página publicada y al Figma identificado abajo. Registrar qué conexiones permiten lectura, edición y despliegue. No asumir que un enlace público equivale a permisos administrativos.
4. Localizar la carpeta **Social** indicada por el usuario dentro de su carpeta de trabajo de Codex. Revisar anuncios en video y posts de Instagram. No iniciar una reinterpretación del producto sin verla.
5. Leer las nueve skills incluidas en `.agents/skills/`, empezando por sus `SKILL.md`. Verificar su detección en la sesión de Codex. No sustituir la instalación por mencionar nombres en un prompt.
6. Capturar A y B antes de cambios, en móvil y escritorio, con `test=1`. Guardar una comparación de las pantallas de app y de las piezas de Social. Las capturas de referencia deben corresponder a la versión realmente abierta.
7. Ejecutar la línea base de pruebas. Separar resultados reales, mocks y verificaciones que no puedan ejecutarse.
8. Preparar una auditoría visual con problemas concretos y evidencia. Priorizar jerarquía, composición, ritmo, calidad responsive y estados del formulario.
9. Implementar el rediseño de ambas variantes conservando sus diferencias de mensaje. No modificar la API, el esquema de datos o la metodología como efecto secundario de un cambio visual.
10. Probar, comparar con Social, revisar el diff, publicar dentro de la autorización existente y comprobar la versión final en producción.

La tarea actual de preparación **no rediseña la página ni instala Meta Pixel**: deja documentación, skills y una línea base para ejecutar esa siguiente etapa correctamente.

## 2. Contexto y decisiones

### 2.1 Qué es Moni

Moni es una propuesta académica de tarjeta débito y app para que padres, madres y cuidadores acompañen el aprendizaje y uso del dinero de niños y niñas de **8 a 14 años**. La investigación inicial se enfoca en familias de **Cali, Colombia**.

La página busca validar interés mediante una lista de espera. No abre cuentas, emite tarjetas, recibe depósitos, cobra dinero ni garantiza participación en un piloto. Las pantallas del producto son conceptuales y sus cifras son de demostración.

### 2.2 Objetivo de esta fase

Elevar la calidad de ejecución de la landing: que se perciba cuidada, coherente, clara, profesional y propia de Moni. La referencia bancaria se aplica al nivel de diseño y a la claridad de la comunicación; no autoriza inventar licencias, respaldo financiero, alianzas, métricas comerciales o funcionalidades operativas.

El usuario ya creó videos para publicidad y publicaciones de Instagram. La web debe ser la continuación visual de esas piezas. No se busca renovar la identidad de marca ni diseñar una app nueva.

### 2.3 Decisiones ya tomadas

| Tema | Decisión vigente |
| --- | --- |
| Nombre público | Moni Bank |
| Contacto | `monibank.proyecto@gmail.com` |
| Dominio | Subdominio de Vercel; no consta dominio propio adquirido |
| Variantes | A: control y acompañamiento; B: aprendizaje y ahorro |
| Secuencia | Primero A; luego B; sin reparto aleatorio ni cambio automático |
| Público del formulario | Solo adultos cuidadores |
| Datos de menores | No solicitarlos ni incorporarlos a eventos |
| Identidad visual | Conservar Outfit, logo, paleta y estilo del producto |
| App de demostración | Conservar su interfaz, coherente con Social |
| Backend | Funciones de Vercel y Upstash Redis REST; ya operativo |
| Canal publicitario previsto | Meta Ads; las campañas se administran fuera de este repositorio |
| Meta Pixel | Todavía no implementado ni configurado |
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

El enlace de Figma omitido en el último mensaje se recupera del enlace previo y del README existente. Los nodos se conservan como referencias del proyecto; reabrirlos y verificar que siguen siendo los correctos antes de intervenir. En esta actualización documental no se realizó una auditoría nueva de sus comentarios.

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

Un README puede proporcionar contexto y destinos; no transfiere las sesiones autenticadas de ChatGPT a Codex. En el equipo o entorno de destino:

| Servicio | Comprobación necesaria | Si falta acceso |
| --- | --- | --- |
| GitHub | Leer `main` y comprobar capacidad de publicar en el repositorio autorizado | Conectar la cuenta/instalación correcta; conservar el trabajo local |
| Vercel | Leer el proyecto, metadata de variables y último despliegue; capacidad de desplegar | Conectar Vercel o usar su CLI autenticada en el equipo correcto |
| Figma | Abrir archivo, frames y comentarios relevantes | Solicitar acceso al archivo o un export de los comentarios faltantes |
| Web | Abrir A/B, inspeccionar estados y realizar QA con `test=1` | Registrar el bloqueo concreto, sin declarar el sitio verificado |
| Social | Leer archivos locales de la carpeta indicada | Solicitar su ruta real o montaje; no inferir su contenido |
| Meta | Acceder al dataset/píxel y a Eventos de prueba cuando se implemente | Pedir identificador público del píxel y conexión apropiada; no contraseñas |

Preferir conectores/MCP cuando cubran la operación. Una sesión de Codex en la nube no ve automáticamente carpetas del PC. La instalación de skills tampoco instala ni autentica conectores de GitHub, Vercel o Figma.

No copiar tokens, cookies, contraseñas, `.env.local` ni secretos dentro de este README, issues, PRs, capturas públicas o logs. No hacer público Figma o Social para resolver un problema de acceso. No pedir contraseñas por chat.

La autorización existente permite avanzar con el proyecto y sus correcciones. No es una autorización para contratar servicios de pago, publicar los originales de Social, cambiar de propietario, borrar datos del estudio o iniciar campañas con presupuesto no definido.

## 4. Estado verificado y límites de la evidencia

### 4.1 Línea base funcional

| Elemento | Estado comprobado al preparar el traspaso |
| --- | --- |
| Commit funcional base | `c54d4e5701a95220e05144c4ce48af8194103e52` |
| Despliegue funcional | `dpl_Gh4rEd8KihV4QgVBRehFaFrbiVpw`, estado `READY`, Production |
| Código | React + TypeScript + Vite; funciones `api/` |
| Formulario | Habilitado en Production |
| Preview / Development | Registro pausado; sin credenciales de la base productiva |
| Redis | Conectado vía Marketplace, variables sensibles solo en Production |
| Verificación de Redis | PING, escritura con Lua, lectura exacta, TTL y limpieza de clave temporal |
| Prueba publicada A | Formulario completado con correo ficticio y `test=1`; mostró confirmación |
| Prueba publicada B | Formulario completado con correo ficticio y `test=1`; mostró confirmación |
| Pruebas automatizadas base | 34 unitarias/API y suite Playwright de 14 casos en dos perfiles |
| CI base | [Ejecución 40214205152](https://github.com/ItsSilva/Moni/actions/runs/40214205152), correcta |
| Logs de ejecución | Sin entradas error/fatal en la ventana revisada tras las pruebas; no equivale a garantía permanente |
| Cambios de este traspaso | Documentación y skills; no rediseño visual ni cambio de contratos API |

La prueba de Redis realizó una lectura exacta de su propia clave temporal. La prueba de formulario observó la confirmación de la aplicación, cuyo servidor espera a que Redis confirme la escritura. **No se inspeccionaron manualmente los datos de personas reales ni se realizó una auditoría completa de la base.**

### 4.2 Lo que todavía no se debe afirmar

- Que Meta Pixel está instalado, enviando eventos o atribuyendo conversiones.
- Que existen campañas activas o presupuesto contratado desde este trabajo.
- Que Gmail recibe cada formulario: los datos se guardan en Redis, no se envían por correo.
- Que los tests con mocks verifican por sí solos la infraestructura real.
- Que se obtuvo certificación WCAG o se completó una auditoría manual con lector de pantalla.
- Que las piezas de Social se revisaron aquí: no estaban disponibles en este workspace.
- Que una puntuación Lighthouse o métricas de usuarios reales ya fueron medidas; deberán recogerse.
- Que la marca Moni Bank es una entidad jurídica o financiera autorizada.

## 5. Reglas visuales que no se negocian

### 5.1 Jerarquía de decisiones

Aplicar las instrucciones vigentes del usuario y las restricciones de este proyecto antes que preferencias genéricas de cualquier skill. Usar Social y Figma para contrastar continuidad. Si muestran versiones distintas, documentar la diferencia y aclarar únicamente qué archivo es la referencia aprobada; no rediseñar arbitrariamente la app para resolverla.

**Una recomendación de Taste no autoriza cambiar la interfaz del producto, la paleta, la familia tipográfica, el copy de la hipótesis ni la representación académica.**

### 5.2 Marca a conservar

| Token / recurso | Valor actual | Tratamiento |
| --- | --- | --- |
| Familia | Outfit | Conservar; pesos locales 400, 500, 600 y 700 |
| Azul principal | `#2667FF` | Color de acción y marca |
| Azul hover | `#164ED1` | Estado actual de interacción |
| Tinta | `#101828` | Texto principal |
| Texto secundario | `#475467` | Usar con contraste comprobado |
| Fondo suave | `#F2F5FF` | Superficie de marca |
| Amarillo | `#F2ED6F` | Acento existente; no sustituir por una paleta genérica |
| Rosa | `#EEB1E4` | Acento existente |
| Azul oscuro | `#111E3E` | Sección de demostración y producto |
| Bordes | `#7C879B` | Token actual; cualquier ajuste debe preservar controles legibles |
| Logotipo | `public/moni-logo.svg` | No redibujar, deformar, recolorear ni sustituir |
| Recursos de producto | `public/product/` | Conservar originales |

Es válido mejorar la proporción de uso de colores, el espaciado y la jerarquía en la landing. No es válido reemplazar la identidad por el morado de Nu, una estética genérica de Revolut, otra fuente o un kit descargado.

### 5.3 Interfaz de app protegida

El archivo [src/ProductPreview.tsx](src/ProductPreview.tsx) contiene las vistas de límites, compras y ahorro, la tarjeta y sus composiciones. Conservar:

- Estructura interna de pantallas, navegación, rótulos, jerarquía y estilo de controles.
- Tipografía, colores, iconografía, tamaños relativos, proporciones y disposición.
- Contenido de demostración: límites, movimientos, progreso de ahorro y textos de las pantallas.
- Diseño de la tarjeta, logo, chip y símbolo de pago sin contacto.
- La distinción entre ilustración conceptual y controles realmente utilizables.

A muestra límites; B muestra ahorro; ambas incluyen movimientos. No convertir estas ilustraciones en formularios o simuladores nuevos ni introducir comportamientos financieros reales.

**Permitido alrededor del producto:** mejorar la ubicación del bloque dentro de la landing, el espacio que lo rodea y su escala uniforme para adaptarlo al viewport. Cualquier recorte debe conservar legibilidad y no esconder contenido necesario. No cambiar los componentes internos para obtener una composición más llamativa.

**Atención al CSS compartido:** cambiar variables globales, reglas de `strong`, `span`, `p`, tamaños tipográficos o selectores de producto puede modificar la app aunque `ProductPreview.tsx` no cambie. Revisar `.phone*`, `.debit-card`, `.card-*`, `.mini-logo`, `.white-logo`, `.phone-screen`, `.app-progress`, `.goal-*`, `.balance`, `.limit`, `.conversation`, `.benefit-preview`, `.purchase-row` y `.preview-line`. Aislar estilos de la landing cuando sea necesario.

[docs/product-baseline.json](docs/product-baseline.json) registra hashes SHA-256 de componentes y assets protegidos en el commit base. Sirve para detectar modificaciones de archivos; **no reemplaza la comparación visual** ni cubre automáticamente el CSS heredado.

### 5.4 Cambios que sí se esperan

Mejor composición del hero, jerarquía tipográfica en la página, anchos de texto, ritmo entre secciones, alineación, navegación, presentación de beneficios, transiciones de color, calidad de estados, responsive y accesibilidad. Se puede reorganizar código para hacerlo mantenible sin cambiar su comportamiento ni el aspecto del producto.

Evitar secciones de relleno, estadísticas inventadas, testimonios ficticios, sellos de seguridad o logos de alianzas inexistentes, cintillos decorativos sin función, exceso de tarjetas, efectos de cursor, gradientes genéricos, animaciones permanentes y fotografías que se presenten como clientes reales sin serlo.

## 6. Carpeta Social y continuidad de campaña

El usuario informó que existe una carpeta llamada **Social** dentro de la carpeta donde trabaja con Codex. Contiene los videos de publicidad y los posts de Instagram ya creados. La ruta absoluta y el inventario no se conocen en este entorno; no afirmar que forma parte del repositorio ni que fue descargada.

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

Las skills están incorporadas **a nivel de proyecto** en `.agents/skills/`. Se copiaron desde los repositorios originales, con sus archivos auxiliares y licencias MIT. No se ejecutaron sus scripts ni se aplicó un rediseño durante esta preparación.

Al clonar la versión actual de Moni, los archivos viajan con el repositorio. No hace falta reinstalar globalmente ni descargar versiones flotantes antes de empezar. La nueva sesión debe comprobar que Codex las detecta; si no, reabrir la sesión/proyecto y leer sus rutas explícitas. No se afirma que una sesión de Codex en otro equipo ya las haya cargado.

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

Las siguientes son tareas de la próxima fase, **no cambios ya implementados**.

| Sección | Objetivo | Mantener | Mejoras que evaluar |
| --- | --- | --- | --- |
| Navegación | Identidad visible y recorrido sencillo | Logo, enlaces funcionales, CTA a registro | Alineación, separación, adaptación móvil, foco |
| Hero | Entender propuesta y siguiente paso en pocos segundos | Mensaje específico A/B, producto existente, CTA | Relación texto/producto, escala, espacio, primer viewport móvil |
| Franja de principios | Reforzar el enfoque de cada variante | Sentido del mensaje | Integración con el recorrido y legibilidad |
| Beneficios | Mostrar utilidad concreta | Límites, compras y metas; orden por variante | Ritmo editorial, agrupación, equilibrio de contenido y producto |
| Demostración | Explicar el acompañamiento sin simular un servicio activo | App protegida y nota de demostración | Composición externa, lectura de pantallas, transición entre secciones |
| FAQ | Resolver objeciones reales | Respuestas sobre tarifas no definidas, entrega y alcance | Espaciado, targets, foco y divulgación clara |
| Formulario | Registro sencillo, accesible y confiable | Campos, validación, consentimiento y estados reales | Jerarquía, ayudas, contraste y respuesta de interacción |
| Pie y diálogos | Cierre coherente e información localizable | Proyecto académico, privacidad, accesibilidad y correo | Alineación, lectura y adaptación móvil |

No convertir cada sección en el mismo patrón de título y tres tarjetas. Tampoco eliminar información útil solo para que la captura se vea minimalista. Un cambio en el orden narrativo debe aplicarse de forma comparable a A y B, conservando el tratamiento experimental.

El formulario debe ser usable sin hover y sin esperar a que termine una animación. El texto, la app y el CTA no pueden quedar ocultos si falla un script de entrada. No añadir scroll secuestrado, navegación horizontal obligatoria o pantallas completas vacías.

## 10. Variantes A/B y enlaces

### 10.1 Mensajes vigentes

| Elemento | A: control y acompañamiento | B: aprendizaje financiero |
| --- | --- | --- |
| Título | Su primera tarjeta débito. Con tu acompañamiento. | Su primera tarjeta débito. Para aprender contigo. |
| Apoyo | Conoce cómo tu hijo usa su dinero y acuerda límites de gasto desde tu app. | Ayuda a tu hijo a decidir qué gastar y qué ahorrar, con una tarjeta y una app para aprender juntos. |
| Prioridad | Límites y compras visibles | Metas, ahorro y decisiones |
| Orden de beneficios | Límites → compras → metas | Metas → compras → límites |
| Pantalla protagonista | `limits` | `savings` |
| Demostración común | También muestra `purchases` | También muestra `purchases` |
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
| `src/ProductPreview.tsx` | Tarjeta y pantallas de producto protegidas |
| `src/styles.css` | Tokens, landing, app, responsive y movimiento reducido |
| `src/attribution.ts` | Variante, UTM, identidad del navegador y exposición cruzada |
| `src/analytics.ts` | Configuración pública, visita y eventos de primera parte |
| `api/lead.ts` | Validación y escritura del registro |
| `api/visit.ts` | Persistencia de visitas deduplicadas |
| `api/event.ts` | Persistencia de eventos permitidos |
| `server/research.ts` | Contratos, HMAC, conexión REST, límites y script Lua |
| `scripts/check-storage.mjs` | Comprobación real de Redis durante build Vercel |
| `scripts/export-results.mjs` | Exportación privada de cohorte real v2 |
| `scripts/delete-contact.mjs` | Eliminación de contacto por correo recibido en stdin |
| `public/moni-logo.svg` | Logo actual |
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
| `docs/product-baseline.json` | Línea base de componentes/assets protegidos |
| `AGENTS.md` | Reglas breves para agentes que trabajen en el repositorio |

### 11.3 Recorrido de una solicitud

El navegador carga la landing desde Vercel y determina su atribución. La medición envía JSON a `/api/visit` y `/api/event`. El formulario validado envía JSON a `/api/lead`. Las funciones validan configuración y contenido, aplican rate limit y usan Redis REST desde el servidor. La interfaz muestra éxito únicamente tras recibir una respuesta correcta con `ok: true`.

Los tokens de Redis nunca llegan al cliente. No hay API pública de exportación ni panel administrativo público. La lectura de resultados se realiza con scripts privados y credenciales autorizadas.

## 12. Desarrollo local y entornos

### 12.1 Preparación

Desde una copia del repositorio, con una versión compatible de Node:

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

No se requiere contraseña de Gmail, Google Workspace ni un dominio propio para el formulario. El correo publicado es un canal de consultas. El equipo debe mantenerlo accesible y atender solicitudes; no equivale a un servicio automático de email.

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

La base `moni-registros` está conectada únicamente a Production. La metadata revisada indicó plan Free, sin auto-upgrade ni eviction, región `iad1` y credenciales sensibles. Verificar cuotas actuales en el proveedor al aumentar tráfico; no prometer que el plan o sus límites serán iguales en el futuro.

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

El script actual agrega toda la cohorte live v2 por variante; **no implementa filtros de fecha, campaña, versión de diseño ni exclusión automática de exposición cruzada**. Para reportes por periodo se necesita una transformación privada explícita. Conservar las columnas de atribución y fechas para ello.

Revisar `eligibleWithoutRecordedVisit`, fallos de medición, duplicados, equipo/spam y cambios de creatividad. Como el contacto conserva su primera atribución, reenvíos posteriores no se reasignan a la campaña más reciente. No presentar los números exportados como un análisis estadístico ya validado.

## 17. Exportación y solicitudes sobre datos

### 17.1 Exportación privada

Solo en un equipo autorizado, cargar las credenciales por un mecanismo seguro en `.env.local` y crear el directorio de salida:

```sh
mkdir -p exports
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

## 18. Meta Pixel: implementación pendiente

### 18.1 Situación actual

**No hay Pixel, ID de Pixel configurado, SDK de Meta, Conversions API, envío de eventos a Meta ni verificación de eventos en Meta documentada.** La medición actual es de primera parte y vive en Redis. Los anuncios pueden dirigir a enlaces UTM, pero esto no equivale a que Meta reciba conversiones de registro.

El usuario quiere usar Meta Ads. La integración se debe trabajar como una tarea explícita con pruebas y configuración propia, manteniendo intacto el registro si un bloqueador impide cargar el píxel.

### 18.2 Insumos necesarios

- Acceso autorizado al negocio/cuenta y al dataset o píxel correcto en Meta Events Manager.
- Identificador público del píxel; no inventarlo ni utilizar uno de ejemplo en Production.
- Definición de la conversión que se quiere medir: registro recibido, contacto elegible o contacto nuevo deduplicado. No son equivalentes.
- Definición del consentimiento publicitario y actualización del aviso con el responsable.
- Confirmación del dominio utilizado en campaña y de cualquier requisito de Meta que se aplique a esa configuración.
- Posibilidad de usar Eventos de prueba y de comprobar solicitudes reales desde el navegador.

No se necesita acceso a los correos de personas para diseñar la integración. No publicar tokens de CAPI ni credenciales de Meta. Si se utiliza en el futuro una variable `VITE_META_PIXEL_ID`, su nombre es una **propuesta**, no configuración existente; el ID es público, un token de acceso no lo es.

### 18.3 Consentimiento y texto de privacidad

El checkbox actual autoriza investigación y contacto del piloto; no debe reinterpretarse automáticamente como aceptación de seguimiento publicitario de terceros.

Diseñar una elección diferenciada para analítica publicitaria: aceptación, rechazo y cambio posterior de preferencia. Como criterio de implementación, no cargar el script, iframe o imagen de Meta antes de la aceptación requerida para esa integración. Rechazar seguimiento no debe bloquear el formulario ni impedir el guardado del registro autorizado.

El aviso actual dice que no se instalan píxeles o cookies de terceros. Si se integra Meta, esa frase dejaría de ser cierta: actualizarla, describir finalidades y destinatario y versionar el aviso coordinadamente. `NOTICE_VERSION` y el texto visible contienen `moni-interest-v2`; planificar su cambio sin confundir automáticamente la versión del aviso con una migración del espacio de claves v2.

Esto es un requisito de producto y privacidad para la implementación, no una certificación legal. Confirmar el texto y las reglas aplicables con el responsable del estudio antes de activar seguimiento real.

### 18.4 Eventos propuestos y condiciones

| Evento de Meta propuesto | Disparo | Restricción |
| --- | --- | --- |
| `PageView` | Tras inicialización autorizada | Una vez por carga lógica; evitar duplicación por StrictMode |
| `Lead` | Solo después de `/api/lead` con HTTP correcto y `ok: true`, si se adopta la definición de registro recibido | Nunca al pulsar el botón, con formulario inválido, error o registro pausado |
| Eventos adicionales | Solo si responden a una pregunta del estudio | No replicar indiscriminadamente todos los eventos internos |

Seleccionar un evento primario con una definición documentada; no enviar `Lead` y `CompleteRegistration` para el mismo objetivo solo para inflar métricas. No afirmar que `Lead` representa un contacto único nuevo: la API actual devuelve el mismo éxito para nuevos y repetidos.

Si se requiere atribuir **altas nuevas deduplicadas**, diseñar una señal segura desde servidor; no exponer públicamente si un correo ya estaba registrado. La deduplicación navegador/servidor mediante `event_id` tampoco sustituye por sí sola la deduplicación de personas o correos. CAPI es una posible fase posterior, no un requisito ya implementado ni una razón para reescribir la API ahora.

### 18.5 Datos, pruebas y separación

- No enviar correo, nombres, ciudad, respuestas del formulario, identificadores de menores o texto libre a parámetros de Pixel.
- No activar advanced matching automático por defecto. Si se evalúa, hacerlo como decisión separada y justificada.
- Revisar también datos automáticos, URL, referrer, parámetros y configuración de Meta; limitar únicamente el payload manual no garantiza ausencia de información personal.
- Mantener UTM sin datos personales y con nombres controlados.
- `test=1` debe excluirse del píxel de producción. Para probar eventos de Meta, usar un modo de diagnóstico deliberado y el mecanismo de prueba vigente, separado del tráfico real y de la definición actual de `test=1`.
- No convertir visitantes de las pruebas del equipo en conversiones de campaña.
- Verificar que rechazar consentimiento, cargar sin ID, fallar la red o bloquear Meta no rompe el formulario.

### 18.6 CSP e implementación técnica

`vercel.json` restringe `script-src` y `connect-src` a `'self'`, e imágenes a `'self' data:`. La integración de Meta requiere revisar las directivas y permitir solo los orígenes estrictamente necesarios según su documentación oficial vigente y las solicitudes observadas. No abrir con `*`, quitar toda la política o añadir `unsafe-eval` como solución rápida.

Preferir un módulo aislado que inicialice una sola vez, compruebe consentimiento/configuración/entorno y no afecte el guardado. Si la integración requiere bootstrap inline, evaluar nonce/hash o un módulo propio conforme a la CSP; no copiar un snippet sin revisar su efecto.

La documentación oficial de Meta está enlazada al final. Su acceso produjo errores temporales al abrir algunas páginas durante esta preparación; las instrucciones concretas de instalación, consentimiento, dominios y validación deben verificarse nuevamente al implementar.

### 18.7 Criterios para considerar Pixel terminado

- ID real correcto y configuración separada por entorno.
- Ninguna solicitud a Meta antes del consentimiento previsto ni tras su rechazo.
- Formulario operativo con Meta bloqueado.
- Evento primario solo tras respuesta de persistencia, con definición explícita sobre duplicados.
- Sin datos personales en payloads, parámetros o URLs observados.
- Sin doble inicialización o doble conversión por StrictMode/reintentos.
- Pruebas del equipo excluidas de métricas reales.
- Aviso actualizado y mecanismo para cambiar la preferencia.
- CSP verificada sin aperturas generales.
- Eventos confirmados en la herramienta de prueba de Meta, con evidencia de qué se probó.
- README actualizado distinguiendo primera parte, Pixel y cualquier futura CAPI.

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

En el build base, `npm ci` informó **6 avisos de vulnerabilidades (2 moderados y 4 altos)**. No se completó una clasificación de su alcance o explotabilidad en esta tarea documental. Abrir una revisión de dependencias con el reporte actual, separar desarrollo/runtime y corregir de forma controlada; no ejecutar `npm audit fix --force` a ciegas ni presentar esos avisos como evidencia de una explotación del sitio.

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

La próxima fase se considera completada cuando ambas variantes se ven profesionales y coherentes con Social, el producto permanece reconocible e intacto, las pruebas relevantes pasan, el flujo real de guardado funciona y la versión publicada se verifica. Entregar capturas comparables, cambios realizados, resultados reales y pendientes. Una captura bonita del hero no demuestra que la página completa esté terminada.

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
| Meta no recibe registros | Pixel aún pendiente; UTM no equivale a integración de conversiones |
| App cambia tras rediseño | Tokens/estilos heredados y selectores compartidos, además del componente |

## 22. Plan de ejecución y pendientes

| Prioridad | Trabajo | Evidencia de cierre |
| --- | --- | --- |
| P0 | Accesos del entorno destino y carpeta Social | Recursos abiertos, archivos reales inventariados, límites declarados |
| P0 | Línea base visual A/B y producto | Capturas y hashes comparables, sin datos personales |
| P1 | Auditoría y rediseño de ambas landings | Mejoras de página completa, no solo hero; revisión contra Social |
| P1 | Preservación funcional y accesibilidad | Pruebas, QA real, teclado y responsive |
| P1 antes de seguimiento Meta | Definición de conversión, consentimiento, ID e integración Pixel | Evidencia en Eventos de prueba y ausencia de contaminación |
| P1 técnica | Clasificar avisos de dependencias | Reporte actualizado y correcciones justificadas, sin actualización forzada |
| P2 | Revisión manual con lector de pantalla y zoom | Registro de plataforma, pasos y barreras resueltas |
| P2 | Medición de rendimiento y optimización | Resultados comparables y assets optimizados |
| P2 | Consistencia de Node CI/Vercel | Versiones efectivas comprobadas tras decisión explícita |
| P2 | Reporte por fechas/campañas/versiones si se necesita | Transformación privada reproducible; no mezcla de cohortes |
| Opcional | Dominio propio, email automático, CAPI o dashboard privado | Solo con una necesidad acordada; no requisitos del rediseño |

No crear autenticación bancaria, onboarding financiero, pagos, KYC, una app real o un nuevo backend en esta fase. No habilitar ni presupuestar anuncios sin la configuración que el equipo defina. No presentar el rediseño como evidencia de validación del negocio.

### Entrega que debe hacer Codex

- Explicación breve de la dirección elegida y por qué sigue siendo Moni.
- Auditoría con problemas resueltos y límites que permanecen.
- Capturas antes/después de A y B, móvil y escritorio, con comprobación de producto intacto.
- Archivos cambiados y dependencias nuevas, si las hay, con motivo.
- Resultados de tests y comprobación real, diferenciando mocks.
- Commit, URL de revisión y URL productiva verificada.
- Estado explícito de Pixel: pendiente, preparado sin activar o activado y probado; nunca ambiguo.
- README actualizado si cambió configuración, contrato, medición o procedimiento.

## 23. Prompt listo para retomar

Copiar este texto al abrir el proyecto en Codex. No reemplaza la lectura de los documentos:

> Continúa el proyecto Moni en ItsSilva/Moni. Lee completos README.md y AGENTS.md y verifica el estado actual de main, Vercel y la web. El formulario y Upstash Redis ya funcionan: conserva sus contratos, deduplicación, retención, medición y separación test/live. La siguiente tarea es elevar la calidad visual de ambas landings usando como referencias reales Nu Cuenta y Revolut Kids & Teens. Primero identifica la carpeta Social dentro de mi carpeta de Codex y revisa los videos publicitarios y posts de Instagram. Conserva siempre el estilo gráfico de Moni, Outfit, logo, paleta, tarjeta y, especialmente, la interfaz interna de la app que ya aparece en esos materiales. No generes una app nueva ni cambies las pantallas del producto. Usa las skills instaladas design-taste-frontend, better-interface con sus seis dependencias y find-animation-opportunities. Las reglas de marca y producto de Moni prevalecen sobre preferencias genéricas de esas skills. Audita, captura el antes, implementa mejoras de composición y responsive en ambas variantes, prueba, compara con Social y verifica el despliegue. A se usa primero y B después, sin cambio automático. Todas las pruebas del equipo llevan test=1. No presentes el proyecto académico como un banco operativo. Documenta los accesos que falten sin asumir que este README transfiere credenciales. Revisa también la sección de Meta Pixel y prepara su implementación sin activarlo con un ID inventado, sin consentimientos adecuados ni pruebas reales. Ya existe autorización para publicar las correcciones acordadas en main y desplegar en el proyecto Vercel existente; conserva mis archivos y no publiques los originales de Social. Al terminar, entrega evidencia visual, resultados de pruebas, enlaces verificados y pendientes concretos.

## 24. Fuentes y trazabilidad

Fuentes de contexto y evidencia: instrucciones del usuario en este proyecto; código del commit funcional `c54d4e5701a95220e05144c4ce48af8194103e52`; metadata/logs de Vercel; CI enlazada; prueba de formularios A/B en la página publicada. Los datos de acceso y fechas son una fotografía del momento del traspaso, no secretos ni promesas de disponibilidad futura.

Referencias de diseño y skills:

- [Nu Cuenta](https://nu.com.co/cuenta).
- [Revolut Kids & Teens / padres y tutores](https://www.revolut.com/es-ES/revolut-kids-and-teens-parent-and-guardians/).
- [Taste Skill](https://www.tasteskill.dev/) y [repositorio original](https://github.com/Leonxlnx/taste-skill).
- [better-interface en UI Skills](https://www.ui-skills.com/skills/jakubkrehel/better-interface) y [repositorio original](https://github.com/jakubkrehel/skills).
- [Find Animation Opportunities](https://aiuxplayground.com/skills/find-animation-opportunities) y [repositorio original](https://github.com/emilkowalski/skills).
- [Catálogo UI Skills](https://www.ui-skills.com/).

Referencias técnicas para comprobar al implementar:

- [Skills de Codex](https://developers.openai.com/codex/skills), actualmente redirigido a documentación de construcción de skills.
- [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite).
- [Variables de Vercel](https://vercel.com/docs/environment-variables).
- [API REST de Upstash](https://upstash.com/docs/redis/features/restapi).
- [Meta Pixel](https://developers.facebook.com/documentation/meta-pixel).
- [Conversion tracking de Meta](https://developers.facebook.com/documentation/meta-pixel/implementation/conversion-tracking).
- [Control de consentimiento del Pixel](https://developers.facebook.com/documentation/meta-pixel/implementation/gdpr), como referencia técnica; no sustituye evaluar las reglas aplicables al estudio.

Este documento distingue **estado implementado**, **instrucciones para la siguiente fase** y **pendientes**. Ante una contradicción con el código o los servicios actuales, comprobar la realidad, conservar los límites del usuario y actualizar la documentación con evidencia.

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
- Footer compartido: marca y lema existente, navegación útil, contacto real y acceso a privacidad/accesibilidad; tres columnas en escritorio y estructura vertical en móvil. Sin estadísticas, alianzas, sellos o servicios inventados.
- Logo de landing: nuevo export autorizado `../LogotipoMoni.png` (PNG RGBA 128×32, dibujo en 89×32). `public/moni-logotype.png` elimina solo el margen transparente, sin deformar ni redibujar. Cabecera y footer usan proporción 89:32 con altura automática. `public/moni-logo.svg`, tarjeta, pantallas, `ProductPreview.tsx` y `styles.css` permanecen intactos.
- QA: 34 unitarias/API, build TypeScript/Vite y 22 E2E correctos. Revisión A/B a 320/390/768/1440 px: sin overflow ni infracciones axe en las reglas ejecutadas; enlaces, diálogos y retorno de foco correctos. El logo mantiene proporción medida en 320/390/1440. Cuatro capturas normalizadas del producto: cero píxeles diferentes frente al estado anterior.
- Evidencia local ignorada: `.qa/footer-before/` y `.qa/footer-final/`; revisión detallada en [footer-review](docs/footer-review.md). Pruebas publicadas siempre con `test=1`; sin consultar contactos reales.
- Meta Pixel sigue pendiente, sin activarse. No se requiere para validar interés con la medición propia actual; su incorporación futura debe seguir la sección 18.
