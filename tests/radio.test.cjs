const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const rules=require('../radio-mix.js');
const source=fs.readFileSync(require.resolve('../festivalfy.js'),'utf8');
const id=n=>String(n).padStart(22,'0');
const track=(n,artist='a')=>({id:id(n),uri:`spotify:track:${id(n)}`,name:`Song ${n}`,artists:[{id:artist}]});
const profile={id:'a',name:'Festival artist',act:'Festival act'};
const pool=rules.verifiedTracks(Array.from({length:100},(_,i)=>track(i+1)),[profile]);
const plain=value=>JSON.parse(JSON.stringify(value));
const section=(start,end)=>source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)));
function storage() {
  const values=new Map();
  return {getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)};
}

test('only exact festival artist IDs qualify; duplicates and unplayable items are excluded',()=>{
  const candidates=[track(1),track(1),track(2,'outsider'),{...track(3),is_local:true},
    {...track(4),is_playable:false},{...track(5),type:'episode'},null,
    {...track(6),uri:'spotify:track:invalid'},
    {...track(7),artists:[{id:'outsider'},{id:'a'}]}];
  assert.deepEqual(rules.verifiedTracks(candidates,[profile]).map(t=>t.id),[id(1),id(7)]);
  assert.equal(rules.verifiedTracks([{...track(8),artists:[{id:'different',name:profile.name}]}],[profile]).length,0);
});

test('exported metadata can be revalidated without trusting the saved artist name',()=>{
  assert.equal(rules.verifiedTracks(pool,[profile]).length,100);
  assert.equal(rules.verifiedTracks(pool,[{id:'other',name:profile.name}]).length,0);
});

test('five mixes cover all 100 exactly once; later rounds exclude the previous mix',()=>{
  let history={},previous=[],firstRound=[];
  for(let index=0;index<30;index++) {
    const result=rules.selectMix(pool,history);
    const uris=result.tracks.map(t=>t.uri);
    assert.equal(new Set(uris).size,20);
    assert.ok(uris.every(uri=>pool.some(track=>track.uri===uri)));
    assert.ok(uris.every(uri=>!previous.includes(uri)));
    if(index<5)firstRound.push(...uris);
    previous=uris;
    history=plain(result.history); // Matches reload from persisted JSON.
  }
  assert.equal(new Set(firstRound).size,100);
});

test('incomplete or duplicate pools fail; malformed history does not break selection',()=>{
  assert.throws(()=>rules.selectMix(pool.slice(0,99)),/100/);
  assert.throws(()=>rules.selectMix([...pool.slice(0,99),pool[0]]),/100/);
  assert.equal(rules.selectMix(pool,{used:'bad',previous:42}).tracks.length,20);
});

function playbackHarness({data={playlistId:rules.PLAYLIST_ID,tracks:pool},rejectPlay=false,failStorage=false}={}) {
  const calls=[],localStorage=storage();
  if(failStorage) {
    localStorage.getItem=()=>{throw Error('blocked');};
    localStorage.setItem=()=>{throw Error('blocked');};
  }
  const context=vm.createContext({
    window:{FestivalfyRadioMix:rules},localStorage,console,Set,Map,
    fetch:async()=>({ok:true,json:async()=>data}),
    verifiedFestivalProfiles:()=>[profile],
    isUserSpotifyConnected:()=>true,userSpotifyHasPlaybackScopes:()=>true,
    festivalRadioGeneration:0,artistQueueLockGeneration:0,artistQueueLockPromise:null,
    artistQueueLockedProfileId:'',artistQueueRetryAt:0,currentFestivalRadioMix:null,
    festivalRadioMemoryHistory:{},festivalRadioStarting:false,festivalRadioSessionLimit:20,
    RADIO_MIX_HISTORY_KEY:'history',FESTIVAL_RADIO_SOURCE_ID:'radio',
    webPlayer:{activateElement(){}},webDeviceId:'device',
    currentPlaybackProfileId:'',currentPlaybackArtistName:'',activePremiumUi:null,latestPlaybackState:null,
    resetFestivalRadioSession:()=>{},updateMiniVisibility:()=>{},
    userPlaybackRequest:async(path,options)=>{
      calls.push({path,options});
      if(rejectPlay&&path.startsWith('/me/player/play?'))throw Object.assign(Error('Spotify failed'),{status:403});
    }
  });
  vm.runInContext(section('  async function loadFestivalRadioPool()','  function renderPlayer(name)'),context);
  return {context,calls,localStorage,play:options=>context.playFestivalRadioMix(options)};
}

test('playback sends exactly 20 explicit URIs and new mix has no overlap',async()=>{
  const h=playbackHarness();
  const result=await h.play();
  assert.equal(result.mode,'fixed-pool');
  const requests=()=>h.calls.filter(c=>c.path.startsWith('/me/player/play?'));
  const first=requests()[0].options.body.uris;
  assert.equal(first.length,20);
  assert.equal(requests()[0].options.body.context_uri,undefined);
  assert.ok(h.calls.some(c=>c.path.includes('/shuffle?state=false')));
  assert.ok(h.calls.some(c=>c.path.includes('/repeat?state=off')));
  await h.play({newMix:false});
  assert.deepEqual(requests()[1].options.body.uris,first);
  await h.play({newMix:true});
  assert.ok(requests()[2].options.body.uris.every(uri=>!first.includes(uri)));
});

test('failed playback does not consume a mix in history',async()=>{
  const h=playbackHarness({rejectPlay:true});
  await assert.rejects(h.play(),/Spotify failed/);
  assert.equal(h.localStorage.getItem('history'),null);
});

