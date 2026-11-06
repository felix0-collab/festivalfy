/* Hold an artist row, then swipe left to add it without opening the detail. */
'use strict';
(() => {
  const saved=window.FestivalfySaved;
  if (!saved?.add || !window.PointerEvent) return;
  const selector='#artistList .artist-main, #compareContent [data-compare-open]';
  const HOLD_MS=280;
  const SLOP=12;
  let gesture=null;
  let suppressedClick=null;

  const style=document.createElement('style');
  style.textContent=`
    #artistList .artist-main, #compareContent [data-compare-open] {
      touch-action:pan-y pinch-zoom;
      -webkit-user-select:none;
      user-select:none;
      -webkit-touch-callout:none;
    }
    .festivalfy-swipe-row { position:relative; overflow:hidden; }
    .festivalfy-swipe-row > .artist-main,
    .festivalfy-swipe-row > .saved-artist-main {
      transform:translateX(var(--festivalfy-swipe-offset,0px));
      transition:transform .16s ease;
    }
    .festivalfy-swipe-active { border-color:rgba(30,215,96,.45); }
    .festivalfy-swipe-active > .artist-main,
    .festivalfy-swipe-active > .saved-artist-main { transition:none; }
    .festivalfy-swipe-active > .spotify-link,
    .festivalfy-swipe-active > .artist-favorite { opacity:0; pointer-events:none; }
    .festivalfy-swipe-active::after {
      content:attr(data-swipe-label);
      position:absolute; right:14px; top:50%; transform:translateY(-50%);
      padding:9px 11px; border-radius:12px;
      background:#123b25; color:#79f1a4;
      font-size:11px; font-weight:800; pointer-events:none;
    }
    .festivalfy-swipe-ready::after { background:#1ed760; color:#07140b; }
    @media (prefers-reduced-motion:reduce) {
      .festivalfy-swipe-row > .artist-main,
      .festivalfy-swipe-row > .saved-artist-main { transition:none; }
    }
  `;
  document.head.appendChild(style);

  function finish(commit=false) {
    const current=gesture;
    if (!current) return;
    gesture=null;
    window.clearTimeout(current.timer);
    if (current.armed) suppressedClick={button:current.button,until:Date.now()+650};
    current.row.classList.remove('festivalfy-swipe-active','festivalfy-swipe-ready');
    current.row.style.removeProperty('--festivalfy-swipe-offset');
    current.row.removeAttribute('data-swipe-label');
    try {
      if (current.button.hasPointerCapture(current.id)) current.button.releasePointerCapture(current.id);
    } catch {}
    if (commit && current.button.isConnected) {
      if (saved.has(current.name)) toast('Este artista ya está en tu cartel');
      else saved.add(current.name);
    }
  }

  document.addEventListener('pointerdown',event => {
    if (gesture) finish();
    if (event.isPrimary === false || event.button !== 0) return;
    const button=event.target.closest(selector);
    if (!button) return;
    const row=button.closest('.artist-card, .saved-artist-card');
    if (!row) return;
    suppressedClick=null;
    const current={id:event.pointerId,button,row,name:button.dataset.artist || button.dataset.compareOpen,
      x:event.clientX,y:event.clientY,distance:0,armed:false,threshold:Math.max(64,Math.min(100,row.getBoundingClientRect().width*.25))};
    gesture=current;
    current.timer=window.setTimeout(() => {
      if (gesture !== current) return;
      if (!button.isConnected || !button.closest('.screen.active')) { finish(); return; }
      current.armed=true;
      row.classList.add('festivalfy-swipe-row','festivalfy-swipe-active');
      row.dataset.swipeLabel=saved.has(current.name) ? '♥ En tu cartel' : '♡ Desliza a la izquierda';
      try { button.setPointerCapture(current.id); } catch {}
    },HOLD_MS);
  });

  document.addEventListener('pointermove',event => {
    const current=gesture;
    if (!current || event.pointerId !== current.id) return;
    const dx=event.clientX-current.x,dy=event.clientY-current.y;
    if (!current.armed) {
      if (Math.abs(dx)>SLOP || Math.abs(dy)>SLOP) finish();
      return;
    }
    if (Math.abs(dy)>SLOP && Math.abs(dy)>Math.abs(dx)) { finish(); return; }
    current.distance=Math.max(0,-dx);
    if (current.distance>0 && event.cancelable) event.preventDefault();
    current.row.style.setProperty('--festivalfy-swipe-offset',`${-Math.min(current.distance,150)}px`);
    const ready=current.distance>=current.threshold;
    current.row.classList.toggle('festivalfy-swipe-ready',ready);
    current.row.dataset.swipeLabel=saved.has(current.name) ? '♥ En tu cartel'
      : ready ? '♡ Suelta para añadir' : '♡ Desliza a la izquierda';
  },{passive:false});

  document.addEventListener('pointerup',event => {
    const current=gesture;
    if (!current || event.pointerId !== current.id) return;
    if (current.armed && event.cancelable) event.preventDefault();
    finish(current.armed && current.distance>=current.threshold);
  });
  document.addEventListener('pointercancel',event => {
    if (gesture?.id === event.pointerId) finish();
  });
  document.addEventListener('lostpointercapture',event => {
    if (gesture?.id === event.pointerId) finish();
  });
  document.addEventListener('click',event => {
    if (!suppressedClick || Date.now()>suppressedClick.until) return;
    if (event.target.closest(selector) !== suppressedClick.button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressedClick=null;
  },true);
  document.addEventListener('contextmenu',event => {
    if (gesture?.armed && event.target.closest(selector) === gesture.button) event.preventDefault();
  });
  document.addEventListener('dragstart',event => {
    if (event.target.closest(selector)) event.preventDefault();
  });
  window.addEventListener('blur',() => finish());
  window.addEventListener('scroll',() => finish(),{passive:true});
})();
