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
