const DATA = window.DATA;
const LINE_COLORS = {"movie_preludes": "#5b8def", "adaptations": "#f2a900", "spider_series": "#ff5f52", "x_men_series": "#2979ff", "iron_man_series": "#ff8f00", "avengers_series": "#7e57c2", "first_appearances": "#3ecf8e", "classic_events": "#e23636"};
const EDGE_COLORS = {"team": "#5b8def", "family": "#e879c7", "romantic": "#ff4d6d", "ally": "#3ecf8e", "enemy": "#ff8a3d", "variant": "#c084fc", "chronology": "#546279", "shared_characters": "#f2c14e"};
const EDGE_LABELS_RU = {"team": "Команда/союз", "family": "Семья", "romantic": "Романтика", "ally": "Союзники", "enemy": "Враги", "variant": "Альт. вариант", "chronology": "Хронология", "shared_characters": "Общие персонажи"}; const EDGE_LABELS_EN = {"team": "Team/alliance", "family": "Family", "romantic": "Romantic", "ally": "Allies", "enemy": "Enemies", "variant": "Alt. variant", "chronology": "Chronology", "shared_characters": "Shared characters"};
const GROUP_COLORS = {"avengers": "#e23636", "guardians_of_the_galaxy": "#f2a900", "wakanda_court": "#5a2d82", "asgard": "#4fc3f7", "pym_family_team": "#8bc34a", "captain_marvel_crew": "#ffca28", "spiderman_circle": "#d32f2f", "thunderbolts": "#607d8b", "ta_lo": "#26a69a", "eternals": "#c9a227", "tva": "#7e57c2", "shield_core": "#455a64", "doctor_strange_circle": "#26c6da", "cosmic": "#fbbf24", "multiverse_variants": "#c084fc", "villain": "#616161", "other": "#9e9e9e", "x_men": "#2979ff", "brotherhood": "#8e24aa", "fantastic_four": "#00acc1", "symbiote": "#607d8b", "spider_family": "#ef5350", "street_defenders": "#7b1fa2", "illuminati": "#8d6e63", "zombies": "#689f38", "spider_verse": "#ff3d7f"};
const UNIVERSE_COLORS = {"Earth-199999": "#e23636", "Earth-616": "#f5c518", "Earth-10005": "#2979ff", "Earth-96283": "#ff7043", "Earth-120703": "#26c6da", "Earth-688": "#b0bec5", "Earth-838": "#ab47bc", "Earth-89521": "#9ccc65", "What-If": "#ec407a", "Beyond": "#eceff1", "Animation": "#00bfa5", "Spider-Verse": "#d500f9", "Earth-828": "#ffb300"};
const UNIVERSE_LABELS_RU = {"Earth-199999": "Земля-199999 · MCU", "Earth-616": "Земля-616 · Комиксы", "Earth-10005": "Земля-10005 · Люди Икс (Fox)", "Earth-96283": "Земля-96283 · Человек-паук (Рэйми)", "Earth-120703": "Земля-120703 · Нов. Человек-паук (Уэбб)", "Earth-688": "Земля-688 · Вселенная Sony (Веном)", "Earth-838": "Земля-838 · Иллюминаты", "Earth-89521": "Земля-89521 · Зомби (What If)", "What-If": "What If…? · Мультивселенная Наблюдателя", "Beyond": "Вне вселенных · Космические сущности", "Animation": "Мультфильмы · Анимация", "Spider-Verse": "Спайдер-Вселенная · Sony Animation", "Earth-828": "Земля-828 · Первые шаги"};
const UNIVERSE_LABELS_EN = {"Earth-199999": "Earth-199999 · MCU", "Earth-616": "Earth-616 · Comics", "Earth-10005": "Earth-10005 · X-Men (Fox)", "Earth-96283": "Earth-96283 · Spider-Man (Raimi)", "Earth-120703": "Earth-120703 · Amazing Spider-Man (Webb)", "Earth-688": "Earth-688 · Sony's Spider-Man Universe", "Earth-838": "Earth-838 · Illuminati", "Earth-89521": "Earth-89521 · Zombies (What If)", "What-If": "What If…? · Watcher Multiverse", "Beyond": "Beyond · Cosmic Entities", "Animation": "Animation", "Spider-Verse": "Spider-Verse · Sony Animation", "Earth-828": "Earth-828 · First Steps"};
const UNIVERSE_ORDER = ["Earth-199999", "Earth-616", "Earth-828", "Earth-10005", "Earth-96283", "Earth-120703", "Spider-Verse", "Earth-688", "Earth-838", "Earth-89521", "What-If", "Beyond"];
const GROUP_LABELS_RU = DATA.group_labels_ru; const GROUP_LABELS_EN = DATA.group_labels_en;
const LINE_LABELS_RU = (DATA.comics && DATA.comics.line_labels_ru) || {}; const LINE_LABELS_EN = (DATA.comics && DATA.comics.line_labels_en) || {};
const PHASE_COLORS = {"1": "#e23636", "2": "#f2a900", "3": "#3ecf8e", "4": "#4fc3f7", "5": "#7e57c2", "6": "#ff4d6d", "netflix": "#8b0000", "other": "#888", "xmen": "#2979ff", "raimi": "#ff7043", "webb": "#26c6da", "sony": "#b0bec5", "animation": "#00bfa5", "spiderverse": "#d500f9"};
const PHASE_LABELS_RU = {"1": "Фаза 1", "2": "Фаза 2", "3": "Фаза 3", "4": "Фаза 4", "5": "Фаза 5", "6": "Фаза 6", "netflix": "Netflix", "other": "Другое", "xmen": "Люди Икс (Fox)", "raimi": "Человек-паук (Рэйми)", "webb": "Нов. Человек-паук (Уэбб)", "sony": "Вселенная Sony", "animation": "Мультфильмы", "spiderverse": "Spider-Verse (Sony)"}; const PHASE_LABELS_EN = {"1": "Phase 1", "2": "Phase 2", "3": "Phase 3", "4": "Phase 4", "5": "Phase 5", "6": "Phase 6", "netflix": "Netflix", "other": "Other", "xmen": "X-Men (Fox)", "raimi": "Spider-Man (Raimi)", "webb": "Amazing Spider-Man (Webb)", "sony": "Sony's Universe", "animation": "Animation", "spiderverse": "Spider-Verse (Sony)"};
const MEDIA_LABELS_RU = {"movie": "Фильмы", "tv_series": "Сериалы", "game": "Игры", "comic": "Комиксы", "one_shot": "Короткометражки"}; const MEDIA_LABELS_EN = {"movie": "Movies", "tv_series": "Series", "game": "Games", "comic": "Comics", "one_shot": "One-Shots"};
const UI_RU = {"app_title": "Marvel — Мультивселенная", "stats_chars": " персонажей · ", "stats_edges": " связей", "stats_stories": " историй · ", "search_ph": "Поиск персонажа…", "search_ph_story": "Поиск фильма/сериала…", "mode_chars": "Персонажи", "mode_stories": "Истории", "filters_edges": "Типы связей", "filters_groups": "Группы", "filters_phase": "Фаза/Эпоха", "filters_type": "Тип", "toggle_all": "все/ничего", "hint": "Перетаскивайте узлы · колесо — зум · клик по узлу — карточка и выделение связей", "hint_stories": "Ось времени — хронология событий во вселенной · клик по карточке — карточка и выделение связей", "wiki_link": "Открыть статью на Fandom →", "sec_affil": "Принадлежность", "sec_app": "Появления", "sec_rel": "Связи", "sec_chars": "Персонажи", "sec_date": "Дата выхода", "sec_event_date": "Дата событий во вселенной (примерно)", "sec_phase": "Фаза", "type_movie": "Фильм", "type_tv": "Сериал", "type_one_shot": "Короткометражка", "tba": "Дата не объявлена", "layout_phase": "По фазам", "layout_chrono": "По хронологии", "watch_link": "Где посмотреть", "read_link": "Где читать", "filters_btn": "Фильтры", "mode_comics": "Комиксы", "stats_comics": " комиксов · ", "search_ph_comic": "Поиск комикса…", "sec_line": "Линейка", "sec_tie_in": "Связанный фильм/сериал", "hint_comics": "Колонки — линейки комиксов, сверху вниз — хронология выхода · клик — карточка", "filters_universe": "Вселенные", "layout_force": "Общий граф", "layout_universe": "По вселенным", "stats_uni": " вселенных · ", "hint_universe": "Узлы сгруппированы по вселенным · кольцо узла = цвет вселенной · клик — карточка", "path_btn": "Путь до персонажа…", "path_banner": "Кликните второго персонажа (или найдите его в поиске)", "path_none": "Путь по связям не найден", "path_res": "Путь", "path_esc": "Esc — сбросить", "cat_chars": "Персонажи", "cat_stories": "Истории", "cat_comics": "Комиксы", "hotkeys": "Esc — сброс · «/» — поиск · 1/2/3 — режимы", "layout_lines": "По линейкам", "m_search_title": "Поиск", "m_tab_chars": "Персонажи", "m_tab_stories": "Истории", "m_tab_comics": "Комиксы", "m_tab_filters": "Фильтры"}; const UI_EN = {"app_title": "Marvel — Multiverse", "stats_chars": " characters · ", "stats_edges": " links", "stats_stories": " stories · ", "search_ph": "Search a character…", "search_ph_story": "Search a movie/series…", "mode_chars": "Characters", "mode_stories": "Stories", "filters_edges": "Link types", "filters_groups": "Groups", "filters_phase": "Phase/Era", "filters_type": "Type", "toggle_all": "all/none", "hint": "Drag nodes · scroll to zoom · click a node for details and to highlight connections", "hint_stories": "Axis — in-universe chronological order · click a card for details and to highlight connections", "wiki_link": "Open article on Fandom →", "sec_affil": "Affiliations", "sec_app": "Appearances", "sec_rel": "Connections", "sec_chars": "Characters", "sec_date": "Release date", "sec_event_date": "In-universe event date (approx.)", "sec_phase": "Phase", "type_movie": "Movie", "type_tv": "Series", "type_one_shot": "One-Shot", "tba": "Date TBA", "layout_phase": "By phase", "layout_chrono": "Chronological", "watch_link": "Where to watch", "read_link": "Where to read", "filters_btn": "Filters", "mode_comics": "Comics", "stats_comics": " comics · ", "search_ph_comic": "Search a comic…", "sec_line": "Line", "sec_tie_in": "Related movie/series", "hint_comics": "Columns are comic lines, top-to-bottom is release order · click a card for details", "filters_universe": "Universes", "layout_force": "Force graph", "layout_universe": "By universe", "stats_uni": " universes · ", "hint_universe": "Nodes are grouped by universe · node ring colour = universe · click a node for details", "path_btn": "Path to a character…", "path_banner": "Click the second character (or use search)", "path_none": "No path found", "path_res": "Path", "path_esc": "Esc to clear", "cat_chars": "Characters", "cat_stories": "Stories", "cat_comics": "Comics", "hotkeys": "Esc — clear · \"/\" — search · 1/2/3 — modes", "layout_lines": "By line", "m_search_title": "Search", "m_tab_chars": "Characters", "m_tab_stories": "Stories", "m_tab_comics": "Comics", "m_tab_filters": "Filters"};

