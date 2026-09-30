/*
 * Read / write the site's data, which ships as data.part1.js … data.part8.js: each file
 * pushes one slice of a single JSON string onto window.__DP, and data.loader.js joins
 * the slices and JSON.parse()s them into window.DATA.
 *
 *   const { readData, writeData, recomputeDerived } = require('./data-io');
 *   const DATA = readData();          // plain object, same shape as window.DATA
 *   … edit DATA …
 *   recomputeDerived(DATA);           // degree / char_count / appearance_count
 *   writeData(DATA);                  // rewrites data.part1-8.js in the same format
 *
 * Always edit the data through these two functions instead of by hand: the slices are
 * cut at arbitrary character offsets, so a hand edit that changes a slice's length
 * silently corrupts the JSON.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PARTS = 8;

function partPath(root, i) { return path.join(root, `data.part${i}.js`); }

function readData(root = ROOT) {
  const slices = [];
  for (let i = 1; i <= PARTS; i++) {
    const src = fs.readFileSync(partPath(root, i), 'utf8');
    const m = src.match(/window\.__DP\.push\((".*")\)\s*;?\s*$/s);
    if (!m) throw new Error(`data.part${i}.js: no window.__DP.push("…") payload found`);
    slices.push(JSON.parse(m[1]));
  }
  return JSON.parse(slices.join(''));
}

function writeData(DATA, root = ROOT) {
  const json = JSON.stringify(DATA);
  const size = Math.ceil(json.length / PARTS);
  let start = 0;
  for (let i = 1; i <= PARTS; i++) {
    let end = i === PARTS ? json.length : Math.min(json.length, start + size);
    // never cut a UTF-16 surrogate pair in half
    const c = json.charCodeAt(end - 1);
    if (end < json.length && c >= 0xd800 && c <= 0xdbff) end++;
    const slice = json.slice(start, end);
    start = end;
    fs.writeFileSync(partPath(root, i),
      'window.__DP=window.__DP||[];window.__DP.push(' + JSON.stringify(slice) + ');', 'utf8');
  }
  // round-trip check: what we wrote must parse back to exactly what we were given
  if (JSON.stringify(readData(root)) !== json) throw new Error('data round-trip mismatch after write');
}

/** Fields the app reads but that are derived from other fields — keep them honest. */
function recomputeDerived(DATA) {
  const deg = new Map();
  for (const e of DATA.characters.edges) {
    deg.set(e.source, (deg.get(e.source) || 0) + 1);
    deg.set(e.target, (deg.get(e.target) || 0) + 1);
  }
  for (const n of DATA.characters.nodes) {
    n.degree = deg.get(n.id) || 0;
    if (n.appearances) {
      n.appearance_count = Object.values(n.appearances).reduce((s, a) => s + (a ? a.length : 0), 0);
    }
  }
  for (const s of DATA.stories.nodes) s.char_count = (s.characters || []).length;
}

module.exports = { ROOT, readData, writeData, recomputeDerived };
