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
