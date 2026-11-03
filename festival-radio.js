'use strict';

// Public festival radio plus administrator-only playlist generation.
// The public URL contains only the playlist ID; share/invitation parameters
// are intentionally never stored in Festivalfy.
(() => {
  const PLAYLIST_ID = '7lxl2eyUucpEXVs4PHbv6e';
  const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`;
  const TARGET_TRACKS = 50;
  const RADIO_STORAGE_KEY = 'festivalfy_radio_status_v1';
  const RADIO_SCOPE = 'playlist-modify-public';

  const style = document.createElement('style');
  style.textContent = `
    .festival-radio-card {
      position:relative;
      isolation:isolate;
      overflow:hidden;
      margin-top:18px;
      padding:18px;
      border:1px solid rgba(30,215,96,.28);
      border-radius:20px;
      background:
        radial-gradient(circle at 92% 8%, rgba(30,215,96,.18), transparent 34%),
        linear-gradient(145deg, rgba(30,215,96,.08), rgba(20,17,25,.97) 58%);
      box-shadow:inset 0 1px 0 rgba(255,255,255,.025);
    }
    .festival-radio-card::after {
      content:'';
      position:absolute;
      z-index:-1;
      width:132px;
      height:132px;
      right:-54px;
      bottom:-62px;
      border:22px solid rgba(30,215,96,.07);
      border-radius:50%;
    }
    .festival-radio-head {
      display:flex;
      align-items:flex-start;
      gap:13px;
    }
    .festival-radio-icon {
      display:grid;
      flex:0 0 46px;
      width:46px;
      height:46px;
      place-items:center;
      border:1px solid rgba(30,215,96,.32);
      border-radius:14px;
      background:rgba(30,215,96,.12);
      color:#7af0a4;
      font-size:22px;
    }
    .festival-radio-copy { min-width:0; }
    .festival-radio-copy small {
      display:block;
      margin-bottom:4px;
      color:#7fe9a4;
      font-size:10px;
      font-weight:900;
      letter-spacing:.14em;
      text-transform:uppercase;
    }
    .festival-radio-copy h2 {
      margin:0;
      color:#fff;
      font-size:21px;
      letter-spacing:-.45px;
    }
    .festival-radio-copy p {
      margin:6px 0 0;
      color:#aaa1b1;
      font-size:13px;
      line-height:1.45;
    }
    .festival-radio-open {
      display:flex;
      align-items:center;
      justify-content:center;
      gap:9px;
      width:100%;
      margin-top:15px;
      padding:13px 16px;
      border-radius:999px;
      background:#1ed760;
      color:#07140b;
      text-decoration:none;
      font-weight:900;
    }
    .festival-radio-open span:first-child { font-size:17px; }
    .festival-radio-admin {
      display:none;
      margin-top:13px;
      padding-top:13px;
      border-top:1px solid rgba(255,255,255,.08);
    }
    html.festivalfy-admin .festival-radio-admin { display:block; }
    .festival-radio-admin button {
      width:100%;
      padding:12px 15px;
      border:1px solid #4a3d51;
      border-radius:999px;
      background:#211c26;
      color:#fff;
      cursor:pointer;
      font-weight:900;
    }
    .festival-radio-admin button:disabled { cursor:wait; opacity:.58; }
    .festival-radio-progress { margin-top:11px; }
    .festival-radio-progress[hidden] { display:none; }
    .festival-radio-track {
      height:7px;
      overflow:hidden;
      border-radius:999px;
      background:#2d2632;
    }
    .festival-radio-track span {
      display:block;
      width:0;
      height:100%;
      border-radius:inherit;
      background:linear-gradient(90deg, #1ed760, #8ff5b4);
      transition:width .2s ease;
    }
    .festival-radio-progress small,
    .festival-radio-admin-state {
      display:block;
      margin-top:7px;
      color:#9f95a5;
      font-size:11px;
      line-height:1.4;
    }
    .festival-radio-admin-state.error { color:#ff9ba7; }
  `;
  document.head.appendChild(style);

  const tabs = document.querySelector('.festival-intro .tabs');
  if (!tabs || document.getElementById('festivalRadioCard')) return;

  const card = document.createElement('section');
  card.id = 'festivalRadioCard';
  card.className = 'festival-radio-card';
  card.setAttribute('aria-labelledby', 'festivalRadioTitle');
  card.innerHTML = `
    <div class="festival-radio-head">
      <span class="festival-radio-icon" aria-hidden="true">♫</span>
      <div class="festival-radio-copy">
        <small>Descubre el cartel</small>
        <h2 id="festivalRadioTitle">Radio del festival</h2>
        <p>Una mezcla aleatoria de música de los artistas de Primavera Sound 2027.</p>
      </div>
    </div>
    <a class="festival-radio-open" href="${PLAYLIST_URL}" target="_blank" rel="noopener">
      <span aria-hidden="true">●</span>
      <span>Abrir en Spotify</span>
      <span aria-hidden="true">↗</span>
    </a>
    <div class="festival-radio-admin" id="festivalRadioAdmin">
      <button id="festivalRadioUpdate" type="button">Actualizar mezcla aleatoria</button>
      <div class="festival-radio-progress" id="festivalRadioProgress" hidden aria-live="polite">
        <div class="festival-radio-track"><span id="festivalRadioProgressFill"></span></div>
        <small id="festivalRadioProgressText">Preparando la radio…</small>
      </div>
      <small class="festival-radio-admin-state" id="festivalRadioAdminState"></small>
    </div>`;
  tabs.before(card);

  const updateButton = document.getElementById('festivalRadioUpdate');
  const progress = document.getElementById('festivalRadioProgress');
  const progressFill = document.getElementById('festivalRadioProgressFill');
  const progressText = document.getElementById('festivalRadioProgressText');
  const adminState = document.getElementById('festivalRadioAdminState');

  function readSavedState() {
    try {
      return JSON.parse(localStorage.getItem(RADIO_STORAGE_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function renderSavedState() {
    const state = readSavedState();
    if (!state?.updatedAt || !state?.trackCount) {
      adminState.textContent = 'La playlist está vinculada. Conecta Spotify y genera la primera mezcla.';
      return;
    }
    const date = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(state.updatedAt));
    adminState.textContent = `${state.trackCount} canciones · actualizada ${date}.`;
  }

  function setAdminState(message, isError = false) {
    adminState.textContent = message || '';
    adminState.classList.toggle('error', isError);
  }

  function setProgress(done, total, message) {
    progress.hidden = false;
    const percentage = total > 0 ? Math.min(100, Math.round(done / total * 100)) : 0;
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = message;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function shuffle(values) {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swap = crypto.getRandomValues(new Uint32Array(1))[0] % (index + 1);
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result;
  }

  function availableProfiles() {
    const profiles = new Map();
    Object.values(cache || {}).forEach(entry => {
      (entry?.profiles || []).forEach(profile => {
        if (!profile?.id || !profile?.name) return;
        if (!profiles.has(profile.id)) profiles.set(profile.id, profile);
      });
    });
    return shuffle([...profiles.values()]);
  }

  async function spotifyWrite(path, options = {}, retry = 0) {
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
      return spotifyWrite(path, options, retry + 1);
    }

    if (response.status === 429 && retry < 4) {
      const seconds = Number(response.headers.get('Retry-After') || 2);
      await sleep(Math.min(seconds * 1000, 15000));
      return spotifyWrite(path, options, retry + 1);
    }

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Spotify no ha concedido permiso para modificar esta playlist. Desconecta Spotify, vuelve a conectarlo y acepta el nuevo permiso.');
      }
      throw new Error(payload.error?.message || `Spotify respondió con el código ${response.status}.`);
    }
    return payload;
  }

  async function chooseTrack(profile, usedTrackIds) {
    const cleanName = String(profile.name).replace(/["\\]/g, ' ').trim();
    const params = new URLSearchParams({
      q: `artist:"${cleanName}"`,
      type: 'track',
      market: 'ES',
      limit: '10'
    });
    const payload = await spotifyFetch(`/search?${params}`);
    const matches = (payload.tracks?.items || []).filter(track => {
      if (!track?.id || !track?.uri || usedTrackIds.has(track.id)) return false;
      if (track.is_local || track.is_playable === false) return false;
      return (track.artists || []).some(artist => artist.id === profile.id);
    });
    if (!matches.length) return null;
    const choice = matches[crypto.getRandomValues(new Uint32Array(1))[0] % matches.length];
    return {
      id: choice.id,
      uri: choice.uri,
      name: choice.name,
      artistId: profile.id,
      artistName: profile.name
    };
  }

  async function updateFestivalRadio() {
    if (!isSpotifyConnected()) {
      setAdminState('Conecta Spotify desde el panel de administración antes de actualizar la radio.', true);
      toast('Conecta Spotify para actualizar la radio');
      return;
    }

    const profiles = availableProfiles();
    if (!profiles.length) {
      setAdminState('No hay perfiles verificados disponibles para crear la radio.', true);
      return;
    }

    updateButton.disabled = true;
    updateButton.textContent = 'Creando la mezcla…';
    setAdminState('');
    setProgress(0, TARGET_TRACKS, 'Preparando artistas…');

    const selected = [];
    const usedTrackIds = new Set();
    let checked = 0;

    try {
      for (const profile of profiles) {
        if (selected.length >= TARGET_TRACKS) break;
        checked += 1;
        setProgress(
          selected.length,
          TARGET_TRACKS,
          `${selected.length} de ${TARGET_TRACKS} canciones · buscando ${profile.name}`
        );

        try {
          const track = await chooseTrack(profile, usedTrackIds);
          if (track) {
            selected.push(track);
            usedTrackIds.add(track.id);
          }
        } catch (error) {
          console.warn('Festival radio track search failed for', profile.name, error);
          if (/conecta|permiso|token|sesión|session/i.test(error.message || '')) throw error;
        }

        await sleep(90);
      }

      if (selected.length < 10) {
        throw new Error('No se han encontrado suficientes canciones válidas para crear la radio.');
      }

      const shuffledTracks = shuffle(selected);
      setProgress(shuffledTracks.length, TARGET_TRACKS, 'Guardando la mezcla en Spotify…');
      await spotifyWrite(`/playlists/${PLAYLIST_ID}/items`, {
        method: 'PUT',
        body: {uris: shuffledTracks.map(track => track.uri)}
      });

      const savedState = {
        playlistId: PLAYLIST_ID,
        trackCount: shuffledTracks.length,
        checkedArtists: checked,
        updatedAt: new Date().toISOString(),
        tracks: shuffledTracks.map(track => ({
          id: track.id,
          name: track.name,
          artistId: track.artistId,
          artistName: track.artistName
        }))
      };
      localStorage.setItem(RADIO_STORAGE_KEY, JSON.stringify(savedState));

      setProgress(TARGET_TRACKS, TARGET_TRACKS, `${shuffledTracks.length} canciones publicadas en Spotify.`);
      renderSavedState();
      toast('Radio del festival actualizada');
    } catch (error) {
      console.error('Festival radio update failed', error);
      setAdminState(error.message || 'No se pudo actualizar la radio.', true);
      toast(error.message || 'No se pudo actualizar la radio');
    } finally {
      updateButton.disabled = false;
      updateButton.textContent = 'Actualizar mezcla aleatoria';
      window.setTimeout(() => {
        progress.hidden = true;
        progressFill.style.width = '0%';
      }, 2400);
    }
  }

  // Replace the original connection button so new authorizations request only
  // the permission needed to maintain this public playlist.
  const originalConnectButton = document.getElementById('spotifyConnect');
  if (originalConnectButton) {
    const connectButton = originalConnectButton.cloneNode(true);
    originalConnectButton.replaceWith(connectButton);
    connectButton.addEventListener('click', async () => {
      if (isSpotifyConnected()) {
        [STORAGE.accessToken, STORAGE.refreshToken, STORAGE.expiresAt]
          .forEach(key => localStorage.removeItem(key));
        updateSpotifyUi();
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
        scope: RADIO_SCOPE,
        show_dialog: 'true'
      }).toString();
      location.assign(url.toString());
    });
  }

  updateButton.addEventListener('click', updateFestivalRadio);
  renderSavedState();

  window.FESTIVALFY_RADIO = Object.freeze({
    playlistId: PLAYLIST_ID,
    playlistUrl: PLAYLIST_URL,
    targetTracks: TARGET_TRACKS
  });
})();
