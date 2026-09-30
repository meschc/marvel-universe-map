#!/usr/bin/env node
/*
 * Downloads a picture for every character / story / comic that has none (or whose file
 * is missing on disk), converts it to the site's format and links it in the data.
 *
 *   node scripts/fetch-images.js                       # everything that is missing
 *   node scripts/fetch-images.js laufey eros           # only these ids
 *   node scripts/fetch-images.js --page story_x=https://marvel.fandom.com/wiki/Some_Page
 *
 * Source: the lead image of the node's Fandom page (Fandom's MediaWiki API, `pageimages`).
 * Characters use their `wiki_url`; stories/comics have none, so the script looks the title
 * up on the MCU wiki and then on the Marvel Database — pass --page to point it elsewhere.
 *
 * Output matches the existing files: images/<kind>/<id>.webp at 420px tall plus a 160px
 * tall copy in images/thumbs/<kind>/. Needs ImageMagick (`convert`), same as
 * generate-og-image.js. Run scripts/validate-data.js afterwards.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { ROOT, readData, writeData } = require('./data-io');

const WIKIS = ['https://marvelcinematicuniverse.fandom.com', 'https://marvel.fandom.com'];
const args = process.argv.slice(2);
const pageOverride = {};
const onlyIds = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--page') { const [id, url] = args[++i].split(/=(.*)/s); pageOverride[id] = url; onlyIds.push(id); }
  else onlyIds.push(args[i]);
}

async function leadImage(wiki, title) {
  const u = `${wiki}/api.php?action=query&format=json&redirects=1&prop=pageimages&piprop=original&titles=${encodeURIComponent(title)}`;
  const r = await fetch(u, { headers: { 'User-Agent': 'marvel-universe-map image fetcher' } });
  if (!r.ok) return null;
  const pages = Object.values((await r.json()).query?.pages || {});
  return pages[0]?.original?.source || null;
}

function candidates(node, kind) {
  const override = pageOverride[node.id] || (kind === 'characters' ? node.wiki_url : null);
  if (override) {
    const m = override.match(/^(https:\/\/[^/]+)\/wiki\/(.+)$/);
    return m ? [[m[1], decodeURIComponent(m[2]).replace(/_/g, ' ')]] : [];
  }
  const t = node.title;
  const titles = [t, t.replace(/ Season (\d+)$/, '/Season $1'), `${t} (film)`, `${t} (TV series)`];
  return WIKIS.flatMap(w => [...new Set(titles)].map(x => [w, x]));
}

async function main() {
  const DATA = readData();
  const groups = [['characters', 'image', DATA.characters.nodes], ['stories', 'poster', DATA.stories.nodes], ['comics', 'cover', DATA.comics.nodes]];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mum-img-'));
  let done = 0, failed = [];
  for (const [kind, field, nodes] of groups) {
    for (const node of nodes) {
      const target = `images/${kind}/${node.id}.webp`;
      const missing = !node[field] || (node[field].startsWith('images/') && !fs.existsSync(path.join(ROOT, node[field])));
      if (onlyIds.length ? !onlyIds.includes(node.id) : !missing) continue;
      let src = null;
      for (const [wiki, title] of candidates(node, kind)) { src = await leadImage(wiki, title); if (src) break; }
      if (!src) { failed.push(node.id); continue; }
      const raw = path.join(tmp, node.id);
      const res = await fetch(src);
      if (!res.ok) { failed.push(node.id); continue; }
      fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
      const full = path.join(ROOT, target), thumb = path.join(ROOT, target.replace('images/', 'images/thumbs/'));
      fs.mkdirSync(path.dirname(full), { recursive: true }); fs.mkdirSync(path.dirname(thumb), { recursive: true });
      // [0] = first frame only (some sources are animated GIFs); strip metadata
      execFileSync('convert', [raw + '[0]', '-strip', '-resize', 'x420>', '-quality', '82', full]);
      execFileSync('convert', [raw + '[0]', '-strip', '-resize', 'x160>', '-quality', '82', thumb]);
      node[field] = target;
      done++;
      console.log(`ok   ${node.id}  ←  ${src.split('/revision')[0].split('/').pop()}`);
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  writeData(DATA);
  console.log(`\n${done} image(s) added` + (failed.length ? `, not found: ${failed.join(', ')} (use --page id=URL)` : ''));
}
main().catch(e => { console.error(e); process.exit(1); });
