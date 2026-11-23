const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const catalog=require('../festival-catalog.js');
const app=fs.readFileSync(require.resolve('../festivalfy.js'),'utf8');
const callback=fs.readFileSync(require('node:path').join(__dirname,'../callback/index.html'),'utf8');
const appDefinitions=app.slice(0,app.indexOf('\ninit();'));
const plain=value=>JSON.parse(JSON.stringify(value));
function makeContext(id,values=new Map()) {
  const elements=new Map();
  const element=selector=>{
    if (!elements.has(selector)) elements.set(selector,{value:'',classList:{toggle(){},remove(){},add(){}},addEventListener(){}});
    return elements.get(selector);
  };
  const context=vm.createContext({
    window:{FestivalfyCatalog:catalog,location:{href:`https://example.test/festivalfy/?festival=${id}`}},
    location:{search:`?festival=${id}`},
    document:{getElementById:id=>element(`#${id}`),querySelector:element,querySelectorAll:()=>[]},
    localStorage:{getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)},
    URLSearchParams,URL,Date,Set,Map,Uint8Array,btoa,atob,console
  });
  vm.runInContext(appDefinitions,context);
  return {context,element,values,run:code=>vm.runInContext(code,context)};
}

test('festival selection accepts only known editions and preserves legacy storage keys',()=>{
  assert.equal(catalog.selectedId(''),'primavera-2027');
  assert.equal(catalog.selectedId('?festival=unknown'),'primavera-2027');
  for (const {id} of catalog.entries)assert.equal(catalog.selectedId(`?festival=${id}`),id);
  assert.equal(catalog.scopedKey('saved','primavera-2027'),'saved');
  assert.notEqual(catalog.scopedKey('saved','sonar-2027'),catalog.scopedKey('saved','bbk-live-2027'));
});

test('new lineups contain exactly the announced acts and never fabricate a day',()=>{
  for (const [id,count] of [['sonar-2027',30],['bbk-live-2027',46]]) {
    const h=makeContext(id);
    assert.equal(h.run('allArtists().length'),count);
    assert.equal(h.run('new Set(allArtists()).size'),count);
    assert.deepEqual(plain(h.run('Object.keys(FESTIVAL.days)')),['Por anunciar']);
    assert.equal(h.run('FESTIVAL.daysAnnounced'),false);
    h.run("activeDay='Todos'");
    assert.equal(h.run('getVisibleArtists().length'),count);
    h.element('#artistSearch').value='bonobo';
    assert.deepEqual(plain(h.run('getVisibleArtists()')),['Bonobo']);
  }
});

test('Primavera retains its day distribution and existing saved selections',()=>{
  const values=new Map([['festivalfy_saved_artists_v1',JSON.stringify(['Massive Attack'])]]);
  const h=makeContext('primavera-2027',values);
  assert.equal(h.run('FESTIVAL.name'),'Primavera Sound Barcelona 2027');
  assert.equal(h.run('Object.keys(FESTIVAL.days).length'),5);
  assert.ok(h.run("FESTIVAL.days['Jue 3'].includes('Massive Attack')"));
  const start=app.indexOf("  const STORAGE_KEY = festivalScopedKey('festivalfy_saved_artists_v1')");
  vm.runInContext(app.slice(start,app.indexOf('  function saveSavedArtists()',start)),h.context);
  assert.deepEqual(plain(h.run('[...savedArtists]')),['Massive Attack']);
});

test('favorites for the same artist remain independent between festivals',()=>{
  const values=new Map([
    ['festivalfy_saved_artists_v1',JSON.stringify(['Massive Attack'])],
    ['festivalfy_saved_artists_v1:sonar-2027',JSON.stringify(['Bonobo'])]
  ]);
  for(const [id,expected] of [['sonar-2027',['Bonobo']],['bbk-live-2027',[]],['primavera-2027',['Massive Attack']]]) {
    const h=makeContext(id,values);
    const start=app.indexOf("  const STORAGE_KEY = festivalScopedKey('festivalfy_saved_artists_v1')");
    vm.runInContext(app.slice(start,app.indexOf('  function saveSavedArtists()',start)),h.context);
    assert.deepEqual(plain(h.run('[...savedArtists]')),expected);
  }
});

