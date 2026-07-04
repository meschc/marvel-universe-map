#!/usr/bin/env node
/*
 * Regenerates og-image.png (the 1200x630 social-share preview used by og:image /
 * twitter:image) from a small SVG template, so the character/movie/comic/universe
 * counts shown on the banner always match the live data instead of a hand-edited
 * PNG that silently goes stale (it was still showing "360 / 139" long after the
 * real counts moved to 369 / 144).
 *
 * Renders SVG -> PNG via ImageMagick's `convert`, which delegates SVG rasterizing
 * to rsvg-convert under the hood (no npm packages / network access needed, which
 * matters since this sandbox has neither).
 *
 * Usage: node scripts/generate-og-image.js
 * Run this after scripts/update-counts.js (or anytime data.part*.js changes).
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { computeCounts } = require('./compute-counts');
const ROOT = path.join(__dirname, '..');

const { charCount, storyCount, comicCount, universeCount } = computeCounts(ROOT);

const W = 1200, H = 630;
const RED = '#e23636';
const BG = '#0b0d14';
const BG2 = '#12141c';
const TEXT = '#f3f4f6';
const DIM = '#8890a4';

// Layout mirrors the original hand-made og-image.png: circular "M" logo top-left,
// title, tagline, a row of four stat blocks (number in red / label in dim gray),
// a divider line, and the domain pinned near the bottom — all as plain SVG text so
// no external font files are needed (falls back to the system's default sans-serif,
// same as the original image did).
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function statBlock(x, value, label) {
  return `
    <text x="${x}" y="248" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="800" fill="${RED}">${esc(value)}</text>
    <text x="${x}" y="277" font-family="Arial, Helvetica, sans-serif" font-size="17" fill="${DIM}">${esc(label)}</text>`;
}

const stats = [
  [charCount, 'characters'],
  [storyCount, 'movies & series'],
  [comicCount, 'comics'],
  [universeCount, 'universes'],
];
// x positions spaced to match the original banner's column rhythm
const xs = [138, 280, 464, 581];
const statsSvg = stats.map(([v, l], i) => statBlock(xs[i], v, l)).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${BG}"/>
      <stop offset="100%" stop-color="${BG2}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="94" cy="88" r="26" fill="${RED}"/>
  <text x="94" y="99" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="900" fill="#fff" text-anchor="middle">M</text>
  <text x="138" y="103" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="${TEXT}">Marvel Multiverse Map</text>
  <text x="138" y="157" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="${DIM}">Characters &#183; Movies &amp; Series &#183; Comics &#8212; every connection, one interactive map</text>
  ${statsSvg}
  <line x1="138" y1="322" x2="1062" y2="322" stroke="${DIM}" stroke-opacity="0.25" stroke-width="1"/>
  <text x="138" y="563" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" fill="${TEXT}">marvel.kirmesch.ru</text>
</svg>`;

// Use os.tmpdir() rather than a temp file inside ROOT: some deployment environments
// mount the project directory with restricted permissions that allow creating a file
// but not deleting it afterwards, which broke cleanup here originally.
const os = require('os');
const svgPath = path.join(os.tmpdir(), `og-image-${Date.now()}.svg`);
const pngPath = path.join(ROOT, 'og-image.png');
fs.writeFileSync(svgPath, svg, 'utf8');
try {
  execFileSync('convert', ['-background', 'none', svgPath, pngPath], { stdio: 'inherit' });
} finally {
  try { fs.unlinkSync(svgPath); } catch (e) { /* best-effort cleanup, non-fatal */ }
}
console.log(`og-image.png regenerated: ${charCount} characters, ${storyCount} movies & series, ${comicCount} comics, ${universeCount} universes.`);
