/*
 * Shared data-loading + count-computation logic used by both scripts/update-counts.js
 * (rewrites the hardcoded numbers in index.html) and scripts/generate-og-image.js
 * (redraws og-image.png with the same numbers). Kept in one place so the two never
 * drift apart from each other the way the hand-typed HTML numbers used to drift from
 * the actual data.
 *
 * Re-runs the exact injectMissingStories()/injectComicLines() IIFEs from app.js here
 * in plain Node (extracted verbatim, minus unused display-only fields like image URLs/
 * translated names — neither function touches `document`/`window`, both only mutate
 * the DATA object) so the counts this produces are guaranteed to match what a real
 * page load in the browser computes, not a hand-maintained approximation of it.
 */
const fs = require('fs');
const path = require('path');

function injectMissingStories(DATA) {
  if (DATA.stories.nodes.some(s => s.id === 'story_the_new_mutants')) return;
  const charIds = new Set(DATA.characters.nodes.map(c => c.id));
  const NC = [
    { id: 'mirage_new_mutants', universe: 'Earth-10005', group: 'x_men' },
    { id: 'wolfsbane_new_mutants', universe: 'Earth-10005', group: 'x_men' },
    { id: 'cannonball_new_mutants', universe: 'Earth-10005', group: 'x_men' },
    { id: 'magik_new_mutants', universe: 'Earth-10005', group: 'x_men' },
    { id: 'reed_richards_fox', universe: 'Earth-10005', group: 'fantastic_four' },
    { id: 'sue_storm_fox', universe: 'Earth-10005', group: 'fantastic_four' },
    { id: 'johnny_storm_fox', universe: 'Earth-10005', group: 'fantastic_four' },
    { id: 'ben_grimm_fox', universe: 'Earth-10005', group: 'fantastic_four' },
    { id: 'legion_fox', universe: 'Earth-10005', group: 'x_men' },
  ];
  NC.forEach(c => { if (!charIds.has(c.id)) { DATA.characters.nodes.push(c); charIds.add(c.id); } });
  if (charIds.has('professor_x_fox')) DATA.characters.edges.push({ source: 'legion_fox', target: 'professor_x_fox', type: 'family' });
  const nmTeam = ['mirage_new_mutants', 'wolfsbane_new_mutants', 'cannonball_new_mutants', 'magik_new_mutants'];
  for (let i = 1; i < nmTeam.length; i++) DATA.characters.edges.push({ source: nmTeam[0], target: nmTeam[i], type: 'team' });
  const ffTeam = ['reed_richards_fox', 'sue_storm_fox', 'johnny_storm_fox', 'ben_grimm_fox'];
  for (let i = 1; i < ffTeam.length; i++) DATA.characters.edges.push({ source: ffTeam[0], target: ffTeam[i], type: 'team' });
  const storyIds = new Set(DATA.stories.nodes.map(s => s.id));
  const NS = [
    { id: 'story_x_men_origins_wolverine', universe: 'Earth-10005', characters: ['wolverine_fox', 'sabretooth_fox', 'deadpool_fox'] },
    { id: 'story_the_new_mutants', universe: 'Earth-10005', characters: ['mirage_new_mutants', 'wolfsbane_new_mutants', 'cannonball_new_mutants', 'magik_new_mutants'] },
    { id: 'story_legion_tv_series', universe: 'Earth-10005', characters: ['legion_fox', 'professor_x_fox'] },
    { id: 'story_fantastic_four_2005', universe: 'Earth-10005', characters: ['reed_richards_fox', 'sue_storm_fox', 'johnny_storm_fox', 'ben_grimm_fox'] },
    { id: 'story_fantastic_four_rise_of_the_silver_surfer', universe: 'Earth-10005', characters: ['reed_richards_fox', 'sue_storm_fox', 'johnny_storm_fox', 'ben_grimm_fox'] },
  ];
  NS.forEach(s => {
    s.characters = (s.characters || []).filter(cid => charIds.has(cid));
    s.char_count = s.characters.length;
    if (!storyIds.has(s.id)) { DATA.stories.nodes.push(s); storyIds.add(s.id); }
  });
  const chronoPairs = [
    ['story_x_men_origins_wolverine', 'story_x_men_first_class'],
    ['story_the_wolverine', 'story_the_new_mutants'],
    ['story_fantastic_four_2005', 'story_fantastic_four_rise_of_the_silver_surfer'],
  ];
  chronoPairs.forEach(([a, b]) => { if (storyIds.has(a) && storyIds.has(b)) DATA.stories.edges.push({ source: a, target: b, type: 'chronology' }); });
}

