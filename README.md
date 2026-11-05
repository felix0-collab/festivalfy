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

## Radio: playlist fija de 100 canciones y mezclas de 20

La Radio usa una lista fija de 100 canciones de artistas verificados del cartel. La selección compara Spotify Artist IDs, no nombres. Se permiten colaboraciones cuando al menos un artista acreditado pertenece al cartel. Se excluyen duplicados por URI, episodios, archivos locales y canciones marcadas como no reproducibles.

*Escuchar mezcla* selecciona 20 canciones; volver a pulsarlo reinicia la misma selección durante la sesión. *Nueva mezcla* elige otras 20. El historial del navegador evita repetir canciones durante las primeras cinco mezclas. Al completar las 100 comienza otra vuelta, sin repetir ninguna canción del grupo inmediatamente anterior. El historial se conserva al recargar cuando el almacenamiento local está disponible. La reproducción envía una lista explícita de 20 URIs a Spotify, con shuffle y repeat desactivados; no arranca el contexto completo de la playlist.

### Preparar la lista una sola vez

1. Conecta la cuenta propietaria de Spotify desde administración y pulsa *Preparar playlist de 100 canciones*. Se leen y conservan las canciones válidas existentes, y se buscan las que faltan entre perfiles verificados del cartel. Solo se escribe la playlist cuando hay exactamente 100 canciones válidas distintas; si no se alcanza esa cifra o falla la lectura, no se sustituye por una lista parcial.
2. Pulsa *Exportar las 100 canciones para publicar*. Si ya existe una exportación de canciones con sus URIs y Artist IDs, se puede reutilizar en vez de generar otra lista.
3. Publica el archivo exportado como `radio-tracks.json` en la raíz del repositorio. Contiene metadatos, nunca tokens ni audio. La cuenta administradora puede probar las mezclas desde el mismo navegador antes de publicar gracias a la copia local.

La lista publicada es necesaria porque Spotify restringe la lectura de los elementos de una playlist al propietario y sus colaboradores. Los visitantes reproducen las URIs publicadas con su propia conexión Premium, sin utilizar credenciales del administrador. Si falta una lista válida de 100 canciones, la Radio muestra un aviso y no reproduce una mezcla cuya procedencia no pueda verificar. El archivo incluido inicialmente tiene `tracks: []`: no constituye una playlist de 100 canciones ya generada. No publicar este cambio en producción hasta completar ese archivo y validar la reproducción con Premium.

No hay actualizaciones periódicas. Ni *Escuchar mezcla* ni *Nueva mezcla* modifican la playlist. Las fichas de artistas mantienen su reproductor existente.

Para comprobar las reglas y las llamadas de reproducción con Spotify simulado: `node --test tests/radio.test.cjs`. Estas pruebas no verifican audio real, restricciones regionales ni permisos de una cuenta Spotify.

## Generar imagen de Mi cartel

Desde **Mi cartel** se puede crear un póster vertical en PNG con la selección guardada, agrupada por día. La imagen se genera íntegramente en el navegador mediante Canvas, sin subir artistas ni datos a un servidor. En navegadores compatibles se comparte como archivo desde la hoja nativa; también puede guardarse como PNG.

## Compartir y comparar carteles

En **Mi cartel** hay un botón *Compartir mi cartel*. Genera un enlace del tipo `…/festivalfy/?cartel=…` y abre el menú de compartir del móvil; si el navegador no lo admite, copia el enlace al portapapeles.

La selección viaja **dentro del propio enlace**: no hay servidor, cuentas ni base de datos para compartirla. El cartel se codifica como un mapa de bits compacto.

Quien abra el enlace puede poner un nombre al cartel recibido y Festivalfy lo guarda en **Mi cartel con amigos**. Se pueden conservar hasta 50 carteles por dispositivo. Cada tarjeta muestra el nombre, el número de artistas y cuántos coinciden con tu propio cartel. Al abrir una tarjeta aparece la comparación con tres grupos: artistas en común, solo en el cartel del amigo y solo en el tuyo. Los carteles guardados se pueden renombrar o eliminar.

Los enlaces llevan una huella del catálogo. Si cambia el conjunto de actuaciones, un enlace antiguo se rechaza con un aviso en lugar de arriesgarse a mostrar artistas equivocados.

## Pendiente

- Verificar país y género del catálogo estático frente a una fuente (MusicBrainz o Spotify).
- Cinco actuaciones sin perfil: Picture live, Dulce, PLO Man, Livwutang b2b Konduku y mad miran b2b DJ Zero.


## Restauración del motor Spotify

El módulo compartido de reproducción se restauró a la versión estable de referencia `85cba3e`, manteniendo la Radio limitada a 20 canciones. Se retiraron los experimentos posteriores de arranque compartido y renovación forzada de sesión. El resto de funcionalidades posteriores —incluida la imagen de Mi cartel— permanece separado e intacto.


## Reproducción sin consultas de catálogo

Para evitar que la cuota de Spotify Development Mode bloquee la reproducción, Festivalfy ya no necesita buscar canciones antes de empezar. Las fichas reproducen directamente el contexto oficial del artista (`spotify:artist:<id>`) y la Radio reproduce una selección explícita de la lista verificada del festival. La Radio selecciona 20 URIs de la lista publicada de 100 canciones, sin consultas de catálogo al reproducir. De esta forma, pasar de Radio a artista reemplaza el contexto completo y no deja una cola de Radio pendiente.

Los errores `429` conservan ahora el campo `reason` de Spotify, incluido `QUOTA_EXCEEDED`, para no confundir una limitación temporal de API con la ausencia de canciones del artista.


## Cola estricta por artista

Las fichas pueden arrancar con el contexto de artista para obtener una primera canción inmediata, pero Festivalfy transforma enseguida esa reproducción en una lista explícita de URIs verificadas cuyo artista coincide con el Spotify Artist ID seleccionado. Primero aprovecha `current_track` y `next_tracks` del Web Playback SDK; si faltan canciones, completa desde el álbum actual y, como último recurso, desde unos pocos álbumes del artista. La lista resultante se guarda localmente por Spotify Artist ID para evitar repetir consultas de catálogo.

Si Spotify intenta reproducir una pista que no contiene el Artist ID seleccionado, Festivalfy restaura la lista estricta; si todavía no existe una lista recuperable, detiene la reproducción antes de continuar con otro artista.


## Cola de artista con varios lanzamientos

Cuando una ficha no tiene todavía una cola local, Festivalfy arranca el contexto del artista para no retrasar la primera canción y, en segundo plano, construye una lista explícita con varias canciones del mismo Spotify Artist ID. Usa el álbum actual y después `GET /artists/{id}/albums` más `GET /albums/{id}/tracks`, endpoints vigentes en la API de Spotify de 2026. Se priorizan álbumes completos y se consultan como máximo unos pocos lanzamientos.

La repetición de contexto solo se activa cuando la cola contiene al menos dos URIs distintas. Con una sola canción, repeat queda en `off`; si Spotify intenta salir del artista antes de que haya una cola válida, Festivalfy pausa en vez de volver a repetir indefinidamente la misma pista.
