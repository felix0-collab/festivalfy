/* Festivalfy - código de la aplicación. Generado a partir de los módulos en el mismo orden de carga. */

/* ===== app.js ===== */
'use strict';

const CLIENT_ID = '0caa7697944d41fbb6416abac0bf45f8';
const REDIRECT_URI = 'https://felix0-collab.github.io/festivalfy/callback';
const STORAGE = {
  accessToken: 'festivalfy_spotify_access_token',
  refreshToken: 'festivalfy_spotify_refresh_token',
  expiresAt: 'festivalfy_spotify_expires_at',
  verifier: 'festivalfy_spotify_verifier',
  state: 'festivalfy_spotify_state',
  cache: 'festivalfy_spotify_cache_v2',
  saved: 'festivalfy_saved_festival'
};

const USER_SPOTIFY = {
  accessToken: 'festivalfy_user_spotify_access_token',
  refreshToken: 'festivalfy_user_spotify_refresh_token',
  expiresAt: 'festivalfy_user_spotify_expires_at',
  verifier: 'festivalfy_user_spotify_verifier',
  state: 'festivalfy_user_spotify_state',
  scope: 'festivalfy_user_spotify_scope',
  profile: 'festivalfy_user_spotify_profile',
  authPurpose: 'festivalfy_spotify_auth_purpose'
};

const FESTIVAL = {
  name: 'Primavera Sound Barcelona 2027',
  days: {
    'Mié 2': ['Underworld', 'CHVRCHES', 'Mushka', 'FADES'],
    'Jue 3': ['Fontaines D.C.', 'Massive Attack', 'Turnstile', 'Robyn', 'Bad Gyal', 'Pavement', 'Kim Petras', 'Metronomy', 'Wallows', 'Snow Strippers', 'underscores', 'Brutalismus 3000 b2b ISOxo', 'Metrika', 'Joy Orbison', 'Atlas Sound', 'Greg Freeman', 'Juana Molina', 'Haute & Freddy', 'Sophia Stel', 'Westside Cowboy', 'ear', 'Castle Rat', 'Friko', 'Gilla Band', 'Jersey', 'Alemeda', 'Viva Belgrado', 'Dame Area', 'Guillem Gisbert', 'aLex vs aLex', 'Al·lèrgiques al pol·len', 'Axolotes Mexicanos', 'Blackhaine', 'BLAYA', 'Carmen Villain live', 'Decoder', 'Eden Aurelius', 'DJ Fra', 'Headache', 'Ibrahim Alfa Jnr', 'Madra Salach', 'NAPA', 'Pole 1 2 3 live', 'Tatyana Jane', 'Tracey', 'trickpony', 'TRISTÁN!', 'TTSSFU', 'Verushka b2b Acidheaven'],
    'Vie 4': ['Phoebe Bridgers', 'FKA twigs', 'The Chemical Brothers', 'Tinashe', 'Bleachers', 'ANOHNI', 'Angine de Poitrine', 'JT', 'Isaiah Rashad', 'BICEP', 'Boy Harsher', 'pablopablo', 'Weyes Blood', 'Vashti Bunyan', 'Julien Baker', 'Converge', 'AKRIILA', 'Have A Nice Life', 'English Teacher', 'Racing Mount Pleasant', 'Mishima', 'Lip Critic', '@', 'Los Punsetes', 'Kelsey Lu', 'John Talabot', 'Full Of Hell', 'Mabe Fratti', 'Don Caballero', 'Carlos de Jacoba & Ciutat', 'S.A.S.S (Saoirse, Moxie, Peach, Shanti Celeste)', 'Aeronave Adolescente', 'Carré', 'El Buen Hijo', 'Irenegarry', 'Klara Lewis', 'Lux Lisbon', 'mad miran b2b DJ Zero', 'Malibu', 'Mark Fell and RP Boo', 'Memory Palace', 'Naone', 'Oceanic live A/V', 'Perfecto Miserable', 'Picture live', 'PISS', 'Polygonia live', 'Roly Porter', 'Sky H1 live'],
    'Sáb 5': ['Doechii', 'Hayley Williams', 'ADÉLA', 'Lola Young', 'Prospa', 'Skrillex b2b Ninajirachi', 'Caroline Polachek', 'King Gizzard & The Lizard Wizard', 'EsDeeKid', 'Arca', 'Theodora', 'Shygirl', 'Dinosaur Jr.', 'Hearts2Hearts', 'MUNA', 'Bonnie "Prince" Billy', 'DIIV', 'Erin LeCount', 'Santiago Motorizado', 'ABHIR', 'Alcalá Norte', 'Dove Ellis', 'Rebe', 'Simian Mobile Disco', 'Jesu', 'B0YG1RL', 'Twisted Teens', 'Tirzah', 'Prostitute', 'Andy Stott', 'BAE BAE', 'BASHKKA b2b Mike Servito', 'Blanco Palamera', 'dani dicostas', 'Dulce', 'Gazella', 'Jump Source live', 'Livwutang b2b Konduku', 'Loradeniz', 'Marta Salogni live', 'mori', 'PLO Man', 'DJ /rupture', 'Sonido Underground: DNGDNGDNG & Phran', 'DJ Stingray 313 live', 'Victoryland', 'Warning'],
    'Dom 6': ['Richie Hawtin', 'Four Tet', 'Dixon']
  }
};

const DAY_LABELS = {
  'Mié 2': 'Miércoles 2 de junio',
  'Jue 3': 'Jueves 3 de junio',
  'Vie 4': 'Viernes 4 de junio',
  'Sáb 5': 'Sábado 5 de junio',
  'Dom 6': 'Domingo 6 de junio',
  'Todos': 'Todo el cartel'
};

const MULTI_ACTS = {
  'Brutalismus 3000 b2b ISOxo': ['Brutalismus 3000', 'ISOxo'],
  'Verushka b2b Acidheaven': ['Verushka', 'Acidheaven'],
  'mad miran b2b DJ Zero': ['mad miran', 'DJ Zero'],
  'Mark Fell and RP Boo': ['Mark Fell', 'RP Boo'],
  'S.A.S.S (Saoirse, Moxie, Peach, Shanti Celeste)': ['Saoirse', 'Moxie', 'Peach', 'Shanti Celeste'],
  'Skrillex b2b Ninajirachi': ['Skrillex', 'Ninajirachi'],
  'BASHKKA b2b Mike Servito': ['BASHKKA', 'Mike Servito'],
  'Livwutang b2b Konduku': ['Livwutang', 'Konduku'],
  'Sonido Underground: DNGDNGDNG & Phran': ['DNGDNGDNG', 'Phran']
};

const SEARCH_ALIASES = {
  'Carmen Villain live': 'Carmen Villain',
  'Pole 1 2 3 live': 'Pole',
  'Oceanic live A/V': 'Oceanic',
  'Picture live': 'Picture',
  'Polygonia live': 'Polygonia',
  'Sky H1 live': 'Sky H1',
  'Jump Source live': 'Jump Source',
  'Marta Salogni live': 'Marta Salogni',
  'DJ Stingray 313 live': 'DJ Stingray 313'
};

const screens = {
  home: document.getElementById('homeScreen'),
  festival: document.getElementById('festivalScreen'),
  lineup: document.getElementById('lineupScreen'),
  artist: document.getElementById('artistScreen'),
  profile: document.getElementById('profileScreen')
};

let activeScreen = 'home';
let activeDay = 'Jue 3';
let activeArtist = null;
let previousScreen = 'lineup';
let currentTab = 'days';
let cache = loadJson(STORAGE.cache, {});
let syncInProgress = false;
let reviewQueue = [];
let reviewTarget = null;

function $(selector) { return document.querySelector(selector); }
function $all(selector) { return [...document.querySelectorAll(selector)]; }
function loadJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function saveCache() { localStorage.setItem(STORAGE.cache, JSON.stringify(cache)); }
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join('');
}
function allArtists() { return [...new Set(Object.values(FESTIVAL.days).flat())]; }
function artistDays(name) { return Object.entries(FESTIVAL.days).filter(([, artists]) => artists.includes(name)).map(([day]) => day); }
function directSearchUrl(name) { return `https://open.spotify.com/search/${encodeURIComponent(name)}`; }

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => element.classList.toggle('active', key === name));
  activeScreen = name;
  window.scrollTo(0, 0);
  $all('.nav-item').forEach(button => button.classList.remove('active'));
  if (name === 'home') $('#navHome').classList.add('active');
  if (name === 'profile') $('#navProfile').classList.add('active');
}

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.style.display = 'block';
  clearTimeout(window.festivalfyToast);
  window.festivalfyToast = setTimeout(() => { element.style.display = 'none'; }, 2300);
}

function renderFestivalTab() {
  $all('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === currentTab));
  const content = $('#festivalTabContent');
  if (currentTab === 'days') {
    content.innerHTML = `<div class="day-cards">${Object.keys(FESTIVAL.days).map(day => `
      <button class="day-card" type="button" data-day="${escapeHtml(day)}">
        <span class="calendar-icon">▣</span>
        <span><strong>${escapeHtml(DAY_LABELS[day])}</strong><small>${FESTIVAL.days[day].length} actuaciones</small></span>
        <span class="arrow">›</span>
      </button>`).join('')}</div>`;
    $all('.day-card').forEach(button => button.addEventListener('click', () => openLineup(button.dataset.day)));
  } else if (currentTab === 'all') {
    content.innerHTML = `<div class="info-card"><strong>${allArtists().length} actuaciones anunciadas</strong><p>Explora el cartel completo y usa el buscador para localizar cualquier artista.</p><button class="spotify-primary" id="openAllArtists" type="button">Ver todo el cartel</button></div>`;
    $('#openAllArtists').addEventListener('click', () => openLineup('Todos'));
  } else {
    content.innerHTML = `<div class="info-card"><strong>Información oficial</strong><p>Festivalfy solo mostrará horarios y escenarios cuando Primavera Sound los confirme. La distribución por días procede del anuncio oficial del festival.</p><p><a href="https://www.primaverasound.com/es/news/primavera-sound-barcelona-sigue-uniendo-los-puntos-de-su-25-edicion-anunciando-la-distribucion-por-dias-de-su-cartel" target="_blank" rel="noopener">Consultar la fuente oficial ↗</a></p></div>`;
  }
}

function openFestival() {
  showScreen('festival');
  renderFestivalTab();
  updateSpotifyUi();
}

function openLineup(day) {
  activeDay = day;
  $('#artistSearch').value = '';
  showScreen('lineup');
  renderDaySelector();
  renderArtists();
}

function renderDaySelector() {
  const days = [...Object.keys(FESTIVAL.days), 'Todos'];
  $('#daySelector').innerHTML = days.map(day => `<button class="day-chip ${day === activeDay ? 'active' : ''}" type="button" data-day="${escapeHtml(day)}">${escapeHtml(day)}</button>`).join('');
  $all('.day-chip').forEach(button => button.addEventListener('click', () => {
    activeDay = button.dataset.day;
    renderDaySelector();
    renderArtists();
  }));
}

function getVisibleArtists() {
  const list = activeDay === 'Todos' ? allArtists() : FESTIVAL.days[activeDay];
  const query = $('#artistSearch').value.trim().toLocaleLowerCase('es');
  return query ? list.filter(name => name.toLocaleLowerCase('es').includes(query)) : list;
}

function matchLabel(entry) {
  if (!entry) return {text: 'Búsqueda en Spotify', type: ''};
  if (entry.status === 'verified') return {text: entry.profiles.length > 1 ? `${entry.profiles.length} perfiles verificados` : 'Perfil verificado', type: 'verified'};
  if (entry.status === 'pending') return {text: 'Pendiente de revisión', type: 'pending'};
  if (entry.status === 'not_found') return {text: 'Sin coincidencia clara', type: 'pending'};
  return {text: 'Búsqueda en Spotify', type: ''};
}

function renderArtists() {
  const artists = getVisibleArtists();
  $('#lineupHeading').textContent = DAY_LABELS[activeDay];
  $('#artistCount').textContent = `${artists.length} ${artists.length === 1 ? 'artista' : 'artistas'}`;
  $('#syncCurrentDay').classList.toggle('hidden', !isSpotifyConnected());

  $('#artistList').innerHTML = artists.length ? artists.map(name => {
    const entry = cache[name];
    const profile = entry?.profiles?.[0];
    const label = matchLabel(entry);
    const image = profile?.image
      ? `<img src="${escapeHtml(profile.image)}" alt="" loading="lazy">`
      : escapeHtml(initials(name));
    const spotifyUrl = profile?.url || directSearchUrl(name);
    return `<article class="artist-card">
      <button class="artist-main" type="button" data-artist="${escapeHtml(name)}">
        <span class="artist-avatar">${image}</span>
        <span class="artist-copy">
          <strong>${escapeHtml(name)}</strong>
          <small>${profile ? escapeHtml(profile.name) : 'Escuchar en Spotify'}</small>
          <span class="match-badge ${label.type}">${escapeHtml(label.text)}</span>
        </span>
      </button>
      <a class="spotify-link" href="${escapeHtml(spotifyUrl)}" target="_blank" rel="noopener" aria-label="Abrir ${escapeHtml(name)} en Spotify">▶</a>
    </article>`;
  }).join('') : '<div class="empty-state">No encontramos artistas con ese nombre.</div>';

  $all('.artist-main').forEach(button => button.addEventListener('click', () => openArtist(button.dataset.artist)));
}

function openArtist(name) {
  activeArtist = name;
  previousScreen = activeScreen;
  const entry = cache[name];
  const profile = entry?.profiles?.[0];
  const hero = $('#artistDetailHero');
  hero.style.backgroundImage = profile?.image
    ? `linear-gradient(0deg, rgba(9,8,13,.96), rgba(9,8,13,.12) 68%), url("${profile.image.replace(/"/g, '%22')}")`
    : 'linear-gradient(145deg, #51206b, #18101f)';
  $('#artistDetailDay').textContent = artistDays(name).map(day => DAY_LABELS[day]).join(' · ');
  $('#artistDetailName').textContent = name;
  $('#artistDetailStatus').textContent = entry?.status === 'verified'
    ? 'Coincidencia verificada con el catálogo de Spotify.'
    : entry?.status === 'pending'
      ? 'Spotify ha encontrado varias posibilidades. Esta actuación necesita revisión.'
      : 'Conecta Spotify para identificar el perfil exacto y mostrar su imagen.';
  const profiles = entry?.profiles || [];
  $('#artistProfiles').innerHTML = profiles.length
    ? profiles.map(item => `<a class="profile-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener"><span>●</span><span>${escapeHtml(item.name)}</span><span>↗</span></a>`).join('')
    : `<a class="profile-link" href="${escapeHtml(directSearchUrl(name))}" target="_blank" rel="noopener"><span>●</span><span>Buscar en Spotify</span><span>↗</span></a>`;
  $('#artistReview').classList.toggle('hidden', entry?.status !== 'pending');
  $('#spotifyAttribution').classList.toggle('hidden', profiles.length === 0);
  showScreen('artist');
}

function updateSpotifyUi() {
  const connected = isSpotifyConnected();
  $('#spotifyDot').classList.toggle('connected', connected);
  $('#spotifyStatus').textContent = connected ? 'Spotify conectado' : 'Spotify sin conectar';
  $('#spotifyStatusDetail').textContent = connected
    ? spotifySummary()
    : 'Conecta tu cuenta para obtener perfiles e imágenes exactos.';
  $('#spotifyConnect').textContent = connected ? 'Desconectar Spotify' : 'Conectar Spotify';
  $('#spotifySync').classList.toggle('hidden', !connected || syncInProgress);
  $('#spotifyTools').classList.toggle('hidden', !connected);
  const pending = Object.values(cache).filter(item => item.status === 'pending').length;
  $('#reviewCount').textContent = String(pending);
  if (activeScreen === 'lineup') renderArtists();
}

function spotifySummary() {
  const entries = Object.values(cache);
  const verified = entries.filter(item => item.status === 'verified').length;
  const pending = entries.filter(item => item.status === 'pending').length;
  return `${verified} actuaciones verificadas${pending ? ` · ${pending} por revisar` : ''}.`;
}

function isSpotifyConnected() {
  return Boolean(localStorage.getItem(STORAGE.refreshToken) || localStorage.getItem(STORAGE.accessToken));
}

function randomString(length = 64) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return [...bytes].map(byte => characters[byte % characters.length]).join('');
}

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function connectSpotify() {
  if (isSpotifyConnected()) {
    [STORAGE.accessToken, STORAGE.refreshToken, STORAGE.expiresAt].forEach(key => localStorage.removeItem(key));
    updateSpotifyUi();
    toast('Spotify desconectado de este dispositivo');
    return;
  }
  const verifier = randomString(96);
  const challenge = base64UrlEncode(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
  const state = randomString(32);
  localStorage.setItem(STORAGE.verifier, verifier);
  localStorage.setItem(STORAGE.state, state);
  localStorage.setItem(USER_SPOTIFY.authPurpose, 'admin');
  const url = new URL('https://accounts.spotify.com/authorize');
  url.search = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    state
  }).toString();
  location.assign(url.toString());
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(STORAGE.refreshToken);
  if (!refreshToken) throw new Error('Vuelve a conectar Spotify.');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({client_id: CLIENT_ID, grant_type: 'refresh_token', refresh_token: refreshToken})
  });
  const token = await response.json();
  if (!response.ok) throw new Error(token.error_description || token.error || 'No se pudo renovar la sesión de Spotify.');
  localStorage.setItem(STORAGE.accessToken, token.access_token);
  if (token.refresh_token) localStorage.setItem(STORAGE.refreshToken, token.refresh_token);
  localStorage.setItem(STORAGE.expiresAt, String(Date.now() + (token.expires_in - 60) * 1000));
  return token.access_token;
}

