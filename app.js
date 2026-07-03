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
        // a clipped <image> (same technique used for story posters/comic covers) is far
        // more reliably rendered across browsers than an SVG <pattern> with an <image>
        // inside it — WebKit/iOS Safari in particular has long-standing bugs where
        // pattern-filled images silently fail to paint, which is what caused character
        // photos to not show up on mobile.
        const cid = 'clip_'+d.id;
        defs.append('clipPath').attr('id',cid).append('circle').attr('r', r);
        sel.insert('image', 'circle.ring')
          .attr('href', thumbUrl(d.image,90)).attr('xlink:href', thumbUrl(d.image,90))
          .attr('x', -r).attr('y', -r).attr('width', r*2).attr('height', r*2)
          .attr('preserveAspectRatio','xMidYMid slice')
          .attr('clip-path', 'url(#'+cid+')')
          .attr('pointer-events','none');
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
