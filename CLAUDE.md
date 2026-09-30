# Marvel Multiverse Map — инструкции для Claude

Интерактивная карта мультивселенной Marvel: граф персонажей, таймлайн фильмов/сериалов и каталог комиксов.
Живой сайт — https://marvel.kirmesch.ru (GitHub Pages из ветки `main`, домен в `CNAME`). Без сборки и без npm-зависимостей: ванильный JS + D3 v7 с cdnjs.

Сейчас: 370 персонажей · 790 связей · 149 фильмов и сериалов · 166 комиксов · 12 вселенных (числа — из `node scripts/validate-data.js`).

## Файлы

| Файл | Что внутри |
|---|---|
| `index.html` | разметка, SEO-мета, JSON-LD, SEO-тексты (скрыты визуально), аналитика (Clarity + Метрика, грузятся после `load`), подключение скриптов |
| `styles.css` | все стили; мобильная версия — `@media (max-width: 720px)`; в конце — слой анимаций и «phone performance» |
| `data.part1-8.js` | данные: один JSON, разрезанный на 8 строк (`window.__DP.push("…")`) |
| `data.loader.js` | склеивает части → `window.DATA` |
| `layout.js` | **генерируется** `scripts/build-layout.js`: готовые координаты графа персонажей (`window.LAYOUT.force / .universe`) |
| `app.js` | вся логика: три режима, D3-граф, фильтры, поиск, карточки, путь между персонажами, мобильный UI |
| `images/<characters|stories|comics>/<id>.webp` | картинки 420px по высоте; `images/thumbs/…` — те же 160px |
| `scripts/` | инструменты для данных (ниже) |

Все скрипты в `index.html` подключены с `defer` и выполняются по порядку: d3 → data.part1-8 → data.loader → layout → app.
При изменении `app.js`/`styles.css`/данных поднимай версию `?v=YYYYMMDDx` у всех подключений в `index.html` (иначе GitHub Pages/браузер отдадут старое из кэша).

## Данные (`window.DATA`)

```js
DATA.characters.nodes  // { id, name, name_ru, real_name, real_name_ru, actor, group, universe, image,
                       //   wiki_url, affiliation[], appearances:{movie[],tv_series[],game[],comic[]},
                       //   appearance_count, degree }            ← degree/appearance_count — производные
DATA.characters.edges  // { source, target, type, label? }   type: team|family|romantic|ally|enemy|variant
DATA.stories.nodes     // { id, title, title_ru, type: movie|tv_series|one_shot, date: 'YYYY-MM-DD'|'TBA',
                       //   phase: '1'…'7'|netflix|xmen|raimi|webb|sony|animation|spiderverse|other,
                       //   universe, event_year, event_date_ru/en, poster, characters[], char_count }
DATA.stories.edges     // { source, target, type: chronology|shared_characters, weight? }
DATA.comics.nodes      // { id, title, title_ru, line, date, cover, tie_in?, tie_in_chars[]? }
DATA.comics.edges      // { source, target, type: 'sequence' }
DATA.comics.line_labels_ru / line_labels_en, DATA.group_labels_ru / group_labels_en
```

Сериалы хранятся по сезонам (`…_s1`, `…_s2`). В `appearances` персонажа можно писать и «Show», и «Show Season 2» — `resolveStoryId()` в app.js сводит оба к нужному сезону.

**Никогда не правь `data.part*.js` руками** — куски нарезаны в произвольных местах, ручная правка ломает JSON. Всё через `scripts/data-io.js`:

```js
const { readData, writeData, recomputeDerived } = require('./scripts/data-io');
const DATA = readData();  /* правки */  recomputeDerived(DATA);  writeData(DATA);
```

## Порядок работы с данными

