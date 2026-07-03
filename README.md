<div align="center">

<img src="og-image.png" alt="Marvel Multiverse Map" width="640">

# 🕸 Marvel Multiverse Map

**An interactive graph of the entire Marvel multiverse — characters, movies, series and comics, and every connection between them.**

[**🌐 Live demo → meschc.github.io/marvel-universe-map**](https://meschc.github.io/marvel-universe-map/)

[![Live Demo](https://img.shields.io/badge/demo-online-3ecf8e?style=flat-square)](https://meschc.github.io/marvel-universe-map/)
[![License: MIT](https://img.shields.io/badge/license-MIT-e23636?style=flat-square)](LICENSE)
[![Made with D3.js](https://img.shields.io/badge/made%20with-D3.js%20v7-f2a900?style=flat-square)](https://d3js.org)
![No build step](https://img.shields.io/badge/build-none%20·%20vanilla%20JS-5b8def?style=flat-square)

🇷🇺 [Русская версия README](README.ru.md)

</div>

---

## What is this

**Marvel Multiverse Map** is a single-page, zero-dependency web app that lays out the whole Marvel universe as an explorable graph. It answers the questions fans actually ask:

- **In what order do I watch the movies and shows?** → the in-universe chronology view.
- **In what order do I read the comics?** → 166 issues across 12 lines, by release year.
- **How is character A connected to character B?** → a force-directed graph with a shortest-path finder.
- **How do the universes overlap?** → MCU, Earth-616, Earth-828, Spider-Verse, Sony, Fox, What If…? and more, colour-coded.

<div align="center">

|  |  |
|:--:|:--:|
| **360** characters | **710** connections |
| **139** movies & series | **166** comics |
| **12** universes | **RU / EN** |

</div>

## ✨ Features

- **Three modes** — Characters (relationship graph), Stories (movie/series timeline), Comics (catalogue by line or by year).
- **Two character layouts** — force-directed graph, or a "star" grouped by universe with the MCU at the centre.
- **Path finder** 🧭 — the shortest chain of connections between any two heroes (e.g. Spider-Man → Thor).
- **Global search** across characters, actors, movies and comics at once.
- **Rich detail cards** — cast, appearances, affiliations, cross-links between modes, "where to watch / read".
- **Bilingual** — English and Russian (extensible dropdown).
- **Mobile-first controls** — bottom menu, slide-up sheets, tap-to-dismiss.
- **Keyboard shortcuts** — `Esc` clear · `/` search · `1` / `2` / `3` modes · `R` reset view.
- **Deep links** — `…/#iron_man` opens a character straight away.
- **Fully static** — no backend, no build. Open the file, done.

## 🎬 The three modes

**Characters.** A D3 force simulation of 360 heroes and 710 links, typed as team, family, romantic, ally, enemy and multiverse-variant. Node size = number of connections, ring colour = universe, fill = photo.

**Stories.** 139 films and series on a timeline — grouped by MCU phase or by in-universe chronology, with universe bands showing how Sony, Fox and animation lines interleave. This is the watch-order view.

**Comics.** 166 key issues in 12 lines (Spider-Man, X-Men, Iron Man, Thor, Captain America, Avengers, Cosmic, Street-Level, plus movie preludes, adaptations, first appearances and classic events), viewable by line or on a shared release-year timeline.

## 🚀 Run it

It's a static site — no install, no build.

```bash
# just open it
open index.html            # macOS
# or serve locally
python3 -m http.server 8000 # then visit http://localhost:8000
```

The single-file build `Marvel_Universe_Map_v6.html` (everything inlined) opens with a double-click anywhere.

## 📁 Project structure

```
index.html    markup, SEO meta, structured data, script/style includes
styles.css    all styles and the dark theme
data.js       the data (window.DATA): characters, stories, comics, links
app.js        all logic — D3 graph, modes, search, filters, cards, mobile UI
og-image.png  social preview (1200×630)
robots.txt · sitemap.xml · .nojekyll   for search engines & GitHub Pages
```

Data lives in `data.js` as one `DATA` object:

```js
DATA.characters.nodes  // { id, name, name_ru, actor, group, universe, image, … }
DATA.characters.edges  // { source, target, type, label }   type: team|family|romantic|ally|enemy|variant
DATA.stories.nodes     // { id, title, title_ru, type, phase, date, poster, characters[] }
DATA.comics.nodes      // { id, title, title_ru, line, date, cover, tie_in, tie_in_chars[] }
```

### Add a character

1. Add an object to `DATA.characters.nodes` in `data.js`.
2. Add at least one edge to `DATA.characters.edges`.
3. Refresh — the graph recomputes itself.

Prefer not to touch code? Open an **Issue** using the templates in [`ISSUE_TEMPLATES.md`](ISSUE_TEMPLATES.md).

## 🤝 Contributing

Contributions are welcome — new characters, connections, titles or fixes. Open a pull request, or file an issue with one of the ready-made templates. Data changes only touch `data.js`, so they're easy to review.

## 🔎 SEO

Ships with unique title/description, RU+EN keywords, Open Graph & Twitter cards, canonical + hreflang, and `WebApplication` + `FAQPage` structured data so common questions surface directly in search.

## 📄 License & credits

Code — [MIT](LICENSE) © **Kirill Denisovich Meshcheryakov** ([kirmeschc.ru](https://kirmeschc.ru) · [GitHub](https://github.com/meschc) · [Telegram](https://t.me/kirillmeschc)).

Non-commercial fan project. Marvel characters, names, logos and artwork are property of **Marvel / The Walt Disney Company**. Images are loaded from public Fandom wikis ([MCU Wiki](https://marvelcinematicuniverse.fandom.com), [Marvel Database](https://marvel.fandom.com), [Into the Spider-Verse Wiki](https://intothespiderverse.fandom.com)) under CC-BY-SA, for informational use.

Built with [D3.js](https://d3js.org) and [Feather Icons](https://feathericons.com). Assembled and coded with the help of Claude (Claude Cowork by Anthropic).

<div align="center">

⭐ If you like it, star the repo — [**open the live map**](https://meschc.github.io/marvel-universe-map/)

</div>
