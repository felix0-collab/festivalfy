# Festivalfy

Web estática (sin servidor) para descubrir los artistas de festivales y escucharlos en Spotify. Se publica con GitHub Pages desde la rama principal.

## Qué hay en el proyecto

- **Datos publicados:** `published-spotify-data-1..4.js` contienen las asociaciones artista → perfil de Spotify revisadas (IDs, nombres, URLs e imágenes). Son el catálogo que ven todos los visitantes.
- **Catálogo de país y géneros:** `artist-metadata-static.js`, texto estático, sin consultas externas.
- **Cartel:** la estructura de días y actuaciones está dentro de `festivalfy.js` (`FESTIVAL.days`).
- **Código de la aplicación:** `festivalfy.js`. Es un único fichero con todas las funciones: navegación, cartel, ficha del artista, Mi cartel (selecciones guardadas en el navegador), Radio del festival (actualiza una playlist pública de Spotify con una mezcla de artistas verificados), conexión con Spotify y modo administrador. Las secciones están marcadas con comentarios `===== nombre.js =====` según su origen.
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

## Pendiente

- Verificar país y género del catálogo estático frente a una fuente (MusicBrainz o Spotify).
- Cinco actuaciones sin perfil: Picture live, Dulce, PLO Man, Livwutang b2b Konduku y mad miran b2b DJ Zero.