1. Правка через `data-io.js` (новый персонаж — обязательно хотя бы одна связь, иначе остров и «путь не найден»).
2. `node scripts/fetch-images.js` — докачает картинки для всего, у чего их нет (Fandom API → webp 420/160px, нужен ImageMagick). Страница берётся из `wiki_url`; для тайтлов или неточных ссылок — `--page id=URL`. **Смотри результат глазами**: по одному названию Fandom иногда отдаёт чужую страницу.
3. `node scripts/build-layout.js` — пересчитать `layout.js` (если менялись персонажи/связи). Силы в скрипте продублированы из `buildCharGraph()` — меняешь в одном месте, меняй и в другом.
4. `node scripts/validate-data.js` — дубли, битые ссылки, острова в графе, пропавшие картинки, устаревший `layout.js`. Ошибок должно быть 0.
5. `node scripts/update-counts.js` — обновит числа в SEO-текстах `index.html` (с русскими склонениями). Числа в README правь руками.
6. Подними `?v=` в `index.html`.

Подписи связей (`label`) переводятся через `EDGE_LABEL_TR` в app.js — новую подпись добавь туда (ru + en), иначе в английской версии она покажется как есть.

## Как устроен app.js (важное)

- Всё внутри `initApp()`; `LANG`, `MODE`, `*_LAYOUT` — `let` в этой области (функции верхнего уровня получают язык аргументом).
- Режимы: `buildCharGraph()` (force / universe), `buildStoryGraph()` (phase / chrono), `buildComicsGraph()` (lines / chrono). Переключение режима пересобирает граф.
- **Производительность на телефоне** (`IS_MOBILE` = ширина ≤ 720px):
  - позиции графа берутся из `layout.js` (`placeFromLayout()`), симуляция не запускается; если `layout.js` не покрывает всех — старый путь (синхронные тики, ~1–1,5 с фриза);
  - при отдалении (`svg.lod`, зум < 0.6) аватарки скрыты CSS-ом и не грузятся;
  - на десктопе force-граф по-прежнему анимируется вживую.
- `resize` реагирует только на смену ширины (клавиатура и адресная строка на телефоне шлют resize по высоте) и сохраняет выбранный узел.
- Мобильный UI: одна нижняя шторка `MSheet`, в которую «одалживаются» `#search-wrap`, `#filters`, `#detail-body-wrap`, `#cr-body`. Карточка открывается через MutationObserver на `#detail` (см. комментарий в `setupMobileUI`).
- Картинки: `thumbUrl()` отдаёт `images/thumbs/…` для узлов графа; в карточке всегда полный файл. Когда узел на экране крупнее превью (~96 px для аватара), `upgradeVisibleImages()` подменяет его на полный файл — только в пределах экрана.
- «Умный» зум (обработчик `zoomBehavior`): после 1× расстояния растут вместе с зумом, а узлы, подписи и толщина линий — медленнее (`nodeScale = k^-0.55`, CSS-переменная `--ls` для `stroke-width`). Узлы рисуются через `nodeTransform(d)` — не пиши `translate(...)` напрямую. Максимальный зум — 12×.
- Выделение узла: подсвечиваются только связи самого узла и только включённых в фильтре типов (`linkTypeActive`, `linkOfSelection`); карточка персонажа тоже показывает только эти типы и пишет, сколько скрыто.
- Актёры при смене исполнителя пишутся через « / » (`"Mark Ruffalo / Edward Norton"`) — в карточке это отдельные ссылки.
- Путь между персонажами: `startPath()` → `finishPath()` (BFS по всем связям).
- Deep-link: `…/#<id>` открывает персонажа/тайтл/комикс при загрузке.

## Перед релизом

- [ ] `node scripts/validate-data.js` — 0 ошибок
- [ ] `layout.js` пересобран, если менялись персонажи/связи
- [ ] `node scripts/update-counts.js`; числа в README
- [ ] версия `?v=` поднята во всех подключениях `index.html`
- [ ] проверено на ширине 390px: главный экран, карточка, путь, «Истории», «Комиксы», «По вселенным»
- [ ] RU и EN: новые подписи есть в `EDGE_LABEL_TR`, у новых узлов заполнены `name_ru`/`title_ru`
