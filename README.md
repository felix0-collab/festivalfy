# Festivalfy

Web estática (sin servidor) para descubrir los artistas de festivales y escucharlos en Spotify. Se publica con GitHub Pages desde la rama principal.

## Qué hay en el proyecto

- **Datos publicados:** `published-spotify-data-1..4.js` contienen las asociaciones artista → perfil de Spotify revisadas (IDs, nombres, URLs e imágenes). Son el catálogo que ven todos los visitantes.
- **Catálogo de país y géneros:** `artist-metadata-static.js`, texto estático, sin consultas externas.
- **Cartel:** la estructura de días y actuaciones está dentro de `festivalfy.js` (`FESTIVAL.days`).
- **Código de la aplicación:** `festivalfy.js`. Es un único fichero con todas las funciones: navegación, cartel, ficha del artista, reproductor de Spotify incrustado, filtros de género y país, Mi cartel (selecciones guardadas en el navegador), Radio del festival (mezcla dinámica de canciones verificadas del cartel y playlist pública de Spotify como alternativa), conexión con Spotify y modo administrador. Las secciones están marcadas con comentarios `===== nombre.js =====` según su origen.
- **Conexión con Spotify:** dentro de `festivalfy.js` y en `callback/index.html`, con Authorization Code + PKCE. El Client ID es público por diseño; no hay Client Secret en el proyecto.

## Modo administrador: importante

La parte de administración de `festivalfy.js` muestra u oculta las herramientas de sincronización, revisión y exportación. **No es autenticación.** El hash de comprobación está en el código público, así que cualquiera que lo lea puede activar la interfaz de administrador. Esto no compromete datos: esas herramientas solo modifican el `localStorage` de quien las usa, y el catálogo publicado solo cambia con un commit en este repositorio.

Si en el futuro la web necesita guardar cambios para todos los usuarios, habrá que añadir un backend con autenticación real en el servidor.

## Actualizar el cartel de un festival

1. En modo administrador, conecta Spotify y pulsa *Sincronizar todo el cartel*.
2. Revisa las coincidencias pendientes y corrige lo necesario.
3. Pulsa *Exportar datos* y descarga `festivalfy-spotify-artists.json`.
4. Integra las asociaciones en los ficheros `published-spotify-data-*.js` y actualiza la fecha `publishedAt` en la sección del cargador de `festivalfy.js`.
5. Sube los cambios. GitHub Pages los publica en un par de minutos.

Al cambiar `festivalfy.js`, `styles.css` o cualquier fichero de datos, actualiza también el parámetro `?v=` correspondiente en `index.html` para que los navegadores (sobre todo Safari) no usen la copia antigua.

## Probar en local

```
python3 -m http.server 8000
```

Y abre `http://localhost:8000`.

## Reproductor en la ficha del artista

Cada ficha muestra un botón *Escuchar aquí*. Al pulsarlo se carga el reproductor incrustado de Spotify (`open.spotify.com/embed/artist/<id>`), que permite escuchar una muestra sin salir de Festivalfy y sin conectar ninguna cuenta.

El reproductor se carga solo al pulsar el botón, nunca al abrir la ficha, para no gastar datos de más. Al volver a entrar en la ficha vuelve a aparecer el botón. En las actuaciones b2b o colectivas aparece un reproductor por cada perfil, con el nombre encima.

La reproducción completa depende de Spotify: sin sesión iniciada en el navegador suele sonar solo una previsualización corta.

## Filtros de género y país

En la lista de artistas de un día hay un botón *Filtros* que abre dos grupos de etiquetas: **Género** y **País**. Se pueden marcar varias de cada grupo; dentro de un grupo suman (Rock *o* Pop) y entre grupos restan (Rock *y* España). El número en cada etiqueta indica cuántos artistas de ese día encajan, y los filtros se combinan con el buscador.

Los filtros se borran al salir de la lista, pero se conservan al entrar en la ficha de un artista y volver.

Los géneros del catálogo se agrupan en siete familias definidas en `GENRE_FAMILIES` dentro de `festivalfy.js`.

## Radio del festival dinámica

La acción principal de **Radio del festival** crea dentro de Festivalfy una mezcla de hasta 50 canciones de perfiles de Spotify verificados del cartel. Antes de aceptar una canción, el código comprueba que el ID del artista de la canción coincide exactamente con el perfil publicado. La mezcla intenta usar un artista distinto por canción antes de repetir.

La generación es progresiva: en cuanto se encuentra la primera canción válida, Festivalfy empieza a reproducirla y continúa buscando y añadiendo el resto mediante la cola de Spotify. Así no es necesario esperar a tener las 50 canciones antes de escuchar. Si el usuario inicia manualmente otro artista o genera una nueva mezcla, la generación anterior se cancela para no contaminar la nueva reproducción.

Las canciones verificadas encontradas se conservan en memoria durante la sesión para acelerar las siguientes mezclas. El Web Playback SDK se prepara en segundo plano y el toque sobre *Escuchar mezcla* activa el elemento de reproducción de forma síncrona antes de buscar canciones, para respetar las restricciones de autoplay de Safari/iOS. Al tocar el mini reproductor mientras suena la Radio, Festivalfy identifica primero la URI exacta de la canción en la mezcla (y, como respaldo, la URI spotify:artist del intérprete) y abre la ficha de la actuación correspondiente, desde donde puede guardarse en *Mi cartel*. *Nueva mezcla* vuelve a elegir artistas/canciones. La playlist pública existente sigue disponible como alternativa mediante *Abrir playlist en Spotify*.

## Compartir y comparar carteles

En **Mi cartel** hay un botón *Compartir mi cartel*. Genera un enlace del tipo `…/festivalfy/?cartel=…` y abre el menú de compartir del móvil; si el navegador no lo admite, copia el enlace al portapapeles.

La selección viaja **dentro del propio enlace**: no hay servidor, cuentas ni base de datos para compartirla. El cartel se codifica como un mapa de bits compacto.

Quien abra el enlace puede poner un nombre al cartel recibido y Festivalfy lo guarda en **Mi cartel con amigos**. Se pueden conservar hasta 50 carteles por dispositivo. Cada tarjeta muestra el nombre, el número de artistas y cuántos coinciden con tu propio cartel. Al abrir una tarjeta aparece la comparación con tres grupos: artistas en común, solo en el cartel del amigo y solo en el tuyo. Los carteles guardados se pueden renombrar o eliminar.

Los enlaces llevan una huella del catálogo. Si cambia el conjunto de actuaciones, un enlace antiguo se rechaza con un aviso en lugar de arriesgarse a mostrar artistas equivocados.

## Pendiente

- Verificar país y género del catálogo estático frente a una fuente (MusicBrainz o Spotify).
- Cinco actuaciones sin perfil: Picture live, Dulce, PLO Man, Livwutang b2b Konduku y mad miran b2b DJ Zero.
