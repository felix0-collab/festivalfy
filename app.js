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
  artist: document.getElementById('artistScreen')
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
  $('#navProfile').addEventListener('click', () => toast(isSpotifyConnected() ? spotifySummary() : 'Conecta Spotify desde la ficha del festival'));
  $('#profileButton').addEventListener('click', () => toast(isSpotifyConnected() ? 'Spotify está conectado' : 'Spotify todavía no está conectado'));
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
  if (params.get('spotify') === 'connected') {
    history.replaceState({}, '', location.pathname);
    toast('Spotify conectado correctamente');
    openFestival();
  }
}

init();