function initApp(){
let LANG = 'en';
let MODE = 'characters';
let STORY_LAYOUT = 'phase'; // 'phase' | 'chrono'
let COMIC_LAYOUT = 'lines'; // 'lines' | 'chrono'
function UI() { return LANG==='ru' ? UI_RU : UI_EN; }
function EDGE_LABELS() { return LANG==='ru' ? EDGE_LABELS_RU : EDGE_LABELS_EN; }
function GROUP_LABELS() { return LANG==='ru' ? GROUP_LABELS_RU : GROUP_LABELS_EN; }
function PHASE_LABELS() { return LANG==='ru' ? PHASE_LABELS_RU : PHASE_LABELS_EN; }
function MEDIA_LABELS() { return LANG==='ru' ? MEDIA_LABELS_RU : MEDIA_LABELS_EN; }
function LINE_LABELS() { return LANG==='ru' ? LINE_LABELS_RU : LINE_LABELS_EN; }
function UNIVERSE_LABELS() { return LANG==='ru' ? UNIVERSE_LABELS_RU : UNIVERSE_LABELS_EN; }

const MONTHS_RU = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function formatDate(iso){
  if (!iso || iso==='TBA') return UI().tba;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const y = +m[1], mo = +m[2]-1, day = +m[3];
  const months = LANG==='ru' ? MONTHS_RU : MONTHS_EN;
  return LANG==='ru' ? `${day} ${months[mo]} ${y}` : `${months[mo]} ${day}, ${y}`;
}
function actorWikiUrl(name){ return 'https://en.wikipedia.org/wiki/' + encodeURIComponent(name.trim().replace(/ /g,'_')); }

// ---------- feather icons (MIT, https://feathericons.com) ----------
const FEATHER = {
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  film:'<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  bookOpen:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  navigation:'<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  sliders:'<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  externalLink:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
};
function ic(name){ return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">'+(FEATHER[name]||'')+'</svg>'; }
function watchSearchUrl(title){
  // RU → Яндекс с русским запросом, EN → Google с английским
  if (LANG==='ru') return 'https://yandex.ru/search/?text=' + encodeURIComponent(title + ' смотреть онлайн');
  return 'https://www.google.com/search?q=' + encodeURIComponent(title + ' watch online');
}
function readSearchUrl(title){
  if (LANG==='ru') return 'https://yandex.ru/search/?text=' + encodeURIComponent(title + ' комикс читать онлайн');
  return 'https://www.google.com/search?q=' + encodeURIComponent(title + ' comic read online');
}

// Fandom/Wikia serves images at their full original resolution by default (often
// multiple MB for posters). Ask its image service for a small pre-scaled thumbnail
// instead -- this is the single biggest win for load time and CPU/memory usage.
const IS_MOBILE = (window.matchMedia && window.matchMedia('(max-width:720px)').matches) || (window.innerWidth||9999) <= 720;
function thumbUrl(url, widthPx){
  if (!url) return url;
  if (url.indexOf('/revision/latest') === -1) return url;
  if (IS_MOBILE) widthPx = Math.min(widthPx, 72); // smaller images on phones = faster load
  return url.replace('/revision/latest', '/revision/latest/scale-to-width-down/'+widthPx);
}

// ---------- v6.4: пропущенные фильмы/сериалы Fox-эры (рантайм-инъекция в DATA) ----------
// User flagged: "The New Mutants" was missing; audit found several more Fox-era X-Men
// titles absent from the dataset. Added here (not hand-edited into data.part*.js) so the
// large chunked data files stay untouched — same pattern as injectComicLines() below.
(function injectMissingStories(){
  if (DATA.stories.nodes.some(s=>s.id==='story_the_new_mutants')) return; // уже добавлено
  const WD = 'https://static.wikia.nocookie.net/marveldatabase/images/';
  const charIds = new Set(DATA.characters.nodes.map(c=>c.id));

  // -- новые персонажи (минимальный набор, чтобы у новых фильмов были связи) --
  const NC = [
    { id:'mirage_new_mutants', name:'Mirage', name_ru:'Мираж', real_name:'Danielle Moonstar', real_name_ru:'Даниэль Мунстар',
      actor:'Blu Hunt', universe:'Earth-10005', group:'x_men', affiliation:['New Mutants'],
      wiki_url:'https://marvel.fandom.com/wiki/Danielle_Moonstar_(Earth-10005)',
      image: WD+'d/d2/New_Mutants_%28film%29_poster_002.jpg/revision/latest?cb=20200827214823' },
    { id:'wolfsbane_new_mutants', name:'Wolfsbane', name_ru:'Волчица', real_name:'Rahne Sinclair', real_name_ru:'Рейн Синклер',
      actor:'Maisie Williams', universe:'Earth-10005', group:'x_men', affiliation:['New Mutants'],
      wiki_url:'https://marvel.fandom.com/wiki/Rahne_Sinclair_(Earth-10005)' },
    { id:'cannonball_new_mutants', name:'Cannonball', name_ru:'Пушечное ядро', real_name:'Sam Guthrie', real_name_ru:'Сэм Гатри',
      actor:'Charlie Heaton', universe:'Earth-10005', group:'x_men', affiliation:['New Mutants'],
      wiki_url:'https://marvel.fandom.com/wiki/Sam_Guthrie_(Earth-10005)' },
    { id:'magik_new_mutants', name:'Magik', name_ru:'Магия', real_name:'Illyana Rasputin', real_name_ru:'Иллиана Распутина',
      actor:'Anya Taylor-Joy', universe:'Earth-10005', group:'x_men', affiliation:['New Mutants'],
      wiki_url:'https://marvel.fandom.com/wiki/Illyana_Rasputin_(Earth-10005)' },
    { id:'reed_richards_fox', name:'Mister Fantastic', name_ru:'Мистер Фантастик', real_name:'Reed Richards', real_name_ru:'Рид Ричардс',
      actor:'Ioan Gruffudd', universe:'Earth-10005', group:'fantastic_four', affiliation:['Fantastic Four'],
      wiki_url:'https://marvel.fandom.com/wiki/Reed_Richards_(Earth-10005)' },
    { id:'sue_storm_fox', name:'Invisible Woman', name_ru:'Женщина-невидимка', real_name:'Susan Storm', real_name_ru:'Сьюзан Шторм',
      actor:'Jessica Alba', universe:'Earth-10005', group:'fantastic_four', affiliation:['Fantastic Four'],
      wiki_url:'https://marvel.fandom.com/wiki/Susan_Storm_(Earth-10005)' },
    { id:'johnny_storm_fox', name:'Human Torch', name_ru:'Человек-факел', real_name:'Johnny Storm', real_name_ru:'Джонни Шторм',
      actor:'Chris Evans', universe:'Earth-10005', group:'fantastic_four', affiliation:['Fantastic Four'],
      wiki_url:'https://marvel.fandom.com/wiki/Johnny_Storm_(Earth-10005)' },
    { id:'ben_grimm_fox', name:'The Thing', name_ru:'Существо', real_name:'Ben Grimm', real_name_ru:'Бен Гримм',
      actor:'Michael Chiklis', universe:'Earth-10005', group:'fantastic_four', affiliation:['Fantastic Four'],
      wiki_url:'https://marvel.fandom.com/wiki/Ben_Grimm_(Earth-10005)' },
    { id:'legion_fox', name:'Legion', name_ru:'Легион', real_name:'David Haller', real_name_ru:'Дэвид Халлер',
      actor:'Dan Stevens', universe:'Earth-10005', group:'x_men', affiliation:['X-Men (son of Professor X)'],
      wiki_url:'https://marvel.fandom.com/wiki/David_Haller_(Earth-10005)' }
  ];
  NC.forEach(c=>{ if (!charIds.has(c.id)) { DATA.characters.nodes.push(c); charIds.add(c.id); } });

  // родственная связь Legion — Professor X (уже есть в базе)
  if (charIds.has('professor_x_fox')) DATA.characters.edges.push({source:'legion_fox', target:'professor_x_fox', type:'family', label:'Отец/сын'});
  // New Mutants — командные связи друг с другом
  const nmTeam = ['mirage_new_mutants','wolfsbane_new_mutants','cannonball_new_mutants','magik_new_mutants'];
  for (let i=1;i<nmTeam.length;i++) DATA.characters.edges.push({source:nmTeam[0], target:nmTeam[i], type:'team', label:'New Mutants'});
  // Fantastic Four (Fox) — командные связи друг с другом
  const ffTeam = ['reed_richards_fox','sue_storm_fox','johnny_storm_fox','ben_grimm_fox'];
  for (let i=1;i<ffTeam.length;i++) DATA.characters.edges.push({source:ffTeam[0], target:ffTeam[i], type:'team', label:'Fantastic Four'});

  // -- новые фильмы/сериалы --
  const storyIds = new Set(DATA.stories.nodes.map(s=>s.id));
  const NS = [
    { id:'story_x_men_origins_wolverine', title:'X-Men Origins: Wolverine', title_ru:'Люди Икс: Начало. Росомаха', type:'movie', phase:'xmen',
      date:'2009-05-01', event_year:2009.33, event_date_ru:'2009', event_date_en:'2009', universe:'Earth-10005',
      poster: WD+'0/0d/X-Men_Origins_Wolverine_poster.jpg/revision/latest?cb=20120224001523',
      characters:['wolverine_fox','sabretooth_fox','deadpool_fox'] },
    { id:'story_the_new_mutants', title:'The New Mutants', title_ru:'Новые мутанты', type:'movie', phase:'xmen',
      date:'2020-08-28', event_year:2020.66, event_date_ru:'2020', event_date_en:'2020', universe:'Earth-10005',
      poster: WD+'d/d2/New_Mutants_%28film%29_poster_002.jpg/revision/latest?cb=20200827214823',
      characters:['mirage_new_mutants','wolfsbane_new_mutants','cannonball_new_mutants','magik_new_mutants'] },
    { id:'story_legion_tv_series', title:'Legion (TV series)', title_ru:'Легион', type:'tv_series', phase:'xmen',
      date:'2017-02-08', event_year:2017.11, event_date_ru:'2017–2019', event_date_en:'2017–2019', universe:'Earth-10005',
      poster: WD+'8/85/Legion_%28TV_series%29_poster_001.jpg/revision/latest?cb=20170123000826',
      characters:['legion_fox','professor_x_fox'] },
    { id:'story_fantastic_four_2005', title:'Fantastic Four', title_ru:'Фантастическая четвёрка', type:'movie', phase:'xmen',
      date:'2005-07-08', event_year:2005.52, event_date_ru:'2005', event_date_en:'2005', universe:'Earth-10005',
      poster: WD+'b/b7/Fantastic_Four_%282005%29_poster.jpg/revision/latest?cb=20120224001200',
      characters:['reed_richards_fox','sue_storm_fox','johnny_storm_fox','ben_grimm_fox'] },
    { id:'story_fantastic_four_rise_of_the_silver_surfer', title:'Fantastic Four: Rise of the Silver Surfer', title_ru:'Фантастическая четвёрка: Вторжение Серебряного сёрфера', type:'movie', phase:'xmen',
      date:'2007-06-15', event_year:2007.46, event_date_ru:'2007', event_date_en:'2007', universe:'Earth-10005',
      poster: WD+'2/2b/Fantastic_Four_Rise_of_the_Silver_Surfer_poster.jpg/revision/latest?cb=20120224001344',
      characters:['reed_richards_fox','sue_storm_fox','johnny_storm_fox','ben_grimm_fox'] }
  ];
  NS.forEach(s=>{
    s.characters = (s.characters||[]).filter(cid=>charIds.has(cid));
    s.char_count = s.characters.length;
    if (!storyIds.has(s.id)) { DATA.stories.nodes.push(s); storyIds.add(s.id); }
  });

  // хронологические связи внутри Fox-линии (по дате выхода), чтобы новые тайтлы
  // не остались изолированными узлами на timeline
  const chronoPairs = [
    ['story_x_men_origins_wolverine','story_x_men_first_class'],
    ['story_the_wolverine','story_the_new_mutants'],
    ['story_fantastic_four_2005','story_fantastic_four_rise_of_the_silver_surfer'],
  ];
  chronoPairs.forEach(([a,b])=>{ if (storyIds.has(a) && storyIds.has(b)) DATA.stories.edges.push({source:a, target:b, type:'chronology'}); });
})();

const charNodes = DATA.characters.nodes.map(d=>Object.assign({},d));
const charLinks = DATA.characters.edges.map(d=>Object.assign({},d));
const storyNodes = DATA.stories.nodes.map(d=>Object.assign({},d));
const storyLinksRaw = DATA.stories.edges.map(d=>Object.assign({},d));

// ---------- v6.3: дополнительные линейки комиксов (рантайм-инъекция в DATA) ----------
(function injectComicLines(){
  if (!DATA.comics || !DATA.comics.nodes) return;
  if (DATA.comics.nodes.some(c=>c.line==='thor_series')) return; // уже добавлено
  const WD = 'https://static.wikia.nocookie.net/marveldatabase/images/';
  const storyIds = new Set(DATA.stories.nodes.map(s=>s.id));
  const charIds = new Set(DATA.characters.nodes.map(c=>c.id));
  const N = [];
  const K = (id,title,title_ru,line,date,cov,tie,chars)=>{
    const d = {id:'comic_'+id, title, title_ru, line, date, cover: WD+cov};
    if (tie && storyIds.has(tie)) d.tie_in = tie;
    if (chars){ const cc = chars.filter(x=>charIds.has(x)); if (cc.length) d.tie_in_chars = cc; }
    N.push(d);
  };
  // Тор
  K('thor_vol1','The Mighty Thor Vol. 1 (1966–1996)','Могучий Тор. Том 1 (1966–1996)','thor_series','1966-03-01','d/d0/Thor_Vol_1_126.jpg/revision/latest?cb=20180417030149','story_thor_film',['thor_616','loki_616','odin_616']);
  K('thor_surtur','The Surtur Saga (Thor #337+)','Сага о Суртуре (Тор #337+)','thor_series','1983-11-01','f/f0/Thor_Vol_1_337.jpg/revision/latest?cb=20180817004509',null,['thor_616','beta_ray_bill_616']);
  K('thor_vol2','Thor Vol. 2 (1998–2004)','Тор. Том 2 (1998–2004)','thor_series','1998-07-01','5/53/Thor_Vol_2_1.jpg/revision/latest?cb=20220314225802',null,['thor_616']);
  K('thor_jms','Thor Vol. 3 (2007–2011)','Тор. Том 3 (2007–2011)','thor_series','2007-07-01','d/d1/Thor_Vol_3_1.jpg/revision/latest?cb=20181231052808',null,['thor_616','loki_616']);
  K('thor_god_of_thunder','Thor: God of Thunder (2012–2014)','Тор: Бог грома (2012–2014)','thor_series','2012-11-01','0/09/Thor_Vol_4_1.jpg/revision/latest?cb=20140904233645','story_thor_ragnarok',['thor_616','hela_616']);
  K('thor_jane','The Mighty Thor — Джейн Фостер (2015–2018)','Могучий Тор — Джейн Фостер (2015–2018)','thor_series','2015-11-01','4/4d/Mighty_Thor_Vol_2_1.jpg/revision/latest?cb=20151120082528','story_thor_love_and_thunder',['thor_616']);
  K('thor_vol5','Thor Vol. 5 (2018–2019)','Тор. Том 5 (2018–2019)','thor_series','2018-06-01','4/45/Thor_Vol_5_1.jpg/revision/latest?cb=20180607232028',null,['thor_616']);
  // Капитан Америка
  K('cap_comics1','Captain America Comics (1941–1950)','Капитан Америка (1941–1950)','cap_series','1941-03-01','9/9f/Captain_America_Comics_Vol_1_1.jpg/revision/latest?cb=20180404011756','story_captain_america_the_first_avenger',['cap_616','winter_soldier_616','red_skull_616']);
  K('cap_silver','Captain America Vol. 1 (1968–1996)','Капитан Америка. Том 1 (1968–1996)','cap_series','1968-04-01','1/10/Captain_America_Vol_1_100.jpg/revision/latest?cb=20171226055846',null,['cap_616','falcon_616']);
  K('cap_falcon_series','Falcon (1983)','Сокол (1983)','cap_series','1983-11-01','4/47/Falcon_Vol_1_1.jpg/revision/latest?cb=20220711203123',null,['falcon_616']);
  K('cap_brubaker','Captain America Vol. 5 (2004–2011)','Капитан Америка. Том 5 (2004–2011)','cap_series','2004-11-01','9/9d/Captain_America_Vol_5_1.jpg/revision/latest?cb=20181116202236','story_captain_america_the_winter_soldier',['cap_616','winter_soldier_616']);
  K('cap_winter_soldier','Winter Soldier (2012–2013)','Зимний солдат (2012–2013)','cap_series','2012-02-01','d/db/Winter_Soldier_Vol_1_1.jpg/revision/latest?cb=20210404052449',null,['winter_soldier_616','black_widow_616']);
  K('cap_vol7','Captain America Vol. 7 (2012–2014)','Капитан Америка. Том 7 (2012–2014)','cap_series','2012-11-01','5/52/Captain_America_Vol_7_1.jpg/revision/latest?cb=20120810183429',null,['cap_616']);
  K('cap_sam_wilson','Captain America: Sam Wilson (2015–2017)','Капитан Америка: Сэм Уилсон (2015–2017)','cap_series','2015-10-01','f/fa/Captain_America_Sam_Wilson_Vol_1_1.jpg/revision/latest?cb=20151008145839','story_the_falcon_and_the_winter_soldier',['falcon_616']);
  K('cap_usa','The United States of Captain America (2021)','Соединённые Штаты Капитана Америки (2021)','cap_series','2021-06-01','1/10/United_States_of_Captain_America_Vol_1_1.jpg/revision/latest?cb=20210628034843','story_captain_america_brave_new_world',['cap_616','falcon_616','isaiah_bradley']);
  // Космос
  K('cosmic_silver_surfer','Silver Surfer (1968)','Серебряный Сёрфер (1968)','cosmic_series','1968-08-01','d/d2/Silver_Surfer_Vol_1_1.jpg/revision/latest?cb=20200111221042','story_the_fantastic_four_first_steps',['silver_surfer_616','galactus_616']);
  K('cosmic_warlock','Warlock (1972–1976)','Адам Уорлок (1972–1976)','cosmic_series','1972-08-01','9/99/Warlock_Vol_1_1.jpg/revision/latest?cb=20180301045054',null,['adam_warlock_616','thanos_616']);
  K('cosmic_captain_marvel','Captain Marvel (1968–1979)','Капитан Марвел (1968–1979)','cosmic_series','1968-05-01','9/92/Captain_Marvel_Vol_1_1.jpg/revision/latest?cb=20190505061649',null,['carol_616']);
  K('cosmic_nova','Nova (1976–1979)','Нова (1976–1979)','cosmic_series','1976-09-01','6/6a/Nova_Vol_1_1.jpg/revision/latest?cb=20180430022949',null,['nova_616']);
  K('cosmic_gotg2008','Guardians of the Galaxy (2008–2010)','Стражи Галактики (2008–2010)','cosmic_series','2008-05-01','7/70/Guardians_of_the_Galaxy_Vol_1_1.jpg/revision/latest?cb=20241217105554','story_guardians_of_the_galaxy_film',['star_lord','gamora','drax_the_destroyer','rocket_raccoon','groot']);
  K('cosmic_eternals','Eternals (1976–1978)','Вечные (1976–1978)','cosmic_series','1976-07-01','1/13/Eternals_Vol_1_1.jpg/revision/latest?cb=20160430071246','story_eternals_film',['ikaris','sersi','thena']);
  K('cosmic_ms_marvel','Ms. Marvel (2006–2010)','Мисс Марвел (2006–2010)','cosmic_series','2006-03-01','1/1c/Ms._Marvel_Vol_2_1.jpg/revision/latest?cb=20251207220325',null,['carol_616']);
  K('cosmic_captain_marvel2012','Captain Marvel — Кэрол Дэнверс (2012–2013)','Капитан Марвел — Кэрол Дэнверс (2012–2013)','cosmic_series','2012-07-01','e/e5/Captain_Marvel_Vol_7_1.jpg/revision/latest?cb=20120713051932','story_captain_marvel_film',['carol_616','ms_marvel_616']);
  // Улицы Нью-Йорка
  K('street_daredevil','Daredevil Vol. 1 (1964–1998)','Сорвиголова. Том 1 (1964–1998)','street_series','1964-04-01','7/7c/Daredevil_Vol_1_1.jpg/revision/latest?cb=20251207203058',null,['daredevil_616','elektra_616','kingpin_616']);
  K('street_moon_knight','Moon Knight (1980–1984)','Лунный рыцарь (1980–1984)','street_series','1980-11-01','9/97/Moon_Knight_Vol_1_1.jpg/revision/latest?cb=20180418010757','story_moon_knight_tv_series',['moon_knight_616']);
  K('street_elektra_assassin','Elektra: Assassin (1986–1987)','Электра: Убийца (1986–1987)','street_series','1986-08-01','9/9a/Elektra_Assassin_Vol_1_1.jpg/revision/latest?cb=20200512224443',null,['elektra_616','daredevil_616']);
  K('street_punisher','The Punisher Vol. 2 (1987–1995)','Каратель. Том 2 (1987–1995)','street_series','1987-07-01','f/f6/Punisher_Vol_2_1.jpg/revision/latest?cb=20250812233451','story_the_punisher_s1',['punisher_616','kingpin_616']);
  K('street_power_man_iron_fist','Power Man and Iron Fist (1978–1986)','Люк Кейдж и Железный кулак (1978–1986)','street_series','1978-04-01','1/13/Power_Man_and_Iron_Fist_Vol_1_50.jpg/revision/latest?cb=20260102112846','story_luke_cage_tv_series_s1',['luke_cage_616','iron_fist_616']);
  K('street_alias','Alias — Джессика Джонс (2001–2004)','Alias — Джессика Джонс (2001–2004)','street_series','2001-11-01','e/ed/Alias_Vol_1_1.jpg/revision/latest?cb=20160422193727','story_jessica_jones_tv_series_s1',['jessica_jones_616','luke_cage_616']);
  K('street_immortal_iron_fist','The Immortal Iron Fist (2006–2009)','Бессмертный Железный кулак (2006–2009)','street_series','2006-11-01','3/3a/Immortal_Iron_Fist_Vol_1_1.jpg/revision/latest?cb=20250823211406','story_iron_fist_tv_series_s1',['iron_fist_616']);
  K('street_blade','Blade (1998–2006)','Блэйд (1998–2006)','street_series','1998-01-01','f/f2/Blade_Vol_4_1.jpg/revision/latest?cb=20100720203922',null,['blade_616']);
  K('street_defenders','The Defenders (2017)','Защитники (2017)','street_series','2017-06-01','e/e9/Defenders_Vol_1_1.jpg/revision/latest?cb=20260305101514','story_the_defenders',['daredevil_616','luke_cage_616','iron_fist_616','jessica_jones_616']);
  // порядок колонок и подписи линеек
  const oldRu = Object.assign({}, DATA.comics.line_labels_ru), oldEn = Object.assign({}, DATA.comics.line_labels_en);
  const ORDER = ['movie_preludes','adaptations','spider_series','x_men_series','iron_man_series','thor_series','cap_series','cosmic_series','avengers_series','street_series','first_appearances','classic_events'];
  const RU = {thor_series:'Тор: серии', cap_series:'Капитан Америка: серии', cosmic_series:'Космос: серии', street_series:'Защитники улиц: серии'};
  const EN = {thor_series:'Thor Series', cap_series:'Captain America Series', cosmic_series:'Cosmic Series', street_series:'Street-Level Series'};
  const ru = DATA.comics.line_labels_ru, en = DATA.comics.line_labels_en;
  for (const k in ru) delete ru[k]; for (const k in en) delete en[k];
  ORDER.forEach(k=>{ ru[k] = RU[k] || oldRu[k] || k; en[k] = EN[k] || oldEn[k] || k; });
  // добавить узлы и хронологические рёбра новых линеек
  DATA.comics.nodes.push.apply(DATA.comics.nodes, N);
  ['thor_series','cap_series','cosmic_series','street_series'].forEach(line=>{
    const items = DATA.comics.nodes.filter(c=>c.line===line).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
    for (let i=1;i<items.length;i++) DATA.comics.edges.push({source:items[i-1].id, target:items[i].id, type:'sequence'});
  });
  // цвета новых линеек
  if (typeof LINE_COLORS !== 'undefined') Object.assign(LINE_COLORS, {thor_series:'#4fc3f7', cap_series:'#42a5f5', cosmic_series:'#ffca28', street_series:'#7e57c2'});
})();

const comicNodes = ((DATA.comics && DATA.comics.nodes) || []).map(d=>Object.assign({},d));
const comicLinksRaw = ((DATA.comics && DATA.comics.edges) || []).map(d=>Object.assign({},d));

const charById = new Map(charNodes.map(d=>[d.id,d]));
const storyById = new Map(storyNodes.map(d=>[d.id,d]));
const comicById = new Map(comicNodes.map(d=>[d.id,d]));
let activeComicLines = new Set(Object.keys(LINE_LABELS_RU));

let activeEdgeTypesChar = new Set(['team','family','romantic','ally','enemy','variant']);
let activeGroups = new Set(Object.keys(GROUP_COLORS));
let activeUniverses = new Set(UNIVERSE_ORDER);
let CHAR_LAYOUT = 'force'; // 'force' | 'universe'
let activeEdgeTypesStory = new Set(['chronology']); // shared_characters off by default to reduce clutter
let activePhases = new Set(Object.keys(PHASE_COLORS));
let activeStoryTypes = new Set(['movie','tv_series','one_shot']);

const svg = d3.select('#graph');
const g = svg.append('g');
const zoomBehavior = d3.zoom().scaleExtent([0.1,5]).on('zoom', ev => { g.attr('transform', ev.transform); svg.classed('far', ev.transform.k < 0.4); });
svg.call(zoomBehavior);
svg.on('click', ()=>{ clearSelection(); });
function dims(){ return [window.innerWidth, window.innerHeight]; }

let sim, linkSel, nodeSel, currentNodes, currentLinks;
let selectedId = null, selectedConnected = null;

// ---------- v6: локальное хранилище (с защитой от file:// ограничений) ----------
const store = {
  get(k, def){ try { const v = localStorage.getItem('mum6_'+k); return v===null ? def : JSON.parse(v); } catch(e){ return def; } },
  set(k, v){ try { localStorage.setItem('mum6_'+k, JSON.stringify(v)); } catch(e){} }
};
const REDUCED_MOTION = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// ---------- v6: поиск пути между персонажами ----------
let pathMode = null, pathSet = null, pathEdgeSet = null;
const pathBanner = document.getElementById('path-banner');
function startPath(fromId){
  pathMode = fromId; pathSet = null; pathEdgeSet = null;
  pathBanner.textContent = UI().path_banner + ' · ' + UI().path_esc;
  pathBanner.style.display = 'block';
  detailEl.style.display = 'none';
}
function clearPath(){
  pathMode = null; pathSet = null; pathEdgeSet = null;
  pathBanner.style.display = 'none';
  if (MODE==='characters' && nodeSel) { nodeSel.classed('path-on', false); linkSel.classed('path-on', false); updateVisibilityChar(); }
}
function bfsPath(a, b){
  if (a===b) return [a];
  const adj = new Map();
  charLinks.forEach(l=>{
    const s = l.source.id||l.source, t = l.target.id||l.target;
    if(!adj.has(s)) adj.set(s, []); if(!adj.has(t)) adj.set(t, []);
    adj.get(s).push(t); adj.get(t).push(s);
  });
  const prev = new Map([[a, null]]); let frontier = [a];
  while (frontier.length){
    const next = [];
    for (const u of frontier){
      for (const v of (adj.get(u)||[])){
        if (prev.has(v)) continue;
        prev.set(v, u);
        if (v===b){ const path=[b]; let cur=u; while(cur!==null){ path.push(cur); cur=prev.get(cur); } return path.reverse(); }
        next.push(v);
      }
    }
    frontier = next;
  }
  return null;
}
function finishPath(target){
  const from = pathMode; pathMode = null;
  pathBanner.style.display = 'none';
  const path = bfsPath(from, target.id||target);
  const u = UI();
  if (!path){ pathBanner.textContent = u.path_none; pathBanner.style.display='block'; setTimeout(()=>{ pathBanner.style.display='none'; }, 2500); return; }
  pathSet = new Set(path);
  pathEdgeSet = new Set();
  for (let k=0;k<path.length-1;k++){ pathEdgeSet.add(path[k]+'|'+path[k+1]); pathEdgeSet.add(path[k+1]+'|'+path[k]); }
  selectedId = null; selectedConnected = null;
  nodeSel.classed('path-on', d=>pathSet.has(d.id));
  linkSel.classed('path-on', l=>pathEdgeSet.has((l.source.id||l.source)+'|'+(l.target.id||l.target)));
  updateVisibilityChar();
  let h = '<h2>'+u.path_res+' · '+(path.length-1)+'</h2>';
  h += path.map((cid,idx)=>{
    const c = charById.get(cid); if(!c) return '';
    const nm = LANG==='ru'?c.name_ru:c.name;
    return '<div class="rel-item" data-goto="'+cid+'"><span>'+(idx+1)+'. '+nm+'</span><span class="lbl" style="color:'+(UNIVERSE_COLORS[c.universe]||'#888')+'">'+(UNIVERSE_LABELS()[c.universe]||'').split(' · ')[0]+'</span></div>';
  }).join('');
  h += '<div style="color:var(--text-dim);font-size:11px;margin-top:8px">'+u.path_esc+'</div>';
  const endC = charById.get(path[path.length-1]);
  if (endC && endC.image) { detailImg.src = thumbUrl(endC.image,340); detailImg.style.display='block'; } else { detailImg.style.display='none'; }
  detailBody.innerHTML = h; detailEl.style.display='block';
  detailBody.querySelectorAll('[data-goto]').forEach(el=>el.addEventListener('click',()=>{
    const nd = charById.get(el.getAttribute('data-goto')); if(nd){ clearPath(); showCharDetail(nd); focusNode(nd); applySelection(nd.id); } }));
}

// ---------- v6: прогрессивная загрузка изображений-узлов ----------
let lazyGen = 0;
function runLazyPatterns(tasks){
  const gen = ++lazyGen;
  let idx = 0;
  const CHUNK = 24;
  function step(){
    if (gen !== lazyGen) return;
    const slice = tasks.slice(idx, idx+CHUNK);
    slice.forEach(t=>t());
    idx += CHUNK;
    if (idx < tasks.length) schedule();
  }
  function schedule(){
    if (window.requestIdleCallback) requestIdleCallback(step, {timeout:400});
    else setTimeout(step, 40);
  }
  schedule();
}

function computeConnected(id, links){
  const s = new Set([id]);
  links.forEach(l=>{ const a=l.source.id||l.source, b=l.target.id||l.target; if(a===id) s.add(b); if(b===id) s.add(a); });
  return s;
}
function applyVisibility(){
  if (MODE==='characters') updateVisibilityChar();
  else if (MODE==='comics') updateVisibilityComics();
  else updateVisibilityStory();
}
function applySelection(id){
  selectedId = id;
  selectedConnected = computeConnected(id, currentLinks);
  applyVisibility();
  try { history.replaceState(null, '', '#'+id); } catch(e){}
}
function clearSelection(){
  try { history.replaceState(null, '', location.pathname + location.search); } catch(e){}
  if (selectedId===null) return;
  selectedId = null; selectedConnected = null;
  applyVisibility();
  detailEl.style.display = 'none';
}

function charRadius(d){ return Math.max(6, Math.min(24, 5 + Math.sqrt(d.degree||1)*3.6)); }
function storyRadius(d){ return Math.max(6, Math.min(26, 6 + Math.sqrt(d.char_count||1)*3)); }

function clearGraph(){
  if (sim) sim.stop();
  g.selectAll('*').remove();
  svg.selectAll('defs').remove();
}

function computeClusterCenters(){
  const [w,h] = dims();
  // STAR layout: MCU (Earth-199999) is the hub in the centre, every other universe
  // radiates outward like a ray. Each cluster is sized by how many characters it holds.
  const counts = {};
  UNIVERSE_ORDER.forEach(u=>counts[u]=0);
  charNodes.forEach(nd=>{ if(counts[nd.universe]!=null) counts[nd.universe]++; });
  const rad = {};
  UNIVERSE_ORDER.forEach(u=>{ rad[u] = Math.max(130, 70 + Math.sqrt(counts[u]||1)*58); });
  const cx = w/2, cy = h/2;
  const hub = (counts['Earth-199999']!=null) ? 'Earth-199999' : UNIVERSE_ORDER[0];
  const sats = UNIVERSE_ORDER.filter(u=>u!==hub);
  const maxSat = sats.length ? Math.max.apply(null, sats.map(u=>rad[u])) : 200;
  // ring radius: far enough that satellites clear the hub AND don't overlap each other
  const R = Math.max(rad[hub] + maxSat + 230,
                     sats.length * (2*maxSat + 140) / (2*Math.PI));
  const centers = {};
  centers[hub] = [cx, cy, rad[hub]];
  sats.forEach((u,i)=>{
    const ang = -Math.PI/2 + (i / sats.length) * 2*Math.PI; // first ray points up
    centers[u] = [cx + R*Math.cos(ang), cy + R*Math.sin(ang), rad[u]];
  });
  centers._hub = hub; centers._cx = cx; centers._cy = cy; centers._R = R;
  centers._fallback = [cx, cy, 200];
  return centers;
}
function buildCharGraph(){
  clearGraph();
  selectedId = null; selectedConnected = null;
  currentNodes = charNodes; currentLinks = charLinks;
  const clusterCenters = computeClusterCenters();
  sim = d3.forceSimulation(currentNodes);
  if (CHAR_LAYOUT === 'universe') {
    // group nodes into per-universe regions; weaken cross-universe (variant) links so
    // separate universes keep to their own clusters, and give nodes room (strong
    // collision + repulsion) so they spread out inside a cluster instead of squishing.
    currentNodes.forEach(nd=>{ const c=clusterCenters[nd.universe]||clusterCenters._fallback;
      nd.x = c[0] + (Math.random()-0.5)*c[2]*1.2; nd.y = c[1] + (Math.random()-0.5)*c[2]*1.2; });
    sim.force('link', d3.forceLink(currentLinks).id(d=>d.id).distance(64).strength(l=> l.type==='variant'?0.008:0.12))
       .force('charge', d3.forceManyBody().strength(-260))
       .force('x', d3.forceX(d=> (clusterCenters[d.universe]||clusterCenters._fallback)[0]).strength(0.16))
       .force('y', d3.forceY(d=> (clusterCenters[d.universe]||clusterCenters._fallback)[1]).strength(0.16))
       .force('collision', d3.forceCollide().radius(d=>charRadius(d)+14).strength(0.95));
    // pre-settle so the initial view is already spread out, not a moving blob
    sim.alpha(1); for (let k=0;k<200;k++) sim.tick();
  } else {
    // MCU (and every other universe) gets noticeably more breathing room here: this is
    // the default view, so tightly-packed clusters were the most visible complaint.
    sim.force('link', d3.forceLink(currentLinks).id(d=>d.id).distance(l=>72+(l.type==='team'?14:0)).strength(0.28))
       .force('charge', d3.forceManyBody().strength(-320))
       .force('center', d3.forceCenter(dims()[0]/2, dims()[1]/2))
       // gentle pull toward the middle so small/loosely-connected clusters (e.g. Eternals)
       // don't get flung out to the edges by charge repulsion and become hard to find
       .force('x', d3.forceX(dims()[0]/2).strength(0.03))
       .force('y', d3.forceY(dims()[1]/2).strength(0.03))
       .force('collision', d3.forceCollide().radius(d=>charRadius(d)+11).strength(0.9));
  }

  const defs = svg.append('defs');
  if (CHAR_LAYOUT === 'universe') {
    // universe/cluster labels only — no rays connecting them to the hub (they read as noise)
    const gl = g.append('g').attr('class','uni-labels');
    UNIVERSE_ORDER.forEach(u=>{
      const c = clusterCenters[u]; if(!c) return;
      const full = UNIVERSE_LABELS()[u] || u;
      const parts = full.split(' · ');
      const t = gl.append('text').attr('class','uni-label').attr('x', c[0]).attr('y', c[1]-c[2]+4).attr('text-anchor','middle');
      t.append('tspan').attr('fill', UNIVERSE_COLORS[u]).text(parts[0]);
      if (parts[1]) t.append('tspan').attr('class','sub').attr('x', c[0]).attr('dy','1.15em').text(parts[1]);
    });
  }
  linkSel = g.append('g').attr('class','links').selectAll('line').data(currentLinks).join('line')
    .attr('class','link')
    .attr('stroke', d=>EDGE_COLORS[d.type]||'#888')
    .attr('stroke-width', d=>d.type==='team'?1:1.4)
    .attr('stroke-dasharray', d=>d.type==='enemy'?'4,3':null);

  nodeSel = g.append('g').attr('class','nodes').selectAll('g.node').data(currentNodes).join('g').attr('class','node')
    .call(drag(sim));

  const lazyTasks = [];
  nodeSel.each(function(d){
    const sel = d3.select(this);
    const r = charRadius(d);
    const uColor = UNIVERSE_COLORS[d.universe] || '#999';
    sel.append('circle').attr('r', r).attr('fill', GROUP_COLORS[d.group]||'#999');
    // universe is always shown as the node's colored ring
    sel.append('circle').attr('class','ring').attr('r', r).attr('fill','none')
       .attr('stroke', uColor).attr('stroke-width', 2.6);
    if (d.image) {
      lazyTasks.push(()=>{
        // HTML <img> inside <foreignObject>, clipped with CSS border-radius, instead of an
        // SVG <image> inside a <clipPath>. iOS Safari has long-standing bugs where SVG
        // <image>/<pattern> elements silently fail to paint (especially when inserted
        // asynchronously via requestIdleCallback/setTimeout, as these are here) — a plain
        // HTML <img> does not hit that code path and reliably paints on real iPhones.
        const fo = sel.insert('foreignObject', 'circle.ring')
          .attr('x', -r).attr('y', -r).attr('width', r*2).attr('height', r*2)
          .attr('pointer-events','none')
          .style('overflow','visible');
        const imgEl = fo.append('xhtml:img')
          .attr('src', thumbUrl(d.image,90))
          .attr('loading','lazy')
          .attr('draggable','false')
          .style('width', (r*2)+'px').style('height', (r*2)+'px')
          .style('border-radius','50%')
          .style('object-fit','cover')
          .style('display','block')
          .style('pointer-events','none');
        // if the thumbnail URL 404s, times out, or is blocked (flaky mobile connections
        // hit this far more than desktop) — hide the broken-image icon and fall back to
        // the plain colored circle underneath instead of showing a broken-image glyph.
        // Also retry once with the full-resolution original URL, since Fandom's
        // scale-to-width-down thumbnail endpoint occasionally 404s for some assets.
        imgEl.node().addEventListener('error', function onErr(){
          if (this.dataset.retried !== '1') {
            this.dataset.retried = '1';
            this.src = d.image;
          } else {
            fo.remove();
          }
        });
      });
    }
  });
  runLazyPatterns(lazyTasks);
  nodeSel.append('text').attr('x', d=>charRadius(d)+4).attr('y',3).text(d=> LANG==='ru'?d.name_ru:d.name);
  nodeSel.append('title').text(d=> LANG==='ru'?d.name_ru:d.name);
  nodeSel.on('click', (ev,d)=>{ ev.stopPropagation(); if (pathMode) { finishPath(d); return; } if (pathSet) clearPath(); showCharDetail(d); focusNode(d); applySelection(d.id); });

  sim.on('tick', ticked);
  updateVisibilityChar();
  if (CHAR_LAYOUT === 'universe') {
    ticked();
    fitViewToNodes(charNodes, dims()[0], dims()[1]);
    sim.alpha(0.03); // already pre-settled; keep it calm so the view doesn't drift
  } else if (IS_MOBILE) {
    // phones: pre-settle synchronously then stop the simulation so the CPU is free
    // for image decoding and touch interaction (continuous force sim tanks mobile perf)
    sim.alpha(1); for (let k=0;k<140;k++) sim.tick();
    ticked();
    fitViewToNodes(charNodes, dims()[0], dims()[1]);
    sim.alpha(0).stop();
  }
}

function storyYear(d){ return Math.max(1900, d.event_year || 2020); }
function storyYearLabel(y){ return y<1900 ? (LANG==='ru'?'др.':'anc.') : Math.round(y); }
function storyRectSize(d){
  const w = Math.max(34, Math.min(56, 16 + Math.sqrt(d.char_count||1)*4));
  return { w, h: w*1.5 };
}
function storyDash(d){ return d.type==='tv_series' ? '3,2' : (d.type==='one_shot' ? '1,3' : null); }

// Deterministic, fully static layout, grouped by MCU phase/era column.
// Every phase starts at the exact same top-left anchor point (fixes drift/misalignment).
// Within a phase, titles that happen at essentially the same in-universe moment are
// stacked directly under one another (with generous spacing); distinct successive
// moments step diagonally to the right, keeping the whole thing compact and readable.
const ANCIENT_CUTOFF = 1900; // anthology/flashback titles set in deep antiquity get their own column
function phaseLabelText(p){
  if (p === '__ancient__') return LANG==='ru' ? 'Древность' : 'Ancient past';
  return PHASE_LABELS()[p] || p;
}

const STORY_STEP_X = 80;          // horizontal step between distinct successive moments
const STORY_STACK_GAP_Y = 132;    // vertical gap between titles that happen in parallel (room for caption)
const STORY_MOMENT_THRESHOLD = 0.12; // in-universe years apart to be considered "the same moment"
const STORY_TOP_ANCHOR_Y = 90;

// Stories are split into horizontal BANDS, one per universe (MCU on top, then X-Men,
// then the animated What If…? multiverse, then the Spider-Man film universes). Inside the
// MCU band the phase-column layout is kept; other bands are a simple left-to-right row.
function storyBandOrder(){
  const order = ["Earth-199999","Earth-828","Earth-10005","What-If","Earth-89521","Earth-96283","Earth-120703","Spider-Verse","Earth-688","Earth-838","Earth-616","Beyond","Animation"];
  const present = new Set(storyNodes.map(d=>d.universe||"Earth-199999"));
  return order.filter(u=>present.has(u));
}
function layoutStoriesBanded(mode){
  const bandsU = storyBandOrder();
  const byU = {}; bandsU.forEach(u=>byU[u]=[]);
  storyNodes.forEach(d=>{ let u=d.universe||"Earth-199999"; if(!byU[u]) u="Earth-199999"; byU[u].push(d); });

  const leftMargin = 240, bandGap = 104, diagStepY = 14, colGap = 64, labelBuffer = 40;
  const bands = [], columns = [];
  let cursorY = STORY_TOP_ANCHOR_Y;

  let xScale = null;
  if (mode === 'chrono'){
    const ys = storyNodes.map(storyYear);
    const minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    const usableW = Math.max(1100, (maxY-minY)*42);
    xScale = d3.scaleLinear().domain([minY-0.6, maxY+0.6]).range([leftMargin, leftMargin+usableW]);
    const step = (maxY-minY) > 60 ? 10 : 5;
    for (let yy = Math.ceil(minY/step)*step; yy <= maxY; yy += step) columns.push({x:xScale(yy), label:String(yy), full:true});
  }

  bandsU.forEach(u=>{
    const items = byU[u].slice().sort((a,b)=>storyYear(a)-storyYear(b));
    const bandTop = cursorY;
    let maxY = bandTop;
    let mcuCols = null;
    if (mode === 'phase' && u === 'Earth-199999'){
      const byPhase = {}; items.forEach(d=>{ const pk = ((d.event_year||2020) < ANCIENT_CUTOFF) ? '__ancient__' : d.phase; (byPhase[pk]=byPhase[pk]||[]).push(d); });
      const pkeys = Object.keys(byPhase).sort((a,b)=>
        Math.min.apply(null, byPhase[a].map(storyYear)) - Math.min.apply(null, byPhase[b].map(storyYear)));
      let cursorX = leftMargin; mcuCols = [];
      pkeys.forEach((p, pi)=>{
        if (pi>0) mcuCols.push({x:cursorX - colGap/2 - labelBuffer/2, dividerOnly:true}); // separator between phases
        mcuCols.push({x:cursorX, label:phaseLabelText(p)});
        const its = byPhase[p].slice().sort((a,b)=>storyYear(a)-storyYear(b));
        let mm=-1, last=-Infinity, st=0, colW=0;
        its.forEach(d=>{ const y=storyYear(d);
          if (y-last>STORY_MOMENT_THRESHOLD){ mm++; st=0; } else { st++; }
          d.x = cursorX + mm*STORY_STEP_X;
          d.y = bandTop + mm*diagStepY + st*STORY_STACK_GAP_Y;
          colW = Math.max(colW, mm*STORY_STEP_X); maxY = Math.max(maxY, d.y); last=y; });
        cursorX += colW + labelBuffer + colGap;
      });
    } else if (mode === 'chrono'){
      let last=-Infinity, st=0;
      items.forEach(d=>{ const bx=xScale(storyYear(d));
        st = (bx-last < 74) ? st+1 : 0;
        d.x = bx; d.y = bandTop + st*STORY_STACK_GAP_Y; maxY = Math.max(maxY, d.y); last=bx; });
    } else {
      // phase mode, alternative universe: a single left-to-right row ordered by release year
      const stepX = 160;
      items.forEach((d,i)=>{ d.x = leftMargin + i*stepX; d.y = bandTop; maxY = Math.max(maxY, d.y); });
    }
    const bandBottom = maxY + STORY_STACK_GAP_Y;
    // MCU phase columns become vertical dividers/labels spanning just the MCU band
    if (mcuCols){
      mcuCols.forEach(c=>{
        columns.push({x:c.x, label:c.label, y1:bandTop-42, y2:bandBottom, phaseDivider:true, dividerOnly:c.dividerOnly});
      });
    }
    bands.push({u, top:bandTop-56, bottom:bandBottom, mid:(bandTop+bandBottom)/2 - 24, color:UNIVERSE_COLORS[u]||'#888'});
    cursorY = bandBottom + bandGap;
  });
  return { bands, columns, mode, leftMargin };
}
function layoutStoryByPhase(){ return layoutStoriesBanded('phase'); }
function layoutStoryChrono(w){ return layoutStoriesBanded('chrono'); }

function renderStoryFrame(){
  linkSel.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
  nodeSel.attr('transform', d=>`translate(${d.x},${d.y})`);
}

function buildStoryGraph(){
  clearGraph();
  selectedId = null; selectedConnected = null;
  sim = null;
  currentNodes = storyNodes; currentLinks = storyLinksRaw;
  currentLinks.forEach(l=>{ l.source = storyById.get(l.source.id||l.source); l.target = storyById.get(l.target.id||l.target); });

  const [w,h] = dims();
  const layout = STORY_LAYOUT==='phase' ? layoutStoryByPhase() : layoutStoryChrono(w);
  const { bands, columns, mode } = layout;

  const defs = svg.append('defs');

  const xsAll = storyNodes.map(d=>d.x);
  const contentLeft = 0;
  const contentRight = Math.max.apply(null, xsAll) + 340;
  const contentTop = (bands.length ? bands[0].top : 0) - 20;
  const contentBottom = (bands.length ? bands[bands.length-1].bottom : h) + 40;

  const axisG = g.append('g').attr('class','timeline-axis');
  // vertical guides: year ticks (chrono, full height) or MCU phase dividers+labels (phase mode)
  columns.forEach(c=>{
    if (c.full){
      axisG.append('line').attr('class','grid').attr('x1',c.x).attr('x2',c.x).attr('y1',contentTop).attr('y2',contentBottom);
      axisG.append('text').attr('class','grid-label').attr('x',c.x).attr('y',contentBottom+22).attr('text-anchor','middle').text(c.label);
    } else if (c.phaseDivider){
      // vertical separator line for the MCU phase, spanning only the MCU band
      axisG.append('line').attr('class','grid').attr('x1',c.x-30).attr('x2',c.x-30).attr('y1',c.y1).attr('y2',c.y2);
      if (!c.dividerOnly && c.label){
        axisG.append('text').attr('class','grid-label').attr('x',c.x).attr('y',c.y1-6)
          .attr('text-anchor','start').style('font-size','12px').text(c.label);
      }
    }
  });
  // horizontal universe bands: separator line + universe label on the left
  const bandG = g.append('g').attr('class','story-bands');
  bands.forEach(b=>{
    bandG.append('line').attr('x1',contentLeft).attr('x2',contentRight).attr('y1',b.top).attr('y2',b.top)
      .attr('stroke','#2a3040').attr('stroke-width',1).attr('stroke-dasharray','5,6').attr('stroke-opacity',0.85);
    const parts = (UNIVERSE_LABELS()[b.u]||b.u).split(' · ');
    const t = bandG.append('text').attr('class','band-label').attr('x',24).attr('y',b.mid);
    t.append('tspan').attr('x',24).attr('fill',b.color).attr('font-weight','700').text(parts[0]);
    if (parts[1]) t.append('tspan').attr('x',24).attr('dy','1.25em').attr('fill','var(--text-dim)').attr('font-size','11px').text(parts[1]);
  });

  linkSel = g.append('g').attr('class','links').selectAll('line').data(currentLinks).join('line')
    .attr('class','link')
    .attr('stroke', d=>EDGE_COLORS[d.type]||'#888')
    .attr('stroke-width', d=> d.type==='chronology' ? 2 : Math.min(4, 0.6+d.weight*0.35))
    .attr('stroke-dasharray', d=> d.type==='chronology' ? null : '2,3');

  nodeSel = g.append('g').attr('class','nodes').selectAll('g.node').data(currentNodes).join('g').attr('class','node');

  const lazyTasksS = [];
  nodeSel.each(function(d){
    const sel = d3.select(this);
    const { w:rw, h:rh } = storyRectSize(d);
    if (d.poster) {
      const body = sel.append('rect').attr('x',-rw/2).attr('y',-rh/2).attr('width',rw).attr('height',rh).attr('rx',7).attr('ry',7).attr('fill', PHASE_COLORS[d.phase]||'#888');
      lazyTasksS.push(()=>{
        sel.insert('image', 'rect.ring')
          .attr('href', thumbUrl(d.poster,110)).attr('xlink:href', thumbUrl(d.poster,110))
          .attr('x',-rw/2).attr('y',-rh/2).attr('width',rw).attr('height',rh)
          .attr('preserveAspectRatio','xMidYMid slice')
          .attr('pointer-events','none')
          .style('clip-path','inset(0 round 7px)');
      });
      sel.append('rect').attr('class','ring').attr('x',-rw/2).attr('y',-rh/2).attr('width',rw).attr('height',rh).attr('rx',7).attr('ry',7)
        .attr('fill','none').attr('stroke', PHASE_COLORS[d.phase]||'#888').attr('stroke-width',1.3).attr('stroke-opacity',0.75)
        .attr('stroke-dasharray', storyDash(d));
    } else {
      sel.append('rect').attr('x',-rw/2).attr('y',-rh/2).attr('width',rw).attr('height',rh).attr('rx',7).attr('ry',7)
        .attr('fill', PHASE_COLORS[d.phase]||'#888')
        .attr('stroke', d.type==='tv_series' ? '#fff' : '#0b0d14').attr('stroke-width', d.type==='tv_series'?2:1.5)
        .attr('stroke-dasharray', storyDash(d));
    }
  });
  runLazyPatterns(lazyTasksS);
  nodeSel.append('text').attr('x',0).attr('y', d=>storyRectSize(d).h/2+15).attr('text-anchor','middle')
    .text(d=> (LANG==='ru'?d.title_ru:d.title) + ' (' + storyYearLabel(storyYear(d)) + ')');
  nodeSel.append('title').text(d=> LANG==='ru'?d.title_ru:d.title);
  nodeSel.on('click', (ev,d)=>{ ev.stopPropagation(); showStoryDetail(d); focusNode(d); applySelection(d.id); });

  renderStoryFrame();
  updateVisibilityStory();
  // fit the whole banded chart, including the left universe-label gutter
  {
    const xs = storyNodes.map(d=>d.x);
    const minX = contentLeft - 20, maxX = contentRight;
    const minY = contentTop - 10, maxY = contentBottom + 30;
    const scale = Math.max(0.12, Math.min(1, w/(maxX-minX), h/(maxY-minY)) * 0.94);
    const tx = w/2 - scale*(minX+maxX)/2, ty = h/2 - scale*(minY+maxY)/2;
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(tx,ty).scale(scale));
  }
}

// zoom out just enough on load so all the nodes are visible at once
function fitViewToNodes(nodesArr, w, h){
  const xs = nodesArr.map(d=>d.x), ys = nodesArr.map(d=>d.y);
  const minX = Math.min(...xs)-40, maxX = Math.max(...xs)+260;
  const minYb = Math.min(...ys)-40, maxYb = Math.max(...ys)+40;
  const scale = Math.max(0.12, Math.min(1, w/(maxX-minX), h/(maxYb-minYb)) * 0.92);
  const tx = w/2 - scale*(minX+maxX)/2;
  const ty = h/2 - scale*(minYb+maxYb)/2;
  svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(tx,ty).scale(scale));
}
function fitStoryView(w,h){ fitViewToNodes(storyNodes, w, h); }

