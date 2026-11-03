'use strict';

// Conserva el estado visual de la lista al entrar en una ficha de artista.
// Se carga después de app.js y amplía sus funciones de navegación.
(() => {
  let lineupViewState = {
    day: null,
    search: '',
    scrollY: 0
  };

  const openLineupBase = openLineup;
  const openArtistBase = openArtist;

  function restoreLineupScroll() {
    const target = Math.max(0, Number(lineupViewState.scrollY) || 0);

    // Espera a que la lista se haya dibujado antes de recuperar la posición.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({top: target, left: 0, behavior: 'auto'});
      });
    });

    // Una segunda corrección evita pequeños saltos si una imagen termina de cargar.
    setTimeout(() => {
      if (activeScreen === 'lineup') {
        window.scrollTo({top: target, left: 0, behavior: 'auto'});
      }
    }, 120);
  }

  openLineup = function openLineupWithViewState(day, options = {}) {
    const returningFromArtist = activeScreen === 'artist'
      && previousScreen === 'lineup'
      && lineupViewState.day === day;
    const shouldRestore = options.restore ?? returningFromArtist;

    if (!shouldRestore) {
      lineupViewState = {day, search: '', scrollY: 0};
    }

    activeDay = day;
    $('#artistSearch').value = shouldRestore ? lineupViewState.search : '';
    showScreen('lineup');
    renderDaySelector();
    renderArtists();

    if (shouldRestore) restoreLineupScroll();
  };

  openArtist = function openArtistWithViewState(name) {
    if (activeScreen === 'lineup') {
      lineupViewState = {
        day: activeDay,
        search: $('#artistSearch').value,
        scrollY: window.scrollY
      };
    }

    openArtistBase(name);
  };

  // Conserva también la búsqueda mientras el usuario escribe y sigue en la lista.
  $('#artistSearch').addEventListener('input', event => {
    if (activeScreen === 'lineup') lineupViewState.search = event.target.value;
  });
})();

// Carga los controles para pegar manualmente un perfil de Spotify.
(() => {
  const script = document.createElement('script');
  script.src = './manual-spotify-profile.js';
  script.async = false;
  document.body.appendChild(script);
})();
