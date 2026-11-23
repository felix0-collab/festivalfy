/* Festival metadata and announced acts, checked against official sources. */
'use strict';
(function(root) {
  const DEFAULT_ID='primavera-2027';
  const entries=[
    {
      id:DEFAULT_ID,name:'Primavera Sound Barcelona 2027',shortName:'Primavera Sound 2027',
      title:['Primavera','Sound'],posterTitle:['MI PRIMAVERA','SOUND 2027'],city:'Barcelona',
      venue:'Parc del Fòrum',dates:'2–6 junio 2027',posterDates:'2–6 JUN 2027',year:2027,
      sourceUrl:'https://www.primaverasound.com/es/news/primavera-sound-barcelona-sigue-uniendo-los-puntos-de-su-25-edicion-anunciando-la-distribucion-por-dias-de-su-cartel',
      daysAnnounced:true,theme:'primavera'
    },
    {
      id:'sonar-2027',name:'Sónar Barcelona 2027',shortName:'Sónar 2027',title:['Sónar','Barcelona'],
      posterTitle:['MI SÓNAR','BARCELONA 2027'],city:'Barcelona',venue:'Barcelona · Fira Gran Via (de Noche)',
      dates:'17–19 junio 2027',posterDates:'17–19 JUN 2027',year:2027,
      sourceUrl:'https://sonar.es/es/programa/line-up',daysAnnounced:false,theme:'sonar',
      days:{'Por anunciar':[
        'Adriana Lopez presents Suut','Aurora Halal live','Bonobo','Busy P b2b Girl Ultra','Carl Cox',
        'Collabs3000 (Chris Liebing & Speedy J)','Cornelius','Disobey Sound System','Donato Dozzy & Batu',
        'Drizzyclare','Ehua & Flore','Frost Children','Funk Assault','Goldie live','Honey Dijon presents Sinister',
        'Jessie Ware','Job Jobse','Kaitlyn Aurelia Smith','KI/KI','Kristina','Opal Sunn','Oscar Mulero',
        'Peggy Gou','Romy DJ set','SALOME','Tash LC','TK MAMI','Tokischa','Yu Su','Yung Lean'
      ]},
      dayLabels:{'Por anunciar':'Artistas anunciados'},
      multiActs:{
        'Busy P b2b Girl Ultra':['Busy P','Girl Ultra'],
        'Collabs3000 (Chris Liebing & Speedy J)':['Chris Liebing','Speedy J'],
        'Donato Dozzy & Batu':['Donato Dozzy','Batu'],'Ehua & Flore':['Ehua','Flore']
      },
      aliases:{'Adriana Lopez presents Suut':'Suut','Aurora Halal live':'Aurora Halal',
        'Goldie live':'Goldie','Honey Dijon presents Sinister':'Honey Dijon','Romy DJ set':'Romy'}
    },
    {
      id:'bbk-live-2027',name:'Bilbao BBK Live 2027',shortName:'Bilbao BBK Live 2027',title:['Bilbao','BBK Live'],
      posterTitle:['MI BILBAO','BBK LIVE 2027'],city:'Bilbao',venue:'Kobetamendi',dates:'8–10 julio 2027',
      posterDates:'8–10 JUL 2027',year:2027,daysAnnounced:false,theme:'bbk',
      sourceUrl:'https://bilbaobbklive.com/lykke-li-of-monsters-and-men-vetusta-morla-y-mas-se-suman-al-cartel-de-bilbao-bbk-live/',
      days:{'Por anunciar':[
        '1111','Alcalá Norte','alt-J','Amelie Lens presents AURA','Antony Szmierek','Ari Abdul','Barry B','Bonobo',
        'Club Romántico: Dngdngdng b2b Florentino','DJ Shadow celebrates 30 years of Endtroducing…..',
        'Fat Dog','Frost Children','Genesis Owusu','Indabe','Jack Johnson','KEO','LAAZA','Los Bitchos','Lykke Li',
        'Mala Gestión','MARTIN','Merina Gris','Mustbejohn','Nøgen','Of Monsters and Men','Oxis','Paris Jackson',
        'Perfecto Miserable','Pixies','Saint Levant','Sanguijuelas del Guadiana','Sexy Zebras',
        'Sofia & The Antoinettes','Sofia Isella','SUA','Teddy Swims','The War on Drugs','The Womack Sisters',
        'The xx','TOC','Triángulo de Amor Bizarro','Two Door Cinema Club','Vetusta Morla','Violet Grohl','Viva Suecia','Zeatikez'
      ]},
      dayLabels:{'Por anunciar':'Artistas anunciados'},
      multiActs:{'Club Romántico: Dngdngdng b2b Florentino':['DNGDNGDNG','Florentino']},
      aliases:{'Amelie Lens presents AURA':'Amelie Lens','DJ Shadow celebrates 30 years of Endtroducing…..':'DJ Shadow'}
    }
  ];
  function selectedId(search='') {
    const id=new URLSearchParams(search).get('festival');
    return entries.some(festival=>festival.id===id) ? id : DEFAULT_ID;
  }
  function scopedKey(key,id) { return id===DEFAULT_ID ? key : `${key}:${id}`; }
  const api=Object.freeze({entries,DEFAULT_ID,selectedId,scopedKey,checkedAt:'2026-11-23'});
  root.FestivalfyCatalog=api;
  if (typeof module!=='undefined'&&module.exports) module.exports=api;
})(globalThis);
