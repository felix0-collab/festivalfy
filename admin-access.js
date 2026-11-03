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
    if (isAdmin || !window.activeArtist) return;
    const status = document.getElementById('artistDetailStatus');
    const entry = window.cache?.[window.activeArtist];
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

  if (typeof window.openArtist === 'function') {
    const baseOpenArtist = window.openArtist;
    window.openArtist = function openArtistWithAdminAccess(name) {
      baseOpenArtist(name);
      lockPublicControls();
      adjustPublicArtistMessage();
    };
  }

  if (accessMessage && typeof window.toast === 'function') {
    window.setTimeout(() => window.toast(accessMessage), 100);
  }
})();