function injectComicLines(DATA) {
  if (!DATA.comics || !DATA.comics.nodes) return;
  if (DATA.comics.nodes.some(c => c.line === 'thor_series')) return;
  const storyIds = new Set(DATA.stories.nodes.map(s => s.id));
  const charIds = new Set(DATA.characters.nodes.map(c => c.id));
  const N = [];
  const K = (id, line, tie, chars) => {
    const d = { id: 'comic_' + id, line };
    if (tie && storyIds.has(tie)) d.tie_in = tie;
    if (chars) { const cc = chars.filter(x => charIds.has(x)); if (cc.length) d.tie_in_chars = cc; }
    N.push(d);
  };
  K('thor_vol1', 'thor_series', 'story_thor_film', ['thor_616', 'loki_616', 'odin_616']);
  K('thor_surtur', 'thor_series', null, ['thor_616', 'beta_ray_bill_616']);
  K('thor_vol2', 'thor_series', null, ['thor_616']);
  K('thor_jms', 'thor_series', null, ['thor_616', 'loki_616']);
  K('thor_god_of_thunder', 'thor_series', 'story_thor_ragnarok', ['thor_616', 'hela_616']);
  K('thor_jane', 'thor_series', 'story_thor_love_and_thunder', ['thor_616']);
  K('thor_vol5', 'thor_series', null, ['thor_616']);
  K('cap_comics1', 'cap_series', 'story_captain_america_the_first_avenger', ['cap_616', 'winter_soldier_616', 'red_skull_616']);
  K('cap_silver', 'cap_series', null, ['cap_616', 'falcon_616']);
  K('cap_falcon_series', 'cap_series', null, ['falcon_616']);
  K('cap_brubaker', 'cap_series', 'story_captain_america_the_winter_soldier', ['cap_616', 'winter_soldier_616']);
  K('cap_winter_soldier', 'cap_series', null, ['winter_soldier_616', 'black_widow_616']);
  K('cap_vol7', 'cap_series', null, ['cap_616']);
  K('cap_sam_wilson', 'cap_series', 'story_the_falcon_and_the_winter_soldier', ['falcon_616']);
  K('cap_usa', 'cap_series', 'story_captain_america_brave_new_world', ['cap_616', 'falcon_616', 'isaiah_bradley']);
  K('cosmic_silver_surfer', 'cosmic_series', 'story_the_fantastic_four_first_steps', ['silver_surfer_616', 'galactus_616']);
  K('cosmic_warlock', 'cosmic_series', null, ['adam_warlock_616', 'thanos_616']);
  K('cosmic_captain_marvel', 'cosmic_series', null, ['carol_616']);
  K('cosmic_nova', 'cosmic_series', null, ['nova_616']);
  K('cosmic_gotg2008', 'cosmic_series', 'story_guardians_of_the_galaxy_film', ['star_lord', 'gamora', 'drax_the_destroyer', 'rocket_raccoon', 'groot']);
  K('cosmic_eternals', 'cosmic_series', 'story_eternals_film', ['ikaris', 'sersi', 'thena']);
  K('cosmic_ms_marvel', 'cosmic_series', null, ['carol_616']);
  K('cosmic_captain_marvel2012', 'cosmic_series', 'story_captain_marvel_film', ['carol_616', 'ms_marvel_616']);
  K('street_daredevil', 'street_series', null, ['daredevil_616', 'elektra_616', 'kingpin_616']);
  K('street_moon_knight', 'street_series', 'story_moon_knight_tv_series', ['moon_knight_616']);
  K('street_elektra_assassin', 'street_series', null, ['elektra_616', 'daredevil_616']);
  K('street_punisher', 'street_series', 'story_the_punisher_s1', ['punisher_616', 'kingpin_616']);
  K('street_power_man_iron_fist', 'street_series', 'story_luke_cage_tv_series_s1', ['luke_cage_616', 'iron_fist_616']);
  K('street_alias', 'street_series', 'story_jessica_jones_tv_series_s1', ['jessica_jones_616', 'luke_cage_616']);
  K('street_immortal_iron_fist', 'street_series', 'story_iron_fist_tv_series_s1', ['iron_fist_616']);
  K('street_blade', 'street_series', null, ['blade_616']);
  K('street_defenders', 'street_series', 'story_the_defenders', ['daredevil_616', 'luke_cage_616', 'iron_fist_616', 'jessica_jones_616']);
  DATA.comics.nodes.push.apply(DATA.comics.nodes, N);
  ['thor_series', 'cap_series', 'cosmic_series', 'street_series'].forEach(line => {
    const items = DATA.comics.nodes.filter(c => c.line === line);
    for (let i = 1; i < items.length; i++) DATA.comics.edges.push({ source: items[i - 1].id, target: items[i].id, type: 'sequence' });
  });
}

/** Loads data.part1-8.js from ROOT, applies the same runtime injections app.js does. */
function loadData(ROOT) {
  const parts = [];
  for (let i = 1; i <= 8; i++) {
    const file = path.join(ROOT, `data.part${i}.js`);
    const src = fs.readFileSync(file, 'utf8');
    const m = src.match(/window\.__DP\.push\((".*")\)\s*;?\s*$/s);
    if (!m) throw new Error(`Could not find __DP.push(...) payload in ${file}`);
    parts.push(JSON.parse(m[1]));
  }
  const DATA = JSON.parse(parts.join(''));
  injectMissingStories(DATA);
  injectComicLines(DATA);
  return DATA;
}

/** Returns { charCount, charEdgeCount, storyCount, comicCount, universeCount, edgeRounded }. */
function computeCounts(ROOT) {
  const DATA = loadData(ROOT);
  const charCount = DATA.characters.nodes.length;
  const charEdgeCount = DATA.characters.edges.length;
  const storyCount = DATA.stories.nodes.length;
  const comicCount = (DATA.comics && DATA.comics.nodes || []).length;
  const universeCount = new Set(DATA.characters.nodes.map(c => c.universe)).size;
  const edgeRounded = Math.floor(charEdgeCount / 10) * 10;
  return { charCount, charEdgeCount, storyCount, comicCount, universeCount, edgeRounded };
}

module.exports = { loadData, computeCounts };