// ---------------- comics mode ----------------
function buildComicsGraph(){
  clearGraph();
  selectedId = null; selectedConnected = null;
  sim = null;
  currentNodes = comicNodes; currentLinks = comicLinksRaw;
  currentLinks.forEach(l=>{ l.source = comicById.get(l.source.id||l.source); l.target = comicById.get(l.target.id||l.target); });
  const defs = svg.append('defs');

  const [w,h] = dims();
  const lineKeys = Object.keys(LINE_LABELS_RU);
  const axisG = g.append('g').attr('class','timeline-axis');
  if (COMIC_LAYOUT === 'chrono') {
    // как в «Историях»: горизонтальные полосы по линейкам + общая ось лет по дате выхода
    const dateVal = d => { const dt = d.date || '2000-01-01'; return (+dt.slice(0,4)) + (((+dt.slice(5,7))||1)-1)/12; };
    const present = lineKeys.filter(ln => comicNodes.some(d=>d.line===ln));
    const ys = comicNodes.map(dateVal);
    const minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    const leftMargin = 250;
    const usableW = Math.max(2400, (maxY - minY) * 74);
    const xScale = d3.scaleLinear().domain([minY-0.6, maxY+0.6]).range([leftMargin, leftMargin+usableW]);
    const bandGap = 58, stackGapY = 104, diagStepY = 12, topAnchor = 96;
    const bands = [];
    let cursorY = topAnchor;
    present.forEach(ln=>{
      const items = comicNodes.filter(d=>d.line===ln).sort((a,b)=> (a.date||'').localeCompare(b.date||''));
      const bandTop = cursorY;
      let last = -Infinity, st = 0, maxY2 = bandTop;
      items.forEach(d=>{ const bx = xScale(dateVal(d));
        st = (bx - last < 58) ? st + 1 : 0;
        d.x = bx; d.y = bandTop + st*stackGapY; maxY2 = Math.max(maxY2, d.y); last = bx; });
      const bandBottom = maxY2 + stackGapY*0.4;
      bands.push({ln, top:bandTop-46, bottom:bandBottom, mid:(bandTop+bandBottom)/2 - 30, color:(LINE_COLORS[ln]||'#f2a900')});
      cursorY = bandBottom + bandGap;
    });
    const contentBottom = cursorY;
    // вертикальные линии лет во всю высоту
    const step = (maxY - minY) > 40 ? 10 : 5;
    for (let yy = Math.ceil(minY/step)*step; yy <= maxY; yy += step) {
      axisG.append('line').attr('class','grid').attr('x1',xScale(yy)).attr('x2',xScale(yy)).attr('y1',40).attr('y2',contentBottom);
      axisG.append('text').attr('class','grid-label').attr('x',xScale(yy)).attr('y',contentBottom+22).attr('text-anchor','middle').text(yy);
    }
    // полосы линеек: разделитель + подпись слева
    const bandG = g.append('g').attr('class','story-bands');
    const xsAll = comicNodes.map(d=>d.x);
    const rightX = Math.max.apply(null, xsAll) + 60;
    bands.forEach(b=>{
      bandG.append('line').attr('x1',0).attr('x2',rightX).attr('y1',b.top).attr('y2',b.top)
        .attr('stroke','#2a3040').attr('stroke-width',1).attr('stroke-dasharray','5,6').attr('stroke-opacity',0.85);
      bandG.append('text').attr('class','band-label').attr('x',24).attr('y',b.mid)
        .attr('fill',b.color).attr('font-weight','700').text(LINE_LABELS()[b.ln]||b.ln);
    });
  } else {
    const colGapX = 280, colX0 = 150, rowGap = 110, topY = 90;
    const colX = {}; lineKeys.forEach((ln,i)=>{ colX[ln] = colX0 + i*colGapX; });
    const colBottom = {};
    lineKeys.forEach(ln=>{
      const items = comicNodes.filter(d=>d.line===ln).sort((a,b)=> (a.date||'').localeCompare(b.date||''));
      items.forEach((d,i)=>{ d.x = colX[ln]; d.y = topY + i*rowGap; });
      colBottom[ln] = topY + items.length*rowGap;
    });
    axisG.selectAll('line.grid').data(lineKeys).join('line').attr('class','grid')
      .attr('x1', ln=>colX[ln]).attr('x2', ln=>colX[ln]).attr('y1', 55).attr('y2', ln=>colBottom[ln]);
    axisG.selectAll('text.grid-label').data(lineKeys).join('text').attr('class','grid-label')
      .attr('x', ln=>colX[ln]).attr('y', 38).attr('text-anchor','middle').style('font-size','13px')
      .text(ln=>LINE_LABELS()[ln]||ln);
  }

  linkSel = g.append('g').attr('class','links').selectAll('line').data(currentLinks).join('line')
    .attr('class','link').attr('stroke', '#546279').attr('stroke-width',1.6);

  nodeSel = g.append('g').attr('class','nodes').selectAll('g.node').data(currentNodes).join('g').attr('class','node');
  const lazyTasksC = [];
  nodeSel.each(function(d){
    const sel = d3.select(this);
    if (d.cover) {
      const body = sel.append('rect').attr('x',-26).attr('y',-34).attr('width',52).attr('height',68).attr('rx',6).attr('ry',6).attr('fill', (LINE_COLORS[d.line]||'#f2a900'));
      lazyTasksC.push(()=>{
        sel.insert('image', 'rect.ring')
          .attr('href', thumbUrl(d.cover,100)).attr('xlink:href', thumbUrl(d.cover,100))
          .attr('x',-26).attr('y',-34).attr('width',52).attr('height',68)
          .attr('preserveAspectRatio','xMidYMid slice')
          .attr('pointer-events','none')
          .style('clip-path','inset(0 round 6px)');
      });
      sel.append('rect').attr('class','ring').attr('x',-26).attr('y',-34).attr('width',52).attr('height',68).attr('rx',6).attr('ry',6)
        .attr('fill','none').attr('stroke', (LINE_COLORS[d.line]||'#f2a900')).attr('stroke-width',1.5);
    } else {
      sel.append('rect').attr('x',-26).attr('y',-34).attr('width',52).attr('height',68).attr('rx',6).attr('ry',6)
        .attr('fill', (LINE_COLORS[d.line]||'#f2a900')).attr('stroke','#0b0d14').attr('stroke-width',1.5);
    }
  });
  runLazyPatterns(lazyTasksC);
  nodeSel.append('text').attr('x',0).attr('y',48).attr('text-anchor','middle')
    .text(d=> LANG==='ru'?d.title_ru:d.title);
  nodeSel.append('title').text(d=> LANG==='ru'?d.title_ru:d.title);
  nodeSel.on('click', (ev,d)=>{ ev.stopPropagation(); showComicDetail(d); focusNode(d); applySelection(d.id); });

  renderStoryFrame();
  updateVisibilityComics();
  if (COMIC_LAYOUT === 'chrono') {
    // как «Истории»: центрируем весь банд-таймлайн, включая левый жёлоб с подписями
    const xs = comicNodes.map(d=>d.x), ys = comicNodes.map(d=>d.y);
    const minX = 0, maxX = Math.max(...xs)+80, minY = Math.min(...ys)-72, maxY = Math.max(...ys)+90;
    const scale = Math.max(0.12, Math.min(1, w/(maxX-minX), h/(maxY-minY)) * 0.95);
    const tx = w/2 - scale*(minX+maxX)/2, ty = h/2 - scale*(minY+maxY)/2;
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(tx,ty).scale(scale));
  } else {
    fitViewToNodes(comicNodes, w, h);
  }
}

