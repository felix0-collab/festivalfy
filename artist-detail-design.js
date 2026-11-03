'use strict';

// Refines the artist detail experience:
// - favourites are selected only from the artist detail page;
// - the technical Spotify verification sentence is removed;
// - country and genre metadata are shown when a reliable match is available.
(() => {
  const METADATA_STORAGE_KEY = 'festivalfy_artist_metadata_v1';
  const MUSICBRAINZ_ROOT = 'https://musicbrainz.org/ws/2';
  const curatedMetadata = {
    Underworld: {country: 'GB', genres: ['Electronic', 'Techno'], source: 'curated'}
  };

  let metadataCache = loadMetadataCache();
  let activeMetadataRequest = 0;
  let lastMusicBrainzRequestAt = 0;
  let musicBrainzQueue = Promise.resolve();

  function loadMetadataCache() {
    try {
      const parsed = JSON.parse(localStorage.getItem(METADATA_STORAGE_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveMetadataCache() {
    localStorage.setItem(METADATA_STORAGE_KEY, JSON.stringify(metadataCache));
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
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
    return [...new Set(values.filter(Boolean))];
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
  metadata.setAttribute('aria-live', 'polite');
  titleRow.after(metadata);

  function renderMetadataState(text) {
    metadata.innerHTML = `<span class="artist-metadata-state">${escapeHtml(text)}</span>`;
  }

  function renderMetadata(result) {
    const countries = unique(result?.countries || []);
    const genres = unique(result?.genres || []).slice(0, 4);
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

  function enqueueMusicBrainzFetch(url) {
    const task = musicBrainzQueue.then(async () => {
      const wait = Math.max(0, 1100 - (Date.now() - lastMusicBrainzRequestAt));
      if (wait) await new Promise(resolve => setTimeout(resolve, wait));
      lastMusicBrainzRequestAt = Date.now();

      const response = await fetch(url, {
        headers: {'Accept': 'application/json'}
      });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`MusicBrainz respondió con ${response.status}`);
      return response.json();
    });

    musicBrainzQueue = task.catch(() => null);
    return task;
  }

  function musicBrainzArtistFromUrlPayload(payload) {
    if (!payload) return null;
    const roots = Array.isArray(payload.urls) ? payload.urls : [payload];
    for (const root of roots) {
      const relations = Array.isArray(root?.relations) ? root.relations : [];
      const relation = relations.find(item => item?.artist?.id);
      if (relation?.artist) return relation.artist;
    }
    return null;
  }

  async function findMusicBrainzArtist(profile) {
    const spotifyUrl = profile?.id
      ? `https://open.spotify.com/artist/${profile.id}`
      : profile?.url;

    if (spotifyUrl) {
      const url = new URL(`${MUSICBRAINZ_ROOT}/url`);
      url.searchParams.set('resource', spotifyUrl);
      url.searchParams.set('inc', 'artist-rels');
      url.searchParams.set('fmt', 'json');
      try {
        const payload = await enqueueMusicBrainzFetch(url.toString());
        const linkedArtist = musicBrainzArtistFromUrlPayload(payload);
        if (linkedArtist?.id) return linkedArtist;
      } catch (error) {
        console.warn('MusicBrainz Spotify URL lookup failed.', error);
      }
    }

    const searchName = profile?.name;
    if (!searchName) return null;
    const searchUrl = new URL(`${MUSICBRAINZ_ROOT}/artist/`);
    const escapedName = String(searchName).replace(/([+\-&|!(){}\[\]^"~*?:\\/])/g, '\\$1');
    searchUrl.searchParams.set('query', `artistaccent:"${escapedName}"`);
    searchUrl.searchParams.set('limit', '6');
    searchUrl.searchParams.set('fmt', 'json');

    try {
      const payload = await enqueueMusicBrainzFetch(searchUrl.toString());
      const candidates = Array.isArray(payload?.artists) ? payload.artists : [];
      const exact = candidates.filter(candidate => normalize(candidate.name) === normalize(searchName));
      if (exact.length === 1) return exact[0];
      if (exact.length > 1) {
        const veryHigh = exact.filter(candidate => Number(candidate.score || 0) >= 99);
        if (veryHigh.length === 1) return veryHigh[0];
      }
    } catch (error) {
      console.warn('MusicBrainz artist search failed.', error);
    }
    return null;
  }

  async function loadProfileMetadata(profile) {
    const key = profile?.id || profile?.url || profile?.name;
    if (!key) return {country: '', genres: []};
    if (metadataCache[key]) return metadataCache[key];

    const spotifyGenres = Array.isArray(profile?.genres) ? profile.genres : [];
    let result = {
      country: '',
      genres: spotifyGenres.slice(0, 4),
      fetchedAt: new Date().toISOString()
    };

    const musicBrainzArtist = await findMusicBrainzArtist(profile);
    if (musicBrainzArtist?.id) {
      try {
        const detailUrl = new URL(`${MUSICBRAINZ_ROOT}/artist/${musicBrainzArtist.id}`);
        detailUrl.searchParams.set('inc', 'genres+tags');
        detailUrl.searchParams.set('fmt', 'json');
        const detail = await enqueueMusicBrainzFetch(detailUrl.toString());
        const genres = Array.isArray(detail?.genres)
          ? detail.genres
              .slice()
              .sort((a, b) => Number(b.count || 0) - Number(a.count || 0))
              .map(item => item.name)
          : [];
        result = {
          country: detail?.country || musicBrainzArtist.country || '',
          genres: genres.length ? genres.slice(0, 4) : result.genres,
          musicBrainzId: musicBrainzArtist.id,
          fetchedAt: new Date().toISOString()
        };
      } catch (error) {
        console.warn('MusicBrainz artist metadata lookup failed.', error);
        result.country = musicBrainzArtist.country || '';
      }
    }

    metadataCache[key] = result;
    saveMetadataCache();
    return result;
  }

  async function loadActMetadata(name) {
    const curated = curatedMetadata[name];
    if (curated) {
      return {
        countries: curated.country ? [curated.country] : [],
        genres: curated.genres || []
      };
    }

    const profiles = cache[name]?.profiles || [];
    if (!profiles.length) return {countries: [], genres: []};

    const countries = [];
    const genres = [];
    for (const profile of profiles) {
      const profileMetadata = await loadProfileMetadata(profile);
      if (profileMetadata.country) countries.push(profileMetadata.country);
      genres.push(...(profileMetadata.genres || []));
    }

    return {
      countries: unique(countries),
      genres: unique(genres).slice(0, 4)
    };
  }

  const openArtistBase = openArtist;
  openArtist = function openArtistWithCountryAndGenre(name) {
    openArtistBase(name);
    const entry = cache[name];
    technicalStatus.hidden = !['pending', 'not_found'].includes(entry?.status);
    countryCode.textContent = '';
    renderMetadataState('Cargando país y género…');

    const requestId = ++activeMetadataRequest;
    loadActMetadata(name)
      .then(result => {
        if (requestId !== activeMetadataRequest || activeArtist !== name) return;
        renderMetadata(result);
      })
      .catch(error => {
        console.warn('Artist metadata could not be loaded.', error);
        if (requestId !== activeMetadataRequest || activeArtist !== name) return;
        renderMetadata({countries: [], genres: []});
      });
  };
})();
