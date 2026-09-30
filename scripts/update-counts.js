#!/usr/bin/env node
/*
 * Recomputes the character/story/comic/universe/edge counts that appear hardcoded
 * throughout index.html (meta description, og:description, FAQ JSON-LD answers,
 * the two SEO-content <section> paragraphs in RU and EN) and rewrites them in place.
 *
 * Why this exists: those numbers used to be typed by hand and drifted out of sync
 * every time a character/story/comic was added — see compute-counts.js for the full
 * explanation of how the counts are derived (it re-runs app.js's own runtime
 * data-injection logic in Node so the numbers are guaranteed to match a real page
 * load, not a hand-maintained approximation of it).
 *
 * Usage: node scripts/update-counts.js
 * Run this before deploying whenever data.part*.js changes or the injection
 * functions in app.js are edited. Also run scripts/generate-og-image.js afterwards
 * so the social-preview image picks up the same numbers.
 */
const fs = require('fs');
const path = require('path');
const { computeCounts } = require('./compute-counts');
const ROOT = path.join(__dirname, '..');

const { charCount, charEdgeCount, storyCount, comicCount, universeCount, edgeRounded } = computeCounts(ROOT);
console.log('Computed counts:', { charCount, charEdgeCount, storyCount, comicCount, universeCount, edgeRounded });

// Numbers appear in several different phrasings ("369 героев", "369 персонажей",
// "369 characters", edge count rounded down to the nearest 10 as "710+", etc.) so
// this uses a small set of targeted regexes rather than one global find/replace —
// each one is scoped tightly enough (surrounding words) to not misfire elsewhere.
const htmlPath = path.join(ROOT, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Russian nouns agree with the number (1 фильм, 2 фильма, 5 фильмов; 11–14 always take the
// third form), so every Russian pattern matches any of the three forms and writes the right one.
function ru(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
const forms = (...f) => f.join('|');
const replacements = [
  [new RegExp(`\\d+ (?:${forms('героя', 'героев', 'герой')})(?![а-я])`, 'g'), `${charCount} ${ru(charCount, 'герой', 'героя', 'героев')}`],
  [new RegExp(`\\d+ (?:${forms('персонажа', 'персонажей', 'персонаж')})(?![а-я])`, 'g'), `${charCount} ${ru(charCount, 'персонаж', 'персонажа', 'персонажей')}`],
  [/\d+ characters/g, `${charCount} characters`],
  [new RegExp(`\\d+ (?:${forms('фильма и сериала', 'фильмов и сериалов', 'фильм и сериал')})(?![а-я])`, 'g'), `${storyCount} ${ru(storyCount, 'фильм и сериал', 'фильма и сериала', 'фильмов и сериалов')}`],
  [new RegExp(`\\d+ (?:${forms('фильма', 'фильмов', 'фильм')})(?![а-я]| и)`, 'g'), `${storyCount} ${ru(storyCount, 'фильм', 'фильма', 'фильмов')}`],
  [/\d+ movies and series/g, `${storyCount} movies and series`],
  [new RegExp(`\\d+ (?:${forms('комикса', 'комиксов', 'комикс')})(?![а-я])`, 'g'), `${comicCount} ${ru(comicCount, 'комикс', 'комикса', 'комиксов')}`],
  [new RegExp(`\\d+ (?:${forms('выпуска', 'выпусков', 'выпуск')})(?![а-я])`, 'g'), `${comicCount} ${ru(comicCount, 'выпуск', 'выпуска', 'выпусков')}`],
  [/\d+ comics/g, `${comicCount} comics`],
  [new RegExp(`\\d+ (?:${forms('вселенных', 'вселенные', 'вселенная')})(?![а-я])`, 'g'), `${universeCount} ${ru(universeCount, 'вселенная', 'вселенные', 'вселенных')}`],
  [/\d+ universes/g, `${universeCount} universes`],
  [/граф из \d+ (?:героя|героев|герой) и \d+\+? связей/g, `граф из ${charCount} ${ru(charCount, 'героя', 'героев', 'героев')} и ${edgeRounded}+ связей`],
];
let changedCount = 0;
for (const [re, replacement] of replacements) {
  const before = html;
  html = html.replace(re, replacement);
  if (html !== before) changedCount++;
}
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(`index.html updated (${changedCount} distinct patterns matched and rewritten).`);
console.log('Next: run "node scripts/generate-og-image.js" so og-image.png shows the same numbers.');