function updateVisibilityComics(){
  const visible = new Set(); comicNodes.forEach(n=>{ if(activeComicLines.has(n.line)) visible.add(n.id); });
  nodeSel.classed('dimmed', d=> !visible.has(d.id) || (selectedConnected && !selectedConnected.has(d.id)) );
  linkSel.classed('dimmed', l=>{
    const nOk = visible.has(l.source.id||l.source) && visible.has(l.target.id||l.target);
    const selOk = !selectedConnected || (selectedConnected.has(l.source.id||l.source) && selectedConnected.has(l.target.id||l.target));
    return !(nOk && selOk);
  });
}

function showComicDetail(d){
  const u = UI();
  if (d.cover) { detailImg.src = thumbUrl(d.cover,340); detailImg.style.display='block'; } else { detailImg.style.display = 'none'; }
  const title = LANG==='ru'?d.title_ru:d.title;
  let h = `<h2>${title}</h2>`;
  h += `<div class="tag">${LINE_LABELS()[d.line]||d.line}</div>`;
  h += `<div class="sec-title">${u.sec_date}</div><div>${formatDate(d.date)}</div>`;
  if (d.tie_in) {
    const sn = storyById.get(d.tie_in);
    if (sn) {
      h += `<div class="sec-title">${u.sec_tie_in}</div><span class="tag link" data-goto-story2="${sn.id}">${LANG==='ru'?sn.title_ru:sn.title}</span>`;
    }
  }
  if (d.tie_in_chars && d.tie_in_chars.length) {
    h += `<div class="sec-title">${u.sec_chars}</div>`;
    for (const cid of d.tie_in_chars) {
      const c = charById.get(cid); if(!c) continue;
      h += `<span class="tag link" data-goto-char2="${cid}">${LANG==='ru'?c.name_ru:c.name}</span>`;
    }
  }
  h += `<div style="margin-top:12px"><a class="wiki" target="_blank" rel="noopener" href="${readSearchUrl(title)}">${ic('book')}${u.read_link}</a></div>`;
  detailBody.innerHTML = h; detailEl.style.display='block';
  detailBody.querySelectorAll('[data-goto-story2]').forEach(el=>el.addEventListener('click',()=>{
    const sn = storyById.get(el.getAttribute('data-goto-story2'));
    if (sn) { switchMode('stories'); setTimeout(()=>{ showStoryDetail(sn); focusNode(sn); applySelection(sn.id); }, 50); }
  }));
  detailBody.querySelectorAll('[data-goto-char2]').forEach(el=>el.addEventListener('click',()=>{
    const cc = charById.get(el.getAttribute('data-goto-char2'));
    if (cc) { switchMode('characters'); setTimeout(()=>{ showCharDetail(cc); focusNode(cc); applySelection(cc.id); }, 80); }
  }));
}

