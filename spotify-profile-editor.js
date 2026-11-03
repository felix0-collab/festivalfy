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