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