async function getAccessToken() {
  const accessToken = localStorage.getItem(STORAGE.accessToken);
  const expiresAt = Number(localStorage.getItem(STORAGE.expiresAt) || 0);
  if (accessToken && Date.now() < expiresAt) return accessToken;
  return refreshAccessToken();
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function spotifyFetch(path, retry = 0) {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1${path}`, {headers: {Authorization: `Bearer ${token}`}});
  if (response.status === 401 && retry < 1) {
    localStorage.removeItem(STORAGE.accessToken);
    await refreshAccessToken();
    return spotifyFetch(path, retry + 1);
  }
  if (response.status === 429 && retry < 4) {
    const seconds = Number(response.headers.get('Retry-After') || 2);
    await delay(Math.min(seconds * 1000, 15000));
    return spotifyFetch(path, retry + 1);
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || `Spotify respondió con el código ${response.status}.`);
  return payload;
}

function normalizeName(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

function tokenSimilarity(a, b) {
  const first = new Set(normalizeName(a).split(' ').filter(Boolean));
  const second = new Set(normalizeName(b).split(' ').filter(Boolean));
  const intersection = [...first].filter(token => second.has(token)).length;
  const union = new Set([...first, ...second]).size || 1;
  return intersection / union;
}

function scoreCandidate(searchTerm, candidate) {
  const wanted = normalizeName(searchTerm);
  const found = normalizeName(candidate.name);
  if (wanted === found) return 100;
  if (found.startsWith(wanted) || wanted.startsWith(found)) return 88;
  return Math.round(tokenSimilarity(wanted, found) * 82);
}

function searchTermsForAct(name) {
  if (MULTI_ACTS[name]) return MULTI_ACTS[name];
  return [SEARCH_ALIASES[name] || name.replace(/\s+live(?:\s+A\/V)?$/i, '').trim()];
}

function compactProfile(candidate) {
  return {
    id: candidate.id,
    name: candidate.name,
    url: candidate.external_urls?.spotify || `https://open.spotify.com/artist/${candidate.id}`,
    image: candidate.images?.[1]?.url || candidate.images?.[0]?.url || '',
    popularity: candidate.popularity ?? null
  };
}

async function searchSpotifyArtist(searchTerm) {
  const params = new URLSearchParams({q: searchTerm, type: 'artist', market: 'ES', limit: '10'});
  const payload = await spotifyFetch(`/search?${params}`);
  const candidates = (payload.artists?.items || []).map(candidate => ({...compactProfile(candidate), score: scoreCandidate(searchTerm, candidate)}));
  candidates.sort((a, b) => b.score - a.score || (b.popularity || 0) - (a.popularity || 0));
  return candidates;
}

async function resolveAct(name, force = false) {
  if (!force && cache[name]?.status === 'verified') return cache[name];
  const terms = searchTermsForAct(name);
  const profiles = [];
  const unresolved = [];

  for (const term of terms) {
    const candidates = await searchSpotifyArtist(term);
    const top = candidates[0];
    const second = candidates[1];
    const exact = top && normalizeName(top.name) === normalizeName(term);
    const safeHighScore = top && top.score >= 94 && (!second || top.score - second.score >= 10);
    if (top && (exact || safeHighScore)) profiles.push(top);
    else unresolved.push({term, candidates: candidates.slice(0, 5)});
    await delay(120);
  }

  const entry = {
    act: name,
    status: unresolved.length === 0 && profiles.length === terms.length ? 'verified' : unresolved.length ? 'pending' : 'not_found',
    profiles: profiles.map(({score, ...profile}) => profile),
    unresolved,
    syncedAt: new Date().toISOString()
  };
  cache[name] = entry;
  saveCache();
  return entry;
}

async function syncArtists(names, label) {
  if (!isSpotifyConnected()) {
    toast('Conecta Spotify antes de sincronizar');
    return;
  }
  if (syncInProgress) return;
  syncInProgress = true;
  $('#spotifySync').classList.add('hidden');
  $('#syncProgress').classList.remove('hidden');
  const unique = [...new Set(names)];
  let completed = 0;
  let failures = 0;

  const updateProgress = () => {
    const percentage = unique.length ? Math.round(completed / unique.length * 100) : 100;
    $('#progressFill').style.width = `${percentage}%`;
    $('#progressText').textContent = `${label}: ${completed} de ${unique.length}${failures ? ` · ${failures} errores` : ''}`;
  };
  updateProgress();

  const queue = [...unique];
  const worker = async () => {
    while (queue.length) {
      const name = queue.shift();
      try { await resolveAct(name); }
      catch (error) {
        failures += 1;
        console.error('Spotify sync failed for', name, error);
        if (/conectar|renovar|token|session/i.test(error.message)) throw error;
      } finally {
        completed += 1;
        updateProgress();
        if (activeScreen === 'lineup') renderArtists();
      }
    }
  };

  try {
    await Promise.all([worker(), worker()]);
    toast(failures ? 'Sincronización terminada con algunos errores' : 'Cartel sincronizado con Spotify');
  } catch (error) {
    toast(error.message);
  } finally {
    syncInProgress = false;
    setTimeout(() => $('#syncProgress').classList.add('hidden'), 1800);
    updateSpotifyUi();
    if (activeScreen === 'lineup') renderArtists();
  }
}

function pendingEntries() {
  return Object.entries(cache).filter(([, entry]) => entry.status === 'pending' && entry.unresolved?.length);
}

function openNextReview(preferredName = null) {
  reviewQueue = pendingEntries().map(([name]) => name);
  if (preferredName && reviewQueue.includes(preferredName)) {
    reviewQueue = [preferredName, ...reviewQueue.filter(name => name !== preferredName)];
  }
  if (!reviewQueue.length) {
    toast('No hay coincidencias pendientes de revisión');
    return;
  }
  reviewTarget = reviewQueue[0];
  renderReviewDialog();
  $('#reviewDialog').showModal();
}

function renderReviewDialog() {
  const entry = cache[reviewTarget];
  const unresolved = entry?.unresolved?.[0];
  if (!entry || !unresolved) {
    $('#reviewDialog').close();
    updateSpotifyUi();
    return;
  }
  $('#reviewTitle').textContent = reviewTarget;
  $('#reviewSubtitle').textContent = `¿Cuál es el perfil correcto para “${unresolved.term}”?`;
  $('#candidateList').innerHTML = unresolved.candidates.length ? unresolved.candidates.map((candidate, index) => `
    <button class="candidate" type="button" data-index="${index}">
      ${candidate.image ? `<img src="${escapeHtml(candidate.image)}" alt="">` : '<span class="candidate-placeholder"></span>'}
      <span class="candidate-copy"><strong>${escapeHtml(candidate.name)}</strong><small>Coincidencia ${candidate.score}%</small></span>
    </button>`).join('') : '<div class="empty-state">Spotify no devolvió candidatos.</div>';
  $all('.candidate').forEach(button => button.addEventListener('click', () => chooseCandidate(Number(button.dataset.index))));
}

function chooseCandidate(index) {
  const entry = cache[reviewTarget];
  const unresolved = entry.unresolved.shift();
  const candidate = unresolved.candidates[index];
  if (!candidate) return;
  const {score, ...profile} = candidate;
  entry.profiles.push(profile);
  entry.status = entry.unresolved.length ? 'pending' : 'verified';
  entry.reviewedAt = new Date().toISOString();
  cache[reviewTarget] = entry;
  saveCache();

  if (entry.unresolved.length) {
    renderReviewDialog();
  } else {
    reviewQueue.shift();
    if (reviewQueue.length) {
      reviewTarget = reviewQueue[0];
      renderReviewDialog();
    } else {
      $('#reviewDialog').close();
      toast('Revisión completada');
    }
  }
  updateSpotifyUi();
  if (activeScreen === 'lineup') renderArtists();
  if (activeScreen === 'artist' && activeArtist) openArtist(activeArtist);
}

function exportSpotifyData() {
  const payload = {
    festival: FESTIVAL.name,
    exportedAt: new Date().toISOString(),
    artists: cache
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'festivalfy-spotify-artists.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast('Datos de Spotify exportados');
}


const USER_SPOTIFY_PLAYBACK_SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state'
];

function isUserSpotifyConnected() {
  return Boolean(localStorage.getItem(USER_SPOTIFY.refreshToken) || localStorage.getItem(USER_SPOTIFY.accessToken));
}

function userSpotifyScopeSet() {
  return new Set(String(localStorage.getItem(USER_SPOTIFY.scope) || '').split(/\s+/).filter(Boolean));
}

function userSpotifyHasPlaybackScopes() {
  const granted = userSpotifyScopeSet();
  return USER_SPOTIFY_PLAYBACK_SCOPES.every(scope => granted.has(scope));
}

function cachedUserSpotifyProfile() {
  try { return JSON.parse(localStorage.getItem(USER_SPOTIFY.profile) || 'null'); }
  catch { return null; }
}

async function refreshUserSpotifyAccessToken() {
  const refreshToken = localStorage.getItem(USER_SPOTIFY.refreshToken);
  if (!refreshToken) throw new Error('Vuelve a conectar tu cuenta de Spotify.');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });
  const token = await response.json();
  if (!response.ok) throw new Error(token.error_description || token.error || 'No se pudo renovar la sesión de Spotify.');

  localStorage.setItem(USER_SPOTIFY.accessToken, token.access_token);
  if (token.refresh_token) localStorage.setItem(USER_SPOTIFY.refreshToken, token.refresh_token);
  localStorage.setItem(USER_SPOTIFY.expiresAt, String(Date.now() + (token.expires_in - 60) * 1000));
  if (token.scope) localStorage.setItem(USER_SPOTIFY.scope, token.scope);
  return token.access_token;
}

async function getUserSpotifyAccessToken() {
  const accessToken = localStorage.getItem(USER_SPOTIFY.accessToken);
  const expiresAt = Number(localStorage.getItem(USER_SPOTIFY.expiresAt) || 0);
  if (accessToken && Date.now() < expiresAt) return accessToken;
  return refreshUserSpotifyAccessToken();
}

function clearUserSpotifyConnection() {
  [
    USER_SPOTIFY.accessToken,
    USER_SPOTIFY.refreshToken,
    USER_SPOTIFY.expiresAt,
    USER_SPOTIFY.scope,
    USER_SPOTIFY.profile,
    USER_SPOTIFY.verifier,
    USER_SPOTIFY.state
  ].forEach(key => localStorage.removeItem(key));

  try { window.FESTIVALFY_USER_PLAYER?.disconnect?.(); } catch {}
}

async function loadUserSpotifyProfile() {
  const token = await getUserSpotifyAccessToken();
  let response = await fetch('https://api.spotify.com/v1/me', {
    headers: {Authorization: `Bearer ${token}`}
  });

  if (response.status === 401) {
    localStorage.removeItem(USER_SPOTIFY.accessToken);
    const refreshed = await refreshUserSpotifyAccessToken();
    response = await fetch('https://api.spotify.com/v1/me', {
      headers: {Authorization: `Bearer ${refreshed}`}
    });
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || 'No se pudo leer el perfil de Spotify.');

  const compact = {
    displayName: payload.display_name || 'Cuenta de Spotify',
    product: payload.product || ''
  };
  localStorage.setItem(USER_SPOTIFY.profile, JSON.stringify(compact));
  return compact;
}

function paintUserSpotifyProfile(profile = null) {
  const connected = isUserSpotifyConnected();
  const dot = $('#profileSpotifyDot');
  const status = $('#profileSpotifyStatus');
  const detail = $('#profileSpotifyDetail');
  const button = $('#profileSpotifyConnect');
  if (!dot || !status || !detail || !button) return;

  dot.classList.toggle('connected', connected);

  if (!connected) {
    status.textContent = 'Spotify sin conectar';
    detail.textContent = 'Conecta tu cuenta para vincular Spotify a tu perfil de Festivalfy.';
    button.textContent = 'Conectar Spotify';
    return;
  }

  const hasPlaybackScopes = userSpotifyHasPlaybackScopes();
  status.textContent = profile?.displayName || 'Spotify conectado';

  if (!hasPlaybackScopes) {
    detail.textContent = 'Tu cuenta está conectada, pero falta el permiso para iniciar canciones completas dentro de Festivalfy.';
    button.textContent = 'Activar reproducción completa';
    return;
  }

  button.textContent = 'Desconectar Spotify';
  const premium = String(profile?.product || '').toLowerCase() === 'premium';
  detail.textContent = premium
    ? 'Spotify Premium conectado · reproducción completa activada dentro de Festivalfy.'
    : profile?.product
      ? `Cuenta ${profile.product} conectada · la reproducción completa dentro de Festivalfy requiere Premium.`
      : 'Cuenta conectada · Festivalfy comprobará Premium al iniciar la reproducción completa.';
}

async function renderUserSpotifyProfile() {
  const cached = cachedUserSpotifyProfile();
  paintUserSpotifyProfile(cached);
  if (!isUserSpotifyConnected()) return;

  try {
    const profile = await loadUserSpotifyProfile();
    paintUserSpotifyProfile(profile);
  } catch (error) {
    console.warn('No se pudo actualizar el perfil de Spotify del usuario.', error);
    const detail = $('#profileSpotifyDetail');
    if (detail) detail.textContent = 'Spotify está conectado, pero no se pudo actualizar la información de la cuenta.';
  }
}

function openProfile() {
  showScreen('profile');
  renderUserSpotifyProfile();
}

async function connectUserSpotify() {
  const connected = isUserSpotifyConnected();
  const upgradingPermissions = connected && !userSpotifyHasPlaybackScopes();

  if (connected && !upgradingPermissions) {
    clearUserSpotifyConnection();
    paintUserSpotifyProfile(null);
    toast('Spotify desconectado de tu perfil');
    return;
  }

  if (upgradingPermissions) {
    [
      USER_SPOTIFY.accessToken,
      USER_SPOTIFY.refreshToken,
      USER_SPOTIFY.expiresAt,
      USER_SPOTIFY.scope
    ].forEach(key => localStorage.removeItem(key));
  }

  const verifier = randomString(96);
  const challenge = base64UrlEncode(await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(verifier)
  ));
  const state = randomString(32);

  localStorage.setItem(USER_SPOTIFY.verifier, verifier);
  localStorage.setItem(USER_SPOTIFY.state, state);
  localStorage.setItem(USER_SPOTIFY.authPurpose, 'user');

  const url = new URL('https://accounts.spotify.com/authorize');
  url.search = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    state,
    scope: USER_SPOTIFY_PLAYBACK_SCOPES.join(' '),
    show_dialog: 'true'
  }).toString();
  location.assign(url.toString());
}

function initializeSavedFestival() {
  const saved = localStorage.getItem(STORAGE.saved) === 'true';
  $('#saveFestival').textContent = saved ? '♥' : '♡';
}

function bindEvents() {
  $('#openFestival').addEventListener('click', openFestival);
  $('#festivalBack').addEventListener('click', () => showScreen('home'));
  $('#lineupBack').addEventListener('click', openFestival);
  $('#artistBack').addEventListener('click', () => {
    if (previousScreen === 'festival') openFestival();
    else openLineup(activeDay);
  });
  $('#navHome').addEventListener('click', () => showScreen('home'));
  $('#navSaved').addEventListener('click', () => toast(localStorage.getItem(STORAGE.saved) === 'true' ? 'Primavera Sound 2027 está guardado' : 'Todavía no has guardado festivales'));
  $('#navProfile').addEventListener('click', openProfile);
  $('#profileButton').addEventListener('click', openProfile);
  $('#profileSpotifyConnect').addEventListener('click', connectUserSpotify);
  $('#festivalSearch').addEventListener('input', event => {
    $('#openFestival').classList.toggle('hidden', !'primavera sound barcelona'.includes(event.target.value.toLowerCase()));
  });
  $('#artistSearch').addEventListener('input', renderArtists);
  $('#saveFestival').addEventListener('click', () => {
    const next = localStorage.getItem(STORAGE.saved) !== 'true';
    localStorage.setItem(STORAGE.saved, String(next));
    $('#saveFestival').textContent = next ? '♥' : '♡';
    toast(next ? 'Festival guardado' : 'Festival eliminado de guardados');
  });
  $all('.tab').forEach(tab => tab.addEventListener('click', () => {
    currentTab = tab.dataset.tab;
    renderFestivalTab();
  }));
  $('#spotifyConnect').addEventListener('click', connectSpotify);
  $('#spotifySync').addEventListener('click', () => syncArtists(allArtists(), 'Todo el cartel'));
  $('#syncCurrentDay').addEventListener('click', () => syncArtists(activeDay === 'Todos' ? allArtists() : FESTIVAL.days[activeDay], DAY_LABELS[activeDay]));
  $('#reviewMatches').addEventListener('click', () => openNextReview());
  $('#artistReview').addEventListener('click', () => openNextReview(activeArtist));
  $('#exportMatches').addEventListener('click', exportSpotifyData);
  $('#skipCandidate').addEventListener('click', () => $('#reviewDialog').close());
}

function init() {
  bindEvents();
  initializeSavedFestival();
  renderFestivalTab();
  updateSpotifyUi();
  const params = new URLSearchParams(location.search);
  if (params.get('spotify_user') === 'connected') {
    history.replaceState({}, '', location.pathname);
    toast('Spotify conectado a tu perfil');
    openProfile();
  } else if (params.get('spotify') === 'connected') {
    history.replaceState({}, '', location.pathname);
    toast('Spotify conectado correctamente');
    openFestival();
  }
}

init();


/* ===== published-spotify-loader.js ===== */
'use strict';

