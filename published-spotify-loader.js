'use strict';

// Merges the reviewed public catalogue with any newer corrections saved on this device.
(() => {
  const published = window.FESTIVALFY_PUBLISHED_SPOTIFY_DATA || {};
  const publishedAt = Date.parse("2026-11-03T20:06:16.975Z") || 0;
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
    // A correction made after the export stays local; otherwise the reviewed public record wins.
    merged[name] = localEntry && localTimestamp(localEntry) > publishedAt
      ? localEntry
      : (publishedEntry || localEntry);
  }

  cache = merged;
  if (activeScreen === 'festival') updateSpotifyUi();
  if (activeScreen === 'lineup') renderArtists();
  if (activeScreen === 'artist' && activeArtist) openArtist(activeArtist);
})();
