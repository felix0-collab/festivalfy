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

La acción principal de **Radio del festival** crea dentro de Festivalfy una mezcla de hasta 20 canciones de perfiles de Spotify verificados del cartel. Antes de aceptar una canción, el código comprueba que el ID del artista de la canción coincide exactamente con el perfil publicado. La mezcla intenta usar un artista distinto por canción antes de repetir.

La generación es progresiva: en cuanto se encuentra la primera canción válida, Festivalfy empieza a reproducirla y continúa buscando y añadiendo el resto mediante la cola de Spotify. Así no es necesario esperar a tener las 50 canciones antes de escuchar. Si el usuario inicia manualmente otro artista o genera una nueva mezcla, la generación anterior se cancela para no contaminar la nueva reproducción.

Las canciones verificadas encontradas se conservan en memoria durante la sesión para acelerar las siguientes mezclas. El Web Playback SDK se prepara en segundo plano y el toque sobre *Escuchar mezcla* activa el elemento de reproducción de forma síncrona antes de buscar canciones, para respetar las restricciones de autoplay de Safari/iOS. Al tocar el mini reproductor mientras suena la Radio, Festivalfy usa mapas directos creados junto con la propia mezcla y un índice global de todos los perfiles verificados del cartel. Si el Web Playback SDK no aporta suficientes datos, consulta una sola vez la canción actual por su ID en la Web API, cruza sus artistas con ese índice y guarda el resultado en caché. Cada cambio de canción deja además la ficha resuelta guardada en el botón del mini reproductor, desde donde puede guardarse en *Mi cartel*. *Nueva mezcla* vuelve a elegir artistas/canciones. La playlist pública existente sigue disponible como alternativa mediante *Abrir playlist en Spotify*.

## Generar imagen de Mi cartel

Desde **Mi cartel** se puede crear un póster vertical en PNG con la selección guardada, agrupada por día. La imagen se genera íntegramente en el navegador mediante Canvas, sin subir artistas ni datos a un servidor. En navegadores compatibles se comparte como archivo desde la hoja nativa; también puede guardarse como PNG.

## Compartir y comparar carteles

En **Mi cartel** hay un botón *Compartir mi cartel*. Genera un enlace del tipo `…/festivalfy/?cartel=…` y abre el menú de compartir del móvil; si el navegador no lo admite, copia el enlace al portapapeles.

La selección viaja **dentro del propio enlace**: no hay servidor, cuentas ni base de datos para compartirla. El cartel se codifica como un mapa de bits compacto.

Quien abra el enlace puede poner un nombre al cartel recibido y Festivalfy lo guarda en **Mi cartel con amigos**. Se pueden conservar hasta 50 carteles por dispositivo. Cada tarjeta muestra el nombre, el número de artistas y cuántos coinciden con tu propio cartel. Al abrir una tarjeta aparece la comparación con dos grupos: artistas en común y solo en el cartel del amigo. Los carteles guardados se pueden renombrar o eliminar.

Los enlaces llevan una huella del catálogo. Si cambia el conjunto de actuaciones, un enlace antiguo se rechaza con un aviso en lugar de arriesgarse a mostrar artistas equivocados.

Las comparaciones actualizan sus grupos y conservan la posición al añadir artistas o al volver de una ficha. En la lista de artistas de cada día hay un corazón sin fondo, antes del botón de Spotify: vacío para añadir a Mi cartel y relleno rosa cuando está guardado. Al volver a pulsarlo se quita de la selección. La ficha mantiene su corazón. El gesto de mantener pulsado y deslizar se ha retirado.

## Pendiente

- Verificar país y género del catálogo estático frente a una fuente (MusicBrainz o Spotify).
- Cinco actuaciones sin perfil: Picture live, Dulce, PLO Man, Livwutang b2b Konduku y mad miran b2b DJ Zero.


## Restauración del motor Spotify

El módulo compartido de reproducción se restauró a la versión estable de referencia `85cba3e`, manteniendo la Radio limitada a 20 canciones. Se retiraron los experimentos posteriores de arranque compartido y renovación forzada de sesión. El resto de funcionalidades posteriores —incluida la imagen de Mi cartel— permanece separado e intacto.


## Reproducción sin consultas de catálogo

Para evitar que la cuota de Spotify Development Mode bloquee la reproducción, Festivalfy ya no necesita buscar canciones antes de empezar. Las fichas reproducen directamente el contexto oficial del artista (`spotify:artist:<id>`) y la Radio reproduce el contexto de la playlist verificada del festival. La Radio activa shuffle y limita localmente cada sesión a 20 canciones. De esta forma, pasar de Radio a artista reemplaza el contexto completo y no deja una cola de Radio pendiente.

Los errores `429` conservan ahora el campo `reason` de Spotify, incluido `QUOTA_EXCEEDED`, para no confundir una limitación temporal de API con la ausencia de canciones del artista.


## Cola estricta por artista

Las fichas pueden arrancar con el contexto de artista para obtener una primera canción inmediata, pero Festivalfy transforma enseguida esa reproducción en una lista explícita de URIs verificadas cuyo artista coincide con el Spotify Artist ID seleccionado. Primero aprovecha `current_track` y `next_tracks` del Web Playback SDK; si faltan canciones, completa desde el álbum actual y, como último recurso, desde unos pocos álbumes del artista. La lista resultante se guarda localmente por Spotify Artist ID para evitar repetir consultas de catálogo.

Si Spotify intenta reproducir una pista que no contiene el Artist ID seleccionado, Festivalfy restaura la lista estricta; si todavía no existe una lista recuperable, detiene la reproducción antes de continuar con otro artista.


## Cola de artista con varios lanzamientos

Cuando una ficha no tiene todavía una cola local, Festivalfy arranca el contexto del artista para no retrasar la primera canción y, en segundo plano, construye una lista explícita con varias canciones del mismo Spotify Artist ID. Usa el álbum actual y después `GET /artists/{id}/albums` más `GET /albums/{id}/tracks`, endpoints vigentes en la API de Spotify de 2026. Se priorizan álbumes completos y se consultan como máximo unos pocos lanzamientos.

La repetición de contexto solo se activa cuando la cola contiene al menos dos URIs distintas. Con una sola canción, repeat queda en `off`; si Spotify intenta salir del artista antes de que haya una cola válida, Festivalfy pausa en vez de volver a repetir indefinidamente la misma pista.
