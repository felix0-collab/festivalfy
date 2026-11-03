'use strict';

// Festival screen visual refinement:
// - informative, premium day cards without decorative empty icons;
// - compact festival hero;
// - clearer "Mi cartel" navigation label.
(() => {
  const DAY_META = {
    'Mié 2': {weekday: 'MIÉ', number: '02', sequence: '01', accent: '#a86dff', rgb: '168,109,255'},
    'Jue 3': {weekday: 'JUE', number: '03', sequence: '02', accent: '#cf5cff', rgb: '207,92,255'},
    'Vie 4': {weekday: 'VIE', number: '04', sequence: '03', accent: '#8b7cff', rgb: '139,124,255'},
    'Sáb 5': {weekday: 'SÁB', number: '05', sequence: '04', accent: '#f064a8', rgb: '240,100,168'},
    'Dom 6': {weekday: 'DOM', number: '06', sequence: '05', accent: '#718cff', rgb: '113,140,255'}
  };

  const style = document.createElement('style');
  style.textContent = `
    .festival-hero {
      height: clamp(250px, 68vw, 290px);
      background:
        radial-gradient(circle at 72% 22%, rgba(226, 59, 188, .36), transparent 29%),
        radial-gradient(circle at 17% 29%, rgba(113, 50, 215, .52), transparent 39%),
        linear-gradient(145deg, #51206b, #19101f 66%, #09080d);
    }
    .festival-hero .hero-overlay {
      background: linear-gradient(0deg, var(--bg) 0%, rgba(9,8,13,.52) 34%, transparent 76%);
    }
    .festival-hero .hero-actions {
      top: calc(14px + env(safe-area-inset-top));
      left: 16px;
      right: 16px;
    }
    .festival-hero .hero-copy {
      left: 20px;
      right: 20px;
      bottom: 18px;
    }
    .festival-hero .hero-copy h1 {
      margin-top: 6px;
      font-size: clamp(40px, 11vw, 46px);
      line-height: .91;
      letter-spacing: -2.2px;
    }
    .festival-intro { padding-top: 16px; }

    .day-cards-v2 {
      gap: 12px;
      padding-top: 17px;
      padding-bottom: 28px;
    }
    .day-card-v2 {
      --day-accent: #bd55ff;
      --day-accent-rgb: 189,85,255;
      position: relative;
      isolation: isolate;
      display: grid;
      grid-template-columns: 63px minmax(0, 1fr) 36px;
      align-items: center;
      gap: 14px;
      min-height: 96px;
      overflow: hidden;
      border: 1px solid rgba(var(--day-accent-rgb), .22);
      border-radius: 20px;
      padding: 12px 13px 12px 12px;
      background:
        linear-gradient(112deg, rgba(var(--day-accent-rgb), .105), rgba(23,20,28,.96) 43%, #15121a 100%);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,.025),
        0 12px 30px rgba(0,0,0,.13);
      transition: transform .16s ease, border-color .16s ease, background .16s ease;
    }
    .day-card-v2::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: -44px;
      left: -18px;
      width: 145px;
      height: 145px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--day-accent-rgb), .17), transparent 69%);
      pointer-events: none;
    }
    .day-card-v2::after {
      content: '';
      position: absolute;
      top: 15px;
      bottom: 15px;
      left: 0;
      width: 3px;
      border-radius: 0 999px 999px 0;
      background: var(--day-accent);
      box-shadow: 0 0 18px rgba(var(--day-accent-rgb), .55);
    }
    .day-card-v2:active {
      transform: scale(.985);
      border-color: rgba(var(--day-accent-rgb), .42);
    }
    .day-card-date {
      position: relative;
      z-index: 1;
      display: grid;
      place-items: center;
      align-content: center;
      min-height: 66px;
      padding-right: 13px;
      border-right: 1px solid rgba(255,255,255,.09);
      line-height: 1;
    }
    .day-card-weekday {
      margin-bottom: 4px;
      color: var(--day-accent);
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .13em;
    }
    .day-card-date strong {
      font-size: 30px;
      font-weight: 950;
      letter-spacing: -1.5px;
    }
    .day-card-date small {
      margin-top: 4px;
      color: #8f8594;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: .17em;
    }
    .day-card-copy {
      position: relative;
      z-index: 1;
      min-width: 0;
    }
    .day-card-copy .day-card-kicker {
      display: block;
      margin-bottom: 5px;
      color: var(--day-accent);
      font-size: 9px;
      font-weight: 950;
      letter-spacing: .15em;
      text-transform: uppercase;
    }
    .day-card-copy strong {
      display: block;
      overflow: hidden;
      color: #fff;
      font-size: 16px;
      line-height: 1.2;
      letter-spacing: -.2px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .day-card-copy small {
      display: block;
      margin-top: 6px;
      color: #aaa0af;
      font-size: 12px;
      line-height: 1.25;
    }
    .day-card-copy small b {
      color: #ddd3e1;
      font-weight: 900;
    }
    .day-card-arrow-v2 {
      position: relative;
      z-index: 1;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border: 1px solid rgba(var(--day-accent-rgb), .24);
      border-radius: 999px;
      background: rgba(var(--day-accent-rgb), .08);
      color: var(--day-accent);
      font-size: 17px;
      font-weight: 900;
    }

    @media (max-width: 350px) {
      .day-card-v2 {
        grid-template-columns: 56px minmax(0, 1fr) 32px;
        gap: 11px;
      }
      .day-card-date { padding-right: 10px; }
      .day-card-date strong { font-size: 27px; }
      .day-card-arrow-v2 { width: 31px; height: 31px; }
    }
  `;
  document.head.appendChild(style);

  const baseRenderFestivalTab = renderFestivalTab;
  renderFestivalTab = function renderFestivalTabWithRefinedDays() {
    if (currentTab !== 'days') {
      baseRenderFestivalTab();
      return;
    }

    $all('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === currentTab));
    const content = $('#festivalTabContent');
    content.innerHTML = `<div class="day-cards day-cards-v2">${Object.keys(FESTIVAL.days).map(day => {
      const meta = DAY_META[day];
      const count = FESTIVAL.days[day].length;
      return `
        <button
          class="day-card day-card-v2"
          type="button"
          data-day="${escapeHtml(day)}"
          style="--day-accent:${meta.accent};--day-accent-rgb:${meta.rgb}"
          aria-label="Abrir ${escapeHtml(DAY_LABELS[day])}, ${count} actuaciones">
          <span class="day-card-date" aria-hidden="true">
            <span class="day-card-weekday">${meta.weekday}</span>
            <strong>${meta.number}</strong>
            <small>JUN</small>
          </span>
          <span class="day-card-copy">
            <span class="day-card-kicker">Jornada ${meta.sequence}</span>
            <strong>${escapeHtml(DAY_LABELS[day])}</strong>
            <small><b>${count}</b> actuaciones confirmadas</small>
          </span>
          <span class="day-card-arrow-v2" aria-hidden="true">↗</span>
        </button>`;
    }).join('')}</div>`;

    $all('.day-card-v2').forEach(button => {
      button.addEventListener('click', () => openLineup(button.dataset.day));
    });
  };

  const savedNav = $('#navSaved');
  if (savedNav) {
    [...savedNav.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.textContent = 'Mi cartel';
      }
    });
    savedNav.setAttribute('aria-label', 'Abrir mi cartel');
  }

  // Replace the first render made by app.js with the refined version.
  renderFestivalTab();
})();
