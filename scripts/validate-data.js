#!/usr/bin/env node
/*
 * Sanity checks for the data. Run before every deploy:  node scripts/validate-data.js
 * Exits with code 1 on errors (broken data); warnings are printed but don't fail.
 */
const fs = require('fs');
const path = require('path');
const { ROOT, readData } = require('./data-io');

const DATA = readData();
const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);

const C = DATA.characters, S = DATA.stories, K = DATA.comics;
const dupIds = arr => arr.filter((x, i) => arr.indexOf(x) !== i);
for (const [name, nodes] of [['character', C.nodes], ['story', S.nodes], ['comic', K.nodes]]) {
  for (const id of dupIds(nodes.map(n => n.id))) err(`duplicate ${name} id: ${id}`);
}
const cid = new Set(C.nodes.map(n => n.id)), sid = new Set(S.nodes.map(n => n.id)), kid = new Set(K.nodes.map(n => n.id));

// --- character edges
const seen = new Map();
for (const e of C.edges) {
  if (!cid.has(e.source) || !cid.has(e.target)) err(`character edge to unknown node: ${e.source} → ${e.target}`);
  if (e.source === e.target) err(`self edge: ${e.source}`);
  const key = [e.source, e.target].sort().join('|') + '|' + e.type;
  if (seen.has(key)) err(`duplicate character edge (${e.type}): ${e.source} — ${e.target}`);
  seen.set(key, e);
}

// --- one connected graph, otherwise "path between characters" fails for some pairs
const adj = new Map(C.nodes.map(n => [n.id, []]));
for (const e of C.edges) { if (adj.has(e.source) && adj.has(e.target)) { adj.get(e.source).push(e.target); adj.get(e.target).push(e.source); } }
const done = new Set(), comps = [];
for (const n of C.nodes) {
  if (done.has(n.id)) continue;
  const comp = [], stack = [n.id]; done.add(n.id);
  while (stack.length) { const u = stack.pop(); comp.push(u); for (const v of adj.get(u)) if (!done.has(v)) { done.add(v); stack.push(v); } }
  comps.push(comp);
}
comps.sort((a, b) => b.length - a.length);
for (const comp of comps.slice(1)) err(`character graph island (${comp.length}), no path to the rest: ${comp.join(', ')}`);

// --- stories & comics
for (const e of S.edges) if (!sid.has(e.source) || !sid.has(e.target)) err(`story edge to unknown node: ${e.source} → ${e.target}`);
for (const s of S.nodes) {
  for (const c of s.characters || []) if (!cid.has(c)) err(`${s.id}: unknown character ${c}`);
  if (!(s.characters || []).length) warn(`${s.id}: no characters`);
}
for (const e of K.edges) if (!kid.has(e.source) || !kid.has(e.target)) err(`comic edge to unknown node: ${e.source} → ${e.target}`);
for (const k of K.nodes) {
  if (k.tie_in && !sid.has(k.tie_in)) err(`${k.id}: unknown tie_in ${k.tie_in}`);
  for (const c of k.tie_in_chars || []) if (!cid.has(c)) err(`${k.id}: unknown character ${c}`);
}

// --- derived fields
const deg = new Map();
for (const e of C.edges) { deg.set(e.source, (deg.get(e.source) || 0) + 1); deg.set(e.target, (deg.get(e.target) || 0) + 1); }
for (const n of C.nodes) if (n.degree !== (deg.get(n.id) || 0)) err(`${n.id}: degree ${n.degree} ≠ ${deg.get(n.id) || 0} (run recomputeDerived)`);
for (const s of S.nodes) if (s.char_count !== (s.characters || []).length) err(`${s.id}: char_count out of date`);

// --- images: self-hosted files must exist, both full size and thumbnail
const imgs = [...C.nodes.map(n => [n.id, n.image]), ...S.nodes.map(n => [n.id, n.poster]), ...K.nodes.map(n => [n.id, n.cover])];
for (const [id, url] of imgs) {
  if (!url) { warn(`${id}: no image`); continue; }
  if (!url.startsWith('images/')) { warn(`${id}: image is not self-hosted (${url.slice(0, 60)}…)`); continue; }
  if (!fs.existsSync(path.join(ROOT, url))) err(`${id}: missing file ${url}`);
  if (!fs.existsSync(path.join(ROOT, url.replace('images/', 'images/thumbs/')))) err(`${id}: missing thumbnail for ${url}`);
}

// --- precomputed layout (layout.js) must cover every character, or phones fall back to the slow path
const layoutFile = path.join(ROOT, 'layout.js');
if (fs.existsSync(layoutFile)) {
  const win = {}; new Function('window', fs.readFileSync(layoutFile, 'utf8'))(win);
  for (const mode of ['force', 'universe']) {
    const pos = (win.LAYOUT || {})[mode] || {};
    const missing = C.nodes.filter(n => !pos[n.id]).map(n => n.id);
    if (missing.length) err(`layout.js (${mode}) is stale — ${missing.length} characters without coordinates; run node scripts/build-layout.js`);
  }
}

for (const w of warnings) console.log('warn  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(`\n${C.nodes.length} characters · ${C.edges.length} links · ${S.nodes.length} stories · ${K.nodes.length} comics`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
