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

const replacements = [
  [/\d+ героев/g, `${charCount} героев`],
  [/\d+ персонажей/g, `${charCount} персонажей`],
  [/\d+ characters/g, `${charCount} characters`],
  [/\d+ фильма и сериала/g, `${storyCount} фильма и сериала`],
  [/\d+ фильма(?!\sи)/g, `${storyCount} фильма`],
  [/\d+ movies and series/g, `${storyCount} movies and series`],
  [/\d+ комиксов/g, `${comicCount} комиксов`],
  [/\d+ выпусков/g, `${comicCount} выпусков`],
  [/\d+ comics/g, `${comicCount} comics`],
  [/\d+ вселенных/g, `${universeCount} вселенных`],
  [/\d+ universes/g, `${universeCount} universes`],
  [/граф из \d+ героев и \d+\+? связей/g, `граф из ${charCount} героев и ${edgeRounded}+ связей`],
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