function ticked(){
  linkSel.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
  nodeSel.attr('transform', d=>`translate(${d.x},${d.y})`);
}

function drag(simulation){
  return d3.drag()
    .on('start',(ev,d)=>{ if(!ev.active) simulation.alphaTarget(0.25).restart(); d.fx=d.x; d.fy=d.y; })
    .on('drag',(ev,d)=>{ d.fx=ev.x; d.fy=ev.y; })
    .on('end',(ev,d)=>{ if(!ev.active) simulation.alphaTarget(0); d.fx=null; d.fy=null; });
}

function focusNode(d){
  const [w,h]=dims(); const scale=1.4;
  const t = d3.zoomIdentity.translate(w/2-d.x*scale, h/2-d.y*scale).scale(scale);
  svg.transition().duration(REDUCED_MOTION?0:500).call(zoomBehavior.transform, t);
}

function updateVisibilityChar(){
  const visible = new Set(); charNodes.forEach(n=>{ if(activeGroups.has(n.group) && activeUniverses.has(n.universe)) visible.add(n.id); });
  if (pathSet) {
    nodeSel.classed('dimmed', d=> !pathSet.has(d.id));
    linkSel.classed('dimmed', l=> !pathEdgeSet.has((l.source.id||l.source)+'|'+(l.target.id||l.target)));
    return;
  }
  nodeSel.classed('dimmed', d=> !visible.has(d.id) || (selectedConnected && !selectedConnected.has(d.id)) );
  linkSel.classed('dimmed', l=>{
    const typeOk = activeEdgeTypesChar.has(l.type);
    const nOk = visible.has(l.source.id||l.source) && visible.has(l.target.id||l.target);
    const selOk = !selectedConnected || (selectedConnected.has(l.source.id||l.source) && selectedConnected.has(l.target.id||l.target));
    return !(typeOk && nOk && selOk);
  });
}
function updateVisibilityStory(){
  const visible = new Set(); storyNodes.forEach(n=>{ if(activePhases.has(n.phase) && activeStoryTypes.has(n.type)) visible.add(n.id); });
  nodeSel.classed('dimmed', d=> !visible.has(d.id) || (selectedConnected && !selectedConnected.has(d.id)) );
  linkSel.classed('dimmed', l=>{
    const typeOk = activeEdgeTypesStory.has(l.type);
    const nOk = visible.has(l.source.id||l.source) && visible.has(l.target.id||l.target);
    const selOk = !selectedConnected || (selectedConnected.has(l.source.id||l.source) && selectedConnected.has(l.target.id||l.target));
    return !(typeOk && nOk && selOk);
  });
}