test('history still prevents consecutive repeats when browser storage is blocked',async()=>{
  const h=playbackHarness({failStorage:true});
  await h.play();
  const first=h.calls.find(c=>c.path.startsWith('/me/player/play?')).options.body.uris;
  await h.play({newMix:true});
  const second=h.calls.filter(c=>c.path.startsWith('/me/player/play?'))[1].options.body.uris;
  assert.ok(second.every(uri=>!first.includes(uri)));
});

test('missing pool stops before any Spotify playback request',async()=>{
  const h=playbackHarness({data:{playlistId:rules.PLAYLIST_ID,tracks:[]}});
  await assert.rejects(h.play(),/no está publicada/);
  assert.equal(h.calls.length,0);
});

function adminHarness(total=100) {
  const calls=[],messages=[],localStorage=storage();
  const profiles=Array.from({length:10},(_,i)=>({id:`artist${i}`,name:`Artist ${i}`}));
  const tracks=Array.from({length:total},(_,i)=>track(i+1,profiles[i%10].id));
  const context=vm.createContext({
    window:{FestivalfyRadioMix:rules,setTimeout(){}},crypto:globalThis.crypto,
    URLSearchParams,Date,Set,Map,console:{warn(){},error(){}},localStorage,
    PLAYLIST_ID:rules.PLAYLIST_ID,TARGET_TRACKS:100,RADIO_STORAGE_KEY:'pool',
    availableProfiles:()=>profiles,isSpotifyConnected:()=>true,
    updateButton:{},setAdminState:message=>messages.push(message),setProgress(){},
    renderSavedState(){},toast(){},shuffle:rules.shuffle,sleep:async()=>{},
    spotifyWrite:async(path,options={})=>{
      calls.push({path,options});
      if(options.method==='PUT')return {};
      if(path.includes('/items?'))return {items:tracks.slice(0,20).map((t,i)=>i%2?{item:t}:{track:t}),next:null};
      const query=new URLSearchParams(path.split('?')[1]).get('q');
      const profile=profiles.find(p=>query===`artist:"${p.name}"`);
      return {tracks:{items:tracks.filter(t=>t.artists[0].id===profile.id)}};
    }
  });
  vm.runInContext(section('  const radioSearchCache = new Map();','  // Replace the original connection button'),context);
  return {context,calls,messages,localStorage};
}

test('admin keeps existing songs and fills the playlist to exactly 100 verified URIs',async()=>{
  const h=adminHarness();
  await h.context.updateFestivalRadio();
  const writes=h.calls.filter(c=>c.options.method==='PUT');
  assert.equal(writes.length,1);
  assert.equal(new Set(writes[0].options.body.uris).size,100);
  for(let i=1;i<=20;i++)assert.ok(writes[0].options.body.uris.includes(track(i).uri));
  assert.equal(h.calls.filter(c=>c.path.startsWith('/search?')).length,10);
  assert.equal(JSON.parse(h.localStorage.getItem('pool')).tracks.length,100);
});

test('admin never writes a partial pool when fewer than 100 valid songs can be found',async()=>{
  const h=adminHarness(30);
  await h.context.updateFestivalRadio();
  assert.equal(h.calls.filter(c=>c.options.method==='PUT').length,0);
  assert.ok(h.messages.some(message=>message.includes('30 de 100')));
});

test('admin profiles must be verified and belong to the current festival',()=>{
  const context=vm.createContext({allArtists:()=>['Act','Pending'],shuffle:x=>x,cache:{
    Act:{status:'verified',profiles:[profile]},
    OldAct:{status:'verified',profiles:[{id:'old',name:'Old'}]},
    Pending:{status:'pending',profiles:[{id:'pending',name:'Pending'}]}
  }});
  vm.runInContext(section('  function availableProfiles()','  async function spotifyWrite('),context);
  assert.deepEqual(plain(context.availableProfiles()).map(p=>p.id),['a']);
});

test('session ignores stale startup state and stops at the selected last track',async()=>{
  let pauses=0;
  const context=vm.createContext({
    currentPlaybackProfileId:'radio',FESTIVAL_RADIO_SOURCE_ID:'radio',
    festivalRadioSessionEnding:false,festivalRadioStarting:true,festivalRadioHasStarted:false,
    festivalRadioLastTrackUri:'',festivalRadioTracksPlayed:0,festivalRadioSessionLimit:20,
    currentFestivalRadioMix:pool.slice(0,20),webPlayer:{pause:async()=>{pauses++;}},toast(){}
  });
  vm.runInContext(section('  async function monitorFestivalRadioSession(state)','  function paintPremiumState(state)'),context);
  const state=(n,position=0)=>({track_window:{current_track:track(n)},paused:false,duration:1000,position});
  await context.monitorFestivalRadioSession(state(99));
  assert.equal(pauses,0);
  await context.monitorFestivalRadioSession(state(1));
  await context.monitorFestivalRadioSession(state(20,900));
  assert.equal(pauses,1);
  assert.equal(context.festivalRadioSessionEnding,true);
});

test('session pauses if Spotify tries to leave the explicit selection',async()=>{
  let pauses=0;
  const context=vm.createContext({
    currentPlaybackProfileId:'radio',FESTIVAL_RADIO_SOURCE_ID:'radio',
    festivalRadioSessionEnding:false,festivalRadioStarting:false,festivalRadioHasStarted:true,
    currentFestivalRadioMix:pool.slice(0,20),webPlayer:{pause:async()=>{pauses++;}},toast(){}
  });
  vm.runInContext(section('  async function monitorFestivalRadioSession(state)','  function paintPremiumState(state)'),context);
  await context.monitorFestivalRadioSession({track_window:{current_track:track(99)},paused:false});
  assert.equal(pauses,1);
});
