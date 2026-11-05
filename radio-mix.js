/* Shared, deterministic rules for the fixed festival radio pool. */
(function(root) {
  'use strict';
  const PLAYLIST_ID='7lxl2eyUucpEXVs4PHbv6e';
  const POOL_SIZE=100;
  const MIX_SIZE=20;

  function shuffle(values) {
    const result=[...values];
    for (let index=result.length-1; index>0; index-=1) {
      const swap=globalThis.crypto.getRandomValues(new Uint32Array(1))[0] % (index+1);
      [result[index],result[swap]]=[result[swap],result[index]];
    }
    return result;
  }

  function verifiedTracks(tracks,profiles) {
    const byId=new Map(profiles.map(profile => [profile.id,profile]));
    const seen=new Set();
    return (Array.isArray(tracks) ? tracks : []).flatMap(track => {
      if (!track || track.is_local || track.is_playable === false || track.type === 'episode') return [];
      if (!/^spotify:track:[A-Za-z0-9]{22}$/.test(track.uri || '') || seen.has(track.uri)) return [];
      const ids=Array.isArray(track.artists)
        ? track.artists.map(artist => artist.id)
        : (Array.isArray(track.artistIds) ? track.artistIds : []);
      const profile=ids.map(id => byId.get(id)).find(Boolean);
      if (!profile) return [];
      seen.add(track.uri);
      return [{
        id:track.uri.split(':')[2],uri:track.uri,name:track.name || '',
        artistIds:ids,artistId:profile.id,profileId:profile.id,
        artistName:profile.name,act:profile.act || ''
      }];
    });
  }

  function selectMix(pool,history={},randomize=shuffle) {
    if (pool.length !== POOL_SIZE || new Set(pool.map(track => track.uri)).size !== POOL_SIZE) {
      throw new Error('La Radio necesita una lista publicada de 100 canciones verificadas.');
    }
    const allowed=new Set(pool.map(track => track.uri));
    const previous=new Set((Array.isArray(history?.previous) ? history.previous : []).filter(uri => allowed.has(uri)));
    const used=new Set((Array.isArray(history?.used) ? history.used : []).filter(uri => allowed.has(uri)));
    previous.forEach(uri => used.add(uri));
    let candidates=pool.filter(track => !used.has(track.uri));
    let nextUsed=[...used];
    if (candidates.length < MIX_SIZE) {
      // At the end of the deck start another round, excluding the last mix.
      const unseen=randomize(candidates);
      const unseenUris=new Set(unseen.map(track => track.uri));
      candidates=[...unseen,...randomize(pool.filter(track => !previous.has(track.uri) && !unseenUris.has(track.uri)))];
      nextUsed=[];
    } else {
      candidates=randomize(candidates);
    }
    const tracks=candidates.slice(0,MIX_SIZE);
    return {tracks,history:{
      used:[...new Set([...nextUsed,...tracks.map(track => track.uri)])],
      previous:tracks.map(track => track.uri)
    }};
  }

  const api=Object.freeze({PLAYLIST_ID,POOL_SIZE,MIX_SIZE,shuffle,verifiedTracks,selectMix});
  root.FestivalfyRadioMix=api;
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
})(globalThis);
