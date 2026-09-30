/*
 * Shared count computation used by scripts/update-counts.js (rewrites the hardcoded
 * numbers in index.html) and scripts/generate-og-image.js (redraws og-image.png with the
 * same numbers), so neither drifts from the actual data.
 *
 * All data now lives in data.part*.js (the Fox-era titles, extra comic lines and Phase 7
 * that app.js used to patch in at runtime were baked into the data on 2026-09-30), so
 * the counts are simply read from there via scripts/data-io.js.
 */
const { readData } = require('./data-io');

/** Loads the data exactly as the browser sees it (window.DATA). */
function loadData(ROOT) {
  return readData(ROOT);
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
