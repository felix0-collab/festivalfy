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