// ---------------- filters panel ----------------
const filtersEl = document.getElementById('filters');
function renderFilters(){
  const u = UI(); let h='';
  if (IS_MOBILE){
    // the mobile tab bar has no room for the desktop topbar's language control,
    // so it's rebuilt here, at the top of the filters content, on every render
    // (the layout switch — force/universe, phase/chrono, lines/chrono — lives in
    // its own bar above the main tab bar, see renderSublayout()). The close button
    // itself now lives once on #m-sheet (see MSheet), not duplicated here.
    h += `<div class="m-quick-lang"><select id="mf-lang" aria-label="Language / Язык">`
       + `<option value="en">EN · English</option><option value="ru">RU · Русский</option></select></div>`;
  }
  if (MODE==='characters'){
    h += `<h4>${u.filters_edges}</h4>`;
    for (const t of ['team','family','romantic','ally','enemy','variant']) h += `<div class="row" data-edge="${t}"><span class="sw" style="background:${EDGE_COLORS[t]}"></span>${EDGE_LABELS()[t]}</div>`;
    h += `<hr><h4>${u.filters_universe} <span class="toggle-all" id="toggle-all-uni">${u.toggle_all}</span></h4>`;
    for (const uk of UNIVERSE_ORDER) h += `<div class="row" data-uni="${uk}"><span class="sw circle" style="background:${UNIVERSE_COLORS[uk]}"></span>${UNIVERSE_LABELS()[uk]||uk}</div>`;
    h += `<hr><h4>${u.filters_groups} <span class="toggle-all" id="toggle-all-groups">${u.toggle_all}</span></h4>`;
    for (const gk of Object.keys(GROUP_COLORS)) h += `<div class="row" data-group="${gk}"><span class="sw circle" style="background:${GROUP_COLORS[gk]}"></span>${GROUP_LABELS()[gk]||gk}</div>`;
  } else if (MODE==='stories') {
    h += `<h4>${u.filters_edges}</h4>`;
    for (const t of ['chronology','shared_characters']) h += `<div class="row" data-edgeS="${t}"><span class="sw" style="background:${EDGE_COLORS[t]}"></span>${EDGE_LABELS()[t]}</div>`;
    h += `<hr><h4>${u.filters_type}</h4>`;
    for (const t of ['movie','tv_series','one_shot']) h += `<div class="row" data-stype="${t}"><span class="sw circle" style="background:#999"></span>${MEDIA_LABELS()[t]}</div>`;
    h += `<hr><h4>${u.filters_phase} <span class="toggle-all" id="toggle-all-phase">${u.toggle_all}</span></h4>`;
    for (const p of Object.keys(PHASE_COLORS)) h += `<div class="row" data-phase="${p}"><span class="sw circle" style="background:${PHASE_COLORS[p]}"></span>${PHASE_LABELS()[p]}</div>`;
  } else {
    h += `<h4>${u.filters_type}</h4>`;
    for (const ln of Object.keys(LINE_LABELS_RU)) h += `<div class="row" data-line="${ln}"><span class="sw circle" style="background:${LINE_COLORS[ln]||'#f2a900'}"></span>${LINE_LABELS()[ln]||ln}</div>`;
  }
  filtersEl.innerHTML = h;

  if (IS_MOBILE){
    const mfLang = document.getElementById('mf-lang');
    if (mfLang) { mfLang.value = LANG; mfLang.addEventListener('change', e=>switchLang(e.target.value)); }
  }

  filtersEl.querySelectorAll('[data-edge]').forEach(el=>{
    el.style.opacity = activeEdgeTypesChar.has(el.getAttribute('data-edge'))?1:0.35;
    el.addEventListener('click',()=>{ const t=el.getAttribute('data-edge');
      if(activeEdgeTypesChar.has(t)){activeEdgeTypesChar.delete(t); el.style.opacity=0.35;} else {activeEdgeTypesChar.add(t); el.style.opacity=1;}
      updateVisibilityChar(); });
  });
  filtersEl.querySelectorAll('[data-group]').forEach(el=>{
    el.style.opacity = activeGroups.has(el.getAttribute('data-group'))?1:0.35;
    el.addEventListener('click',()=>{ const gk=el.getAttribute('data-group');
      if(activeGroups.has(gk)){activeGroups.delete(gk); el.style.opacity=0.35;} else {activeGroups.add(gk); el.style.opacity=1;}
      updateVisibilityChar(); });
  });
  const tg = document.getElementById('toggle-all-groups');
  if (tg) tg.addEventListener('click',()=>{
    if(activeGroups.size===Object.keys(GROUP_COLORS).length) activeGroups.clear(); else activeGroups=new Set(Object.keys(GROUP_COLORS));
    filtersEl.querySelectorAll('[data-group]').forEach(el=>{ el.style.opacity = activeGroups.has(el.getAttribute('data-group'))?1:0.35; });
    updateVisibilityChar();
  });
  filtersEl.querySelectorAll('[data-uni]').forEach(el=>{
    el.style.opacity = activeUniverses.has(el.getAttribute('data-uni'))?1:0.35;
    el.addEventListener('click',()=>{ const uk=el.getAttribute('data-uni');
      if(activeUniverses.has(uk)){activeUniverses.delete(uk); el.style.opacity=0.35;} else {activeUniverses.add(uk); el.style.opacity=1;}
      updateVisibilityChar();
    });
  });
  const tu = document.getElementById('toggle-all-uni');
  if (tu) tu.addEventListener('click',()=>{
    if(activeUniverses.size===UNIVERSE_ORDER.length) activeUniverses.clear(); else activeUniverses=new Set(UNIVERSE_ORDER);
    filtersEl.querySelectorAll('[data-uni]').forEach(el=>{ el.style.opacity = activeUniverses.has(el.getAttribute('data-uni'))?1:0.35; });
    updateVisibilityChar();
  });

  filtersEl.querySelectorAll('[data-edgeS]').forEach(el=>{
    el.style.opacity = activeEdgeTypesStory.has(el.getAttribute('data-edgeS'))?1:0.35;
    el.addEventListener('click',()=>{ const t=el.getAttribute('data-edgeS');
      if(activeEdgeTypesStory.has(t)){activeEdgeTypesStory.delete(t); el.style.opacity=0.35;} else {activeEdgeTypesStory.add(t); el.style.opacity=1;}
      updateVisibilityStory(); });
  });
  filtersEl.querySelectorAll('[data-stype]').forEach(el=>{
    el.style.opacity = activeStoryTypes.has(el.getAttribute('data-stype'))?1:0.35;
    el.addEventListener('click',()=>{ const t=el.getAttribute('data-stype');
      if(activeStoryTypes.has(t)){activeStoryTypes.delete(t); el.style.opacity=0.35;} else {activeStoryTypes.add(t); el.style.opacity=1;}
      updateVisibilityStory(); });
  });
  filtersEl.querySelectorAll('[data-phase]').forEach(el=>{
    el.style.opacity = activePhases.has(el.getAttribute('data-phase'))?1:0.35;
    el.addEventListener('click',()=>{ const p=el.getAttribute('data-phase');
      if(activePhases.has(p)){activePhases.delete(p); el.style.opacity=0.35;} else {activePhases.add(p); el.style.opacity=1;}
      updateVisibilityStory(); });
  });
  const tp = document.getElementById('toggle-all-phase');
  if (tp) tp.addEventListener('click',()=>{
    if(activePhases.size===Object.keys(PHASE_COLORS).length) activePhases.clear(); else activePhases=new Set(Object.keys(PHASE_COLORS));
    filtersEl.querySelectorAll('[data-phase]').forEach(el=>{ el.style.opacity = activePhases.has(el.getAttribute('data-phase'))?1:0.35; });
    updateVisibilityStory();
  });

  filtersEl.querySelectorAll('[data-line]').forEach(el=>{
    el.style.opacity = activeComicLines.has(el.getAttribute('data-line'))?1:0.35;
    el.addEventListener('click',()=>{ const ln=el.getAttribute('data-line');
      if(activeComicLines.has(ln)){activeComicLines.delete(ln); el.style.opacity=0.35;} else {activeComicLines.add(ln); el.style.opacity=1;}
      updateVisibilityComics(); });
  });
}

// ---------------- detail panel ----------------
const detailEl = document.getElementById('detail');
const detailImg = document.getElementById('detail-img');
const detailBody = document.getElementById('detail-body');
document.getElementById('detail-close').addEventListener('click', ()=>{ detailEl.style.display='none'; clearSelection(); });

function showCharDetail(d){
  const u = UI();
  if (d.image) { detailImg.src = thumbUrl(d.image,340); detailImg.style.display='block'; } else { detailImg.style.display='none'; }
  const name = LANG==='ru'?d.name_ru:d.name; const real = LANG==='ru'?d.real_name_ru:d.real_name;
  let h = `<h2>${name}</h2>`;
  if (real && real!==name && real!=='—') h += `<div class="real">${real}</div>`;
  if (d.actor) h += `<a class="tag link" target="_blank" rel="noopener" href="${actorWikiUrl(d.actor)}" style="text-decoration:none;color:inherit">🎭 ${d.actor}</a>`;
  if (d.universe) h += `<div class="tag" style="border-color:${UNIVERSE_COLORS[d.universe]};color:${UNIVERSE_COLORS[d.universe]}">🌐 ${UNIVERSE_LABELS()[d.universe]||d.universe}</div>`;
  h += `<div class="tag" style="border-color:${GROUP_COLORS[d.group]}">${GROUP_LABELS()[d.group]||d.group}</div>`;
  if (d.affiliation && d.affiliation.length) { h += `<div class="sec-title">${u.sec_affil}</div>` + d.affiliation.map(a=>`<span class="tag">${a}</span>`).join(''); }
  const app = d.appearances||{};
  h += `<div class="sec-title">${u.sec_app} (${d.appearance_count||0})</div>`;
  for (const k of ['movie','tv_series']) {
    const list = app[k]||[];
    if (!list.length) continue;
    h += `<div style="margin-bottom:6px"><div style="color:var(--text-dim);font-size:10.5px;margin-bottom:3px">${MEDIA_LABELS()[k]} (${list.length})</div>`;
    h += list.map(t=>{
      const sid = 'story_' + t.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
      const sn = storyById.get(sid);
      if (sn) return `<span class="tag link" data-goto-story="${sid}">${LANG==='ru'?sn.title_ru:sn.title}</span>`;
      return `<span class="tag">${t}</span>`;
    }).join('');
    h += `</div>`;
  }
  for (const k of ['game','comic']) {
    const n = (app[k]||[]).length;
    if (n) h += `<div class="media-count"><span>${MEDIA_LABELS()[k]}</span><span>${n}</span></div>`;
  }
  const rel = charLinks.filter(l=>(l.source.id||l.source)===d.id || (l.target.id||l.target)===d.id);
  if (rel.length) {
    h += `<div class="sec-title">${u.sec_rel} (${rel.length})</div>`;
    rel.sort((a,b)=>a.type.localeCompare(b.type));
    for (const l of rel) {
      const otherId = (l.source.id||l.source)===d.id ? (l.target.id||l.target) : (l.source.id||l.source);
      const other = charById.get(otherId); if(!other) continue;
      const oname = LANG==='ru'?other.name_ru:other.name;
      h += `<div class="rel-item" data-goto="${other.id}"><span>${oname}</span><span class="lbl" style="color:${EDGE_COLORS[l.type]}">${EDGE_LABELS()[l.type]}${l.label?(' · '+l.label):''}</span></div>`;
    }
  }
  h += `<div><button class="act-btn" id="path-btn">${ic('navigation')}${u.path_btn}</button></div>`;
  h += `<div style="margin-top:10px"><a class="wiki" target="_blank" href="${d.wiki_url}">${u.wiki_link}</a></div>`;
  detailBody.innerHTML = h; detailEl.style.display='block';
  const pb = document.getElementById('path-btn');
  if (pb) pb.addEventListener('click', ()=>{ startPath(d.id); });
  detailBody.querySelectorAll('[data-goto]').forEach(el=>el.addEventListener('click',()=>{
    const nd = charById.get(el.getAttribute('data-goto')); if(nd){ showCharDetail(nd); focusNode(nd); applySelection(nd.id); } }));
  detailBody.querySelectorAll('[data-goto-story]').forEach(el=>el.addEventListener('click',()=>{
    const sn = storyById.get(el.getAttribute('data-goto-story')); if(sn){ switchMode('stories'); setTimeout(()=>{ showStoryDetail(sn); focusNode(sn); applySelection(sn.id); }, 50); } }));
}

