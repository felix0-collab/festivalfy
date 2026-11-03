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
