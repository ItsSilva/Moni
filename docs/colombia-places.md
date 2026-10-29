# Catálogo de ciudades y municipios

Fuente: Departamento Administrativo Nacional de Estadística (DANE), [DIVIPOLA — Códigos municipios](https://www.datos.gov.co/Mapas-Nacionales/DIVIPOLA-C-digos-municipios/gdxc-w37w).

Descarga: 29/10/2026, API `https://www.datos.gov.co/resource/gdxc-w37w.json?$limit=5000`. Metadatos: `https://www.datos.gov.co/api/views/gdxc-w37w.json`; `rowsUpdatedAt=1737751472` (24/01/2025). No confundir la fecha de consulta con la de actualización del conjunto.

Licencia de los datos: [Creative Commons Atribución-CompartirIgual 4.0](https://creativecommons.org/licenses/by-sa/4.0/). La tabla derivada `src/data/colombia-places.json` se distribuye bajo esa misma licencia. Se seleccionaron código, nombre y departamento, se ajustaron mayúsculas para lectura y se ordenó alfabéticamente; no se modificaron códigos ni se añadieron localidades inventadas. La licencia de los datos no cambia la del código independiente de la aplicación.

El conjunto contiene 1.122 entradas: 1.103 clasificadas como municipio, San Andrés (isla) y 18 áreas no municipalizadas. Incluye Bogotá D.C., Barrancominas y Nuevo Belén de Bajirá (27493). Se ofrecen todas, agrupadas por departamento/distrito capital (33 grupos), sin petición externa al llenar el formulario. Es el catálogo completo de esta fuente, no una lista de cada barrio o centro poblado.

`city` conserva `cali` para Cali y usa código DIVIPOLA de cinco dígitos para el resto. El servidor admite `other` por compatibilidad con pestañas abiertas de la versión anterior, aunque ya no se ofrece en el selector. Los nuevos registros incluyen `cityName` y `cityDepartment` derivados por servidor. No se migran ni sobrescriben registros históricos. El exportador conserva estos campos adicionales.

La definición actual `eligible` sigue limitada a Cali: recibir registros de todo Colombia no equivale a ampliar por inferencia el universo del estudio. Si el equipo decide ampliarlo, versionar el protocolo y el análisis por separado. No mandar ciudad ni otros campos del formulario a Google/Meta.

Para actualizar: revisar metadatos/licencia, descargar una copia, validar códigos únicos y cobertura, regenerar el JSON y ejecutar pruebas de catálogo, servidor y formulario antes de publicar. No cargar datos remotos sin validar en cada visita.