// Merges the reviewed public catalogue with any newer corrections saved on
// this device. The merged catalogue is persisted locally so public visitors
// get photos, links and artist detail pages without connecting Spotify.
(() => {
  const published = window.FESTIVALFY_PUBLISHED_SPOTIFY_DATA || {};
  const publishedAt = Date.parse('2026-11-03T20:06:16.975Z') || 0;
  const local = loadJson(STORAGE.cache, {});

  function localTimestamp(entry) {
    const dates = [entry?.reviewedAt, entry?.syncedAt];
    for (const edit of entry?.manualEdits || []) dates.push(edit.editedAt);
    for (const match of entry?.manualMatches || []) dates.push(match.reviewedAt);
    return Math.max(0, ...dates.map(value => Date.parse(value || '') || 0));
  }

  const merged = {};
  for (const name of new Set([...Object.keys(published), ...Object.keys(local)])) {
    const localEntry = local[name];
    const publishedEntry = published[name];

    // A correction made after the export stays local; otherwise the reviewed
    // public record wins. This preserves administrator edits on that device.
    merged[name] = localEntry && localTimestamp(localEntry) > publishedAt
      ? localEntry
      : (publishedEntry || localEntry);
  }

  cache = merged;
  window.FESTIVALFY_PUBLIC_CATALOGUE_READY = true;

  // Persisting the public snapshot means app.js can start with the complete
  // catalogue on subsequent visits, including in public/private browsing.
  try {
    localStorage.setItem(STORAGE.cache, JSON.stringify(merged));
  } catch (error) {
    console.warn('Festivalfy could not cache the public Spotify catalogue.', error);
  }

  function refreshCurrentView() {
    if (activeScreen === 'festival') updateSpotifyUi();
    if (activeScreen === 'lineup') renderArtists();
    if (activeScreen === 'artist' && activeArtist) openArtist(activeArtist);
    if (activeScreen === 'saved' && typeof renderSavedScreen === 'function') renderSavedScreen();
  }

  refreshCurrentView();

  // Reliable delegated navigation: the complete artist card opens its detail
  // page. Spotify links and favourite controls keep their own behaviour.
  if (!window.FESTIVALFY_ARTIST_CARD_NAVIGATION_BOUND) {
    window.FESTIVALFY_ARTIST_CARD_NAVIGATION_BOUND = true;
    document.addEventListener('click', event => {
      const card = event.target.closest('#artistList .artist-card');
      if (!card) return;
      if (event.target.closest('a, .artist-favorite')) return;

      const main = card.querySelector('.artist-main');
      const name = main?.dataset.artist;
      if (!name || typeof openArtist !== 'function') return;

      event.preventDefault();
      event.stopImmediatePropagation();
      openArtist(name);
    }, true);
  }

  const style = document.createElement('style');
  style.textContent = `
    #artistList .artist-card { cursor:pointer; }
    #artistList .artist-main { user-select:none; -webkit-user-select:none; }
  `;
  document.head.appendChild(style);
})();


/* ===== spotify-matching.js ===== */
'use strict';

// Refuerza la resolución automática: un nombre exacto solo se verifica
// cuando no existe otro candidato con el mismo nombre normalizado.
resolveAct = async function resolveActSafely(name, force = false) {
  if (!force && cache[name]?.status === 'verified') return cache[name];
  const terms = searchTermsForAct(name);
  const profiles = [];
  const unresolved = [];

  for (const term of terms) {
    const candidates = await searchSpotifyArtist(term);
    const top = candidates[0];
    const second = candidates[1];
    const wanted = normalizeName(term);
    const exact = top && normalizeName(top.name) === wanted;
    const duplicateExact = second && normalizeName(second.name) === wanted;
    const safeHighScore = top && top.score >= 94 && (!second || top.score - second.score >= 10);

    if (top && ((exact && !duplicateExact) || safeHighScore)) {
      profiles.push(top);
    } else {
      unresolved.push({term, candidates: candidates.slice(0, 5)});
    }
    await delay(120);
  }

  const entry = {
    act: name,
    status: unresolved.length === 0 && profiles.length === terms.length
      ? 'verified'
      : unresolved.length
        ? 'pending'
        : 'not_found',
    profiles: profiles.map(({score, ...profile}) => profile),
    unresolved,
    syncedAt: new Date().toISOString()
  };

  cache[name] = entry;
  saveCache();
  return entry;
};

