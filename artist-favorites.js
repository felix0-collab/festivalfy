'use strict';

// Icon-only artist favourites. Selections persist on this device and are
// available from the existing "Mis festivales" navigation item.
(() => {
  const STORAGE_KEY = 'festivalfy_saved_artists_v1';
  let savedArtists = loadSavedArtists();

  function loadSavedArtists() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return new Set(Array.isArray(parsed) ? parsed.filter(name => allArtists().includes(name)) : []);
    } catch {
      return new Set();
    }
  }

  function saveSavedArtists() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedArtists]));
  }

  function isSaved(name) {
    return savedArtists.has(name);
  }

  function updateHeartButton(button, name) {
    const saved = isSaved(name);
    button.textContent = saved ? '♥' : '♡';
    button.classList.toggle('active', saved);
    button.setAttribute('aria-pressed', String(saved));
    button.setAttribute('aria-label', saved ? `Quitar ${name} de mi cartel` : `Añadir ${name} a mi cartel`);
    button.title = saved ? 'Quitar de mi cartel' : 'Añadir a mi cartel';
  }

  function refreshVisibleHearts() {
    document.querySelectorAll('[data-favorite-artist]').forEach(button => {
      updateHeartButton(button, button.dataset.favoriteArtist);
    });
    updateSavedNavigationIcon();
  }

  function toggleSavedArtist(name) {
    if (!name) return;
    if (savedArtists.has(name)) savedArtists.delete(name);
    else savedArtists.add(name);
    saveSavedArtists();
    refreshVisibleHearts();
    if (activeScreen === 'saved') renderSavedScreen();
    toast(savedArtists.has(name) ? 'Artista añadido a tu cartel' : 'Artista eliminado de tu cartel');
  }

  const style = document.createElement('style');
  style.textContent = `
    .artist-favorite,
    .artist-detail-favorite,
    .saved-artist-favorite {
      display:grid;
      place-items:center;
      flex:0 0 auto;
      width:40px;
      height:40px;
      border:1px solid #3a3041;
      border-radius:999px;
      background:#1c1721;
      color:#c6bacb;
      cursor:pointer;
      font-size:24px;
      line-height:1;
      transition:transform .16s ease, border-color .16s ease, color .16s ease, background .16s ease;
    }
    .artist-favorite:active,
    .artist-detail-favorite:active,
    .saved-artist-favorite:active { transform:scale(.9); }
    .artist-favorite.active,
    .artist-detail-favorite.active,
    .saved-artist-favorite.active {
      border-color:rgba(255,95,143,.48);
      background:rgba(255,95,143,.12);
      color:#ff6f9e;
    }
    .artist-detail-favorite {
      position:absolute;
      z-index:3;
      top:calc(18px + env(safe-area-inset-top));
      right:18px;
      width:44px;
      height:44px;
      background:rgba(18,15,22,.86);
      backdrop-filter:blur(10px);
    }
    .saved-header {
      align-items:flex-end;
      padding-bottom:18px;
    }
    .saved-header h1 { margin:5px 0 0; font-size:30px; letter-spacing:-1px; }
    .saved-content { padding-bottom:30px; }
    .saved-summary {
      margin:0 0 18px;
      padding:14px 15px;
      border:1px solid #342c3a;
      border-radius:15px;
      background:#15121a;
      color:#b8aebe;
      line-height:1.45;
    }
    .saved-day-group { margin:0 0 24px; }
    .saved-day-heading {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      margin:0 0 10px;
    }
    .saved-day-heading h2 { margin:0; font-size:20px; letter-spacing:-.35px; }
    .saved-day-heading span {
      display:grid;
      min-width:27px;
      height:27px;
      place-items:center;
      border-radius:999px;
      background:#2d2434;
      color:#dca2fb;
      font-size:12px;
      font-weight:900;
    }
    .saved-artist-list { display:grid; gap:10px; }
    .saved-artist-card {
      display:flex;
      align-items:center;
      gap:10px;
      min-width:0;
      padding:10px;
      border:1px solid #2d2733;
      border-radius:16px;
      background:#15121a;
    }
    .saved-artist-main {
      display:flex;
      align-items:center;
      gap:12px;
      flex:1;
      min-width:0;
      border:0;
      padding:0;
      background:transparent;
      color:#fff;
      cursor:pointer;
      text-align:left;
    }
    .saved-artist-main .artist-copy small { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .saved-empty {
      margin-top:28px;
      padding:36px 20px;
      border:1px dashed #3b3242;
      border-radius:18px;
      color:#9f95a5;
      text-align:center;
      line-height:1.55;
    }
    .saved-empty .empty-heart { display:block; margin-bottom:9px; color:#c58bdf; font-size:34px; }
    .saved-nav-count {
      display:inline-grid;
      min-width:18px;
      height:18px;
      place-items:center;
      margin-left:4px;
      padding:0 4px;
      border-radius:999px;
      background:#4a2857;
      color:#f2d6ff;
      font-size:10px;
      font-style:normal;
      font-weight:900;
      vertical-align:1px;
    }
    @media(max-width:360px) {
      .artist-favorite { width:36px; height:36px; font-size:21px; }
      .artist-card { gap:8px; }
    }
  `;
  document.head.appendChild(style);

  const bottomNav = document.querySelector('.bottom-nav');
  const savedScreen = document.createElement('section');
  savedScreen.id = 'savedScreen';
  savedScreen.className = 'screen';
  savedScreen.setAttribute('aria-label', 'Mi cartel');
  savedScreen.innerHTML = `
    <header class="topbar saved-header">
      <div>
        <span class="eyebrow">Primavera Sound 2027</span>
        <h1>Mi cartel</h1>
      </div>
    </header>
    <div class="page-content saved-content">
      <div class="saved-summary" id="savedSummary"></div>
      <div id="savedArtistGroups"></div>
    </div>`;
  bottomNav.before(savedScreen);
  screens.saved = savedScreen;

  function artistImage(name) {
    const profile = cache[name]?.profiles?.[0];
    return profile?.image
      ? `<img src="${escapeHtml(profile.image)}" alt="" loading="lazy">`
      : escapeHtml(initials(name));
  }

  function artistSpotifyUrl(name) {
    return cache[name]?.profiles?.[0]?.url || directSearchUrl(name);
  }

  function renderSavedScreen() {
    const groups = Object.entries(FESTIVAL.days)
      .map(([day, artists]) => [day, artists.filter(name => savedArtists.has(name))])
      .filter(([, artists]) => artists.length);

    const total = savedArtists.size;
    $('#savedSummary').textContent = total
      ? `${total} ${total === 1 ? 'artista guardado' : 'artistas guardados'}, organizados por día.`
      : 'Los artistas que marques con el corazón aparecerán aquí.';

    $('#savedArtistGroups').innerHTML = groups.length ? groups.map(([day, artists]) => `
      <section class="saved-day-group">
        <div class="saved-day-heading">
          <h2>${escapeHtml(DAY_LABELS[day])}</h2>
          <span>${artists.length}</span>
        </div>
        <div class="saved-artist-list">
          ${artists.map(name => {
            const profile = cache[name]?.profiles?.[0];
            return `<article class="saved-artist-card">
              <button class="saved-artist-main" type="button" data-saved-open="${escapeHtml(name)}">
                <span class="artist-avatar">${artistImage(name)}</span>
                <span class="artist-copy">
                  <strong>${escapeHtml(name)}</strong>
                  <small>${profile ? escapeHtml(profile.name) : 'Abrir ficha del artista'}</small>
                </span>
              </button>
              <button class="saved-artist-favorite active" type="button" data-favorite-artist="${escapeHtml(name)}" aria-label="Quitar ${escapeHtml(name)} de mi cartel" aria-pressed="true">♥</button>
              <a class="spotify-link" href="${escapeHtml(artistSpotifyUrl(name))}" target="_blank" rel="noopener" aria-label="Abrir ${escapeHtml(name)} en Spotify">▶</a>
            </article>`;
          }).join('')}
        </div>
      </section>`).join('') : `
      <div class="saved-empty">
        <span class="empty-heart">♡</span>
        Todavía no has guardado artistas. Pulsa el corazón de cualquier actuación para crear tu cartel.
      </div>`;

    document.querySelectorAll('[data-saved-open]').forEach(button => {
      button.addEventListener('click', () => openArtist(button.dataset.savedOpen));
    });
    document.querySelectorAll('#savedScreen [data-favorite-artist]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        toggleSavedArtist(button.dataset.favoriteArtist);
      });
    });
    refreshVisibleHearts();
  }

  function openSavedScreen() {
    renderSavedScreen();
    showScreen('saved');
    $all('.nav-item').forEach(button => button.classList.remove('active'));
    $('#navSaved').classList.add('active');
  }

  function updateSavedNavigationIcon() {
    const nav = $('#navSaved');
    if (!nav) return;
    const icon = nav.querySelector('span');
    if (icon) icon.textContent = savedArtists.size ? '♥' : '♡';
    let count = nav.querySelector('.saved-nav-count');
    if (savedArtists.size) {
      if (!count) {
        count = document.createElement('i');
        count.className = 'saved-nav-count';
        nav.appendChild(count);
      }
      count.textContent = String(savedArtists.size);
    } else if (count) {
      count.remove();
    }
  }

  function decorateArtistCards() {
    document.querySelectorAll('#artistList .artist-card').forEach(card => {
      const main = card.querySelector('.artist-main');
      const name = main?.dataset.artist;
      if (!name) return;

      let button = card.querySelector('.artist-favorite');
      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.className = 'artist-favorite';
        button.dataset.favoriteArtist = name;
        const spotifyLink = card.querySelector('.spotify-link');
        card.insertBefore(button, spotifyLink || null);
        button.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          toggleSavedArtist(name);
        });
      }
      updateHeartButton(button, name);
    });
  }

  const baseRenderArtists = renderArtists;
  renderArtists = function renderArtistsWithFavorites() {
    baseRenderArtists();
    decorateArtistCards();
  };

  // app.js registered its search listener before this extension loaded, so this
  // second listener decorates the freshly rendered search results.
  $('#artistSearch').addEventListener('input', () => requestAnimationFrame(decorateArtistCards));

  const detailHero = $('#artistDetailHero');
  const detailFavorite = document.createElement('button');
  detailFavorite.id = 'artistDetailFavorite';
  detailFavorite.className = 'artist-detail-favorite';
  detailFavorite.type = 'button';
  detailFavorite.dataset.favoriteArtist = '';
  detailHero.appendChild(detailFavorite);
  detailFavorite.addEventListener('click', () => toggleSavedArtist(activeArtist));

  function updateDetailFavorite(name) {
    if (!name) return;
    detailFavorite.dataset.favoriteArtist = name;
    updateHeartButton(detailFavorite, name);
  }

  const baseOpenArtist = openArtist;
  openArtist = function openArtistWithFavorite(name) {
    baseOpenArtist(name);
    updateDetailFavorite(name);
  };

  // Remove the original toast-only handler and turn the existing nav item into
  // the real saved-artists destination.
  const oldSavedNav = $('#navSaved');
  const savedNav = oldSavedNav.cloneNode(true);
  oldSavedNav.replaceWith(savedNav);
  savedNav.addEventListener('click', openSavedScreen);

  // The original artist back handler only knew festival and lineup screens.
  // Replace it so an artist opened from Mi cartel returns there.
  const oldArtistBack = $('#artistBack');
  const artistBack = oldArtistBack.cloneNode(true);
  oldArtistBack.replaceWith(artistBack);
  artistBack.addEventListener('click', () => {
    if (previousScreen === 'saved') openSavedScreen();
    else if (previousScreen === 'festival') openFestival();
    else openLineup(activeDay, {restore: true});
  });

  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY) return;
    savedArtists = loadSavedArtists();
    refreshVisibleHearts();
    if (activeScreen === 'saved') renderSavedScreen();
  });

  updateSavedNavigationIcon();
})();