function showStoryDetail(d){
  const u = UI();
  if (d.poster) { detailImg.src = thumbUrl(d.poster,340); detailImg.style.display='block'; } else { detailImg.style.display='none'; }
  const title = LANG==='ru'?d.title_ru:d.title;
  let h = `<h2>${title}</h2>`;
  const typeLabel = d.type==='movie' ? u.type_movie : (d.type==='one_shot' ? u.type_one_shot : u.type_tv);
  h += `<div class="tag">${typeLabel}</div>`;
  h += `<div class="tag" style="border-color:${PHASE_COLORS[d.phase]}">${PHASE_LABELS()[d.phase]||d.phase}</div>`;
  h += `<div class="sec-title">${u.sec_date}</div><div>${formatDate(d.date)}</div>`;
  if (d.event_year) {
    h += `<div class="sec-title">${u.sec_event_date}</div><div>${LANG==='ru'?d.event_date_ru:d.event_date_en}</div>`;
  }
  h += `<div style="margin-top:10px"><a class="wiki" target="_blank" rel="noopener" href="${watchSearchUrl(title)}">${ic('search')}${u.watch_link}</a></div>`;
  h += `<div class="sec-title">${u.sec_chars} (${d.characters.length})</div>`;
  for (const cid of d.characters) {
    const c = charById.get(cid); if(!c) continue;
    h += `<span class="tag link" data-goto-char="${cid}">${LANG==='ru'?c.name_ru:c.name}</span>`;
  }
  detailBody.innerHTML = h; detailEl.style.display='block';
  detailBody.querySelectorAll('[data-goto-char]').forEach(el=>el.addEventListener('click',()=>{
    const cn = charById.get(el.getAttribute('data-goto-char')); if(cn){ switchMode('characters'); setTimeout(()=>{ showCharDetail(cn); focusNode(cn); applySelection(cn.id); },50); } }));
}

// ---------------- search ----------------
const searchInput = document.getElementById('search');
const resultsEl = document.getElementById('search-results');
function searchAll(q){
  const u = UI();
  const res = [];
  const cm = charNodes.filter(n=> (LANG==='ru'?n.name_ru:n.name).toLowerCase().includes(q) || (n.real_name||'').toLowerCase().includes(q) || (n.real_name_ru||'').toLowerCase().includes(q) || (n.actor||'').toLowerCase().includes(q));
  const sm = storyNodes.filter(n=> (n.title_ru||'').toLowerCase().includes(q) || (n.title||'').toLowerCase().includes(q));
  const km = comicNodes.filter(n=> (n.title_ru||'').toLowerCase().includes(q) || (n.title||'').toLowerCase().includes(q));
  const groups = [ ['characters', u.cat_chars, cm], ['stories', u.cat_stories, sm], ['comics', u.cat_comics, km] ];
  groups.sort((a,b)=> (a[0]===MODE?-1:0) - (b[0]===MODE?-1:0));
  return groups;
}
searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  if(!q){ resultsEl.style.display='none'; return; }
  const groups = searchAll(q);
  let html = '', total = 0;
  for (const [mode, cat, items] of groups){
    if (!items.length) continue;
    const lim = items.slice(0, mode===MODE?8:5);
    html += `<div class="cat">${cat}</div>`;
    html += lim.map(m=>{
      const label = mode==='characters' ? (LANG==='ru'?m.name_ru:m.name) : (LANG==='ru'?m.title_ru:m.title);
      return `<div data-id="${m.id}" data-smode="${mode}">${label}</div>`;
    }).join('');
    total += lim.length;
  }
  if(!total){ resultsEl.style.display='none'; return; }
  resultsEl.innerHTML = html;
  resultsEl.style.display='block';
  resultsEl.querySelectorAll('[data-id]').forEach(el=>el.addEventListener('click',()=>{
    const id = el.getAttribute('data-id');
    const mode = el.getAttribute('data-smode');
    resultsEl.style.display='none'; searchInput.value='';
    const open = ()=>{
      if (mode==='characters'){ const nd=charById.get(id); if(nd){ if (pathMode){ finishPath(nd); return; } showCharDetail(nd); focusNode(nd); applySelection(nd.id);} }
      else if (mode==='stories'){ const nd=storyById.get(id); if(nd){showStoryDetail(nd); focusNode(nd); applySelection(nd.id);} }
      else { const nd=comicById.get(id); if(nd){showComicDetail(nd); focusNode(nd); applySelection(nd.id);} }
    };
    if (mode!==MODE && !(pathMode && mode==='characters')) { switchMode(mode); setTimeout(open, 80); } else open();
  }));
});
document.addEventListener('click',(ev)=>{ if(!ev.target.closest('#search-wrap')) resultsEl.style.display='none'; });

// ---------------- mode & lang switching ----------------
function switchMode(mode){
  MODE = mode;
  store.set('mode', mode);
  if (pathMode || pathSet) clearPath();
  document.querySelectorAll('#mode-switch button').forEach(b=>b.classList.toggle('active', b.getAttribute('data-mode')===mode));
  document.getElementById('story-layout-switch').classList.toggle('show', mode==='stories');
  document.getElementById('char-layout-switch').classList.toggle('show', mode==='characters');
  document.getElementById('comic-layout-switch').classList.toggle('show', mode==='comics');
  detailEl.style.display='none';
  refreshTexts();
  if (mode==='characters') buildCharGraph();
  else if (mode==='stories') buildStoryGraph();
  else buildComicsGraph();
}
function switchStoryLayout(layout){
  STORY_LAYOUT = layout;
  store.set('slayout', layout);
  document.querySelectorAll('#story-layout-switch button').forEach(b=>b.classList.toggle('active', b.getAttribute('data-slayout')===layout));
  detailEl.style.display='none';
  clearSelection();
  buildStoryGraph();
  document.getElementById('hint').textContent = UI().hint_stories + ' · ' + UI().hotkeys;
  renderSublayout();
}
function switchCharLayout(layout){
  CHAR_LAYOUT = layout;
  store.set('clayout', layout);
  document.querySelectorAll('#char-layout-switch button').forEach(b=>b.classList.toggle('active', b.getAttribute('data-clayout')===layout));
  detailEl.style.display='none';
  clearSelection();
  buildCharGraph();
  document.getElementById('hint').textContent = (CHAR_LAYOUT==='universe'?UI().hint_universe:UI().hint) + ' · ' + UI().hotkeys;
  renderSublayout();
}
function switchComicLayout(layout){
  COMIC_LAYOUT = layout;
  store.set('klayout', layout);
  document.querySelectorAll('#comic-layout-switch button').forEach(b=>b.classList.toggle('active', b.getAttribute('data-klayout')===layout));
  detailEl.style.display='none';
  clearSelection();
  buildComicsGraph();
  document.getElementById('hint').textContent = UI().hint_comics + ' · ' + UI().hotkeys;
  renderSublayout();
}
function switchLang(lang){
  LANG = lang;
  store.set('lang', lang);
  { const ls=document.getElementById('lang-select'); if(ls && ls.value!==lang) ls.value=lang; }
  refreshTexts();
  // stories & comics carry language-dependent band/axis labels, so rebuild them wholesale
  if (MODE==='stories') { buildStoryGraph(); return; }
  if (MODE==='comics') { buildComicsGraph(); return; }
  if (nodeSel) {
    nodeSel.select('text').text(d => LANG==='ru'?d.name_ru:d.name);
  }
}
function refreshTexts(){
  const u = UI();
  if (typeof localizeCredits === 'function') localizeCredits();
  document.getElementById('title-box').innerHTML = u.app_title + '<span id="stats"></span>';
  document.querySelector('[data-mode="characters"]').innerHTML = ic('users')+u.mode_chars;
  document.querySelector('[data-mode="stories"]').innerHTML = ic('film')+u.mode_stories;
  document.querySelector('[data-mode="comics"]').innerHTML = ic('bookOpen')+u.mode_comics;
  document.querySelector('[data-slayout="phase"]').textContent = u.layout_phase;
  document.querySelector('[data-slayout="chrono"]').textContent = u.layout_chrono;
  document.querySelector('[data-clayout="force"]').textContent = u.layout_force;
  document.querySelector('[data-clayout="universe"]').textContent = u.layout_universe;
  document.querySelector('[data-klayout="lines"]').textContent = u.layout_lines;
  document.querySelector('[data-klayout="chrono"]').textContent = u.layout_chrono;
  document.getElementById('comic-layout-switch').classList.toggle('show', MODE==='comics');
  document.getElementById('char-layout-switch').classList.toggle('show', MODE==='characters');
  document.getElementById('filters-toggle').innerHTML = ic('sliders')+u.filters_btn;
  searchInput.placeholder = MODE==='characters' ? u.search_ph : (MODE==='stories' ? u.search_ph_story : u.search_ph_comic);
  document.getElementById('hint').textContent = (MODE==='characters' ? (CHAR_LAYOUT==='universe'?u.hint_universe:u.hint) : (MODE==='stories' ? u.hint_stories : u.hint_comics)) + ' · ' + u.hotkeys;
  refreshStats();
  renderFilters();
  // mobile: tab bar labels (these have no desktop equivalent to piggy-back on)
  const tCh = document.querySelector('#m-tabbar [data-tab="characters"] [data-tab-label]'); if (tCh) tCh.textContent = u.m_tab_chars;
  const tSt = document.querySelector('#m-tabbar [data-tab="stories"] [data-tab-label]'); if (tSt) tSt.textContent = u.m_tab_stories;
  const tCo = document.querySelector('#m-tabbar [data-tab="comics"] [data-tab-label]'); if (tCo) tCo.textContent = u.m_tab_comics;
  const tFi = document.querySelector('#m-tabbar [data-tab="filters"] [data-tab-label]'); if (tFi) tFi.textContent = u.m_tab_filters;
  if (typeof MSheet !== 'undefined') MSheet.syncTabbar();
  renderSublayout();
}

// bar of two buttons sitting just above the main tab bar (mobile only, hidden on
// desktop via CSS) — shows the layout switch for whichever mode is active, so it's
// always one tap away instead of buried inside the filters sheet
function renderSublayout(){
  const el = document.getElementById('m-sublayout');
  if (!el) return;
  const u = UI();
  let h = '';
  if (MODE==='characters'){
    h = `<button data-sl="force" class="${CHAR_LAYOUT==='force'?'active':''}">${u.layout_force}</button>`
      + `<button data-sl="universe" class="${CHAR_LAYOUT==='universe'?'active':''}">${u.layout_universe}</button>`;
  } else if (MODE==='stories'){
    h = `<button data-sl="phase" class="${STORY_LAYOUT==='phase'?'active':''}">${u.layout_phase}</button>`
      + `<button data-sl="chrono" class="${STORY_LAYOUT==='chrono'?'active':''}">${u.layout_chrono}</button>`;
  } else {
    h = `<button data-sl="lines" class="${COMIC_LAYOUT==='lines'?'active':''}">${u.layout_lines}</button>`
      + `<button data-sl="chrono" class="${COMIC_LAYOUT==='chrono'?'active':''}">${u.layout_chrono}</button>`;
  }
  el.innerHTML = h;
  el.querySelectorAll('button').forEach(b=>b.addEventListener('click', ()=>{
    const v = b.getAttribute('data-sl');
    if (MODE==='characters') switchCharLayout(v);
    else if (MODE==='stories') switchStoryLayout(v);
    else switchComicLayout(v);
  }));
}
function refreshStats(){
  const u = UI();
  const statsEl = document.getElementById('stats');
  if (!statsEl) return;
  if (MODE==='characters') statsEl.textContent = charNodes.length+u.stats_chars+(new Set(charNodes.map(n=>n.universe)).size)+u.stats_uni+charLinks.length+u.stats_edges;
  else if (MODE==='stories') statsEl.textContent = storyNodes.length+u.stats_stories+storyLinksRaw.length+u.stats_edges;
  else statsEl.textContent = comicNodes.length+u.stats_comics+comicLinksRaw.length+u.stats_edges;
}

document.querySelectorAll('#mode-switch button').forEach(b=>b.addEventListener('click',()=>switchMode(b.getAttribute('data-mode'))));
document.getElementById('lang-select').addEventListener('change', e=>switchLang(e.target.value));
document.querySelectorAll('#story-layout-switch button').forEach(b=>b.addEventListener('click',()=>switchStoryLayout(b.getAttribute('data-slayout'))));
document.querySelectorAll('#char-layout-switch button').forEach(b=>b.addEventListener('click',()=>switchCharLayout(b.getAttribute('data-clayout'))));
document.querySelectorAll('#comic-layout-switch button').forEach(b=>b.addEventListener('click',()=>switchComicLayout(b.getAttribute('data-klayout'))));
document.getElementById('filters-toggle').addEventListener('click', ()=>{
  filtersEl.classList.toggle('mobile-open');
  document.getElementById('filters-toggle').classList.toggle('active', filtersEl.classList.contains('mobile-open'));
});

let resizeTimer = null;
window.addEventListener('resize', ()=>{
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(()=>{
    if (MODE==='characters') { if (CHAR_LAYOUT==='universe') { buildCharGraph(); } else if (sim) { sim.force('center', d3.forceCenter(dims()[0]/2, dims()[1]/2)); sim.alpha(0.3).restart(); } }
    else if (MODE==='stories') { buildStoryGraph(); }
    else { buildComicsGraph(); }
  }, 250);
});

// ---------- v6: окно «О проекте» / credits ----------
const creditsOverlay = document.getElementById('credits-overlay');
function localizeCredits(){
  if (LANG === 'en'){
    document.getElementById('cr-h-title').textContent = 'Marvel Multiverse Map';
    document.getElementById('cr-tagline').textContent = 'An interactive map of connections between Marvel characters, films, series and comics.';
    document.getElementById('cr-h-about').textContent = 'About';
    document.getElementById('cr-about').textContent = 'A visual entry point into the multiverse: who is connected to whom, how the universes overlap (MCU, Earth-616, Spider-Verse, Earth-828, Sony, Fox) and in what order to watch the films.';
    document.getElementById('cr-h-author').textContent = 'Author';
    document.getElementById('cr-author').innerHTML = '<b>Kirill Meshcheryakov</b> — concept, data collection &amp; curation, design.';
    document.getElementById('cr-h-tech').textContent = 'Built with';
    document.getElementById('cr-tech').textContent = 'HTML + vanilla JavaScript · graph rendered with D3.js v7 (force simulation, zoom, drag) · SVG · CSS variables · Feather icons · built and coded with Claude (Claude Cowork by Anthropic).';
    document.getElementById('cr-h-data').textContent = 'Data & images';
    document.getElementById('cr-h-contact').textContent = 'Contact';
    document.getElementById('cr-legal').textContent = 'Non-commercial fan project. Characters, names and artwork are property of Marvel / The Walt Disney Company. Code — MIT.';
    document.getElementById('credits-btn').innerHTML = ic('info')+'About';
  } else {
    document.getElementById('cr-h-title').textContent = 'Карта Мультивселенной Marvel';
    document.getElementById('cr-tagline').textContent = 'Интерактивная карта связей персонажей, фильмов, сериалов и комиксов Marvel.';
    document.getElementById('cr-h-about').textContent = 'О проекте';
    document.getElementById('cr-about').textContent = 'Наглядная «карта входа» в мультивселенную: кто с кем связан, как пересекаются вселенные (MCU, Земля-616, Spider-Verse, Земля-828, Sony, Fox) и в каком порядке смотреть фильмы.';
    document.getElementById('cr-h-author').textContent = 'Автор';
    document.getElementById('cr-author').innerHTML = '<b>Кирилл Мещеряков</b> — идея, сбор и выверка данных, дизайн.';
    document.getElementById('cr-h-tech').textContent = 'Технологии';
    document.getElementById('cr-tech').textContent = 'HTML + ванильный JavaScript · визуализация графа на D3.js v7 (force-simulation, zoom, drag) · SVG · CSS-переменные · иконки Feather · собрано и запрограммировано с помощью Claude (Claude Cowork от Anthropic).';
    document.getElementById('cr-h-data').textContent = 'Данные и изображения';
    document.getElementById('cr-h-contact').textContent = 'Связь';
    document.getElementById('cr-legal').textContent = 'Некоммерческий фан-проект. Персонажи, названия и изображения принадлежат Marvel / The Walt Disney Company. Код — MIT.';
    document.getElementById('credits-btn').innerHTML = ic('info')+'О проекте';
  }
}
// desktop-only: #credits-overlay is display:none!important on mobile (About there goes
// through MSheet.open('about', ...) instead, wired in setupMobileUI()).
document.getElementById('credits-btn').addEventListener('click', ()=>{ localizeCredits(); creditsOverlay.classList.add('show'); });
creditsOverlay.addEventListener('click', (ev)=>{
  if (ev.target === creditsOverlay || ev.target.closest('.cc-close')) creditsOverlay.classList.remove('show');
});

