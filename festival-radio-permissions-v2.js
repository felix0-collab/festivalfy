'use strict';

// Verifies playlist ownership/privacy before spending time building the radio
// and requests every playlist permission needed by the current Spotify setup.
(() => {
  const PLAYLIST_ID = '7lxl2eyUucpEXVs4PHbv6e';
  const REQUIRED_SCOPES = [
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-private'
  ].join(' ');

  const stateElement = document.getElementById('festivalRadioAdminState');
  const originalUpdateButton = document.getElementById('festivalRadioUpdate');
  const originalConnectButton = document.getElementById('spotifyConnect');
  if (!stateElement || !originalUpdateButton || !originalConnectButton) return;

  function setRadioState(message, isError = false) {
    stateElement.textContent = message || '';
    stateElement.classList.toggle('error', isError);
  }

  async function spotifyRequest(path, options = {}, retry = 0) {
    const token = await getAccessToken();
    const headers = {Authorization: `Bearer ${token}`};
    let body;

    if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.body);
    }

    const response = await fetch(`https://api.spotify.com/v1${path}`, {
      method: options.method || 'GET',
      headers,
      body
    });

    if (response.status === 401 && retry < 1) {
      localStorage.removeItem(STORAGE.accessToken);
      await refreshAccessToken();
      return spotifyRequest(path, options, retry + 1);
    }

    if (response.status === 429 && retry < 4) {
      const seconds = Number(response.headers.get('Retry-After') || 2);
      await new Promise(resolve => setTimeout(resolve, Math.min(seconds * 1000, 15000)));
      return spotifyRequest(path, options, retry + 1);
    }

    const text = await response.text();
    let payload = {};
    if (text) {
      try { payload = JSON.parse(text); }
      catch { payload = {}; }
    }

    if (!response.ok) {
      const error = new Error(payload.error?.message || `Spotify respondió con el código ${response.status}.`);
      error.status = response.status;
      throw error;
    }
    return payload;
  }

  async function inspectPlaylistAccess() {
    let currentUser;
    try {
      currentUser = await spotifyRequest('/me');
    } catch (error) {
      if (error.status === 403) {
        throw new Error('La sesión actual no incluye los permisos nuevos. Desconecta Spotify y vuelve a conectarlo desde Festivalfy.');
      }
      throw error;
    }

    let playlist;
    try {
      const fields = encodeURIComponent('id,name,public,collaborative,owner(id,display_name)');
      playlist = await spotifyRequest(`/playlists/${PLAYLIST_ID}?fields=${fields}`);
    } catch (error) {
      if (error.status === 403) {
        throw new Error('Spotify no permite leer esta playlist con la sesión actual. Desconecta y vuelve a conectar Spotify aceptando todos los permisos.');
      }
      throw error;
    }

    const ownerId = playlist.owner?.id || '';
    const ownerName = playlist.owner?.display_name || ownerId || 'otra cuenta';
    const currentUserId = currentUser.id || '';

    if (ownerId && currentUserId && ownerId !== currentUserId) {
      throw new Error(`La cuenta conectada no es la propietaria de esta playlist. Pertenece a ${ownerName}. Conecta en Festivalfy la cuenta de Spotify que la creó.`);
    }

    if (playlist.collaborative === true) {
      throw new Error('La playlist está en modo colaborativo. En Spotify, abre la playlist, desactiva la colaboración y después selecciona “Hacer pública”. Luego vuelve a intentarlo.');
    }

    if (playlist.public !== true) {
      throw new Error('La playlist es privada. En Spotify, abre la playlist, pulsa ⋯ y selecciona “Hacer pública”. Luego vuelve a intentarlo.');
    }

    return {playlist, currentUser};
  }

  // Run the access check before the original radio generator. A second,
  // programmatic click is allowed through only after validation succeeds.
  let allowOriginalUpdate = false;
  originalUpdateButton.addEventListener('click', async event => {
    if (allowOriginalUpdate) {
      allowOriginalUpdate = false;
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    if (!isSpotifyConnected()) {
      setRadioState('Conecta Spotify antes de actualizar la radio.', true);
      toast('Conecta Spotify para actualizar la radio');
      return;
    }

    originalUpdateButton.disabled = true;
    originalUpdateButton.textContent = 'Comprobando acceso…';
    setRadioState('Comprobando la cuenta, la propiedad y la visibilidad de la playlist…');

    try {
      const {playlist} = await inspectPlaylistAccess();
      setRadioState(`Acceso confirmado a “${playlist.name || 'Radio del festival'}”. Preparando la mezcla…`);
      allowOriginalUpdate = true;
      originalUpdateButton.disabled = false;
      originalUpdateButton.click();
    } catch (error) {
      const message = error.message || 'No se pudo comprobar el acceso a la playlist.';
      originalUpdateButton.disabled = false;
      originalUpdateButton.textContent = 'Actualizar mezcla aleatoria';
      setRadioState(message, true);
      toast(message);
    }
  }, true);

  // Replace the previous connection handler so a fresh authorization asks for
  // public/private playlist access and enough read access to diagnose ownership.
  const connectButton = originalConnectButton.cloneNode(true);
  originalConnectButton.replaceWith(connectButton);

  connectButton.addEventListener('click', async () => {
    if (isSpotifyConnected()) {
      [STORAGE.accessToken, STORAGE.refreshToken, STORAGE.expiresAt]
        .forEach(key => localStorage.removeItem(key));
      updateSpotifyUi();
      setRadioState('Spotify desconectado. Vuelve a conectarlo para conceder los permisos de la radio.');
      toast('Spotify desconectado de este dispositivo');
      return;
    }

    const verifier = randomString(96);
    const challenge = base64UrlEncode(await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(verifier)
    ));
    const state = randomString(32);
    localStorage.setItem(STORAGE.verifier, verifier);
    localStorage.setItem(STORAGE.state, state);

    const url = new URL('https://accounts.spotify.com/authorize');
    url.search = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: challenge,
      state,
      scope: REQUIRED_SCOPES,
      show_dialog: 'true'
    }).toString();
    location.assign(url.toString());
  });
})();