// Mejora la revisión manual de actuaciones conjuntas y permite indicar
// de forma segura que ninguna de las opciones propuestas es correcta.
(() => {
  const CANONICAL_PROFILE_IDS = {
    'Brutalismus 3000': '6LtXxYMIiKSy2EGHnz1f5j',
    'ISOxo': '4zVCMnjw54nkhGHU4e1Pav'
  };
  const KNOWN_ACT = 'Brutalismus 3000 b2b ISOxo';
  const saferResolveAct = resolveAct;
  const originalMatchLabel = matchLabel;
  const originalOpenArtist = openArtist;

  resolveAct = async function resolveActWithCanonicalProfiles(name, force = false) {
    if (name !== KNOWN_ACT) return saferResolveAct(name, force);
    if (!force && cache[name]?.status === 'verified' && cache[name]?.profiles?.length === 2) return cache[name];

    try {
      const profiles = [];
      for (const term of MULTI_ACTS[name]) {
        const payload = await spotifyFetch(`/artists/${CANONICAL_PROFILE_IDS[term]}`);
        profiles.push(compactProfile(payload));
      }
      const entry = {
        act: name,
        status: 'verified',
        profiles,
        unresolved: [],
        syncedAt: new Date().toISOString(),
        source: 'canonical_spotify_ids'
      };
      cache[name] = entry;
      saveCache();
      return entry;
    } catch (error) {
      console.warn('No se pudieron cargar los perfiles canónicos del b2b.', error);
      return saferResolveAct(name, force);
    }
  };

  matchLabel = function matchLabelWithManualState(entry) {
    if (entry?.unmatched?.length) {
      return {text: entry.profiles?.length ? 'Coincidencia parcial' : 'Sin coincidencia clara', type: 'pending'};
    }
    return originalMatchLabel(entry);
  };

  openArtist = function openArtistWithManualState(name) {
    originalOpenArtist(name);
    const entry = cache[name];
    if (entry?.unmatched?.length) {
      const missing = entry.unmatched.map(item => item.term).join(', ');
      $('#artistDetailStatus').textContent = entry.profiles?.length
        ? `Se verificó parte de la actuación, pero falta identificar: ${missing}.`
        : `No se encontró una coincidencia correcta para: ${missing}.`;
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .review-context{margin:-4px 0 14px;padding:11px 13px;border:1px solid #352d3d;border-radius:12px;background:#17131c;color:#bdb3c3;font-size:13px;line-height:1.45}
    .review-context strong{color:#e19aff}
    .manual-search-link{display:flex;align-items:center;justify-content:center;width:100%;margin-top:14px;padding:12px 14px;border-radius:999px;color:#d8a4ff;text-decoration:none;font-weight:800;border:1px solid #4a3658;background:#17121c}
    .no-match-button{width:100%;margin-top:10px;padding:13px 14px;border-radius:999px;border:1px solid #67466f;background:#241827;color:#f0d8f4;font-weight:850;font-size:15px}
  `;
  document.head.appendChild(style);

  const skipButton = $('#skipCandidate');
  const context = document.createElement('div');
  context.id = 'reviewContext';
  context.className = 'review-context';
  context.hidden = true;
  $('#reviewSubtitle').after(context);

  const manualSearch = document.createElement('a');
  manualSearch.id = 'manualSearchCandidate';
  manualSearch.className = 'manual-search-link';
  manualSearch.target = '_blank';
  manualSearch.rel = 'noopener';
  manualSearch.textContent = 'Buscar manualmente en Spotify ↗';
  skipButton.before(manualSearch);

  const rejectButton = document.createElement('button');
  rejectButton.id = 'rejectCandidate';
  rejectButton.className = 'no-match-button';
  rejectButton.type = 'button';
  rejectButton.textContent = 'Ninguna coincide';
  skipButton.before(rejectButton);

  renderReviewDialog = function renderReviewDialogWithContext() {
    const entry = cache[reviewTarget];
    const unresolved = entry?.unresolved?.[0];
    if (!entry || !unresolved) {
      $('#reviewDialog').close();
      updateSpotifyUi();
      return;
    }

    const terms = searchTermsForAct(reviewTarget);
    const termIndex = Math.max(0, terms.findIndex(term => normalizeName(term) === normalizeName(unresolved.term)));
    $('#reviewTitle').textContent = reviewTarget;
    $('#reviewSubtitle').textContent = `¿Cuál es el perfil correcto para “${unresolved.term}”?`;

    if (terms.length > 1) {
      context.hidden = false;
      context.innerHTML = `<strong>Parte ${termIndex + 1} de ${terms.length}:</strong> esta actuación reúne varios artistas. Festivalfy revisa ahora <strong>${escapeHtml(unresolved.term)}</strong>; los demás perfiles se verifican por separado.`;
    } else {
      context.hidden = true;
      context.textContent = '';
    }

    manualSearch.href = directSearchUrl(unresolved.term);
    manualSearch.setAttribute('aria-label', `Buscar ${unresolved.term} manualmente en Spotify`);
    $('#candidateList').innerHTML = unresolved.candidates.length ? unresolved.candidates.map((candidate, index) => `
      <button class="candidate" type="button" data-index="${index}">
        ${candidate.image ? `<img src="${escapeHtml(candidate.image)}" alt="">` : '<span class="candidate-placeholder"></span>'}
        <span class="candidate-copy"><strong>${escapeHtml(candidate.name)}</strong><small>Coincidencia ${candidate.score}%</small></span>
      </button>`).join('') : '<div class="empty-state">Spotify no devolvió candidatos.</div>';
    $all('.candidate').forEach(button => button.addEventListener('click', () => chooseCandidate(Number(button.dataset.index))));
  };

  function advanceAfterNoMatch(entry) {
    if (entry.unresolved.length) {
      renderReviewDialog();
    } else {
      reviewQueue = reviewQueue.filter(name => name !== reviewTarget);
      if (reviewQueue.length) {
        reviewTarget = reviewQueue[0];
        renderReviewDialog();
      } else {
        $('#reviewDialog').close();
        toast('Revisión completada');
      }
    }
    updateSpotifyUi();
    if (activeScreen === 'lineup') renderArtists();
    if (activeScreen === 'artist' && activeArtist) openArtist(activeArtist);
  }

  rejectButton.addEventListener('click', () => {
    const entry = cache[reviewTarget];
    const unresolved = entry?.unresolved?.shift();
    if (!entry || !unresolved) return;

    entry.unmatched = [...(entry.unmatched || []), {
      term: unresolved.term,
      reason: 'none_of_candidates',
      reviewedAt: new Date().toISOString()
    }];
    entry.status = entry.unresolved.length ? 'pending' : 'not_found';
    entry.reviewedAt = new Date().toISOString();
    cache[reviewTarget] = entry;
    saveCache();
    advanceAfterNoMatch(entry);
  });

  async function repairKnownAct() {
    if (!isSpotifyConnected()) return;
    const current = cache[KNOWN_ACT];
    if (current?.status === 'verified' && current?.profiles?.length === 2) return;
    try {
      await resolveAct(KNOWN_ACT, true);
      updateSpotifyUi();
      if (activeScreen === 'lineup') renderArtists();
      if ($('#reviewDialog').open && reviewTarget === KNOWN_ACT) $('#reviewDialog').close();
    } catch (error) {
      console.warn('No se pudo reparar automáticamente la actuación conjunta.', error);
    }
  }

  setTimeout(repairKnownAct, 0);
})();


/* ===== manual-spotify-profile.js ===== */
'use strict';

// Permite vincular manualmente un perfil cuando las sugerencias automáticas
// no incluyen al artista correcto. Acepta enlaces, URI o IDs de artista.
(() => {
  const dialog = $('#reviewDialog');
  const skipButton = $('#skipCandidate');
  const manualSearchLink = $('#manualSearchCandidate');
  const insertBefore = $('#rejectCandidate') || skipButton;
  const baseRenderReviewDialog = renderReviewDialog;

  const style = document.createElement('style');
  style.textContent = `
    .manual-profile-box{margin-top:14px;padding:14px;border:1px solid #3b3043;border-radius:15px;background:#151119}
    .manual-profile-box label{display:block;margin-bottom:8px;color:#f4edf6;font-size:14px;font-weight:800}
    .manual-profile-row{display:flex;gap:8px}
    .manual-profile-row input{min-width:0;flex:1;padding:12px 13px;border:1px solid #44384c;border-radius:12px;background:#0e0b11;color:#fff;font:inherit;outline:none}
    .manual-profile-row input:focus{border-color:#b653f1;box-shadow:0 0 0 3px rgba(182,83,241,.12)}
    .manual-profile-row button,.manual-profile-confirm{border:0;border-radius:12px;background:#b653f1;color:#fff;font-weight:850;padding:0 14px}
    .manual-profile-help{display:block;margin-top:8px;color:#9f95a5;font-size:12px;line-height:1.4}
    .manual-profile-message{margin:10px 0 0;color:#d8cfdc;font-size:13px;line-height:1.4}
    .manual-profile-message.error{color:#ff9ba7}
    .manual-profile-preview{display:flex;align-items:center;gap:11px;margin-top:12px;padding:10px;border:1px solid #3e3346;border-radius:13px;background:#1b1620}
    .manual-profile-preview img,.manual-profile-placeholder{width:48px;height:48px;border-radius:10px;object-fit:cover;background:#2a222f}
    .manual-profile-preview-copy{min-width:0;flex:1}
    .manual-profile-preview-copy strong{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .manual-profile-preview-copy small{display:block;margin-top:3px;color:#a89dab}
    .manual-profile-confirm{padding:10px 12px;white-space:nowrap}
    @media(max-width:420px){.manual-profile-row{flex-direction:column}.manual-profile-row button{padding:12px}.manual-profile-preview{align-items:flex-start;flex-wrap:wrap}.manual-profile-confirm{width:100%}}
  `;
  document.head.appendChild(style);

  const box = document.createElement('div');
  box.id = 'manualProfileBox';
  box.className = 'manual-profile-box';
  box.innerHTML = `
    <label for="manualSpotifyProfile">¿No aparece el correcto? Pega su perfil</label>
    <div class="manual-profile-row">
      <input id="manualSpotifyProfile" type="url" inputmode="url" autocomplete="off" placeholder="https://open.spotify.com/artist/…">
      <button id="checkManualSpotifyProfile" type="button">Comprobar</button>
    </div>
    <small class="manual-profile-help">En Spotify: abre el artista → Compartir → Copiar enlace.</small>
    <p id="manualProfileMessage" class="manual-profile-message" hidden></p>
    <div id="manualProfilePreview" hidden></div>
  `;
  insertBefore.before(box);

  const input = $('#manualSpotifyProfile');
  const checkButton = $('#checkManualSpotifyProfile');
  const message = $('#manualProfileMessage');
  const preview = $('#manualProfilePreview');
  let checkedProfile = null;

  function parseSpotifyArtistId(value) {
    const text = String(value || '').trim();
    const urlMatch = text.match(/open\.spotify\.com\/artist\/([A-Za-z0-9]{22})/i);
    if (urlMatch) return urlMatch[1];
    const uriMatch = text.match(/^spotify:artist:([A-Za-z0-9]{22})$/i);
    if (uriMatch) return uriMatch[1];
    if (/^[A-Za-z0-9]{22}$/.test(text)) return text;
    return null;
  }

  function setMessage(text, isError = false) {
    message.hidden = !text;
    message.textContent = text || '';
    message.classList.toggle('error', isError);
  }

  function resetManualForm() {
    checkedProfile = null;
    input.value = '';
    preview.hidden = true;
    preview.innerHTML = '';
    setMessage('');
    checkButton.disabled = false;
    checkButton.textContent = 'Comprobar';
  }

  function finishManualSelection(entry) {
    if (entry.unresolved.length) {
      renderReviewDialog();
    } else {
      reviewQueue = reviewQueue.filter(name => name !== reviewTarget);
      if (reviewQueue.length) {
        reviewTarget = reviewQueue[0];
        renderReviewDialog();
      } else {
        dialog.close();
        toast('Perfil añadido y revisión completada');
      }
    }

    updateSpotifyUi();
    if (activeScreen === 'lineup') renderArtists();
    if (activeScreen === 'artist' && activeArtist) openArtist(activeArtist);
  }

  function useCheckedProfile() {
    const entry = cache[reviewTarget];
    const unresolved = entry?.unresolved?.shift();
    if (!entry || !unresolved || !checkedProfile) {
      setMessage('No hay una coincidencia pendiente para guardar.', true);
      return;
    }

    if (!entry.profiles.some(profile => profile.id === checkedProfile.id)) {
      entry.profiles.push(checkedProfile);
    }
    entry.status = entry.unresolved.length
      ? 'pending'
      : entry.unmatched?.length
        ? 'not_found'
        : 'verified';
    entry.reviewedAt = new Date().toISOString();
    entry.manualMatches = [...(entry.manualMatches || []), {
      term: unresolved.term,
      spotifyArtistId: checkedProfile.id,
      spotifyName: checkedProfile.name,
      reviewedAt: entry.reviewedAt
    }];
    cache[reviewTarget] = entry;
    saveCache();
    toast(`Perfil de ${checkedProfile.name} añadido`);
    finishManualSelection(entry);
  }

  async function checkManualProfile() {
    const id = parseSpotifyArtistId(input.value);
    if (!id) {
      setMessage('Pega un enlace de artista de Spotify válido. No sirve un enlace de canción, álbum o playlist.', true);
      return;
    }

    checkButton.disabled = true;
    checkButton.textContent = 'Comprobando…';
    preview.hidden = true;
    setMessage('Consultando el perfil en Spotify…');

    try {
      const payload = await spotifyFetch(`/artists/${id}`);
      checkedProfile = compactProfile(payload);
      setMessage('Comprueba que este es el artista correcto antes de guardarlo.');
      preview.hidden = false;
      preview.innerHTML = `
        <div class="manual-profile-preview">
          ${checkedProfile.image ? `<img src="${escapeHtml(checkedProfile.image)}" alt="">` : '<span class="manual-profile-placeholder"></span>'}
          <span class="manual-profile-preview-copy">
            <strong>${escapeHtml(checkedProfile.name)}</strong>
            <small>Perfil de artista de Spotify</small>
          </span>
          <button class="manual-profile-confirm" id="useManualSpotifyProfile" type="button">Usar este perfil</button>
        </div>`;
      $('#useManualSpotifyProfile').addEventListener('click', useCheckedProfile);
    } catch (error) {
      checkedProfile = null;
      setMessage(error.message || 'No se pudo consultar ese perfil de Spotify.', true);
    } finally {
      checkButton.disabled = false;
      checkButton.textContent = 'Comprobar';
    }
  }

  checkButton.addEventListener('click', checkManualProfile);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      checkManualProfile();
    }
  });

  renderReviewDialog = function renderReviewDialogWithManualProfile() {
    baseRenderReviewDialog();
    resetManualForm();
  };

  // La búsqueda manual existente sigue siendo útil para localizar y copiar el enlace.
  if (manualSearchLink) {
    manualSearchLink.insertAdjacentText('beforebegin', '');
  }
})();


/* ===== navigation-state.js ===== */
'use strict';

// Conserva el estado visual de la lista al entrar en una ficha de artista.
// Se carga después de app.js y amplía sus funciones de navegación.
(() => {
  let lineupViewState = {
    day: null,
    search: '',
    scrollY: 0
  };

  const openLineupBase = openLineup;
  const openArtistBase = openArtist;

  function restoreLineupScroll() {
    const target = Math.max(0, Number(lineupViewState.scrollY) || 0);

    // Espera a que la lista se haya dibujado antes de recuperar la posición.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({top: target, left: 0, behavior: 'auto'});
      });
    });

    // Una segunda corrección evita pequeños saltos si una imagen termina de cargar.
    setTimeout(() => {
      if (activeScreen === 'lineup') {
        window.scrollTo({top: target, left: 0, behavior: 'auto'});
      }
    }, 120);
  }

  openLineup = function openLineupWithViewState(day, options = {}) {
    const returningFromArtist = activeScreen === 'artist'
      && previousScreen === 'lineup'
      && lineupViewState.day === day;
    const shouldRestore = options.restore ?? returningFromArtist;

    if (!shouldRestore) {
      lineupViewState = {day, search: '', scrollY: 0};
    }

    activeDay = day;
    $('#artistSearch').value = shouldRestore ? lineupViewState.search : '';
    showScreen('lineup');
    renderDaySelector();
    renderArtists();

    if (shouldRestore) restoreLineupScroll();
  };

  openArtist = function openArtistWithViewState(name) {
    if (activeScreen === 'lineup') {
      lineupViewState = {
        day: activeDay,
        search: $('#artistSearch').value,
        scrollY: window.scrollY
      };
    }

    openArtistBase(name);
  };

  // Conserva también la búsqueda mientras el usuario escribe y sigue en la lista.
  $('#artistSearch').addEventListener('input', event => {
    if (activeScreen === 'lineup') lineupViewState.search = event.target.value;
  });

  // Corregir un perfil vuelve a dibujar la ficha. Conservamos el origen
  // anterior para que la flecha atrás restaure la misma posición de la lista.
  document.addEventListener('click', event => {
    if (!event.target.closest('#profileEditorSave')) return;
    const returnScreen = previousScreen;
    setTimeout(() => {
      if (activeScreen === 'artist') previousScreen = returnScreen;
    }, 0);
  }, true);
})();


/* ===== spotify-profile-editor.js ===== */
'use strict';

// Permite corregir una asociación de Spotify ya guardada desde la ficha
// del artista, sin repetir la sincronización completa del festival.
(() => {
  const artistContent = document.querySelector('.artist-detail-content');
  const reviewButton = $('#artistReview');
  if (!artistContent || !reviewButton) return;

  const style = document.createElement('style');
  style.textContent = `
    .profile-editor-button{width:100%;margin-top:12px;padding:13px 16px;border:1px solid #573d68;border-radius:999px;background:#1c1522;color:#e5b8ff;font-size:15px;font-weight:850}
    .profile-editor-list{display:grid;gap:9px;margin:14px 0}
    .profile-editor-choice{display:flex;align-items:center;gap:11px;width:100%;padding:10px;border:1px solid #3a3041;border-radius:14px;background:#17131b;color:#fff;text-align:left}
    .profile-editor-choice.selected{border-color:#bd58f3;box-shadow:0 0 0 3px rgba(189,88,243,.12)}
    .profile-editor-choice img,.profile-editor-placeholder{width:48px;height:48px;flex:0 0 48px;border-radius:10px;object-fit:cover;background:#29212f;display:grid;place-items:center;font-weight:900}
    .profile-editor-choice span{min-width:0;flex:1}
    .profile-editor-choice strong{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .profile-editor-choice small{display:block;margin-top:3px;color:#a99fad}
    .profile-editor-add{justify-content:center;color:#d8a2f8;font-weight:850}
    .profile-editor-field{margin-top:14px;padding-top:14px;border-top:1px solid #342a3a}
    .profile-editor-field label{display:block;margin-bottom:8px;font-weight:850}
    .profile-editor-row{display:flex;gap:8px}
    .profile-editor-row input{min-width:0;flex:1;padding:12px 13px;border:1px solid #44384c;border-radius:12px;background:#0e0b11;color:#fff;font:inherit;outline:none}
    .profile-editor-row input:focus{border-color:#b653f1;box-shadow:0 0 0 3px rgba(182,83,241,.12)}
    .profile-editor-row button,.profile-editor-save{border:0;border-radius:12px;background:#b653f1;color:#fff;font-weight:850;padding:0 14px}
    .profile-editor-help{display:block;margin-top:7px;color:#9f95a5;font-size:12px;line-height:1.4}
    .profile-editor-message{margin:10px 0 0;color:#d8cfdc;font-size:13px;line-height:1.4}
    .profile-editor-message.error{color:#ff9ba7}
    .profile-editor-preview{display:flex;align-items:center;gap:11px;margin-top:12px;padding:10px;border:1px solid #3e3346;border-radius:13px;background:#1b1620}
    .profile-editor-preview img,.profile-editor-preview-placeholder{width:52px;height:52px;border-radius:10px;object-fit:cover;background:#2a222f}
    .profile-editor-preview-copy{min-width:0;flex:1}
    .profile-editor-preview-copy strong{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .profile-editor-preview-copy small{display:block;margin-top:3px;color:#a89dab}
    .profile-editor-save{width:100%;margin-top:14px;padding:13px 14px}
    .profile-editor-save:disabled,.profile-editor-row button:disabled{opacity:.55}
    @media(max-width:420px){.profile-editor-row{flex-direction:column}.profile-editor-row button{padding:12px}}
  `;
  document.head.appendChild(style);

  const editButton = document.createElement('button');
  editButton.id = 'editSpotifyProfiles';
  editButton.className = 'profile-editor-button hidden';
  editButton.type = 'button';
  editButton.textContent = 'Cambiar perfil de Spotify';
  reviewButton.before(editButton);

  const dialog = document.createElement('dialog');
  dialog.id = 'profileEditorDialog';
  dialog.className = 'review-dialog';
  dialog.innerHTML = `
    <form method="dialog" class="dialog-card">
      <div class="dialog-header">
        <div>
          <small>Corrección manual</small>
          <h2 id="profileEditorTitle">Cambiar perfil de Spotify</h2>
        </div>
        <button class="dialog-close" value="cancel" aria-label="Cerrar">×</button>
      </div>
      <p id="profileEditorIntro">Selecciona el perfil que quieres sustituir.</p>
      <div id="profileEditorChoices" class="profile-editor-list"></div>
      <div class="profile-editor-field">
        <label for="profileEditorInput">Pega el perfil correcto</label>
        <div class="profile-editor-row">
          <input id="profileEditorInput" type="url" inputmode="url" autocomplete="off" placeholder="https://open.spotify.com/artist/…">
          <button id="profileEditorCheck" type="button">Comprobar</button>
        </div>
        <small class="profile-editor-help">Acepta enlaces normales, enlaces con /intl-es/, URI de Spotify o el ID del artista.</small>
        <p id="profileEditorMessage" class="profile-editor-message" hidden></p>
        <div id="profileEditorPreview" hidden></div>
        <button id="profileEditorSave" class="profile-editor-save" type="button" disabled>Guardar cambio</button>
      </div>
    </form>`;
  document.body.appendChild(dialog);

  const choices = $('#profileEditorChoices');
  const input = $('#profileEditorInput');
  const checkButton = $('#profileEditorCheck');
  const saveButton = $('#profileEditorSave');
  const message = $('#profileEditorMessage');
  const preview = $('#profileEditorPreview');

  let editingArtist = null;
  let selectedProfileIndex = null;
  let checkedProfile = null;

  function parseSpotifyArtistId(value) {
    const text = String(value || '').trim();
    const urlMatch = text.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?artist\/([A-Za-z0-9]{22})/i);
    if (urlMatch) return urlMatch[1];
    const uriMatch = text.match(/^spotify:artist:([A-Za-z0-9]{22})$/i);
    if (uriMatch) return uriMatch[1];
    if (/^[A-Za-z0-9]{22}$/.test(text)) return text;
    return null;
  }

  function setMessage(text, isError = false) {
    message.hidden = !text;
    message.textContent = text || '';
    message.classList.toggle('error', isError);
  }

  function resetLookup() {
    checkedProfile = null;
    input.value = '';
    preview.hidden = true;
    preview.innerHTML = '';
    saveButton.disabled = true;
    setMessage('');
    checkButton.disabled = false;
    checkButton.textContent = 'Comprobar';
  }

  function selectProfile(index) {
    selectedProfileIndex = index;
    choices.querySelectorAll('.profile-editor-choice').forEach(button => {
      button.classList.toggle('selected', Number(button.dataset.index) === index);
    });
  }

  function renderChoices() {
    const entry = cache[editingArtist];
    const profiles = entry?.profiles || [];
    selectedProfileIndex = profiles.length === 1 ? 0 : null;

    choices.innerHTML = profiles.map((profile, index) => `
      <button class="profile-editor-choice ${profiles.length === 1 ? 'selected' : ''}" type="button" data-index="${index}">
        ${profile.image ? `<img src="${escapeHtml(profile.image)}" alt="">` : `<span class="profile-editor-placeholder">${escapeHtml(initials(profile.name || editingArtist))}</span>`}
        <span><strong>${escapeHtml(profile.name || editingArtist)}</strong><small>Reemplazar este perfil</small></span>
      </button>`).join('') + `
      <button class="profile-editor-choice profile-editor-add" type="button" data-index="-1">＋ Añadir otro perfil</button>`;

    choices.querySelectorAll('.profile-editor-choice').forEach(button => {
      button.addEventListener('click', () => selectProfile(Number(button.dataset.index)));
    });
  }

  function updateEditButton(name) {
    const entry = cache[name];
    const profileCount = entry?.profiles?.length || 0;
    const canEdit = isSpotifyConnected() && profileCount > 0;
    editButton.classList.toggle('hidden', !canEdit);
    editButton.textContent = profileCount > 1 ? 'Gestionar perfiles de Spotify' : 'Cambiar perfil de Spotify';
  }

  function openEditor() {
    editingArtist = activeArtist;
    if (!editingArtist) return;
    if (!isSpotifyConnected()) {
      toast('Conecta Spotify para modificar perfiles');
      return;
    }
    $('#profileEditorTitle').textContent = editingArtist;
    $('#profileEditorIntro').textContent = 'Selecciona el perfil incorrecto y pega el enlace correcto. En actuaciones conjuntas puedes cambiar solo uno sin afectar a los demás.';
    renderChoices();
    resetLookup();
    dialog.showModal();
  }

  async function checkProfile() {
    const id = parseSpotifyArtistId(input.value);
    if (!id) {
      setMessage('Pega un enlace de artista de Spotify válido. No sirve un enlace de canción, álbum o playlist.', true);
      return;
    }

    checkButton.disabled = true;
    checkButton.textContent = 'Comprobando…';
    saveButton.disabled = true;
    preview.hidden = true;
    setMessage('Consultando el perfil en Spotify…');

    try {
      const payload = await spotifyFetch(`/artists/${id}`);
      checkedProfile = compactProfile(payload);
      preview.hidden = false;
      preview.innerHTML = `
        <div class="profile-editor-preview">
          ${checkedProfile.image ? `<img src="${escapeHtml(checkedProfile.image)}" alt="">` : '<span class="profile-editor-preview-placeholder"></span>'}
          <span class="profile-editor-preview-copy"><strong>${escapeHtml(checkedProfile.name)}</strong><small>Perfil de artista de Spotify</small></span>
        </div>`;
      setMessage('Comprueba el nombre y la imagen antes de guardar.');
      saveButton.disabled = false;
    } catch (error) {
      checkedProfile = null;
      setMessage(error.message || 'No se pudo consultar ese perfil de Spotify.', true);
    } finally {
      checkButton.disabled = false;
      checkButton.textContent = 'Comprobar';
    }
  }

  function saveProfileChange() {
    if (!checkedProfile || !editingArtist) return;
    const entry = cache[editingArtist] || {
      act: editingArtist,
      status: 'verified',
      profiles: [],
      unresolved: []
    };
    const profiles = [...(entry.profiles || [])];

    if (selectedProfileIndex === null) {
      setMessage('Selecciona qué perfil quieres sustituir o elige “Añadir otro perfil”.', true);
      return;
    }

    if (profiles.some((profile, index) => profile.id === checkedProfile.id && index !== selectedProfileIndex)) {
      setMessage('Ese perfil ya está asociado a esta actuación.', true);
      return;
    }

    const editedAt = new Date().toISOString();
    let oldProfile = null;
    let action = 'add';

    if (selectedProfileIndex >= 0 && profiles[selectedProfileIndex]) {
      oldProfile = profiles[selectedProfileIndex];
      profiles[selectedProfileIndex] = checkedProfile;
      action = 'replace';
    } else {
      profiles.push(checkedProfile);
      if (entry.unmatched?.length) entry.unmatched.shift();
    }

    entry.profiles = profiles;
    entry.status = entry.unresolved?.length
      ? 'pending'
      : entry.unmatched?.length
        ? 'not_found'
        : 'verified';
    entry.reviewedAt = editedAt;
    entry.source = 'manual_spotify_edit';
    entry.manualEdits = [...(entry.manualEdits || []), {
      action,
      previousSpotifyArtistId: oldProfile?.id || null,
      previousSpotifyName: oldProfile?.name || null,
      spotifyArtistId: checkedProfile.id,
      spotifyName: checkedProfile.name,
      editedAt
    }];

    cache[editingArtist] = entry;
    saveCache();
    dialog.close();
    updateSpotifyUi();
    openArtist(editingArtist);
    toast(action === 'replace' ? 'Perfil de Spotify corregido' : 'Perfil de Spotify añadido');
  }

  const openArtistBase = openArtist;
  openArtist = function openArtistWithProfileEditor(name) {
    openArtistBase(name);
    updateEditButton(name);
  };

  editButton.addEventListener('click', openEditor);
  checkButton.addEventListener('click', checkProfile);
  saveButton.addEventListener('click', saveProfileChange);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      checkProfile();
    }
  });
})();

/* ===== artist-favorites.js ===== */
'use strict';

// Icon-only artist favourites. Selections persist on this device and are
// available from the existing "Mis festivales" navigation item.
(() => {
  const STORAGE_KEY = 'festivalfy_saved_artists_v1';
  let savedArtists = loadSavedArtists();

  function loadSavedArtists() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return new Set(Array.isArray(parsed) ? parsed.filter(name => allArtists().includes(name)) : []);
    } catch {
      return new Set();
    }
  }

  function saveSavedArtists() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedArtists]));
  }

  function isSaved(name) {
    return savedArtists.has(name);
  }

  function updateHeartButton(button, name) {
    const saved = isSaved(name);
    button.textContent = saved ? '♥' : '♡';
    button.classList.toggle('active', saved);
    button.setAttribute('aria-pressed', String(saved));
    button.setAttribute('aria-label', saved ? `Quitar ${name} de mi cartel` : `Añadir ${name} a mi cartel`);
    button.title = saved ? 'Quitar de mi cartel' : 'Añadir a mi cartel';
  }

  function refreshVisibleHearts() {
    document.querySelectorAll('[data-favorite-artist]').forEach(button => {
      updateHeartButton(button, button.dataset.favoriteArtist);
    });
    updateSavedNavigationIcon();
  }

  function toggleSavedArtist(name) {
    if (!name) return;
    if (savedArtists.has(name)) savedArtists.delete(name);
    else savedArtists.add(name);
    saveSavedArtists();
    refreshVisibleHearts();
    if (activeScreen === 'saved') renderSavedScreen();
    toast(savedArtists.has(name) ? 'Artista añadido a tu cartel' : 'Artista eliminado de tu cartel');
  }

  const style = document.createElement('style');
  style.textContent = `
    .artist-favorite,
    .artist-detail-favorite,
    .saved-artist-favorite {
      display:grid;
      place-items:center;
      flex:0 0 auto;
      width:40px;
      height:40px;
      border:1px solid #3a3041;
      border-radius:999px;
      background:#1c1721;
      color:#c6bacb;
      cursor:pointer;
      font-size:24px;
      line-height:1;
      transition:transform .16s ease, border-color .16s ease, color .16s ease, background .16s ease;
    }
    .artist-favorite:active,
    .artist-detail-favorite:active,
    .saved-artist-favorite:active { transform:scale(.9); }
    .artist-favorite.active,
    .artist-detail-favorite.active,
    .saved-artist-favorite.active {
      border-color:rgba(255,95,143,.48);
      background:rgba(255,95,143,.12);
      color:#ff6f9e;
    }
    .artist-detail-favorite {
      position:absolute;
      z-index:3;
      top:calc(18px + env(safe-area-inset-top));
      right:18px;
      width:44px;
      height:44px;
      background:rgba(18,15,22,.86);
      backdrop-filter:blur(10px);
    }
    .saved-header {
      align-items:flex-end;
      padding-bottom:18px;
    }
    .saved-header h1 { margin:5px 0 0; font-size:30px; letter-spacing:-1px; }
    .saved-content { padding-bottom:30px; }
    .saved-section {
      position:relative;
    }
    .saved-section + .saved-section {
      margin-top:28px;
      padding-top:26px;
      border-top:1px solid #2d2633;
    }
    .saved-section-heading {
      display:flex;
      align-items:flex-end;
      justify-content:space-between;
      gap:12px;
      margin:0 0 14px;
    }
    .saved-section-heading h2 {
      margin:3px 0 0;
      font-size:22px;
      letter-spacing:-.45px;
    }
    .saved-section-kicker {
      display:block;
      color:#9d8fa4;
      font-size:10px;
      font-weight:900;
      letter-spacing:.12em;
      text-transform:uppercase;
    }
    .saved-summary {
      margin:0 0 18px;
      padding:14px 15px;
      border:1px solid #342c3a;
      border-radius:15px;
      background:#15121a;
      color:#b8aebe;
      line-height:1.45;
    }
    .saved-day-group { margin:0 0 24px; }
    .saved-day-heading {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      margin:0 0 10px;
    }
    .saved-day-heading h2 { margin:0; font-size:20px; letter-spacing:-.35px; }
    .saved-day-heading span {
      display:grid;
      min-width:27px;
      height:27px;
      place-items:center;
      border-radius:999px;
      background:#2d2434;
      color:#dca2fb;
      font-size:12px;
      font-weight:900;
    }
    .saved-artist-list { display:grid; gap:10px; }
    .saved-artist-card {
      display:flex;
      align-items:center;
      gap:10px;
      min-width:0;
      padding:10px;
      border:1px solid #2d2733;
      border-radius:16px;
      background:#15121a;
    }
    .saved-artist-main {
      display:flex;
      align-items:center;
      gap:12px;
      flex:1;
      min-width:0;
      border:0;
      padding:0;
      background:transparent;
      color:#fff;
      cursor:pointer;
      text-align:left;
    }
    .saved-artist-main .artist-copy small { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .saved-empty {
      margin-top:28px;
      padding:36px 20px;
      border:1px dashed #3b3242;
      border-radius:18px;
      color:#9f95a5;
      text-align:center;
      line-height:1.55;
    }
    .saved-empty .empty-heart { display:block; margin-bottom:9px; color:#c58bdf; font-size:34px; }
    .saved-nav-count {
      display:inline-grid;
      min-width:18px;
      height:18px;
      place-items:center;
      margin-left:4px;
      padding:0 4px;
      border-radius:999px;
      background:#4a2857;
      color:#f2d6ff;
      font-size:10px;
      font-style:normal;
      font-weight:900;
      vertical-align:1px;
    }
    @media(max-width:360px) {
      .artist-favorite { width:36px; height:36px; font-size:21px; }
      .artist-card { gap:8px; }
    }
  `;
  document.head.appendChild(style);

  const bottomNav = document.querySelector('.bottom-nav');
  const savedScreen = document.createElement('section');
  savedScreen.id = 'savedScreen';
  savedScreen.className = 'screen';
  savedScreen.setAttribute('aria-label', 'Mi cartel');
  savedScreen.innerHTML = `
    <header class="topbar saved-header">
      <div>
        <span class="eyebrow">Primavera Sound 2027</span>
        <h1>Mis carteles</h1>
      </div>
    </header>
    <div class="page-content saved-content">
      <section class="saved-section saved-section-personal" aria-labelledby="savedPersonalTitle">
        <div class="saved-section-heading">
          <div>
            <span class="saved-section-kicker">Tu selección</span>
            <h2 id="savedPersonalTitle">Mi cartel</h2>
          </div>
        </div>
        <div class="saved-summary" id="savedSummary"></div>
        <div id="savedArtistGroups"></div>
      </section>
    </div>`;
  bottomNav.before(savedScreen);
  screens.saved = savedScreen;

  function artistImage(name) {
    const profile = cache[name]?.profiles?.[0];
    return profile?.image
      ? `<img src="${escapeHtml(profile.image)}" alt="" loading="lazy">`
      : escapeHtml(initials(name));
  }

  function artistSpotifyUrl(name) {
    return cache[name]?.profiles?.[0]?.url || directSearchUrl(name);
  }

  function renderSavedScreen() {
    const groups = Object.entries(FESTIVAL.days)
      .map(([day, artists]) => [day, artists.filter(name => savedArtists.has(name))])
      .filter(([, artists]) => artists.length);

    const total = savedArtists.size;
    $('#savedSummary').textContent = total
      ? `${total} ${total === 1 ? 'artista guardado' : 'artistas guardados'}, organizados por día.`
      : 'Los artistas que marques con el corazón aparecerán aquí.';

    $('#savedArtistGroups').innerHTML = groups.length ? groups.map(([day, artists]) => `
      <section class="saved-day-group">
        <div class="saved-day-heading">
          <h2>${escapeHtml(DAY_LABELS[day])}</h2>
          <span>${artists.length}</span>
        </div>
        <div class="saved-artist-list">
          ${artists.map(name => {
            const profile = cache[name]?.profiles?.[0];
            return `<article class="saved-artist-card">
              <button class="saved-artist-main" type="button" data-saved-open="${escapeHtml(name)}">
                <span class="artist-avatar">${artistImage(name)}</span>
                <span class="artist-copy">
                  <strong>${escapeHtml(name)}</strong>
                  <small>${profile ? escapeHtml(profile.name) : 'Abrir ficha del artista'}</small>
                </span>
              </button>
              <button class="saved-artist-favorite active" type="button" data-favorite-artist="${escapeHtml(name)}" aria-label="Quitar ${escapeHtml(name)} de mi cartel" aria-pressed="true">♥</button>
              <a class="spotify-link" href="${escapeHtml(artistSpotifyUrl(name))}" target="_blank" rel="noopener" aria-label="Abrir ${escapeHtml(name)} en Spotify">▶</a>
            </article>`;
          }).join('')}
        </div>
      </section>`).join('') : `
      <div class="saved-empty">
        <span class="empty-heart">♡</span>
        Todavía no has guardado artistas. Pulsa el corazón de cualquier actuación para crear tu cartel.
      </div>`;

    document.querySelectorAll('[data-saved-open]').forEach(button => {
      button.addEventListener('click', () => openArtist(button.dataset.savedOpen));
    });
    document.querySelectorAll('#savedScreen [data-favorite-artist]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        toggleSavedArtist(button.dataset.favoriteArtist);
      });
    });
    refreshVisibleHearts();
  }

  function openSavedScreen() {
    renderSavedScreen();
    showScreen('saved');
    $all('.nav-item').forEach(button => button.classList.remove('active'));
    $('#navSaved').classList.add('active');
  }

  function updateSavedNavigationIcon() {
    const nav = $('#navSaved');
    if (!nav) return;
    const icon = nav.querySelector('span');
    if (icon) icon.textContent = savedArtists.size ? '♥' : '♡';
    let count = nav.querySelector('.saved-nav-count');
    if (savedArtists.size) {
      if (!count) {
        count = document.createElement('i');
        count.className = 'saved-nav-count';
        nav.appendChild(count);
      }
      count.textContent = String(savedArtists.size);
    } else if (count) {
      count.remove();
    }
  }

  function decorateArtistCards() {
    document.querySelectorAll('#artistList .artist-card').forEach(card => {
      const main = card.querySelector('.artist-main');
      const name = main?.dataset.artist;
      if (!name) return;

      let button = card.querySelector('.artist-favorite');
      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.className = 'artist-favorite';
        button.dataset.favoriteArtist = name;
        const spotifyLink = card.querySelector('.spotify-link');
        card.insertBefore(button, spotifyLink || null);
        button.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          toggleSavedArtist(name);
        });
      }
      updateHeartButton(button, name);
    });
  }

  const baseRenderArtists = renderArtists;
  renderArtists = function renderArtistsWithFavorites() {
    baseRenderArtists();
    decorateArtistCards();
  };

  // app.js registered its search listener before this extension loaded, so this
  // second listener decorates the freshly rendered search results.
  $('#artistSearch').addEventListener('input', () => requestAnimationFrame(decorateArtistCards));

  const detailHero = $('#artistDetailHero');
  const detailFavorite = document.createElement('button');
  detailFavorite.id = 'artistDetailFavorite';
  detailFavorite.className = 'artist-detail-favorite';
  detailFavorite.type = 'button';
  detailFavorite.dataset.favoriteArtist = '';
  detailHero.appendChild(detailFavorite);
  detailFavorite.addEventListener('click', () => toggleSavedArtist(activeArtist));

  function updateDetailFavorite(name) {
    if (!name) return;
    detailFavorite.dataset.favoriteArtist = name;
    updateHeartButton(detailFavorite, name);
  }

  const baseOpenArtist = openArtist;
  openArtist = function openArtistWithFavorite(name) {
    baseOpenArtist(name);
    updateDetailFavorite(name);
  };

  // Remove the original toast-only handler and turn the existing nav item into
  // the real saved-artists destination.
  const oldSavedNav = $('#navSaved');
  const savedNav = oldSavedNav.cloneNode(true);
  oldSavedNav.replaceWith(savedNav);
  savedNav.addEventListener('click', openSavedScreen);

  // The original artist back handler only knew festival and lineup screens.
  // Replace it so an artist opened from Mi cartel returns there.
  const oldArtistBack = $('#artistBack');
  const artistBack = oldArtistBack.cloneNode(true);
  oldArtistBack.replaceWith(artistBack);
  artistBack.addEventListener('click', () => {
    if (previousScreen === 'saved') openSavedScreen();
    else if (previousScreen === 'festival') openFestival();
    else openLineup(activeDay, {restore: true});
  });

  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY) return;
    savedArtists = loadSavedArtists();
    refreshVisibleHearts();
    if (activeScreen === 'saved') renderSavedScreen();
  });

  updateSavedNavigationIcon();

  // API mínima para otros módulos (compartir y comparar carteles).
  window.FestivalfySaved = {
    list: () => [...savedArtists],
    has: name => savedArtists.has(name),
    openScreen: openSavedScreen,
    artistImage,
    artistSpotifyUrl
  };
})();


/* ===== artist-detail-static-v2.js ===== */
'use strict';

// Artist detail presentation backed only by static/local text data.
// Opening an artist never triggers an external metadata request.
(() => {
  const METADATA_STORAGE_KEY = 'festivalfy_artist_metadata_v1';
  const staticMetadata = window.FESTIVALFY_ARTIST_METADATA || {};
  const legacyMetadata = loadLegacyMetadata();

  function loadLegacyMetadata() {
    try {
      const parsed = JSON.parse(localStorage.getItem(METADATA_STORAGE_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  function titleCaseGenre(value) {
    return String(value || '')
      .trim()
      .split(/\s+/)
      .map(word => word.length <= 3 && /^(edm|r&b|dnb|uk)$/i.test(word)
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  function unique(values) {
    return [...new Set((values || []).filter(Boolean))];
  }

  function removeLineupHearts() {
    document.querySelectorAll('#artistList .artist-favorite').forEach(button => button.remove());
  }

  const style = document.createElement('style');
  style.textContent = `
    #artistList .artist-favorite { display:none !important; }
    .artist-title-row {
      display:flex;
      align-items:baseline;
      flex-wrap:wrap;
      gap:9px;
      margin:7px 0 10px;
    }
    .artist-title-row #artistDetailName { margin:0; }
    .artist-country-code {
      color:#d7a0f4;
      font-size:17px;
      font-weight:900;
      letter-spacing:.04em;
      white-space:nowrap;
    }
    .artist-country-code:empty { display:none; }
    .artist-metadata {
      min-height:27px;
      margin:0 0 18px;
    }
    .artist-genre-list {
      display:flex;
      flex-wrap:wrap;
      gap:7px;
    }
    .artist-genre {
      display:inline-flex;
      align-items:center;
      min-height:27px;
      padding:5px 10px;
      border:1px solid #3a3041;
      border-radius:999px;
      background:#19151e;
      color:#d8cddd;
      font-size:12px;
      font-weight:800;
    }
    .artist-metadata-state {
      color:#8f8594;
      font-size:13px;
      line-height:1.45;
    }
  `;
  document.head.appendChild(style);

  const artistList = $('#artistList');
  if (artistList) {
    const observer = new MutationObserver(removeLineupHearts);
    observer.observe(artistList, {childList: true, subtree: true});
    removeLineupHearts();
    $('#artistSearch')?.addEventListener('input', () => requestAnimationFrame(removeLineupHearts));
  }

  const title = $('#artistDetailName');
  const technicalStatus = $('#artistDetailStatus');
  if (!title || !technicalStatus) return;

  const titleRow = document.createElement('div');
  titleRow.className = 'artist-title-row';
  title.before(titleRow);
  titleRow.appendChild(title);

  const countryCode = document.createElement('span');
  countryCode.id = 'artistCountryCode';
  countryCode.className = 'artist-country-code';
  countryCode.setAttribute('aria-label', 'País del artista');
  titleRow.appendChild(countryCode);

  const metadata = document.createElement('div');
  metadata.id = 'artistMetadata';
  metadata.className = 'artist-metadata';
  titleRow.after(metadata);

  function renderMetadataState(text) {
    metadata.innerHTML = `<span class="artist-metadata-state">${escapeHtml(text)}</span>`;
  }

  function renderMetadata(result) {
    const countries = unique(result?.countries).slice(0, 3);
    const genres = unique(result?.genres).slice(0, 4);
    countryCode.textContent = countries.length ? `(${countries.join('/')})` : '';

    if (genres.length) {
      metadata.innerHTML = `<div class="artist-genre-list">${genres
        .map(genre => `<span class="artist-genre">${escapeHtml(titleCaseGenre(genre))}</span>`)
        .join('')}</div>`;
    } else if (countries.length) {
      renderMetadataState('Género por confirmar');
    } else {
      renderMetadataState('País y género por confirmar');
    }
  }

  function legacyMetadataForAct(name) {
    const profiles = cache[name]?.profiles || [];
    const countries = [];
    const genres = [];

    for (const profile of profiles) {
      const key = profile?.id || profile?.url || profile?.name;
      const item = key ? legacyMetadata[key] : null;
      if (!item) continue;
      if (item.country) countries.push(item.country);
      genres.push(...(Array.isArray(item.genres) ? item.genres : []));
    }

    return {countries: unique(countries), genres: unique(genres)};
  }

  function metadataForAct(name) {
    const published = staticMetadata[name];
    if (published) {
      return {
        countries: unique(published.countries || (published.country ? [published.country] : [])),
        genres: unique(published.genres || [])
      };
    }
    return legacyMetadataForAct(name);
  }

  const openArtistBase = openArtist;
  openArtist = function openArtistWithStaticCountryAndGenre(name) {
    openArtistBase(name);
    const entry = cache[name];
    technicalStatus.hidden = !['pending', 'not_found'].includes(entry?.status);
    renderMetadata(metadataForAct(name));
  };
})();


/* ===== festival-ui-v2.js ===== */
'use strict';

// Festival screen visual refinement:
// - informative, premium day cards without decorative empty icons;
// - compact festival hero;
// - clearer "Mi cartel" navigation label.
(() => {
  const DAY_META = {
    'Mié 2': {weekday: 'MIÉ', number: '02', sequence: '01', accent: '#a86dff', rgb: '168,109,255'},
    'Jue 3': {weekday: 'JUE', number: '03', sequence: '02', accent: '#cf5cff', rgb: '207,92,255'},
    'Vie 4': {weekday: 'VIE', number: '04', sequence: '03', accent: '#8b7cff', rgb: '139,124,255'},
    'Sáb 5': {weekday: 'SÁB', number: '05', sequence: '04', accent: '#f064a8', rgb: '240,100,168'},
    'Dom 6': {weekday: 'DOM', number: '06', sequence: '05', accent: '#718cff', rgb: '113,140,255'}
  };

  const style = document.createElement('style');
  style.textContent = `
    .festival-hero {
      height: clamp(250px, 68vw, 290px);
      background:
        radial-gradient(circle at 72% 22%, rgba(226, 59, 188, .36), transparent 29%),
        radial-gradient(circle at 17% 29%, rgba(113, 50, 215, .52), transparent 39%),
        linear-gradient(145deg, #51206b, #19101f 66%, #09080d);
    }
    .festival-hero .hero-overlay {
      background: linear-gradient(0deg, var(--bg) 0%, rgba(9,8,13,.52) 34%, transparent 76%);
    }
    .festival-hero .hero-actions {
      top: calc(14px + env(safe-area-inset-top));
      left: 16px;
      right: 16px;
    }
    .festival-hero .hero-copy {
      left: 20px;
      right: 20px;
      bottom: 18px;
    }
    .festival-hero .hero-copy h1 {
      margin-top: 6px;
      font-size: clamp(40px, 11vw, 46px);
      line-height: .91;
      letter-spacing: -2.2px;
    }
    .festival-intro { padding-top: 16px; }

    .day-cards-v2 {
      gap: 12px;
      padding-top: 17px;
      padding-bottom: 28px;
    }
    .day-card-v2 {
      --day-accent: #bd55ff;
      --day-accent-rgb: 189,85,255;
      position: relative;
      isolation: isolate;
      display: grid;
      grid-template-columns: 63px minmax(0, 1fr) 36px;
      align-items: center;
      gap: 14px;
      min-height: 96px;
      overflow: hidden;
      border: 1px solid rgba(var(--day-accent-rgb), .22);
      border-radius: 20px;
      padding: 12px 13px 12px 12px;
      background:
        linear-gradient(112deg, rgba(var(--day-accent-rgb), .105), rgba(23,20,28,.96) 43%, #15121a 100%);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,.025),
        0 12px 30px rgba(0,0,0,.13);
      transition: transform .16s ease, border-color .16s ease, background .16s ease;
    }
    .day-card-v2::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: -44px;
      left: -18px;
      width: 145px;
      height: 145px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--day-accent-rgb), .17), transparent 69%);
      pointer-events: none;
    }
    .day-card-v2::after {
      content: '';
      position: absolute;
      top: 15px;
      bottom: 15px;
      left: 0;
      width: 3px;
      border-radius: 0 999px 999px 0;
      background: var(--day-accent);
      box-shadow: 0 0 18px rgba(var(--day-accent-rgb), .55);
    }
    .day-card-v2:active {
      transform: scale(.985);
      border-color: rgba(var(--day-accent-rgb), .42);
    }
    .day-card-date {
      position: relative;
      z-index: 1;
      display: grid;
      place-items: center;
      align-content: center;
      min-height: 66px;
      padding-right: 13px;
      border-right: 1px solid rgba(255,255,255,.09);
      line-height: 1;
    }
    .day-card-weekday {
      margin-bottom: 4px;
      color: var(--day-accent);
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .13em;
    }
    .day-card-date strong {
      font-size: 30px;
      font-weight: 950;
      letter-spacing: -1.5px;
    }
    .day-card-date small {
      margin-top: 4px;
      color: #8f8594;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: .17em;
    }
    .day-card-copy {
      position: relative;
      z-index: 1;
      min-width: 0;
    }
    .day-card-copy .day-card-kicker {
      display: block;
      margin-bottom: 5px;
      color: var(--day-accent);
      font-size: 9px;
      font-weight: 950;
      letter-spacing: .15em;
      text-transform: uppercase;
    }
    .day-card-copy strong {
      display: block;
      overflow: hidden;
      color: #fff;
      font-size: 18px;
      line-height: 1.15;
      letter-spacing: -.35px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .day-card-copy small {
      display: block;
      margin-top: 6px;
      color: #aaa0af;
      font-size: 12px;
      line-height: 1.25;
    }
    .day-card-arrow-v2 {
      position: relative;
      z-index: 1;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border: 1px solid rgba(var(--day-accent-rgb), .24);
      border-radius: 999px;
      background: rgba(var(--day-accent-rgb), .08);
      color: var(--day-accent);
      font-size: 17px;
      font-weight: 900;
    }

    @media (max-width: 350px) {
      .day-card-v2 {
        grid-template-columns: 56px minmax(0, 1fr) 32px;
        gap: 11px;
      }
      .day-card-date { padding-right: 10px; }
      .day-card-date strong { font-size: 27px; }
      .day-card-arrow-v2 { width: 31px; height: 31px; }
    }
  `;
  document.head.appendChild(style);

  const baseRenderFestivalTab = renderFestivalTab;
  renderFestivalTab = function renderFestivalTabWithRefinedDays() {
    if (currentTab !== 'days') {
      baseRenderFestivalTab();
      return;
    }

    $all('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === currentTab));
    const content = $('#festivalTabContent');
    content.innerHTML = `<div class="day-cards day-cards-v2">${Object.keys(FESTIVAL.days).map(day => {
      const meta = DAY_META[day];
      const count = FESTIVAL.days[day].length;
      const countLabel = `${count} ${count === 1 ? 'actuación' : 'actuaciones'}`;
      return `
        <button
          class="day-card day-card-v2"
          type="button"
          data-day="${escapeHtml(day)}"
          style="--day-accent:${meta.accent};--day-accent-rgb:${meta.rgb}"
          aria-label="Abrir ${escapeHtml(DAY_LABELS[day])}, ${countLabel}">
          <span class="day-card-date" aria-hidden="true">
            <span class="day-card-weekday">${meta.weekday}</span>
            <strong>${meta.number}</strong>
            <small>JUN</small>
          </span>
          <span class="day-card-copy">
            <span class="day-card-kicker">Jornada ${meta.sequence}</span>
            <strong>${countLabel}</strong>
            <small>Ver cartel del día</small>
          </span>
          <span class="day-card-arrow-v2" aria-hidden="true">↗</span>
        </button>`;
    }).join('')}</div>`;

    $all('.day-card-v2').forEach(button => {
      button.addEventListener('click', () => openLineup(button.dataset.day));
    });
  };

  const savedNav = $('#navSaved');
  if (savedNav) {
    [...savedNav.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.textContent = 'Mi cartel';
      }
    });
    savedNav.setAttribute('aria-label', 'Abrir mi cartel');
  }

  // Replace the first render made by app.js with the refined version.
  renderFestivalTab();
})();


/* ===== festival-radio.js ===== */
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
  localStorage.setItem(USER_SPOTIFY.authPurpose, 'admin');

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


/* ===== festival-radio-permissions-v2.js ===== */
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
  localStorage.setItem(USER_SPOTIFY.authPurpose, 'admin');

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


/* ===== admin-access.js ===== */
'use strict';

// Client-side administrator mode for the static GitHub Pages build.
// Only the SHA-256 digest is published; the private access token is not.
// This keeps management controls out of the normal shared experience.
(async () => {
  const ADMIN_STORAGE_KEY = 'festivalfy_admin_access_v1';
  const ADMIN_TOKEN_HASH = 'c2d41065d9f19d2413f321b04f068569c91331ae2a5c03ec09ec6bbf11475e83';

  async function sha256(value) {
    const bytes = new TextEncoder().encode(String(value || ''));
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)]
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  function cleanAdminParameter() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('admin')) return;
    url.searchParams.delete('admin');
    const query = url.searchParams.toString();
    history.replaceState({}, '', `${url.pathname}${query ? `?${query}` : ''}${url.hash}`);
  }

  const params = new URLSearchParams(window.location.search);
  const suppliedToken = params.get('admin');
  let accessMessage = '';

  if (suppliedToken === 'logout') {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    accessMessage = 'Modo administrador desactivado';
    cleanAdminParameter();
  } else if (suppliedToken) {
    try {
      if (await sha256(suppliedToken) === ADMIN_TOKEN_HASH) {
        localStorage.setItem(ADMIN_STORAGE_KEY, ADMIN_TOKEN_HASH);
        accessMessage = 'Modo administrador activado';
      } else {
        accessMessage = 'Enlace de administrador no válido';
      }
    } catch (error) {
      console.warn('No se pudo validar el acceso de administrador.', error);
      accessMessage = 'No se pudo validar el acceso de administrador';
    }
    cleanAdminParameter();
  }

  const isAdmin = localStorage.getItem(ADMIN_STORAGE_KEY) === ADMIN_TOKEN_HASH;
  document.documentElement.classList.toggle('festivalfy-admin', isAdmin);
  document.documentElement.classList.toggle('festivalfy-public', !isAdmin);

  const style = document.createElement('style');
  style.textContent = `
    html.festivalfy-public #spotifyPanel,
    html.festivalfy-public #syncCurrentDay,
    html.festivalfy-public #artistReview,
    html.festivalfy-public #editSpotifyProfiles,
    html.festivalfy-public #profileEditorDialog,
    html.festivalfy-public #reviewDialog,
    html.festivalfy-public #manualProfileBox,
    html.festivalfy-public .profile-editor-button,
    html.festivalfy-public .manual-profile-box {
      display: none !important;
    }

    .admin-mode-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: 0 0 13px;
      padding: 9px 11px;
      border: 1px solid rgba(189,85,255,.28);
      border-radius: 12px;
      background: rgba(189,85,255,.08);
      color: #e7c1ff;
      font-size: 12px;
      font-weight: 850;
    }
    .admin-mode-indicator span::before {
      content: '';
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-right: 7px;
      border-radius: 50%;
      background: #d26aff;
      box-shadow: 0 0 0 4px rgba(210,106,255,.11);
      vertical-align: 1px;
    }
    .admin-mode-indicator button {
      border: 0;
      padding: 5px 8px;
      border-radius: 999px;
      background: rgba(255,255,255,.08);
      color: #d9cedd;
      cursor: pointer;
      font-size: 11px;
      font-weight: 800;
    }
  `;
  document.head.appendChild(style);

  function lockPublicControls() {
    if (isAdmin) return;
    [
      '#spotifyConnect',
      '#spotifySync',
      '#syncCurrentDay',
      '#reviewMatches',
      '#exportMatches',
      '#artistReview',
      '#editSpotifyProfiles',
      '#profileEditorCheck',
      '#profileEditorSave',
      '#checkManualSpotifyProfile'
    ].forEach(selector => {
      const element = document.querySelector(selector);
      if (!element) return;
      element.disabled = true;
      element.tabIndex = -1;
      element.setAttribute('aria-hidden', 'true');
    });
  }

  function adjustPublicArtistMessage() {
    const currentArtist = typeof activeArtist === 'string' ? activeArtist : null;
    if (isAdmin || !currentArtist) return;
    const status = document.getElementById('artistDetailStatus');
    const entry = typeof cache === 'object' && cache ? cache[currentArtist] : null;
    if (!status || !entry) return;
    if (entry.status === 'pending' || entry.status === 'not_found') {
      status.hidden = false;
      status.textContent = 'Perfil de Spotify pendiente de revisión.';
    }
  }

  if (isAdmin) {
    const panel = document.getElementById('spotifyPanel');
    if (panel && !document.getElementById('adminModeIndicator')) {
      const indicator = document.createElement('div');
      indicator.id = 'adminModeIndicator';
      indicator.className = 'admin-mode-indicator';
      indicator.innerHTML = '<span>Modo administrador</span><button type="button">Salir</button>';
      indicator.querySelector('button').addEventListener('click', () => {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
        window.location.reload();
      });
      panel.prepend(indicator);
    }
  } else {
    lockPublicControls();
    const observer = new MutationObserver(lockPublicControls);
    observer.observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ['class']});
  }

  if (typeof openArtist === 'function') {
    const baseOpenArtist = openArtist;
    openArtist = function openArtistWithAdminAccess(name) {
      baseOpenArtist(name);
      lockPublicControls();
      adjustPublicArtistMessage();
    };
  }

  if (accessMessage && typeof toast === 'function') {
    window.setTimeout(() => toast(accessMessage), 100);
  }
})();


/* ===== artist-player.js ===== */
'use strict';

// Visitors without a Premium connection keep Spotify Embed as fallback.
// Premium users connected from Perfil use the Web Playback SDK underneath,
// but the visible player stays compact and consistent with the sample player.
(() => {
  const profiles = $('#artistProfiles');
  if (!profiles) return;

  let sdkLoadPromise = null;
  let webPlayer = null;
  let webPlayerReadyPromise = null;
  let webDeviceId = '';
  let activePremiumUi = null;
  let progressTimer = null;

  const style = document.createElement('style');
  style.textContent = `
    .artist-player { margin:14px 0 4px; }
    .artist-player-item + .artist-player-item { margin-top:10px; }
    .artist-player-label {
      display:block;
      margin:0 0 7px;
      color:#8f8594;
      font-size:12px;
      font-weight:800;
      letter-spacing:.03em;
    }
    .artist-player-load {
      display:flex;
      align-items:center;
      justify-content:center;
      gap:9px;
      width:100%;
      min-height:48px;
      padding:13px 16px;
      border:1px solid #3a3041;
      border-radius:14px;
      background:#19151e;
      color:#e9e2ec;
      font-size:14px;
      font-weight:850;
      cursor:pointer;
    }
    .artist-player-load:disabled { cursor:default; opacity:.62; }
    .artist-player-load:active:not(:disabled) { background:#221c28; }
    .artist-player-load span:first-child { color:#1ed760; font-size:16px; }
    .artist-player-load small {
      display:block;
      margin-top:2px;
      color:#8f8594;
      font-size:11px;
      font-weight:700;
    }
    .artist-player iframe {
      display:block;
      width:100%;
      height:152px;
      border:0;
      border-radius:14px;
    }
    .artist-player-hint {
      margin:7px 3px 0;
      color:#817887;
      font-size:11px;
      line-height:1.45;
    }

    .artist-premium-card {
      position:relative;
      overflow:hidden;
      min-height:152px;
      padding:13px;
      border:1px solid #29262d;
      border-radius:14px;
      background:#121212;
      color:#fff;
      box-shadow:0 8px 24px rgba(0,0,0,.18);
    }
    .artist-premium-top {
      display:grid;
      grid-template-columns:70px minmax(0,1fr) 44px;
      align-items:center;
      gap:12px;
    }
    .artist-premium-cover {
      width:70px;
      height:70px;
      overflow:hidden;
      border-radius:8px;
      background:linear-gradient(145deg,#47245c,#1d1822);
      box-shadow:0 5px 15px rgba(0,0,0,.3);
    }
    .artist-premium-cover img {
      width:100%;
      height:100%;
      object-fit:cover;
    }
    .artist-premium-copy {
      min-width:0;
    }
    .artist-premium-title,
    .artist-premium-artist {
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .artist-premium-title {
      font-size:14px;
      font-weight:900;
      line-height:1.25;
    }
    .artist-premium-artist {
      margin-top:4px;
      color:#a7a7a7;
      font-size:11px;
      font-weight:700;
    }
    .artist-premium-brand {
      display:block;
      margin-top:7px;
      color:#1ed760;
      font-size:10px;
      font-weight:850;
    }
    .artist-premium-main {
      display:grid;
      place-items:center;
      width:44px;
      height:44px;
      border:0;
      border-radius:50%;
      background:#1ed760;
      color:#08130b;
      cursor:pointer;
      font-size:18px;
      font-weight:950;
      box-shadow:0 4px 14px rgba(30,215,96,.22);
    }
    .artist-premium-main:disabled {
      cursor:default;
      opacity:.58;
    }
    .artist-premium-progress {
      display:grid;
      grid-template-columns:31px minmax(0,1fr) 31px;
      align-items:center;
      gap:8px;
      margin-top:12px;
      color:#8f8f8f;
      font-size:9px;
      font-variant-numeric:tabular-nums;
    }
    .artist-premium-track {
      position:relative;
      height:3px;
      overflow:hidden;
      border-radius:999px;
      background:#4b4b4b;
    }
    .artist-premium-fill {
      display:block;
      width:0;
      height:100%;
      border-radius:inherit;
      background:#fff;
      transition:width .3s linear;
    }
    .artist-premium-controls {
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-top:9px;
    }
    .artist-premium-skip {
      width:34px;
      height:28px;
      border:0;
      background:transparent;
      color:#b3b3b3;
      cursor:pointer;
      font-size:16px;
      font-weight:900;
    }
    .artist-premium-status {
      min-width:0;
      flex:1;
      overflow:hidden;
      padding:0 7px;
      color:#8f8f8f;
      font-size:9px;
      font-weight:700;
      text-align:center;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
  `;
  document.head.appendChild(style);

  const playerRoot = document.createElement('div');
  playerRoot.id = 'artistPlayer';
  playerRoot.className = 'artist-player';
  profiles.after(playerRoot);

  function embedUrl(id) {
    return `https://open.spotify.com/embed/artist/${encodeURIComponent(id)}?utm_source=generator`;
  }

  function loadEmbed(container, profile) {
    const frame = document.createElement('iframe');
    frame.src = embedUrl(profile.id);
    frame.loading = 'lazy';
    frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    frame.setAttribute('title', `Reproductor de Spotify de ${profile.name || 'el artista'}`);
    container.replaceChildren(frame);
  }

  function formatTime(ms) {
    const seconds = Math.max(0, Math.floor((Number(ms) || 0) / 1000));
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(seconds % 60).padStart(2,'0')}`;
  }

  function loadSpotifySdk() {
    if (window.Spotify?.Player) return Promise.resolve();
    if (sdkLoadPromise) return sdkLoadPromise;

    sdkLoadPromise = new Promise((resolve, reject) => {
      const previousReady = window.onSpotifyWebPlaybackSDKReady;
      window.onSpotifyWebPlaybackSDKReady = () => {
        try { if (typeof previousReady === 'function') previousReady(); } catch {}
        resolve();
      };

      const existing = document.getElementById('spotifyWebPlaybackSdk');
      if (existing) {
        existing.addEventListener('error', () => reject(new Error('No se pudo cargar el reproductor de Spotify.')), {once:true});
        return;
      }

      const script = document.createElement('script');
      script.id = 'spotifyWebPlaybackSdk';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      script.onerror = () => reject(new Error('No se pudo cargar el reproductor de Spotify.'));
      document.head.appendChild(script);
    });

    return sdkLoadPromise;
  }

  function paintPremiumState(state) {
    if (!activePremiumUi || !state) return;
    const track = state.track_window?.current_track;
    if (!track) return;

    const ui = activePremiumUi;
    const artistNames = (track.artists || []).map(artist => artist.name).filter(Boolean).join(', ');
    const cover = track.album?.images?.[0]?.url || ui.fallbackImage || '';

    ui.title.textContent = track.name || 'Reproduciendo';
    ui.artist.textContent = artistNames || ui.profileName || '';
    ui.main.textContent = state.paused ? '▶' : 'Ⅱ';
    ui.main.setAttribute('aria-label', state.paused ? 'Reproducir' : 'Pausar');
    ui.position.textContent = formatTime(state.position);
    ui.duration.textContent = formatTime(state.duration);
    ui.fill.style.width = state.duration
      ? `${Math.max(0, Math.min(100, state.position / state.duration * 100))}%`
      : '0%';
    ui.status.textContent = state.paused ? 'Spotify Premium · en pausa' : 'Spotify Premium · reproducción completa';

    if (cover && ui.cover.dataset.src !== cover) {
      ui.cover.dataset.src = cover;
      ui.cover.innerHTML = `<img src="${escapeHtml(cover)}" alt="">`;
    }
  }

  function startProgressTicker() {
    if (progressTimer) return;
    progressTimer = window.setInterval(async () => {
      if (!webPlayer || !activePremiumUi) return;
      try {
        const state = await webPlayer.getCurrentState();
        if (state) paintPremiumState(state);
      } catch {}
    }, 700);
  }

  async function ensureWebPlayer() {
    if (webPlayer && webDeviceId) return webPlayer;
    if (webPlayerReadyPromise) {
      await webPlayerReadyPromise;
      return webPlayer;
    }

    webPlayerReadyPromise = (async () => {
      await loadSpotifySdk();
      if (!window.Spotify?.Player) throw new Error('Spotify no ha podido iniciar el reproductor en este navegador.');

      webPlayer = new window.Spotify.Player({
        name:'Festivalfy Player',
        getOAuthToken:async callback => {
          try { callback(await getUserSpotifyAccessToken()); }
          catch (error) { console.warn('No se pudo renovar Spotify.', error); }
        },
        volume:0.8,
        enableMediaSession:true
      });
      window.FESTIVALFY_USER_PLAYER = webPlayer;

      let resolveReady;
      let rejectReady;
      const ready = new Promise((resolve,reject) => {
        resolveReady=resolve;
        rejectReady=reject;
      });

      webPlayer.addListener('ready', ({device_id}) => {
        webDeviceId=device_id;
        resolveReady(device_id);
      });
      webPlayer.addListener('not_ready', ({device_id}) => {
        if (device_id === webDeviceId) webDeviceId='';
      });
      webPlayer.addListener('player_state_changed', state => {
        paintPremiumState(state);
        startProgressTicker();
      });
      webPlayer.addListener('initialization_error', ({message}) => rejectReady(new Error(message || 'No se pudo iniciar Spotify.')));
      webPlayer.addListener('authentication_error', ({message}) => rejectReady(new Error(message || 'Spotify ha rechazado la sesión.')));
      webPlayer.addListener('account_error', () => rejectReady(new Error('La reproducción completa requiere una cuenta Spotify Premium.')));
      webPlayer.addListener('playback_error', ({message}) => {
        if (activePremiumUi?.status) activePremiumUi.status.textContent = message || 'Spotify no pudo reproducir esta canción.';
      });
      webPlayer.addListener('autoplay_failed', () => {
        if (activePremiumUi?.status) activePremiumUi.status.textContent = 'Pulsa reproducir para iniciar el audio.';
      });

      const connected = await webPlayer.connect();
      if (!connected) throw new Error('Spotify no ha podido conectar el reproductor de Festivalfy.');

      await Promise.race([
        ready,
        new Promise((_,reject) => window.setTimeout(() => reject(new Error('Spotify está tardando demasiado en preparar el reproductor.')),15000))
      ]);
    })();

    try {
      await webPlayerReadyPromise;
      return webPlayer;
    } catch (error) {
      webPlayerReadyPromise=null;
      try { webPlayer?.disconnect(); } catch {}
      webPlayer=null;
      webDeviceId='';
      throw error;
    }
  }

  async function userPlaybackRequest(path, options = {}, retry = 0) {
    const token = await getUserSpotifyAccessToken();
    const headers = {Authorization:`Bearer ${token}`};
    let body;

    if (options.body !== undefined) {
      headers['Content-Type']='application/json';
      body=JSON.stringify(options.body);
    }

    const response = await fetch(`https://api.spotify.com/v1${path}`, {
      method:options.method || 'GET',
      headers,
      body
    });

    if (response.status === 401 && retry < 1) {
      localStorage.removeItem(USER_SPOTIFY.accessToken);
      await refreshUserSpotifyAccessToken();
      return userPlaybackRequest(path,options,retry+1);
    }

    const payload = response.status === 204 ? {} : await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(payload.error?.message || `Spotify respondió con el código ${response.status}.`);
      error.status=response.status;
      throw error;
    }
    return payload;
  }

  async function startArtistPlayback(profile, ui) {
    if (!webPlayer || !webDeviceId) await ensureWebPlayer();
    try { webPlayer.activateElement(); } catch {}

    activePremiumUi=ui;
    ui.status.textContent='Iniciando reproducción completa…';
    ui.main.disabled=true;

    const play=() => userPlaybackRequest(
      `/me/player/play?device_id=${encodeURIComponent(webDeviceId)}`,
      {method:'PUT', body:{context_uri:`spotify:artist:${profile.id}`}}
    );

    try {
      await play();
    } catch (error) {
      if (error.status !== 404) throw error;
      await userPlaybackRequest('/me/player',{
        method:'PUT',
        body:{device_ids:[webDeviceId],play:false}
      });
      await new Promise(resolve => window.setTimeout(resolve,350));
      await play();
    } finally {
      ui.main.disabled=false;
    }
  }

  function addFallbackItem(item, profile, note) {
    const button=document.createElement('button');
    button.type='button';
    button.className='artist-player-load';
    button.innerHTML='<span aria-hidden="true">▶</span><span>Escuchar aquí<small>Carga el reproductor de Spotify</small></span>';
    button.addEventListener('click',() => loadEmbed(item,profile));
    item.appendChild(button);

    if (note) {
      const hint=document.createElement('p');
      hint.className='artist-player-hint';
      hint.textContent=note;
      item.appendChild(hint);
    }
  }

  function fallbackPremiumItem(item, profile, message) {
    item.replaceChildren();
    addFallbackItem(item,profile,message || 'No se pudo iniciar Spotify Premium en este navegador.');
  }

  function addPremiumItem(item, profile) {
    const card=document.createElement('div');
    card.className='artist-premium-card';

    const initialCover=profile.image || '';
    card.innerHTML=`
      <div class="artist-premium-top">
        <div class="artist-premium-cover" data-src="${escapeHtml(initialCover)}">
          ${initialCover ? `<img src="${escapeHtml(initialCover)}" alt="">` : ''}
        </div>
        <div class="artist-premium-copy">
          <div class="artist-premium-title">${escapeHtml(profile.name || 'Spotify')}</div>
          <div class="artist-premium-artist">Escuchar canciones completas</div>
          <span class="artist-premium-brand">Spotify Premium</span>
        </div>
        <button class="artist-premium-main" type="button" aria-label="Reproducir">▶</button>
      </div>
      <div class="artist-premium-progress">
        <span class="premium-position">0:00</span>
        <span class="artist-premium-track"><span class="artist-premium-fill"></span></span>
        <span class="premium-duration">0:00</span>
      </div>
      <div class="artist-premium-controls">
        <button class="artist-premium-skip premium-prev" type="button" aria-label="Anterior">‹‹</button>
        <span class="artist-premium-status">Preparando Spotify…</span>
        <button class="artist-premium-skip premium-next" type="button" aria-label="Siguiente">››</button>
      </div>
    `;
    item.appendChild(card);

    const ui={
      card,
      cover:card.querySelector('.artist-premium-cover'),
      title:card.querySelector('.artist-premium-title'),
      artist:card.querySelector('.artist-premium-artist'),
      main:card.querySelector('.artist-premium-main'),
      position:card.querySelector('.premium-position'),
      duration:card.querySelector('.premium-duration'),
      fill:card.querySelector('.artist-premium-fill'),
      status:card.querySelector('.artist-premium-status'),
      fallbackImage:initialCover,
      profileName:profile.name || '',
      started:false
    };

    card.querySelector('.premium-prev').addEventListener('click', async () => {
      if (!webPlayer) return;
      try { await webPlayer.previousTrack(); } catch {}
    });
    card.querySelector('.premium-next').addEventListener('click', async () => {
      if (!webPlayer) return;
      try { await webPlayer.nextTrack(); } catch {}
    });

    ui.main.addEventListener('click', async () => {
      try {
        if (webPlayer) {
          try { webPlayer.activateElement(); } catch {}
        }

        if (!ui.started) {
          await startArtistPlayback(profile,ui);
          ui.started=true;
          ui.status.textContent='Spotify Premium · reproducción completa';
          return;
        }

        activePremiumUi=ui;
        await webPlayer.togglePlay();
      } catch (error) {
        console.error('Festivalfy Premium playback failed',error);
        fallbackPremiumItem(item,profile,error.message || 'No se pudo iniciar la reproducción completa.');
      }
    });

    ensureWebPlayer().then(() => {
      ui.status.textContent='Spotify Premium · listo';
      ui.main.disabled=false;
    }).catch(error => {
      fallbackPremiumItem(item,profile,error.message || 'No se pudo iniciar Spotify Premium en este navegador.');
    });
  }

  function renderPlayer(name) {
    const entry=cache[name];
    const list=(entry?.profiles || []).filter(profile => profile && profile.id).slice(0,3);
    playerRoot.replaceChildren();
    activePremiumUi=null;
    if (!list.length) return;

    const connected=isUserSpotifyConnected();
    const hasScopes=connected && userSpotifyHasPlaybackScopes();

    for (const profile of list) {
      const item=document.createElement('div');
      item.className='artist-player-item';

      if (list.length > 1) {
        const label=document.createElement('span');
        label.className='artist-player-label';
        label.textContent=profile.name || '';
        item.appendChild(label);
      }

      if (!connected) {
        addFallbackItem(item,profile,'Conecta Spotify desde Perfil para activar reproducción completa con una cuenta Premium.');
      } else if (!hasScopes) {
        const button=document.createElement('button');
        button.type='button';
        button.className='artist-player-load';
        button.innerHTML='<span aria-hidden="true">●</span><span>Activar reproducción completa<small>Actualiza los permisos desde Perfil</small></span>';
        button.addEventListener('click',() => {
          openProfile();
          toast('Activa la reproducción completa de Spotify desde Perfil');
        });
        item.appendChild(button);
      } else {
        addPremiumItem(item,profile);
      }

      playerRoot.appendChild(item);
    }
  }

  const openArtistBase=openArtist;
  openArtist=function openArtistWithPlayer(artistName) {
    openArtistBase(artistName);
    renderPlayer(artistName);
  };
})();

/* ===== artist-filters.js ===== */
'use strict';
(function artistFiltersInstaller() {
  const searchBox = $('#artistSearch')?.closest('.search-box');
  if (!searchBox) return;

  const metadata = window.FESTIVALFY_ARTIST_METADATA || {};
  const GENRE_FAMILIES = {
    'Electrónica': ['electronic','techno','house','ambient','breakbeat','electro','bass','club','trance','downtempo','idm','drum and bass','jungle','garage','dubstep','dub','rave','acid','minimal','leftfield','edm','hyperpop','indietronica','synth','eurodance','hard'],
    'Rock': ['rock','punk','shoegaze','metal','grunge','emo','noise','slacker'],
    'Pop': ['pop'],
    'Hip hop y R&B': ['hip hop','rap','trap','r&b','drill','grime','soul','funk'],
    'Latino y global': ['reggaeton','dancehall','latin','cumbia','flamenco','salsa','afro','reggae','bolero','corrido','samba','baile'],
    'Folk y cantautor': ['folk','singer-songwriter','country','americana','acoustic'],
    'Jazz y experimental': ['jazz','experimental','drone','avant','classical','chamber','spoken','sound art','modern']
  };
  const COUNTRY_NAMES = {
    US:'Estados Unidos',GB:'Reino Unido',ES:'España',CA:'Canadá',DE:'Alemania',IE:'Irlanda',FR:'Francia',
    AU:'Australia',VE:'Venezuela',NL:'Países Bajos',SE:'Suecia',AR:'Argentina',GT:'Guatemala',PT:'Portugal',
    CL:'Chile',CO:'Colombia',KR:'Corea del Sur',ET:'Etiopía',SD:'Sudán',BR:'Brasil',NO:'Noruega',NG:'Nigeria',
    CM:'Camerún',FI:'Finlandia',MX:'México',IT:'Italia',JP:'Japón',BE:'Bélgica',DK:'Dinamarca',CH:'Suiza',
    IS:'Islandia',NZ:'Nueva Zelanda',ZA:'Sudáfrica',PL:'Polonia',JM:'Jamaica'
  };

  const selectedGenres = new Set();
  const selectedCountries = new Set();
  const familyCache = new Map();
  let open = false;

  function familiesFor(name) {
    if (familyCache.has(name)) return familyCache.get(name);
    const genres = (metadata[name]?.genres || []).map(v => String(v).toLowerCase());
    const found = new Set();
    for (const genre of genres) {
      for (const [family, words] of Object.entries(GENRE_FAMILIES)) {
        if (words.some(word => genre.includes(word))) found.add(family);
      }
    }
    familyCache.set(name, found);
    return found;
  }

  function countriesFor(name) {
    return (metadata[name]?.countries || []).map(v => String(v).toUpperCase());
  }

  function matches(name) {
    if (selectedGenres.size && ![...selectedGenres].some(g => familiesFor(name).has(g))) return false;
    if (selectedCountries.size && ![...selectedCountries].some(c => countriesFor(name).includes(c))) return false;
    return true;
  }

  const style = document.createElement('style');
  style.textContent = `
    .filter-bar{display:flex;align-items:center;gap:10px;margin:10px 0 0}
    .filter-toggle{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:9px 14px;border:1px solid #3a3041;border-radius:999px;background:#19151e;color:#e9e2ec;font-size:13px;font-weight:850;cursor:pointer}
    .filter-toggle.has-filters{border-color:#d7a0f4;color:#f2e4fb}
    .filter-toggle-count{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:#d7a0f4;color:#1a1320;font-size:11px;font-weight:900}
    .filter-clear{border:0;background:none;color:#8f8594;font-size:13px;font-weight:800;cursor:pointer;padding:9px 2px;min-height:40px}
    .filter-panel{margin:12px 0 0;padding:14px;border:1px solid #2e2635;border-radius:16px;background:#151119}
    .filter-panel[hidden]{display:none}.filter-group+.filter-group{margin-top:16px}
    .filter-group-title{display:block;margin:0 0 9px;color:#8f8594;font-size:12px;font-weight:850;letter-spacing:.04em;text-transform:uppercase}
    .filter-chips{display:flex;flex-wrap:wrap;gap:8px}
    .filter-chip{min-height:36px;padding:8px 12px;border:1px solid #3a3041;border-radius:999px;background:#19151e;color:#d8cddd;font-size:12px;font-weight:800;cursor:pointer}
    .filter-chip[aria-pressed="true"]{border-color:#d7a0f4;background:#2a1f33;color:#f6ecfc}
    .filter-chip small{color:#8f8594;font-weight:700}.filter-chip[aria-pressed="true"] small{color:#cfa9e4}
  `;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.className = 'filter-bar';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'filter-toggle';
  toggle.setAttribute('aria-expanded','false');
  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'filter-clear';
  clear.textContent = 'Quitar filtros';
  clear.hidden = true;
  bar.append(toggle, clear);

  const panel = document.createElement('div');
  panel.className = 'filter-panel';
  panel.hidden = true;
  searchBox.after(bar);
  bar.after(panel);

  function dayArtists() {
    return activeDay === 'Todos' ? allArtists() : (FESTIVAL.days[activeDay] || []);
  }

  function group(title, options, selected, onToggle) {
    const section = document.createElement('div');
    section.className = 'filter-group';
    const heading = document.createElement('span');
    heading.className = 'filter-group-title';
    heading.textContent = title;
    const chips = document.createElement('div');
    chips.className = 'filter-chips';
    for (const option of options) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filter-chip';
      chip.setAttribute('aria-pressed', selected.has(option.value) ? 'true' : 'false');
      chip.innerHTML = `${escapeHtml(option.label)} <small>${option.count}</small>`;
      chip.addEventListener('click', () => onToggle(option.value));
      chips.appendChild(chip);
    }
    section.append(heading, chips);
    return section;
  }

  function renderPanel() {
    const genreCounts = new Map(Object.keys(GENRE_FAMILIES).map(g => [g,0]));
    const countryCounts = new Map();
    for (const name of dayArtists()) {
      for (const family of familiesFor(name)) genreCounts.set(family,(genreCounts.get(family)||0)+1);
      for (const code of new Set(countriesFor(name))) countryCounts.set(code,(countryCounts.get(code)||0)+1);
    }

    const genres = [...genreCounts].filter(([,n]) => n>0).sort((a,b)=>b[1]-a[1]).map(([value,count])=>({value,label:value,count}));
    const countries = [...countryCounts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).map(([value,count])=>({
      value,
      label: COUNTRY_NAMES[value] ? `${COUNTRY_NAMES[value]} (${value})` : value,
      count
    }));

    panel.replaceChildren(
      group('Género', genres, selectedGenres, value => {
        selectedGenres.has(value) ? selectedGenres.delete(value) : selectedGenres.add(value);
        renderArtists();
      }),
      group('País', countries, selectedCountries, value => {
        selectedCountries.has(value) ? selectedCountries.delete(value) : selectedCountries.add(value);
        renderArtists();
      })
    );
  }

  function renderBar() {
    const active = selectedGenres.size + selectedCountries.size;
    toggle.innerHTML = active ? `Filtros <span class="filter-toggle-count">${active}</span>` : 'Filtros';
    toggle.classList.toggle('has-filters', active > 0);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    clear.hidden = active === 0;
    panel.hidden = !open;
    if (open) renderPanel();
  }

  toggle.addEventListener('click', () => { open = !open; renderBar(); });
  clear.addEventListener('click', () => {
    selectedGenres.clear();
    selectedCountries.clear();
    renderArtists();
  });

  const visibleBase = getVisibleArtists;
  getVisibleArtists = function getVisibleArtistsWithFilters() {
    return visibleBase().filter(matches);
  };

  const renderBase = renderArtists;
  renderArtists = function renderArtistsWithFilters() {
    renderBase();
    renderBar();
    const empty = $('#artistList .empty-state');
    if (empty && (selectedGenres.size || selectedCountries.size)) {
      empty.textContent = 'Ningún artista de este día coincide con los filtros.';
    }
  };

  const screenBase = showScreen;
  showScreen = function showScreenResettingFilters(name) {
    if (name !== 'lineup' && name !== 'artist') {
      selectedGenres.clear();
      selectedCountries.clear();
      open = false;
    }
    return screenBase(name);
  };
})();

/* ===== cartel-share.js ===== */
'use strict';
(function multiFriendCartelsInstaller() {
  const saved = window.FestivalfySaved;
  const bottomNav = document.querySelector('.bottom-nav');
  const savedScreen = document.getElementById('savedScreen');
  if (!saved || !bottomNav || !savedScreen) return;

  const PARAM = 'cartel';
  const FORMAT = '1';
  const FRIENDS_KEY = 'festivalfy_friend_cartels_v1';
  const MAX_FRIENDS = 50;
  const index = [...allArtists()].sort((a, b) => a.localeCompare(b, 'es'));

  function catalogFingerprint() {
    let hash = 0;
    const source = `${index.length}:${index.join('|')}`;
    for (let i = 0; i < source.length; i += 1) {
      hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
    }
    return hash.toString(36).slice(-3).padStart(3, '0');
  }

  const fingerprint = catalogFingerprint();

  function bytesToBase64Url(bytes) {
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function base64UrlToBytes(value) {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
    return Uint8Array.from(binary, character => character.charCodeAt(0));
  }

  function encodeSelection(names) {
    const chosen = new Set(names);
    const bytes = new Uint8Array(Math.ceil(index.length / 8));
    index.forEach((name, position) => {
      if (chosen.has(name)) bytes[position >> 3] |= 1 << (position % 8);
    });
    return `${FORMAT}${fingerprint}${bytesToBase64Url(bytes)}`;
  }

  function decodeSelection(code) {
    const value = String(code || '');
    if (value.slice(0, 1) !== FORMAT) return {error: 'format'};
    if (value.slice(1, 4) !== fingerprint) return {error: 'outdated'};
    try {
      const bytes = base64UrlToBytes(value.slice(4));
      const names = index.filter((_, position) => bytes[position >> 3] & (1 << (position % 8)));
      return {names};
    } catch {
      return {error: 'format'};
    }
  }

  function shareUrl(names) {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    url.searchParams.set(PARAM, encodeSelection(names));
    return url.toString();
  }

  function sanitizeFriend(friend) {
    if (!friend || typeof friend !== 'object') return null;
    const name = String(friend.name || '').trim().slice(0, 40);
    const names = Array.isArray(friend.names)
      ? [...new Set(friend.names.filter(artist => index.includes(artist)))]
      : [];
    if (!name || !names.length) return null;
    return {
      id: String(friend.id || `${Date.now()}-${Math.random().toString(36).slice(2,8)}`),
      name,
      names,
      addedAt: Number(friend.addedAt) || Date.now()
    };
  }

  function loadFriends() {
    try {
      const parsed = JSON.parse(localStorage.getItem(FRIENDS_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.map(sanitizeFriend).filter(Boolean).slice(0, MAX_FRIENDS) : [];
    } catch {
      return [];
    }
  }

  let friends = loadFriends();
  let activeFriendId = null;
  let incomingError = null;

  function saveFriends() {
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends.slice(0, MAX_FRIENDS)));
  }

  function normalizeName(name) {
    return String(name || '').trim().toLocaleLowerCase('es');
  }

  function overlapCount(friendNames) {
    const mine = new Set(saved.list());
    return friendNames.reduce((count, artist) => count + (mine.has(artist) ? 1 : 0), 0);
  }

  function addOrUpdateFriend(name, names) {
    const cleanName = String(name || '').trim().slice(0, 40) || 'Amigo';
    const existing = friends.find(friend => normalizeName(friend.name) === normalizeName(cleanName));

    if (existing) {
      existing.names = [...new Set(names)];
      existing.addedAt = Date.now();
      activeFriendId = existing.id;
    } else {
      const friend = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        name: cleanName,
        names: [...new Set(names)],
        addedAt: Date.now()
      };
      friends.unshift(friend);
      activeFriendId = friend.id;
      if (friends.length > MAX_FRIENDS) friends = friends.slice(0, MAX_FRIENDS);
    }

    saveFriends();
  }

  const style = document.createElement('style');
  style.textContent = `
    .saved-friends-section { padding-bottom:4px; }
    .saved-friends-intro {
      margin:0 0 14px;
      color:#9f95a5;
      font-size:13px;
      line-height:1.55;
    }
    .saved-share {
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      margin:0 0 16px;
    }
    .saved-share button {
      display:inline-flex;
      align-items:center;
      gap:8px;
      min-height:44px;
      padding:11px 16px;
      border:1px solid #3a3041;
      border-radius:999px;
      background:#19151e;
      color:#e9e2ec;
      font-size:13px;
      font-weight:850;
      cursor:pointer;
    }
    .saved-share button:active { background:#221c28; }
    .saved-share button.primary { border-color:#d7a0f4; color:#f6ecfc; }

    .friend-cartels {
      display:grid;
      gap:10px;
      margin-top:8px;
    }
    .friend-cartel-card {
      display:grid;
      grid-template-columns:minmax(0,1fr) auto;
      gap:10px;
      align-items:center;
      padding:13px 13px 13px 15px;
      border:1px solid #302738;
      border-radius:16px;
      background:#151119;
    }
    .friend-cartel-main {
      min-width:0;
      border:0;
      padding:0;
      background:transparent;
      color:#fff;
      cursor:pointer;
      text-align:left;
    }
    .friend-cartel-main strong {
      display:block;
      overflow:hidden;
      font-size:16px;
      font-weight:900;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .friend-cartel-main span {
      display:block;
      margin-top:4px;
      color:#9f95a5;
      font-size:12px;
      font-weight:700;
      line-height:1.4;
    }
    .friend-cartel-main b {
      color:#d7a0f4;
      font-weight:900;
    }
    .friend-cartel-actions {
      display:flex;
      gap:6px;
    }
    .friend-cartel-actions button {
      display:grid;
      place-items:center;
      width:34px;
      height:34px;
      border:1px solid #3a3041;
      border-radius:999px;
      background:#1d1822;
      color:#b9aebf;
      cursor:pointer;
      font-size:15px;
      font-weight:900;
    }
    .friends-empty {
      padding:18px 15px;
      border:1px dashed #3b3242;
      border-radius:15px;
      color:#938999;
      font-size:13px;
      line-height:1.5;
    }
    .friends-limit {
      margin:10px 2px 0;
      color:#756d7a;
      font-size:10px;
      line-height:1.4;
    }

    .compare-summary {
      padding:16px;
      border:1px solid #2e2635;
      border-radius:16px;
      background:#151119;
      margin:0 0 18px;
    }
    .compare-summary strong {
      display:block;
      font-size:26px;
      font-weight:900;
      color:#d7a0f4;
    }
    .compare-summary span {
      display:block;
      margin-top:4px;
      color:#8f8594;
      font-size:13px;
      line-height:1.5;
    }
    .compare-group { margin:0 0 22px; }
    .compare-group-heading {
      display:flex;
      align-items:baseline;
      justify-content:space-between;
      gap:12px;
      margin:0 0 4px;
    }
    .compare-group-heading h2 {
      margin:0;
      font-size:15px;
      font-weight:900;
      color:#f0e9f3;
    }
    .compare-group-heading span { color:#8f8594; font-size:13px; font-weight:800; }
    .compare-group-note {
      margin:0 0 10px;
      color:#8f8594;
      font-size:12px;
      line-height:1.5;
    }
    .compare-day {
      margin:0 0 6px;
      color:#8f8594;
      font-size:12px;
      font-weight:850;
      letter-spacing:.03em;
      text-transform:uppercase;
    }
    .compare-empty {
      padding:14px;
      border:1px dashed #332b3b;
      border-radius:14px;
      color:#8f8594;
      font-size:13px;
      line-height:1.5;
    }
    .compare-error {
      padding:16px;
      border:1px solid #5a2f3a;
      border-radius:16px;
      background:#1e1419;
      color:#e9d6dd;
      font-size:13px;
      line-height:1.55;
    }
  `;
  document.head.appendChild(style);

  const shareBar = document.createElement('div');
  shareBar.className = 'saved-share';

  const shareButton = document.createElement('button');
  shareButton.type = 'button';
  shareButton.className = 'primary';
  shareButton.textContent = 'Compartir mi cartel';

  shareBar.appendChild(shareButton);

  const friendsSection = savedScreen.querySelector('.saved-friends-section');
  if (!friendsSection) return;

  const friendsList = document.createElement('div');
  friendsList.className = 'friend-cartels';
  friendsList.id = 'friendCartels';

  const limitNote = document.createElement('p');
  limitNote.className = 'friends-limit';
  limitNote.textContent = `Puedes guardar hasta ${MAX_FRIENDS} carteles de amigos en este dispositivo.`;

  friendsSection.append(shareBar, friendsList, limitNote);

  shareButton.addEventListener('click', async () => {
    const names = saved.list();
    if (!names.length) {
      toast('Guarda algún artista antes de compartir tu cartel');
      return;
    }

    const url = shareUrl(names);
    try {
      if (navigator.share) {
        await navigator.share({title: 'Mi cartel de Primavera Sound 2027', url});
        return;
      }
      await navigator.clipboard.writeText(url);
      toast('Enlace copiado. Pégalo donde quieras');
    } catch (error) {
      if (error && error.name === 'AbortError') return;
      window.prompt('Copia este enlace para compartir tu cartel:', url);
    }
  });

  const compareScreen = document.createElement('section');
  compareScreen.id = 'compareScreen';
  compareScreen.className = 'screen';
  compareScreen.setAttribute('aria-label', 'Comparar carteles');
  compareScreen.innerHTML = `
    <header class="lineup-header">
      <button class="back-button" id="compareBack" type="button" aria-label="Volver a Mis carteles">‹</button>
      <div>
        <small>Primavera Sound 2027</small>
        <h1 id="compareTitle">Comparar carteles</h1>
      </div>
    </header>
    <div class="page-content">
      <div id="compareContent"></div>
    </div>`;
  bottomNav.before(compareScreen);
  screens.compare = compareScreen;

  compareScreen.querySelector('#compareBack').addEventListener('click', () => saved.openScreen());

  function renderFriends() {
    if (!friendsList) return;

    if (!friends.length) {
      friendsList.innerHTML = `
        <div class="friends-empty">
          Todavía no tienes carteles de amigos guardados. Cuando abras el enlace que te envíe un amigo, aparecerá aquí.
        </div>`;
      return;
    }

    friendsList.innerHTML = friends.map(friend => {
      const common = overlapCount(friend.names);
      return `
        <article class="friend-cartel-card" data-friend-id="${escapeHtml(friend.id)}">
          <button class="friend-cartel-main" type="button" data-open-friend="${escapeHtml(friend.id)}">
            <strong>${escapeHtml(friend.name)}</strong>
            <span>${friend.names.length} ${friend.names.length === 1 ? 'artista' : 'artistas'} · <b>${common} ${common === 1 ? 'en común' : 'en común'}</b></span>
          </button>
          <div class="friend-cartel-actions">
            <button type="button" data-rename-friend="${escapeHtml(friend.id)}" aria-label="Renombrar cartel de ${escapeHtml(friend.name)}">✎</button>
            <button type="button" data-delete-friend="${escapeHtml(friend.id)}" aria-label="Eliminar cartel de ${escapeHtml(friend.name)}">×</button>
          </div>
        </article>`;
    }).join('');

    friendsList.querySelectorAll('[data-open-friend]').forEach(button => {
      button.addEventListener('click', () => openCompareScreen(button.dataset.openFriend));
    });

    friendsList.querySelectorAll('[data-rename-friend]').forEach(button => {
      button.addEventListener('click', () => {
        const friend = friends.find(item => item.id === button.dataset.renameFriend);
        if (!friend) return;
        const next = window.prompt('Nombre para este cartel:', friend.name);
        if (!next || !next.trim()) return;
        friend.name = next.trim().slice(0, 40);
        saveFriends();
        renderFriends();
      });
    });

    friendsList.querySelectorAll('[data-delete-friend]').forEach(button => {
      button.addEventListener('click', () => {
        const friend = friends.find(item => item.id === button.dataset.deleteFriend);
        if (!friend) return;
        if (!window.confirm(`¿Eliminar el cartel de ${friend.name}?`)) return;
        friends = friends.filter(item => item.id !== friend.id);
        if (activeFriendId === friend.id) activeFriendId = null;
        saveFriends();
        renderFriends();
        toast('Cartel eliminado');
      });
    });
  }

  function groupByDay(names) {
    const chosen = new Set(names);
    return Object.entries(FESTIVAL.days)
      .map(([day, artists]) => [day, artists.filter(name => chosen.has(name))])
      .filter(([, artists]) => artists.length);
  }

  function artistRow(name) {
    const profile = cache[name]?.profiles?.[0];
    return `<article class="saved-artist-card">
      <button class="saved-artist-main" type="button" data-compare-open="${escapeHtml(name)}">
        <span class="artist-avatar">${saved.artistImage(name)}</span>
        <span class="artist-copy">
          <strong>${escapeHtml(name)}</strong>
          <small>${profile ? escapeHtml(profile.name) : 'Abrir ficha del artista'}</small>
        </span>
      </button>
      <a class="spotify-link" href="${escapeHtml(saved.artistSpotifyUrl(name))}" target="_blank" rel="noopener" aria-label="Abrir ${escapeHtml(name)} en Spotify">▶</a>
    </article>`;
  }

  function groupBlock(title, note, names) {
    const groups = groupByDay(names);
    const body = groups.length
      ? groups.map(([day, artists]) => `
          <p class="compare-day">${escapeHtml(DAY_LABELS[day])}</p>
          <div class="saved-artist-list">${artists.map(artistRow).join('')}</div>
        `).join('')
      : '<div class="compare-empty">No hay ninguno en este grupo.</div>';

    return `<section class="compare-group">
      <div class="compare-group-heading">
        <h2>${escapeHtml(title)}</h2>
        <span>${names.length}</span>
      </div>
      ${note ? `<p class="compare-group-note">${escapeHtml(note)}</p>` : ''}
      ${body}
    </section>`;
  }

  function renderCompare() {
    const content = compareScreen.querySelector('#compareContent');
    const title = compareScreen.querySelector('#compareTitle');

    if (incomingError) {
      title.textContent = 'Comparar carteles';
      content.innerHTML = `<div class="compare-error">${escapeHtml(incomingError === 'outdated'
        ? 'Este enlace se creó con una versión anterior del cartel. Pide a tu amigo que vuelva a compartirlo.'
        : 'No hemos podido leer este enlace. Pide a tu amigo que vuelva a compartirlo.')}</div>`;
      return;
    }

    const friend = friends.find(item => item.id === activeFriendId);
    if (!friend) {
      title.textContent = 'Comparar carteles';
      content.innerHTML = '<div class="compare-empty">Selecciona uno de los carteles guardados en “Mi cartel con amigos”.</div>';
      return;
    }

    title.textContent = `${friend.name} y tú`;

    const theirs = friend.names;
    const mine = saved.list();
    const mineSet = new Set(mine);
    const theirsSet = new Set(theirs);

    const both = theirs.filter(name => mineSet.has(name));
    const onlyTheirs = theirs.filter(name => !mineSet.has(name));
    const onlyMine = mine.filter(name => !theirsSet.has(name));

    const summary = mine.length
      ? `<div class="compare-summary">
          <strong>${both.length}</strong>
          <span>${both.length === 1 ? 'artista en común' : 'artistas en común'}. ${friend.name} tiene ${theirs.length} y tú ${mine.length}.</span>
        </div>`
      : `<div class="compare-summary">
          <strong>${theirs.length}</strong>
          <span>${friend.name} tiene ${theirs.length} ${theirs.length === 1 ? 'artista' : 'artistas'}. Todavía no has guardado ninguno.</span>
        </div>`;

    content.innerHTML = summary
      + groupBlock('Coincidís', 'Los artistas que habéis guardado los dos.', both)
      + groupBlock(`Solo en el cartel de ${friend.name}`, 'Ideas para descubrir.', onlyTheirs)
      + groupBlock('Solo en el tuyo', 'Los que has guardado tú.', onlyMine);

    content.querySelectorAll('[data-compare-open]').forEach(button => {
      button.addEventListener('click', () => openArtist(button.dataset.compareOpen));
    });
  }

  function openCompareScreen(friendId) {
    if (friendId) activeFriendId = friendId;
    incomingError = null;
    renderCompare();
    showScreen('compare');
    $all('.nav-item').forEach(button => button.classList.remove('active'));
    $('#navSaved')?.classList.add('active');
  }

  const oldBack = $('#artistBack');
  if (oldBack) {
    const artistBack = oldBack.cloneNode(true);
    oldBack.replaceWith(artistBack);
    artistBack.addEventListener('click', () => {
      if (previousScreen === 'compare') openCompareScreen(activeFriendId);
      else if (previousScreen === 'saved') saved.openScreen();
      else if (previousScreen === 'festival') openFestival();
      else openLineup(activeDay, {restore: true});
    });
  }

  // Keep overlap counts fresh when the user changes their own cartel.
  document.addEventListener('click', event => {
    if (event.target.closest('[data-favorite-artist]')) {
      window.requestAnimationFrame(renderFriends);
    }
  });

  window.addEventListener('storage', event => {
    if (event.key !== FRIENDS_KEY) return;
    friends = loadFriends();
    renderFriends();
  });

  const params = new URLSearchParams(window.location.search);
  const incoming = params.get(PARAM);
  if (incoming) {
    const decoded = decodeSelection(incoming);
    params.delete(PARAM);
    const clean = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', clean);

    if (decoded.error) {
      incomingError = decoded.error;
      window.setTimeout(() => {
        renderCompare();
        showScreen('compare');
      }, 0);
    } else {
      const suggested = `Amigo ${friends.length + 1}`;
      const friendName = window.prompt('¿De quién es este cartel?', suggested);
      addOrUpdateFriend(friendName || suggested, decoded.names);
      renderFriends();
      window.setTimeout(() => openCompareScreen(activeFriendId), 0);
    }
  }

  renderFriends();
})();