document.addEventListener('keydown', (ev)=>{
  const tag = (ev.target && ev.target.tagName) || '';
  if (ev.key === 'Escape') {
    if (creditsOverlay.classList.contains('show')) { creditsOverlay.classList.remove('show'); return; }
    resultsEl.style.display='none';
    if (pathMode || pathSet) { clearPath(); detailEl.style.display='none'; return; }
    detailEl.style.display='none'; clearSelection();
    return;
  }
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (ev.key === '/') { ev.preventDefault(); searchInput.focus(); return; }
  if (ev.key === '1') switchMode('characters');
  else if (ev.key === '2') switchMode('stories');
  else if (ev.key === '3') switchMode('comics');
  else if (ev.key === 'r' || ev.key === 'R' || ev.key === 'к' || ev.key === 'К') switchMode(MODE);
});

// восстановление состояния и deep-link
// если язык ещё не сохранён в localStorage — определяем его по языку браузера/ОС пользователя
function detectDefaultLang(){
  try {
    const langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];
    for (const l of langs) { if (l && l.toLowerCase().startsWith('ru')) return 'ru'; }
  } catch(e){}
  return 'en';
}
LANG = store.get('lang', null) || detectDefaultLang();
CHAR_LAYOUT = store.get('clayout', 'force');
STORY_LAYOUT = store.get('slayout', 'phase');
COMIC_LAYOUT = store.get('klayout', 'lines');
let bootMode = store.get('mode', 'characters');
let bootHash = null;
try { bootHash = decodeURIComponent((location.hash||'').slice(1)) || null; } catch(e){}
if (bootHash) {
  if (storyById.has(bootHash)) bootMode = 'stories';
  else if (comicById.has(bootHash)) bootMode = 'comics';
  else if (charById.has(bootHash)) bootMode = 'characters';
  else bootHash = null;
}
{ const ls=document.getElementById('lang-select'); if(ls) ls.value=LANG; }
document.querySelectorAll('#char-layout-switch button').forEach(b=>b.classList.toggle('active', b.getAttribute('data-clayout')===CHAR_LAYOUT));
document.querySelectorAll('#story-layout-switch button').forEach(b=>b.classList.toggle('active', b.getAttribute('data-slayout')===STORY_LAYOUT));
document.querySelectorAll('#comic-layout-switch button').forEach(b=>b.classList.toggle('active', b.getAttribute('data-klayout')===COMIC_LAYOUT));

// ---------- v6.5: mobile UI — single unified bottom sheet ----------
// NOTE: this MUST be declared before switchMode(bootMode) below, since switchMode ->
// refreshTexts() -> MSheet.syncTabbar() references it. A `const` declared further down
// the same scope is in the temporal dead zone until its own line runs, so calling
// switchMode() first (as this used to) threw "Cannot access 'MSheet' before initialization"
// and broke the entire app on load — this ordering fix is the whole point of this block's
// position here.
// Previously search/filters/detail/about each had their own sheet element, each with its
// own z-index and positioning rules that kept drifting out of sync (overlaps, gaps, stray
// panels peeking above the tab bar). Replaced with ONE sheet (#m-sheet) whose body content
// is swapped depending on what's open — one place to open/close/position/animate.
const MSheet = (function(){
  let sheetEl, imgEl, titleEl, bodyEl, backdrop, tabbar, filtersEl2;
  let current = null; // 'search' | 'filters' | 'detail' | 'about' | null
  // each panel's real content lives in its desktop-only home element; we borrow it into
  // the sheet body while open and give it back on close, so all existing IDs/handlers
  // elsewhere in the file (search-wrap, filters rows, detail-body, credits) keep working
  // completely unchanged — MSheet only ever relocates nodes, never rebuilds them.
  const homes = new Map(); // contentEl -> original parent, to restore on close

  function borrow(contentEl){
    if (!contentEl) return;
    homes.set(contentEl, contentEl.parentNode);
    bodyEl.appendChild(contentEl);
    // #filters (and #detail/#credits-overlay, defensively) carry a stylesheet-level
    // `display:none !important` so their desktop/legacy positioning never peeks through
    // anywhere else on mobile. A same-specificity override rule in the stylesheet turned
    // out not to be reliable enough in practice (still reportedly invisible after
    // deploying it) — an inline style with !important always wins over ANY author
    // stylesheet rule for that element, `!important` or not, per the CSS cascade, so set
    // it directly here instead of trusting a second stylesheet rule to out-rank the first.
    contentEl.style.setProperty('display', 'block', 'important');
  }
  function giveBack(){
    homes.forEach((parent, el)=>{
      if (parent && el.parentNode===bodyEl) parent.appendChild(el);
      el.style.removeProperty('display'); // undo the inline override from borrow()
    });
    homes.clear();
    bodyEl.innerHTML = '';
  }
  function syncTabbar(){
    // on desktop init() returns false before `tabbar` is ever assigned, but
    // refreshTexts() unconditionally calls MSheet.syncTabbar() on every mode/lang
    // switch — guard here so desktop doesn't throw on every refresh.
    if (!tabbar) return;
    tabbar.querySelectorAll('[data-tab]').forEach(b=>{
      const t = b.getAttribute('data-tab');
      const on = (t==='filters') ? current==='filters' : (t===MODE && current!=='filters');
      b.classList.toggle('active', on);
    });
  }
  function close(){
    if (!current) return;
    sheetEl.classList.remove('open');
    backdrop.classList.remove('show');
    document.body.classList.remove('m-sheet-open');
    if (current==='detail') clearSelection();
    current = null;
    giveBack();
    imgEl.style.display = 'none'; imgEl.removeAttribute('src');
    titleEl.textContent = '';
    syncTabbar();
  }
  // opts: { title, contentEl, imgSrc }
  function open(name, opts){
    giveBack();
    current = name;
    titleEl.textContent = (opts && opts.title) || '';
    if (opts && opts.imgSrc) { imgEl.src = opts.imgSrc; imgEl.style.display = 'block'; }
    else { imgEl.style.display = 'none'; imgEl.removeAttribute('src'); }
    if (opts && opts.contentEl) borrow(opts.contentEl);
    // Force a synchronous layout flush (reading offsetHeight forces the browser to
    // apply the DOM mutations from borrow() right now) before starting the transform
    // transition below. Without this, iOS Safari has been observed to open the sheet
    // (title/close button visible, since those are part of the sheet's own markup) but
    // leave the just-relocated content (#filters etc.) unpainted/uncomposited until the
    // user touches/scrolls the sheet — reported live: sheet slides up, body looks empty,
    // content "appears" only after a scroll gesture. Reading a layout property here
    // forces layout to happen before the transform transition starts, instead of the
    // browser potentially batching the DOM insert together with the transform and
    // deferring the repaint of the new content to whenever it feels like compositing it.
    void sheetEl.offsetHeight;
    sheetEl.classList.add('open');
    backdrop.classList.add('show');
    document.body.classList.add('m-sheet-open');
    syncTabbar();
  }
  function init(){
    if (!window.matchMedia || !window.matchMedia('(max-width:720px)').matches) return false;
    sheetEl = document.getElementById('m-sheet');
    imgEl = document.getElementById('m-sheet-img');
    titleEl = document.getElementById('m-sheet-title');
    bodyEl = document.getElementById('m-sheet-body');
    backdrop = document.getElementById('m-backdrop');
    tabbar = document.getElementById('m-tabbar');
    filtersEl2 = document.getElementById('filters');
    if (!sheetEl || !backdrop || !tabbar) return false;

    tabbar.querySelectorAll('[data-tab]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const t = b.getAttribute('data-tab');
        if (t === 'filters') {
          if (current==='filters') { close(); }
          else { open('filters', { title:UI().filters_btn, contentEl:filtersEl2 }); }
          return;
        }
        close();
        switchMode(t);
      });
    });
    document.getElementById('m-search-btn').addEventListener('click', ()=>{
      open('search', { title:UI().m_search_title, contentEl:document.getElementById('search-wrap') });
      setTimeout(()=>{ const s=document.getElementById('search'); if(s) s.focus(); }, 120);
    });
    document.getElementById('m-credits-btn').addEventListener('click', ()=>{
      localizeCredits();
      open('about', { title:'', contentEl:document.getElementById('cr-body') });
      // the About sheet also wants its big heading/tagline, which normally sit outside
      // #cr-body in the desktop card — clone their text in as the sheet title/body header
      const h = document.getElementById('cr-h-title'), tag = document.getElementById('cr-tagline');
      if (h) bodyEl.insertAdjacentHTML('afterbegin', `<h2>${h.textContent}</h2>` + (tag? `<div class="sub" style="margin-bottom:14px">${tag.textContent}</div>` : ''));
    });
    document.querySelectorAll('.m-sheet-close').forEach(b=> b.addEventListener('click', close));
    backdrop.addEventListener('click', close);
    // note: #detail-close itself stays inside the (hidden-on-mobile) #detail element and
    // never gets relocated into the sheet, so it needs no handler here — closing the
    // detail sheet on mobile goes through the shared .m-sheet-close button instead.
    // choosing a search result closes the search sheet
    bodyEl.addEventListener('click', (e)=>{ if (current==='search' && e.target.closest('#search-results [data-id]')) setTimeout(close, 80); });

    syncTabbar();
    return true;
  }
  return { init, open, close, get current(){ return current; }, syncTabbar:()=>syncTabbar() };
})();
function setupMobileUI(){
  if (!MSheet.init()) return;
  // detail cards are shown from many call sites (node clicks, path results, Esc, etc.) —
  // rather than patch every one to call MSheet.open, intercept at the single choke point:
  // showCharDetail/showStoryDetail/showComicDetail/finishPath all end by setting
  // detailBody's innerHTML and detailEl.style.display='block'. Observe that instead.
  //
  // IMPORTANT: MutationObserver callbacks run asynchronously (batched in a microtask),
  // NOT synchronously inside the code that changed the attribute. An earlier version of
  // this function tried to guard against re-entrancy with a boolean flag that was set
  // back to false immediately after writing detailEl.style.display — but since the
  // observer callback only fires later (as a microtask), the flag was always back to
  // false by the time it ran, so it suppressed nothing. The actual sequence was:
  //   1. showCharDetail() sets detailEl.style.display='block'
  //   2. observer fires: display==='block' -> MSheet.open('detail', ...) -> then we set
  //      detailEl.style.display='none' ourselves
  //   3. that write queues ANOTHER mutation record
  //   4. observer fires again: display==='none' AND MSheet.current==='detail' (we just
  //      set it) -> MSheet.close() -> which also runs clearSelection(), which sets
  //      detailEl.style.display='none' again
  //   5. net effect: the sheet opened and immediately closed itself in the same tick,
  //      so on a real device no card ever appeared to stay open.
  // Fix: track the display value we last reacted to and only act when it actually
  // changed from what we last saw, rather than reacting to every mutation record
  // (including ones we caused ourselves by writing the same property back).
  let lastSeen = detailEl.style.display;
  new MutationObserver(()=>{
    const now = detailEl.style.display;
    if (now === lastSeen) return; // our own write during the previous reaction, or a no-op
    lastSeen = now;
    if (now === 'block' && MSheet.current !== 'detail') {
      MSheet.open('detail', { contentEl: document.getElementById('detail-body-wrap'), imgSrc: detailImg.style.display!=='none' ? detailImg.src : null });
      lastSeen = 'none';
      detailEl.style.display = 'none'; // real #detail stays hidden; content now lives in the sheet
    } else if (now === 'none' && MSheet.current === 'detail') {
      MSheet.close();
    }
  }).observe(detailEl, { attributes:true, attributeFilter:['style'] });
}
setupMobileUI();

switchMode(bootMode);
if (bootHash) {
  setTimeout(()=>{
    if (bootMode==='characters'){ const nd=charById.get(bootHash); if(nd){ showCharDetail(nd); focusNode(nd); applySelection(nd.id); } }
    else if (bootMode==='stories'){ const nd=storyById.get(bootHash); if(nd){ showStoryDetail(nd); focusNode(nd); applySelection(nd.id); } }
    else { const nd=comicById.get(bootHash); if(nd){ showComicDetail(nd); focusNode(nd); applySelection(nd.id); } }
  }, 300);
}
}

function safeInit(){
  try { initApp(); } catch(err) {
    console.error(err);
    document.getElementById("app").innerHTML = "<div style=\"padding:40px;color:#fff;font-family:sans-serif;max-width:700px;line-height:1.6\"><b>Ошибка при запуске карты:</b><br><br><code style=\"color:#ff8a3d;white-space:pre-wrap\">" + (err && err.stack ? err.stack : String(err)) + "</code></div>";
  }
}
function bootApp(){
  if (typeof d3 !== "undefined") { safeInit(); return; }
  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js";
  s.onload = function(){ if (typeof d3 !== "undefined") safeInit(); else showBootError(); };
  s.onerror = showBootError;
  document.head.appendChild(s);
}
function showBootError(){
  document.getElementById("app").innerHTML = "<div style=\"padding:40px;color:#fff;font-family:sans-serif;max-width:600px;line-height:1.6\">Не удалось загрузить библиотеку d3.js из интернета — карта не может отобразиться.<br><br>Проверьте подключение к интернету и обновите страницу. Если у вас включён блокировщик рекламы/скриптов — попробуйте временно отключить его для этой страницы или откройте файл в другом браузере.</div>";
}
bootApp();