test('announced view and information use the selected festival and official source',()=>{
  for(const id of ['sonar-2027','bbk-live-2027']) {
    const h=makeContext(id);
    h.run('renderFestivalTab()');
    assert.ok(h.element('#festivalTabContent').innerHTML.includes('reparto por días todavía no está anunciado'));
    h.run("currentTab='info';renderFestivalTab()");
    assert.ok(h.element('#festivalTabContent').innerHTML.includes(h.run('FESTIVAL.sourceUrl')));
    assert.ok(h.element('#festivalTabContent').innerHTML.includes(h.run('FESTIVAL.name')));
  }
});

test('shared links preserve festival, encoded selection, and legacy Primavera format',()=>{
  for(const id of ['sonar-2027','bbk-live-2027','primavera-2027']) {
    const h=makeContext(id);
    const start=app.indexOf("  const PARAM = 'cartel';");
    const end=app.indexOf('  function sanitizeFriend(friend)',start);
    vm.runInContext(app.slice(start,end),h.context);
    const artist=id==='primavera-2027'?'Massive Attack':'Bonobo';
    const url=new URL(h.run(`shareUrl(${JSON.stringify([artist])})`));
    assert.equal(url.searchParams.get('festival'),id==='primavera-2027'?null:id);
    assert.deepEqual(plain(h.run(`decodeSelection(${JSON.stringify(url.searchParams.get('cartel'))}).names`)),[artist]);
    assert.notEqual(h.run('festivalScopedKey("festivalfy_friend_cartels_v1")'),'festivalfy_friend_cartels_v1:other');
  }
});

test('home search includes all festivals and handles accents',()=>{
  const h=makeContext('primavera-2027');
  const list=h.element('#festivalList');list.querySelectorAll=()=>[];
  const start=app.indexOf('function renderHomeFestivals()');
  vm.runInContext(app.slice(start,app.indexOf('\n(() => {',start)),h.context);
  h.run('renderHomeFestivals()');
  assert.equal((list.innerHTML.match(/data-festival=/g)||[]).length,3);
  for(const [query,id] of [['sonar','sonar-2027'],['BBK','bbk-live-2027'],['primavera','primavera-2027']]) {
    h.element('#festivalSearch').value=query;h.run('renderHomeFestivals()');
    assert.equal((list.innerHTML.match(/data-festival=/g)||[]).length,1);
    assert.ok(list.innerHTML.includes(id));
  }
});

test('Spotify callback preserves festival for both user and administrator authorization',async()=>{
  const script=callback.slice(callback.indexOf('    const CLIENT_ID'),callback.lastIndexOf('  </script>'));
  for(const purpose of ['admin','user']) {
    const prefix=purpose==='user'?'festivalfy_user_spotify':'festivalfy_spotify';
    const data=new Map([['festivalfy_auth_festival','sonar-2027'],['festivalfy_spotify_auth_purpose',purpose],[`${prefix}_state`,'valid'],[`${prefix}_verifier`,'verifier']]);
    let redirect;
    const h=vm.createContext({URL,URLSearchParams,Date,
      location:{href:'https://example.test/festivalfy/callback/',search:'?state=valid&code=example',replace:value=>redirect=value},
      document:{getElementById:()=>({})},
      localStorage:{getItem:key=>data.get(key),setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)},
      fetch:async()=>({ok:true,json:async()=>({access_token:'test-token',expires_in:3600})})
    });
    await vm.runInContext(script,h);
    const url=new URL(redirect);
    assert.equal(url.searchParams.get('festival'),'sonar-2027');
    assert.equal(url.searchParams.get(purpose==='user'?'spotify_user':'spotify'),'connected');
    assert.equal(data.has('festivalfy_auth_festival'),false);
  }
});
